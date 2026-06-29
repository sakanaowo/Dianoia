---
type: concept
status: growing
created: 2026-06-26
domains:
  - "[[Mathematics]]"
  - "[[AI & Computer Science]]"
themes:
  - "[[Learning and Intelligence]]"
source_notes:
  - "[[Deep AI - Xác suất]]"
aliases:
  - Continuous random variable
---

# Biến ngẫu nhiên liên tục

**Biến ngẫu nhiên liên tục**:
- Giá trị của nó phụ thuộc vào kết quả của một hiện tượng ngẫu nhiên, và các giá trị có thể nằm trên một khoảng liên tục
- Các giá trị của nó lấp đầy một khoảng nào đó trên trục số ~ miền giá trị của nó là một khoảng hữu hạn hoặc vô hạn số thực 

## Ví dụ

- X = chiều cao của một học sinh được chọn ngẫu nhiên trong trường
- Y = nhiệt độ ngày mai lúc 12h
- T = thời gian chờ xe bus lần tới

## Câu hỏi mà concept này trả lời

Khi nào một biến ngẫu nhiên có thể nhận vô số giá trị trong một khoảng?

## Vai trò trong domain

Biến liên tục là nền cho [[Hàm mật độ xác suất|PDF]], [[Hàm phân phối tích lũy|CDF]], phân phối chuẩn, phân phối đều và nhiều feature số trong ML.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Xác suất tại một điểm riêng lẻ thường bằng 0; xác suất có ý nghĩa trên một khoảng thông qua diện tích dưới đường mật độ.

## Thành phần / đặc điểm chính

- Miền giá trị liên tục
- Hàm mật độ xác suất
- Xác suất trên khoảng
- Tích phân tổng bằng 1
- Xác suất tại một điểm cụ thể = 0: $P(X=x)=0$

## Công thức / đại lượng / đơn vị liên quan

$$P(a \leq X \leq b)=\int_a^b p(x)dx$$
- với $f(x) \geq0$ và $\int_{a}^{b}f(x)dx=1$
## Cách quan sát / đo lường / nhận biết

Cân nặng, chiều cao, thời gian chờ, nhiệt độ thường được mô hình hóa như biến liên tục.

## Không phải là

Không phải biến có xác suất dương tại từng điểm riêng lẻ theo cách PMF.

## Phân biệt với

- [[Biến ngẫu nhiên rời rạc]]
- [[Hàm mật độ xác suất]]
- [[Hàm phân phối tích lũy]]

## Tranh luận / điểm chưa chắc

- Dữ liệu lưu trong máy tính luôn hữu hạn chữ số, nhưng mô hình toán có thể xem là liên tục.
- Không nên đọc giá trị PDF tại một điểm như xác suất tại điểm đó.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Với biến liên tục, xác suất nằm trong diện tích chứ không nằm ở điểm đơn lẻ]]
- [[PDF cao không đồng nghĩa xác suất tại điểm đó cao theo nghĩa rời rạc]]

## Cách học tiếp concept này

Vẽ một phân phối chuẩn và tính diện tích giữa hai mốc.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Biến ngẫu nhiên liên tục** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
