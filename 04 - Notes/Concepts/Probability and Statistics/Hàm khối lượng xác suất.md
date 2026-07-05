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
  - PMF
  - Probability mass function
---

# Hàm khối xác suất

## Câu hỏi mà concept này trả lời

Với biến rời rạc, xác suất từng giá trị được biểu diễn bằng hàm nào?

## Vai trò trong domain

PMF là cách mô tả phân phối của biến rời rạc như Bernoulli, categorical, binomial, Poisson và multinomial.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Gán xác suất cho từng giá trị rời rạc mà biến có thể nhận, sao cho tổng tất cả xác suất bằng 1.

## Thành phần / đặc điểm chính

- Áp dụng cho biến rời rạc
- Mỗi giá trị có một xác suất
- Mọi xác suất không âm
- Tổng xác suất bằng 1

## Công thức / đại lượng / đơn vị liên quan

$p(x)=P(X=x)$ và $\sum_{x\in S} p(x)=1$.

## Cách quan sát / đo lường / nhận biết

Bảng xác suất của xúc xắc là một PMF.

## Không phải là

Không phải PDF; PMF cho xác suất tại từng điểm rời rạc.

## Phân biệt với

- [[Hàm mật độ xác suất]]
- [[Hàm phân phối tích lũy]]
- [[Biến ngẫu nhiên rời rạc]]

## Tranh luận / điểm chưa chắc

- Không nên dùng PMF cho biến liên tục nếu chưa rời rạc hóa biến.
- Cần kiểm tra tổng xác suất có bằng 1 không.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[PMF dùng cho biến rời rạc còn PDF dùng cho biến liên tục]]
- [[Một PMF hợp lệ phải không âm và có tổng bằng 1]]

## Cách học tiếp concept này

Viết PMF cho Bernoulli và xúc xắc không đều.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Hàm khối xác suất** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
