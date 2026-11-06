      // Start button works even if WebGL or the 3D library fails to load.
      window.__startQueue = [];
      window.__lang = "tr";
      document.querySelectorAll(".x-lang button").forEach(function (b) {
        b.addEventListener("click", function () {
          var l = b.getAttribute("data-lang");
          window.__lang = l;
          document.documentElement.lang = l;
          document.querySelectorAll(".x-lang button").forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
          document.querySelectorAll("[data-" + l + "]").forEach(function (el) { el.textContent = el.getAttribute("data-" + l); });
          if (window.game && window.game.refreshLang) window.game.refreshLang();
        });
      });
      document.getElementById("go").addEventListener("click", function () {
        document.getElementById("start").hidden = true;
        window.__started = true;
        if (window.SND) window.SND.music("music_village");
        try { screen.orientation.lock("landscape").catch(function () {}); } catch (e) {}
        window.__startQueue.forEach(function (f) { f(); });
      });
      // 2D art pack: switch each layer on only once its image has really loaded; otherwise the emoji/CSS visuals stay
      (function () {
        var layers = [["art-icons", "--x-icons", "x-art-icons"], ["art-badges", "--x-badges", "x-art-badges"], ["art-paper", "--x-paper", null], ["art-frame", "--x-frame", null]];
        function ok(img) { return img && img.complete && img.naturalWidth > 0; }
        function apply() {
          layers.forEach(function (l) {
            var img = document.getElementById(l[0]);
            if (!ok(img)) return;
            document.documentElement.style.setProperty(l[1], 'url("' + img.currentSrc + '")');
            if (l[2]) document.body.classList.add(l[2]);
          });
          if (ok(document.getElementById("art-paper")) && ok(document.getElementById("art-frame"))) document.body.classList.add("x-art-paper");
        }
        layers.forEach(function (l) { var img = document.getElementById(l[0]); if (img) img.addEventListener("load", apply); });
        apply();
      })();
      // writes text into el, turning HUD emoji into icons.png cells (the emoji stays as the fallback text)
      window.xIcoText = function (el, str) {
        var map = { "🪙": [2], "💡": [4], "⏱": [9], "★": [10], "☆": [10, 1], "✉": [0], "📒": [5], "🗺": [6], "🔍": [11], "♥": [3], "♡": [3, 1] };
        el.textContent = "";
        String(str).split(/(🪙|💡|⏱️?|★|☆|✉️?|📒|🗺️?|🔍|♥|♡)/u).forEach(function (part) {
          if (!part) return;
          var m = map[part.replace(/\uFE0F/g, "")];
          if (!m) { el.appendChild(document.createTextNode(part)); return; }
          var s = document.createElement("span");
          s.className = "x-ico" + (m[1] ? " is-empty" : ""); s.style.setProperty("--i", m[0]); s.setAttribute("aria-hidden", "true"); s.setAttribute("data-e", part);
          el.appendChild(s);
        });
      };
      document.getElementById("maptoggle").addEventListener("click", function () {
        var mm = document.getElementById("minimap"), on = mm.hidden;
        mm.hidden = !on; this.setAttribute("aria-pressed", String(on));
      });
      // never leave the loading screen up, even if the 3D scripts fail
      setTimeout(function () { document.getElementById("load").hidden = true; }, 23000);
          // BGX2 site: ?lang=tr|en from the site picks the starting language
      try {
        var q = new URLSearchParams(location.search).get("lang");
        if (q === "en" || q === "tr") { var lb = document.querySelector('.x-lang button[data-lang="' + q + '"]'); if (lb) lb.click(); }
      } catch (e) {}
