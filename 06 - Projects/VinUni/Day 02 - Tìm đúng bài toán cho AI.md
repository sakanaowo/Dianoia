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
  - day-02
  - system-thinking
  - problem-framing
  - ai-engineering
created: 2026-09-11
updated: 2026-09-12
aliases:
  - Day 02 - Tìm đúng bài toán cho AI
  - Day 02 VinUni
  - Xác định bài toán kinh doanh cho AI
---

# Day 02 — Tìm Đúng Bài Toán Cho AI (Tư Duy Hệ Thống & Problem Framing)

Ghi chép chuyên sâu về tư duy hệ thống, phương pháp định vị bài toán và khung ra quyết định triển khai trong chương trình **AI Thực chiến VinUni (Lớp K4A)**.

> [!TIP] **Tư duy Cốt lõi của Ngày học**
> *"Chỉ dùng AI khi nó tạo ra giá trị vượt trội so với các cách giải quyết đơn giản hơn, chứ không phải vì nó là công nghệ mới nhất. Không có metric thì không có gate; chưa đo lường được thì chưa nên scale."*

---

## 1. Tư Duy Thiết Kế Lấy Con Người Làm Trung Tâm (HCD & Mental Models)

1. **Mô hình tư duy (Mental Models):**
   * *Định nghĩa:* Cách người dùng hình dung, hiểu và kỳ vọng về phương thức hệ thống vận hành dựa trên thói quen và kinh nghiệm có sẵn.
   * *Bản chất của lỗi (Errors):* Xuất hiện khi có sự lệch pha giữa **kỳ vọng của người dùng** và **thực tế phản hồi của hệ thống**.
   * *Nguyên tắc vàng:* Thiết kế sản phẩm theo mô hình tư duy của người dùng, tuyệt đối không ép người dùng phải tư duy theo cách xử lý của AI.
2. **Cơ chế Phản hồi & Kiểm soát (Feedback & Control):**
   * *Feedback là kênh giao tiếp 2 chiều:* Không chỉ là trả output mà cần mở kênh cho người dùng đánh giá chất lượng ngay cả khi kết quả đúng.
   * *Control:* Luôn trao quyền cho người dùng can thiệp, tạm dừng hoặc chỉnh sửa luồng làm việc.
3. **Thiết kế khi AI sai sót (Graceful Failure):**
   * AI là hệ thống xác suất (probabilistic), luôn có xác suất lỗi. Thiết kế phải đảm bảo khi AI sai sót, hệ thống vẫn "hạ cánh an toàn", thông báo minh bạch để người dùng sẵn sàng tiếp quản công việc mà không gây hoảng loạn hay mất mát dữ liệu.

---

## 2. Bức Tranh Toàn Cảnh & 4 Sai Lầm "Đốt Tiền" Phổ Biến (Anti-patterns)

| Anti-pattern | Bản chất sai lầm | Cách khắc phục chuẩn mực |
|---|---|---|
| **1. Trend-first** | Thích dùng "Agent", "LLM" cho ngầu theo trào lưu mà không hiểu rõ diễn viên (*actor*), quy trình (*workflow*) và chỉ số (*metric*). | Bắt đầu từ nút thắt nghiệp vụ thật; ưu tiên giải pháp phi AI hoặc Rule-based trước. |
| **2. No baseline** | Xây dựng AI hoành tráng nhưng không có kết quả đối chứng làm bằng tay hoặc bằng luật quy tắc (*Rule*) để so sánh hiệu quả. | Phải thiết lập baseline đo bằng thời gian/chi phí trước khi viết code AI. |
| **3. No eval path** | Có bản demo bắt mắt nhưng thiếu bộ dữ liệu kiểm thử (*eval set*) chuẩn hóa; không biết khi nào hệ thống "đủ tốt" để lên production. | Xây dựng bộ test tái hiện được với các ca biên (*edge cases*) trước khi scale. |
| **4. No owner of failure** | Không quy định rõ ai chịu trách nhiệm khi AI sinh kết quả sai, thiếu quy trình khôi phục (*rollback*) và kiểm soát rủi ro. | Xác định rõ vai trò kiểm duyệt (*HITL*) và chủ sở hữu rủi ro (*Risk Owner*). |

---

## 3. Vòng Đời 6 Giai Đoạn & Cổng Kiểm Soát (Gate Criteria)

Một dự án AI thực chiến bài bản bắt buộc phải đi qua 6 chặng với tiêu chí chốt chặn (*GO / NO-GO*):

```text
[1. Problem Scoping] → [2. Data Readiness] → [3. Baseline / Model] → [4. Build & Eval] → [5. Deploy Controls] → [6. Monitor & Iterate]
```

