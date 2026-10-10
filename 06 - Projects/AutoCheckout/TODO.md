---
type: project
status: active
domains:
  - "[[Computing]]"
tags:
  - project
  - autocheckout
  - todo
  - action-items
  - continual-learning
created: 2026-10-01
updated: 2026-10-05
aliases:
  - Kế hoạch Nghiên cứu & Action Items — AutoCheckout-CL
  - AutoCheckout TODO
---

# Kế hoạch Nghiên cứu & Action Items — AutoCheckout-CL

Tài liệu quản lý danh mục nhiệm vụ nghiên cứu, phân tích rào cản kỹ thuật cốt lõi (blockers), kiến trúc giải pháp và hướng triển khai chi tiết cho nhánh nghiên cứu độc lập thuộc dự án [[06 - Projects/AutoCheckout/README|AutoCheckout-CL]].

Nhánh nghiên cứu này tiếp cận bài toán phát hiện vật thể tăng dần không lưu trữ mẫu cũ (Replay-Free Class-Incremental Object Detection) trên tập dữ liệu bán lẻ quy mô lớn RPC (Retail Product Checkout, 200 SKU) bằng nền tảng [[04 - Notes/Concepts/Computer Vision/Detection Transformer (DETR)|Deformable DETR]] và cơ chế Prompting kết hợp Prototype (PDP).

---

## 1. Trọng tâm Cải tiến Kiến trúc Mô hình (Model Architecture Improvements)

### 1.1 Đánh giá và Nâng cấp Backbone Thị giác (Chốt Lựa chọn Chính thức: ConvNeXt-V2-Base)

> [!IMPORTANT] Quyết định Thiết kế Kiến trúc Nhánh Độc lập
> **Chính thức lựa chọn `ConvNeXt-V2-Base` (`convnextv2_base.fcmae_ft_in22k_in1k`)** làm backbone thị giác tiêu chuẩn cho toàn bộ nhánh nghiên cứu độc lập. Mô hình sở hữu 89M tham số, cấu trúc tích chập 4 stages phân cấp tự nhiên kết nối trực tiếp với FPN của Deformable DETR, tích hợp chuẩn hóa GRN chống bão hòa kênh khi học tăng dần, và tối ưu hóa VRAM tốt nhất trên GPU RTX 4090.

#### Lý do Thay đổi Định hướng từ Nano/Tiny sang Base
- **Nguồn gốc đề xuất Nano/Tiny trước đây:** Do tác giả của repo cũ phải chạy trên môi trường máy ảo chia sẻ (Spot VM) với ngân sách hạn chế, cần thời gian lặp nhanh để sửa các lỗi logic (F1-F14).
- **Cơ sở cho Nhánh Nghiên cứu Độc lập với RTX 4090 (24GB VRAM):**
  - Tập dữ liệu RPC có 200 SKU hạt mịn (fine-grained), nhiều sản phẩm cùng thương hiệu có kích thước và hình dáng giống hệt nhau, chỉ khác biệt nhỏ ở màu tem hoặc dòng chữ hương vị.
  - Các backbone quy mô nhỏ (Nano ~15M, Tiny ~28M) có dung lượng biểu diễn (capacity) thấp, dễ bị bão hòa đặc trưng khi học liên tiếp qua 5 tasks.
  - Với phần cứng **RTX 4090 (24GB VRAM)**, việc triển khai các backbone quy mô **Base** (~86M đến 97M tham số) là hoàn toàn khả thi và là chìa khóa để đạt độ phân giải đặc trưng cao cho bao bì bán lẻ.

#### Lọc Chọn 2 Ứng viên Tiềm năng Nhất cho Mỗi Hướng (Phù hợp RTX 4090 24GB)

##### Hướng 1: Mạng Tích chập Hiện đại (Modern CNN Paradigm)
1. **Ứng viên 1 (Lựa chọn Cốt lõi): ConvNeXt-V2-Base (`convnextv2_base.fcmae_ft_in22k_in1k`)**
   - *Quy mô & Cấu trúc:* ~89M tham số; xuất trực tiếp 4 stages với số kênh $(128, 256, 512, 1024)$.
   - *Lý do được chọn:*
     - Tích hợp chuẩn hóa phản hồi toàn cục (**Global Response Normalization - GRN**) sau khối Depthwise Conv, giải quyết triệt để hiện tượng bão hòa đặc trưng và nơ-ron chết khi học tăng dần qua nhiều task liên tiếp (Continual Learning).
     - Cấu trúc phân cấp kim tự tháp tự nhiên tương thích trực tiếp $100\%$ với các tầng chiếu $1 \times 1$ conv của [[04 - Notes/Concepts/Computer Vision/Detection Transformer (DETR)|Deformable DETR]] mà không cần thêm FPN adapter chuyển vị nhân tạo.
     - Tối ưu hóa tính toán tốt nhất: VRAM chiếm dụng khoảng $14.5 - 16.5\text{ GB}$ (ở micro-batch 4), tốc độ forward/backward nhanh nhất trong phân khúc Base.
2. **Ứng viên 2 (Lựa chọn Cấp tiến): InternImage-B (`internimage_b`)**
   - *Quy mô & Cấu trúc:* ~97M tham số; kiến trúc tích chập biến dạng thế hệ 3 (**DCNv3**).
   - *Lý do được chọn:*
     - Đồng nhất nguyên lý biến dạng (**Deformable Paradigm**) từ Backbone đến Head: Deformable DETR sử dụng Deformable Attention để tập trung vào các điểm then chốt; kết hợp với DCNv3 ở backbone giúp trường tiếp nhận tự động co giãn linh hoạt theo các sản phẩm bị đặt nghiêng, xếp đè hoặc che khuất một phần trên khay hàng.
     - Hiệu năng phân giải hình học cao hơn hẳn tích chập tĩnh $7 \times 7$ thông thường, VRAM chiếm dụng khoảng $16.0 - 18.0\text{ GB}$ trên RTX 4090.

##### Hướng 2: Vision Transformer & Foundation Models (ViT Paradigm)
1. **Ứng viên 1 (Lựa chọn Cốt lõi - Self-Supervised Foundation): DINOv2-ViT-B/14 có Register Tokens (`dinov2_vitb14_reg`)**
   - *Quy mô & Cấu trúc:* ~86M tham số; bước nhảy patch $14 \times 14$; kết hợp Simple FPN Adapter (ViT-Det style) để tái tạo các thang tỷ lệ ($1/8, 1/16, 1/32$).
   - *Lý do được chọn:*
     - Huấn luyện tự giám sát trên 142 triệu ảnh (LVD-142M). Khả năng phân biệt các đặc trưng cục bộ (part-level), logo thương hiệu và hoa văn bao bì hạt mịn vượt trội hơn mọi mô hình huấn luyện có giám sát thông thường.
     - **Đột phá từ Register Tokens:** 4 token thanh ghi hấp thụ hoàn toàn các giá trị ngoại lai, loại bỏ triệt để hiện tượng mạng tự tạo các đốm kích hoạt bất thường (*artifacts*) tại vùng đáy khay rỗng, ngăn Teacher sinh nhãn giả rác.
     - VRAM chiếm dụng khoảng $17.0 - 19.5\text{ GB}$ trên RTX 4090.
2. **Ứng viên 2 (Lựa chọn Cốt lõi - Hierarchical ViT): Swin Transformer V2-Base (`swinv2_base_window12to16_192to256`)**
   - *Quy mô & Cấu trúc:* ~88M tham số; cơ chế cửa sổ dịch chuyển (**Shifted Window Attention**).
   - *Lý do được chọn:*
     - Khác với Plain ViT, Swin-V2 tự nhiên xuất ra 4 mức đặc trưng kim tự tháp ($1/4, 1/8, 1/16, 1/32$), kết nối trực tiếp với Deformable DETR mà không cần qua tầng tích chập chuyển vị nhân tạo.
     - Attention cục bộ trong các cửa sổ giúp kiềm chế hiện tượng trôi dạt biểu diễn toàn cục (**Representation Drift**) khi thích ứng với các SKU mới trong Continual Learning.
     - VRAM chiếm dụng khoảng $15.5 - 17.5\text{ GB}$ trên RTX 4090.

#### Khảo sát Chất lượng Ảnh & Phần cứng Camera Quầy Thu ngân Thực tế

