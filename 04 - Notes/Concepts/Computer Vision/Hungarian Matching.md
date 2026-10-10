---
type: concept
status: growing
domains:
  - "[[Computing]]"
  - "[[Mathematics]]"
themes:
  - "[[Learning and Intelligence]]"
source: []
created: 2026-10-01
updated: 2026-10-01
aliases:
  - Hungarian Matching
  - Hungarian Algorithm
  - Hungarian Bipartite Matching
  - Thuật toán Hungarian
  - Kuhn-Munkres Algorithm
  - Gán nhãn 1-1 tối ưu
---

# Hungarian Matching (Thuật toán Ghép Cặp Tối Ưu Hungarian)

## 1. Định nghĩa & Bản chất Toán học (Definition & Core Concept)

- **Định nghĩa ngắn gọn:** **Hungarian Matching** — hay còn gọi là **Thuật toán Hungarian** hoặc *Thuật toán Kuhn-Munkres* — là một thuật toán tối ưu hóa tổ hợp giải quyết **Bài toán Phân công Tuyến tính (Linear Assignment Problem)** trên đồ thị hai phía (*Bipartite Graph*), nhằm tìm phép ghép cặp tương ứng một-một (1-to-1 Matching) giữa hai tập hợp có cùng kích thước sao cho tổng chi phí là nhỏ nhất (hoặc tổng lợi ích là lớn nhất).
- **Lịch sử ra đời:** Thuật toán được Harold Kuhn công bố năm 1955 dựa trên các công trình lý thuyết đồ thị trước đó của hai nhà toán học Hungary là Dénes Kőnig và Jenő Egerváry (vì vậy được đặt tên là Hungarian Algorithm). James Munkres sau đó đã hiệu chỉnh lại vào năm 1957 để chứng minh thuật toán chạy trong thời gian đa thức thực sự, mang lại độ phức tạp $O(N^3)$.
- **Phát biểu bài toán:**
  Cho ma trận chi phí vuông $C \in \mathbb{R}^{N \times N}$, trong đó $C_{i, j}$ là chi phí khi gán phần tử $i$ của tập thứ nhất cho phần tử $j$ của tập thứ hai. Mục tiêu là tìm một hoán vị $\sigma \in \mathfrak{S}_N$ trong tập tất cả các hoán vị sao cho:
  $$\min_{\sigma \in \mathfrak{S}_N} \sum_{i=1}^{N} C_{i, \sigma(i)}$$

---

## 2. Nguyên lý Vận hành Cổ điển (Classical Kuhn-Munkres Algorithm)

Thuật toán dựa trên định lý then chốt: **Nếu ta cộng hoặc trừ một hằng số vào bất kỳ hàng nào hoặc cột nào của ma trận chi phí, cấu hình ghép cặp tối ưu không hề thay đổi**.

Các bước cơ bản:
1. **Rút gọn hàng (Row Reduction):** Tìm giá trị nhỏ nhất của mỗi hàng và trừ giá trị đó khỏi mọi phần tử trong hàng tương ứng (mỗi hàng xuất hiện ít nhất một số 0).
2. **Rút gọn cột (Column Reduction):** Tìm giá trị nhỏ nhất của mỗi cột và trừ giá trị đó khỏi mọi phần tử trong cột tương ứng (mỗi cột xuất hiện ít nhất một số 0).
3. **Phủ số 0 (Zero Covering):** Sử dụng số lượng tối thiểu các đường thẳng (ngang và dọc) để phủ toàn bộ các số 0 trong ma trận.
4. **Kiểm tra điều kiện dừng:**
   - Nếu số đường thẳng cần dùng bằng $N$, bài toán đã đạt trạng thái tối ưu. Các vị trí số 0 độc lập xác định phép phân công một-một tối ưu.
   - Nếu số đường thẳng nhỏ hơn $N$, chuyển sang bước điều chỉnh ma trận.
5. **Điều chỉnh ma trận (Matrix Adjustment):**
   - Tìm giá trị nhỏ nhất $k$ trong các phần tử chưa bị bất kỳ đường thẳng nào phủ qua.
   - Trừ $k$ khỏi tất cả các phần tử chưa bị phủ.
   - Cộng $k$ vào các phần tử nằm tại giao điểm của hai đường thẳng phủ.
   - Giữ nguyên các phần tử chỉ bị một đường thẳng phủ qua.
   - Quay lại Bước 3.

---

## 3. Vai trò Đột phá trong Thị giác Máy tính & DETR

Trước khi có kiến trúc [[Detection Transformer (DETR)]], các mô hình [[Object Detection]] truyền thống (như Faster R-CNN, YOLO, SSD) sử dụng cơ chế gán nhãn Heuristic dựa trên ngưỡng [[Intersection over Union (IoU)]]:
- Một đối tượng thật thường được gán cho nhiều [[Anchor Box]] vượt ngưỡng IoU (quan hệ một-nhiều: 1-to-many).
- Hậu quả: Mô hình bắt buộc phải sinh ra hàng loạt dự đoán trùng lặp xung quanh một vật thể, dẫn đến sự phụ thuộc không thể gạt bỏ vào thuật toán hậu xử lý [[Non-Maximum Suppression (NMS)]].

### 3.1. Chuyển đổi thành Bài toán Dự đoán Tập hợp Trực tiếp (Direct Set Prediction)

