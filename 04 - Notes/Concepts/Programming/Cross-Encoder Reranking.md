---
type: concept
status: growing
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - concept
  - rag
  - reranking
  - cross-encoder
  - information-retrieval
created: 2026-09-20
updated: 2026-09-20
---

# Cross-Encoder Reranking

## Định nghĩa

**Cross-Encoder Reranking** là kỹ thuật tái xếp hạng các tài liệu ứng viên ở tầng Post-Retrieval trong hệ thống RAG, bằng cách đưa đồng thời cặp câu hỏi và tài liệu `[Query, Document]` vào một mô hình Transformer để tính toán sự tương tác qua lại (*Cross-Attention*) giữa tất cả các token, tạo ra điểm số tương đồng ngữ cảnh sâu sắc và chuẩn xác hơn nhiều so với phương pháp Bi-Encoder.

---

## Cơ chế So sánh: Bi-Encoder vs. Cross-Encoder

1. **Bi-Encoder (Mô hình 2 tháp độc lập):**
   * Query và Document được chuyển đổi thành 2 vector độc lập $v_q$ và $v_d$.
   * Đo khoảng cách bằng tích vô hướng hoặc Cosine similarity: $s = \cos(v_q, v_d)$.
   * *Ưu điểm:* Tốc độ cực nhanh ($O(1)$ cho mỗi cặp sau khi đã tiền tính toán vector), có thể index trước hàng triệu tài liệu.
   * *Hạn chế:* Các token không có cơ hội tương tác với nhau, dễ xếp sai thứ tự các tài liệu then chốt.
2. **Cross-Encoder (Mô hình tương tác toàn phần):**
   * Ghép chuỗi đầu vào theo dạng: `[CLS] Query [SEP] Document [SEP]`.
   * Từng từ trong câu hỏi được soi chiếu trực tiếp với từng từ trong văn bản qua toàn bộ các tầng Attention.
   * *Ưu điểm:* Điểm số chính xác vượt trội, nhận thức được các sắc thái ngữ nghĩa tinh tế và mối quan hệ phủ định/điều kiện.
   * *Hạn chế:* Chi phí tính toán cao, độ trễ lớn; do đó chỉ áp dụng để tái sắp xếp cho tập nhỏ (Top 50–100 tài liệu).

---

## Ứng dụng trong RAG Pipeline

* Mô hình chuẩn hai giai đoạn: **Fast Retrieval (Bi-Encoder + BM25)** $\rightarrow$ **Precision Reranking (Cross-Encoder)**.
* Các mô hình phổ biến: BGE-Reranker (Large/Base), Cohere Rerank API, MonoT5.

---

## Mệnh đề tri thức liên quan

* [[Cross-encoder reranking đánh đổi độ trễ để nâng cao độ chính xác sau retrieval]]
* [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]]
* [[Hybrid Search]]
