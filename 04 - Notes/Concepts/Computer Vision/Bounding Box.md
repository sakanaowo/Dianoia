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
  - Bounding Box
  - Bbox
  - Hộp bao vật thể
---

# Bounding Box (Hộp Bao Vật Thể)

## 1. Định nghĩa & Bản chất (Definition & Core Idea)

- **Định nghĩa ngắn gọn:** **Bounding Box (Hộp bao)** là một hình chữ nhật nhỏ nhất bao quanh trọn vẹn một đối tượng mục tiêu trong ảnh hoặc video, đóng vai trò là cấu trúc biểu diễn không gian vị trí và kích thước của đối tượng trong bài toán [[Object Detection]].
- **Giải thích trực quan:** Thay vì phải xác định chính xác từng đường viền pixel phức tạp của vật thể (như trong bài toán Segmentation), Bounding Box xấp xỉ đối tượng bằng một khung chữ nhật 4 cạnh song song với hai trục tọa độ ($x, y$) của bức ảnh, giúp giảm thiểu tối đa khối lượng tham số cần hồi quy.

---

## 2. Các Định dạng Biểu diễn Tọa độ Phổ biến

Trong thị giác máy tính, Bounding Box được biểu diễn qua 3 định dạng chuẩn:

| Định dạng | Tham số | Ý nghĩa | Định dạng dữ liệu phổ biến |
| :--- | :--- | :--- | :--- |
| **Góc chéo (Corners)** | $(x_{\min}, y_{\min}, x_{\max}, y_{\max})$ | Tọa độ điểm góc trên-bên-trái và điểm góc dưới-bên-phải | Pascal VOC, Albumentations |
| **Góc & Kích thước** | $(x_{\min}, y_{\min}, w, h)$ | Tọa độ góc trên-bên-trái kèm chiều rộng và chiều cao | COCO JSON format |
| **Tâm & Kích thước** | $(x_{\text{center}}, y_{\text{center}}, w, h)$ | Tọa độ tâm đối tượng kèm chiều rộng và chiều cao | YOLO, DETR, SSD |

### Công thức Chuyển đổi giữa các Định dạng
Từ định dạng góc sang định dạng tâm:
$$x_{\text{center}} = \frac{x_{\min} + x_{\max}}{2}, \quad y_{\text{center}} = \frac{y_{\min} + y_{\max}}{2}$$
$$w = x_{\max} - x_{\min}, \quad h = y_{\max} - y_{\min}$$

### Tọa độ Tuyệt đối vs Tọa độ Chuẩn hóa
- **Tuyệt đối (Absolute pixels):** Đo bằng số pixel thực tế trên ảnh (ví dụ: $x \in [0, W], y \in [0, H]$).
- **Chuẩn hóa (Normalized coordinates):** Chia giá trị pixel cho kích thước ảnh $W, H$ để đưa về khoảng $[0, 1]$:
  $$x_{\text{norm}} = \frac{x}{W}, \quad y_{\text{norm}} = \frac{y}{H}, \quad w_{\text{norm}} = \frac{w}{W}, \quad h_{\text{norm}} = \frac{h}{H}$$
  Định dạng chuẩn hóa giúp mô hình không phụ thuộc vào kích thước ảnh đầu vào.

---

## 3. Các Hàm Mất mát Hồi quy Tọa độ (Regression Losses)

Mô hình học cách điều chỉnh các giá trị tọa độ dự đoán $\hat{b}$ sao cho khớp với nhãn thật $b$:

1. **L1 / Smooth L1 Loss:** Tính sai số khoảng cách Euclidean trên từng tọa độ độc lập. Nhược điểm: Coi 4 tọa độ là độc lập và rất nhạy cảm với tỷ lệ kích thước vật thể (box lớn bị phạt nặng hơn box nhỏ dù cùng mức độ lệch tương đối).
2. **IoU Loss:** $-\ln(\text{IoU})$ hoặc $1 - \text{IoU}$. Đánh giá toàn diện cả hình chữ nhật như một thể thống nhất. Nhược điểm: Nếu hai box không giao nhau ($\text{IoU} = 0$), gradient bằng 0 khiến mô hình không học được cách kéo hai box lại gần nhau.
3. **GIoU Loss (Generalized IoU):** Khắc phục nhược điểm của IoU bằng cách tính thêm phần diện tích của hình chữ nhật nhỏ nhất $C$ bao bọc cả hai box:
   $$\mathcal{L}_{\text{GIoU}} = 1 - \text{IoU} + \frac{|C \setminus (A \cup B)|}{|C|}$$
4. **DIoU & CIoU Loss:** Tích hợp thêm khoảng cách tâm giữa hai box và tỷ lệ khung hình (*aspect ratio*), giúp mô hình hội tụ nhanh hơn gấp nhiều lần.

---

## 4. Phân biệt khái niệm & Những hiểu lầm (Distinctions & Misconceptions)

### Những phân biệt then chốt
- `Bounding Box song song trục (Axis-Aligned Bounding Box - AABB)` ≠ `Bounding Box có xoay (Oriented Bounding Box - OBB)`: AABB có 4 cạnh song song trục ảnh, dễ tính toán nhưng khi vật thể nằm nghiêng (như chai nước trên khay quầy hàng), box sẽ chứa rất nhiều pixel hậu cảnh thừa. OBB có thêm góc xoay $\theta$, thường dùng trong ảnh vệ tinh hoặc text detection.

### Hiểu lầm thường gặp
- **Hiểu lầm:** "Mô hình hồi quy trực tiếp tọa độ $(x, y, w, h)$ tuyệt đối từ ảnh."
  - *Thực tế:* Hầu hết các mô hình (như Faster R-CNN, YOLO) không hồi quy trực tiếp tọa độ tuyệt đối mà hồi quy **độ lệch (offsets $\Delta x, \Delta y, \Delta w, \Delta h$)** so với các [[Anchor Box]] hoặc điểm tham chiếu (*Reference Points*).

---

## 5. Liên kết hệ thống & Nguồn (System Links & Sources)

- [[Object Detection]] — Bài toán bao quát sử dụng Bounding Box làm nhãn đầu ra.
- [[Intersection over Union (IoU)]] — Phép toán hình học đo độ trùng khớp giữa hai Bounding Box.
- [[Anchor Box]] — Các hộp tham chiếu kích thước ban đầu dùng để tính offset.
- [[Non-Maximum Suppression (NMS)]] — Thuật toán lọc các Bounding Box bị trùng lặp.
- [[Detection Transformer (DETR)]] — Kiến trúc sử dụng hàm mất mát kết hợp $L_1$ và $\text{GIoU}$ để hồi quy Bounding Box trực tiếp từ Object Queries.
