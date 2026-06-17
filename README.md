---
type: output
status: evergreen
created: 2026-06-14
updated: 2026-06-14
related:
  - "[[Home]]"
  - "[[Index of Domains]]"
  - "[[Index of Questions]]"
  - "[[Power and Society]]"
  - "[[Knowledge and Truth]]"
---
# Dianoia Vault Operating Manual

Tài liệu này là luật vận hành tổng thể cho vault `Dianoia`: cách capture, xử lý source, viết note, đặt tên, link, review, tạo output và dùng agent. Mục tiêu không phải là lưu thật nhiều thông tin, mà là biến thông tin thành hệ thống tri thức cá nhân có thể dùng lại lâu dài.

---

## 1. Triết lý vận hành

Vault này không phải là một kho chứa file Markdown. Nó là một hệ thống tư duy.

Một note tốt không chỉ trả lời “nội dung này nói gì?”, mà còn trả lời:

- Ý tưởng nào đáng giữ lại?
- Claim nào cần kiểm chứng?
- Khái niệm nào có thể tái dùng?
- Nó liên quan đến domain, theme, câu hỏi hoặc dự án nào?
- Nó có thể giúp mình viết, học, tranh luận hoặc ra quyết định tốt hơn không?

Nguyên tắc lõi:

```text
Source không phải tri thức cuối cùng.
Insight mới là đơn vị cần giữ lại.
Link quan trọng hơn folder.
Folder quản lý vòng đời note; link quản lý quan hệ ý tưởng.
```

Nói ngắn gọn:

```text
Capture → Process → Distill → Connect → Review → Output
```

---

## 2. Cấu trúc vault

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

### 00 - Inbox

Nơi bắt nhanh mọi thứ chưa rõ sẽ đi đâu.

Dùng cho:

- Daily notes
- Quick captures
- Ý tưởng vụn
- Đoạn text chưa xử lý
- Link vừa lưu
- Câu hỏi bất chợt

Không để note chết ở đây. Inbox phải được dọn định kỳ.

Quy tắc:

```text
Nếu note còn mơ hồ → Inbox.
Nếu biết nó là nguồn → Sources.
Nếu đã là insight → Notes.
Nếu là việc cần làm → Projects hoặc Review.
```

---

### 01 - Home & Maps

Nơi điều hướng vault.

Dùng cho:

- `Home.md`
- `Index of Domains.md`
- `Index of Questions.md`
- `Index of People.md`
- `Index of Books.md`
- `Index of Projects.md`

Các note ở đây không nên quá dài. Chúng là bản đồ, không phải nơi nhồi toàn bộ kiến thức.

---

### 02 - Domains

Nơi gom các lĩnh vực ổn định.

Ví dụ:

```text
AI & Computer Science
Philosophy
Politics
Economics
Sociology
Psychology
History
Mathematics
Programming
Health
Life Skills
```

Domain trả lời câu hỏi:

```text
Ý tưởng này thuộc lĩnh vực nào?
```

Ví dụ note `Quyền lực vận hành bằng cách định hướng cách con người diễn giải thế giới` có thể thuộc:

```text
Philosophy
Sociology
Politics
```

---

### 03 - Themes

Nơi gom các chủ đề xuyên lĩnh vực.

Ví dụ:

```text
Power and Society
Knowledge and Truth
Freedom and Responsibility
Human Nature
Learning and Intelligence
Technology and Humanity
Meaning of Life
Ethics and Morality
```

Theme trả lời câu hỏi:

```text
Ý tưởng này đang tham gia vào vấn đề lớn nào?
```

Khác biệt:

```text
Domain = lĩnh vực học thuật.
Theme = câu hỏi xuyên lĩnh vực.
```

Ví dụ:

- `Philosophy` là domain.
- `Knowledge and Truth` là theme.

---

### 04 - Notes

Đây là tầng tri thức chính.

Gồm:

```text
Atomic
Concepts
Arguments
Comparisons
People
Questions
```

Quy tắc quan trọng:

```text
Nếu note có thể dùng lại trong nhiều ngữ cảnh → đưa vào 04 - Notes.
Nếu note chỉ là nguồn gốc/thô → để ở 05 - Sources.
```

---

### 05 - Sources

Nơi giữ nguồn.

Gồm:

```text
Articles
Books
Courses
Papers
Podcasts
Quotes
Videos
```

