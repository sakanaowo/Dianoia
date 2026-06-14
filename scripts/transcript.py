"""
YouTube Transcript Extractor
Lấy transcript từ video YouTube và export ra nhiều định dạng.

Yêu cầu:
    pip install youtube-transcript-api

Usage:
    python youtube_transcript.py <URL hoặc video_id> [options]

Examples:
    python youtube_transcript.py https://www.youtube.com/watch?v=dQw4w9WgXcQ
    python youtube_transcript.py dQw4w9WgXcQ --lang vi
    python youtube_transcript.py dQw4w9WgXcQ --format srt --output my_sub.srt
    python youtube_transcript.py dQw4w9WgXcQ --format json
    python youtube_transcript.py dQw4w9WgXcQ --list-langs
"""

import argparse
import json
import re
import sys
from pathlib import Path

from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import (
    TranscriptsDisabled,
    NoTranscriptFound,
    YouTubeRequestFailed,
)

# ── Config ────────────────────────────────────────────────────────────────────

DEFAULT_OUTPUT_DIR = Path("/home/sakana/Dianoia/05 - Sources/Videos")


# ── Helpers ───────────────────────────────────────────────────────────────────


def extract_video_id(url_or_id: str) -> str:
    """Trích xuất video ID từ URL hoặc trả về thẳng nếu đã là ID."""
    match = re.search(r"(?:v=|youtu\.be/|embed/|shorts/)([A-Za-z0-9_-]{11})", url_or_id)
    if match:
        return match.group(1)
    if re.fullmatch(r"[A-Za-z0-9_-]{11}", url_or_id):
        return url_or_id
    raise ValueError(f"Không thể nhận diện video ID từ: {url_or_id!r}")


def seconds_to_srt_time(seconds: float) -> str:
    """Chuyển seconds → định dạng SRT (HH:MM:SS,mmm)."""
    ms = int((seconds % 1) * 1000)
    s = int(seconds) % 60
    m = int(seconds) // 60 % 60
    h = int(seconds) // 3600
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


# ── Formatters ────────────────────────────────────────────────────────────────


def to_txt(snippets) -> str:
    """Plain text — chỉ nội dung, không có timestamp."""
    return "\n".join(s.text for s in snippets)


def to_txt_time(snippets) -> str:
    """Plain text kèm timestamp [HH:MM:SS]."""
    lines = []
    for s in snippets:
        h = int(s.start) // 3600
        m = int(s.start) // 60 % 60
        sec = int(s.start) % 60
        lines.append(f"[{h:02d}:{m:02d}:{sec:02d}] {s.text}")
    return "\n".join(lines)


def to_srt(snippets) -> str:
    """Định dạng SRT chuẩn."""
    blocks = []
    for i, s in enumerate(snippets, start=1):
        start = seconds_to_srt_time(s.start)
        end = seconds_to_srt_time(s.start + s.duration)
        blocks.append(f"{i}\n{start} --> {end}\n{s.text}\n")
    return "\n".join(blocks)


def to_json(snippets) -> str:
    """JSON với đầy đủ start / duration / text."""
    data = [
        {"start": s.start, "duration": s.duration, "text": s.text} for s in snippets
    ]
    return json.dumps(data, ensure_ascii=False, indent=2)


def to_md(snippets, fetched=None) -> str:
    """Markdown — YAML front matter + nội dung theo timestamp."""
    from datetime import datetime

    url = f"https://www.youtube.com/watch?v={fetched.video_id}" if fetched else ""
    lang = fetched.language if fetched else ""
    auto = fetched.is_generated if fetched else False

    header = (
        "---\n"
        f'source: "{url}"\n'
        f'language: "{lang}"\n'
        f'status: "processing"\n'
        f"fetched: \"{datetime.now().strftime('%Y-%m-%d')}\"\n"
        "tags:\n"
        "  - video/youtube\n"
        "  - transcript\n"
        "---\n\n"
        "## Transcript\n\n"
    )

    lines = []
    for s in snippets:
        h = int(s.start) // 3600
        m = int(s.start) // 60 % 60
        sec = int(s.start) % 60
        ts = f"{h:02d}:{m:02d}:{sec:02d}"
        yt_link = f"{url}&t={int(s.start)}s" if url else ""
        timestamp_md = f"[{ts}]({yt_link})" if yt_link else f"`{ts}`"
        lines.append(f"{timestamp_md} {s.text}")

    return header + "\n".join(lines)


