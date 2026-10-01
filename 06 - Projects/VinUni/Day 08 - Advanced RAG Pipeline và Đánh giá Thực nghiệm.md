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
  - day-08
  - advanced-rag
  - hybrid-search
  - reranking
  - evaluation
  - agentic-rag
  - context-engineering
  - system-design
created: 2026-09-20
updated: 2026-09-20
aliases:
  - Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm
  - Advanced RAG Pipeline
  - Hybrid Search và RAG Evaluation
  - AICB Ngày 8
  - AICB Buổi 8
---

# Day 08 — Advanced RAG Pipeline, Context Augmentation & Evaluation Thực Chiến

Bản tổng hợp có hệ thống toàn bộ phương pháp luận về **Advanced RAG Pipeline 6 tầng, Kiến trúc Modular RAG, Kỹ thuật Hybrid Search (Dense Semantic + Sparse BM25), Hợp nhất kết quả qua RRF và Alpha Weighting, Tối ưu hóa Cross-Encoder Reranking, Thuật toán MMR chống trùng lặp, Kỹ nghệ Context Injection & Document Reordering, Grounded Generation & Self-Correction, Agentic RAG (C-RAG, Adaptive RAG, Multi-tool) và Phương pháp luận Evaluation có hệ thống qua CI/CD GitHub Actions** trong chương trình **AI Thực chiến VinUni (Lớp K4A - Giảng viên: M.Sc Trần Minh Tú)**.

> [!TIP] **Tư duy Hệ thống Chỉ đạo**
> *"Một hệ thống RAG đưa vào Production không bao giờ chỉ là một vector database kết nối với một mô hình LLM. Sức mạnh thực tế của RAG nằm ở chốt chặn Pre-retrieval thu hẹp phạm vi, sự kết hợp bù trừ của Hybrid Search, kỷ luật sắp xếp ngữ cảnh ở Augmentation để hóa giải hiện tượng Lost in the Middle, và trên hết là bộ Test Set chuẩn hóa chạy tự động trong CI/CD để chặn đứng mọi sự suy thoái chất lượng (regression)."*

---

## 1. Kiến Trúc Tổng Thể: Từ Tuyến Tính Đến Modular RAG

### 1.1. RAG Pipeline 6 Tầng Chuẩn Hóa

Trong môi trường doanh nghiệp, một chu trình RAG chuyên nghiệp được chuẩn hóa thành 6 pha xử lý liên tục từ lúc người dùng gửi câu hỏi đến khi phản hồi được xuất ra:

![[rag-pipeline-core-techniques.png]]

1. **Pre-Retrieval:** Chuẩn hóa định dạng câu hỏi, sửa lỗi chính tả, nhận diện ý định, chuyển đổi truy vấn (Query Transformation) và kiểm tra an toàn đầu vào.
2. **Retrieval:** Tìm kiếm đa phương thức (Dense Vector, BM25 Lexical, Knowledge Graph, Structured SQL) và truy xuất phân cấp (Parent-Child / Small-to-Big).
3. **Post-Retrieval:** Tái sắp xếp thứ bậc (Cross-encoder reranking), lọc ngưỡng tương đồng, khử trùng lặp và mở rộng độ phủ (MMR), nén ngữ cảnh (Context Compression).
4. **Augmentation:** Đóng gói context window theo cấu trúc phân định rạch ròi, tối ưu hóa ngân sách token, tích hợp metadata xử lý mâu thuẫn và thiết lập căn cứ trích dẫn.
5. **Generation:** Lựa chọn mô hình theo tier phù hợp (Frontier vs. Mid vs. Small), sinh có căn cứ (Grounded Generation), lý luận đa bước và định dạng dữ liệu có cấu trúc.
6. **Post-Generation:** Thẩm định độ trung thực (Faithfulness scoring), phát hiện ảo giác (Hallucination detection), kiểm tra rò rỉ dữ liệu (PII/DLP), và kích hoạt vòng lặp tự sửa lỗi (Self-Correction).

### 1.2. Kiến Trúc Modular RAG

Kiến trúc đường ống cố định (Linear Pipeline) chỉ phù hợp với các bản demo đồ án cơ bản. Khi đưa vào thực tế với hàng nghìn kịch bản nghiệp vụ phức tạp, hệ thống chuyển dịch sang **Modular RAG**:

![[modular-rag-architecture.png]]

* **Bản chất của Modular RAG:** Hệ thống được tổ chức thành các khối module độc lập có thể cắm ghép (*compose*), thay thế (*replace*), bỏ qua (*skip*) hoặc tạo vòng lặp (*loop*) tùy thuộc vào đặc tính của từng truy vấn.
* **Các module chức năng cốt lõi:**
  * `Query Transformation`: Rewrite, Query Expansion, Multi-Query, Step-back, HyDE.
  * `Routing`: Phân loại intent để định tuyến câu hỏi (Semantic Router, Metadata Router, SQL vs Vector vs Web).
  * `Retrievers`: Kết hợp linh hoạt Dense, Sparse BM25, Graph Retrieval, Structured Database.
  * `Fusion & Reranking`: RRF, Alpha Weighting, Cross-Encoder.
  * `Context Engineering`: Compression, Deduplication, MMR, Reordering, Packing.
  * `Corrective / Adaptive`: Self-RAG, Corrective RAG (C-RAG), Iterative retrieval, Evidence check.
  * `Agentic Orchestration`: Tool calling, Dynamic planning, Reflection.

