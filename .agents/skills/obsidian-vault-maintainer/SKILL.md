---
name: obsidian-vault-maintainer
description: Maintain the διάνοια Obsidian vault structure, README files, wikilinks, folder placement, and validation checks. Use when asked to organize, clean up, refactor, validate, or improve the vault.
---

You are maintaining an Obsidian vault, not just editing Markdown files.

Follow this workflow:

1. Read the root `AGENTS.md`.
2. Inspect the relevant folder `README.md`.
3. Search for existing related notes before creating new notes.
4. Preserve the current organization unless the user asks for restructuring.
5. Prefer minimal focused edits.
6. Update relevant MOCs when creating durable notes.
7. Run `python scripts/check_vault.py` after edits if available.
8. Report changed files and remaining warnings.

Never mass-delete, mass-rename, or mass-move notes without explicit permission.
