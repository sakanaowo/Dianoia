---
type: concept
status: growing
domains:
  - "[[Nuclear Fusion]]"
  - "[[Nuclear Physics - README]]"
themes:
  - "[[Knowledge and Truth]]"
  - "[[Technology and Humanity]]"
source:
  - "[[Nuclear fusion - Wikipedia]]"
  - "[[Neutron Generators for Analytical Purposes - IAEA]]"
created: 2026-08-07
updated: 2026-08-07
aliases:
  - Nuclear fusion
  - Fusion hạt nhân
---

# Phản ứng tổng hợp hạt nhân

## Định nghĩa ngắn

Phản ứng tổng hợp hạt nhân là quá trình hai hạt nhân nhẹ kết hợp qua tương tác hạt nhân để tạo các sản phẩm mới. Phản ứng giải phóng năng lượng khi tổng trạng thái cuối liên kết chặt hơn trạng thái đầu.

## Nói đơn giản

Hai hạt nhân dương vốn đẩy nhau. Nếu chúng có thể tiến đủ gần, lực hạt nhân mạnh có thể liên kết hoặc biến đổi chúng. Phần chênh lệch khối lượng nghỉ giữa trước và sau phản ứng xuất hiện dưới dạng động năng của sản phẩm và bức xạ.

## Câu hỏi mà concept này trả lời

- Fusion thay đổi hạt nhân như thế nào?
- Năng lượng phản ứng đến từ đâu?
- Vì sao tạo plasma chưa đủ để kết luận có fusion?

## Vai trò trong domain

Đây là hiện tượng trung tâm của [[Nuclear Fusion]]. [[Plasma]] chỉ là một môi trường có thể giúp tạo ion và va chạm; các phương pháp confinement quyết định cách đưa đủ hạt vào điều kiện phản ứng.

## Cơ chế / cách vận hành

1. Chuẩn bị các hạt nhân/ion nhiên liệu như deuterium hoặc tritium.
2. Cho chúng một phân bố năng lượng đủ để có xác suất tiến gần nhau.
3. [[Quantum tunneling]] làm xác suất phản ứng khác không ngay cả khi năng lượng thấp hơn đỉnh [[Coulomb barrier]].
4. Khi phản ứng xảy ra, năng lượng và động lượng được phân phối cho các sản phẩm.
5. Detector phải nhận diện sản phẩm đặc trưng để chứng minh phản ứng.

## Các phản ứng liên quan

```text
D + D -> He-3 + n       (neutron khoảng 2.45 MeV)
D + D -> T + p
D + T -> He-4 + n       (neutron khoảng 14.1 MeV)
```

Hai nhánh D-D đều quan trọng; việc chỉ nói “D-D tạo neutron” là một lược giản.

## Công thức / đại lượng liên quan

- Reaction energy / Q-value: `Q = (m_initial - m_final)c²`.
- [[Fusion cross-section]]: xác suất hiệu dụng của phản ứng theo năng lượng va chạm.
- Reaction rate phụ thuộc mật độ hạt, phân bố vận tốc và cross-section.
- eV/keV mô tả năng lượng hạt; không tự động là nhiệt độ cân bằng của toàn hệ.

## Cách quan sát / đo lường / nhận biết

- Nhận diện neutron, proton, alpha hoặc sản phẩm khác có năng lượng phù hợp với kênh phản ứng.
- Đo background khi thiết bị chưa chạy hoặc chưa có nhiên liệu đối chứng.
- Biết detector efficiency, geometry, calibration và uncertainty.
- Không dùng màu plasma làm proxy trực tiếp cho reaction rate.

## Không phải là

- Không đồng nghĩa với ion hóa khí.
- Không đồng nghĩa với plasma phát sáng.
- Không đồng nghĩa với đạt breakeven hoặc tạo điện.
- Không phải phản ứng dây chuyền tự duy trì kiểu fission reactor.

## Phân biệt với

| Concept dễ nhầm | Khác nhau ở điểm nào? |
|---|---|
| [[Plasma]] | Trạng thái vật chất có hạt tích điện; có thể tồn tại mà không có phản ứng hạt nhân. |
| [[Nuclear fission]] | Tách hạt nhân nặng thay vì kết hợp hạt nhân nhẹ. |
| [[Fusion energy]] | Bài toán hệ thống nhằm thu được năng lượng hữu ích, rộng hơn phản ứng riêng lẻ. |

## Vì sao nó quan trọng?

Phân biệt phản ứng với môi trường và thiết bị giúp tránh hai lỗi: gọi mọi plasma là fusion, hoặc nghĩ rằng vài phản ứng fusion đã giải quyết bài toán năng lượng.

## Misconceptions

- “Nhiệt độ cao là đủ”: còn cần mật độ, thời gian confinement và reaction rate.
- “Nhìn thấy star mode là nhìn thấy fusion”: star mode là emission của plasma/discharge.
- “Có neutron là có nhà máy điện”: neutron source và net-power system là hai mục tiêu khác nhau.

## Liên kết hệ thống

### Concepts liên quan

- [[Plasma]]
- [[Coulomb barrier]]
- [[Fusion cross-section]]
- [[Lawson criterion]]
- [[Giam giữ quán tính tĩnh điện]]

### Atomic notes liên quan

- [[Plasma phát sáng không phải là bằng chứng của phản ứng tổng hợp hạt nhân]]
- [[Tạo được phản ứng tổng hợp hạt nhân chưa đồng nghĩa với tạo được năng lượng ròng]]

### Questions liên quan

- [[Làm sao biết một fusor đã thực sự tạo fusion]]

## Source map

- [[Nuclear fusion - Wikipedia]] — survey.
- [[Neutron Generators for Analytical Purposes - IAEA]] — D-D/D-T neutron generator và safety.
- [DOE Explains: Deuterium-Tritium Fusion Fuel](https://www.energy.gov/science/doe-explainsdeuterium-tritium-fusion-fuel) — nhiên liệu D-T.

## Cách học tiếp

1. Tính Q-value cho một phản ứng bằng dữ liệu khối lượng chuẩn.
2. Vẽ đồ thị định tính cross-section theo năng lượng.
3. Nối reaction rate với Lawson criterion và detector count rate.