### 1.3. Cây Quyết Định: Khi Nào Doanh Nghiệp Thật Sự Cần RAG?

![[when-to-use-rag-criteria.png]]

![[knowledge-serving-decision-tree.png]]

* **Cần RAG khi:**
  * Dữ liệu tri thức nội bộ biến động liên tục (chính sách, quy định nhân sự, tài liệu kỹ thuật, bảng giá, log lỗi).
  * Nghiệp vụ bắt buộc câu trả lời phải trích dẫn được nguồn gốc (*Source-aware / Citation-aware*) để con người thẩm định.
  * Việc Fine-tuning quá tốn kém, mất nhiều thời gian chuẩn bị dữ liệu, hoặc dữ liệu nhạy cảm không được phép nạp vào trọng số.
  * Cần kiểm soát và giảm thiểu hiện tượng ảo giác (*hallucination*) một cách có hệ thống.
* **Chưa cần RAG khi:**
  * Câu hỏi thuộc tri thức phổ thông mà LLM nền tảng đã học sâu trong quá trình pre-train.
  * Doanh nghiệp chưa có kho dữ liệu riêng được số hóa và làm sạch.
  * Bài toán sáng tạo tự do, viết nội dung marketing, brainstorm ý tưởng.
  * Kỹ nghệ Prompt Engineering đơn giản hoặc đưa 1–2 tài liệu vào context (In-Context Prompting / CAG) đã giải quyết trọn vẹn bài toán.

---

## 2. Tầng Pre-Retrieval: Tối Ưu Hóa Truy Vấn Đầu Vào

### 2.1. Pre-Filtering: Thu Gọn Phạm Vi Trước Khi Search

Khi chỉ mục vector lên đến hàng triệu chunk, việc tính toán khoảng cách cosine trên toàn bộ không gian dữ liệu sẽ làm tăng độ trễ và kéo theo nhiều kết quả nhiễu (*semantic noise*). **Pre-filtering** sử dụng các trường thuộc tính nghiệp vụ để cắt tỉa không gian tìm kiếm trước khi chạy thuật toán vector:

![[pre-retrieval-metadata-filtering.png]]

* **Các trường Metadata bộ lọc chuẩn:**
  * `department`: Giới hạn phạm vi theo phòng ban phụ trách (CS, HR, Legal, Tech).
  * `date`: Giới hạn khoảng thời gian hiệu lực (`gte`, `lte`).
  * `doc_type`: Lọc theo loại văn bản (SOP, Contract, Policy, UserManual).
  * `access_level`: Lọc theo quyền truy cập của người dùng (`user`, `manager`, `admin`).
* **Hiệu quả kép:** Vừa giảm thời gian tính toán của Index ($n \ll N$), vừa nâng cao độ chuẩn xác (*Precision*) của tài liệu lấy về.

### 2.2. Query Normalization

Trước khi thực hiện bất kỳ phép tìm kiếm nào, câu hỏi của người dùng phải đi qua đường ống chuẩn hóa văn bản:

![[query-normalization-techniques.png]]

1. **Text/Format Normalization:** Cắt tỉa khoảng trắng dư thừa, chuẩn hóa dấu ngắt câu, loại bỏ các ký tự đặc biệt vô nghĩa.
2. **Spelling & Typo Correction:** Tự động sửa các lỗi gõ phím và chính tả phổ biến nhằm tránh trượt từ khóa trên chỉ mục BM25.
3. **Terminology / Synonym Normalization:** Ánh xạ các thuật ngữ chuyên ngành và từ đồng nghĩa về dạng danh từ chuẩn (*canonical form*).
4. **Acronym & Abbreviation Resolution:** Giải mã các từ viết tắt phổ biến thành cụm từ đầy đủ (ví dụ: `LLM for RAG` $\rightarrow$ `large language model for retrieval-augmented generation`).
5. **Language Normalization:** Nhận diện ngôn ngữ đầu vào và chuyển ngữ sang ngôn ngữ chính của kho dữ liệu để tối ưu hóa không gian embedding.

### 2.3. Query Transformation

Đối với những câu hỏi phức tạp hoặc các câu hỏi trong luồng đàm thoại nhiều lượt, hệ thống áp dụng các chiến thuật biến đổi truy vấn:

![[query-transformation-techniques.png]]

