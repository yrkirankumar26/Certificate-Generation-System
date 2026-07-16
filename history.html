"""SMTP email sender for certificate delivery."""
import smtplib
import ssl
from email.message import EmailMessage
from config import Config


def send_certificate_email(to_email: str, subject: str, body: str, attachment_path: str):
    """Send an email with a certificate attachment. Returns (ok, message)."""
    if not Config.SMTP_USER or not Config.SMTP_PASS:
        return False, "SMTP credentials not configured (.env)"
    try:
        msg = EmailMessage()
        msg["From"] = Config.SMTP_FROM
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.set_content(body)

        with open(attachment_path, "rb") as f:
            data = f.read()
        filename = attachment_path.rsplit("/", 1)[-1]
        msg.add_attachment(data, maintype="application", subtype="pdf", filename=filename)

        ctx = ssl.create_default_context()
        with smtplib.SMTP(Config.SMTP_HOST, Config.SMTP_PORT) as s:
            s.starttls(context=ctx)
            s.login(Config.SMTP_USER, Config.SMTP_PASS)
            s.send_message(msg)
        return True, "Email sent"
    except Exception as e:  # pragma: no cover
        return False, f"Email failed: {e}"
