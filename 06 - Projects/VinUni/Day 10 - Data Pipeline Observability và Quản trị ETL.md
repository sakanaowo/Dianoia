---
type: project
status: active
project: "[[VinUni - Chương trình Đào tạo AI Thực chiến]]"
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - project
  - vinuni
  - day-10
  - data-pipeline
  - etl
  - elt
  - data-observability
  - data-quality
  - great-expectations
  - dbt
  - airflow
  - dagster
  - prefect
  - cdc
  - debezium
  - rag-observability
created: 2026-09-24
updated: 2026-09-24
aliases:
  - Day 10 - Data Pipeline Observability và Quản trị ETL
  - Data Pipeline Observability và Quản trị ETL
  - Data Pipeline cho AI
  - Data Observability
  - AICB Ngày 10
  - AICB Buổi 10
---

# Day 10 — Data Pipeline Observability và Quản Trị ETL Automation

Bản tổng hợp có hệ thống toàn bộ phương pháp luận về **Hạ tầng Dữ liệu cho Sản phẩm AI (Data Pipeline for AI Products), So sánh chuyên sâu ETL vs. ELT, Batch vs. Streaming Processing (Kafka, Redpanda, Flink), Cơ chế Ingestion đa nguồn và Change Data Capture (CDC Debezium), Kỹ thuật Data Transformation với dbt, Phân biệt Transform cho BI vs AI/RAG, 6 Chiều kích Data Quality và Framework Great Expectations, 5 Chốt chặn Quality Gates bảo vệ Agent, 5 Trụ cột Data Observability (Freshness, Distribution, Volume, Schema, Lineage), Kỹ nghệ AI Agent Tracing (OpenTelemetry GenAI, Langfuse, RAGAS), và Điều phối luồng dữ liệu (ETL Orchestration) với Apache Airflow 3.0, Dagster, Prefect cùng nguyên tắc Idempotency sống còn** trong chương trình **AI Thực chiến VinUni (Lớp K4A - Giảng viên: M.Sc Trần Minh Tú)**.

> [!TIP] **Tư Duy Dữ Liệu Chỉ Đạo**
> *"Một hệ thống AI trong thế giới thực là một hệ thống phân tán phụ thuộc chặt chẽ vào hạ tầng dữ liệu. Bất kể bạn sở hữu mô hình ngôn ngữ lớn tiên tiến đến đâu, nếu dữ liệu nạp vào bị bẩn, trễ hạn hoặc đứt gãy, Agent chắc chắn sẽ đưa ra câu trả lời sai lệch và ảo giác. Data Observability là tấm khiên phòng thủ phát hiện dữ liệu bất thường ngay trên đường ống trước khi nó kịp đầu độc người dùng cuối."*

---

## 1. Nền Tảng Data Pipeline Trong Sản Phẩm AI (Fundamentals)

![[data-pipeline-foundation-for-ai-products.png]]

### 1.1. Thực Tế Dự Án AI: 80% Là Dữ Liệu
* **Nghịch lý AI:** 60–80% thời gian kỹ thuật của một dự án AI thực tế được dành cho việc thu thập, làm sạch, chuẩn hóa, xây dựng pipeline và giám sát chất lượng dữ liệu — chỉ có 20% thời gian thực sự dành cho việc chọn mô hình hay viết prompt.
* **Garbage In $\rightarrow$ Garbage Out:** Chất lượng phản hồi của Agent tỷ lệ thuận tuyệt đối với độ sạch và độ chính xác của dữ liệu đầu vào.
* **Observability:** Là cơ chế phòng vệ tự động phát hiện dữ liệu sai lệch ngay trên đường ống xử lý *trước khi* người dùng cuối kịp nhận thấy câu trả lời sai.

![[data-pipeline-definition-ai-stack.png]]

### 1.2. AI Data Stack 5 Lớp Điển Hình
1. **Sources:** Cơ sở dữ liệu nghiệp vụ (PostgreSQL, MySQL), REST/GraphQL APIs, files (PDF, Word, CSV), event streams (Kafka).
2. **Pipeline (Ingest + Transform):** Trích xuất, chuẩn hóa, phân mảnh (chunking) và làm giàu (enrichment).
3. **Storage:** Kho dữ liệu tập trung (Data Warehouse, Data Lakehouse) và Vector Database (Qdrant, Pinecone, Milvus, Weaviate).
4. **Serving:** Lớp API, Semantic Cache, Feature Store cung cấp dữ liệu tức thì.
5. **Agent:** Mô hình ngôn ngữ lớn kết hợp Prompt, RAG context và Tool execution.

