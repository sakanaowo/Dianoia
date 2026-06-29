const {
  Plugin,
  PluginSettingTab,
  Setting,
  Modal,
  FuzzySuggestModal,
  Notice,
  TFolder,
  TFile,
  normalizePath,
} = require("obsidian");

const DEFAULT_SETTINGS = {
  defaultFolder: "",
  defaultExtension: "md",
  openAfterCreate: true,
  rememberLastFolder: true,
  autoIncrementDuplicates: true,
  templatePath: "",
  templateRules: [
    { folder: "04 - Notes/Atomic", template: "99 - Templates/Atomic Note.md" },
    { folder: "04 - Notes/Concepts", template: "99 - Templates/Concept Note.md" },
    { folder: "04 - Notes/Arguments", template: "99 - Templates/Argument Note.md" },
    { folder: "04 - Notes/Comparisons", template: "99 - Templates/Comparison Note.md" },
    { folder: "04 - Notes/Questions", template: "99 - Templates/Question Note.md" },
    { folder: "04 - Notes/People", template: "99 - Templates/Person Note.md" },
    { folder: "05 - Sources/Articles", template: "99 - Templates/Source - Article.md" },
    { folder: "05 - Sources/Videos", template: "99 - Templates/Source - Video.md" },
    { folder: "05 - Sources/Books", template: "99 - Templates/Book Note.md" },
    { folder: "05 - Sources/Papers", template: "99 - Templates/Paper Note.md" },
    { folder: "05 - Sources", template: "99 - Templates/Source Note.md" },
    { folder: "06 - Projects/Study Plans", template: "99 - Templates/Study Project Note.md" },
    { folder: "06 - Projects", template: "99 - Templates/Project Note.md" },
    { folder: "02 - Domains", template: "99 - Templates/Domain MOC.md" },
    { folder: "03 - Themes", template: "99 - Templates/Theme MOC.md" },
  ],
  quickFolders: [
    "00 - Inbox",
    "04 - Notes/Atomic",
    "04 - Notes/Concepts",
    "04 - Notes/Arguments",
    "05 - Sources",
    "06 - Projects",
  ],
  lastFolder: "",
  recentPaths: [],
  maxRecentPaths: 12,
};

