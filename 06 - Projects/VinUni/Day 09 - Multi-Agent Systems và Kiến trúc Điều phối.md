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
  - day-09
  - multi-agent
  - supervisor-worker
  - mcp
  - model-context-protocol
  - langgraph
  - orchestration
  - observability
  - agent-to-agent
created: 2026-09-24
updated: 2026-09-24
aliases:
  - Day 09 - Multi-Agent Systems và Kiến trúc Điều phối
  - Multi-Agent Systems và Kiến trúc Điều phối
  - Kiến trúc Multi-Agent
  - AICB Ngày 9
  - AICB Buổi 9
---

# Day 09 — Multi-Agent Systems và Kiến Trúc Điều Phối

Bản tổng hợp có hệ thống toàn bộ phương pháp luận về **Hệ thống Đa Tác Tử (Multi-Agent Systems), Giới hạn của Single-Agent, Tư duy Hệ thống bài trừ God-Agent, Khảo sát Agent Harness thực tế (Claude Code, Codex, Antigravity, Cursor), 4 Pattern điều phối cốt lõi (Supervisor-Worker, Pipeline, Debate, Hierarchical), Quản trị State Schema và Immutable Trace Log, Chuẩn giao tiếp Model Context Protocol (MCP) và Agent-to-Agent (A2A) Message Contracts, Điều phối đồ thị trạng thái với LangGraph (Nodes, Edges, State, Human-in-the-Loop), Kỹ nghệ Observability & Debugging đa tác tử, và Đánh đổi Chi phí – Độ trễ – Độ tin cậy** trong chương trình **AI Thực chiến VinUni (Lớp K4A - Giảng viên: M.Sc Trần Minh Tú)**.

> [!TIP] **Tư Duy Kiến Trúc Chỉ Đạo**
> *"Kiến trúc Multi-Agent không phải là nỗ lực tạo ra một Agent thông minh hơn, mà là tư duy kỹ thuật phần mềm nhằm tổ chức một hệ thống rõ ràng gồm các Worker đơn nhiệm, phi trạng thái và dễ kiểm thử, được kết nối bằng các hợp đồng dữ liệu nghiêm ngặt và điều phối bởi đồ thị trạng thái tường minh."*

---

## 1. Giới Hạn Của Single-Agent & Động Lực Chuyển Dịch

Mô hình Single Agent (một agent duy nhất nhận lệnh, tự suy luận qua prompt hoặc ReAct loop và gọi tool) nhanh chóng chạm trần vật lý trong môi trường doanh nghiệp:

![[multi-agent-single-agent-limitations.png]]

### 1.1. Bốn Điểm Nghẽn Cốt Lõi
1. **Context Window Bottleneck:** Mở rộng context window lên 1M tokens không giải quyết được hiện tượng "Lost in the Middle". Khi nạp đồng thời nhiều tài liệu dài (hợp đồng 80 trang), lịch sử hội thoại và hàng chục tool schemas, mô hình bị loãng sự chú ý và suy thoái khả năng lý luận logic.
2. **Specialization Trade-off:** Một prompt duy nhất cố gắng đảm nhiệm mọi vai trò (vừa tra cứu luật, tính toán tài chính, viết code, format văn bản) sẽ trở nên nửa vời ở mọi tác vụ.
3. **Parallelism Hạn Chế:** Xử lý tuần tự từng bước làm tích lũy độ trễ. Khi cần thu thập thông tin từ 5 nguồn độc lập, thời gian phản hồi tăng tuyến tính theo số lượt gọi.
4. **Reliability Yếu:** Thiếu cơ chế khoanh vùng lỗi. Một bước trung gian suy luận lệch chuẩn sẽ dẫn đến sụp đổ dây chuyền (cascade failure) cho toàn bộ chuỗi phản hồi.

![[multi-agent-context-window-bottleneck.png]]

### 1.2. Checklist Thẩm Định Khi Nào Cần Multi-Agent

![[multi-agent-adoption-checklist.png]]

