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
  - Intersection over Union
  - IoU
  - Jaccard Index
  - Chỉ số giao trên hợp
---

# Intersection over Union (IoU)

## 1. Định nghĩa & Bản chất (Definition & Core Idea)

- **Định nghĩa ngắn gọn:** **Intersection over Union (IoU)** — còn gọi là **Chỉ số Jaccard (Jaccard Index)** — là một thước đo hình học dùng để định lượng **mức độ trùng khớp không gian** giữa hai [[Bounding Box]] (thông thường là giữa hộp bao dự đoán của mô hình và hộp bao nhãn thật do con người gán).
- **Công thức tổng quát:**
  $$\text{IoU}(A, B) = \frac{\text{Diện tích Giao nhau}}{\text{Diện tích Hợp nhau}} = \frac{|A \cap B|}{|A \cup B|} = \frac{|A \cap B|}{|A| + |B| - |A \cap B|}$$
- **Phạm vi giá trị:** $\text{IoU} \in [0, 1]$:
  - $\text{IoU} = 0$: Hai hộp bao hoàn toàn tách rời nhau (không có điểm chung).
  - $\text{IoU} = 1$: Hai hộp bao trùng khít hoàn hảo từng pixel.

---

## 2. Cách Tính Toán Chi tiết từ Tọa độ Bounding Box

Giả sử có hai hộp bao định dạng $(x_1, y_1, x_2, y_2)$ là $A$ và $B$:

1. **Tìm tọa độ hình chữ nhật giao nhau ($A \cap B$):**
   $$x_{\text{inter1}} = \max(x_{1A}, x_{1B}), \quad y_{\text{inter1}} = \max(y_{1A}, y_{1B})$$
   $$x_{\text{inter2}} = \min(x_{2A}, x_{2B}), \quad y_{\text{inter2}} = \min(y_{2A}, y_{2B})$$
2. **Tính chiều rộng và chiều cao phần giao:**
   $$w_{\text{inter}} = \max(0, x_{\text{inter2}} - x_{\text{inter1}}), \quad h_{\text{inter}} = \max(0, y_{\text{inter2}} - y_{\text{inter1}})$$
   $$\text{Diện tích giao} = w_{\text{inter}} \times h_{\text{inter}}$$
3. **Tính diện tích phần hợp:**
   $$\text{Diện tích hợp} = \text{Area}(A) + \text{Area}(B) - \text{Diện tích giao}$$

---

## 3. Vai trò then chốt của IoU trong Object Detection

IoU xuất hiện ở 4 công đoạn quan trọng nhất của bài toán [[Object Detection]]:

1. **Gán nhãn mẫu trong lúc huấn luyện (Label Assignment):**
   - Một [[Anchor Box]] hoặc đề xuất vùng được coi là mẫu tích cực (*Positive Sample / Foreground*) nếu có $\text{IoU} \ge 0.5$ (hoặc $0.7$) với nhãn thật.
   - Các anchor có $\text{IoU} < 0.3$ được xem là mẫu tiêu cực (*Negative Sample / Background*).
2. **Lọc box trùng lặp qua [[Non-Maximum Suppression (NMS)]]:**
   - Các box dự đoán cùng một đối tượng có $\text{IoU}$ lớn hơn ngưỡng (ví dụ $\text{IoU} > 0.45$) sẽ bị loại bỏ để giữ lại box có điểm tin cậy cao nhất.
3. **Tiêu chuẩn tính toán chỉ số [[Mean Average Precision (mAP)]]:**
   - Một dự đoán chỉ được coi là Đúng (*True Positive*) nếu có $\text{IoU}$ với nhãn thật lớn hơn ngưỡng quy định (ví dụ: $\text{IoU} \ge 0.5$ đối với mAP@50).
4. **Hàm mất mát trực tiếp (Bounding Box Loss):**
   - Sử dụng $\mathcal{L}_{\text{IoU}} = 1 - \text{IoU}$ hoặc các biến thể mở rộng để tối ưu hóa trực tiếp hình học hộp bao.

---

## 4. Các Biến thể Mở rộng của IoU

- **GIoU (Generalized IoU):** Giải quyết trường hợp hai box không giao nhau ($\text{IoU} = 0$). Tính thêm khoảng cách của hình hộp bao nhỏ nhất $C$ chứa cả hai box, giúp gradients không bị biến mất.
- **DIoU (Distance IoU):** Bổ sung tỷ lệ khoảng cách giữa hai tâm hộp bao so với đường chéo của hộp bao nhỏ nhất $C$, giúp kéo hai hộp về cùng vị trí nhanh hơn nhiều lần.
- **CIoU (Complete IoU):** Tích hợp đồng thời cả ba yếu tố: diện tích trùng khớp, khoảng cách tâm, và sự sai lệch về tỷ lệ khung hình (*aspect ratio* $w/h$).

---

## 5. Liên kết hệ thống & Nguồn (System Links & Sources)

- [[Bounding Box]] — Đối tượng hình học đầu vào để tính toán IoU.
- [[Object Detection]] — Bài toán sử dụng IoU xuyên suốt các khâu.
- [[Anchor Box]] — Được phân loại Positive/Negative dựa trên ngưỡng IoU.
- [[Non-Maximum Suppression (NMS)]] — Sử dụng ngưỡng IoU để khử các box trùng lặp.
- [[Mean Average Precision (mAP)]] — Thước đo độ chính xác dựa trên ngưỡng IoU.
- [[Detection Transformer (DETR)]] — Sử dụng GIoU trong hàm chi phí ghép cặp Hungarian.