* **Gate 1 (Problem Scoping):** Cần có actor, workflow, pain point và metric rõ ràng. $\rightarrow$ *Dừng lại (NO-GO) nếu bài toán mơ hồ hoặc đặt solution lên trước.*
* **Gate 2 (Data Readiness):** Có dữ liệu mẫu, logs kiểm thử và sự hỗ trợ của chuyên gia nghiệp vụ (*SME*). $\rightarrow$ *Dừng lại nếu dữ liệu không có hoặc quá sai lệch.*
* **Gate 3 (Baseline / Model Choice):** Biết rõ AI cần phải vượt qua cái gì (luật regex, quy trình thủ công, chi phí hiện tại). $\rightarrow$ *Dừng lại nếu chưa xác định được mục tiêu cải thiện.*
* **Gate 4 (Build & Eval):** Phải có bộ eval set độc lập và thông số kỹ thuật (độ trễ latency, chi phí token/call). $\rightarrow$ *Dừng lại nếu chỉ có demo mà không thể đo lường lặp lại.*
* **Gate 5 (Deploy Controls):** Quy định rõ ai là người duyệt output, ai bấm nút dừng khẩn cấp (*kill switch*) và kịch bản rollback. $\rightarrow$ *Dừng lại nếu không có người chịu trách nhiệm.*
* **Gate 6 (Monitor & Iterate):** Theo dõi drift dữ liệu, logging hành vi người dùng và cải tiến liên tục.

---

## 4. Khung Cấu Trúc 4 Thành Phần của Hệ Thống AI

Hệ thống AI hiện đại được cấu thành từ 4 khối then chốt:

$$\text{AI System} = \text{Model} + \text{Context} + \text{Planning} + \text{Tools}$$

| Thành phần | Cần khi nào? | Cơ chế kiểm soát (Control) | Chi phí & Rủi ro chính |
|---|---|---|---|
| **1. Model (LLM/SLM)** | Tác vụ mở, cần suy luận logic hoặc biến đổi ngôn ngữ tự nhiên. | Eval set chuẩn, Guardrails, Structured Output. | Chi phí Tokens, Độ trễ Latency, Nguy cơ ảo giác (*hallucination*). |
| **2. Context (RAG/Memory)** | Cần tri thức chuyên sâu, tài liệu nội bộ hoặc trạng thái phiên làm việc. | Kiểm thử độ chính xác truy xuất (*Retrieval eval*), kiểm tra độ tươi dữ liệu. | Chi phí lưu trữ Vector/Graph, Rủi ro truy xuất sai ngữ cảnh. |
| **3. Planning (Steps/Policies)** | Tác vụ phức tạp, cần phân rã nhiều bước thực thi. | Giới hạn số bước (*max_steps*), chính sách rẽ nhánh cứng. | Tăng số lượt gọi API, Rủi ro rơi vào vòng lặp vô tận (*infinite loop*). |
| **4. Tools (APIs/Actions)** | Cần tương tác, đọc/ghi dữ liệu ra thế giới bên ngoài. | Sandbox môi trường, danh sách trắng (*Allowlist*), Human-in-the-loop. | Lỗi API ngoài, Tác dụng phụ ngoài dự kiến (*side effects*), Prompt Injection. |

> [!IMPORTANT] **Lời khuyên thực dụng cho Kỹ sư AI:**
> 1. Nếu chỉ tóm tắt / trích xuất cấu trúc: **Prompt + Structured Output (JSON mode)** là đủ.
> 2. Nếu cần tra cứu dữ liệu ngoài: Bổ sung **Retrieval (Vector RAG / GraphRAG)**.
> 3. Chỉ khi tác vụ thực sự đòi hỏi tự thích ứng nhiều bước, tự chọn công cụ động và tự xử lý vòng lặp phản hồi thì mới cân nhắc kiến trúc **Autonomous Agent**.

---

## 5. Bản Problem Statement Chuẩn Hóa 6 Thành Phần

Một Problem Statement tốt giúp hình thành ngay kế hoạch đánh giá (*Eval Plan*):

1. **Actor / Operator:** Ai là người thực hiện công việc này hàng ngày?
2. **Current Workflow:** Họ đang xử lý qua các bước nào và dùng công cụ gì?
3. **Bottleneck (Nút thắt):** Bước nào gây chậm trễ, sai sót, thiếu nhất quán hoặc kiệt quệ nhận thức?
4. **Impact (Tác động):** Thiệt hại đo bằng thời gian (phút/giờ), chi phí ($), SLA, hoặc tỷ lệ chuyển đổi là bao nhiêu?
5. **Success Metric:** Ngưỡng định lượng nào chứng minh hệ thống thành công?
6. **Operational Boundary:** Hệ thống được phép làm gì, **dứt khoát không làm gì**, và điểm nào bắt buộc có con người kiểm duyệt (*HITL*)?

---

## 6. Ma Trận Stakeholders, RACI-Lite & Business Value Framing

