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


def extract_aliases(text: str) -> list[str]:
    aliases = []
    if not (text.startswith("---\n") or text.startswith("---\r\n")):
        return aliases
    end_idx = text.find("\n---", 4)
    if end_idx == -1:
        return aliases
    fm = text[4:end_idx]
    match = re.search(r"aliases:\s*\n((?:\s*-\s*[^\n]+\n?)+)", fm)
    if match:
        for line in match.group(1).splitlines():
            line = line.strip()
            if line.startswith("-"):
                alias = line[1:].strip().strip("\"'")
                if alias:
                    aliases.append(alias)
    return aliases


def build_note_index(files: list[Path]) -> set[str]:
    stems: set[str] = set()
    rel_without_suffix: set[str] = set()
    aliases: set[str] = set()

    for path in files:
        rel = path.relative_to(ROOT).with_suffix("")
        stems.add(path.stem)
        rel_without_suffix.add(str(rel))
        text = path.read_text(encoding="utf-8", errors="ignore")
        for alias in extract_aliases(text):
            aliases.add(alias)

    return stems | rel_without_suffix | aliases


def check_readmes() -> list[str]:
    warnings: list[str] = []
    for rel in EXPECTED_READMES:
        if not (ROOT / rel).exists():
            warnings.append(f"Missing README: {rel}")
    return warnings


def build_attachment_index() -> set[str]:
    att_dir = ROOT / "98 - Attachments"
    if not att_dir.exists():
        return set()
    return {p.name for p in att_dir.iterdir() if p.is_file()} | {
        p.stem for p in att_dir.iterdir() if p.is_file()
    }


def check_wikilinks(
    files: list[Path], note_index: set[str], attachment_index: set[str]
) -> list[str]:
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

            if target not in note_index and target not in attachment_index:
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
    attachment_index = build_attachment_index()

    warnings = []
    warnings.extend(check_readmes())
    warnings.extend(check_wikilinks(files, note_index, attachment_index))
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
