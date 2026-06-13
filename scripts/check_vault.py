#!/usr/bin/env python3
"""
Lightweight validator for διάνοια.

Checks:
- Expected top-level README.md files.
- Potentially broken Obsidian wikilinks.
- Durable notes under 04 - Notes missing YAML frontmatter.

This script is intentionally conservative. Treat output as warnings, not absolute truth.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

EXPECTED_READMES = [
    "README.md",
    "00 - Inbox/README.md",
    "01 - Home & Maps/README.md",
    "02 - Domains/README.md",
    "03 - Themes/README.md",
    "04 - Notes/README.md",
    "05 - Sources/README.md",
    "06 - Projects/README.md",
    "07 - Outputs/README.md",
    "08 - Review/README.md",
    "98 - Attachments/README.md",
    "99 - Templates/README.md",
]

IGNORE_DIRS = {
    ".git",
    ".obsidian",
    ".codex",
    ".codex-log",
    "__pycache__",
    "98 - Attachments",
}

WIKILINK_RE = re.compile(r"\[\[([^\]]+)\]\]")


def iter_markdown_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*.md"):
        if any(part in IGNORE_DIRS for part in path.parts):
            continue
        files.append(path)
    return files


def normalize_link_target(raw: str) -> str:
    target = raw.split("|", 1)[0]
    target = target.split("#", 1)[0]
    return target.strip()


def build_note_index(files: list[Path]) -> set[str]:
    stems: set[str] = set()
    rel_without_suffix: set[str] = set()

    for path in files:
        rel = path.relative_to(ROOT).with_suffix("")
        stems.add(path.stem)
        rel_without_suffix.add(str(rel))

    return stems | rel_without_suffix


def check_readmes() -> list[str]:
    warnings: list[str] = []
    for rel in EXPECTED_READMES:
        if not (ROOT / rel).exists():
            warnings.append(f"Missing README: {rel}")
    return warnings


def check_wikilinks(files: list[Path], note_index: set[str]) -> list[str]:
    warnings: list[str] = []

    for path in files:
        text = path.read_text(encoding="utf-8", errors="ignore")
        for match in WIKILINK_RE.finditer(text):
            raw = match.group(1)
            target = normalize_link_target(raw)

            if not target:
                continue

            if target in {"...", "TODO", "TBD"}:
                continue

            if target not in note_index:
                rel = path.relative_to(ROOT)
                warnings.append(f"Possible broken wikilink in {rel}: [[{raw}]]")

    return warnings


def has_frontmatter(text: str) -> bool:
    return text.startswith("---\n") or text.startswith("---\r\n")


def check_note_frontmatter(files: list[Path]) -> list[str]:
    warnings: list[str] = []

    notes_root = ROOT / "04 - Notes"
    if not notes_root.exists():
        return warnings

    for path in files:
        try:
            path.relative_to(notes_root)
        except ValueError:
            continue

        if path.name == "README.md":
            continue

        text = path.read_text(encoding="utf-8", errors="ignore")
        if not has_frontmatter(text):
            warnings.append(
                f"Durable note may need frontmatter: {path.relative_to(ROOT)}"
            )

    return warnings


def main() -> int:
    files = iter_markdown_files()
    note_index = build_note_index(files)

    warnings = []
    warnings.extend(check_readmes())
    warnings.extend(check_wikilinks(files, note_index))
    warnings.extend(check_note_frontmatter(files))

    if not warnings:
        print("Vault check passed: no obvious warnings.")
        return 0

    print("Vault check warnings:")
    for warning in warnings:
        print(f"- {warning}")

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