Dùng cho:

- Transcript video
- Highlight sách
- Paper note
- Article clipping
- Course note
- Podcast summary

Source note không phải final knowledge. Nhiệm vụ của source note là cung cấp vật liệu để extract ra concept, atomic note, argument note hoặc question note.

---

### 06 - Projects

Nơi quản lý việc có mục tiêu cụ thể.

Dùng cho:

- AI projects
- Exam prep
- Writing projects
- Study plans
- Personal research
- Coding projects

Project khác note tri thức ở chỗ nó có:

```text
mục tiêu
đầu ra
deadline hoặc trạng thái tiến độ
next action
```

---

### 07 - Outputs

Nơi chứa sản phẩm đã hoặc sắp xuất bản/dùng lại.

Ví dụ:

```text
Essays
Blog Posts
Reports
Study Guides
Presentations
Personal Manifestos
Tutorials
```

Output là thứ được tổng hợp từ nhiều note nhỏ.

Ví dụ:

```text
05 - Sources/Videos/Video về quyền lực
→ 04 - Notes/Atomic/Các insight về quyền lực
→ 04 - Notes/Arguments/Lập luận về quyền lực và niềm tin
→ 07 - Outputs/Essays/Quyền lực vận hành qua niềm tin.md
```

---

### 08 - Review

Tầng bảo trì hệ thống.

Gồm:

```text
Open Questions.md
Contradictions.md
To Process.md
To Connect.md
```

Dùng cho:

- Câu hỏi chưa trả lời
- Claim yếu cần kiểm chứng
- Note cô lập cần link
- Source chưa xử lý
- Mâu thuẫn giữa các note
- Ý tưởng cần đọc thêm

Review là nơi giúp vault không trở thành đống rác tri thức.

---

### 98 - Attachments

Nơi chứa file phụ:

- Ảnh
- PDF
- Screenshot
- Diagram
- Audio
- Export

Không viết tri thức trực tiếp ở đây.

---

### 99 - Templates

Nơi chứa template note.

Nên có:

```text
Atomic Note.md
Concept Note.md
Argument Note.md
Comparison Note.md
Question Note.md
Source Note.md
Book Note.md
Paper Note.md
Domain MOC.md
Theme MOC.md
Project Note.md
Output Note.md
```

---

## 3. Các loại note chuẩn

### 3.1 Atomic note

Atomic note là một ý tưởng nhỏ, rõ, có thể tái dùng.

Tên nên là một mệnh đề.

Tốt:

```text
Quyền lực vận hành bằng cách định hướng cách con người diễn giải thế giới.md
Niềm tin tập thể biến quy ước thành hiện thực xã hội.md
Temperature làm phân phối token sắc hoặc phẳng hơn.md
Một niềm tin đúng chưa chắc đã là tri thức.md
```

Không tốt:

```text
Quyền lực.md
Niềm tin.md
Temperature.md
Knowledge.md
```

Cấu trúc atomic note:

```md
---
type: atomic
status: growing
domains:
  - "[[Philosophy]]"
themes:
  - "[[Knowledge and Truth]]"
source:
  - "[[Tên source note]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Tên note dạng mệnh đề

## Ý chính

Viết 2-5 câu nói rõ insight.

## Giải thích

Giải thích bằng ngôn ngữ của mình.

## Ví dụ

- Ví dụ 1
- Ví dụ 2

## Phản biện / giới hạn

- Điều kiện nào khiến ý này sai?
- Nó có đang đơn giản hóa quá mức không?

## Liên kết

- [[Concept liên quan]]
- [[Atomic note đối lập hoặc bổ sung]]
- [[Theme MOC]]
```

---

### 3.2 Concept note

Concept note dùng để định nghĩa một khái niệm.

Tên có thể là danh từ ngắn.

Ví dụ:

```text
Quyền lực.md
Niềm tin tập thể.md
Tín dụng.md
Địa vị.md
Thực tại được diễn giải.md
```

Concept note nên link ra nhiều atomic note.

Cấu trúc:

```md
---
type: concept
status: growing
domains:
  - "[[Sociology]]"
themes:
  - "[[Power and Society]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Khái niệm

## Định nghĩa ngắn

Khái niệm này nghĩa là gì?

## Giải thích

Nó hoạt động như thế nào?

## Ví dụ

- Ví dụ thường ngày
- Ví dụ học thuật
- Ví dụ trong vault

## Các atomic notes liên quan

- [[Một mệnh đề cụ thể về khái niệm này]]
- [[Một mệnh đề khác]]

## Câu hỏi mở

- Còn điều gì chưa rõ?
```

---

### 3.3 Argument note

Argument note dùng cho lập luận, nhất là với triết học, xã hội, chính trị, kinh tế, lịch sử, văn hóa.

Cấu trúc:

```md
---
type: argument
status: growing
domains:
  - "[[Philosophy]]"
  - "[[Sociology]]"
themes:
  - "[[Power and Society]]"
source:
  - "[[Tên source note]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Tên lập luận

## Claim

Lập luận chính là gì?

## Lý do ủng hộ

1. Lý do 1
2. Lý do 2
3. Lý do 3

## Bằng chứng

- Nguồn nào ủng hộ?
- Ví dụ nào minh họa?

## Giả định ngầm

- Lập luận này đang giả định điều gì?
- Có định nghĩa nào chưa rõ?

## Phản biện

- Có cách hiểu khác không?
- Có trường hợp ngoại lệ không?
- Có khả năng nhầm tương quan với nhân quả không?

## Kết luận tạm thời

Nên tin claim này ở mức nào?

## Liên kết

- [[Concept liên quan]]
- [[Atomic note liên quan]]
- [[Argument đối lập]]
```

Mỗi argument note nên phân biệt rõ:

```text
Claim ≠ Evidence ≠ Assumption ≠ Interpretation
```

---

### 3.4 Question note

Question note giữ câu hỏi dài hạn.

Ví dụ:

```text
Quyền lực khác thao túng ở điểm nào.md
Một niềm tin tập thể trở thành hiện thực xã hội bằng cách nào.md
Tự do có thể tồn tại trong một xã hội bị định hình bởi giáo dục không.md
```

Cấu trúc:

```md
---
type: question
status: growing
domains:
  - "[[Philosophy]]"
themes:
  - "[[Freedom and Responsibility]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Câu hỏi

## Vì sao câu hỏi này quan trọng?

## Những hướng trả lời hiện có

### Hướng 1

### Hướng 2

### Hướng 3

## Note liên quan

- [[Atomic note]]
- [[Concept note]]
- [[Source note]]

## Cần đọc thêm

- [ ] Nguồn 1
- [ ] Nguồn 2
```

---

### 3.5 Comparison note

Dùng khi cần so sánh hai hoặc nhiều khái niệm.

Ví dụ:

```text
Quyền lực và thao túng khác nhau như thế nào.md
Niềm tin tập thể và sự thật khách quan khác nhau như thế nào.md
Rule-based AI và machine learning khác nhau như thế nào.md
```

Cấu trúc:

```md
---
type: comparison
status: growing
domains:
  - "[[Philosophy]]"
themes:
  - "[[Knowledge and Truth]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# A và B khác nhau như thế nào?

| Tiêu chí | A | B |
|---|---|---|
| Bản chất |  |  |
| Cách hoạt động |  |  |
| Ví dụ |  |  |
| Rủi ro hiểu sai |  |  |

## Khi nào dễ nhầm?

## Kết luận
```

---

### 3.6 Source note

Source note giữ nguồn gốc thông tin.

Ví dụ:

```text
05 - Sources/Videos/Quyền lực thực sự vận hành thế nào - RAW.md
05 - Sources/Books/Tên sách.md
05 - Sources/Papers/Tên paper.md
```

Cấu trúc source video:

```md
---
type: source
subtype: video
status: processing
source: URL
language: Vietnamese
fetched: YYYY-MM-DD
tags:
  - video/youtube
  - transcript
  - raw-source
---

# Tên nguồn

## Source digest

### Main takeaway

Một câu nói rõ ý chính.

### Key ideas

- Ý 1
- Ý 2
- Ý 3

### Concepts to extract

- [[Concept 1]]
- [[Concept 2]]

### Atomic notes to create

- [[Mệnh đề 1]]
- [[Mệnh đề 2]]

### Claims to verify

- [ ] Claim 1
- [ ] Claim 2

### Critical notes

- Điểm nào mạnh?
- Điểm nào yếu?
- Có thiên kiến gì?

## Transcript / Highlights

Nội dung gốc ở đây.
```

