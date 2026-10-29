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
  - day-07
  - data-foundation
  - rag
  - chunking
  - vector-store
  - embeddings
  - system-design
created: 2026-09-19
updated: 2026-09-19
aliases:
  - Day 07 - Data Foundation và Kiến trúc RAG
  - Data Foundation cho AI
  - RAG Data Foundation
  - AICB Ngày 7
  - AICB Buổi 7
---

# Day 07 — Data Foundation Cho AI & Kiến Trúc Pipeline RAG

Bản tổng hợp có hệ thống toàn bộ phương pháp luận về **Data Foundation, Kiến trúc RAG 2 tầng (Online/Offline), Kim tự tháp chất lượng dữ liệu, 9 chiến lược Chunking, Embedding Models, Vector Store & Quản trị Metadata, Ingestion/Enrichment Pipelines và Kỹ thuật Basic Retrieval** trong chương trình **AI Thực chiến VinUni (Lớp K4A - Giảng viên: M.Sc Trần Minh Tú)**.

> [!TIP] **Tư duy Hệ thống Chỉ đạo**
> *"Retrieval xuất sắc không đến từ việc đổi một mô hình LLM lớn hơn hay đắt tiền hơn, mà đến từ Chunking đúng, Metadata đủ và Filter hợp lý. Nguyên lý cốt tử của Data Foundation: 'Garbage In, Garbage Out' — tuyệt đối không bao giờ index trực tiếp dữ liệu thô (Raw) rồi kỳ vọng thuật toán tìm kiếm vector sẽ tự động chữa lành mọi sai sót."*

---

## 1. 4 Phương Thức Cung Cấp Tri Thức Cho Mô Hình AI

Khi mô hình nền tảng (Foundation Model) không có sẵn tri thức cần thiết (dữ liệu nội bộ doanh nghiệp, thông tin thời gian thực, tài liệu nhạy cảm hoặc tri thức miền sâu), kỹ sư AI có 4 con đường kỹ thuật để nạp tri thức:

![[Pasted image 20260919092040.png]]

| Tiêu chí | In-Context (Prompt Stuffing) | CAG (Cache-Augmented) | RAG (Retrieval-Augmented) | Finetuning (Fine-tuning) |
|---|---|---|---|---|
| **Cơ chế** | Nhồi toàn bộ tài liệu thô vào context window | Tận dụng Prompt Caching (KV Cache) của model | Tìm kiếm đoạn văn liên quan trong Database (Vector/Graph/Fulltext) rồi inject | Huấn luyện tiếp các tham số trọng số của mô hình trên tập dataset |
| **Độ trễ (Latency)** | Tăng theo độ dài prompt ($O(N)$) | Cực thấp (gần như tức thì) | Trung bình (cần thời gian query vector store và rerank) | Rất thấp (tri thức đã nằm trong trọng số) |
| **Chi phí Token** | Rất đắt nếu query lặp đi lặp lại | Rẻ hơn 80–90% nhờ cache prefix tĩnh | Tiết kiệm token (chỉ nạp top-$k$ chunks liên quan nhất) | Tốn chi phí GPU train ban đầu, rẻ khi infer |
| **Khả năng mở rộng** | Rất hạn chế (chạm trần token limit) | Mức vừa (vài chục nghìn đến vài trăm nghìn token) | **Không giới hạn** (hàng triệu/hàng tỷ tài liệu) | Phụ thuộc dung lượng tham số mô hình |
| **Cập nhật tri thức** | Ngay lập tức | Ngay lập tức khi đổi cache key | Ngay lập tức (chỉ cần Upsert/Delete bản ghi) | Rất chậm (phải chuẩn bị data và train lại) |
| **Hiện tượng quên** | Không bị | Không bị | Không bị | Nguy cơ cao (*Catastrophic Forgetting*) |
| **Phù hợp nhất khi** | 1–2 tài liệu ngắn, tác vụ phân tích 1 lần | Chính sách nội bộ cố định, catalog sản phẩm ít đổi | Corpus tri thức lớn, biến động liên tục, cần trích dẫn nguồn | Rèn luyện giọng điệu (Persona), format đầu ra, bài toán miền hẹp |

