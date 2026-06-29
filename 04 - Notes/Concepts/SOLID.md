---
type: concept
status: growing
domains:
  - "[[Programming]]"
source:
  - "[[OOD - Object Oriented Design]]"
created: 2026-06-13
updated: 2026-06-29
aliases:
  - SOLID principles
---
# SOLID

## Định nghĩa ngắn

**SOLID** là tên viết tắt của năm nguyên lý thiết kế class trong lập trình hướng đối tượng, do Michael Feathers đặt tên từ các nguyên lý của Uncle Bob (Robert C. Martin).

## Năm nguyên lý

| Chữ | Nguyên lý | Ý chính |
|---|---|---|
| **S** | [[Single Responsibility Principle]] | Một class, một lý do để thay đổi |
| **O** | Open/Closed Principle | Mở cho mở rộng, đóng cho sửa đổi |
| **L** | Liskov Substitution Principle | Class con thay thế được class cha |
| **I** | Interface Segregation Principle | Client không phụ thuộc interface không dùng |
| **D** | Dependency Inversion Principle | Phụ thuộc abstraction, không phụ thuộc chi tiết |

## Vai trò trong domain

SOLID thuộc nhóm **Class Design Principles** trong [[OOD - Object Oriented Design]]. Khác với design patterns: principles là hướng dẫn trừu tượng; patterns là giải pháp cụ thể hóa cho vấn đề thực tế.

## Liên kết hệ thống

- [[OOD - Object Oriented Design]]
- [[Separation of concerns]]
- [[Programming]]

## Source map

- [[OOD - Object Oriented Design]]
- [SOLID — Wikipedia](https://en.wikipedia.org/wiki/SOLID)

## My current understanding

SOLID là bộ nguyên lý nền trước khi học design patterns. Áp dụng nhiều giúp code dễ maintain hơn, nhưng không phải lúc nào cũng cần áp dụng tối đa ngay từ đầu.
