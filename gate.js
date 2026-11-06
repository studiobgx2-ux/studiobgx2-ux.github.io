/* BGX2 sign-up gate (user, 2026-11-06): first visit opens the sign-up page; after signing up (flag in localStorage) the whole
   site and the web games are open. Sign-up, thank-you and privacy pages stay open; search engine bots are never gated. */
(function (w, d) {
  var K = 'bgx2.registered', p = w.location.pathname;
  try { if (w.localStorage.getItem(K)) return; } catch (e) { return; }
  if (/bot|crawl|spider|slurp|lighthouse|mediapartners|adsbot|google-inspectiontool|facebookexternalhit|preview|headless/i.test(navigator.userAgent || '')) return;
  if (/^\/(kayit|gizlilik|en\/sign-up|en\/privacy|404)(\/|\.html|$)/.test(p)) return;
  var en = /^\/en(\/|$)/.test(p) || /[?&]lang=en\b/.test(w.location.search);
  d.documentElement.style.visibility = 'hidden';
  w.location.replace((en ? '/en/sign-up/' : '/kayit/') + '?next=' + encodeURIComponent(p + w.location.search + w.location.hash));
})(window, document);
