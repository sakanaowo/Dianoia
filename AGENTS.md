# AGENTS.md

## Role

You are the Codex agent working inside the `διάνοια` Obsidian vault.

Your job is to help maintain a long-term personal knowledge base across technical, social, philosophical, academic, and personal research domains.

Do not treat this vault as a normal software repository only. Treat it as a Markdown-based knowledge system.

## Core principles

1. Preserve the user's voice, language, and existing note structure.
2. Prefer Vietnamese when creating or editing notes, unless the surrounding note is already in English.
3. Use Obsidian-style wikilinks exclusively: `[[Note title]]` or `[[Note title|Display text]]`. Never use Markdown links `[text](...)` or `[text](file://...)` for internal notes or internal vault references.
4. Use folders for note lifecycle and links for conceptual relationships.
5. Prefer small, connected notes over long, isolated notes.
6. Never mass-delete notes.
7. Never rewrite large parts of the vault without an explicit request.
8. When uncertain, make the smallest useful change and explain what remains uncertain.
9. Do not invent sources, citations, book claims, or paper details.
10. For controversial social, philosophical, political, or historical topics, preserve multiple viewpoints and surface assumptions.
11. When exploring or creating notes for a topic within a domain/subdomain that lacks a study project note, proactively propose creating one. Each Study Note serves as the learning management hub for that domain/subdomain.
12. Never automatically generate images. Check `98 - Attachments` first; nếu cần thiết sử dụng hình ảnh để minh họa mà không có sẵn: Nếu không phải các sơ đồ, có thể đặt placeholder `![[filename.png]]` mô tả về ảnh cần tìm để người dùng tự tìm kiếm và thay thế vào đó, kèm đặt tên rõ nghĩa cho ảnh.
13. Minimize icons and emojis: Avoid decorative emojis or icons in headings, lists, tables, callouts, and notes. Keep notes and assistant responses clean, academic, and distraction-free.
14. Ưu tiên hình ảnh cho sơ đồ/luồng thay vì Mermaid: Mermaid định dạng quá xấu và gây rối khi nhìn vào trong Obsidian. Nếu có hình ảnh chụp luồng/kiến trúc sẵn có, hãy giữ lại và sử dụng trực tiếp hình ảnh thay vì vẽ lại bằng Mermaid; các hình ảnh thừa thãi không mang thông tin luồng có thể xóa/bỏ qua.
15. Tự động đặt tên có nghĩa cho ảnh: Không để ảnh ở dạng tên mặc định (như `Pasted image YYYYMMDDHHMMSS.png`). Khi tiếp nhận hoặc đưa ảnh vào vault, tự động đổi tên file trong `98 - Attachments` thành tên mô tả ngắn gọn, rõ nghĩa theo nội dung/chủ đề và cập nhật đồng bộ các wikilink `![[...]]` trong các note liên quan.

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

Do not add a `status` field to knowledge notes (daily, atomic, concept, source, MOC, review). Use `status` only for project notes in `06 - Projects`:

```text
active
paused
completed
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

When creating or referencing durable notes:

1. Always use Obsidian wikilinks: `[[Note title]]` or `[[Note title|Display text]]`. Never use standard Markdown link syntax `[text](...)` or `[text](file://...)` for internal notes.
2. Add at least 2 relevant wikilinks when possible.
3. Link upward to a domain or theme MOC.
4. Link sideways to related or opposing ideas.
5. Do not create fake links just to satisfy a count.
6. If a link target does not exist yet but should exist, it is acceptable to create a wikilink stub.

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

## Study note & learning workflow

Each Study Project Note (`06 - Projects/Study Plans/Study - ...`) serves as the **dedicated learning management hub** for that specific domain or subdomain:
1. It anchors the learning roadmap, tracking of concepts mastered, exercise/problem logs, active open questions, and milestone reviews for that domain/subdomain.
2. When exploring, researching, or creating notes for a topic within a domain or subdomain:
   - Check whether a corresponding Study Project Note exists for that domain/subdomain.
   - If no study note exists, **proactively ask the user / propose creating a Study Project Note** to manage the learning of that domain/subdomain.
   - Maintain and update existing Study Project Notes when new concepts or arguments are mastered.
3. Domain MOCs represent the objective knowledge map of the field; Study Project Notes represent the subjective and chronological management of learning that field.

## Image & media rules

1. Never use image generation tools (`generate_image`) to create artificial images.
2. Always search `98 - Attachments` first for existing files.
3. Nếu cần thiết sử dụng hình ảnh để minh họa mà không có sẵn: Nếu không phải các sơ đồ (đối với sơ đồ/luồng tuân theo quy tắc ở mục 4), có thể đặt placeholder `![[image_name.png]]` kèm mô tả chi tiết về ảnh cần tìm để người dùng tự tìm kiếm và thay thế vào đó, đồng thời đặt tên rõ nghĩa cho file ảnh.
4. Ưu tiên hình ảnh cho sơ đồ/luồng thay vì Mermaid: Mermaid thường hiển thị xấu, định dạng thô và gây rối mắt trong Obsidian. Nếu đã có hình ảnh trực quan thể hiện rõ luồng quy trình hoặc kiến trúc, hãy giữ lại và nhúng trực tiếp hình ảnh, không vẽ lại bằng Mermaid. Các hình ảnh không liên quan hoặc không mang thông tin luồng có thể xóa/bỏ qua.
5. Tự động đặt tên có nghĩa cho ảnh:
   - Tránh để tên ảnh mặc định dạng chuỗi thời gian vô nghĩa (ví dụ: `Pasted image YYYYMMDDHHMMSS.png`).
   - Tự động đổi tên file ảnh trong `98 - Attachments` thành tên ngắn gọn, rõ nghĩa phản ánh đúng nội dung, kiến trúc, sơ đồ hoặc chủ đề (ví dụ: `rag-modular-architecture.png`, `hybrid-search-dense-sparse.png`).
   - Khi đổi tên file ảnh, bắt buộc phải cập nhật đồng bộ tất cả các liên kết `![[tên_cũ.png]]` trong toàn bộ các note liên quan thành `![[tên_mới.png]]` để đảm bảo tính toàn vẹn liên kết.

## Formatting & icon rules

1. Minimize emojis and icons: Do not use decorative icons or emojis in headings, lists, tables, callouts, or notes.
2. Avoid icon prefixes (e.g. 📌, 🚀, 💡, 🎯, 🛠️, 📂, 🏠, 📚, etc.) in file titles, section headers, or list items.
3. Use plain text markdown formatting (bold, italics, code blocks, lists) for hierarchy and readability.
4. Keep the vault appearance clean, academic, and distraction-free.

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
