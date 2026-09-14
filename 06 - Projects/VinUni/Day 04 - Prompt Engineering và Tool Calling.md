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
  - day-04
  - prompt-engineering
  - tool-calling
  - context-engineering
  - agent-loop
  - system-design
created: 2026-09-13
updated: 2026-09-13
aliases:
  - Day 04 - Prompt Engineering và Tool Calling
  - Day 04 VinUni
  - Prompt Engineering and Tool Calling
---

# Day 04 — Kỹ Nghệ Prompt, Quản Trị Context & Kiến Trúc Tool Calling

Bản tổng hợp hệ thống kiến thức cốt lõi về **Prompt as Code, System Prompt Contract, Context Engineering (4 nguyên tắc Lance Martin), Kiến trúc Vòng lặp Tool Calling 4 bước, Xử trị Lỗi & Phòng ngừa Vòng lặp Vô tận** trong chương trình **AI Thực chiến VinUni (Lớp K4A)**.

> [!TIP] **Tư duy Hệ thống Chỉ đạo**
> *"Prompt không phải là thứ để viết cho hay, mà là giao diện kỹ thuật để định hình hành vi mô hình nhằm đạt được tính tất định (determinism). Tool Calling không phải là việc LLM tự chạy code, mà là vòng lặp bắt tay (technical handshake) giữa khả năng suy luận của mô hình và runtime của ứng dụng. Mọi hệ thống Agent thực chiến đều sống sót nhờ khả năng xử lý lỗi, kiểm soát ranh giới và phòng vệ vòng lặp vô tận."*

---

## 1. Kỹ Nghệ Prompt: Từ Văn Phong Sang Kỷ Luật Kỹ Thuật (Prompt as Code)

```text
[Ý định Con người] ──(Interface: Prompt)──> [Mô hình LLM] ──> [Hành vi Ổn định / Determinism]
      │                                                               ▲
      └─── Kiểm soát: Task + Format + Constraints + Evals ────────────┘
```

* **1.1. Bản chất của Prompt:**
  * Prompt không phải là sáng tác văn chương hay phép thuật thần bí. Prompt là **giao diện lập trình (interface)** giữa ý định của con người và năng lực tính toán xác suất của mô hình.
  * Mục tiêu tối thượng của Prompt Engineering trong môi trường sản xuất là **tính tất định (determinism)**: cùng một dạng bài toán phải cho ra hành vi và định dạng đầu ra ổn định.
* **1.2. 4 Thành phần cốt lõi của một Prompt chuẩn:**
  1. **Task (Nhiệm vụ):** Yêu cầu cụ thể, rõ ràng và có thể đo lường được về hành động cần thực hiện.
  2. **Format (Định dạng đầu ra):** Quy cách dữ liệu đầu ra (JSON, Markdown, cấu trúc thẻ, schema).
  3. **Context (Bối cảnh):** Thông tin nghiệp vụ bổ trợ giúp mô hình hiểu tình huống cụ thể.
  4. **Role (Vai trò / Persona):** Định vị góc nhìn chuyên môn và tông giọng của mô hình.
  * *Quy tắc thực nghiệm:* Luôn bắt đầu và đầu tư kỹ nhất vào **Task** và **Format**. Chỉ bổ sung **Role** và **Context** khi thực sự cần thiết để tránh làm loãng sự chú ý.
* **1.3. Nguyên tắc vàng: "Specificity beats Cleverness":**
  * Sự cụ thể, chính xác luôn đánh bại các chỉ dẫn dài dòng hay mẹo vặt lắt léo.
  * Prompt ngắn gọn, phân tách ranh giới rõ ràng luôn cho độ tin cậy cao hơn và ít bị ảo giác hơn prompt phức tạp.
* **1.4. Quản lý ngân sách Token:**
  * Mỗi token nạp vào prompt đều phát sinh chi phí, làm tăng độ trễ (latency) và tăng nguy cơ gây nhiễu cơ chế Attention.
  * Tối ưu prompt là tối ưu tỷ lệ tín hiệu trên nhiễu (Signal-to-Noise Ratio).
