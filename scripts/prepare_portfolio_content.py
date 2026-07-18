from __future__ import annotations

import json
import shutil
from pathlib import Path


BASE = Path(__file__).resolve().parents[1]
EXTRACTED = BASE / "content-extracted"
DOCS = BASE / "content" / "BT NMCNS"
SITE = BASE / "source" / "awwwards-rebuilt-furrow-main"


PROJECTS = [
    {
        "id": 1,
        "source": "BT1",
        "slug": "quan-ly-tep-thu-muc",
        "title": "Quản lý tệp & thư mục",
        "shortTitle": "File system",
        "eyebrow": "Digital foundations",
        "summary": "Thực hành tổ chức dữ liệu trên Windows: tạo, đổi tên, sao chép, di chuyển, xoá và khôi phục tệp một cách có hệ thống.",
        "highlight": "Từ một thư mục trống đến quy trình quản lý tệp hoàn chỉnh, có minh chứng cho từng thao tác.",
        "tools": ["Windows", "File Explorer", "Data organization"],
        "cover": "image18.png",
        "start_after": None,
    },
    {
        "id": 2,
        "source": "BT2",
        "slug": "tu-vung-kinh-te-nga",
        "title": "Tiếng Anh trong từ vựng kinh tế Nga",
        "shortTitle": "English → Russian",
        "eyebrow": "Research literacy",
        "summary": "Xây dựng và đánh giá hệ thống nguồn học thuật cho chủ đề ảnh hưởng của tiếng Anh lên từ vựng kinh tế trong tiếng Nga đương đại.",
        "highlight": "Đối chiếu nguồn Nga, chuyển tự Latinh và tiêu chí độ tin cậy để tạo nền tảng nghiên cứu có thể kiểm chứng.",
        "tools": ["Academic research", "Source evaluation", "Russian linguistics"],
        "cover": None,
        "start_after": "Sự ảnh hưởng của tiếng Anh đối với từ vựng kinh tế trong tiếng Nga đương đại",
    },
    {
        "id": 3,
        "source": "BT3",
        "slug": "prompt-engineering-hoc-tap",
        "title": "Prompt Engineering cho học tập",
        "shortTitle": "Prompt design",
        "eyebrow": "Human × AI",
        "summary": "Thử nghiệm ba cấp độ prompt qua các tác vụ tóm tắt, giải thích khái niệm và tạo câu hỏi ôn tập.",
        "highlight": "So sánh đầu ra thực tế để chỉ ra vì sao vai trò, bối cảnh và định dạng đầu ra làm prompt tốt hơn.",
        "tools": ["ChatGPT", "Prompt Engineering", "Learning design"],
        "cover": "image11.png",
        "start_after": "ỨNG DỤNG PROMPT ENGINEERING TRONG HỖ TRỢ HỌC TẬP BẰNG AI",
    },
    {
        "id": 4,
        "source": "BT4",
        "slug": "hop-tac-truc-tuyen",
        "title": "Hợp tác trực tuyến cho dự án nhóm",
        "shortTitle": "Team workflow",
        "eyebrow": "Digital collaboration",
        "summary": "Thiết kế quy trình làm việc nhóm một tuần bằng Trello, Google Docs, Drive và Discord với vai trò trưởng nhóm.",
        "highlight": "Một hệ thống phối hợp rõ người, rõ việc, rõ phiên bản và có nhịp cập nhật xuyên suốt dự án.",
        "tools": ["Trello", "Google Docs", "Google Drive", "Discord"],
        "cover": "image3.png",
        "start_after": "SỬ DỤNG CÔNG CỤ HỢP TÁC TRỰC TUYẾN CHO DỰ ÁN NHÓM",
    },
    {
        "id": 5,
        "source": "BT5",
        "slug": "ai-tao-sinh-noi-dung",
        "title": "AI tạo sinh & sáng tạo nội dung",
        "shortTitle": "Creative AI",
        "eyebrow": "Creative direction",
        "summary": "Phối hợp Gemini, Midjourney và Canva AI để phát triển bài thuyết trình về vượt qua nỗi sợ giao tiếp ngoại ngữ.",
        "highlight": "AI tạo nguyên liệu; con người biên tập, phản biện và quyết định để nội dung có cảm xúc và đúng mục tiêu.",
        "tools": ["Gemini", "Midjourney", "Canva AI"],
        "cover": "image3.webp",
        "start_after": "SỬ DỤNG AI TẠO SINH ĐỂ HỖ TRỢ SÁNG TẠO NỘI DUNG",
    },
    {
        "id": 6,
        "source": "BT6",
        "slug": "ai-co-trach-nhiem",
        "title": "AI có trách nhiệm trong học thuật",
        "shortTitle": "Responsible AI",
        "eyebrow": "AI ethics",
        "summary": "Phân tích ranh giới hỗ trợ và gian lận, quyền sở hữu trí tuệ, kiểm chứng đầu ra và bảo vệ dữ liệu trong học tập.",
        "highlight": "Bộ bảy nguyên tắc cá nhân giúp sử dụng AI minh bạch, có trách nhiệm và không đánh mất tư duy độc lập.",
        "tools": ["Policy research", "Critical thinking", "AI ethics"],
        "cover": "image2.png",
        "start_after": "SỬ DỤNG AI CÓ TRÁCH NHIỆM TRONG HỌC TẬP VÀ NGHIÊN CỨU",
    },
]