---

### 3.7 MOC note

MOC = Map of Content.

Nó là bản đồ cho một domain hoặc theme.

Ví dụ:

```text
02 - Domains/Philosophy/README.md
03 - Themes/Power and Society/README.md
```

Cấu trúc:

```md
---
type: moc
status: growing
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Power and Society

## Câu hỏi trung tâm

- Quyền lực là gì?
- Quyền lực vận hành qua cưỡng chế, thiết chế hay niềm tin?
- Khi nào quyền lực trở thành thao túng?

## Concepts

- [[Quyền lực]]
- [[Địa vị]]
- [[Niềm tin tập thể]]
- [[Thiết chế xã hội]]

## Atomic notes

- [[Quyền lực vận hành bằng cách định hướng cách con người diễn giải thế giới]]
- [[Địa vị là quyền lực được người khác công nhận]]

## Arguments

- [[Quyền lực chủ yếu vận hành qua niềm tin hơn là cưỡng chế]]

## Questions

- [[Quyền lực khác thao túng ở điểm nào]]

## Sources

- [[Quyền lực thực sự vận hành thế nào - RAW]]
```

---

## 4. Status chuẩn

Dùng đúng 5 status chính:

```text
raw
processing
growing
evergreen
archived
```

### raw

Note mới gom về, chưa xử lý.

Dùng cho:

- Quick capture
- Transcript mới tải
- Highlight chưa đọc
- Ý tưởng vụn

### processing

Note đang được xử lý.

Dùng khi:

- Đang summarize
- Đang extract concept
- Đang kiểm chứng claim
- Đang tách atomic notes

### growing

Note đã có lõi tri thức rõ, nhưng còn phát triển.

Đây là status phổ biến nhất cho:

- atomic
- concept
- argument
- comparison
- question
- MOC đang mở rộng

### evergreen

Note đã đủ chín để dùng lại lâu dài.

Điều kiện:

- Luận điểm rõ
- Có ví dụ
- Có link lên domain/theme
- Có link sang note liên quan
- Có phản biện hoặc giới hạn
- Không còn là tóm tắt thô

### archived

Note không còn active, nhưng giữ để tham chiếu.

Dùng cho:

- Project cũ
- Draft cũ
- Source đã xử lý xong
- Note bị thay thế bởi note tốt hơn

Pipeline:

```text
raw → processing → growing → evergreen
                     ↓
                  archived
```

---

## 5. Type chuẩn

Dùng các `type` sau:

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
person
```

Gợi ý dùng:

| Type | Dùng khi nào | Folder chính |
|---|---|---|
| atomic | Một insight nhỏ, rõ, tái dùng được | `04 - Notes/Atomic` |
| concept | Định nghĩa khái niệm | `04 - Notes/Concepts` |
| argument | Phân tích một lập luận | `04 - Notes/Arguments` |
| comparison | So sánh hai/nhiều ý | `04 - Notes/Comparisons` |
| question | Câu hỏi mở dài hạn | `04 - Notes/Questions` |
| source | Nguồn nói chung | `05 - Sources` |
| book | Note từ sách | `05 - Sources/Books` |
| paper | Note từ paper | `05 - Sources/Papers` |
| project | Việc có mục tiêu cụ thể | `06 - Projects` |
| moc | Bản đồ nội dung | `01`, `02`, `03` |
| output | Bài viết/sản phẩm | `07 - Outputs` |
| review | Bảo trì vault | `08 - Review` |
| person | Người/tác giả/nhân vật | `04 - Notes/People` |

---

## 6. Frontmatter chuẩn

### Atomic / Concept / Argument / Question

```yaml
---
type: atomic
status: growing
domains:
  - "[[Philosophy]]"
themes:
  - "[[Knowledge and Truth]]"
source:
  - "[[Tên source note]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### Source video

```yaml
---
type: source
subtype: video
status: processing
source: https://...
language: Vietnamese
fetched: YYYY-MM-DD
tags:
  - video/youtube
  - transcript
  - raw-source
---
```

### Project

```yaml
---
type: project
status: processing
area: "[[AI Projects]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
deadline:
output:
---
```

### Output

