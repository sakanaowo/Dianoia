---
type: concept
status: growing
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - concept
  - mcp
  - model-context-protocol
  - integration
  - tool-calling
created: 2026-09-24
updated: 2026-09-24
---

# Model Context Protocol

## Định nghĩa

**Model Context Protocol (MCP)** là một chuẩn giao tiếp công nghiệp mở (open standard) do Anthropic khởi xướng, đóng vai trò như một giao diện kết nối tiêu chuẩn ("cổng cắm USB-C") giữa các ứng dụng trí tuệ nhân tạo (Host/Client) và các nguồn dữ liệu, tài nguyên nghiệp vụ cũng như công cụ thực thi (Server).

---

## Kiến Trúc Ba Thành Phần

1. **MCP Host:** Ứng dụng điều phối tổng thể (ví dụ: Claude Desktop, Antigravity, backend hệ thống AI doanh nghiệp).
2. **MCP Client:** Thành phần bên trong Host, duy trì kênh kết nối 1:1 an toàn với từng Server qua giao thức STDIO hoặc SSE (Server-Sent Events) / HTTP.
3. **MCP Server:** Tiến trình độc lập (standalone process) cung cấp các năng lực thông qua 3 thành phần cốt lõi (*Primitives*):
   * **Tools:** Các hàm có thể thực thi mang lại tác dụng phụ (side-effects), được mô tả bằng JSON Schema (ví dụ: `query_database`, `send_slack_message`).
   * **Resources:** Dữ liệu ngữ cảnh ở dạng tài liệu, file log hoặc sơ đồ mà LLM có thể đọc trực tiếp (tương tự endpoint GET).
   * **Prompts:** Các mẫu hướng dẫn nghiệp vụ chuẩn hóa được lưu trữ phía server giúp kích hoạt luồng xử lý định sẵn.

---

## Cơ Chế Khám Phá Công Cụ (Tool Discovery)

* Khác với việc nhúng cứng schema vào prompt, MCP cho phép Client truy vấn danh sách công cụ tại runtime thông qua lệnh gọi JSON-RPC `tools/list`.
* Sau khi LLM phân tích yêu cầu và xuất tham số gọi hàm, Host gửi lệnh `tools/call` đến Server để thực thi mã nguồn thực tế và nhận kết quả trả về.

---

## Lợi Ích Kiến Trúc

* **Tách rời tầng ứng dụng và công cụ:** Viết một MCP Server có thể tái sử dụng cho mọi client hỗ trợ MCP mà không cần viết lại adapter riêng.
* **Bảo mật và cô lập:** Server chạy trong tiến trình độc lập, dễ dàng kiểm soát quyền hạn truy cập tài nguyên.
* **Khả năng mở rộng runtime:** Hệ thống có thể bật/tắt hoặc bổ sung MCP Server mà không phải sửa đổi mã nguồn điều phối cốt lõi.

---

## Mệnh đề tri thức liên quan

* [[Day 09 - Multi-Agent Systems và Kiến trúc Điều phối]]
* [[Multi-Agent Architecture]]
* [[Tool Calling]]
