// Global UI behaviours
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ duration: 700, once: true });

  // Auto-dismiss toasts
  document.querySelectorAll('.toast').forEach(t => setTimeout(() => t.classList.remove('show'), 4500));

  // Dropzone
  const dz = document.getElementById('dropzone');
  const input = document.getElementById('dataFile');
  const fname = document.getElementById('fileName');
  if (dz && input) {
    dz.addEventListener('click', () => input.click());
    ['dragover','dragenter'].forEach(e => dz.addEventListener(e, ev => { ev.preventDefault(); dz.classList.add('drag'); }));
    ['dragleave','drop'].forEach(e => dz.addEventListener(e, ev => { ev.preventDefault(); dz.classList.remove('drag'); }));
    dz.addEventListener('drop', ev => { input.files = ev.dataTransfer.files; if (input.files[0]) fname.textContent = input.files[0].name; });
    input.addEventListener('change', () => { if (input.files[0]) fname.textContent = input.files[0].name; });
  }

  // Progress bar on submit
  const form = document.getElementById('uploadForm');
  const prog = document.getElementById('prog');
  if (form && prog) {
    form.addEventListener('submit', () => {
      prog.classList.remove('d-none');
      const bar = prog.querySelector('.progress-bar');
      let w = 0; const iv = setInterval(() => { w = Math.min(95, w + 4); bar.style.width = w + '%'; }, 120);
      window.addEventListener('beforeunload', () => clearInterval(iv));
    });
  }

  // Zoom certificate thumbnails
  document.querySelectorAll('.cert-thumb').forEach(img => {
    img.addEventListener('click', () => {
      document.getElementById('zoomImg').src = img.dataset.full;
      new bootstrap.Modal(document.getElementById('zoomModal')).show();
    });
  });

  // Live search on history table
  const search = document.querySelector('#histTable');
  const q = document.querySelector('input[name="q"]');
  if (search && q) {
    q.addEventListener('input', () => {
      const v = q.value.toLowerCase();
      search.querySelectorAll('tbody tr').forEach(tr => {
        tr.style.display = tr.textContent.toLowerCase().includes(v) ? '' : 'none';
      });
    });
  }

  // Email buttons
  document.querySelectorAll('.email-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      btn.disabled = true; btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
      try {
        const r = await fetch('/email/' + btn.dataset.cid, { method: 'POST' });
        const j = await r.json();
        alert(j.message || (j.ok ? 'Sent' : 'Failed'));
      } catch (e) { alert('Request failed'); }
      finally { btn.disabled = false; btn.innerHTML = '<i class="fa fa-envelope"></i>'; }
    });
  });
});
