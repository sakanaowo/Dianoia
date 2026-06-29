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
  - Conditional probability
---

# Xác suất có điều kiện

## Câu hỏi mà concept này trả lời

Xác suất của một biến cố thay đổi thế nào khi đã biết một biến cố khác?

## Vai trò trong domain

Xác suất có điều kiện là nền cho Bayes, classification, inference và rất nhiều mô hình ML.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Giới hạn không gian xét vào trường hợp điều kiện đã xảy ra, rồi tính xác suất biến cố quan tâm trong không gian mới đó.

## Thành phần / đặc điểm chính

- Biến cố cần tính
- Điều kiện đã biết
- Xác suất giao
- Xác suất của điều kiện

## Công thức / đại lượng / đơn vị liên quan

$P(A|B)=\frac{P(A\cap B)}{P(B)}$ với $P(B)>0$. Hoặc $p(y|x)=\frac{p(x,y)}{p(x)}$.

## Cách quan sát / đo lường / nhận biết

Khi hỏi “xác suất thắng nếu đã tung được mặt 6”, ta đang hỏi xác suất có điều kiện.

## Không phải là

Không phải xác suất độc lập với điều kiện; điều kiện có thể làm xác suất thay đổi mạnh.

## Phân biệt với

- [[Xác suất đồng thời]]
- [[Xác suất biên]]
- [[Định lý Bayes]]

## Tranh luận / điểm chưa chắc

- Cần kiểm tra mẫu số khác 0.
- Dễ nhầm $P(A|B)$ với $P(B|A)$.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Xác suất có điều kiện thay đổi không gian mà ta đang xét]]
- [[P(A|B) và P(B|A) thường không giống nhau]]

## Cách học tiếp concept này

Làm vài bài bảng 2x2 để phân biệt $P(A|B)$ và $P(B|A)$.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Xác suất có điều kiện** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
