---
type: project
status: active
created: 2026-10-01
updated: 2026-10-01
domains:
  - "[[Computing]]"
themes:
  - "[[Technology and Humanity]]"
  - "[[Learning and Intelligence]]"
tags:
  - project
  - computer-vision
  - continual-learning
  - object-detection
  - retail-ai
aliases:
  - AutoCheckout
  - AutoCheckout-CL
---

# AutoCheckout-CL — Hệ thống Thanh toán Tự động với Học liên tục

Dự án nghiên cứu và phát triển giải pháp nhận diện sản phẩm tại quầy thanh toán tự động thông minh (*Smart Retail Checkout*) dựa trên bài toán **Học tăng dần theo lớp không lưu dữ liệu cũ (Replay-Free Class-Incremental Object Detection - IOD)**.

---

## 1. Mục tiêu Dự án (Project Goals)

1. **Ứng dụng thực tế quầy thu ngân (Smart Retail):**
   - Camera góc nhìn từ trên xuống (*top-down view*) chụp ảnh khay hàng chứa nhiều sản phẩm (bánh kẹo, đồ hộp, nước giải khát).
   - Tự động phát hiện vị trí (Bounding Box), phân loại mã sản phẩm (SKU), đếm số lượng và tính tiền hóa đơn với độ chính xác cao.
2. **Giải quyết bài toán Học liên tục (Continual Learning):**
   - Tiếp nhận các đợt hàng mới (Task) mà không cần huấn luyện lại từ đầu (*no offline retraining*).
   - **Replay-Free:** Tuyệt đối không lưu trữ ảnh cũ của các đợt nhập hàng trước.
   - **Chống quên thảm khốc (*Catastrophic Forgetting*):** Giữ vững độ chính xác trên các mặt hàng cũ khi học mặt hàng mới.
3. **Bộ chỉ số đo lường chuẩn bán lẻ:**
   - Đánh giá học thuật: $mAP@P$ (lớp cũ), $mAP@C$ (lớp mới), $mAP@A$ (toàn bộ lớp).
   - Đánh giá thực chiến: **cAcc** (Checkout Accuracy — tỷ lệ khay hàng tính đúng 100%) và **ACD** (Average Counting Distance — số lượng món đếm lệch trung bình).

---

## 2. Bản đồ Tài liệu & Cấu trúc Dự án

```text
06 - Projects/AutoCheckout/
├── README.md                                           — Hub điều phối trung tâm dự án trong Vault
├── overview.md                                         — Tổng quan bài toán, cầu nối d2l.ai và giải mã Paper PDP (CVPR 2026)
├── TODO.md                                             — Kế hoạch nghiên cứu, cơ sở lý thuyết toán học và lộ trình thử nghiệm
├── Phân tích PDP cho đồ án thanh toán tự động (RPC).md — Báo cáo phân tích chuyên sâu tính tương thích của PDP trên 200 SKU
└── docs/
    ├── Agent Handoff & System Context.md               — Báo cáo chuyển giao tri thức toàn diện cho agent kế tiếp
    ├── Codebase README.md                              — Hướng dẫn cấu trúc kho mã nguồn tại /home/sakana/Code/AutoCheckout-CL
    ├── formats.md                                      — Quy ước định dạng dữ liệu, thư mục và file annotation COCO
    └── Giải thích Paper PDP.md                         — Cẩm nang giải mã toàn diện bài báo PDP (CVPR 2026) từ A-Z
```

---

## 3. Kiến trúc Cốt lõi & Paper Nền tảng (Baseline PDP - CVPR 2026)

Hệ thống kế thừa và cải tiến từ bài báo *Beyond Prompt Degradation: Prototype-guided Dual-pool Prompting for Incremental Object Detection (PDP)*:

- **Mô hình nền tảng:** Deformable DETR (Query-based detection, Hungarian Bipartite Matching, không cần NMS).
- **DDP (Decoupled Dual-Pool Prompting):** 
  - *Shared Pool ($P_s$):* Học đặc trưng khái quát xuyên suốt các task.
  - *Private Pool ($P_p$):* Học đặc trưng riêng cho từng SKU của task hiện tại, sau đó đóng băng vĩnh viễn để chống quên.
  - *Hàm mất mát trực giao $L_{DDL}$:* Ép hai kho prompt không giẫm chân nhau.
- **PPG (Prototypical Pseudo-Label Generation):**
  - Teacher model $\Phi_{t-1}$ rà soát ảnh task mới để tìm sản phẩm cũ.
  - Lọc nhãn giả 2 tầng: kết hợp điểm tự tin (*confidence score*) với độ tương đồng Cosine của **Class Prototype** để cứu các vật thể bị che khuất, ngăn chặn triệt để hiện tượng *Prompt Drift*.

---

## 4. Các Trọng tâm Cải tiến Đang Triển khai

1. **Cải thiện kiến trúc mô hình:** Nâng cấp Backbone thị giác nhận diện bao bì siêu chi tiết (*fine-grained*) và tinh chỉnh cơ chế Prompt Tuning / Adapter.
2. **Nghiên cứu đối sánh mô hình Continual Learning:** Khảo sát các kiến trúc IOD mới nhất (IncDET, CL-DETR, OW-DETR, Foundation Model Adapters).
3. **Thử nghiệm Train 1 vật thể - Test khay nhiều vật thể:** Đánh giá tính khả thi khi nhập hàng (chỉ chụp ảnh đơn từng món) và giải pháp khắc phục Domain Gap bằng tổng hợp dữ liệu (*Copy-Paste Augmentation*).

---

## 5. Kết nối Hệ sinh thái Tri thức Vault

- **Domains liên quan:** `[[Computing]]`
- **Concepts nền tảng:**
  - *Thị giác máy tính & Phát hiện vật thể:* [[Object Detection]], [[Bounding Box]], [[Intersection over Union (IoU)]], [[Anchor Box]], [[Non-Maximum Suppression (NMS)]], [[Mean Average Precision (mAP)]].
  - *Transformer in Vision:* [[Detection Transformer (DETR)]], Deformable DETR, Object Queries, Hungarian Matching, Cross-Attention.
  - *Continual Learning:* Catastrophic Forgetting, Stability-Plasticity Dilemma, Replay-Free, Prefix-Tuning.
  - *Metric Learning & Representation:* Class Prototypes, Cosine Similarity, Feature Drift.