```yaml
---
type: output
status: processing
domains:
  - "[[Philosophy]]"
themes:
  - "[[Power and Society]]"
sources:
  - "[[Source 1]]"
  - "[[Source 2]]"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

---

## 7. Quy tắc đặt tên note

### Atomic note

Dùng mệnh đề.

Tốt:

```text
Quyền lực vận hành bằng cách định hướng cách con người diễn giải thế giới.md
Địa vị là quyền lực được người khác công nhận.md
CNN học đặc trưng cục bộ bằng convolution kernel.md
```

Không tốt:

```text
Quyền lực.md
Địa vị.md
CNN.md
```

### Concept note

Có thể dùng danh từ.

```text
Quyền lực.md
Tín dụng.md
Hiện thực xã hội.md
Self-attention.md
```

### Question note

Dùng câu hỏi rõ.

```text
Quyền lực khác thao túng ở điểm nào.md
Tại sao temperature cao làm output đa dạng hơn.md
```

### Argument note

Dùng claim trung tâm.

```text
Quyền lực chủ yếu vận hành qua niềm tin hơn là cưỡng chế.md
Giáo dục vừa khai phóng vừa chuẩn hóa con người.md
```

### Source note

Tên theo nguồn.

```text
Quyền lực thực sự vận hành thế nào - RAW.md
Tên sách - Author.md
Tên paper - First Author Year.md
```

---

## 8. Quy tắc link

Mỗi durable note nên có ít nhất ba hướng link nếu có thể:

```text
Upward link: link lên domain/theme/MOC.
Sideways link: link sang ý liên quan.
Source link: link về nguồn gốc.
```

Ví dụ:

```md
## Liên kết

- Upward: [[Power and Society]], [[Knowledge and Truth]]
- Related: [[Niềm tin tập thể]], [[Thực tại được diễn giải]]
- Source: [[Quyền lực thực sự vận hành thế nào - RAW]]
```

Không tạo link giả chỉ để đủ số lượng. Link phải có lý do.

Quy tắc thực dụng:

```text
Một note không link đi đâu là note đang bị cô lập.
Một source không sinh ra note nào là source chưa được xử lý.
Một MOC không được cập nhật là bản đồ chết.
```

---

## 9. Workflow xử lý source

Áp dụng cho video, bài viết, sách, paper, podcast, course.

### Bước 1: Lưu nguồn

Đặt vào đúng folder:

```text
05 - Sources/Videos
05 - Sources/Articles
05 - Sources/Books
05 - Sources/Papers
```

Set:

```yaml
status: raw
```

hoặc nếu đã bắt đầu xử lý:

```yaml
status: processing
```

---

### Bước 2: Viết Source digest

Thêm vào đầu source note:

```md
## Source digest

### Main takeaway

### Key ideas

### Concepts to extract

### Atomic notes to create

### Arguments to inspect

### Claims to verify

