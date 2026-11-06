/* BGX2 site: optional full screen for the web games (site file, not game code).
   - Where element full screen exists (Android, iPad, desktop): a small "Tam ekran / Full screen" button, shown only
     while the game's menu screen is open (CSS in fullscreen.css, next to the ← BGX2 link) so it never covers controls;
     on touch devices the first tap anywhere also asks for full screen once (needs a user gesture) and tries a
     landscape lock.
   - iPhone Safari has no element full screen: the button never appears; the 100dvh layout fills the screen instead. */
(function () {
  var d = document, de = d.documentElement;
  var req = de.requestFullscreen || de.webkitRequestFullscreen;
  var enabled = !!req && (d.fullscreenEnabled || d.webkitFullscreenEnabled);
  if (!enabled) return;
  try { if (matchMedia("(display-mode: fullscreen), (display-mode: standalone)").matches) return; } catch (e) {} // installed app: already full screen
  var isFs = function () { return !!(d.fullscreenElement || d.webkitFullscreenElement); };
  var lang = "tr";
  try { var q = new URLSearchParams(location.search).get("lang"); if (q === "en" || q === "tr") lang = q; } catch (e) {}
  var b = d.createElement("button");
  b.type = "button"; b.id = "bgxFs"; b.className = "bgx-fs";
  b.textContent = lang === "en" ? "Full screen" : "Tam ekran";
  b.setAttribute("aria-label", lang === "en" ? "Play in full screen" : "Tam ekran oyna");
  var go = function () {
    if (isFs()) return;
    try {
      var p = req.call(de, { navigationUI: "hide" });
      var lock = function () { try { if (screen.orientation && screen.orientation.lock) screen.orientation.lock("landscape").catch(function () {}); } catch (e) {} };
      if (p && p.then) p.then(lock).catch(function () {}); else lock();
    } catch (e) {}
  };
  var sync = function () { d.body.classList.toggle("bgx-fs-ok", !isFs()); };
  b.addEventListener("click", function (e) { e.stopPropagation(); go(); });
  d.addEventListener("fullscreenchange", sync); d.addEventListener("webkitfullscreenchange", sync);
  var start = function () {
    if (d.getElementById("fsBtn")) return; // the game ships its own full screen button
    d.body.appendChild(b); sync();
    if (window.matchMedia && matchMedia("(pointer: coarse)").matches) {
      var first = function () { d.removeEventListener("pointerup", first, true); go(); };
      d.addEventListener("pointerup", first, true);
    }
  };
  if (d.body) start(); else d.addEventListener("DOMContentLoaded", start);
})();