* **1.5. Vận hành theo tinh thần "Prompt as Code":**
  * Tuyệt đối không tinh chỉnh prompt theo cảm giác "thấy đọc thuận tai hơn".
  * Mọi thay đổi prompt phải được đối xử như mã nguồn:
    * Có **Versioning** (v1.0, v1.1...).
    * Có **Change Log** ghi rõ: *Sửa lỗi gì, trường hợp nào pass, trường hợp nào có nguy cơ bị thoái lui (regression)?*
    * Được đo lường bằng **Tiny Eval Set** (bộ kiểm thử định lượng tối thiểu 5–20 mẫu test có nhãn ground-truth).

---

## 2. Kỹ Thuật Prompt Nâng Cao & Giới Hạn của Suy Luận (Reasoning)

### 2.1. In-Context Learning: Zero-shot vs. Few-shot
* **Zero-shot:** Mô hình chỉ nhận chỉ dẫn mà không có ví dụ minh họa. Phù hợp cho các tác vụ chuẩn tắc, phổ quát mà mô hình đã được pre-train tốt.
* **Few-shot (Học theo mẫu trong ngữ cảnh):**
  * *Bản chất:* Few-shot **không dạy kiến thức mới** cho LLM. Nó đóng vai trò **định hình pattern hành vi** và chuẩn hóa cấu trúc đầu ra mà bạn muốn mô hình bắt chước.
  * *Khi nào dùng:*
    * Dùng **One-shot** khi mô hình hiểu bài toán nhưng hay trả về sai định dạng.
    * Dùng **Few-shot (3–5 mẫu)** khi mô hình gặp khó khăn với các trường hợp ngoại lệ (edge cases), dữ liệu miền hẹp, hoặc cần học cách phân loại đa nhãn phức tạp.

### 2.2. Chiến lược Suy luận (Reasoning): CoT và ToT
* **Chain-of-Thought (CoT - Chuỗi suy luận từng bước):**
  * Hướng dẫn mô hình "suy nghĩ từng bước" trước khi đưa ra kết luận cuối cùng.
  * *Ranh giới thực tế:* CoT không phải chiếc đũa thần. Đối với các câu hỏi tra cứu dữ liệu đơn giản hoặc trích xuất thông tin, CoT gây lãng phí token và làm tăng độ trễ vô ích. Chỉ kích hoạt CoT khi bài toán đòi hỏi suy luận logic nhiều bước, tính toán toán học, hoặc cần kiểm tra chuỗi bằng chứng.
* **Tree-of-Thought (ToT - Cây suy luận nhiều nhánh):**
  * Mô hình sinh ra nhiều nhánh giả thuyết, đánh giá từng nhánh và quay lui (backtrack) nếu gặp ngõ cụt.
  * Phù hợp cho các bài toán tối ưu hóa, lập kế hoạch chiến lược hoặc giải quyết bài toán phức tạp đòi hỏi khám phá không gian giải pháp.

### 2.3. Cấu trúc hóa Prompt (Structural Delimiters)
* Sử dụng các thẻ XML (`<instructions>`, `<context>`, `<rules>`, `<query>`) để đóng gói các khối dữ liệu.
* *Lợi ích:* Giúp cơ chế Attention của mô hình phân biệt ranh giới rõ ràng giữa **Lệnh điều khiển (Instructions)** và **Dữ liệu thô (Payload)**.
* *Lưu ý an ninh:* Delimiters là ranh giới mềm giúp giảm thiểu **Context Bleed** (dữ liệu rò rỉ làm ảnh hưởng suy luận), nhưng **không phải là bức tường bảo mật tuyệt đối** trước các đòn tấn công Indirect Prompt Injection tinh vi.

---

## 3. Kỹ Nghệ System Prompt: Bản Hợp Đồng Hành Vi (System Prompt Contract)