### 1.3. Bức Tranh Hạ Tầng Dữ Liệu Hiện Đại (Modern AI Data Stack 2026)

![[modern-ai-data-stack-2026.png]]

* **Ingestion:** Fivetran / Airbyte (managed) kết hợp **Debezium** (Change Data Capture chuẩn mở).
* **Storage (Lakehouse):** S3 / GCS + Apache **Iceberg** hoặc Delta Lake (quản trị bảng dữ liệu mở, time travel, schema evolution).
* **Transform:** **dbt** (Data Build Tool, phiên bản Fusion Engine viết lại bằng Rust tăng tốc độ vượt bậc) thực thi contracts enforce schema nghiêm ngặt.
* **Orchestration:** **Apache Airflow 3.0** (hỗ trợ event-driven scheduling bản địa) hoặc **Dagster** (asset-centric với built-in lineage).
* **Observability:** Monte Carlo, Elementary kết hợp chuẩn mở **OpenLineage**.
* **Xu hướng thị trường:** Hợp nhất các nền tảng (Fivetran mua Census và sáp nhập dbt Labs; Datadog mua Metaplane).

### 1.4. Minh Họa: Pipeline Cho Một Agent Hỏi Đáp Nội Bộ

![[data-pipeline-internal-qa-agent-flow.png]]

* Sự khác biệt căn bản với dashboard BI:
  * Nếu BI sai: Một con số hiển thị sai trên báo cáo tổng hợp cuối tháng.
  * Nếu Agent sai: Agent trực tiếp thực thi hành động sai hoặc phát ngôn thông tin sai lệch tới người dùng cuối trong tích tắc.
  * Do đó, pipeline dành cho AI bắt buộc phải tích hợp thêm: **Chunking, Metadata Enrichment, Embedding, Retrieval Verification Checks và End-to-end Trace Logs.**

### 1.5. So Sánh Chi Tiết: ETL vs. ELT

![[data-pipeline-etl-vs-elt-comparison.png]]

![[data-pipeline-etl-vs-elt-ai-team-choice.png]]

| Tiêu chí | ETL (Extract $\rightarrow$ Transform $\rightarrow$ Load) | ELT (Extract $\rightarrow$ Load $\rightarrow$ Transform) |
| :--- | :--- | :--- |
| **Vị trí Transform** | Dữ liệu được biến đổi trên server trung gian *trước khi* nạp vào kho lưu trữ. | Nạp toàn bộ raw data vào kho trước; dùng sức mạnh compute của kho để biến đổi *sau*. |
| **Trường hợp tối ưu** | Dữ liệu cực kỳ nhạy cảm cần ẩn danh (masking PII, mã hóa bí mật) trước khi ghi đĩa. | Dữ liệu lớn (Big Data), tận dụng sức mạnh tính toán của Cloud Data Warehouse (BigQuery, Snowflake). |
| **Ưu điểm** | Giảm thiểu tối đa rủi ro bảo mật lưu trữ dữ liệu nhạy cảm dạng thô. | Giữ nguyên bản vẹn raw data; dễ dàng replay, backfill và thử nghiệm nhiều chiến lược transform mới. |
| **Xu hướng AI** | Thích hợp cho các luồng nạp tài liệu trực tiếp vào Vector Store yêu cầu tính sạch tuyệt đối. | **Mô hình Hybrid:** Load raw docs vào Lakehouse an toàn, nhưng áp dụng bước transform ETL để bóc tách PII trước khi đưa vào chỉ mục vector. |

### 1.6. Xử Lý Theo Lô vs. Xử Lý Luồng (Batch vs. Streaming)

![[data-pipeline-batch-vs-streaming-tradeoffs.png]]

![[data-pipeline-streaming-stack-realtime-context.png]]

* **Batch Processing:** Xử lý theo lô định kỳ (hàng giờ/hàng ngày). Đơn giản, chi phí thấp, dễ debug, thích hợp cho training dataset, tài liệu chính sách định kỳ.
* **Streaming Processing:** Xử lý dữ liệu ngay lập tức khi sự kiện phát sinh với độ trễ tính bằng mili-giây. Phù hợp cho phát hiện gian lận (fraud detection), cập nhật trạng thái đơn hàng thời gian thực cho Agent.
* **Hạ tầng Streaming hiện đại:**
  * *Apache Kafka:* Nền tảng kỳ cựu với hệ sinh thái lớn nhất.
  * *Redpanda:* Tương thích API Kafka, viết bằng C++, tối ưu hiệu năng và vận hành tinh giản.
  * *WarpStream:* Kiến trúc Kafka-compatible chạy trực tiếp trên Cloud Object Storage (S3), tối ưu chi phí lưu trữ.
  * *Apache Flink:* Chuẩn mực cho stream processing và stateful event analysis.
  * *Case study Grab Engineering:* Ứng dụng FlinkSQL để chuyển đổi Data Contracts thành các rule kiểm tra dữ liệu real-time trên đường truyền production.

