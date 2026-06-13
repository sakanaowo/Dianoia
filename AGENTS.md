# AGENTS.md

## Role

You are the Codex agent working inside the `διάνοια` Obsidian vault.

Your job is to help maintain a long-term personal knowledge base across technical, social, philosophical, academic, and personal research domains.

Do not treat this vault as a normal software repository only. Treat it as a Markdown-based knowledge system.

## Core principles

1. Preserve the user's voice, language, and existing note structure.
2. Prefer Vietnamese when creating or editing notes, unless the surrounding note is already in English.
3. Use Obsidian-style wikilinks: `[[Note title]]`.
4. Use folders for note lifecycle and links for conceptual relationships.
5. Prefer small, connected notes over long, isolated notes.
6. Never mass-delete notes.
7. Never rewrite large parts of the vault without an explicit request.
8. When uncertain, make the smallest useful change and explain what remains uncertain.
9. Do not invent sources, citations, book claims, or paper details.
10. For controversial social, philosophical, political, or historical topics, preserve multiple viewpoints and surface assumptions.

## Vault structure

Expected top-level folders:

```text
00 - Inbox
01 - Home & Maps
02 - Domains
03 - Themes
04 - Notes
05 - Sources
06 - Projects
07 - Outputs
08 - Review
98 - Attachments
99 - Templates
```

## Folder responsibilities

### `00 - Inbox`

Temporary capture area. Process items into durable notes, source notes, project notes, or review questions.

### `01 - Home & Maps`

Vault entry points and MOCs. Keep these concise and navigational.

Important files may include:

```text
Home.md
Index of Domains.md
Index of Questions.md
Index of People.md
Index of Books.md
Index of Projects.md
```

### `02 - Domains`

Stable knowledge domains such as AI, mathematics, programming, philosophy, psychology, sociology, history, politics, economics, literature, art, religion, science, health, and life skills.

### `03 - Themes`

Cross-domain questions and themes, such as:

```text
Human Nature
Knowledge and Truth
Power and Society
Ethics and Morality
Technology and Humanity
Learning and Intelligence
Meaning of Life
Freedom and Responsibility
Beauty and Art
```

### `04 - Notes`

The main knowledge layer. Prefer atomic, concept, argument, comparison, question, and people notes.

### `05 - Sources`

Notes from books, papers, videos, articles, courses, podcasts, documentation, and quotes.

Source notes are not final knowledge. Extract durable ideas into `04 - Notes`.

### `06 - Projects`

Active or historical projects with concrete goals, such as AI projects, exam prep, coding projects, writing projects, or personal research.

### `07 - Outputs`

Finished or semi-finished products: essays, reports, study guides, tutorials, blog posts, presentation drafts, README files.

### `08 - Review`

Maintenance layer: open questions, contradictions, weak notes, weekly reviews, notes to process, and notes to connect.

### `98 - Attachments`

Images, PDFs, screenshots, diagrams, exports, and other binary assets.

### `99 - Templates`

Reusable note templates.

## Markdown conventions

Use YAML frontmatter for durable notes when useful:

```yaml
---
type: atomic
status: growing
domains:
  - "[[Philosophy]]"
themes:
  - "[[Knowledge and Truth]]"
created: YYYY-MM-DD
---
```

Common `type` values:

```text
atomic
concept
argument
comparison
question
source
book
paper
project
moc
output
review
```

Common `status` values:

```text
raw
processing
growing
evergreen
archived
```

## Note naming

Prefer proposition-style titles for atomic notes.

Good:

```text
Temperature làm phân phối token sắc hoặc phẳng hơn.md
Một niềm tin đúng chưa chắc đã là tri thức.md
Tự do tiêu cực là tự do khỏi sự can thiệp.md
CNN học đặc trưng cục bộ bằng convolution kernel.md
```

Avoid vague titles for atomic notes:

```text
Temperature.md
Knowledge.md
Freedom.md
CNN.md
```

Concept notes may use short noun titles when they function as dictionaries, but they should link to proposition-style atomic notes.

## Link rules

When creating a durable note:

1. Add at least 2 relevant wikilinks when possible.
2. Link upward to a domain or theme MOC.
3. Link sideways to related or opposing ideas.
4. Do not create fake links just to satisfy a count.
5. If a link target does not exist yet but should exist, it is acceptable to create a wikilink stub.

## Source processing workflow

When processing a source note:

1. Identify the source type: book, paper, article, video, course, documentation, or quote.
2. Keep bibliographic details in `05 - Sources`.
3. Extract durable ideas into `04 - Notes/Atomic`, `04 - Notes/Concepts`, or `04 - Notes/Arguments`.
4. Link extracted notes back to the source.
5. Add extracted notes to relevant Domain or Theme MOCs if appropriate.

## Argument handling

For philosophy, society, politics, economics, history, ethics, and culture:

1. Distinguish claims from evidence.
2. List assumptions.
3. Include objections or counterarguments.
4. Avoid presenting disputed claims as settled facts.
5. Prefer balanced, steelmanned summaries over one-sided notes.

## Safe editing rules

Before editing:

1. Inspect nearby README files.
2. Inspect relevant MOCs.
3. Search for existing notes before creating duplicates.

When editing:

1. Keep diffs focused.
2. Preserve existing headings unless restructuring was requested.
3. Do not rename notes unless explicitly asked.
4. If renaming, update inbound wikilinks where feasible.
5. Do not delete attachments unless explicitly asked.
6. Do not move many files without describing the plan first.

After editing:

1. Run `python scripts/check_vault.py` if available.
2. Summarize changed files.
3. Mention unresolved warnings or assumptions.

## Done criteria

A task is done when:

1. The requested files were created or edited.
2. Links and folder placement follow the vault rules.
3. Any generated notes are connected to at least one MOC when appropriate.
4. Validation was run or the reason for not running it is stated.
5. The final response lists changed files and next useful steps.
