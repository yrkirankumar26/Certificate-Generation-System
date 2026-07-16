"""SQLite database operations for the Certificate Generation System."""
import sqlite3
import os
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config


def get_conn():
    os.makedirs(os.path.dirname(Config.DB_PATH), exist_ok=True)
    conn = sqlite3.connect(Config.DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initialize database tables and default admin user + settings."""
    conn = get_conn()
    cur = conn.cursor()
    cur.executescript("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS certificates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        certificate_id TEXT UNIQUE NOT NULL,
        participant_name TEXT NOT NULL,
        email TEXT,
        course TEXT,
        organization TEXT,
        date TEXT,
        duration TEXT,
        grade TEXT,
        instructor TEXT,
        remarks TEXT,
        template TEXT,
        file_path TEXT,
        status TEXT DEFAULT 'generated',
        created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
    );
    CREATE TABLE IF NOT EXISTS verifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        certificate_id TEXT,
        verified_at TEXT,
        success INTEGER
    );
    """)
    # Default admin
    cur.execute("SELECT COUNT(*) as c FROM users")
    if cur.fetchone()["c"] == 0:
        cur.execute(
            "INSERT INTO users (username, password_hash, created_at) VALUES (?, ?, ?)",
            ("admin", generate_password_hash("admin123"), datetime.utcnow().isoformat()),
        )
    # Default settings
    defaults = {
        "org_name": "Lovable Academy",
        "default_font": "Helvetica",
        "date_format": "%d %B %Y",
        "theme": "dark",
        "signature_name": "Director",
    }
    for k, v in defaults.items():
        cur.execute("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)", (k, v))
    conn.commit()
    conn.close()


def verify_user(username, password):
    conn = get_conn()
    row = conn.execute("SELECT * FROM users WHERE username=?", (username,)).fetchone()
    conn.close()
    return bool(row and check_password_hash(row["password_hash"], password))


def add_certificate(rec):
    conn = get_conn()
    conn.execute("""INSERT INTO certificates
        (certificate_id, participant_name, email, course, organization, date,
         duration, grade, instructor, remarks, template, file_path, status, created_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)""", (
        rec["certificate_id"], rec["participant_name"], rec.get("email", ""),
        rec.get("course", ""), rec.get("organization", ""), rec.get("date", ""),
        rec.get("duration", ""), rec.get("grade", ""), rec.get("instructor", ""),
        rec.get("remarks", ""), rec.get("template", ""), rec.get("file_path", ""),
        rec.get("status", "generated"), datetime.utcnow().isoformat()
    ))
    conn.commit()
    conn.close()


def get_certificate(cert_id):
    conn = get_conn()
    row = conn.execute("SELECT * FROM certificates WHERE certificate_id=?", (cert_id,)).fetchone()
    conn.close()
    return dict(row) if row else None


def list_certificates(search=None, limit=500):
    conn = get_conn()
    if search:
        q = f"%{search}%"
        rows = conn.execute("""SELECT * FROM certificates
            WHERE certificate_id LIKE ? OR participant_name LIKE ? OR course LIKE ?
            ORDER BY created_at DESC LIMIT ?""", (q, q, q, limit)).fetchall()
    else:
        rows = conn.execute(
            "SELECT * FROM certificates ORDER BY created_at DESC LIMIT ?", (limit,)
        ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def delete_certificate(cert_id):
    conn = get_conn()
    conn.execute("DELETE FROM certificates WHERE certificate_id=?", (cert_id,))
    conn.commit()
    conn.close()


def stats():
    conn = get_conn()
    c = conn.cursor()
    total = c.execute("SELECT COUNT(*) AS n FROM certificates").fetchone()["n"]
    today = c.execute(
        "SELECT COUNT(*) AS n FROM certificates WHERE DATE(created_at)=DATE('now')"
    ).fetchone()["n"]
    participants = c.execute(
        "SELECT COUNT(DISTINCT participant_name) AS n FROM certificates"
    ).fetchone()["n"]
    by_month = c.execute("""SELECT strftime('%Y-%m', created_at) AS m, COUNT(*) AS n
        FROM certificates GROUP BY m ORDER BY m DESC LIMIT 12""").fetchall()
    by_course = c.execute(
        "SELECT course, COUNT(*) AS n FROM certificates GROUP BY course ORDER BY n DESC LIMIT 10"
    ).fetchall()
    by_template = c.execute(
        "SELECT template, COUNT(*) AS n FROM certificates GROUP BY template"
    ).fetchall()
    daily = c.execute("""SELECT DATE(created_at) AS d, COUNT(*) AS n
        FROM certificates GROUP BY d ORDER BY d DESC LIMIT 14""").fetchall()
    conn.close()
    return {
        "total": total, "today": today, "participants": participants,
        "by_month": [dict(r) for r in by_month],
        "by_course": [dict(r) for r in by_course],
        "by_template": [dict(r) for r in by_template],
        "daily": [dict(r) for r in daily],
    }


def get_settings():
    conn = get_conn()
    rows = conn.execute("SELECT key, value FROM settings").fetchall()
    conn.close()
    return {r["key"]: r["value"] for r in rows}


def update_settings(data):
    conn = get_conn()
    for k, v in data.items():
        conn.execute(
            "INSERT INTO settings (key, value) VALUES (?, ?) "
            "ON CONFLICT(key) DO UPDATE SET value=excluded.value", (k, v)
        )
    conn.commit()
    conn.close()


def log_verification(cert_id, success):
    conn = get_conn()
    conn.execute(
        "INSERT INTO verifications (certificate_id, verified_at, success) VALUES (?,?,?)",
        (cert_id, datetime.utcnow().isoformat(), 1 if success else 0),
    )
    conn.commit()
    conn.close()
