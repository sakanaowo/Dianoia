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
  - Standard deviation
---

# Độ lệch chuẩn

## Khái niệm

- Đại lượng thống kê mức độ phân tán của các điểm dữ liệu so với giá trị trung bình -> độ lệch chuẩn càng nhỏ thì dữ liệu càng tập trng quanh mức trunh bình (ổn định), độ lệch chuẩn càng lớn thì dữ liệu càng phân tán 
### Chi tiết

- Kí hiệu là:
	- $S$ cho mẫu 
	- $\sigma$ cho tổng thể
- Là căn bậc 2 của [[Phương sai]]
- Cùng đơn vị đo với dữ liệu ban đầu giúp đánh giá trực quan 

## Câu hỏi mà concept này trả lời

Làm sao đo độ phân tán bằng cùng đơn vị với dữ liệu gốc?

## Vai trò trong domain

Độ lệch chuẩn giúp diễn giải biến động dễ hơn phương sai, vì nó quay lại cùng đơn vị với dữ liệu.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Lấy căn bậc hai của phương sai. Nó cho biết một giá trị thường lệch khỏi trung bình khoảng bao nhiêu theo thang đo gốc.

## Thành phần / đặc điểm chính

- Căn bậc hai của phương sai
- Cùng đơn vị với dữ liệu gốc
- Dùng trong z-score và 3 sigma
- Nhạy với outlier

## Công thức / đại lượng / đơn vị liên quan

$\sigma_X=\sqrt{\operatorname{Var}(X)}$.

## Cách quan sát / đo lường / nhận biết

Nếu chiều cao có độ lệch chuẩn 5 cm, nghĩa là độ phân tán điển hình được đo bằng cm chứ không phải cm².

## Không phải là

Không phải sai số tuyệt đối của từng điểm dữ liệu.

## Phân biệt với

- [[Phương sai]]
- [[Z-score]]
- [[Khoảng tin cậy]]

## Tranh luận / điểm chưa chắc

- Diễn giải “một độ lệch chuẩn” phụ thuộc hình dạng phân phối.
- Nguyên lý 3 sigma hoạt động tự nhiên hơn với phân phối gần chuẩn.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Độ lệch chuẩn đưa phương sai về cùng đơn vị với dữ liệu gốc]]
- [[3 sigma chỉ nên dùng cẩn thận khi phân phối không gần chuẩn]]

## Cách học tiếp concept này

Tính standard deviation và dùng nó để phát hiện điểm bất thường trong một dãy số nhỏ.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Độ lệch chuẩn** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