DETR chuyển đổi toàn bộ bài toán phát hiện vật thể thành việc dự đoán một tập hợp cố định $N$ dự đoán (thường $N = 100$ hoặc $300$), trong khi ảnh thực tế chỉ chứa $M$ vật thể thật ($M < N$).
- Để hai tập hợp có kích thước bằng nhau, DETR độn thêm $N - M$ nhãn rỗng $\varnothing$ (*no object / background*) vào tập nhãn thật.
- Ma trận chi phí ghép cặp $\mathcal{L}_{\text{match}}(y_i, \hat{y}_{\sigma(i)})$ giữa nhãn thật $y_i = (c_i, b_i)$ và dự đoán thứ $\sigma(i)$ gồm hai thành phần xác suất phân loại và sai số hộp bao:
  $$\mathcal{L}_{\text{match}}(y_i, \hat{y}_{\sigma(i)}) = - \mathbb{I}_{\{c_i \ne \varnothing\}} \hat{p}_{\sigma(i)}(c_i) + \mathbb{I}_{\{c_i \ne \varnothing\}} \mathcal{L}_{\text{box}}(b_i, \hat{b}_{\sigma(i)})$$
  Trong đó $\mathcal{L}_{\text{box}}$ kết hợp khoảng cách L1 và hàm mất mát Generalized IoU:
  $$\mathcal{L}_{\text{box}}(b_i, \hat{b}_{\sigma(i)}) = \lambda_{\text{L1}} \|b_i - \hat{b}_{\sigma(i)}\|_1 + \lambda_{\text{giou}} \mathcal{L}_{\text{giou}}(b_i, \hat{b}_{\sigma(i)})$$

### 3.2. Tìm kiếm Hoán vị Ghép cặp Toàn cục và Tính Hungarian Loss

Mô hình gọi thuật toán Hungarian (thường triển khai qua hàm `scipy.optimize.linear_sum_assignment`) để tìm hoán vị tối ưu $\hat{\sigma}$:
$$\hat{\sigma} = \arg\min_{\sigma \in \mathfrak{S}_N} \sum_{i=1}^{N} \mathcal{L}_{\text{match}}(y_i, \hat{y}_{\sigma(i)})$$

Sau khi xác định được chính xác hoán vị $\hat{\sigma}$, mô hình tính toán hàm mất mát **Hungarian Loss** để lan truyền ngược cập nhật trọng số:
$$\mathcal{L}_{\text{Hungarian}}(y, \hat{y}) = \sum_{i=1}^{N} \left[ -\log \hat{p}_{\hat{\sigma}(i)}(c_i) + \mathbb{I}_{\{c_i \ne \varnothing\}} \mathcal{L}_{\text{box}}(b_i, \hat{b}_{\hat{\sigma}(i)}) \right]$$

---

## 4. So sánh: Hungarian Matching vs Heuristic Label Assignment

| Tiêu chí | Gán nhãn Heuristic (IoU Thresholding) | Ghép cặp Hungarian (Hungarian Matching) |
| :--- | :--- | :--- |
| **Kiến trúc áp dụng** | Faster R-CNN, SSD, họ YOLO | DETR, Deformable DETR, DINO-DETR |
| **Bản chất gán nhãn** | Một-nhiều (1 ground truth $\to$ nhiều anchors/grids) | Một-một nghiêm ngặt (1 ground truth $\leftrightarrow$ đúng 1 Object Query) |
| **Phụ thuộc vào NMS** | Bắt buộc phải dùng [[Non-Maximum Suppression (NMS)]] | **Loại bỏ hoàn toàn NMS** |
| **Không gian tối ưu** | Tối ưu cục bộ độc lập cho từng vị trí | Tối ưu hóa tổ hợp toàn cục trên toàn bộ ảnh |
| **Độ ổn định huấn luyện** | Rất ổn định ngay từ đầu | Ban đầu kém ổn định do hoán vị thay đổi liên tục giữa các epoch (Hungarian Bipartite Instability) |
| **Giải pháp khắc phục** | Tinh chỉnh anchor scales, Focal Loss | Thêm Denoising Training (DN-DETR, DINO-DETR), Co-DETR |

---

## 5. Ví dụ Triển khai với Python (`scipy`)

```python
import numpy as np
from scipy.optimize import linear_sum_assignment

# Ma trận chi phí ghép cặp giữa 3 Ground Truth (hàng) và 5 Dự đoán (cột)
# Chi phí gồm tổng hợp của phân loại sai và sai lệch tọa độ Bounding Box
cost_matrix = np.array([
    [0.15, 0.82, 0.95, 0.40, 0.70],  # GT 0: Tương đồng cao nhất với Pred 0
    [0.78, 0.12, 0.65, 0.88, 0.35],  # GT 1: Tương đồng cao nhất với Pred 1
    [0.60, 0.75, 0.08, 0.90, 0.55],  # GT 2: Tương đồng cao nhất với Pred 2
])

# Hungarian Matching tìm cấu hình ghép cặp tối ưu
row_ind, col_ind = linear_sum_assignment(cost_matrix)

# Kết quả:
# row_ind: [0, 1, 2] (Các Ground Truth)
# col_ind: [0, 1, 2] (Các Bounding Box dự đoán được ghép cặp tương ứng 1-1)
# Các dự đoán còn lại [3, 4] tự động được gán nhãn background (no-object)
```

---

## 6. Liên kết Hệ thống (System Links)

- [[Detection Transformer (DETR)]] — Kiến trúc ứng dụng then chốt đưa Hungarian Matching vào bài toán phát hiện vật thể.
- [[Bounding Box]] — Đối tượng hình học được sử dụng để tính chi phí tọa độ L1 và GIoU.
- [[Intersection over Union (IoU)]] — Cơ sở tính mất mát độ trùng khớp hình học Generalized IoU trong ma trận chi phí.
- [[Non-Maximum Suppression (NMS)]] — Thuật toán hậu xử lý mà Hungarian Matching loại bỏ thành công.
- [[Object Detection]] — Bài toán lớn mà Hungarian Matching giải quyết cơ chế gán nhãn.
- [[Computing]] • [[Mathematics]] — Các domain lý thuyết nền tảng.
