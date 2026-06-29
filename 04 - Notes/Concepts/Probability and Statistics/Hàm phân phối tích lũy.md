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
  - CDF
  - Cumulative distribution function
---

# Hàm phân phối tích lũy

## Câu hỏi mà concept này trả lời

Xác suất một biến nhỏ hơn hoặc bằng một ngưỡng được biểu diễn thế nào?

## Vai trò trong domain

CDF là cách thống nhất để mô tả phân phối cho cả biến rời rạc và liên tục.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Tại mỗi điểm $x$, CDF cộng dồn toàn bộ xác suất nằm bên trái hoặc bằng $x$.

## Thành phần / đặc điểm chính

- Ký hiệu $F_X(x)$
- Giá trị trong $[0,1]$
- Không giảm theo $x$
- Liên hệ với PMF/PDF

## Công thức / đại lượng / đơn vị liên quan

$F_X(x)=P(X\leq x)$. Với biến liên tục: $F_X(x)=\int_{-\infty}^{x}p(t)dt$.

## Cách quan sát / đo lường / nhận biết

Nếu đồ thị CDF tăng nhanh ở vùng nào, dữ liệu/phân phối tập trung nhiều ở vùng đó.

## Không phải là

Không phải xác suất đúng tại điểm $x$; nó là xác suất tích lũy đến $x$.

## Phân biệt với

- [[Hàm mật độ xác suất]]
- [[Hàm khối xác suất]]
- [[Quantile]]

## Tranh luận / điểm chưa chắc

- CDF dễ bị hiểu nhầm là PDF nếu chỉ nhìn đồ thị.
- Với biến rời rạc, CDF có dạng bậc thang.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[CDF biến xác suất thành diện tích tích lũy bên trái một điểm]]
- [[CDF luôn không giảm vì xác suất tích lũy không thể mất đi]]

## Cách học tiếp concept này

Từ một bảng PMF, tự tính CDF từng điểm.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Hàm phân phối tích lũy** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
