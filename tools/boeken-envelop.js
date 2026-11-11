// Boekformulier: na versturen vouwt de aanvraag dubbel, gaat in een envelop en vliegt weg. Wordt door build-pages.mjs in boeken.html gezet.
// window.fwVerzonden({ adres, wanneer, naam }) start het; zonder animatie (prefers-reduced-motion) komt meteen de bevestiging.
window.fwVerzonden = function (a) {
  var f = document.getElementById('boek'); if (!f) return;
  var stil = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var o = document.createElement('div'); o.className = 'env-o'; o.setAttribute('role', 'status');
  function esc(s) { return String(s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  o.innerHTML =
    '<div class="env-s" aria-hidden="true">' +
      '<div class="env-b"></div>' +
      '<div class="env-l"><div class="env-t"><b>Opname</b><span>' + esc(a.adres) + '</span><span>' + esc(a.wanneer) + '</span><i></i><i></i><i></i></div><div class="env-u"><i></i><i></i><i></i><i></i></div></div>' +
      '<div class="env-p"></div><div class="env-f"></div>' +
    '</div>' +
    '<div class="env-m"><p class="display">Verzonden.</p><p>Dank je' + (a.naam ? ', ' + esc(a.naam.split(' ')[0]) : '') + '. Ik neem contact met je op en plan de opname direct met de verkoper.</p>' +
    '<div class="env-k"><a class="btn" href="/">Naar de homepage</a><button class="ul" type="button">Nog een opname boeken</button></div></div>';
  document.body.appendChild(o);
  o.querySelector('.env-k button').addEventListener('click', function () { o.remove(); f.reset(); f.dispatchEvent(new Event('reset')); window.scrollTo(0, f.getBoundingClientRect().top + scrollY - 120); });
  requestAnimationFrame(function () { o.classList.add('in'); if (stil) o.classList.add('klaar'); });
  if (stil) return;
  var stap = ['vouw', 'erin', 'dicht', 'weg', 'klaar'], tijd = [500, 1150, 1750, 2350, 2950];
  stap.forEach(function (s, i) { setTimeout(function () { o.classList.add(s); }, tijd[i]); });
};
