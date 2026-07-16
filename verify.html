"""Certificate generation: reads participant data and renders certificates."""
import os
import re
import uuid
import zipfile
from datetime import datetime
from io import BytesIO

import pandas as pd
from PIL import Image, ImageDraw, ImageFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

from config import Config
from qr_generator import generate_qr
import database as db

REQUIRED_FIELDS = ["Participant Name"]
OPTIONAL_FIELDS = [
    "Certificate ID", "Email", "Course", "Organization", "Date",
    "Duration", "Grade", "Instructor", "Remarks",
]
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def _font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    """Load a TrueType font, falling back to PIL default if missing."""
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()


def validate_dataframe(df: pd.DataFrame):
    """Validate participant dataframe. Returns (cleaned_df, errors)."""
    errors = []
    df = df.copy()
    df.columns = [str(c).strip() for c in df.columns]

    for req in REQUIRED_FIELDS:
        if req not in df.columns:
            errors.append(f"Missing required column: {req}")
    if errors:
        return df, errors

    # Fill optional fields
    for col in OPTIONAL_FIELDS:
        if col not in df.columns:
            df[col] = ""

    df["Participant Name"] = df["Participant Name"].astype(str).str.strip()
    df = df[df["Participant Name"].str.len() > 0]

    seen = set()
    for idx, row in df.iterrows():
        cid = str(row.get("Certificate ID") or "").strip()
        if not cid:
            cid = f"CERT-{uuid.uuid4().hex[:10].upper()}"
            df.at[idx, "Certificate ID"] = cid
        if cid in seen:
            errors.append(f"Duplicate Certificate ID: {cid}")
        seen.add(cid)

        email = str(row.get("Email") or "").strip()
        if email and not EMAIL_RE.match(email):
            errors.append(f"Invalid email at row {idx + 2}: {email}")

        date_v = str(row.get("Date") or "").strip()
        if date_v:
            try:
                pd.to_datetime(date_v)
            except Exception:
                errors.append(f"Invalid date at row {idx + 2}: {date_v}")

    return df, errors


def read_participants(path: str) -> pd.DataFrame:
    ext = path.rsplit(".", 1)[-1].lower()
    if ext == "csv":
        return pd.read_csv(path)
    if ext == "xlsx":
        return pd.read_excel(path)
    raise ValueError("Unsupported file format")


def _default_background(size=(1600, 1100)) -> Image.Image:
    """Create an elegant fallback background if no template is uploaded."""
    img = Image.new("RGB", size, (20, 22, 40))
    draw = ImageDraw.Draw(img)
    # Gradient
    for y in range(size[1]):
        r = int(20 + (60 - 20) * y / size[1])
        g = int(22 + (30 - 22) * y / size[1])
        b = int(40 + (100 - 40) * y / size[1])
        draw.line([(0, y), (size[0], y)], fill=(r, g, b))
    # Border
    draw.rectangle([30, 30, size[0] - 30, size[1] - 30], outline=(200, 180, 100), width=6)
    draw.rectangle([50, 50, size[0] - 50, size[1] - 50], outline=(200, 180, 100), width=2)
    return img


def _load_background(template_path: str | None) -> Image.Image:
    if template_path and os.path.exists(template_path):
        return Image.open(template_path).convert("RGB")
    return _default_background()


def _center_text(draw, text, y, font, width, fill=(255, 255, 255)):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw.text(((width - tw) / 2, y), text, font=font, fill=fill)


