---
type: source
subtype: article
status: processing
created: 2026-06-26
source:
  - https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html
author: Phạm Đình Khánh
publication: Deep AI KhanhBlog
language: Vietnamese
tags:
  - source
  - article
  - probability
  - statistics
  - machine-learning
aliases:
  - Deep AI - Xác suất
  - Xác suất - Deep AI KhanhBlog
---

# Deep AI - Xác suất

## Source info

- URL: https://phamdinhkhanh.github.io/deepai-book/ch_probability/nb_appendix_probability.html
- Author: Phạm Đình Khánh
- Publication: Deep AI KhanhBlog
- Date processed: 2026-06-26
- Source type: article / book appendix
- Reliability: medium; tốt để lấy bản đồ nhập môn cho ML, nhưng cần đối chiếu giáo trình xác suất thống kê chuẩn khi học công thức.

## Main takeaway

Bài viết giới thiệu các khái niệm xác suất nền tảng thường dùng trong machine learning: không gian mẫu, biến ngẫu nhiên, kỳ vọng, phương sai, PMF/PDF/CDF, joint/marginal/conditional probability, Bayes và một số phân phối xác suất phổ biến.

## Key claims

- Xác suất dùng để đo mức độ chắc chắn/không chắc chắn của sự kiện.
- Không gian mẫu chứa toàn bộ kết quả có thể xảy ra của phép thử.
- Biến ngẫu nhiên có thể rời rạc hoặc liên tục.
- Kỳ vọng, phương sai, độ lệch chuẩn, hiệp phương sai và tương quan là các đặc trưng quan trọng của biến.
- PMF dùng cho biến rời rạc, PDF dùng cho biến liên tục, CDF biểu diễn xác suất tích lũy.
- Joint distribution, marginal distribution và conditional probability là nền để hiểu Bayes.
- Classification có thể được diễn giải như ước lượng xác suất hậu nghiệm $P(Y|X)$.
- Các phân phối như Bernoulli, categorical, binomial, normal, uniform, Poisson, beta, Dirichlet và multinomial là các mẫu hình xác suất thường gặp.

## Concepts extracted

- [[Xác suất]]
- [[Không gian mẫu]]
- [[Biến cố]]
- [[Biến ngẫu nhiên]]
- [[Biến ngẫu nhiên rời rạc]]
- [[Biến ngẫu nhiên liên tục]]
- [[Kỳ vọng]]
- [[Hiệp phương sai]]
- [[Phương sai]]
- [[Độ lệch chuẩn]]
- [[Hệ số tương quan]]
- [[Quy luật số lớn]]
- [[Bất đẳng thức Markov]]
- [[Hàm khối xác suất]]
- [[Hàm mật độ xác suất]]
- [[Hàm phân phối tích lũy]]
- [[Xác suất đồng thời]]
- [[Xác suất biên]]
- [[Xác suất có điều kiện]]
- [[Định lý Bayes]]
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

## Atomic notes to create

- [ ] [[Xác suất đo mức độ không chắc chắn của một sự kiện]]
- [ ] [[Biến ngẫu nhiên biến kết quả thực tế thành đại lượng có thể tính toán]]
- [ ] [[Kỳ vọng là giá trị đại diện dài hạn chứ không nhất thiết là giá trị xảy ra thật]]
- [ ] [[Phương sai đo mức độ phân tán quanh kỳ vọng]]
- [ ] [[PMF dùng cho biến rời rạc còn PDF dùng cho biến liên tục]]
- [ ] [[Định lý Bayes cập nhật niềm tin khi có thêm điều kiện quan sát]]
- [ ] [[Classification có thể được hiểu như ước lượng xác suất hậu nghiệm]]
- [ ] [[Dirichlet mô hình hóa sự bất định của vector xác suất categorical]]

## What I disagree with / doubt

- Bài viết dùng một số thuật ngữ chưa chuẩn chính tả: `join distribution` nên là `joint distribution`, `margin distribution` nên là `marginal distribution`, `possion` nên là `Poisson`, `multi-normial` nên là `multinomial`.
- Công thức phân phối nhị thức trong bài có khả năng bị đảo ký hiệu tổ hợp; công thức chuẩn là $\binom{{n}}{{k}}p^k(1-p)^{{n-k}}$.
- Ví dụ Poisson trong bài hỏi 2 người nhưng công thức lại tính $P(X=3)$, cần kiểm tra lại.
- Công thức Dirichlet trong bài cần đối chiếu lại; công thức chuẩn là $\prod_i \lambda_i^{{\alpha_i-1}}$ trên simplex, không nhân thêm $(1-\lambda_i)$ cho từng thành phần.
- Bài này phù hợp làm bản đồ nhập môn, không nên xem là nguồn cuối cùng cho chứng minh toán học.

## Raw highlights

- Xác suất đo mức độ chắc chắn của sự kiện.
- Không gian mẫu chứa toàn bộ khả năng có thể xảy ra.
- Biến ngẫu nhiên có thể rời rạc hoặc liên tục.
- Kỳ vọng là giá trị đại diện; phương sai đo biến động quanh kỳ vọng.
- PMF/PDF/CDF là ba cách mô tả phân phối.
- Bayes liên hệ prior, likelihood và posterior.
- Các phân phối cơ bản là công cụ mô hình hóa các kiểu dữ liệu khác nhau.