---

## 2. Kiến Trúc RAG Phân Tầng: Online vs. Offline

Một hệ thống tri thức sản phẩm chuyên nghiệp không bao giờ là một script Python đơn lẻ, mà luôn được phân rã thành hai phân hệ hoàn toàn tách biệt:

![[Pasted image 20260919092358.png]]

### 2.1. Tầng Offline (Data Preparation & Storage Layer)
* **Storage Layer:**
  * *Landing / Staging (Object Storage):* Lưu trữ tài liệu gốc và tài liệu sau bóc tách thô.
  * *Media Storage:* Tách riêng hình ảnh, video, đồ thị ra khỏi văn bản để phục vụ hiển thị đa phương thức.
  * *VectorDB & GraphDB:* Lưu trữ không gian vector số học và mạng lưới quan hệ thực thể.
  * *Composition Storage:* Lưu các bản tổng hợp, tài liệu đã làm giàu metadata.
* **Các Pipeline chuyên trách:**
  1. *Ingestion Pipeline:* Kiểm soát định dạng đầu vào (Input Validation) $\rightarrow$ Bóc tách văn bản/hình ảnh $\rightarrow$ Chuẩn hóa văn bản (Lint & Normalize).
  2. *Indexing Pipeline:* Chunking văn bản $\rightarrow$ Chạy mô hình Embedding $\rightarrow$ Đẩy vào VectorDB.
  3. *Compilation / Enrichment Pipeline:* Trích xuất thực thể/quan hệ $\rightarrow$ Đẩy vào GraphDB; sinh tóm tắt đa tầng (Summarization); gán nhãn tự động (Auto-tagging).

### 2.2. Tầng Online (Real-time Serving Layer)
Chuỗi xử lý trực tiếp khi nhận câu hỏi từ người dùng:
1. **Pre-Retrieval:** Phân tích câu hỏi, sửa lỗi chính tả, viết lại truy vấn (Query Rewriting / Expansion), trích xuất metadata filter.
2. **Retrieval:** Truy vấn đồng thời trên VectorDB (ngữ nghĩa) và Keyword Index (BM25), kết hợp đồ thị GraphDB.
3. **Post-Retrieval:** Chấm điểm lại (Reranking bằng Cross-Encoder), lọc ngưỡng tương đồng (*Score Threshold*), cắt tỉa context trùng lặp.
4. **Augmentation:** Đóng gói context vào Prompt Template kèm trích dẫn (Citations) và các ràng buộc phòng vệ.
5. **Generation & Post-Generation:** LLM suy luận và sinh câu trả lời; lớp guardrail kiểm tra hallucination và an toàn nội dung trước khi trả về cho client.

---

## 3. Quản Trị Dữ Liệu & Kim Tự Tháp Chất Lượng (Data Quality Pyramid)

### 3.1. Kim tự tháp chất lượng dữ liệu
Dữ liệu càng lên cao trong kim tự tháp thì độ tinh khiết và giá trị cho AI càng lớn:

![[Pasted image 20260919092616.png]]

* **Raw:** Bản scan PDF bị mờ, OCR nhận diện sai ("đổi trả" thành "d0i trả"), HTML bẩn chứa code JavaScript/CSS.
* **Cleaned:** Sửa chính tả, chuẩn hóa Unicode UTF-8 NFC, loại bỏ ngắt trang vô nghĩa, loại bỏ số trang lặp lại.
* **Structured:** Phân đoạn theo cấu trúc logic của tài liệu (Heading Markdown, bảng biểu trọn vẹn, danh sách mục).
* **Enriched:** Bổ sung các chiều thông tin ngữ nghĩa: phòng ban phụ trách, ngày hiệu lực, cấp độ bảo mật, nhãn chủ đề.

