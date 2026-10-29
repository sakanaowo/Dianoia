---
type: project
status: active
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - project
  - vinuni
  - ai-engineering
  - bootcamp
created: 2026-09-12
updated: 2026-09-12
aliases:
  - VinUni
  - VinUni AI Bootcamp
  - AI Thực chiến VinUni
  - VinUni K4A
---

# VinUni — Chương trình Đào tạo AI Thực chiến

Trạm điều khiển trung tâm (*Command Center*) theo dõi và quản lý toàn bộ lộ trình tham gia **Chương trình Đào tạo AI Thực chiến tại VinUni**.

> [!INFO] **Thông tin Đội Dự Án & Học Viên**
> - **Lớp:** K4A — Bootcamp AI Thực chiến (VinUni)
> - **Mã đội:** **`078`** | **Tên đội:** **Thợ xem trẻ ăn**
> - **Slogan:** *"Mời BA về với đội của chúng mình"*
> - **Thành viên đội (4/4):**
>   1. **Nguyễn Thái Anh** (`2A202602810` - `C401`) — **Team Lead / AI Research & Modeling** (ML, Prompt Engineering, CV, Backend, Frontend)
>   2. **Hoàng Trung Hiếu** (`2A202602945` - `C401`) — **Product Lead / Business Analyst (BA) & Workflow** (BA, PM, UI/UX, Data Analysis, NLP, Team Leadership)
>   3. **Nguyễn Văn Giáp** (`2A202602903` - `D301`) — **Data Engineering & Backend Lead** (Data Engineering, NLP, ML, DevOps/Cloud, Prompt Engineering)
>   4. **Hoàng Ngọc Đăng Khoa** (`2A202602790` - `C401`) — **DevOps / Fullstack & Evaluation Lead** (DevOps/Cloud, ML, Backend, Frontend, Giáo dục & Đào tạo)
> 
> ![[Doi_078_Tho_xem_tre_an.png]]

---

## 1. Mục tiêu chương trình

* **Làm chủ tư duy Problem-First:** Nắm vững phương pháp phân rã và thẩm định bài toán trước khi viết mã nguồn; tránh bẫy "Agent cho ngầu" hoặc đưa AI vào khi chưa rõ điểm đau.
* **Kỹ nghệ phát triển AI thực chiến (AI Engineering):** Từ khâu trích xuất dữ liệu, xây dựng pipeline RAG/GraphRAG, thiết kế prompt/workflow đến đo lường và kiểm thử thực nghiệm.
* **Chuyển hóa vào Đồ án tốt nghiệp:** Ứng dụng trực tiếp các phương pháp học được vào đề tài nghiên cứu Deep Learning và đồ án tốt nghiệp kỹ sư CNTT.

---

## Đề tài Khóa học / Capstone Project Candidates

> [!INFO] **Trạng thái Đăng ký Ngân hàng Đề (AI20K Bank)**
> - **Hạn chốt chính thức:** 20/09/2026 (Nhóm có thể pick nhiều đề tài ứng viên để khảo sát song song).
> - **Đề tài ứng viên số 1 (Đã pick giữ chỗ slot 1/2):**
>   * **[[EDU-02 - Trợ lý Giảng dạy AI|EDU-02 — Trợ lý giảng dạy AI tổng hợp vướng mắc lớp học realtime]]** (Khối A · AI Giáo dục)
>   * *Workspace chi tiết:* [[EDU-02 - Trợ lý Giảng dạy AI|Thư mục Dự án EDU-02]]
>     - [[Problem Statement - EDU-02]] — Bản đặc tả bài toán 9 trường chuẩn hóa.
>     - [[Architecture & Workflow - EDU-02]] — Thiết kế kiến trúc LangGraph, RAG & Approval Gate HITL.
>     - [[Tech Specs & Eval Plan - EDU-02]] — Data contracts, System prompt contract và DeepEval plan.

---

## 2. Lộ trình Đào tạo & Tiến độ (Roadmap)