---

## 2. Ingestion Trong Hệ Thống AI & Agentic

Ingestion là giai đoạn đầu tiên tiếp nhận dữ liệu từ các hệ thống nguồn và đưa vào đường ống xử lý.

![[data-ingestion-common-sources-cdc.png]]

### 2.1. Các Loại Nguồn Dữ Liệu Phổ Biến
* **Structured Sources:** RDBMS (PostgreSQL, MySQL), Data Warehouses (Snowflake, BigQuery).
* **Event Streams:** Kafka, AWS Kinesis, Webhooks, IoT Time-series data.
* **Unstructured Sources:** Files (PDF, Word, CSV, Parquet), Object storage (S3, GCS), Web scraping HTML.
* **Kỹ thuật Change Data Capture (CDC):** Bắt trọn vẹn mọi hành động `INSERT`, `UPDATE`, `DELETE` thông qua database transaction log (WAL) để đồng bộ dữ liệu thời gian thực thay vì chạy full table scan định kỳ. **Debezium** (chạy trên Kafka Connect) là tiêu chuẩn công nghiệp mở phổ biến nhất.

### 2.2. Đặc Thù Ingestion Cho Hệ Thống Agentic

![[data-ingestion-agentic-system-requirements.png]]

Hệ thống Agentic cần trích xuất dữ liệu từ 3 nhóm nguồn chính:
1. *Knowledge Sources:* Notion, Confluence, Google Docs, PDFs, SharePoint (tri thức nền tảng).
2. *Transactional Data:* CRM, Ticket support, Order DB, ERP (trạng thái nghiệp vụ hiện tại).
3. *Logs & Feedback:* Lịch sử hội thoại, kết quả gọi tool, phản hồi thumbs up/down, ghi chú escalation của nhân viên hỗ trợ.

### 2.3. Ba Nguyên Tắc Thiết Kế Ingestion Bền Vững
* **Incremental Sync:** Chỉ đồng bộ những bản ghi đã thay đổi hoặc mới phát sinh kể từ lần chạy trước dựa trên trường `updated_at` hoặc con trỏ CDC cursor.
* **Idempotent Upsert:** Thiết lập khóa duy nhất (`primary_key` hoặc `hash(content + doc_id)`). Việc chạy lại tiến trình Ingestion nhiều lần không bao giờ được phép sinh ra các vector duplicate trong Vector Store.
* **Source Versioning:** Luôn đính kèm số hiệu phiên bản và mốc thời gian đồng bộ (`sync_timestamp`) để agent biết chính xác dữ liệu thuộc thời điểm nào.

![[data-ingestion-internal-support-agent-example.png]]

---

## 3. Data Transformation Cho AI & RAG

Data Transformation trong bối cảnh AI không chỉ đơn thuần là chuẩn hóa kiểu dữ liệu SQL, mà là tái cấu trúc văn bản để các mô hình ngôn ngữ và vector index có thể hiểu trọn vẹn ngữ nghĩa.

![[data-transformation-cleaning-issues-normalization.png]]

### 3.1. Các Vấn Đề Làm Sạch Dữ Liệu & Chuẩn Hóa Văn Bản Tiếng Việt
* **Xử lý giá trị lỗi:** Loại bỏ các trường `NULL`, chuỗi rỗng, giá trị placeholder `"N/A"`.
* **Khử trùng lặp (Deduplication):** Sử dụng thuật toán băm (MinHash, SHA-256) hoặc so khớp mờ (fuzzy matching) để gạt bỏ các tài liệu trùng lặp.
* **Enforce UTF-8 & Unicode Normalization:** Đối với tiếng Việt, đây là vấn đề sống còn. Phải chuẩn hóa toàn bộ văn bản về dạng **NFC** (Canonical Decomposition followed by Canonical Composition) để tránh việc cùng một từ tiếng Việt nhưng mang 2 chuỗi byte khác nhau (giữa gõ dấu tổ hợp và dấu dựng sẵn), dẫn đến sai lệch hoàn toàn vector embedding.
* **Text Stripping:** Loại bỏ thẻ HTML thừa, chuẩn hóa khoảng trắng dư thừa, lọc bỏ các chuỗi rác sinh ra từ quá trình OCR tài liệu scan.