##### 1. Phân bố Độ phân giải & Chất lượng Camera tại Quầy Bán lẻ
Trong triển khai thực tế tại các siêu thị và cửa hàng tiện lợi, hệ thống camera quầy thu ngân tự động (Self-Checkout / Smart POS) không sử dụng camera độ phân giải siêu cao (như 4K) do hạn chế về chi phí phần cứng và băng thông đường truyền. Qua khảo sát phần cứng POS phổ biến:
- **Phân khúc 1: Camera USB / CCTV Phổ thông (Quầy POS Cải tạo - Retrofit Kiosks):**
  - Cảm biến góc rộng 720p ($1280 \times 720$) hoặc 1080p ($1920 \times 1080$) đặt cách khay từ $0.8\text{m} - 1.2\text{m}$.
  - Vùng chứa khay hàng hữu dụng (**Region of Interest - ROI**) sau khi cắt (crop) và nắn phối cảnh (perspective rectification) phổ biến nhất ở mức **$512 \times 512$ đến $640 \times 640$ pixel**.
- **Phân khúc 2: Camera Quầy Thông minh Tiêu chuẩn (Dedicated Smart Kiosks - như Mashgin, Grabango):**
  - Cảm biến công nghiệp 2MP đến 3MP (1080p) có đèn LED vòng (Ring Light) trợ sáng. Vùng khay hàng ROI chuẩn hóa sau tiền xử lý đạt khoảng **$640 \times 640$ đến $800 \times 800$ pixel**.
- **Các Yếu tố Suy giảm Chất lượng Thường trực tại Quầy (Sensor Degeneracy):**
  - *Hiện tượng nhòe chuyển động (Motion Blur):* Khách hàng đặt đồ nhanh xuống khay trong lúc camera đang quét.
  - *Nhiễu nén & Cảm biến (Compression Artifacts & Noise):* Luồng video nén JPEG/H.264 qua giao tiếp UVC/RTSP làm mờ các ký tự nhỏ.
  - *Phản quang lóa sáng (Specular Highlights / Glare):* Ánh sáng đèn trần chiếu trực tiếp vào bề mặt bóng của túi nilon bánh kẹo, chai nhựa hoặc vỏ lon thiếc làm cháy sáng một phần hoa văn.

##### 2. Phân bố Kích thước Vật thể trên Khay Thực tế
Khi khay hàng được chuẩn hóa về độ phân giải thực tế **$640 \times 640$ hoặc $800 \times 800$ pixel**:
- *Sản phẩm lớn (hộp ngũ cốc, hộp bánh quy):* Chiếm $140 \times 140$ đến $220 \times 220$ pixel ($15 - 25\%$ diện tích khay).
- *Sản phẩm trung bình (lon nước, chai trà, hộp sữa):* Chiếm $70 \times 70$ đến $130 \times 130$ pixel ($8 - 15\%$ diện tích khay).
- *Sản phẩm nhỏ hạt mịn (thỏi kẹo cao su, thỏi son, gói gia vị, viên pin):* Chỉ có kích thước **$25 \times 25$ đến $45 \times 45$ pixel**!

##### 3. Tác động của Phân bố Thực tế lên Kiến trúc Mô hình
- **Bất lợi chí mạng của Plain ViT (stride 14):** Ở ảnh độ phân giải phổ thông $640 \times 640$, lưới token của ViT chỉ có kích thước $45 \times 45$ tokens. Một món hàng nhỏ $30 \times 30$ pixel chỉ chiếm vỏn vẹn **$2 \times 2$ patch tokens**. Toàn bộ hoa văn logo, chữ viết bị nén vào 4 vector đại số duy nhất, khiến mô hình mất sạch năng lực phân biệt 200 SKU hạt mịn.
- **Ưu thế vượt trội của ConvNeXt-V2-Base và Swin-V2-Base:** Cả hai mạng đều khởi đầu ở Stage 1 với bước nhảy nhỏ $1/4$ ($4 \times 4$ pixels). Trên ảnh $640 \times 640$, feature map Stage 1 vẫn duy trì độ phân giải $160 \times 160$. Món hàng nhỏ $30 \times 30$ pixel vẫn giữ được $8 \times 8 = 64$ điểm đặc trưng, bảo toàn trọn vẹn chi tiết biên dạng và màu sắc bao bì.

---

#### Tối ưu hóa Cấu hình Kỹ thuật Phù hợp Thực tế trên RTX 4090

##### 1. Chuẩn hóa Độ phân giải Thực tế: Điểm ngọt $640 \times 640$ và $800 \times 800$
Không nên nâng độ phân giải lên quá cao ($>1000\text{px}$) vì vừa không phản ánh đúng camera quầy thực tế, vừa gây lãng phí tính toán. Cấu hình nghiên cứu tập trung vào hai mức chuẩn:
- **Mức Thực tế Quầy POS ($640 \times 640$ pixel):** Mô phỏng camera phổ thông, tối ưu hóa tốc độ suy luận thời gian thực cho quầy thanh toán.
- **Mức Chuẩn Nghiên cứu Học thuật ($800 \times 800$ pixel):** Khớp với chuẩn dữ liệu `checkout_800` của RPC để đối sánh học thuật chuẩn xác.

##### 2. Ba Chế độ Cấu hình Tối ưu trên RTX 4090 (24GB VRAM)

| Chế độ Cấu hình | Độ phân giải | Micro Batch | Effective Batch | Accum Steps | VRAM thực tế | Tốc độ Train | Độ trễ Suy luận (Inference Latency) | Mục đích Ứng dụng |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Chế độ A: Triển khai Quầy POS (Khuyến nghị Thực tế)** | **$640 \times 640$** | **4** (hoặc **8**) | **16** | 4 (hoặc 2) | **~11 – 14 GB** | **~4.5 ảnh/s** | **~28 – 35 ms/khay** | Phản ánh đúng camera thực tế; suy luận thời gian thực cực nhanh; mật độ cập nhật dày dặn (~1.100 steps/task). |
| **Chế độ B: Cân bằng Học thuật (Khớp Benchmark RPC)** | **$800 \times 800$** | **4** | **16** | 4 | **~14 – 16 GB** | **~3.2 ảnh/s** | **~45 – 55 ms/khay** | Chuẩn hóa đối sánh học thuật trên tập RPC; độ phân giải vừa đủ để bắt chi tiết tem mác nhỏ. |
| **Chế độ C: Tốc độ Cao Đơn bước (Fast Debug / Pilot)** | **$640 \times 640$** | **6** | **6** | 1 (No accum) | **~12 – 13 GB** | **~5.2 ảnh/s** | **~28 ms/khay** | Cập nhật trọng số liên tục sau mỗi batch; duyệt epoch nhanh nhất để thử nghiệm nhanh các biến thể adapter. |

##### 3. Tăng cường Dữ liệu Mô phỏng Suy giảm Camera (Sensor-Degradation Augmentation)
Để mô hình huấn luyện chống chịu tốt với camera quầy thực tế, bổ sung vào pipeline tăng cường dữ liệu (`pdp/augment.py`):
1. *Random Motion Blur:* Áp dụng biến dạng nhòe chuyển động ngẫu nhiên với kernel $3 \times 3$ đến $7 \times 7$ (xác suất $20\%$).
2. *Random JPEG Compression Noise:* Nén ảnh ngẫu nhiên với hệ số chất lượng $Q \in [60, 90]$ để mô phỏng suy hao truyền dẫn USB/RTSP.
3. *Random Specular Glare:* Tạo các đốm sáng trắng mờ hình elip trên bề mặt vật thể mô phỏng ánh đèn trần siêu thị phản chiếu trên bao bì nilon bóng.

#### Kế hoạch Mã nguồn Chi tiết
- **Tạo mới:** `pdp/models/backbones.py` định nghĩa các lớp:
  - `ConvNeXtV2Backbone`: Tải qua `timm.create_model('convnextv2_base.fcmae_ft_in22k_in1k', features_only=True)`.
  - `SwinV2Backbone`: Tải qua `timm.create_model('swinv2_base_window12to16_192to256', features_only=True)`.
  - `DINOv2ViTDetAdapter`: Tải qua `torch.hub.load('facebookresearch/dinov2', 'dinov2_vitb14_reg')` kết hợp khối chiếu Simple FPN.
- **Cập nhật:** `pdp/models/modeling_deformable_detr.py`:
  - Khởi tạo backbone theo tham số `--backbone_name` (`convnextv2_base`, `swinv2_base`, `dinov2_vitb14_reg`).
  - Hỗ trợ cờ `--gradient_checkpointing` cho Encoder.
- **Cập nhật:** `pdp/augment.py`: Bổ sung các biến đổi `RandomMotionBlur`, `RandomJPEGNoise`, `RandomSpecularHighlight`.

#### Tiêu chuẩn Nghiệm thu Kỹ thuật
- Khởi chạy ổn định ở cả 3 chế độ (độ phân giải $640\text{px}$ và $800\text{px}$, Effective Batch Size linh hoạt từ 4 đến 16).
- Mức tiêu thụ VRAM không vượt quá $16\text{ GB}$ ở chế độ $640\text{px}$ và $18\text{ GB}$ ở chế độ $800\text{px}$ trên GPU RTX 4090.
- Tốc độ suy luận đạt dưới $50\text{ ms}$/ảnh, đáp ứng tiêu chuẩn thời gian thực của quầy POS.

