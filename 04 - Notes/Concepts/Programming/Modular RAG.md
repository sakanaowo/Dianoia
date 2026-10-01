---
type: concept
status: growing
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - concept
  - rag
  - modular-rag
  - architecture
  - system-design
created: 2026-09-20
updated: 2026-09-20
---

# Modular RAG

## Định nghĩa

**Modular RAG** là mô hình kiến trúc tiên tiến của hệ thống Retrieval-Augmented Generation, trong đó toàn bộ quy trình xử lý không bị đóng cứng thành một đường ống tuyến tính (*linear pipeline*) mà được tổ chức thành các **khối chức năng độc lập (modules)**. Các module này có thể tự do kết hợp, sắp xếp, rẽ nhánh định tuyến (*routing*), bỏ qua (*skip*) hoặc kích hoạt lặp lại (*loop*) tùy thuộc vào yêu cầu cụ thể của từng loại truy vấn.

---

## Các Module Cốt Lõi

1. **Pre-Retrieval Modules:**
   * `Query Normalization`: Chuẩn hóa văn bản, sửa lỗi chính tả.
   * `Query Transformation`: Rewrite, Multi-Query, Decomposition, HyDE.
   * `Routing Module`: Phân loại câu hỏi để định tuyến tới nguồn dữ liệu phù hợp (SQL, Vector Store, Web Search, API).
2. **Retrieval Modules:**
   * `Hybrid Retrievers`: Kết hợp Dense, Sparse BM25, Graph Database, Structured Lookup.
   * `Hierarchical Retrievers`: Truy xuất phân tầng (Parent-Child, Small-to-Big).
3. **Post-Retrieval Modules:**
   * `Fusion & Reranking`: Dung hợp điểm số (RRF, Alpha Weighting) và tái xếp hạng bằng Cross-Encoder.
   * `Context Engineering`: Khử trùng lặp (MMR), nén ngữ cảnh (Context Compression), sắp xếp lại tài liệu (Document Reordering).
4. **Generation & Verification Modules:**
   * `Grounded Generation`: Sinh câu trả lời kèm trích dẫn nguồn (*citations*).
   * `Self-Correction & Evaluation`: Kiểm định độ trung thực và tính đầy đủ, tự sửa lỗi trước khi xuất phản hồi.

---

## Lợi ích Kiến trúc

* **Tính linh hoạt:** Tùy biến workflow cho từng loại tác vụ (câu hỏi đơn giản đi thẳng vào LLM nhỏ; câu hỏi phức tạp kích hoạt pipeline đầy đủ).
* **Khả năng mở rộng:** Dễ dàng bổ sung các công cụ và nguồn dữ liệu mới mà không ảnh hưởng đến kiến trúc hiện hành.
* **Tối ưu hóa tài nguyên:** Cân bằng linh hoạt giữa chất lượng, độ trễ và chi phí token.

---

## Mệnh đề tri thức liên quan

* [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]]
* [[Day 07 - Data Foundation và Kiến trúc RAG]]
* [[Hybrid Search]]
* [[Agentic RAG]]