### Giai đoạn 1: Định vị, Đóng gói Bài toán & Thiết kế Workflow (Problem Framing & Workflow Design)
- [x] **Day 01:** Khởi động chương trình, khảo sát bối cảnh và phương pháp tiếp cận AI thực chiến.
- [x] **Day 02:** [[Day 02 - Tìm đúng bài toán cho AI]]
  - Quét 10 điểm đau thực tế, chấm điểm ma trận chọn đề tài nhóm: *Giải mã công thức toán trong paper AI*.
  - Khảo sát thực tế & bóc tách hạn chế của SciSpace, Mathpix.
  - Thiết kế kiến trúc **6-step GraphRAG Pipeline** (Knowledge Graph + Multi-hop Traversal).
  - So sánh Rule vs. Workflow vs. Agent; chuẩn hóa **Problem Statement v1**.
  - Xây dựng slide trình chiếu tương tác và kế hoạch Pilot 3 paper.
- [x] **Day 03:** [[Day 03 - Thiết kế Workflow và Kiểm soát Hệ thống AI]]
  - Khám phá vấn đề theo tư duy HCD; chuyển yêu cầu giải pháp thành bài toán người dùng.
  - Lập bản đồ Current State & Future State; định lượng baseline và nút thắt của workflow.
  - Phân định LLM trực tiếp vs. Công cụ hỗ trợ; ranh giới bảo mật dữ liệu nhạy cảm.
  - 3 Pattern kiến trúc Workflow: Routing, Prompt Chaining có Gate, Orchestrator–Workers.
  - Mức tự chủ và kiểm soát con người: Automation vs. Augmentation, Disambiguation, Graceful Failure, Approval Gates.
  - Tiêu chí thành công định lượng, ước tính Cost Envelope, đánh đổi Precision–Recall, và điều kiện chuyển từ Demo sang Production.

### Giai đoạn 2: Kỹ Nghệ Prompt, Quản Trị Context & Tool Calling (Prompt & Tool Engineering)
- [x] **Day 04 (Chiều):** [[Day 04 - Prompt Engineering và Tool Calling]]
  - Kỹ nghệ Prompt as Code: Specificity beats cleverness, quản lý ngân sách token, tiny eval set.
  - System Prompt Contract: 4 khối Persona, Core Directives, Capabilities, Output Contract, Negative Constraints.
  - Context Engineering theo 4 nguyên tắc Lance Martin: Write, Select, Compress, Isolate; xử lý Lost in the Middle và Prompt Caching.
  - Vòng lặp kỹ thuật Tool Calling 4 bước; phân loại Knowledge vs Capability vs Write actions; JSON schema design.
  - Quản trị lỗi và phòng ngừa vòng lặp vô tận: Error as clean observation, self-correction, Circuit Breaker (`max_turns`), retry budget.
  - 4 Nguyên tắc vàng thiết kế tool (Single Responsibility, Idempotency, Granularity hợp lý, Test độc lập).
  - Thực thi song song qua `asyncio.gather`, Fan-out / Fan-in pattern và quản trị race conditions.
- [x] **Workshop Tối Day 04:** [[Workshop - Xây dựng AI MVP]]
  - Khung sườn 5 bước: Persona $\rightarrow$ Problem $\rightarrow$ AI Leverage $\rightarrow$ MVP Scope $\rightarrow$ Metric.
  - Persona sắc bén: 5 câu hỏi cắt bỏ tính năng; bóc tách Problem gốc vs Triệu chứng bề mặt.
  - Công thức Problem Statement chuẩn hóa 5 thành phần; AI không phải là Value Proposition (Outcome-first).
  - Bản đồ đòn bẩy AI (AI Leverage Map); Radar 6 yếu tố thẩm định AI Feasibility.
  - AI MVP Canvas 10 ô tinh gọn trên 1 trang giấy; Thang kiểm chứng 5 nấc (The Validation Ladder).
  - Bảng chấm điểm AI MVP Scorecard 6 tiêu chí; áp dụng vào bài toán đồ án GraphRAG Nhóm 2.