module.exports = class VaultNewFilePlugin extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    await this.migrateSettings();

    this.addCommand({
      id: "create-new-file-choose-folder",
      name: "Create new file",
      callback: () => this.openPathPrompt({ folder: this.getStartFolder() }),
    });

    this.addCommand({
      id: "create-new-file-with-suggestions",
      name: "Create new file with suggestions",
      callback: () => this.openPathPrompt({ folder: this.getStartFolder() }),
    });

    this.addCommand({
      id: "show-template-rules",
      name: "Show template rules",
      callback: () => {
        const count = this.getTemplateRules().length;
        new Notice(`Advanced New File: ${count} template rules loaded`);
      },
    });

    this.addCommand({
      id: "create-new-file-current-folder",
      name: "Create new file: current folder",
      callback: () => this.openPathPrompt({ folder: this.getCurrentFolder() }),
    });

    this.addCommand({
      id: "create-new-file-full-path",
      name: "Create new file: type full path",
      callback: () => this.openPathPrompt({ folder: "" }),
    });

    this.addCommand({
      id: "create-new-folder",
      name: "Create new folder",
      callback: () => new NewFolderModal(this.app, this).open(),
    });

    const quickFolders = Array.isArray(this.settings.quickFolders) ? this.settings.quickFolders : [];
    quickFolders.forEach((folder, index) => {
      if (!folder || typeof folder !== "string") return;
      this.addCommand({
        id: `create-new-file-quick-folder-${index}`,
        name: `Create new file in ${folder}`,
        callback: () => this.openPathPrompt({ folder }),
      });
    });

    this.addSettingTab(new VaultNewFileSettingTab(this.app, this));
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async migrateSettings() {
    let changed = false;

    const currentRules = Array.isArray(this.settings.templateRules) ? this.settings.templateRules : [];
    const legacyRules = Array.isArray(this.settings.folderTemplates) ? this.settings.folderTemplates : [];
    const mergedRules = [];
    const seenFolders = new Set();

    const addRule = (rule) => {
      const normalized = this.normalizeTemplateRule(rule);
      if (!normalized || seenFolders.has(normalized.folder)) return false;
      seenFolders.add(normalized.folder);
      mergedRules.push(normalized);
      return true;
    };

    currentRules.forEach(addRule);
    legacyRules.forEach((rule) => {
      if (addRule(rule)) changed = true;
    });
    DEFAULT_SETTINGS.templateRules.forEach((rule) => {
      if (addRule(rule)) changed = true;
    });

    if (JSON.stringify(mergedRules) !== JSON.stringify(currentRules)) {
      changed = true;
    }

    if (changed || !Array.isArray(this.settings.templateRules)) {
      this.settings.templateRules = mergedRules;
      changed = true;
    }

    if (Array.isArray(this.settings.folderTemplates)) {
      delete this.settings.folderTemplates;
      changed = true;
    }

    if (!Array.isArray(this.settings.quickFolders)) {
      this.settings.quickFolders = DEFAULT_SETTINGS.quickFolders.slice();
      changed = true;
    }

    if (!Array.isArray(this.settings.recentPaths)) {
      this.settings.recentPaths = [];
      changed = true;
    }

    if (!this.settings.maxRecentPaths) {
      this.settings.maxRecentPaths = DEFAULT_SETTINGS.maxRecentPaths;
      changed = true;
    }

    if (changed) await this.saveSettings();
  }

  getRecentPaths() {
    if (!Array.isArray(this.settings.recentPaths)) return [];
    return this.settings.recentPaths
      .map((path) => this.normalizeVaultPath(path))
      .filter(Boolean);
  }

  async rememberRecentPath(path) {
    const normalized = this.normalizeVaultPath(path);
    if (!normalized) return;

    const { folder } = this.splitPath(normalized);
    const next = [];
    [normalized, folder].concat(this.getRecentPaths()).forEach((item) => {
      if (!item || next.includes(item)) return;
      next.push(item);
    });

    const limit = Number(this.settings.maxRecentPaths) || DEFAULT_SETTINGS.maxRecentPaths;
    this.settings.recentPaths = next.slice(0, Math.max(1, limit));
    await this.saveSettings();
  }

  getTemplateRules() {
    const rawRules = [];
    const seenFolders = new Set();
    const addRule = (rule) => {
      const normalized = this.normalizeTemplateRule(rule);
      if (!normalized || seenFolders.has(normalized.folder)) return;
      seenFolders.add(normalized.folder);
      rawRules.push(normalized);
    };

    const configuredRules = Array.isArray(this.settings.templateRules) ? this.settings.templateRules : [];
    const legacyRules = Array.isArray(this.settings.folderTemplates) ? this.settings.folderTemplates : [];
    configuredRules.forEach(addRule);
    legacyRules.forEach(addRule);
    if (!rawRules.length) DEFAULT_SETTINGS.templateRules.forEach(addRule);

    return rawRules.sort((a, b) => b.folder.length - a.folder.length);
  }

  formatTemplateRules(rules = this.getTemplateRules()) {
    return rules.map((rule) => `${rule.folder} => ${rule.template}`).join("\n");
  }

  repairTemplatePath(templatePath) {
    const template = this.normalizeVaultPath(templatePath);
    if (!template || this.hasFileExtension(template)) return template;

    const markdownTemplate = `${template}.md`;
    if (this.app.vault.getAbstractFileByPath(markdownTemplate) instanceof TFile) {
      return markdownTemplate;
    }

    return template;
  }

  normalizeTemplateRule(rule) {
    if (!rule) return null;
    const folder = this.normalizeVaultPath(rule.folder);
    const template = this.repairTemplatePath(rule.template);
    if (!folder || !template) return null;
    return { folder, template };
  }

  async saveTemplateRules(rules) {
    const nextRules = [];
    const seenFolders = new Set();

    (Array.isArray(rules) ? rules : []).forEach((rule) => {
      const normalized = this.normalizeTemplateRule(rule);
      if (!normalized || seenFolders.has(normalized.folder)) return;
      seenFolders.add(normalized.folder);
      nextRules.push(normalized);
    });

    this.settings.templateRules = nextRules;
    await this.saveSettings();
    return nextRules.length;
  }

  parseTemplateRuleLine(line) {
    const trimmed = String(line || "").trim();
    if (!trimmed || trimmed.startsWith("#")) return null;

    const separator = ["=>", "->", "→", "|"].find((item) => trimmed.includes(item));
    if (!separator) return null;

    const index = trimmed.indexOf(separator);
    return this.normalizeTemplateRule({
      folder: trimmed.slice(0, index),
      template: trimmed.slice(index + separator.length),
    });
  }

  parseTemplateRules(value) {
    return String(value || "")
      .split("\n")
      .map((line) => this.parseTemplateRuleLine(line))
      .filter(Boolean);
  }

  getTemplateRuleForTarget(targetPath) {
    const { folder } = this.splitPath(targetPath);
    return this.getTemplateRules().find((item) => folder === item.folder || folder.startsWith(`${item.folder}/`)) || null;
  }

  getTemplatePathForTarget(targetPath) {
    const rule = this.getTemplateRuleForTarget(targetPath);
    if (rule) return rule.template;
    return this.normalizeVaultPath(this.settings.templatePath || "");
  }

  resolveTemplatePathForTarget(targetPath) {
    const rule = this.getTemplateRuleForTarget(targetPath);
    const fallback = this.normalizeVaultPath(this.settings.templatePath || "");
    const candidates = [];

    if (rule && rule.template) {
      candidates.push({ path: rule.template, source: "rule" });
    }
    if (fallback && (!rule || fallback !== rule.template)) {
      candidates.push({ path: fallback, source: "fallback" });
    }

    for (const candidate of candidates) {
      if (this.app.vault.getAbstractFileByPath(candidate.path) instanceof TFile) {
        return { path: candidate.path, source: candidate.source, missingPath: "" };
      }
    }

    return {
      path: "",
      source: candidates.length ? candidates[0].source : "none",
      missingPath: candidates.length ? candidates[0].path : "",
    };
  }

  getStartFolder() {
    if (this.settings.rememberLastFolder && this.settings.lastFolder) {
      return this.settings.lastFolder;
    }
    return this.settings.defaultFolder || "";
  }

  getCurrentFolder() {
    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile) return this.getStartFolder();
    const parent = activeFile.parent;
    return parent && parent.path ? parent.path : "";
  }

  openNewFileModal(options = {}) {
    new NewFileModal(this.app, this, options).open();
  }

  openPathPrompt(options = {}) {
    new FullPathModal(this.app, this, options).open();
  }

  normalizeVaultPath(path) {
    const raw = String(path || "").replace(/\\/g, "/").trim().replace(/^\/+/, "");
    const parts = [];

    raw.split("/").forEach((part) => {
      if (!part || part === ".") return;
      if (part === "..") {
        parts.pop();
        return;
      }
      parts.push(part);
    });

    const joined = parts.join("/");
    return joined ? normalizePath(joined) : "";
  }

  cleanFileName(name) {
    return String(name || "")
      .trim()
      .replace(/[\\:*?"<>|]/g, "-")
      .replace(/\s+/g, " ");
  }

  hasFileExtension(path) {
    const lastPart = path.split("/").pop() || "";
    return /\.[^./\\]+$/.test(lastPart);
  }

  addDefaultExtension(path) {
    const extension = String(this.settings.defaultExtension || "md").replace(/^\./, "").trim();
    if (!extension || this.hasFileExtension(path)) return path;
    return `${path}.${extension}`;
  }

  joinPath(folder, name) {
    const cleanFolder = this.normalizeVaultPath(folder || "");
    const cleanName = this.normalizeVaultPath(name || "");
    if (!cleanFolder) return cleanName;
    if (!cleanName) return cleanFolder;
    return normalizePath(`${cleanFolder}/${cleanName}`);
  }

  splitPath(path) {
    const normalized = this.normalizeVaultPath(path);
    const index = normalized.lastIndexOf("/");
    if (index === -1) return { folder: "", basename: normalized };
    return {
      folder: normalized.slice(0, index),
      basename: normalized.slice(index + 1),
    };
  }

  async exists(path) {
    return await this.app.vault.adapter.exists(path);
  }

  async ensureFolder(folderPath) {
    const normalized = this.normalizeVaultPath(folderPath);
    if (!normalized) return;

    const parts = normalized.split("/").filter(Boolean);
    let current = "";

    for (const part of parts) {
      current = current ? `${current}/${part}` : part;
      const abstractFile = this.app.vault.getAbstractFileByPath(current);
      if (abstractFile instanceof TFile) {
        throw new Error(`A file already exists where a folder is needed: ${current}`);
      }
      if (!abstractFile) {
        await this.app.vault.createFolder(current);
      }
    }
  }

  async getUniquePath(path) {
    let target = this.normalizeVaultPath(path);
    if (!(await this.exists(target))) return target;
    if (!this.settings.autoIncrementDuplicates) {
      throw new Error(`File already exists: ${target}`);
    }

    const { folder, basename } = this.splitPath(target);
    const dotIndex = basename.lastIndexOf(".");
    const stem = dotIndex > 0 ? basename.slice(0, dotIndex) : basename;
    const ext = dotIndex > 0 ? basename.slice(dotIndex) : "";

    let counter = 1;
    while (counter < 10000) {
      const candidateName = `${stem} ${counter}${ext}`;
      const candidate = this.joinPath(folder, candidateName);
      if (!(await this.exists(candidate))) return candidate;
      counter += 1;
    }

    throw new Error("Could not find a unique file name.");
  }

  async renderTemplate(targetPath, explicitTemplatePath = "") {
    const templatePath = explicitTemplatePath || this.getTemplatePathForTarget(targetPath);
    if (!templatePath) return "";

    const templateFile = this.app.vault.getAbstractFileByPath(templatePath);
    if (!(templateFile instanceof TFile)) {
      new Notice(`Template not found: ${templatePath}`);
      return "";
    }

    const raw = await this.app.vault.read(templateFile);
    const { folder, basename } = this.splitPath(targetPath);
    const title = basename.replace(/\.[^/.]+$/, "");
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");

    return raw
      .replace(/{{\s*title\s*}}/gi, title)
      .replace(/{{\s*folder\s*}}/gi, folder)
      .replace(/{{\s*date\s*}}/gi, `${yyyy}-${mm}-${dd}`)
      .replace(/{{\s*time\s*}}/gi, `${hh}:${min}`);
  }

  async createFileInFolder(folder, fileName) {
    const cleanName = this.cleanFileName(fileName);
    if (!cleanName) throw new Error("File name is empty.");

    let path = this.joinPath(folder, cleanName);
    path = this.addDefaultExtension(path);
    return await this.createFileAtPath(path);
  }

  async createFileAtPath(path) {
    let targetPath = this.normalizeVaultPath(path);
    if (!targetPath) throw new Error("Path is empty.");
    targetPath = this.addDefaultExtension(targetPath);

    const { folder } = this.splitPath(targetPath);
    await this.ensureFolder(folder);

    const uniquePath = await this.getUniquePath(targetPath);
    const template = this.resolveTemplatePathForTarget(uniquePath);
    if (template.missingPath) {
      new Notice(`Template not found: ${template.missingPath}`);
    }
    const content = template.path ? await this.renderTemplate(uniquePath, template.path) : "";
    const file = await this.app.vault.create(uniquePath, content);

    if (this.settings.rememberLastFolder) {
      this.settings.lastFolder = folder;
    }
    await this.rememberRecentPath(uniquePath);

    if (this.settings.openAfterCreate) {
      await this.app.workspace.getLeaf(false).openFile(file);
    }

    new Notice(template.path ? `Created ${uniquePath} from ${template.path}` : `Created ${uniquePath}`);
    return file;
  }

  resolvePromptPath(rawPath, initialFolder = "") {
    const raw = String(rawPath || "").trim().replace(/\\/g, "/");
    if (!raw) return "";

    if (raw.startsWith("./") || raw.startsWith("../")) {
      return this.normalizeVaultPath(`${this.getCurrentFolder()}/${raw}`);
    }

    if (raw.startsWith("/")) {
      return this.normalizeVaultPath(raw);
    }

    return this.joinPath(initialFolder, raw);
  }

  getPathSuggestionCandidates() {
    const candidates = [];
    const seen = new Set();

    const add = (path, type, source) => {
      const normalized = this.normalizeVaultPath(path);
      if (!normalized || seen.has(`${type}:${normalized}`)) return;
      seen.add(`${type}:${normalized}`);
      candidates.push({ path: normalized, type, source });
    };

    this.getRecentPaths().forEach((path) => {
      const existing = this.app.vault.getAbstractFileByPath(path);
      add(path, existing instanceof TFile ? "file" : "folder", "Recent");
    });

    const quickFolders = Array.isArray(this.settings.quickFolders) ? this.settings.quickFolders : [];
    quickFolders.forEach((folder) => add(folder, "folder", "Quick"));

    for (const file of this.app.vault.getAllLoadedFiles()) {
      if (file instanceof TFolder && file.path) add(file.path, "folder", "Folder");
      if (file instanceof TFile && file.path) add(file.path, "file", "File");
    }

    return candidates;
  }

  getPathSuggestions(rawPath, limit = 10) {
    const raw = String(rawPath || "").replace(/\\/g, "/").trimStart();
    const fromRoot = raw.startsWith("/");
    const query = this.normalizeVaultPath(raw);
    const lowerQuery = query.toLowerCase();
    const lastSlash = query.lastIndexOf("/");
    const parent = lastSlash === -1 ? "" : query.slice(0, lastSlash);
    const leaf = lastSlash === -1 ? query : query.slice(lastSlash + 1);
    const lowerLeaf = leaf.toLowerCase();

    return this.getPathSuggestionCandidates()
      .map((candidate) => {
        const path = candidate.path;
        const displayPath = candidate.type === "folder" ? `${path}/` : path;
        const value = fromRoot ? `/${displayPath}` : displayPath;
        const lowerPath = path.toLowerCase();
        const candidateParent = this.splitPath(path).folder;
        const candidateLeaf = path.split("/").pop() || path;
        const lowerCandidateLeaf = candidateLeaf.toLowerCase();

        let score = 0;
        if (!lowerQuery) score = candidate.source === "Recent" ? 90 : candidate.source === "Quick" ? 80 : 10;
        else if (lowerPath.startsWith(lowerQuery)) score = 70;
        else if (candidateParent === parent && lowerCandidateLeaf.startsWith(lowerLeaf)) score = 60;
        else if (lowerCandidateLeaf.includes(lowerLeaf) && lowerLeaf.length >= 2) score = 35;
        else if (lowerPath.includes(lowerQuery) && lowerQuery.length >= 2) score = 20;

        if (candidate.source === "Recent") score += 12;
        if (candidate.source === "Quick") score += 8;
        if (candidate.type === "folder") score += 4;

        return {
          value,
          path: displayPath,
          source: candidate.source,
          type: candidate.type,
          score,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
      .slice(0, limit);
  }

  async createFolderAtPath(path) {
    const folderPath = this.normalizeVaultPath(path.replace(/\/$/, ""));
    if (!folderPath) throw new Error("Folder path is empty.");

    const existing = this.app.vault.getAbstractFileByPath(folderPath);
    if (existing instanceof TFolder) {
      await this.rememberRecentPath(folderPath);
      new Notice(`Folder already exists: ${folderPath}`);
      return existing;
    }
    if (existing instanceof TFile) {
      throw new Error(`A file already exists at: ${folderPath}`);
    }

    await this.ensureFolder(folderPath);
    await this.rememberRecentPath(folderPath);
    new Notice(`Created folder ${folderPath}`);
    return this.app.vault.getAbstractFileByPath(folderPath);
  }

  getFolders() {
    const root = this.app.vault.getRoot();
    const folders = [root];

    for (const file of this.app.vault.getAllLoadedFiles()) {
      if (file instanceof TFolder && file.path) folders.push(file);
    }

    return folders.sort((a, b) => (a.path || "").localeCompare(b.path || ""));
  }
};

class NewFileModal extends Modal {
  constructor(app, plugin, options = {}) {
    super(app);
    this.plugin = plugin;
    this.folder = options.folder || "";
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("vnf-modal");

    contentEl.createEl("h2", { text: "Create new file" });

    const folderRow = contentEl.createDiv({ cls: "vnf-row" });
    folderRow.createEl("label", { text: "Folder" });
    const folderControl = folderRow.createDiv({ cls: "vnf-control" });
    const folderInput = folderControl.createEl("input", {
      type: "text",
      value: this.folder,
      placeholder: "Folder path, empty = vault root",
    });
    folderInput.addClass("vnf-input");

    const browseButton = folderControl.createEl("button", { text: "Browse" });
    browseButton.addEventListener("click", () => {
      new FolderSuggestModal(this.app, this.plugin, (folder) => {
        folderInput.value = folder;
        fileInput.focus();
      }).open();
    });

    const quickFolders = Array.isArray(this.plugin.settings.quickFolders) ? this.plugin.settings.quickFolders : [];
    if (quickFolders.length) {
      const quick = contentEl.createDiv({ cls: "vnf-chips" });
      quickFolders.forEach((folder) => {
        const chip = quick.createEl("button", { text: folder || "/" });
        chip.addClass("vnf-chip");
        chip.addEventListener("click", () => {
          folderInput.value = folder;
          fileInput.focus();
        });
      });
    }

    const fileRow = contentEl.createDiv({ cls: "vnf-row" });
    fileRow.createEl("label", { text: "File name" });
    const fileInput = fileRow.createEl("input", {
      type: "text",
      placeholder: "New note name",
    });
    fileInput.addClass("vnf-input");

    const hint = contentEl.createDiv({ cls: "vnf-hint" });
    hint.setText("No extension = default extension. You can also type sub/path/name to create folders inside the selected folder.");

    const buttonRow = contentEl.createDiv({ cls: "vnf-buttons" });
    const cancelButton = buttonRow.createEl("button", { text: "Cancel" });
    const createButton = buttonRow.createEl("button", { text: "Create" });
    createButton.addClass("mod-cta");

    const submit = async () => {
      try {
        await this.plugin.createFileInFolder(folderInput.value, fileInput.value);
        this.close();
      } catch (error) {
        new Notice(error.message || String(error));
      }
    };

    cancelButton.addEventListener("click", () => this.close());
    createButton.addEventListener("click", submit);

    fileInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") submit();
    });
    folderInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") fileInput.focus();
    });

    setTimeout(() => fileInput.focus(), 50);
  }

  onClose() {
    this.contentEl.empty();
  }
}

