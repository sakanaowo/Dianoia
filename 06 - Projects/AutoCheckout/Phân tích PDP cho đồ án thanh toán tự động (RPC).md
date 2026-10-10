---
type: project
status: active
domains:
  - "[[Computing]]"
tags:
  - project
  - autocheckout
  - continual-learning
  - retail-ai
created: 2026-09-27
updated: 2026-10-02
aliases:
  - Phân tích PDP cho đồ án thanh toán tự động (RPC)
  - Phân tích PDP trên RPC
---

# Phân tích PDP cho đồ án thanh toán tự động (RPC)

Tác giả: An | Thời gian: 2026-09-27

Phương pháp PDP (*Beyond Prompt Degradation: Prototype-guided Dual-pool Prompting for Incremental Object Detection*, CVPR 2026) hoàn toàn khả thi để áp dụng cho bài toán thanh toán tự động [[06 - Projects/AutoCheckout/README|AutoCheckout-CL]], nhưng cần hiệu chỉnh 3 điểm trọng yếu: đánh giá trực tiếp trên 24.000 ảnh checkout thật của tập dữ liệu RPC (thay vì chỉ test trên ảnh ghép); bổ sung bước thích nghi miền (First Session Adaptation - FSA) ở task khởi đầu; và sửa đổi mã nguồn gốc vốn bị hard-code giới hạn 80 lớp COCO.

---

## 1. Cơ chế Hoạt động của PDP

PDP là phương pháp Incremental Object Detection (IOD) không lưu lại ảnh cũ (*Replay-Free*): mô hình phát hiện vật thể học thêm lớp mới qua từng task mà không cần lưu trữ dữ liệu cũ. Mô hình xây dựng trên nền tảng MD-DETR (ECCV 2024), sử dụng kiến trúc Deformable DETR pretrained, đóng băng hoàn toàn Backbone, Transformer Encoder, Decoder, và chỉ cập nhật các vector Prompt cùng đầu phân loại.

- **Decoupled Dual-Pool Prompting (DDP):** Bể Prompt dùng chung (*Shared Pool* gồm 100 prompts, học xuyên suốt mọi task) giữ tri thức thị giác khái quát. Bể Prompt riêng (*Private Pool*, mỗi lớp mới được cấp 1 prompt và đóng băng vĩnh viễn sau task đó) lưu giữ đặc trưng phân biệt riêng biệt. Prompt được tổng hợp theo độ tương đồng Cosine với Query của ảnh, sau đó chèn làm tiền tố (*Prefix*) vào Self-Attention của 6 tầng Decoder, nhờ đó quá trình suy luận hoàn toàn độc lập với Task ID.
- **Prototypical Pseudo-Label Generation (PPG):** Ở task $t$, các vật thể thuộc lớp cũ xuất hiện trong ảnh không có nhãn giám sát. Mô hình Teacher $\Phi_{t-1}$ (mô hình đã học xong ở task $t-1$) sẽ đề xuất hộp bao [[Bounding Box]]: điểm tin cậy $> 0.5$ được nhận trực tiếp; điểm từ $0.2$ đến $0.5$ chỉ được chấp nhận nếu độ tương đồng Cosine với Prototype của lớp đó $\ge 0.5$. Prototype là vector trung bình của các embedding query thuộc lớp đó, được tính ở epoch cuối cùng của task.
- **Directional Decoupled Loss ($L_{\text{DDL}}$):** Đẩy hai bể prompt về hướng trực giao (ngưỡng góc $\ge 90^\circ$, hệ số $\lambda = 0.15$).

**Kết quả trong Paper gốc (mAP@50):** Trên MS-COCO 4 tasks đạt 59.4 mAP@A ở task cuối, vượt trội MD-DETR 9.2 điểm. Trên Pascal VOC (các cấu hình 10+10, 15+5, 19+1) đạt lần lượt 78.7, 78.0, 79.4 mAP. Trong phân tích thành phần (*Ablation*), PPG đóng góp lớn nhất (+13.9 mAP@P ở task 4), trong khi $L_{\text{DDL}}$ đóng góp +0.4 mAP@A.