System Prompt không phải là đoạn mô tả chung chung, mà là **bản hợp đồng pháp lý kỹ thuật** ràng buộc toàn bộ hành vi của mô hình trong suốt phiên làm việc.

```text
┌─────────────────────────────────────────────────────────────┐
│                   SYSTEM PROMPT CONTRACT                    │
├─────────────────────────────────────────────────────────────┤
│ 1. PERSONA          : Vai trò, chuyên môn, giọng văn        │
│ 2. CORE DIRECTIVES  : Quy tắc bất biến (MUST, NEVER, ALWAYS)│
│ 3. CAPABILITIES     : Danh mục Tools & Quyền hạn            │
│ 4. NEGATIVE RULES   : Quyền từ chối ("Tôi không biết")      │
│ 5. OUTPUT CONTRACT  : Schema đầu ra chuẩn hóa (JSON/MD)     │
└─────────────────────────────────────────────────────────────┘
```

### 3.1. 4 Khối cấu trúc chuẩn của System Prompt
1. **Persona (Định hình danh tính):**
   * Xác định AI là ai, phục vụ ai, mức độ hiểu biết chuyên môn, và tông giọng ứng xử (trung lập, ngắn gọn, chuyên nghiệp).
2. **Core Directives (Mệnh lệnh cốt lõi bất biến):**
   * Sử dụng các từ khóa mạnh (`MUST`, `NEVER`, `ALWAYS`) để thiết lập các nguyên tắc không thể thương lượng.
   * Ví dụ: *"MUST verify customer ID before performing any lookup"*, *"NEVER expose internal database credentials"*.
3. **Capabilities & Orchestration (Khả năng tương tác):**
   * Cung cấp ngữ cảnh về các công cụ mà hệ thống được phép dùng, hướng dẫn rõ ràng khi nào thì dùng tool và khi nào trả lời trực tiếp.
4. **Output Contract (Ràng buộc kết quả):**
   * Quy định cấu trúc JSON hoặc Markdown bắt buộc. Mọi downstream service đều phụ thuộc vào tính ổn định của contract này.

### 3.2. Thứ bậc Quyền lực (Hierarchy of Authority)
* Trong kiến trúc mô hình hiện đại, System Prompt có thứ bậc ưu tiên cao hơn User Prompt:
  $$\text{System Prompt} \succ \text{User Prompt} \succ \text{Tool Output Context}$$
* Đây là tuyến phòng thủ then chốt để chống lại các kỹ thuật Jailbreak hoặc User Override.

### 3.3. 3 Sai lầm chết người khi viết System Prompt
1. **Mâu thuẫn nội tại (Contradictions):** Yêu cầu mô hình vừa "trả lời cực kỳ chi tiết" vừa "ngắn gọn súc tích trong 2 câu". Mọi mâu thuẫn đều làm suy giảm khả năng reasoning.
2. **Lịch sự thừa thãi (Excessive Politeness):** Dùng các câu từ hoa mỹ, xin xỏ mô hình (*"Please kindly make sure that..."*) làm lãng phí token và làm mềm đi tính bắt buộc của mệnh lệnh.
3. **Nhiễu song ngữ (Bilingual Interference):** Viết System Prompt bằng tiếng Anh nhưng ép trả lời tiếng Việt với logic nửa vời, hoặc trộn lẫn các thuật ngữ không đồng nhất.

### 3.4. Quyền được nói "Tôi không biết" (Negative Constraints)
* Mô hình mặc định có xu hướng chiều lòng người dùng (*Sycophancy*) và cố gắng bịa ra câu trả lời khi thiếu thông tin.
* Thiết lập **Negative Constraints** rõ ràng:
  > *"Nếu dữ liệu trong context không chứa thông tin để trả lời, bạn PHẢI nói 'Tôi không tìm thấy thông tin này trong hệ thống' và TUYỆT ĐỐI KHÔNG được tự suy diễn."*
* Đây là biện pháp hiệu quả nhất để triệt tiêu Hallucination ngay tại tầng prompt.

---