### 3.2. 4 Trụ cột Quản trị Dữ liệu (Data Governance)
1. **Data Ownership:** Mỗi kho tài liệu phải có phòng ban làm chủ (Owner). Khi chính sách thay đổi, owner có trách nhiệm trigger pipeline cập nhật lại tri thức.
2. **Access Control (ACL):** Phải phân quyền truy xuất ngay từ bước retrieval. Người dùng cấp nhân viên không được phép retrieve dữ liệu tài chính mật dù câu hỏi có độ tương đồng ngữ nghĩa cao.
3. **Data Freshness:** Cơ chế đồng bộ dữ liệu: Real-time (qua Webhooks / CDC - Change Data Capture) đối với operational data, hoặc Batch định kỳ nửa đêm đối với tài liệu chính sách.
4. **PII Masking:** Tự động phát hiện và che giấu thông tin định danh cá nhân (số tài khoản, CCCD, mật khẩu) trước khi đưa vào vector store để bảo vệ quyền riêng tư và tuân thủ pháp luật.

---

## 4. Bách Khoa Toàn Thư Về Chiến Lược Chunking

> [!NOTE] **Khái niệm cốt tử**
> Chunking là **quyết định thiết kế kiến trúc (Architecture Design Decision)**, tuyệt đối không phải là tham số mặc định ngẫu nhiên trong thư viện.

### 4.1. So sánh 9 Chiến lược Chunking (Phân loại 3 nhóm)

```rich-table
---
version: 2
title: 9 CHIẾN LƯỢC CHUNKING
columns:
  - id: c_foundational
    name: 1. NHÓM NỀN TẢNG
    width: 250
  - id: c_semantic
    name: 2. NHÓM NGỮ NGHĨA
    width: 250
  - id: c_specialized
    name: 3. NHÓM CHUYÊN BIỆT
    width: 270
rows:
  - id: r_1
    cells:
      c_foundational: "**Fixed-size** (Cắt đều)"
      c_semantic: "**Semantic** (Độ lệch cosine)"
      c_specialized: "**Parent-Child** (Small-to-Big)"
  - id: r_2
    cells:
      c_foundational: "**Recursive** (Đệ quy ký tự)"
      c_semantic: "**Sentence-Window** (Ngữ cảnh)"
      c_specialized: "**Hierarchical** (Đa tầng doc)"
  - id: r_3
    cells:
      c_foundational: "**Heading/Structural** (Mục)"
      c_semantic: "**Proposition** (Mệnh đề con)"
      c_specialized: "**Code-aware AST** / **Table-aware**"
styles:
  - target: header
    bg: "#e8f0fe"
    bold: true
---
```

#### Nhóm 1: Nhóm Nền tảng (Foundational)
1. **Fixed-size Chunking:**
   * *Cơ chế:* Cắt cứng mỗi $N$ token (ví dụ: 512 tokens), overlap 10–15% (khoảng 50 tokens) để giữ mạch thông tin ở ranh giới.
   * *Ưu/Nhược:* Cực kỳ đơn giản, tốc độ nhanh, kiểm soát chi phí tốt. Nhược điểm: Cắt ngang giữa câu, ngắt đôi bảng số liệu làm mất nghĩa.
2. **Recursive Character Chunking:**
   * *Cơ chế:* Thử tách tuần tự theo danh sách ký tự phân tách: `["\n\n", "\n", " ", ""]`. Nếu đoạn văn quá dài, hệ thống tách theo dòng; nếu dòng quá dài, tách theo câu.
   * *Ưu/Nhược:* **Lựa chọn mặc định tốt nhất cho văn bản thông thường**, tôn trọng ranh giới ngữ pháp tự nhiên.
3. **Heading / Structural Chunking:**
   * *Cơ chế:* Cắt theo các thẻ tiêu đề Markdown (`#`, `##`, `###`) hoặc thẻ phân đoạn văn bản.
   * *Ưu/Nhược:* Giữ trọn vẹn một ý niệm hoàn chỉnh, metadata thể hiện rõ tiêu đề cha-con. Đòi hỏi tài liệu nguồn phải có định dạng tốt.

