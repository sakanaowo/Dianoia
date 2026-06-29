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
  - Markov inequality
---

# Bất đẳng thức Markov

## Câu hỏi mà concept này trả lời

Có thể chặn xác suất một biến không âm vượt ngưỡng chỉ bằng kỳ vọng không?

## Vai trò trong domain

Bất đẳng thức Markov là công cụ lý thuyết để chứng minh các kết quả hội tụ cơ bản, trong đó có một cách chứng minh luật số lớn.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Nếu biến ngẫu nhiên không âm có kỳ vọng hữu hạn, xác suất nó lớn hơn một ngưỡng $a$ không thể vượt quá kỳ vọng chia cho $a$.

## Thành phần / đặc điểm chính

- Biến ngẫu nhiên không âm
- Ngưỡng dương
- Kỳ vọng hữu hạn
- Cận trên xác suất

## Công thức / đại lượng / đơn vị liên quan

$P(X\geq a) \leq \frac{E[X]}{a}$ với $X\geq 0, a>0$.

## Cách quan sát / đo lường / nhận biết

Dùng khi ta không biết toàn bộ phân phối nhưng biết kỳ vọng.

## Không phải là

Không phải ước lượng sắc trong mọi trường hợp; thường là cận khá lỏng.

## Phân biệt với

- [[Bất đẳng thức Chebyshev]]
- [[Quy luật số lớn]]
- [[Kỳ vọng]]

## Tranh luận / điểm chưa chắc

- Markov chỉ dùng trực tiếp cho biến không âm.
- Cận có thể quá rộng để dùng thực dụng.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Markov inequality cho phép chặn xác suất đuôi chỉ bằng kỳ vọng]]
- [[Một cận toán học đúng không nhất thiết là cận sắc]]

## Cách học tiếp concept này

Dùng Markov để chặn xác suất thời gian chờ vượt một ngưỡng khi biết thời gian chờ trung bình.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Bất đẳng thức Markov** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