* **Rewriting & Simplification:** Viết lại câu hỏi rõ ràng, gãy gọn, loại bỏ các từ đệm và định ngữ gây nhiễu.
* **Query Expansion:** Mở rộng câu hỏi bằng cách bổ sung các từ đồng nghĩa và khái niệm liên quan lân cận.
* **Decomposition (Phân rã câu hỏi):** Tách câu hỏi đa ý phức tạp thành chuỗi các câu hỏi con độc lập để truy xuất từng mảnh thông tin riêng biệt.
* **Multi-query Generation:** Dùng một mô hình LLM nhỏ sinh ra 3–5 phiên bản diễn đạt khác nhau của cùng một ý định để vét cạn tài liệu (*maximize recall*).
* **Contextualization (Giải quyết đồng tham chiếu - Coreference Resolution):** Tích hợp ngữ cảnh lịch sử đàm thoại để biến các đại từ thay thế (*"ông ấy", "chính sách này", "nó"*) thành danh từ cụ thể, giúp câu hỏi hoàn toàn độc lập (*self-contained*).
* **Translation:** Dịch truy vấn sang ngôn ngữ của cơ sở tri thức để thực thi tìm kiếm xuyên ngôn ngữ (*cross-lingual retrieval*).
* **HyDE (Hypothetical Document Embeddings):** Cho LLM sinh một đoạn câu trả lời giả định, sau đó dùng chính vector của đoạn giả định này để truy xuất tài liệu thực tế. Đoạn giả định mang ngữ nghĩa của câu trả lời nên nằm gần các tài liệu liên quan trong không gian vector hơn là câu hỏi ban đầu.

---

## 3. Tầng Retrieval: Nghệ Thuật Tìm Kiếm Hỗn Hợp (Hybrid Search)

### 3.1. Hai Trường Phái Tìm Kiếm Cốt Lõi: Dense vs. Sparse

Trong hệ thống RAG thực chiến, không có phương pháp tìm kiếm nào là hoàn hảo khi đứng một mình:

![[dense-vs-sparse-search-comparison.png]]

![[dense-vs-sparse-matrix-visualization.png]]

* **Dense Vector (Semantic Search):**
  * Vector ngắn, đặc (768 đến 1536 chiều), mọi chiều đều mang giá trị số thực khác 0. Nén toàn bộ ngữ nghĩa sâu vào không gian toán học.
  * *Ưu điểm:* Hiểu ngữ cảnh trừu tượng, xử lý tuyệt vời từ đồng nghĩa, paraphrase và xuyên ngôn ngữ (`"hoàn tiền"` tương đồng cao với `"refund"`).
  * *Hạn chế:* Bỏ lỡ các từ khóa chính xác tuyệt đối như mã lỗi (`ERR-4012`), mã SKU sản phẩm, số hiệu hợp đồng, tên riêng ít phổ biến.
* **Sparse Vector (Lexical Search - BM25 / TF-IDF):**
  * Vector rất dài có số chiều bằng kích thước từ điển ($50.000+$ từ), nhưng đại đa số các chiều đều bằng 0 (thưa thớt). Chỉ những từ xuất hiện trong văn bản mới có trọng số.
  * *Ưu điểm:* Khớp chính xác tuyệt đối từng từ khóa (*Exact match*), mã lỗi, tên riêng. Tốc độ tính toán trên CPU cực nhanh, không cần GPU.
  * *Hạn chế:* Hoàn toàn mù mờ trước ngữ nghĩa và từ đồng nghĩa (`"hoàn tiền"` không khớp `"refund"`; `"nghỉ phép"` bỏ lỡ tài liệu ghi `"PTO"`).

![[dense-semantic-search-characteristics.png]]

![[sparse-lexical-search-bm25.png]]

### 3.2. Kiến Trúc Hybrid Search Độc Lập

Để hóa giải khiếm khuyết của cả hai trường phái, kiến trúc tiêu chuẩn đưa câu hỏi qua đồng thời hai cỗ máy tìm kiếm:

![[hybrid-search-cluster-architecture.png]]

* **Luồng xử lý:**
  1. `User Query` được gửi song song vào **Vector Engine** (Dense Semantic Search) và **Keyword Engine** (BM25 Inverted Index).
  2. Hai cỗ máy trả về hai danh sách kết quả độc lập kèm điểm số tương ứng.
  3. **Fusion Layer** tiếp nhận và dung hợp hai danh sách thành một bảng xếp hạng duy nhất trước khi trả về Top-K.

### 3.3. Hai Thuật Toán Dung Hợp Kết Quả: RRF vs. Alpha Weighting

![[hybrid-fusion-rrf-vs-alpha-weighting.png]]

#### Phương pháp 1: Reciprocal Rank Fusion (RRF)
$$RRF(d) = \sum_{r \in \{dense, sparse\}} \frac{1}{k + rank_r(d)}$$
* **Bản chất:** Hoàn toàn bỏ qua điểm số thô (vì điểm Cosine và điểm BM25 không cùng thang đo và phân phối); chỉ căn cứ vào **thứ hạng vị trí ($rank$)** của tài liệu trong từng danh sách.
* **Hằng số $k$:** Thường được chọn mặc định là $60$ để giảm thiểu độ nhạy đối với các tài liệu ở thứ hạng quá thấp.
* **Đặc tính:** Vô cùng ổn định, chạy được ngay mà không cần tinh chỉnh tham số (*zero-tuning*). Là lựa chọn khởi điểm tối ưu cho mọi hệ thống.

