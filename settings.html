"""Certificate Generation System — Flask application."""
import os
import io
import csv
from functools import wraps
from flask import (
    Flask, render_template, request, redirect, url_for, session,
    flash, send_from_directory, send_file, jsonify, abort,
)
from werkzeug.utils import secure_filename

from config import Config
import database as db
import generator
from email_sender import send_certificate_email

app = Flask(__name__)
app.config.from_object(Config)

for p in (Config.UPLOAD_FOLDER, Config.CERT_FOLDER, Config.TEMPLATE_FOLDER,
          Config.ZIP_FOLDER, os.path.dirname(Config.DB_PATH)):
    os.makedirs(p, exist_ok=True)

db.init_db()


def _ext_ok(filename, allowed):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in allowed


def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get("user"):
            flash("Please log in first.", "warning")
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return wrapper


@app.context_processor
def inject_globals():
    return {"current_user": session.get("user"), "settings": db.get_settings()}


# ---------------- Public pages ----------------
@app.route("/")
def index():
    s = db.stats()
    return render_template("index.html", stats=s)


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        u = request.form.get("username", "").strip()
        p = request.form.get("password", "")
        if db.verify_user(u, p):
            session["user"] = u
            flash("Welcome back!", "success")
            return redirect(url_for("dashboard"))
        flash("Invalid credentials.", "danger")
    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()
    flash("Signed out.", "info")
    return redirect(url_for("index"))


# ---------------- Authenticated ----------------
@app.route("/dashboard")
@login_required
def dashboard():
    s = db.stats()
    templates = os.listdir(Config.TEMPLATE_FOLDER) if os.path.exists(Config.TEMPLATE_FOLDER) else []
    recent = db.list_certificates(limit=10)
    return render_template("dashboard.html", stats=s,
                           templates_count=len(templates), recent=recent)


@app.route("/upload", methods=["GET", "POST"])
@login_required
def upload():
    templates = [f for f in os.listdir(Config.TEMPLATE_FOLDER)
                 if _ext_ok(f, Config.ALLOWED_IMG_EXT)]
    if request.method == "POST":
        f = request.files.get("data_file")
        template_choice = request.form.get("template")
        if not f or f.filename == "":
            flash("Choose a CSV or XLSX file.", "warning")
            return redirect(url_for("upload"))
        if not _ext_ok(f.filename, Config.ALLOWED_DATA_EXT):
            flash("Only CSV or XLSX files are allowed.", "danger")
            return redirect(url_for("upload"))
        filename = secure_filename(f.filename)
        data_path = os.path.join(Config.UPLOAD_FOLDER, filename)
        f.save(data_path)

        template_path = None
        if template_choice and template_choice != "default":
            candidate = os.path.join(Config.TEMPLATE_FOLDER, secure_filename(template_choice))
            if os.path.exists(candidate):
                template_path = candidate

        try:
            result = generator.generate_all(data_path, template_path, db.get_settings())
        except Exception as e:
            flash(f"Generation failed: {e}", "danger")
            return redirect(url_for("upload"))
        if not result["ok"]:
            for err in result["errors"]:
                flash(err, "danger")
            return redirect(url_for("upload"))
        session["last_zip"] = result["zip"]
        session["last_generated"] = result["generated"]
        flash(f"Generated {len(result['generated'])} certificates.", "success")
        return redirect(url_for("preview"))
    return render_template("upload.html", templates=templates)


@app.route("/templates/upload", methods=["POST"])
@login_required
def upload_template():
    f = request.files.get("template_file")
    if not f or not _ext_ok(f.filename, Config.ALLOWED_IMG_EXT):
        flash("Choose a PNG/JPG image.", "danger")
        return redirect(url_for("upload"))
    f.save(os.path.join(Config.TEMPLATE_FOLDER, secure_filename(f.filename)))
    flash("Template uploaded.", "success")
    return redirect(url_for("upload"))


@app.route("/templates/delete/<name>", methods=["POST"])
@login_required
def delete_template(name):
    path = os.path.join(Config.TEMPLATE_FOLDER, secure_filename(name))
    if os.path.exists(path):
        os.remove(path)
        flash("Template deleted.", "info")
    return redirect(url_for("upload"))


@app.route("/templates/preview/<name>")
@login_required
def preview_template(name):
    return send_from_directory(Config.TEMPLATE_FOLDER, secure_filename(name))


@app.route("/preview")
@login_required
def preview():
    generated = session.get("last_generated", [])
    zip_name = session.get("last_zip")
    return render_template("preview.html", generated=generated, zip_name=zip_name)


@app.route("/certificates/<path:filename>")
def certificate_file(filename):
    return send_from_directory(Config.CERT_FOLDER, filename)


@app.route("/download/zip/<name>")
@login_required
def download_zip(name):
    return send_from_directory(Config.ZIP_FOLDER, secure_filename(name), as_attachment=True)


@app.route("/history")
@login_required
def history():
    q = request.args.get("q", "").strip()
    rows = db.list_certificates(search=q or None)
    return render_template("history.html", rows=rows, q=q)


@app.route("/history/delete/<cid>", methods=["POST"])
@login_required
def history_delete(cid):
    db.delete_certificate(cid)
    flash("Record deleted.", "info")
    return redirect(url_for("history"))


@app.route("/history/export")
@login_required
def history_export():
    rows = db.list_certificates(limit=100000)
    buf = io.StringIO()
    writer = csv.writer(buf)
    if rows:
        writer.writerow(rows[0].keys())
        for r in rows:
            writer.writerow(r.values())
    return send_file(
        io.BytesIO(buf.getvalue().encode("utf-8")),
        mimetype="text/csv", as_attachment=True, download_name="history.csv",
    )


@app.route("/verify", methods=["GET", "POST"])
def verify():
    result = None
    cid = request.values.get("cid", "").strip()
    if cid:
        rec = db.get_certificate(cid)
        db.log_verification(cid, bool(rec))
        result = rec
    return render_template("verify.html", result=result, cid=cid)


@app.route("/settings", methods=["GET", "POST"])
@login_required
def settings_page():
    if request.method == "POST":
        data = {k: v for k, v in request.form.items() if k}
        db.update_settings(data)
        flash("Settings updated.", "success")
        return redirect(url_for("settings_page"))
    return render_template("settings.html", settings=db.get_settings())


@app.route("/email/<cid>", methods=["POST"])
@login_required
def email_certificate(cid):
    rec = db.get_certificate(cid)
    if not rec or not rec.get("file_path") or not rec.get("email"):
        return jsonify({"ok": False, "message": "Missing certificate or email"}), 400
    ok, msg = send_certificate_email(
        rec["email"],
        subject=f"Your certificate: {rec.get('course', '')}",
        body=f"Hi {rec['participant_name']},\n\nPlease find your certificate attached.\n",
        attachment_path=rec["file_path"],
    )
    return jsonify({"ok": ok, "message": msg})


@app.route("/api/stats")
@login_required
def api_stats():
    return jsonify(db.stats())


@app.errorhandler(404)
def not_found(_):
    return render_template("error.html", code=404, message="Page not found"), 404


@app.errorhandler(500)
def server_error(_):
    return render_template("error.html", code=500, message="Internal server error"), 500


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
