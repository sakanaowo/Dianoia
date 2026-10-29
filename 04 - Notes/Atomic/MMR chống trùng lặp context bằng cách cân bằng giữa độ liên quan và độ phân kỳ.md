---
type: atomic
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - atomic
  - rag
  - mmr
  - diversity
  - context-engineering
created: 2026-09-20
updated: 2026-09-20
---

# MMR chống trùng lặp context bằng cách cân bằng giữa độ liên quan và độ phân kỳ

## Mệnh đề cốt lõi

Thuật toán **Maximum Marginal Relevance (MMR)** giải quyết vấn đề trùng lặp thông tin (*redundancy*) trong Context Window của LLM bằng cách đánh đổi một phần nhỏ độ tương đồng ngữ nghĩa để lấy độ phân kỳ thông tin, đảm bảo các tài liệu đưa vào mô hình sinh mang lại nhiều dữ kiện đa dạng thay vì lặp lại cùng một ý niệm.

---

## Bối cảnh và Cơ chế thuật toán

1. **Hiểm họa Redundancy trong RAG:**
   * Khi thực hiện Semantic Search hoặc Re-ranking thông thường, các chunk tài liệu có nội dung tương tự nhau (ví dụ 3 phiên bản văn bản cùng giải thích một chính sách với cách diễn đạt hơi khác) đều có điểm tương đồng rất cao.
   * Kết quả là Top-K chunks lấy về bị chiếm trọn bởi cùng một thông tin, gây lãng phí ngân sách token quý giá và tước đi cơ hội tiếp cận các góc nhìn bổ trợ khác của LLM.

2. **Công thức toán học của MMR:**
   $$MMR = \arg\max_{d \in D \setminus S} \left[ \lambda \cdot Sim(d, q) - (1 - \lambda) \cdot \max_{d_j \in S} Sim(d, d_j) \right]$$
   * $Sim(d, q)$: Độ liên quan giữa chunk ứng viên $d$ và câu hỏi $q$ (càng cao càng tốt).
   * $\max_{d_j \in S} Sim(d, d_j)$: Độ tương đồng giữa chunk ứng viên $d$ và **các chunk đã được chọn trước đó** vào tập kết quả $S$ (càng cao thì càng bị phạt nặng).
   * Tham số $\lambda \in [0, 1]$: Núm vặn điều tiết giữa mức độ liên quan thuần túy ($\lambda = 1$, quay về standard similarity search) và mức độ đa dạng cực đại ($\lambda = 0$). Trong thực tế sản phẩm, giá trị $\lambda \approx 0.5 - 0.7$ mang lại điểm cân bằng tối ưu.

3. **Ẩn dụ "Bài toán Kebab":**
   * Nếu chỉ tối ưu độ tương đồng: Kết quả trả về 9 bức ảnh đều là xiên nướng thịt kebab giống hệt nhau.
   * Nếu áp dụng MMR: Kết quả trả về xiên nướng, bánh mì cuộn, hộp cơm kebab, đĩa kebab kèm salad và khoai chiên. Cùng chủ đề kebab nhưng đem lại bức tranh toàn diện cho người dùng và mô hình sinh.

---

## Giả định và Giới hạn

* MMR yêu cầu tính toán độ tương đồng giữa các cặp chunk ứng viên với nhau, do đó làm tăng nhẹ thời gian xử lý so với việc cắt Top-K tĩnh.
* Nếu toàn bộ tài liệu đầu vào có độ phủ rất hẹp và câu hỏi chỉ nhắm vào đúng một con số duy nhất, việc áp dụng MMR quá đà ($\lambda$ thấp) có thể kéo theo các chunk lạc đề vào prompt.

---

## Liên kết tri thức

* Ứng dụng trong RAG Pipeline: [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]]
* Khái niệm liên quan: [[Maximum Marginal Relevance]], [[Context Engineering]], [[Cross-Encoder Reranking]]