#### Phương pháp 2: Alpha Weighting (Score Fusion)
$$score(d) = \alpha \cdot S_{dense}(d) + (1 - \alpha) \cdot S_{sparse}(d)$$
* **Bản chất:** Sử dụng trực tiếp điểm số tương đồng sau khi đã chuẩn hóa về đoạn $[0, 1]$.
* **Hệ số $\alpha \in [0, 1]$:** Cân chỉnh tỷ trọng ảnh hưởng giữa ngữ nghĩa và từ khóa:
  * Kho dữ liệu FAQ, tư vấn dịch vụ: $\alpha \approx 0.7 - 0.9$ (ưu tiên ngữ nghĩa).
  * Kho dữ liệu luật, chính sách, mã code, log lỗi: $\alpha \approx 0.2 - 0.4$ (ưu tiên từ khóa).

### 3.4. Tuning $\alpha$: Đừng Đoán, Hãy Đo!

Việc thiết lập tham số $\alpha$ bắt buộc phải thông qua kiểm thử thực nghiệm (*Grid Search*):

![[tuning-alpha-grid-search-methodology.png]]

* **Quy trình 4 bước chuẩn:**
  1. Chuẩn bị tập Test Set gồm 15–20 câu hỏi đại diện có gán nhãn chunk đúng (*ground truth*).
  2. Quét giá trị $\alpha \in \{0.0, 0.2, 0.4, 0.6, 0.8, 1.0\}$.
  3. Đo lường tỷ lệ phần trăm câu hỏi lấy được chunk đúng nằm trong Top-K ($k=5$).
  4. Lựa chọn giá trị $\alpha^*$ đạt đỉnh trên đồ thị thực nghiệm (ví dụ $\alpha^* = 0.6$ đạt độ chính xác 85%, vượt trội so với 50% của Dense-only và 45% của Sparse-only).

### 3.5. Ma Trận 3 Loại Corpus Tri Thức

Bản chất của kho dữ liệu doanh nghiệp sẽ định đoạt chiến lược lựa chọn kiến trúc:

![[corpus-types-rag-strategy-matrix.png]]

| Nhóm Corpus | Đặc tính dữ liệu | Thách thức chính | Loại Embedding / Tìm kiếm | Đưa vào Context Window? | Khuyến nghị kỹ thuật |
|---|---|---|---|---|---|
| **News (Tin tức)** | Văn xuôi, câu tự nhiên, cập nhật thời sự liên tục | Paraphrase cao, nhiều bài viết cùng đề tài | **Dense (Semantic)** | Thường không (quá dài) | Lọc theo thời gian, lọc nguồn uy tín, chunking theo đoạn/tiểu mục. |
| **Law (Luật, Quy định)** | Cấu trúc chặt chẽ (Điều, Khoản), thuật ngữ pháp lý cố định | Dễ nhầm lẫn số điều, ngoại lệ, ngày hiệu lực | **Sparse (BM25 / Lexical)** | Thường không (quá dài) | Parse cấu trúc phân tầng (Điều/Khoản), lưu metadata số điều, ưu tiên BM25. |
| **Cards (Hồ sơ, Profile)** | Nhiều tên riêng, số định danh, các mẫu biểu tương tự nhau | Nhiều bản ghi trùng form, rất dễ nhầm lẫn | **Hybrid (Dense + Sparse)** | **Có** (ngắn, ổn định) | Chunk theo trường dữ liệu (field-based), lọc cứng bằng Metadata ID. |

---

## 4. Tầng Post-Retrieval: Precision Reranking & Đa Dạng Hóa Ngữ Cảnh

### 4.1. Reranking: Giải Pháp Khắc Phục Điểm Mù Của Bi-Encoder

Các thuật toán ở tầng Retrieval (Bi-Encoder) mã hóa câu hỏi và văn bản hoàn toàn độc lập để đảm bảo tốc độ quét diện rộng. Do không có sự tương tác qua lại giữa các token (*cross-attention*), tài liệu quan trọng nhất đôi khi chỉ xếp ở vị trí thứ 8 hoặc thứ 10:

![[reranking-bi-encoder-vs-cross-encoder.png]]

* **Mô hình Retrieve-and-Rerank 2 giai đoạn:**
  * **Giai đoạn 1 (Lọc thô diện rộng):** Sử dụng Hybrid Search quét hàng triệu chunk để lấy ra Top 50–100 tài liệu ứng viên trong vài chục mili-giây.
  * **Giai đoạn 2 (Tái sắp xếp chính xác):** Sử dụng **Cross-Encoder** (BGE-Reranker, Cohere Rerank, MonoT5) đọc đồng thời cặp `[Query, Document]` để tính toán ma trận Attention toàn diện, chấm điểm tương quan sâu sắc và chọn lọc Top 3–5 chunk chuẩn xác nhất cho LLM.

### 4.2. MMR (Maximum Marginal Relevance): Chống Trùng Lặp Thông Tin

Sau bước Rerank, các chunk có nội dung tương tự nhau thường cùng đạt điểm số cao và chiếm lĩnh toàn bộ vị trí đầu bảng. Hiện tượng này làm lãng phí token và hạn chế góc nhìn của mô hình sinh:

![[mmr-maximum-marginal-relevance-formula.png]]

