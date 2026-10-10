---
type: concept
status: growing
domains:
  - "[[Computing]]"
themes:
  - "[[Learning and Intelligence]]"
  - "[[Technology and Humanity]]"
source: []
created: 2026-10-01
updated: 2026-10-01
aliases:
  - Object Detection
  - Phát hiện vật thể
  - Nhận diện và định vị vật thể
---

# Object Detection (Phát hiện Vật thể)

## 1. Định nghĩa & Bản chất (Definition & Core Idea)

- **Định nghĩa ngắn gọn:** **Object Detection (Phát hiện vật thể)** là một bài toán nền tảng của thị giác máy tính (*Computer Vision*), có nhiệm vụ xác định đồng thời **vị trí không gian** (thông qua Bounding Box) và **phân loại ngữ nghĩa** (Class Label) của tất cả các đối tượng mục tiêu xuất hiện trong một bức ảnh hoặc video.
- **Giải thích trực quan:** 
  - Trong khi bài toán Phân loại ảnh (*Image Classification*) chỉ trả lời câu hỏi: *"Trong ảnh này có con mèo không?"*, thì Phát hiện vật thể trả lời cả hai câu hỏi: *"Các vật thể nằm ở tọa độ nào trên ảnh, và mỗi vật thể là loại gì?"*.
  - Đầu ra của mô hình cho mỗi vật thể được phát hiện gồm một bộ giá trị: tọa độ hộp bao $(x_1, y_1, x_2, y_2)$ hoặc $(cx, cy, w, h)$, nhãn lớp dự đoán, và điểm số độ tin cậy (*confidence score* $\in [0, 1]$).

---

## 2. Bối cảnh & Vấn đề giải quyết (Context & Purpose)

- **Bối cảnh ra đời:** Trong thực tế, các bức ảnh hiếm khi chỉ chứa duy nhất một đối tượng đơn lẻ ở chính giữa. Thế giới thực chứa nhiều đối tượng đan xen với kích thước, hình dạng, số lượng biến đổi và mức độ che khuất khác nhau.
- **Vị trí trong domain:** Là cầu nối trung tâm giữa thị giác máy tính cấp thấp (trích xuất đặc trưng pixel, lọc cạnh) và thị giác máy tính cấp cao (hiểu ngữ cảnh cảnh quay, theo dõi chuyển động, xe tự hành, quầy thanh toán tự động).
- **Phân định các bài toán thị giác liên quan:**
  - *Image Classification:* 1 ảnh $\rightarrow$ 1 nhãn lớp toàn cục.
  - *Object Localization:* 1 ảnh $\rightarrow$ 1 nhãn lớp + 1 bounding box cho đối tượng chính.
  - *Object Detection:* 1 ảnh $\rightarrow$ Nhiều bounding boxes + nhiều nhãn lớp cho nhiều đối tượng.
  - *Semantic Segmentation:* Gán nhãn ngữ nghĩa cho từng pixel nhưng không phân biệt các cá thể cùng loại.
  - *Instance Segmentation:* Phát hiện từng đối tượng và gán mask chính xác tới từng pixel cho từng cá thể riêng biệt.

---

## 3. Cơ chế, Kiến trúc & Các trường phái tiếp cận

Bài toán phát hiện vật thể luôn giải quyết đồng thời hai hàm mất mát:
$$\mathcal{L} = \mathcal{L}_{\text{cls}} + \lambda \mathcal{L}_{\text{reg}}$$
Trong đó $\mathcal{L}_{\text{cls}}$ là mất mát phân loại (Cross-Entropy hoặc Focal Loss), còn $\mathcal{L}_{\text{reg}}$ là mất mát hồi quy tọa độ hộp bao (Smooth L1, GIoU, CIoU Loss).

### 3.1. Các thế hệ kiến trúc chính

1. **Phương pháp Hai giai đoạn (Two-Stage Detectors):**
   - *Cơ chế:* Giai đoạn 1 sinh ra các vùng đề xuất thô (*Region Proposals*) có khả năng chứa vật thể (bằng Selective Search hoặc RPN). Giai đoạn 2 trích xuất đặc trưng của từng vùng (RoI Pooling/Align) rồi đưa qua các tầng fully connected để phân loại và tinh chỉnh hộp bao.
   - *Đại diện:* R-CNN, Fast R-CNN, Faster R-CNN, Cascade R-CNN.
   - *Đặc điểm:* Độ chính xác cao, định vị tốt vật thể nhỏ, nhưng tốc độ xử lý chậm hơn, khó chạy thời gian thực.
