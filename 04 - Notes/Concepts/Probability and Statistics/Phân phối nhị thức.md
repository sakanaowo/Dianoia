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
  - Binomial distribution
---

# Phân phối nhị thức

## Câu hỏi mà concept này trả lời

Xác suất có đúng $k$ lần thành công trong $n$ phép thử Bernoulli độc lập là gì?

## Vai trò trong domain

Binomial là mô hình chuẩn cho số lần thành công khi lặp lại cùng một phép thử nhị phân.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Lặp $n$ phép thử Bernoulli độc lập cùng xác suất thành công $p$, rồi đếm số lần thành công $k$.

## Thành phần / đặc điểm chính

- Số phép thử $n$
- Số thành công $k$
- Xác suất thành công $p$
- Tổ hợp cách chọn vị trí thành công

## Công thức / đại lượng / đơn vị liên quan

$P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$.

## Cách quan sát / đo lường / nhận biết

Số lần heads trong 10 lần tung đồng xu là biến nhị thức nếu các lần tung độc lập và đồng xác suất.

## Không phải là

Không dùng khi mỗi phép thử có nhiều hơn hai loại kết quả; lúc đó dùng multinomial/categorical.

## Phân biệt với

- [[Phân phối Bernoulli]]
- [[Phân phối multinomial]]
- [[Phân phối Poisson]]

## Tranh luận / điểm chưa chắc

- Nguồn có thể viết đảo ký hiệu tổ hợp thành $\binom{k}{n}$; công thức chuẩn là $\binom{n}{k}$.
- Cần điều kiện độc lập và cùng xác suất $p$.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Binomial mở rộng Bernoulli cho nhiều phép thử độc lập]]
- [[Điều kiện độc lập là giả định quan trọng của phân phối nhị thức]]

## Cách học tiếp concept này

Tính xác suất đúng 2 lần thành công trong 10 phép thử với $p=0.5$.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Phân phối nhị thức** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
