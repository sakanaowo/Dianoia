---
type: concept
status: growing
domains:
  - "[[Science]]"
  - "[[Philosophy]]"
themes:
  - "[[Knowledge and Truth]]"
source: []
created: 2026-07-26
updated: 2026-07-26
aliases:
---
# Tương Quan

> [!abstract]  
> **Tương quan** là mức độ hai biến thay đổi cùng nhau trong dữ liệu. Nó cho biết **hướng**, **độ mạnh** và đôi khi là **dạng quan hệ** giữa các biến, nhưng tự nó không chứng minh rằng biến này gây ra biến kia.

## Định nghĩa ngắn

**Tương quan** là một dạng [[Liên hệ thống kê]] trong đó giá trị hoặc sự biến thiên của một biến có xu hướng đi kèm với giá trị hoặc sự biến thiên của biến khác.

Trong cách dùng phổ biến nhất, hệ số tương quan Pearson đo **hướng và độ mạnh của quan hệ tuyến tính** giữa hai biến định lượng. Tuy nhiên, “tương quan” theo nghĩa rộng còn bao gồm những thước đo khác như tương quan Spearman, Kendall và tương quan riêng phần.

Có thể tóm tắt:

> **Tương quan trả lời câu hỏi: Khi (X) thay đổi, (Y) có xu hướng thay đổi cùng với nó không?**

---

## Nói đơn giản

Tương quan nghĩa là hai thứ có một **mẫu biến đổi chung** trong dữ liệu.

Ví dụ:

- Người cao hơn thường có cân nặng lớn hơn.
    
- Nhiệt độ ngoài trời càng thấp thì lượng điện dùng để sưởi có thể càng cao.
    
- Thời gian học nhiều hơn có thể đi kèm với điểm thi cao hơn.
    
- Giá của hai loại tài sản có thể thường tăng giảm cùng nhau.
    

Nếu (X) tăng và (Y) cũng thường tăng, ta nói chúng có **tương quan dương**:

```text
X tăng → Y có xu hướng tăng
```

Nếu (X) tăng còn (Y) thường giảm, ta nói chúng có **tương quan âm**:

```text
X tăng → Y có xu hướng giảm
```

Nếu sự thay đổi của (X) không đi kèm một xu hướng rõ ràng của (Y), tương quan có thể gần 0.

Tuy nhiên:

> “Thay đổi cùng nhau” không đồng nghĩa với “một biến tạo ra sự thay đổi của biến kia”.

Hai biến có thể tương quan vì:

- (X) gây ra (Y).
    
- (Y) gây ra (X).
    
- Một biến thứ ba (Z) gây ra cả hai.
    
- Cách chọn dữ liệu tạo ra mối liên hệ.
    
- Cả hai cùng biến đổi theo thời gian.
    
- Quan hệ chỉ là sự trùng hợp trong mẫu.
    

---

## Câu hỏi mà concept này trả lời

### Concept này được tạo ra để giải quyết hoặc mô tả vấn đề gì?

Tương quan giúp trả lời:

- Hai biến có liên hệ thống kê với nhau không?
    
- Khi một biến tăng, biến còn lại có xu hướng tăng hay giảm?
    
- Quan hệ giữa chúng mạnh hay yếu?
    
- Quan hệ gần tuyến tính hay chỉ đơn điệu?
    
- Một biến có thể được dùng để hỗ trợ dự đoán biến kia không?
    
- Quan hệ quan sát được có ổn định giữa các nhóm không?
    
- Sau khi kiểm soát một biến thứ ba, hai biến còn liên hệ không?
    
- Những feature nào trong dữ liệu có xu hướng mang thông tin giống nhau?
    

### Nếu không có concept này, ta sẽ hiểu sai điều gì?

Ta sẽ khó phân biệt:

- Một mẫu biến đổi chung với nhiễu ngẫu nhiên.
    
- Quan hệ dương với quan hệ âm.
    
- Quan hệ mạnh với quan hệ yếu.
    
- Quan hệ tuyến tính với quan hệ phi tuyến.
    
- Liên hệ thống kê với [[Nhân Quả]].
    
- Tương quan bằng 0 với [[Độc Lập Thống Kê]].
    
- Độ mạnh quan hệ với độ dốc của đường hồi quy.
    
- Ý nghĩa thống kê với ý nghĩa thực tế.
    

Không có concept tương quan, ta có thể chỉ nhìn vào vài ví dụ riêng lẻ rồi kết luận chủ quan rằng hai biến “có vẻ liên quan”.

---

## Vai trò trong domain

Tương quan là concept nền tảng trong:

- [[Xác suất]]
    
- [[Thống kê mô tả]]
    
- [[Thống kê suy luận]]
    
- [[Phân tích dữ liệu]]
    
- [[Hồi quy]]
    
- [[Khoa học dữ liệu]]
    
- [[Machine Learning]]
    
- [[Tâm lý học]]
    
- [[Dịch tễ học]]
    
- [[Kinh tế lượng]]
    
- [[Tài chính]]
    
- [[Suy luận nhân quả]]
    

### Vị trí trong hệ thống concept

```text
[[Dữ liệu]]
    ↓
[[Biến]]
    ↓
[[Quan hệ giữa các biến]]
    ├── [[Hiệp phương sai]]
    ├── [[Tương quan]]
    │      ├── [[Pearson Correlation]]
    │      ├── [[Spearman Correlation]]
    │      ├── [[Kendall Tau]]
    │      └── [[Partial Correlation]]
    ├── [[Hồi quy]]
    ├── [[Phụ thuộc thống kê]]
    └── [[Nhân quả]]
```

### Concept tầng trên

- [[Quan hệ]]
    
- [[Liên hệ thống kê]]
    
- [[Phụ thuộc thống kê]]
    
- [[Biến ngẫu nhiên]]
    
- [[Phân phối xác suất]]
    

### Concept cùng tầng

- [[Hiệp phương sai]]
    
- [[Hồi quy]]
    
- [[Mutual Information]]
    
- [[Association]]
    
- [[Statistical Dependence]]
    

### Concept tầng dưới hoặc ứng dụng

- [[Pearson Correlation]]
    
- [[Spearman Correlation]]
    
- [[Kendall Tau]]
    
- [[Point-Biserial Correlation]]
    
- [[Partial Correlation]]
    
- [[Autocorrelation]]
    
- [[Cross-Correlation]]
    
- [[Correlation Matrix]]
    
- [[Multicollinearity]]
    
- [[Feature Selection]]
    

