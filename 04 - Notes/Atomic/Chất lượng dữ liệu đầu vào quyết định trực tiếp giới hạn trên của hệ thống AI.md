---
type: atomic
status: growing
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - atomic
  - data-engineering
  - data-quality
  - rag
  - ai-systems
created: 2026-09-24
updated: 2026-09-24
---

# Chất lượng dữ liệu đầu vào quyết định trực tiếp giới hạn trên của hệ thống AI

## Mệnh đề cốt lõi

Trong mọi hệ thống ứng dụng AI (đặc biệt là RAG và Agentic workflows), **năng lực của mô hình ngôn ngữ lớn chỉ đóng vai trò khai thác dữ liệu sẵn có, trong khi chất lượng và độ sạch của dữ liệu đầu vào thiết lập giới hạn trên tuyệt đối của toàn hệ thống**; hiện tượng mô hình sinh ảo giác hoặc tư vấn sai lệch trong môi trường thực tế phần lớn bắt nguồn từ lỗi của đường ống dữ liệu (data pipeline bugs) thay vì khiếm khuyết của thuật toán mô hình.

---

## Bối cảnh và Luận cứ Kỹ thuật

1. **Quy luật "Garbage In, Garbage Out":**
   * Cho dù sử dụng các mô hình frontier tiên tiến nhất (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro), nếu cơ sở dữ liệu vector hoặc bảng dữ liệu nghiệp vụ bị nạp các bản ghi lỗi thời, mâu thuẫn hoặc thiếu trường ngữ cảnh then chốt, mô hình bắt buộc phải đưa ra kết luận sai lệch dựa trên bằng chứng sai đó.
   * Thực tế 60–80% thời lượng của một dự án AI sản xuất được dành cho việc thu thập, làm sạch, chuẩn hóa và giám sát dữ liệu.

2. **Các dạng hỏng hóc dữ liệu âm thầm:**
   * *Outdated Version:* Không kịp purge tài liệu cũ khiến agent trả lời tự tin theo chính sách hết hạn.
   * *Encoding / Unicode Noise:* Không chuẩn hóa NFC cho tiếng Việt khiến câu hỏi và tài liệu mang biểu diễn byte khác nhau, làm gãy vector similarity search.
   * *Thiếu Metadata:* Chỉ nạp text thuần mà không gắn nhãn ngày hiệu lực, phòng ban hoặc thẩm quyền, khiến agent không thể phân xử khi có xung đột thông tin.
   * *Duplicate Chunks:* Ingestion thiếu tính chất Idempotency nạp lặp nhiều lần cùng một đoạn văn, làm loãng Top-K và gây lãng phí token ngân sách.

3. **Giải pháp: Thiết lập Quality Gates trước khi nạp dữ liệu:**
   * Không bao giờ index dữ liệu thô trực tiếp vào kho lưu trữ của Agent.
   * Bắt buộc phải triển khai các chốt chặn chất lượng dữ liệu tự động (Schema Gate, Freshness Gate, Content Gate, Dedup Gate, PII Gate) thông qua các công cụ như Great Expectations hoặc dbt tests.

---

## Giả định và Giới hạn

* Dữ liệu đầu vào hoàn hảo vẫn không loại trừ 100% rủi ro hallucination do tính chất xác suất vốn có của LLM, nhưng nó loại bỏ hoàn toàn các lỗi sai có tính hệ thống và có thể tái hiện được.

---

## Liên kết tri thức

* Khung phương pháp luận: [[Day 10 - Data Pipeline Observability và Quản trị ETL]], [[Day 07 - Data Foundation và Kiến trúc RAG]]
* Khái niệm liên quan: [[Data Observability]], [[Data Quality Pyramid]], [[ETL Orchestration]]
* Mệnh đề liên quan: [[Không bao giờ index dữ liệu thô rồi kỳ vọng retrieval tự động sửa chữa mọi vấn đề]]