### 3.2. dbt — Transformation as Code

![[data-transformation-dbt-as-code.png]]

* **dbt (data build tool)** đưa các thông lệ kỹ thuật phần mềm tốt nhất vào việc quản trị transformation dữ liệu:
  * *Modularity:* Mỗi bước biến đổi là một file `.sql` độc lập.
  * *Lineage:* Tự động phân tích các lệnh `ref()` để sinh ra đồ thị phụ thuộc DAG.
  * *Testing:* Khai báo kiểm thử tự động (not-null, unique, accepted-values) ngay trong file cấu hình `.yml`.
  * *Version Control:* Toàn bộ logic transform được quản lý qua Git với quy trình Pull Request nghiêm ngặt.

### 3.3. Transform Cho AI/RAG Khác Gì Transform Cho BI?

![[data-transformation-ai-rag-vs-bi.png]]

* **Mục tiêu của BI Transform:** Gom nhóm (aggregation), tính toán tổng hợp số liệu để vẽ biểu đồ và hiển thị trên dashboard quản trị.
* **Mục tiêu của AI Transform:** Bảo tồn tối đa ngữ cảnh thông tin (context preservation), phân đoạn hợp lý để embedding model nắm bắt chính xác ý định và retrieval lấy đúng bằng chứng.
* **Các bước chuyển đổi đặc thù cho AI:**
  1. *Clean OCR Noise:* Xóa bỏ các ký tự rác, phục hồi cấu trúc bảng biểu.
  2. *Chunking:* Phân đoạn văn bản vừa vặn với ngân sách token và hoàn chỉnh về mặt ngữ nghĩa.
  3. *Metadata Enrichment:* Bổ sung các trường thuộc tính nghiệp vụ (`doc_id`, `version`, `effective_date`, `department`, `author`).
  4. *Redaction:* Che giấu hoặc xóa bỏ PII và secrets trước khi nạp vào vector store.
  5. *Canonicalization:* Chuẩn hóa tên thực thể (mã sản phẩm, mã lỗi) để hỗ trợ tìm kiếm kết hợp từ khóa.

### 3.4. Kỹ Nghệ Chunking & Metadata Chuyên Sâu Cho Agent

![[data-transformation-chunking-and-metadata-for-agents.png]]

* **Chunk quá lớn:** Chứa lẫn lộn nhiều chủ đề con khác nhau $\rightarrow$ Điểm tương đồng vector bị loãng, retrieval thiếu chính xác, lãng phí token ngân sách dành cho reasoning.
* **Chunk quá nhỏ:** Mất liên kết ngữ cảnh quan trọng $\rightarrow$ Câu trả lời bị thiếu điều kiện tiên quyết, ngoại lệ hoặc điều khoản ràng buộc.
* **Cấu trúc một Chunk lý tưởng:**
  * `chunk_id`: Định danh duy nhất theo cú pháp `doc_id#chunk_index`.
  * `content`: Đoạn văn bản hoàn chỉnh về mặt ngữ nghĩa.
  * `source_doc_id`: Liên kết ngược về tài liệu cha gốc.
  * `section_title`: Tiêu đề mục chứa đoạn văn để định vị bối cảnh.
  * `effective_date`: Ngày bắt đầu có hiệu lực pháp lý/nghiệp vụ.
  * `owner_department`: Đơn vị ban hành và chịu trách nhiệm nội dung.
  * `version`: Số hiệu phiên bản tài liệu.

---

## 4. Quản Trị Chất Lượng Dữ Liệu (Data Quality) Cho AI

Dữ liệu sai hỏng đi vào hệ thống AI sẽ không phát ra tiếng nổ ngay lập tức như lỗi phần mềm truyền thống; nó âm thầm đầu độc các quyết định của Agent.

![[data-quality-six-dimensions.png]]

