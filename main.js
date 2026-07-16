{% extends "base.html" %}
{% block content %}
<div class="container py-5" style="max-width:480px">
  <div class="glass-card p-4 mt-5" data-aos="zoom-in">
    <h3 class="gradient-text mb-3"><i class="fa fa-user-shield me-2"></i>Admin Login</h3>
    <p class="text-muted-2">Default: <code>admin</code> / <code>admin123</code></p>
    <form method="post">
      <div class="mb-3"><label class="form-label">Username</label>
        <input name="username" class="form-control" required></div>
      <div class="mb-3"><label class="form-label">Password</label>
        <input name="password" type="password" class="form-control" required></div>
      <button class="btn btn-neon w-100">Sign In</button>
    </form>
  </div>
</div>
{% endblock %}
