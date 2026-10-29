---
type: atomic
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - atomic
  - multi-agent
  - system-design
  - separation-of-concerns
created: 2026-09-24
updated: 2026-09-24
---

# Supervisor điều phối trạng thái thay vì trực tiếp thực thi tác vụ miền

## Mệnh đề cốt lõi

Trong kiến trúc Multi-Agent (đặc biệt là mô hình Supervisor-Worker), **Supervisor chỉ đảm nhiệm vai trò kiểm soát luồng quyết định (decision flow) và định tuyến trạng thái**, tuyệt đối không trực tiếp gọi các công cụ thực thi nặng nhọc hay tự giải quyết tác vụ miền; việc vi phạm nguyên tắc này biến Supervisor thành một "God Agent" ôm đồm và phá vỡ cấu trúc phân rã của hệ thống.

---

## Bối cảnh và Rủi ro của Phản Mô Thức "God Supervisor"

1. **Sự nhầm lẫn giữa Điều phối và Thực thi:**
   * Khi bắt đầu xây dựng hệ thống tác tử, lập trình viên thường vô thức nạp logic tìm kiếm cơ sở dữ liệu, phân tích văn bản hoặc gọi API vào chính hàm của Supervisor.
   * Hậu quả: Prompt của Supervisor bị phình to nhanh chóng, mất tính ổn định khi ra quyết định định tuyến, và các Worker bên dưới bị biến thành bù nhìn thừa thãi.

2. **Phân định trách nhiệm chuẩn hóa:**
   * **Supervisor:**
     * Nhận yêu cầu gốc và đọc trạng thái hệ thống (`State`).
     * Phân tích ý định và xác định Worker chuyên môn cần kích hoạt.
     * Kiểm tra điều kiện dừng: đã đủ bằng chứng để trả lời hay cần kích hoạt Human-in-the-Loop?
     * Tổng hợp câu trả lời cuối cùng từ kết quả của các Worker.
   * **Worker:**
     * Độc lập, phi trạng thái (stateless) và đơn nhiệm (Single Responsibility).
     * Chỉ tiếp nhận nhiệm vụ và context tối thiểu theo nguyên tắc *Need-to-Know*.
     * Sử dụng công cụ miền được cấp phép để trả về kết quả có cấu trúc.

3. **Lợi ích kiến trúc:**
   * **Tối ưu chi phí:** Supervisor có thể sử dụng mô hình ngôn ngữ nhỏ, phản hồi nhanh (như `gpt-4o-mini`, `gemini-1.5-flash`) vì nó chỉ cần phân loại intent và sinh JSON routing, dành mô hình lớn cho Worker thực sự cần lý luận sâu.
   * **Kiểm thử độc lập:** Cho phép viết unit test riêng biệt cho logic định tuyến của Supervisor mà không cần mock các API hay database phức tạp của Worker.

---

## Giả định và Giới hạn

* Đối với các bài toán cực kỳ đơn giản (dưới 2 bước suy luận và chỉ có 1 công cụ duy nhất), việc áp dụng mô hình Supervisor-Worker có thể tạo ra độ trễ thừa thãi và chi phí không cần thiết so với một Single-Agent tối giản.

---

## Liên kết tri thức

* Khung phương pháp luận: [[Day 09 - Multi-Agent Systems và Kiến trúc Điều phối]]
* Khái niệm liên quan: [[Multi-Agent Architecture]], [[Separation of concerns]], [[Single Responsibility Principle]]