Trong thống kê, Pearson (r) thường được dùng để tóm tắt quan hệ tuyến tính giữa hai biến định lượng. Spearman và Kendall tập trung vào thứ hạng hoặc quan hệ đơn điệu, còn tương quan riêng phần xem xét quan hệ giữa hai biến sau khi loại bỏ phần liên hệ tuyến tính với một hoặc nhiều biến khác.

---

## Bối cảnh lịch sử / nguồn gốc

### Etymology

#### Gốc từ và nghĩa gốc

“Tương quan” là từ Hán–Việt của **相關**:

- **Tương – 相**: lẫn nhau, qua lại, giữa các phía.
    
- **Quan – 關**: liên quan, nối với, có quan hệ.
    

Nghĩa gốc gợi đến các sự vật **có liên hệ với nhau**.

Từ tiếng Anh **correlation** đi qua tiếng Pháp _corrélation_ và Medieval Latin _correlatio_, mang nghĩa quan hệ qua lại, sự liên kết hoặc phụ thuộc lẫn nhau.

#### Bước ngoặt chuyển nghĩa

Ban đầu, “correlation” có nghĩa rộng là sự liên hệ qua lại. Đến cuối thế kỷ XIX, nó được phát triển thành một concept toán học dùng để định lượng quan hệ giữa các đặc điểm có thể đo lường.

Francis Galton đặt những nền móng quan trọng cho tư duy về tương quan và hồi quy khi nghiên cứu sự di truyền. Karl Pearson sau đó phát triển dạng hệ số tương quan product–moment hiện được sử dụng phổ biến và trình bày nó trong nghiên cứu năm 1896.

Charles Spearman phát triển cách đo tương quan dựa trên thứ hạng vào đầu thế kỷ XX; hệ số Spearman thường được gắn với công trình năm 1904.

#### Insight gốc từ

“Tương quan” không nói rằng một bên điều khiển bên kia. Nó chỉ nói rằng:

> Khi đặt hai biến cạnh nhau, ta quan sát được một cấu trúc biến đổi chung.

Về mặt thống kê:

```text
Biến thiên của X
       ↕
có liên hệ với
       ↕
Biến thiên của Y
```

### Concept này xuất hiện từ vấn đề nào?

Tương quan xuất hiện từ nhu cầu định lượng những quan sát như:

- Cha mẹ cao thường có con cao hơn trung bình hay không?
    
- Hai đặc điểm sinh học có xu hướng đi cùng nhau không?
    
- Một chỉ số có thể hỗ trợ dự đoán chỉ số khác không?
    
- Quan hệ quan sát được mạnh đến mức nào?
    
- Có thể so sánh quan hệ giữa các biến được đo bằng những đơn vị khác nhau không?
    

[[Hiệp Phương Sai]] đã có thể biểu diễn việc hai biến cùng biến thiên, nhưng giá trị của nó phụ thuộc vào đơn vị đo. Hệ số tương quan Pearson chuẩn hóa hiệp phương sai bằng độ lệch chuẩn của hai biến, tạo ra một giá trị không có đơn vị và nằm trong khoảng từ (-1) đến (1).

### Ai hoặc trường phái nào làm nó quan trọng?

#### Francis Galton

Galton phát triển những ý tưởng ban đầu về correlation và regression qua nghiên cứu các đặc điểm di truyền. Những công trình này góp phần hình thành thống kê hiện đại, nhưng cũng gắn với chương trình ưu sinh mà Galton và Pearson cổ vũ; đây là phần lịch sử cần được nhìn nhận phê phán.

#### Karl Pearson

Pearson xây dựng các tính chất toán học của hệ số tương quan product–moment và mở rộng các phương pháp tương quan cho nhiều loại dữ liệu. Dạng hệ số Pearson hiện đại bắt nguồn từ công trình của ông vào cuối thế kỷ XIX.

#### Charles Spearman

Spearman đưa ra phương pháp tính tương quan trên **thứ hạng**, giúp nghiên cứu quan hệ đơn điệu mà không yêu cầu quan hệ phải tuyến tính như Pearson.

#### Maurice Kendall

Kendall phát triển hệ số dựa trên việc so sánh các cặp quan sát đồng thuận và nghịch thuận. Kendall’s tau đặc biệt phù hợp khi dữ liệu mang tính thứ bậc hoặc khi ta muốn diễn giải quan hệ qua trật tự các cặp.

### Có thay đổi nghĩa qua thời gian không?

|Giai đoạn|Nghĩa nổi bật|
|---|---|
|Cách dùng ngôn ngữ ban đầu|Quan hệ hoặc liên hệ qua lại|
|Cuối thế kỷ XIX|Quan hệ giữa các đặc điểm định lượng|
|Galton–Pearson|Tương quan và hồi quy trong sinh học, di truyền|
|Đầu thế kỷ XX|Phát triển tương quan thứ hạng và suy luận thống kê|
|Thống kê hiện đại|Một họ các thước đo association khác nhau|
|Data science hiện đại|Phân tích feature, khám phá dữ liệu và phát hiện redundancy|

---

## Cơ chế / cách vận hành

### Ý tưởng cơ bản

Giả sử ta thu thập các cặp quan sát:

[  
(x_1,y_1),(x_2,y_2),\ldots,(x_n,y_n)  
]

Mỗi cặp phải thuộc về cùng một đơn vị:

|Đối tượng|(X)|(Y)|
|---|--:|--:|
|Người 1|Chiều cao|Cân nặng|
|Người 2|Chiều cao|Cân nặng|
|Người 3|Chiều cao|Cân nặng|

Sau đó, ta quan sát cách các điểm ((x_i,y_i)) phân bố trên [[Scatter Plot]].

### Bước 1: Xác định độ lệch khỏi trung bình

Với mỗi quan sát:

[  
x_i-\bar{x}  
]

cho biết (x_i) cao hay thấp hơn trung bình của (X).

Tương tự:

[  
y_i-\bar{y}  
]

cho biết (y_i) cao hay thấp hơn trung bình của (Y).

### Bước 2: So sánh dấu của hai độ lệch

Nếu cả hai cùng nằm trên trung bình:

[  
(x_i-\bar{x})(y_i-\bar{y})>0  
]

Nếu cả hai cùng nằm dưới trung bình, tích vẫn dương.

Nếu một biến trên trung bình còn biến kia dưới trung bình, tích âm.

Do đó:

- Nhiều tích dương → xu hướng tương quan dương.
    
- Nhiều tích âm → xu hướng tương quan âm.
    
- Các tích dương và âm triệt tiêu → tương quan gần 0.
    

### Bước 3: Tính hiệp phương sai

