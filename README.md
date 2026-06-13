# Agent Setup

Bộ cấu hình này giúp một Codex agent làm việc an toàn và nhất quán trong Obsidian vault `διάνοια`.

## Thành phần

```text
AGENTS.md
.codex/config.toml
.agents/skills/
scripts/check_vault.py
docs/codex-agent-setup.md
```

## Cách dùng nhanh

1. Copy toàn bộ nội dung trong thư mục này vào root của Obsidian vault.
2. Mở terminal tại root vault.
3. Chạy kiểm tra:

```bash
python scripts/check_vault.py
```

4. Mở Codex tại root vault và hỏi:

```text
Summarize the active instructions and available vault skills.
```

## Ghi chú

- `AGENTS.md` là hướng dẫn bền vững cho Codex trong vault.
- `.agents/skills/` chứa các workflow lặp lại, ví dụ tạo atomic note, xây MOC, xử lý source note.
- `.codex/config.toml` đặt sandbox, approval policy và fallback filenames.
- `scripts/check_vault.py` kiểm tra README thiếu, wikilink có thể bị gãy và frontmatter thiếu ở note quan trọng.
