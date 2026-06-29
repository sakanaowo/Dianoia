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
  - Gaussian distribution
  - Normal distribution
---

# Phân phối chuẩn

## Câu hỏi mà concept này trả lời

Phân phối hình chuông quanh trung bình được mô hình hóa ra sao?

## Vai trò trong domain

Phân phối chuẩn là phân phối trung tâm trong thống kê, thường dùng cho noise, sai số đo, chuẩn hóa và nhiều xấp xỉ.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Mật độ cao nhất quanh trung bình $\mu$, giảm dần về hai đuôi; độ rộng được điều khiển bởi phương sai $\sigma^2$.

## Thành phần / đặc điểm chính

- Trung bình $\mu$
- Phương sai $\sigma^2$
- Đối xứng quanh $\mu$
- Hình chuông
- Chuẩn hóa đặc biệt $N(0,1)$

## Công thức / đại lượng / đơn vị liên quan

$f(x)=\frac{1}{\sqrt{2\pi\sigma^2}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$.

## Cách quan sát / đo lường / nhận biết

Histogram có dạng gần đối xứng, tập trung quanh trung bình và giảm về hai phía.

## Không phải là

Không phải mọi dữ liệu thực đều chuẩn.

## Phân biệt với

- [[Phân phối chuẩn hóa]]
- [[Phân phối đều]]
- [[Phân phối Student t]]

## Tranh luận / điểm chưa chắc

- Nhiều người lạm dụng giả định chuẩn vì nó tiện.
- Đuôi dày/outlier có thể làm mô hình chuẩn kém phù hợp.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Phân phối chuẩn tập trung xác suất quanh trung bình]]
- [[Giả định dữ liệu chuẩn cần được kiểm tra thay vì tin mặc định]]

## Cách học tiếp concept này

Vẽ normal distribution với các giá trị $\mu,\sigma$ khác nhau.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Phân phối chuẩn** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
