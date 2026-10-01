---
type: concept
status: growing
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - concept
  - data-observability
  - data-engineering
  - monitoring
  - ai-infrastructure
created: 2026-09-24
updated: 2026-09-24
---

# Data Observability

## Định nghĩa

**Data Observability (Khả năng Quan sát Dữ liệu)** là tập hợp các phương pháp luận, công cụ và quy trình kỹ thuật cho phép tổ chức thấu hiểu toàn diện trạng thái sức khỏe của dữ liệu trên toàn bộ đường ống (data pipeline), tự động phát hiện, cảnh báo và khoanh vùng nguyên nhân gốc rễ (root cause) của các sự cố dữ liệu trước khi chúng gây ảnh hưởng tiêu cực đến các hệ thống hạ nguồn và trải nghiệm người dùng cuối.

---

## Năm Trụ Cột Cốt Lõi (5 Pillars of Data Observability)

1. **Freshness (Độ tươi mới):** Dữ liệu có đang được cập nhật đúng tần suất và lịch trình dự kiến hay đường ống bị tắc nghẽn?
2. **Distribution (Phân phối dữ liệu):** Giá trị của các trường dữ liệu có nằm trong khoảng kỳ vọng hay có sự gia tăng bất thường của tỷ lệ `NULL`, chuỗi rỗng và giá trị ngoại lai (outliers)?
3. **Volume (Khối lượng dữ liệu):** Số lượng bản ghi nạp vào có bị giảm đột ngột về 0 hoặc tăng vọt bất thường so với đường cơ sở (baseline)?
4. **Schema (Cấu trúc dữ liệu):** Các bảng và trường dữ liệu có bị xóa, đổi tên hoặc thay đổi kiểu dữ liệu mà không có cảnh báo trước (*schema drift*)?
5. **Lineage (Hành trình dữ liệu):** Bản đồ phả hệ ghi nhận toàn bộ chuỗi nguồn gốc, các bước biến đổi (transformations) và đích đến của từng bản ghi dữ liệu.

---

## Ý Nghĩa Trong Hệ Thống AI & RAG

* **Truy vết lỗi từ gốc:** Rất nhiều trường hợp Agent sinh ảo giác (hallucination) thực chất bắt nguồn từ việc Ingestion bị fail hoặc nạp tài liệu lỗi thời. Data Lineage cho phép truy vết ngược từ câu trả lời $\rightarrow$ chunk ID $\rightarrow$ tài liệu gốc $\rightarrow$ phiên bản pipeline run để tìm đúng lỗi.
* **Trục quan sát kép:** Hệ thống AI hiện đại cần kết hợp song song giữa *Pipeline Signals* (Freshness, Failed syncs, Dead Letter Queue) và *Agent Signals* (Retrieval hit rate, Faithfulness, Tool failure rate).

---

## Mệnh đề tri thức liên quan

* [[Day 10 - Data Pipeline Observability và Quản trị ETL]]
* [[Hệ thống Data Observability bảo vệ RAG bằng năm trụ cột giám sát toàn diện]]
* [[Chất lượng dữ liệu đầu vào quyết định trực tiếp giới hạn trên của hệ thống AI]]
* [[ETL Orchestration]]