class FullPathModal extends Modal {
  constructor(app, plugin, options = {}) {
    super(app);
    this.plugin = plugin;
    this.initialFolder = this.plugin.normalizeVaultPath(options.folder || "");
    this.suggestions = [];
    this.selectedIndex = 0;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("vnf-modal");
    contentEl.createEl("h2", { text: "Advanced new file" });

    const row = contentEl.createDiv({ cls: "vnf-row" });
    row.createEl("label", { text: "File path" });
    const initialValue = this.initialFolder ? `${this.initialFolder}/` : "";
    const input = row.createEl("input", {
      type: "text",
      value: initialValue,
      placeholder: "04 - Notes/Atomic/My new note",
    });
    input.addClass("vnf-input");

    const suggestionsEl = contentEl.createDiv({ cls: "vnf-suggestions vnf-hidden" });

    const hint = contentEl.createDiv({ cls: "vnf-hint" });
    hint.setText("Autocomplete enabled. Tab accepts a suggestion. End with / to create a folder. Use ./ or ../ relative to the current note.");

    const templateStatus = contentEl.createDiv({ cls: "vnf-template-status" });

    const buttonRow = contentEl.createDiv({ cls: "vnf-buttons" });
    const cancelButton = buttonRow.createEl("button", { text: "Cancel" });
    const createButton = buttonRow.createEl("button", { text: "Create" });
    createButton.addClass("mod-cta");

    const submit = async () => {
      try {
        const rawPath = input.value.trim();
        const targetPath = this.plugin.resolvePromptPath(rawPath, "");
        if (rawPath.endsWith("/")) {
          await this.plugin.createFolderAtPath(targetPath);
        } else {
          await this.plugin.createFileAtPath(targetPath);
        }
        this.close();
      } catch (error) {
        new Notice(error.message || String(error));
      }
    };

    const renderSuggestions = () => {
      suggestionsEl.empty();
      if (!this.suggestions.length) {
        suggestionsEl.addClass("vnf-hidden");
        return;
      }

      suggestionsEl.removeClass("vnf-hidden");
      this.suggestions.forEach((suggestion, index) => {
        const item = suggestionsEl.createDiv({
          cls: `vnf-suggestion${index === this.selectedIndex ? " is-selected" : ""}`,
        });
        const path = item.createSpan({ cls: "vnf-suggestion-path", text: suggestion.path });
        if (suggestion.type === "folder") path.addClass("is-folder");
        item.createSpan({ cls: "vnf-suggestion-source", text: suggestion.source });

        item.addEventListener("mousedown", (event) => {
          event.preventDefault();
          acceptSuggestion(index);
        });
      });
    };

    const updateSuggestions = () => {
      this.suggestions = this.plugin.getPathSuggestions(input.value, 10);
      this.selectedIndex = Math.min(this.selectedIndex, Math.max(0, this.suggestions.length - 1));
      renderSuggestions();
      updateTemplateStatus();
    };

    const updateTemplateStatus = () => {
      const rawPath = input.value.trim();
      templateStatus.empty();
      templateStatus.removeClass("is-applied");
      templateStatus.removeClass("is-missing");
      templateStatus.removeClass("is-none");

      if (!rawPath) {
        templateStatus.addClass("is-none");
        templateStatus.setText("Template: none");
        return;
      }

      if (rawPath.endsWith("/")) {
        templateStatus.addClass("is-none");
        templateStatus.setText("Template: none for folders");
        return;
      }

      const targetPath = this.plugin.addDefaultExtension(this.plugin.resolvePromptPath(rawPath, ""));
      const template = this.plugin.resolveTemplatePathForTarget(targetPath);
      if (!template.path && !template.missingPath) {
        templateStatus.addClass("is-none");
        templateStatus.setText("Template: none");
        return;
      }

      if (template.path) {
        templateStatus.addClass("is-applied");
        templateStatus.setText(`Template: ${template.path}`);
        return;
      }

      templateStatus.addClass("is-missing");
      templateStatus.setText(`Template missing: ${template.missingPath}`);
    };

    const acceptSuggestion = (index = this.selectedIndex) => {
      const suggestion = this.suggestions[index];
      if (!suggestion) return false;
      input.value = suggestion.value;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      updateSuggestions();
      return true;
    };

    cancelButton.addEventListener("click", () => this.close());
    createButton.addEventListener("click", submit);
    input.addEventListener("input", updateSuggestions);
    input.addEventListener("focus", updateSuggestions);
    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" && this.suggestions.length) {
        event.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % this.suggestions.length;
        renderSuggestions();
        return;
      }

