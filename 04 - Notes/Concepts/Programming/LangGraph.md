---
type: concept
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - concept
  - langgraph
  - orchestration
  - multi-agent
  - state-graph
created: 2026-09-24
updated: 2026-09-24
---

# LangGraph

## Định nghĩa

**LangGraph** là một thư viện điều phối luồng thực thi (Orchestration Framework) của hệ sinh thái LangChain, cho phép mô hình hóa các hệ thống tác tử phức tạp (Agentic and Multi-Agent Systems) dưới dạng một **đồ thị trạng thái tuần hoàn (Cyclic State Graph)**, chuyển dịch logic định tuyến từ các câu lệnh prompt mơ hồ sang mã nguồn Python tường minh và có thể kiểm thử.

---

## Ba Thành Phần Cốt Lõi

1. **Node (Nút thực thi):**
   * Là một hàm Python nhận vào `State` hiện tại và trả về bản cập nhật trạng thái mới (`dict` hoặc Pydantic model).
   * Mỗi Node đại diện cho một tác tử (Agent), một công cụ (Tool), hoặc một bước kiểm duyệt của con người (Human Review).
2. **Edge (Cạnh kết nối):**
   * Xác định luồng chuyển tiếp giữa các Node.
   * *Unconditional Edge:* Luôn di chuyển từ Node A sang Node B.
   * *Conditional Edge:* Hàm router nhận `State` và trả về tên Node tiếp theo dựa trên logic nghiệp vụ (ví dụ: route tới worker hoặc kết thúc).
3. **State (Trạng thái trung tâm):**
   * Cấu trúc dữ liệu TypedDict hoặc Pydantic được truyền qua từng Node, đóng vai trò "bộ nhớ" chia sẻ của cả đồ thị.

---

## Năng Lực Nâng Cao

* **Persistence & Checkpointing:** Tự động lưu trạng thái đồ thị xuống cơ sở dữ liệu sau mỗi bước chạy, cho phép khôi phục phiên làm việc và thực hiện *Time Travel* (quay ngược lại các bước trước).
* **Human-in-the-Loop (HITL):** Cơ chế ngắt (`interrupt`) cho phép tạm dừng đồ thị tại các tác vụ có rủi ro cao (chuyển tiền, xóa dữ liệu) để chờ con người phê duyệt trước khi tiếp tục chạy.

---

## Mệnh đề tri thức liên quan

* [[Day 09 - Multi-Agent Systems và Kiến trúc Điều phối]]
* [[Multi-Agent Architecture]]
* [[Supervisor điều phối trạng thái thay vì trực tiếp thực thi tác vụ miền]]
* [[Trace log có cấu trúc là điều kiện tiên quyết để định vị lỗi trong hệ multi-agent]]