2. **Phương pháp Một giai đoạn (One-Stage Detectors):**
   - *Cơ chế:* Bỏ qua bước sinh vùng đề xuất. Mô hình chia ảnh thành lưới (*grid*) và dự đoán trực tiếp tọa độ hộp bao và xác suất lớp trên toàn bộ ảnh trong một lượt truyền thẳng (*single forward pass*).
   - *Đại diện:* Họ YOLO (v1 đến v11), SSD, RetinaNet.
   - *Đặc điểm:* Tốc độ cực nhanh, đáp ứng thời gian thực (*real-time*), nhưng đòi hỏi kỹ thuật xử lý mất cân bằng mẫu nghiêm trọng giữa tiền cảnh và hậu cảnh (*Focal Loss*).
3. **Phương pháp Dựa trên Transformer (Query-based / DETR):**
   - *Cơ chế:* Loại bỏ hoàn toàn Anchor Boxes và thuật toán NMS. Sử dụng một tập các **Object Queries** học được tương tác với đặc trưng ảnh qua cơ chế Attention và dùng thuật toán [[Hungarian Matching|Hungarian Bipartite Matching]] để ghép cặp dự đoán 1-1 với nhãn thật.
   - *Đại diện:* [[Detection Transformer (DETR)]], Deformable DETR, DINO-DETR.

---

## 4. Phân biệt khái niệm & Những hiểu lầm (Distinctions & Misconceptions)

### Những phân biệt then chốt
- `[[Object Detection]]` ≠ `[[Image Classification]]`: Detection xử lý số lượng đối tượng không cố định và bắt buộc phải có tọa độ không gian.
- `[[Two-Stage Detectors]]` ≠ `[[One-Stage Detectors]]`: Khác biệt ở việc có hay không bước tạo Region Proposals trung gian.

### Hiểu lầm thường gặp
- **Hiểu lầm 1: "Object Detection chỉ cần mạng nơ-ron nhận diện tốt là đủ."**
  - *Thực tế:* Khâu hậu xử lý (*post-processing*) và chiến lược gán nhãn (*label assignment*) đóng vai trò sống còn. Việc khử trùng lặp qua [[Non-Maximum Suppression (NMS)]] hoặc ghép cặp Hungarian quyết định trực tiếp số lượng box dư thừa hay bỏ sót.
- **Hiểu lầm 2: "Mô hình mAP cao thì khi đưa vào ứng dụng thực tế sẽ đếm đúng số lượng hàng hóa."**
  - *Thực tế:* mAP đánh giá trung bình trên nhiều ngưỡng tin cậy. Trong các ứng dụng thực tế như quầy thanh toán tự động, chỉ cần đếm lệch 1 món thì hóa đơn bị sai hoàn toàn, đòi hỏi các chỉ số đặc thù như Checkout Accuracy (*cAcc*).

---

## 5. Liên kết hệ thống & Nguồn (System Links & Sources)

### Concepts thành phần liên quan
- [[Bounding Box]] — Biểu diễn hình học của vị trí vật thể.
- [[Intersection over Union (IoU)]] — Thước đo độ trùng khớp giữa hai hộp bao.
- [[Anchor Box]] — Hộp tham chiếu kích thước tiên nghiệm.
- [[Non-Maximum Suppression (NMS)]] — Thuật toán lọc trùng lặp hộp bao.
- [[Hungarian Matching]] — Thuật toán ghép cặp 1-1 tối ưu thay thế NMS trong các mô hình Query-based.
- [[Mean Average Precision (mAP)]] — Thước đo độ chính xác chuẩn mực của bài toán.
- [[Detection Transformer (DETR)]] — Kiến trúc phát hiện vật thể hiện đại dựa trên Transformer.

### Domains & Projects liên quan
- [[Computing]]
- [[06 - Projects/AutoCheckout/README|AutoCheckout-CL]] — Dự án ứng dụng phát hiện vật thể học tăng dần trong bán lẻ tự động.
