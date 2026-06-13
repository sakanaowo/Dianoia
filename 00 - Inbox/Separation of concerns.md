---
topic:
tags:
  - IT
  - design-pattern
status: processing
Date Created: 2026-06-13
source: https://viblo.asia/q/dinh-nghia-ve-separation-of-concerns-3m5W0vy7KO7
---
---
Tư tưởng của **Separation of Concerns** là phân tách hệ thống ra thành các thành phần, chức năng nhỏ hơn, sao cho chúng càng ít điểm chung (về mặt chức năng), hay càng ít phụ thuộc vào nhau càng tốt. Khi các thành phần được ghép nối vào trong hệ thống, chúng sẽ tương tác với nhau thông qua thông tin về Interface, hay các open API, mà không cần phải biết các thành phần kia được xây dựng như thế nào, bên trong đó được lập trình (implement) ra sao.

Các lợi ích mà **Separation of Concerns** đem lại thì có rất nhiều, có thể kể ra một vài cái như:

- Do chia nhỏ thành các thành phần, tính năng, nên code có thể dễ đọc, dễ maintain hơn
- Quá trình phát triển nhanh hơn, do các thành phần, tính năng có thể phát triển độc lập với nhau, bởi các team khác nhau
- Các thành phần có thể được update, modify một cách độc với nhau
- Các thành phần có thể sử dụng lại
- Có thể sử dụng các thành phần do bên khác phát triển, mà không cần phải chỉnh sửa, cũng như không cần hiểu rõ chi tiết bên trong nó như thế nào
- ...

**Separation of Concerns** là một **design principle** (nguyên lý thiết kế) phổ biến trong phát triển phẩn mềm, với rất nhiều các thể hiện, có thể rất quen thuộc với các lập trình viên, nhưng họ lại không hay để ý đến, ví dụ một vài cái đơn giản như:

- HTML/CSS/Javascript với các ngôn ngữ đóng những vai trò khác nhau
- Mô hình **MVC**, với các tầng Model, View, Controller đảm nhiệm các nhiệm vụ riêng biệt khác nhau
- Kiến trúc Microservices với các service thực hiện những nhiệm vụ khác nhau
- Ở tầng thấp hơn, như trong lập trình hướng đối tượng, **Separation of Concerns** được thể hiện qua một design principle khác là **Single Responsibility** ([[OOD - Object Oriented Design|Nguyên lý đơn trách nhiệm]])