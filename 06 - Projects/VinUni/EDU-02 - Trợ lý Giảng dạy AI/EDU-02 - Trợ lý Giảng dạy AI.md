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
  - edu-02
  - ai-education
  - teaching-assistant
  - agentic-workflow
  - hitl
created: 2026-09-14
updated: 2026-09-14
aliases:
  - EDU-02
  - Trợ lý giảng dạy AI
  - ClassPulse Realtime Assistant
---

# EDU-02 — Trợ Lý Giảng Dạy AI Tổng Hợp Vướng Mắc Lớp Học Realtime

Trạm điều khiển trung tâm (*Command Center*) quản lý toàn diện đề tài **`EDU-02`** (Khối `A · AI Giáo dục`) của **Nhóm 2 (Lớp K4A — Bootcamp AI Thực chiến VinUni)**.

> [!IMPORTANT] **Thông tin Đề tài Chính thức (AI20K Bank)**
> - **Mã đề:** `EDU-02`
> - **Tên đề:** Trợ lý giảng dạy X: Trợ lý giảng dạy AI tổng hợp vướng mắc lớp học realtime
> - **Khối:** A · AI Giáo dục (PnL: VinUni / VSF)
> - **Trạng thái:** Đã đăng ký (Slot 1/2) — Đang trong giai đoạn thẩm định khả thi & xây dựng proposal (Hạn chốt: 20/09/2026).
> - **Mục tiêu sản phẩm:** Web application realtime hỗ trợ Giảng viên & Trợ giảng nắm bắt ngay lập tức các "điểm nghẽn" học tập của sinh viên sau mỗi buổi học/quiz, sinh đề xuất ôn tập bám sát chuẩn đầu ra (*Learning Outcomes*) và Thang đo Bloom, với quyền kiểm duyệt tối cao của con người (*Human-in-the-loop*).

---

## 1. Thành Viên Đội Dự Án (Đội 078 — Thợ Xem Trẻ Ăn)

| Họ và tên                | Mã học viên & Phòng             | Vai trò phân công                                   | Trách nhiệm chính trong đề tài EDU-02                                                                                                                                     |
| ------------------------ | ------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nguyễn Thái Anh**      | `2A202602810`<br>(Phòng `C401`) | **Team Lead / AI Modeling & Research**              | Chỉ đạo chung, thiết kế kiến trúc Grounded RAG (bám Syllabi & Learning Outcomes), Prompt Engineering bám Thang đo Bloom, và thiết lập Eval Pipeline.                      |
| **Hoàng Trung Hiếu**     | `2A202602945`<br>(Phòng `C401`) | **Product Lead / Business Analyst (BA) & Workflow** | Định nghĩa User Stories / PRD, thiết kế trải nghiệm UI/UX cho Giảng viên & TA, phân tích nghiệp vụ HCD, điều phối quy trình và chuẩn hóa bộ nhãn ground-truth điểm nghẽn. |
| **Nguyễn Văn Giáp**      | `2A202602903`<br>(Phòng `D301`) | **Data Engineering & Backend Lead**                 | Thiết kế luồng Data Ingestion (Canvas API), pipeline ẩn danh hóa Hashing SHA-256, kiến trúc cơ sở dữ liệu `pgvector`, tích hợp NLP & Embedding clustering.                |
| **Hoàng Ngọc Đăng Khoa** | `2A202602790`<br>(Phòng `C401`) | **DevOps / Fullstack & Evaluation Lead**            | Xây dựng giao diện Realtime Dashboard, đóng gói Docker/Cloud, quản trị Data Contracts, thiết lập quy trình kiểm thử benchmark (DeepEval) và tài liệu bàn giao.            |

![[Doi_078_Tho_xem_tre_an.png]]

---

## 2. Hệ Thống Tài Liệu Kỹ Thuật

Thư mục dự án bao gồm 3 trụ cột kỹ thuật cốt lõi được xây dựng theo chuẩn bài học Day 02 – Day 04:

1. **[[Problem Statement - EDU-02]]**: Bản đặc tả bài toán chuẩn hóa 9 trường thông tin (Actor, Current Workflow, Quantified Bottleneck, Target Future State, Business Value, Success Metrics, Human Boundary & HITL, Non-goals, Eval Plan).
2. **[[Architecture & Workflow - EDU-02]]**: Thiết kế kiến trúc tổng thể, sơ đồ luồng dữ liệu từ Canvas API đến Dashboard, thiết kế đồ thị trạng thái LangGraph và cơ chế dừng phê duyệt (*Interrupt-before Approval Gate*).
3. **[[Tech Specs & Eval Plan - EDU-02]]**: Quy chuẩn kỹ thuật chi tiết, schema dữ liệu mock, System Prompt Contract với Negative Constraints, và bộ chỉ số kiểm thử định lượng (*RAGAS / DeepEval*).

---

## 3. Tóm Tắt Thẩm Định Khả Thi (Feasibility Scorecard)

Dựa trên bộ khung đánh giá từ [[Day 02 - Tìm đúng bài toán cho AI|Day 02]] và [[Day 03 - Thiết kế Workflow và Kiểm soát Hệ thống AI|Day 03]]:

* **Agentic Fit Score:** **15 / 20** (*Multi-step Reasoning: 4, Tool Interaction: 4, Dynamic Decision: 4, Long Horizon: 3*) $\rightarrow$ **Đạt điểm vàng cho Stateful Workflow Agentic**.
* **Nút thắt nghiệp vụ:** Cắt giảm thời gian rà soát thủ công của Giảng viên/TA từ **4–6 tiếng/tuần xuống < 30 phút/tuần**; rút ngắn độ trễ phát hiện điểm nghẽn từ **7–14 ngày xuống < 1 giờ**.
* **Kiểm soát rủi ro:** 100% quyết định học thuật thuộc về Giảng viên/TA thông qua Approval Gate. Dữ liệu sinh viên được ẩn danh hóa bằng Hashing ở cấp độ lớp.
* **Chi phí vận hành (Cost Envelope):** Nhờ cơ chế Batching phân cụm, hệ thống chỉ tốn **5–10 lượt gọi LLM / tuần / môn học** (chi phí ước tính $< \$0.30/\text{tuần}$).
* **Quyết định thẩm định:** **GO** (Đề tài mạnh, rủi ro kiểm soát được, giá trị đo lường rõ ràng).

---

## 4. Lộ Trình Hành Động 6 Ngày (Timeline đến Hạn chốt 20/09)

```text
[14/09] Khởi tạo Workspace & Thẩm định Khả thi 
   │
[15/09] Soạn Problem Statement v1 & Thu thập Syllabus/Quiz mẫu môn học 
   │
[16/09] Quick Validation: Phỏng vấn nhanh Giảng viên / TA về điểm đau thực tế 
   │
[17/09] Thiết kế Data Contract (Mock Canvas JSON) & Prototype Embedding Clustering 
   │
[18/09] Dựng luồng LangGraph Workflow & Prompt sinh bài tập theo Bloom Taxonomy 
   │
[19/09] Thiết lập bộ Eval Set (30 câu hỏi vướng mắc mẫu) & Benchmark DeepEval ban đầu 
   │
[20/09] CHỐT CHÍNH THỨC ĐỀ TÀI VỚI BTC & NỘP BẢN PROPOSAL HOÀN CHỈNH
```