# [  
\operatorname{Cov}(X,Y)

E[(X-\mu_X)(Y-\mu_Y)]  
]

Hiệp phương sai dương cho thấy hai biến có xu hướng lệch khỏi trung bình cùng hướng; hiệp phương sai âm cho thấy chúng có xu hướng lệch ngược hướng.

### Bước 4: Chuẩn hóa

Hiệp phương sai phụ thuộc vào đơn vị đo. Pearson correlation chia hiệp phương sai cho tích độ lệch chuẩn:

# [  
\rho_{XY}

\frac{\operatorname{Cov}(X,Y)}  
{\sigma_X\sigma_Y}  
]

Nhờ đó, hệ số tương quan:

- Không có đơn vị.
    
- Không thay đổi khi đổi đơn vị tuyến tính, chẳng hạn mét sang centimet.
    
- Nằm trong khoảng ([-1,1]).
    

### Diễn giải hình học

#### Tương quan dương

```text
Y
│          •
│       •
│    •
│ •
└──────────── X
```

Khi (X) tăng, (Y) có xu hướng tăng.

#### Tương quan âm

```text
Y
│ •
│    •
│       •
│          •
└──────────── X
```

Khi (X) tăng, (Y) có xu hướng giảm.

#### Không có xu hướng tuyến tính rõ ràng

```text
Y
│   •     •
│      •
│ •       •
│    •
└──────────── X
```

### Quan hệ phi tuyến có thể có Pearson (r=0)

Ví dụ:

[  
Y=X^2  
]

Nếu dữ liệu của (X) đối xứng quanh 0, (Y) phụ thuộc hoàn toàn vào (X), nhưng Pearson correlation có thể bằng hoặc gần 0 vì xu hướng bên trái và bên phải triệt tiêu nhau.

Do đó:

> (r=0) chỉ có nghĩa là không phát hiện quan hệ **tuyến tính**, không có nghĩa là hoàn toàn không tồn tại quan hệ.

---

## Thành phần / đặc điểm chính

### 1. Hướng

- **Dương:** Hai biến có xu hướng tăng hoặc giảm cùng nhau.
    
- **Âm:** Một biến tăng trong khi biến kia có xu hướng giảm.
    
- **Gần 0:** Không có xu hướng tuyến tính rõ ràng.
    

### 2. Độ mạnh

Với Pearson (r):

- (|r|) gần 1: Quan hệ tuyến tính mạnh.
    
- (|r|) gần 0: Quan hệ tuyến tính yếu.
    
- (r=1): Tuyến tính dương hoàn hảo.
    
- (r=-1): Tuyến tính âm hoàn hảo.
    

Không tồn tại một ngưỡng “yếu”, “vừa” hay “mạnh” phù hợp cho mọi lĩnh vực. Một hệ số nhỏ có thể quan trọng trong y tế hoặc xã hội học, trong khi cùng giá trị đó có thể không hữu ích trong một bài toán đo lường chính xác.

### 3. Dạng quan hệ

Cần xác định quan hệ là:

- Tuyến tính.
    
- Đơn điệu nhưng phi tuyến.
    
- Hình chữ U.
    
- Theo ngưỡng.
    
- Theo chu kỳ.
    
- Phân thành nhiều cụm.
    

Một hệ số đơn lẻ không thể biểu diễn đầy đủ mọi hình dạng.

### 4. Tính đối xứng

Với Pearson:

[  
r_{XY}=r_{YX}  
]

Tương quan giữa (X) và (Y) bằng tương quan giữa (Y) và (X).

Điều này khác hồi quy: hồi quy (Y) theo (X) không giống hồi quy (X) theo (Y).

### 5. Không có đơn vị

Tương quan không đo bằng kilogram, centimet, giây hoặc phần trăm. Nó là một đại lượng chuẩn hóa.

### 6. Nhạy cảm với dữ liệu

Pearson correlation có thể bị ảnh hưởng mạnh bởi:

- Outlier.
    
- Phân nhóm.
    
- Phạm vi dữ liệu.
    
- Quan hệ phi tuyến.
    
- Sai số đo.
    
- Dữ liệu bị thiếu.
    
- Một vài điểm có leverage cao.
    

Một outlier có thể tạo ra, làm yếu hoặc đảo ngược tương quan quan sát được.

### 7. Là thống kê mô tả trước khi là kết luận suy luận

Hệ số (r) mô tả mẫu đang có. Muốn kết luận về quần thể, cần xét thêm:

- Cách lấy mẫu.
    
- Kích thước mẫu.
    
- Khoảng tin cậy.
    
- Kiểm định giả thuyết.
    
- Các giả định của mô hình.
    

---

## Công thức / đại lượng / đơn vị liên quan

### 1. Hiệp phương sai

Đối với quần thể:

# [  
\operatorname{Cov}(X,Y)

E[(X-\mu_X)(Y-\mu_Y)]  
]

Đối với mẫu:

# [  
s_{XY}

\frac{1}{n-1}  
\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})  
]

- **Đại lượng:** Mức độ hai biến cùng biến thiên.
    
- **Đơn vị:** Đơn vị của (X) nhân đơn vị của (Y).
    
- **Hạn chế:** Khó so sánh giữa các thang đo khác nhau.
    

### 2. Tương quan Pearson trong quần thể

# [  
\rho_{XY}

\frac{\operatorname{Cov}(X,Y)}  
{\sigma_X\sigma_Y}  
]

Trong đó:

- (\rho): tương quan của quần thể.
    
- (\sigma_X): độ lệch chuẩn của (X).
    
- (\sigma_Y): độ lệch chuẩn của (Y).
    

Điều kiện cơ bản là hai biến có phương sai hữu hạn và khác 0.

### 3. Tương quan Pearson trong mẫu

[  
r=  
\frac{  
\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})  
}{  
\sqrt{\sum_{i=1}^{n}(x_i-\bar{x})^2}  
\sqrt{\sum_{i=1}^{n}(y_i-\bar{y})^2}  
}  
]

Các tính chất:

[  
-1\le r\le1  
]

- (r>0): Quan hệ tuyến tính dương.
    
- (r<0): Quan hệ tuyến tính âm.
    
- (r=0): Không có quan hệ tuyến tính trong mẫu.
    
- (r) không có đơn vị.
    

### 4. Tương quan Spearman

Spearman correlation được tính bằng cách:

1. Chuyển giá trị của mỗi biến thành thứ hạng.
    
2. Tính Pearson correlation giữa hai tập thứ hạng.
    

Khi không có các giá trị đồng hạng:

# [  
r_s

