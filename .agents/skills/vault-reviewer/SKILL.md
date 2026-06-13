---
name: vault-reviewer
description: Review διάνοια for stale inbox items, isolated notes, broken links, weak notes, missing MOC links, and unresolved contradictions.
---

Use this skill for weekly or monthly vault review.

Review checklist:

1. Inspect `00 - Inbox`.
2. Find raw notes that should become source notes, atomic notes, projects, or review questions.
3. Identify notes with few or no wikilinks.
4. Identify MOCs that need updates.
5. Identify contradictions worth adding to `08 - Review/Contradictions.md`.
6. Identify open questions worth adding to `08 - Review/Open Questions.md`.
7. Run `python scripts/check_vault.py` if available.
8. Produce a short prioritized action list.

Do not try to perfect the entire vault in one pass. Prefer small, high-leverage improvements.