---

### 1.2 Nâng cấp Cơ chế Prompt Tuning & Parameter-Efficient Adaptation

#### Hiện trạng và Phạm vi Công việc
- Mô hình cơ sở chỉ áp dụng prompt vào các tầng Transformer Decoder thông qua hai nhóm: Shared Pool (dùng chung) và Private Pool (chuyên biệt cho từng lớp SKU).
#### Cơ sở Lý thuyết Cốt lõi của Hướng Giải quyết (Theoretical Foundations)

##### 1. Lý thuyết Phân rã Không gian con & Tính Trực giao (Subspace Orthogonality & Gradient Interference)
- *Nền tảng toán học:*
  - Trong Continual Learning (tiêu biểu từ các nghiên cứu *Orthogonal Weights Modification - OWM* (Zeng et al., 2019) và *Gradient Episodic Memory - GEM* (Lopez-Paz & Ranzato, 2017)), hiện tượng quên thảm khốc xảy ra khi vector cập nhật gradient của task mới $\mathbf{g}_t = \nabla_{\theta} \mathcal{L}_t$ có tích vô hướng âm với không gian gradient của các task cũ:
    $$\langle \mathbf{g}_t, \mathbf{g}_{<t} \rangle < 0 \implies \Delta \mathcal{L}_{<t} > 0 \quad (\text{suy thoái tri thức cũ})$$
  - Để triệt tiêu hoàn toàn sự can thiệp này mà không cần lưu trữ mẫu cũ (Replay-Free), không gian tham số của mô hình phải được phân rã thành các **không gian con trực giao (Orthogonal Subspaces)**:
    $$\mathcal{H} = \mathcal{H}_{\text{shared}} \oplus \mathcal{H}_{\text{private}}^{(1)} \oplus \dots \oplus \mathcal{H}_{\text{private}}^{(T)} \quad \text{với } \mathcal{H}_{\text{shared}} \perp \mathcal{H}_{\text{private}}^{(t)}$$
- *Hệ quả vào Decoupled Loss ($L_{\text{DDL}}$):*
  - Nếu góc giữa Shared Prompt $p_s$ và Private Prompt $p_p$ nhỏ hơn $90^\circ$ ($\cos(p_s, p_p) > 0$), hai vector sẽ bị ràng buộc phụ thuộc tuyến tính (*Linear Coupling*). Khi task mới kéo $p_p$ theo hướng tối ưu hóa cho SKU mới, nó vô tình làm trôi dạt vector $p_s$ dùng chung.
  - Hàm mất mát **Directional Decoupled Loss ($L_{\text{DDL}}$)**:
    $$L_{\text{DDL}} = \frac{1}{|P_s| \cdot |P_p|} \sum_{p_s \in P_s} \sum_{p_p \in P_p} \max\left(0, \cos(p_s, p_p) - \cos(90^\circ)\right)$$
    ép góc giữa các vector luôn $\ge 90^\circ$, đảm bảo **tính độc lập tuyến tính hoàn toàn (Linear Independence)** trong không gian Hilbert của các vector đặc trưng.

##### 2. Thế Lưỡng nan Độ dẻo - Độ bền (Plasticity-Stability Dilemma)
- *Nền tảng toán học:*
  - Lý thuyết thần kinh học tính toán (Grossberg, 2012; Mermillod et al., 2013) chỉ ra rằng một hệ thống học liên tục bắt buộc phải cân bằng giữa:
    - **Tính bền vững (Stability):** Khả năng bảo tồn nguyên vẹn các biểu diễn đã học từ trước.
    - **Tính mềm dẻo (Plasticity):** Khả năng hấp thu tri thức mới mà không bị giới hạn dung lượng.
- *Giải thích cho việc Đóng băng Shared Pool sau Task 1 (`--freeze_shared_after_task1`):*
  - Task 1 trong kịch bản RPC chứa tới **100 SKU đầu tiên (chiếm 50% toàn bộ danh mục)**. Tại phiên này, mạng nơ-ron đã tiếp nhận đầy đủ sự đa dạng về: hình học khay quầy hàng, góc chụp từ trên xuống, các loại chất liệu bao bì phổ biến (giấy mờ, nilon bóng, lon thiếc, chai nhựa trong) và phông chữ nhãn mác.
  - Do đó, không gian biểu diễn chia sẻ $\mathcal{H}_{\text{shared}}$ đã đạt tới trạng thái **bão hòa tri thức nền tảng (Foundational Representation Saturation)**.
  - Việc đóng băng hoàn toàn $\mathcal{H}_{\text{shared}}$ sau Task 1 đóng vai trò là "chốt chặn độ bền" (Stability Anchor), ngăn chặn $100\%$ hiện tượng Representation Drift trên các lớp nền. Tính mềm dẻo (Plasticity) cho Task 2–5 được chuyển giao toàn bộ cho các Private Prompts và LoRA Adapters riêng biệt của từng task.

##### 3. Lý thuyết Số chiều Nội tại (Intrinsic Dimensionality) & Cơ chế Cross-Attention trong DETR
- *Nền tảng toán học:*
  - Aghajanyan et al. (ACL 2021) và Hu et al. (ICLR 2022 - LoRA) chứng minh rằng: Quá trình thích ứng một mô hình nơ-ron tiền huấn luyện sang một miền tác vụ mới diễn ra trên một đa tạp tham số có **số chiều nội tại cực kỳ thấp (Extremely Low Intrinsic Rank $r \ll d$)**.
- *Giải thích việc đặt LoRA trên Cross-Attention ($W_q, W_v$):*
  - Trong Transformer Decoder của Deformable DETR, có hai khối Attention phân định nhiệm vụ rõ ràng:
    1. **Self-Attention:** Xử lý sự tương tác giữa các Object Queries với nhau để phân bổ không gian và triệt tiêu trùng lặp. Khối này mang tính phi lớp (Class-Agnostic Geometry).
    2. **Cross-Attention:** Nơi các Object Queries $Q$ truy vấn trực tiếp vào bản đồ đặc trưng hình ảnh $K, V$ từ Backbone/Encoder:
       $$\text{Attention}(Q, K, V) = \text{Softmax}\left(\frac{(Q W_q) (K W_k)^\top}{\sqrt{d}}\right) (V W_v)$$
       Đây chính là **nút thắt thông tin then chốt (Information Bottleneck)** nơi tri thức thị giác của từng SKU được nạp vào Object Query. Ma trận $W_q$ điều khiển *Query đang tìm kiếm đặc trưng gì*, và $W_v$ quyết định *Nội dung ngữ nghĩa nào được truyền sang vector phân loại*.
  - Bằng cách phân rã $W = W_0 + \frac{\alpha}{r} B A$ trên $W_q$ và $W_v$, ta giữ cố định ma trận $W_0$ (tri thức tổng quát) và chỉ tinh chỉnh độ lệch hạng thấp ($\Delta W$) chuyên biệt cho từng task. Tham số cập nhật chỉ chiếm $< 1\%$, triệt tiêu nguy cơ gradient làm xáo trộn không gian query chung.

##### 4. Lý thuyết Visual Prompt Tuning (VPT) & Tác động Phân tầng (Dual-Level Prompting)
- *Nền tảng toán học:*
  - Jia et al. (ECCV 2022) chứng minh rằng việc chèn một số lượng nhỏ các token liên tục học được (continuous prompt tokens) vào chuỗi đầu vào của Transformer có thể điều hướng trường chú ý của toàn bộ mạng.
- *Giải thích cho Dual-Level Prompting:*
  - Nếu chỉ chèn Prompt ở Decoder (như PDP nguyên bản), các Object Queries chỉ có thể chọn lọc lại những gì Encoder đã xuất ra. Nếu các tầng đặc trưng từ Encoder bị mờ nhạt hoặc thiếu thông tin phân giải cho các SKU mới, các prompt ở Decoder sẽ phải xử lý trên đầu vào khuyết tật.
  - **Dual-Level Prompting** giải quyết vấn đề này qua hai cấp độ:
    - *Cấp độ 1 (Encoder VPT):* Điều hướng trực tiếp các điểm lấy mẫu (sampling locations) của Deformable Attention ở Backbone/Encoder vào các vùng hoa văn mới trên bao bì.
    - *Cấp độ 2 (Decoder Dual-Pool):* Căn chỉnh Object Query để khớp với vector đại diện của từng SKU cụ thể.

