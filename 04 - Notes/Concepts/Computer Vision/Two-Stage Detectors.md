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
  - Two-Stage Detectors
  - Two-Stage Object Detection
  - Bộ phát hiện hai giai đoạn
---

# Two-Stage Detectors (Bộ Phát hiện Vật thể Hai Giai đoạn)

## 1. Định nghĩa & Bản chất (Definition & Core Idea)

- **Định nghĩa ngắn gọn:** **Two-Stage Detectors (Bộ phát hiện hai giai đoạn)** là họ kiến trúc trong [[Object Detection]] phân tách quy trình dự đoán thành hai bước nối tiếp độc lập:
  1. **Giai đoạn 1 (Region Proposal):** Quét toàn bộ ảnh để đề xuất một tập các vùng ứng viên tiềm năng có khả năng chứa vật thể (*Region Proposals*), thường là vài trăm đến vài nghìn vùng thô.
  2. **Giai đoạn 2 (Classification & Refinement):** Trích xuất đặc trưng của từng vùng đề xuất, sau đó thực hiện phân loại nhãn đối tượng và tinh chỉnh lại tọa độ [[Bounding Box]] chính xác.
- **Giải thích trực quan:** Cách tiếp cận này tương tự việc con người nhìn lướt qua một cảnh vật để khoanh vùng những chỗ "có thứ gì đó đáng chú ý", sau đó mới tập trung mắt nhìn kỹ vào từng vùng đó để xác định rõ đó là đồ vật gì và ranh giới cụ thể ở đâu.

---

## 2. Quá trình Tiến hóa Kiến trúc (Evolutionary History)

### 2.1. R-CNN (Regions with CNN features - 2014)
- **Cơ chế:** Sử dụng thuật toán truyền thống *Selective Search* để cắt ra khoảng 2.000 vùng ứng viên từ ảnh đầu vào. Mỗi vùng được co giãn (*warp*) về kích thước cố định, sau đó chạy độc lập qua mạng CNN (AlexNet) để trích xuất vector đặc trưng, rồi phân loại bằng SVM và hồi quy bounding box bằng Linear Regression.
- **Điểm nghẽn:** Cực kỳ chậm chạp vì phải chạy CNN 2.000 lần cho mỗi bức ảnh; không thể huấn luyện end-to-end.

### 2.2. Fast R-CNN (2015)
- **Cơ chế:** Đảo ngược thứ tự xử lý để tăng tốc đột phá. Toàn bộ bức ảnh chỉ chạy qua CNN một lần duy nhất để tạo ra một bản đồ đặc trưng (*Feature Map*) toàn cục. Các vùng đề xuất từ Selective Search sau đó được ánh xạ trực tiếp lên Feature Map này.
- **Đột phá kỹ thuật:** Giới thiệu tầng **RoI Pooling (Region of Interest Pooling)** để biến các vùng đặc trưng có kích thước bất kỳ thành kích thước cố định ($7 \times 7$), sau đó đưa qua các tầng fully connected để cùng lúc dự đoán nhãn (Softmax) và độ lệch bounding box (Smooth L1 Loss).
- **Điểm nghẽn:** Bước sinh vùng đề xuất bằng Selective Search chạy trên CPU vẫn là nút cổ chai khiến mô hình chưa thể đạt tốc độ thời gian thực.

### 2.3. Faster R-CNN (2015)
- **Cơ chế:** Loại bỏ hoàn toàn Selective Search. Thay vào đó, giới thiệu mạng **Region Proposal Network (RPN)** — một mạng nơ-ron tích chập chia sẻ trực tiếp bản đồ đặc trưng với mạng phân loại.
- **Đột phá kỹ thuật:** RPN sử dụng cơ chế [[Anchor Box]] với nhiều scale và aspect ratio rải khắp Feature Map để dự đoán xác suất có/không chứa vật thể (*objectness score*) và hồi quy sơ bộ bounding box. Toàn bộ mạng được huấn luyện end-to-end.
- **Cải tiến RoI Align (trong Mask R-CNN):** Thay thế RoI Pooling (vốn làm tròn tọa độ gây mất mát thông tin không gian) bằng phép nội suy song tuyến tính (*Bilinear Interpolation*), giúp việc định vị và phân vùng đạt độ chính xác cấp độ pixel.

---

## 3. Ưu điểm & Nhược điểm So sánh

### Ưu điểm
- **Độ chính xác định vị cao:** Nhờ có bước lọc thô của RPN trước khi phân loại chi tiết, mô hình ít bị ảnh hưởng bởi hậu cảnh nhiễu.
- **Phát hiện tốt vật thể nhỏ:** Khả năng trích xuất và phóng đại vùng đặc trưng RoI giúp nhận diện tốt các đối tượng có kích thước nhỏ hoặc bị che khuất một phần.
- **Ít bị class imbalance cực đoan:** RPN chủ động lọc bớt các mẫu âm tính (background), chỉ chuyển khoảng 1.000 đến 2.000 vùng tiềm năng sang giai đoạn 2.

### Nhược điểm
- **Tốc độ xử lý chậm:** Do phải xử lý tuần tự hai giai đoạn và chạy nhiều RoI riêng lẻ, tốc độ suy luận thường chỉ đạt khoảng 5 đến 15 FPS, khó đáp ứng các hệ thống thời gian thực cấu hình thấp.
- **Kiến trúc cồng kềnh:** Quy trình gồm nhiều thành phần rời rạc (Backbone, RPN, RoI Align, Fast R-CNN Head, NMS), khó tối ưu hóa đồng thời trên phần cứng nhúng.

---

## 4. Liên kết Hệ thống (System Links)

- [[Object Detection]] — Bài toán tổng quan.
- [[One-Stage Detectors]] — Trường phái đối lập ưu tiên tốc độ suy luận thời gian thực.
- [[Anchor Box]] — Cơ chế nền tảng trong mạng RPN của Faster R-CNN.
- [[Bounding Box]] — Mục tiêu hồi quy của cả RPN và Fast R-CNN Head.
- [[Intersection over Union (IoU)]] — Tiêu chuẩn phân chia mẫu Positive/Negative trong RPN.
- [[Non-Maximum Suppression (NMS)]] — Khâu lọc trùng lặp áp dụng ở cả đầu ra của RPN và đầu ra cuối cùng.
- [[Detection Transformer (DETR)]] — Bước tiến tiếp theo thay thế cả RPN lẫn RoI Pooling bằng cơ chế Attention.
