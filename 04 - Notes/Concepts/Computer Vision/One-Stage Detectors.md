---
type: concept
domains:
  - "[[Computing]]"
themes:
  - "[[Learning and Intelligence]]"
source: []
created: 2026-10-01
updated: 2026-10-01
aliases:
  - One-Stage Detectors
  - Single-Shot Detectors
  - One-Stage Object Detection
  - Bộ phát hiện một giai đoạn
---

# One-Stage Detectors (Bộ Phát hiện Vật thể Một Giai đoạn)

## 1. Định nghĩa & Bản chất (Definition & Core Idea)

- **Định nghĩa ngắn gọn:** **One-Stage Detectors (Bộ phát hiện một giai đoạn)** — hay còn gọi là *Single-Shot Detectors* — là nhóm kiến trúc trong [[Object Detection]] bỏ qua hoàn toàn bước sinh vùng đề xuất trung gian (*Region Proposals*), thực hiện phân loại và hồi quy tọa độ [[Bounding Box]] trực tiếp trên toàn bộ ảnh chỉ trong **một lượt truyền thẳng duy nhất (Single Forward Pass)**.
- **Giải thích trực quan:** Thay vì quy trình hai bước "khoanh vùng nghi vấn rồi mới nhận diện chi tiết" của [[Two-Stage Detectors]], mô hình một giai đoạn chia toàn bộ bức ảnh thành một lưới các ô (*Grid Cells*) và tại mỗi ô dự đoán đồng thời: vị trí hộp bao, kích thước và xác suất của từng lớp đối tượng.

---

## 2. Các Kiến trúc Tiêu biểu & Bước Ngoặt Kỹ thuật

### 2.1. YOLO (You Only Look Once - Joseph Redmon et al., 2016)
- **Tư tưởng cốt lõi:** Biến bài toán phát hiện vật thể thành một bài toán hồi quy đơn nhất từ pixel đầu vào tới tọa độ bounding box và xác suất lớp.
- **Cơ chế YOLOv1:** Chia ảnh thành lưới $S \times S$ (ví dụ $7 \times 7$). Nếu tâm của một đối tượng rơi vào ô lưới nào, ô lưới đó chịu trách nhiệm dự đoán $B$ bounding boxes và xác suất của $C$ lớp đối tượng.
- **Tiến hóa họ YOLO:**
  - *YOLOv2 (YOLO9000) & YOLOv3:* Tích hợp [[Anchor Box]], sử dụng K-Means trên tập dữ liệu để tìm anchor tối ưu, kết hợp cấu trúc Darknet-53 và trích xuất đặc trưng đa quy mô.
  - *YOLOv4 & YOLOv5:* Tối ưu hóa pipeline huấn luyện với Bag-of-Freebies (Mosaic Augmentation) và Bag-of-Specials (Mish activation, PANet).
  - *YOLOv8, YOLOv9, YOLOv11:* Chuyển đổi sang kiến trúc **Anchor-Free**, loại bỏ anchor thủ công, cải tiến cơ chế gán nhãn động (*Task-Aligned Assigner*) và tối ưu hóa suy luận thời gian thực trên biên.

### 2.2. SSD (Single Shot MultiBox Detector - Wei Liu et al., 2016)
- **Đột phá:** Nhận ra điểm yếu lớn của YOLOv1 là dự đoán kém đối với vật thể nhỏ do chỉ dùng feature map ở tầng cuối cùng.
- **Cơ chế:** SSD sử dụng các bản đồ đặc trưng ở **nhiều tầng tích chập khác nhau** (Multi-Scale Feature Maps) để dự đoán:
  - Bản đồ tầng sâu (độ phân giải thấp, ngữ nghĩa cao) dự đoán vật thể lớn.
  - Bản đồ tầng nông (độ phân giải cao, ngữ nghĩa thấp) dự đoán vật thể nhỏ.

### 2.3. RetinaNet & Bước ngoặt Focal Loss (Tsung-Yi Lin et al., 2017)
- **Vấn đề cốt tử của One-Stage:** Mất cân bằng mẫu cực đoan giữa tiền cảnh và hậu cảnh (*Extreme Foreground-Background Class Imbalance*). Do mô hình rải hàng chục ngàn anchor trên toàn bộ ảnh, hơn $99\%$ số đó là các mẫu âm tính dễ phân loại (hậu cảnh trống rỗng). Tổng gradients từ các mẫu âm tính dễ dàng áp đảo tín hiệu học từ các vật thể thật hiếm hoi.
- **Giải pháp Focal Loss:** Bổ sung hệ số điều chế $(1 - p_t)^\gamma$ vào hàm Cross-Entropy:
  $$\text{FL}(p_t) = -\alpha_t (1 - p_t)^\gamma \log(p_t)$$
  Khi một mẫu đã được dự đoán chính xác với xác suất cao ($p_t \to 1$), hệ số $(1 - p_t)^\gamma \to 0$, làm suy giảm mạnh trọng số mất mát của các mẫu dễ, buộc mạng phải tập trung cập nhật trọng số cho các mẫu khó (vật thể thật, vật thể nhỏ, vật thể bị che khuất).

---

## 3. So sánh với Two-Stage Detectors

| Tiêu chí | One-Stage Detectors (YOLO, SSD, RetinaNet) | Two-Stage Detectors (Faster R-CNN, Cascade R-CNN) |
| :--- | :--- | :--- |
| **Tốc độ suy luận** | Rất cao (30–150+ FPS), tối ưu cho thời gian thực | Trung bình đến thấp (5–20 FPS) |
| **Độ phức tạp tính toán** | Thấp hơn, thiết kế end-to-end gọn gàng | Cao, nhiều module tuần tự (RPN + RoI Align) |
| **Độ chính xác vật thể nhỏ** | Ban đầu kém hơn, cải thiện mạnh nhờ FPN & Focal Loss | Tốt hơn nhờ trích xuất RoI độ phân giải cao |
| **Xử lý Class Imbalance** | Phụ thuộc vào Focal Loss hoặc cơ chế gán nhãn động | Tự nhiên được giảm tải nhờ bước lọc thô của RPN |
| **Hậu xử lý** | Bắt buộc phải dùng [[Non-Maximum Suppression (NMS)]] | Bắt buộc phải dùng NMS |

---

## 4. Liên kết Hệ thống (System Links)

- [[Object Detection]] — Khái niệm nền tảng.
- [[Two-Stage Detectors]] — Trường phái hai giai đoạn truyền thống.
- [[Anchor Box]] — Cấu trúc tham chiếu sử dụng trong SSD, YOLOv2–v5 và RetinaNet.
- [[Bounding Box]] — Mục tiêu hồi quy trực tiếp.
- [[Non-Maximum Suppression (NMS)]] — Thuật toán bắt buộc để loại bỏ các box trùng nhau do dự đoán dầy đặc.
- [[Mean Average Precision (mAP)]] — Thước đo đánh giá hiệu năng mô hình.
- [[Detection Transformer (DETR)]] — Kiến trúc loại bỏ cả anchor lẫn NMS.
