---
aliases:
  - Nguyên lý đơn trách nhiệm
  - OOD
tags:
  - design-pattern
  - IT
created: 2026-06-13
status: processing
source: https://viblo.asia/p/so-luoc-object-oriented-design-principles-MdZGAQODGox
---
---
## Chuyện về Object Oriented Design Principles

Thời còn mài đít ở giảng đường, hầu hết sinh viên ngành CNTT đều được dạy những khái niệm cơ bản về Object Oriented Programming (OOP) như 4 tính chất của nó khá là rõ ràng. Sau này khi đi phỏng vấn xin việc thì kiểu gì cũng đc hỏi về nó.

Thế nhưng cái chúng ta đề cập đến hôm nay là Object Oriented Design chứ không phải OOP (yaoming)

Ngày xửa ngày xưa, người ta nói rằng

> Proper Object Oriented Design makes a developer's life easy, whereas bad design makes it a disaster

Vâng good design sẽ làm cho cuộc sống của lập trình viên dễ dàng hơn. Vậy làm sao để có một good design ? Chúng ta có những nguyên lý (principles).

### Khái niệm

> Là một tập hợp các hướng dẫn đảm bảo các khái niệm của OOP, giúp chúng ta tránh các thiết kế xấu.

### Lợi ích

Việc viết code theo các nguyên lý giúp cho code trở nên trong sáng, dễ đọc, dễ test và quan trọng nhất là dễ maintain hơn rất nhiều. Và chúng ta đều biết, trong vòng đời của một phần mềm, thời gian code chỉ chiếm 20-40% còn lại là thời gian dành cho maintain: thêm/bớt chức năng, fix bug...

### Design Principles có liên quan gì đến Design Patterns không ???

Câu trả lời là có, nhưng có chút khác biệt.

- Principles: là các hướng dẫn, mang tính trừu tượng nhiều hơn.
- Patterns: là những ví dụ cụ thể hóa, cung cấp các giải pháp tái sử dụng đến các vấn đề thực tế. Patterns tốt nên tuân thủ tốt Principles.

Tất cả các các thư viện/framework chúng ta dùng đều thiết kế trên một vài Pattern, rõ ràng chúng ta đang làm việc trên những nguyên lý cơ bản, nhưng code chúng ta viết ra thì chưa chắc tuân theo những nguyên lý đó (yaoming)

### Các nhóm Design Principles

Trong cuốn "Agile Software Development: Principles, Patterns, and Practices", Uncle Bob đã tổng hợp lại 11 nguyên lý và chia chúng làm 3 nhóm:

1. Class Design principles – bao gồm 5 nguyên lý
    - (SRP) Single Responsibility Principle
    - (OCP) Open Closed Principle
    - (LSP) Liskov Substitution Principle
    - (DIP) Dependency Inversion Principle
    - (ISP) Interface Segregation Principle
2. Package Cohesion Principles - bao gổm 3 nguyên lý
    - (REP) Reuse-Release Equivalence Principle
    - (CRP) Common Reuse Principle
    - (CCP) Common Closure Principle
3. Package Coupling principle - bao gồm 3 nguyên lý
    - (ADP) Acyclic Dependencies Principle
    - (SDP) Stable Dependencies Principle
    - (SAP) Stable Abstractions Principle

Ngoài ra còn có các nguyên lý khác như

- (DRY) Don't Repeat Yourself
- (KISS) Keep It Simple Stupid ...

Trong bài viết này chúng ta sẽ đề cập đến nhóm Class Design principles - SOLID.

## Chuyện về SOLID