#### Rào cản Kỹ thuật và Blocker Cốt lõi
- **Bùng nổ tham số khi số lớp tăng lên 200 SKU:** Nếu khởi tạo adapter riêng biệt cho từng lớp lẻ, tổng tham số sẽ tăng tuyến tính, làm phân mảnh bộ nhớ và suy giảm tốc độ suy luận.
- **Can thiệp chéo giữa các Task (Cross-Task Interference):** Khi tối ưu hóa prompt hoặc adapter cho các SKU mới ở Task $t$, nếu không có cơ chế ràng buộc trực giao nghiêm ngặt, biểu diễn của các task trước ($1 \dots t-1$) sẽ bị biến dạng.

#### Hướng Giải quyết & Thiết kế Kiến trúc
- **Kiến trúc LoRA phân rã hạng thấp:**
  - Đối với ma trận trọng số Cross-Attention $W_0 \in \mathbb{R}^{d \times d}$, giữ đóng băng hoàn toàn ($W_0$ cố định).
  - Bổ sung nhánh thích ứng song song:
    $$W = W_0 + \Delta W = W_0 + \frac{\alpha}{r} \cdot B \cdot A$$
    với $A \in \mathbb{R}^{r \times d}$ khởi tạo phân phối Gaussian, $B \in \mathbb{R}^{d \times r}$ khởi tạo bằng 0, rank $r \in \{8, 16\}$, hệ số co giãn $\alpha = 16$.
- **Ràng buộc Trực giao Decoupled Loss ($L_{\text{DDL}}$):**
  - Duy trì hàm mất mát trực giao giữa Shared Prompts ($P_s$) và Private Prompts ($P_p$):
    $$L_{\text{DDL}} = \frac{1}{|P_s| \cdot |P_p|} \sum_{p_s \in P_s} \sum_{p_p \in P_p} \max\left(0, \cos(p_s, p_p) - \cos(\theta_{\text{thresh}})\right)$$
    với $\theta_{\text{thresh}} = 90^\circ$ ($\cos \le 0$).
- **Đóng băng Shared Pool sau Task 1:**
  - Sau khi hoàn thành Task 1 (100 SKU đầu tiên), cố định hoàn toàn các vector của Shared Pool và tầng `query_tf` để bảo tồn tri thức nền tảng về quầy hàng bán lẻ.

#### Kế hoạch Mã nguồn Chi tiết
- **Tạo mới:** `pdp/models/lora.py` hiện thực module `LoRACrossAttentionWrapper`.
- **Cập nhật:** `pdp/models/prompt.py`:
  - Hoàn thiện nhánh tính toán $L_{\text{DDL}}$ tự động lấy trung bình qua tất cả các tầng decoder layers.
  - Bổ sung logic đóng băng có điều kiện cho shared parameters khi `task_id > 0`.

---

### 1.3 Tối ưu hóa Bộ nhớ Class Prototype (Multi-Prototype Clustering, $K=3$)

#### Hiện trạng và Phạm vi Công việc
- Hệ thống hiện tại lưu trữ 1 vector trung bình duy nhất (Single Centroid) cho mỗi lớp: $\mu_c = \frac{1}{M_c} \sum_{i=1}^{M_c} f_i$.
- Cần nâng cấp lên **Multi-Prototype Memory**: Mỗi lớp SKU được đại diện bởi $K=3$ prototype tương ứng với 3 cụm góc nhìn trực quan chính trong môi trường bán lẻ:
  1. Mặt chính diện (Front view - logo, tên nhãn hiệu).
  2. Mặt sau / hông (Back/Side view - bảng dinh dưỡng, mã vạch, thành phần).
  3. Mặt trên / nắp chai (Top/Cap view - góc chụp từ trên khay xuống).

#### Rào cản Kỹ thuật và Blocker Cốt lõi
- **Hiện tượng Trôi dạt Centroid theo Góc nhìn (Viewpoint Collapse):** Bao bì mặt trước và mặt sau của hộp bánh/chai nước có màu sắc và hoa văn hoàn toàn khác nhau. Phép cộng trung bình đại số tạo ra một vector nằm ở "khoảng trống không gian", không có độ tương đồng cao với bất kỳ góc nhìn thực tế nào, dẫn đến việc Teacher bỏ sót nhãn giả khi sản phẩm bị đặt lật ngược.
- **Nhiễu từ các mẫu dự đoán sai:** Nếu đưa cả các vector query từ các bounding box lệch hoặc dự đoán sai lớp vào bộ nhớ, tâm cụm prototype sẽ bị lệch nghiêm trọng.

#### Hướng Giải quyết & Thiết kế Thuật toán
- **Thuật toán Spherical K-Means Clustering ($K=3$):**
  1. *Thu thập mẫu sạch:* Trong suốt epoch cuối của Task $t$, chỉ lưu trữ các query vector $f_i \in \mathbb{R}^{256}$ thỏa mãn đồng thời:
     - Khớp với ground truth target theo Hungarian Matching.
     - Lớp dự đoán trùng với ground truth class label ($y_{\text{pred}} = y_{\text{gt}}$).
     - Điểm tự tin phân loại $s_i \ge 0.5$.
  2. *Phân cụm trên mặt cầu đơn vị:* Chuẩn hóa $\hat{f}_i = \frac{f_i}{\|f_i\|_2}$.
     - Nếu số mẫu tích lũy $M_c \ge 30$: Chạy K-Means với $K=3$, khoảng cách Cosine, thu được 3 tâm cụm $\{p_{c, 1}, p_{c, 2}, p_{c, 3}\}$.
     - Nếu $M_c < 30$: Rút gọn về $K=1$ (tính trung bình chuẩn hóa thông thường) để tránh overfitting vào cụm rỗng.
- **Cập nhật Cơ chế Khớp Nhãn giả trong PPG (`pdp/ppg.py`):**
  - Độ tương đồng giữa ứng viên query $f_j$ và lớp cũ $c$ được định nghĩa bằng giá trị cực đại trên các góc nhìn:
    $$\text{Sim}(f_j, \mathcal{P}_c) = \max_{k \in \{1, \dots, K_c\}} \frac{f_j^\top p_{c, k}}{\|f_j\|_2 \cdot \|p_{c, k}\|_2}$$
  - Cơ chế **Nearest Prototype Verification**: Giữ lại nhãn giả của lớp $c$ nếu:
    $$\text{Sim}(f_j, \mathcal{P}_c) \ge \tau_{\text{sim}} \quad \text{và} \quad c = \arg\max_{c' \in \mathcal{C}_{\text{old}}} \text{Sim}(f_j, \mathcal{P}_{c'})$$

#### Kế hoạch Mã nguồn Chi tiết
- **Cập nhật:** `pdp/engine.py`:
  - Sửa đổi hàm `compute_class_prototypes(self, cls_idx)`: Thay thế phép tính `cache_tensor.mean(dim=0)` bằng hàm phân cụm Spherical K-Means.
  - Cập nhật cấu trúc `self.class_prototypes` từ `Dict[int, Tensor[256]]` sang `Dict[int, Tensor[K, 256]]`.
- **Cập nhật:** `pdp/ppg.py`:
  - Tái cấu trúc hàm `prototype_matrix`: Tạo ma trận prototype 3 chiều $[C_{\text{old}}, K, D]$ và mặt nạ hợp lệ tương ứng.
  - Cập nhật hàm `select_pseudo_labels`: Tính ma trận tương đồng tensor qua phép nhân ma trận đa chiều `torch.einsum('qd,ckd->qck', features, prototypes).max(dim=-1).values`.

---

### 1.4 Thích ứng Ngưỡng Sinh Nhãn Giả PPG theo Mức độ Bất định Năng lượng

#### Hiện trạng và Phạm vi Công việc
- Cơ chế PPG hiện tại sử dụng hai ngưỡng cố định toàn cục: $\tau_{\text{high}} = 0.5$ (chấp nhận trực tiếp) và $\tau_{\text{low}} = 0.3$ (chấp nhận nếu vượt qua kiểm tra Prototype).
- Cần xây dựng **Energy-based Adaptive Thresholding**: Tự động điều chỉnh ngưỡng lọc nhãn giả theo mức độ khó và độ bất định phân loại của từng lớp SKU.

#### Rào cản Kỹ thuật và Blocker Cốt lõi
- **Sự phân hóa độ tự tin giữa các SKU:** Các mặt hàng có hình dạng đặc thù (như chai nước ngọt lớn) luôn đạt điểm tự tin $> 0.8$, trong khi các mặt hàng có bao bì tương đồng nhau (như các gói kẹo cùng hãng khác vị) chỉ đạt điểm tự tin trong khoảng $0.35 - 0.48$. Ngưỡng cứng $\tau_{\text{high}} = 0.5$ khiến mô hình bỏ rơi toàn bộ nhãn giả của các lớp khó, dẫn đến hiện tượng quên nghiêm trọng trên các lớp hạt mịn.