* **Công thức MMR:**
$$MMR = \arg\max_{d \in D \setminus S} \left[ \lambda \cdot Sim(d, q) - (1 - \lambda) \cdot \max_{d_j \in S} Sim(d, d_j) \right]$$
* **Cơ chế hoạt động:**
  1. Chọn chunk có điểm liên quan cao nhất với câu hỏi đưa vào tập $S$.
  2. Với các chunk tiếp theo, tính toán điểm số kết hợp giữa độ liên quan với câu hỏi $Sim(d, q)$ và **độ khác biệt** so với các chunk đã chọn $\max_{d_j \in S} Sim(d, d_j)$.
  3. Lặp lại cho đến khi thu thập đủ số lượng Top-K mong muốn.
  4. Hệ số $\lambda \in [0, 1]$ cho phép cân bằng giữa độ chính xác và độ phân kỳ thông tin (thường chọn $\lambda \approx 0.5 - 0.7$).

![[mmr-visual-analogy-kebab.png]]

* **Phép loại suy trực quan "Tìm Kebab":**
  * *Similarity Search:* Trả về 9 bức ảnh đều là xiên nướng thịt kebab giống hệt nhau. Người dùng chỉ nhìn thấy một khía cạnh duy nhất.
  * *Similarity + MMR:* Trả về xiên nướng, bánh mì cuộn kebab, hộp cơm kebab, đĩa ăn kèm khoai chiên. Cùng thỏa mãn chủ đề kebab nhưng mang lại độ phủ thông tin phong phú hơn rất nhiều.

---

## 5. Tầng Context Augmentation: Kỹ Nghệ Đóng Gói Prompt

### 5.1. Context Injection Là Gì?

Context Injection là quy trình định dạng, cấu trúc và sắp xếp các chunk tài liệu đã được chọn lọc vào trong Context Window của LLM:

![[context-injection-prompt-structure.png]]

* **Nguyên lý cốt lõi:** Context Injection không đơn thuần là phép nối chuỗi văn bản (`text1 + text2`). Cách đóng gói ngữ cảnh quyết định trực tiếp việc LLM có tuân thủ tài liệu hay tự ý phóng tác.
* **Cấu trúc khung 4 khối:**
  1. `[System Rules]`: Bản hợp đồng quy định vai trò, nguyên tắc và thẩm quyền.
  2. `[Retrieved Documents]`: Kho bằng chứng khách quan đã được thẩm định.
  3. `[User Question]`: Câu hỏi nghiệp vụ cần giải quyết.
  4. `[Constraints / Grounding]`: Ranh giới an toàn và ràng buộc trích dẫn.

### 5.2. Phân Tách Bằng XML Tags

Sử dụng các thẻ phân cách tường minh giúp mô hình nhận thức rõ ràng cấu trúc dữ liệu và ngăn chặn hiệu quả các cuộc tấn công Prompt Injection:

![[prompt-isolation-xml-tags.png]]

```xml
<system>
Answer strictly based on the context below.
Cite the relevant source using [doc_id].
If the answer is not present in the context, clearly state that you do not know.
</system>

<context>
[doc_1] hr/leave-policy-v4.pdf | Section 3 | Date: 2026-01-10
Nhan vien duoc nghi 14 ngay phep huong luong moi nam...
[doc_2] hr/onboarding-guide.pdf | Section 1 | Date: 2025-11-20
Quy trinh dang ky nghi phep can nop truoc 3 ngay lam viec...
</context>

<question>
Quy dinh ve so ngay nghi phep nam va thoi han dang ky nhu the nao?
</question>
```

### 5.3. Hóa Giải Hiện Tượng "Lost in the Middle" Bằng Document Reordering

Nghiên cứu khoa học chứng minh LLM tập trung chú ý cao độ vào phần đầu và phần cuối của prompt, trong khi các thông tin nằm ở vùng giữa thường bị bỏ qua:

![[lost-in-the-middle-document-reordering.png]]

* **Thuật toán Document Reordering:**
  * Lấy chunk có độ liên quan cao nhất (**Top 1**) đặt tại **ĐẦU KHỐI CONTEXT**.
  * Lấy chunk quan trọng thứ nhì (**Top 2**) đặt tại **CUỐI KHỐI CONTEXT** (ngay trước câu hỏi của user).
  * Các chunk thứ bậc 3, 4, 5... được xếp xen kẽ ở vùng giữa.
* **Kết quả thực nghiệm:** Đảm bảo các thông tin mang tính quyết định luôn nằm trong vùng chú ý tối đa của mô hình, nâng cao độ đầy đủ của câu trả lời.

### 5.4. Tích Hợp Metadata & Xử Lý Xung Đột Dữ Liệu (Conflict Resolution)

![[metadata-conflict-resolution-strategies.png]]

Khi hai tài liệu trong kho dữ liệu chứa thông tin mâu thuẫn nhau (ví dụ: chính sách cũ ghi 12 ngày phép, chính sách mới ghi 14 ngày phép), việc thiếu vắng metadata sẽ đẩy LLM vào tình thế suy diễn sai lệch.
* **3 Chiến lược giải quyết mâu thuẫn trong Prompt:**
  1. **Recency wins (Ưu tiên tính mới nhất):** Tự động chọn thông tin từ tài liệu có ngày ban hành gần nhất. Áp dụng cho bảng giá, chính sách nhân sự, SOP kỹ thuật.
  2. **Authority wins (Ưu tiên cấp thẩm quyền):** Ưu tiên nguồn văn bản có thẩm quyền pháp lý cao hơn (Văn bản ký duyệt $>$ Email trao đổi $>$ Trang ghi chú nội bộ).
  3. **Surface the conflict (Minh bạch mâu thuẫn):** Liệt kê cả hai nguồn mâu thuẫn kèm ngày tháng và trích dẫn để con người tự đưa ra phán quyết cuối cùng.

