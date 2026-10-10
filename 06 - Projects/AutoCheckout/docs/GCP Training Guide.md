---
type: project
status: active
domains:
  - "[[Computing]]"
tags:
  - project
  - autocheckout
  - gcp
  - cloud-gpu
  - guide
created: 2026-10-01
updated: 2026-10-05
aliases:
  - Hướng dẫn Vận hành Máy ảo GCP — AutoCheckout-CL
  - GCP Training Guide
---

# Hướng dẫn Vận hành Máy ảo GCP — AutoCheckout-CL

Tài liệu hướng dẫn vận hành máy ảo GPU đám mây (Google Cloud Platform) phục vụ huấn luyện và đánh giá thực nghiệm cho dự án [[06 - Projects/AutoCheckout/README|AutoCheckout-CL]].

---

## 1. Thông số Kỹ thuật Hệ thống

| Tham số | Chi tiết Cấu hình |
| :--- | :--- |
| **Tên máy ảo / Zone** | `auto-cl` / `us-central1-c` |
| **Loại máy** | `g2-standard-4` (4 vCPU, 16 GB RAM) |
| **GPU** | 1 x **NVIDIA L4** (24 GB VRAM, Ada Lovelace, Compute Capability 8.9) |
| **Chế độ Cấp phát** | Spot VM (tiết kiệm chi phí, có khả năng bị thu hồi) hoặc Standard On-demand |
| **Ổ đĩa** | 100 GB `pd-balanced` NVMe SSD |
| **Hệ điều hành & Driver** | Ubuntu 22.04 LTS, NVIDIA Driver 580.x, CUDA 12.x |
| **Môi trường Python** | Python 3.10.12, PyTorch 2.2.2 + cu121 |

Các biến môi trường chuẩn hóa trong `~/.bashrc`:

```bash
export PROJ=~/AutoCheckout-CL        # Thư mục mã nguồn git
export DATA=/data/rpc                # Dữ liệu tập RPC
export RUNS=/data/runs               # Kết quả huấn luyện và checkpoint
export VENV=~/venvs/pdp              # Môi trường ảo Python
```

---

## 2. Thao tác Điều khiển Máy ảo từ Máy tính Cá nhân

Cấu hình alias gcloud tiện ích:

```bash
GC=(--zone=us-central1-c --project=project-95a0d104-9d0f-4aa1-ba0)
```

### Khởi động và Đăng nhập SSH

```bash
# Khởi động máy ảo
gcloud compute instances start auto-cl "${GC[@]}"

# Đăng nhập SSH
gcloud compute ssh auto-cl "${GC[@]}"
```

### Tắt Máy ảo và Kiểm tra Trạng thái

```bash
# Tắt máy ảo khi không sử dụng để tiết kiệm ngân sách
gcloud compute instances stop auto-cl "${GC[@]}"

# Kiểm tra trạng thái máy ảo
gcloud compute instances describe auto-cl "${GC[@]}" --format="value(status,scheduling.provisioningModel)"
```

### Chuyển đổi giữa Chế độ Spot và Standard

```bash
# Chuyển sang Spot (khi VM đang tắt)
gcloud compute instances set-scheduling auto-cl "${GC[@]}" \
  --provisioning-model=SPOT --preemptible --instance-termination-action=STOP --no-restart-on-failure

# Chuyển về Standard On-demand
gcloud compute instances set-scheduling auto-cl "${GC[@]}" \
  --provisioning-model=STANDARD --no-preemptible --clear-instance-termination-action --restart-on-failure
```

---

## 3. Thiết lập Môi trường & Build Custom CUDA Kernel

Sau khi SSH vào máy ảo, chạy kịch bản cài đặt tự động một lần:

```bash
bash ~/AutoCheckout-CL/scripts/setup_vm.sh
```

Kịch bản thực hiện các bước:
1. Tạo thư mục dữ liệu `/data/rpc` và `/data/runs`.
2. Khởi tạo môi trường ảo Python và cài đặt PyTorch với CUDA 12.1.
3. Cài đặt các gói phụ thuộc từ `requirements.txt` và thư viện `autocheckout` (`pip install -e .`).
4. Biên dịch Custom MultiScale Deformable Attention CUDA Kernel tối ưu cho kiến trúc L4 (`TORCH_CUDA_ARCH_LIST=8.9`).
5. Chạy toàn bộ test suite để xác minh kernel và môi trường:
   ```bash
   pytest tests/test_pdp_f11_kernel.py
   ```

---

## 4. Chuẩn bị Dữ liệu RPC trên Máy ảo

```bash
# 1. Thiết lập Kaggle API key
mkdir -p ~/.kaggle
cp /path/to/kaggle.json ~/.kaggle/ && chmod 600 ~/.kaggle/kaggle.json

# 2. Tải và giải nén dữ liệu RPC
bash ~/AutoCheckout-CL/scripts/download_rpc.sh

# 3. Chạy tiền xử lý dữ liệu và tạo split task chuẩn hóa
bash ~/AutoCheckout-CL/scripts/prepare_data.sh
```

---

## 5. Quy trình Chạy Thử nghiệm Dài hạn với Tmux

Để tránh việc ngắt kết nối SSH làm gián đoạn quá trình huấn luyện:

```bash
# Tạo session tmux mới
tmux new -s train_pdp

# Kích hoạt môi trường và chạy thử nghiệm
source ~/venvs/pdp/bin/activate
cd ~/AutoCheckout-CL
bash scripts/run_exp.sh configs/exp/EXP_NAME.sh

# Thoát session (Detach): Nhấn tổ hợp Ctrl+B rồi nhấn D
# Kết nối lại session (Attach):
tmux attach -t train_pdp
```

---

## 6. Liên kết Hệ sinh thái Tri thức Vault

- [[06 - Projects/AutoCheckout/README|AutoCheckout Hub]]
- [[06 - Projects/AutoCheckout/TODO|Kế hoạch Nghiên cứu & Action Items]]
- [[06 - Projects/AutoCheckout/docs/Codebase README|Hướng dẫn Mã nguồn AutoCheckout-CL]]
- [[06 - Projects/AutoCheckout/docs/formats|Chuẩn Định dạng Dữ liệu & Metadata]]
- [[06 - Projects/AutoCheckout/docs/Giải thích Paper PDP|Giải thích Toàn diện Paper PDP từ A-Z]]
