// Boekformulier: voorkeurstijd kiezen met de zon (zonsopkomst en -ondergang in Haarlem voor de gekozen dag),
// plus snelknoppen en − / + per kwartier voor mobiel. Wordt door build-pages.mjs in boeken.html gezet.
(function () {
  var box = document.getElementById('f-zon'); if (!box) return;
  var inp = document.getElementById('f-tijd'), dag = document.getElementById('f-dag');
  var svg = box.querySelector('svg'), pad = box.querySelector('.z-baan'), dagpad = box.querySelector('.z-dag'), zon = box.querySelector('.z-zon');
  var lijn = box.querySelector('.z-lijn'), out = box.querySelector('.z-tijd'), info = box.querySelector('.z-info');
  var opL = box.querySelector('.z-op'), onderL = box.querySelector('.z-onder');
  var VAN = 8 * 60, TOT = 18 * 60, X0 = 24, X1 = 576, Y0 = 150, LAT = 52.38, LON = 4.64;
  var t = null, op = 8 * 60, onder = 17 * 60, hoog = 1;
  function rad(d) { return d * Math.PI / 180; }
  // zonsopkomst en -ondergang (zonne-vergelijking), in minuten na middernacht Nederlandse tijd
  function zonTijden(d) {
    var ms = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 12), J = ms / 864e5 + 2440587.5;
    var n = Math.round(J - 2451545 + 0.0008), Js = n - LON / 360;
    var M = (357.5291 + 0.98560028 * Js) % 360, C = 1.9148 * Math.sin(rad(M)) + 0.02 * Math.sin(rad(2 * M)) + 0.0003 * Math.sin(rad(3 * M));
    var L = (M + C + 282.9372) % 360, Jt = 2451545 + Js + 0.0053 * Math.sin(rad(M)) - 0.0069 * Math.sin(rad(2 * L));
    var dec = Math.asin(Math.sin(rad(L)) * Math.sin(rad(23.4397)));
    var w = Math.acos((Math.sin(rad(-0.833)) - Math.sin(rad(LAT)) * Math.sin(dec)) / (Math.cos(rad(LAT)) * Math.cos(dec))) * 180 / Math.PI;
    function min(j) {
      var p = new Intl.DateTimeFormat('nl-NL', { timeZone: 'Europe/Amsterdam', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date((j - 2440587.5) * 864e5));
      var h = 0, m = 0; p.forEach(function (x) { if (x.type === 'hour') h = +x.value; if (x.type === 'minute') m = +x.value; });
      return h * 60 + m;
    }
    return { op: min(Jt - w / 360), onder: min(Jt + w / 360), hoog: (90 - LAT + dec * 180 / Math.PI) / 61 };
  }
  function hhmm(m) { return Math.floor(m / 60) + ':' + ('0' + m % 60).slice(-2); }
  function x(m) { return X0 + (m - VAN) / (TOT - VAN) * (X1 - X0); }
  function y(m) { var s = Math.sin(Math.PI * (m - op) / (onder - op)); return Y0 - Math.max(s, -0.22) * 112 * hoog; }
  function teken() {
    var d = dag && dag.value ? new Date(dag.value + 'T12:00') : new Date(Date.now() + 864e5), z = zonTijden(d);
    op = z.op; onder = z.onder; hoog = 0.55 + 0.45 * Math.min(Math.max(z.hoog, 0), 1);
    var p = '', q = '';
    for (var m = VAN; m <= TOT; m += 10) p += (m === VAN ? 'M' : 'L') + x(m).toFixed(1) + ' ' + y(m).toFixed(1);
    for (var k = Math.max(op, VAN); k <= Math.min(onder, TOT); k += 5) q += (q ? 'L' : 'M') + x(k).toFixed(1) + ' ' + y(k).toFixed(1);
    pad.setAttribute('d', p); dagpad.setAttribute('d', q);
    opL.textContent = 'zon op ' + hhmm(op); onderL.textContent = 'onder ' + hhmm(onder);
    opL.setAttribute('x', Math.max(x(op), X0)); onderL.setAttribute('x', Math.min(x(onder), X1));
    zet(t, true);
  }
  function zet(m, stil) {
    t = m == null ? null : Math.min(Math.max(Math.round(m / 15) * 15, VAN), TOT);
    var leeg = t == null, m2 = leeg ? 12 * 60 : t;
    zon.setAttribute('cx', x(m2)); zon.setAttribute('cy', y(m2)); lijn.setAttribute('x1', x(m2)); lijn.setAttribute('x2', x(m2)); lijn.setAttribute('y1', y(m2));
    box.classList.toggle('leeg', leeg);
    out.textContent = leeg ? 'Geen voorkeur' : hhmm(t);
    inp.value = leeg ? '' : hhmm(t);
    svg.setAttribute('aria-valuenow', leeg ? '' : t); svg.setAttribute('aria-valuetext', leeg ? 'geen voorkeur' : hhmm(t));
    info.textContent = leeg ? 'Sleep de zon of tik een tijd aan.' : (t < op ? 'Voor zonsopkomst: buiten is het nog donker.' : t > onder ? 'Na zonsondergang: buitenfoto’s en drone gaan dan niet.' : (t - op < 60 || onder - t < 60 ? 'Laag licht: zacht, maar snel weg.' : 'Daglicht, goed voor binnen én buiten.'));
    [].forEach.call(box.querySelectorAll('.z-snel button[data-t]'), function (b) { b.setAttribute('aria-pressed', String(+b.dataset.t === t)); });
  }
  function uitPunt(e) {
    var r = svg.getBoundingClientRect(), vx = (e.clientX - r.left) / r.width * 600;
    return VAN + (vx - X0) / (X1 - X0) * (TOT - VAN);
  }
  var slepen = false;
  svg.addEventListener('pointerdown', function (e) { slepen = true; svg.setPointerCapture(e.pointerId); zet(uitPunt(e)); });
  svg.addEventListener('pointermove', function (e) { if (slepen) zet(uitPunt(e)); });
  svg.addEventListener('pointerup', function () { slepen = false; });
  svg.addEventListener('pointercancel', function () { slepen = false; });
  svg.addEventListener('keydown', function (e) {
    var s = { ArrowRight: 15, ArrowUp: 15, ArrowLeft: -15, ArrowDown: -15, PageUp: 60, PageDown: -60 }[e.key];
    if (s) { zet((t == null ? 12 * 60 : t) + s); e.preventDefault(); }
    else if (e.key === 'Home') { zet(VAN); e.preventDefault(); } else if (e.key === 'End') { zet(TOT); e.preventDefault(); }
  });
  box.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.dataset.t) zet(+b.dataset.t);
    else if (b.dataset.s) zet((t == null ? 12 * 60 : t) + +b.dataset.s);
    else if (b.dataset.leeg != null) zet(null);
  });
  if (dag) dag.addEventListener('change', teken);
  var form = box.closest('form'); if (form) form.addEventListener('reset', function () { setTimeout(function () { t = null; teken(); }, 0); });
  teken();
})();