### 4.1. Sáu Chiều Kích Chất Lượng Dữ Liệu Cốt Lõi
1. **Completeness (Tính đầy đủ):** Không bị thiếu hụt các bản ghi hoặc các trường thông tin trọng yếu (`% NULL`, row count so với baseline).
2. **Accuracy (Tính chính xác):** Dữ liệu phản ánh đúng thực tế khách quan và tuân thủ các quy tắc nghiệp vụ.
3. **Consistency (Tính nhất quán):** Cùng một thực thể nhưng định dạng và giá trị phải đồng nhất giữa các hệ thống khác nhau.
4. **Timeliness (Tính kịp thời/Độ tươi mới):** Dữ liệu được cập nhật đúng hạn và đủ mới cho use case vận hành (`max_age`, `last_updated_at`).
5. **Validity (Tính hợp lệ):** Dữ liệu tuân thủ nghiêm ngặt các quy tắc ràng buộc miền giá trị, regex pattern, định dạng ngày tháng.
6. **Uniqueness (Tính duy nhất):** Không có bản ghi trùng lặp nội dung hoặc trùng lặp khóa chính.

### 4.2. Great Expectations — Data Quality as Code
**Great Expectations** là framework mã nguồn mở tiêu chuẩn cho phép định nghĩa các kỳ vọng dữ liệu (*expectations*) dưới dạng mã Python tự động:

![[data-quality-great-expectations-framework.png]]

```python
import great_expectations as gx

context = gx.get_context()
batch = context.sources.pandas_default.read_csv("knowledge_docs.csv")

# Thiết lập các kỳ vọng chất lượng
batch.expect_column_values_to_not_be_null("content")
batch.expect_column_value_lengths_to_be_between("content", min_value=50, max_value=2000)
batch.expect_column_values_to_match_regex("effective_date", r"^\d{4}-\d{2}-\d{2}$")

results = batch.validate()
if not results["success"]:
    raise ValueError("Dữ liệu vi phạm Quality Gate! Chặn đứng tiến trình Ingestion.")
```

### 4.3. Thiết Lập 5 Chốt Chặn Chất Lượng (Quality Gates) Cho Pipeline

![[data-quality-gates-before-agent-serving.png]]

* **Schema Gate:** Kiểm tra bắt buộc phải có đầy đủ các trường: `content`, `doc_id`, `updated_at`.
* **Freshness Gate:** Kiểm tra mốc thời gian; từ chối hoặc cảnh báo nếu tài liệu chính sách đã hết hạn hiệu lực.
* **Content Gate:** Kiểm tra độ dài văn bản tối thiểu (tránh các chunk cụt lủn) và độ tin cậy OCR (`ocr_confidence >= 0.85`).
* **Dedup Gate:** Kiểm tra mã băm nội dung để loại bỏ các chunk bị nạp trùng lặp.
* **PII Gate:** Quét tự động bằng regex hoặc NER model để loại bỏ số căn cước, số thẻ tín dụng, mật khẩu, access token.

### 4.4. Ma Trận Đối Chiếu: Vấn Đề Dữ Liệu vs. Triệu Chứng Của Agent

![[data-quality-issues-and-agent-symptoms.png]]

| Sự cố dữ liệu trên đường ống | Triệu chứng biểu hiện ở Agent |
| :--- | :--- |
| **Missing documents** (Thiếu bản ghi do sync fail) | Agent không tìm thấy bằng chứng liên quan, báo từ chối trả lời. |
| **Outdated version** (Bản ghi cũ chưa được purge) | Agent trả lời tự tin nhưng dựa trên chính sách đã hết hạn. |
| **Duplicate chunks** (Trùng lặp vector trong store) | Agent lặp đi lặp lại cùng một luận điểm nhiều lần trong phản hồi. |
| **Wrong metadata** (Gắn nhầm nhãn phòng ban/ngày) | Agent trích dẫn sai nguồn (*wrong citation*), vi phạm quy chế phân quyền. |
| **Secret leakage** (Sơ suất không lọc dữ liệu nhạy cảm) | Agent làm lộ mật khẩu, API key hoặc dữ liệu riêng tư cho người dùng cuối. |

> [!IMPORTANT] **Điểm Dạy Học Cốt Lõi**
> Rất nhiều lỗi mà kỹ sư thường vội vàng đổ lỗi cho "mô hình bị ảo giác" (*model hallucination*) thực chất lại có nguồn gốc sâu xa từ một con bọ dữ liệu (*data pipeline bug*) trên đường ống trích xuất!

---

## 5. Giám Sát Toàn Diện: Data Observability & Agent Observability

### 5.1. Năm Trụ Cột Của Data Observability (5 Pillars)
Hệ thống giám sát dữ liệu hiện đại tập trung vào 5 khía cạnh cốt lõi:

![[data-observability-five-pillars.png]]

