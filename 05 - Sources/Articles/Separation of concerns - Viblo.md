---
type: source
subtype: article
status: growing
created: 2026-06-13
updated: 2026-06-29
source:
  - https://viblo.asia/q/dinh-nghia-ve-separation-of-concerns-3m5W0vy7KO7
language: Vietnamese
tags:
  - source
  - article
  - programming
  - design-pattern
aliases:
  - SoC - Viblo
  - Separation of concerns - Viblo
---
# Separation of concerns - Viblo

## Source info

- URL: https://viblo.asia/q/dinh-nghia-ve-separation-of-concerns-3m5W0vy7KO7
- Source type: Q&A / article (Viblo)
- Reliability: medium; định nghĩa chuẩn, phù hợp làm nguồn nhập môn.

## Main takeaway

Separation of Concerns phân tách hệ thống thành các thành phần ít phụ thuộc, giao tiếp qua interface/API. Ở tầng OOP, thể hiện qua [[Single Responsibility Principle]].

## Concepts extracted

- [[Separation of concerns]]
- [[Single Responsibility Principle]]
- [[OOD - Object Oriented Design]]

## Nội dung gốc

Tư tưởng SoC là phân tách hệ thống ra thành các thành phần, chức năng nhỏ hơn, sao cho chúng càng ít điểm chung (về mặt chức năng), hay càng ít phụ thuộc vào nhau càng tốt. Khi các thành phần được ghép nối vào trong hệ thống, chúng sẽ tương tác với nhau thông qua thông tin về Interface, hay các open API, mà không cần phải biết các thành phần kia được xây dựng như thế nào, bên trong đó được lập trình (implement) ra sao.

Các lợi ích:

- Code dễ đọc, dễ maintain
- Phát triển nhanh hơn, các team làm độc lập
- Thành phần update/modify độc lập
- Tái sử dụng component
- Dùng component bên ngoài không cần hiểu chi tiết bên trong

Ví dụ quen thuộc: HTML/CSS/JS, MVC, Microservices; ở tầng OOP: SRP.
