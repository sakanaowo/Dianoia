# VinUni — Chương trình Đào tạo AI Thực chiến

Thư mục quản lý toàn bộ tiến trình học tập, dự án lab, tài liệu và các sản phẩm nghiên cứu trong **Chương trình Đào tạo AI Thực chiến tại VinUni (Lớp K4A)**.

---

## Vai trò của thư mục

* **Điều phối & Quản lý tiến trình:** Lưu trữ lộ trình các buổi học (Day 01, Day 02, ...), tiến độ bài tập lớn/đồ án và các phiên làm việc nhóm.
* **Giao thoa giữa Lý thuyết & Thực chiến:** Nơi chuyển hóa các bài thực hành lab thành tri thức bền vững đưa vào `04 - Notes` và sản phẩm hoàn chỉnh đưa vào `07 - Outputs`.

---

## Điều hướng nhanh

* **Hub trung tâm:** [[VinUni - Chương trình Đào tạo AI Thực chiến]]
* **Các buổi học / Lab Sessions:**
  * [[Day 02 - Tìm đúng bài toán cho AI]] — Problem framing, ma trận Rule/Workflow/Agent, GraphRAG pipeline.
  * [[Day 03 - Thiết kế Workflow và Kiểm soát Hệ thống AI]] — Khám phá HCD, 3 pattern workflow, mức tự chủ, precision/recall và production readiness.
  * [[Day 04 - Prompt Engineering và Tool Calling]] — Prompt as Code, System Prompt Contract, 4 nguyên tắc Context Engineering, chu trình Tool Calling 4 bước.
  * [[Workshop - Xây dựng AI MVP]] — Khung AI MVP Canvas 10 ô, The Validation Ladder 5 nấc, và Ma trận AI Leverage Map.
### Giai đoạn 5: Hệ Thống Đa Tác Tử, Quản Trị Pipeline & Quan Sát Dữ Liệu (tiếp)
- [x] **Day 11 (26/09):** [[Day 11 - Guardrails, Safety & HITL]]
  - AI Safety Landscape: Hallucination, Prompt Injection, Jailbreak, Bias, Over-autonomy.
  - Defense in Depth: 3 tầng phòng thủ (Input Rails, LLM Rails, Output Rails).
  - Prompt Injection Defenses 2026: Spotlighting, Instruction Hierarchy, CaMeL, Design Patterns.
  - Guardrail Tooling: Llama Guard, Prompt Guard, NeMo Guardrails, Guardrails AI Hub.
  - Red Teaming & Safety Testing: Garak, PyRIT, Adversarial Prompt Library.
  - Human-in-the-Loop: 3 mô hình (On/In/As), Durable Execution, Escalation patterns.
  - Responsible AI: Risk Taxonomy, EU AI Act, Luật AI Việt Nam 134/2025.
  - Trust & Transparency UX: Reasoning Traces, Confidence Calibration, Undo/Redo.
- [x] **Day 12 (28/09):** [[Day 12 - Deployment, Cloud & Agent Hosting]]
  - Localhost to Production pipeline: Containerization, Environment configuration.
  - Docker & Docker Compose cho multi-agent systems.
  - Agent deployment challenges: Session management, Tool execution sandboxing, Streaming.
  - Cloud options: Self-hosted vs Managed vs Tier-0 runtimes.
  - API Gateway & Security: Authentication, Rate limiting, mTLS.
  - MCP Server hosting: Embedded vs Remote patterns.
  - Scaling & Cost management: Horizontal/Vertical, Cost optimization strategies.
  - CI/CD & Eval Gates: Deployment pipeline, Rollback strategies.
- [x] **Day 13 (29/09):** [[Day 13 - Monitoring, Logging & Observability]]
  - Observability vs. Monitoring: Known/Unknown unknowns framework.
  - 3 Pillars: Logs, Metrics, Traces với AI-specific examples.
  - Cardinality Management: Low vs High cardinality, explosion problems.
  - AI Metrics Deep Dive: Token/Latency/Quality/Agent metrics, SLOs.
  - Structured Logging: JSONL format, Correlation IDs, Sampling strategies.
  - Distributed Tracing: OpenTelemetry integration, AI-specific patterns.
  - SLO-based Alerting & Dashboard Design.
  - Tools Landscape 2026: Langfuse, Phoenix, Datadog, Grafana stack.

### Giai đoạn 6: Hoạt Động Thực Hành (Không có notes)
- [ ] **Day 05 (15/09):** AI Product Management & PRD v2 (Workshop)
- [ ] **Day 06 (16-18/09):** Hackathon 3 ngày (Hoạt động thực tế bên ngoài)

### Dự án Đề tài Khóa học (Capstone Workspaces):
  * [[EDU-02 - Trợ lý Giảng dạy AI|EDU-02 — Trợ lý giảng dạy AI tổng hợp vướng mắc lớp học realtime]] (Đề tài ứng viên Khối Giáo dục).
