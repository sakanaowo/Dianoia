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
  - Non-Maximum Suppression
  - NMS
  - Khử cực đại không cực đại
  - Thuật toán NMS
---

# Non-Maximum Suppression (NMS)

## 1. Định nghĩa & Bản chất (Definition & Core Idea)

- **Định nghĩa ngắn gọn:** **Non-Maximum Suppression (NMS - Khử cực đại không cực đại)** là một thuật toán hậu xử lý (*post-processing*) kinh điển trong bài toán [[Object Detection]], có nhiệm vụ **loại bỏ các [[Bounding Box]] trùng lặp dư thừa** cùng phát hiện một đối tượng, chỉ giữ lại hộp bao duy nhất có điểm tin cậy (*confidence score*) cao nhất.
- **Giải thích trực quan:** Các mô hình CNN truyền thống (YOLO, Faster R-CNN, SSD) rải hàng nghìn [[Anchor Box]] trên ảnh. Khi xuất hiện một đối tượng (ví dụ: chai nước ngọt), có thể có tới hàng chục anchor xung quanh cùng kích hoạt và báo rằng "ở đây có chai nước". Nếu không lọc, một chai nước sẽ bị vẽ chằng chịt 20 khung chữ nhật. NMS xuất hiện như một "trọng tài": chỉ chọn khung chữ nhật chuẩn nhất và xóa sổ tất cả các khung chữ nhật thừa xung quanh.

---

## 2. Các Bước Vận hành Thuật toán NMS Chuẩn (Greedy Hard-NMS)

Giả sử mô hình đưa ra danh sách các hộp bao dự đoán $B = \{b_1, b_2, \dots, b_m\}$ kèm điểm số tin cậy tương ứng $S = \{s_1, s_2, \dots, s_m\}$, và một ngưỡng $\text{IoU}_{\text{thresh}}$ (thường đặt từ $0.45$ đến $0.6$):

1. **Khởi tạo:** Tạo một danh sách rỗng $D$ để chứa các hộp bao cuối cùng được giữ lại.
2. **Sắp xếp:** Sắp xếp danh sách $B$ theo thứ tự điểm số tin cậy $S$ giảm dần.
3. **Lựa chọn cực đại:** Chọn hộp bao $M$ có điểm số cao nhất hiện tại trong $B$, đưa $M$ vào danh sách kết quả $D$, và xóa $M$ khỏi $B$.
4. **Khử trùng lặp:** Tính chỉ số [[Intersection over Union (IoU)]] giữa $M$ và tất cả các hộp bao $b_i$ còn lại trong $B$:
   $$\text{Nếu } \text{IoU}(M, b_i) > \text{IoU}_{\text{thresh}} \implies \text{Xóa bỏ } b_i \text{ khỏi } B$$
5. **Lặp lại:** Tiếp tục quay lại Bước 3 cho đến khi danh sách $B$ hoàn toàn rỗng.
6. **Đầu ra:** Danh sách $D$ chứa các hộp bao tối ưu cuối cùng.

---

## 3. Hạn chế Chí mạng trong Môi trường Chen chúc (Crowded Scenes)

NMS cứng (*Hard-NMS*) hoạt động tốt khi các vật thể đứng cách xa nhau, nhưng bộc lộ nhược điểm nghiêm trọng khi các vật thể **nằm chen chúc, đè lên nhau**:

- **Vấn đề xóa nhầm vật thể thực tế (Missed Detection):**
  - Hãy tưởng tượng hai chai nước ngọt cùng loại đứng sát cạnh nhau trên khay thanh toán quầy thu ngân.
  - Chai nước thứ nhất có box điểm $0.95$. Chai nước thứ hai có box điểm $0.85$.
  - Do hai chai đứng quá sát, $\text{IoU}$ giữa hai box này lên tới $0.65$ (lớn hơn ngưỡng $0.5$).
  - Thuật toán Hard-NMS coi box của chai thứ hai là "box trùng lặp dư thừa" của chai thứ nhất và **xóa sổ chai nước thứ hai**!
  - Kết quả: Khách hàng mua 2 chai nước nhưng hệ thống chỉ tính tiền 1 chai.

---

## 4. Các Giải pháp Cải tiến & Xu hướng Thay thế

### 4.1. Soft-NMS (Bodla et al. - ICCV 2017)
Thay vì xóa bỏ hoàn toàn các box có $\text{IoU}$ cao, Soft-NMS chỉ **hạ điểm tin cậy** của chúng theo hàm suy giảm liên tục (Gaussian decay):
$$s_i \leftarrow s_i \cdot \exp\left(-\frac{\text{IoU}(M, b_i)^2}{\sigma}\right)$$
Nếu một box thuộc về một vật thể thực tế khác đứng sát bên, điểm của nó dù bị hạ nhưng vẫn đủ lớn để vượt qua ngưỡng phát hiện, tránh bị bỏ sót.

### 4.2. Loại bỏ hoàn toàn NMS: End-to-End Detection qua [[Detection Transformer (DETR)]]
- Kiến trúc DETR giải quyết tận gốc bài toán này bằng cách biến phát hiện vật thể thành bài toán **ghép cặp 1-1 tối ưu ([[Hungarian Matching|Hungarian Bipartite Matching]])**.
- Mỗi Object Query chỉ chịu trách nhiệm dự đoán duy nhất một vật thể. Mô hình được huấn luyện để triệt tiêu các dự đoán trùng lặp ngay từ bên trong mạng nơ-ron, **loại bỏ hoàn toàn nhu cầu sử dụng NMS ở khâu hậu xử lý**.

---

## 5. Liên kết hệ thống & Nguồn (System Links & Sources)

- [[Bounding Box]] — Đối tượng mà NMS xử lý và chọn lọc.
- [[Intersection over Union (IoU)]] — Thước đo cốt lõi để NMS quyết định xóa hay giữ box.
- [[Anchor Box]] — Nguồn gốc tạo ra hàng loạt box dư thừa buộc phải dùng NMS.
- [[Hungarian Matching]] — Giải pháp ghép cặp 1-1 thay thế cho việc lọc trùng lặp của NMS.
- [[Object Detection]] — Bài toán ứng dụng NMS ở bước hậu xử lý.
- [[Detection Transformer (DETR)]] — Đột phá kiến trúc xóa bỏ hoàn toàn thuật toán NMS.
- [[06 - Projects/AutoCheckout/README|AutoCheckout-CL]] — Dự án sử dụng Deformable DETR để tính tiền tự động mà không bị lỗi xóa nhầm sản phẩm của NMS.
