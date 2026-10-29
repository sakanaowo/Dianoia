---
type: project
status: active
domains:
  - "[[Computing]]"
tags:
  - project
  - autocheckout
  - codebase
  - setup
created: 2026-10-01
updated: 2026-10-02
aliases:
  - Hướng dẫn Mã nguồn AutoCheckout-CL
  - Codebase README
---

# Hướng dẫn Mã nguồn AutoCheckout-CL

Tài liệu kỹ thuật hướng dẫn cấu trúc mã nguồn, thiết lập môi trường và chạy kiểm thử (Unit test) cho kho lưu trữ mã nguồn tại `/home/sakana/Code/AutoCheckout-CL`.

---

## 1. Giới thiệu Dự án

- **Bài toán:** Hệ thống thanh toán tự động tại quầy thu ngân thông minh bằng camera quan sát từ trên xuống (top-down view). Nhận diện từng sản phẩm trên khay, không dùng mã vạch thủ công, tự động đếm số lượng và in hóa đơn.
- **Học tăng dần (Continual Learning):** Khi cửa hàng nhập thêm sản phẩm mới (SKU), mô hình tiếp thu các lớp mới mà không cần huấn luyện lại từ đầu (*Offline Retraining*), không lưu trữ hình ảnh của các đợt nhập hàng trước (*Replay-Free*), và chống hiện tượng quên các sản phẩm cũ (*Mitigate Catastrophic Forgetting*).
- **Tập dữ liệu:** RPC (Retail Product Checkout): 200 SKU, 30.000 ảnh quầy có gắn nhãn bounding box.
- **Phương pháp cốt lõi:** PDP (*Beyond Prompt Degradation: Prototype-guided Dual-pool Prompting for Incremental Object Detection*, CVPR 2026), đã được sửa đổi và tinh chỉnh chuyên sâu cho dữ liệu bán lẻ RPC.

---

## 2. Cấu trúc Thư mục Mã nguồn

```text
/home/sakana/Code/AutoCheckout-CL/
├── pdp/           Code PDP_IOD (mô hình Deformable DETR, Dual-pool Prompting, PPG)
├── autocheckout/  Thư viện dùng chung: cấu hình task, lưu trữ file dự đoán, tính toán chỉ số mAP và cAcc
├── tools/         Công cụ chuẩn bị dữ liệu (DL1–DL6) và đánh giá kiểm thử (V1–V6)
├── baselines/     Mô hình đối chuẩn truy xuất đặc trưng DINOv2
├── configs/       Cấu hình chia task, chia tập train/val/test và script cấu hình thí nghiệm
├── scripts/       Script tự động cài đặt VM trên GCP, tải và tiền xử lý dữ liệu
└── tests/         Hệ thống unit test và smoke test chạy trên CPU
```

---

## 3. Cài đặt Môi trường & Chạy Test trên CPU

```bash
# 1. Khởi tạo và kích hoạt môi trường ảo Python
python3.10 -m venv .venv
source .venv/bin/activate

# 2. Cài đặt PyTorch và Torchvision phù hợp
pip install torch==2.2.2 torchvision==0.17.2

# 3. Cài đặt các gói phụ thuộc và thư viện autocheckout
pip install -r requirements.txt -r requirements-dev.txt
pip install -e .

# 4. Chạy kiểm thử toàn bộ hệ thống
pytest
```

*Lưu ý:* Quá trình chạy pytest mất khoảng 2 phút trên CPU; có 3 bài test liên quan đến custom CUDA kernel sẽ tự động bỏ qua nếu không phát hiện GPU.

---

## 4. Nguồn Gốc và Giấy Phép Bản Quyền

- Thư mục `pdp/` được phát triển kế thừa từ mã nguồn nghiên cứu [zyt95579/PDP_IOD](https://github.com/zyt95579/PDP_IOD) (commit `7702d91`). Nền tảng dựa trên [MD-DETR](https://github.com/GauravBh1010tt/MD-DETR) và Deformable DETR của Hugging Face Transformers (Apache 2.0). Mã nguồn được sử dụng cho mục đích học tập, nghiên cứu và phi thương mại.
- Tập dữ liệu RPC tuân thủ giấy phép CC BY-NC-SA 4.0 và không được lưu trữ trực tiếp trên kho mã nguồn git.

---

## 5. Tài liệu Liên quan trong Vault

- [[06 - Projects/AutoCheckout/README|AutoCheckout Hub]]
- [[06 - Projects/AutoCheckout/overview|Tổng quan Dự án AutoCheckout]]
- [[06 - Projects/AutoCheckout/Phân tích PDP cho đồ án thanh toán tự động (RPC)|Báo cáo Phân tích PDP trên RPC]]
- [[06 - Projects/AutoCheckout/docs/Giải thích Paper PDP|Giải thích Chi tiết Paper PDP]]
- [[06 - Projects/AutoCheckout/docs/formats|Quy ước Định dạng Dữ liệu formats.md]]