      if (event.key === "ArrowUp" && this.suggestions.length) {
        event.preventDefault();
        this.selectedIndex = (this.selectedIndex - 1 + this.suggestions.length) % this.suggestions.length;
        renderSuggestions();
        return;
      }

      if (event.key === "Tab" && this.suggestions.length) {
        event.preventDefault();
        acceptSuggestion();
        return;
      }

      if (event.key === "Escape" && this.suggestions.length) {
        event.preventDefault();
        this.suggestions = [];
        renderSuggestions();
        return;
      }

      if (event.key === "Enter") submit();
    });

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      updateSuggestions();
    }, 50);
  }

  onClose() {
    this.contentEl.empty();
  }
}

class NewFolderModal extends Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("vnf-modal");
    contentEl.createEl("h2", { text: "Create new folder" });

    const row = contentEl.createDiv({ cls: "vnf-row" });
    row.createEl("label", { text: "Folder path" });
    const input = row.createEl("input", {
      type: "text",
      placeholder: "04 - Notes/Atomic/New folder",
    });
    input.addClass("vnf-input");

    const buttonRow = contentEl.createDiv({ cls: "vnf-buttons" });
    const cancelButton = buttonRow.createEl("button", { text: "Cancel" });
    const createButton = buttonRow.createEl("button", { text: "Create" });
    createButton.addClass("mod-cta");

    const submit = async () => {
      try {
        await this.plugin.createFolderAtPath(input.value);
        this.close();
      } catch (error) {
        new Notice(error.message || String(error));
      }
    };

    cancelButton.addEventListener("click", () => this.close());
    createButton.addEventListener("click", submit);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") submit();
    });

    setTimeout(() => input.focus(), 50);
  }

  onClose() {
    this.contentEl.empty();
  }
}