### Giai đoạn 3: Quản Trị Sản Phẩm AI & Hackathon (AI Product Management & Hackathon)
- [x] **Day 05 (15/09):** Quản trị Sản phẩm AI & Đặc tả Kỹ thuật (PRD v2)
  - AI mang tính xác suất (Probabilistic vs Deterministic); phân công người–máy và triết lý Narrow AI.
  - Đặc tả PRD v2 cho tính năng AI: Acceptance criteria xác suất, test distribution, failure modes (soft fallback, human handoff).
  - Khung HAX Playbook của Microsoft để nhận diện kịch bản lỗi và kiểm thử.
  - Prototype vs. MVP: Giải tỏa rủi ro ẩn cao nhất (*Leap of Faith*), Thang đo 5 mức trung thực (Fidelity Ladder).
  - UX cho AI: Cân chỉnh niềm tin (*Trust Calibration*), hiển thị độ tin cậy và kiểm soát của người dùng.
- [x] **Day 06 (16–18/09):** Hackathon AI Thực chiến (3 ngày)
  - Đăng ký và chốt danh sách nhóm dự án Khối A/B.
  - Hiện thực hóa MVP theo lộ trình AI Canvas và kiểm chứng giả định thực tế.

### Giai đoạn 4: Nền Tảng Dữ Liệu & Kiến Trúc RAG (Data Foundation & RAG)
- [x] **Day 07 (19/09):** [[Day 07 - Data Foundation và Kiến trúc RAG]]
  - 4 Phương thức cấp tri thức cho AI: In-Context vs CAG vs RAG vs Finetuning.
  - Phân tầng kiến trúc RAG: Online Layer (SLA < 2s) vs Offline Layer (Pipelines & Storage).
  - Quản trị dữ liệu & Data Quality Pyramid (Raw $\rightarrow$ Cleaned $\rightarrow$ Structured $\rightarrow$ Enriched); Governance & ACL.
  - 9 Chiến lược Chunking (Nền tảng, Ngữ nghĩa, Chuyên biệt); Cây quyết định thực dụng khi chọn chunking.
  - Embedding model & 4 use cases sản phẩm (Semantic search, Clustering, Dedup, Recommendation).
  - Vector Store: Cấu trúc 4 trường (ID, Text, Vector, Metadata); Metadata filtering; Ma trận chọn Open source vs Managed.
  - Ingestion Pipeline (Input validation bằng magic bytes, fail fast) & Enrichment (Auto-tagging, Summarize, Graph triples).
  - Basic Retrieval: Tách biệt offline/online; Bộ 3 tham số Top-k, Score threshold, Attribute filtering.
- [x] **Day 08 (20/09):** [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]]
  - Kiến trúc Modular RAG 6 tầng: Pre-Retrieval, Retrieval, Post-Retrieval, Augmentation, Generation, Post-Generation.
  - Pre-Retrieval: Pre-filtering theo metadata ($n \ll N$), Query Normalization (5 kỹ thuật) và Query Transformation (Decomposition, Contextualization, HyDE).
  - Retrieval & Hybrid Search: Phối hợp Dense Vector (ngữ nghĩa) và Sparse Vector BM25 (từ khóa chính xác); Thuật toán dung hợp RRF ($k=60$) và Alpha Weighting ($\alpha \cdot S_{dense} + (1-\alpha) \cdot S_{sparse}$); Grid Search tuning $\alpha$.
  - Post-Retrieval: Kiến trúc Retrieve-and-Rerank (Bi-Encoder Top 100 $\rightarrow$ Cross-Encoder Top 3-5); Thuật toán MMR (Maximum Marginal Relevance) chống trùng lặp context.
  - Context Augmentation: Cấu trúc prompt phân định bằng XML tags; Hóa giải Lost in the Middle bằng Document Reordering; 3 chiến lược giải quyết xung đột metadata (Recency, Authority, Surface Conflict); Pre-retrieval ACL filtering; Token Budget (20-60-20) và nén LLMLingua.
  - Generation & Defense: Routing model 3 tầng; Grounded Generation kèm citation; Vòng lặp Self-Correction; Strict Grounding vs Graceful Degradation; Nguyên tắc vàng debug log.
  - Agentic RAG: Vòng lặp suy luận (Self-Query, Corrective RAG C-RAG, Adaptive RAG) và mở rộng Tool Use (SQL DB, External API, Code Interpreter).
  - RAG Evaluation: Bài trừ Vibe check; Xây dựng Test Set chuẩn 3 trường (question, ground_truth, expected_chunks); Tự động hóa kiểm thử CI/CD qua GitHub Actions; Quản trị Index Freshness; Bài toán ROI (Quality vs Latency vs Cost).

