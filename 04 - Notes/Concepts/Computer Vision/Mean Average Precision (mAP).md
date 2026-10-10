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
  - Mean Average Precision
  - mAP
  - Average Precision
  - AP
---

# Mean Average Precision (mAP)

## 1. Định nghĩa & Bản chất (Definition & Core Idea)

- **Định nghĩa ngắn gọn:** **Mean Average Precision (mAP)** là thước đo đánh giá hiệu năng tiêu chuẩn và toàn diện nhất trong bài toán [[Object Detection]], được tính bằng **trung bình cộng của độ chính xác trung bình (Average Precision - AP)** trên tất cả các lớp đối tượng mục tiêu.
- **Bản chất toán học:** mAP tích hợp đồng thời cả hai yếu tố:
  1. **Khả năng phân loại đúng lớp** (Classification performance).
  2. **Khả năng định vị không gian chính xác** (Localization accuracy, đo bằng chỉ số [[Intersection over Union (IoU)]]).
  3. **Khả năng cân bằng giữa Độ chính xác (Precision) và Độ bao phủ (Recall)** trên toàn bộ dải ngưỡng điểm tin cậy.

---

## 2. Các Bước Tính Toán Từ Precision-Recall Đến mAP

### Bước 1: Xác định True Positive (TP) và False Positive (FP)
Mỗi hộp bao dự đoán của mô hình được xếp vào một trong hai nhóm dựa trên ngưỡng $\text{IoU}_{\text{thresh}}$ (ví dụ $0.5$):
- **True Positive (TP):** Dự đoán đúng nhãn lớp VÀ có $\text{IoU} \ge \text{IoU}_{\text{thresh}}$ với một nhãn thật chưa được ghép cặp.
- **False Positive (FP):** Dự đoán sai nhãn lớp, HOẶC $\text{IoU} < \text{IoU}_{\text{thresh}}$, HOẶC là box dự đoán dư thừa thứ hai cho một vật thể đã được ghép cặp trước đó.
- **False Negative (FN):** Vật thể thật trong ảnh bị mô hình bỏ sót hoàn toàn.

### Bước 2: Dựng Đường cong Precision - Recall (P-R Curve)
1. Sắp xếp toàn bộ các dự đoán của một lớp theo thứ tự điểm tin cậy (*confidence score*) giảm dần.
2. Tại mỗi vị trí $k$, tính Precision và Recall tích lũy:
   $$\text{Precision}(k) = \frac{\text{TP}_k}{\text{TP}_k + \text{FP}_k}, \quad \text{Recall}(k) = \frac{\text{TP}_k}{\text{Tổng số vật thể thật của lớp}}$$
3. Vẽ đồ thị với trục tung là Precision và trục hoành là Recall.

### Bước 3: Tính Average Precision (AP) cho từng lớp
AP là diện tích dưới đường cong P-R (Area Under Curve). Để loại bỏ sự trồi sụt gồ ghề, đường cong được làm mịn bằng phép nội suy (*Interpolated Precision*):
$$p_{\text{interp}}(r) = \max_{\tilde{r} \ge r} p(\tilde{r})$$
$$\text{AP} = \int_{0}^{1} p_{\text{interp}}(r) dr$$

### Bước 4: Tính mAP trên toàn bộ tập dữ liệu
Lấy trung bình cộng AP của tất cả $C$ lớp đối tượng:
$$\text{mAP} = \frac{1}{C} \sum_{c=1}^{C} \text{AP}_c$$

---

## 3. Các Tiêu chuẩn Đo lường mAP Phổ biến

| Tiêu chuẩn | Ký hiệu | Cách tính | Ý nghĩa đánh giá |
| :--- | :--- | :--- | :--- |
| **Pascal VOC** | **mAP@50** (hoặc $AP_{50}$) | Tính AP tại ngưỡng cố định $\text{IoU} = 0.50$ | Đánh giá khả năng phát hiện ở mức độ định vị tương đối dễ thở. |
| **Định vị khắt khe** | **mAP@75** (hoặc $AP_{75}$) | Tính AP tại ngưỡng khắt khe $\text{IoU} = 0.75$ | Đòi hỏi hộp bao dự đoán phải ôm sát viền vật thể thực tế. |
| **COCO Standard** | **mAP@[.5:.95]** (hay $mAP$) | Lấy trung bình của 10 ngưỡng $\text{IoU}$ từ $0.50$ đến $0.95$ với bước nhảy $0.05$ | **Tiêu chuẩn học thuật khắt khe nhất hiện nay**, phản ánh toàn diện cả phân loại lẫn độ chính xác tọa độ. |
| **Theo kích thước** | **$AP_s, AP_m, AP_l$** | Tính riêng cho vật thể nhỏ ($<32^2$ px), vừa ($32^2 - 96^2$ px), lớn ($>96^2$ px) | Giúp chẩn đoán điểm yếu của mô hình đối với vật thể nhỏ. |

---

## 4. Phân biệt khái niệm & Những hiểu lầm (Distinctions & Misconceptions)

### Hiểu lầm: "Mô hình có mAP@50 cao thì ứng dụng vào quầy thanh toán tự động sẽ chuẩn."
- *Thực tế:* Trong bài toán quầy thanh toán bán lẻ (như dự án [[06 - Projects/AutoCheckout/README|AutoCheckout-CL]]), mAP cao là điều kiện cần nhưng **không phải điều kiện đủ**.
- Một mô hình có thể đạt mAP@50 = 90% nhưng nếu trên một khay hàng gồm 10 sản phẩm, nó đếm thừa 1 lon nước ngọt và đếm thiếu 1 gói bánh, thì hóa đơn tính tiền bị sai hoàn toàn!
- Do đó, trong thực tế cần bổ sung các chỉ số đo lường nghiệp vụ:
  - **cAcc (Checkout Accuracy):** Tỷ lệ các khay hàng được đếm chính xác $100\%$ toàn bộ các SKU.
  - **ACD (Average Counting Distance):** Số lượng sản phẩm bị đếm lệch trung bình trên mỗi khay.

---

## 5. Liên kết hệ thống & Nguồn (System Links & Sources)

- [[Object Detection]] — Bài toán sử dụng mAP làm chỉ số đánh giá trung tâm.
- [[Intersection over Union (IoU)]] — Ngưỡng quyết định một phát hiện là True Positive hay False Positive.
- [[Bounding Box]] — Cơ sở để đo độ lệch hình học tính IoU.
- [[06 - Projects/AutoCheckout/README|AutoCheckout-CL]] — Dự án kết hợp mAP với Checkout Accuracy (cAcc) để đánh giá hệ thống tính tiền tự động.