FORMATTERS = {
    "md": (to_md, ".md"),
    "txt": (to_txt, ".txt"),
    "txt-time": (to_txt_time, ".txt"),
    "srt": (to_srt, ".srt"),
    "json": (to_json, ".json"),
}


# ── Core ──────────────────────────────────────────────────────────────────────


def list_languages(api: YouTubeTranscriptApi, video_id: str) -> None:
    transcript_list = api.list(video_id)
    print(f"\n📋 Transcript có sẵn cho video: {video_id}\n")

    manual = [t for t in transcript_list if not t.is_generated]
    generated = [t for t in transcript_list if t.is_generated]

    if manual:
        print("  Manual (do người tạo upload):")
        for t in manual:
            print(f"    [{t.language_code}] {t.language}")

    if generated:
        print("\n  Auto-generated:")
        for t in generated:
            print(f"    [{t.language_code}] {t.language}")

    print()


def fetch_transcript(
    api: YouTubeTranscriptApi, video_id: str, lang_priority: list[str]
):
    """
    Lấy transcript theo thứ tự ưu tiên ngôn ngữ.
    Trả về FetchedTranscript object.
    """
    transcript_list = api.list(video_id)

    # Ưu tiên manual trước, fallback sang auto-generated
    try:
        t = transcript_list.find_manually_created_transcript(lang_priority)
    except NoTranscriptFound:
        t = transcript_list.find_generated_transcript(lang_priority)

    return t.fetch()


# ── Runner ────────────────────────────────────────────────────────────────────


def run(args: argparse.Namespace) -> None:
    video_id = extract_video_id(args.url)
    print(f"🎬 Video ID : {video_id}")

    api = YouTubeTranscriptApi()

    if args.list_langs:
        list_languages(api, video_id)
        return

    lang_priority = [l.strip() for l in args.lang.split(",")]
    print(f"🌐 Ngôn ngữ ưu tiên : {lang_priority}")

    fetched = fetch_transcript(api, video_id, lang_priority)
    print(
        f"✅ Đã lấy [{fetched.language_code}] '{fetched.language}' "
        f"({'auto' if fetched.is_generated else 'manual'}) — {len(fetched)} dòng"
    )

    formatter, default_ext = FORMATTERS[args.format]
    content = formatter(fetched, fetched) if args.format == "md" else formatter(fetched)

    if args.output:
        out_path = Path(args.output)
    else:
        safe_id = re.sub(r"[^\w-]", "_", video_id)
        out_path = DEFAULT_OUTPUT_DIR / f"transcript_{safe_id}{default_ext}"

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(content, encoding="utf-8")
    print(f"💾 Đã lưu : {out_path.resolve()}  ({out_path.stat().st_size:,} bytes)")


# ── CLI ───────────────────────────────────────────────────────────────────────


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Lấy transcript YouTube và export ra file.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("url", help="URL hoặc video ID của YouTube")
    parser.add_argument(
        "--lang",
        default="vi,en",
        help="Ngôn ngữ ưu tiên, phân cách bằng dấu phẩy. Mặc định: vi,en",
    )
    parser.add_argument(
        "--format",
        choices=FORMATTERS.keys(),
        default="md",
        help="Định dạng output: md | txt | txt-time | srt | json  (mặc định: md)",
    )
    parser.add_argument(
        "--output",
        "-o",
        default=None,
        help="Đường dẫn file output (mặc định: lưu vào DEFAULT_OUTPUT_DIR/transcript_<id>.<ext>)",
    )
    parser.add_argument(
        "--list-langs",
        action="store_true",
        help="Liệt kê tất cả ngôn ngữ transcript có sẵn rồi thoát",
    )
    return parser


if __name__ == "__main__":
    parser = build_parser()
    args = parser.parse_args()
    try:
        run(args)
    except TranscriptsDisabled:
        print("❌ Video này đã tắt transcript.")
        sys.exit(1)
    except NoTranscriptFound as e:
        print(f"❌ Không tìm thấy transcript cho ngôn ngữ đã chọn.\n   {e}")
        sys.exit(1)
    except YouTubeRequestFailed as e:
        print(f"❌ Lỗi kết nối YouTube: {e}")
        sys.exit(1)
    except ValueError as e:
        print(f"❌ {e}")
        sys.exit(1)
