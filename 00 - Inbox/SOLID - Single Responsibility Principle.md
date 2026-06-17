---
aliases:
  - SOLID
  - SRP
tags:
  - design-pattern
  - IT
created: 2026-06-13
source: https://viblo.asia/p/solid-single-responsibility-principle-nguyen-ly-don-nhiem-PaLkDmKMvlX
---
## Mở đầu

Ngày xửa ngày xưa, người ta nói rằng nếu áp dụng tốt [[OOD - Object Oriented Design]] thì cuộc sống của developer sẽ dễ dàng hơn. Và SOLID là "cục gạch" đầu tiên giúp chúng ta xây dựng cuộc sống dễ dàng ấy.

1. **S**ingle Responsibility Principle
2. **O**pen Closed Principle
3. **L**iskov Substitution Principle
4. **I**nterface Segregation Principle
5. **D**ependency Inversion Principle

Trong bài viết lần này chúng ta sẽ cùng tìm hiểu về nguyên lý đầu tiên của SOLID - Single Responsibility Principle - Nguyên lý đơn nhiệm.

## Chuyện về Single Responsibility Principle

![single.png](https://images.viblo.asia/e89c9632-ab93-4873-8cff-b187b4cc7a3a.png)

### Single Responsibility Principle (SRP) ?

> Một class chỉ nên có một trách nhiệm duy nhất. Nói cách khác, một class nên có một và duy nhất một lý do để thay đổi.

Trong khái niệm về SRP có định nghĩa trách nhiệm là "lý do để thay đổi". Nếu chúng ta có thể nghĩ ra nhiều hơn một động cơ làm thay đổi class, thì class đó có nhiều hơn một trách nhiệm.

Mặc dù không hoàn toàn chính xác nhưng chúng ta có thể tạm hiểu trách nhiệm là chức năng cho nó gần gũi (yaoming) Như vậy mỗi class chỉ nên giữ một chức năng duy nhất.

### Tại sao lại phải Đơn nhiệm ?

Chúng ta cùng nhìn vào con dao "đa năng" ở phía trên. Dao, kéo, mở nút chai... cái gì cũng có, hmm "có vẻ" tiện đấy. Thế nhưng mà to quá, muốn dùng mỗi con dao mà vác cả đống này theo thì hơi mệt. Đặc biệt là nếu 1 cái kìm ở trong này bị hỏng thì tháo nó ra để sửa khá là mệt đấy, chưa kể lúc lắp vào không biết có thừa hay thiếu con vít nào không (yaoming)

Trong lập trình cũng vậy, một class có quá nhiều chức năng cũng sẽ trở nên cồng kềnh và phức tạp. Với sự phát triển của ứng dụng, các requirement liên tục thay đổi dẫn tới sự thay đổi code. Nếu một class quá nhiều chức năng sẽ khó thay đổi, tốn nhiều thời gian sửa chữa hơn và có thể ảnh hưởng tới các module đang chạy khác.

### Làm sao để Đơn nhiệm ?

Áp dụng SRP cho con dao đa năng, chúng ta sẽ tách nó thành dao, kéo... riêng từng cái, cần cái nào dùng cái đấy, hỏng cái nào thì sửa cái đấy.

Với lập trình cũng vậy, chúng ta cần thiết kế các module, class sao cho đơn giản, mỗi module chỉ thực hiện một chức năng cụ thể duy nhất là xong.

Nghe có vẻ đơn giản đấy, nhưng trong thực tế việc xác định và gom chức năng một cách hợp lí thì không hề đơn giản tí nào

### Ví dụ

#### 1.Chúng ta sẽ bắt đầu với một class

```php
class Rectangle
{
    public function draw();
    public function area();
}
```

Giả sử có 2 ứng dụng cần sử dụng class Rectangle. Một ứng dụng tính toán, sử dụng function area() để tính diện tích, ứng dụng này không sử dụng đến function draw(). Một ứng dụng đồ họa khác sử dụng function draw() để vẽ hình, ứng dụng này lại không sử dụng function area().

![rectangle.png](https://images.viblo.asia/ffd98c5b-3b6a-4fa4-b82f-d9d150f0ab36.png)

Thiết kế trên đã vi phạm SPR. Class Rectangle đã mang 2 trách nhiệm:

- Trách nhiệm thứ nhất là cung cấp thuật toán để tính toán diện tích
- Trách nhiệm thứ hai là biểu diễn Rectangle trong giao diện người dùng.

Khi một trong 2 ứng dụng yêu cầu thay đổi, chúng ta đều phải thay đổi class Rectangle.

Để giải quyết vấn đề này chúng ta tách function area từ Rectangle ra một class mới GeomatricRectangle, class này sử dụng class Rectangle.

```php
class GeomatricRectangle
{
    public function area();
}
```

Ứng dụng tính toán sẽ sử dụng GeomatricRectangle thay cho Rectangle.

![rectangle-resolve.png](https://images.viblo.asia/d3acdca7-bd7d-4189-8243-90b28ac6aaa3.png)

Với cách thiết kế này, khi yêu cầu của ứng dụng tính diện tích thay đổi sẽ không còn tác động trực tiếp tới class Rectangle và ứng dụng đồ họa thay đổi cũng không ảnh hưởng tưởng tới class GeomatricRectangle.

### Kết

Trong thực tế, việc áp dụng SRP còn phụ thuộc vào sự thay đổi của ứng dụng. Nếu ứng dụng thực sự thay đổi thì việc áp dụng SRP là cần thiết. Nếu ứng dụng không thực sự thay đổi mà chỉ là dự tính, thì việc áp dụng SRP có thể gây ra những phức tạp không cần thiết.

SRP là nguyên lý đơn giản dễ hiểu nhất, nhưng cũng khó áp dụng đúng nhất. Chúng ta thường nhóm các trách nhiệm lại với nhau một cách tự nhiên, nhưng trong lập trình, chúng cần tìm và tách riêng các trách nhiệm với nhau.

### Nguồn

[https://en.wikipedia.org/wiki/Single_responsibility_principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) [http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)