#### Nhóm 2: Nhóm Ngữ nghĩa (Semantic)
4. **Semantic Chunking:**
   * *Cơ chế:* Tách văn bản thành từng câu đơn lẻ, embed từng câu rồi tính khoảng cách Cosine giữa câu thứ $i$ và $i+1$. Khi cosine tụt xuống dưới ngưỡng cho phép (*Topic Shift*), hệ thống ngắt chunk tại đó.
   * *Ưu/Nhược:* Chunk hoàn toàn bám sát bước chuyển dịch của chủ đề, không phụ thuộc heading. Nhược điểm: Tốn tài nguyên embedding lúc nạp dữ liệu.
5. **Sentence-Window Retrieval:**
   * *Cơ chế:* Bước Index chỉ nạp **1 câu đơn lẻ** vào Vector Store (để tìm kiếm ngữ nghĩa cực kỳ chính xác và sắc nét). Nhưng khi tìm thấy câu đó, hệ thống sẽ tự động lấy thêm cửa sổ $k$ câu phía trước và $k$ câu phía sau để nạp vào prompt cho LLM.
   * *Ưu/Nhược:* Tránh hiện tượng vector bị loãng do nén cả đoạn văn dài, trong khi LLM vẫn nhận đủ ngữ cảnh xung quanh.
6. **Proposition / Atomic Chunking:**
   * *Cơ chế:* Dùng một mô hình LLM nhỏ viết lại đoạn văn thành các mệnh đề logic độc lập (Atomic Propositions), mỗi mệnh đề chứa trọn vẹn chủ ngữ-vị ngữ tự thân.
   * *Ưu/Nhược:* Chunk đạt độ tinh khiết cao nhất, không chứa thông tin rác. Nhược điểm: Chi phí gọi LLM cao lúc xử lý dữ liệu.

#### Nhóm 3: Nhóm Chuyên biệt (Specialized)
7. **Parent-Child (Small-to-Big):**
   * *Cơ chế:* Chia văn bản thành các chunk cha lớn (Parent - ví dụ 1000 tokens), sau đó chia nhỏ chunk cha thành nhiều chunk con (Child - ví dụ 200 tokens). Bước Search chỉ tìm trên chunk con (đạt độ tương đồng cao); nhưng khi trả về thì lấy toàn bộ chunk cha nạp vào LLM.
   * *Ưu/Nhược:* **Tiêu chuẩn vàng trong các hệ thống RAG Production**, giải quyết mâu thuẫn giữa *"độ sắc bén khi tìm kiếm"* và *"độ đầy đủ khi lập luận"*.
8. **Hierarchical Chunking (Đa tầng):**
   * *Cơ chế:* Tổ chức tri thức theo hình cây: Toàn bài báo $\rightarrow$ Tóm tắt chương $\rightarrow$ Từng section $\rightarrow$ Đoạn văn. Quá trình tìm kiếm duyệt từ trên ngọn xuống gốc.
   * *Ưu/Nhược:* Phù hợp cho thư viện tài liệu khổng lồ hàng nghìn trang, hỗ trợ xuất sắc các câu hỏi mang tính khái quát toàn cục (*Global queries*).
9. **Code-aware (AST) & Table-aware:**
   * *Code-aware:* Sử dụng cây cú pháp trừu tượng (Abstract Syntax Tree) để cắt theo ranh giới hàm/class, giữ nguyên khối docstring và import liên quan.
   * *Table-aware:* Nhận diện bảng biểu trong PDF/HTML, bảo toàn cấu trúc dòng/cột và luôn gắn kèm hàng tiêu đề (Header row) cho mỗi phần bảng bị phân tách.

### 4.2. Cây quyết định lựa chọn Chunking thực dụng

![[Pasted image 20260919094302.png]]

---

