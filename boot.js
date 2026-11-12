/* BGX2: runs before first paint (blocking, same-origin, CSP-safe). Marks JS + motion support so reveal animations never hide content without JS. */
(function (d) {
  var c = d.documentElement.classList; c.add('js');
  try { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) c.add('motion'); } catch (e) {}
})(document);
/* Remember a signed-up visitor in localStorage and a 5-year cookie shared by www and the bare domain (gate.js reads both). */
function bgxRemember() {
  try { localStorage.setItem('bgx2.registered', String(Date.now())); } catch (x) {}
  try { var h = location.hostname.replace(/^www\./, ''); document.cookie = 'bgx2reg=1; Max-Age=157680000; Path=/; SameSite=Lax' + (/bgx2games\.com\.tr$/.test(h) ? '; Domain=' + h : '') + (location.protocol === 'https:' ? '; Secure' : ''); } catch (x) {}
}
window.bgxRemember = bgxRemember;
/* Keep the name typed at sign-up (nickname, else the first part of the email) so the site can greet the player. Only on this device. */
function bgxSaveName(f) {
  try {
    var n = f.querySelector('[name="entry.1075989910"]'), m = f.querySelector('[name="entry.1883529"]');
    var nick = (n && n.value || '').replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim();
    if (!nick && m && m.value) { nick = (m.value.split('@')[0].split(/[._\-+]/)[0] || '').replace(/[0-9]+/g, ''); if (nick.length < 2) nick = ''; else nick = nick.charAt(0).toLocaleUpperCase('tr') + nick.slice(1); }
    if (nick) localStorage.setItem('bgx2.profile', JSON.stringify({ nick: nick.slice(0, 24), v: 1 }));
  } catch (x) {}
}
function bgxNext() { var nx = ''; try { nx = new URLSearchParams(location.search).get('next') || ''; } catch (x) {} return /^\/[^\/]/.test(nx) ? nx : ''; }
window.bgxNext = bgxNext;
/* "Already signed up" link on the sign-up page: remember and continue without filling the form again. */
document.addEventListener('click', function (e) {
  var a = e.target && e.target.closest ? e.target.closest('[data-already]') : null; if (!a) return;
  e.preventDefault(); bgxRemember(); location.href = bgxNext() || a.getAttribute('href');
});
/* Sign-up: form posts to Google Forms in a hidden iframe; once it loads, go to the thank-you page. */
document.addEventListener('submit', function (e) {
  var f = e.target; if (!f || !f.hasAttribute || !f.hasAttribute('data-signup-form')) return;
  var hp = f.querySelector('[name="bot-field"]'); if (hp && hp.value) { e.preventDefault(); return; }
  bgxSaveName(f);
  bgxRemember();
  var nx = ''; try { nx = new URLSearchParams(location.search).get('next') || ''; } catch (x) {}
  if (!/^\/[^\/]/.test(nx)) nx = '';
  var fr = document.querySelector('iframe[name="gf-sink"]'), done = false, go = function () { if (done) return; done = true; location.href = nx || f.getAttribute('data-thanks'); };
  if (fr) fr.addEventListener('load', go, { once: true }); setTimeout(go, 4000);
});
