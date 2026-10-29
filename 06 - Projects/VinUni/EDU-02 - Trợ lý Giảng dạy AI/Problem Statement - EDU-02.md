---
type: project
status: active
project: "[[EDU-02 - Trợ lý Giảng dạy AI]]"
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - vinuni
  - edu-02
  - problem-statement
  - system-thinking
  - hcd
created: 2026-09-14
updated: 2026-09-14
aliases:
  - Problem Statement EDU-02
  - Đặc tả bài toán EDU-02
---

# Bản Đặc Tả Bài Toán Chuẩn Hóa — EDU-02 (Problem Statement v1)

Áp dụng khung cấu trúc Problem Statement chuẩn mực được đúc kết từ [[Day 02 - Tìm đúng bài toán cho AI|Day 02]] và [[Day 03 - Thiết kế Workflow và Kiểm soát Hệ thống AI|Day 03]] nhằm định vị rõ nút thắt, ranh giới và tiêu chí đo lường định lượng trước khi triển khai kỹ thuật.

---

## 1. Tác Giả & Vai Trò Trực Tiếp (Actor / Operator)
* **Giảng viên chính (Lead Instructor):** Người chịu trách nhiệm học thuật cao nhất của môn học, thiết kế đề cương, bài giảng, bài thi và quyết định nội dung giảng dạy trên lớp.
* **Trợ giảng (Teaching Assistant - TA):** Người trực tiếp hỗ trợ sinh viên trong các buổi thực hành (lab), theo dõi diễn đàn trao đổi (Canvas Discussion) và chấm bài tập/quiz hàng tuần.

---

## 2. Quy Trình Hiện Trạng (Current State Workflow)
Mỗi tuần học trong học kỳ đại học diễn ra theo quy trình:
1. **Phát bài giảng & Quiz tuần:** Sinh viên học lý thuyết trên lớp và làm 1 bài quiz kiểm tra nhanh (10–20 câu trắc nghiệm) trên hệ thống quản lý học tập (Canvas LMS).
2. **Tiếp nhận vướng mắc phân mảnh:** Sinh viên gặp khó khăn sẽ gửi câu hỏi rải rác:
   * 30–50 câu hỏi/bình luận trên diễn đàn thảo luận Canvas.
   * 15–25 email cá nhân gửi riêng cho giảng viên và trợ giảng.
   * Trao đổi trực tiếp trong giờ hành chính (Office hours).
3. **Tổng hợp thủ công:** Trợ giảng hoặc giảng viên tranh thủ 1 buổi cuối tuần đọc lướt qua các bài đăng trên Canvas và xem bảng điểm quiz.
4. **Phản hồi muộn:** Chuẩn bị slide chữa bài cho tuần tiếp theo dựa trên cảm tính hoặc những câu hỏi mà người dạy tình cờ nhớ được.

---

## 3. Nút Thắt Định Lượng Có Bằng Chứng (Quantified Bottleneck)
* **Lãng phí thời gian thủ công:** Giảng viên và TA mất trung bình **4–6 giờ/tuần** chỉ để đọc lướt các bài đăng trùng lặp, phân loại thủ công các vướng mắc của 100–250 sinh viên.
* **Độ trễ phản hồi học thuật (Feedback Latency):** Thời gian từ khi sinh viên bắt đầu hiểu nhầm một khái niệm cốt lõi đến khi giảng viên phát hiện ra kéo dài từ **7–14 ngày** (hoặc tệ hơn là đến kỳ thi giữa kỳ).
* **Mất dấu hiểu nhầm (Misconception Blindness):** Do số lượng sinh viên quá đông, các câu hỏi có vẻ khác nhau về câu chữ nhưng cùng chung một lỗi bản chất (root cause) không được gom nhóm, dẫn đến việc giải quyết sự cố chỉ mang tính chắp vá bề nổi.

---

## 4. Thiệt Hại & Tác Động Nghiệp Vụ (Pain & Business Impact)
* **Đối với sinh viên:** Hổng kiến thức dây chuyền (đặc biệt trong các môn kỹ thuật/AI có tính lũy tiến cao); tỷ lệ sinh viên chán nản, bỏ cuộc hoặc trượt môn tăng cao (tỷ lệ trượt trung bình môn khó từ 15–20%).
* **Đối với giảng viên:** Quá tải nhận thức (*Cognitive Overload*), kiệt sức vì phải trả lời lặp đi lặp lại cùng một thắc mắc; buổi học trên lớp dành quá nhiều thời gian giải quyết sự vụ thay vì tập trung nâng cao năng lực tư duy.

---

## 5. Quy Trình Kỳ Vọng Tương Lai (Target Future State Workflow)
```text
[Dữ liệu Canvas LMS] ──(Tự động Gom & Hashing Ẩn danh)──> [Clustering Worker (Code + Embeddings)]
                                                                      │
                                                                      ▼ Phát hiện Top 3 Điểm nghẽn
                                                        [Grounded RAG (Syllabus + LOs)]
                                                                      │
                                                                      ▼ Sinh bài tập theo Thang Bloom
                                                        [APPROVAL GATE: Giảng viên / TA]
                                                          ├─ Duyệt (Accept) ──> Publish Dashboard
                                                          └─ Sửa / Bác bỏ ────> Ghi nhận Feedback
```
1. **Thu thập tự động:** Hệ thống định kỳ gom câu hỏi diễn đàn và dữ liệu làm quiz của lớp, tự động ẩn danh hóa mã số sinh viên.
2. **Phát hiện cụm điểm nghẽn:** Sử dụng thuật toán phân cụm xác định (HDBSCAN/Embedding) kết hợp LLM để nhóm các thắc mắc và chỉ ra **Top 3 lỗi bản chất** lớp đang mắc phải.
3. **Sinh đề xuất bám chuẩn đầu ra:** Hệ thống RAG tra cứu Đề cương & Chuẩn đầu ra (Learning Outcomes) để gợi ý:
   * Tóm tắt nguyên nhân hiểu nhầm (Root Cause Explanation).
   * 2–3 bài tập trắc nghiệm/thực hành củng cố đúng mức độ nhận thức theo Thang Bloom.
