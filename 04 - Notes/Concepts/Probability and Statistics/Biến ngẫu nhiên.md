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
  - Random variable
---

# Biến ngẫu nhiên

## Câu hỏi mà concept này trả lời

Làm sao biến kết quả ngẫu nhiên thành đại lượng có thể tính toán?

## Vai trò trong domain

Biến ngẫu nhiên nối thế giới thực với toán xác suất: từ kết quả tung xúc xắc, cân nặng, số khách, nhãn class thành một biến có thể mô hình hóa.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Một biến ngẫu nhiên gán mỗi kết quả trong không gian mẫu với một giá trị. Giá trị đó có thể rời rạc hoặc liên tục.

## Thành phần / đặc điểm chính

- Tên biến, ví dụ $X$
- Tập giá trị có thể nhận
- Phân phối xác suất đi kèm
- Rời rạc hoặc liên tục

## Công thức / đại lượng / đơn vị liên quan

$X: S \rightarrow \mathbb{R}$, tức ánh xạ kết quả trong không gian mẫu sang số thực.

## Cách quan sát / đo lường / nhận biết

Nếu ta có thể hỏi “$X$ bằng bao nhiêu?” hoặc “$X$ nằm trong khoảng nào?”, ta đang dùng biến ngẫu nhiên.

## Không phải là

Không phải một con số cố định; nó là một đại lượng chưa biết trước khi quan sát.

## Phân biệt với

- [[Biến cố]]: mệnh đề xảy ra/không xảy ra.
- [[Giá trị quan sát]]: một giá trị cụ thể sau khi đo.
- [[Phân phối xác suất]]: luật xác suất của biến ngẫu nhiên.

## Tranh luận / điểm chưa chắc

- Trong ML, feature có thể được xem là biến ngẫu nhiên, nhưng dataset chỉ là mẫu quan sát hữu hạn.
- Không nên nhầm biến ngẫu nhiên với biến trong lập trình.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Biến ngẫu nhiên biến kết quả thực tế thành đại lượng có thể tính toán]]
- [[Dataset là các quan sát của biến ngẫu nhiên chứ không phải toàn bộ tổng thể]]

## Cách học tiếp concept này

Lấy một dataset nhỏ và gọi mỗi cột là một biến ngẫu nhiên; xác định cột nào rời rạc, cột nào liên tục.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Biến ngẫu nhiên** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