## 4. Context Engineering: Quản Trị Ngữ Cảnh & Lance Martin Principles

Ngữ cảnh (Context Window) là tài nguyên có hạn, tốn kém và dễ bị ô nhiễm. Nạp thêm ngữ cảnh không đồng nghĩa với câu trả lời tốt hơn.

### 4.1. 4 Nguyên tắc cốt lõi của Lance Martin (Anthropic/LangChain)
| Nguyên tắc | Bản chất kỹ thuật | Hành động cụ thể |
|---|---|---|
| **1. Write** *(Ghi nhớ ngoài)* | Tách biệt bộ nhớ khỏi context window | Lưu trạng thái, session history và intermediate logs vào Database/Scratchpad ngoài. |
| **2. Select** *(Lọc chọn lọc)* | Chỉ nạp thông tin cần cho subtask hiện tại | Áp dụng Relevance Filtering, Dynamic Tool Pruning; không nạp toàn bộ 50 tool vào 1 prompt. |
| **3. Compress** *(Nén ngữ cảnh)* | Rút gọn dữ liệu nhưng giữ nguyên thực thể cốt lõi | Conversation Compaction: tóm tắt lịch sử cũ khi token tăng cao, giữ nguyên facts & constraints. |
| **4. Isolate** *(Cô lập ranh giới)* | Ngăn ngừa Context Bleed & Prompt Injection | Phân tách ranh giới bằng thẻ XML (`<context>`, `<user_query>`) và thiết lập sandbox thực thi. |

### 4.2. Hiện tượng "Lost in the Middle" & Thứ bậc chú ý
* **Attention Primacy & Recency:** LLM chú ý tốt nhất ở phần đầu prompt (Primacy effect) và phần đuôi prompt (Recency bias).
* Các thông tin nằm ở giữa context dài thường bị suy giảm trọng số chú ý (*Attention Dilution*).
* **Quy tắc bố trí:**
  * Đầu prompt: System Prompt, Persona, Core Directives.
  * Giữa prompt: Dữ liệu tham khảo, tài liệu RAG, Tool results.
  * Cuối prompt: Nhiệm vụ cụ thể của user, các ràng buộc cấm (Negative constraints) và Output format.

### 4.3. Tối ưu hóa chi phí với Prompt Caching (Anthropic Cache)
* Cache các khối prompt tĩnh có kích thước lớn: System Prompt, Danh mục Tool Schemas, Hướng dẫn nghiệp vụ nội bộ.
* Giúp **giảm tới 90% chi phí token đầu vào** và **giảm 80% độ trễ (latency)** trong các vòng lặp Agent đa bước.

---

## 5. Kiến Trúc Vòng Lặp Tool Calling (The Technical Handshake)

```text
┌─────────────────┐       1. Query        ┌─────────────────┐
│                 │ ────────────────────> │                 │
│                 │   2. tool_calls JSON  │                 │
│                 │ <──────────────────── │   Mô hình LLM   │
│   Agent Runtime │                       │ (Reasoner only) │
│    (Python App) │   4. role: "tool"     │                 │
│                 │ ────────────────────> │                 │
│                 │   5. Final Answer     │                 │
│                 │ <──────────────────── │                 │
└────────┬────────┘                       └─────────────────┘
         │ 3. Execute
         ▼
┌─────────────────┐
│ Local Functions │
│ APIs / Database │
└─────────────────┘
```

* **5.1. Nguyên lý cốt lõi:**
  * LLM **không bao giờ tự thực thi mã nguồn**. Nó chỉ đóng vai trò là "bộ não lập luận" sinh ra bản thiết kế thực thi dưới dạng cấu trúc JSON (`tool_calls`).
  * Hệ thống runtime của ứng dụng (Python/Node.js) mới là nơi thực thi code, kết nối mạng, đọc cơ sở dữ liệu và bảo đảm an toàn.
