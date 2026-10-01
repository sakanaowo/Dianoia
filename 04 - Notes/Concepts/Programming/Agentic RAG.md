---
type: concept
status: growing
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - concept
  - rag
  - agentic-rag
  - autonomous-agents
  - reasoning-loops
created: 2026-09-20
updated: 2026-09-20
---

# Agentic RAG

## Định nghĩa

**Agentic RAG** là sự kết hợp giữa mô hình truy xuất tăng cường (RAG) và tác tử tự chủ (AI Agent), trong đó hệ thống không chỉ thực hiện một lượt tìm kiếm thụ động (*single-shot search*) mà được trang bị các **vòng lặp suy luận (Reasoning Loops)** và khả năng **sử dụng công cụ (Tool Use)** để tự quyết định chiến lược tìm kiếm, tự đánh giá chất lượng tài liệu thu thập được và tự điều chỉnh hành động để đạt kết quả tối ưu.

---

## 3 Mô hình Suy luận Cốt lõi

1. **Self-Query (Tự truy vấn & Phân rã):**
   * Agent tự động phân tích câu hỏi phức tạp thành các bài toán con, tự sinh các truy vấn tìm kiếm riêng biệt, gọi tìm kiếm nhiều lần và tổng hợp kết quả.
2. **Corrective RAG (C-RAG - RAG Tự Sửa Lỗi):**
   * Sau khi tài liệu được truy xuất, Agent tự đánh giá chất lượng và độ liên quan của các chunk.
   * Nếu tài liệu đạt yêu cầu $\rightarrow$ Tiến hành sinh câu trả lời.
   * Nếu tài liệu bị nhiễu hoặc thiếu thông tin $\rightarrow$ Chủ động kích hoạt tìm kiếm Web bên ngoài hoặc mở rộng phạm vi truy vấn.
3. **Adaptive RAG (RAG Thích ứng):**
   * Agent tự phân loại độ phức tạp của câu hỏi để lựa chọn chiến lược phù hợp nhất:
     * Câu hỏi đơn giản: Trả lời trực tiếp không cần truy xuất.
     * Câu hỏi tra cứu chuẩn: Chạy Hybrid Search cơ bản.
     * Câu hỏi đa bước: Kích hoạt chu trình phân rã và tìm kiếm đa nguồn.

---

## Mở rộng Hệ sinh thái Công cụ (Tool Use)

Không chỉ giới hạn trong Vector Store, Agentic RAG kết nối mô hình với:
* **Structured Database:** Sử dụng Text-to-SQL để truy vấn dữ liệu giao dịch tài chính, nhân sự, đơn hàng.
* **External APIs:** Kết nối JIRA, CRM, cổng dịch vụ để tra cứu trạng thái và tự động tạo phiếu hỗ trợ.
* **Code Interpreter / Calculator:** Thực thi các phép tính số học phức tạp và phân tích dữ liệu.

---

## Mệnh đề tri thức liên quan

* [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]]
* [[Tool Calling trong Hệ thống Agent]]
* [[Modular RAG]]
* [[Context Engineering]]
