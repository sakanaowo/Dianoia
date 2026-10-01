---
type: concept
status: growing
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - concept
  - etl
  - orchestration
  - airflow
  - dagster
  - prefect
  - data-engineering
created: 2026-09-24
updated: 2026-09-24
---

# ETL Orchestration

## Định nghĩa

**ETL Orchestration (Điều phối Quy trình Dữ liệu)** là cơ chế kỹ thuật tự động hóa việc lập lịch, điều phối thứ tự thực thi, quản trị sự phụ thuộc giữa các tác vụ (tasks), xử lý lỗi và giám sát toàn bộ chuỗi trích xuất (Extract), biến đổi (Transform) và nạp (Load) dữ liệu thông qua đồ thị có hướng không chu trình (**DAG - Directed Acyclic Graph**).

---

## Các Thành Phần Cốt Lõi Của Orchestrator

1. **DAG (Directed Acyclic Graph):** Bản thiết kế cấu trúc luồng công việc, xác định thứ tự thực thi và quan hệ phụ thuộc giữa các mắt xích.
2. **Operators / Tasks:** Đơn vị thực thi công việc cụ thể (chạy Python script, thực thi dbt model, nạp vector store).
3. **Scheduler:** Bộ máy lập lịch kích hoạt theo biểu thức Cron hoặc theo sự kiện (Event-driven).
4. **Executor:** Hạ tầng phân phối và thực thi tác vụ (Local, Celery, Kubernetes).
5. **State & Metadata Store:** Lưu trữ trạng thái chạy, lịch sử và kênh trao đổi dữ liệu nhỏ giữa các task (ví dụ XCom trong Airflow).

---

## Các Nền Tảng Phổ Biến

* **Apache Airflow 3.0:** Nền tảng trưởng thành nhất với hệ sinh thái khổng lồ, hỗ trợ Event-driven scheduling và DAG Versioning.
* **Dagster:** Mô hình hướng tài sản dữ liệu (*Asset-centric*), tự động xây dựng data lineage và khả năng quan sát sẵn có.
* **Prefect:** Thiết kế ưu tiên Python thuần túy (*Python-native*), loại bỏ mã thừa, triển khai cực nhanh cho các dự án AI/LLM.

---

## Kỷ Luật Vận Hành Bắt Buộc

* **Tính Bất Biến (Idempotency):** Mọi tác vụ phải được thiết kế sao cho khi chạy lại nhiều lần trên cùng dữ liệu đầu vào luôn cho ra kết quả đồng nhất, ngăn chặn việc nhân bản dữ liệu (duplicate chunks) trong kho lưu trữ và vector database.
* **Xử Lý Lỗi Bền Vững:** Kết hợp Retry with Exponential Backoff, Dead Letter Queue (DLQ) cho bản ghi lỗi, và hệ thống cảnh báo vi phạm SLA.

---

## Mệnh đề tri thức liên quan

* [[Day 10 - Data Pipeline Observability và Quản trị ETL]]
* [[Data Observability]]
* [[Chất lượng dữ liệu đầu vào quyết định trực tiếp giới hạn trên của hệ thống AI]]