### Useful quotes / timestamps
```

---

### Bước 3: Tách concept

Tạo hoặc link đến:

```text
04 - Notes/Concepts/
```

Ví dụ từ video quyền lực:

```text
Quyền lực.md
Niềm tin tập thể.md
Địa vị.md
Tín dụng.md
Giáo dục như một thiết chế xã hội.md
```

---

### Bước 4: Tách atomic notes

Tạo 3-6 atomic notes tốt hơn là tạo 20 note yếu.

Ví dụ:

```text
Quyền lực vận hành bằng cách định hướng cách con người diễn giải thế giới.md
Niềm tin tập thể biến quy ước thành hiện thực xã hội.md
Địa vị là quyền lực được người khác công nhận.md
Khi một niềm tin trở nên tự nhiên thì quyền lực đứng sau nó trở nên khó thấy.md
```

---

### Bước 5: Tách argument / question

Nếu source có claim mạnh, tạo argument note.

Nếu source mở ra vấn đề chưa rõ, tạo question note.

Ví dụ:

```text
04 - Notes/Arguments/Quyền lực chủ yếu vận hành qua niềm tin hơn là cưỡng chế.md
04 - Notes/Questions/Quyền lực khác thao túng ở điểm nào.md
```

---

### Bước 6: Link về MOC

Thêm note vào domain/theme phù hợp:

```text
02 - Domains/Philosophy
02 - Domains/Sociology
03 - Themes/Power and Society
03 - Themes/Knowledge and Truth
```

---

### Bước 7: Đổi status

Sau khi source đã được xử lý:

```yaml
status: archived
```

hoặc giữ:

```yaml
status: processing
```

nếu vẫn cần đọc lại.

---

## 10. Cách tư duy khi viết note

Mỗi khi viết note, đừng chỉ hỏi “nội dung là gì?”. Hỏi các câu này:

### 10.1 Câu hỏi phân rã

```text
Ý chính là gì?
Có thể tách thành những khái niệm nào?
Có claim nào đang được đưa ra?
Claim đó dựa trên bằng chứng nào?
Có giả định ngầm nào không?
Có phản biện nào không?
Nó liên quan đến note nào đã có?
Nó giúp mình trả lời câu hỏi lớn nào?
```

### 10.2 Câu hỏi phản biện

```text
Tác giả có đang đơn giản hóa quá mức không?
Có nhầm giữa sự thật, diễn giải và ý kiến không?
Có nhầm tương quan với nhân quả không?
Có bằng chứng đủ mạnh không?
Có quan điểm đối lập nào đáng steelman không?
Có thuật ngữ nào cần định nghĩa lại không?
Có phần nào nghe hay nhưng rỗng không?
```

### 10.3 Câu hỏi kết nối

```text
Ý này thuộc domain nào?
Ý này thuộc theme nào?
Nó bổ sung note nào?
Nó mâu thuẫn với note nào?
Nó có thể trở thành output nào?
```

---

## 11. Nguyên tắc phản biện cho chủ đề xã hội/triết học/chính trị

Với các chủ đề như quyền lực, xã hội, kinh tế, chính trị, lịch sử, đạo đức:

Luôn tách:

```text
Claim: người nói khẳng định gì?
Evidence: bằng chứng là gì?
Assumption: giả định ngầm là gì?
Interpretation: phần nào là diễn giải?
Counterargument: phản biện mạnh nhất là gì?
Uncertainty: phần nào chưa chắc?
```

Không viết:

```text
X là như vậy.
```

Nên viết:

```text
Một cách hiểu là X, dựa trên Y. Tuy nhiên, cách hiểu này giả định Z và có thể bị phản biện bởi W.
```

Quy tắc chống “ảo giác insight”:

```text
Nghe sâu sắc không có nghĩa là đúng.
Có tính hệ thống không có nghĩa là có người cố ý điều khiển.
Được nhiều người tin không có nghĩa là khách quan đúng.
Bị xã hội kiến tạo không có nghĩa là không thật.
```

---

## 12. Mức độ tin cậy của claim

Có thể thêm mục này vào argument note:

```md
## Confidence