Chỉ chuyển sang Multi-Agent khi thỏa mãn các điều kiện thực tế:
* Bài toán có thể chia tách thành các vai trò chuyên môn hóa với công cụ và tri thức độc lập.
* Cần thực thi song song nhiều tác vụ độc lập để tối ưu hóa độ trễ (latency SLA).
* Quy trình nghiệp vụ đòi hỏi kiểm duyệt chéo hoặc tranh biện độc lập (Debate/Review).
* Cần khoanh vùng rủi ro: sự cố tại một module không được làm gián đoạn toàn bộ hệ thống.
* Đội ngũ kỹ thuật cần phát triển, kiểm thử và bảo trì từng kỹ năng độc lập.

---

## 2. Mental Model: Tư Duy Hệ Thống

![[multi-agent-mental-model-anti-god-agent.png]]

### 2.1. Bài Trừ Tư Tưởng "God Agent"
* Xây dựng một Agent khổng lồ ôm đồm mọi chức năng là phản mô thức (anti-pattern) lớn nhất trong kiến trúc tác tử.
* Hệ thống mạnh mẽ được xây dựng từ tập hợp các Worker nhỏ gọn, tuân thủ nguyên tắc đơn nhiệm (Single Responsibility Principle - SRP), sở hữu context sạch và bộ công cụ tối thiểu.

### 2.2. Ba Câu Hỏi Thiết Kế Cốt Lõi

![[multi-agent-system-design-questions.png]]

1. **Chia trách nhiệm:** Hệ thống gồm những vai trò nào? Ranh giới trách nhiệm của từng vai trò ở đâu?
2. **Luồng thông tin:** Dữ liệu truyền giữa các Agent dưới định dạng nào? Cơ chế điều phối là tập trung hay phân tán?
3. **Khoanh vùng lỗi:** Nếu một worker trả về rác hoặc thất bại, hệ thống cô lập lỗi ở đâu và có phương án fallback/retry nào?

### 2.3. Khảo Sát Agent Harness Thực Tế (Claude Code, Codex, Antigravity, Cursor)

![[multi-agent-harness-investigation-quest.png]]

![[multi-agent-top-tools-harness-analysis.png]]

| Thành phần thiết kế | Nguyên lý triển khai trong Harness thực tế |
| :--- | :--- |
| **Supervisor Role** | Nhận yêu cầu, phân tích intent, chia nhỏ tác vụ và điều phối các worker thực thi. |
| **Worker Definition** | Mỗi Worker/Subagent có persona ngắn gọn, context cô lập và bộ tool tối thiểu. |
| **Routing Signal** | Định tuyến dựa trên `description` rõ ràng của Worker hoặc hàm router điều kiện. |
| **Least Privilege** | Worker tra cứu mã nguồn chỉ có quyền read-only, tuyệt đối không cấp quyền bash hoặc ghi file. |
| **Context Isolation** | Mỗi Subagent chạy trên context riêng biệt; chỉ tổng hợp kết quả trả về Supervisor, không làm phình prompt chính. |
| **Resource Boundaries** | Giới hạn tài nguyên chặt chẽ (`max_threads=6`, `max_depth=1` hoặc `2`) để ngăn ngừa vòng lặp vô tận và bùng nổ token. |

---

## 3. Các Mô Hình Multi-Agent Phổ Biến (Patterns)

![[multi-agent-four-common-patterns.png]]

![[multi-agent-pattern-selection-guide.png]]

### 3.1. Supervisor-Worker Pattern
* **Cơ chế:** Supervisor trung tâm phân rã yêu cầu, định tuyến tới các Worker chuyên biệt, tổng hợp kết quả và trả về người dùng.
* **Tối ưu cho:** Trợ lý thông minh đa năng, tác vụ linh hoạt, có rẽ nhánh động và cần kiểm soát tập trung.

### 3.2. Pipeline Pattern (Tuần Tự)
* **Cơ chế:** Dữ liệu chảy một chiều qua các trạm xử lý cố định: `Input -> Parser -> Research -> Writer -> Review -> Output`.

![[multi-agent-pipeline-pattern-flow.png]]

* **Tối ưu cho:** Xử lý hồ sơ, sản xuất nội dung, chuyển đổi tài liệu nhiều bước có luồng nghiệp vụ cố định.

### 3.3. Debate Pattern (Tranh Biện)
* **Cơ chế:** Nhiều Agent mang góc nhìn đối lập cùng phân tích vấn đề, tranh luận qua lại; một Aggregator Agent tổng hợp kết luận tối ưu.

