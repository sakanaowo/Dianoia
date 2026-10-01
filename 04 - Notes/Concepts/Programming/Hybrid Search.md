---
type: concept
status: growing
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - concept
  - rag
  - search
  - hybrid-search
  - bm25
created: 2026-09-20
updated: 2026-09-20
---

# Hybrid Search

## Định nghĩa

**Hybrid Search** (Tìm kiếm hỗn hợp) là phương pháp kết hợp đồng thời hai hoặc nhiều kỹ thuật truy xuất thông tin khác nhau — điển hình nhất là sự kết hợp giữa **Dense Semantic Search** (tìm kiếm theo khoảng cách vector nhúng) và **Sparse Lexical Search** (tìm kiếm theo tần suất từ khóa BM25 / TF-IDF) — nhằm tận dụng tối đa thế mạnh và bù trừ khiếm khuyết của từng phương pháp.

---

## Kiến trúc và Thành phần

1. **Vector Search Engine (Dense):**
   * Sử dụng embedding model biến đổi văn bản thành vector số học đặc.
   * Chuyên trách nhận diện ý định ngữ nghĩa trừu tượng, xử lý paraphrase và dịch nghĩa liên ngôn ngữ.
2. **Lexical Search Engine (Sparse):**
   * Sử dụng cấu trúc chỉ mục đảo (*Inverted Index*) của thuật toán BM25.
   * Chuyên trách khớp chính xác các thực thể cụ thể: mã định danh, số hợp đồng, mã lỗi kỹ thuật, tên riêng, thuật ngữ pháp lý.
3. **Fusion Layer (Tầng dung hợp kết quả):**
   * Tiếp nhận hai danh sách kết quả từ hai cỗ máy và dung hợp thành một danh sách xếp hạng duy nhất:
     * *Reciprocal Rank Fusion (RRF):* Xếp hạng dựa trên vị trí thứ bậc nghịch đảo, không phụ thuộc vào thang điểm số học.
     * *Alpha Weighting (Score Fusion):* Kết hợp điểm số theo trọng số $\alpha \cdot S_{dense} + (1-\alpha) \cdot S_{sparse}$ sau khi chuẩn hóa.

---

## Ứng dụng thực tế

* Là cấu hình tìm kiếm tiêu chuẩn (*production-grade*) cho các hệ thống RAG doanh nghiệp.
* Thử nghiệm thực tế chứng minh việc bổ sung BM25 vào hệ thống Dense-only giúp tăng tỷ lệ lấy đúng chunk (Recall) từ 60% lên 90% với chi phí tính toán thấp.

---

## Mệnh đề tri thức liên quan

* [[Hybrid search kết hợp Dense và Sparse giải quyết nghịch lý từ khóa và ngữ nghĩa]]
* [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]]
* [[Day 07 - Data Foundation và Kiến trúc RAG]]
* [[Vector Store]]