- Mức tin cậy: low / medium / high
- Vì sao?
- Cần kiểm chứng gì thêm?
```

Gợi ý:

```text
high = có nguồn mạnh, nhiều bằng chứng, ít phản biện lớn
medium = hợp lý nhưng cần kiểm chứng thêm
low = nghe hay nhưng thiếu nguồn hoặc dễ gây tranh cãi
```

---

## 13. Cách dùng tags

Tags chỉ dùng cho metadata, không dùng thay cho link.

Nên dùng tags cho:

```text
#video/youtube
#transcript
#raw-source
#needs-verification
#exam-prep
#project/active
```

Không nên dùng quá nhiều tags kiểu:

```text
#philosophy #truth #knowledge #power #society #important #good #readlater
```

Vì domain/theme/link đã xử lý việc đó tốt hơn.

Quy tắc:

```text
Tags = trạng thái/kỹ thuật/quy trình.
Links = quan hệ ý tưởng.
Folders = vòng đời note.
```

---

## 14. Quy trình review

### Daily review: 5-10 phút

Làm với:

```text
00 - Inbox/Daily
00 - Inbox/Quick Captures.md
```

Hỏi:

```text
Có gì cần chuyển sang Sources không?
Có gì đã thành atomic note không?
Có câu hỏi nào cần đưa vào Questions không?
Có việc nào cần đưa vào Projects không?
```

---

### Weekly review: 30-60 phút

Làm với:

```text
08 - Review/To Process.md
08 - Review/To Connect.md
08 - Review/Open Questions.md
08 - Review/Contradictions.md
```

Checklist:

```md
- [ ] Xử lý ít nhất 3 source notes
- [ ] Tạo hoặc cải thiện 5 atomic notes
- [ ] Link các note cô lập
- [ ] Cập nhật 1-2 MOC
- [ ] Chọn 1 câu hỏi cần đào sâu tuần sau
```

---

### Monthly review

Hỏi:

```text
Domain nào đang phát triển mạnh nhất?
Theme nào đang lặp lại nhiều nhất?
Có output nào có thể viết từ các note hiện có?
Có note nào nên lên evergreen?
Có project nào nên archive?
```

---

## 15. Khi nào một note được coi là “xong”? 

Một note không cần hoàn hảo, nhưng cần đủ dùng.

### Atomic note done criteria

```text
Có một luận điểm rõ.
Có giải thích bằng lời của mình.
Có ít nhất một ví dụ.
Có link lên domain/theme.
Có link sang note liên quan hoặc source.
Có phản biện/giới hạn nếu là claim mạnh.
```

### Source note done criteria

```text
Có source metadata.
Có source digest.
Có key ideas.
Có concepts/atomic notes extracted.
Có claims to verify nếu cần.
Đã link đến note được tạo ra.
```

### Argument note done criteria

```text
Có claim.
Có lý do ủng hộ.
Có giả định.
Có phản biện.
Có mức độ tin cậy tạm thời.
```

### MOC done criteria

```text
Có câu hỏi trung tâm.
Có nhóm concept.
Có atomic notes chính.
Có arguments/questions/sources liên quan.
Không biến thành danh sách link vô nghĩa.
```

---

## 16. Ví dụ xử lý một video source

Source:

```text
05 - Sources/Videos/Quyền lực thực sự vận hành thế nào - RAW.md
```

### Bước xử lý

1. Giữ transcript trong source note.
2. Viết `Source digest`.
3. Tạo concept notes:

```text
04 - Notes/Concepts/Quyền lực.md
04 - Notes/Concepts/Niềm tin tập thể.md
04 - Notes/Concepts/Địa vị.md
04 - Notes/Concepts/Giáo dục như một thiết chế xã hội.md
```

4. Tạo atomic notes:

```text
04 - Notes/Atomic/Quyền lực vận hành bằng cách định hướng cách con người diễn giải thế giới.md
04 - Notes/Atomic/Niềm tin tập thể biến quy ước thành hiện thực xã hội.md
04 - Notes/Atomic/Địa vị là quyền lực được người khác công nhận.md
04 - Notes/Atomic/Khi một niềm tin trở nên tự nhiên thì quyền lực đứng sau nó trở nên khó thấy.md
```

5. Tạo argument note:

```text
04 - Notes/Arguments/Quyền lực chủ yếu vận hành qua niềm tin hơn là cưỡng chế.md
```

6. Tạo question notes:

```text
04 - Notes/Questions/Quyền lực khác thao túng ở điểm nào.md
04 - Notes/Questions/Bao nhiêu phần niềm tin của mình là do mình tự chọn.md
```

7. Link vào MOC:

```text
03 - Themes/Power and Society
03 - Themes/Knowledge and Truth
02 - Domains/Philosophy
02 - Domains/Sociology
02 - Domains/Politics
```

---

## 17. Cách tạo output từ vault

Output không nên viết từ số 0.

Công thức:

```text
Sources → Atomic notes → Arguments → Outline → Output
```

Ví dụ viết essay:

```text
Chủ đề: Quyền lực vận hành thế nào?

1. Mở bài từ question note
2. Lấy định nghĩa từ concept note Quyền lực
3. Dùng atomic note về diễn giải thế giới
4. Dùng argument note về niềm tin và cưỡng chế
5. Thêm phản biện từ Review/Contradictions
6. Kết luận bằng câu hỏi mở
```

Output nên ghi rõ nó lấy từ note nào:

```md
## Based on

