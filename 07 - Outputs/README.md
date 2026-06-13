# 07 - Outputs

Outputs là nơi chứa sản phẩm cuối cùng được tạo ra từ vault.

Đây là phần kiểm tra xem vault có thật sự hữu ích không. Nếu chỉ nhập note mà không tạo output, vault dễ biến thành kho lưu trữ thụ động.

## Các loại output

```text
Essays
Blog Posts
Reports
Presentations
Study Guides
Tutorials
Personal Manifestos
README files
Exam Reviews
```

## Ví dụ output

```text
Reports/Dragon Fruit Disease Classification Report.md
Study Guides/NLP Final Review.md
Tutorials/How to Fix CMake Multiple Definition.md
Essays/Does AI Understand Language.md
Blog Posts/Zettelkasten for Learning AI.md
```

## Output nên lấy từ đâu?

Output nên được tạo từ:

```text
Atomic notes
Source notes
Project notes
Theme MOCs
Domain MOCs
```

Ví dụ:

```text
[[Perplexity đo mức độ mô hình dự đoán chuỗi tốt đến đâu]]
+ [[Không tính <s> như token được dự đoán trong perplexity]]
+ [[Cần tính </s> khi tính perplexity vì nó là sự kiện kết thúc câu]]
→ Study Guides/NLP Language Modeling Review.md
```

## Luật cho Outputs

- Output là nơi viết mạch lạc cho người đọc.
- Output có thể dài hơn atomic note.
- Output nên link ngược về các note gốc.
- Khi output hoàn thành, có thể dùng để xuất PDF, blog, slide, báo cáo hoặc README.
