---
type: moc
status: growing
scope: domain
created: "2026-08-19"
updated: "2026-08-19"
---

# Nuclear Fusion

## Domain này là gì?

Tổng hợp hạt nhân (Nhiệt hạch), phân ngành [[Nuclear Physics - README|Vật lý hạt nhân]] và vật lý [[plasma]] 
Nghiên cứu quá trình kết hợp 2 hoặc nhiều hạt nhân nguyên tử nhẹ (chủ yếu là đồng vị hydro như Deuterium và Tritium) để tạo hạt nhân nặng hơn, giải phóng nguồn năng lượng khổng lồ theo công thức $E=\Delta m  c^2$ 
Lĩnh vực tập trung vào các điều kiện vượt qua lực đẩy tĩnh điện Coulomb, cơ chế giam giữ plasma (từ trường, quán tính tĩnh điện, quán tính laser), kỹ thuật đo lường bức xạ neutron và bài toán công nghệ để đạt mức năng lượng ròng $Q>1$
## Mục tiêu của domain này trong vault

- Hiểu sâu bản chất vật lý: Nắm vững các điều kiện kích hoạt phản ứng nhiệt hạch (tiêu chuẩn Lawson, hiệu ứng xuyên hầm lượng tử qua rào cản Coulomb, tiết diện phản ứng) và động học của các hạt mang điện trong trường thế.

- Phục vụ project & nghiên cứu thực nghiệm: Xây dựng nền tảng lý thuyết và định lượng trực tiếp cho project [[Study - Nuclear Fusion qua Fusor]]; phân tích cơ chế hoạt động của buồng phản ứng bàn Farnsworth–Hirsch Fusor ([[Fusor]]), phân biệt rõ hiện tượng phát quang plasma thông thường với phản ứng tổng hợp hạt nhân thực thụ.

- Liên kết tri thức liên ngành: Kết nối vật lý plasma với các nguyên lý lượng tử ([[Quantum Mechanics]]), kỹ thuật chân không cao (HV/UHV), công nghệ cao áp và phương pháp đo lường bức xạ hạt nhân ([[Neutron Generators for Analytical Purposes - IAEA]]).

## Phạm vi

### Bao gồm

- Động học phản ứng nhiệt hạch: Phản ứng D-D, D-T, D-$^3\text{He}$, p-$^{11}\text{B}$; tiết diện phản ứng ($\sigma$), động năng ngưỡng và phổ năng lượng hạt sinh ra (neutron, proton, hạt alpha).
    
- Vật lý Plasma & Kỹ thuật chân không: Sự phóng điện trong chất khí (Glow Discharge), áp suất chân không, mật độ ion, quãng đường tự do trung bình, bức xạ hãm (Bremsstrahlung).
    
- Các phương pháp giam giữ plasma:
    - Giam giữ quán tính tĩnh điện (Inertial Electrostatic Confinement - IEC / Fusor).
    - Giam giữ từ trường (Magnetic Confinement - Tokamak, Stellarator).
    - Giam giữ quán tính (Inertial Confinement Fusion - ICF / Laser NIF).

- Kỹ thuật đo lường & chẩn đoán: Phát hiện thông lượng neutron (Neutron Detection), cảm biến kích hoạt bạc (Silver Activation), buồng đếm bọt khí (Bubble Spectrometer), an toàn bức xạ tia X và neutron.

### Không bao gồm / dễ bị lẫn với

- **Phân hạch hạt nhân ([[Nuclear Fission]])**: Quá trình phá vỡ hạt nhân nặng (Uranium-235, Plutonium-239) bằng neutron nhiệt kèm chuỗi phản ứng dây chuyền và chất thải phóng xạ chu kỳ bán rã dài.
    
- **Phóng điện Plasma phát quang (Glow Discharge)**: Hiện tượng kích thích và tái tổ hợp electron quang học thuần túy trong chất khí ion hóa ở điện áp cao, hoàn toàn không xảy ra va chạm hay biến đổi ở cấp độ hạt nhân.
    
- **Tổng hợp hạt nhân lạnh / LENR (Low-Energy Nuclear Reactions)**: Các giả thuyết chưa có cơ chế vật lý hạt nhân nhất quán và thiếu khả năng tái lập độc lập trong điều kiện tiêu chuẩn.

## Bản đồ tổng quan

```text
Nuclear Fusion
├── Vật lý hạt nhân cơ bản
│   ├── Lực tương tác mạnh & Rào cản Coulomb
│   ├── Hiệu ứng xuyên hầm lượng tử (Quantum Tunneling)
│   └── Tiết diện phản ứng (D-D, D-T) & Phổ năng lượng sản phẩm
├── Vật lý Plasma & Động học hạt
│   ├── Trạng thái Plasma & Phóng điện khí (Glow Discharge)
│   ├── Áp suất chân không & Quãng đường tự do trung bình
│   └── Tiêu chuẩn Lawson ($n \cdot \tau_E \cdot T$) & Bức xạ Bremsstrahlung
├── Cơ chế giam giữ (Confinement Schemes)
│   ├── IEC / Fusor (Giam giữ quán tính tĩnh điện)
│   ├── Magnetic Confinement (Tokamak, Stellarator)
│   └── Inertial Confinement (Laser ICF)
└── Đo lường, Chẩn đoán & Năng lượng ròng
    ├── Phương pháp phát hiện Neutron (Neutron Detection)
    ├── An toàn bức xạ cao áp & Tia X / Fast Neutrons
    └── Đánh giá hệ số khuếch đại năng lượng ($Q < 1$ vs $Q > 1$)
```

## Concepts cốt lõi