- [[Quyền lực]]
- [[Quyền lực vận hành bằng cách định hướng cách con người diễn giải thế giới]]
- [[Quyền lực chủ yếu vận hành qua niềm tin hơn là cưỡng chế]]
- [[Quyền lực thực sự vận hành thế nào - RAW]]
```

---

## 18. Cách dùng agent trong vault

Agent nên được dùng như người phụ giúp xử lý vault, không phải người thay mình suy nghĩ hoàn toàn.

Agent có thể làm tốt:

```text
Tóm tắt source
Extract atomic notes
Đề xuất concept notes
Tìm note trùng lặp
Gợi ý link
Tạo MOC
Kiểm tra frontmatter
Tạo outline output
Tìm claim yếu/cần kiểm chứng
```

Không nên để agent:

```text
Tự xóa hàng loạt note
Tự đổi cấu trúc vault lớn
Tự bịa nguồn
Tự biến claim gây tranh cãi thành sự thật
Tự rewrite giọng văn cá nhân quá mạnh
```

Prompt mẫu:

```text
Process this source note into:
1. Source digest
2. 5 atomic note candidates
3. 3 concept notes
4. 2 argument notes
5. claims that need verification
6. links to existing MOCs
Preserve Vietnamese and use Obsidian wikilinks.
```

Prompt review:

```text
Review this note critically. Separate claim, evidence, assumption, counterargument, and uncertainty. Suggest links to domain/theme MOCs.
```

Prompt MOC:

```text
Build a MOC for this theme using existing notes. Group links by Concepts, Atomic Notes, Arguments, Questions, Sources, and Outputs. Do not invent missing note content.
```

---

## 19. Những lỗi cần tránh

### Lỗi 1: Lưu nguồn nhưng không extract

Sai:

```text
Xem video → lưu transcript → hết.
```

Đúng:

```text
Xem video → source digest → concept → atomic → argument/question → MOC.
```

---

### Lỗi 2: Viết note quá dài

Nếu một note có nhiều hơn 3-5 ý độc lập, nên tách.

Dấu hiệu cần tách:

```text
Note có quá nhiều heading không liên quan.
Note vừa định nghĩa, vừa tranh luận, vừa kể nguồn.
Note có nhiều ý có thể dùng riêng.
```

---

### Lỗi 3: Đặt tên quá mơ hồ

Sai:

```text
Power.md
Truth.md
AI.md
```

Đúng:

```text
Quyền lực không chỉ cưỡng chế mà còn định hình niềm tin.md
Một niềm tin đúng chưa chắc đã là tri thức.md
Attention cho phép mô hình gán trọng số khác nhau cho từng token.md
```

---

### Lỗi 4: Link quá ít hoặc link giả

Không link thì note chết.
Link bừa thì graph thành rác.

Mỗi link cần trả lời được:

```text
Vì sao hai note này liên quan?
```

---

### Lỗi 5: Nhầm source note với atomic note

Source note trả lời:

```text
Nguồn này nói gì?
```

Atomic note trả lời:

```text
Mình rút ra insight gì có thể dùng lại?
```

---

### Lỗi 6: Thiếu phản biện

Đặc biệt với xã hội, chính trị, triết học, kinh tế:

```text
Mọi claim mạnh đều cần giả định và phản biện.
```

---

## 20. Checklist nhanh khi tạo note mới

```md
- [ ] Note này thuộc type nào?
- [ ] Status hiện tại là gì?
- [ ] Nó thuộc domain nào?
- [ ] Nó thuộc theme nào?
- [ ] Có source không?
- [ ] Tên note có đủ rõ không?
- [ ] Có ít nhất 2 link hữu ích không?
- [ ] Có claim nào cần kiểm chứng không?
- [ ] Có nên tách thành atomic note nhỏ hơn không?
- [ ] Có cần thêm vào MOC không?
```

---

## 21. Công thức vận hành cuối cùng

```text
00 - Inbox = bắt nhanh
05 - Sources = giữ nguồn
04 - Notes = chưng cất tri thức
02 - Domains = bản đồ lĩnh vực
03 - Themes = bản đồ câu hỏi lớn
06 - Projects = hành động có mục tiêu
07 - Outputs = sản phẩm cuối
08 - Review = bảo trì và phản biện
99 - Templates = chuẩn hóa cách viết
98 - Attachments = tài nguyên phụ
```

Một vault tốt không phải là vault có nhiều note nhất.

Một vault tốt là vault mà mỗi note:

```text
có lý do tồn tại,
có quan hệ với note khác,
có thể giúp mình nghĩ sâu hơn,
và có thể được dùng lại để tạo output.
```

---

## 22. Quy tắc một câu

```text
Đừng chỉ lưu thứ người khác nói; hãy tách ra thứ mình hiểu, kiểm tra thứ mình nghi ngờ, và nối nó vào những câu hỏi lớn mình đang theo đuổi.
```