#### Hướng Giải quyết & Thiết kế Thuật toán
- **Ước lượng Bất định bằng Free Energy Score:**
  - Đối với query vector của Teacher, vector logits phân loại $z \in \mathbb{R}^{C_{\text{old}}}$, hàm năng lượng tự do Helmholtz được tính theo công thức:
    $$E(z; T) = -T \cdot \log \sum_{c=1}^{C_{\text{old}}} \exp\left(\frac{z_c}{T}\right)$$
    với nhiệt độ làm mịn $T = 1.0$.
  - Mức năng lượng thấp biểu thị mô hình rất tự tin vào dự đoán; mức năng lượng cao biểu thị trạng thái mơ hồ, bất định.
- **Công thức Ngưỡng Động Phân tầng:**
  - Tính năng lượng trung bình tích lũy $\bar{E}_c$ cho từng lớp $c$ từ tập validation của task trước.
  - Thiết lập ngưỡng thích ứng cho lớp $c$:
    $$\tau_{\text{high}}(c) = \text{clip}\left(\tau_0 \cdot \left(1 - \gamma \cdot \frac{\bar{E}_c - E_{\min}}{E_{\max} - E_{\min}}\right), \, 0.35, \, 0.65\right)$$
    với $\tau_0 = 0.5, \gamma = 0.2$.
  - Các lớp có độ bất định cao sẽ có ngưỡng $\tau_{\text{high}}$ mềm hơn, kết hợp với xác thực nghiêm ngặt từ Multi-Prototype để bù đắp Recall mà không gây tăng False Positives.

#### Kế hoạch Mã nguồn Chi tiết
- **Cập nhật:** `pdp/ppg.py`:
  - Bổ sung hàm `compute_energy_scores(logits, temperature=1.0)`.
  - Thay thế tham số vô hướng `tau_high, tau_low` bằng tensor ngưỡng vector theo từng lớp `tau_high_per_class, tau_low_per_class`.

---

## 2. Khảo sát Mô hình Continual Learning & Thách thức Giám sát Bất nhất

### 2.1 Đối sánh Các Mô hình IOD Dựa trên DETR

#### Nhiệm vụ Nghiên cứu
- Tiến hành phân tích đối sánh chuyên sâu giữa PDP và các kiến trúc phát hiện vật thể tăng dần tiên tiến:
  - **MD-DETR (CVPR 2023):** Kiến trúc tiền thân, sử dụng chưng cất tri thức đa quy mô (Multi-scale Knowledge Distillation) trên các tầng đặc trưng Encoder và Decoder, nhưng đòi hỏi bộ nhớ lưu trữ mẫu cũ (Replay Buffer).
  - **CL-DETR:** Khảo sát phương pháp căn chỉnh phân phối Query Tokens giữa Teacher và Student thông qua tối ưu hóa chi phí ghép cặp Hungarian.
  - **iDETR:** Phân tích cơ chế chuyển giao trọng số chọn lọc cho các query đại diện.

#### Thách thức Giám sát Bất nhất (Inconsistent Supervision)
- Trong bài toán bán lẻ khay hàng, hình ảnh huấn luyện ở Task $t$ chứa đồng thời:
  - Hàng hóa thuộc lớp mới (được đánh nhãn bounding box chuẩn).
  - Hàng hóa thuộc lớp cũ đã học ở Task $1 \dots t-1$ (hoàn toàn không có nhãn ground truth).
- Nếu không có cơ chế bù nhãn giả chuẩn xác, hàm mất mát [[04 - Notes/Concepts/Computer Vision/Detection Transformer (DETR)|Hungarian Loss]] sẽ coi tất cả các vật thể lớp cũ là Background. Gradient hồi quy sẽ chủ động triệt tiêu các đặc trưng của lớp cũ, gây ra hiện tượng quên thảm khốc cấp tốc.

---

### 2.2 Khảo sát Hướng Tiếp cận Open-World Object Detection

#### Nhiệm vụ Nghiên cứu
- Đánh giá khả năng tích hợp nguyên lý từ **OW-DETR (Open-World DETR)** và **PROB**:
  - Tách biệt rõ ràng giữa "Background thực sự" (mặt khay rỗng, không gian trống) và "Vật thể chưa biết" (Unknown Objects).
  - Sử dụng cơ chế Objectness Energy Ranking để phát hiện các cụm vùng ảnh có khả năng là vật thể nhưng chưa nằm trong danh mục lớp hiện tại.

#### Hướng Triển khai vào AutoCheckout-CL
- Áp dụng bộ lọc năng lượng để ngăn chặn việc gán nhãn Background cho các vật thể chưa được định danh. Thay vì ép nhãn class 0 (no-object), các query này được gán trọng số suy giảm gradient trong hàm Focal Loss:
  $$w_i = \begin{cases} 1.0 & \text{nếu IoU với nhãn giả } < 0.1 \text{ (chắc chắn là background)} \\ 0.0 & \text{nếu nằm trong vùng nghi ngờ là vật thể cũ} \end{cases}$$

---

### 2.3 Tiềm năng Ứng dụng Zero-Shot Foundation Models

#### Nhiệm vụ Nghiên cứu
- Khảo sát các mô hình thị giác - ngôn ngữ mở (Open-Vocabulary / Foundation Models): **Grounding DINO** và **YOLO-World**.
- Đánh giá tính khả thi của việc sử dụng Text Prompts (tên sản phẩm, mô tả bao bì SKU từ metadata RPC) để nhận diện zero-shot các sản phẩm mới mà không cần huấn luyện lại toàn bộ mạng nơ-ron.
- Đề xuất mô hình lai (Hybrid Architecture): Sử dụng Foundation Model làm Teacher ngoại biên để tạo nhãn giả thô ban đầu, hỗ trợ Student Deformable DETR trong các task gia tăng đầu tiên.

---

## 3. Nghiên cứu Kịch bản: Train 1 Vật thể (Single) — Test Nhiều Vật thể (Cluttered)

### 3.1 Thiết kế Chi tiết Pipeline Synthetic Tray Generation (Copy-Paste Augmentation)

#### Hiện trạng và Mục tiêu Kỹ thuật
- Tập dữ liệu RPC cung cấp 53.739 ảnh huấn luyện ở dạng **Single-Product** (1 sản phẩm duy nhất đặt trên bàn xoay phông trắng, chụp từ 4 hướng góc cao). Trong khi đó, tập kiểm thử thực tế là các ảnh **Cluttered Tray** chứa 5 đến 20 sản phẩm nằm chồng chéo, che khuất lẫn nhau trên khay thanh toán.
- Mục tiêu: Xây dựng pipeline tự động tổng hợp khay hàng nhân tạo chất lượng cao từ 53k ảnh đơn, thu hẹp khoảng cách phân phối (Domain Gap) giữa môi trường huấn luyện và môi trường thực tế.

```merm 
 flowchart TD
         subgraph DataPrep["Tiền xử lý Dữ liệu Nguồn"]
             A1["53.739 Ảnh Đơn Chiếc (Single-Product)"] --> B1["Tách Nền Tự Động (BiRefNet / SAM)"]
              B1 --> C1["Kho Mặt Nạ Trong Suốt (RGBA Products)"]
              
              A2["50 Ảnh Khay Quầy Hàng Rỗng Thật"] --> B2["Chuẩn Hóa Phối Cảnh & Kích Thước (ROI 640/800px)"]
          end
      
          subgraph SynthesisEngine["Động cơ Ghép Khay Nhân Tạo (Copy-Paste Engine)"]
              C1 --> D["Lấy Mẫu Ngẫu Nhiên (N = 5 đến 20 món/khay)"]
              B2 --> E["Nạp Phông Nền Khay Chuẩn"]
              
              D --> F["Biến Đổi Hình Học (Xoay 0 - 360 độ, Co giãn Log-Normal)"]
              F --> G["Xếp Lớp Không Gian Z-Order (Che khuất 20% - 45%)"]
              E --> G
              
              G --> H["Hòa Trộn Môi Trường (Gaussian Blur 3x3, Color Jitter, Specular Glare)"]
          end
      
          subgraph BBoxAnnotation["Hiệu Chỉnh Tọa Độ & Xuất File Nhãn"]
              H --> I["Tính Toán Lại Diện Tích Hiển Thị Của Từng Vật Thể"]
              I --> J{"Phần Hiển Thị >= 25%?"}
              J -- "Không (Bị che > 75%)" --> K["Loại Bỏ BBox Khỏi File Nhãn"]
              J -- "Có" --> L["Cập Nhật Tọa Độ Chuẩn BBox [x, y, w, h]"]
              L --> M["Xuất Chú Thích COCO: instances_train_synthetic.json"]
         end

```

