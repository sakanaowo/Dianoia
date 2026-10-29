---
type: atomic
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - atomic
  - data-foundation
  - rag
  - data-quality
  - architecture
created: 2026-09-24
updated: 2026-09-24
---

# Không bao giờ index dữ liệu thô rồi kỳ vọng retrieval tự động sửa chữa mọi vấn đề

## Mệnh đề cốt lõi

Việc đẩy trực tiếp các tài liệu thô (raw data) vào Vector Database với niềm tin ngây thơ rằng các thuật toán tìm kiếm vector hoặc các mô hình ngôn ngữ lớn sẽ tự động xử lý mọi mâu thuẫn, lọc nhiễu và bù đắp thông tin thiếu là **sai lầm kiến trúc cơ bản và tốn kém nhất trong phát triển RAG**; chất lượng của hệ thống truy xuất được quyết định bởi kỷ luật làm sạch, phân mảnh (chunking) và làm giàu metadata ở giai đoạn Ingestion Offline.

---

## Bối cảnh và Luận cứ Kỹ thuật

1. **Ảo tưởng về "Ma thuật Vector":**
   * Nhiều nhóm kỹ thuật chỉ đọc file PDF, cắt theo kích thước ký tự cố định và nạp thẳng vector vào cơ sở dữ liệu.
   * Khi người dùng hỏi và nhận được câu trả lời sai hoặc không đầy đủ, nhóm thường vội vã đổi sang embedding model đắt tiền hơn hoặc prompt dài hơn, nhưng độ chính xác không cải thiện đáng kể.

2. **Hậu quả của việc bỏ qua tiền xử lý:**
   * *Nhiễu OCR và HTML:* Làm biến dạng vector biểu diễn, kéo điểm tương đồng cosine xuống thấp dù nội dung thực sự liên quan.
   * *Mâu thuẫn thông tin:* Hai văn bản quy định chính sách cũ và mới cùng tồn tại trong cơ sở dữ liệu mà không có trường metadata `effective_date` hoặc `version` để phân định, khiến LLM chọn ngẫu nhiên một trong hai.
   * *Cắt rời rạc ngữ cảnh:* Cắt ngang chừng bảng biểu hoặc câu điều kiện biến câu trả lời thành thông tin sai lệch nguy hiểm.

3. **Nguyên tắc Ingestion đạt chuẩn:**
   * Tuân thủ kim tự tháp chất lượng dữ liệu: Raw $\rightarrow$ Cleaned $\rightarrow$ Structured $\rightarrow$ Enriched.
   * Chỉ đưa vào chỉ mục tìm kiếm những đoạn văn đã được chuẩn hóa UTF-8 NFC, lọc PII và đính kèm đầy đủ nhãn thuộc tính nghiệp vụ.

---

## Giả định và Giới hạn

* Đối với các tác vụ thử nghiệm nhanh (proof-of-concept) trong vòng vài giờ với 1-2 file văn bản ngắn, việc nạp thô có thể chấp nhận được để xem demo, nhưng tuyệt đối không được đưa vào môi trường sản xuất.

---

## Liên kết tri thức

* Khung phương pháp luận: [[Day 07 - Data Foundation và Kiến trúc RAG]], [[Day 10 - Data Pipeline Observability và Quản trị ETL]]
* Khái niệm liên quan: [[Data Quality Pyramid]], [[Data Observability]], [[Chiến lược Chunking]]
* Mệnh đề liên quan: [[Chất lượng dữ liệu đầu vào quyết định trực tiếp giới hạn trên của hệ thống AI]]
