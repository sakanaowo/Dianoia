---
type: atomic
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - atomic
  - rag
  - lost-in-the-middle
  - context-engineering
  - prompt-engineering
created: 2026-09-20
updated: 2026-09-20
---

# Document reordering khắc phục hiện tượng lost in the middle bằng cách xếp chunk quan trọng ở hai đầu

## Mệnh đề cốt lõi

Do cơ chế phân bổ chú ý (Attention distribution) của mô hình ngôn ngữ lớn tuân theo đường cong hình chữ U — ghi nhớ xuất sắc ở đầu prompt (hiệu ứng Primacy) và cuối prompt (hiệu ứng Recency) nhưng bỏ quên thông tin ở vùng giữa — kỹ thuật **Document Reordering** chủ động sắp xếp chunk quan trọng nhất lên đầu và chunk quan trọng nhì xuống cuối để tối đa hóa khả năng trích xuất thông tin chính xác của LLM.

---

## Bối cảnh và Phân tích kỹ thuật

1. **Hiện tượng "Lost in the Middle":**
   * Các nghiên cứu của Liu et al. (Stanford, 2023) đã chứng minh rằng khi đưa nhiều đoạn văn bản vào Context Window dài, hiệu suất truy hồi thông tin (*recall performance*) của các mô hình LLM hàng đầu sụt giảm nghiêm trọng khi thông tin đúng nằm ở vùng giữa (khoảng 30% đến 70% vị trí trong prompt).
   * Nếu các chunk tài liệu sau khi retrieve được đưa vào prompt theo thứ tự giảm dần ngẫu nhiên hoặc xếp nối tiếp tự nhiên, những chunk mấu chốt dễ bị trôi vào "vùng mù" ở giữa và bị mô hình bỏ qua.

2. **Thuật toán sắp xếp Document Reordering:**
   * Cho danh sách Top-$K$ chunks đã được xếp hạng theo mức độ liên quan: $D = [d_1, d_2, d_3, \dots, d_K]$ với $d_1$ là chunk có điểm số cao nhất.
   * Xếp đặt lại vị trí trong prompt theo chiến lược:
     * $d_1$ (Top 1) $\rightarrow$ Đặt tại vị trí đầu tiên của khối context.
     * $d_2$ (Top 2) $\rightarrow$ Đặt tại vị trí cuối cùng của khối context (sát câu hỏi người dùng).
     * $d_3, d_4, \dots$ $\rightarrow$ Xếp xen kẽ dồn dần vào vùng giữa prompt.

3. **Cấu trúc bao bọc bằng Delimiters:**
   * Kết hợp kỹ thuật Reordering với việc đánh số thứ tự tài liệu rõ ràng `[1]`, `[2]` và bao bọc bằng các thẻ XML `<context>` để định vị ranh giới tường minh, ngăn chặn việc mô hình bị nhầm lẫn giữa các khối thông tin.

---

## Giả định và Giới hạn

* Kỹ thuật này phát huy hiệu quả mạnh mẽ nhất khi số lượng chunk nạp vào context tương đối lớn ($K \ge 5$) hoặc context window dài ($>4000$ tokens).
* Với các câu hỏi đơn giản chỉ cần 1–2 chunk tài liệu ngắn, hiện tượng Lost in the Middle không tác động rõ rệt.

---

## Liên kết tri thức

* Hệ thống kiến trúc: [[Day 08 - Advanced RAG Pipeline và Đánh giá Thực nghiệm]]
* Khái niệm liên quan: [[Context Engineering]], [[Context Injection]], [[System Prompt Contract]]
