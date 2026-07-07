/* Omnify shared behaviors: logo dot-ring, scroll reveal. */
(function () {
  // Build the circular dot-ring inside every .logo-mark (8 dots + center accent)
  function buildLogos() {
    document.querySelectorAll('.logo-mark').forEach(function (mark) {
      if (mark.dataset.built) return;
      mark.dataset.built = '1';
      var n = 8, radius = 9;
      for (var i = 0; i < n; i++) {
        var dot = document.createElement('span');
        var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        var x = Math.cos(angle) * radius;
        var y = Math.sin(angle) * radius;
        dot.style.transform = 'translate(' + x + 'px,' + y + 'px)';
        if (i === n - 1) { dot.style.background = '#0A7048'; dot.style.width = '6px'; dot.style.height = '6px'; }
        mark.appendChild(dot);
      }
    });
  }

  // IntersectionObserver reveal (no scroll listeners)
  function setupReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.18 });
    els.forEach(function (e) { io.observe(e); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildLogos();
    setupReveal();
  });
})();
