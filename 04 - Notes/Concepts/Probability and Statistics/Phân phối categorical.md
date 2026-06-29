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
  - Categorical distribution
  - Category distribution
---

# Phân phối categorical

## Câu hỏi mà concept này trả lời

Một phép thử có nhiều hơn hai nhãn loại trừ nhau được mô hình hóa thế nào?

## Vai trò trong domain

Categorical là phân phối nền cho multi-class classification và softmax output.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Một biến nhận một trong $K$ lớp với vector xác suất $\lambda=[\lambda_1,...,\lambda_K]$, các phần tử không âm và tổng bằng 1.

## Thành phần / đặc điểm chính

- Một phép thử
- Nhiều lớp
- Vector xác suất
- Tổng xác suất bằng 1

## Công thức / đại lượng / đơn vị liên quan

$P(X=k)=\lambda_k$, với $\sum_{k=1}^K\lambda_k=1$.

## Cách quan sát / đo lường / nhận biết

Softmax output của mô hình phân loại nhiều lớp thường được diễn giải như categorical distribution.

## Không phải là

Không phải nhiều phép thử; nhiều phép thử categorical dẫn đến multinomial.

## Phân biệt với

- [[Phân phối Bernoulli]]
- [[Phân phối multinomial]]
- [[Softmax]]

## Tranh luận / điểm chưa chắc

- Nguồn gọi là “category”; thuật ngữ chuẩn là “categorical”.
- Softmax score không phải lúc nào cũng là xác suất được calibration tốt.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Categorical mở rộng Bernoulli cho nhiều lớp]]
- [[Softmax tạo vector xác suất trên các lớp loại trừ nhau]]

## Cách học tiếp concept này

Lấy một vector softmax và kiểm tra tổng xác suất bằng 1.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Phân phối categorical** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