### Giai đoạn 5: Hệ Thống Đa Tác Tử, Quản Trị Pipeline & Quan Sát Dữ Liệu (Multi-Agent Systems & Data Observability)
- [x] **Day 09 (Sáng):** [[Day 09 - Multi-Agent Systems và Kiến trúc Điều phối]]
  - 4 Giới hạn vật lý của Single-Agent (Context window bottleneck, Specialization trade-off, Parallelism hạn chế, Reliability mỏng manh).
  - Tư duy hệ thống bài trừ "God Agent"; 3 câu hỏi thiết kế kiến trúc trước khi viết code (trách nhiệm, luồng thông tin, khoanh vùng lỗi).
  - Phân tích Agent Harness thực tế (Claude Code, OpenAI Codex, Antigravity, Cursor); least privilege và cô lập context (`max_threads=6`, `max_depth=1`).
  - 4 Pattern điều phối: Supervisor-Worker, Pipeline, Debate, Hierarchical; Bảng chọn pattern theo bài toán, ưu điểm và cảnh báo.
  - Kiến trúc Supervisor-Worker: Supervisor giữ decision flow, Worker giữ domain skill; 3 đặc điểm worker tốt (Specialized, Stateless, Testable); 4 anti-patterns.
  - Quản trị trạng thái: Shared State vs Message Passing; State Schema tối thiểu (`Day09State`) với nguyên tắc bất biến (trace luôn append).
  - Model Context Protocol (MCP): Chuẩn hóa kết nối Agent-Tool; Triết lý ổ cắm USB; MCP Host/Client/Server; 3 primitives (Tools, Resources, Prompts); Runtime discovery qua `tools/list` và `tools/call`.
  - Giao tiếp Agent-to-Agent (A2A): Message Contract chuẩn hóa (task, context, expected_output); Ngân sách ngữ cảnh theo nguyên tắc "Need to know"; Sync vs Async; Security & Trust Boundaries.
  - Điều phối LangGraph: Chuyển routing từ prompt sang code tường minh; Nodes, Edges, State; Sơ đồ conditional routing; Tích hợp Human-in-the-Loop tại các điểm rủi ro qua cơ chế `interrupt`.
  - Observability & Debugging: Thiết kế Trace Log chuẩn; 3 câu hỏi quan sát sống còn; Nhận diện bẫy "Lỗi im lặng" (`status: ok` khi retrieval trả về 0 chunks dẫn tới hallucination).
  - Tối ưu Chi phí, Độ trễ: Supervisor dùng model nhỏ, Worker dùng model lý luận sâu; Bảng so sánh toàn diện Single-Agent vs Multi-Agent.
- [x] **Day 10 (Chiều):** [[Day 10 - Data Pipeline Observability và Quản trị ETL]]
  - Nền tảng Data Pipeline cho AI: 60-80% thời gian là xử lý dữ liệu; Garbage In Garbage Out; AI Data Stack 5 lớp; Khác biệt giữa Pipeline cho BI vs Agent RAG.
  - So sánh chuyên sâu ETL vs ELT: Khi nào dùng cho AI/LLM; Batch vs Streaming trade-offs; Streaming stack cho real-time context (Kafka, Redpanda, WarpStream, FlinkSQL).
  - Ingestion đa nguồn: Structured, Event streams, Unstructured; Change Data Capture (CDC) với Debezium; Ingestion cho Agentic systems (Knowledge, Transactions, Logs); Thiết kế bền vững: Incremental sync, Idempotent upsert, Source versioning.
  - Data Transformation cho AI: Làm sạch dữ liệu và chuẩn hóa tiếng Việt Unicode NFC; dbt (Transformation as Code) với Rust Fusion engine; Sự khác biệt giữa Transform cho BI vs AI/RAG; Kỹ nghệ Chunking & Metadata enrichment chuyên sâu.
  - Quản trị Data Quality: 6 chiều kích chất lượng dữ liệu; Framework Great Expectations (Data Quality as Code); 5 Quality Gates bảo vệ Agent (Schema, Freshness, Content, Dedup, PII); Ma trận Data issue vs Agent symptom ("Ảo giác thực chất là data pipeline bug").
  - Data Observability: 5 Trụ cột (Freshness, Distribution, Volume, Schema, Lineage); Quy trình 6 bước truy vết nguyên nhân khi Agent trả lời sai; Trục giám sát kép Pipeline signals vs Agent signals.
  - AI Agent Observability: Trace & Span với Langfuse, Phoenix, OpenTelemetry GenAI; Đo lường Faithfulness với RAGAS & Sức khỏe Vector Store; Giám sát Token drift và Cost anomaly.
  - ETL Automation & Orchestration: Apache Airflow 3.0 với Event-driven scheduling và DAG versioning; Orchestration Face-off 2026 (Airflow vs Dagster vs Prefect vs Mage AI vs Kestra); Workflow RAG pipeline chuẩn mẫu; Xử lý lỗi Idempotency, Dead Letter Queue và Backfilling.