![[multi-agent-debate-pattern-flow.png]]

* **Tối ưu cho:** Thẩm định rủi ro, phân tích hợp đồng pháp lý, chẩn đoán y khoa, giảm thiểu bias và ảo giác.

### 3.4. Hierarchical Pattern (Phân Cấp)
* **Cơ chế:** Mô hình cây nhiều tầng (Top Supervisor -> Domain Supervisors -> Task Workers).
* **Tối ưu cho:** Hệ thống doanh nghiệp quy mô lớn, mô phỏng các phòng ban nghiệp vụ phức tạp.

---

## 4. Kiến Trúc Chi Tiết: Supervisor-Worker

![[multi-agent-supervisor-worker-architecture.png]]

### 4.1. Phân Định Trách Nhiệm Rạch Ròi

![[multi-agent-supervisor-worker-responsibilities.png]]

* **Supervisor (Decision Flow):** Đọc yêu cầu và trạng thái hệ thống; phân rã công việc; quyết định route tới worker nào; đánh giá khi nào đủ thông tin để kết thúc; không trực tiếp chạy tool nặng.
* **Worker (Domain Skills):** Nhận task cụ thể và context tối thiểu; sử dụng tool chuyên môn để xử lý; trả kết quả có cấu trúc về Supervisor; không can thiệp vào luồng điều phối lớn.

### 4.2. Tiêu Chuẩn Thiết Kế Worker & Anti-Patterns

![[multi-agent-worker-design-principles.png]]

* **Worker tốt:** Specialized (chuyên môn hóa sâu), Stateless ưu tiên (phi trạng thái, không ngầm lưu bộ nhớ giữa các lượt), Testable (có thể viết unit test độc lập).
* **4 Anti-Patterns cần tránh:**

![[multi-agent-anti-patterns-supervisor-worker.png]]

1. *God Supervisor:* Supervisor ôm đồm việc của worker.
2. *Implicit State:* Trao đổi dữ liệu qua biến toàn cục thay vì schema kiểm soát.
3. *Chatty Workers:* Các worker tự do gọi chéo nhau ngoài tầm kiểm soát của Supervisor.
4. *No Fallback:* Thiếu phương án xử lý khi worker trả về lỗi hoặc kết quả rỗng.

### 4.3. Quản Trị Trạng Thái: Shared State vs. Message Passing

![[multi-agent-shared-state-vs-message-passing.png]]

* **Shared State:** Một cấu trúc dữ liệu trung tâm (`State`) được truyền qua đồ thị; phù hợp cho LangGraph và hệ thống tập trung.
* **Message Passing:** Trao đổi gói tin qua Message Broker (Kafka/RabbitMQ); phù hợp cho hệ thống phân tán bất đồng bộ.

### 4.4. State Schema Chuẩn Hóa (`Day09State`)

![[multi-agent-minimal-state-schema.png]]

```python
from typing import TypedDict, List, Dict, Any, Optional

class Day09State(TypedDict):
    task: str                        # Yêu cầu gốc của người dùng
    plan: List[str]                  # Kế hoạch thực thi của Supervisor
    worker_results: Dict[str, Any]   # Dữ liệu trả về từ các Worker
    status: str                      # pending | in_progress | completed | failed
    final_answer: Optional[str]      # Phản hồi xuất ra cho người dùng
    trace: List[Dict[str, Any]]      # Lịch sử điều phối (LUÔN APPEND, KHÔNG OVERWRITE)
    error: Optional[str]             # Thông tin lỗi nếu có sự cố
```

### 4.5. Debrief Sửa Lỗi Supervisor Code

![[multi-agent-supervisor-code-bug-hunt.png]]

![[multi-agent-supervisor-code-fixes.png]]

* Tránh God Supervisor bằng cách tách logic search sang `retrieval_worker`.
* Bảo toàn trace log: luôn dùng `state["trace"] + [new_entry]`.
* Tách worker thành node độc lập và dùng `conditional_edges`.
* Bổ sung cơ chế validate kết quả trước khi cho phép chuyển bước.

---

## 5. Model Context Protocol (MCP)

