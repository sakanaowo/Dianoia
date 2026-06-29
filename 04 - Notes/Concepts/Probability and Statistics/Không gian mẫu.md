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
  - Sample space
---

# Không gian mẫu

## Câu hỏi mà concept này trả lời

Tập hợp tất cả kết quả có thể xảy ra của một phép thử là gì?

## Vai trò trong domain

Không gian mẫu là nền để định nghĩa biến cố và xác suất. Nếu xác định sai không gian mẫu, toàn bộ phép tính xác suất có thể sai.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Liệt kê hoặc mô tả toàn bộ kết quả có thể xảy ra. Mỗi biến cố là một phần con của không gian mẫu.

## Thành phần / đặc điểm chính

- Ký hiệu thường dùng: $S$ hoặc $\Omega$
- Có thể hữu hạn, đếm được hoặc liên tục
- Biến cố là tập con của không gian mẫu

## Công thức / đại lượng / đơn vị liên quan

Nếu gieo xúc xắc 6 mặt: $S=\{1,2,3,4,5,6\}$.

## Cách quan sát / đo lường / nhận biết

Hỏi: “Kết quả nào có thể xảy ra?” trước khi tính bất kỳ xác suất nào.

## Không phải là

Không phải tập các kết quả mong muốn; nó là tập mọi kết quả có thể.

## Phân biệt với

- [[Biến cố]]: một phần con của không gian mẫu.
- [[Biến ngẫu nhiên]]: ánh xạ kết quả trong không gian mẫu thành giá trị.

## Tranh luận / điểm chưa chắc

- Với dữ liệu thực, không gian mẫu thường không được liệt kê rõ ràng như ví dụ xúc xắc.
- Cần cẩn thận với giả định “các kết quả đồng khả năng”.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Xác định sai không gian mẫu làm xác suất sai từ gốc]]
- [[Biến cố là một phần của không gian mẫu chứ không phải toàn bộ phép thử]]

## Cách học tiếp concept này

Tự tạo không gian mẫu cho đồng xu, xúc xắc, thời tiết, nhãn phân loại ảnh.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Không gian mẫu** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
