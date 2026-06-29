---
type: concept
status: growing
domains:
  - "[[Quantum Mechanics]]"
themes:
  - "[[Knowledge and Truth]]"
source:
  - "[[Lectures on Quantum Mechanics - Steven Weinberg]]"
created: 2026-06-27
updated: 2026-06-29
aliases:
  - Wave function
  - ψ
---
# Hàm sóng

## Định nghĩa ngắn

**Hàm sóng** $\psi(x,t)$ là hàm mô tả cách một xung lan truyền trong không gian theo thời gian, và trong cơ học lượng tử là biểu diễn của [[Trạng thái lượng tử]] trong position basis.

## Nói đơn giản

Sóng là quá trình lan truyền xung. Một sóng phẳng không biến dạng theo thời gian có dạng $\psi(x,t)=\psi(x-vt)$, trong đó $v$ là tốc độ lan truyền. Tại $t=0$ sóng có hình dạng $\psi(x,0)$; sau thời gian $t$, hình dạng giữ nguyên nhưng dịch sang phải một đoạn $vt$.

## Câu hỏi mà concept này trả lời

- Làm sao mô tả một xung di chuyển trong không gian?
- Trong cơ học lượng tử, trạng thái hạt được biểu diễn như thế nào trước khi nói đến xác suất đo?

## Vai trò trong domain

Trong [[Quantum Mechanics]], hàm sóng là cửa vào lịch sử của cơ học sóng. Lõi hiện đại sâu hơn: state vector trong [[Không gian Hilbert]]; hàm sóng chỉ là một biểu diễn cụ thể. Hàm sóng nối với [[Quy tắc Born]] qua $|\psi(x)|^2$ — mật độ xác suất tìm thấy hạt tại $x$.

## Cơ chế / cách vận hành

### Sóng dạng xung

**Xung vuông** tại $t=0$:

$$\psi(x,0)=\begin{cases} C & \text{khi } x \in (0,a) \\ 0 & \text{khi } x \notin (0,a) \end{cases}$$

Muốn xung di chuyển sang phải với vận tốc $v$, thay $x$ bằng $x-vt$:

$$\psi(x,t)=\begin{cases} C & \text{khi } (x-vt)\in(0,a) \\ 0 & \text{khi } (x-vt)\notin(0,a) \end{cases}$$

![[Pasted image 20260627091927.png]]

**Xung tam giác** tương tự: thay $x \to x-vt$ trong $\psi(x,0)$.

### Sóng sin

$$\psi(x,t)= C\cdot\cos[k(x-vt)] = C\cdot\cos(kx-\omega t)$$

trong đó $v = \omega/k$.

| Ký hiệu | Tên | Ý nghĩa |
|---|---|---|
| $k$ | Số sóng góc (angular wavenumber) | Đo sự thay đổi pha trên mỗi đơn vị chiều dài (rad/m) |
| $\omega$ | Tần số góc | Nhịp độ dao động theo thời gian |
| $\lambda$ | Bước sóng | $k = 2\pi/\lambda$ |
| $T$ | Chu kỳ | $\omega = 2\pi/T$ |

Số sóng thể hiện độ giãn của sóng trong không gian; tần số thể hiện nhịp độ theo thời gian.

## Ví dụ cụ thể

- Xung vuông di chuyển: thay biến không gian bằng $x-vt$.
- Sóng sin lan truyền một chiều: $\cos(kx-\omega t)$ với $v=\omega/k$.

## Không phải là

- Hàm sóng **không** đồng nghĩa với trạng thái lượng tử đầy đủ — nó là biểu diừn trong một basis.
- Hàm sóng **không** mô tả quỹ đạo xác định của hạt trong nghĩa cổ điển.

## Phân biệt với

| Khái niệm dễ nhầm | Khác nhau ở điểm nào? |
|---|---|
| [[Trạng thái lượng tử]] | Trạng thái là đối tượng trong Hilbert space; hàm sóng là biểu diễn trong position basis |
| Sóng cổ điển | Sóng cổ điển mô tả dao động vật lý trực tiếp; hàm sóng lượng tử liên hệ xác suất qua Born rule |

## Liên kết hệ thống

- [[Quy tắc Born]]
- [[Phương trình Schrödinger]]
- [[Probability Density Function]]
- [[Cơ học lượng tử - Câu hỏi mở]]

## Source map

- [[Lectures on Quantum Mechanics - Steven Weinberg]] — Ch. 1, cơ học sóng

## My current understanding

Hàm sóng mô tả sóng lan truyền bằng cách thay $x \to x-vt$. Trong QM, cùng ký hiệu $\psi$ nhưng ý nghĩa sâu hơn: biên độ cho xác suất, không phải biên độ vật lý trực tiếp.