![solid_brick_3.jpg](https://images.viblo.asia/7971f4f8-6817-4313-9c04-8077e29407c9.jpg)

"SOLID" nghĩa là "cứng" (là thể rắn nhưng mình thích gọi là cứng (yaoming)), áp dụng nhiều thì sẽ code "cứng", như cục gạch trong hình (yaoming)

Đùa thôi, "SOLID" là tên gọi tắt được giới thiệu bởi Micheal Feathers cho "first five principles" của Uncle Bob. Chính là nhóm Class Design principles:

- **S**ingle Responsibility Principle
- **O**pen Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

Trong bài viết này mình sẽ giới thiệu tổng quát về 5 nguyên lý này.

### Single responsibility principle - Nguyên lý đơn nhiệm

![image_thumb_698ffa0c.png](https://images.viblo.asia/ff532d27-a3a5-4aef-ada5-709d3f710006.png)

Nội dung

> Một class chỉ nên có một trách nhiệm duy nhất. Nói cách khác, một class nên có một và duy nhất một lý do để thay đổi.

Tưởng tượng class của chúng ta giống như con dao đa năng kia, có rất nhiều chức năng, nhìn có vẻ tiện đấy.

Thế nếu chúng ta cần thay mới một chức năng trong đó thì sao ? Tất nhiên rồi, tháo hết nó ra rồi tính. Và đây thực sự là 1 ý tưởng tồi.

Theo nguyên lý, chúng ta nên tách nó thành nhiều class nhỏ hơn. Tuy nhiều class hơn nhưng class ngắn hơn dễ đọc hơn, dễ dàng test từng chức năng hơn.

### Open/closed principle - Nguyên lý mở rộng/hạn chế

![ocp.jpg](https://images.viblo.asia/fc79eb73-a6b0-4ddf-84bc-ef4e4e5aaef6.jpg)

Nội dung

> Một thực thể phần mềm (class, modules, function...) nên mở (dễ) với sự mở rộng và đóng (hạn chế) với sự thay đổi.

Theo nguyên lý này, mỗi khi ta muốn thêm chức năng,.. cho chương trình, chúng ta nên viết class mới mở rộng class cũ ( bằng cách kế thừa hoặc sở hữu class cũ) không nên sửa đổi class cũ.

### Liskov Substitution Principle - Nguyên lý thay thế Liskov

![liskov_substitution_principle_thumb.jpg](https://images.viblo.asia/d0c3399f-27e6-4a28-b634-4242f51d8f20.jpg)

Nội dung

> Nếu S là một subtype của T, thì các đối tượng kiểu T có thể được thay thế bằng các đối tượng kiểu S mà không thay đổi bất kỳ tính đúng đắn nào của chương trình đó.

Nói một cách dễ hiểu hơn class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình.

Hãy tưởng tượng chúng ta có một class cha là Vịt. Các class VịtNhà, VịtTrời kế thừa class Vịt thì hoàn toàn có thể có thể thay thế class cha. Nhưng nếu class VịtĐồChơi cần pin mới chạy được, kế thừa class Vịt thì liệu có còn đảm bảo tính đúng đắn.

### Interface Segregation Principle - Nguyên lý phân tách giao tiếp

![interfacesegregation.jpg](https://images.viblo.asia/25962607-a1f6-435d-b82e-89a6590e8f21.jpg)

Nội dung

> Client không nên phụ thuộc vào giao tiếp (interface) mà chúng không sử dụng.

Hãy tưởng tượng chúng ta có 1 interface lớn, khoảng 100 methods. Việc implements sẽ khá cực khổ, ngoài ra còn có thể dư thừa vì 1 class không cần dùng hết 100 method.

Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể. Khi đó việc implement và quản lý sẽ dễ hơn.

### Dependency inversion principle - Nguyên lý nghịch đảo phụ thuộc

![dependency_inversion_principle_thumb.jpg](https://images.viblo.asia/25b5f0b0-d5ba-4ecd-a0c2-de36c1dcf1a9.jpg)

Nội dung

> - Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. Cả 2 nên phụ thuộc vào những cái trừu tượng (abstractions).
> - Những cái trừu tượng không nên phụ thuộc vào chi tiết, mà ngược lại.

Có thể hiểu nguyên lí này như sau: những thành phần trong 1 chương trình chỉ nên phụ thuộc vào những cái trừu tượng (abstractions). Những thành phần trừu tượng không nên phụ thuộc vào các thành phần mang tính cụ thể mà nên ngược lại.

Những cái trừu tượng (abstraction) là những cái ít thay đổi và biến động, nó tập hợp những đặc tính chung nhất của những cái cụ thể. Những cái cụ thể dù khác nhau thế nào đi nữa đều tuân theo các quy tắc chung mà cái trừu tượng đã định ra. Việc phụ thuộc vào cái trừu tượng sẽ giúp chương trình linh động và thích ứng tốt với các sự thay đổi diễn ra liên tục.

Chúng ta đều biết 2 loại đèn: đèn tròn và đèn huỳnh quang. Chúng cùng có đuôi tròn, do đó ta có thể thay thế đèn tròn bằng đèn huỳnh quanh cho nhau 1 cách dễ dàng.

![20817695_images1672955_bong.jpg](https://images.viblo.asia/a7b1f892-4bef-4064-975d-70cee3bd3554.jpg)

Ở đây, interface chính là đuôi tròn, implementation là bóng đèn tròn và bóng đèn huỳnh quang. Ta có thể swap dễ dàng giữa 2 loại bóng vì ổ điện chỉ quan tâm tới interface (đuôi tròn), không quan tâm tới implementation.

**Lưu ý:** Có một thứ chúng ta hay sử dụng rất dễ nhầm lẫn với nguyên lý này đó là _Dependency Injection_. Nên chú ý _Dependency Injection_ là một _design pattern_ hiện thực _Dependency inversion principle_.

## Kết

Bài viết khá dài dòng, toàn chữ chả có code hi vọng các bạn chưa ngủ (yaoming)

Trong các bài viết sau chúng ta sẽ tìm hiểu kĩ hơn từng nguyên lý kèm theo code minh họa (và ngắn hơn nữa (yaoming) )

Cảm ơn mọi người đã theo dõi.

### Tham Khảo

[https://en.wikipedia.org/wiki/SOLID_object-oriented_design](https://en.wikipedia.org/wiki/SOLID_\(object-oriented_design\)) [http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod) [https://www.codeproject.com/articles/567768/object-oriented-%20design-principles](https://www.codeproject.com/articles/567768/object-oriented-%20design-principles) [http://www.oodesign.com/design-principles.html](http://www.oodesign.com/design-principles.html) [https://blogs.msdn.microsoft.com/cdndevs/2009/07/15/the-solid-principles-explained-with-motivational-posters/](https://blogs.msdn.microsoft.com/cdndevs/2009/07/15/the-solid-principles-explained-with-motivational-posters/)