## 5. Kỹ Nghệ Embedding

* **Bản chất toán học:** Mô hình Embedding là một hàm ánh xạ $f: \text{Text} \to \mathbb{R}^d$, chuyển đổi chuỗi ký tự thành vector số thực trong không gian $d$ chiều (ví dụ: $d = 1536$ với OpenAI hoặc $d = 768$ với mô hình mã nguồn mở BGE/E5).
* **Đo lường độ tương đồng:**
  $$\text{Cosine Similarity}(A, B) = \frac{A \cdot B}{\|A\| \|B\|} = \frac{\sum_{i=1}^d A_i B_i}{\sqrt{\sum_{i=1}^d A_i^2} \sqrt{\sum_{i=1}^d B_i^2}}$$
* **4 Use cases cốt lõi trong sản phẩm AI:**
  1. **Semantic Search:** Tìm kiếm thông tin dựa trên ý niệm thay vì từ khóa cứng (e.g. *"chính sách bảo hành"* match với *"đổi trả thiết bị hỏng"*).
  2. **Clustering:** Tự động phân cụm không gian dữ liệu để phát hiện xu hướng hoặc nhóm vấn đề nổi cộm của khách hàng.
  3. **Deduplication (Khử trùng lặp):** Quét các cặp văn bản có cosine $> 0.95$ để tự động loại trừ dữ liệu rác, tránh phình to vector database.
  4. **Recommendation System:** Khớp vector sở thích người dùng với vector nội dung bài viết/sản phẩm để cá nhân hóa đề xuất.

---

## 6. Cơ Sở Dữ Liệu Vector (Vector Store) & Metadata Filtering

### 6.1. Giải phẫu một bản ghi trong Vector Database
Một vector record chuẩn mực trong môi trường sản xuất luôn bao gồm 4 trường thông tin:

```json
{
  "id": "policy-returns-001",
  "text": "Khách hàng có 30 ngày kể từ ngày nhận hàng để yêu cầu đổi trả. Sản phẩm phải còn nguyên tem và hóa đơn.",
  "vector": [0.0124, -0.0341, 0.0892, "... 1536 số thực ..."],
  "metadata": {
    "source_file": "refund-policy-v3.pdf",
    "category": "customer_support",
    "department": "operations",
    "created_date": "2026-03-01",
    "access_level": "public_internal",
    "section_id": "returns.section.4"
  }
}
```

![[Pasted image 20260919110637.png]]

> [!TIP] **Chân lý cốt lõi của Vector Store**
> * Vector dùng để **tìm kiếm độ tương đồng ngữ nghĩa**.
> * Chunk text gốc dùng để **nhồi vào prompt cho LLM đọc hiểu**.
> * Metadata dùng để **lọc cứng ranh giới bảo mật và miền tri thức**.
> * Ba thành phần này có chức năng riêng biệt nhưng **bắt buộc phải lưu cùng nhau**.

### 6.2. Ma trận Lựa chọn Vector Store trong Thực tế

| Vector Store | Loại hình | Ngôn ngữ | Điểm mạnh nhất | Điểm yếu / Lưu ý | Khi nào nên dùng? |
|---|---|---|---|---|---|
| **Chroma** | Embedded / Local Server | Python | Cài đặt 1 dòng lệnh `pip`, API cực gọn, chạy in-memory | Không tối ưu cho quy mô hàng triệu bản ghi | Học tập, Prototype, PoC, chạy thử nghiệm trong Lab |
| **FAISS** | Library | C++ / Python | Tốc độ ANN search nhanh nhất hành tinh | Không phải database (không lưu metadata, không persistence) | Tác vụ tìm kiếm vector thuần túy cần độ trễ micro-giây |
| **Qdrant** | Standalone Server | Rust | Metadata filter cực mạnh và sâu, hiệu năng cao, API sạch | Cần quản trị hạ tầng server | **Lựa chọn số 1 cho Production tự host** |
| **pgvector** | Extension | C / SQL | Tích hợp thẳng vào PostgreSQL có sẵn, hỗ trợ JOIN, chuẩn ACID | Chậm hơn vector DB chuyên dụng khi đạt chục triệu vector | Hệ thống backend đã dùng Postgres; corpus vừa phải |
| **Milvus** | Distributed Cluster | Go / C++ | Khả năng mở rộng vô hạn (hàng tỷ vector), hỗ trợ GPU index | Vận hành phức tạp, tốn tài nguyên hạ tầng | Doanh nghiệp lớn với quy mô dữ liệu khổng lồ |
| **Pinecone** | Cloud SaaS | Managed | Serverless hoàn toàn, zero-maintenance, độ ổn định 99.99% | Vendor lock-in, chi phí tăng lũy tiến theo số vector | Startup muốn release nhanh, không có kỹ sư DevOps |

