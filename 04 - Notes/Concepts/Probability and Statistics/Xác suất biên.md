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
  - Marginal probability
  - Marginal distribution
---

# Xác suất biên

## Câu hỏi mà concept này trả lời

Làm sao lấy phân phối của một biến từ phân phối đồng thời nhiều biến?

## Vai trò trong domain

Marginalization là thao tác giảm chiều cốt lõi trong xác suất, thống kê Bayesian và mô hình đồ thị xác suất.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Cộng hoặc tích phân phân phối đồng thời theo các biến không quan tâm, giữ lại biến cần xét.

## Thành phần / đặc điểm chính

- Phân phối đồng thời
- Biến cần giữ lại
- Biến cần loại bỏ
- Tổng hoặc tích phân

## Công thức / đại lượng / đơn vị liên quan

Rời rạc: $p(x)=\sum_y p(x,y)$. Liên tục: $p(x)=\int p(x,y)dy$.

## Cách quan sát / đo lường / nhận biết

Nếu có bảng xác suất điểm toán-văn, cộng theo toàn bộ điểm văn để lấy phân phối điểm toán.

## Không phải là

Không phải bỏ dữ liệu tùy tiện; đó là phép cộng xác suất có cấu trúc.

## Phân biệt với

- [[Xác suất đồng thời]]
- [[Xác suất có điều kiện]]
- [[Tổng xác suất]]

## Tranh luận / điểm chưa chắc

- Nguồn dùng “margin distribution”; thuật ngữ chuẩn thường là “marginal distribution”.
- Khi marginalize, thông tin về quan hệ với biến bị loại có thể mất đi.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Xác suất biên là cách giảm chiều một phân phối đồng thời]]
- [[Marginalization biến phân phối nhiều chiều thành phân phối ít chiều hơn]]

## Cách học tiếp concept này

Tính marginal distribution từ một bảng joint probability 2x3.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Xác suất biên** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