- [[Phản ứng tổng hợp hạt nhân]]: Quá trình kết hợp hai hạt nhân nhẹ khi chúng vượt qua lực đẩy Coulomb để lực tương tác mạnh kéo chúng lại với nhau, giải phóng động năng lớn.
    
- [[Plasma]]: Trạng thái thứ tư của vật chất, gồm hỗn hợp khí ion hóa chứa ion dương và electron tự do, có tính dẫn điện cao và phản ứng mạnh với trường điện từ.
    
- [[Giam giữ quán tính tĩnh điện]] (IEC): Kỹ thuật dùng điện trường tĩnh hình học cầu hoặc trụ để gia tốc các ion dương hướng vào tâm buồng phản ứng nhằm tạo va chạm nhiệt hạch.
    
- [[Fusor]]: Thiết bị nhiệt hạch IEC bàn do Philo Farnsworth và Robert Hirsch thiết kế, sử dụng lồng lưới cathode mang điện áp âm cao ở tâm để bẫy và gia tốc ion Deuterium.
    
- **Tiêu chuẩn Lawson ($n \cdot \tau_E \cdot T$)**: Điều kiện tích số giữa mật độ plasma ($n$), thời gian giam giữ năng lượng ($\tau_E$) và nhiệt độ ($T$) cần đạt tới để phản ứng nhiệt hạch tự duy trì hoặc tạo năng lượng ròng.

## Concepts nền tảng


- **Rào cản Coulomb ([[Coulomb Barrier]])**: Thế năng đẩy tĩnh điện giữa hai hạt nhân cùng mang điện tích dương; là rào cản chính ngăn cản phản ứng tổng hợp ở điều kiện nhiệt độ/áp suất phòng.
    
- **Hiệu ứng xuyên hầm lượng tử ([[Quantum Tunneling]])**: Cơ chế lượng tử cho phép hạt nhân vượt qua rào cản thế Coulomb ở mức động năng thấp hơn mức đỉnh cổ điển.
    
- **Quãng đường tự do trung bình ([[Mean Free Path]])**: Khoảng cách trung bình một hạt di chuyển giữa hai lần va chạm; đại lượng quyết định mức độ thất thoát năng lượng do va chạm với khí nền trong Fusor.
    
- **[[Tiết diện phản ứng]] (Cross Section - $\sigma$)**: Xác suất hình học xảy ra phản ứng hạt nhân khi hai hạt va chạm, phụ thuộc trực tiếp vào động năng tương đối của chùm ion.
    
- **Bức xạ hãm ([[Bremsstrahlung Radiation]])**: Năng lượng bức xạ điện từ phát ra khi electron bị làm lệch hướng bởi điện trường của ion; nguồn thất thoát năng lượng chủ yếu làm lạnh plasma.

## Câu hỏi trung tâm

- Làm thế nào để giải quyết bài toán vật lý cốt lõi nhằm đạt trạng thái plasma tự duy trì năng lượng (Q > 1)?
- Làm thế nào để tối ưu hóa kỹ thuật vật liệu và chu trình nhiên liệu nhằm đưa năng lượng nhiệt hạch vào thương mại hóa thực tế?

## Atomic notes quan trọng


## Arguments / Debates


## People / Schools / Traditions

- **Philo Farnsworth & Robert Hirsch**: Những người tiên phong sáng chế và hoàn thiện cấu trúc buồng giam giữ quán tính tĩnh điện (Farnsworth–Hirsch Fusor).
    
- **John D. Lawson**: Nhà vật lý đưa ra tiêu chuẩn năng lượng ròng Lawson (1955).
    
- **Lyman Spitzer**: Nhà vật lý thiên văn đề xuất nguyên lý giam giữ từ trường Stellarator và tiên phong nghiên cứu vật lý plasma kiểm soát tại Princeton.
    
- **Trường phái IEC / Tabletop Fusion**: Cộng đồng các nhà nghiên cứu độc lập, phòng thí nghiệm trường đại học tập trung vào máy phát neutron cỡ nhỏ và nghiên cứu plasma tĩnh điện.
    
- **Trường phái Big Science Fusion**: Các tập đoàn nghiên cứu đa quốc gia tập trung vào các cỗ máy giam giữ từ trường quy mô lớn (ITER, Wendelstein 7-X, JET).

## Sources nhập môn


## Sources nâng cao



## Learning path

- **Cơ sở Hạt nhân & Lượng tử**: Nắm vững rào cản Coulomb, tiết diện phản ứng $\sigma(E)$ của phản ứng D-D/D-T, cơ chế xuyên hầm lượng tử và các kênh phân rã sinh neutron.
    
- **Kỹ thuật Chân không & Cao áp (HV)**: Hiểu các dải áp suất (Rough, High Vacuum $10^{-2} \to 10^{-6}\text{ Torr}$), thông số mean free path của phân tử khí, hiện tượng phóng điện Paschen và an toàn cách điện cao áp DC (> 20kV).
    
- **Động học Plasma trong IEC/Fusor**: Nghiên cứu dòng ion, sự hình thành giếng thế tĩnh điện ảo (virtual cathode), hiện tượng Star Mode và các chế độ thất thoát năng lượng.
    
- **Kỹ thuật Đo lường Neutron & An toàn bức xạ**: Vận hành thiết bị đếm neutron (BTI Bubble Detector, He-3 / BF3 proportional counters, Silver activation), tính toán suất liều tia X Bremsstrahlung từ thành buồng.
    
- **Mở rộng sang các hệ thống Fusion quy mô lớn**: Phân tích tiêu chuẩn Lawson, các dạng bất ổn định plasma từ trường và công nghệ vật liệu kháng neutron năng lượng cao.

## Open questions


## Gaps / To process

- [ ] [[Nuclear Fusion - Prerequisite Gaps]]
