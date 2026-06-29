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
  - Covariance
---

# Hiệp phương sai

## Câu hỏi mà concept này trả lời

Trong 2 biến ngẫu nhiên cùng nhau, nếu một biến ngẫu nhiên thay đổi thì biến còn lại có xu hướng gì ?

## Khái niệm

- Thước đo thống kê dùng để xác định mối quan hệ biến thiên cùng nhau giữa hai biến ngẫu nhiên.

## Vai trò trong domain

Hiệp phương sai là nền để hiểu tương quan, ma trận covariance, PCA và quan hệ tuyến tính giữa feature.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Đo trung bình tích của độ lệch hai biến so với kỳ vọng của chúng. 

- Nếu $Cov(X,Y)>0$ : 2 biến đồng biến. X tăng -> Y tăng và ngược lại
- Nếu $Cov(X,Y)=0$ : hai biến không có quan hệ tuyến tính với nhau 
## Thành phần / đặc điểm chính

- Dấu của covariance
- Độ lớn phụ thuộc đơn vị đo
- Tính đối xứng
- Liên hệ với phương sai

## Công thức / đại lượng / đơn vị liên quan

$$\operatorname{cov}(X,Y)=E[(X-E[X])(Y-E[Y])]$$
- Hiệp phương sai mẫu - Sample Covariance (áp dụng trên mẫu nhỏ gồm n cặp x, y): $$cov(X,Y)=\frac{1}{n-1}\sum_{i=1}^n(x_{i}-\hat{X})(y_{i}-\hat{Y})$$
- Hiệp phương sai tổng thể - Population Covariance (áp dụng trên toàn bộ dữ liệu N phần tử): $$Cov(X,Y)=\sigma_{XY}=\frac{1}{N}\sum_{i=1}^N(x_{i}-\mu_{X})(y_{i}-\mu_{Y})$$
## Cách quan sát / đo lường / nhận biết

Dùng scatter plot: nếu điểm có xu hướng đi lên từ trái sang phải, covariance thường dương.
![[Pasted image 20260629163955.png]]
## Không phải là

Không phải thước đo chuẩn hóa; độ lớn của covariance phụ thuộc đơn vị đo.

## Phân biệt với

- [[Hệ số tương quan]]: covariance đã chuẩn hóa.
- [[Phương sai]]: covariance của một biến với chính nó.
- [[Độc lập thống kê]]: mạnh hơn không tương quan.

## Tranh luận / điểm chưa chắc

- Covariance bằng 0 không đảm bảo hai biến độc lập.
- Chỉ bắt tốt quan hệ tuyến tính hoặc gần tuyến tính.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Hiệp phương sai cho biết hai biến biến động cùng chiều hay ngược chiều]]
- [[Covariance phụ thuộc đơn vị nên khó so sánh trực tiếp giữa nhiều cặp biến]]

## Cách học tiếp concept này

Tính covariance giữa chiều cao và cân nặng trong một bảng dữ liệu nhỏ.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Hiệp phương sai** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
