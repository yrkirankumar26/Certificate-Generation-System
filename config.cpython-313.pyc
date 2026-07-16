// Dashboard charts powered by Chart.js
(async function () {
  try {
    const res = await fetch('/api/stats'); const s = await res.json();
    const grad = ctx => {
      const g = ctx.createLinearGradient(0, 0, 0, 200);
      g.addColorStop(0, 'rgba(91,140,255,.9)'); g.addColorStop(1, 'rgba(162,89,255,.3)'); return g;
    };
    new Chart(document.getElementById('monthChart'), {
      type: 'bar',
      data: { labels: s.by_month.map(x => x.m).reverse(),
              datasets: [{ label: 'Certificates', data: s.by_month.map(x => x.n).reverse(),
                           backgroundColor: c => grad(c.chart.ctx) }] },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
    new Chart(document.getElementById('tplChart'), {
      type: 'doughnut',
      data: { labels: s.by_template.map(x => x.template || 'default'),
              datasets: [{ data: s.by_template.map(x => x.n),
                           backgroundColor: ['#5b8cff', '#a259ff', '#ff6ec4', '#4ade80', '#fbbf24'] }] }
    });
    new Chart(document.getElementById('courseChart'), {
      type: 'bar',
      data: { labels: s.by_course.map(x => x.course || 'N/A'),
              datasets: [{ label: 'Count', data: s.by_course.map(x => x.n), backgroundColor: '#a259ff' }] },
      options: { indexAxis: 'y', plugins: { legend: { display: false } } }
    });
    new Chart(document.getElementById('dailyChart'), {
      type: 'line',
      data: { labels: s.daily.map(x => x.d).reverse(),
              datasets: [{ label: 'Daily', data: s.daily.map(x => x.n).reverse(),
                           borderColor: '#5b8cff', backgroundColor: 'rgba(91,140,255,.2)',
                           fill: true, tension: .3 }] }
    });
  } catch (e) { console.error(e); }
})();