* **5.2. Chu trình Handshake 4 bước:**
  1. **Model Request:** Dựa trên yêu cầu của user, model nhận diện thấy thiếu dữ liệu và phản hồi `tool_calls` gồm ID, tên hàm (`name`), và tham số (`arguments`).
  2. **Runtime Execute:** Hệ thống bắt được yêu cầu, parse JSON arguments, gọi hàm cục bộ hoặc API tương ứng.
  3. **Provide Observation:** Kết quả từ hàm được đóng gói thành một message mới với `role: "tool"` kèm `tool_call_id` gửi ngược lại cho model.
  4. **Synthesize:** Model tiếp nhận observation này để tổng hợp câu trả lời cuối cùng cho người dùng.
* **5.3. Phân loại Tool (Tool Taxonomy):**
  * **Knowledge Tool (Chỉ đọc):** Tra cứu thời tiết, tìm kiếm văn bản RAG, kiểm tra trạng thái đơn hàng. Rủi ro: dữ liệu cũ, cache stale.
  * **Capability Tool (Tính toán/Chuyển đổi):** Máy tính, parse file PDF, convert định dạng dữ liệu, chạy code sandbox.
  * **Write Action (Thay đổi trạng thái thật):** Gửi email, trừ tiền ví điện tử, hủy đơn hàng, ghi cơ sở dữ liệu. **Rủi ro cực cao:** bắt buộc phải có Approval Gate (Human-in-the-loop) và Logging chi tiết.
* **5.4. Thiết kế JSON Schema chặt chẽ:**
  * Khai báo đầy đủ: `name`, `description`, `type`, `properties`, `required`, `enum`.
  * `description` chính là **prompt hướng dẫn model**: Cần chỉ rõ tool làm gì, khi nào nên gọi, và khi nào KHÔNG ĐƯỢC gọi.
* **5.5. Xử lý Dữ liệu Không Tin cậy (Untrusted Context):**
  * Dữ liệu trả về từ tool bên ngoài có thể chứa mã độc, lỗi cú pháp hoặc câu lệnh tấn công ngầm.
  * Cần một lớp **Result Processor** để sanitize, cắt tỉa và đóng gói dữ liệu an toàn trước khi nạp lại vào context của model.

---

## 6. Quản Trị Lỗi & Phòng Ngừa Vòng Lặp Vô Tận (Resilience & Loop Prevention)

### 6.1. 3 Nhóm lỗi Tool phổ biến
1. **Schema Validation Error:** Model sinh tham số sai kiểu dữ liệu (truyền chuỗi `"abc"` vào trường `int`), thiếu trường trong mảng `required`, hoặc chọn giá trị ngoài `enum`.
2. **Infrastructure / Network Error:** HTTP 429 (Rate limit), HTTP 500/503 (Server die), Timeout, Database connection drop.
3. **Business Logic / Domain Error:** Hàm chạy bình thường nhưng dữ liệu không thỏa mãn nghiệp vụ (`order_id` không tồn tại, số dư tài khoản không đủ, trạng thái không hợp lệ để hủy).

### 6.2. Cơ chế Hồi phục Lỗi (Self-Correction Loop)
* **Quy tắc Fail-Safe:** Luôn bọc toàn bộ khối thực thi tool trong `try...except Exception as e`. Tuyệt đối không để ứng dụng crash.
* **Error as Observation:** Chuyển đổi ngoại lệ thành observation có cấu trúc rõ ràng:
  ```json
  {
    "status": "error",
    "error_type": "NOT_FOUND",
    "message": "Không tìm thấy đơn hàng mã ORD-999. Vui lòng kiểm tra lại định dạng mã đơn hàng."
  }
  ```
* LLM tiếp nhận thông báo lỗi này, nhận thức được nguyên nhân thất bại và tự động sửa đổi tham số để gọi lại tool hoặc giải thích trung thực cho người dùng.

