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
  - PDF
  - Probability density function
---

# Hàm mật độ xác suất

![[Pasted image 20260626181652.png]]

## Câu hỏi mà concept này trả lời

Với [[biến liên tục]], xác suất được biểu diễn bằng mật độ như thế nào?

## Vai trò trong domain

PDF là nền để hiểu phân phối chuẩn, phân phối đều, beta và nhiều mô hình liên tục trong thống kê.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

PDF không cho xác suất tại một điểm; xác suất trên một khoảng bằng diện tích dưới đường mật độ trong khoảng đó.

## Thành phần / đặc điểm chính

- Áp dụng cho biến liên tục
- Mật độ không âm
- Tổng diện tích bằng 1
- Xác suất là tích phân trên khoảng

## Công thức / đại lượng / đơn vị liên quan

$\int_{-\infty}^{\infty} p(x)dx=1$, $P(a\leq X\leq b)=\int_a^b p(x)dx$.

## Cách quan sát / đo lường / nhận biết

Đường cong hình chuông của phân phối chuẩn là một PDF.

## Không phải là

Giá trị PDF tại $x$ không phải $P(X=x)$.

## Phân biệt với

- [[Hàm khối xác suất]]
- [[Hàm phân phối tích lũy]]
- [[Biến ngẫu nhiên liên tục]]

## Tranh luận / điểm chưa chắc

- PDF có thể lớn hơn 1 tại một điểm nhưng vẫn hợp lệ nếu tổng diện tích bằng 1.
- Diễn giải PDF cần hiểu tích phân/diện tích.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Với biến liên tục, xác suất là diện tích dưới PDF]]
- [[PDF cao không đồng nghĩa xác suất tại điểm đó cao]]

## Cách học tiếp concept này

Tô diện tích dưới một đường cong chuẩn trong khoảng $[a,b]$.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Hàm mật độ xác suất** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
