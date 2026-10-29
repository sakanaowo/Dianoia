#!/usr/bin/env python3
"""
Lightweight validator for διάνοια.

Checks:
- Expected top-level README.md files.
- Durable notes under 04 - Notes missing YAML frontmatter.
- Knowledge notes carrying a `status` field (only 06 - Projects may use it).
- Embeds still using default `Pasted image ...` names.
- Atomic notes with no inbound links.
- Broken Obsidian wikilinks, summarized by default (stubs are allowed).
  Run with --links to list every broken target.

This script is intentionally conservative. Treat output as warnings, not absolute truth.
"""

from __future__ import annotations

import re
import sys
from collections import Counter
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
    ".agents",
    ".codex",
    ".codex-log",
    ".workspace-plus-plus",
    "__pycache__",
    "98 - Attachments",
}

# Files whose wikilinks are examples or placeholders, not real references.
LINK_CHECK_SKIP = {"README.md", "AGENTS.md"}
LINK_CHECK_SKIP_DIRS = {"99 - Templates"}

WIKILINK_RE = re.compile(r"\[\[([^\]]+)\]\]")
PASTED_IMAGE_RE = re.compile(r"!\[\[(Pasted image [^\]|]+)")
STATUS_RE = re.compile(r"^status:", re.MULTILINE)
PROJECT_TYPE_RE = re.compile(r"^type:\s*project\s*$", re.MULTILINE)


def iter_markdown_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*.md"):
        if any(part in IGNORE_DIRS for part in path.relative_to(ROOT).parts):
            continue
        files.append(path)
    return files


def normalize_link_target(raw: str) -> str:
    target = raw.split("|", 1)[0]
    target = target.split("#", 1)[0]
    # Inside tables the alias pipe is escaped as `\|`.
    target = target.strip().removesuffix("\\")
    if target.endswith(".md"):
        target = target[:-3]
    return target


def frontmatter(text: str) -> str:
    if not (text.startswith("---\n") or text.startswith("---\r\n")):
        return ""
    end_idx = text.find("\n---", 4)
    return text[4:end_idx] if end_idx != -1 else ""


def extract_aliases(text: str) -> list[str]:
    aliases = []
    match = re.search(r"aliases:\s*\n((?:\s*-\s*[^\n]+\n?)+)", frontmatter(text))
    if match:
        for line in match.group(1).splitlines():
            line = line.strip()
            if line.startswith("-"):
                alias = line[1:].strip().strip("\"'")
                if alias:
                    aliases.append(alias)
    return aliases


def build_note_index(files: list[Path], texts: dict[Path, str]) -> dict[str, Path]:
    """Map every name a note can be linked by (stem, path, alias) to the note."""
    index: dict[str, Path] = {}
    for path in files:
        index.setdefault(path.stem, path)
        index.setdefault(str(path.relative_to(ROOT).with_suffix("")), path)
        for alias in extract_aliases(texts[path]):
            index.setdefault(alias, path)
    return index


def build_attachment_index() -> set[str]:
    att_dir = ROOT / "98 - Attachments"
    if not att_dir.exists():
        return set()
    return {p.name for p in att_dir.iterdir() if p.is_file()} | {
        p.stem for p in att_dir.iterdir() if p.is_file()
    }


def skip_link_check(path: Path) -> bool:
    rel = path.relative_to(ROOT)
    return str(rel) in LINK_CHECK_SKIP or rel.parts[0] in LINK_CHECK_SKIP_DIRS


def check_readmes() -> list[str]:
    warnings: list[str] = []
    for rel in EXPECTED_READMES:
        if not (ROOT / rel).exists():
            warnings.append(f"Missing README: {rel}")
    return warnings


def check_note_frontmatter(files: list[Path], texts: dict[Path, str]) -> list[str]:
    warnings: list[str] = []
    notes_root = ROOT / "04 - Notes"
    for path in files:
        if not path.is_relative_to(notes_root) or path.name == "README.md":
            continue
        if not frontmatter(texts[path]):
            warnings.append(
                f"Durable note may need frontmatter: {path.relative_to(ROOT)}"
            )
    return warnings


def check_status_field(files: list[Path], texts: dict[Path, str]) -> list[str]:
    warnings: list[str] = []
    projects_root = ROOT / "06 - Projects"
    for path in files:
        fm = frontmatter(texts[path])
        if path.is_relative_to(projects_root) or PROJECT_TYPE_RE.search(fm):
            continue
        if STATUS_RE.search(fm):
            warnings.append(
                f"Knowledge note should not have status: {path.relative_to(ROOT)}"
            )
    return warnings


def check_pasted_images(files: list[Path], texts: dict[Path, str]) -> list[str]:
    warnings: list[str] = []
    for path in files:
        count = len(PASTED_IMAGE_RE.findall(texts[path]))
        if count:
            warnings.append(
                f"{count} image(s) need meaningful names: {path.relative_to(ROOT)}"
            )
    return warnings


def collect_links(
    files: list[Path],
    texts: dict[Path, str],
    note_index: dict[str, Path],
    attachment_index: set[str],
) -> tuple[Counter[Path], Counter[str]]:
    """Return inbound link counts per note and broken link targets."""
    inbound: Counter[Path] = Counter()
    broken: Counter[str] = Counter()
    for path in files:
        for match in WIKILINK_RE.finditer(texts[path]):
            target = normalize_link_target(match.group(1))
            if not target or target in {"...", "TODO", "TBD"}:
                continue
            linked = note_index.get(target) or note_index.get(Path(target).name)
            if linked is not None:
                if linked != path:
                    inbound[linked] += 1
            elif target not in attachment_index and not skip_link_check(path):
                broken[target] += 1
    return inbound, broken


def check_orphan_atomics(files: list[Path], inbound: Counter[Path]) -> list[str]:
    atomic_root = ROOT / "04 - Notes" / "Atomic"
    return [
        f"Atomic note has no inbound links: {path.relative_to(ROOT)}"
        for path in files
        if path.is_relative_to(atomic_root) and inbound[path] == 0
    ]


def main() -> int:
    show_links = "--links" in sys.argv[1:]

    files = iter_markdown_files()
    texts = {p: p.read_text(encoding="utf-8", errors="ignore") for p in files}
    note_index = build_note_index(files, texts)
    inbound, broken = collect_links(files, texts, note_index, build_attachment_index())

    warnings = []
    warnings.extend(check_readmes())
    warnings.extend(check_note_frontmatter(files, texts))
    warnings.extend(check_status_field(files, texts))
    warnings.extend(check_pasted_images(files, texts))
    warnings.extend(check_orphan_atomics(files, inbound))

    if warnings:
        print("Vault check warnings:")
        for warning in warnings:
            print(f"- {warning}")
    else:
        print("Vault check passed: no obvious warnings.")

    if broken:
        print(
            f"\nUnresolved wikilinks: {len(broken)} targets, "
            f"{sum(broken.values())} occurrences (stubs are allowed)."
        )
        if show_links:
            for target, count in broken.most_common():
                print(f"- [[{target}]] x{count}")
        else:
            print("Run with --links to list them.")

    return 1 if warnings else 0


if __name__ == "__main__":
    raise SystemExit(main())
