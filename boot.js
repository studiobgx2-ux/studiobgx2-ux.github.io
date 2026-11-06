/* BGX2: runs before first paint (blocking, same-origin, CSP-safe). Marks JS + motion support so reveal animations never hide content without JS. */
(function (d) {
  var c = d.documentElement.classList; c.add('js');
  try { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) c.add('motion'); } catch (e) {}
})(document);
/* Sign-up: form posts to Google Forms in a hidden iframe; once it loads, go to the thank-you page. */
document.addEventListener('submit', function (e) {
  var f = e.target; if (!f || !f.hasAttribute || !f.hasAttribute('data-signup-form')) return;
  var hp = f.querySelector('[name="bot-field"]'); if (hp && hp.value) { e.preventDefault(); return; }
  var fr = document.querySelector('iframe[name="gf-sink"]'), go = function () { location.href = f.getAttribute('data-thanks'); };
  if (fr) fr.addEventListener('load', go, { once: true }); setTimeout(go, 4000);
});