#### Rào cản Kỹ thuật và Blocker Cốt lõi
- **Query Competition Bias (Định kiến Cạnh tranh Query):** Nếu chỉ huấn luyện trên ảnh đơn 1 món, 300 queries của Deformable DETR sẽ học phân phối: chỉ duy nhất 1 query được kích hoạt tại tâm ảnh, 299 queries còn lại dự đoán No-Object. Khi chuyển sang ảnh khay có 15 món, mạng nơ-ron bị tê liệt khả năng dự đoán đồng thời nhiều vật thể, dẫn đến Recall sụt giảm nghiêm trọng.
- **Rìa ảnh giả tạo (Matting Artifacts):** Thuật toán cắt nền thông thường để lại viền trắng hoặc răng cưa nhân tạo. Mạng nơ-ron hội tụ vào các đặc trưng biên giả tạo này thay vì học hoa văn bao bì, dẫn đến suy giảm độ chính xác khi kiểm thử trên khay thật.
- **Biến dạng Tỷ lệ Không gian (Scale Distortion):** Trong ảnh đơn, sản phẩm được phóng to chiếm 60-80% khung hình. Trên khay thực tế, mỗi sản phẩm chỉ chiếm khoảng 3-8% diện tích ảnh.

#### Hướng Triển khai Chi tiết

##### Bước 1: Trích xuất Mặt nạ Tách nền (Instance Segmentation Masking)
- Sử dụng mô hình **BiRefNet** hoặc **Segment Anything Model (SAM)** với bounding box ground truth sẵn có làm prompt.
- Tự động cắt nền cho toàn bộ 53.739 ảnh, lưu trữ thành định dạng ảnh PNG trong suốt 4 kênh (RGBA) kèm file metadata lưu trữ kích thước thực.
- Kịch bản thực thi: `tools/extract_single_masks.py`.

##### Bước 2: Chuẩn bị Phông nền Khay Bán lẻ Chuẩn (Background Curation)
- Trích xuất 50 ảnh chụp khay quầy hàng rỗng (không chứa hàng hóa) từ các góc máy chuẩn của RPC.
- Chuẩn hóa độ phân giải về kích thước $1800 \times 1800$ pixel tương đương ảnh chụp quầy thanh toán POS.

##### Bước 3: Động cơ Sinh ảnh Ghép Nhân tạo (`tools/generate_synthetic_trays.py`)
- **Lấy mẫu sản phẩm:** Với mỗi ảnh cần sinh, bốc ngẫu nhiên số lượng vật thể $M \sim \text{Uniform}(5, 20)$.
- **Biến đổi hình học (Geometric Augmentation):**
  - Góc xoay mặt phẳng: $\theta \sim \text{Uniform}(0^\circ, 360^\circ)$.
  - Tỷ lệ co giãn: Lấy mẫu theo phân bố Log-Normal khớp với phân bố kích thước hộp thực tế trên RPC Clutter: chiều rộng $w \in [90, 260]$ pixel, chiều cao $h \in [90, 260]$ pixel.
- **Mô phỏng Che khuất và Xếp lớp (Z-Ordering & Occlusion Simulation):**
  - Xếp các sản phẩm theo thứ tự ngẫu nhiên từ dưới lên trên.
  - Ràng buộc tỷ lệ giao nhau diện tích giữa các sản phẩm lân cận nằm trong khoảng $20\% \le \text{IoU}_{\text{overlap}} \le 45\%$.
- **Làm mịn và Hòa trộn Môi trường (Blending & Harmonization):**
  - Áp dụng Gaussian Blur nhẹ với kernel $3 \times 3$ lên kênh Alpha tại đường viền cắt để triệt tiêu góc cạnh giả tạo.
  - Áp dụng Color Jitter nhẹ (độ sáng $\pm 5\%$, tương phản $\pm 5\%$) để hòa trộn màu sắc bao bì vào nhiệt độ màu của ánh sáng quầy hàng.
- **Tính toán lại Bounding Box Chú thích Chuẩn:**
  - Xác định lại mặt nạ hiển thị thực tế sau khi bị các vật thể lớp trên che đè.
  - Nếu diện tích phần nhìn thấy của vật thể $< 25\%$ diện tích ban đầu: Loại bỏ vật thể này khỏi file nhãn để tránh tạo ra các bounding box rác gây nhiễu cho hàm [[04 - Notes/Concepts/Computer Vision/Hungarian Matching|Hungarian Loss]].
  - Ghi nhận tọa độ bounding box hiển thị dạng $[x_{\min}, y_{\min}, w, h]$ theo chuẩn COCO.

---

### 3.2 Khung Thử nghiệm Độc lập E-Single Benchmark

Thiết lập ma trận 3 cấu hình thử nghiệm độc lập để đo lường định lượng đóng góp của pipeline tổng hợp dữ liệu:

1. **Baseline E-Single-Raw:**
   - Dữ liệu train: 53.739 ảnh đơn nguyên bản (Single images đặt trên nền trắng).
   - Dữ liệu test: Tập RPC Cluttered Test thực tế (2.400 ảnh quầy hàng).
   - Mục đích: Đo lường mức độ suy giảm hiệu năng do Query Competition Bias và Domain Gap.
2. **Experiment E-Single-Synthetic (Mục tiêu Cốt lõi):**
   - Dữ liệu train: 50.000 ảnh khay nhân tạo sinh từ pipeline Copy-Paste Harmonized.
   - Dữ liệu test: Tập RPC Cluttered Test thực tế.
   - Mục đích: Chứng minh khả năng vượt qua rào cản miền dữ liệu mà không cần thêm bất kỳ ảnh chụp khay thật nào trong quá trình huấn luyện.
3. **Upperbound E-Cluttered-Real:**
   - Dữ liệu train: Sử dụng trực tiếp ảnh khay thực tế từ tập Clutter Train của RPC.
   - Mục đích: Xác lập cận trên lý tưởng để so sánh mức độ thu hẹp khoảng cách của phương pháp tổng hợp.

---

## 4. Thách thức Bài toán Bán lẻ Thực tế: Từ mAP đến Checkout Accuracy (cAcc)

### 4.1 Khử Trùng lặp Dự đoán (Class-Agnostic NMS & Box Deduplication)

#### Cơ sở Lý thuyết & Bản chất Toán học (Theoretical Foundations)

##### 1. Sự Sụp đổ của Giả định "NMS-Free" của DETR trong Môi trường Quầy hàng Mật độ Cao
- *Giả định lý thuyết của DETR:* Deformable DETR dựa trên thuật toán ghép cặp hai phía [[04 - Notes/Concepts/Computer Vision/Hungarian Matching|Hungarian Matching]] (Bipartite Matching) trong quá trình huấn luyện để ép buộc ràng buộc $1 - 1$: mỗi vật thể ground truth chỉ được ghép với đúng một query có chi phí mất mát nhỏ nhất. Về mặt lý thuyết thuần túy, điều này giúp DETR loại bỏ hoàn toàn tầng hậu xử lý [[04 - Notes/Concepts/Computer Vision/Non-Maximum Suppression (NMS)|NMS]] vốn bắt buộc ở các mạng CNN cổ điển (Faster R-CNN, YOLO).
- *Thực tế sụp đổ trong môi trường đông đúc (Dense/Cluttered Environment):*
  - Các nghiên cứu chuyên sâu về DETR (tiêu biểu như *Co-DETR*, Zong et al., ICCV 2023 và phân tích của Zhu et al., ICLR 2021) đã chứng minh: Do không gian tối ưu hóa của hàm Hungarian Loss mang tính rời rạc và không khả vi toàn cục, các query lân cận có xu hướng cùng rơi vào "vùng hấp dẫn" (*basin of attraction*) của cùng một vật thể khi các món hàng nằm san sát nhau trên khay.
  - Khi một sản phẩm có bao bì quá nổi bật (màu sắc sặc sỡ, logo lớn), tín hiệu gradient lan truyền ngược trong Decoder kích hoạt đồng thời 2 đến 3 queries xung quanh nó. Tại thời điểm suy luận (inference), các queries này cùng xuất ra điểm tự tin phân loại rất cao ($> 0.6 - 0.8$) cho cùng một vật thể vật lý.

##### 2. Nguyên lý Bài trừ Không gian Vật lý (Physical Space Exclusion) & Tại sao bắt buộc là "Class-Agnostic"
- Trong các bài toán phát hiện vật thể thông thường (như COCO), NMS thường được chạy theo từng lớp riêng biệt (*Per-Class NMS*). Tuy nhiên, cách làm này **hoàn toàn thất bại** trong bài toán bán lẻ hạt mịn:
  - Giả sử trên khay có 1 gói snack khoai tây. Do đặc trưng bao bì các vị rất giống nhau, Query A dự đoán đây là "Snack Vị Tự Nhiên" với điểm số $0.80$, trong khi Query B dự đoán là "Snack Vị Tảo Biển" với điểm số $0.75$, cả hai box đè lên nhau tới $\text{IoU} = 0.85$.
  - Nếu chạy Per-Class NMS: Vì thuộc hai nhãn lớp khác nhau, thuật toán NMS thông thường **giữ lại cả hai box**. Hậu quả là quầy thu ngân in hóa đơn tính tiền khách 2 gói bim bim trong khi trên khay chỉ có duy nhất 1 gói vật lý.