### Giai đoạn 5: Hệ Thống Đa Tác Tử, Quản Trị Pipeline & Quan Sát Dữ Liệu (tiếp)
- [x] **Day 11 (26/09):** [[Day 11 - Guardrails, Safety & HITL]]
  - AI Safety Landscape: Hallucination, Prompt Injection, Jailbreak, Bias, Over-autonomy.
  - Defense in Depth: 3 tầng phòng thủ (Input, LLM, Output Rails).
  - Prompt Injection Defenses: Spotlighting, Instruction Hierarchy, CaMeL.
  - Guardrail Tooling: Llama Guard, Prompt Guard, NeMo Guardrails, Guardrails AI Hub.
  - Red Teaming: Garak, PyRIT, Adversarial Prompt Library.
  - HITL: 3 mô hình (On/In/As), Durable Execution, Escalation patterns.
  - Responsible AI: Risk Taxonomy, EU AI Act, Luật AI VN 134/2025.
- [x] **Day 12 (28/09):** [[Day 12 - Deployment, Cloud & Agent Hosting]]
  - Localhost to Production: Containerization, Docker Compose.
  - Agent deployment challenges: Session management, Tool sandboxing, Streaming.
  - Cloud options: Self-hosted vs Managed vs Tier-0.
  - API Gateway & Security: Auth, Rate Limiting, mTLS.
  - MCP Server hosting: Embedded vs Remote patterns.
  - Scaling & Cost Management: Optimization strategies.
  - CI/CD & Eval Gates: Deployment pipeline, Rollback.
- [x] **Day 13 (29/09):** [[Day 13 - Monitoring, Logging & Observability]]
  - Observability vs. Monitoring: Known/Unknown unknowns.
  - 3 Pillars: Logs, Metrics, Traces với AI-specific examples.
  - Cardinality Management: Low vs High, explosion problems.
  - AI Metrics: Token/Latency/Quality/Agent metrics, SLOs.
  - Structured Logging: JSONL, Correlation IDs, Sampling.
  - Distributed Tracing: OpenTelemetry, AI-specific patterns.
  - SLO-based Alerting & Dashboard Design.
  - Tools Landscape 2026: Langfuse, Phoenix, Datadog, Grafana.

### Track II: Computer Vision & Robotics (đã thi xong)
- [x] **03/10 – 23/10:** [[Track II - CV & Robotics]]
  - Neural network và kiến trúc DL cho CV; 2D perception (detection, segmentation, keypoints).
  - Sensor và chuỗi frame; bộ lọc Kalman; 3D từ point cloud; tracking.
  - Data và annotation pipeline cho CV và Robotics.

---

## 3. Mạng lưới Tri thức & Note liên kết (Knowledge Network)

Mọi bài học và kỹ thuật đúc kết từ chương trình được tinh lọc và đưa vào hệ thống Zettelkasten của vault `διάνοια`:

### A. Khái niệm cốt lõi (`04 - Notes/Concepts/`)
* [[GraphRAG]] — Kiến trúc truy xuất đồ thị tri thức đa bước, khắc phục nhược điểm của Vector RAG.
* [[Human Boundary trong Hệ thống AI]] — Chốt chặn thẩm định của con người và cơ chế Fallback.
* [[Problem Statement cho AI]] — Khung cấu trúc 9 trường thông tin chuẩn hóa định vị bài toán.
* [[Prompt as Code]] — Kỷ luật kỹ thuật trong việc versioning và kiểm thử prompt bằng eval set.
* [[System Prompt Contract]] — Bản hợp đồng pháp lý kỹ thuật định hình hành vi và ranh giới mô hình.
* [[Context Engineering]] — Quản trị ngân sách ngữ cảnh theo 4 nguyên tắc Write, Select, Compress, Isolate.
* [[Tool Calling trong Hệ thống Agent]] — Vòng lặp kỹ thuật 4 bước kết nối lý luận xác suất với thực thi mã nguồn.
* [[AI MVP Canvas]] — Khung cấu trúc 10 ô tinh gọn thẩm định ý tưởng sản phẩm AI trên 1 trang giấy.
* [[The Validation Ladder]] — Thang đo thực nghiệm 5 nấc từ phỏng vấn đến pilot thực tế.
* [[AI Leverage Map]] — Ma trận 4 góc phần tư định vị đòn bẩy thực chất của AI.
* [[AI Feasibility Check]] — Radar chart 6 chiều kiểm soát rủi ro kỹ thuật và dung sai lỗi.
* [[Data Quality Pyramid]] — Kim tự tháp 4 tầng chuẩn hóa chất lượng dữ liệu AI.
* [[Chiến lược Chunking]] — 9 phương pháp phân mảnh văn bản tối ưu hóa cho RAG.
* [[Vector Store]] — Cơ sở dữ liệu vector và kiến trúc lưu trữ 4 trường bản ghi.
* [[Metadata Filtering]] — Kỹ thuật kết hợp lọc điều kiện nghiệp vụ với tìm kiếm ngữ nghĩa.
* [[Graph Knowledge Foundation]] — Quy trình bóc tách thực thể và quan hệ chuẩn bị cho GraphRAG.
* [[Modular RAG]] — Kiến trúc cắm ghép linh hoạt các module trong hệ thống truy xuất và sinh.
* [[Hybrid Search]] — Kỹ thuật kết hợp Dense Semantic Vector và Sparse Lexical BM25.
* [[Reciprocal Rank Fusion]] — Thuật toán hợp nhất kết quả tìm kiếm dựa trên thứ bậc nghịch đảo.
* [[Maximum Marginal Relevance]] — Thuật toán cân bằng giữa độ tương đồng và độ đa dạng thông tin trong context.
* [[Cross-Encoder Reranking]] — Kỹ thuật tái chấm điểm cặp câu hỏi - tài liệu bằng mô hình tương tác sâu.
* [[Context Injection]] — Phương pháp chuẩn hóa cấu trúc đóng gói tài liệu vào Prompt Context Window.
* [[Document Reordering]] — Chiến lược xếp đặt chunk ở hai đầu prompt để hóa giải hiện tượng Lost in the Middle.
* [[Agentic RAG]] — Hệ thống truy xuất tăng cường bổ sung vòng lặp suy luận và sử dụng công cụ.
* [[RAG Evaluation & CI/CD]] — Quy trình kiểm thử định lượng hệ thống RAG tự động qua pipeline tích hợp liên tục.
* [[Multi-Agent Architecture]] — Kiến trúc hệ thống đa tác tử phân rã chuyên môn hóa.
* [[Model Context Protocol]] — Chuẩn giao tiếp mở giữa Agent và Tools/Resources.
* [[Data Observability]] — Hệ thống giám sát dữ liệu toàn diện qua 5 trụ cột Freshness, Distribution, Volume, Schema, Lineage.
* [[ETL Orchestration]] — Điều phối quy trình dữ liệu tự động với đồ thị DAG và kiểm soát chất lượng.