1. **Freshness:** Dữ liệu có đang được cập nhật đúng lịch trình định trước hay bị treo?
2. **Distribution:** Phân phối giá trị có dấu hiệu bất thường không (tỷ lệ null tăng vọt, phân bổ độ dài chunk lệch chuẩn)?
3. **Volume:** Số lượng bản ghi nạp vào tăng đột biến hoặc giảm sâu bất thường?
4. **Schema:** Các trường dữ liệu có bị đổi tên, thêm mới hoặc bị xóa bất ngờ từ hệ thống nguồn không?
5. **Lineage:** Hành trình dữ liệu đi từ nguồn gốc qua những bước biến đổi nào trước khi đến tay Agent?

### 5.2. Kịch Bản Điều Tra Thực Tế Khi RAG Agent Trả Lời Sai

![[data-observability-in-practice-monitoring-metrics.png]]

Khi người dùng phàn nàn Agent cung cấp chính sách hoàn tiền cũ, một kỹ sư có kỹ năng Observability sẽ thực hiện quy trình điều tra 6 bước:
1. Nhận phản hồi sự cố từ người dùng.
2. Kiểm tra **Answer Trace**: Trích xuất chính xác danh sách các `chunk_id` mà Agent đã retrieve trong phiên đó.
3. Kiểm tra **Freshness**: Đối chiếu xem chunk đó thuộc phiên bản ngày nào.
4. Kiểm tra **Volume**: Phát hiện số lượng tài liệu chính sách nạp hôm nay bị tụt về mức 0.
5. Truy ngược **Lineage**: Xác định tiến trình ingestion chạy lúc 2 giờ sáng bị thất bại ở bước đồng bộ API chính sách.
6. Kết luận **Root Cause**: API phía đối tác bị timeout và cơ chế retry/backoff chưa được cấu hình đúng.
* *Nếu không có Observability:* Sự cố chỉ được phát hiện sau 8–10 tiếng khi đã có hàng trăm khách hàng tiếp nhận thông tin sai lệch!

### 5.3. Trục Giám Sát Kép: Pipeline Signals vs. Agent Signals

![[data-observability-pipeline-vs-agent-signals.png]]

* **Pipeline / Data Signals (Tầng Hạ Tầng):** Freshness của knowledge base, số lượng lượt sync thất bại, kích thước Dead-Letter Queue, tỷ lệ chunk trùng lặp, độ trễ hàng đợi embedding.
* **Agent / Product Signals (Tầng Trải Nghiệm):** Tỷ lệ retrieval hit rate, phần trăm câu trả lời có trích dẫn hợp lệ, tỷ lệ người dùng bấm nút sửa sai/escalate sang con người, tỷ lệ tool call thất bại, số lượng phiên chat bị bỏ dở giữa chừng.
* **Quan điểm thực chiến:** Hệ thống quan sát chất lượng cao phải kết nối chặt chẽ chuỗi nhân quả: **Data Issue $\rightarrow$ Retrieval Issue $\rightarrow$ Business Impact.**

### 5.4. AI Agent Tracing: Trace & Span với Langfuse & OpenTelemetry

![[ai-agent-observability-trace-span-tools.png]]

* **Trace:** Đại diện cho toàn bộ hành trình xử lý một yêu cầu của người dùng từ đầu đến cuối (*end-to-end*).
* **Span:** Đại diện cho một bước xử lý cụ thể bên trong Trace (1 lần gọi LLM, 1 lần gọi tool, 1 lần truy vấn vector database).
* **Hạ tầng công cụ:**
  * *OpenTelemetry GenAI Spans:* Chuẩn mở để chuẩn hóa dữ liệu tracing.
  * *Langfuse:* Nền tảng mã nguồn mở (open-source, self-hosted) mạnh mẽ nhất hiện nay để quản trị trace, token usage, latency và cost.
  * *Phoenix (Arize):* Công cụ mã nguồn mở dựa trên chuẩn OpenInference, hỗ trợ đánh giá sâu RAG.
  * *LangSmith:* Nền tảng thương mại của LangChain.
  *(Lưu ý cập nhật thị trường 2026: Helicone đã bị Mintlify thâu tóm vào tháng 03/2026 và chuyển sang chế độ bảo trì, không còn phát triển tính năng mới).*

![[ai-agent-observability-langfuse-trace-demo.png]]

