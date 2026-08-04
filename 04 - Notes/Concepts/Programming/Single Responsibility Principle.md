---
type: concept
status: growing
domains:
  - "[[Programming]]"
source:
  - "[[SOLID - Single Responsibility Principle]]"
  - "[[OOD - Object Oriented Design]]"
created: 2026-06-13
updated: 2026-06-29
aliases:
  - SRP
  - Nguyên lý đơn nhiệm
  - Single Responsibility Principle
---
# Single Responsibility Principle

## Định nghĩa ngắn

> Một class chỉ nên có **một trách nhiệm duy nhất** — tức một và chỉ một lý do để thay đổi.

Trong SRP, "trách nhiệm" được hiểu là **lý do để thay đổi**. Nếu có thể nghĩ ra nhiều hơn một động cơ làm thay đổi class, class đó vi phạm SRP.

## Nói đơn giản

Mỗi class chỉ nên làm một việc. Giống con dao đa năng: tiện lúc đầu nhưng sửa một phần thì phải tháo cả cụm, dễ ảnh hưởng phần còn lại.

## Câu hỏi mà concept này trả lời

- Làm sao giữ class dễ đọc, dễ test và dễ maintain khi requirement thay đổi?
- Khi nào nên tách class?

## Vai trò trong domain

SRP là nguyên lý đầu tiên trong [[SOLID]], thuộc nhóm Class Design Principles của [[OOD - Object Oriented Design]]. Liên quan chặt với [[Separation of concerns]].

## Ví dụ cụ thể

Class `Rectangle` vừa có `draw()` (giao diện) vừa có `area()` (tính toán) — hai lý do thay đổi khác nhau → vi phạm SRP.

**Cách sửa:** tách `area()` sang `GeometricRectangle` dùng `Rectangle` bên trong. Ứng dụng tính toán và ứng dụng đồ họa thay đổi độc lập.

## Không phải là

- Không có nghĩa mỗi class chỉ được có một method.
- Không bắt buộc áp dụng mọi lúc — nếu ứng dụng ít thay đổi, SRP quá mức có thể tạo phức tạp không cần thiết.

## Phân biệt với

| Khái niệm dễ nhầm | Khác nhau ở điểm nào? |
|---|---|
| [[Separation of concerns]] | SoC là nguyên lý rộng hơn, áp dụng cả kiến trúc hệ thống; SRP tập trung ở cấp class |
| Một class một method | SRP nói về một lý do thay đổi, không giới hạn số method |

## Liên kết hệ thống

- [[SOLID]]
- [[OOD - Object Oriented Design]]
- [[Separation of concerns]]

## Source map

- [[SOLID - Single Responsibility Principle]]
- [Uncle Bob — Principles of OOD](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)

## My current understanding

SRP đơn giản để hiểu nhưng khó áp dựng đúng. Chúng ta hay gom trách nhiệm tự nhiên; trong code cần chủ động tách theo **lý do thay đổi**, không chỉ theo cảm giác "một chức năng".
