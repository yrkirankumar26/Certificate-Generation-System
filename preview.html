"""QR code generation utilities."""
import qrcode
from io import BytesIO


def generate_qr(data: str, box_size: int = 6, border: int = 2):
    """Return a PIL image of a QR code for the given data."""
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=box_size,
        border=border,
    )
    qr.add_data(data)
    qr.make(fit=True)
    return qr.make_image(fill_color="black", back_color="white").convert("RGB")


def qr_bytes(data: str) -> bytes:
    img = generate_qr(data)
    buf = BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()
