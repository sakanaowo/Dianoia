---
type: concept
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - concept
  - multi-agent
  - architecture
  - system-design
  - llm
created: 2026-09-24
updated: 2026-09-24
---

# Multi-Agent Architecture

## Định nghĩa

**Multi-Agent Architecture (Kiến trúc Đa Tác Tử)** là mô hình thiết kế hệ thống phần mềm trí tuệ nhân tạo, trong đó bài toán tổng thể được phân rã thành nhiều tác tử (Agents) chuyên biệt, mỗi tác tử đảm nhận một vai trò độc lập, sở hữu không gian ngữ cảnh (context) cô lập và bộ công cụ (tools) tối thiểu, phối hợp với nhau thông qua đồ thị điều phối (Orchestration Graph) hoặc giao thức truyền thông điệp có kiểm soát.

---

## Bốn Pattern Điều Phối Cốt Lõi

1. **Supervisor-Worker Pattern:**
   * Một Supervisor trung tâm tiếp nhận yêu cầu, phân tích intent, lập kế hoạch, định tuyến tới các Worker chuyên môn và tổng hợp câu trả lời cuối cùng.
   * Thích hợp cho hệ thống trợ lý đa năng cần xử lý linh hoạt nhiều miền nghiệp vụ.
2. **Pipeline Pattern:**
   * Dữ liệu chảy tuần tự một chiều qua các Worker: `Input -> Parser -> Research -> Writer -> Review -> Output`.
   * Tối ưu cho quy trình nghiệp vụ cố định, xử lý hồ sơ và xuất bản nội dung.
3. **Debate Pattern:**
   * Nhiều Agent mang góc nhìn đối lập cùng phân tích vấn đề, tranh biện và phản biện chéo nhau trước khi một Aggregator Agent ra quyết định.
   * Giảm thiểu thiên kiến và ảo giác, phù hợp cho thẩm định rủi ro và rà soát hợp đồng.
4. **Hierarchical Pattern:**
   * Phân cấp cây nhiều tầng quản lý (Top Manager -> Sub-Managers -> Task Workers).
   * Phù hợp cho mô phỏng tổ chức doanh nghiệp quy mô lớn.

---

## Nguyên Tắc Thiết Kế Kỹ Thuật

* **Bài trừ God Agent:** Tránh dồn toàn bộ logic vào một Agent duy nhất; phân tách thành các Worker đơn nhiệm (SRP).
* **Worker Phi Trạng Thái (Stateless):** Ưu tiên Worker nhận input và trả output mà không ngầm lưu biến trạng thái nội bộ, giúp dễ dàng kiểm thử và scale ngang.
* **Shared State & Immutable Trace:** Sử dụng State Schema có cấu trúc chặt chẽ; trace log bắt buộc phải append để bảo toàn lịch sử quyết định.
* **Đặc Quyền Tối Thiểu (Least Privilege):** Worker tra cứu chỉ có quyền đọc; chỉ cấp quyền thực thi có side-effect khi thực sự cần thiết.

---

## Mệnh đề tri thức liên quan

* [[Day 09 - Multi-Agent Systems và Kiến trúc Điều phối]]
* [[Supervisor điều phối trạng thái thay vì trực tiếp thực thi tác vụ miền]]
* [[Trace log có cấu trúc là điều kiện tiên quyết để định vị lỗi trong hệ multi-agent]]
* [[Model Context Protocol]]
* [[LangGraph]]
