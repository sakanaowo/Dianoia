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
  - Correlation coefficient
---

# Hệ số tương quan

## Câu hỏi mà concept này trả lời

Quan hệ tuyến tính giữa hai biến mạnh hay yếu sau khi chuẩn hóa đơn vị?

## Vai trò trong domain

Tương quan thường dùng để khảo sát feature, phát hiện quan hệ tuyến tính và kiểm tra đa cộng tuyến ở mức nhập môn.

## Bối cảnh lịch sử / nguồn gốc

Trong bài `Deep AI - Xác suất`, concept này được dùng như một phần nền tảng để học xác suất ứng dụng trong machine learning. Khi học sâu hơn, nên đối chiếu thêm với giáo trình xác suất/thống kê chuẩn vì bài viết mang tính nhập môn.

## Cơ chế / cách vận hành

Chuẩn hóa hiệp phương sai bằng tích độ lệch chuẩn của hai biến, đưa kết quả về khoảng $[-1,1]$.

## Thành phần / đặc điểm chính

- Dấu cho biết chiều quan hệ
- Độ lớn cho biết mức mạnh/yếu tuyến tính
- Không có đơn vị
- Nằm trong $[-1,1]$

## Công thức / đại lượng / đơn vị liên quan

$\rho_{XY}=\frac{\operatorname{cov}(X,Y)}{\sigma_X\sigma_Y}$.

## Cách quan sát / đo lường / nhận biết

Dùng scatter plot kết hợp hệ số tương quan để tránh bị một con số đánh lừa.

## Không phải là

Không chứng minh quan hệ nhân quả.

## Phân biệt với

- [[Hiệp phương sai]]
- [[Hồi quy tuyến tính]]
- [[Nhân quả]]

## Tranh luận / điểm chưa chắc

- Tương quan bằng 0 không loại trừ quan hệ phi tuyến.
- Outlier có thể làm correlation sai lệch mạnh.

## Source map

- [[Deep AI - Xác suất]]
- URL nguồn: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html

## Atomic notes liên quan

- [[Tương quan chuẩn hóa hiệp phương sai để so sánh mức độ quan hệ tuyến tính]]
- [[Tương quan không tự động chứng minh nhân quả]]

## Cách học tiếp concept này

Vẽ scatter plot của vài cặp biến và so sánh với correlation.

## My current understanding

Hiện tại có thể hiểu ngắn gọn: **Hệ số tương quan** là một khái niệm giúp biến sự bất định thành thứ có thể mô hình hóa, tính toán hoặc kiểm tra bằng dữ liệu.

## Cần kiểm chứng / cập nhật

- [ ] Đối chiếu với một giáo trình xác suất thống kê chuẩn.
- [ ] Làm ít nhất 1 bài tập nhỏ dùng concept này.
- [ ] Liên kết thêm với note ML khi gặp lại concept trong mô hình thật.
