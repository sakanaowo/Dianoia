---
type: concept
status: growing
domains:
  - "[[Nuclear Fusion]]"
  - "[[Plasma Physics]]"
themes:
  - "[[Technology and Humanity]]"
source:
  - "[[Neutron Generators for Analytical Purposes - IAEA]]"
  - "[[Building A Nuclear Star In A Jar - Plasma Channel]]"
created: 2026-08-07
updated: 2026-08-07
aliases:
  - Inertial electrostatic confinement
  - IEC
---

# Giam giữ quán tính tĩnh điện

## Định nghĩa ngắn

Giam giữ quán tính tĩnh điện (IEC) là họ phương pháp dùng điện trường, hoặc điện trường kết hợp từ trường, để gia tốc và tập trung ion vào một vùng phản ứng.

## Nói đơn giản

Thay vì giữ plasma nóng trong một “chai từ” như tokamak, IEC tạo một cấu trúc điện thế khiến ion dương lao về vùng tâm. Quán tính đưa ion đi xuyên qua tâm; điện trường có thể làm chúng giảm tốc rồi quay lại, tạo thêm cơ hội va chạm trước khi bị mất.

## Câu hỏi mà concept này trả lời

- Vì sao một lưới cathode âm có thể tạo các chùm ion hướng tâm?
- [[Fusor]] khác tokamak ở cách đưa ion đến năng lượng phản ứng như thế nào?
- Vì sao một thiết bị nhỏ có thể tạo neutron nhưng khó đạt net power?

## Vai trò trong domain

IEC là một nhánh của [[Nuclear Fusion]] và neutron-source engineering. [[Fusor]] lưới là implementation trực quan nhất, nhưng IEC còn có các biến thể dùng virtual electrode hoặc magnetic cusp.

## Cơ chế / cách vận hành

1. Tạo ion từ khí loãng trong chamber.
2. Thiết lập potential well bằng electrode hoặc cấu hình trường.
3. Ion dương được gia tốc vào trong và nhận năng lượng xấp xỉ theo `E = qΔV` trong mô hình lý tưởng.
4. Một phần ion đi qua vùng tâm và có thể quay lại.
5. Va chạm ion-ion, ion-neutral, ion-grid và ion-wall cạnh tranh với fusion reaction.

## Thành phần / đặc điểm chính

- Potential well điện tĩnh.
- Ion có phân bố thường phi Maxwell/phi cân bằng.
- Geometry cầu hoặc trụ nhằm tăng mật độ đường đi ở vùng tâm.
- Electrode thật hoặc “virtual electrode” tùy thiết kế.
- Loss mechanisms gắn chặt với grid, wall, charge exchange và radiation.

## Công thức / đại lượng liên quan

- Năng lượng lý tưởng của hạt tích điện: `ΔK = qΔV`.
- [[Fusion cross-section]] phụ thuộc năng lượng tương đối khi va chạm.
- Reaction rate còn phụ thuộc mật độ, quỹ đạo, background gas và confinement time.
- Điện áp đặt vào không bằng năng lượng thực của mọi ion vì plasma potential và va chạm làm phân bố phức tạp hơn.

## Cách quan sát / đo lường / nhận biết

- I-V characteristic và pressure cho trạng thái discharge.
- Emission pattern/star mode cho hình học plasma/chùm hạt.
- Neutron-specific detector mới kiểm tra phản ứng D-D.
- Đo nền và calibration cần tách neutron khỏi nhiễu điện, tia X và background tự nhiên.

## Không phải là

- Không phải inertial confinement bằng laser/nén pellet.
- Không phải magnetic confinement kiểu tokamak.
- “Confinement” không có nghĩa mọi ion bị giữ ổn định lâu; nhiều ion nhanh chóng mất vào grid và wall.

## Phân biệt với

| Concept dễ nhầm | Khác nhau ở điểm nào? |
|---|---|
| [[Inertial confinement fusion]] | Nén nhiên liệu trong thời gian rất ngắn bằng driver như laser; không phải potential well tĩnh điện. |
| [[Magnetic confinement fusion]] | Dùng từ trường để điều khiển plasma mang điện trong thể tích lớn hơn. |
| [[Fusor]] | Fusor là một loại thiết bị cụ thể triển khai IEC, thường có lưới cathode. |

## Vì sao nó quan trọng?

IEC cho thấy “tạo fusion” và “tạo năng lượng ròng” là hai bài toán khác nhau. Cấu hình nhỏ có thể tạo reaction products đo được, trong khi tổn hao vẫn vượt xa fusion output.

## Tranh luận / điểm chưa chắc

- Cần tách kết quả của fusor lưới cổ điển khỏi claim về mọi biến thể IEC.
- Mức độ giới hạn “nền tảng” hay “kỹ thuật” của từng loss channel phụ thuộc thiết kế và giả định.
- Không dùng một paper lạc quan hoặc phê bình duy nhất để kết luận cho toàn bộ IEC.

## Liên kết hệ thống

### Concepts liên quan

- [[Fusor]]
- [[Plasma]]
- [[Điện trường]]
- [[Fusion cross-section]]

### Atomic notes liên quan

- [[Chân không làm tăng quãng đường tự do trung bình của ion trong fusor]]
- [[Tạo được phản ứng tổng hợp hạt nhân chưa đồng nghĩa với tạo được năng lượng ròng]]

### Questions liên quan

- [[Làm sao biết một fusor đã thực sự tạo fusion]]

## Source map

- [[Neutron Generators for Analytical Purposes - IAEA]] — Section 5.3.
- [[Building A Nuclear Star In A Jar - Plasma Channel]] — demo trực quan.
- [Hirsch 1967](https://doi.org/10.1063/1.1709162) — paper nền tảng.
- [Rider 1995](https://doi.org/10.1063/1.871273) — phê bình giới hạn IEC.

## Cách học tiếp

1. Vẽ potential và quỹ đạo ion lý tưởng.
2. Thêm lần lượt grid collision, background collision và space charge vào mô hình.
3. So sánh reaction rate với các loss rate.
