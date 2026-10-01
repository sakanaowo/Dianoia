---
type: atomic
status: growing
domains:
  - "[[Computing]]"
  - "[[Programming]]"
tags:
  - atomic
  - multi-agent
  - observability
  - debugging
  - distributed-systems
created: 2026-09-24
updated: 2026-09-24
---

# Trace log có cấu trúc là điều kiện tiên quyết để định vị lỗi trong hệ multi-agent

## Mệnh đề cốt lõi

Trong một hệ thống Multi-Agent, việc gỡ lỗi bằng câu lệnh in văn bản tự do (`print()`) là bất khả thi vì lỗi ở đầu ra cuối cùng thường là kết quả của sự suy thoái dây chuyền qua nhiều trạm trung gian; **một bản ghi vết (Trace Log) có cấu trúc, bất biến và phản ánh chân thực đường đi của các quyết định là điều kiện tiên quyết duy nhất để khoanh vùng và sửa chữa lỗi một cách có hệ thống**.

---

## Bối cảnh và Phân tích Kỹ thuật

1. **Bản chất phân tán của lỗi trong Multi-Agent:**
   * Khi người dùng nhận được một câu trả lời sai lệch, sự cố có thể phát sinh từ:
     * Supervisor định tuyến sai Worker.
     * Worker nhận thiếu context từ State.
     * Tool bên thứ ba trả về kết quả rỗng hoặc timeout.
     * Synthesis Worker tự ý bịa đặt khi thiếu bằng chứng.
   * Nếu không có trace log ghi lại chi tiết trạng thái ở từng chặng, kỹ sư sẽ hoàn toàn mò mẫm trong một "hộp đen xác suất".

2. **Cấu trúc thiết yếu của một Trace Log:**
   * Mỗi entry trong log trace bắt buộc phải chứa các trường dữ liệu chuẩn hóa:
     * `timestamp`: Mốc thời gian thực thi chính xác.
     * `agent_id`: Định danh tác tử đang thực hiện.
     * `action`: Loại hành vi (`route`, `call_tool`, `synthesize`, `error`).
     * `input_summary`: Tóm tắt dữ liệu đầu vào nhận được (tránh log toàn bộ context khổng lồ).
     * `output_summary`: Kết quả trả về cụ thể (kèm `result_count`, `confidence_score`).
     * `status`: Trạng thái thực thi (`ok`, `warn`, `error`).
     * `latency_ms`: Thời gian xử lý của bước đó.

3. **Cảnh báo về Bẫy "Lỗi Im Lặng" (Silent Failure):**
   * Trong nhiều hệ thống, một worker chạy truy vấn trả về 0 kết quả nhưng vẫn ghi `status: ok` đơn giản vì mã nguồn không bị crash hay văng exception.
   * Supervisor đọc thấy `ok` nên tiếp tục đẩy sang Worker sinh lời, dẫn đến hallucination.
   * **Nguyên tắc kỹ thuật:** Trạng thái `ok` kỹ thuật không đồng nghĩa với dữ liệu sử dụng được. Khi kết quả rỗng hoặc chất lượng bằng chứng dưới ngưỡng, trace log bắt buộc phải ghi nhận `warn` để kích hoạt fallback kịp thời.

---

## Giả định và Giới hạn

* Trace log chi tiết có thể làm tăng dung lượng lưu trữ và độ trễ ghi dữ liệu nếu không áp dụng kỹ thuật tóm tắt nội dung (*summary payload*) và thiết lập chiến lược xoay vòng log (*log rotation*) hợp lý.

---

## Liên kết tri thức

* Khung phương pháp luận: [[Day 09 - Multi-Agent Systems và Kiến trúc Điều phối]]
* Khái niệm liên quan: [[Multi-Agent Architecture]], [[Data Observability]]
* Mệnh đề liên quan: [[Supervisor điều phối trạng thái thay vì trực tiếp thực thi tác vụ miền]]
