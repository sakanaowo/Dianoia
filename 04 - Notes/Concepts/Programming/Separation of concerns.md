---
type: concept
status: growing
domains:
  - "[[Programming]]"
source:
  - "[[Separation of concerns - Viblo]]"
created: 2026-06-13
updated: 2026-06-29
aliases:
  - SoC
  - Phân tách mối quan tâm
---
# Separation of concerns

## Định nghĩa ngắn

**Separation of Concerns (SoC)** là nguyên lý thiết kế phân tách hệ thống thành các thành phần nhỏ hơn, sao cho chúng càng ít phụ thuộc lẫn nhau càng tốt, và tương tác qua interface hoặc API mà không cần biết chi tiết triển khai bên trong.

## Nói đơn giản

Mỗi phần của hệ thống lo một việc riêng. Các phần nói chuyện với nhau qua "hợp đồng" (interface), không soi vào bên trong nhau.

## Câu hỏi mà concept này trả lời

- Làm sao giữ hệ thống lớn dễ đọc, dễ maintain và phát triển song song?
- Làm sao thay đổi một phần mà không phá phần khác?

## Vai trò trong domain

SoC là **design principle** phổ biến, xuất hiện ở nhiều cấp:

- HTML / CSS / JavaScript — tách cấu trúc, trình bày, hành vi
- **MVC** — Model, View, Controller
- **Microservices** — mỗi service một nhiệm vụ
- Lập trình hướng đối tượng — thể hiện qua [[Single Responsibility Principle]]

## Lợi ích chính

- Code dễ đọc, dễ maintain
- Các team phát triển độc lập
- Thành phần có thể update, tái sử dụng riêng
- Dùng component bên ngoài mà không cần hiểu chi tiết bên trong

## Liên kết hệ thống

- [[Single Responsibility Principle]]
- [[OOD - Object Oriented Design]]
- [[SOLID]]

## Source map

- [[Separation of concerns - Viblo]] (nguồn gốc)

## My current understanding

SoC là nguyên lý nền rộng hơn SRP. SRP là cách thể hiện SoC ở cấp class trong OOP.
