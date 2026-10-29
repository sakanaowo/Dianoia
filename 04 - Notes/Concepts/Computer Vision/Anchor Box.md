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
  - Anchor Box
  - Anchor Boxes
  - Prior Box
  - Hộp neo
---

# Anchor Box (Hộp Neo Tham Chiếu)

## 1. Định nghĩa & Bản chất (Definition & Core Idea)

- **Định nghĩa ngắn gọn:** **Anchor Box (Hộp neo)** — hay còn gọi là *Prior Box* — là tập hợp các hình chữ nhật có kích thước (*scales*) và tỷ lệ khung hình (*aspect ratios*) được định nghĩa trước, được rải đều trên tất cả các vị trí của bản đồ đặc trưng (*Feature Map*), đóng vai trò làm **khung tham chiếu ban đầu** cho mạng nơ-ron học cách dự đoán [[Bounding Box]].
- **Giải thích trực quan:** Việc bắt một mạng nơ-ron đoán mò trực tiếp vị trí và kích thước của một vật thể bất kỳ từ con số 0 là cực kỳ khó khăn và chậm hội tụ. Thay vào đó, ta "mớm" sẵn cho mô hình hàng loạt hộp mẫu ở mọi vị trí (hộp vuông, hộp chữ nhật đứng, hộp chữ nhật nằm ngang). Mô hình chỉ cần làm một việc dễ hơn nhiều: **học độ lệch (*offsets*) để co giãn, dịch chuyển hộp neo sẵn có sao cho khớp với vật thể**.

---

## 2. Bối cảnh Ra đời & Cơ chế Vận hành

- **Lịch sử ra đời:** Được giới thiệu lần đầu trong kiến trúc **Faster R-CNN (2015)** thông qua mạng đề xuất vùng *Region Proposal Network (RPN)*, sau đó trở thành nền tảng tiêu chuẩn trong các mô hình như SSD và YOLO (v2 đến v5).
- **Cấu hình Anchor Boxes:**
  Tại mỗi điểm ảnh trên Feature Map, ta thường đặt $k$ anchor boxes:
  - *Tỷ lệ khung hình (Aspect Ratios):* Ví dụ $\{1:1, 1:2, 2:1\}$.
  - *Quy mô kích thước (Scales):* Ví dụ $\{128^2, 256^2, 512^2\}$ pixel.
  - $\rightarrow$ Mỗi điểm có $3 \times 3 = 9$ anchor boxes. Một Feature Map kích thước $40 \times 40$ sẽ tạo ra $40 \times 40 \times 9 = 14.400$ anchor boxes trên một bức ảnh!
- **Cơ chế hồi quy độ lệch (Offsets Regression):**
  Mô hình dự đoán 4 giá trị $(t_x, t_y, t_w, t_h)$ để biến đổi anchor box $(x_a, y_a, w_a, h_a)$ thành hộp dự đoán $(x, y, w, h)$:
  $$x = x_a + w_a \cdot t_x, \quad y = y_a + h_a \cdot t_y$$
  $$w = w_a \cdot \exp(t_w), \quad h = h_a \cdot \exp(t_h)$$

---

## 3. Hạn chế Cốt tử của Phương pháp Anchor-based

Dù mang lại thành công vang dội cho thế hệ mô hình 2015–2020, Anchor Boxes tồn tại 3 nhược điểm rất lớn:

1. **Quá nhiều siêu tham số (*Hyper-parameters*) thủ công:** Người thiết kế phải tự chọn số lượng scale, tỷ lệ khung hình, hoặc phải chạy thuật toán K-Means Clustering trên tập dữ liệu để tìm anchor tối ưu.
2. **Mất cân bằng mẫu cực kỳ nghiêm trọng (*Extreme Class Imbalance*):**
   - Hàng chục đến hàng trăm nghìn anchor boxes được rải ra, nhưng một bức ảnh chỉ có khoảng 5 đến 20 vật thể thực tế.
   - Hơn **$99\%$ anchor boxes là hậu cảnh (Background / Negative samples)**. Điều này khiến gradients bị áp đảo bởi các mẫu âm tính, đòi hỏi các kỹ thuật phức tạp như Hard Negative Mining hoặc Focal Loss để huấn luyện.
3. **Bắt buộc phải dùng [[Non-Maximum Suppression (NMS)]]:** Vì có quá nhiều anchor cùng bao quanh một vật thể, mô hình sinh ra hàng loạt box dư thừa, bắt buộc phải dùng thuật toán NMS để lọc, gây nghẽn tốc độ suy luận.

---

## 4. Xu hướng Chuyển dịch: Anchor-Free & Query-based

Những hạn chế trên đã thúc đẩy thị giác máy tính hiện đại chuyển dịch mạnh mẽ:

- **Anchor-Free Detectors (FCOS, CenterNet, YOLOv8):** Bỏ hoàn toàn khái niệm hộp neo. Dự đoán trực tiếp tâm vật thể (*Centerness / Keypoint*) và khoảng cách từ tâm đến 4 cạnh của vật thể.
- **Query-based Detectors ([[Detection Transformer (DETR)]]):** Loại bỏ hoàn toàn cả Anchor Boxes lẫn NMS. Khởi tạo một tập nhỏ các **Object Queries** học được ($N = 100$ đến $300$) và dùng thuật toán Hungarian Matching để ghép cặp 1-1 tối ưu.

---

## 5. Liên kết hệ thống & Nguồn (System Links & Sources)

- [[Bounding Box]] — Mục tiêu cuối cùng mà Anchor Box cố gắng co giãn tới.
- [[Intersection over Union (IoU)]] — Tiêu chuẩn để phân định anchor nào là Foreground hay Background.
- [[Non-Maximum Suppression (NMS)]] — Hậu xử lý bắt buộc để khử trùng lặp các anchor dự đoán.
- [[Object Detection]] — Bài toán ứng dụng của anchor.
- [[Detection Transformer (DETR)]] — Kiến trúc cách mạng loại bỏ hoàn toàn Anchor Box.
