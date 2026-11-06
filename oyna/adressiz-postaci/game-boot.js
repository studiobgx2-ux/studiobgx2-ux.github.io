      // Start button works even if WebGL or the 3D library fails to load.
      window.__startQueue = [];
      // fix1106b: one language for the whole game. Order: the player's own saved choice (title or in-game TR/EN),
      // else the site's language (link from bgx2games.com.tr: /en/ pages = English), else ?lang=, else the browser language (tr -> TR, anything else -> EN).
      (function () {
        var LK = "adressiz-lang", ok = function (v) { return v === "tr" || v === "en"; }, pick = null, src = "";
        try { var sv = localStorage.getItem(LK); if (ok(sv)) { pick = sv; src = "saved"; } } catch (e) {}
        if (!pick) { try { var sl = localStorage.getItem("bgx2.lang"); if (ok(sl)) { pick = sl; src = "site"; } } catch (e) {} }
        if (!pick) {
          try {
            var r = document.referrer ? new URL(document.referrer) : null;
            if (r && r.origin === location.origin && !/^\/oyna\//.test(r.pathname)) { pick = /^\/en(\/|$)/.test(r.pathname) ? "en" : "tr"; src = "site"; }
          } catch (e) {}
        }
        if (!pick) { try { var q = new URLSearchParams(location.search).get("lang"); if (ok(q)) { pick = q; src = "url"; } } catch (e) {} }
        if (!pick) { var nl = String((navigator.languages && navigator.languages[0]) || navigator.language || ""); pick = /^tr\b/i.test(nl) ? "tr" : "en"; src = "browser"; }
        window.__langSrc = src;
        window.__setLang = function (l, save) {
          l = l === "en" ? "en" : "tr";
          window.__lang = l;
          document.documentElement.lang = l;
          document.querySelectorAll(".x-lang button").forEach(function (o) { o.setAttribute("aria-pressed", String(o.getAttribute("data-lang") === l)); });
          document.querySelectorAll("[data-" + l + "]").forEach(function (el) { el.textContent = el.getAttribute("data-" + l); });
          if (save) { try { localStorage.setItem(LK, l); } catch (e) {} }
          if (window.game && window.game.refreshLang) window.game.refreshLang();
        };
        window.__setLang(pick, false);
      })();
      document.querySelectorAll(".x-lang button").forEach(function (b) {
        b.addEventListener("click", function () { window.__setLang(b.getAttribute("data-lang"), true); });
      });
      document.getElementById("go").addEventListener("click", function () {
        var st = document.getElementById("start");
        if (window.__started) return;
        st.classList.add("is-leaving");
        setTimeout(function () { st.hidden = true; st.classList.remove("is-leaving"); }, 620);
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
      XSVG.play = '<path d="M8.5 5.5v13l10-6.5z"/>';
      XSVG.gear = '<circle cx="12" cy="12" r="3.3"/><path d="M12 3l1.7 2.3 2.8-.6.6 2.8 2.8.6-.6 2.8L21 12l-2.3 1.7.6 2.8-2.8.6-.6 2.8-2.8-.6L12 21l-1.7-2.3-2.8.6-.6-2.8-2.8-.6.6-2.8L3 12l2.3-1.7-.6-2.8 2.8-.6.6-2.8 2.8.6z"/>';
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
      // ---------- title screen (fix1106): splash "tap to start", then the paper menu; the 3D village orbits behind it ----------
      (function () {
        var $t = function (id) { return document.getElementById(id); };
        var st = $t("start"), PKEY = "adressiz-postaci-profile", SKEY = "adressiz-shake";
        var tr = function (a, b) { return window.__lang === "en" ? b : a; };
        var prof = null;
        try { prof = JSON.parse(localStorage.getItem(PKEY) || "null"); } catch (e) {}
        var hasSave = !!(prof && ((+prof.xp || 0) > 0 || (+prof.coins || 0) > 0 || (prof.x && (prof.x.tut || prof.x.total))));
        window.__apHasSave = hasSave; if (!hasSave) st.classList.add("is-fresh");
        var go = $t("go"), goL = $t("go-l");
        if (hasSave) { goL.setAttribute("data-tr", "Devam Et"); goL.setAttribute("data-en", "Continue"); goL.textContent = tr("Devam Et", "Continue"); $t("t-new").hidden = false; go.querySelector(".x-tbtn__ico").innerHTML = window.xSvg("play"); }
        var RK = [[0, "Çırak", "Apprentice"], [150, "Postacı", "Postman"], [450, "Usta Postacı", "Expert"], [1000, "Baş Postacı", "Head Postman"], [2000, "Efsane Postacı", "Legend"]];
        function summary() {
          var el = $t("title-sum"); if (!hasSave) return;
          var xp = +prof.xp || 0, r = RK[0]; RK.forEach(function (k) { if (xp >= k[0]) r = k; });
          var stamps = 0; if (prof.stamps) for (var k in prof.stamps) if (prof.stamps[k]) stamps++;
          window.xIcoText(el, tr(r[1], r[2]) + " · 🪙 " + (+prof.coins || 0) + " · ✉ " + stamps + "/16 " + tr("pul", "stamps"));
          el.hidden = false;
        }
        var nPaper = 0;
        function paper() { if (window.SND) window.SND.sfx("sfx_paper_rustle_" + (1 + (nPaper++ % 2)), { vol: 0.35 }); }
        function stage(v) { st.setAttribute("data-stage", v); }
        function toMenu() { if (st.getAttribute("data-stage") === "menu") return; stage("menu"); paper(); }
        st.addEventListener("pointerdown", function (e) { if (st.getAttribute("data-stage") === "splash") { e.preventDefault(); toMenu(); } });
        addEventListener("keydown", function (e) { if (!st.hidden && st.getAttribute("data-stage") === "splash" && /^(Enter|Space|KeyE)$/.test(e.code)) { e.preventDefault(); toMenu(); } });
        var openCard = null;
        function card(id, on) {
          var c = $t(id); if (!c) return;
          c.hidden = !on; openCard = on ? c : null;
          if (window.SND) window.SND.sfx(on ? "ui_open" : "ui_close");
          if (on) { var f = c.querySelector(".x-tcard__in"); f.setAttribute("tabindex", "-1"); setTimeout(function () { try { f.focus({ preventScroll: true }); } catch (e) {} }, 30); }
        }
        st.querySelectorAll("[data-close]").forEach(function (b) { b.addEventListener("click", function () { var c = b.closest(".x-tcard"); if (c) card(c.id, false); }); });
        st.querySelectorAll(".x-tcard").forEach(function (c) { c.addEventListener("pointerdown", function (e) { if (e.target === c) card(c.id, false); }); });
        addEventListener("keydown", function (e) { if (e.code === "Escape" && openCard) card(openCard.id, false); });
        // settings
        function onOff(b, on) { b.setAttribute("aria-pressed", String(on)); b.textContent = on ? tr("Açık", "On") : tr("Kapalı", "Off"); }
        function renderSet() {
          var v = window.SND && window.SND.getVol ? window.SND.getVol() : { m: 0.8, s: 1 };
          $t("t-mvol").value = Math.round(v.m * 100); $t("t-svol").value = Math.round(v.s * 100);
          var pf = $t("snd-perf"), perfOn = pf ? pf.getAttribute("aria-pressed") === "true" : false;
          try { if (!pf) perfOn = localStorage.getItem("adressiz-perf") === "1"; } catch (e) {}
          onOff($t("t-perf"), perfOn);
          var sh = true; try { sh = localStorage.getItem(SKEY) !== "0"; } catch (e) {}
          onOff($t("t-shake"), sh);
        }
        $t("t-mvol").addEventListener("input", function () { if (window.SND && window.SND.vol) window.SND.vol("m", this.value / 100); });
        $t("t-svol").addEventListener("input", function () { if (window.SND && window.SND.vol) window.SND.vol("s", this.value / 100); });
        $t("t-svol").addEventListener("change", function () { paper(); });
        $t("t-perf").addEventListener("click", function () {
          var pf = $t("snd-perf");
          if (pf) pf.click(); else { try { localStorage.setItem("adressiz-perf", localStorage.getItem("adressiz-perf") === "1" ? "0" : "1"); } catch (e) {} }
          setTimeout(renderSet, 60);
        });
        $t("t-shake").addEventListener("click", function () {
          var on = this.getAttribute("aria-pressed") !== "true";
          try { localStorage.setItem(SKEY, on ? "1" : "0"); } catch (e) {}
          if (window.__apShake) window.__apShake(on);
          onOff(this, on);
        });
        // confirm dialog (new game over a save, reset progress)
        var confirmFn = null;
        function ask(trTxt, enTxt, fn) { $t("t-confirm-p").textContent = tr(trTxt, enTxt); confirmFn = fn; card("t-card-confirm", true); }
        $t("t-confirm-yes").addEventListener("click", function () { var f = confirmFn; confirmFn = null; card("t-card-confirm", false); if (f) f(); });
        function wipe(flag) {
          try { localStorage.removeItem(PKEY); localStorage.removeItem("adressiz-rush-best"); sessionStorage.setItem(flag, "1"); } catch (e) {}
          location.reload();
        }
        $t("t-new").addEventListener("click", function () {
          paper();
          ask("Yeni oyun başlasın mı? Rütben, altınların ve pulların sıfırlanır.", "Start a new game? Your rank, coins and stamps will be reset.", function () { wipe("ap-newgame"); });
        });
        $t("t-reset").addEventListener("click", function () {
          ask("Tüm ilerleme silinsin mi? Bu geri alınamaz.", "Erase all progress? This can't be undone.", function () { wipe("ap-menu"); });
        });
        $t("t-set").addEventListener("click", function () { paper(); renderSet(); card("t-card-set", true); });
        $t("t-album").addEventListener("click", function () {
          paper();
          if (window.__apAlbum) window.__apAlbum($t("t-albumgrid"), $t("t-album-c"));
          else $t("t-album-c").textContent = tr("Köy yükleniyor…", "The village is loading…");
          card("t-card-album", true);
        });
        $t("t-how").addEventListener("click", function () {
          paper();
          var touch = document.body.classList.contains("is-touch") || matchMedia("(pointer: coarse)").matches;
          $t("t-how-ctl").textContent = touch
            ? tr("Sol başparmak: yürü · Al / Teslim düğmesi: etkileşim · Ekranı sürükle: kamera", "Left thumb: walk · Take / Deliver button: interact · Drag the screen: camera")
            : tr("WASD: yürü · Shift: koş · E: etkileşim · Q: mektup seç · B: scooter · G: köpek · Sürükle: kamera", "WASD: walk · Shift: run · E: interact · Q: pick a letter · B: scooter · G: dog · Drag: camera");
          card("t-card-how", true);
        });
        go.addEventListener("click", function () { paper(); }, true);
        document.querySelectorAll(".x-lang button").forEach(function (b) { b.addEventListener("click", function () { summary(); renderSet(); }); });
        summary();
        // came back from "Main Menu" / a reset: skip the splash; a confirmed new game starts by itself once the village is ready
        var flagMenu = null, flagNew = null;
        try { flagMenu = sessionStorage.getItem("ap-menu"); flagNew = sessionStorage.getItem("ap-newgame"); sessionStorage.removeItem("ap-menu"); sessionStorage.removeItem("ap-newgame"); } catch (e) {}
        if (flagMenu || flagNew) stage("menu");
        if (flagNew) {
          var wait = setInterval(function () { if ($t("load").hidden && window.__apReady) { clearInterval(wait); go.click(); } }, 200);
        }
      })();
      // never leave the loading screen up, even if the 3D scripts fail
      setTimeout(function () { document.getElementById("load").hidden = true; }, 23000);
    