- **Cơ sở vật lý của Class-Agnostic NMS:**
  - Trong không gian thực tế ba chiều nhìn từ trên xuống (top-down view), hai vật thể rắn không thể chiếm cùng một tọa độ không gian tại cùng một thời điểm. Bất kỳ sự giao thoa diện tích nào $\text{IoU} \ge 0.45$ đều biểu thị sự tranh chấp query trên cùng một thực thể vật lý.
  - Phép lọc **Class-Agnostic NMS** ép buộc nguyên lý bài trừ vật lý: Bất kể nhãn dự đoán là gì, trong một vùng không gian giao thoa, chỉ có duy nhất một box có điểm tự tin phân loại cao nhất được phép tồn tại.

---

#### Rào cản Kỹ thuật
- **Sự khác biệt giữa Đánh giá Học thuật và Hóa đơn Thực tế:**
  - Độ đo [[04 - Notes/Concepts/Computer Vision/Mean Average Precision (mAP)|mAP]] đánh giá chất lượng đường cong Precision-Recall dựa trên diện tích dưới đường cong, ưu tiên việc tìm ra tất cả các vị trí tiềm năng.
  - Bài toán quầy thu ngân tự động yêu cầu **đúng tuyệt đối về số lượng từng mặt hàng**. Một khay hàng có 12 sản phẩm, nếu mô hình phát hiện đúng 12 vị trí nhưng do 2 queries cùng bắt trúng 1 gói bim bim dẫn đến số đếm thành 13, toàn bộ hóa đơn bị coi là sai ($cAcc = 0$).

#### Hướng Giải quyết & Thiết kế Thuật toán
- **Hậu xử lý bằng Class-Agnostic [[04 - Notes/Concepts/Computer Vision/Non-Maximum Suppression (NMS)|NMS]]:**
  - Trước khi đưa các dự đoán vào bộ đếm hóa đơn, áp dụng phép lọc NMS phi lớp (Class-Agnostic) với ngưỡng $\text{IoU}_{\text{dedup}} = 0.45$:
    - Nếu hai bounding box dự đoán có $\text{IoU} \ge 0.45$ (kể cả khi chúng được dự đoán là hai lớp SKU khác nhau), chỉ giữ lại duy nhất một box có điểm số tự tin phân loại cao nhất.
    - Loại bỏ triệt để tình trạng hai query cùng tranh chấp một món hàng vật lý trên quầy.

---

### 4.2 Thuật toán Tối ưu Ngưỡng & Bộ Chỉ số Đếm Sản phẩm

#### Cơ sở Lý thuyết & Bản chất Toán học (Theoretical Foundations)

##### 1. Sự Lệch pha Toán học giữa mAP và Hàm Thiệt hại Hóa đơn (Loss Function Misalignment)
- *Bản chất của mAP:*
  $$\text{mAP} = \frac{1}{C} \sum_{c=1}^C \int_0^1 p_c(r) \, dr$$
  mAP tính tích phân diện tích dưới đường cong Precision-Recall trên toàn bộ dải ngưỡng điểm từ $0$ đến $1$. Mô hình có thể đẩy hàng chục box có điểm tự tin rất thấp ($\tau = 0.05$) để tối đa hóa Recall, và điểm mAP vẫn cao nếu thứ tự xếp hạng (ranking) giữa True Positive và False Positive được bảo toàn.
- *Bản chất của Hàm Thiệt hại Hóa đơn (Zero-One Exact Match Loss):*
  $$\mathcal{L}_{\text{checkout}}(i) = \mathbb{I}\left(\sum_{c=1}^C |N_{\text{pred}}(i, c) - N_{\text{gt}}(i, c)| > 0\right)$$
  Khác hoàn toàn với mAP, bài toán thu ngân tính tiền vận hành theo hàm thiệt hại 0-1 tuyệt đối trên toàn bộ khay hàng: chỉ cần đếm lệch $1$ món (dù thừa hay thiếu), toàn bộ hóa đơn bị tính sai ($cAcc = 0$). Do đó, một mô hình đạt mAP@50 tới **$95\%$** vẫn có thể cho ra $cAcc$ dưới **$15\%$** nếu không có một ngưỡng cắt tự tin được hiệu chuẩn chính xác.

##### 2. Nguyên lý Giảm thiểu Rủi ro Thực nghiệm (Empirical Risk Minimization - ERM) trong Dò Ngưỡng
- *Vấn đề Sai lệch Hiệu chuẩn Xác suất (Neural Network Miscalibration):*
  - Nghiên cứu của Guo et al. (*On Calibration of Modern Neural Networks*, ICML 2017) chỉ ra rằng xác suất đầu ra từ Sigmoid/Softmax của các mạng nơ-ron sâu không phản ánh đúng tần suất chính xác thực tế. Do đó, việc chọn ngưỡng cố định theo trực giác ($\tau = 0.5$) là hoàn toàn phi khoa học và làm sụt giảm nghiêm trọng độ chính xác hóa đơn.
- *Nguyên tắc Chống Rò rỉ Dữ liệu (No Data Leakage):*
  - Trong nhiều nghiên cứu trước đây, ngưỡng cắt được dò trực tiếp trên tập Test để chọn ra con số đẹp nhất (gọi là *Oracle Thresholding*). Đây là hành vi rò rỉ dữ liệu (nhìn trộm đáp án), không có giá trị triển khai thực tế.
  - Quy trình chuẩn hóa: Áp dụng nguyên lý ERM bằng cách quét lưới tìm ngưỡng tối ưu $s^*$ trên tập **Validation độc lập**:
    $$s^* = \arg\max_{s \in [0.1, 0.9]} cAcc_{\text{val}}(s)$$
    Sau đó "đóng băng" $s^*$ và áp dụng cố định sang tập **Test**. Đây là bảo chứng toán học cho tính tổng quát hóa (Generalization Bound) khi hệ thống được nạp vào máy POS thực tế.

##### 3. Cơ sở Chuẩn hóa Bộ Tứ Chỉ số Bán lẻ (RPC Benchmark Specification)
Được định nghĩa chuẩn mực bởi Wei et al. (*RPC Dataset*, 2019):
1. **cAcc (Checkout Accuracy):** Đánh giá mức độ hài lòng của người dùng cuối — tỷ lệ hóa đơn thanh toán chính xác $100\%$ không cần nhân viên can thiệp.
2. **ACD (Average Counting Distance):** Đánh giá mức độ tổn thất tài chính — khoảng cách $L_1$ trung bình giữa số lượng sản phẩm dự đoán và thực tế trên mỗi khay hàng:
   $$ACD = \frac{1}{N} \sum_{i=1}^N \sum_{c=1}^C |N_{\text{pred}}(i, c) - N_{\text{gt}}(i, c)|$$
3. **mCCD (Mean Class Counting Distance):** Sai số đếm trung bình theo từng lớp SKU, giúp phát hiện mặt hàng cụ thể nào đang bị đếm sai nhiều nhất.
4. **mCIoU (Mean Counting IoU):** Đo lường tính toàn vẹn: kết hợp đồng thời độ chính xác đếm số lượng và chất lượng định vị không gian bounding box.

---

#### Thuật toán Tìm Ngưỡng Điểm Tối ưu (Threshold Grid Search)
- Không sử dụng ngưỡng tùy tiện khi chuyển giao sang tập kiểm thử. Quy trình tối ưu hóa nghiêm ngặt được thiết lập như sau:
  1. Chạy suy luận mô hình trên tập **Validation**, lưu trữ toàn bộ các box dự đoán thô (raw detections: boxes, labels, scores).
  2. Quét lưới ngưỡng điểm tự tin $S \in [0.10, 0.90]$ với bước nhảy $\Delta s = 0.05$.
  3. Với mỗi giá trị $s \in S$, áp dụng lọc các dự đoán có $\text{score} \ge s$, tính toán $cAcc_{\text{val}}(s)$.
  4. Xác định ngưỡng tối ưu trên tập Validation:
     $$s^* = \arg\max_{s \in S} cAcc_{\text{val}}(s)$$
  5. Cố định giá trị $s^*$ và áp dụng nguyên vẹn lên các dự đoán của tập **Test** để xuất kết quả báo cáo cuối cùng.

