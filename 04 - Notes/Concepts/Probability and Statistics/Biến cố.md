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
  - Event
---

# Biến cố

## Câu hỏi mà concept này trả lời

Một kết quả hoặc nhóm kết quả mà ta quan tâm trong xác suất được biểu diễn thế nào?

## Vai trò trong domain

Biến cố là đơn vị để đặt câu hỏi xác suất: xác suất trời mưa, xác suất mô hình dự đoán đúng, xác suất mẫu thuộc lớp 1.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Xem biến cố như một tập con của không gian mẫu. Khi kết quả thực tế rơi vào tập con đó, biến cố xảy ra.

## Thành phần / đặc điểm chính

- Biến cố đơn
- Biến cố hợp
- Biến cố giao
- Biến cố bù
- Biến cố độc lập hoặc phụ thuộc

## Công thức / đại lượng / đơn vị liên quan

$P(A)$ là xác suất biến cố $A$ xảy ra. $A^c$ là biến cố bù của $A$.

## Cách quan sát / đo lường / nhận biết

Mỗi câu hỏi dạng “xác suất để ...?” thường đang hỏi xác suất của một biến cố.

## Không phải là

Không phải luôn là một kết quả đơn lẻ; một biến cố có thể chứa nhiều kết quả.

## Phân biệt với

- [[Không gian mẫu]]: tập mọi khả năng.
- [[Biến ngẫu nhiên]]: đại lượng gán số cho kết quả.

## Tranh luận / điểm chưa chắc

- Trong bài toán thực tế, việc định nghĩa biến cố có thể mang tính chủ quan.
- Cần tránh nhập nhằng giữa biến cố và nhãn trong dataset.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Một câu hỏi xác suất cần xác định rõ biến cố đang được hỏi]]
- [[Biến cố càng mơ hồ thì xác suất càng khó diễn giải]]

## Cách học tiếp concept này

Viết lại 5 câu hỏi đời thường thành dạng biến cố $A$ rồi xác định $P(A)$.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Biến cố** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
