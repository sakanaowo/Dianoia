---
type: atomic
status: growing
domains:
  - "[[Music Theory]]"
themes:
  - "[[Learning and Intelligence]]"
source:
  - "[[Study - Nhạc lý cơ bản và Đọc Sheet nhạc]]"
created: 2026-08-29
updated: 2026-08-29
---

# Mỗi bậc phân nhánh của trường độ nốt chia đôi thời gian của bậc nốt đứng trước nó

## Ý chính

Hệ thống trường độ nốt phương Tây được xây dựng trên cấu trúc nhị phân phân nhánh (Binary Tree): mỗi bậc nốt mới sinh ra luôn bằng một nửa giá trị thời gian của nốt trước đó, tạo nên tính đồng dạng toán học tuyệt đối và cho phép chia nhỏ thời gian vô tận.

## Nói ngắn gọn

Tròn $\div 2 =$ Trắng; Trắng $\div 2 =$ Đen; Đen $\div 2 =$ Móc đơn; Móc đơn $\div 2 =$ Móc kép.

## Bối cảnh

Mô hình cấu trúc toán học của hệ thống trường độ (trong [[Trường độ nốt và Dấu lặng]]).

## Giải thích

1. **Quy luật hình học của ký hiệu:**
   - Bắt đầu từ nốt Tròn (chỉ có đầu rỗng).
   - Thêm thân nốt $\rightarrow$ Chia đôi thời gian thành **Nốt Trắng**.
   - Tô đen đầu nốt $\rightarrow$ Chia đôi tiếp thành **Nốt Đen**.
   - Thêm 1 cờ nốt $\rightarrow$ Chia đôi tiếp thành **Nốt Móc Đơn**.
   - Thêm cờ nốt thứ hai $\rightarrow$ Chia đôi tiếp thành **Nốt Móc Kép**.
2. **Hệ quả trong việc đếm nhịp:**
   - Cho phép nhạc công dùng kỹ thuật phân nhịp nhỏ (*Subdivision*) bằng cách nhẩm phách chia đôi (*1 - và - 2 - và...*) hoặc chia tư (*1 - e - and - a*).

## Ví dụ

- Trong nhịp $4/4$, nốt Tròn $= 4$ phách, nốt Trắng $= 2$ phách, nốt Đen $= 1$ phách, nốt Móc đơn $= 0.5$ phách, nốt Móc kép $= 0.25$ phách.

## Liên kết

- Liên quan:
  - [[Trường độ nốt và Dấu lặng]]
  - [[Số chỉ nhịp]]
  - [[Phân nhịp nhỏ (Subdivision)]]