---

## 7. Pipeline Xử Lý Tri Thức: Ingestion & Enrichment

### 7.1. Ingestion Pipeline: Kiểm soát đầu vào & Xử lý chuẩn hóa

![[Pasted image 20260919111559.png]]
![[Pasted image 20260919111609.png]]

### 7.2. Enrichment Pipeline: 3 Nhánh làm giàu tri thức

![[Pasted image 20260919111631.png]]
![[Pasted image 20260919111703.png]]
![[Pasted image 20260919112856.png]]

* **Quy tắc Kiểm soát Đầu vào (Input Validation):**
  * Không bao giờ tin phần mở rộng của file (`.pdf`, `.txt`). Kẻ tấn công hoặc người dùng có thể đổi đuôi file tùy ý. Phải kiểm tra **Magic Bytes** để xác định MIME thật.
  * Triết lý: *Fail Fast, Log Clearly*. Tài liệu hỏng hoặc không có parser tương thích phải bị loại bỏ ngay và ghi log cảnh báo, không được để lọt vào vector store.
* **Xây dựng Nền tảng Đồ thị (Graph Knowledge Foundation):**
  * Là bước đệm quan trọng cho **GraphRAG**:
    1. Chunker cắt văn bản thành các câu độc lập.
    2. NER (Named Entity Recognition) trích xuất thực thể (`Einstein`, `Ulm`, `Princeton`).
    3. Entity Linker chuẩn hóa thực thể về định danh tri thức chung (Knowledge Base ID).
    4. Relation Extraction xác định quan hệ giữa các thực thể (`BORN_IN`, `WORKED_AT`).
    5. Graph Writer ghi bộ ba tri thức (Triples) vào Graph Store (Neo4j, FalkorDB).

---

## 8. Kỹ Thuật Basic Retrieval: Cơ Chế & Bộ 3 Tham Số Cốt Lõi

### 8.1. Vòng đời phân định giữa Offline Ingestion và Online Retrieval

![[Pasted image 20260919112931.png]]
![[Pasted image 20260919113007.png]]

### 8.2. Ba tham số quyết định chất lượng truy vấn

Khi thực hiện truy vấn thời gian thực ở tầng Online, 3 tham số quyết định chất lượng ngữ cảnh nạp vào LLM gồm:

1. **Top-k (`n_results`):**
   * Xác định số lượng chunk có độ tương đồng cao nhất được kéo ra khỏi cơ sở dữ liệu.
   * *Thực nghiệm:* Với câu hỏi tra cứu định nghĩa hẹp, chỉ cần $k = 3$. Với câu hỏi tổng hợp so sánh hoặc viết báo cáo, cần $k = 7 - 10$ kết hợp với reranker.
2. **Score Threshold (Ngưỡng tương đồng tối thiểu):**
   * Thiết lập bộ lọc để loại bỏ các chunk có Cosine Similarity quá thấp, tránh hiện tượng kéo dữ liệu rác vào context window.
   * *Thực nghiệm:* Ngưỡng $\ge 0.6 - 0.7$ cho văn bản chặt chẽ.