**Ba giả định ngầm của paper ảnh hưởng trực tiếp tới đề tài bán lẻ:**
1. Detector gốc là Deformable DETR đã được huấn luyện sẵn trên đủ 80 lớp COCO rồi mới đóng băng. Trên benchmark COCO, phần tham số đóng băng đã từng quan sát trước toàn bộ các lớp tương lai; trên RPC không có lợi thế tiên nghiệm này.
2. PPG chỉ phát huy tác dụng khi ảnh của task mới có chứa vật thể lớp cũ nhưng không được gán nhãn (theo đúng giao thức COCO/VOC).
3. Paper chỉ thử nghiệm trên 20–80 lớp vật thể thông thường có độ cách biệt ngữ nghĩa lớn, chưa từng kiểm chứng trên các lớp phân loại siêu chi tiết (*fine-grained*) như 200 SKU của RPC.

---

## 2. Phân tích Mã nguồn PDP_IOD

Kho mã nguồn gốc [zyt95579/PDP_IOD](https://github.com/zyt95579/PDP_IOD) là bản mở rộng trên code MD-DETR: bổ sung hai bể prompt (`models/prompt.py`) và module PPG (`engine.py`). Nền tảng là Deformable DETR từ thư viện HuggingFace Transformers (phiên bản 4.37.2) kết hợp PyTorch Lightning (2.1.3). Dữ liệu được nạp theo định dạng COCO JSON cho từng task.

Các thành phần có thể tái sử dụng: module Prompt, logic PPG và bộ nhớ Prototype (được lưu trực tiếp trong checkpoint), vòng lặp huấn luyện Lightning, và bộ đo chỉ số [[Mean Average Precision (mAP)|mAP@P / mAP@C / mAP@A]]. Do tập dữ liệu RPC vốn sử dụng định dạng COCO Annotation, ta chỉ cần xây dựng hàm chia task và sinh các file JSON tương ứng.

Bảng tổng hợp các vấn đề kỹ thuật phát hiện trong mã nguồn gốc:

| STT | Vấn đề phát hiện | Vị trí trong Code | Ảnh hưởng tới đề tài | Giải pháp xử lý |
| :---: | :--- | :--- | :--- | :--- |
| 1 | Hard-code 80 lớp COCO trong pool riêng | `models/prompt.py` (`total_classes = 80`, `private_size = 80`) | Thử với 200 lớp: task đầu > 80 lớp sẽ crash; chia 4x25 thì task 3–4 nhận 0 prompt riêng mà không báo lỗi | Đặt `private_size = sum(task_num_classes)`, `pool_sizes = task_num_classes` |
| 2 | Chia task hard-code cấu hình COCO 40+20+20 | `datasets/create_coco_instance.py`; `main.py` luôn gọi `task_info_coco` | Không thể nạp dữ liệu RPC | Viết `task_info_rpc` và script sinh `train_task_t.json`, `test_task_*.json` |
| 3 | `run.sh` bắt đầu từ task 2, nạp checkpoint Task 1 có sẵn trên máy tác giả | `run.sh` (`start_task=2`) | Repo không kèm checkpoint, bắt buộc phải tự train Task 1 | Cấu hình chạy với `start_task=1` |
| 4 | Hàm mất mát $L_{\text{DDL}}$ bị tắt ngầm | `use_ddl_loss = False`, `ortho_mu = 0`; decoder bỏ qua loss trả về | Code thực thi khác với mô tả trong paper | Bật lại cờ kích hoạt và cộng loss vào tổng hàm mất mát |
| 5 | Teacher chạy không có prompt | `engine.py` dòng 304: gọi `old_model(...)` không truyền `query` | Teacher yếu hơn $\Phi_{t-1}$ trong lý thuyết; prototype so sánh không đồng nhất | Cho Teacher chạy 2 lượt: lấy query rồi forward có prompt |
| 6 | Lệch 1 chỉ số khi lọc nhãn giả | `engine.py` dòng 210: `labels_tensor <= PREV_INTRODUCED_CLS` | Lớp mới đầu tiên có thể bị gán nhầm nhãn từ Teacher | Đổi toán tử điều kiện thành `<` |
| 7 | Đóng băng backbone, encoder, decoder ngay từ task 1 | `run.sh` (`freeze='backbone,encoder,decoder'`) | Đặc trưng COCO không đủ sức phân biệt 200 SKU bán lẻ giống nhau | Bổ sung bước thích nghi miền (FSA) ở Task 1 |
| 8 | Bộ phân loại cấp phát cố định `n_classes` | `main.py`, `engine.py` | Bắt buộc phải biết trước số lượng lớp tối đa | Cấp phát dư slot (ví dụ 256 slot cho 200 SKU) |
| 9 | Hard-code đường dẫn tuyệt đối và tên file checkpoint | `run.sh`, `engine.py`, `main.py` | Thay đổi số epoch làm nạp sai file checkpoint | Chuyển đổi toàn bộ thành tham số dòng lệnh |
| 10 | Thiếu thư viện và đường dẫn CUDA kernel bị lỗi | `requirement.txt`, `models/load_custom.py` | Deformable Attention rơi về bản chạy PyTorch thuần rất chậm | Cài đặt PyTorch chuẩn CUDA; tích hợp kernel C++/CUDA từ Deformable DETR gốc |

Mô hình hoàn chỉnh có 66.4 triệu tham số; với cấu hình đóng băng tiêu chuẩn, 32.3 triệu tham số vẫn được cập nhật tại mỗi task (chiếm nhiều nhất là `query_tf` với 23 triệu tham số, Shared Pool 1.84 triệu, mỗi lớp mới bổ sung 18.432 tham số prompt tương đương ~74 KB). Khi suy luận mô hình cần 2 lượt forward, khi huấn luyện cần 3 lượt forward (tính thêm Teacher).

---

## 3. Khảo sát Độ tương thích của PDP với Đề tài

PDP đáp ứng trọn vẹn phần lõi của bài toán thanh toán tự động: bổ sung sản phẩm mới liên tục, không lưu trữ ảnh cũ, và phát hiện đồng thời nhiều vật thể trên cùng một khay hàng. Hai điểm paper chưa kiểm chứng là nhận diện SKU siêu chi tiết (*fine-grained*) và huấn luyện bằng dữ liệu tổng hợp cắt-ghép.

| Yêu cầu của đề tài | Mức độ đáp ứng của PDP | Ghi chú kỹ thuật |
| :--- | :---: | :--- |
| Thêm sản phẩm mới, không train lại từ đầu | Hoàn toàn đáp ứng | Đóng băng Backbone, Encoder, Decoder; mỗi task chỉ cập nhật prompt và đầu phân loại trên dữ liệu mới |
| Không lưu lại hình ảnh sản phẩm cũ | Hoàn toàn đáp ứng | Mỗi lớp chỉ lưu ~74 KB prompt và tối đa 100 vector prototype (~100 KB); tiết kiệm hàng gigabyte so với lưu ảnh gốc |
| Nhiều sản phẩm xuất hiện trên khay | Hoàn toàn đáp ứng | 300 Object Queries; ảnh khay RPC có trung bình 12.3 vật thể, tối đa khoảng 20 vật thể |
| Không cần biết sản phẩm thuộc đợt nhập nào | Hoàn toàn đáp ứng | Cơ chế Task-agnostic Retrieval dựa trên độ tương đồng Cosine tự động chọn prompt |
| Phân biệt 200 SKU rất giống nhau (cùng hãng, khác vị) | Chưa kiểm chứng (Rủi ro cao) | Decoder pretrained COCO bị đóng băng; cần bước thích nghi miền FSA ở Task 1 |
| Huấn luyện bằng dữ liệu cắt-ghép | Cần điều chỉnh giao thức | Nếu ảnh ghép chỉ có sản phẩm mới thì PPG không phát huy tác dụng; cần ghép lẫn sản phẩm cũ |
| Đếm chính xác số lượng từng món để tính tiền | Cần mở rộng đo lường | Bổ sung cơ chế hậu xử lý 1 nhãn/query và đánh giá bằng độ chính xác hóa đơn (cAcc, ACD) |

---

## 4. Xử lý Dữ liệu Cắt–Ghép (Data Augmentation & Synthesis)

Kỹ thuật tách nền sản phẩm đơn chiếc rồi ghép lên khay hàng để huấn luyện là phương pháp có cơ sở vững chắc, từng được áp dụng trong baseline của RPC, IncreACO và DPNet. Tuy nhiên, **tuyệt đối không dùng ảnh ghép để đánh giá (test)**; tập RPC đã cung cấp sẵn 24.000 ảnh chụp khay hàng thực tế có nhãn bounding box, phản ánh chính xác điều kiện vận hành tại quầy thu ngân.

Bảng xếp hạng hiệu năng trên tập dữ liệu RPC (huấn luyện từ ảnh đơn, đánh giá trên ảnh khay thật):

| Phương pháp | Dữ liệu Huấn luyện | cAcc (%) | mAP@50 (%) |
| :--- | :--- | :---: | :---: |
| Baseline RPC: Syn | Chỉ ảnh cắt–ghép cơ bản | 9.27 | 80.66 |
| Baseline RPC: Render | Ảnh ghép qua CycleGAN | 45.60 | 95.50 |
| Baseline RPC: Syn+Render | Kết hợp cả hai dạng | 56.68 | 96.57 |
| DPNet | Syn+Render có chọn lọc | 80.51 | 97.91 |
| CommNet v2 | Protocol chuẩn ảnh đơn | 93.11 | 98.92 |

*Nhận xét:* Chỉ số Checkout Accuracy (cAcc) phản ánh tỷ lệ các khay hàng có số lượng của mọi SKU được đếm đúng 100%. Một mô hình đạt mAP@50 tới 80% vẫn có thể cho ra hóa đơn chính xác dưới 10%. Điều này khẳng định tầm quan trọng của việc thu hẹp khoảng cách miền giữa ảnh ghép và ảnh thật.

**Quy trình tạo ảnh ghép sát thực tế:**
1. **Nguồn ảnh:** Chỉ trích xuất từ 53.739 ảnh sản phẩm đơn chiếc (split train), tuyệt đối không lấy từ tập test. Ưu tiên các góc chụp từ trên xuống và góc xiên 30°–45°.
2. **Tách nền:** Sử dụng Segment Anything Model (SAM) hoặc BiRefNet với prompt là bounding box. Cần kiểm tra thủ công ngẫu nhiên để loại bỏ viền nền sót.
3. **Kích thước & Tỷ lệ:** Lấy kích thước bounding box trung vị của từng SKU trên tập val để chuẩn hóa tỷ lệ vật thể thật, áp dụng độ biến thiên nhẹ $\pm 10\%$.
4. **Bố cục:** Xoay ngẫu nhiên 0°–360°, đặt từ 3 đến 20 vật thể mỗi ảnh theo phân bố độ khó (easy, medium, hard), cho phép che khuất đè lên nhau từ 30% đến 50%.
5. **Môi trường & Ánh sáng:** Ghép trên nền ảnh mặt khay quầy hàng thực tế; bổ sung bóng đổ mờ, cân chỉnh nhiệt độ màu, nhiễu hạt nhẹ và nén JPEG để đồng bộ chất lượng ảnh camera.

**Các kịch bản dữ liệu huấn luyện cho từng Task:**

| Phương án | Thành phần ảnh huấn luyện ở Task $t$ | Ưu điểm | Nhược điểm |
| :--- | :--- | :--- | :--- |
| **A. Chỉ sản phẩm mới** | Toàn bộ là ảnh ghép từ các SKU mới của task | Đúng tinh thần Replay-Free tuyệt đối, dễ triển khai | PPG không có việc để làm; lớp mới dễ nhận nhầm sản phẩm cũ |
| **B. Giao thức IOD (Khuyên dùng)** | Ảnh ghép SKU mới kết hợp ảnh khay thật (chỉ giữ nhãn SKU mới) | Đúng giao thức của paper PDP; PPG phát huy tối đa hiệu quả | Cần giải thích kịch bản thực tế: nhân viên chỉ gán nhãn sản phẩm mới |
| **C. Replay đối chứng** | Ghép thêm một số ít crop ảnh đã lưu của SKU cũ (kèm nhãn) | Ngăn chặn hiện tượng quên thảm khốc tốt nhất | Không còn đạt chuẩn Replay-Free; chỉ đóng vai trò cận trên đối chứng |

---

## 5. Khó khăn Kỹ thuật & Hướng Giải quyết

| Lĩnh vực | Thách thức cụ thể | Mức độ | Hướng giải quyết đề xuất |
| :--- | :--- | :---: | :--- |
| **Mô hình** | Đặc trưng COCO đóng băng không đủ sức phân biệt 200 SKU giống nhau | Cao | **First Session Adaptation (FSA):** Huấn luyện toàn bộ Deformable DETR trên dữ liệu Task 1 trước, sau đó mới đóng băng và kích hoạt cơ chế PDP từ Task 2 |
| **Mô hình** | Lớp mới nhận nhầm sản phẩm cũ; hàm Sigmoid độc lập có thể dự đoán 2 nhãn trên cùng 1 query | Cao | Áp dụng hậu xử lý: mỗi query chỉ giữ lại nhãn có điểm tin cậy cao nhất; sử dụng phương án B để lớp mới học mẫu âm |
| **Mô hình** | 32 triệu tham số dùng chung vẫn cập nhật mỗi task có thể gây trôi kiến thức | Trung bình | Theo dõi sát chỉ số mAP@P sau từng task; thử nghiệm đóng băng `query_tf` sau Task 1 |
| **Đánh giá** | Ảnh test thật chứa sản phẩm chưa học; mô hình dự đoán lên chúng bị tính là False Positive | Cao | Loại bỏ các dự đoán trùng khớp ($\text{IoU} \ge 0.5$) với các sản phẩm chưa học trước khi tính mAP |
| **Đánh giá** | mAP không phản ánh đúng tỷ lệ hóa đơn chính xác | Trung bình | Tích hợp bộ công cụ đo chuyên dụng `rpctool`: đo cAcc, ACD, mCCD, mCIoU; bổ sung đo thời gian cập nhật và dung lượng lưu trữ |
| **Dự phòng** | PDP không đạt độ chính xác kỳ vọng trên 200 SKU bán lẻ | Cao | Chuẩn bị phương án dự phòng: Mô hình phát hiện vật thể phi lớp (*Class-agnostic Detector*) kết hợp Backbone trích xuất đặc trưng DINOv2 và so khớp Prototype |

---

## 6. Thiết kế Thí nghiệm Chuẩn trên Tập dữ liệu RPC

- **Cấu hình phân chia Task:** Task 1 học 100 SKU đầu tiên; 4 task tiếp theo mỗi task học 25 SKU mới ($100 + 4 \times 25$).
- **Dữ liệu huấn luyện:** Áp dụng Phương án B (ảnh ghép SKU mới kết hợp ảnh khay thật chỉ gắn nhãn SKU mới).
- **Dữ liệu đánh giá:** 24.000 ảnh khay chụp thật. Sau mỗi task tính toán bộ 3 chỉ số mAP@P, mAP@C, mAP@A; sau task cuối cùng tính toán đầy đủ cAcc và ACD.
- **Hệ thống Baselines so sánh:**
  1. *Joint Training:* Huấn luyện cùng lúc toàn bộ 200 SKU (Cận trên lý thuyết).
  2. *Sequential Fine-tuning:* Huấn luyện tuần tự không dùng cơ chế chống quên (Cận dưới).
  3. *MD-DETR:* Mô hình Single-pool tiền thân của PDP.
  4. *PDP (Bản cải tiến sửa lỗi F1–F12).*
  5. *DINOv2 Feature Retrieval Baseline.*

---

## 7. Tài liệu & Nguồn Tham khảo

- Paper gốc: *Beyond Prompt Degradation: Prototype-guided Dual-pool Prompting for Incremental Object Detection*, CVPR 2026.
- [Mã nguồn chính thức zyt95579/PDP_IOD](https://github.com/zyt95579/PDP_IOD)
- [Mã nguồn nền tảng MD-DETR](https://github.com/GauravBh1010tt/MD-DETR)
- [Tập dữ liệu RPC: A Large-Scale Retail Product Checkout Dataset](https://rpc-dataset.github.io/)
- [Công cụ đánh giá bán lẻ rpctool](https://github.com/DIYer22/retail_product_checkout_tools)
- [Nghiên cứu First Session Adaptation (ICCV 2023)](https://arxiv.org/abs/2303.13199)
- Bản đồ liên kết trong Vault:
  - [[06 - Projects/AutoCheckout/README|AutoCheckout-CL]]
  - [[06 - Projects/AutoCheckout/overview|Tổng quan Dự án AutoCheckout]]
  - [[04 - Notes/Concepts/Computer Vision/Detection Transformer (DETR)|Detection Transformer (DETR)]]
  - [[04 - Notes/Concepts/Computer Vision/Hungarian Matching|Hungarian Matching]]
  - [[04 - Notes/Concepts/Computer Vision/Mean Average Precision (mAP)|Mean Average Precision (mAP)]]