### 5.1. Khái Niệm & Triết Lý Ổ Cắm USB Tiêu Chuẩn

![[mcp-before-and-after-problem-solution.png]]

![[mcp-core-concept-usb-analogy.png]]

* **MCP** là giao thức mở chuẩn hóa cách ứng dụng AI kết nối với dữ liệu và công cụ, loại bỏ sự phụ thuộc vào từng thư viện hay nền tảng riêng lẻ.

### 5.2. Kiến Trúc Host – Client – Server

![[mcp-client-server-architecture.png]]

![[mcp-server-tools-resources-prompts.png]]

* **MCP Host:** Ứng dụng điều phối trung tâm.
* **MCP Client:** Duy trì kết nối 1:1 qua STDIO hoặc SSE/HTTP.
* **MCP Server:** Tiến trình độc lập cung cấp 3 thành phần cốt lõi:
  * *Tools:* Hàm thực thi có side-effect (JSON Schema).
  * *Resources:* Ngữ cảnh tĩnh dạng tài liệu/file log (tương tự GET endpoint).
  * *Prompts:* Mẫu hướng dẫn nghiệp vụ chuẩn hóa phía server.

### 5.3. Quy Trình Khám Phá Công Cụ (Tool Discovery) & Kiến Trúc Tổng Thể

![[mcp-tool-discovery-execution-flow.png]]

![[mcp-customer-support-server-example.png]]

![[mcp-full-system-architecture-role.png]]

1. Client gửi `tools/list` để truy vấn danh sách tool tại runtime.
2. Server trả về schema định dạng tham số.
3. LLM chọn tool và sinh tham số JSON.
4. Client gửi `tools/call` yêu cầu Server thực thi mã thực tế.
5. Server trả kết quả về cho Client để tiếp tục chu trình suy luận.

---

## 6. Giao Tiếp Agent-to-Agent (A2A)

![[a2a-communication-message-contract-need.png]]

### 6.1. Hợp Đồng Thông Điệp (Message Contract)

![[a2a-message-contract-schema.png]]

* Giao tiếp giữa các Agent bắt buộc phải có schema rõ ràng: `task` (yêu cầu), `context` (ngữ cảnh nghiệp vụ cần thiết), `expected_output` (định dạng dữ liệu đầu ra mong đợi).

### 6.2. Nguyên Tắc "Need-to-Know" & Đồng Bộ vs Bất Đồng Bộ

![[a2a-context-budget-need-to-know.png]]

![[a2a-sync-vs-async-tradeoffs.png]]

* **Nguyên tắc "Need to know":** Worker chỉ nhận đủ ngữ cảnh cần thiết để làm việc. Thiếu context dẫn đến phỏng đoán sai; thừa context gây tốn token và chậm trễ.
* **Sync vs Async:** Bắt đầu với Synchronous để dễ kiểm soát và debug; mở rộng sang Asynchronous (`asyncio.gather` / message queue) khi cần tối ưu hóa độ trễ cho nhiều tác vụ độc lập.

### 6.3. An Ninh & Ranh Giới Tin Cậy (Trust Boundaries)

![[a2a-security-and-trust-boundaries.png]]

* Xác định rõ quyền hạn gọi giữa các agent; lọc bỏ PII trước khi truyền dữ liệu; luôn kiểm thực (validate) output của worker trước khi nạp vào state chung.

---

## 7. Điều Phối Trạng Thái Với LangGraph

![[langgraph-why-orchestration-framework.png]]

![[langgraph-core-role-and-capabilities.png]]

### 7.1. Cấu Trúc Đồ Thị: Nodes, Edges & State

![[langgraph-nodes-edges-and-state.png]]

* **Node:** Hàm Python xử lý logic, nhận State và trả về State cập nhật.
* **Edge:** Đường nối giữa các Node (Unconditional hoặc Conditional).
* **State:** Bộ nhớ TypedDict chia sẻ xuyên suốt đồ thị.

### 7.2. Định Tuyến Điều Kiện (Routing Logic) & Node Supervisor

![[langgraph-routing-diagram-flow.png]]

![[langgraph-routing-logic-code-example.png]]

![[langgraph-minimal-supervisor-node-code.png]]

