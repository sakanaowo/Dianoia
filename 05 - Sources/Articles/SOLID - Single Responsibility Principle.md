---
type: source
subtype: article
status: growing
created: 2026-06-13
updated: 2026-06-29
source:
  - https://viblo.asia/p/solid-single-responsibility-principle-nguyen-ly-don-nhiem-PaLkDmKMvlX
language: Vietnamese
tags:
  - source
  - article
  - programming
  - design-pattern
  - solid
aliases:
  - SOLID - SRP
  - SRP - Viblo
---
# SOLID - Single Responsibility Principle

## Source info

- URL: https://viblo.asia/p/solid-single-responsibility-principle-nguyen-ly-don-nhiem-PaLkDmKMvlX
- Source type: blog article (Viblo)
- Reliability: medium; nhập môn tốt, nên đối chiếu Uncle Bob gốc khi học sâu.

## Main takeaway

Single Responsibility Principle (SRP): một class chỉ nên có một trách nhiệm — một lý do để thay đổi. Tách trách nhiệm giúp code dễ maintain khi requirement thay đổi.

## Key claims

- "Trách nhiệm" trong SRP = "lý do để thay đổi".
- Class nhiều chức năng → cồng kềnh, khó sửa, dễ ảnh hưởng module khác.
- Ví dụ `Rectangle` vừa `draw()` vừa `area()` vi phạm SRP; tách `GeometricRectangle` để giải quyết.
- SRP cần thiết khi ứng dụng thực sự thay đổi; áp dụng quá sớm có thể gây phức tạp không cần thiết.

## Concepts extracted

- [[Single Responsibility Principle]]
- [[SOLID]]
- [[OOD - Object Oriented Design]]

## Tham khảo thêm

- [Wikipedia — Single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)
- [Uncle Bob — Principles of OOD](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)

## Nội dung gốc (tóm tắt)

Bài viết giới thiệu SRP bằng ví dụ con dao đa năng và class `Rectangle`/`GeometricRectangle` trong PHP. Giải thích tại sao tách trách nhiệm giúp ứng dụng tính toán và ứng dụng đồ họa thay đổi độc lập.