```python
from langfuse import Langfuse
langfuse = Langfuse()

# Khởi tạo trace cho toàn bộ request
trace = langfuse.trace(name="customer-support-rag", input={"question": query})

# Ghi nhận span cho bước Retrieval
retrieval_span = trace.span(name="vector-retrieval")
retrieved_chunks = vector_store.search(query, top_k=5)
retrieval_span.end(output={"chunk_ids": [c.id for c in retrieved_chunks]})

# Ghi nhận generation span cho bước LLM
generation = trace.generation(
    name="synthesis",
    model="gpt-4o-mini",
    input=retrieved_chunks,
    usage={"prompt_tokens": 512, "completion_tokens": 128}
)
```

### 5.5. Đánh Giá Độ Trung Thực Với RAGAS & Sức Khỏe Vector Store

![[ai-agent-observability-ragas-eval-vector-store-health.png]]

* **RAGAS Evaluation:** Tự động chấm điểm định kỳ trên mẫu hội thoại sản xuất để theo dõi hai chỉ số sống còn:
  * *Faithfulness:* Tỷ lệ khẳng định trong câu trả lời có bằng chứng xác thực trong retrieved context.
  * *Answer Relevancy:* Mức độ câu trả lời giải quyết đúng trọng tâm câu hỏi của người dùng.
* **Vector Store Health:** Giám sát chỉ số Prometheus từ Qdrant/Weaviate (recall rate, search latency, memory utilization). Cảnh báo hiện tượng *Embedding Drift* (chất lượng retrieval suy giảm dù số lượng chunk vẫn đầy đủ 100%).
* **Cảnh báo Token Drift:** Một agent rơi vào vòng lặp lỗi có thể khiến chi phí tăng vọt gấp 100 lần chỉ trong vài phút. Bắt buộc phải thiết lập hệ thống cảnh báo anomaly trên chỉ số `$/request` và `token delta`.

---

## 6. Điều Phối Luồng Dữ Liệu: ETL Automation & Orchestration

### 6.1. Apache Airflow 3.0: Điều Phối Dựa Trên Đồ Thị DAG

![[etl-orchestration-apache-airflow-dag.png]]

* **DAG (Directed Acyclic Graph):** Định nghĩa cấu trúc quan hệ phụ thuộc và thứ tự thực thi của các tác vụ không có chu trình.
* **Operator:** Đơn vị thực thi công việc (PythonOperator, BashOperator, DockerOperator).
* **Scheduler:** Bộ lập lịch kích hoạt DAG theo biểu thức cron hoặc theo sự kiện.
* **Điểm mới của Airflow 3.0 (2025–2026):** Hỗ trợ kiến trúc hướng sự kiện bản địa (**Event-driven scheduling**) và quản lý phiên bản đồ thị (**DAG Versioning**) — khắc phục triệt để điểm yếu phụ thuộc hoàn toàn vào cron job trước đây.
* **XCom:** Kênh trao đổi dữ liệu nhỏ (metadata, con trỏ trạng thái) giữa các task trong DAG.

### 6.2. Cuộc Đối Đầu Các Nền Tảng Điều Phối (Orchestration Face-off 2026)

![[etl-orchestration-tool-faceoff-2026.png]]

![[etl-orchestration-airflow-prefect-dagster-selection.png]]

| Nền tảng | Thế mạnh vượt trội | Lựa chọn tối ưu khi nào? |
| :--- | :--- | :--- |
| **Apache Airflow 3.0** | Hệ sinh thái khổng lồ, trưởng thành, hỗ trợ Event-driven và DAG versioning. | Doanh nghiệp lớn, quy trình batch phức tạp với hàng trăm dependencies phụ thuộc chéo. |
| **Dagster** | Mô hình hướng tài sản (**Asset-centric**), tự động dựng sẵn data lineage và observability. | Các đội ngũ Data Platform nặng về dữ liệu, quản trị table/index như một tài sản phần mềm. |
| **Prefect** | Lập trình Python thuần túy (*Python-native*), ít mã thừa (boilerplate), cài đặt cực nhanh. | Các công ty khởi nghiệp, dự án AI/LLM cần triển khai nhanh từ máy cá nhân lên cloud. |
| **Mage AI / Kestra** | Giao diện trực quan low-code, điều phối workflow đa năng mở rộng ngoài dữ liệu. | Đội ngũ muốn tích hợp nhanh, giảm thiểu rào cản kỹ thuật hạ tầng. |

### 6.3. Quy Trình Orchestration Mẫu Cho RAG Pipeline

![[etl-orchestration-rag-agent-pipeline-workflow.png]]