```python
from typing import TypedDict, Literal

class AgentState(TypedDict):
    task: str
    need_retrieval: bool
    need_tool: bool
    worker_results: dict
    final_answer: str

def route_to_worker(state: AgentState) -> Literal["tool_worker", "retrieval_worker", "synthesis_worker"]:
    if state["need_tool"]:
        return "tool_worker"
    if state["need_retrieval"]:
        return "retrieval_worker"
    return "synthesis_worker"
```

### 7.3. Tích Hợp Human-in-the-Loop (HITL)

![[langgraph-human-in-the-loop-integration.png]]

* Kích hoạt tại các điểm có rủi ro cao (chuyển tiền, xóa dữ liệu, gửi email hàng loạt).
* Node `human_review` tạm dừng đồ thị thông qua cơ chế `interrupt`, lưu trạng thái xuống persistence và chờ con người phê duyệt trước khi tiếp tục.

---

## 8. Observability & Debugging Đa Tác Tử

![[multi-agent-observability-debugging-challenges.png]]

### 8.1. Thiết Kế Trace Log Chuẩn

![[multi-agent-trace-log-schema-design.png]]

![[multi-agent-trace-log-essential-fields.png]]

* Mỗi dòng log bắt buộc phải ghi nhận: timestamp, agent_id, action, input_summary, output_summary, status (`ok`, `warn`, `error`), và latency_ms.
* Trace log giúp nhìn thấy **đường đi của các quyết định** thay vì chỉ biết agent đã chạy xong.

### 8.2. Công Cụ & Chu Trình Cải Thiện

![[multi-agent-observability-tools-comparison.png]]

![[multi-agent-trace-driven-improvement-loop.png]]

* Khởi đầu với JSON log tự ghi vào State để nắm bản chất; nâng cấp lên LangSmith hoặc OpenTelemetry khi triển khai quy mô lớn.
* Chu trình: Chạy hệ thống $\rightarrow$ Đọc trace $\rightarrow$ Tìm lỗi $\rightarrow$ Sửa prompt/route/schema $\rightarrow$ Đánh giá lại.

### 8.3. Debrief: Bẫy "Lỗi Im Lặng" Nguy Hiểm Nhất

![[multi-agent-trace-debug-quest-silent-failure.png]]

![[multi-agent-trace-debug-quest-debrief.png]]

* Khi `retrieval_worker` tìm kiếm ra 0 chunks nhưng vẫn ghi `status: ok` (do API không crash), Supervisor ngây thơ chuyển tiếp sang `synthesis_worker`, dẫn đến việc mô hình tự bịa đặt câu trả lời (hallucination).
* **Bài học cốt lõi:** `status: ok` chỉ có nghĩa là không văng exception kỹ thuật, không đồng nghĩa dữ liệu sử dụng được. Bắt buộc phải kiểm tra số lượng chunk và gán `status: warn` khi kết quả rỗng.

---

## 9. Tối Ưu Chi Phí, Độ Trễ & Bảng So Sánh Tổng Kết

![[multi-agent-cost-factors-and-optimization.png]]

![[single-agent-vs-multi-agent-comparison-table.png]]

* Supervisor không nhất thiết phải là mô hình lớn nhất; sử dụng mô hình nhỏ và nhanh cho tầng routing logic, dành mô hình lớn cho các worker cần reasoning sâu.
* So sánh tổng kết: Single-Agent rẻ hơn, nhanh hơn cho bài toán đơn giản; Multi-Agent vượt trội hoàn toàn về khả năng chuyên môn hóa, tính minh bạch khi debug và khả năng mở rộng trong môi trường enterprise.

---

## Tài Liệu Tham Khảo & Liên Kết Vault

* [[VinUni - Chương trình Đào tạo AI Thực chiến]] — Chương trình đào tạo tổng thể.
* [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]] — Kỹ nghệ RAG nâng cao và Evaluation.
* [[Day 10 - Data Pipeline Observability và Quản trị ETL]] — Quản trị luồng dữ liệu và Data Observability.
* [[Multi-Agent Architecture]] — Khái niệm kiến trúc đa tác tử.
* [[Model Context Protocol]] — Chuẩn giao tiếp công cụ mở.
