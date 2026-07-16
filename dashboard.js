{% extends "base.html" %}
{% block content %}
<div class="container-fluid dashboard-wrap">
  <div class="row">
    <aside class="col-lg-2 sidebar glass-card p-3">
      <h6 class="gradient-text mb-3">Menu</h6>
      <a class="sb-link active" href="{{ url_for('dashboard') }}"><i class="fa fa-gauge me-2"></i>Overview</a>
      <a class="sb-link" href="{{ url_for('upload') }}"><i class="fa fa-upload me-2"></i>Generate</a>
      <a class="sb-link" href="{{ url_for('history') }}"><i class="fa fa-clock-rotate-left me-2"></i>History</a>
      <a class="sb-link" href="{{ url_for('settings_page') }}"><i class="fa fa-gear me-2"></i>Settings</a>
      <a class="sb-link" href="{{ url_for('verify') }}"><i class="fa fa-qrcode me-2"></i>Verify</a>
    </aside>
    <section class="col-lg-10 p-3">
      <h3 class="mb-4">Welcome back, {{ current_user }} 👋</h3>
      <div class="row g-3">
        <div class="col-md-3"><div class="glass-card p-3"><small>Total</small><h2 class="gradient-text">{{ stats.total }}</h2></div></div>
        <div class="col-md-3"><div class="glass-card p-3"><small>Today</small><h2 class="gradient-text">{{ stats.today }}</h2></div></div>
        <div class="col-md-3"><div class="glass-card p-3"><small>Templates</small><h2 class="gradient-text">{{ templates_count }}</h2></div></div>
        <div class="col-md-3"><div class="glass-card p-3"><small>Participants</small><h2 class="gradient-text">{{ stats.participants }}</h2></div></div>
      </div>

      <div class="row g-3 mt-2">
        <div class="col-lg-8"><div class="glass-card p-3"><h6>Certificates by Month</h6><canvas id="monthChart" height="120"></canvas></div></div>
        <div class="col-lg-4"><div class="glass-card p-3"><h6>By Template</h6><canvas id="tplChart" height="120"></canvas></div></div>
        <div class="col-lg-6"><div class="glass-card p-3"><h6>Top Courses</h6><canvas id="courseChart" height="120"></canvas></div></div>
        <div class="col-lg-6"><div class="glass-card p-3"><h6>Daily Generation</h6><canvas id="dailyChart" height="120"></canvas></div></div>
      </div>

      <div class="glass-card p-3 mt-3">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h6 class="m-0">Recent Activity</h6>
          <a href="{{ url_for('history') }}" class="btn btn-sm btn-outline-light">View all</a>
        </div>
        <div class="table-responsive">
          <table class="table table-dark table-hover align-middle">
            <thead><tr><th>ID</th><th>Name</th><th>Course</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {% for r in recent %}
              <tr><td><code>{{ r.certificate_id }}</code></td><td>{{ r.participant_name }}</td>
                  <td>{{ r.course }}</td><td>{{ r.created_at[:19] }}</td>
                  <td><span class="badge bg-success">{{ r.status }}</span></td></tr>
              {% else %}
              <tr><td colspan="5" class="text-center text-muted-2">No certificates yet.</td></tr>
              {% endfor %}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</div>
{% endblock %}
{% block scripts %}
<script src="{{ url_for('static', filename='js/dashboard.js') }}"></script>
{% endblock %}