def block_kind(style: str | None, text: str) -> str:
    style = (style or "").lower()
    stripped = text.strip()
    if style.startswith("heading 1"):
        return "heading1"
    if style.startswith("heading 2"):
        return "heading2"
    if "list" in style or stripped.startswith(("•", "- ")):
        return "list"
    uppercase_letters = [character for character in stripped if character.isalpha()]
    if (
        3 <= len(stripped) <= 140
        and uppercase_letters
        and all(character.isupper() for character in uppercase_letters)
    ):
        return "heading1"
    if len(stripped) <= 90 and (
        stripped[:2].rstrip(".").isdigit()
        or stripped.startswith(tuple(f"{roman}." for roman in ("I", "II", "III", "IV", "V", "VI")))
    ):
        return "heading2"
    return "body"


def clean_blocks(meta: dict, payload: dict) -> list[dict]:
    blocks = payload["blocks"]
    if meta["start_after"]:
        for index, block in enumerate(blocks):
            if block.get("type") == "paragraph" and block.get("text") == meta["start_after"]:
                blocks = blocks[index + 1 :]
                break

    cleaned: list[dict] = []
    for block in blocks:
        if block["type"] == "paragraph":
            text = " ".join(block.get("text", "").split())
            if len(text) % 2 == 0 and text[: len(text) // 2] == text[len(text) // 2 :]:
                text = text[: len(text) // 2]
            images = [
                f"/projects/{meta['slug']}/{name}"
                for name in block.get("images", [])
                if name != "image1.png" or meta["source"] == "BT1"
            ]
            if not text and not images:
                continue
            cleaned.append(
                {
                    "type": block_kind(block.get("style"), text),
                    "text": text,
                    "images": images,
                }
            )
        elif block["type"] == "table":
            rows = block.get("rows", [])
            if rows and rows[0] and rows[0][0].strip().lower() == "sinh viên":
                continue
            if any(any(cell.strip() for cell in row) for row in rows):
                cleaned.append({"type": "table", "rows": rows})
    return cleaned


def copy_tree_files(source: Path, destination: Path) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    for file in source.iterdir():
        if file.is_file() and file.suffix:
            shutil.copy2(file, destination / file.name)


def main() -> None:
    data_output = SITE / "data" / "project-content"
    public_projects = SITE / "public" / "projects"
    public_documents = SITE / "public" / "documents"
    profile_output = SITE / "public" / "profile"
    for path in (data_output, public_projects, public_documents, profile_output):
        path.mkdir(parents=True, exist_ok=True)

    meta_output = []
    for meta in PROJECTS:
        source_folder = EXTRACTED / meta["source"]
        payload = json.loads((source_folder / "content.json").read_text(encoding="utf-8"))
        cleaned = clean_blocks(meta, payload)

        cover = f"/projects/{meta['slug']}/{meta['cover']}" if meta["cover"] else None
        project_meta = {
            key: value
            for key, value in meta.items()
            if key not in {"source", "cover", "start_after"}
        }
        project_meta.update(
            {
                "number": f"{meta['id']:02d}",
                "year": "2026",
                "cover": cover,
                "document": f"/documents/{meta['slug']}.docx",
                "blockCount": len(cleaned),
            }
        )
        meta_output.append(project_meta)

        copy_tree_files(source_folder / "media", public_projects / meta["slug"])
        (data_output / f"{meta['slug']}.json").write_text(
            json.dumps({"meta": project_meta, "blocks": cleaned}, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        shutil.copy2(DOCS / f"{meta['source']}.docx", public_documents / f"{meta['slug']}.docx")

    (SITE / "data" / "projects.json").write_text(
        json.dumps(meta_output, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    personal_media = EXTRACTED / "Tài-liệu-không-có-tiêu-đề" / "media"
    profile_files = {
        "image2.png": "portrait-main.png",
        "image4.png": "portrait-winter.png",
        "image6.png": "russian-faculty-event.png",
        "image7.png": "from-hanoi-to-moscow.png",
        "image3.png": "palette-blue-gold.png",
        "image5.png": "blue-moodboard.png",
    }
    for source_name, destination_name in profile_files.items():
        shutil.copy2(personal_media / source_name, profile_output / destination_name)

    print(f"Prepared {len(meta_output)} projects in {SITE}")


if __name__ == "__main__":
    main()
