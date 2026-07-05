---
type: moc
status: growing
created: 2026-06-26
domains:
  - "[[Mathematics]]"
  - "[[AI & Computer Science]]"
themes:
  - "[[Learning and Intelligence]]"
---

# Xác suất và Thống kê

## Big picture

Xác suất là ngôn ngữ để mô hình hóa bất định. Thống kê dùng dữ liệu quan sát được để ước lượng, kiểm định và ra quyết định dưới bất định. Với machine learning, xác suất xuất hiện trong classification, loss function, uncertainty, Bayesian inference và đánh giá mô hình.

## Core concepts

### Nền tảng

- [[Xác suất]]
- [[Không gian mẫu]]
- [[Biến cố]]
- [[Biến ngẫu nhiên]]
- [[Biến ngẫu nhiên rời rạc]]
- [[Biến ngẫu nhiên liên tục]]

### Đặc trưng của biến

- [[Kỳ vọng]]
- [[Hiệp phương sai]]
- [[Phương sai]]
- [[Độ lệch chuẩn]]
- [[Hệ số tương quan]]

### Quy luật và bất đẳng thức

- [[Quy luật số lớn]]
- [[Bất đẳng thức Markov]]

### Hàm xác suất

- [[Hàm khối lượng xác suất]]
- [[Hàm mật độ xác suất]]
- [[Hàm phân phối tích lũy]]
- [[Xác suất đồng thời]]
- [[Xác suất biên]]
- [[Xác suất có điều kiện]]
- [[Định lý Bayes]]

### Phân phối

- [[Phân phối xác suất]]
- [[Phân phối chuẩn]]
- [[Phân phối đều]]
- [[Phân phối Poisson]]
- [[Phân phối Bernoulli]]
- [[Phân phối categorical]]
- [[Phân phối nhị thức]]
- [[Phân phối beta]]
- [[Phân phối Dirichlet]]
- [[Phân phối multinomial]]

## Core equations

| Equation | Meaning |
|---|---|
| $0 \leq P(A) \leq 1$ | Xác suất hợp lệ |
| $E[X]=\sum_i x_i p(x_i)$ | Kỳ vọng rời rạc |
| $\operatorname{Var}(X)=E[X^2]-E[X]^2$ | Công thức phương sai |
| $P(A|B)=\frac{P(A\cap B)}{P(B)}$ | Xác suất có điều kiện |
| $P(H|D)=\frac{P(D|H)P(H)}{P(D)}$ | Định lý Bayes |

## Sources

- [[Deep AI - Xác suất]]

## Open questions

- [ ] Khi nào nên dùng frequentist interpretation và khi nào nên dùng Bayesian interpretation?
- [ ] Làm sao biết một mô hình classification có xác suất được calibration tốt?
- [ ] Khi nào dữ liệu thực đủ gần một phân phối lý tưởng?
