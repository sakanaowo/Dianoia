---
type: concept
status: growing
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - concept
  - data-quality
  - data-foundation
  - rag
  - ai-systems
created: 2026-09-24
updated: 2026-09-24
---

# Data Quality Pyramid

## Định nghĩa

**Data Quality Pyramid (Kim Tự Tháp Chất Lượng Dữ Liệu)** là mô hình phân tầng chuẩn hóa 4 mức độ trưởng thành của dữ liệu trong các hệ thống AI và RAG, thiết lập kỷ luật kỹ thuật để chuyển hóa dữ liệu thô (raw data) thành tri thức có cấu trúc và giàu ngữ cảnh phục vụ mô hình ngôn ngữ lớn.

---

## Bốn Tầng Của Kim Tự Tháp

1. **Tầng 1 — Raw Data (Dữ liệu thô):**
   * Các tệp tin văn bản, PDF scan, bài viết Notion/Confluence, dữ liệu bảng chưa qua xử lý.
   * Chứa nhiều nhiễu ký tự, HTML tags thừa, lỗi encoding và giá trị thiếu.
2. **Tầng 2 — Cleaned Data (Dữ liệu đã làm sạch):**
   * Đã qua bước lọc nhiễu, chuẩn hóa bảng mã Unicode (NFC cho tiếng Việt), loại bỏ khoảng trắng dư thừa và bóc tách thông tin nhạy cảm (PII).
3. **Tầng 3 — Structured / Chunked Data (Dữ liệu phân đoạn có cấu trúc):**
   * Văn bản được phân mảnh theo các ranh giới ngữ nghĩa (headings, paragraphs, token budget) thành các chunk hoàn chỉnh, độc lập và dễ truy xuất.
4. **Tầng 4 — Enriched Data (Dữ liệu được làm giàu):**
   * Bổ sung metadata nghiệp vụ chuyên sâu (`source_doc_id`, `version`, `effective_date`, `owner_department`, `citation_anchor`), sinh từ khóa tóm tắt và thực thể quan hệ đồ thị.

---

## Ý Nghĩa Thực Chiến

* Tuyệt đối không bao giờ index dữ liệu từ Tầng 1 thẳng vào Vector Database.
* Mọi chunk nạp vào Vector Store bắt buộc phải đạt tiêu chuẩn từ **Tầng 3 trở lên** để đảm bảo khả năng lọc metadata (pre-filtering) và truy vết nguồn gốc (lineage).

---

## Mệnh đề tri thức liên quan

* [[Day 07 - Data Foundation và Kiến trúc RAG]]
* [[Day 10 - Data Pipeline Observability và Quản trị ETL]]
* [[Chất lượng dữ liệu đầu vào quyết định trực tiếp giới hạn trên của hệ thống AI]]
* [[Hệ thống Data Observability bảo vệ RAG bằng năm trụ cột giám sát toàn diện]]
