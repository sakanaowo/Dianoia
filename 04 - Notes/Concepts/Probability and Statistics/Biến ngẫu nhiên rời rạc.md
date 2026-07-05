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
  - Discrete random variable
---

# Biến ngẫu nhiên rời rạc

## Câu hỏi mà concept này trả lời

Khi nào một biến ngẫu nhiên chỉ nhận các giá trị tách rời?

## Vai trò trong domain

Biến rời rạc là nền cho PMF, Bernoulli, categorical, binomial, multinomial và nhiều bài toán classification.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Giá trị của biến thuộc một tập đếm được, ví dụ số mặt xúc xắc, số lần thành công, nhãn class.

## Thành phần / đặc điểm chính

- Tập giá trị hữu hạn hoặc đếm được
- Xác suất từng giá trị
- Tổng xác suất bằng 1

## Công thức / đại lượng / đơn vị liên quan

$\sum_x P(X=x)=1$.

## Cách quan sát / đo lường / nhận biết

Nếu các giá trị là “0/1”, “class A/B/C”, hoặc “số lần xảy ra”, thường là biến rời rạc.

## Không phải là

Không phải biến nhận mọi giá trị trong một khoảng liên tục.

## Phân biệt với

- [[Biến ngẫu nhiên liên tục]]
- [[Hàm khối lượng xác suất]]
- [[Phân phối categorical]]

## Tranh luận / điểm chưa chắc

- Một đại lượng thực tế liên tục có thể bị rời rạc hóa khi đo bằng thiết bị có độ phân giải hữu hạn.
- Nhãn class là rời rạc nhưng xác suất dự đoán class là liên tục.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[PMF dùng cho biến rời rạc còn PDF dùng cho biến liên tục]]
- [[Nhãn phân loại là biến rời rạc]]

## Cách học tiếp concept này

Tạo bảng xác suất cho xúc xắc và cho bài toán phân loại 3 lớp.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Biến ngẫu nhiên rời rạc** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