class FolderSuggestModal extends FuzzySuggestModal {
  constructor(app, plugin, onChoose) {
    super(app);
    this.plugin = plugin;
    this.onChoose = onChoose;
    this.setPlaceholder("Choose folder");
  }

  getItems() {
    return this.plugin.getFolders();
  }

  getItemText(folder) {
    return folder.path || "/";
  }

  onChooseItem(folder) {
    this.onChoose(folder.path || "");
  }
}

class VaultNewFileSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "Advanced New File" });

    new Setting(containerEl)
      .setName("Default folder")
      .setDesc("Used by the main create command when last folder is not remembered. Empty means vault root.")
      .addText((text) => {
        text
          .setPlaceholder("00 - Inbox")
          .setValue(this.plugin.settings.defaultFolder)
          .onChange(async (value) => {
            this.plugin.settings.defaultFolder = this.plugin.normalizeVaultPath(value);
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Default extension")
      .setDesc("Added when the new file name has no extension.")
      .addText((text) => {
        text
          .setPlaceholder("md")
          .setValue(this.plugin.settings.defaultExtension)
          .onChange(async (value) => {
            this.plugin.settings.defaultExtension = value.replace(/^\./, "").trim() || "md";
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Template path")
      .setDesc("Fallback template when no folder rule matches. Supports {{title}}, {{folder}}, {{date}}, and {{time}}.")
      .addText((text) => {
        text
          .setPlaceholder("99 - Templates/Atomic Note.md")
          .setValue(this.plugin.settings.templatePath)
          .onChange(async (value) => {
            this.plugin.settings.templatePath = this.plugin.normalizeVaultPath(value);
            await this.plugin.saveSettings();
          });
      });

    const templateSection = containerEl.createDiv({ cls: "vnf-settings-section" });
    templateSection.createEl("h3", { text: "Template rules" });
    templateSection.createEl("p", {
      cls: "setting-item-description",
      text: "The longest matching folder wins. Edit rows, then press Save template rules.",
    });

    const templateRowsEl = templateSection.createDiv({ cls: "vnf-template-rule-list" });
    let templateDraft = this.plugin.getTemplateRules().map((rule) => Object.assign({}, rule));

    const renderTemplateRows = () => {
      templateRowsEl.empty();

      templateDraft.forEach((rule, index) => {
        const row = templateRowsEl.createDiv({ cls: "vnf-template-rule-row" });
        const folderInput = row.createEl("input", {
          type: "text",
          value: rule.folder,
          placeholder: "Folder, e.g. 04 - Notes/Atomic",
        });
        folderInput.addClass("vnf-template-rule-folder");
        const templateInput = row.createEl("input", {
          type: "text",
          value: rule.template,
          placeholder: "Template, e.g. 99 - Templates/Atomic Note.md",
        });
        templateInput.addClass("vnf-template-rule-template");
        const removeButton = row.createEl("button", { text: "Remove" });

        folderInput.addEventListener("input", () => {
          templateDraft[index].folder = folderInput.value;
        });
        templateInput.addEventListener("input", () => {
          templateDraft[index].template = templateInput.value;
        });
        removeButton.addEventListener("click", () => {
          templateDraft.splice(index, 1);
          renderTemplateRows();
        });
      });

      if (!templateDraft.length) {
        templateRowsEl.createDiv({
          cls: "vnf-template-rule-empty",
          text: "No template rules. Add a row or restore defaults.",
        });
      }
    };

    const templateActions = templateSection.createDiv({ cls: "vnf-template-rule-actions" });
    const addRuleButton = templateActions.createEl("button", { text: "Add template rule" });
    const saveRulesButton = templateActions.createEl("button", { text: "Save template rules" });
    saveRulesButton.addClass("mod-cta");
    const restoreRulesButton = templateActions.createEl("button", { text: "Restore defaults" });

    addRuleButton.addEventListener("click", () => {
      templateDraft.push({ folder: "", template: "" });
      renderTemplateRows();
    });
    saveRulesButton.addEventListener("click", async () => {
      const count = await this.plugin.saveTemplateRules(templateDraft);
      new Notice(`Saved ${count} template rules`);
      this.display();
    });
    restoreRulesButton.addEventListener("click", async () => {
      templateDraft = DEFAULT_SETTINGS.templateRules.map((rule) => Object.assign({}, rule));
      const count = await this.plugin.saveTemplateRules(templateDraft);
      new Notice(`Restored ${count} default template rules`);
      this.display();
    });

    renderTemplateRows();

    new Setting(containerEl)
      .setName("Open after create")
      .setDesc("Open the new file immediately after creation.")
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.openAfterCreate)
          .onChange(async (value) => {
            this.plugin.settings.openAfterCreate = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Remember last folder")
      .setDesc("Use the last selected folder the next time the main command runs.")
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.rememberLastFolder)
          .onChange(async (value) => {
            this.plugin.settings.rememberLastFolder = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Auto-increment duplicate names")
      .setDesc("If a file already exists, create 'Name 1.md', 'Name 2.md', etc.")
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.autoIncrementDuplicates)
          .onChange(async (value) => {
            this.plugin.settings.autoIncrementDuplicates = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Recent path limit")
      .setDesc("How many recently created paths should appear at the top of suggestions.")
      .addText((text) => {
        text
          .setPlaceholder("12")
          .setValue(String(this.plugin.settings.maxRecentPaths || DEFAULT_SETTINGS.maxRecentPaths))
          .onChange(async (value) => {
            const parsed = Number.parseInt(value, 10);
            this.plugin.settings.maxRecentPaths = Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_SETTINGS.maxRecentPaths;
            this.plugin.settings.recentPaths = this.plugin.getRecentPaths().slice(0, this.plugin.settings.maxRecentPaths);
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Recent paths")
      .setDesc("Clear remembered file and folder paths from suggestions.")
      .addButton((button) => {
        button
          .setButtonText("Clear")
          .onClick(async () => {
            this.plugin.settings.recentPaths = [];
            await this.plugin.saveSettings();
            this.display();
          });
      });

    new Setting(containerEl)
      .setName("Quick folders")
      .setDesc("One folder per line. These appear as buttons and commands after Obsidian reloads.")
      .addTextArea((text) => {
        text
          .setPlaceholder("00 - Inbox\n04 - Notes/Atomic")
          .setValue((this.plugin.settings.quickFolders || []).join("\n"))
          .onChange(async (value) => {
            this.plugin.settings.quickFolders = value
              .split("\n")
              .map((line) => this.plugin.normalizeVaultPath(line))
              .filter(Boolean);
            await this.plugin.saveSettings();
          });
        text.inputEl.rows = 8;
        text.inputEl.cols = 40;
      });
  }
}
