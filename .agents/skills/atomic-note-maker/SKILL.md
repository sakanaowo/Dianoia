---
name: atomic-note-maker
description: Convert raw ideas into Obsidian atomic notes for διάνοια. Use when the user asks to turn notes, lecture points, explanations, or thoughts into durable knowledge notes.
---

Create atomic notes using these rules:

1. One note = one clear idea.
2. Prefer proposition-style titles.
3. Write in Vietnamese unless the source context is English.
4. Use YAML frontmatter.
5. Include a short explanation in the user's own style.
6. Add examples when helpful.
7. Add meaningful wikilinks to domains, themes, related ideas, or opposing ideas.
8. If the source is known, link back to it.
9. Avoid copying large chunks verbatim from source material.

Recommended structure:

```md
---
type: atomic
status: growing
domains:
  - "[[...]]"
themes:
  - "[[...]]"
created: YYYY-MM-DD
---

# Title

## Ý chính

## Giải thích bằng lời của mình

## Ví dụ

## Liên kết

- Liên quan:
- Trái ngược:
- Ứng dụng trong:

## Nguồn
```