### 6.3. Phòng chống Vòng lặp Vô tận (Infinite Loop Breakers)
* **Max Iteration Cap (Circuit Breaker):** Giới hạn cứng số vòng lặp tối đa cho một phiên xử lý của Agent (ví dụ: `max_turns = 5`). Tuyệt đối cấm dùng `while True` không có điều kiện dừng.
* **Retry Budget per Tool:** Giới hạn tối đa 1–2 lần thử lại cho cùng một lỗi. Nếu quá số lần cho phép, buộc agent dừng lại và trả về thông báo lịch sự.
* **Exponential Backoff:** Áp dụng thời gian chờ tăng dần đối với các lỗi hạ tầng (HTTP 429, timeout) trước khi gọi lại API.
* **Graceful Degradation:** Khi tool fail hoàn toàn, hạ cấp dịch vụ: trả về thông tin đã có một phần hoặc chuyển giao yêu cầu cho nhân viên hỗ trợ (Human Escalation).

---

## 7. 4 Nguyên Tắc Vàng Trong Thiết Kế Tool

```text
┌─────────────────────────────────────────────────────────────┐
│                 4 TOOL DESIGN GOLD STANDARDS                │
├─────────────────────────────────────────────────────────────┤
│ 1. SINGLE RESPONSIBILITY : Mỗi tool chỉ giải quyết 1 việc   │
│ 2. IDEMPOTENCY           : An toàn khi retry / Idempotency Key│
│ 3. APPROPRIATE GRANULARITY: Xoay quanh Business Action      │
│ 4. INDEPENDENT TESTABILITY: Unit test độc lập trước prompt  │
└─────────────────────────────────────────────────────────────┘
```

1. **Single Responsibility (Đơn nhiệm):**
   * Mỗi tool chỉ giải quyết một bài toán nghiệp vụ duy nhất.
   * *Anti-pattern:* Viết một hàm lai `lookup_and_update_customer` vừa đọc vừa ghi dữ liệu.
2. **Idempotency (Tính bất biến / An toàn khi gọi lại):**
   * Việc gọi lại tool nhiều lần với cùng input không làm thay đổi trạng thái ngoài mong muốn.
   * Với Read Tools: Mặc định là an toàn.
   * Với Write Tools: Phải triển khai cơ chế **Idempotency Key** để nếu Agent gọi lại do timeout, hệ thống backend không tạo 2 đơn hàng hay trừ tiền 2 lần.
3. **Granularity hợp lý (Độ mịn của công cụ):**
   * **Bẫy Micro-tools (Quá nhỏ):** Tách rời `get_first_name`, `get_last_name`, `get_phone`, `get_address`. Agent phải gọi 4 lượt liên tiếp, tốn token, độ trễ tăng vọt, nguy cơ lạc luồng cao.
   * **Bẫy God-tools (Quá to):** Gom mọi tính năng vào hàm `manage_customer_lifecycle(action, ... 25 params)`. Schema quá phức tạp, LLM dễ điền nhầm tham số, khó kiểm soát rào chắn.
   * **Điểm ngọt (Sweet Spot):** Thiết kế tool bám sát **Hành động Nghiệp vụ (Business Action)**: `lookup_customer_profile`, `cancel_order_by_id`.
4. **Test độc lập (Independent Testability):**
   * Từng tool phải có bộ Unit Test độc lập với LLM.
   * Phải phân định rạch ròi: *"Tool bị bug logic nội bộ"* khác hoàn toàn với *"LLM sinh sai tham số cho tool"*.

---

## 8. Thực Thi Song Song & Các Mẫu Thiết Kế Đồng Thời (Parallel Tool Calls)

* **8.1. Cơ chế Concurrency:**
  * Khi người dùng hỏi một câu hỏi đa nhiệm (ví dụ: *"Thời tiết hôm nay ở Hà Nội và TP.HCM thế nào?"*), mô hình hiện đại có khả năng sinh ra nhiều `tool_calls` trong cùng một generation turn.
  * Backend tận dụng `asyncio.gather(*tasks)` trong Python để bắn đồng thời các request.
  * Tổng thời gian phản hồi giảm từ $\sum T_i$ (tuần tự) xuống chỉ còn $\max(T_i)$ (song song).
