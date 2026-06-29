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
  - Bernoulli distribution
---

# Phân phối Bernoulli

## Câu hỏi mà concept này trả lời

Một phép thử chỉ có hai kết quả thành công/thất bại được mô hình hóa thế nào?

## Vai trò trong domain

Bernoulli là phân phối nền cho nhãn nhị phân, logistic regression, binary classification và binomial.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Biến $X$ nhận 1 nếu thành công với xác suất $p$, nhận 0 nếu thất bại với xác suất $1-p$.

## Thành phần / đặc điểm chính

- Một phép thử
- Hai kết quả 0/1
- Tham số $p$
- Kỳ vọng $p$
- Phương sai $p(1-p)$

## Công thức / đại lượng / đơn vị liên quan

$P(X=1)=p$, $P(X=0)=1-p$.

## Cách quan sát / đo lường / nhận biết

Một email spam/không spam, một mẫu positive/negative, một click/no click có thể mô hình hóa Bernoulli.

## Không phải là

Không phải nhiều lần thử; nhiều lần Bernoulli độc lập thường dẫn đến binomial.

## Phân biệt với

- [[Phân phối nhị thức]]
- [[Phân phối categorical]]
- [[Binary classification]]

## Tranh luận / điểm chưa chắc

- Nhãn nhị phân trong dữ liệu thực có thể bị label noise.
- Không nên giả định các phép thử độc lập nếu dữ liệu có phụ thuộc.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Bernoulli là phân phối cho một phép thử nhị phân]]
- [[Binary classification thường dùng Bernoulli để mô hình hóa nhãn]]

## Cách học tiếp concept này

Tính expectation và variance của Bernoulli với vài giá trị $p$.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Phân phối Bernoulli** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
