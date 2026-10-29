---
type: concept
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - concept
  - tool-calling
  - function-calling
  - agent
  - llm
created: 2026-09-24
updated: 2026-09-24
aliases:
  - Tool Calling trong Hệ thống Agent
  - Function Calling
  - Tool Calling
---

# Tool Calling

## Định nghĩa

**Tool Calling (Gọi Công Cụ / Function Calling)** là cơ chế kỹ thuật cho phép mô hình ngôn ngữ lớn (LLM) phát hiện khi nào cần sử dụng công cụ bên ngoài, tạo ra payload JSON chứa tên hàm và các tham số phù hợp với định dạng đặc tả (Schema), sau đó tạm dừng để hệ thống máy chủ thực thi mã nguồn thực tế và trả kết quả ngược lại cho mô hình tiếp tục suy luận.

---

## Chu Trình Kỹ Thuật Bốn Bước

1. **Khởi tạo và Định nghĩa Schema:** Ứng dụng cung cấp danh sách công cụ kèm JSON Schema mô tả chi tiết tên, chức năng và kiểu dữ liệu tham số vào System Prompt hoặc API payload của LLM.
2. **LLM Quyết định và Sinh Payload:** Khi nhận câu hỏi của người dùng, LLM phân tích và nhận định cần gọi công cụ nào; nó sinh ra một chuỗi JSON hợp lệ chứa các tham số được trích xuất.
3. **Thực thi Mã Nguồn Phía Server:** Ứng dụng AI chặn payload JSON, giải mã, gọi hàm Python/API thực tế và nhận kết quả trả về (*observation*). Lưu ý: Bản thân mô hình LLM không tự chạy code.
4. **Tổng hợp Kết Quả (Synthesis):** Ứng dụng nạp kết quả quan sát trở lại context window của LLM để mô hình sinh ra câu trả lời tự nhiên có căn cứ cho người dùng.

---

## Bốn Nguyên Tắc Thiết Kế Tool Vàng

* **Single Responsibility (Đơn nhiệm):** Mỗi tool chỉ thực hiện một tác vụ nghiệp vụ duy nhất và rõ ràng.
* **Idempotency (Tính bất biến):** Các thao tác đọc hoặc gọi lặp lại không làm biến đổi trạng thái hệ thống.
* **Granularity Hợp Lý:** Thiết kế tool quanh hành động nghiệp vụ hoàn chỉnh thay vì chia nhỏ thành quá nhiều micro-tools gây rối cho việc định tuyến.
* **Test Độc Lập:** Mọi tool phải có unit test kiểm thử độc lập các trường hợp biên và xử lý ngoại lệ mượt mà.

---

## Mệnh đề tri thức liên quan

* [[Day 04 - Prompt Engineering và Tool Calling]]
* [[Day 09 - Multi-Agent Systems và Kiến trúc Điều phối]]
* [[Model Context Protocol]]
* [[Multi-Agent Architecture]]
* [[Mô hình LLM không tự chạy code trong chu trình Tool Calling]]