Một DAG chuẩn mực điều phối dữ liệu cho RAG Agent bao gồm 6 mắt xích liên hoàn:
1. *Sync docs/API:* Kích hoạt định kỳ hoặc khi có webhook tài liệu mới.
2. *Quality Gate (Fail Fast):* Kiểm tra hợp lệ dữ liệu. Nếu vi phạm, lập tức chặn đứng pipeline không cho nạp tiếp.
3. *Chunk + Metadata:* Phân mảnh và gắn metadata nghiệp vụ.
4. *Embed:* Sinh vector biểu diễn qua mô hình embedding.
5. *Upsert Vector Store:* Nạp vector vào Qdrant/Pinecone với khóa idempotent.
6. *Smoke Test Retrieval & Alert:* Chạy tự động 5 câu hỏi benchmark tiêu chuẩn để xác nhận vector mới đã có thể tìm kiếm được; gửi thông báo Slack nếu tỷ lệ hit rate suy giảm.

### 6.4. Mini-Quest: Tìm Lỗi Trong Pipeline Của Startup X

![[etl-orchestration-pipeline-flaw-quest.png]]

* **Sự cố trong sơ đồ:** Pipeline của Startup X đi thẳng từ `Sync docs/API` $\rightarrow$ `Chunk + metadata` $\rightarrow$ `Embed` $\rightarrow$ `Upsert vector store` mà **hoàn toàn bỏ qua bước Quality Gate** ở đầu nguồn!
* **Hậu quả thực tế:** Khi một file PDF bị hỏng OCR hoặc tài liệu nội bộ chứa thông tin thẻ tín dụng của khách hàng đi qua pipeline, toàn bộ dữ liệu rác và dữ liệu nhạy cảm đó sẽ bị nhúng thẳng vào Vector Database. Sau đó bước Upsert sẽ ghi đè và làm hỏng toàn bộ chỉ mục tìm kiếm của Agent, dẫn đến thảm họa rò rỉ dữ liệu hoặc câu trả lời sai lệch diện rộng.

### 6.5. Quản Trị Lỗi, Lập Lịch & Tính Bất Biến (Idempotency)

![[etl-orchestration-scheduling-and-error-handling.png]]

* **Chiến lược lập lịch (Scheduling):**
  * *Cron-based:* Định kỳ cố định (ví dụ `0 2 * * *` lúc 2 giờ sáng mỗi ngày).
  * *Event-driven:* Kích hoạt ngay khi có file tải lên S3 hoặc nhận webhook thông báo chính sách mới.
  * *Dependency-based:* Chỉ kích hoạt khi pipeline thượng nguồn hoàn thành thành công.
* **Mô hình xử lý lỗi (Error Handling):**
  * *Retry with Exponential Backoff:* Thử lại sau 30s $\rightarrow$ 2m $\rightarrow$ 10m để tránh làm sập server nguồn.
  * *Dead Letter Queue (DLQ):* Đẩy các bản ghi lỗi vào hàng đợi riêng để kỹ sư phân tích sau, không làm tắc nghẽn toàn bộ pipeline.
  * *SLA Breach Alerting:* Bắn cảnh báo qua Slack/PagerDuty nếu thời gian chạy vượt quá ngưỡng cam kết.
* **Nguyên tắc bất di bất dịch — Idempotency:**
  * Toàn bộ pipeline bắt buộc phải có tính chất **Idempotent**: Chạy lại pipeline 2 lần hoặc 10 lần trên cùng một tập dữ liệu đầu vào phải cho ra kết quả cuối cùng hoàn toàn giống hệt như chạy 1 lần duy nhất.
  * Thiếu tính chất idempotency là nguyên nhân số một gây ra hiện tượng nhân bản dữ liệu (duplicate vectors) làm nổ tung dung lượng và làm méo mó kết quả retrieval của Agent.

---

## Tài Liệu Tham Khảo & Liên Kết Vault

* [[VinUni - Chương trình Đào tạo AI Thực chiến]] — Chương trình đào tạo tổng thể.
* [[Day 07 - Data Foundation và Kiến trúc RAG]] — Nền tảng dữ liệu và Vector Store.
* [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]] — Kỹ nghệ RAG nâng cao và Evaluation.
* [[Day 09 - Multi-Agent Systems và Kiến trúc Điều phối]] — Hệ thống đa tác tử và điều phối LangGraph.
* [[Data Observability]] — Khái niệm 5 trụ cột giám sát dữ liệu.
* [[ETL Orchestration]] — Điều phối quy trình dữ liệu với DAG.
