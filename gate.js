/* BGX2 sign-up gate (user, 2026-11-06): first visit opens the sign-up page; after signing up the whole site and the web games
   are open. Remembered in localStorage AND a cookie on .bgx2games.com.tr (shared by www and the bare domain, 5 years), so a
   visitor is asked once per browser, and the sign-up page is shown at most once per device. Sign-up, thank-you and privacy pages stay open; search engine bots are never gated. */
(function (w, d) {
  var K = 'bgx2.registered', p = w.location.pathname, ls = null, ck = false;
  try { ls = w.localStorage.getItem(K); } catch (e) {}
  try { ck = /(?:^|;\s*)bgx2reg=/.test(d.cookie); } catch (e) {}
  if (ls || ck) {
    try { if (!ls) w.localStorage.setItem(K, String(Date.now())); } catch (e) {}
    try { if (!ck) { var h = w.location.hostname.replace(/^www\./, ''); d.cookie = 'bgx2reg=1; Max-Age=157680000; Path=/; SameSite=Lax' + (/bgx2games\.com\.tr$/.test(h) ? '; Domain=' + h : '') + (w.location.protocol === 'https:' ? '; Secure' : ''); } } catch (e) {}
    return;
  }
  if (/bot|crawl|spider|slurp|lighthouse|mediapartners|adsbot|google-inspectiontool|facebookexternalhit|preview|headless/i.test(navigator.userAgent || '')) return;
  if (/^\/(kayit|gizlilik|en\/sign-up|en\/privacy|404)(\/|\.html|$)/.test(p)) return;
  var en = /^\/en(\/|$)/.test(p) || /[?&]lang=en\b/.test(w.location.search);
  /* Ask only once per device (user, 2026-11-10: "sürekli kayıt ol" complaint): mark this browser before showing the page,
     so later visits go straight in whether or not the form was filled. */
  try { w.localStorage.setItem(K, 'asked-' + Date.now()); } catch (e) {}
  try { var h2 = w.location.hostname.replace(/^www\./, ''); d.cookie = 'bgx2reg=1; Max-Age=157680000; Path=/; SameSite=Lax' + (/bgx2games\.com\.tr$/.test(h2) ? '; Domain=' + h2 : '') + (w.location.protocol === 'https:' ? '; Secure' : ''); } catch (e) {}
  d.documentElement.style.visibility = 'hidden';
  w.location.replace((en ? '/en/sign-up/' : '/kayit/') + '?next=' + encodeURIComponent(p + w.location.search + w.location.hash));
})(window, document);
