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

> [!INFO] **Thông tin Học viên & Đơn vị**
> - **Lớp:** K4A — Bootcamp AI Thực chiến (VinUni)
> - **Học viên:** Nguyễn Thái Anh (Mã học viên: `2A202602810`)
> - **Vai trò trong nhóm dự án (Nhóm 2):** Research Lead
> - **Các thành viên nhóm:**
>   - Đoàn Quang Minh (`2A202602711`) — Problem Owner / Facilitator
>   - Ngọ Doãn Ngọc (`2A202602635`) — Workflow Lead
>   - Hoàng Ngọc Đăng Khoa (`2A202602790`) — Writer / Documentation

---

## 1. Mục tiêu chương trình

* **Làm chủ tư duy Problem-First:** Nắm vững phương pháp phân rã và thẩm định bài toán trước khi viết mã nguồn; tránh bẫy "Agent cho ngầu" hoặc đưa AI vào khi chưa rõ điểm đau.
* **Kỹ nghệ phát triển AI thực chiến (AI Engineering):** Từ khâu trích xuất dữ liệu, xây dựng pipeline RAG/GraphRAG, thiết kế prompt/workflow đến đo lường và kiểm thử thực nghiệm.
* **Chuyển hóa vào Đồ án tốt nghiệp:** Ứng dụng trực tiếp các phương pháp học được vào đề tài nghiên cứu Deep Learning và đồ án tốt nghiệp kỹ sư CNTT.

---

## 2. Lộ trình Đào tạo & Tiến độ (Roadmap)

### 📍 Giai đoạn 1: Định vị, Đóng gói Bài toán & Thiết kế Workflow (Problem Framing & Workflow Design)
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

### 📍 Giai đoạn 2: Kỹ Nghệ Prompt, Quản Trị Context & Tool Calling (Prompt & Tool Engineering)
- [x] **Day 04:** [[Day 04 - Prompt Engineering và Tool Calling]]
  - Kỹ nghệ Prompt as Code: Specificity beats cleverness, quản lý ngân sách token, tiny eval set.
  - System Prompt Contract: 4 khối Persona, Core Directives, Capabilities, Output Contract, Negative Constraints.
  - Context Engineering theo 4 nguyên tắc Lance Martin: Write, Select, Compress, Isolate; xử lý Lost in the Middle và Prompt Caching.
  - Vòng lặp kỹ thuật Tool Calling 4 bước; phân loại Knowledge vs Capability vs Write actions; JSON schema design.
  - Quản trị lỗi và phòng ngừa vòng lặp vô tận: Error as clean observation, self-correction, Circuit Breaker (`max_turns`), retry budget.
  - 4 Nguyên tắc vàng thiết kế tool (Single Responsibility, Idempotency, Granularity hợp lý, Test độc lập).
  - Thực thi song song qua `asyncio.gather`, Fan-out / Fan-in pattern và quản trị race conditions.

### 📍 Giai đoạn 3: Kiến trúc Mô hình & Kỹ thuật Nâng cao (Modeling & GraphRAG)
- [ ] **Day 05:** Kỹ thuật xây dựng Knowledge Graph và tối ưu hóa truy vấn GraphRAG.
- [ ] **Day 06:** LLM orchestration, structured output, prompt engineering chuyên sâu.

### 📍 Giai đoạn 4: Thẩm định, Kiểm thử & Đưa vào Thực nghiệm (Evaluation & Deployment)
- [ ] **Day 07:** Thiết lập Human Boundary, kiểm thử độ chuẩn xác và phòng vệ rủi ro.
- [ ] **Day 08:** Đóng gói sản phẩm, benchmark và báo cáo nghiệm thu cuối khóa.

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

### B. Mệnh đề tri thức nguyên tử (`04 - Notes/Atomic/`)
* [[Xác định ranh giới không làm quan trọng hơn việc làm khi định nghĩa bài toán AI]]
* [[Vector RAG thất bại trước tài liệu dài vì hiện tượng mất dấu ký hiệu đa trang]]
* [[Ưu tiên hạ cấp từ Agent xuống Workflow kết hợp Rule để giảm thiểu rủi ro vận hành]]
* [[Mô hình LLM không tự chạy code trong chu trình Tool Calling]]
* [[Thiết kế tool quanh hành động nghiệp vụ tối ưu hơn chia nhỏ micro-tools]]
* [[Negative constraints là chốt chặn quan trọng nhất để triệt tiêu ảo giác của LLM]]
* [[Circuit breaker là cơ chế bắt buộc để ngăn chặn vòng lặp vô tận trong Agent]]

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
