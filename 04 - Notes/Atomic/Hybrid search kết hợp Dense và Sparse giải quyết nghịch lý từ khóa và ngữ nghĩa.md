---
type: atomic
status: growing
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - atomic
  - rag
  - hybrid-search
  - retrieval
  - bm25
created: 2026-09-20
updated: 2026-09-20
---

# Hybrid search kết hợp Dense và Sparse giải quyết nghịch lý từ khóa và ngữ nghĩa

## Mệnh đề cốt lõi

Việc chỉ dựa vào tìm kiếm ngữ nghĩa qua không gian vector đặc (Dense Vector Search) hoặc tìm kiếm từ khóa qua chỉ mục thưa (Sparse Vector / BM25) đều dẫn đến thất bại trong môi trường sản xuất thực tế; giải pháp tối ưu là **Hybrid Search** kết hợp song song cả hai luồng và hợp nhất kết quả bằng thuật toán dung hợp (RRF hoặc Alpha Weighting).

---

## Bối cảnh và Phân tích kỹ thuật

1. **Nghịch lý của Dense Semantic Search:**
   * Mô hình embedding nén toàn bộ ngữ nghĩa vào vector ngắn (768–1536 chiều).
   * Rất mạnh trong việc hiểu từ đồng nghĩa, paraphrase và tìm kiếm xuyên ngôn ngữ (ví dụ `"hoàn tiền"` khớp với `"refund"`).
   * Điểm mù chí mạng: Bỏ lỡ hoàn toàn các truy vấn chứa từ khóa kỹ thuật cụ thể, mã lỗi (ví dụ `ERR-4012`), số hiệu hợp đồng, tên riêng hiếm hoặc số hiệu điều khoản luật.

2. **Nghịch lý của Sparse Lexical Search (BM25):**
   * Sử dụng không gian vector thưa thớt có số chiều bằng kích thước từ điển ($50.000+$ chiều).
   * Khớp chính xác tuyệt đối từng từ khóa (*exact keyword match*) với chi phí tính toán cực thấp trên CPU.
   * Điểm mù chí mạng: Không có khả năng hiểu ngữ cảnh (ví dụ truy vấn `"nghỉ phép"` sẽ bỏ lỡ toàn bộ tài liệu chỉ chứa `"annual leave"` hoặc `"PTO"`).

3. **Cơ chế dung hợp (Fusion Layer):**
   * **Reciprocal Rank Fusion (RRF):** $RRF(d) = \sum_{r} \frac{1}{k + rank_r(d)}$ với $k=60$. Chỉ căn cứ vào thứ hạng vị trí, bỏ qua thang điểm số học khác biệt giữa Cosine và BM25. Không cần tuning.
   * **Alpha Weighting (Score Fusion):** $score(d) = \alpha \cdot S_{dense} + (1 - \alpha) \cdot S_{sparse}$. Chuẩn hóa điểm số về $[0, 1]$ và điều chỉnh hệ số $\alpha$ tùy theo loại corpus (FAQ tự nhiên chọn $\alpha \approx 0.6-0.8$; mã code, luật pháp chọn $\alpha \approx 0.2-0.4$).

---

## Bằng chứng thực nghiệm

* Thử nghiệm trên tập dữ liệu kỹ thuật chứa mã lỗi và tên riêng (Case study VinUni AICB Ngày 8):
  * Cấu hình *Dense Only*: đạt $12/20$ câu chính xác ($60\%$).
  * Cấu hình *Hybrid (BM25 + Dense)*: đạt $18/20$ câu chính xác ($90\%$).
* Bổ sung BM25 là cải tiến có chi phí kỹ thuật rẻ nhất nhưng mang lại mức độ cải thiện Recall lớn nhất trước khi tính đến các biện pháp phức tạp hơn như reranking hay fine-tuning.

---

## Giả định và Giới hạn

* Giả định rằng tập dữ liệu có sự đan xen giữa văn phong tự nhiên và các thuật ngữ định danh riêng biệt.
* Nếu toàn bộ tài liệu thuần túy là dữ liệu số có cấu trúc cao, việc truy vấn bằng Text-to-SQL hoặc Metadata Filtering trực tiếp sẽ tối ưu hơn Hybrid Search văn bản.

---

## Liên kết tri thức

* Mở rộng từ: [[Day 07 - Data Foundation và Kiến trúc RAG]]
* Chi tiết phương pháp luận: [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]]
* Khái niệm liên quan: [[Hybrid Search]], [[Vector Store]], [[Metadata Filtering]]
