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
  - Multinomial distribution
---

# Phân phối multinomial

## Câu hỏi mà concept này trả lời

Khi lặp nhiều phép thử nhiều lớp, xác suất thu được số đếm từng lớp là gì?

## Vai trò trong domain

Multinomial tổng quát hóa binomial sang nhiều lớp và là nền cho bag-of-words, topic models, count vector.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Thực hiện $n$ phép thử độc lập, mỗi phép thử rơi vào một trong $K$ lớp với xác suất $p_i$, rồi đếm số lần mỗi lớp xuất hiện.

## Thành phần / đặc điểm chính

- Số phép thử $n$
- Số lớp $K$
- Vector xác suất $p_i$
- Vector số đếm $x_i$
- Điều kiện $\sum_i x_i=n$

## Công thức / đại lượng / đơn vị liên quan

$P(X_1=x_1,...,X_K=x_K)=\frac{n!}{x_1!\cdots x_K!}\prod_{i=1}^K p_i^{x_i}$ nếu $\sum_i x_i=n$.

## Cách quan sát / đo lường / nhận biết

Đếm số từ thuộc từng loại trong một văn bản hoặc số lần rơi vào từng mặt xúc xắc sau nhiều lần gieo.

## Không phải là

Không phải categorical một lần thử; multinomial là nhiều lần thử và kết quả là vector số đếm.

## Phân biệt với

- [[Phân phối categorical]]
- [[Phân phối nhị thức]]
- [[Phân phối Dirichlet]]

## Tranh luận / điểm chưa chắc

- Nguồn viết “multi-normial”; thuật ngữ chuẩn là “multinomial”.
- Trong NLP, đôi khi categorical và multinomial bị gọi lẫn tùy ngữ cảnh; cần kiểm tra nghĩa cụ thể.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Multinomial mở rộng categorical cho nhiều phép thử]]
- [[Multinomial mô hình hóa vector số đếm trên nhiều lớp]]

## Cách học tiếp concept này

Tính xác suất thu được số mặt xúc xắc cụ thể sau 10 lần gieo.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Phân phối multinomial** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
