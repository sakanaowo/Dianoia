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
  - Law of large numbers
---

# Quy luật số lớn

## Câu hỏi mà concept này trả lời

Vì sao trung bình mẫu ổn định hơn khi số quan sát tăng?

## Vai trò trong domain

Quy luật số lớn là nền để tin rằng thống kê mẫu có thể ước lượng đại lượng tổng thể nếu lấy mẫu đủ lớn và đúng cách.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Khi lấy nhiều mẫu độc lập cùng phân phối, trung bình mẫu có xu hướng hội tụ về kỳ vọng tổng thể.

## Thành phần / đặc điểm chính

- Mẫu độc lập
- Cùng phân phối
- Trung bình mẫu
- Kỳ vọng tổng thể
- Hội tụ theo xác suất

## Công thức / đại lượng / đơn vị liên quan

$P(|\bar X_n - E[X]| \geq \epsilon) \rightarrow 0$ khi $n\rightarrow\infty$.

## Cách quan sát / đo lường / nhận biết

Tung đồng xu ít lần có thể lệch mạnh, nhưng tung rất nhiều lần thì tỷ lệ sấp/ngửa thường gần xác suất thật hơn.

## Không phải là

Không đảm bảo mẫu nhỏ sẽ đại diện tốt.

## Phân biệt với

- [[Định lý giới hạn trung tâm]]
- [[Kỳ vọng]]
- [[Trung bình mẫu]]

## Tranh luận / điểm chưa chắc

- Cần điều kiện độc lập/cùng phân phối hoặc các điều kiện thay thế.
- Mẫu lớn nhưng bias vẫn có thể cho kết quả sai.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Quy luật số lớn giải thích vì sao mẫu lớn làm ước lượng ổn định hơn]]
- [[Nhiều dữ liệu không cứu được một quy trình lấy mẫu thiên lệch]]

## Cách học tiếp concept này

Mô phỏng tung đồng xu bằng Python và quan sát trung bình chạy theo số lần thử.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Quy luật số lớn** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