#### Kế hoạch Mã nguồn Chi tiết
- **Mô-đun thực thi:** `tools/eval_count.py` kết hợp các hàm lõi trong `autocheckout/counting.py`.
- **Cấu trúc lệnh chuẩn hóa:**
  ```bash
  python3 -m tools.eval_count \
      --run-dir results/exp_dinov2_pdp \
      --val-ann data/rpc/annotations/instances_val2019.json \
      --test-ann data/rpc/annotations/instances_test2019.json \
      --task-config configs/tasks_100-4x25_seed0.json \
      --nms-iou 0.45
  ```

---

## 5. Khung Thực nghiệm Nghiên cứu Độc lập & Tiêu chí Nghiệm thu

### 5.1 Quy chuẩn Phân chia Task & Luồng Dữ liệu (CL Protocol)

Toàn bộ các thực nghiệm thuộc nhánh nghiên cứu độc lập tuân thủ quy chuẩn chia task chuẩn hóa cho 200 SKU bán lẻ:
- **Cấu hình Task (100 + 4x25 Split):**
  - **Task 1 (Base Session):** Huấn luyện trên 100 SKU đầu tiên. Đây là phiên thiết lập biểu diễn nền tảng cho mạng nơ-ron.
  - **Task 2:** Học thêm 25 SKU mới (tích lũy 125 SKU), không lưu trữ ảnh của 100 SKU cũ.
  - **Task 3:** Học thêm 25 SKU mới (tích lũy 150 SKU).
  - **Task 4:** Học thêm 25 SKU mới (tích lũy 175 SKU).
  - **Task 5 (Final Session):** Học 25 SKU cuối cùng (tích lũy đủ 200 SKU).
- **Ràng buộc Nghiên cứu (Replay-Free):**
  - Tuyệt đối không sử dụng bộ nhớ đệm lưu trữ hình ảnh hay bounding box của các lớp cũ trong quá trình huấn luyện các task gia tăng. Mọi tri thức cũ được bảo toàn duy nhất qua trọng số mô hình, Prompt Pools và Prototype Memory.

---

### 5.2 Kế hoạch Thực nghiệm Độc lập (Independent Research Experiments)

Danh mục các thử nghiệm cần triển khai độc lập, theo dõi và đối sánh:

| Nhóm Thực nghiệm | Mã Thử nghiệm | Mô tả Cấu hình Kỹ thuật | Mục tiêu Khoa học Cần Chứng minh |
| :--- | :---: | :--- | :--- |
| **Backbone Study** | **EXP-B1** | ResNet-50 + Deformable DETR (Baseline chuẩn) | Xác lập đường cơ sở học thuật trên backbone kinh điển |
| | **EXP-B2** | ConvNeXt-V2-Base + Deformable DETR | Đánh giá năng lực của tích chập hiện đại 89M tham số và chuẩn hóa GRN |
| | **EXP-B3** | DINOv2-ViT-B/14-Reg + Simple FPN Adapter | Đánh giá đặc trưng tự giám sát và vai trò triệt tiêu artifact của Register Tokens |
| | **EXP-B4** | Swin-Transformer-V2-Base + Deformable DETR | Đánh giá Hierarchical ViT cửa sổ dịch chuyển (Shifted Windows) |
| | **EXP-B5** | InternImage-B + Deformable DETR | Đánh giá cơ chế tích chập biến dạng DCNv3 đồng nhất với Deformable Head |
| **Adaptation Study**| **EXP-A1** | Standard PDP (Shared Pool + Private Pool ở Decoder) | Đường cơ sở của cơ chế Prompting theo bài báo gốc |
| | **EXP-A2** | PDP + LoRA ($r=16$) trên Cross-Attention | Khảo sát hiệu quả của việc thích ứng tham số hạng thấp chống quên |
| | **EXP-A3** | PDP + Đóng băng Shared Pool sau Task 1 | Chứng minh vai trò cố định biểu diễn nền tảng chống trôi dạt đặc trưng |
| **Memory Study** | **EXP-M1** | Single Centroid Prototype per class ($K=1$) | Đường cơ sở lưu trữ bộ nhớ đại diện |
| | **EXP-M2** | Multi-Prototype Spherical K-Means ($K=3$) | Chứng minh khả năng bao quát đa góc nhìn bao bì và tăng chất lượng nhãn giả |
| | **EXP-M3** | Energy-based Adaptive Thresholding cho PPG | Tối ưu hóa thu hồi nhãn giả trên các lớp khó và lớp hạt mịn |
| **Data Study** | **EXP-D1** | Huấn luyện thuần trên ảnh Single gốc | Đo lường mức độ suy giảm do định kiến cạnh tranh query (Baseline) |
| | **EXP-D2** | Huấn luyện trên Synthetic Trays (Copy-Paste + Harmonization) | Chứng minh năng lực thu hẹp khoảng cách miền dữ liệu thực tế |
| **Post-Processing** | **EXP-P1** | Đếm sản phẩm dựa trên Raw Detections | Phân tích lỗi do các queries trùng lặp |
| | **EXP-P2** | Đếm sản phẩm kết hợp Class-Agnostic NMS ($\text{IoU} = 0.45$) | Xác định mức tăng vọt của chỉ số cAcc trên toàn bộ các cấp độ khay |

---

### 5.3 Bộ Tiêu chí Đánh giá Nghiệm thu Hệ thống

Một thử nghiệm trong nhánh nghiên cứu độc lập được coi là hoàn thành và đạt tiêu chuẩn khi thỏa mãn các tiêu chí sau:

1. **Về Năng lực Continual Learning:**
   - **Tỷ lệ Quên (Forgetting Measure $F$):**
     $$F = \frac{1}{T-1} \sum_{k=1}^{T-1} \left(\max_{t \in \{1, \dots, T-1\}} mAP_k^t - mAP_k^T\right)$$
     Mục tiêu: Đạt $F \le 0.08$ (tỷ lệ suy giảm hiệu năng trên các lớp cũ dưới $8\%$).
   - **Độ chính xác Cuối kỳ ($mAP_{\text{seen}}$ tại Task 5):**
     Mục tiêu: Duy trì $mAP@50$ trên toàn bộ 200 SKU $\ge 0.85$.
2. **Về Hiệu năng Ứng dụng Bán lẻ (Retail Checkout):**
   - **Chỉ số cAcc Overall (trên toàn bộ tập test):**
     Mục tiêu: Đạt $cAcc \ge 40\%$ với ngưỡng tối ưu tìm từ tập validation.
   - **Chỉ số cAcc Easy:** Đạt $\ge 70\%$.
   - **Sai số đếm trung bình (ACD):** Đạt $ACD \le 1.2$ món/hóa đơn.
3. **Về Tính Ổn định Kỹ thuật:**
   - Hoàn thành đầy đủ chuỗi 5 tasks không phát sinh lỗi tràn bộ nhớ (CUDA Out-of-Memory).
   - Xuất đầy đủ các file checkpoint trọng số, ma trận đặc trưng prototype `.pt`, dự đoán `.npz`, và báo cáo định dạng JSON chuẩn hóa theo quy định trong [[06 - Projects/AutoCheckout/docs/formats|Chuẩn Định dạng Dữ liệu & Metadata]].

---

## 6. Liên kết Hệ sinh thái Tri thức Vault

- [[06 - Projects/AutoCheckout/README|AutoCheckout Hub]]
- [[06 - Projects/AutoCheckout/overview|Tổng quan Dự án AutoCheckout]]
- [[06 - Projects/AutoCheckout/Phân tích PDP cho đồ án thanh toán tự động (RPC)|Báo cáo Phân tích PDP trên RPC]]
- [[06 - Projects/AutoCheckout/docs/Giải thích Paper PDP|Giải thích Toàn diện Paper PDP từ A-Z]]
- [[06 - Projects/AutoCheckout/docs/Codebase README|Hướng dẫn Mã nguồn AutoCheckout-CL]]
- [[06 - Projects/AutoCheckout/docs/formats|Chuẩn Định dạng Dữ liệu & Metadata]]
- [[04 - Notes/Concepts/Computer Vision/Detection Transformer (DETR)|Detection Transformer (DETR)]]
- [[04 - Notes/Concepts/Computer Vision/Hungarian Matching|Hungarian Matching]]
- [[04 - Notes/Concepts/Computer Vision/Feature Pyramid Network (FPN)|Feature Pyramid Network (FPN)]]
- [[04 - Notes/Concepts/Computer Vision/Non-Maximum Suppression (NMS)|Non-Maximum Suppression (NMS)]]
- [[04 - Notes/Concepts/Computer Vision/Intersection over Union (IoU)|Intersection over Union (IoU)]]
- [[04 - Notes/Concepts/Computer Vision/Mean Average Precision (mAP)|Mean Average Precision (mAP)]]