/* Shared behaviour: language, formatting, bands, tables. Each page adds its own calc(). */
var L = 'en';
var PAGE_RENDER = function(){};

function t(k){ return T[L][k]; }
function fmt(x, d){ return x.toLocaleString(T[L].loc, {minimumFractionDigits:d, maximumFractionDigits:d}); }
function num(id){ var el = document.getElementById(id); if (!el) return null;
  var v = parseFloat(el.value); return isFinite(v) && v >= 0 ? v : null; }

/* bands: {max, t:'lt'|'r'|'ge'|'gt', a, b, d, tone} */
function band(v, bands){ for (var i=0;i<bands.length;i++) if (v < bands[i].max) return bands[i];
  return bands[bands.length-1]; }
function range(b){
  if (b.t === 'lt') return '< ' + fmt(b.b, b.d);
  if (b.t === 'ge') return '≥ ' + fmt(b.a, b.d);
  if (b.t === 'gt') return '> ' + fmt(b.a, b.d);
  return fmt(b.a, b.d) + ' – ' + fmt(b.b, b.d);
}
function setBadge(el, tone, text){
  el.className = 'badge ' + (tone ? 'b-' + tone : 'b-none');
  el.textContent = text;
}
function rows(tb, list, activeIndex, cols){
  tb.innerHTML = '';
  list.forEach(function(item, i){
    var tr = document.createElement('tr');
    if (i === activeIndex) tr.className = 'on';
    cols.forEach(function(fn){
      var td = document.createElement('td'); td.textContent = fn(item, i); tr.appendChild(td);
    });
    tb.appendChild(tr);
  });
}
function srcList(el, list){
  el.innerHTML = '';
  list.forEach(function(s){
    var li = document.createElement('li');
    if (s.u){ var a = document.createElement('a'); a.href = s.u; a.textContent = s.s; li.appendChild(a); }
    else li.textContent = s.s;
    el.appendChild(li);
  });
}
function opts(sel, labels, keep){
  var i = (keep === undefined) ? (sel.selectedIndex < 0 ? 0 : sel.selectedIndex) : keep;
  sel.innerHTML = '';
  labels.forEach(function(lab, k){
    var o = document.createElement('option'); o.value = String(k); o.textContent = lab; sel.appendChild(o);
  });
  sel.selectedIndex = i;
}

function render(){
  document.documentElement.lang = (L === 'pt') ? 'pt-PT' : L;
  Array.prototype.forEach.call(document.querySelectorAll('[data-t]'), function(el){
    var v = T[L][el.getAttribute('data-t')];
    if (typeof v !== 'string') return;
    if (v.indexOf('<') >= 0) el.innerHTML = v; else el.textContent = v;
  });
  var ttl = document.querySelector('[data-title]');
  if (ttl) document.title = T[L][ttl.getAttribute('data-title')];
  var sel = document.getElementById('lang'); if (sel) sel.value = L;
  PAGE_RENDER();
}
function setLang(l){
  L = T[l] ? l : 'en';
  try { localStorage.setItem('ct-lang', L); } catch(e) {}
  render();
}
function initTool(fn){
  if (fn) PAGE_RENDER = fn;
  var sel = document.getElementById('lang');
  if (sel) sel.addEventListener('change', function(){ setLang(this.value); });
  var saved = null;
  try { saved = localStorage.getItem('ct-lang'); } catch(e) {}
  if (!saved){
    var nav = (navigator.language || 'en').slice(0,2).toLowerCase();
    saved = T[nav] ? nav : 'en';
  }
  setLang(saved);
}
function onInput(ids, fn){
  ids.forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', fn);
  });
}
