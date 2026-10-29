---
type: daily
created: "2026-10-12"
---

# 2026-10-12 - Day24 - Data & annotation pipeline for CV & Robotics

## 1. A - Data pipeline
> Generation -> Ingestion -> Storage -> Transformation -> Serving

Dữ liệu qua pipeline

|Thuật ngữ|Hiểu trong bài lab này|
|---|---|
|**Partition**|Phần dữ liệu của một trip; có thể chạy lại riêng|
|**Idempotent**|Chạy lại cùng đầu vào mà số dòng và nội dung cuối không đổi|
|**Schema drift**|Hai nguồn telemetry dùng tên cột, đơn vị hoặc kiểu thời gian khác nhau|
|**Quarantine / rejects**|Nơi giữ dòng lỗi cùng lý do để kiểm tra, thay vì xóa im lặng|
|**Quality gate**|Test error chặn pipeline khi dữ liệu không đạt; test warn chỉ báo|
|**Event time / ASOF join**|Ghép frame với telemetry gần thời điểm ghi nhận của frame|
|**Lineage**|Dấu vết các bảng, phiên bản và file nguồn tạo nên dataset|

## 2. B - Annotation