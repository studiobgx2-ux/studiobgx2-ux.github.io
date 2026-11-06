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
      // cozy inline SVG icons (rounded, 2px stroke, cream fill): the same on every device, unlike emoji
      var XSVG = {"scooter": "<circle cx=\"6\" cy=\"18\" r=\"2.8\"/><circle cx=\"18.5\" cy=\"18\" r=\"2.8\"/><rect x=\"4.5\" y=\"13.2\" width=\"11\" height=\"2.8\" rx=\"1.4\"/><path class=\"n\" d=\"M18.5 17 15.6 4.5M13 4.5h5\"/>", "shop": "<path d=\"M5 8.5h14l-1.1 11.3a1.6 1.6 0 0 1-1.6 1.4H7.7a1.6 1.6 0 0 1-1.6-1.4Z\"/><path class=\"n\" d=\"M9 11V7a3 3 0 0 1 6 0v4\"/>", "snd": "<path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4Z\"/><path class=\"n\" d=\"M15.5 9.2a4 4 0 0 1 0 5.6M18.2 6.6a7.6 7.6 0 0 1 0 10.8\"/>", "mute": "<path d=\"M4 9.5h3.5L12 5.5v13l-4.5-4H4Z\"/><path class=\"n\" d=\"M15.5 9.5 20 14.5\"/>", "note": "<rect x=\"5\" y=\"3.5\" width=\"14\" height=\"17\" rx=\"2\"/><path class=\"a\" d=\"M7 3.5h2.5v17H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z\"/><path class=\"n\" d=\"M12.5 8.5h4M12.5 12h4\"/>", "dog": "<path class=\"a\" d=\"M7.6 6 4 8.6l1.3 5.2 3-2.3Z\"/><path class=\"a\" d=\"M16.4 6 20 8.6l-1.3 5.2-3-2.3Z\"/><path d=\"M7.2 10c0-3 2.2-5.2 4.8-5.2s4.8 2.2 4.8 5.2v4.2c0 3-2.2 5.6-4.8 5.6s-4.8-2.6-4.8-5.6Z\"/><circle class=\"d\" cx=\"10\" cy=\"11.2\" r=\"1.1\"/><circle class=\"d\" cx=\"14\" cy=\"11.2\" r=\"1.1\"/><ellipse class=\"d\" cx=\"12\" cy=\"15.2\" rx=\"1.7\" ry=\"1.2\"/>", "sun": "<circle class=\"a\" cx=\"12\" cy=\"12\" r=\"4.6\"/><circle class=\"d\" cx=\"19.95\" cy=\"15.27\" r=\"1.3\"/><circle class=\"d\" cx=\"15.31\" cy=\"19.94\" r=\"1.3\"/><circle class=\"d\" cx=\"8.73\" cy=\"19.95\" r=\"1.3\"/><circle class=\"d\" cx=\"4.06\" cy=\"15.31\" r=\"1.3\"/><circle class=\"d\" cx=\"4.05\" cy=\"8.73\" r=\"1.3\"/><circle class=\"d\" cx=\"8.69\" cy=\"4.06\" r=\"1.3\"/><circle class=\"d\" cx=\"15.27\" cy=\"4.05\" r=\"1.3\"/><circle class=\"d\" cx=\"19.94\" cy=\"8.69\" r=\"1.3\"/>", "moon": "<path class=\"a\" d=\"M15.2 4.2a8 8 0 1 0 4.6 12.2 6.6 6.6 0 0 1-4.6-12.2Z\"/><circle class=\"d\" cx=\"18.5\" cy=\"6\" r=\"1\"/>", "house": "<path d=\"M4 11.2 12 4.5l8 6.7v8.3a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 19.5Z\"/><path class=\"a\" d=\"M10 20.7v-4.6a2 2 0 0 1 4 0v4.6Z\"/>", "flame": "<path class=\"a\" d=\"M12 21c-3.6 0-6-2.4-6-5.6 0-3.4 2.6-5 3.4-8.4.2-.8 1.1-1.1 1.6-.4C13 8.9 13.2 10.6 13 12c1-.6 1.6-1.6 1.8-2.8.1-.6.9-.8 1.3-.3C17.2 10.4 18 12.4 18 15.4 18 18.6 15.6 21 12 21Z\"/>", "postbox": "<path class=\"a\" d=\"M6 20.5V9.5a6 6 0 0 1 12 0v11Z\"/><path class=\"n\" d=\"M9.5 10h5\"/><path class=\"n\" d=\"M6 15h12\"/>", "map": "<path d=\"M3.5 6.5 9 4l6 2.5L20.5 4v13.5L15 20l-6-2.5-5.5 2.5Z\"/><path class=\"n\" d=\"M9 4v13.5M15 6.5V20\"/>", "cap": "<path d=\"M5 15.5a7 7 0 0 1 14 0Z\"/><path class=\"a\" d=\"M11.5 15.5h8.8a1 1 0 0 1 0 2h-8.8Z\"/><circle class=\"d\" cx=\"12\" cy=\"8.2\" r=\"1\"/>", "shirt": "<path d=\"M8.5 4 4 6.6l1.8 4 2.2-.8V20h8V9.8l2.2.8 1.8-4L15.5 4c-.6 1.5-2 2.5-3.5 2.5S9.1 5.5 8.5 4Z\"/>", "handbag": "<path d=\"M4.5 10h15l-1.4 9.4a1.6 1.6 0 0 1-1.6 1.4h-9a1.6 1.6 0 0 1-1.6-1.4Z\"/><path class=\"n\" d=\"M8.5 10a3.5 3.5 0 0 1 7 0\"/><circle class=\"d\" cx=\"12\" cy=\"14\" r=\"1\"/>", "star": "<path class=\"a\" d=\"M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z\"/>", "hands": "<path d=\"M2.5 11.5 6.5 7l4 1.6L13 7.4l4.5 1.8 4 3.3-3.6 3.8-5.5 3.5-2.4-1.2-1.6.4-4.6-4.2Z\"/><path class=\"n\" d=\"M10.5 8.6 8 12.2c.8.8 2 .8 2.8 0l2-1.8M12.4 15.4l2.3 1.6M10.6 17.2l1.7 1.2\"/>", "dot": "<circle class=\"r\" cx=\"12\" cy=\"12\" r=\"6.5\"/>", "party": "<path class=\"a\" d=\"M4 20.5 8.4 8.3l7.3 7.3Z\"/><path class=\"n\" d=\"M12.5 9.5c.8-2.2 2.8-3.4 5.2-2.8M15 13.2c1.6-.9 3.4-.8 5 .3\"/><circle class=\"d\" cx=\"14.5\" cy=\"4.5\" r=\"1.1\"/><circle class=\"d\" cx=\"19.5\" cy=\"9.5\" r=\"1.1\"/><circle class=\"d\" cx=\"20\" cy=\"4\" r=\"1\"/>", "horn": "<path class=\"a\" d=\"M3.5 9.5h3l10.5-5v15L6.5 14.5h-3Z\"/><path class=\"n\" d=\"M6.5 14.5 8 19.5h2.5l-1-4.2\"/><path class=\"n\" d=\"M19.5 9.5a3.5 3.5 0 0 1 0 5\"/>", "ticket": "<path d=\"M3.5 7.5h17v3a1.5 1.5 0 0 0 0 3v3h-17v-3a1.5 1.5 0 0 0 0-3Z\"/><circle class=\"d\" cx=\"14.5\" cy=\"9.5\" r=\".9\"/><circle class=\"d\" cx=\"14.5\" cy=\"12\" r=\".9\"/><circle class=\"d\" cx=\"14.5\" cy=\"14.5\" r=\".9\"/>", "door": "<rect x=\"6\" y=\"3.5\" width=\"12\" height=\"17\" rx=\"1.6\"/><circle class=\"d\" cx=\"15\" cy=\"12.5\" r=\"1.1\"/>", "gift": "<rect x=\"4.5\" y=\"10\" width=\"15\" height=\"10.5\" rx=\"1.5\"/><path class=\"a\" d=\"M10.5 10h3v10.5h-3Z\"/><path class=\"n\" d=\"M12 10C10.5 6 7 5.5 7 8s3.4 2 5 2c1.6 0 5 .5 5-2s-3.5-2-5 2\"/>", "lock": "<rect x=\"5\" y=\"10.5\" width=\"14\" height=\"10\" rx=\"2\"/><path class=\"n\" d=\"M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5\"/><circle class=\"d\" cx=\"12\" cy=\"15.5\" r=\"1.4\"/>", "eye": "<path d=\"M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z\"/><circle class=\"a\" cx=\"12\" cy=\"12\" r=\"3.2\"/><circle class=\"d\" cx=\"12\" cy=\"12\" r=\"1.3\"/>", "bulb": "<path class=\"a\" d=\"M12 3.5a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2v.5h5v-.5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3.5Z\"/><path class=\"n\" d=\"M9.8 19.5h4.4M10.6 21.5h2.8\"/>"};
      window.xSvg = function (name, cls) {
        var d = XSVG[name]; if (!d) return "";
        return '<svg class="x-svg' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + d + "</svg>";
      };
      window.xSvgEl = function (name, cls) { var t = document.createElement("span"); t.className = "x-svgw"; t.innerHTML = window.xSvg(name, cls); return t; };
      // emoji that become SVG icons wherever text goes through xIcoText (toasts, chips)
      var SVGMAP = { "🐶": "dog", "📯": "horn", "🔥": "flame", "🌟": "star", "🛴": "scooter", "🎁": "gift", "🤝": "hands", "🏡": "house", "🎟": "ticket", "📮": "postbox", "🔴": "dot", "🎉": "party", "🔒": "lock", "👁": "eye", "🚪": "door", "🛍": "shop", "🔊": "snd", "🔇": "mute", "🧢": "cap", "👕": "shirt", "👜": "handbag", "☀": "sun", "🌙": "moon" };
      document.querySelectorAll("[data-svg]").forEach(function (el) { el.innerHTML = window.xSvg(el.getAttribute("data-svg")); });
      // writes text into el, turning HUD emoji into icons.png cells (the emoji stays as the fallback text), and others into SVG icons
      window.xIcoText = function (el, str) {
        var map = { "🪙": [2], "💡": [4], "⏱": [9], "★": [10], "☆": [10, 1], "✉": [0], "📒": [5], "🗺": [6], "🔍": [11], "♥": [3], "♡": [3, 1] };
        el.textContent = "";
        String(str).split(/(🪙|💡|⏱️?|★|☆|✉️?|📒|🗺️?|🔍|♥|♡|🐶|📯|🔥|🌟|🛴|🎁|🤝|🏡|🎟️?|📮|🔴|🎉|🔒|👁️?|🚪|🛍️?|🔊|🔇|🧢|👕|👜|☀️?|🌙)/u).forEach(function (part) {
          if (!part) return;
          var key = part.replace(/\uFE0F/g, "");
          if (SVGMAP[key]) { el.appendChild(window.xSvgEl(SVGMAP[key])); return; }
          var m = map[key];
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