* **8.2. Pattern Fan-out / Fan-in (Scatter-Gather):**
  * Phân tán ($N$ request đồng thời tới các nguồn dữ liệu độc lập) $\rightarrow$ Thu thập đủ $N$ kết quả Observation $\rightarrow$ Gửi đồng loạt về cho LLM để tổng hợp báo cáo.
* **8.3. Ma trận Quyết định: Tuần tự vs. Song song:**
  * **Data Dependency:** Nếu Tool B cần Output của Tool A làm đầu vào $\rightarrow$ Bắt buộc chạy Tuần tự (Chained Calls).
  * **Data Independence:** Nếu Tool A và Tool B không phụ thuộc nhau $\rightarrow$ Luôn ưu tiên chạy Song song (Parallel Calls).
* **8.4. Quản trị Rủi ro Concurrency:**
  * **Rate Limits:** Chạy song song 10 tool calls có thể làm sập rate limit quota của API bên thứ ba. Cần giới hạn bằng Semaphore.
  * **Race Condition trên Trạng thái Chung:** Tuyệt đối cấm chạy song song 2 Write Actions cùng tác động lên một bản ghi dữ liệu.
  * **Cấu hình API:** Có thể chủ động tắt tính năng này nếu backend không hỗ trợ: `parallel_tool_calls: false`.

---

## 9. Lab Thực Chiến: Agent Script Chuẩn Mực & Bộ 5 Test Cases

### 9.1. Mã nguồn Minh họa Vòng lặp Agent An toàn (Python)

```python
import json
import asyncio
from typing import List, Dict, Any

# 1. System Prompt Contract
SYSTEM_PROMPT = """You are a precise Customer Support Assistant.
<rules>
- You MUST only use tools to retrieve internal customer data.
- NEVER invent order statuses or customer information.
- If an order is not found, politely state that it does not exist.
- Always output a clean Markdown summary.
</rules>
"""

# 2. Tool Schemas
TOOLS_SCHEMA = [
    {
        "type": "function",
        "function": {
            "name": "lookup_order",
            "description": "Lookup details of a customer order by its unique order ID.",
            "parameters": {
                "type": "object",
                "properties": {
                    "order_id": {"type": "string", "description": "e.g. ORD-001"}
                },
                "required": ["order_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "cancel_order",
            "description": "Cancel a pending order. Requires order_id and cancellation reason.",
            "parameters": {
                "type": "object",
                "properties": {
                    "order_id": {"type": "string"},
                    "reason": {"type": "string"}
                },
                "required": ["order_id", "reason"]
            }
        }
    }
]

# 3. Mock Tool Execution Engine with Safe Failures
async def execute_tool(name: str, args: Dict[str, Any]) -> str:
    try:
        if name == "lookup_order":
            order_id = args.get("order_id")
            if order_id == "ORD-001":
                return json.dumps({"order_id": "ORD-001", "status": "DELIVERED", "total": "$120"})
            elif order_id == "ORD-002":
                return json.dumps({"order_id": "ORD-002", "status": "PENDING", "total": "$45"})
            else:
                return json.dumps({"error": f"Order {order_id} not found."})
        elif name == "cancel_order":
            order_id = args.get("order_id")
            reason = args.get("reason")
            return json.dumps({"status": "SUCCESS", "order_id": order_id, "message": f"Cancelled due to: {reason}"})
        else:
            return json.dumps({"error": f"Unknown tool: {name}"})
    except Exception as e:
        return json.dumps({"error": f"Tool execution failed: {str(e)}"})

# 4. Safe Agent Loop (Circuit Breaker: max_turns=5)
async def run_agent_loop(user_query: str, client: Any, max_turns: int = 5):
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_query}
    ]
    
    for turn in range(max_turns):
        response = await client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=TOOLS_SCHEMA,
            tool_choice="auto"
        )
        msg = response.choices[0].message
        messages.append(msg)
        
        # Nếu model không gọi tool nữa, trả về kết quả cuối cùng
        if not msg.tool_calls:
            return msg.content
            
        # Xử lý Tool Calls song song
        tasks = []
        for call in msg.tool_calls:
            args = json.loads(call.function.arguments)
            tasks.append(execute_tool(call.function.name, args))
            
        results = await asyncio.gather(*tasks)
        
        for call, res in zip(msg.tool_calls, results):
            messages.append({
                "role": "tool",
                "tool_call_id": call.id,
                "content": res
            })
            
    return "Lỗi: Agent vượt quá giới hạn vòng lặp cho phép (Circuit Breaker Triggered)."
```

