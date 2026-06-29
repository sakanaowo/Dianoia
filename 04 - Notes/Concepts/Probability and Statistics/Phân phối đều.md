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
  - Uniform distribution
---

# Phân phối đều

## Câu hỏi mà concept này trả lời

Phân phối nào gán mật độ bằng nhau trên một khoảng?

## Vai trò trong domain

Phân phối đều là mô hình nền cho trường hợp mọi giá trị trong một khoảng được xem là ngang nhau, và thường dùng để sinh số ngẫu nhiên.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

PDF giữ giá trị hằng trên đoạn $[a,b]$ và bằng 0 bên ngoài đoạn.

## Thành phần / đặc điểm chính

- Cận dưới $a$
- Cận trên $b$
- Mật độ hằng
- Biến liên tục trên đoạn

## Công thức / đại lượng / đơn vị liên quan

$f(x)=\frac{1}{b-a}$ nếu $x\in[a,b]$, và $0$ nếu ngoài đoạn.

## Cách quan sát / đo lường / nhận biết

Histogram tương đối phẳng nếu lấy đủ nhiều mẫu.

## Không phải là

Không phải phân phối rời rạc đều như xúc xắc, dù ý tưởng “đều” tương tự.

## Phân biệt với

- [[Phân phối chuẩn]]
- [[Biến ngẫu nhiên liên tục]]
- [[Hàm mật độ xác suất]]

## Tranh luận / điểm chưa chắc

- Trong thực tế, hiếm khi mọi giá trị thật sự đồng khả năng.
- Cần phân biệt uniform liên tục và uniform rời rạc.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Phân phối đều giả định mọi điểm trong khoảng có mật độ như nhau]]
- [[torch.rand tạo mẫu từ phân phối đều trên khoảng chuẩn]]

## Cách học tiếp concept này

Sinh 1000 số ngẫu nhiên đều và quan sát histogram.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Phân phối đều** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
