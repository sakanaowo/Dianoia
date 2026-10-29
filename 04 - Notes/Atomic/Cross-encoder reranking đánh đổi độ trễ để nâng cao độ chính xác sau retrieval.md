---
type: atomic
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - atomic
  - rag
  - reranking
  - cross-encoder
  - latency
created: 2026-09-20
updated: 2026-09-20
---

# Cross-encoder reranking đánh đổi độ trễ để nâng cao độ chính xác sau retrieval

## Mệnh đề cốt lõi

Kiến trúc **Retrieve-and-Rerank 2 giai đoạn** giải quyết mâu thuẫn giữa tốc độ và độ chuẩn xác bằng cách dùng Bi-Encoder (kết hợp BM25) quét thô diện rộng để lấy ra Top 50–100 ứng viên nhanh chóng, sau đó dùng **Cross-Encoder** tính toán ma trận Attention sâu giữa câu hỏi và tài liệu để chọn ra Top 3–5 tinh hoa nhất; sự đánh đổi này làm tăng độ trễ và chi phí tính toán nhưng cứu vớt được các tài liệu đúng bị xếp ở vị trí thấp.

---

## Bối cảnh và Cơ chế kỹ thuật

1. **Hạn chế của Bi-Encoder (Tầng Retrieval):**
   * Mã hóa Query $q$ và Document $d$ thành hai vector độc lập: $v_q = E(q)$, $v_d = E(d)$.
   * Điểm số là khoảng cách Cosine đơn giản: $s = \cos(v_q, v_d)$.
   * Tốc độ cực nhanh (vài mili-giây trên hàng triệu vector), nhưng vì hai chuỗi không tương tác trực tiếp qua lại (*no cross-attention*), mô hình thường xếp tài liệu đúng ở các vị trí Top 8 đến Top 15.

2. **Cơ chế của Cross-Encoder (Tầng Post-Retrieval):**
   * Ghép trực tiếp Query và Document thành một chuỗi duy nhất: $[CLS] + q + [SEP] + d + [SEP]$.
   * Đưa chuỗi vào mô hình ngôn ngữ (như BGE-Reranker, Cohere Rerank, MonoT5) để từng token của Query tương tác trực tiếp với từng token của Document qua toàn bộ các lớp Transformer Attention.
   * Cho ra điểm số tương quan sâu $s_{rel} \in [0, 1]$ chuẩn xác hơn Bi-Encoder rất nhiều.

3. **Đánh đổi kỹ thuật (Engineering Trade-off):**
   * Chi phí tính toán: Bi-Encoder $O(N)$ vector dot products rất nhẹ; Cross-Encoder $O(K)$ full forward passes trên mô hình Transformer. Do đó Cross-Encoder chỉ chạy trên tập nhỏ ($K = 50 - 100$).
   * Độ trễ (Latency): Có thể tăng từ 1s lên 4s (+3s cho mỗi truy vấn người dùng).
   * Chi phí hạ tầng: Đòi hỏi cụm máy chủ GPU tính toán thời gian thực.

---

## Tiêu chí quyết định triển khai

* Chỉ triển khai Cross-Encoder khi bài toán đòi hỏi độ chính xác cao và người dùng chấp nhận độ trễ (ví dụ: công cụ tra cứu nội bộ, phân tích pháp lý, trợ lý y tế).
* Đối với các hệ thống yêu cầu SLA thời gian thực nghiêm ngặt ($<500$ms) hoặc lưu lượng truy vấn cực lớn, nên ưu tiên tối ưu hóa tầng Retrieval bằng Hybrid Search và Metadata Filtering trước khi bổ sung Cross-Encoder.

---

## Liên kết tri thức

* Bối cảnh hệ thống: [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]]
* Khái niệm liên quan: [[Cross-Encoder Reranking]], [[Hybrid Search]], [[Context Engineering]]