### 1. 4 Câu hỏi Stakeholders
* **Người dùng (End-user):** Ai trực tiếp tiêu thụ output của AI hàng ngày?
* **Người duyệt (Reviewer):** Ai thẩm định các output có độ rủi ro cao trước khi kích hoạt hành động?
* **Chủ sở hữu rủi ro (Risk Owner):** Ai chịu trách nhiệm pháp lý/nghiệp vụ khi hệ thống gặp sự cố?
* **Người có quyền hạn (Decision Maker):** Ai quyết định phê duyệt cấp ngân sách hoặc bấm nút rollback?

### 2. RACI-Lite cho đề xuất Use Case AI
* **Biz / Ops (A/R):** Chịu trách nhiệm chính (*Accountable/Responsible*) về bài toán nghiệp vụ, chỉ số đo lường và quy trình Human-in-the-loop.
* **AI Engineer (R):** Chịu trách nhiệm thiết kế kiến trúc kỹ thuật, chốt baseline và xây dựng bộ eval set.
* **Platform / Data (C):** Đảm bảo hạ tầng, luồng dữ liệu sạch và cơ chế rollback hệ thống.
* **Risk / Legal (C/I):** Cố vấn và giám sát tuân thủ ranh giới an toàn thông tin.

### 3. Business Value Framing (Công thức Pitch Dự án)
$$\text{Pain point hiện tại} \longrightarrow \text{Workflow metric} \longrightarrow \text{Business impact} \longrightarrow \text{Architecture choice}$$
* *System Metrics (Kỹ thuật):* Task success rate, Latency, Cost per task, Human review load.
* *Business KPIs (Kinh doanh):* Giảm thời gian xử lý (SLA), Giảm chi phí vận hành, Tăng thông lượng (*throughput*), Triệt tiêu rủi ro tài chính do lỗi nghiệp vụ.

---

## 7. Khung Thẩm Định Khả Thi (Discovery & Feasibility Check)

Đánh giá nhanh qua 3 trụ cột trước khi cam kết viết code:

| Trụ cột | Câu hỏi kiểm chứng bắt buộc |
|---|---|
| **Technical** | Đã có baseline so sánh chưa? Bộ data/logs để eval có sẵn không? Latency và Cost có trong hạn mức cho phép? |
| **Operational** | Đã có quy trình giám sát (*logging/monitoring*) chưa? Cơ chế HITL và kịch bản Rollback ra sao? Ai chịu trách nhiệm khi sai? |
| **Business** | ROI có dương ở phạm vi thử nghiệm (*Pilot*) không? Rủi ro tuân thủ có rõ ràng? Đội ngũ vận hành có sẵn sàng đổi quy trình? |

* **GO:** Khi vấn đề, baseline, eval set và risk controls đều đã rõ ràng.
* **NOT YET:** Có nỗi đau thật nhưng còn thiếu dữ liệu, thiếu metric hoặc chưa rõ ranh giới boundary.
* **NO-GO:** Khi giải pháp Rule đơn giản đã đủ tốt, hậu quả khi AI sai quá đắt, hoặc chi phí thay đổi quy trình lớn hơn giá trị mang lại.

---

## 8. Case Study Thực Chiến Của Nhóm: Giải Mã Paper AI

Áp dụng toàn bộ tư duy hệ thống trên vào bài toán nghiên cứu của Nhóm 2:

* **Actor:** Sinh viên CNTT/AI năm cuối làm đồ án tốt nghiệp (đọc 1 paper/tuần, 8–10 tiếng/paper).
* **Nút thắt cốt lõi:** Hiện tượng *Symbol Disconnection* (mất dấu biến số đa trang) và *Dimension Blindness* (mù chiều Tensor) trong khâu giải mã công thức (165 phút).
* **Lựa chọn kiến trúc:** Hạ cấp từ Autonomous Agent xuống **Workflow tích hợp GraphRAG & Rule Parser**:
  1. *Rule OCR/LaTeX* $\rightarrow$ 2. *Build Knowledge Graph* (`Symbol`, `Equation`, `Section`, `DefinitionSpan`) $\rightarrow$ 3. *Human Trigger* $\rightarrow$ 4. *GraphRAG Retrieval* (Multi-hop Traversal) $\rightarrow$ 5. *LLM Synthesis* (Tensor Breakdown) $\rightarrow$ 6. *Human Boundary* (Kiểm tra chiều ma trận + Fallback).
* **Success Metric:** Giảm thời gian giải mã từ **165 phút xuống dưới 35 phút/paper**; độ chính xác ánh xạ ký hiệu $\ge 95\%$.
* **Quyết định:** **GO** với Kế hoạch Pilot 3 paper kinh điển (Transformer, DDPM, YOLOv8) và kịch bản Rollback rõ ràng.
