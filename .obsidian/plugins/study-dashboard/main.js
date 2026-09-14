const {
  Plugin,
  ItemView,
  PluginSettingTab,
  Setting,
  Modal,
  Notice,
  MarkdownView,
  getAllTags,
  setIcon,
  moment,
  normalizePath,
} = require("obsidian");

const VIEW_TYPE = "study-dashboard-view";
const NOTES_PAGE_SIZE = 10;
const NORMAL_NOTE_TEMPLATE_PATH = ".obsidian/templates/通用文档模板.md";

const DEFAULT_DOMAIN_DEFINITIONS = [
  { name: "数学与公式", icon: "sigma", color: "#8b5cf6", keywords: ["高数", "数学", "线性代数", "矩阵", "行列式", "二次型", "导数", "积分", "微分", "向量", "无穷小"] },
  { name: "计算机网络", icon: "network", color: "#3b82f6", keywords: ["计算机网络", "计网", "网络协议", "tcp", "udp", "ip地址", "路由", "数据链路"] },
  { name: "人工智能", icon: "brain-circuit", color: "#ec4899", keywords: ["人工智能", "ai", "pca", "人脸识别", "回归分析", "n皇后", "斑马问题", "机器学习"] },
  { name: "项目与课设", icon: "folder-kanban", color: "#10b981", keywords: ["课程设计", "课设", "项目", "prd", "产品分析", "实验报告"] },
  { name: "课程与考试", icon: "graduation-cap", color: "#14b8a6", keywords: ["课程学习", "讲义", "复习", "题库", "考试", "重点笔记"] },
  { name: "英语学习", icon: "languages", color: "#0ea5e9", keywords: ["english", "英语", "单词", "语法"] },
  { name: "日记与记录", icon: "notebook-pen", color: "#f59e0b", keywords: ["日记", "每日", "周记", "见闻"] },
  { name: "文章与资讯", icon: "newspaper", color: "#f59e0b", keywords: ["文章", "新闻", "资讯", "写作", "文稿", "论文", "研究", "翻译", "资料"] },
];

const DEFAULT_NOTE_TYPE_DEFINITIONS = [
  { name: "普通笔记", icon: "file-text", keywords: [] },
  { name: "课程笔记", icon: "book-open", keywords: ["课程", "讲义", "知识点", "概念", "复习"] },
  { name: "习题与试卷", icon: "list-checks", keywords: ["习题", "练习", "题库", "试卷", "答案"] },
  { name: "实验与实践", icon: "flask-conical", keywords: ["实验", "实践", "实训", "演示"] },
  { name: "项目文档", icon: "folder-kanban", keywords: ["项目", "课设", "设计", "prd", "报告"] },
  { name: "日记与记录", icon: "notebook-pen", keywords: ["日记", "每日", "周记", "见闻"] },
  { name: "文章与资料", icon: "newspaper", keywords: ["文章", "论文", "新闻", "资料", "翻译"] },
  { name: "灵感与想法", icon: "lightbulb", keywords: ["灵感", "想法", "随笔", "草稿"] },
];

const DEFAULT_PROPERTY_KEYS = {
  color: "归类颜色",
  icon: "归类图标",
  domain: "学习领域",
  noteType: "资料类型",
  status: "学习状态",
  priority: "优先级",
  mastery: "掌握程度",
  reviewCount: "复习次数",
  reviewInterval: "复习间隔",
  progressTracked: "进度已确认",
  lastReview: "上次复习",
  reviewDate: "下次复习",
};

const PORTABLE_SETTING_KEYS = [
  "groupMode",
  "excludedFolders",
  "maxRecent",
  "maxTasks",
  "autoDecorateFolders",
  "domainDefinitions",
  "noteTypeDefinitions",
  "uncategorizedDomain",
  "normalNoteTemplatePath",
  "journalFallbackFolder",
  "taskDueMarkers",
  "propertyKeys",
  "reviewRules",
];

const DEFAULT_SETTINGS = {
  openOnStartup: true,
  groupMode: "smart",
  excludedFolders: [".trash", "附件", "tmp", "tools", "系统", "模板", "生成图片"],
  maxRecent: 8,
  maxTasks: 14,
  autoDecorateFolders: true,
  organizerBootstrapped: false,
  organizerProfileVersion: 0,
  organizerVisuals: {},
  domainDefinitions: DEFAULT_DOMAIN_DEFINITIONS,
  noteTypeDefinitions: DEFAULT_NOTE_TYPE_DEFINITIONS,
  uncategorizedDomain: "其他笔记",
  normalNoteTemplatePath: NORMAL_NOTE_TEMPLATE_PATH,
  journalFallbackFolder: "日记",
  taskDueMarkers: ["📅", "due::"],
  propertyKeys: DEFAULT_PROPERTY_KEYS,
  reviewRules: {
    hard: { minimumDays: 1, factor: 1, mastery: 3 },
    normal: { minimumDays: 3, factor: 1.8, mastery: 9 },
    easy: { minimumDays: 7, factor: 2.5, mastery: 16 },
  },
};

const ORGANIZER_COLORS = [
  { name: "红色", value: "#ef4444" },
  { name: "橙色", value: "#f59e0b" },
  { name: "黄色", value: "#eab308" },
  { name: "绿色", value: "#10b981" },
  { name: "青色", value: "#14b8a6" },
  { name: "蓝色", value: "#3b82f6" },
  { name: "紫色", value: "#8b5cf6" },
  { name: "粉色", value: "#ec4899" },
  { name: "灰色", value: "#64748b" },
];

const ORGANIZER_ICONS = [
  ["folder", "文件夹"],
  ["book-open", "学习"],
  ["graduation-cap", "课程"],
  ["folder-kanban", "项目"],
  ["notebook-pen", "日记"],
  ["sigma", "数学"],
  ["network", "网络"],
  ["brain-circuit", "人工智能"],
  ["languages", "英语"],
  ["newspaper", "文章"],
  ["image", "图片"],
  ["archive", "归档"],
  ["bookmark", "收藏"],
  ["file-text", "文档"],
  ["lightbulb", "灵感"],
  ["star", "重点"],
];

const LEARNING_STATUSES = [
  { name: "待整理", icon: "inbox", color: "#64748b", mastery: 10 },
  { name: "学习中", icon: "book-open-check", color: "#3b82f6", mastery: 45 },
  { name: "待复习", icon: "refresh-cw", color: "#f59e0b", mastery: 70 },
  { name: "已掌握", icon: "badge-check", color: "#10b981", mastery: 100 },
];

const LEARNING_PRIORITIES = [
  { name: "普通", icon: "minus", color: "#94a3b8" },
  { name: "重要", icon: "flag", color: "#f59e0b" },
  { name: "核心", icon: "star", color: "#ef4444" },
];

const SMART_COLLECTIONS = [
  { id: "review", name: "今日待复习", icon: "calendar-sync", color: "#f59e0b" },
  { id: "inbox", name: "待整理", icon: "inbox", color: "#64748b" },
  { id: "learning", name: "学习中", icon: "book-open-check", color: "#3b82f6" },
  { id: "core", name: "核心考点", icon: "star", color: "#ef4444" },
];

const REVIEW_RATINGS = [
  { id: "hard", name: "困难", icon: "brain-cog", color: "#ef4444", minimumDays: 1, factor: 1, mastery: 3 },
  { id: "normal", name: "一般", icon: "circle-check", color: "#f59e0b", minimumDays: 3, factor: 1.8, mastery: 9 },
  { id: "easy", name: "熟练", icon: "sparkles", color: "#10b981", minimumDays: 7, factor: 2.5, mastery: 16 },
];

function createIconButton(parent, icon, label, onClick, className = "") {
  const button = parent.createEl("button", {
    cls: `study-dashboard-icon-button ${className}`.trim(),
    attr: { "aria-label": label },
  });
  setIcon(button, icon);
  button.addEventListener("click", onClick);
  return button;
}

