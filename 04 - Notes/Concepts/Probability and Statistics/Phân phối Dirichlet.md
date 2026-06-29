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
  - Dirichlet distribution
---

# Phân phối Dirichlet

## Câu hỏi mà concept này trả lời

Sự bất định của một vector xác suất nhiều lớp được mô hình hóa thế nào?

## Vai trò trong domain

Dirichlet là bản mở rộng nhiều chiều của Beta, thường dùng làm prior cho categorical/multinomial probabilities.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Mô hình hóa vector $\lambda=[\lambda_1,...,\lambda_K]$ với $\lambda_i\geq0$ và tổng bằng 1.

## Thành phần / đặc điểm chính

- Vector xác suất
- Tham số $\alpha_i$ cho từng lớp
- Miền simplex
- Liên hệ với categorical/multinomial

## Công thức / đại lượng / đơn vị liên quan

$f(\lambda;\alpha)=\frac{\Gamma(\sum_i\alpha_i)}{\prod_i\Gamma(\alpha_i)}\prod_i \lambda_i^{\alpha_i-1}$ trên simplex $\sum_i\lambda_i=1$.

## Cách quan sát / đo lường / nhận biết

Dùng khi chưa chắc xác suất của từng lớp trong một bài toán multi-class.

## Không phải là

Không phải phân phối của một nhãn duy nhất; đó là categorical. Dirichlet là phân phối trên vector xác suất của các nhãn.

## Phân biệt với

- [[Phân phối beta]]
- [[Phân phối categorical]]
- [[Phân phối multinomial]]

## Tranh luận / điểm chưa chắc

- Nguồn ghi công thức có thêm tích $(1-\lambda_i)^{\alpha_i-1}$ cho từng thành phần; công thức Dirichlet chuẩn không có phần đó.
- Nguồn nói Dirichlet là liên hợp của categorical và Bernoulli; chính xác hơn là prior liên hợp cho categorical/multinomial.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Dirichlet mô hình hóa sự bất định của vector xác suất categorical]]
- [[Dirichlet là bản nhiều chiều của Beta trên simplex]]

## Cách học tiếp concept này

Vẽ trực giác Dirichlet cho 3 lớp bằng simplex hoặc đọc thêm Bayesian categorical model.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Phân phối Dirichlet** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
