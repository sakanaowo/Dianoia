---
type: atomic
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - atomic
  - tool-calling
  - llm
  - architecture
created: 2026-09-24
updated: 2026-09-24
---

# Mô hình LLM không tự chạy code trong chu trình Tool Calling

## Mệnh đề cốt lõi

Trong kiến trúc Tool Calling, **mô hình ngôn ngữ lớn (LLM) hoàn toàn không có khả năng tự thực thi mã nguồn hay trực tiếp tương tác với môi trường bên ngoài**; mô hình chỉ đóng vai trò một bộ phân tích văn bản xác suất để sinh ra một chuỗi JSON hợp lệ mô tả ý định gọi hàm, trong khi toàn bộ việc thực thi mã nguồn và gọi API thuộc về mã điều khiển (Host/Runtime) phía máy chủ.

---

## Bối cảnh và Cơ chế Kỹ thuật

1. **Hiểu lầm phổ biến:**
   * Người mới tiếp cận AI thường hình dung LLM giống như một hệ điều hành có thể tự do mở cổng mạng, chạy file script hoặc chỉnh sửa cơ sở dữ liệu.
   * Thực tế: LLM chỉ là một mô hình dự đoán token tiếp theo. Bản thân nó bị cô lập hoàn toàn trong không gian inference.

2. **Quy trình tương tác thực tế:**
   * Khi gặp câu hỏi cần tính toán hoặc tra cứu, LLM sinh ra token dạng:
     `{"name": "get_stock_price", "arguments": {"symbol": "AAPL"}}`
   * Lớp ứng dụng bao quanh (Application Layer / Agent Harness) bắt lấy cấu trúc JSON này, xác thực schema, thực thi hàm Python thực tế, và đưa kết quả trả về (`{"price": 225.5}`) vào lượt hội thoại tiếp theo của LLM.

3. **Hệ quả kiến trúc:**
   * **Bảo mật:** Toàn bộ quyền kiểm soát, phân quyền và chốt chặn an toàn (Guardrails, Human Approval) nằm ở mã nguồn máy chủ của bạn, không phụ thuộc vào "sự tự giác" của LLM.
   * **Xử lý lỗi:** Khi tool gặp ngoại lệ (timeout, database error), ứng dụng phải bọc lỗi thành một thông điệp văn bản sạch sẽ để nạp lại cho LLM tự sửa sai (Self-Correction).

---

## Liên kết tri thức

* Khung phương pháp luận: [[Day 04 - Prompt Engineering và Tool Calling]]
* Khái niệm liên quan: [[Tool Calling]], [[Model Context Protocol]], [[Multi-Agent Architecture]]