### B. Mệnh đề tri thức nguyên tử (`04 - Notes/Atomic/`)
* [[Xác định ranh giới không làm quan trọng hơn việc làm khi định nghĩa bài toán AI]]
* [[Vector RAG thất bại trước tài liệu dài vì hiện tượng mất dấu ký hiệu đa trang]]
* [[Ưu tiên hạ cấp từ Agent xuống Workflow kết hợp Rule để giảm thiểu rủi ro vận hành]]
* [[Mô hình LLM không tự chạy code trong chu trình Tool Calling]]
* [[Thiết kế tool quanh hành động nghiệp vụ tối ưu hơn chia nhỏ micro-tools]]
* [[Negative constraints là chốt chặn quan trọng nhất để triệt tiêu ảo giác của LLM]]
* [[Circuit breaker là cơ chế bắt buộc để ngăn chặn vòng lặp vô tận trong Agent]]
* [[Người dùng không mua AI mà mua kết quả giải quyết vấn đề]]
* [[Persona càng hẹp thì quyết định cắt giảm tính năng sản phẩm càng sắc bén]]
* [[Problem gốc phản ánh cơ chế vận hành trong khi triệu chứng chỉ là biểu hiện bề mặt]]
* [[Xác định những gì không làm là chốt chặn quan trọng nhất để bảo vệ AI MVP]]
* [[Không bao giờ index dữ liệu thô rồi kỳ vọng retrieval tự động sửa chữa mọi vấn đề]]
* [[Chunking là quyết định thiết kế kiến trúc thay vì tham số mặc định]]
* [[Đổi Vector Store là việc dễ nhưng đổi Embedding Model bắt buộc phải re-index toàn bộ]]
* [[Embedding không tự tạo ra sự thật mà chỉ đo khoảng cách ngữ nghĩa trong không gian]]
* [[Retrieval xuất sắc là sự kết hợp giữa Metadata Filtering và Semantic Search]]
* [[Hybrid search kết hợp Dense và Sparse giải quyết nghịch lý từ khóa và ngữ nghĩa]]
* [[Cross-encoder reranking đánh đổi độ trễ để nâng cao độ chính xác sau retrieval]]
* [[MMR chống trùng lặp context bằng cách cân bằng giữa độ liên quan và độ phân kỳ]]
* [[Document reordering khắc phục hiện tượng lost in the middle bằng cách xếp chunk quan trọng ở hai đầu]]
* [[Vibe check không thể thay thế test set và evaluation có hệ thống trong RAG]]
* [[Thêm BM25 là cải tiến có chi phí rẻ nhất mang lại mức cải thiện recall lớn nhất]]
* [[Kiểm soát phân quyền trong RAG bắt buộc phải lọc trước khi retrieval thay vì lọc sau khi sinh]]
* [[Supervisor điều phối trạng thái thay vì trực tiếp thực thi tác vụ miền]]
* [[Chất lượng dữ liệu đầu vào quyết định trực tiếp giới hạn trên của hệ thống AI]]
* [[Trace log có cấu trúc là điều kiện tiên quyết để định vị lỗi trong hệ multi-agent]]
* [[Hệ thống Data Observability bảo vệ RAG bằng năm trụ cột giám sát toàn diện]]

### C. So sánh kiến trúc (`04 - Notes/Comparisons/`)
* [[So sánh Rule, Workflow và Agent trong kiến trúc hệ thống AI]]

---

## 4. Tài nguyên & Artifacts của Dự án

* **Slide thuyết trình:** `slides.html` (Standalone HTML Deck, điều hướng phím, responsive).
* **Báo cáo cá nhân Day 02:** `01-individual-problem-scan/individual-report.md`.
* **Báo cáo nhóm Day 02:** `02-group-problem-statement/group-report.md`.
* **Nhật ký phản biện cá nhân:** `03-individual-reflection/reflection.md`.

---

## 5. Việc cần làm tiếp theo (Next Actions)

- [ ] Hoàn thiện các Concept Note & Atomic Note từ nội dung Day 02 đưa vào `04 - Notes`.
- [ ] Chuẩn bị kịch bản chạy pilot thử nghiệm cho 3 paper đồ án (Transformer, DDPM, YOLOv8).
- [ ] Cập nhật kết quả khi bước sang các buổi học tiếp theo của bootcamp.