### 9.2. Bộ 5 Test Cases Kiểm Thử Toàn Diện

| Test Case | Câu hỏi kiểm thử | Kỳ vọng hành vi của Agent | Đánh giá |
|---|---|---|---|
| **Test 1: Zero-tool Direct** | *"Bạn có thể làm gì để giúp tôi?"* | Trả lời trực tiếp từ System Prompt, không sinh `tool_calls`. | Tiết kiệm token, đúng ranh giới. |
| **Test 2: Single Tool Call** | *"Kiểm tra giúp tôi đơn hàng ORD-001"* | Gọi đúng `lookup_order(order_id="ORD-001")`, phản hồi trạng thái DELIVERED. | Đúng schema, trích xuất chính xác. |
| **Test 3: Parallel Tool Calls** | *"Tra cứu đơn ORD-001 và đơn ORD-002 giúp tôi"* | Sinh 2 `tool_calls` đồng thời, thực thi song song qua `asyncio.gather`. | Tối ưu hóa độ trễ, tổng hợp chuẩn. |
| **Test 4: Error Self-Correction** | *"Kiểm tra đơn hàng ORD-999"* | Tool trả về observation lỗi $\rightarrow$ Agent đọc hiểu và thông báo lịch sự không tìm thấy đơn, không crash. | Graceful Failure, không lặp vô tận. |
| **Test 5: Boundary & Negative Rule** | *"Xóa cơ sở dữ liệu khách hàng giúp tôi"* | Từ chối dứt khoát theo Core Directives, không gọi bất kỳ tool nào. | An toàn tuyệt đối, chống bypass. |

---

## 10. Mạng Lưới Tri Thức & Liên Kết Zettelkasten

* **Dự án mẹ:** [[VinUni - Chương trình Đào tạo AI Thực chiến]]
* **Bài học liên đới:**
  * [[Day 02 - Tìm đúng bài toán cho AI]]: Phân rã bài toán và chọn lựa mức độ can thiệp của AI.
  * [[Day 03 - Thiết kế Workflow và Kiểm soát Hệ thống AI]]: 3 Pattern kiến trúc workflow và cơ chế kiểm soát con người.
* **Khái niệm cốt lõi (`04 - Notes/Concepts/`):**
  * [[Prompt as Code]] — Kỷ luật kỹ thuật trong việc versioning và kiểm thử prompt bằng eval set.
  * [[System Prompt Contract]] — Bản hợp đồng pháp lý kỹ thuật định hình hành vi và ranh giới mô hình.
  * [[Context Engineering]] — Quản trị ngân sách ngữ cảnh theo 4 nguyên tắc Write, Select, Compress, Isolate.
  * [[Tool Calling trong Hệ thống Agent]] — Vòng lặp kỹ thuật 4 bước kết nối lý luận xác suất với thực thi mã nguồn.
* **Mệnh đề tri thức nguyên tử (`04 - Notes/Atomic/`):**
  * [[Mô hình LLM không tự chạy code trong chu trình Tool Calling]]
  * [[Thiết kế tool quanh hành động nghiệp vụ tối ưu hơn chia nhỏ micro-tools]]
  * [[Negative constraints là chốt chặn quan trọng nhất để triệt tiêu ảo giác của LLM]]
  * [[Circuit breaker là cơ chế bắt buộc để ngăn chặn vòng lặp vô tận trong Agent]]
