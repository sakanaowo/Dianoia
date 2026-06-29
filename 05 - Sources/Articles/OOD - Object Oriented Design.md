---
type: source
subtype: article
status: growing
created: 2026-06-13
updated: 2026-06-29
source:
  - https://viblo.asia/p/so-luoc-object-oriented-design-principles-MdZGAQODGox
language: Vietnamese
tags:
  - source
  - article
  - programming
  - design-pattern
  - ood
  - solid
aliases:
  - OOD
  - Object Oriented Design Principles
---
# OOD - Object Oriented Design

## Source info

- URL: https://viblo.asia/p/so-luoc-object-oriented-design-principles-MdZGAQODGox
- Source type: blog article (Viblo)
- Reliability: medium; tổng quan tốt cho SOLID, cần đối chiếu sách Uncle Bob khi học sâu.

## Main takeaway

Object Oriented Design (OOD) là tập hợp nguyên lý đảm bảo thiết kế OOP tốt — code trong sáng, dễ test, dễ maintain. SOLID là năm nguyên lý Class Design đầu tiên cần biết.

## Key claims

- OOP (4 tính chất) ≠ OOD (nguyên lý thiết kế).
- Principles trừu tượng hơn Patterns; patterns cụ thể hóa và nên tuân thủ principles.
- Uncle Bob chia 11 nguyên lý thành 3 nhóm: Class Design (SOLID), Package Cohesion, Package Coupling.
- Ngoài SOLID còn DRY, KISS...

## Concepts extracted

- [[SOLID]]
- [[Single Responsibility Principle]]

## Tóm tắt năm nguyên lý SOLID

| Nguyên lý | Nội dung |
|---|---|
| SRP | Một class, một lý do thay đổi |
| OCP | Mở cho mở rộng, đóng cho sửa đổi |
| LSP | Class con thay thế được class cha |
| ISP | Client không phụ thuộc interface không dùng |
| DIP | Phụ thuộc abstraction, không chi tiết |

**Lưu ý:** Dependency Injection là design pattern hiện thực DIP, không phải bản thân DIP.

## Tham khảo

- [SOLID — Wikipedia](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design))
- [Uncle Bob — Principles of OOD](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)
- *Agile Software Development: Principles, Patterns, and Practices* — Robert C. Martin

## Nội dung gốc

Bài viết tổng quan OOD principles, giới thiệu SOLID với ví dụ hình ảnh (dao đa năng, vịt, đèn tròn/huỳnh quang). Chi tiết từng nguyên lý xem phần tóm tắt trên hoặc các concept note riêng.