function normalizeTags(cache) {
  const tags = getAllTags(cache) || [];
  const frontmatterTags = cache?.frontmatter?.tags;
  if (Array.isArray(frontmatterTags)) tags.push(...frontmatterTags.map((tag) => `#${tag}`));
  else if (typeof frontmatterTags === "string") tags.push(`#${frontmatterTags}`);
  return [...new Set(tags.map((tag) => String(tag).replace(/^#/, "")))];
}

class NormalNoteModal extends Modal {
  constructor(app, folders, defaultFolder, onSubmit) {
    super(app);
    this.folders = folders;
    this.folder = defaultFolder || "";
    this.onSubmitCallback = onSubmit;
    this.title = "";
    this.submitting = false;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("study-dashboard-note-modal");
    contentEl.createEl("h2", { text: "新建模板文档" });
    contentEl.createEl("p", {
      cls: "study-dashboard-note-modal-desc",
      text: "填写文档名称并选择保存位置，系统会自动套用通用文档模板。",
    });

    let titleInput;
    new Setting(contentEl)
      .setName("文档名称")
      .setDesc("无需输入 .md 后缀。")
      .addText((text) => {
        titleInput = text;
        text
          .setPlaceholder("例如：计算机网络复习计划")
          .onChange((value) => {
            this.title = value;
          });
      });

    new Setting(contentEl)
      .setName("保存文件夹")
      .setDesc("选择根目录或一个顶层学习文件夹。")
      .addDropdown((dropdown) => {
        dropdown.addOption("", "根目录");
        for (const folder of this.folders) dropdown.addOption(folder, folder);
        dropdown.setValue(this.folder).onChange((value) => {
          this.folder = value;
        });
      });

    new Setting(contentEl)
      .setClass("study-dashboard-note-modal-actions")
      .addButton((button) =>
        button.setButtonText("取消").onClick(() => this.close()),
      )
      .addButton((button) =>
        button
          .setButtonText("创建文档")
          .setCta()
          .onClick(() => this.submit()),
      );

    this.scope.register([], "Enter", (event) => {
      event.preventDefault();
      this.submit();
    });
    window.setTimeout(() => titleInput?.inputEl?.focus(), 40);
  }

  async submit() {
    if (this.submitting) return;
    if (!this.title.trim()) {
      new Notice("请先填写文档名称。");
      return;
    }
    this.submitting = true;
    try {
      await this.onSubmitCallback({ title: this.title.trim(), folder: this.folder });
      this.close();
    } catch (error) {
      console.error("[Study Dashboard] 创建模板文档失败", error);
      new Notice("创建文档失败，请查看控制台错误。");
    } finally {
      this.submitting = false;
    }
  }

  onClose() {
    this.contentEl.empty();
  }
}

class OrganizerVisualModal extends Modal {
  constructor(app, plugin, target) {
    super(app);
    this.plugin = plugin;
    this.target = target;
    this.isFolder = plugin.isFolder(target);
    this.folderSummary = this.isFolder
      ? plugin.getFolderLearningSummary(target)
      : null;
    const initial = plugin.getResolvedOrganizerProfile(target);
    this.color = initial.color;
    this.icon = initial.icon;
    this.domain = initial.domain;
    this.noteType = initial.noteType;
    this.status = initial.status;
    this.priority = initial.priority;
    this.reviewDate = initial.reviewDate || "";
    this.mastery = initial.mastery;
  }

  onOpen() {
    const { contentEl } = this;
    const isFolder = this.plugin.isFolder(this.target);
    contentEl.empty();
    contentEl.addClass("study-organizer-modal");
    contentEl.createEl("h2", { text: isFolder ? "文件夹归类与外观" : "学习属性与外观" });
    contentEl.createEl("p", {
      cls: "study-organizer-modal-desc",
      text: isFolder
        ? `状态与掌握度由文件夹内的笔记自动汇总；这里设置归类、颜色和图标 · ${this.target.path}`
        : `文档学习属性 · ${this.target.path}`,
    });

    this.previewEl = contentEl.createDiv({ cls: "study-organizer-preview" });
    this.previewIconEl = this.previewEl.createSpan({ cls: "study-organizer-preview-icon" });
    const previewText = this.previewEl.createDiv({ cls: "study-organizer-preview-text" });
    previewText.createSpan({ cls: "study-organizer-preview-name", text: this.target.name });
    this.previewMetaEl = previewText.createDiv({ cls: "study-organizer-preview-meta" });

    contentEl.createEl("h3", { text: "学习归类" });
    const fields = contentEl.createDiv({ cls: "study-organizer-fields" });

    new Setting(fields)
      .setName("学习领域")
      .setDesc("决定学习总览中的课程分类。")
      .addDropdown((dropdown) => {
        const categories = this.plugin.getDomainDefinitions();
        if (this.domain && !categories.some((item) => item.name === this.domain)) {
          categories.push({ name: this.domain, icon: this.icon, color: this.color, keywords: [] });
        }
        for (const category of [...categories, { name: this.plugin.settings.uncategorizedDomain }]) {
          dropdown.addOption(category.name, category.name);
        }
        dropdown.addOption("__manage_study_domains__", "＋ 新建或管理学习领域…");
        dropdown.setValue(this.domain).onChange((value) => {
          if (value === "__manage_study_domains__") {
            this.close();
            this.app.setting.open();
            this.app.setting.openTabById(this.plugin.manifest.id);
            return;
          }
          this.domain = value;
          const category = this.plugin.getDomainDefinitions().find((item) => item.name === value);
          if (category) {
            this.color = category.color;
            this.icon = category.icon;
          }
          this.updateSelection();
        });
      });

    new Setting(fields)
      .setName("资料类型")
      .setDesc("用于区分笔记、习题、实验和项目。")
      .addDropdown((dropdown) => {
        const noteTypes = this.plugin.getNoteTypeDefinitions();
        if (this.noteType && !noteTypes.some((item) => item.name === this.noteType)) {
          noteTypes.push({ name: this.noteType, icon: this.icon, keywords: [] });
        }
        for (const type of noteTypes) dropdown.addOption(type.name, type.name);
        dropdown.addOption("__manage_note_types__", "＋ 新建或管理资料类型…");
        dropdown.setValue(this.noteType).onChange((value) => {
          if (value === "__manage_note_types__") {
            this.close();
            this.app.setting.open();
            this.app.setting.openTabById(this.plugin.manifest.id);
            return;
          }
          this.noteType = value;
          const type = this.plugin.getNoteTypeDefinitions().find((item) => item.name === value);
          if (type) this.icon = type.icon;
          this.updateSelection();
        });
      });

    if (!isFolder) {
      new Setting(fields)
        .setName("学习状态")
        .setDesc("状态会进入待整理、学习中和待复习集合。")
        .addDropdown((dropdown) => {
          for (const status of LEARNING_STATUSES) dropdown.addOption(status.name, status.name);
          dropdown.setValue(this.status).onChange((value) => {
            this.status = value;
            const statusInfo = LEARNING_STATUSES.find((item) => item.name === value);
            if (statusInfo) this.mastery = statusInfo.mastery;
            if (value === "待复习" && !this.reviewDate) this.reviewDate = moment().format("YYYY-MM-DD");
            this.updateSelection();
          });
        });

      new Setting(fields)
        .setName("优先级")
        .setDesc("核心内容会进入“核心考点”集合。")
        .addDropdown((dropdown) => {
          for (const priority of LEARNING_PRIORITIES) dropdown.addOption(priority.name, priority.name);
          dropdown.setValue(this.priority).onChange((value) => {
            this.priority = value;
            this.updateSelection();
          });
        });

      new Setting(fields)
        .setName("下次复习")
        .setDesc("到期后自动出现在今日待复习。")
        .addText((text) => {
          text.inputEl.type = "date";
          text.setValue(this.reviewDate).onChange((value) => {
            this.reviewDate = value;
            this.updateSelection();
          });
        });

      new Setting(fields)
        .setName("掌握程度")
        .setDesc("用于计算课程学习进度。")
        .addSlider((slider) =>
          slider
            .setLimits(0, 100, 5)
            .setDynamicTooltip()
            .setValue(this.mastery)
            .onChange((value) => {
              this.mastery = value;
              this.updateSelection();
            }),
        );
    }

    contentEl.createEl("h3", { text: "颜色标签" });
    this.colorGridEl = contentEl.createDiv({ cls: "study-organizer-color-grid" });
    for (const color of ORGANIZER_COLORS) {
      const button = this.colorGridEl.createEl("button", {
        cls: "study-organizer-color-choice",
        attr: { type: "button", title: color.name, "aria-label": color.name },
      });
      button.dataset.color = color.value;
      button.style.setProperty("--choice-color", color.value);
      button.createSpan({ cls: "study-organizer-color-swatch" });
      button.createSpan({ text: color.name });
      button.addEventListener("click", () => {
        this.color = color.value;
        this.updateSelection();
      });
    }

    contentEl.createEl("h3", { text: "识别图标" });
    this.iconGridEl = contentEl.createDiv({ cls: "study-organizer-icon-grid" });
    for (const [icon, label] of ORGANIZER_ICONS) {
      const button = this.iconGridEl.createEl("button", {
        cls: "study-organizer-icon-choice",
        attr: { type: "button", title: label, "aria-label": label },
      });
      button.dataset.icon = icon;
      const iconEl = button.createSpan();
      setIcon(iconEl, icon);
      button.createSpan({ text: label });
      button.addEventListener("click", () => {
        this.icon = icon;
        this.updateSelection();
      });
    }

    new Setting(contentEl)
      .setClass("study-organizer-modal-actions")
      .addButton((button) =>
        button
          .setButtonText("清除自定义")
          .setWarning()
          .onClick(async () => {
            await this.plugin.clearOrganizerVisual(this.target);
            this.close();
          }),
      )
      .addButton((button) => button.setButtonText("取消").onClick(() => this.close()))
      .addButton((button) =>
        button
          .setButtonText("应用")
          .setCta()
          .onClick(async () => {
            const visual = {
              icon: this.icon,
              color: this.color,
              domain: this.domain,
              noteType: this.noteType,
              automatic: false,
            };
            if (!isFolder) {
              Object.assign(visual, {
                status: this.status,
                priority: this.priority,
                reviewDate: this.reviewDate || null,
                mastery: this.mastery,
                progressTracked: true,
              });
            }
            await this.plugin.setOrganizerVisual(this.target, visual);
            this.close();
          }),
      );

    this.updateSelection();
  }

  updateSelection() {
    if (!this.previewEl) return;
    this.previewEl.style.setProperty("--organizer-color", this.color);
    this.previewIconEl.empty();
    setIcon(this.previewIconEl, this.icon);
    this.previewMetaEl.empty();
    const previewItems = this.isFolder
      ? [
        [this.domain, "is-domain"],
        [this.folderSummary?.status ? `自动 ${this.folderSummary.status}` : "暂无笔记", "is-status"],
        [`${this.folderSummary?.total || 0} 篇`, "is-type"],
        [`掌握 ${this.folderSummary?.mastery || 0}%`, "is-mastery"],
      ]
      : [
        [this.domain, "is-domain"],
        [this.noteType, "is-type"],
        [this.status, "is-status"],
        [this.priority, "is-priority"],
        [`掌握 ${this.mastery}%`, "is-mastery"],
      ];
    for (const [text, className] of previewItems) {
      this.previewMetaEl.createSpan({ cls: className, text });
    }
    for (const button of this.colorGridEl.querySelectorAll("button")) {
      const selected = button.dataset.color === this.color;
      button.toggleClass("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    }
    for (const button of this.iconGridEl.querySelectorAll("button")) {
      const selected = button.dataset.icon === this.icon;
      button.toggleClass("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    }
  }

  onClose() {
    this.contentEl.empty();
  }
}

class QuickOrganizerPopover {
  constructor(plugin, target, x, y) {
    this.plugin = plugin;
    this.target = target;
    this.x = x;
    this.y = y;
    this.profile = plugin.getResolvedOrganizerProfile(target);
    this.isFolder = plugin.isFolder(target);
    this.folderSummary = this.isFolder
      ? plugin.getFolderLearningSummary(target)
      : null;
    this.handleOutside = (event) => {
      if (!this.el?.contains(event.target)) this.close();
    };
    this.handleKey = (event) => {
      if (event.key === "Escape") this.close();
    };
  }

  open() {
    this.plugin.closeQuickOrganizer();
    this.plugin.quickOrganizer = this;
    this.el = document.body.createDiv({ cls: "study-organizer-quick" });
    this.el.addEventListener("click", (event) => event.stopPropagation());

    const header = this.el.createDiv({ cls: "study-organizer-quick-header" });
    const icon = header.createSpan({ cls: "study-organizer-quick-main-icon" });
    icon.style.setProperty("--quick-color", this.profile.color);
    setIcon(icon, this.profile.icon);
    const title = header.createDiv({ cls: "study-organizer-quick-title" });
    title.createEl("strong", { text: this.target.name });
    title.createSpan({ text: this.profile.domain });
    const close = header.createEl("button", {
      cls: "study-organizer-quick-close",
      attr: { type: "button", "aria-label": "关闭" },
    });
    setIcon(close, "x");
    close.addEventListener("click", () => this.close());

    if (this.isFolder) {
      const summary = this.folderSummary;
      const summaryEl = this.el.createDiv({ cls: "study-organizer-quick-folder-summary" });
      const summaryIcon = summaryEl.createSpan({ cls: "study-organizer-quick-folder-summary-icon" });
      const statusInfo = LEARNING_STATUSES.find((item) => item.name === summary?.status);
      summaryEl.style.setProperty("--quick-summary-color", statusInfo?.color || "#64748b");
      setIcon(summaryIcon, statusInfo?.icon || "folder");
      const summaryText = summaryEl.createDiv();
      summaryText.createEl("strong", {
        text: summary?.status ? `自动状态 · ${summary.status}` : "暂无可统计笔记",
      });
      summaryText.createSpan({
        text: summary?.total
          ? `${summary.total} 篇 · 掌握度 ${summary.mastery}% · ${summary.trackedCount}/${summary.total} 已确认`
          : "加入可学习的 Markdown 笔记后自动计算",
      });
    } else {
      this.renderButtonSection(
        "学习状态",
        LEARNING_STATUSES,
        this.profile.status,
        async (status) => {
          const info = LEARNING_STATUSES.find((item) => item.name === status);
          await this.apply({
            status,
            mastery: info?.mastery ?? this.profile.mastery,
            progressTracked: true,
            automatic: false,
          });
        },
      );

      this.renderButtonSection(
        "优先级",
        LEARNING_PRIORITIES,
        this.profile.priority,
        async (priority) => this.apply({ priority }),
      );

      const reviewSection = this.el.createDiv({ cls: "study-organizer-quick-section" });
      reviewSection.createDiv({ cls: "study-organizer-quick-label", text: "安排复习" });
      const reviewGrid = reviewSection.createDiv({ cls: "study-organizer-quick-review-grid" });
      for (const [label, days] of [["今天", 0], ["明天", 1], ["3天后", 3], ["7天后", 7]]) {
        const button = reviewGrid.createEl("button", { text: label, attr: { type: "button" } });
        button.addEventListener("click", () =>
          this.apply({
            status: "待复习",
            reviewDate: moment().add(days, "day").format("YYYY-MM-DD"),
            progressTracked: true,
            automatic: false,
          }),
        );
      }
    }

    const colorSection = this.el.createDiv({ cls: "study-organizer-quick-section" });
    colorSection.createDiv({ cls: "study-organizer-quick-label", text: "颜色" });
    const colorGrid = colorSection.createDiv({ cls: "study-organizer-quick-colors" });
    for (const color of ORGANIZER_COLORS) {
      const button = colorGrid.createEl("button", {
        cls: this.profile.color.toLocaleLowerCase() === color.value.toLocaleLowerCase() ? "is-active" : "",
        attr: { type: "button", title: color.name, "aria-label": color.name },
      });
      button.style.setProperty("--quick-color", color.value);
      button.addEventListener("click", () => this.apply({ color: color.value }));
    }

    const iconSection = this.el.createDiv({ cls: "study-organizer-quick-section" });
    iconSection.createDiv({ cls: "study-organizer-quick-label", text: "图标" });
    const iconGrid = iconSection.createDiv({ cls: "study-organizer-quick-icons" });
    for (const [iconName, iconLabel] of ORGANIZER_ICONS) {
      const button = iconGrid.createEl("button", {
        cls: this.profile.icon === iconName ? "is-active" : "",
        attr: { type: "button", title: iconLabel, "aria-label": iconLabel },
      });
      setIcon(button, iconName);
      button.addEventListener("click", () => this.apply({ icon: iconName }));
    }

    const footer = this.el.createDiv({ cls: "study-organizer-quick-footer" });
    const suggested = footer.createEl("button", { text: "恢复智能建议", attr: { type: "button" } });
    suggested.addEventListener("click", async () => {
      await this.plugin.applySuggestedProfile(this.target);
      this.close();
    });
    const details = footer.createEl("button", { cls: "mod-cta", text: "完整设置…", attr: { type: "button" } });
    details.addEventListener("click", () => {
      this.close();
      this.plugin.openOrganizerModal(this.target);
    });

    this.position();
    window.setTimeout(() => {
      document.addEventListener("pointerdown", this.handleOutside, true);
      document.addEventListener("keydown", this.handleKey, true);
    }, 0);
    return this;
  }

  renderButtonSection(label, items, selected, onSelect) {
    const section = this.el.createDiv({ cls: "study-organizer-quick-section" });
    section.createDiv({ cls: "study-organizer-quick-label", text: label });
    const grid = section.createDiv({ cls: "study-organizer-quick-button-grid" });
    for (const item of items) {
      const button = grid.createEl("button", {
        cls: selected === item.name ? "is-active" : "",
        attr: { type: "button" },
      });
      button.style.setProperty("--quick-color", item.color);
      const icon = button.createSpan();
      setIcon(icon, item.icon);
      button.createSpan({ text: item.name });
      button.addEventListener("click", () => onSelect(item.name));
    }
  }

  async apply(patch) {
    await this.plugin.setOrganizerVisual(this.target, patch, { showNotice: false });
    new Notice(`已快速更新“${this.target.name}”。`);
    this.close();
  }

  position() {
    this.el.style.left = `${this.x}px`;
    this.el.style.top = `${this.y}px`;
    window.requestAnimationFrame(() => {
      if (!this.el) return;
      const rect = this.el.getBoundingClientRect();
      const left = Math.max(10, Math.min(this.x, window.innerWidth - rect.width - 10));
      const top = Math.max(10, Math.min(this.y, window.innerHeight - rect.height - 10));
      this.el.style.left = `${left}px`;
      this.el.style.top = `${top}px`;
    });
  }

  close() {
    document.removeEventListener("pointerdown", this.handleOutside, true);
    document.removeEventListener("keydown", this.handleKey, true);
    this.el?.remove();
    this.el = null;
    if (this.plugin.quickOrganizer === this) this.plugin.quickOrganizer = null;
  }
}

class BatchOrganizerModal extends Modal {
  constructor(app, plugin, targets, onDone) {
    super(app);
    this.plugin = plugin;
    this.targets = targets;
    this.onDone = onDone;
    this.status = "";
    this.priority = "";
    this.reviewOption = "none";
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("study-organizer-batch-modal");
    contentEl.createEl("h2", { text: `批量修改 ${this.targets.length} 篇笔记` });
    contentEl.createEl("p", {
      text: "只会修改已选择的项目；保留“不修改”的字段不会被覆盖。",
      cls: "study-organizer-modal-desc",
    });

    new Setting(contentEl).setName("学习状态").addDropdown((dropdown) => {
      dropdown.addOption("", "不修改");
      for (const status of LEARNING_STATUSES) dropdown.addOption(status.name, status.name);
      dropdown.onChange((value) => { this.status = value; });
    });
    new Setting(contentEl).setName("优先级").addDropdown((dropdown) => {
      dropdown.addOption("", "不修改");
      for (const priority of LEARNING_PRIORITIES) dropdown.addOption(priority.name, priority.name);
      dropdown.onChange((value) => { this.priority = value; });
    });
    new Setting(contentEl).setName("复习日期").addDropdown((dropdown) =>
      dropdown
        .addOption("none", "不修改")
        .addOption("clear", "清除日期")
        .addOption("today", "今天")
        .addOption("tomorrow", "明天")
        .addOption("3", "3天后")
        .addOption("7", "7天后")
        .onChange((value) => { this.reviewOption = value; }),
    );

    new Setting(contentEl)
      .setClass("study-organizer-modal-actions")
      .addButton((button) => button.setButtonText("取消").onClick(() => this.close()))
      .addButton((button) => button.setButtonText("应用到已选").setCta().onClick(() => this.submit()));
  }

  async submit() {
    const patch = {};
    if (this.status) {
      patch.status = this.status;
      patch.mastery =
        LEARNING_STATUSES.find((status) => status.name === this.status)?.mastery ?? 10;
      patch.progressTracked = true;
      patch.automatic = false;
    }
    if (this.priority) patch.priority = this.priority;
    if (this.reviewOption !== "none") {
      const offsets = { today: 0, tomorrow: 1, "3": 3, "7": 7 };
      patch.reviewDate = this.reviewOption === "clear"
        ? null
        : moment().add(offsets[this.reviewOption], "day").format("YYYY-MM-DD");
      if (patch.reviewDate) patch.status = "待复习";
      if (patch.reviewDate) {
        patch.progressTracked = true;
        patch.automatic = false;
      }
    }
    if (!Object.keys(patch).length) {
      new Notice("没有选择需要修改的属性。");
      return;
    }
    await this.plugin.batchUpdateOrganizer(this.targets, patch);
    this.onDone?.();
    this.close();
  }

  onClose() {
    this.contentEl.empty();
  }
}

class StudyDashboardView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.query = "";
    this.selectedCategory = null;
    this.selectedCollection = null;
    this.batchMode = false;
    this.selectedNotePaths = new Set();
    this.notesPage = 1;
    this.noteSort = "modified-desc";
    this.normalNoteFolder = "";
    this.selectedDate = moment().format("YYYY-MM-DD");
    this.calendarMonth = moment().startOf("month");
    this.refreshTimer = null;
  }

  getViewType() {
    return VIEW_TYPE;
  }

  getDisplayText() {
    return "学习总览";
  }

  getIcon() {
    return "layout-dashboard";
  }

  async onOpen() {
    this.contentEl.addClass("study-dashboard-view");
    await this.render();
  }

  onClose() {
    if (this.refreshTimer) window.clearTimeout(this.refreshTimer);
  }

  scheduleRender() {
    if (this.refreshTimer) window.clearTimeout(this.refreshTimer);
    this.refreshTimer = window.setTimeout(() => this.render(), 280);
  }

  isExcluded(file) {
    return this.plugin.isPathExcluded(file.path);
  }

  getFolderVisual(name) {
    const matched = this.plugin.matchDefinition(name, this.plugin.getDomainDefinitions());
    if (matched) return { name, icon: matched.icon, color: matched.color };
    const suggested = this.plugin.suggestVisual(name, false);
    return { name, icon: suggested.icon || "folder", color: suggested.color || "#64748b" };
  }

  classify(file, cache, tags, profile) {
    const organizerVisual = profile || this.plugin.getResolvedOrganizerProfile(file, cache);
    const applyOrganizerVisual = (category) =>
      organizerVisual
        ? { ...category, icon: organizerVisual.icon, color: organizerVisual.color }
        : category;
    const frontmatterCategory =
      this.plugin.readLearningProperty(cache?.frontmatter, "domain") ||
      cache?.frontmatter?.dashboard_category ||
      cache?.frontmatter?.home_category;
    if (frontmatterCategory && typeof frontmatterCategory === "string") {
      return applyOrganizerVisual({ name: frontmatterCategory, icon: "bookmark", color: "#6366f1" });
    }

    const topFolder = file.path.includes("/") ? file.path.split("/")[0] : "未归档";
    if (this.plugin.settings.groupMode === "folder") {
      return applyOrganizerVisual(this.getFolderVisual(topFolder));
    }

    if (organizerVisual?.domain) {
      const domainCategory = this.plugin.getDomainDefinitions().find(
        (category) => category.name === organizerVisual.domain,
      );
      return applyOrganizerVisual(
        domainCategory || { name: organizerVisual.domain, icon: "bookmark", color: organizerVisual.color },
      );
    }

    const searchable = `${file.path} ${tags.join(" ")}`;
    const matched = this.plugin.matchDefinition(searchable, this.plugin.getDomainDefinitions());
    return applyOrganizerVisual(
      matched || { name: this.plugin.settings.uncategorizedDomain, icon: "archive", color: "#64748b" },
    );
  }

  async collectData() {
    const files = this.app.vault
      .getMarkdownFiles()
      .filter((file) => !this.isExcluded(file));

    const notes = files.map((file) => {
      const cache = this.app.metadataCache.getFileCache(file);
      const tags = normalizeTags(cache);
      const profile = this.plugin.getResolvedOrganizerProfile(file, cache);
      const category = this.classify(file, cache, tags, profile);
      return { file, cache, tags, category, profile };
    });

    const categoryMap = new Map();
    for (const note of notes) {
      if (!categoryMap.has(note.category.name)) {
        categoryMap.set(note.category.name, {
          ...note.category,
          notes: [],
        });
      }
      categoryMap.get(note.category.name).notes.push(note);
    }

    const categories = [...categoryMap.values()].map((category) => {
      const statusCounts = Object.fromEntries(
        LEARNING_STATUSES.map((status) => [status.name, 0]),
      );
      let masteryTotal = 0;
      let trackedCount = 0;
      for (const note of category.notes) {
        statusCounts[note.profile.status] = (statusCounts[note.profile.status] || 0) + 1;
        if (note.profile.progressTracked) trackedCount += 1;
        masteryTotal += this.plugin.getEffectiveMastery(note.profile);
      }
      return {
        ...category,
        statusCounts,
        trackedCount,
        aggregateStatus: this.plugin.deriveAggregateStatus(
          statusCounts,
          category.notes.length,
        ),
        mastery: category.notes.length ? Math.round(masteryTotal / category.notes.length) : 0,
      };
    }).sort(
      (a, b) => b.notes.length - a.notes.length || a.name.localeCompare(b.name, "zh-CN"),
    );

    const recent = [...notes]
      .sort((a, b) => b.file.stat.mtime - a.file.stat.mtime)
      .slice(0, this.plugin.settings.maxRecent);

    const tasks = [];
    await Promise.all(
      notes.map(async (note) => {
        const content = await this.app.vault.cachedRead(note.file);
        content.split("\n").forEach((line, index) => {
          const match = line.match(/^\s*[-*]\s+\[ \]\s+(.+)$/);
          if (!match) return;
          const text = match[1].trim();
          if (!text) return;
          const due = this.plugin.extractTaskDue(text);
          const priority = /🔺|⏫/.test(text) ? 0 : /🔼/.test(text) ? 1 : /🔽/.test(text) ? 3 : 2;
          tasks.push({
            text,
            rawLine: line,
            file: note.file,
            line: index,
            due,
            priority,
          });
        });
      }),
    );

    tasks.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      if (a.due && b.due) return a.due.localeCompare(b.due);
      if (a.due) return -1;
      if (b.due) return 1;
      return b.file.stat.mtime - a.file.stat.mtime;
    });

    const startOfToday = moment().startOf("day").valueOf();
    const updatedToday = notes.filter((note) => note.file.stat.mtime >= startOfToday).length;
    const today = moment().format("YYYY-MM-DD");
    const collectionNotes = {
      review: notes.filter(
        (note) =>
          (note.profile.reviewDate && note.profile.reviewDate <= today) ||
          (note.profile.status === "待复习" && !note.profile.reviewDate),
      ),
      inbox: notes.filter((note) => note.profile.status === "待整理"),
      learning: notes.filter((note) => note.profile.status === "学习中"),
      core: notes.filter((note) => note.profile.priority === "核心"),
    };
    const smartCollections = SMART_COLLECTIONS.map((collection) => ({
      ...collection,
      notes: collectionNotes[collection.id],
    }));

    const calendarRecords = new Map();
    const ensureCalendarDay = (date) => {
      if (!calendarRecords.has(date)) {
        calendarRecords.set(date, { tasks: [], notes: [], reviews: [] });
      }
      return calendarRecords.get(date);
    };

    for (const task of tasks) {
      if (task.due) ensureCalendarDay(task.due).tasks.push(task);
    }
    for (const note of notes) {
      const modifiedDate = moment(note.file.stat.mtime).format("YYYY-MM-DD");
      ensureCalendarDay(modifiedDate).notes.push(note);
      if (note.profile.reviewDate) ensureCalendarDay(note.profile.reviewDate).reviews.push(note);
    }

    return {
      notes,
      categories,
      recent,
      tasks: tasks.slice(0, this.plugin.settings.maxTasks),
      allTasks: tasks,
      totalTasks: tasks.length,
      updatedToday,
      smartCollections,
      dueReviewCount: collectionNotes.review.length,
      calendarRecords,
    };
  }

  async openNote(file, line = null) {
    await this.app.workspace.openLinkText(file.path, "", false);
    if (line === null) return;
    window.setTimeout(() => {
      const view = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (!view?.editor) return;
      view.setMode?.("source");
      view.editor.setCursor({ line, ch: 0 });
      view.editor.scrollIntoView(
        { from: { line, ch: 0 }, to: { line: Math.min(line + 2, view.editor.lineCount() - 1), ch: 0 } },
        true,
      );
      view.editor.focus();
    }, 120);
  }

  createActionButton(parent, icon, label, action) {
    const button = parent.createEl("button", { cls: "study-dashboard-action" });
    const iconEl = button.createSpan({ cls: "study-dashboard-action-icon" });
    setIcon(iconEl, icon);
    button.createSpan({ text: label });
    button.addEventListener("click", async () => {
      try {
        if (typeof action === "function") await action();
        else await this.app.commands.executeCommandById(action);
      } catch (error) {
        console.error("[Study Dashboard] 快捷操作失败", error);
        new Notice(`${label}操作失败，请查看控制台错误。`);
      }
    });
    return button;
  }

  async ensureFolder(folderPath) {
    if (!folderPath || folderPath === "/") return;
    const parts = normalizePath(folderPath).split("/").filter(Boolean);
    let currentPath = "";
    for (const part of parts) {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      if (!this.app.vault.getAbstractFileByPath(currentPath)) {
        await this.app.vault.createFolder(currentPath);
      }
    }
  }

  getNormalNoteFolders() {
    const excluded = new Set(this.plugin.settings.excludedFolders);
    return this.app.vault
      .getRoot()
      .children.filter(
        (item) =>
          Array.isArray(item.children) &&
          item.path &&
          !item.path.startsWith(".") &&
          !excluded.has(item.path),
      )
      .map((folder) => folder.path)
      .sort((a, b) => a.localeCompare(b, "zh-CN"));
  }

  renderNormalNoteTemplate(content, title) {
    const yamlTitle = title.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return this.renderJournalTemplate(content)
      .replace(/\{\{title_yaml\}\}/g, yamlTitle)
      .replace(/\{\{title\}\}/g, title);
  }

  getDefaultNormalNoteContent() {
    return [
      "---",
      '标题: "{{title_yaml}}"',
      `创建时间: ${moment().format("YYYY-MM-DD HH:mm")}`,
      "文档类型: 普通笔记",
      "状态: 草稿",
      "标签: []",
      "---",
      "",
      "# {{title}}",
      "",
      "> [!abstract] 摘要",
      "> 用一两句话概括这篇文档的主题和结论。",
      "",
      "## 正文",
      "",
      "在这里开始记录主要内容。",
      "",
      "## 关键要点",
      "",
      "- ",
      "",
      "## 待办",
      "",
      "- [ ] ",
      "",
      "## 相关资料",
      "",
      "- ",
      "",
      "## 关联笔记",
      "",
      "- ",
      "",
    ].join("\n");
  }

  async createNormalNoteFromTemplate(title, folder) {
    const safeTitle = title
      .trim()
      .replace(/[\\/:*?"<>|]/g, "-")
      .replace(/\s+/g, " ")
      .replace(/\.+$/g, "");
    if (!safeTitle) throw new Error("文档名称无效");

    if (folder) await this.ensureFolder(folder);
    const prefix = folder ? `${normalizePath(folder)}/` : "";
    let notePath = normalizePath(`${prefix}${safeTitle}.md`);
    let suffix = 2;
    while (this.app.vault.getAbstractFileByPath(notePath)) {
      notePath = normalizePath(`${prefix}${safeTitle} ${suffix}.md`);
      suffix += 1;
    }

    let template = this.getDefaultNormalNoteContent();
    const templatePath = normalizePath(this.plugin.settings.normalNoteTemplatePath || NORMAL_NOTE_TEMPLATE_PATH);
    if (await this.app.vault.adapter.exists(templatePath)) {
      template = await this.app.vault.adapter.read(templatePath);
    }
    const content = this.renderNormalNoteTemplate(template, safeTitle);
    const noteFile = await this.app.vault.create(notePath, content);
    const initialProfile = this.plugin.getResolvedOrganizerProfile(noteFile);
    await this.plugin.setOrganizerVisual(
      noteFile,
      {
        ...initialProfile,
        noteType: initialProfile.noteType || this.plugin.getNoteTypeDefinitions()[0]?.name || "普通笔记",
        status: "待整理",
        priority: "普通",
        reviewDate: null,
        mastery: 10,
        progressTracked: false,
        automatic: true,
      },
      { showNotice: false },
    );
    this.normalNoteFolder = folder;
    new Notice(`已创建模板文档：${noteFile.basename}`);
    await this.openNote(noteFile);
    return noteFile;
  }

  openNormalNoteModal() {
    new NormalNoteModal(
      this.app,
      this.getNormalNoteFolders(),
      this.normalNoteFolder,
      ({ title, folder }) => this.createNormalNoteFromTemplate(title, folder),
    ).open();
  }

  renderJournalTemplate(content) {
    const today = moment();
    return content.replace(
      /<%\s*tp\.date\.now\((['"])(.*?)\1\)\s*%>/g,
      (_match, _quote, format) => today.format(format),
    );
  }

  getDefaultJournalContent() {
    const today = moment();
    return [
      "---",
      `日期: ${today.format("YYYY-MM-DD")}`,
      "标签:",
      "  - 每日笔记",
      "  - 日记",
      "---",
      "",
      `# ${today.format("YYYY年MM月DD日 dddd")}`,
      "",
      "## 🎯 今日目标",
      "- [ ] ",
      "",
      "## 📚 学习记录",
      "",
      "## 💡 灵感与想法",
      "",
      "## 📊 总结与反思",
      "",
    ].join("\n");
  }

  async openTodayJournal() {
    const options = this.app.internalPlugins?.plugins?.["daily-notes"]?.instance?.options || {};
    const folder = normalizePath(options.folder || this.plugin.settings.journalFallbackFolder || "日记");
    const format = options.format || "YYYY-MM-DD";
    const relativeName = moment().format(format);
    const journalPath = normalizePath(`${folder}/${relativeName}.md`);

    let journalFile = this.app.vault.getAbstractFileByPath(journalPath);
    if (!journalFile) {
      const parentFolder = journalPath.includes("/")
        ? journalPath.slice(0, journalPath.lastIndexOf("/"))
        : "";
      await this.ensureFolder(parentFolder);

      let content = this.getDefaultJournalContent();
      const templatePath = options.template ? normalizePath(options.template) : null;
      const templateFile = templatePath && this.app.vault.getAbstractFileByPath(templatePath);
      if (templateFile?.extension === "md") {
        content = this.renderJournalTemplate(await this.app.vault.cachedRead(templateFile));
      } else if (templatePath && (await this.app.vault.adapter.exists(templatePath))) {
        content = this.renderJournalTemplate(await this.app.vault.adapter.read(templatePath));
      }

      try {
        journalFile = await this.app.vault.create(journalPath, content);
        const initialProfile = this.plugin.getResolvedOrganizerProfile(journalFile);
        await this.plugin.setOrganizerVisual(
          journalFile,
          {
            ...initialProfile,
            domain: "日记与记录",
            noteType: "日记与记录",
            status: "学习中",
            priority: "普通",
            reviewDate: null,
            mastery: 40,
            progressTracked: false,
            automatic: true,
          },
          { showNotice: false },
        );
        new Notice(`已创建今日日记：${relativeName}`);
      } catch (error) {
        journalFile = this.app.vault.getAbstractFileByPath(journalPath);
        if (!journalFile) throw error;
      }
    }

    await this.openNote(journalFile);
    return journalFile;
  }

  renderStats(parent, data) {
    const stats = parent.createDiv({ cls: "study-dashboard-stats" });
    const items = [
      ["files", "笔记总数", data.notes.length, "#3b82f6"],
      ["layers-3", "学习领域", data.categories.length, "#8b5cf6"],
      ["calendar-sync", "今日待复习", data.dueReviewCount, "#f59e0b"],
      ["circle-check-big", "未完成任务", data.totalTasks, "#10b981"],
    ];
    for (const [icon, label, value, color] of items) {
      const card = stats.createDiv({ cls: "study-dashboard-stat" });
      card.style.setProperty("--stat-color", color);
      const iconEl = card.createSpan({ cls: "study-dashboard-stat-icon" });
      setIcon(iconEl, icon);
      const text = card.createDiv();
      text.createDiv({ cls: "study-dashboard-stat-value", text: String(value) });
      text.createDiv({ cls: "study-dashboard-stat-label", text: label });
    }
  }

  renderSmartCollections(parent, data) {
    const section = parent.createDiv({ cls: "study-dashboard-smart-section" });
    const heading = section.createDiv({ cls: "study-dashboard-smart-heading" });
    heading.createEl("h2", { text: "智能学习集合" });
    heading.createSpan({ text: "由学习状态、优先级和复习日期自动生成" });
    const grid = section.createDiv({ cls: "study-dashboard-smart-grid" });
    for (const collection of data.smartCollections) {
      const card = grid.createEl("button", {
        cls: `study-dashboard-smart-card ${this.selectedCollection === collection.id ? "is-active" : ""}`,
      });
      card.style.setProperty("--smart-color", collection.color);
      const icon = card.createSpan({ cls: "study-dashboard-smart-icon" });
      setIcon(icon, collection.icon);
      const info = card.createDiv({ cls: "study-dashboard-smart-info" });
      info.createDiv({ cls: "study-dashboard-smart-name", text: collection.name });
      info.createDiv({ cls: "study-dashboard-smart-count", text: `${collection.notes.length} 篇` });
      const arrow = card.createSpan({ cls: "study-dashboard-smart-arrow" });
      setIcon(arrow, "arrow-up-right");
      card.addEventListener("click", () => {
        this.selectedCollection = this.selectedCollection === collection.id ? null : collection.id;
        this.selectedCategory = null;
        this.query = "";
        this.notesPage = 1;
        this.renderBody(this.bodyEl, data);
      });
    }
  }

  renderCategories(parent, data, bodyEl) {
    const section = parent.createDiv({ cls: "study-dashboard-section" });
    const heading = section.createDiv({ cls: "study-dashboard-section-heading" });
    heading.createEl("h2", {
      text: this.plugin.settings.groupMode === "smart" ? "智能归类" : "文件夹归类",
    });
    const toggle = heading.createEl("button", {
      cls: "study-dashboard-text-button",
      text: this.plugin.settings.groupMode === "smart" ? "切换到文件夹" : "切换到智能分类",
    });
    toggle.addEventListener("click", async () => {
      this.plugin.settings.groupMode = this.plugin.settings.groupMode === "smart" ? "folder" : "smart";
      this.selectedCategory = null;
      this.selectedCollection = null;
      this.notesPage = 1;
      await this.plugin.saveSettings();
      await this.render();
    });

    const grid = section.createDiv({ cls: "study-dashboard-categories" });
    for (const category of data.categories) {
      const card = grid.createEl("button", {
        cls: `study-dashboard-category ${this.selectedCategory === category.name ? "is-active" : ""}`,
      });
      card.style.setProperty("--category-color", category.color);
      const icon = card.createSpan({ cls: "study-dashboard-category-icon" });
      setIcon(icon, category.icon);
      const info = card.createDiv({ cls: "study-dashboard-category-info" });
      info.createDiv({ cls: "study-dashboard-category-name", text: category.name });
      info.createDiv({
        cls: "study-dashboard-category-count",
        text: `${category.aggregateStatus || "暂无内容"} · ${category.notes.length} 篇 · 已确认 ${category.trackedCount} · 待复习 ${category.statusCounts["待复习"] || 0}`,
      });
      const progress = info.createDiv({ cls: "study-dashboard-category-progress" });
      progress.createSpan({ attr: { style: `width:${category.mastery}%` } });
      info.createDiv({
        cls: "study-dashboard-category-mastery",
        text: `掌握度 ${category.mastery}% · ${category.trackedCount}/${category.notes.length} 已确认`,
      });
      const arrow = card.createSpan({ cls: "study-dashboard-category-arrow" });
      setIcon(arrow, "chevron-right");
      card.addEventListener("click", () => {
        this.selectedCategory = this.selectedCategory === category.name ? null : category.name;
        this.selectedCollection = null;
        this.notesPage = 1;
        this.renderBody(bodyEl, data);
      });
    }
  }

  renderCourseCenter(parent, data) {
    if (!this.selectedCategory) return;
    const category = data.categories.find((item) => item.name === this.selectedCategory);
    if (!category) return;
    const center = parent.createDiv({ cls: "study-dashboard-course-center" });
    center.style.setProperty("--course-color", category.color);
    const header = center.createDiv({ cls: "study-dashboard-course-header" });
    const identity = header.createDiv({ cls: "study-dashboard-course-identity" });
    const icon = identity.createSpan({ cls: "study-dashboard-course-icon" });
    setIcon(icon, category.icon);
    const title = identity.createDiv();
    title.createEl("h2", { text: category.name });
    title.createSpan({ text: "课程学习中心" });
    const actions = header.createDiv({ cls: "study-dashboard-course-actions" });
    const createButton = actions.createEl("button", {
      cls: "study-dashboard-text-button",
      text: "新建课程笔记",
    });
    createButton.addEventListener("click", () => {
      this.normalNoteFolder = category.notes[0]?.file.path.split("/")[0] || "";
      this.openNormalNoteModal();
    });

    const progress = center.createDiv({ cls: "study-dashboard-course-progress" });
    const progressHeading = progress.createDiv();
    progressHeading.createSpan({ text: "综合掌握度" });
    progressHeading.createEl("strong", { text: `${category.mastery}%` });
    const track = progress.createDiv({ cls: "study-dashboard-course-progress-track" });
    track.createSpan({ attr: { style: `width:${category.mastery}%` } });
    progress.createDiv({
      cls: "study-dashboard-course-progress-note",
      text: `仅使用手动确认或完成过复习的笔记计算；未确认笔记按 0% 计入总量（${category.trackedCount}/${category.notes.length} 已确认）。`,
    });

    const metrics = center.createDiv({ cls: "study-dashboard-course-metrics" });
    for (const [label, value, iconName] of [
      ["全部笔记", category.notes.length, "files"],
      ["已确认进度", category.trackedCount, "circle-check-big"],
      ["待复习", category.statusCounts["待复习"] || 0, "refresh-cw"],
      ["已掌握", category.statusCounts["已掌握"] || 0, "badge-check"],
    ]) {
      const metric = metrics.createDiv({ cls: "study-dashboard-course-metric" });
      const metricIcon = metric.createSpan();
      setIcon(metricIcon, iconName);
      const metricText = metric.createDiv();
      metricText.createEl("strong", { text: String(value) });
      metricText.createSpan({ text: label });
    }
  }

  sortNotes(notes) {
    return [...notes].sort((a, b) => {
      switch (this.noteSort) {
        case "modified-asc":
          return a.file.stat.mtime - b.file.stat.mtime;
        case "created-desc":
          return b.file.stat.ctime - a.file.stat.ctime;
        case "created-asc":
          return a.file.stat.ctime - b.file.stat.ctime;
        default:
          return b.file.stat.mtime - a.file.stat.mtime;
      }
    });
  }

  renderNotesPagination(parent, totalPages, data) {
    if (totalPages <= 1) return;
    const pagination = parent.createDiv({ cls: "study-dashboard-pagination" });
    const goToPage = (page) => {
      this.notesPage = Math.max(1, Math.min(totalPages, page));
      this.renderBody(this.bodyEl, data);
      window.requestAnimationFrame(() =>
        this.notesSectionEl?.scrollIntoView({ block: "start", behavior: "smooth" }),
      );
    };

    const previous = createIconButton(pagination, "chevron-left", "上一页", () =>
      goToPage(this.notesPage - 1),
    );
    previous.disabled = this.notesPage === 1;

    const pageNumbers = new Set([
      1,
      totalPages,
      this.notesPage - 1,
      this.notesPage,
      this.notesPage + 1,
    ]);
    const visiblePages = [...pageNumbers]
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);
    let previousPage = 0;
    for (const page of visiblePages) {
      if (page - previousPage > 1) pagination.createSpan({ cls: "study-dashboard-page-gap", text: "…" });
      const button = pagination.createEl("button", {
        cls: `study-dashboard-page-button ${page === this.notesPage ? "is-active" : ""}`,
        text: String(page),
        attr: { "aria-label": `第 ${page} 页` },
      });
      button.addEventListener("click", () => goToPage(page));
      previousPage = page;
    }

    const next = createIconButton(pagination, "chevron-right", "下一页", () =>
      goToPage(this.notesPage + 1),
    );
    next.disabled = this.notesPage === totalPages;
  }

  renderBatchToolbar(parent, visibleNotes) {
    const toolbar = parent.createDiv({ cls: "study-dashboard-batch-toolbar" });
    toolbar.createSpan({
      cls: "study-dashboard-batch-count",
      text: `已选择 ${this.selectedNotePaths.size} 篇`,
    });
    const actions = toolbar.createDiv({ cls: "study-dashboard-batch-actions" });
    const allSelected = visibleNotes.length > 0 && visibleNotes.every(
      (note) => this.selectedNotePaths.has(note.file.path),
    );
    const selectAll = actions.createEl("button", {
      cls: "study-dashboard-text-button",
      text: allSelected ? "取消本页" : "全选本页",
    });
    selectAll.addEventListener("click", () => {
      for (const note of visibleNotes) {
        if (allSelected) this.selectedNotePaths.delete(note.file.path);
        else this.selectedNotePaths.add(note.file.path);
      }
      this.renderBody(this.bodyEl, this.currentData);
    });
    const modify = actions.createEl("button", {
      cls: "study-dashboard-text-button mod-cta",
      text: "修改已选",
    });
    modify.disabled = this.selectedNotePaths.size === 0;
    modify.addEventListener("click", () => {
      const targets = [...this.selectedNotePaths]
        .map((path) => this.app.vault.getAbstractFileByPath(path))
        .filter((target) => target?.extension === "md");
      new BatchOrganizerModal(this.app, this.plugin, targets, () => {
        this.selectedNotePaths.clear();
        this.batchMode = false;
        this.render();
      }).open();
    });
  }

  renderNotes(parent, data) {
    const normalizedQuery = this.query.trim().toLocaleLowerCase("zh-CN");
    const selectedCollection = data.smartCollections.find(
      (collection) => collection.id === this.selectedCollection,
    );
    const isBrowseMode = Boolean(this.selectedCategory || selectedCollection || normalizedQuery);
    let notes = this.selectedCategory
      ? data.categories.find((category) => category.name === this.selectedCategory)?.notes || []
      : selectedCollection?.notes || data.recent;

    if (normalizedQuery) {
      notes = data.notes.filter((note) => {
        const haystack = [
          note.file.basename,
          note.file.path,
          note.tags.join(" "),
          note.profile.domain,
          note.profile.noteType,
          note.profile.status,
          note.profile.priority,
        ].join(" ").toLocaleLowerCase("zh-CN");
        return haystack.includes(normalizedQuery);
      });
    }

    notes = isBrowseMode
      ? this.sortNotes(notes)
      : [...notes].sort((a, b) => b.file.stat.mtime - a.file.stat.mtime);
    const section = parent.createDiv({ cls: "study-dashboard-section study-dashboard-notes-section" });
    this.notesSectionEl = section;
    const heading = section.createDiv({ cls: "study-dashboard-section-heading" });
    heading.createEl("h2", {
      text: normalizedQuery
        ? `搜索结果 · ${notes.length}`
        : this.selectedCategory || selectedCollection?.name || "最近修改",
    });
    const controls = heading.createDiv({ cls: "study-dashboard-note-controls" });
    if (isBrowseMode) {
      const totalPages = Math.max(1, Math.ceil(notes.length / NOTES_PAGE_SIZE));
      this.notesPage = Math.min(this.notesPage, totalPages);
      controls.createSpan({
        cls: "study-dashboard-page-summary",
        text: `共 ${notes.length} 篇 · ${this.notesPage}/${totalPages} 页`,
      });
      const sort = controls.createEl("select", {
        cls: "study-dashboard-sort-select",
        attr: { "aria-label": "笔记排序方式" },
      });
      for (const [value, label] of [
        ["modified-desc", "最近修改"],
        ["modified-asc", "最早修改"],
        ["created-desc", "最新创建"],
        ["created-asc", "最早创建"],
      ]) {
        sort.createEl("option", { value, text: label });
      }
      sort.value = this.noteSort;
      sort.addEventListener("change", () => {
        this.noteSort = sort.value;
        this.notesPage = 1;
        this.renderBody(this.bodyEl, data);
      });
      const clear = heading.createEl("button", { cls: "study-dashboard-text-button", text: "查看最近" });
      clear.addEventListener("click", () => {
        this.selectedCategory = null;
        this.selectedCollection = null;
        this.query = "";
        this.notesPage = 1;
        this.render();
      });
      controls.appendChild(clear);
    } else {
      controls.createSpan({ cls: "study-dashboard-page-summary", text: "最新 8 篇" });
    }

    const batchButton = controls.createEl("button", {
      cls: `study-dashboard-text-button ${this.batchMode ? "is-active" : ""}`,
      text: this.batchMode ? "退出批量" : "批量管理",
    });
    batchButton.addEventListener("click", () => {
      this.batchMode = !this.batchMode;
      if (!this.batchMode) this.selectedNotePaths.clear();
      this.renderBody(this.bodyEl, data);
    });

    if (!notes.length) {
      section.createDiv({ cls: "study-dashboard-empty", text: "没有找到匹配的笔记。" });
      return;
    }

    const totalPages = isBrowseMode ? Math.max(1, Math.ceil(notes.length / NOTES_PAGE_SIZE)) : 1;
    const visibleNotes = isBrowseMode
      ? notes.slice((this.notesPage - 1) * NOTES_PAGE_SIZE, this.notesPage * NOTES_PAGE_SIZE)
      : notes.slice(0, 8);
    if (this.batchMode) this.renderBatchToolbar(section, visibleNotes);
    const list = section.createDiv({ cls: "study-dashboard-note-list" });
    for (const note of visibleNotes) {
      const selected = this.selectedNotePaths.has(note.file.path);
      const item = list.createDiv({
        cls: `study-dashboard-note ${selected ? "is-selected" : ""} ${this.batchMode ? "is-batch" : ""}`,
        attr: { role: "button", tabindex: "0" },
      });
      item.style.setProperty("--note-color", note.category.color || "#64748b");
      const icon = item.createSpan({ cls: `study-dashboard-note-icon ${this.batchMode ? "is-selector" : ""}` });
      setIcon(icon, this.batchMode ? (selected ? "square-check-big" : "square") : note.category.icon || "file-text");
      const info = item.createDiv({ cls: "study-dashboard-note-info" });
      const titleRow = info.createDiv({ cls: "study-dashboard-note-title-row" });
      titleRow.createDiv({ cls: "study-dashboard-note-title", text: note.file.basename });
      const statusInfo = LEARNING_STATUSES.find((status) => status.name === note.profile.status);
      const status = titleRow.createSpan({
        cls: "study-dashboard-note-status",
        text: note.profile.status,
      });
      status.style.setProperty("--status-color", statusInfo?.color || "#64748b");
      status.setAttribute("title", "单击快速修改学习状态");
      status.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.plugin.openQuickOrganizer(note.file, event.clientX + 8, event.clientY + 8);
      });
      const meta = info.createDiv({ cls: "study-dashboard-note-meta" });
      meta.createSpan({ cls: "study-dashboard-note-category", text: note.category.name });
      meta.createSpan({ cls: "study-dashboard-note-type", text: note.profile.noteType });
      if (note.profile.priority !== "普通") {
        meta.createSpan({
          cls: `study-dashboard-note-priority is-${note.profile.priority === "核心" ? "core" : "important"}`,
          text: note.profile.priority,
        });
      }
      if (note.profile.reviewDate) {
        meta.createSpan({ cls: "study-dashboard-note-review", text: `复习 ${note.profile.reviewDate}` });
      }
      if (note.profile.reviewCount > 0) {
        meta.createSpan({
          cls: "study-dashboard-note-review-count",
          text: `已复习 ${note.profile.reviewCount} 次`,
        });
      }
      meta.createSpan({ cls: "study-dashboard-note-path", text: note.file.parent?.path || "根目录" });
      for (const tag of note.tags.slice(0, 2)) {
        meta.createSpan({ cls: "study-dashboard-note-tag", text: `#${tag}` });
      }
      const side = item.createDiv({ cls: "study-dashboard-note-side" });
      side.createDiv({
        cls: "study-dashboard-note-time",
        text:
          isBrowseMode && this.noteSort.startsWith("created")
            ? `创建于 ${moment(note.file.stat.ctime).fromNow()}`
            : moment(note.file.stat.mtime).fromNow(),
      });
      if (selectedCollection?.id === "review" && !this.batchMode) {
        const reviewActions = side.createDiv({ cls: "study-dashboard-review-actions" });
        for (const rating of this.plugin.getReviewRatings()) {
          const review = reviewActions.createEl("button", {
            text: rating.name,
            attr: { type: "button", title: `${rating.name}：自动安排下次复习` },
          });
          review.style.setProperty("--review-color", rating.color);
          review.addEventListener("click", async (event) => {
            event.preventDefault();
            event.stopPropagation();
            await this.plugin.completeReview(note.file, rating.id);
            await this.render();
          });
        }
      } else if (!this.batchMode) {
        const quick = side.createEl("button", {
          cls: "study-dashboard-note-quick",
          attr: { type: "button", "aria-label": "快速修改学习属性", title: "快速修改学习属性" },
        });
        setIcon(quick, "sliders-horizontal");
        quick.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const rect = quick.getBoundingClientRect();
          this.plugin.openQuickOrganizer(note.file, rect.right + 6, rect.top);
        });
      }

      const activate = () => {
        if (this.batchMode) {
          if (this.selectedNotePaths.has(note.file.path)) this.selectedNotePaths.delete(note.file.path);
          else this.selectedNotePaths.add(note.file.path);
          this.renderBody(this.bodyEl, data);
        } else {
          this.openNote(note.file);
        }
      };
      item.addEventListener("click", activate);
      item.addEventListener("dblclick", (event) => {
        if (this.batchMode) return;
        event.preventDefault();
        event.stopPropagation();
        this.plugin.openQuickOrganizer(note.file, event.clientX + 8, event.clientY + 8);
      });
      item.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        activate();
      });
    }
    if (isBrowseMode) this.renderNotesPagination(section, totalPages, data);
  }

  getUncheckedTaskText(line) {
    const match = line?.match(/^\s*[-*]\s+\[ \]\s+(.+)$/);
    return match?.[1]?.trim() || null;
  }

  findTaskLine(lines, task, usedIndexes) {
    const preferredIndex = task.line;
    if (
      preferredIndex >= 0 &&
      preferredIndex < lines.length &&
      !usedIndexes.has(preferredIndex) &&
      this.getUncheckedTaskText(lines[preferredIndex]) === task.text
    ) {
      return preferredIndex;
    }

    return lines.findIndex(
      (line, index) =>
        !usedIndexes.has(index) && this.getUncheckedTaskText(line) === task.text,
    );
  }

  async completeTasks(tasks, options = {}) {
    const { showNotice = true, successMessage = null } = options;
    const tasksByFile = new Map();
    for (const task of tasks) {
      if (!tasksByFile.has(task.file.path)) tasksByFile.set(task.file.path, []);
      tasksByFile.get(task.file.path).push(task);
    }

    let completed = 0;
    for (const fileTasks of tasksByFile.values()) {
      const file = fileTasks[0].file;
      let completedInFile = 0;
      await this.app.vault.process(file, (content) => {
        const lines = content.split("\n");
        const usedIndexes = new Set();
        let changed = false;

        for (const task of [...fileTasks].sort((a, b) => b.line - a.line)) {
          const index = this.findTaskLine(lines, task, usedIndexes);
          if (index < 0) continue;
          lines[index] = lines[index].replace(/\[ \]/, "[x]");
          usedIndexes.add(index);
          completedInFile += 1;
          changed = true;
        }

        return changed ? lines.join("\n") : content;
      });
      completed += completedInFile;
    }

    if (showNotice) {
      if (completed > 0) {
        new Notice(successMessage || `已完成并移出 ${completed} 条待办，原笔记已同步标记。`);
      } else {
        new Notice("没有找到对应的未完成项，笔记可能刚刚被修改。");
      }
    }
    await this.render();
    return completed;
  }

  async completeTask(task) {
    return this.completeTasks([task]);
  }

  renderTasks(parent, data) {
    const section = parent.createDiv({ cls: "study-dashboard-side-card study-dashboard-tasks-card" });
    const heading = section.createDiv({ cls: "study-dashboard-side-heading" });
    const title = heading.createDiv();
    const titleIcon = title.createSpan();
    setIcon(titleIcon, "list-todo");
    title.createSpan({ text: "待办汇总" });
    heading.createSpan({ cls: "study-dashboard-badge", text: String(data.totalTasks) });

    const list = section.createDiv({ cls: "study-dashboard-task-list" });
    if (!data.tasks.length) {
      list.createDiv({ cls: "study-dashboard-empty", text: "暂时没有未完成任务。" });
      return;
    }

    for (const task of data.tasks) {
      const item = list.createDiv({ cls: "study-dashboard-task" });
      const open = item.createEl("button", {
        cls: "study-dashboard-task-open",
        attr: { "aria-label": `打开待办：${task.text}` },
      });
      open.createSpan({ cls: "study-dashboard-task-checkbox" });
      const info = open.createDiv({ cls: "study-dashboard-task-info" });
      info.createDiv({
        cls: "study-dashboard-task-text",
        text: this.plugin.stripTaskDue(task.text),
      });
      const meta = info.createDiv({ cls: "study-dashboard-task-meta" });
      meta.createSpan({ text: task.file.basename });
      if (task.due) meta.createSpan({ cls: "study-dashboard-task-due", text: task.due });
      open.addEventListener("click", () => this.openNote(task.file, task.line));
      createIconButton(
        item,
        "circle-check-big",
        "完成并从待办中移除",
        () => this.completeTask(task),
        "study-dashboard-task-complete",
      );
    }
  }

  getCalendarDays() {
    const monthStart = this.calendarMonth.clone().startOf("month");
    const monthEnd = this.calendarMonth.clone().endOf("month");
    const gridStart = monthStart.clone().startOf("isoWeek");
    const gridEnd = monthEnd.clone().endOf("isoWeek");
    const days = [];
    const cursor = gridStart.clone();
    while (cursor.isSameOrBefore(gridEnd, "day")) {
      days.push(cursor.clone());
      cursor.add(1, "day");
    }
    return days;
  }

  renderCalendarRecords(parent, data) {
    const selectedMoment = moment(this.selectedDate, "YYYY-MM-DD");
    const records = data.calendarRecords.get(this.selectedDate) || { tasks: [], notes: [], reviews: [] };
    const recordsEl = parent.createDiv({ cls: "study-dashboard-calendar-records" });
    const heading = recordsEl.createDiv({ cls: "study-dashboard-calendar-record-heading" });
    heading.createSpan({
      cls: "study-dashboard-calendar-record-date",
      text: selectedMoment.format("M月D日 dddd"),
    });
    heading.createSpan({
      cls: "study-dashboard-calendar-record-count",
      text: `${records.tasks.length + records.notes.length + records.reviews.length} 条记录`,
    });

    if (!records.tasks.length && !records.notes.length && !records.reviews.length) {
      recordsEl.createDiv({ cls: "study-dashboard-calendar-empty", text: "这一天暂无待办、复习或笔记更新。" });
      return;
    }

    const list = recordsEl.createDiv({ cls: "study-dashboard-calendar-record-list" });
    for (const task of records.tasks.slice(0, 5)) {
      const item = list.createEl("button", { cls: "study-dashboard-calendar-record" });
      const icon = item.createSpan({ cls: "study-dashboard-calendar-record-icon is-task" });
      setIcon(icon, "circle-check-big");
      const info = item.createDiv({ cls: "study-dashboard-calendar-record-info" });
      info.createDiv({
        cls: "study-dashboard-calendar-record-title",
        text: task.text.replace(/(?:📅|due::)\s*\d{4}-\d{2}-\d{2}/gi, "").trim(),
      });
      info.createDiv({ cls: "study-dashboard-calendar-record-meta", text: `到期待办 · ${task.file.basename}` });
      item.addEventListener("click", () => this.openNote(task.file, task.line));
    }

    for (const note of records.reviews.slice(0, 5)) {
      const item = list.createEl("button", { cls: "study-dashboard-calendar-record" });
      const icon = item.createSpan({ cls: "study-dashboard-calendar-record-icon is-review" });
      setIcon(icon, "refresh-cw");
      const info = item.createDiv({ cls: "study-dashboard-calendar-record-info" });
      info.createDiv({ cls: "study-dashboard-calendar-record-title", text: note.file.basename });
      info.createDiv({
        cls: "study-dashboard-calendar-record-meta",
        text: `计划复习 · ${note.profile.domain}`,
      });
      item.addEventListener("click", () => this.openNote(note.file));
    }

    for (const note of records.notes.slice(0, 5)) {
      const item = list.createEl("button", { cls: "study-dashboard-calendar-record" });
      const icon = item.createSpan({ cls: "study-dashboard-calendar-record-icon is-note" });
      setIcon(icon, "file-clock");
      const info = item.createDiv({ cls: "study-dashboard-calendar-record-info" });
      info.createDiv({ cls: "study-dashboard-calendar-record-title", text: note.file.basename });
      info.createDiv({
        cls: "study-dashboard-calendar-record-meta",
        text: `笔记更新 · ${moment(note.file.stat.mtime).format("HH:mm")}`,
      });
      item.addEventListener("click", () => this.openNote(note.file));
    }

    const hiddenCount =
      Math.max(0, records.tasks.length - 5) +
      Math.max(0, records.reviews.length - 5) +
      Math.max(0, records.notes.length - 5);
    if (hiddenCount) {
      recordsEl.createDiv({ cls: "study-dashboard-calendar-more", text: `另有 ${hiddenCount} 条记录` });
    }
  }

  renderCalendar(parent, data) {
    const section = parent.createDiv({ cls: "study-dashboard-side-card study-dashboard-calendar-card" });
    const heading = section.createDiv({ cls: "study-dashboard-calendar-heading" });
    const title = heading.createDiv({ cls: "study-dashboard-calendar-title" });
    const titleIcon = title.createSpan();
    setIcon(titleIcon, "calendar-days");
    title.createSpan({ text: this.calendarMonth.format("YYYY年 M月") });

    const navigation = heading.createDiv({ cls: "study-dashboard-calendar-nav" });
    createIconButton(navigation, "chevron-left", "上个月", () => {
      this.calendarMonth.subtract(1, "month").startOf("month");
      this.renderBody(this.bodyEl, data);
    });
    const todayButton = navigation.createEl("button", { cls: "study-dashboard-calendar-today", text: "今天" });
    todayButton.addEventListener("click", () => {
      this.selectedDate = moment().format("YYYY-MM-DD");
      this.calendarMonth = moment().startOf("month");
      this.renderBody(this.bodyEl, data);
    });
    createIconButton(navigation, "chevron-right", "下个月", () => {
      this.calendarMonth.add(1, "month").startOf("month");
      this.renderBody(this.bodyEl, data);
    });

    const weekdays = section.createDiv({ cls: "study-dashboard-calendar-weekdays" });
    for (const weekday of ["一", "二", "三", "四", "五", "六", "日"]) {
      weekdays.createSpan({ text: weekday });
    }

    const grid = section.createDiv({ cls: "study-dashboard-calendar-grid" });
    const currentMonth = this.calendarMonth.month();
    const today = moment().format("YYYY-MM-DD");
    for (const day of this.getCalendarDays()) {
      const date = day.format("YYYY-MM-DD");
      const records = data.calendarRecords.get(date) || { tasks: [], notes: [], reviews: [] };
      const button = grid.createEl("button", {
        cls: [
          "study-dashboard-calendar-day",
          day.month() !== currentMonth ? "is-outside" : "",
          date === today ? "is-today" : "",
          date === this.selectedDate ? "is-selected" : "",
        ].filter(Boolean).join(" "),
        attr: {
          "aria-label": `${day.format("YYYY年M月D日")}，${records.tasks.length} 个到期待办，${records.reviews.length} 篇待复习，${records.notes.length} 篇更新笔记`,
        },
      });
      button.createSpan({ cls: "study-dashboard-calendar-day-number", text: day.format("D") });
      const dots = button.createSpan({ cls: "study-dashboard-calendar-dots" });
      if (records.tasks.length) dots.createSpan({ cls: "study-dashboard-calendar-dot is-task" });
      if (records.reviews.length) dots.createSpan({ cls: "study-dashboard-calendar-dot is-review" });
      if (records.notes.length) dots.createSpan({ cls: "study-dashboard-calendar-dot is-note" });
      button.addEventListener("click", () => {
        this.selectedDate = date;
        if (day.month() !== currentMonth) this.calendarMonth = day.clone().startOf("month");
        this.renderBody(this.bodyEl, data);
      });
    }

    const legend = section.createDiv({ cls: "study-dashboard-calendar-legend" });
    const taskLegend = legend.createSpan();
    taskLegend.createSpan({ cls: "study-dashboard-calendar-dot is-task" });
    taskLegend.createSpan({ text: "到期待办" });
    const noteLegend = legend.createSpan();
    noteLegend.createSpan({ cls: "study-dashboard-calendar-dot is-note" });
    noteLegend.createSpan({ text: "笔记更新" });
    const reviewLegend = legend.createSpan();
    reviewLegend.createSpan({ cls: "study-dashboard-calendar-dot is-review" });
    reviewLegend.createSpan({ text: "计划复习" });

    this.renderCalendarRecords(section, data);
  }

  renderBody(bodyEl, data) {
    bodyEl.empty();
    this.bodyEl = bodyEl;
    this.currentData = data;
    this.renderSmartCollections(bodyEl, data);
    const mainGrid = bodyEl.createDiv({ cls: "study-dashboard-main-grid" });
    const main = mainGrid.createDiv({ cls: "study-dashboard-main" });
    const side = mainGrid.createDiv({ cls: "study-dashboard-side" });
    this.renderCategories(main, data, bodyEl);
    this.renderCourseCenter(main, data);
    this.renderNotes(main, data);
    this.renderCalendar(side, data);
    this.renderTasks(side, data);
  }

  async render() {
    const container = this.contentEl;
    container.empty();
    container.addClass("study-dashboard-view");

    const data = await this.collectData();
    const page = container.createDiv({ cls: "study-dashboard-page" });
    const hero = page.createDiv({ cls: "study-dashboard-hero" });
    const heroTop = hero.createDiv({ cls: "study-dashboard-hero-top" });
    const intro = heroTop.createDiv({ cls: "study-dashboard-intro" });
    intro.createDiv({ cls: "study-dashboard-kicker", text: moment().format("YYYY年M月D日 dddd") });
    intro.createEl("h1", { text: "学习总览" });
    intro.createDiv({
      cls: "study-dashboard-subtitle",
      text: "自动归纳课程、项目、任务与最近学习记录",
    });

    const actions = heroTop.createDiv({ cls: "study-dashboard-actions" });
    this.createActionButton(actions, "file-plus", "新建笔记", () => this.openNormalNoteModal());
    this.createActionButton(actions, "calendar-check", "今日日记", () => this.openTodayJournal());
    createIconButton(actions, "refresh-cw", "刷新", () => this.render(), "study-dashboard-refresh");

    const searchRow = hero.createDiv({ cls: "study-dashboard-search-row" });
    const searchWrap = searchRow.createDiv({ cls: "study-dashboard-search" });
    const searchIcon = searchWrap.createSpan();
    setIcon(searchIcon, "search");
    const search = searchWrap.createEl("input", {
      type: "search",
      placeholder: "搜索笔记、路径或标签…",
      value: this.query,
    });
    search.addEventListener("input", () => {
      this.query = search.value;
      if (this.query.trim()) {
        this.selectedCategory = null;
        this.selectedCollection = null;
      }
      this.notesPage = 1;
      this.renderBody(bodyEl, data);
    });

    this.renderStats(page, data);
    const bodyEl = page.createDiv({ cls: "study-dashboard-body" });
    this.renderBody(bodyEl, data);
  }
}

class StudyDashboardSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  renderDefinitionManager(containerEl, options) {
    const {
      settingsKey,
      title,
      itemLabel,
      includeColor = false,
      defaultIcon = "bookmark",
      defaultColor = "#64748b",
    } = options;
    const definitions = this.plugin.settings[settingsKey];
    containerEl.createEl("h4", { text: title });
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: "每个类别都可以直接修改。关键词使用逗号分隔；新增后会立即进入学习归类选项。",
    });

    definitions.forEach((definition, index) => {
      const setting = new Setting(containerEl)
        .setClass("study-dashboard-definition-setting")
        .setName(`${itemLabel} ${index + 1}`)
        .setDesc(definition.keywords.length
          ? `当前匹配：${definition.keywords.join("、")}`
          : "没有关键词时只用于手动选择。")
        .addText((text) => {
          text
            .setPlaceholder("类别名称")
            .setValue(definition.name)
            .onChange(async (value) => {
              const name = value.trim();
              if (!name) return;
              if (definitions.some((item) => item !== definition && item.name === name)) {
                new Notice(`“${name}”已经存在，请使用不同名称。`);
                return;
              }
              definition.name = name;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            });
          text.inputEl.setAttribute("aria-label", `${itemLabel}名称`);
          text.inputEl.addClass("study-dashboard-definition-name");
        })
        .addText((text) => {
          text
            .setPlaceholder("关键词1, 关键词2")
            .setValue(definition.keywords.join(", "))
            .onChange(async (value) => {
              definition.keywords = value
                .split(/[,，]/)
                .map((keyword) => keyword.trim())
                .filter(Boolean);
              await this.plugin.saveSettings();
              this.plugin.scheduleOrganizerDecorations();
              this.plugin.refreshViews();
            });
          text.inputEl.setAttribute("aria-label", `${itemLabel}关键词`);
          text.inputEl.addClass("study-dashboard-definition-keywords");
        })
        .addDropdown((dropdown) => {
          if (!ORGANIZER_ICONS.some(([icon]) => icon === definition.icon)) {
            dropdown.addOption(definition.icon, definition.icon);
          }
          for (const [icon, label] of ORGANIZER_ICONS) dropdown.addOption(icon, label);
          dropdown.setValue(definition.icon).onChange(async (value) => {
            definition.icon = value;
            await this.plugin.saveSettings();
            this.plugin.scheduleOrganizerDecorations();
            this.plugin.refreshViews();
          });
          dropdown.selectEl.setAttribute("aria-label", `${itemLabel}图标`);
        });

      if (includeColor) {
        setting.addColorPicker((picker) =>
          picker.setValue(definition.color).onChange(async (value) => {
            definition.color = value;
            await this.plugin.saveSettings();
            this.plugin.scheduleOrganizerDecorations();
            this.plugin.refreshViews();
          }),
        );
      }

      setting.addExtraButton((button) =>
        button
          .setIcon("trash-2")
          .setTooltip(`删除${itemLabel}`)
          .onClick(async () => {
            if (definitions.length <= 1) {
              new Notice(`至少需要保留一个${itemLabel}。`);
              return;
            }
            const [removed] = definitions.splice(index, 1);
            await this.plugin.saveSettings();
            this.plugin.scheduleOrganizerDecorations();
            this.plugin.refreshViews();
            new Notice(`已删除“${removed.name}”；已有笔记属性不会被删除。`);
            this.display();
          }),
      );
    });

    new Setting(containerEl)
      .setName(`添加${itemLabel}`)
      .setDesc(`创建一个新的${itemLabel}，随后可直接填写名称和关键词。`)
      .addButton((button) =>
        button
          .setButtonText(`＋ 添加新${itemLabel}`)
          .setCta()
          .onClick(async () => {
            const baseName = `新${itemLabel}`;
            let name = baseName;
            let suffix = 2;
            while (definitions.some((item) => item.name === name)) {
              name = `${baseName} ${suffix}`;
              suffix += 1;
            }
            definitions.push({
              name,
              icon: defaultIcon,
              keywords: [],
              ...(includeColor ? { color: defaultColor } : {}),
            });
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
            this.display();
            new Notice(`已添加“${name}”，现在可以填写名称和关键词。`);
          }),
      );
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Study Dashboard" });

    new Setting(containerEl)
      .setName("启动时打开学习总览")
      .setDesc("Obsidian 启动完成后自动打开软件级学习主页。")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.openOnStartup).onChange(async (value) => {
          this.plugin.settings.openOnStartup = value;
          await this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl)
      .setName("默认归类方式")
      .setDesc("智能分类会根据路径、标题、标签和属性自动判断学习主题。")
      .addDropdown((dropdown) =>
        dropdown
          .addOption("smart", "智能分类")
          .addOption("folder", "顶层文件夹")
          .setValue(this.plugin.settings.groupMode)
          .onChange(async (value) => {
            this.plugin.settings.groupMode = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          }),
      );

    containerEl.createEl("h3", { text: "通用结构" });
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: "下面的规则决定插件如何适配不同专业、语言和 Vault 结构。可以直接添加、编辑或删除类别。",
    });

    new Setting(containerEl)
      .setName("未匹配领域名称")
      .setDesc("没有命中任何关键词时使用的分类名称。")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.uncategorizedDomain)
          .onChange(async (value) => {
            this.plugin.settings.uncategorizedDomain = value.trim() || "其他笔记";
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          }),
      );

    this.renderDefinitionManager(containerEl, {
      settingsKey: "domainDefinitions",
      title: "学习领域",
      itemLabel: "学习领域",
      includeColor: true,
      defaultIcon: "bookmark",
      defaultColor: "#64748b",
    });

    this.renderDefinitionManager(containerEl, {
      settingsKey: "noteTypeDefinitions",
      title: "资料类型",
      itemLabel: "资料类型",
      defaultIcon: "file-text",
    });

    new Setting(containerEl)
      .setName("新建笔记模板路径")
      .setDesc("相对于 Vault 根目录；文件不存在时使用插件自带的通用模板。")
      .addText((text) =>
        text
          .setPlaceholder("例如：Templates/Study note.md")
          .setValue(this.plugin.settings.normalNoteTemplatePath)
          .onChange(async (value) => {
            this.plugin.settings.normalNoteTemplatePath = value.trim();
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("日记备用目录")
      .setDesc("未启用 Obsidian 核心日记配置时使用；已启用时优先采用核心插件目录。")
      .addText((text) =>
        text
          .setPlaceholder("例如：Daily Notes")
          .setValue(this.plugin.settings.journalFallbackFolder)
          .onChange(async (value) => {
            this.plugin.settings.journalFallbackFolder = value.trim() || "日记";
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName("任务日期标记")
      .setDesc("用英文逗号分隔。标记后必须跟 YYYY-MM-DD，例如 due:: 2026-08-20。")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.taskDueMarkers.join(", "))
          .onChange(async (value) => {
            const markers = value.split(/[,，]/).map((marker) => marker.trim()).filter(Boolean);
            if (!markers.length) return;
            this.plugin.settings.taskDueMarkers = markers;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          }),
      );

    new Setting(containerEl)
      .setName("Frontmatter 字段映射")
      .setDesc("格式：内部字段 = 你的属性名。可对接已有英文或自定义 YAML；旧中文字段仍可被兼容读取。")
      .addTextArea((text) => {
        text.setValue(Object.entries(this.plugin.settings.propertyKeys)
          .map(([id, key]) => `${id} = ${key}`)
          .join("\n"));
        text.inputEl.rows = 12;
        text.inputEl.addClass("study-dashboard-settings-textarea");
        text.inputEl.addEventListener("blur", async () => {
          try {
            const next = { ...DEFAULT_PROPERTY_KEYS };
            for (const line of text.getValue().split("\n").map((item) => item.trim()).filter(Boolean)) {
              const separator = line.indexOf("=");
              if (separator < 1) throw new Error(`无法解析：${line}`);
              const id = line.slice(0, separator).trim();
              const key = line.slice(separator + 1).trim();
              if (!Object.prototype.hasOwnProperty.call(DEFAULT_PROPERTY_KEYS, id) || !key) {
                throw new Error(`未知或空字段：${id}`);
              }
              next[id] = key;
            }
            this.plugin.settings.propertyKeys = next;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
            new Notice("字段映射已保存；下次修改笔记时会写入新字段名。");
          } catch (error) {
            new Notice(`字段映射无效：${error.message}`);
          }
        });
      });

    new Setting(containerEl)
      .setName("复习反馈规则")
      .setDesc("每行格式：反馈 ID | 最短天数 | 间隔倍率 | 掌握度增量。ID 必须是 hard、normal、easy。")
      .addTextArea((text) => {
        text.setValue(this.plugin.getReviewRatings()
          .map((rating) => `${rating.id} | ${rating.minimumDays} | ${rating.factor} | ${rating.mastery}`)
          .join("\n"));
        text.inputEl.rows = 3;
        text.inputEl.addClass("study-dashboard-settings-textarea");
        text.inputEl.addEventListener("blur", async () => {
          try {
            const rules = {};
            for (const line of text.getValue().split("\n").map((item) => item.trim()).filter(Boolean)) {
              const [id, minimumDays, factor, mastery] = line.split("|").map((part) => part.trim());
              if (!REVIEW_RATINGS.some((rating) => rating.id === id)) throw new Error(`未知反馈 ID：${id}`);
              if (![minimumDays, factor, mastery].every((value) => Number.isFinite(Number(value)))) {
                throw new Error(`数值无效：${line}`);
              }
              rules[id] = { minimumDays: Number(minimumDays), factor: Number(factor), mastery: Number(mastery) };
            }
            this.plugin.settings.reviewRules = { ...this.plugin.settings.reviewRules, ...rules };
            this.plugin.normalizeSettings();
            await this.plugin.saveSettings();
            new Notice("复习规则已保存。");
          } catch (error) {
            new Notice(`复习规则无效：${error.message}`);
          }
        });
      });

    new Setting(containerEl)
      .setName("新文件夹自动添加图标和颜色")
      .setDesc("创建文件夹时根据名称智能匹配；未匹配时也会分配稳定的访达式颜色标签。")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.autoDecorateFolders).onChange(async (value) => {
          this.plugin.settings.autoDecorateFolders = value;
          await this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl)
      .setName("快捷归类")
      .setDesc("在文件列表中右键文件或文件夹，选择“设置学习属性…”；笔记会同步写入可检索属性。")
      .addButton((button) =>
        button.setButtonText("设置当前笔记").onClick(() => {
          const file = this.app.workspace.getActiveFile();
          if (!file) {
            new Notice("请先打开一篇笔记。");
            return;
          }
          this.plugin.openOrganizerModal(file);
        }),
      );

    new Setting(containerEl)
      .setName("排除的文件夹")
      .setDesc("使用英文逗号分隔；这些目录不会进入统计、分类和任务汇总，也不会显示学习状态或掌握进度。")
      .addTextArea((text) =>
        text
          .setValue(this.plugin.settings.excludedFolders.join(", "))
          .onChange(async (value) => {
            this.plugin.settings.excludedFolders = value
              .split(",")
              .map((folder) => folder.trim())
              .filter(Boolean);
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          }),
      );

    new Setting(containerEl)
      .setName("最近笔记数量（最多8条）")
      .addSlider((slider) =>
        slider
          .setLimits(4, 8, 1)
          .setDynamicTooltip()
          .setValue(this.plugin.settings.maxRecent)
          .onChange(async (value) => {
            this.plugin.settings.maxRecent = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          }),
      );

    new Setting(containerEl)
      .setName("待办显示数量")
      .addSlider((slider) =>
        slider
          .setLimits(6, 30, 1)
          .setDynamicTooltip()
          .setValue(this.plugin.settings.maxTasks)
          .onChange(async (value) => {
            this.plugin.settings.maxTasks = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          }),
      );

    containerEl.createEl("h3", { text: "配置迁移" });
    let portableConfig = "";
    let portableText = null;
    new Setting(containerEl)
      .setName("导出或导入通用配置")
      .setDesc("只包含分类、模板、字段和复习规则，不包含笔记内容，也不包含按文件保存的个人样式。")
      .addTextArea((text) => {
        portableText = text;
        text.setPlaceholder("点击“生成导出配置”，或在此粘贴另一台设备的 JSON。");
        text.inputEl.rows = 8;
        text.inputEl.addClass("study-dashboard-settings-textarea");
        text.onChange((value) => { portableConfig = value; });
      })
      .addButton((button) =>
        button.setButtonText("生成导出配置").onClick(async () => {
          portableConfig = JSON.stringify(this.plugin.getPortableSettings(), null, 2);
          portableText?.setValue(portableConfig);
          try {
            await navigator.clipboard.writeText(portableConfig);
            new Notice("通用配置已生成并复制到剪贴板。");
          } catch {
            new Notice("配置已生成，请从文本框手动复制。");
          }
        }),
      )
      .addButton((button) =>
        button.setButtonText("导入 JSON").setWarning().onClick(async () => {
          if (!portableConfig.trim()) {
            new Notice("请先粘贴配置 JSON。");
            return;
          }
          try {
            await this.plugin.importPortableSettings(portableConfig);
            new Notice("通用配置已导入。重新打开设置页可查看新值。");
          } catch (error) {
            new Notice(`配置导入失败：${error.message}`);
          }
        }),
      );
  }
}

module.exports = class StudyDashboardPlugin extends Plugin {
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.normalizeSettings();
    this.settings.maxRecent = Math.min(8, Math.max(4, Number(this.settings.maxRecent) || 8));
    this.settings.organizerVisuals = this.settings.organizerVisuals || {};
    await this.migrateOrganizerProfiles();
    this.explorerRenderTimer = null;
    this.tabRenderTimer = null;
    this.explorerObserver = null;
    this.quickOrganizer = null;

    this.registerView(VIEW_TYPE, (leaf) => new StudyDashboardView(leaf, this));
    this.addRibbonIcon("layout-dashboard", "打开学习总览", () => this.activateView(true));
    this.addCommand({
      id: "open-study-dashboard",
      name: "打开学习总览",
      callback: () => this.activateView(true),
    });
    this.addCommand({
      id: "organize-active-note",
      name: "为当前笔记设置学习属性",
      checkCallback: (checking) => {
        const file = this.app.workspace.getActiveFile();
        if (!file) return false;
        if (!checking) this.openOrganizerModal(file);
        return true;
      },
    });
    this.addSettingTab(new StudyDashboardSettingTab(this.app, this));

    this.registerDomEvent(
      document,
      "dblclick",
      (event) => {
        const tab = event.target.closest?.(
          ".workspace-tab-header.study-organizer-tab[data-organizer-path]",
        );
        if (tab && !event.target.closest?.(".workspace-tab-header-inner-close-button")) {
          const target = this.app.vault.getAbstractFileByPath(tab.dataset.organizerPath);
          if (!this.isLearningTarget(target)) return;
          event.preventDefault();
          event.stopPropagation();
          this.openQuickOrganizer(target, event.clientX + 8, event.clientY + 8);
          return;
        }
        const row = event.target.closest?.(
          ".nav-folder-title[data-path], .nav-file-title[data-path]",
        );
        if (!row || event.target.closest?.(".collapse-icon")) return;
        const target = this.app.vault.getAbstractFileByPath(row.dataset.path);
        if (!this.isLearningTarget(target)) return;
        event.preventDefault();
        event.stopPropagation();
        this.openQuickOrganizer(target, event.clientX + 8, event.clientY + 8);
      },
      true,
    );

    this.registerDomEvent(
      document,
      "click",
      (event) => {
        const trigger = event.target.closest?.(
          ".study-organizer-status, .study-organizer-dot, .study-organizer-tab-status",
        );
        if (!trigger) return;
        const tab = trigger.closest(
          ".workspace-tab-header.study-organizer-tab[data-organizer-path]",
        );
        if (tab) {
          const target = this.app.vault.getAbstractFileByPath(tab.dataset.organizerPath);
          if (!this.isLearningTarget(target)) return;
          event.preventDefault();
          event.stopPropagation();
          this.openQuickOrganizer(target, event.clientX + 8, event.clientY + 8);
          return;
        }
        const row = trigger.closest(".nav-folder-title[data-path], .nav-file-title[data-path]");
        const target = row && this.app.vault.getAbstractFileByPath(row.dataset.path);
        if (!this.isLearningTarget(target)) return;
        event.preventDefault();
        event.stopPropagation();
        this.openQuickOrganizer(target, event.clientX + 8, event.clientY + 8);
      },
      true,
    );

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, target) => {
        if (!this.isLearningTarget(target)) return;
        menu.addItem((item) =>
          item
            .setTitle("设置学习属性…")
            .setIcon("palette")
            .setSection("action")
            .onClick(() => this.openOrganizerModal(target)),
        );
      }),
    );

    this.app.workspace.onLayoutReady(async () => {
      const refresh = () => {
        this.refreshViews();
        this.scheduleOrganizerDecorations();
      };
      this.registerEvent(
        this.app.vault.on("create", (target) => {
          this.handleOrganizerCreate(target);
          refresh();
        }),
      );
      this.registerEvent(
        this.app.vault.on("delete", (target) => {
          this.handleOrganizerDelete(target);
          refresh();
        }),
      );
      this.registerEvent(
        this.app.vault.on("rename", (target, oldPath) => {
          this.handleOrganizerRename(target, oldPath);
          refresh();
        }),
      );
      this.registerEvent(this.app.vault.on("modify", refresh));
      this.registerEvent(this.app.metadataCache.on("changed", refresh));
      this.registerEvent(
        this.app.workspace.on("layout-change", () => this.scheduleTabDecorations()),
      );
      this.registerEvent(
        this.app.workspace.on("active-leaf-change", () => this.scheduleTabDecorations()),
      );
      await this.bootstrapOrganizerFolders();
      await this.cleanupExcludedLearningProperties();
      this.startExplorerDecorator();

      if (this.settings.openOnStartup) {
        window.setTimeout(() => this.activateView(false), 250);
      }
    });
  }

  onunload() {
    this.closeQuickOrganizer();
    if (this.explorerRenderTimer) window.clearTimeout(this.explorerRenderTimer);
    if (this.tabRenderTimer) window.clearTimeout(this.tabRenderTimer);
    this.explorerObserver?.disconnect();
    this.clearExplorerDecorations();
    this.clearTabDecorations();
    this.app.workspace.detachLeavesOfType(VIEW_TYPE);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  normalizeDefinitions(value, defaults, includeColor = false) {
    const source = Array.isArray(value) && value.length ? value : defaults;
    const normalized = source
      .map((item, index) => {
        const name = String(item?.name || "").trim();
        if (!name) return null;
        const fallback = defaults[index % defaults.length] || {};
        const keywords = Array.isArray(item.keywords)
          ? item.keywords.map((keyword) => String(keyword).trim()).filter(Boolean)
          : String(item.keywords || "").split(/[,，]/).map((keyword) => keyword.trim()).filter(Boolean);
        const definition = {
          name,
          icon: String(item.icon || fallback.icon || "bookmark").trim(),
          keywords,
        };
        if (includeColor) {
          definition.color = /^#[0-9a-f]{6}$/i.test(String(item.color || ""))
            ? String(item.color)
            : fallback.color || "#64748b";
        }
        return definition;
      })
      .filter(Boolean);
    return normalized.length ? normalized : defaults.map((item) => ({ ...item, keywords: [...item.keywords] }));
  }

  normalizeSettings() {
    this.settings.domainDefinitions = this.normalizeDefinitions(
      this.settings.domainDefinitions,
      DEFAULT_DOMAIN_DEFINITIONS,
      true,
    );
    this.settings.noteTypeDefinitions = this.normalizeDefinitions(
      this.settings.noteTypeDefinitions,
      DEFAULT_NOTE_TYPE_DEFINITIONS,
      false,
    );
    this.settings.uncategorizedDomain = String(
      this.settings.uncategorizedDomain || "其他笔记",
    ).trim() || "其他笔记";
    this.settings.normalNoteTemplatePath = String(
      this.settings.normalNoteTemplatePath || NORMAL_NOTE_TEMPLATE_PATH,
    ).trim();
    this.settings.journalFallbackFolder = String(
      this.settings.journalFallbackFolder || "日记",
    ).trim() || "日记";
    this.settings.taskDueMarkers = Array.isArray(this.settings.taskDueMarkers)
      ? this.settings.taskDueMarkers.map((marker) => String(marker).trim()).filter(Boolean)
      : ["📅", "due::"];
    if (!this.settings.taskDueMarkers.length) this.settings.taskDueMarkers = ["📅", "due::"];
    this.settings.propertyKeys = {
      ...DEFAULT_PROPERTY_KEYS,
      ...(this.settings.propertyKeys && typeof this.settings.propertyKeys === "object"
        ? this.settings.propertyKeys
        : {}),
    };
    for (const [id, fallback] of Object.entries(DEFAULT_PROPERTY_KEYS)) {
      this.settings.propertyKeys[id] = String(this.settings.propertyKeys[id] || fallback).trim() || fallback;
    }
    const suppliedRules = this.settings.reviewRules || {};
    this.settings.reviewRules = Object.fromEntries(
      REVIEW_RATINGS.map((rating) => {
        const supplied = suppliedRules[rating.id] || {};
        const minimumDays = Number(supplied.minimumDays);
        const factor = Number(supplied.factor);
        const mastery = Number(supplied.mastery);
        return [rating.id, {
          minimumDays: Math.max(1, Number.isFinite(minimumDays) ? minimumDays : rating.minimumDays),
          factor: Math.max(0.1, Number.isFinite(factor) ? factor : rating.factor),
          mastery: Math.max(0, Number.isFinite(mastery) ? mastery : rating.mastery),
        }];
      }),
    );
  }

  getDomainDefinitions() {
    return this.settings.domainDefinitions.map((item) => ({ ...item, keywords: [...item.keywords] }));
  }

  getNoteTypeDefinitions() {
    return this.settings.noteTypeDefinitions.map((item) => ({ ...item, keywords: [...item.keywords] }));
  }

  matchDefinition(text, definitions) {
    const searchable = String(text || "").toLocaleLowerCase();
    return definitions.find((definition) => definition.keywords.some((keyword) => {
      const normalized = String(keyword).toLocaleLowerCase();
      if (/^[a-z0-9]+$/i.test(normalized) && normalized.length <= 3) {
        return new RegExp(`\\b${this.escapeRegExp(normalized)}\\b`, "i").test(searchable);
      }
      return searchable.includes(normalized);
    })) || null;
  }

  serializeDefinitions(definitions, includeColor = false) {
    return definitions.map((item) => [
      item.name,
      item.keywords.join(", "),
      item.icon,
      ...(includeColor ? [item.color] : []),
    ].join(" | ")).join("\n");
  }

  parseDefinitions(value, includeColor = false) {
    const definitions = String(value)
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, keywordText = "", icon = "bookmark", color = "#64748b"] = line
          .split("|")
          .map((part) => part.trim());
        return {
          name,
          icon: icon || "bookmark",
          keywords: keywordText.split(/[,，]/).map((keyword) => keyword.trim()).filter(Boolean),
          ...(includeColor ? { color } : {}),
        };
      });
    if (!definitions.length || definitions.some((item) => !item.name)) {
      throw new Error("至少需要保留一个有效定义。");
    }
    return this.normalizeDefinitions(
      definitions,
      includeColor ? DEFAULT_DOMAIN_DEFINITIONS : DEFAULT_NOTE_TYPE_DEFINITIONS,
      includeColor,
    );
  }

  getReviewRatings() {
    return REVIEW_RATINGS.map((rating) => ({
      ...rating,
      ...(this.settings.reviewRules[rating.id] || {}),
    }));
  }

  escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  getTaskDuePattern(global = false) {
    const markers = this.settings.taskDueMarkers.map((marker) => this.escapeRegExp(marker));
    return new RegExp(`(?:${markers.join("|")})\\s*(\\d{4}-\\d{2}-\\d{2})`, global ? "gi" : "i");
  }

  extractTaskDue(text) {
    return String(text || "").match(this.getTaskDuePattern())?.[1] || null;
  }

  stripTaskDue(text) {
    return String(text || "").replace(this.getTaskDuePattern(true), "").trim();
  }

  getPropertyKey(id) {
    return this.settings.propertyKeys[id] || DEFAULT_PROPERTY_KEYS[id];
  }

  readLearningProperty(frontmatter, id) {
    if (!frontmatter) return undefined;
    const aliases = {
      domain: ["study_domain", "dashboard_category", "home_category"],
      noteType: ["study_type", "note_type"],
      status: ["study_status"],
      priority: ["study_priority"],
      mastery: ["mastery"],
      reviewCount: ["review_count"],
      reviewInterval: ["review_interval"],
      progressTracked: ["progress_tracked"],
      lastReview: ["last_review"],
      reviewDate: ["next_review"],
      color: ["category_color"],
      icon: ["category_icon"],
    };
    const keys = [...new Set([
      this.getPropertyKey(id),
      DEFAULT_PROPERTY_KEYS[id],
      ...(aliases[id] || []),
    ].filter(Boolean))];
    for (const key of keys) {
      if (frontmatter[key] !== undefined) return frontmatter[key];
    }
    return undefined;
  }

  getAllLearningPropertyKeys() {
    return [...new Set([
      ...Object.values(DEFAULT_PROPERTY_KEYS),
      ...Object.values(this.settings.propertyKeys),
    ])];
  }

  getPortableSettings() {
    return Object.fromEntries(PORTABLE_SETTING_KEYS.map((key) => [key, this.settings[key]]));
  }

  async importPortableSettings(value) {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("配置必须是 JSON 对象。");
    }
    for (const key of PORTABLE_SETTING_KEYS) {
      if (Object.prototype.hasOwnProperty.call(parsed, key)) this.settings[key] = parsed[key];
    }
    this.normalizeSettings();
    await this.saveSettings();
    this.scheduleOrganizerDecorations();
    this.refreshViews();
  }

  refreshViews() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE)) {
      leaf.view?.scheduleRender?.();
    }
  }

  isFolder(target) {
    return Array.isArray(target?.children);
  }

  isPathExcluded(path) {
    if (!path || path.startsWith(".")) return true;
    const topFolder = path.split("/")[0];
    return this.settings.excludedFolders.some(
      (folder) => topFolder === folder || path.startsWith(`${folder}/`),
    );
  }

  isLearningTarget(target) {
    if (!target?.path || this.isPathExcluded(target.path)) return false;
    return this.isFolder(target) || target.extension === "md";
  }

  getEffectiveMastery(profile) {
    if (!profile?.progressTracked) return 0;
    if (profile.status === "已掌握") return 100;
    if (profile.status === "待整理") return 0;
    const mastery = Number(profile.mastery);
    return Number.isFinite(mastery) ? Math.max(0, Math.min(100, mastery)) : 0;
  }

  deriveAggregateStatus(statusCounts, total) {
    if (!total) return null;
    if ((statusCounts["已掌握"] || 0) === total) return "已掌握";
    if ((statusCounts["待复习"] || 0) > 0) return "待复习";
    if (
      (statusCounts["学习中"] || 0) > 0 ||
      (statusCounts["已掌握"] || 0) > 0
    ) {
      return "学习中";
    }
    return "待整理";
  }

  collectFolderLearningSummaries() {
    const summaries = new Map();
    for (const file of this.app.vault.getMarkdownFiles()) {
      if (!this.isLearningTarget(file)) continue;
      const profile = this.getResolvedOrganizerProfile(file);
      const parts = file.path.split("/");
      parts.pop();
      while (parts.length) {
        const folderPath = parts.join("/");
        const folder = this.app.vault.getAbstractFileByPath(folderPath);
        if (this.isLearningTarget(folder)) {
          if (!summaries.has(folderPath)) {
            summaries.set(folderPath, {
              total: 0,
              trackedCount: 0,
              masteryTotal: 0,
              statusCounts: Object.fromEntries(
                LEARNING_STATUSES.map((status) => [status.name, 0]),
              ),
            });
          }
          const summary = summaries.get(folderPath);
          summary.total += 1;
          if (profile.progressTracked) summary.trackedCount += 1;
          summary.masteryTotal += this.getEffectiveMastery(profile);
          summary.statusCounts[profile.status] =
            (summary.statusCounts[profile.status] || 0) + 1;
        }
        parts.pop();
      }
    }
    for (const summary of summaries.values()) {
      summary.mastery = summary.total
        ? Math.round(summary.masteryTotal / summary.total)
        : 0;
      summary.status = this.deriveAggregateStatus(summary.statusCounts, summary.total);
      delete summary.masteryTotal;
    }
    return summaries;
  }

  getFolderLearningSummary(folder, summaries = null) {
    if (!this.isFolder(folder) || !this.isLearningTarget(folder)) {
      return {
        total: 0,
        trackedCount: 0,
        mastery: 0,
        status: null,
        statusCounts: Object.fromEntries(
          LEARNING_STATUSES.map((status) => [status.name, 0]),
        ),
      };
    }
    return (
      (summaries || this.collectFolderLearningSummaries()).get(folder.path) || {
        total: 0,
        trackedCount: 0,
        mastery: 0,
        status: null,
        statusCounts: Object.fromEntries(
          LEARNING_STATUSES.map((status) => [status.name, 0]),
        ),
      }
    );
  }

  getExplicitVisual(path) {
    const visual = this.settings.organizerVisuals?.[path];
    if (!visual?.icon || !visual?.color) return null;
    return visual;
  }

  getColorName(color) {
    return ORGANIZER_COLORS.find(
      (item) => item.value.toLocaleLowerCase() === String(color).toLocaleLowerCase(),
    )?.name || color;
  }

  colorFromProperty(value) {
    if (!value) return null;
    const normalized = String(value).trim();
    return (
      ORGANIZER_COLORS.find(
        (item) => item.name === normalized || item.value.toLocaleLowerCase() === normalized.toLocaleLowerCase(),
      )?.value || (/^#[0-9a-f]{6}$/i.test(normalized) ? normalized : null)
    );
  }

  hashName(name) {
    let hash = 0;
    for (const character of String(name)) hash = (hash * 31 + character.codePointAt(0)) >>> 0;
    return hash;
  }

  suggestVisual(name, isFile = false) {
    const domain = this.matchDefinition(name, this.getDomainDefinitions());
    if (domain) return { icon: domain.icon, color: domain.color, automatic: true };
    const fallbackColors = ORGANIZER_COLORS.filter((item) => item.name !== "灰色");
    const color = fallbackColors[this.hashName(name) % fallbackColors.length].value;
    return { icon: isFile ? "file-text" : "folder", color, automatic: true };
  }

  inferDomain(name) {
    return this.matchDefinition(name, this.getDomainDefinitions())?.name
      || this.settings.uncategorizedDomain;
  }

  inferNoteType(name) {
    const definitions = this.getNoteTypeDefinitions();
    return this.matchDefinition(name, definitions)?.name || definitions[0]?.name || "普通笔记";
  }

  normalizeReviewDate(value) {
    if (!value) return null;
    const parsed = moment(value);
    return parsed.isValid() ? parsed.format("YYYY-MM-DD") : null;
  }

  booleanFromProperty(value) {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;
    if (typeof value !== "string") return null;
    if (/^(true|yes|1|是)$/i.test(value.trim())) return true;
    if (/^(false|no|0|否)$/i.test(value.trim())) return false;
    return null;
  }

  suggestProfile(name, isFile = false) {
    const visual = this.suggestVisual(name, isFile);
    const domain = this.inferDomain(name);
    const noteType = this.inferNoteType(name);
    const status = isFile && domain === this.settings.uncategorizedDomain ? "待整理" : "学习中";
    const statusInfo = LEARNING_STATUSES.find((item) => item.name === status);
    return {
      ...visual,
      domain,
      noteType,
      status,
      priority: "普通",
      reviewDate: null,
      mastery: statusInfo?.mastery || 10,
      reviewCount: 0,
      reviewInterval: 0,
      lastReview: null,
      progressTracked: false,
    };
  }

  async migrateOrganizerProfiles() {
    if (Number(this.settings.organizerProfileVersion) >= 3) return;
    for (const [path, visual] of Object.entries(this.settings.organizerVisuals)) {
      const target = this.app.vault.getAbstractFileByPath(path);
      const suggested = this.suggestProfile(path, Boolean(target?.extension));
      const status = visual.status || suggested.status;
      const statusInfo = LEARNING_STATUSES.find((item) => item.name === status);
      const normalizedMastery = Number.isFinite(Number(visual.mastery))
        ? Math.max(0, Math.min(100, Number(visual.mastery)))
        : statusInfo?.mastery || 10;
      const progressTracked = typeof visual.progressTracked === "boolean"
        ? visual.progressTracked
        : Boolean(
          visual.automatic === false ||
          Number(visual.reviewCount) > 0 ||
          visual.lastReview ||
          status !== suggested.status ||
          normalizedMastery !== suggested.mastery
        );
      this.settings.organizerVisuals[path] = {
        ...suggested,
        ...visual,
        domain: visual.domain || suggested.domain,
        noteType: visual.noteType || suggested.noteType,
        status,
        priority: visual.priority || "普通",
        reviewDate: this.normalizeReviewDate(visual.reviewDate),
        mastery: normalizedMastery,
        reviewCount: Math.max(0, Number(visual.reviewCount) || 0),
        reviewInterval: Math.max(0, Number(visual.reviewInterval) || 0),
        lastReview: this.normalizeReviewDate(visual.lastReview),
        progressTracked,
      };
    }
    this.settings.organizerProfileVersion = 3;
    await this.saveData(this.settings);
  }

  getResolvedOrganizerProfile(target, suppliedCache = null) {
    if (!target?.path) return this.suggestProfile("未归档", false);
    const isFile = Boolean(target.extension);
    const suggested = this.suggestProfile(target.path, isFile);
    const explicit = this.getExplicitVisual(target.path);
    let progressTrackedDeclared = typeof explicit?.progressTracked === "boolean";
    let inherited = null;

    if (isFile) {
      const parts = target.path.split("/");
      parts.pop();
      while (parts.length) {
        const folderVisual = this.getExplicitVisual(parts.join("/"));
        if (folderVisual) {
          inherited = folderVisual;
          break;
        }
        parts.pop();
      }
    }

    const profile = { ...suggested };
    if (inherited) {
      for (const key of ["color", "icon", "domain", "noteType"]) {
        if (inherited[key] != null) profile[key] = inherited[key];
      }
    }
    if (explicit) Object.assign(profile, explicit);

    let hasProperties = false;
    if (target.extension === "md") {
      const frontmatter = (suppliedCache || this.app.metadataCache.getFileCache(target))?.frontmatter;
      if (frontmatter) {
        const propertyMap = {
          color: this.colorFromProperty(this.readLearningProperty(frontmatter, "color")),
          icon: this.readLearningProperty(frontmatter, "icon"),
          domain: this.readLearningProperty(frontmatter, "domain"),
          noteType: this.readLearningProperty(frontmatter, "noteType"),
          status: this.readLearningProperty(frontmatter, "status"),
          priority: this.readLearningProperty(frontmatter, "priority"),
          reviewDate: this.normalizeReviewDate(this.readLearningProperty(frontmatter, "reviewDate")),
          mastery: this.readLearningProperty(frontmatter, "mastery"),
          reviewCount: this.readLearningProperty(frontmatter, "reviewCount"),
          reviewInterval: this.readLearningProperty(frontmatter, "reviewInterval"),
          lastReview: this.normalizeReviewDate(this.readLearningProperty(frontmatter, "lastReview")),
          progressTracked: this.booleanFromProperty(this.readLearningProperty(frontmatter, "progressTracked")),
        };
        for (const [key, value] of Object.entries(propertyMap)) {
          if (value !== undefined && value !== null && value !== "") {
            profile[key] = value;
            if (key === "progressTracked") progressTrackedDeclared = true;
            hasProperties = true;
          }
        }
      }
    }

    if (!LEARNING_STATUSES.some((item) => item.name === profile.status)) {
      profile.status = suggested.status;
    }
    if (!LEARNING_PRIORITIES.some((item) => item.name === profile.priority)) {
      profile.priority = "普通";
    }
    if (!this.getNoteTypeDefinitions().some((item) => item.name === profile.noteType)) {
      profile.noteType = suggested.noteType;
    }
    profile.reviewDate = this.normalizeReviewDate(profile.reviewDate);
    const mastery = Number(profile.mastery);
    const statusInfo = LEARNING_STATUSES.find((item) => item.name === profile.status);
    profile.mastery = Number.isFinite(mastery)
      ? Math.max(0, Math.min(100, mastery))
      : statusInfo?.mastery || 10;
    profile.reviewCount = Math.max(0, Number(profile.reviewCount) || 0);
    profile.reviewInterval = Math.max(0, Number(profile.reviewInterval) || 0);
    profile.lastReview = this.normalizeReviewDate(profile.lastReview);
    profile.progressTracked = progressTrackedDeclared
      ? Boolean(profile.progressTracked)
      : Boolean(
        profile.automatic === false ||
        profile.reviewCount > 0 ||
        profile.lastReview ||
        profile.status !== suggested.status ||
        profile.mastery !== suggested.mastery
      );
    profile.source = hasProperties ? "property" : explicit ? "explicit" : inherited ? "inherited" : "inferred";
    return profile;
  }

  getResolvedOrganizerVisual(target) {
    return this.getResolvedOrganizerProfile(target);
  }

  openOrganizerModal(target) {
    if (!this.isLearningTarget(target)) {
      new Notice("附件或资源文件不参与学习状态与掌握度。");
      return;
    }
    new OrganizerVisualModal(this.app, this, target).open();
  }

  async syncNoteOrganizerProperties(target, visual) {
    if (target?.extension !== "md") return;
    await this.app.fileManager.processFrontMatter(target, (frontmatter) => {
      const setProperty = (id, value) => {
        const key = this.getPropertyKey(id);
        const legacyKey = DEFAULT_PROPERTY_KEYS[id];
        if (value === undefined || value === null || value === "") delete frontmatter[key];
        else frontmatter[key] = value;
        if (legacyKey !== key) delete frontmatter[legacyKey];
      };
      if (visual) {
        setProperty("color", this.getColorName(visual.color));
        setProperty("icon", visual.icon);
        setProperty("domain", visual.domain);
        setProperty("noteType", visual.noteType);
        setProperty("status", visual.status);
        setProperty("priority", visual.priority);
        setProperty("mastery", visual.mastery);
        setProperty("reviewCount", visual.reviewCount || 0);
        setProperty("reviewInterval", visual.reviewInterval || 0);
        setProperty("progressTracked", visual.progressTracked ? true : null);
        setProperty("lastReview", visual.lastReview || null);
        setProperty("reviewDate", visual.reviewDate || null);
      } else {
        for (const key of this.getAllLearningPropertyKeys()) delete frontmatter[key];
      }
    });
  }

  async cleanupExcludedLearningProperties() {
    const learningKeys = this.getAllLearningPropertyKeys();
    let cleaned = 0;
    for (const file of this.app.vault.getMarkdownFiles()) {
      if (this.isLearningTarget(file)) continue;
      const frontmatter = this.app.metadataCache.getFileCache(file)?.frontmatter;
      if (!frontmatter || !learningKeys.some((key) => frontmatter[key] !== undefined)) continue;
      await this.app.fileManager.processFrontMatter(file, (properties) => {
        for (const key of learningKeys) delete properties[key];
      });
      cleaned += 1;
    }
    if (cleaned > 0) {
      console.info(`[Study Dashboard] 已从 ${cleaned} 个资源文档中移除学习进度属性。`);
    }
    return cleaned;
  }

  async setOrganizerVisual(target, visual, options = {}) {
    const current = this.getResolvedOrganizerProfile(target);
    const status = visual.status || current.status || "待整理";
    const statusInfo = LEARNING_STATUSES.find((item) => item.name === status);
    const mastery = Number(visual.mastery ?? current.mastery);
    const normalizedVisual = {
      icon: visual.icon || current.icon || (this.isFolder(target) ? "folder" : "file-text"),
      color: visual.color || current.color || "#64748b",
      domain: visual.domain || current.domain || this.settings.uncategorizedDomain,
      noteType: visual.noteType || current.noteType || this.getNoteTypeDefinitions()[0]?.name || "普通笔记",
      status,
      priority: visual.priority || current.priority || "普通",
      reviewDate: Object.prototype.hasOwnProperty.call(visual, "reviewDate")
        ? this.normalizeReviewDate(visual.reviewDate)
        : current.reviewDate,
      mastery: Number.isFinite(mastery)
        ? Math.max(0, Math.min(100, mastery))
        : statusInfo?.mastery || 10,
      reviewCount: Math.max(0, Number(visual.reviewCount ?? current.reviewCount) || 0),
      reviewInterval: Math.max(0, Number(visual.reviewInterval ?? current.reviewInterval) || 0),
      lastReview: Object.prototype.hasOwnProperty.call(visual, "lastReview")
        ? this.normalizeReviewDate(visual.lastReview)
        : current.lastReview,
      progressTracked: Object.prototype.hasOwnProperty.call(visual, "progressTracked")
        ? Boolean(visual.progressTracked)
        : Boolean(current.progressTracked),
      automatic: Object.prototype.hasOwnProperty.call(visual, "automatic")
        ? Boolean(visual.automatic)
        : Boolean(current.automatic),
      updatedAt: Date.now(),
    };
    this.settings.organizerVisuals[target.path] = normalizedVisual;
    if (!options.deferSave) await this.saveSettings();
    await this.syncNoteOrganizerProperties(target, normalizedVisual);
    if (!options.deferRefresh) {
      this.scheduleOrganizerDecorations();
      this.refreshViews();
    }
    if (options.showNotice !== false) {
      new Notice(`已更新“${target.name}”的学习属性与${this.getColorName(normalizedVisual.color)}标签。`);
    }
  }

  openQuickOrganizer(target, x, y) {
    if (!this.isLearningTarget(target)) return;
    new QuickOrganizerPopover(this, target, x, y).open();
  }

  closeQuickOrganizer() {
    this.quickOrganizer?.close();
    this.quickOrganizer = null;
  }

  async applySuggestedProfile(target) {
    const suggested = this.suggestProfile(target.path, Boolean(target.extension));
    await this.setOrganizerVisual(target, suggested, { showNotice: false });
    new Notice(`已为“${target.name}”恢复智能学习属性。`);
  }

  async batchUpdateOrganizer(targets, patch) {
    let updated = 0;
    for (const target of targets) {
      if (!target?.path) continue;
      await this.setOrganizerVisual(target, patch, {
        showNotice: false,
        deferSave: true,
        deferRefresh: true,
      });
      updated += 1;
    }
    await this.saveSettings();
    this.scheduleOrganizerDecorations();
    this.refreshViews();
    new Notice(`已批量更新 ${updated} 篇笔记。`);
    return updated;
  }

  async completeReview(target, ratingId) {
    const rating = this.getReviewRatings().find((item) => item.id === ratingId);
    if (!rating || target?.extension !== "md") return;
    const profile = this.getResolvedOrganizerProfile(target);
    const currentInterval = Math.max(1, Number(profile.reviewInterval) || 1);
    const nextInterval = Math.max(
      rating.minimumDays,
      Math.round(currentInterval * rating.factor),
    );
    const mastery = Math.min(100, profile.mastery + rating.mastery);
    const status = rating.id === "easy" && mastery >= 90 ? "已掌握" : "待复习";
    await this.setOrganizerVisual(
      target,
      {
        status,
        mastery,
        reviewCount: profile.reviewCount + 1,
        reviewInterval: nextInterval,
        lastReview: moment().format("YYYY-MM-DD"),
        reviewDate: moment().add(nextInterval, "day").format("YYYY-MM-DD"),
        progressTracked: true,
        automatic: false,
      },
      { showNotice: false },
    );
    new Notice(`${target.basename}：${rating.name}，${nextInterval} 天后再次复习。`);
  }

  async clearOrganizerVisual(target) {
    delete this.settings.organizerVisuals[target.path];
    await this.saveSettings();
    await this.syncNoteOrganizerProperties(target, null);
    this.scheduleOrganizerDecorations();
    this.refreshViews();
    const inherited = this.getResolvedOrganizerVisual(target);
    new Notice(
      inherited
        ? `已清除“${target.name}”的自定义样式，继续继承上级文件夹颜色。`
        : `已清除“${target.name}”的图标与颜色。`,
    );
  }

  async handleOrganizerCreate(target) {
    if (
      !this.settings.autoDecorateFolders ||
      !this.isFolder(target) ||
      !target.path ||
      target.path.startsWith(".") ||
      this.getExplicitVisual(target.path)
    ) {
      this.scheduleOrganizerDecorations();
      return;
    }
    try {
      await this.setOrganizerVisual(target, this.suggestProfile(target.name), { showNotice: false });
    } catch (error) {
      console.error("[Study Dashboard] 自动设置文件夹图标失败", error);
    }
  }

  async bootstrapOrganizerFolders() {
    if (this.settings.organizerBootstrapped) return;
    const folders = this.app.vault
      .getRoot()
      .children.filter((target) => this.isFolder(target) && target.path && !target.path.startsWith("."));
    for (const folder of folders) {
      if (!this.getExplicitVisual(folder.path)) {
        this.settings.organizerVisuals[folder.path] = {
          ...this.suggestProfile(folder.name),
          updatedAt: Date.now(),
        };
      }
    }
    this.settings.organizerBootstrapped = true;
    await this.saveSettings();
  }

  async handleOrganizerRename(target, oldPath) {
    if (!oldPath || !target?.path || oldPath === target.path) return;
    const migrated = {};
    let changed = false;
    for (const [path, visual] of Object.entries(this.settings.organizerVisuals)) {
      if (path === oldPath || path.startsWith(`${oldPath}/`)) {
        migrated[`${target.path}${path.slice(oldPath.length)}`] = visual;
        changed = true;
      } else {
        migrated[path] = visual;
      }
    }
    if (changed) {
      this.settings.organizerVisuals = migrated;
      await this.saveSettings();
    }
    this.scheduleOrganizerDecorations();
  }

  async handleOrganizerDelete(target) {
    if (!target?.path) return;
    let changed = false;
    for (const path of Object.keys(this.settings.organizerVisuals)) {
      if (path === target.path || path.startsWith(`${target.path}/`)) {
        delete this.settings.organizerVisuals[path];
        changed = true;
      }
    }
    if (changed) await this.saveSettings();
    this.scheduleOrganizerDecorations();
  }

  startExplorerDecorator() {
    this.explorerObserver?.disconnect();
    this.explorerObserver = new MutationObserver(() => this.scheduleOrganizerDecorations());
    this.explorerObserver.observe(document.body, { childList: true, subtree: true });
    this.scheduleOrganizerDecorations(0);
  }

  scheduleOrganizerDecorations(delay = 90) {
    this.scheduleExplorerDecorations(delay);
    this.scheduleTabDecorations(delay);
  }

  scheduleExplorerDecorations(delay = 90) {
    if (this.explorerRenderTimer) window.clearTimeout(this.explorerRenderTimer);
    this.explorerRenderTimer = window.setTimeout(() => this.applyExplorerDecorations(), delay);
  }

  scheduleTabDecorations(delay = 90) {
    if (this.tabRenderTimer) window.clearTimeout(this.tabRenderTimer);
    this.tabRenderTimer = window.setTimeout(() => this.applyTabDecorations(), delay);
  }

  clearTabDecorations() {
    for (const tab of document.querySelectorAll(".workspace-tab-header.study-organizer-tab")) {
      tab.removeClass("study-organizer-tab");
      tab.style.removeProperty("--tab-organizer-color");
      tab.style.removeProperty("--tab-status-color");
      tab.style.removeProperty("--tab-mastery");
      tab.removeAttribute("data-organizer-path");
      tab.querySelector(":scope .study-organizer-tab-status")?.remove();
      tab.querySelector(":scope > .study-organizer-tab-progress")?.remove();
    }
  }

  decorateTab(tab, target) {
    if (!tab || !this.isLearningTarget(target)) return;
    const visual = this.getResolvedOrganizerProfile(target);
    if (!visual) return;
    const statusInfo = LEARNING_STATUSES.find((item) => item.name === visual.status);
    tab.addClass("study-organizer-tab");
    tab.dataset.organizerPath = target.path;
    tab.style.setProperty("--tab-organizer-color", visual.color || "#64748b");
    tab.style.setProperty("--tab-status-color", statusInfo?.color || "#64748b");
    const mastery = this.getEffectiveMastery(visual);
    tab.style.setProperty("--tab-mastery", `${mastery}%`);

    const inner = tab.querySelector(".workspace-tab-header-inner");
    const statusContainer = inner?.querySelector(".workspace-tab-header-status-container");
    const closeButton = inner?.querySelector(".workspace-tab-header-inner-close-button");
    let status = inner?.querySelector(":scope > .study-organizer-tab-status");
    if (!status && inner) {
      status = document.createElement("span");
      status.className = "study-organizer-tab-status";
      inner.insertBefore(status, statusContainer || closeButton || null);
    }
    if (status && status.dataset.status !== visual.status) {
      status.empty();
      const icon = status.createSpan();
      setIcon(icon, statusInfo?.icon || "circle");
      status.createSpan({ text: visual.status });
      status.dataset.status = visual.status;
    }
    status?.setAttribute(
      "title",
      `${visual.status} · ${this.getColorName(visual.color)} · 单击快速修改`,
    );

    let progress = tab.querySelector(":scope > .study-organizer-tab-progress");
    if (!progress) {
      progress = document.createElement("span");
      progress.className = "study-organizer-tab-progress";
      progress.createSpan({ cls: "study-organizer-tab-progress-fill" });
      tab.appendChild(progress);
    }
    progress.dataset.mastery = String(mastery);
    progress.setAttribute(
      "title",
      `掌握程度 ${mastery}% · ${this.getColorName(visual.color)}`,
    );
  }

  applyTabDecorations() {
    const decorated = new Set();
    const applyLeaf = (leaf) => {
      const target = leaf?.view?.file;
      const tab = leaf?.tabHeaderEl;
      if (!tab || target?.extension !== "md") return;
      this.decorateTab(tab, target);
      decorated.add(tab);
    };

    this.app.workspace.iterateAllLeaves(applyLeaf);
    for (const leaf of this.app.workspace.getLeavesOfType("markdown")) applyLeaf(leaf);

    const filesByBasename = new Map();
    for (const file of this.app.vault.getMarkdownFiles()) {
      if (!filesByBasename.has(file.basename)) filesByBasename.set(file.basename, file);
      else filesByBasename.set(file.basename, null);
    }
    for (const tab of document.querySelectorAll(
      '.workspace-tab-header[data-type="markdown"]',
    )) {
      if (decorated.has(tab)) continue;
      const title = tab.querySelector(".workspace-tab-header-inner-title")?.textContent?.trim();
      const target = title ? filesByBasename.get(title) : null;
      if (target) this.decorateTab(tab, target);
    }

    for (const tab of document.querySelectorAll(".workspace-tab-header.study-organizer-tab")) {
      const target = this.app.vault.getAbstractFileByPath(tab.dataset.organizerPath || "");
      if (this.isLearningTarget(target)) continue;
      tab.removeClass("study-organizer-tab");
      tab.style.removeProperty("--tab-organizer-color");
      tab.style.removeProperty("--tab-status-color");
      tab.style.removeProperty("--tab-mastery");
      tab.removeAttribute("data-organizer-path");
      tab.querySelector(":scope .study-organizer-tab-status")?.remove();
      tab.querySelector(":scope > .study-organizer-tab-progress")?.remove();
    }
  }

  clearExplorerDecorations() {
    for (const row of document.querySelectorAll(".study-organizer-decorated")) {
      row.removeClass(
        "study-organizer-decorated",
        "study-organizer-explicit",
        "study-organizer-inherited",
        "study-organizer-resource",
      );
      row.style.removeProperty("--organizer-color");
      row.removeAttribute("data-organizer-source");
      row.querySelectorAll(
        ":scope > .study-organizer-icon, :scope > .study-organizer-dot, :scope > .study-organizer-status",
      ).forEach((el) => el.remove());
    }
  }

  applyExplorerDecorations() {
    const rows = document.querySelectorAll(
      ".nav-folder-title[data-path], .nav-file-title[data-path]",
    );
    const folderSummaries = this.collectFolderLearningSummaries();
    for (const row of rows) {
      const path = row.getAttribute("data-path");
      const target = path ? this.app.vault.getAbstractFileByPath(path) : null;
      const visual = this.getResolvedOrganizerVisual(target);
      const folderSummary = this.isFolder(target)
        ? this.getFolderLearningSummary(target, folderSummaries)
        : null;
      const existingIcon = row.querySelector(":scope > .study-organizer-icon");
      const existingDot = row.querySelector(":scope > .study-organizer-dot");
      const existingStatus = row.querySelector(":scope > .study-organizer-status");

      if (!visual) {
        row.removeClass(
          "study-organizer-decorated",
          "study-organizer-explicit",
          "study-organizer-inherited",
          "study-organizer-resource",
        );
        row.style.removeProperty("--organizer-color");
        row.removeAttribute("data-organizer-source");
        existingIcon?.remove();
        existingDot?.remove();
        existingStatus?.remove();
        continue;
      }

      const isExplicit = visual.source === "explicit" || visual.source === "property";
      const isLearningTarget = this.isLearningTarget(target);
      row.addClass("study-organizer-decorated");
      row.toggleClass("study-organizer-explicit", isExplicit);
      row.toggleClass("study-organizer-inherited", !isExplicit);
      row.toggleClass("study-organizer-resource", !isLearningTarget);
      row.style.setProperty("--organizer-color", visual.color);
      row.dataset.organizerSource = visual.source;
      row.setAttribute(
        "title",
        isLearningTarget
          ? folderSummary
            ? folderSummary.status
              ? `${path} · 自动状态 ${folderSummary.status} · 掌握度 ${folderSummary.mastery}% · ${folderSummary.trackedCount}/${folderSummary.total} 已确认 · 双击查看与修改外观`
              : `${path} · 暂无可统计笔记 · 双击修改颜色与图标`
            : `${path} · ${visual.status} · ${this.getColorName(visual.color)}归类${isExplicit ? "" : "（继承）"} · 双击快速修改`
          : `${path} · 资源文件 · ${this.getColorName(visual.color)}归类${isExplicit ? "" : "（继承）"} · 不参与学习进度`,
      );

      const content = row.querySelector(".nav-folder-title-content, .nav-file-title-content");
      let dot = existingDot;
      if (!dot) {
        dot = document.createElement("span");
        dot.className = "study-organizer-dot";
        dot.setAttribute("aria-hidden", "true");
        row.insertBefore(dot, content || null);
      }

      if (isExplicit) {
        let iconEl = existingIcon;
        if (!iconEl) {
          iconEl = document.createElement("span");
          iconEl.className = "study-organizer-icon";
          row.insertBefore(iconEl, dot);
        }
        if (iconEl.dataset.icon !== visual.icon) {
          iconEl.empty();
          setIcon(iconEl, visual.icon);
          iconEl.dataset.icon = visual.icon;
        }
      } else {
        existingIcon?.remove();
      }

      if (!isLearningTarget) {
        existingStatus?.remove();
        continue;
      }

      const displayStatus = folderSummary ? folderSummary.status : visual.status;
      if (!displayStatus) {
        existingStatus?.remove();
        continue;
      }
      const statusInfo = LEARNING_STATUSES.find((item) => item.name === displayStatus);
      let statusEl = existingStatus;
      if (!statusEl) {
        statusEl = document.createElement("span");
        statusEl.className = "study-organizer-status";
        row.appendChild(statusEl);
      }
      statusEl.toggleClass("is-folder-summary", Boolean(folderSummary));
      statusEl.style.setProperty("--organizer-status-color", statusInfo?.color || "#64748b");
      statusEl.style.setProperty(
        "--folder-mastery",
        `${folderSummary?.mastery ?? visual.mastery ?? 0}%`,
      );
      if (statusEl.dataset.status !== displayStatus) {
        statusEl.empty();
        const statusIcon = statusEl.createSpan();
        setIcon(statusIcon, statusInfo?.icon || "circle");
        statusEl.createSpan({ text: displayStatus });
        statusEl.dataset.status = displayStatus;
      }
      statusEl.setAttribute(
        "title",
        folderSummary
          ? `${displayStatus} · 掌握度 ${folderSummary.mastery}% · ${folderSummary.trackedCount}/${folderSummary.total} 已确认 · 状态由子笔记自动汇总`
          : `${displayStatus} · 单击快速修改`,
      );
    }
  }

  async activateView(focus = true) {
    let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE)[0];
    if (!leaf) {
      leaf = this.app.workspace.getLeaf("tab");
      await leaf.setViewState({ type: VIEW_TYPE, active: true });
      leaf.setPinned(true);
    }
    if (focus) this.app.workspace.revealLeaf(leaf);
    return leaf;
  }
};