### 5.5. Quản Trị Phân Quyền: Pre-Retrieval ACL Filtering

![[access-control-pre-retrieval-acl-filtering.png]]

* **Nguyên tắc bảo mật:** Tuyệt đối không sử dụng phương pháp lọc sau khi sinh (*Post-generation filtering*) vì vừa làm tăng chi phí token, vừa làm chậm hệ thống và tiềm ẩn nguy cơ rò rỉ dữ liệu nhạy cảm qua ảo giác của mô hình.
* **Chuẩn hóa:** Bắt buộc phải gắn metadata phân quyền (`role`, `department`, `classification`) ngay từ pha Ingestion và áp bộ lọc truy cập (*Pre-retrieval filtering*) trực tiếp vào câu lệnh tìm kiếm Vector Store.

### 5.6. Quản Trị Ngân Sách Token & Kỹ Thuật Nén Ngữ Cảnh

![[token-budget-allocation-and-compression.png]]

* **Quy tắc phân bổ Token Budget (20 - 60 - 20):**
  * $20\%$: Dành cho System Instructions, Persona và Output Format.
  * $60\%$: Dành tối đa cho Retrieved Context.
  * $20\%$: Giữ khoảng trống an toàn (*Headroom*) cho User Query và Output Generation.
* **Nén ngữ cảnh (Context Compression):** Nếu khối context vượt quá ngưỡng $60\%$, sử dụng các công cụ nén chuyên dụng như **LLMLingua** hoặc **Recomp** để lược bỏ các token dư thừa mà không làm suy giảm hàm lượng thông tin.

---

## 6. Tầng Generation & Post-Generation: Grounding & Phòng Vệ Lỗi

### 6.1. Phân Tầng Lựa Chọn LLM & Routing Đa Cấp

Chiến lược tối ưu hóa chi phí và hiệu năng cho hệ thống RAG quy mô lớn:

![[llm-selection-and-tier-routing.png]]

* **Frontier / Reasoning Tier (Claude 3.5 Sonnet, GPT-4o):** Dành cho các tác vụ suy luận đa bước phức tạp, tổng hợp tài liệu dài, hoặc giải quyết các mâu thuẫn tri thức đa chiều.
* **Mid Tier (Mặc định cho Production RAG):** Cân bằng hoàn hảo giữa chất lượng, độ trễ và chi phí token. Đủ năng lực đọc hiểu context và sinh câu trả lời có dẫn chứng chính xác.
* **Small / Self-hosted Tier (Llama 3 8B, Mistral 7B):** Dành cho tra cứu dữ liệu đơn giản, trích xuất thực thể, hoặc các môi trường on-premise yêu cầu bảo mật dữ liệu tuyệt đối.

### 6.2. Grounded Generation & Trích Dẫn Nguồn (Citation)

![[grounded-and-citation-aware-generation.png]]

* **Context-grounded:** Mô hình chỉ được phép đưa ra khẳng định dựa trên các sự thật có trong context. Tri thức nền tảng của LLM chỉ đóng vai trò phân tích câu cú và tổng hợp văn phong.
* **Citation-aware:** Mỗi khẳng định nghiệp vụ phải đi kèm ký hiệu nguồn dẫn `[1]`, `[2]` tương ứng với `doc_id` của tài liệu tham khảo ở cuối bài.

### 6.3. Kiểm Soát Đầu Ra & Vòng Lặp Tự Sửa Lỗi (Self-Correction)

![[output-control-formatting-and-safety.png]]

![[self-correction-evaluation-loop.png]]

* **Output Control:** Ràng buộc chặt chẽ định dạng trả về (Markdown Table, JSON Schema) và áp bộ lọc an toàn đầu ra (loại bỏ PII, kiểm tra DLP).
* **Vòng lặp Self-Correction:**
  * Mô hình tự kiểm tra bản nháp câu trả lời so với các chunk trong context trước khi hiển thị cho người dùng.
  * Nếu phát hiện thông tin tự suy diễn không có căn cứ $\rightarrow$ Tự động sinh lại (*Retry*) hoặc chuyển sang trạng thái từ chối (*Abstain*).

### 6.4. Strict Grounding vs. Graceful Degradation

![[strict-grounding-vs-graceful-abstention.png]]

1. **Strict Grounding (Context-only):** Khi tài liệu không chứa câu trả lời, mô hình dứt khoát phản hồi: *"Không có thông tin trong tài liệu đã cung cấp."* Phù hợp cho pháp lý và chính sách nghiêm ngặt.
2. **Graceful Degradation (Từ chối lịch thiệp & Hướng dẫn tiếp theo):** Mô hình thông báo việc chưa tìm thấy thông tin trong cơ sở dữ liệu hiện tại, đồng thời gợi ý các từ khóa liên quan hoặc hướng dẫn người dùng liên hệ kênh hỗ trợ phù hợp.