4. **Phê duyệt Human-in-the-loop:** Giảng viên/TA mở Dashboard, xem xét gợi ý trong vòng 5–10 phút, chỉnh sửa nếu cần và bấm **Phê duyệt** để phát hành tài liệu ôn tập cho lớp.

---

## 6. Chỉ Số Đo Lường Thành Công (Success Metrics)

### A. Chỉ số Hệ thống & Kỹ thuật (System & AI Metrics)
* **Thời gian tổng hợp (Pipeline Latency):** Rút ngắn từ 4–6 giờ thủ công xuống **< 2 phút chạy tự động**.
* **Độ chính xác phân cụm điểm nghẽn (Clustering Precision):** $\ge 80\%$ các câu hỏi trong cùng cụm có chung nguyên nhân hiểu nhầm (được kiểm chứng so với nhãn của giảng viên).
* **Độ trung thực trích dẫn (RAG Faithfulness):** $\ge 90\%$ bài tập và giải thích sinh ra phải bám sát 100% tài liệu môn học, không có ảo giác (đo qua DeepEval).
* **Tuân thủ Thang đo Bloom (Bloom Taxonomy Alignment):** $\ge 85\%$ câu hỏi sinh ra tương thích chính xác với mức độ nhận thức của Learning Outcome tương ứng.

### B. Chỉ số Nghiệp vụ & Vận hành (Business / Operational KPIs)
* **Tiết kiệm thời gian cho Giảng viên/TA:** Giảm ít nhất **80% thời gian rà soát vướng mắc** (từ 5 giờ xuống dưới 45 phút/tuần).
* **Tỷ lệ chấp thuận của Giảng viên (HITL Acceptance Rate):** $\ge 75\%$ các gợi ý bài tập được giảng viên phê duyệt sử dụng trực tiếp hoặc chỉ chỉnh sửa nhỏ.
* **Cải thiện kết quả học tập:** Điểm làm lại các câu hỏi liên quan đến điểm nghẽn của sinh viên cải thiện tối thiểu **15%** trong lần đánh giá kế tiếp.

---

## 7. Ranh Giới Vận Hành & Chốt Chặn Con Người (Operational Boundary & HITL)
* **Quyền hạn tối cao:** AI **tuyệt đối không được tự động phát hành** bài tập, thông báo hay chỉnh sửa điểm số lên Canvas. AI chỉ đóng vai trò Trợ lý Tư vấn (*Augmentation*).
* **Chốt chặn phê duyệt:** Giảng viên và TA là người duy nhất sở hữu nút bấm `[Approve & Publish]`. Mọi bài tập trước khi đến tay sinh viên phải có dấu phê duyệt của con người.
* **Bảo mật dữ liệu:** Hệ thống không lưu trữ thông tin nhận dạng cá nhân (PII). Điểm số và câu hỏi của từng sinh viên được băm ẩn danh (Salted Hashing) trước khi đưa vào cụm phân tích.
* **Cơ chế dừng khẩn cấp (Kill Switch):** Nếu phát hiện nội dung gợi ý bị lỗi logic hoặc sai lệch kiến thức nghiêm trọng, giảng viên bấm nút `[Reject & Freeze]`, toàn bộ gợi ý tuần đó bị hủy bỏ và hệ thống quay về trạng thái mặc định.

---

## 8. Những Việc Dứt Khoát Không Làm (Non-Goals)
* **Không thay thế việc chấm bài:** Hệ thống không tự động chấm điểm bài luận, bài thi học kỳ hay tự động đưa ra quyết định điểm số môn học.
* **Không làm Chatbot đối thoại 1-1 không kiểm soát với sinh viên:** Tránh rủi ro sinh viên hỏi lệch hướng, prompt injection hoặc nhận câu trả lời sai lệch ngoài tầm kiểm soát của giảng viên.
* **Không tự ý truy cập dữ liệu ngoài môn học:** Hệ thống chỉ giới hạn ngữ cảnh trong phạm vi khóa học cụ thể đã được cấu hình.

---

## 9. Kế Hoạch Đánh Giá Thực Nghiệm (Eval Plan)
* **Bộ dữ liệu kiểm thử (Eval Benchmark Set):**
  * 50 câu hỏi thảo luận mẫu được thu thập từ các kỳ học trước (hoặc giả lập theo syllabus môn học) thuộc 4 cụm chủ đề kiến thức.
  * 1 bài kiểm tra mẫu (Quiz) gồm 15 câu trắc nghiệm với ma trận lỗi sai định sẵn.
* **Công cụ đo lường:**
  * Sử dụng thư viện `DeepEval` / `RAGAS` để tự động hóa việc chấm điểm: *Faithfulness*, *Context Relevance*, *Hallucination Detection*.
  * LLM-as-Judge (GPT-4o) đối chiếu câu hỏi sinh ra với đề cương môn học theo rubric Thang Bloom.
* **Thẩm định con người (Human Evaluation):** Giảng viên/TA trực tiếp chấm điểm độ hữu ích của Top 3 điểm nghẽn trên thang Likert 1–5.