3. **Attribute Filter (Metadata Filtering):**
   * Lọc có điều kiện trước khi tính toán tương đồng ngữ nghĩa:
     ```python
     collection.query(
         query_texts=["chính sách đổi trả hàng điện tử"],
         n_results=3,
         where={"$and": [{"category": "policy"}, {"access_level": "public"}]}
     )
     ```

---

## 9. Ứng Dụng Vào Đồ Án GraphRAG Nhóm 2 (Paper Toán AI)

Áp dụng các nguyên lý Data Foundation vào đề tài *Giải mã công thức toán trong paper AI*:

* **1. Thách thức Data:** Paper học thuật PDF chứa nhiều công thức toán hai cột, ký hiệu biến số bị mất dấu qua nhiều trang. Nếu dùng Fixed-size chunking thông thường, công thức toán sẽ bị bẻ gãy giữa chừng.
* **2. Chiến lược Chunking tối ưu:**
  * Áp dụng **Layout-aware / Section-aware Chunking** để gom trọn vẹn từng khối định lý, bổ đề và công thức toán.
  * Tách riêng các khối công thức LaTeX thành các node thực thể độc lập trong **GraphDB**.
* **3. Ingestion & Graph Extraction:**
  * Parse paper qua OCR chuyên biệt cho toán học (như Nougat / Mathpix).
  * Chạy pipeline trích xuất quan hệ: `(Ký hiệu X) -[:DEFINED_AS]-> (Khái niệm Y)` và `(Công thức B) -[:DERIVED_FROM]-> (Công thức A)` để giải quyết triệt để bài toán mất dấu ký hiệu đa trang mà Vector RAG đơn thuần thất bại.

---

## 10. Mạng Lưới Tri Thức & Liên Kết Zettelkasten

* **Dự án mẹ:** [[VinUni - Chương trình Đào tạo AI Thực chiến]]
* **Các bài học liền kề:**
  * [[Day 02 - Tìm đúng bài toán cho AI]]: Khảo sát điểm đau và bóc tách hạn chế của Vector RAG với tài liệu dài.
  * [[Day 03 - Thiết kế Workflow và Kiểm soát Hệ thống AI]]: Thiết kế pipeline và luồng kiểm soát dữ liệu.
  * [[Day 04 - Prompt Engineering và Tool Calling]]: Context Engineering, Lance Martin's 4 rules và Prompt Caching.
  * [[Workshop - Xây dựng AI MVP]]: Thẩm định tính khả thi AI Feasibility (Data, Latency, Cost).
* **Khái niệm cốt lõi (`04 - Notes/Concepts/`):**
  * [[Data Quality Pyramid]] — Kim tự tháp 4 tầng chuẩn hóa chất lượng dữ liệu AI.
  * [[Chiến lược Chunking]] — 9 phương pháp phân mảnh văn bản tối ưu hóa cho RAG.
  * [[Vector Store]] — Cơ sở dữ liệu vector và kiến trúc lưu trữ 4 trường bản ghi.
  * [[Metadata Filtering]] — Kỹ thuật kết hợp lọc điều kiện nghiệp vụ với tìm kiếm ngữ nghĩa.
  * [[Graph Knowledge Foundation]] — Quy trình bóc tách thực thể và quan hệ chuẩn bị cho GraphRAG.
* **Mệnh đề tri thức nguyên tử (`04 - Notes/Atomic/`):**
  * [[Không bao giờ index dữ liệu thô rồi kỳ vọng retrieval tự động sửa chữa mọi vấn đề]]
  * [[Chunking là quyết định thiết kế kiến trúc thay vì tham số mặc định]]
  * [[Đổi Vector Store là việc dễ nhưng đổi Embedding Model bắt buộc phải re-index toàn bộ]]
  * [[Embedding không tự tạo ra sự thật mà chỉ đo khoảng cách ngữ nghĩa trong không gian]]
  * [[Retrieval xuất sắc là sự kết hợp giữa Metadata Filtering và Semantic Search]]
