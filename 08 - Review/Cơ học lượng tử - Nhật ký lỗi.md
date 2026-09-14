---
type: review
subtype: error-log
status: growing
created: 2026-06-24
updated: 2026-06-24
domains:
  - "[[Quantum Mechanics]]"
tags:
  - review
  - error-log
  - quantum-mechanics
---

# Cơ học lượng tử - Nhật ký lỗi

## Mục đích

Note này ghi các lỗi cho thấy mình đang yếu khái niệm nào trong cơ học lượng tử. Không chỉ ghi “sai đáp án”, mà phải chỉ ra lỗi hiểu.

## Các lỗi

### 2026-06-24 — Ví dụ template: nhầm eigenvalue với expectation value

#### Bối cảnh

- Nguồn / bài: phép đo một observable
- Khái niệm liên quan: [[Đại lượng quan sát trong cơ học lượng tử]], [[Expectation value]], [[Eigenvalue]]

#### Mình đã sai gì?

Mình đối xử expectation value như thể nó là kết quả của một lần đo đơn lẻ.

#### Vì sao sai?

Một phép đo lý tưởng đơn lẻ của observable cho một trong các eigenvalue của observable đó. Expectation value là trung bình thống kê trên nhiều hệ được chuẩn bị giống nhau hoặc nhiều lần đo lặp lại.

#### Ý đúng

Không được gộp “kết quả có thể xảy ra” và “giá trị trung bình” thành một.

#### Quy tắc tổng quát

Một lần đo → eigenvalue. Thống kê nhiều lần → expectation value.

#### Note cần tạo / cập nhật

- [ ] [[Một lần đo observable cho eigenvalue chứ không cho expectation value]]
- [ ] [[Expectation value]]
- [ ] [[Đại lượng quan sát trong cơ học lượng tử]]

#### Khi nào cần review lại?

Review lỗi này mỗi khi bài hỏi xác suất đo, năng lượng trung bình hoặc các kết quả đo có thể xảy ra.

## Mẫu lỗi lặp lại

| Mẫu lỗi | Số lần | Khái niệm liên quan | Cách sửa |
|---|---:|---|---|
| Nhầm eigenvalue với expectation value | 1 | [[Eigenvalue]], [[Expectation value]] | Làm bài về xác suất đo |
