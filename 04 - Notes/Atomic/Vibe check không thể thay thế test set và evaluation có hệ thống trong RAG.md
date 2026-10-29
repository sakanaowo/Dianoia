---
type: atomic
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - atomic
  - rag
  - evaluation
  - test-set
  - cicd
created: 2026-09-20
updated: 2026-09-20
---

# Vibe check không thể thay thế test set và evaluation có hệ thống trong RAG

## Mệnh đề cốt lõi

Việc đánh giá hệ thống RAG bằng phương pháp thử nghiệm thủ công vài câu hỏi ngẫu nhiên trên giao diện ("vibe check") là nguyên nhân hàng đầu dẫn đến sụp đổ chất lượng trong môi trường sản xuất; một hệ thống RAG đạt chuẩn kỹ thuật phần mềm bắt buộc phải được thẩm định bằng **bộ Test Set chuẩn hóa cố định**, chạy đo lường tự động trong **CI/CD pipeline** để phát hiện kịp thời hiện tượng suy giảm chất lượng (*regression*).

---

## Bối cảnh và Rủi ro của "Vibe Check"

1. **Hiểm họa của cảm tính:**
   * Lập trình viên thay đổi một câu lệnh trong System Prompt, tinh chỉnh lại kích thước chunking hoặc đổi tham số $\alpha$ của Hybrid Search, sau đó gõ 3–5 câu hỏi và thấy câu trả lời có vẻ trôi chảy ("ổn").
   * Thực tế: "Cảm giác ổn" không phải là một chỉ số kỹ thuật (*metric*). Thay đổi đó có thể khiến 20% các truy vấn phức tạp khác bị sai lệch hoàn toàn mà không ai hay biết.

2. **Cấu trúc của một Test Set chuẩn hóa:**
   * Mỗi ca kiểm thử bắt buộc gồm 3 thành phần cấu trúc:
     1. `question`: Câu hỏi đại diện cho người dùng thật (bao gồm cả lỗi chính tả và ngôn ngữ đời thường).
     2. `ground_truth`: Câu trả lời mẫu chuẩn xác do chuyên gia nghiệp vụ viết tay.
     3. `expected_chunks`: Danh sách `doc_id` của các chunk bắt buộc phải được tìm thấy ở tầng Retrieval.
   * Quy mô mẫu: Tối thiểu 15–20 câu để chặn đứng regression khi sửa mã nguồn; 50–100 câu cho tiêu chí nghiệm thu đưa vào vận hành (*Production Gate*).

3. **Tự động hóa kiểm thử qua CI/CD:**
   * Tích hợp kịch bản kiểm thử (ví dụ qua GitHub Actions) chạy tự động tại mỗi lượt Git Commit hoặc Pull Request.
   * Đánh giá 4 chiều chất lượng:
     * *Groundedness / Faithfulness:* Câu trả lời có bám sát context hay suy diễn bịa đặt?
     * *Citations:* Các nguồn dẫn chứng `[doc_id]` có tồn tại và chính xác không?
     * *Abstention:* Khi context không có đáp án, mô hình có biết từ chối lịch sự hay tự ý hallucinate?
     * *Latency & Cost:* Độ trễ và chi phí token có vượt ngưỡng ngân sách SLA cho phép không?
   * Chỉ kích hoạt tự động deploy khi tất cả các bài test vượt qua ngưỡng tối thiểu.

---

## Giả định và Giới hạn

* Test set phải có sự tham gia thẩm định của con người có chuyên môn nghiệp vụ. Nếu dùng LLM sinh toàn bộ 100% test set mà không có người soát lỗi, bài kiểm thử sẽ rơi vào bẫy tự quy chiếu ("mô hình tự khen ngợi chính nó").

---

## Liên kết tri thức

* Phương pháp luận chi tiết: [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]]
* Khái niệm liên quan: [[Prompt as Code]], [[RAG Evaluation & CI/CD]], [[System Prompt Contract]]
