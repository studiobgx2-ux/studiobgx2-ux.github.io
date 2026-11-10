/* BGX2: "Sign up with Google" (Google Identity Services, user 2026-11-10). Reads the email and first name from Google's
   signed ID token in the browser, sends them to the same Google Form as the email sign-up, remembers the visitor and continues. */
(function (w, d) {
  var box = d.querySelector('[data-google-signup]'); if (!box) return;
  var cid = box.getAttribute('data-client-id'), lang = box.getAttribute('data-lang') || 'tr';
  if (!cid || /PLACEHOLDER/.test(cid)) return;
  var GF = 'https://docs.google.com/forms/d/e/1FAIpQLSe_Oh5sC43FjCNqD1uDv4NNSND93JNVyrHdIA4b94SeGRimRg/formResponse';
  function payload(t) { var p = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'); while (p.length % 4) p += '=';
    var s = atob(p), b = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) b[i] = s.charCodeAt(i); return JSON.parse(new TextDecoder().decode(b)); }
  function done(r) {
    var u = {}; try { u = payload(r.credential); } catch (e) {}
    var fd = new FormData();
    fd.append('entry.1883529', u.email || ''); fd.append('entry.1075989910', (u.given_name || u.name || '').slice(0, 32));
    fd.append('entry.244674109', lang); fd.append('entry.1700006752', 'google'); fd.append('entry.1893874640', lang === 'tr' ? 'evet' : 'yes');
    try { if (u.given_name && !localStorage.getItem('bgx2.profile')) localStorage.setItem('bgx2.profile', JSON.stringify({ nick: u.given_name.slice(0, 24), v: 1 })); } catch (e) {}
    var go = function () { if (w.bgxRemember) w.bgxRemember(); location.href = (w.bgxNext && w.bgxNext()) || box.getAttribute('data-thanks'); };
    try { fetch(GF, { method: 'POST', mode: 'no-cors', body: fd }).then(go, go); } catch (e) { go(); } setTimeout(go, 3000);
  }
  var s = d.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.async = true;
  s.onload = function () {
    google.accounts.id.initialize({ client_id: cid, callback: done, ux_mode: 'popup', context: 'signup', itp_support: true });
    google.accounts.id.renderButton(box.querySelector('[data-gbtn]'), { theme: 'filled_black', size: 'large', shape: 'pill', text: 'signup_with', locale: lang === 'tr' ? 'tr' : 'en', width: 280 });
    box.hidden = false;
  };
  d.head.appendChild(s);
})(window, document);