def render_certificate_image(record: dict, template_path: str | None,
                             settings: dict) -> Image.Image:
    """Render a single certificate as a PIL image."""
    bg = _load_background(template_path)
    W, H = bg.size
    draw = ImageDraw.Draw(bg)

    org = settings.get("org_name", "Organization")
    title_font = _font(int(H * 0.07), bold=True)
    subtitle_font = _font(int(H * 0.035))
    name_font = _font(int(H * 0.075), bold=True)
    body_font = _font(int(H * 0.028))
    small_font = _font(int(H * 0.022))

    text_color = (245, 240, 220) if not template_path else (30, 30, 60)

    _center_text(draw, org.upper(), int(H * 0.10), subtitle_font, W, text_color)
    _center_text(draw, "CERTIFICATE OF COMPLETION", int(H * 0.18), title_font, W, text_color)
    _center_text(draw, "This certificate is proudly presented to", int(H * 0.33),
                 subtitle_font, W, text_color)
    _center_text(draw, record["Participant Name"], int(H * 0.40), name_font, W, text_color)

    course = record.get("Course", "")
    duration = record.get("Duration", "")
    grade = record.get("Grade", "")
    date = record.get("Date", "")
    body_line = f"For successfully completing the course \"{course}\""
    _center_text(draw, body_line, int(H * 0.55), body_font, W, text_color)

    meta = " | ".join(filter(None, [
        f"Duration: {duration}" if duration else "",
        f"Grade: {grade}" if grade else "",
        f"Date: {date}" if date else "",
    ]))
    if meta:
        _center_text(draw, meta, int(H * 0.61), small_font, W, text_color)

    # Instructor / signature
    instructor = record.get("Instructor") or settings.get("signature_name", "Director")
    draw.text((int(W * 0.12), int(H * 0.82)), f"_____________________",
              font=small_font, fill=text_color)
    draw.text((int(W * 0.12), int(H * 0.85)), f"{instructor}", font=small_font, fill=text_color)
    draw.text((int(W * 0.12), int(H * 0.88)), "Instructor", font=small_font, fill=text_color)

    # Certificate ID
    cid = record["Certificate ID"]
    draw.text((int(W * 0.12), int(H * 0.93)), f"Certificate ID: {cid}",
              font=small_font, fill=text_color)

    # QR code linking to verification page
    verify_url = f"{Config.APP_URL}/verify?cid={cid}"
    qr_img = generate_qr(verify_url, box_size=6).resize((int(W * 0.13), int(W * 0.13)))
    bg.paste(qr_img, (int(W * 0.78), int(H * 0.78)))
    draw.text((int(W * 0.78), int(H * 0.93)), "Scan to verify", font=small_font, fill=text_color)

    # Footer
    _center_text(draw, f"© {datetime.utcnow().year} {org}", int(H * 0.955),
                 small_font, W, text_color)
    return bg


def save_pdf(image: Image.Image, pdf_path: str):
    """Save a certificate image as a PDF."""
    W, H = image.size
    c = canvas.Canvas(pdf_path, pagesize=(W, H))
    buf = BytesIO()
    image.save(buf, format="PNG")
    buf.seek(0)
    c.drawImage(ImageReader(buf), 0, 0, width=W, height=H)
    c.showPage()
    c.save()


def generate_all(data_path: str, template_path: str | None, settings: dict):
    """Generate certificates for every row. Returns dict with results."""
    df = read_participants(data_path)
    df, errors = validate_dataframe(df)
    if errors:
        return {"ok": False, "errors": errors, "generated": []}

    os.makedirs(Config.CERT_FOLDER, exist_ok=True)
    os.makedirs(Config.ZIP_FOLDER, exist_ok=True)
    generated = []
    ts = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    zip_path = os.path.join(Config.ZIP_FOLDER, f"certificates_{ts}.zip")

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for _, row in df.iterrows():
            record = {k: (str(row[k]) if pd.notna(row[k]) else "") for k in df.columns}
            img = render_certificate_image(record, template_path, settings)
            safe_name = re.sub(r"[^A-Za-z0-9_-]+", "_", record["Participant Name"])
            base = f"{record['Certificate ID']}_{safe_name}"
            pdf_path = os.path.join(Config.CERT_FOLDER, base + ".pdf")
            png_path = os.path.join(Config.CERT_FOLDER, base + ".png")
            img.save(png_path, "PNG")
            save_pdf(img, pdf_path)
            zf.write(pdf_path, arcname=base + ".pdf")

            db_rec = {
                "certificate_id": record["Certificate ID"],
                "participant_name": record["Participant Name"],
                "email": record.get("Email", ""),
                "course": record.get("Course", ""),
                "organization": record.get("Organization", settings.get("org_name", "")),
                "date": record.get("Date", ""),
                "duration": record.get("Duration", ""),
                "grade": record.get("Grade", ""),
                "instructor": record.get("Instructor", ""),
                "remarks": record.get("Remarks", ""),
                "template": os.path.basename(template_path) if template_path else "default",
                "file_path": pdf_path,
                "status": "generated",
            }
            try:
                db.add_certificate(db_rec)
            except Exception:
                # Duplicate; skip
                pass
            generated.append({
                "certificate_id": record["Certificate ID"],
                "name": record["Participant Name"],
                "pdf": os.path.basename(pdf_path),
                "png": os.path.basename(png_path),
            })

    return {"ok": True, "generated": generated, "zip": os.path.basename(zip_path)}
