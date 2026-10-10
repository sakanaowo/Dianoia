---
type: concept
status: growing
domains:
  - "[[Computing]]"
themes:
  - "[[Learning and Intelligence]]"
source: []
created: 2026-10-01
updated: 2026-10-01
aliases:
  - Image Classification
  - Phân loại ảnh
---

# Image Classification (Phân loại Ảnh)

## 1. Định nghĩa & Bản chất (Definition & Core Idea)

- **Định nghĩa ngắn gọn:** **Image Classification (Phân loại ảnh)** là bài toán nền tảng nhất trong thị giác máy tính (*Computer Vision*), trong đó mô hình nhận đầu vào là một bức ảnh số và gán cho toàn bộ bức ảnh đó một hoặc nhiều nhãn danh mục (*Class Labels*) từ một tập nhãn xác định trước.
- **Bản chất toán học:** Mô hình học một hàm ánh xạ $f: \mathcal{X} \to \mathcal{Y}$, trong đó $\mathcal{X} \in \mathbb{R}^{H \times W \times C}$ là ma trận pixel ảnh, và $\mathcal{Y} \in [0, 1]^K$ là phân phối xác suất trên $K$ lớp mục tiêu thông qua hàm Softmax:
  $$P(y = k \mid x) = \frac{\exp(z_k)}{\sum_{j=1}^{K} \exp(z_j)}$$
  Hàm mất mát tiêu chuẩn được sử dụng là Cross-Entropy Loss:
  $$\mathcal{L}_{\text{CE}} = -\sum_{k=1}^{K} y_k \log(P(y = k \mid x))$$

---

## 2. Vai trò Làm Xương Sống (Backbone) trong Thị giác Máy tính

Mặc dù bản thân phân loại ảnh chỉ đưa ra nhãn toàn cục (*Global Label*) mà không cung cấp vị trí tọa độ, nhưng các kiến trúc phân loại ảnh đóng vai trò là **mạng trích xuất đặc trưng (Backbone)** cốt lõi cho hầu hết các tác vụ thị giác phức tạp hơn:

1. **Giai đoạn Tiền huấn luyện (Pre-training):** Mạng được huấn luyện trên các tập dữ liệu khổng lồ (ImageNet-1k, ImageNet-22k) để học cách trích xuất các đặc trưng thị giác từ cấp thấp (cạnh, góc, kết cấu) đến cấp cao (bộ phận, hình thái vật thể).
2. **Chuyển giao cho [[Object Detection]]:** Bỏ tầng phân loại cuối cùng (Classifier Head), sử dụng các Feature Maps trung gian để kết nối vào các bộ dò tìm như RPN, FPN, hoặc Transformer Encoder.
3. **Các dòng Backbone chủ đạo:**
   - *CNN truyền thống:* VGG, ResNet (Residual Connections giải quyết triệt tiêu gradient), ConvNeXt.
   - *Vision Transformers:* ViT, Swin Transformer, DINOv2 (Self-Supervised Learning cho đặc trưng thị giác giàu ngữ nghĩa).

---

## 3. Phân biệt với các Bài toán Thị giác Liên quan

- `[[Image Classification]]`: Gán nhãn cho toàn bộ bức ảnh (Ví dụ: "Ảnh này chụp một cái giỏ hàng").
- `[[Object Detection]]`: Phát hiện nhiều đối tượng, trả về cả nhãn lớp và tọa độ hộp bao [[Bounding Box]] (Ví dụ: "Hộp sữa ở tọa độ $[x_1, y_1, x_2, y_2]$, chai nước ở $[x'_1, y'_1, x'_2, y'_2]$").
- `Semantic Segmentation`: Phân loại từng điểm ảnh (*pixel-level*) thuộc về lớp nào.
- `Instance Segmentation`: Phân biệt ranh giới pixel của từng cá thể đối tượng độc lập.

---

## 4. Liên kết Hệ thống (System Links)

- [[Object Detection]] — Bài toán mở rộng bổ sung thông tin định vị không gian.
- [[Two-Stage Detectors]] — Sử dụng mạng phân loại làm Backbone trích xuất đặc trưng và Head phân loại RoI.
- [[One-Stage Detectors]] — Dự đoán xác suất lớp song song với tọa độ hộp bao.
- [[Computing]] — Lĩnh vực chủ quản.
