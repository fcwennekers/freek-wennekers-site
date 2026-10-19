// Boekformulier: aanvullen van adres (PDOK Locatieserver), makelaarskantoor en naam. Wordt door build-pages.mjs in boeken.html gezet.
// Kantoren komen uit /data/makelaars.json (bron: tools/makelaars.txt). Namen komen alleen uit wat
// eerder op dit apparaat is ingevuld (localStorage); er staat geen lijst met namen van personen op de site.
(function () {
  var f = document.getElementById('boek'); if (!f) return;
  var KEY = 'fw-boeken-v1', kantoren = null;
  function norm(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' en ').replace(/[^a-z0-9]+/g, ' ').trim(); }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function save(list) { try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, 30))); } catch (e) {} }
  // elk woord uit de zoekterm moet het begin zijn van een woord in de naam ("overs" vindt "Overspaern Makelaardij")
  function score(name, q) {
    var n = norm(name), words = n.split(' '), qs = q.split(' ');
    if (!q) return 1;
    if (n.indexOf(q) === 0) return 3;
    for (var i = 0; i < qs.length; i++) { if (!words.some(function (w) { return w.indexOf(qs[i]) === 0; })) return 0; }
    return 2;
  }
  var STOP = { makelaar: 1, makelaars: 1, makelaardij: 1, nvm: 1, en: 1, de: 1, b: 1, v: 1, bv: 1 };
  function kq(q) { return q.split(' ').filter(function (w) { return w && !STOP[w]; }).join(' '); }
  var kantoor = f.querySelector('#f-kantoor'), naam = f.querySelector('#f-naam'), mail = f.querySelector('#f-mail'), tel = f.querySelector('#f-tel');
  if (!kantoor || !naam) return;
  if (load().length) naam.setAttribute('autocomplete', 'off');

  function combo(input, source, pick, showEmpty) {
    var box = document.createElement('ul'), id = input.id + '-lijst', items = [], active = -1;
    box.id = id; box.setAttribute('role', 'listbox'); box.hidden = true;
    var wrap = document.createElement('div'); wrap.className = 'ac';
    input.parentNode.insertBefore(wrap, input); wrap.appendChild(input); wrap.appendChild(box);
    input.setAttribute('role', 'combobox'); input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', id); input.setAttribute('aria-expanded', 'false');
    function close() { box.hidden = true; active = -1; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); }
    function mark(i) {
      active = i;
      [].forEach.call(box.children, function (li, k) { li.setAttribute('aria-selected', String(k === i)); });
      if (i >= 0) { input.setAttribute('aria-activedescendant', id + '-' + i); box.children[i].scrollIntoView({ block: 'nearest' }); }
    }
    var seq = 0;
    function open() {
      var q = norm(input.value), n = ++seq;
      if (!q && !showEmpty) return close();
      Promise.resolve(source(q, input.value)).then(function (res) { if (n === seq && document.activeElement === input) show(res, q); }, function () {});
    }
    function show(res, q) {
      items = res || [];
      if (!items.length || (items.length === 1 && norm(items[0].v) === q)) return close();
      box.textContent = '';
      items.forEach(function (it, k) {
        var li = document.createElement('li'), b = document.createElement('span');
        li.id = id + '-' + k; li.setAttribute('role', 'option'); li.setAttribute('aria-selected', 'false');
        b.textContent = it.v; li.appendChild(b);
        if (it.sub) { var s = document.createElement('small'); s.textContent = it.sub; li.appendChild(s); }
        li.addEventListener('mousedown', function (e) { e.preventDefault(); choose(k); });
        box.appendChild(li);
      });
      box.hidden = false; input.setAttribute('aria-expanded', 'true'); mark(-1);
    }
    function choose(k) { var it = items[k]; if (!it) return; input.value = it.v; close(); pick(it); input.dispatchEvent(new Event('change', { bubbles: true })); }
    input.addEventListener('input', open);
    input.addEventListener('focus', function () { if (showEmpty) open(); });
    input.addEventListener('blur', function () { setTimeout(close, 120); });
    input.addEventListener('keydown', function (e) {
      if (box.hidden) { if (e.key === 'ArrowDown') { open(); e.preventDefault(); } return; }
      if (e.key === 'ArrowDown') { mark(Math.min(active + 1, items.length - 1)); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { mark(Math.max(active - 1, 0)); e.preventDefault(); }
      else if (e.key === 'Enter' && active >= 0) { choose(active); e.preventDefault(); }
      else if (e.key === 'Escape') { close(); }
    });
    return { open: open };
  }

  // kantoren: eerder gebruikt op dit apparaat bovenaan, daarna de lijst
  combo(kantoor, function (q) {
    var seen = {}, out = [];
    var k = kq(q);
    if (!k) return [];
    load().forEach(function (m) { var s = score(m.k, k); if (m.k && s && !seen[norm(m.k)]) { seen[norm(m.k)] = 1; out.push({ v: m.k, sub: 'eerder gebruikt', s: s + 4 }); } });
    (kantoren || []).forEach(function (m) {
      var s = score(m.n, k) * 2 || (score(m.n + ' ' + m.p, k) ? 1 : 0); // naam telt zwaarder dan plaats
      if (s && !seen[norm(m.n)]) { seen[norm(m.n)] = 1; out.push({ v: m.n, sub: m.p, s: s }); }
    });
    return out.sort(function (a, b) { return b.s - a.s || a.v.localeCompare(b.v, 'nl'); }).slice(0, 8);
  }, function () {}, false);
  kantoor.addEventListener('focus', function () {
    if (kantoren) return; kantoren = [];
    fetch('/data/makelaars.json').then(function (r) { return r.json(); }).then(function (j) { kantoren = j; if (document.activeElement === kantoor && kantoor.value) kantoor.dispatchEvent(new Event('input')); }).catch(function () {});
  });

  // namen: alleen wie op dit apparaat eerder boekte, bij voorkeur van hetzelfde kantoor; kiezen vult ook e-mail en telefoon
  combo(naam, function (q) {
    var k = norm(kantoor.value), seen = {}, out = [];
    load().forEach(function (m) {
      var s = score(m.n, q), key = norm(m.n) + '|' + norm(m.k);
      if (!m.n || !s || seen[key] || (k && norm(m.k) !== k)) return;
      seen[key] = 1; out.push({ v: m.n, sub: m.k || '', m: m, s: s });
    });
    return out.slice(0, 6);
  }, function (it) {
    if (it.m.e) mail.value = it.m.e;
    if (it.m.t) tel.value = it.m.t;
    if (!kantoor.value && it.m.k) kantoor.value = it.m.k;
  }, true);

  // adres: suggesties van de PDOK Locatieserver terwijl je typt (straat + huisnummer, of postcode + huisnummer)
  var adres = f.querySelector('#f-adres'), plaats = f.querySelector('#f-plaats'), PD = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/', wacht;
  if (adres && plaats && window.fetch) {
    adres.setAttribute('autocomplete', 'off');
    combo(adres, function (q, raw) {
      if (raw.trim().length < 3) return [];
      return new Promise(function (ok) { clearTimeout(wacht); wacht = setTimeout(ok, 220); }).then(function () {
        var term = raw.trim() + (plaats.value.trim() ? ' ' + plaats.value.trim() : '');
        return fetch(PD + 'suggest?rows=6&fq=type:adres&q=' + encodeURIComponent(term)).then(function (r) { return r.json(); });
      }).then(function (j) {
        return ((j.response && j.response.docs) || []).map(function (d) { return { v: d.weergavenaam, id: d.id }; });
      });
    }, function (it) {
      adres.value = it.v.split(',')[0];
      fetch(PD + 'lookup?fl=straatnaam,huis_nlt,woonplaatsnaam&id=' + encodeURIComponent(it.id)).then(function (r) { return r.json(); }).then(function (j) {
        var d = j.response && j.response.docs && j.response.docs[0]; if (!d) return;
        if (d.straatnaam && d.huis_nlt) adres.value = d.straatnaam + ' ' + d.huis_nlt;
        if (d.woonplaatsnaam) { plaats.value = d.woonplaatsnaam; plaats.dispatchEvent(new Event('input', { bubbles: true })); }
      }).catch(function () {});
    }, false);
  }

  // na versturen onthouden op dit apparaat
  f.addEventListener('submit', function () {
    var m = { k: kantoor.value.trim(), n: naam.value.trim(), e: mail.value.trim(), t: tel.value.trim() };
    if (!m.n) return;
    var key = norm(m.n) + '|' + norm(m.k);
    save([m].concat(load().filter(function (x) { return norm(x.n) + '|' + norm(x.k) !== key; })));
    var fg = document.getElementById('f-vergeet'); if (fg) fg.hidden = false;
  });
  var vergeet = document.getElementById('f-vergeet');
  if (vergeet) {
    vergeet.hidden = !load().length;
    vergeet.addEventListener('click', function () { try { localStorage.removeItem(KEY); } catch (e) {} vergeet.hidden = true; naam.setAttribute('autocomplete', 'name'); });
  }
})();