1-  
\frac{6\sum d_i^2}  
{n(n^2-1)}  
]

Trong đó:

- (d_i): Chênh lệch giữa hai thứ hạng của quan sát (i).
    
- (n): Số cặp quan sát.
    

Spearman đo độ mạnh của quan hệ **đơn điệu**: khi một biến tăng, biến kia có xu hướng luôn tăng hoặc luôn giảm, nhưng không nhất thiết theo đường thẳng.

### 5. Kendall’s tau

Kendall’s tau dựa trên việc đếm:

- Các cặp đồng thuận: thứ tự của (X) và (Y) giống nhau.
    
- Các cặp nghịch thuận: thứ tự của (X) và (Y) trái nhau.
    

Dạng đơn giản:

# [  
\tau

\frac{P-Q}  
{\binom{n}{2}}  
]

Trong đó:

- (P): Số cặp đồng thuận.
    
- (Q): Số cặp nghịch thuận.
    

Các biến thể như (\tau_b) điều chỉnh cho giá trị đồng hạng.

### 6. Tương quan riêng phần

Tương quan riêng phần giữa (X) và (Y), sau khi loại bỏ phần liên hệ tuyến tính với (Z):

# [  
r_{XY\cdot Z}

\frac{  
r_{XY}-r_{XZ}r_{YZ}  
}{  
\sqrt{(1-r_{XZ}^{2})(1-r_{YZ}^{2})}  
}  
]

Nó mô tả mối liên hệ tuyến tính còn lại giữa (X) và (Y) sau khi kiểm soát tuyến tính (Z). Tuy nhiên, “kiểm soát” về thống kê không tự động tạo ra diễn giải nhân quả.

### Đơn vị

**Không có đơn vị.**

Tương quan là đại lượng chuẩn hóa; trọng tâm là:

- Hướng.
    
- Độ mạnh.
    
- Dạng quan hệ.
    
- Độ bất định của ước lượng.
    

---

## Cách quan sát / đo lường / nhận biết

### Quy trình phân tích cơ bản

#### 1. Xác định cặp biến

Kiểm tra:

- Hai biến có được đo trên cùng đối tượng không?
    
- Biến là định lượng, thứ bậc hay phân loại?
    
- Các quan sát có độc lập không?
    
- Có dữ liệu theo thời gian hoặc lặp lại không?
    

#### 2. Vẽ biểu đồ trước

Với hai biến định lượng, nên bắt đầu bằng [[Scatter Plot]].

Biểu đồ giúp nhìn thấy:

- Hướng quan hệ.
    
- Mức phân tán.
    
- Quan hệ phi tuyến.
    
- Outlier.
    
- Cụm dữ liệu.
    
- Khoảng trống.
    
- Hiệu ứng trần hoặc sàn.
    

Một hệ số duy nhất có thể che giấu những cấu trúc này.

#### 3. Chọn loại hệ số phù hợp

|Điều kiện dữ liệu|Thước đo thường dùng|
|---|---|
|Hai biến định lượng, quan hệ tuyến tính|Pearson (r)|
|Quan hệ đơn điệu hoặc dữ liệu thứ bậc|Spearman (r_s)|
|Quan tâm thứ tự của các cặp|Kendall (\tau)|
|Một biến liên tục, một biến nhị phân|Point-biserial correlation|
|Loại bỏ liên hệ với biến thứ ba|Partial correlation|
|Dữ liệu theo thời gian|Autocorrelation hoặc cross-correlation|

#### 4. Tính hệ số

Không nên chỉ nhìn dấu của hệ số. Cần xét đồng thời:

- Độ lớn.
    
- Kích thước mẫu.
    
- Khoảng tin cậy.
    
- Scatter plot.
    
- Outlier.
    
- Bối cảnh domain.
    

#### 5. Kiểm tra độ bất định

Một hệ số mẫu (r) không nhất thiết bằng tương quan thật (\rho) trong quần thể.

Có thể dùng:

- Khoảng tin cậy.
    
- Bootstrap.
    
- Kiểm định (H_0:\rho=0).
    
- Permutation test.
    

Một p-value nhỏ không chứng minh rằng quan hệ mạnh hoặc quan trọng. Với mẫu rất lớn, một tương quan cực nhỏ cũng có thể đạt ý nghĩa thống kê.

#### 6. Kiểm tra độ bền

Nên thử:

- Bỏ từng outlier.
    
- Phân tích từng nhóm.
    
- So sánh Pearson và Spearman.
    
- Thay đổi khoảng thời gian.
    
- Kiểm tra dữ liệu thiếu.
    
- Kiểm tra range restriction.
    
- Dùng biểu đồ residual hoặc mô hình phi tuyến.
    

### Dữ liệu nào được dùng?

- Các cặp quan sát trên cùng đơn vị.
    
- Dữ liệu liên tục hoặc thứ bậc.
    
- Dữ liệu chéo.
    
- Dữ liệu dọc theo thời gian.
    
- Dữ liệu bảng.
    
- Ma trận feature.
    
- Chuỗi thời gian.
    

### Công cụ và phương pháp liên quan

- [[Scatter Plot]]
    
- [[Correlation Matrix]]
    
- [[Heatmap]]
    
- [[Covariance Matrix]]
    
- [[Pair Plot]]
    
- [[Bootstrap]]
    
- [[Permutation Test]]
    
- [[Fisher Z-Transformation]]
    
- [[Partial Correlation]]
    
- [[Robust Correlation]]
    
- [[Time-Series Decomposition]]
    

### Sai số hoặc bias thường gặp

#### Outlier

Một vài điểm cực đoan có thể tạo ra một hệ số lớn dù phần lớn dữ liệu không có xu hướng.

#### Restricted range

Nếu chỉ quan sát một phạm vi hẹp của (X), tương quan có thể yếu hơn so với trong toàn bộ quần thể.

Ví dụ, tương quan giữa năng lực và điểm thi có thể thấp trong một trường chỉ tuyển học sinh rất giỏi vì phạm vi năng lực đã bị thu hẹp.

#### Confounding

Một biến thứ ba tạo ra hoặc làm biến dạng tương quan:

```text
X ← Z → Y
```

#### Reverse causality

Quan sát thấy (X) tương quan với (Y) nhưng không biết:

```text
X → Y
```

hay:

```text
Y → X
```

#### Selection bias

Việc một quan sát xuất hiện trong mẫu phụ thuộc vào các biến đang nghiên cứu.

#### Collider bias

Điều kiện hóa trên biến chung là hậu quả của (X) và (Y):

```text
X → S ← Y
```

