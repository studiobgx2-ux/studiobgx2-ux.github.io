/* BGX2: Google H5 Games Ads (Ad Placement API) for Nine: Kapanlar — OFF by default, see docs/REKLAM.md.
   Loaded before game.js. While ENABLED is false nothing is requested and nothing is rendered:
   adBreak/adConfig are harmless shims and the level-complete hook only counts levels.
   Kept by site/sync-nine.py (it re-adds this script tag and the hook in game.js's win()). */
(function () {
  var ENABLED = false;   // true only after H5 Games Ads approval; scripts/ads-headers.mjs reads this line to open the CSP
  var TEST = true;       // data-adbreak-test="on" (test ads) — set false for real ads after testing
  var CLIENT = "ca-pub-1050617933370418";
  var EVERY = 3;         // one "next" ad break after every 3 completed levels
  var FREQ = "120s";     // data-ad-frequency-hint (Google: at least 30s)

  window.adsbygoogle = window.adsbygoogle || [];
  // Official Ad Placement API shims. Disabled: the call is dropped and adBreakDone reports "notReady".
  window.adBreak = window.adConfig = function (o) {
    if (ENABLED) { window.adsbygoogle.push(o); return; }
    if (o && typeof o.adBreakDone === "function") { try { o.adBreakDone({ breakStatus: "notReady" }); } catch (e) {} }
  };

  if (ENABLED) {
    var s = document.createElement("script");
    s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + CLIENT;
    s.setAttribute("data-ad-frequency-hint", FREQ);
    if (TEST) s.setAttribute("data-adbreak-test", "on");
    document.head.appendChild(s);
    window.adConfig({ preloadAdBreaks: "on", sound: "on" });
  }

  var done = 0;
  // Called by game.js when a level is completed (patched in by sync-nine.py). ctl.pause/resume freeze the game + audio.
  window.bgxLevelComplete = function (level, ctl) {
    done++;
    if (!ENABLED || done % EVERY !== 0) return;
    window.adBreak({
      type: "next",
      name: "level-" + level,
      beforeAd: function () { if (ctl && ctl.pause) ctl.pause(); },
      afterAd: function () { if (ctl && ctl.resume) ctl.resume(); }
    });
  };

  // Fallback if game.js was not patched: watch the HUD level counter ("Bölüm N/50") and count +1 steps.
  document.addEventListener("DOMContentLoaded", function () {
    if (window.__bgxLevelHook) return;
    var hud = document.getElementById("hudLevel"); if (!hud || !window.MutationObserver) return;
    var num = function () { var m = /(\d+)\s*\/\s*\d+/.exec(hud.textContent || ""); return m ? +m[1] : 0; };
    var last = num();
    new MutationObserver(function () { var n = num(); if (n === last + 1) window.bgxLevelComplete(last, null); last = n; })
      .observe(hud, { childList: true, characterData: true, subtree: true });
  });
})();