### 6.5. Các Mẫu Lỗi Sinh (Generation Failure Patterns) & Nguyên Tắc Vàng Debug

![[generation-failure-patterns-and-debugging.png]]

* **3 Mẫu lỗi phổ biến:**
  1. *Xung đột ngữ cảnh:* Tài liệu mâu thuẫn khiến LLM chọn bừa hoặc cộng gộp $\rightarrow$ Thiết lập quy tắc giải quyết mâu thuẫn trong prompt.
  2. *Suy diễn quá đà (Extrapolation):* Tự ý suy luận mở rộng ra ngoài phạm vi tài liệu $\rightarrow$ Bổ sung negative constraint nghiêm cấm suy đoán.
  3. *Bỏ qua ràng buộc (Ignore Constraints):* Quên trích dẫn citation $\rightarrow$ Đặt các rule quan trọng nhất ở **CUỐI PROMPT** (ngay sát chữ `Answer:`), đồng thời hạ `temperature = 0`.
* **Quy tắc vàng Debug RAG:**
  > *"In toàn bộ `formatted_context` ra log kiểm tra:*
  > *- Nếu Context CÓ đáp án mà LLM trả lời sai $\rightarrow$ Lỗi **Generation** (sửa Prompt, hạ Temperature, đổi Model).*
  > *- Nếu Context KHÔNG CÓ đáp án $\rightarrow$ Lỗi **Retrieval** (sửa Chunking, kiểm tra Embedding, bật Hybrid Search)."*

---

## 7. Agentic RAG: Vòng Lặp Suy Luận & Sử Dụng Công Cụ

### 7.1. Các Vòng Lặp Suy Luận (Reasoning Loops)

Agentic RAG nâng cấp hệ thống từ việc tìm kiếm một lượt đơn lẻ (*single-shot search*) thành một chu trình tương tác và suy luận có mục đích:

![[agentic-rag-reasoning-loops.png]]

* **Self-Query:** Agent tự động phân tích câu hỏi phức tạp, tự sinh các truy vấn con, tự gọi công cụ tìm kiếm nhiều lần và tổng hợp kết quả.
* **Corrective RAG (C-RAG):** Agent tự thẩm định chất lượng của các tài liệu lấy về từ Vector Store. Nếu phát hiện tài liệu rác hoặc không đủ thông tin, Agent tự động kích hoạt tìm kiếm Web hoặc báo lỗi.
* **Adaptive RAG:** Agent tự động đánh giá độ phức tạp của câu hỏi: câu hỏi đơn giản được trả lời ngay; câu hỏi phức tạp kích hoạt chu trình tìm kiếm chuyên sâu đa nguồn.

### 7.2. Tích Hợp Đa Nguồn Công Cụ (Tool Use)

![[agentic-rag-tool-use-architecture.png]]

Agent đóng vai trò trung tâm điều phối và kết nối nhiều nguồn tài nguyên khác nhau:
* **Vector Store:** Tra cứu tài liệu nội bộ, chính sách, quy chế.
* **External API:** Kết nối JIRA, CRM, cổng dịch vụ công để lấy trạng thái thời gian thực hoặc tạo ticket tự động.
* **Structured Database:** Truy vấn dữ liệu có cấu trúc bằng Text-to-SQL.
* **Calculator / Code Interpreter:** Thực thi các phép tính toán chính xác tuyệt đối.

---

## 8. RAG Evaluation: Thẩm Định Hệ Thống & Đưa Vào Vận Hành Thực Tế

### 8.1. Rủi Ro Của "Vibe Check"

![[rag-systematic-evaluation-vs-vibe-check.png]]

* **Thực trạng nguy hiểm:** Kiểm thử bằng cách gõ vài câu hỏi ngẫu nhiên trên giao diện web, thấy trả lời trôi chảy thì quyết định deploy hệ thống.
* **Hậu quả:** Không phát hiện được các trường hợp biên (*edge cases*), không phát hiện được sự suy giảm chất lượng (*regression*) khi thay đổi cấu hình prompt hay embedding model, và không có số liệu định lượng để thuyết phục các bên liên quan.
* **Nguyên tắc:** Hệ thống RAG chuyên nghiệp bắt buộc phải có **Test Set cố định + Bảng điểm đo lường định lượng (Scorecard) + Thử nghiệm A/B Testing**.

### 8.2. Xây Dựng Test Set Chuẩn Hóa

![[rag-test-set-construction-standard.png]]

* **Cấu trúc một Test Case chuẩn:**
  ```json
  {
    "question": "Nhan vien thu viec duoc nghi bao nhieu ngay phep?",
    "ground_truth": "Nhan vien thu viec duoc nghi 1 ngay phep sau moi thang lam viec day du theo quy che HR-2026.",
    "expected_chunks": ["hr-leave-v4#section-2"]
  }
  ```
* **Quy mô mẫu kiểm thử:** 15–20 câu hỏi đại diện là đủ để phát hiện regression khi sửa code; 50–100 câu hỏi cho nghiệm thu Production.
* **Nguồn dữ liệu kiểm thử tốt nhất:** Log câu hỏi thật của người dùng (tài nguyên quý giá nhất) $>$ Câu hỏi thường gặp từ team CS/HR $>$ Chuyên gia nghiệp vụ viết tay.
* **Cảnh báo:** Tuyệt đối không dùng LLM sinh toàn bộ test set mà không có sự thẩm định của con người, vì bài test đó chỉ đo xem "mô hình có tự đồng ý với chính nó hay không".

