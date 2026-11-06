/* BGX2: runs before first paint (blocking, same-origin, CSP-safe). Marks JS + motion support so reveal animations never hide content without JS. */
(function (d) {
  var c = d.documentElement.classList; c.add('js');
  try { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) c.add('motion'); } catch (e) {}
})(document);
