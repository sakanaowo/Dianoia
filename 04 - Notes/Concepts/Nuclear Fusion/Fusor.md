---
type: concept
status: growing
domains:
  - "[[Nuclear Fusion]]"
  - "[[Plasma Physics]]"
themes:
  - "[[Knowledge and Truth]]"
  - "[[Technology and Humanity]]"
source:
  - "[[Building A Nuclear Star In A Jar - Plasma Channel]]"
  - "[[Neutron Generators for Analytical Purposes - IAEA]]"
created: 2026-08-07
updated: 2026-08-07
aliases:
  - Farnsworth-Hirsch fusor
  - Demo fusor
---

# Fusor

## Định nghĩa ngắn

Fusor là thiết bị dùng [[Giam giữ quán tính tĩnh điện]] để tạo plasma và gia tốc ion về một vùng tâm. Khi dùng nhiên liệu và chẩn đoán phù hợp, một fusor có thể tạo phản ứng fusion và hoạt động như nguồn neutron.

## Nói đơn giản

Một lưới ở tâm được đặt điện thế âm so với chamber. Ion dương bị kéo vào, có thể đi qua các khe lưới và hội tụ gần tâm. Phần lớn hạt bị mất; một phần rất nhỏ có thể va chạm theo kênh fusion nếu khí là nhiên liệu phù hợp.

## Câu hỏi mà concept này trả lời

- Thiết bị trong video đang làm gì về mặt vật lý?
- Demo fusor khác neutron-producing fusor ở đâu?
- Vì sao fusor tạo được fusion nhưng không phải power reactor hiệu quả?

## Vai trò trong domain

Fusor là case study nối [[Phản ứng tổng hợp hạt nhân]], [[Plasma]], điện trường, [[Chân không]], detector và an toàn. Nó phù hợp để học sự khác nhau giữa hiện tượng nhìn thấy và bằng chứng đo.

## Cơ chế / cách vận hành

```text
Khí loãng
  -> ion hóa thành plasma
  -> ion dương được điện trường gia tốc vào tâm
  -> ion đi qua lưới / vùng tâm / quay lại hoặc bị mất
  -> một phần rất nhỏ va chạm theo kênh fusion nếu có nhiên liệu phù hợp
```

Star mode hình thành từ cấu trúc discharge và các chùm hạt đi qua khe lưới. Nó không phải ánh sáng trực tiếp của reaction products.

## Hai mức cần phân biệt

### Demo fusor

- Tạo discharge/plasma với không khí, helium hoặc khí không phải nhiên liệu D-D.
- Dùng để quan sát glow, star mode và học vacuum/plasma.
- Không có claim fusion nếu không có nhiên liệu và phép đo sản phẩm phản ứng.

### Neutron-producing fusor

- Dùng nhiên liệu như deuterium và đạt điều kiện cho D-D reactions.
- Phải có neutron-specific diagnostics và kiểm soát background.
- Là nguồn bức xạ ion hóa, không còn là một plasma display.

## Công thức / đại lượng liên quan

- `ΔK = qΔV` là điểm bắt đầu để ước lượng năng lượng ion.
- Pressure và mean free path ảnh hưởng số va chạm trước khi ion đi qua vùng gia tốc.
- Neutron yield là một output đo được, khác với fusion power và wall-plug efficiency.

## Cách quan sát / đo lường / nhận biết

- Plasma/star mode: camera, spectroscopy và đặc trưng discharge.
- Fusion D-D: detector neutron phù hợp, background, calibration và geometry.
- Radiation safety: đánh giá riêng tia X, neutron, gamma và activation.
- Không suy ra “zero radiation” chỉ từ việc một detector không đếm được tín hiệu nếu chưa biết detector sensitivity.

## Không phải là

- Không phải miniature Sun: Mặt Trời dựa vào confinement hấp dẫn và plasma gần cân bằng hơn.
- Không phải tokamak thu nhỏ.
- Không phải power reactor chỉ vì có thể tạo fusion.
- Không phải thiết bị an toàn để sao chép từ video.

## Misconceptions

- “Màu tím/trắng chứng minh fusion.”
- “Helium sáng trong chamber là helium vừa được tạo bởi fusion.”
- “Đạt hàng chục kilovolt nghĩa là mọi ion có đúng năng lượng đó.”
- “Detector không báo tín hiệu nghĩa là chắc chắn không có bức xạ.”

## Vì sao nó quan trọng?

Fusor là ví dụ rất rõ cho khoảng cách giữa proof of phenomenon, useful neutron source và net-energy technology.

## Liên kết hệ thống

### Concepts liên quan

- [[Giam giữ quán tính tĩnh điện]]
- [[Plasma]]
- [[Phản ứng tổng hợp hạt nhân]]
- [[Quãng đường tự do trung bình]]
- [[Neutron detector]]

### Atomic notes liên quan

- [[Plasma phát sáng không phải là bằng chứng của phản ứng tổng hợp hạt nhân]]
- [[Chân không làm tăng quãng đường tự do trung bình của ion trong fusor]]
- [[Tạo được phản ứng tổng hợp hạt nhân chưa đồng nghĩa với tạo được năng lượng ròng]]

### Questions liên quan

- [[Làm sao biết một fusor đã thực sự tạo fusion]]

## Source map

- [[Building A Nuclear Star In A Jar - Plasma Channel]] — demo fusor dùng không khí/helium.
- [[Neutron Generators for Analytical Purposes - IAEA]] — IEC neutron sources và safety.
- [Hirsch 1967](https://doi.org/10.1063/1.1709162) — thiết kế IEC lịch sử.

## Cách học tiếp

1. Giải thích demo fusor mà không dùng từ “fusion” cho phần glow.
2. Vẽ luồng năng lượng từ nguồn điện đến ion, grid/wall losses và fusion products.
3. Trả lời [[Làm sao biết một fusor đã thực sự tạo fusion]].
