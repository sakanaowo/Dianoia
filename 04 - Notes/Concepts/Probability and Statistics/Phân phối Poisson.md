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
  - Poisson distribution
---

# Phân phối Poisson

## Câu hỏi mà concept này trả lời

Số lần một sự kiện xảy ra trong một khoảng thời gian/không gian được mô hình hóa thế nào?

## Vai trò trong domain

Poisson hữu ích cho count data: số khách đến, số lỗi, số sự kiện trong một khoảng khi có tốc độ trung bình.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Mô hình số lần xảy ra $k$ của một sự kiện với tốc độ trung bình $\lambda$ trong một đơn vị khoảng.

## Thành phần / đặc điểm chính

- Số lần xảy ra $k$
- Tốc độ/kỳ vọng $\lambda$
- Biến đếm rời rạc
- Kỳ vọng và phương sai thường đều bằng $\lambda$ trong Poisson chuẩn

## Công thức / đại lượng / đơn vị liên quan

$P(X=k)=\frac{\lambda^k e^{-\lambda}}{k!}$ với $k=0,1,2,...$

## Cách quan sát / đo lường / nhận biết

Dữ liệu là số lượng sự kiện: số cuộc gọi mỗi giờ, số lỗi mỗi trang, số khách mỗi phút.

## Không phải là

Không phải mô hình cho giá trị liên tục như chiều cao hoặc cân nặng.

## Phân biệt với

- [[Phân phối nhị thức]]
- [[Phân phối exponential]]
- [[Biến ngẫu nhiên rời rạc]]

## Tranh luận / điểm chưa chắc

- Nguồn viết “possion”; thuật ngữ chuẩn là “Poisson”.
- Ví dụ trong nguồn có chỗ hỏi 2 người nhưng công thức dùng $k=3$, cần kiểm tra lại.
- Poisson giả định điều kiện về tốc độ và tính độc lập có thể không đúng trong dữ liệu thật.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Poisson mô hình hóa số lần sự kiện xảy ra trong một khoảng]]
- [[Count data không tự động là Poisson nếu sự kiện không độc lập]]

## Cách học tiếp concept này

Tính xác suất có 0,1,2,... sự kiện khi $\lambda=3$.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Phân phối Poisson** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
