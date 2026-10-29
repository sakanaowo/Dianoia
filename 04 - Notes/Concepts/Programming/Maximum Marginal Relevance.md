---
type: concept
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - concept
  - rag
  - mmr
  - diversity
  - information-retrieval
created: 2026-09-20
updated: 2026-09-20
---

# Maximum Marginal Relevance

## Định nghĩa

**Maximum Marginal Relevance (MMR)** là thuật toán truy xuất và tái xếp hạng thông tin nhằm giải quyết bài toán dung hòa giữa **độ liên quan (Relevance)** của tài liệu đối với câu hỏi và **độ đa dạng (Diversity)** của tập kết quả, ngăn chặn hiện tượng trùng lặp dữ kiện (*redundancy*) trong Context Window của mô hình ngôn ngữ lớn.

---

## Công thức Toán học

$$MMR = \arg\max_{d \in D \setminus S} \left[ \lambda \cdot Sim_1(d, q) - (1 - \lambda) \cdot \max_{d_j \in S} Sim_2(d, d_j) \right]$$

* $D$: Toàn bộ tập hợp các tài liệu ứng viên được truy xuất.
* $S$: Tập hợp các tài liệu đã được chọn đưa vào context.
* $D \setminus S$: Tập các tài liệu ứng viên còn lại chưa được chọn.
* $Sim_1(d, q)$: Hàm đo độ tương đồng giữa tài liệu ứng viên $d$ và truy vấn $q$.
* $Sim_2(d, d_j)$: Hàm đo độ tương đồng giữa tài liệu ứng viên $d$ và tài liệu $d_j$ đã có trong $S$.
* $\lambda \in [0, 1]$: Hệ số điều chỉnh:
  * Khi $\lambda = 1$: Thuật toán trở thành tìm kiếm tương đồng tiêu chuẩn (Standard Similarity Search).
  * Khi $\lambda = 0$: Thuật toán tối đa hóa sự khác biệt giữa các tài liệu.
  * Thông thường trong RAG chọn $\lambda \in [0.5, 0.7]$ để đảm bảo tài liệu vừa đúng chủ đề vừa bổ sung thông tin mới.

---

## Ý nghĩa trong Hệ thống RAG

* Ngăn ngừa việc 3–5 chunk tài liệu cùng diễn đạt một ý chiếm trọn toàn bộ không gian context window.
* Mở rộng góc nhìn và bằng chứng đa dạng cho LLM trước khi tổng hợp câu trả lời.

---

## Mệnh đề tri thức liên quan

* [[MMR chống trùng lặp context bằng cách cân bằng giữa độ liên quan và độ phân kỳ]]
* [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]]
* [[Context Engineering]]
