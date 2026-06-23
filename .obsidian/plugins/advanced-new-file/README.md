# Advanced New File

An independent Obsidian plugin for quickly creating files and folders anywhere in a vault.

The main command behaves like a VS Code-style advanced new file prompt: type a path, press Enter, and the plugin creates any missing parent folders.

## Main workflow

Open `Advanced New File: Create new file`, then type a path such as:

```text
04 - Notes/Atomic/My new note
06 - Projects/New project/README.md
```

Behavior:

- Suggestions appear while typing, with recent paths first.
- Press `Tab` to accept the highlighted suggestion.
- Use `Arrow Up` and `Arrow Down` to move through suggestions.
- Missing parent folders are created automatically.
- `.md` is added when the path has no extension.
- The new file opens immediately by default.
- Folder-specific template rules choose an existing template from `99 - Templates`.
- The modal previews the template that will be applied for the current path.
- Duplicate names auto-increment, for example `Note 1.md`.
- A path ending with `/` creates a folder instead of a file.
- `./` and `../` are resolved relative to the current note.
- A path starting with `/` is resolved from the vault root.

## Commands

- `Advanced New File: Create new file`
- `Advanced New File: Create new file: current folder`
- `Advanced New File: Create new file: type full path`
- `Advanced New File: Create new folder`
- `Advanced New File: Create new file in <quick folder>`

The existing `Mod + Alt + N` hotkey in this vault is attached to the main command.

## Settings

- Default folder
- Default extension
- Fallback template path with `{{title}}`, `{{folder}}`, `{{date}}`, and `{{time}}`
- Template rules in `folder => template` format. `->`, `→`, and `|` are also accepted.
- Open after create
- Remember last folder
- Recent path limit
- Auto-increment duplicate names
- Quick folders

## Suggested quick folders

```text
00 - Inbox
04 - Notes/Atomic
04 - Notes/Concepts
04 - Notes/Arguments
05 - Sources
06 - Projects
```

## Notes

This plugin is intentionally small and does not require a build step. It ships as plain `main.js`, `manifest.json`, and `styles.css`.

Older settings saved as `folderTemplates` are migrated into `templateRules` when the plugin loads.