### 8.3. Bằng Chứng Thực Nghiệm Của Hybrid Search

![[case-study-hybrid-search-benchmark.png]]

* **Kết quả đo lường trên tập dữ liệu chứa nhiều tên riêng và mã lỗi:**
  * *V1 Dense Only:* Lấy đúng chunk: **12/20 câu (60%)**. Bỏ lỡ toàn bộ mã lỗi và số ticket kỹ thuật.
  * *V2 Hybrid (BM25 + Dense):* Lấy đúng chunk: **18/20 câu (90%)**. Bắt được chính xác từ khóa chuyên ngành nhờ BM25.
* **Đúc kết:** *Bổ sung BM25 là thay đổi có chi phí rẻ nhất nhưng mang lại mức độ cải thiện Recall lớn nhất — luôn luôn thử nghiệm Hybrid Search trước khi nghĩ đến việc fine-tune hay đổi mô hình đắt tiền hơn.*

### 8.4. CI/CD Cho RAG Evaluation Qua GitHub Actions

![[cicd-rag-evaluation-github-actions.png]]

Quy trình tự động hóa kiểm thử chất lượng RAG trước khi triển khai:
1. Kỹ sư thực hiện commit mã nguồn hoặc cập nhật cấu hình prompt lên GitHub.
2. **GitHub Actions** tự động kích hoạt kịch bản kiểm thử `python eval/run_eval.py` trên bộ Test Set chuẩn hóa.
3. Nếu tất cả các bài kiểm tra (Grounded Answer, Citations, Abstention, Policy Updates) đều đạt ngưỡng quy định $\rightarrow$ **Pass & Tự động Deploy lên Production/Staging**.
4. Nếu phát hiện regression hoặc sai lệch $\rightarrow$ **Block Deploy**, ngăn chặn việc đưa lỗi lên hệ thống đang chạy và gửi thông báo cho đội ngũ phát triển.

### 8.5. Quản Trị Độ Tươi Mới Của Index (Index Freshness)

![[index-freshness-dynamic-ingestion-pipeline.png]]

* **Vấn nạn "Câu trả lời đúng của tuần trước":** Chính sách đã thay đổi nhưng hệ thống vẫn trả về câu trả lời cũ do dữ liệu lỗi thời vẫn tồn tại trong Vector Store.
* **3 Quy tắc bắt buộc trong Pipeline Ingestion:**
  1. **Upsert theo `doc_id`:** Ghi đè tài liệu theo mã định danh duy nhất, loại bỏ triệt để tình trạng hai phiên bản tài liệu cùng tồn tại song song.
  2. **Xóa thật khi thu hồi:** Khi tài liệu bị thu hồi, phải xóa hoàn toàn khỏi cơ sở dữ liệu (bao gồm cả vector và metadata), không dùng cờ xóa mềm (*soft delete*).
  3. **Hiển thị ngày ban hành trên UI:** Giúp người dùng cuối tự thẩm định độ mới của tài liệu trích dẫn.

### 8.6. Bài Toán ROI Của Kỹ Sư Trưởng: Trade-off Giữa Quality, Latency và Cost

![[rag-engineering-roi-tradeoffs.png]]

Trong kỹ thuật phần mềm thực chiến, mọi cải tiến thuật toán đều phải trả giá bằng tài nguyên:
* **Ví dụ:** Thêm một tầng Cross-Encoder Reranker giúp tăng nhẹ $5\%$ độ chính xác của câu trả lời, nhưng làm độ trễ tăng từ $1$s lên $4$s (chậm thêm $3$s cho mỗi request) và chi phí cụm máy chủ GPU tăng gấp đôi ($+\$500$/tháng).
* **Bài toán quyết định:** $5\%$ độ chính xác đó có xứng đáng với trải nghiệm người dùng bị chậm chạp và chi phí hạ tầng tăng vọt hay không? Kỹ sư trưởng luôn phải cân nhắc kỹ lưỡng bài toán đánh đổi giữa **Quality Gain vs. Latency vs. Cost**.

---

## 9. Mạng Lưới Tri Thức & Liên Kết Zettelkasten

* **Liên kết dự án:** [[VinUni - Chương trình Đào tạo AI Thực chiến]]
* **Nền tảng tiền đề:** [[Day 07 - Data Foundation và Kiến trúc RAG]]
* **Kỹ nghệ ngữ cảnh:** [[Context Engineering]]
* **Tương tác công cụ:** [[Tool Calling trong Hệ thống Agent]]
* **Khái niệm cốt lõi:**
  * [[Modular RAG]]
  * [[Hybrid Search]]
  * [[Reciprocal Rank Fusion]]
  * [[Maximum Marginal Relevance]]
  * [[Cross-Encoder Reranking]]
  * [[Context Injection]]
  * [[Document Reordering]]
  * [[Agentic RAG]]
  * [[RAG Evaluation & CI/CD]]
