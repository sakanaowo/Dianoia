---
type: atomic
status: growing
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - atomic
  - data-observability
  - data-engineering
  - rag
  - monitoring
created: 2026-09-24
updated: 2026-09-24
---

# Hệ thống Data Observability bảo vệ RAG bằng năm trụ cột giám sát toàn diện

## Mệnh đề cốt lõi

Một hệ thống RAG đưa vào môi trường sản xuất không thể chỉ dựa vào các bài kiểm thử tĩnh lúc deploy; **Data Observability đóng vai trò như một hệ thống miễn dịch thời gian thực bảo vệ RAG thông qua 5 trụ cột quan sát: Freshness (độ tươi mới), Distribution (phân phối dữ liệu), Volume (khối lượng bản ghi), Schema (cấu trúc trường), và Lineage (hành trình dữ liệu)**, cho phép phát hiện sự cố từ tầng dữ liệu hạ tầng trước khi nó biến thành ảo giác của mô hình.

---

## Bối cảnh và Cơ chế Vận hành 5 Trụ Cột

1. **Freshness (Độ tươi mới của tri thức):**
   * *Rủi ro:* Pipeline ingestion bị treo do lỗi mạng, khiến cơ sở tri thức bị đóng băng ở quá khứ mà không có thông báo lỗi.
   * *Giám sát:* Kiểm tra chỉ số `max_age` và mốc thời gian cập nhật gần nhất của tài liệu trong Vector Store so với lịch trình cam kết (SLA).

2. **Distribution (Phân phối giá trị):**
   * *Rủi ro:* Dữ liệu bị biến dạng qua các bản cập nhật nguồn, tỷ lệ giá trị `NULL` tăng đột biến, hoặc độ dài trung bình của các chunk bị co cụm bất thường.
   * *Giám sát:* Thiết lập ngưỡng thống kê tự động (anomalies detection) trên các trường thuộc tính metadata và độ dài ký tự của chunk.

3. **Volume (Khối lượng dữ liệu):**
   * *Rủi ro:* Số lượng bản ghi nạp vào giảm sâu về 0 (do API nguồn thay đổi định dạng phản hồi) hoặc tăng đột biến gấp 10 lần (do lặp vô hạn).
   * *Giám sát:* Theo dõi `row count delta` qua từng đợt chạy ETL.

4. **Schema (Biến động cấu trúc):**
   * *Rủi ro:* Đội ngũ kỹ thuật phía nguồn đổi tên cột (ví dụ từ `customer_notes` sang `feedback_text`) làm cho bước Ingestion bỏ sót trường dữ liệu.
   * *Giám sát:* Kiểm tra schema hợp đồng (Data Contracts) trước khi cho phép dữ liệu đi vào bước Transform.

5. **Lineage (Hành trình dữ liệu):**
   * *Rủi ro:* Khi Agent trả lời sai, không ai biết đoạn trích dẫn được lấy từ tài liệu nào, chuyển đổi qua script nào và nạp vào lúc mấy giờ.
   * *Giám sát:* Sử dụng chuẩn OpenLineage hoặc công cụ chuyên dụng (Langfuse, Dagster) để liên kết chặt chẽ: `Session ID -> Retrieved Chunk IDs -> Source Doc Version -> Pipeline Run ID`.

---

## Giả định và Giới hạn

* Data Observability cung cấp cảnh báo sớm về các bất thường của dữ liệu trên đường ống, nhưng nó không thay thế được tầng kiểm thử chất lượng mô hình (Model Evaluation như RAGAS) để đo lường mức độ thấu hiểu ngôn ngữ tự nhiên. Cần kết hợp đồng thời cả hai tầng tín hiệu.

---

## Liên kết tri thức

* Khung phương pháp luận: [[Day 10 - Data Pipeline Observability và Quản trị ETL]]
* Khái niệm liên quan: [[Data Observability]], [[ETL Orchestration]], [[Data Quality Pyramid]]
* Mệnh đề liên quan: [[Chất lượng dữ liệu đầu vào quyết định trực tiếp giới hạn trên của hệ thống AI]]
