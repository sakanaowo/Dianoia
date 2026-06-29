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
  - Variance
---

# Phương sai

## Câu hỏi mà concept này trả lời

Một biến ngẫu nhiên phân tán quanh kỳ vọng mạnh đến mức nào?

## Khái niệm

- Thước đo thống kê biểu thị mức độ phân tán của các giá trị trong tập dữ liệu so với giá trị trung bình 
- Phương sai càng lớn -> dữ liệu càng dao động mạnh 
- Phương sai càng nhỏ -> dữ liệu càng tập trung và ổn định 
## Vai trò trong domain

Phương sai là đại lượng lõi để đo độ biến động, uncertainty, noise, risk và spread của dữ liệu.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Lấy kỳ vọng của bình phương độ lệch so với kỳ vọng. Bình phương làm độ lệch âm/dương đều đóng góp dương.

## Thành phần / đặc điểm chính

- Luôn không âm
- Bằng 0 khi biến là hằng số
- Đơn vị bị bình phương
- Là covariance của biến với chính nó

## Công thức / đại lượng / đơn vị liên quan

- Phương sai mẫu (Sample variance - mẫu gồm n giá trị): $$s^{2}=\frac{1}{n}\sum_{i=1}^{n}(x_{i}-\hat{x})^2$$ trong đó: 
	- $x_i$ : các giá trị trong tập mẫu
	- $\hat x$ : giá trị trung bình cộng mẫu 
	- n: số phần tử mẫu 
- Phương sai cho toàn bộ tổng thể dựa trên mẫu đang có - Phương sai hiệu chỉnh: $$s^{2}= \frac{1}{n-1} \sum_{i=1}^n(x_{i}-\hat{x})^2$$

- Phương sai cho bảng tần suất: $$s^{2}=\frac{1}{n}\sum_{i=1}^{n}n_i(x_{i}-\hat{x})^2$$

> $\operatorname{Var}(X)=E[(X-E[X])^2]=E[X^2]-E[X]^2$.

## Cách quan sát / đo lường / nhận biết

Dữ liệu càng trải rộng quanh trung bình thì phương sai càng lớn.
![[Pasted image 20260629164150.png]]
## Không phải là

Không cùng đơn vị với dữ liệu gốc vì đã bình phương đơn vị.

## Phân biệt với

- [[Độ lệch chuẩn]]: căn bậc hai của phương sai.
- [[Hiệp phương sai]]: đo biến động chung của hai biến.
- [[Sai số]]: độ lệch cụ thể của một quan sát hoặc dự đoán.

## Tranh luận / điểm chưa chắc

- Nhạy với outlier vì dùng bình phương.
- Cần phân biệt variance tổng thể và sample variance.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Phương sai đo mức độ phân tán quanh kỳ vọng]]
- [[Công thức Var(X)=E(X^2)-E(X)^2 giúp tính phương sai nhanh]]

## Cách học tiếp concept này

Tính phương sai thủ công cho 5 số, rồi so sánh với độ lệch chuẩn.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Phương sai** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