có thể tạo ra tương quan giữa (X) và (Y) dù trước đó chúng độc lập.

#### Common trend

Hai chuỗi cùng tăng theo thời gian có thể có tương quan cao dù không có quan hệ thực chất.

#### Aggregation bias

Tương quan trong dữ liệu tổng hợp có thể khác hoặc ngược với tương quan trong từng nhóm, như trong [[Simpson's Paradox]].

#### Measurement error

Sai số đo thường làm suy yếu hoặc biến dạng tương quan quan sát được.

#### Multiple comparisons

Nếu tính hàng nghìn hệ số, một số tương quan lớn có thể xuất hiện tình cờ.

---

## Ví dụ cụ thể

### Ví dụ đời thường: chiều cao và cân nặng

Trong một quần thể người trưởng thành, người cao hơn thường có xu hướng nặng hơn.

```text
Chiều cao tăng
       ↕
Cân nặng có xu hướng tăng
```

Đây là tương quan dương, nhưng chiều cao không phải nguyên nhân duy nhất quyết định cân nặng. Cân nặng còn liên quan đến:

- Giới tính.
    
- Cấu trúc cơ thể.
    
- Cơ bắp.
    
- Dinh dưỡng.
    
- Tuổi.
    
- Mức độ vận động.
    

### Ví dụ tương quan âm

Nhiệt độ ngoài trời và năng lượng sử dụng để sưởi có thể tương quan âm:

```text
Nhiệt độ ngoài trời tăng
             ↓
Nhu cầu sưởi có xu hướng giảm
```

### Ví dụ tương quan giả

Doanh số kem và số vụ đuối nước có thể cùng tăng trong mùa nóng:

```text
       Nhiệt độ
       ↙      ↘
Bán kem       Bơi lội
                 ↓
             Đuối nước
```

Bán kem không gây đuối nước. Nhiệt độ và hoạt động mùa hè là những yếu tố chung tạo ra mối tương quan.

### Ví dụ phi tuyến nhưng Pearson gần 0

Giả sử:

[  
Y=X^2  
]

Khi (X) đi từ số âm đến 0, (Y) giảm. Khi (X) đi từ 0 đến số dương, (Y) tăng.

Quan hệ là hoàn toàn có cấu trúc nhưng không đơn điệu và không tuyến tính. Pearson (r) có thể gần 0.

### Ví dụ outlier tạo tương quan

Phần lớn dữ liệu phân bố ngẫu nhiên, nhưng một điểm rất xa nằm ở góc trên bên phải.

Điểm duy nhất đó có thể kéo Pearson (r) lên cao, khiến ta tưởng cả tập dữ liệu có quan hệ tuyến tính mạnh.

### Ví dụ trong machine learning

Hai feature có tương quan rất cao:

```text
Chiều cao tính bằng mét
           ↕
Chiều cao tính bằng centimet
```

Cả hai chứa gần như cùng một thông tin. Việc đưa đồng thời vào một mô hình tuyến tính có thể tạo [[Multicollinearity]], làm hệ số mô hình khó ổn định và khó diễn giải.

### Ví dụ phản trực giác: điều kiện hóa tạo tương quan

Giả sử năng lực học thuật và khả năng thể thao độc lập trong quần thể. Một trường tuyển người nếu họ giỏi ít nhất một trong hai lĩnh vực.

Trong nhóm đã được tuyển:

- Người có năng lực học thuật thấp thường phải rất giỏi thể thao.
    
- Người thể thao kém thường phải rất giỏi học thuật.
    

Do đó, hai năng lực có thể xuất hiện tương quan âm trong trường dù độc lập trong quần thể.

Đây là một dạng [[Collider Bias]] hoặc [[Berkson's Paradox]].

---

## Không phải là

### Không phải nhân quả

[  
\operatorname{Corr}(X,Y)\neq\text{Causal effect of }X\text{ on }Y  
]

Tương quan mô tả dữ liệu quan sát. Nhân quả hỏi điều gì xảy ra nếu ta can thiệp thay đổi (X).

### Không phải độ dốc

Một quan hệ có thể có độ dốc lớn nhưng tương quan không mạnh, hoặc độ dốc nhỏ nhưng tương quan hoàn hảo.

Ví dụ:

[  
Y=0.001X  
]

vẫn có thể có (r=1) nếu mọi điểm nằm chính xác trên đường thẳng.

Độ dốc phụ thuộc vào đơn vị; tương quan thì không.

### Không phải mức độ đồng ý

Hai phương pháp đo có thể tương quan rất cao nhưng luôn khác nhau một lượng cố định.

Ví dụ:

[  
Y=X+10  
]

Hai phép đo có tương quan hoàn hảo nhưng không đồng ý về giá trị tuyệt đối.

Đánh giá agreement cần các phương pháp như [[Bland–Altman Analysis]], không chỉ correlation.

### Không phải độc lập thống kê

Nếu (X) và (Y) độc lập và có phương sai hữu hạn thì tương quan của chúng bằng 0.

Nhưng chiều ngược lại không đúng:

[  
\rho_{XY}=0  
\not\Rightarrow  
X\perp Y  
]

Hai biến có thể phụ thuộc phi tuyến nhưng Pearson correlation bằng 0.

### Không phải ý nghĩa thống kê

- Hệ số tương quan: Độ mạnh và hướng quan hệ trong mẫu.
    
- P-value: Bằng chứng chống lại một giả thuyết thống kê dưới các giả định.
    
- Khoảng tin cậy: Độ bất định của ước lượng.
    

Một quan hệ có thể:

- Mạnh nhưng không có ý nghĩa thống kê do mẫu quá nhỏ.
    
- Yếu nhưng có ý nghĩa thống kê do mẫu rất lớn.
    

### Không phải khả năng dự đoán hoàn chỉnh

Tương quan cao có thể hỗ trợ dự đoán tuyến tính, nhưng không bảo đảm:

- Mô hình sẽ hoạt động ngoài mẫu.
    
- Quan hệ ổn định theo thời gian.
    
- Mô hình không bị data leakage.
    
- Biến chứa thông tin nhân quả.
    
- Dự đoán chính xác ở từng cá nhân.
    

### Không phải hiệp phương sai

Hiệp phương sai phụ thuộc vào đơn vị đo. Tương quan là hiệp phương sai đã được chuẩn hóa.

---

## Phân biệt với

|Concept dễ nhầm|Khác nhau ở điểm nào?|
|---|---|
|[[Nhân Quả]]|Tương quan mô tả sự cùng biến thiên; nhân quả nói rằng thay đổi một yếu tố tạo ra thay đổi ở yếu tố khác.|
|[[Hiệp Phương Sai]]|Hiệp phương sai có đơn vị và không bị giới hạn; tương quan được chuẩn hóa và nằm trong ([-1,1]).|
|[[Hồi Quy]]|Tương quan mô tả quan hệ đối xứng; hồi quy mô hình hóa một biến kết quả theo một hoặc nhiều biến dự báo.|
|[[Độc Lập Thống Kê]]|Độc lập mạnh hơn không tương quan; hai biến không tương quan vẫn có thể phụ thuộc phi tuyến.|
|[[Mutual Information]]|Mutual information có thể phát hiện nhiều dạng phụ thuộc phi tuyến; Pearson chủ yếu đo quan hệ tuyến tính.|
|[[Độ Dốc]]|Độ dốc đo lượng thay đổi của (Y) trên một đơn vị (X); tương quan đo độ chặt của xu hướng tuyến tính đã chuẩn hóa.|
|[[Agreement]]|Agreement yêu cầu hai phép đo cho giá trị gần nhau; correlation chỉ yêu cầu chúng biến thiên cùng nhau.|
|[[R-squared]]|Trong hồi quy tuyến tính đơn có intercept, (R^2=r^2); trong các mô hình khác, quan hệ này không nhất thiết giữ nguyên.|
|[[Statistical Significance]]|Ý nghĩa thống kê liên quan đến độ bất định và giả thuyết; độ lớn tương quan liên quan đến effect size.|
|[[Autocorrelation]]|Autocorrelation là tương quan của một biến với chính nó ở các độ trễ thời gian khác nhau.|
|[[Association]]|Association là khái niệm rộng; correlation là một họ các thước đo cụ thể của association.|

---

## Vì sao nó quan trọng?

### Tóm tắt quan hệ giữa các biến

Thay vì mô tả hàng nghìn cặp dữ liệu, một hệ số tương quan cung cấp thông tin ngắn gọn về:

- Hướng.
    
- Độ mạnh.
    
- Loại quan hệ đang được đo.
    

### Khám phá dữ liệu

Tương quan giúp phát hiện:

- Feature liên quan.
    
- Biến dư thừa.
    
- Cấu trúc nhóm.
    
- Quan hệ đáng nghiên cứu tiếp.
    
- Sai sót hoặc data leakage.
    

### Hỗ trợ dự đoán

Nếu hai biến có quan hệ ổn định, thông tin về một biến có thể giúp dự đoán biến còn lại.

Tuy nhiên, khả năng dự đoán cần được đánh giá trực tiếp bằng validation, không nên chỉ dựa vào correlation.

### Kiểm tra thang đo

Trong tâm lý học và đo lường, tương quan được dùng để xem:

- Các item có liên hệ không.
    
- Hai thang đo có quan hệ thế nào.
    
- Điểm kiểm tra có ổn định qua thời gian không.
    
- Một phép đo có liên hệ với tiêu chuẩn bên ngoài không.
    

### Quản lý multicollinearity

Trong hồi quy và machine learning, correlation matrix giúp phát hiện các feature có thông tin gần trùng nhau.

### Là bước đầu, không phải bước cuối

Tương quan có thể gợi ý câu hỏi nhân quả:

> Vì sao (X) và (Y) liên quan?

Nhưng để trả lời, cần thêm:

- Thiết kế nghiên cứu.
    
- Thứ tự thời gian.
    
- Kiến thức domain.
    
- Kiểm soát confounding.
    
- Thí nghiệm hoặc mô hình nhân quả.
    

### Ngăn ngừa trực giác sai

Con người có xu hướng:

- Nhìn thấy mẫu trong nhiễu.
    
- Nhớ các trường hợp xác nhận.
    
- Bỏ qua các trường hợp phản ví dụ.
    
- Đánh giá quan hệ dựa trên vài quan sát nổi bật.
    

Tương quan cung cấp một cách đo hệ thống hơn, nhưng bản thân nó vẫn có thể bị lạm dụng.

---

## Misconceptions / hiểu nhầm thường gặp

- **“Tương quan cao nghĩa là (X) gây ra (Y).”**  
    Có thể tồn tại chiều nhân quả ngược, confounder hoặc selection bias.
    
- **“Tương quan bằng 0 nghĩa là không có quan hệ.”**  
    Chỉ có thể kết luận không có quan hệ thuộc dạng mà hệ số đang đo; Pearson (r=0) không loại trừ quan hệ phi tuyến.
    
- **“Tương quan 0.8 nghĩa là (X) giải thích 80% của (Y).”**  
    Trong hồi quy tuyến tính đơn có intercept, (r^2=0.64), không phải 0.8; ngay cả cách nói “giải thích” cũng không mang nghĩa nhân quả.
    
- **“Tương quan âm nghĩa là quan hệ xấu.”**  
    Dấu âm chỉ hướng biến đổi, không phải đánh giá đạo đức hoặc chất lượng.
    
- **“Tương quan dương nghĩa là cả hai biến đều tăng theo thời gian.”**  
    Nó nghĩa là các giá trị cao của biến này thường đi cùng giá trị cao của biến kia trong tập dữ liệu được xét.
    
- **“Pearson luôn là lựa chọn tốt nhất.”**  
    Spearman hoặc Kendall có thể phù hợp hơn cho dữ liệu thứ bậc, quan hệ đơn điệu hoặc dữ liệu nhạy cảm với outlier.
    
- **“Càng kiểm soát nhiều biến càng tốt.”**  
    Điều chỉnh mediator hoặc collider có thể phá vỡ hoặc tạo ra tương quan.
    
- **“Hệ số giống nhau nghĩa là hai dataset có cấu trúc giống nhau.”**  
    Các scatter plot rất khác nhau có thể có cùng một Pearson (r).
    
- **“P-value nhỏ nghĩa là tương quan mạnh.”**  
    P-value phụ thuộc cả effect size và kích thước mẫu.
    
- **“Mẫu lớn loại bỏ mọi bias.”**  
    Mẫu lớn làm giảm sai số ngẫu nhiên nhưng không tự sửa confounding, selection bias hay measurement error.
    
- **“Tương quan không thay đổi theo bối cảnh.”**  
    Nó có thể thay đổi theo quần thể, nhóm tuổi, thời gian, phạm vi đo và cách chọn mẫu.
    

---

## Tranh luận / điểm chưa chắc

### Điều đã khá chắc

- Pearson correlation đo hướng và độ mạnh của quan hệ tuyến tính.
    
- Pearson (r) nằm từ (-1) đến (1) và không có đơn vị.
    
- (r=0) không loại trừ phụ thuộc phi tuyến.
    
- Tương quan không tự chứng minh nhân quả.
    
- Scatter plot là bước quan trọng trước khi diễn giải hệ số.
    
- Outlier và range restriction có thể làm biến dạng tương quan.
    
- Không có một ngưỡng “mạnh” phù hợp cho mọi lĩnh vực.
    

### Điều còn đang tranh luận hoặc phụ thuộc bối cảnh

#### Thế nào là tương quan mạnh?

Một số tài liệu dùng các ngưỡng như 0.1, 0.3 hoặc 0.5, nhưng các ngưỡng này không có ý nghĩa phổ quát.

Cần xét:

- Lĩnh vực nghiên cứu.
    
- Sai số đo.
    
- Hậu quả thực tế.
    
- Mức biến thiên tự nhiên.
    
- Kích thước mẫu.
    
- Mục đích mô tả hay dự đoán.
    

#### Nên dùng Pearson, Spearman hay Kendall?

Việc lựa chọn phụ thuộc vào:

- Cấp độ đo.
    
- Dạng quan hệ.
    
- Outlier.
    
- Giá trị đồng hạng.
    
- Kích thước mẫu.
    
- Câu hỏi nghiên cứu.
    

Không có một hệ số luôn tốt nhất.

#### Tương quan có nên được gọi là “mức độ phụ thuộc”?

Pearson chỉ đo một dạng phụ thuộc tuyến tính. Vì vậy, gọi Pearson là thước đo tổng quát của sự phụ thuộc có thể gây hiểu nhầm.

Các thước đo khác như mutual information, distance correlation hoặc những hệ số phụ thuộc phi tuyến có mục tiêu rộng hơn.

#### Có nên điều chỉnh biến thứ ba?

Không thể quyết định chỉ bằng việc biến đó có tương quan với (X) và (Y).

Cần biết biến đó là:

- Confounder.
    
- Mediator.
    
- Collider.
    
- Hậu quả của exposure.
    
- Proxy của biến khác.
    

Đây là câu hỏi nhân quả, không chỉ là câu hỏi thống kê.

#### Tương quan có ổn định ngoài mẫu không?

Một correlation được quan sát trong tập dữ liệu hiện tại có thể thay đổi khi:

- Quần thể thay đổi.
    
- Môi trường thay đổi.
    
- Cách đo thay đổi.
    
- Quan hệ nhân quả nền thay đổi.
    
- Mẫu ban đầu chứa selection bias.
    

### Claim cần kiểm chứng bằng nguồn mạnh hơn

- “(X) có tương quan mạnh với (Y).”
    
- “Correlation này có thể khái quát sang mọi nhóm.”
    
- “Sau khi kiểm soát (Z), quan hệ còn lại là nhân quả.”
    
- “Không có correlation nên feature không hữu ích.”
    
- “Correlation cao chứng minh hai thang đo giống nhau.”
    
- “Correlation matrix đủ để chọn mọi feature.”
    
- “Tương quan quan sát được ổn định theo thời gian.”
    
- “Một ngưỡng cố định có thể phân loại yếu, vừa và mạnh trong mọi domain.”
    

---

## Liên kết hệ thống

### Concepts liên quan

- [[Nhân Quả]]
    
- [[Liên Hệ Thống Kê]]
    
- [[Hiệp Phương Sai]]
    
- [[Độc Lập Thống Kê]]
    
- [[Hồi Quy]]
    
- [[Pearson Correlation]]
    
- [[Spearman Correlation]]
    
- [[Kendall Tau]]
    
- [[Partial Correlation]]
    
- [[Point-Biserial Correlation]]
    
- [[Autocorrelation]]
    
- [[Cross-Correlation]]
    
- [[Correlation Matrix]]
    
- [[Scatter Plot]]
    
- [[Multicollinearity]]
    
- [[Confounding]]
    
- [[Collider Bias]]
    
- [[Simpson's Paradox]]
    
- [[Mutual Information]]
    
- [[Effect Size]]
    
- [[Statistical Significance]]
    
- [[Range Restriction]]
    
- [[Spurious Correlation]]
    

### Atomic notes liên quan

- [[Tương quan không chứng minh nhân quả]]
    
- [[Pearson correlation chỉ đo quan hệ tuyến tính]]
    
- [[Không tương quan không đồng nghĩa với độc lập]]
    
- [[Độc lập kéo theo không tương quan khi phương sai hữu hạn]]
    
- [[Outlier có thể tạo ra hoặc phá vỡ tương quan]]
    
- [[Một hệ số không thể thay thế scatter plot]]
    
- [[Tương quan không có đơn vị]]
    
- [[Độ mạnh của tương quan phụ thuộc vào domain]]
    
- [[Độ dốc lớn không đồng nghĩa với tương quan mạnh]]
    
- [[Tương quan cao không đồng nghĩa với agreement]]
    
- [[P-value nhỏ không đồng nghĩa với effect size lớn]]
    
- [[Range restriction có thể làm suy yếu tương quan]]
    
- [[Điều chỉnh collider có thể tạo ra tương quan giả]]
    
- [[Hai chuỗi có cùng xu hướng thời gian có thể tương quan giả]]
    
- [[Các dataset khác nhau có thể có cùng hệ số tương quan]]
    

### Arguments / Questions liên quan

- [[Vì sao tương quan không chứng minh nhân quả?]]
    
- [[Khi nào nên dùng Pearson thay vì Spearman?]]
    
- [[Tương quan bằng 0 có nghĩa là gì?]]
    
- [[Làm sao nhận biết spurious correlation?]]
    
- [[Outlier ảnh hưởng đến correlation như thế nào?]]
    
- [[Nên kiểm soát biến nào khi phân tích correlation?]]
    
- [[Correlation và regression khác nhau thế nào?]]
    
- [[Correlation có thể dùng để chọn feature không?]]
    
- [[Làm sao so sánh hai hệ số tương quan?]]
    
- [[Tại sao cần xem scatter plot trước khi tính correlation?]]
    
- [[Simpson's paradox thay đổi cách diễn giải tương quan thế nào?]]
    
- [[Correlation trong time series có gì khác dữ liệu độc lập?]]
    

---

## Source map

### Nguồn nhập môn

- [[Penn State STAT 500 – Correlation]] — định nghĩa, công thức và tính chất cơ bản của Pearson (r).
    
- [[Penn State STAT 414 – The Correlation Coefficient]] — quan hệ giữa covariance, correlation và independence.
    
- [[Penn State STAT 501 – Correlation and Regression Cautions]] — cảnh báo về quan hệ phi tuyến và cách diễn giải (r).
    
- [[NIST – Correlation and Scatter Plots]] — các công cụ phân tích correlation và ảnh hưởng của outlier.
    
- [[SciPy – Spearman Correlation]] — tương quan thứ hạng và quan hệ đơn điệu.
    
- [[SciPy – Kendall’s Tau]] — cặp đồng thuận, nghịch thuận và xử lý ties.
    

### Nguồn học thuật / kiểm chứng

- [[Karl Pearson – Regression, Heredity and Panmixia]] — công trình năm 1896 liên quan đến hệ số product–moment correlation.
    
- [[Charles Spearman – The Proof and Measurement of Association Between Two Things]]
    
- [[Rodgers and Nicewander – Thirteen Ways to Look at the Correlation Coefficient]]
    
- [[Francis Galton – Regression Towards Mediocrity in Hereditary Stature]]
    
- [[Maurice Kendall – Rank Correlation Methods]]
    
- [[Cohen – Statistical Power Analysis for the Behavioral Sciences]]
    
- [[Anscombe – Graphs in Statistical Analysis]]
    
- [[Freedman, Pisani and Purves – Statistics]]
    

### Nguồn cần đọc tiếp

-  Học cách tính [[Hiệp Phương Sai]] trước khi học Pearson (r).
    
-  Đọc [[Thirteen Ways to Look at the Correlation Coefficient]].
    
-  Tìm hiểu [[Anscombe's Quartet]].
    
-  Tìm hiểu [[Datasaurus Dozen]].
    
-  So sánh Pearson, Spearman và Kendall trên cùng một dataset.
    
-  Học [[Fisher Z-Transformation]] và khoảng tin cậy cho correlation.
    
-  Tìm hiểu [[Robust Correlation]].
    
-  Tìm hiểu correlation trong chuỗi thời gian và vấn đề non-stationarity.
    

---

## Cách học tiếp concept này

1. **Học trực quan bằng scatter plot**
    
    Tự vẽ các dạng:
    
    - Dương mạnh.
        
    - Dương yếu.
        
    - Âm mạnh.
        
    - Không tuyến tính.
        
    - Có outlier.
        
    - Phân thành hai nhóm.
        
2. **Học covariance trước Pearson**
    
    Hiểu rằng Pearson correlation là covariance đã được chuẩn hóa:
    
    [  
    \rho=  
    \frac{\operatorname{Cov}(X,Y)}  
    {\sigma_X\sigma_Y}  
    ]
    
3. **Phân biệt ba khái niệm**
    
    ```text
    Tương quan → Hai biến biến đổi cùng nhau thế nào?
    Dự đoán    → Biết X giúp dự đoán Y được bao nhiêu?
    Nhân quả   → Can thiệp thay đổi X có làm Y thay đổi không?
    ```
    
4. **So sánh Pearson và Spearman**
    
    Dùng dữ liệu:
    
    [  
    Y=e^X  
    ]
    
    Spearman có thể rất cao vì quan hệ đơn điệu, trong khi Pearson phản ánh độ tuyến tính và có thể thấp hơn.
    
5. **Tạo ví dụ (r=0) nhưng phụ thuộc**
    
    Dùng:
    
    [  
    Y=X^2  
    ]
    
    để ghi nhớ:
    
    > Không tương quan tuyến tính không đồng nghĩa với độc lập.
    
6. **Học ba cấu trúc nhân quả**
    
    ```text
    Confounder: X ← Z → Y
    Mediator:   X → M → Y
    Collider:   X → S ← Y
    ```
    
    Sau đó xem mỗi cấu trúc tạo hoặc thay đổi correlation như thế nào.
    
7. **Luôn phân tích theo thứ tự**
    
    ```text
    Câu hỏi nghiên cứu
           ↓
    Scatter plot
           ↓
    Kiểm tra chất lượng dữ liệu
           ↓
    Chọn hệ số phù hợp
           ↓
    Tính correlation và uncertainty
           ↓
    Phân tích bias
           ↓
    Diễn giải trong domain
    ```
    

---

## My current understanding

Hiện tại mình hiểu **tương quan** là một cách mô tả việc hai biến có xu hướng thay đổi cùng nhau trong dữ liệu.

Một hệ số tương quan không chỉ cần được đọc qua độ lớn mà còn phải xét:

- Dấu dương hay âm.
    
- Loại quan hệ mà hệ số đo.
    
- Hình dạng trên scatter plot.
    
- Kích thước mẫu.
    
- Outlier.
    
- Phạm vi dữ liệu.
    
- Các nhóm con.
    
- Độ bất định của ước lượng.
    

Pearson correlation chủ yếu đo quan hệ tuyến tính. Vì vậy, Pearson (r=0) không đủ để kết luận hai biến không có quan hệ. Chúng vẫn có thể phụ thuộc theo hình chữ U, theo ngưỡng, theo chu kỳ hoặc theo một cấu trúc phi tuyến khác.

Mình cũng hiểu rằng tương quan không cung cấp hướng nhân quả. Khi thấy (X) tương quan với (Y), có ít nhất các khả năng:

```text
X → Y
Y → X
X ← Z → Y
Selection bias
Common time trend
Coincidence
```

Do đó, câu đúng là:

> “Trong dữ liệu này, (X) và (Y) có một mức độ liên hệ thống kê nhất định.”

Chứ chưa phải:

> “(X) gây ra (Y).”

Tương quan là công cụ tốt để **phát hiện và mô tả pattern**, nhưng muốn giải thích hoặc can thiệp, mình cần chuyển sang [[Suy Luận Nhân Quả]].

---

## Cần kiểm chứng / cập nhật

-  Làm rõ điều kiện sử dụng Pearson correlation trong suy luận thống kê.
    
-  Học cách tính khoảng tin cậy bằng Fisher (z).
    
-  So sánh Pearson, Spearman và Kendall khi có outlier.
    
-  Tìm hiểu robust correlation và distance correlation.
    
-  Làm rõ ảnh hưởng của range restriction.
    
-  Nghiên cứu correlation trong dữ liệu phân nhóm và dữ liệu lặp lại.
    
-  Tìm hiểu spurious regression trong time series.
    
-  Phân biệt partial correlation với causal adjustment.
    
-  Tìm hiểu multiple-testing correction khi phân tích correlation matrix lớn.
    
-  Bổ sung note riêng cho [[Anscombe's Quartet]].
    
-  Bổ sung note riêng cho [[Correlation Is Not Causation]].