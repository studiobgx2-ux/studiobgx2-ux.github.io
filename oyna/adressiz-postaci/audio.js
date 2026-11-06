      // ---------- audio: one Web Audio context, master -> music / sfx / ambience buses; never blocks the game, fails silently ----------
      (function () {
        var noop = function () {};
        var api = { ctx: null, sfx: function () { return null; }, jingle: function () { return null; }, music: noop, prefetch: noop, out: function () { return null; },
          blip: noop, river: noop, roll: noop, adStart: noop, adEnd: noop };
        window.SND = api;
        try {
          var FILES = {};
          document.querySelectorAll("audio[data-snd]").forEach(function (a) { FILES[a.getAttribute("data-snd")] = a.getAttribute("src"); });
          var VOL = {
            jingle_round_complete: 0.6, jingle_round_fail: 0.5, jingle_delivery_success: 0.6, jingle_delivery_success_alt: 0.6, jingle_wrong_house: 0.5,
            sfx_door_knock: 0.6, sfx_paper_rustle_1: 0.6, sfx_paper_rustle_2: 0.6, sfx_letter_open: 0.6, sfx_letter_land: 0.6, sfx_coins_bag: 0.5,
            sfx_dog_bark: 0.4, sfx_sheep_baa: 0.4, sfx_coin: 0.5, sfx_bell_ring: 0.5, sfx_bell_ding: 0.5, sfx_toss_whoosh: 0.5, sfx_scooter_kick: 0.4,
            sfx_hint_sparkle: 0.45, sfx_chatter_line_1: 0.35, sfx_chatter_line_2: 0.35,
          };
          var MUSIC_VOL = { music_village: 0.45, music_evening: 0.4, music_title: 0.45 };
          var LOOP_END = { music_village: 124.444, music_evening: 128, music_title: 60.632, amb_village_loop: 32, amb_river_loop: 20, sfx_scooter_roll_loop: 2 };
          var PRE = ["ui_tap", "ui_open", "ui_close", "ui_confirm", "ui_back", "ui_toggle", "jingle_delivery_success", "jingle_delivery_success_alt", "jingle_wrong_house", "jingle_round_complete", "jingle_round_fail", "music_village"];
          var MAX_VOICES = 12, KEY = "adressiz.audio";
          var set = { music: true, sfx: true };
          try { var sv = JSON.parse(localStorage.getItem(KEY) || "null"); if (sv) { set.music = sv.music !== false; set.sfx = sv.sfx !== false; } } catch (e) {}
          var ctx = null, master, musicBus, duckG, sfxBus, ambBus;
          var bytes = {}, bufs = {}, pend = {}, voices = [], hid = document.hidden, ad = false, sdkMute = false;
          var cur = null, want = null, ambH = null, riverH = null, rollH = null, windH = null;
          var muted = function () { return hid || ad || sdkMute; };
          var live = function () { return ctx && ctx.state === "running" && !muted(); };

          function fetchBytes(n) {
            if (!FILES[n]) return Promise.reject(new Error("no file"));
            if (!bytes[n]) bytes[n] = fetch(FILES[n]).then(function (r) { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); });
            return bytes[n];
          }
          function decode(ab) {
            return new Promise(function (res, rej) {
              try { var p = ctx.decodeAudioData(ab, res, rej); if (p && p.then) p.then(res, rej); } catch (e) { rej(e); }
            });
          }
          function load(n) {
            if (bufs[n]) return Promise.resolve(bufs[n]);
            if (pend[n]) return pend[n];
            if (!ctx) return Promise.reject(new Error("no context"));
            pend[n] = fetchBytes(n).then(decode).then(function (b) { bufs[n] = b; delete pend[n]; delete bytes[n]; return b; },
              function (e) { delete pend[n]; delete bytes[n]; throw e; });
            return pend[n];
          }
          // compressed bytes start arriving before the first tap; decoding waits for the context
          PRE.forEach(function (n) { fetchBytes(n).catch(noop); });

          function gain(v, to) { var g = ctx.createGain(); g.gain.value = v; if (to) g.connect(to); return g; }
          function ramp(param, v, tc) { var t = ctx.currentTime; try { param.cancelScheduledValues(t); param.setValueAtTime(param.value, t); param.setTargetAtTime(v, t, tc || 0.08); } catch (e) {} }
          function build() {
            master = gain(muted() ? 0 : 1, ctx.destination);
            duckG = gain(1, master);
            musicBus = gain(set.music ? 1 : 0, duckG);
            sfxBus = gain(set.sfx ? 1 : 0, master);
            ambBus = gain(set.sfx ? 1 : 0, master);
          }
          function unlock() {
            if (!ctx) {
              var AC = window.AudioContext || window.webkitAudioContext;
              if (!AC) return;
              try { ctx = new AC(); } catch (e) { return; }
              api.ctx = ctx; build();
              // first batch: UI, jingles, the village theme; then everything small; music only when it is asked for
              Promise.all(PRE.map(function (n) { return load(n).catch(noop); })).then(function () {
                Object.keys(FILES).forEach(function (n) { if (!/^music_/.test(n) && PRE.indexOf(n) < 0) load(n).catch(noop); });
              });
              ambH = loop("amb_village_loop", ambBus); ambH.set(0.25);
              riverH = loop("amb_river_loop", ambBus);
              rollH = loop("sfx_scooter_roll_loop", sfxBus);
              if (want) { var w = want; want = null; music(w); }
            }
            if (ctx.state !== "running" && !hid && !ad) {
              try { ctx.resume().catch(noop); } catch (e) {}
              // iOS: a silent buffer started inside the gesture wakes the output
              try { var s = ctx.createBufferSource(); s.buffer = ctx.createBuffer(1, 1, 22050); s.connect(ctx.destination); s.start(0); } catch (e) {}
            }
          }
          ["pointerdown", "touchend", "keydown"].forEach(function (ev) { window.addEventListener(ev, unlock, true); });

          function sfx(n, o) {
            o = o || {};
            if (!live() || !set.sfx) return null;
            var b = bufs[n];
            if (!b) { load(n).catch(noop); return null; }
            while (voices.length >= MAX_VOICES) { var old = voices.shift(); try { old.s.stop(); } catch (e) {} }
            try {
              var s = ctx.createBufferSource(), g = gain(o.vol != null ? o.vol : VOL[n] != null ? VOL[n] : 0.5), out = g;
              s.buffer = b; s.playbackRate.value = o.rate || 1; s.connect(g);
              if (o.pan && ctx.createStereoPanner) { var p = ctx.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, o.pan)); g.connect(p); out = p; }
              out.connect(sfxBus);
              var v = { s: s };
              voices.push(v);
              s.onended = function () { var i = voices.indexOf(v); if (i >= 0) voices.splice(i, 1); try { out.disconnect(); } catch (e) {} };
              var t0 = ctx.currentTime + (o.delay || 0);
              s.start(t0);
              if (o.dur > 0.3 && o.dur < b.duration) {
                // cut short with a quick fade, for a brief sting from a longer jingle
                g.gain.setValueAtTime(g.gain.value, t0 + o.dur - 0.3); g.gain.linearRampToValueAtTime(0.0001, t0 + o.dur); s.stop(t0 + o.dur + 0.02);
              }
              return v;
            } catch (e) { return null; }
          }
          function duck(sec) {
            if (!ctx) return;
            var t = ctx.currentTime, p = duckG.gain;
            try { p.cancelScheduledValues(t); p.setValueAtTime(p.value, t); p.linearRampToValueAtTime(0.3, t + 0.12); p.setValueAtTime(0.3, t + sec); p.linearRampToValueAtTime(1, t + sec + 0.8); } catch (e) {}
          }
          function jingle(n, o) {
            var v = sfx(n, o);
            if (v) duck(Math.max(o && o.dur ? 1 : 2, Math.min(6, o && o.dur ? o.dur : bufs[n].duration)));
            return v;
          }
          // music: crossfade 1.5 s; a track's decoded buffer is dropped once it has faded out, to keep memory low on phones
          function music(n) {
            want = n;
            if (!ctx || (cur && cur.n === n)) return;
            load(n).then(function (b) {
              if (want !== n || (cur && cur.n === n)) return;
              var t = ctx.currentTime, s = ctx.createBufferSource(), g = gain(0);
              s.buffer = b; s.loop = true; s.loopStart = 0;
              if (LOOP_END[n] && LOOP_END[n] < b.duration) s.loopEnd = LOOP_END[n];
              g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(MUSIC_VOL[n] || 0.4, t + 1.5);
              s.connect(g); g.connect(musicBus); s.start(t);
              var o = cur;
              cur = { n: n, s: s, g: g };
              if (o) {
                try { o.g.gain.cancelScheduledValues(t); o.g.gain.setValueAtTime(o.g.gain.value, t); o.g.gain.linearRampToValueAtTime(0.0001, t + 1.5); o.s.stop(t + 1.6); } catch (e) {}
                setTimeout(function () { try { o.g.disconnect(); } catch (e) {} if (cur.n !== o.n && want !== o.n) delete bufs[o.n]; }, 1800);
              }
            }).catch(noop);
          }
          // a looping bed whose level (and rate) the game sets each frame
          function loop(n, bus) {
            var h = { level: 0, rate: 1, s: null, g: null, busy: false };
            h.set = function (level, rate) {
              if (rate == null) rate = h.rate;
              var dl = Math.abs(level - h.level) > 0.004, dr = Math.abs(rate - h.rate) > 0.005;
              h.level = level; h.rate = rate;
              if (!h.s) {
                if (level <= 0 || h.busy) return;
                if (!bufs[n]) { h.busy = true; load(n).then(function () { h.busy = false; h.set(h.level, h.rate); }, function () { h.busy = false; }); return; }
                try {
                  h.s = ctx.createBufferSource(); h.g = gain(0, bus);
                  h.s.buffer = bufs[n]; h.s.loop = true; h.s.loopStart = 0;
                  if (LOOP_END[n] && LOOP_END[n] < bufs[n].duration) h.s.loopEnd = LOOP_END[n];
                  h.s.playbackRate.value = rate; h.s.connect(h.g); h.s.start();
                  dl = dr = true;
                } catch (e) { h.s = null; return; }
              }
              if (dl) ramp(h.g.gain, level, 0.12);
              if (dr) ramp(h.s.playbackRate, rate, 0.1);
            };
            return h;
          }
          function blip(pitch) {
            return sfx("sfx_chatter_blip_" + (1 + Math.floor(Math.random() * 6)), { vol: 0.3, rate: (pitch || 1) * (0.94 + Math.random() * 0.12) });
          }

          // ---------- mute: hidden page, ads, SDK setting ----------
          function applyMute() {
            if (!ctx) return;
            try { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(muted() ? 0 : 1, ctx.currentTime); } catch (e) {}
            try {
              if (hid || ad) ctx.suspend().catch(noop);
              else if (ctx.state !== "running") ctx.resume().catch(noop);
            } catch (e) {}
          }
          document.addEventListener("visibilitychange", function () { hid = document.hidden; applyMute(); });
          function adStart() { ad = true; applyMute(); }
          function adEnd() { ad = false; applyMute(); }
          var cgTries = 0;
          (function hookCG() {
            try {
              var sdk = window.CrazyGames && window.CrazyGames.SDK;
              if (sdk) {
                if (sdk.addEventListener) { sdk.addEventListener("adStarted", adStart); sdk.addEventListener("adFinished", adEnd); sdk.addEventListener("adError", adEnd); }
                var gm = sdk.game;
                if (gm && gm.settings && "muteAudio" in gm.settings) sdkMute = !!gm.settings.muteAudio;
                if (gm && gm.addSettingsChangeListener) gm.addSettingsChangeListener(function (s) { sdkMute = !!(s && s.muteAudio); applyMute(); });
                applyMute();
                return;
              }
            } catch (e) { return; }
            if (++cgTries < 10) setTimeout(hookCG, 1000);
          })();

          // ---------- settings panel ----------
          var btn = document.getElementById("sndbtn"), panel = document.getElementById("sndpanel");
          var tM = document.getElementById("snd-music"), tS = document.getElementById("snd-sfx");
          function label(on) { return window.__lang === "en" ? (on ? "On" : "Off") : on ? "Açık" : "Kapalı"; }
          function renderSet() {
            tM.setAttribute("aria-pressed", String(set.music)); tM.textContent = label(set.music);
            tS.setAttribute("aria-pressed", String(set.sfx)); tS.textContent = label(set.sfx);
            btn.innerHTML = window.xSvg ? '<span class="x-svgw">' + window.xSvg(set.music || set.sfx ? "snd" : "mute") + "</span>" : set.music || set.sfx ? "🔊" : "🔇";
            btn.setAttribute("aria-label", window.__lang === "en" ? "Sound settings" : "Ses ayarları");
          }
          function save() { try { localStorage.setItem(KEY, JSON.stringify(set)); } catch (e) {} }
          function applySet() {
            if (!ctx) return;
            ramp(musicBus.gain, set.music ? 1 : 0, 0.15);
            ramp(sfxBus.gain, set.sfx ? 1 : 0, 0.05);
            ramp(ambBus.gain, set.sfx ? 1 : 0, 0.15);
          }
          function openPanel(open) {
            if (open === !panel.hidden) return;
            panel.hidden = !open; btn.setAttribute("aria-expanded", String(open));
            sfx(open ? "ui_open" : "ui_close");
          }
          btn.addEventListener("click", function (e) { e.stopPropagation(); unlock(); openPanel(panel.hidden); btn.blur(); });
          tM.addEventListener("click", function (e) { e.stopPropagation(); set.music = !set.music; save(); applySet(); renderSet(); sfx("ui_toggle"); tM.blur(); });
          tS.addEventListener("click", function (e) { e.stopPropagation(); set.sfx = !set.sfx; save(); applySet(); renderSet(); if (set.sfx) setTimeout(function () { sfx("ui_toggle"); }, 60); tS.blur(); });
          [btn, panel].forEach(function (el) { el.addEventListener("pointerdown", function (e) { e.stopPropagation(); }); });
          document.addEventListener("pointerdown", function (e) { if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) openPanel(false); });
          document.querySelectorAll(".x-lang button").forEach(function (b) { b.addEventListener("click", renderSet); });
          renderSet();

          // ---------- UI clicks (capture, so buttons that stop propagation still get their tap) ----------
          document.addEventListener("click", function (e) {
            var b = e.target && e.target.closest ? e.target.closest("button") : null;
            if (!b) return;
            var id = b.id;
            if (id === "go" || id === "again") sfx("ui_confirm");
            else if (id === "maptoggle" || (b.parentNode && b.parentNode.classList && b.parentNode.classList.contains("x-lang"))) sfx("ui_toggle");
            else if (id === "notechip") sfx(b.getAttribute("aria-expanded") === "true" ? "ui_close" : "ui_open");
            else if (id === "bikechip" || id === "act") sfx("ui_tap", { vol: 0.35 });
          }, true);

          Object.assign(api, {
            sfx: sfx, jingle: jingle, music: music, duck: duck, blip: blip, adStart: adStart, adEnd: adEnd,
            prefetch: function (n) { fetchBytes(n).catch(noop); },
            out: function () { return live() && set.sfx ? sfxBus : null; },
            river: function (k) { if (riverH) riverH.set(0.5 * Math.max(0, Math.min(1, k))); },
            // surface: 1 on dirt (louder, crunchier), about 0.55 on grass (softer, lower)
            roll: function (v, surf) { if (!rollH) return; var k = Math.max(0, Math.min(1, v / 22)), m = surf == null ? 1 : surf; rollH.set(v > 0.3 ? (0.08 + 0.24 * k) * m : 0, (0.8 + 0.5 * k) * (0.85 + 0.15 * m)); },
            // wind whoosh: looping filtered noise, level and brightness rise with speed (k 0..1)
            wind: function (k) {
              if (!ctx || !live()) return;
              k = Math.max(0, Math.min(1, k || 0));
              if (!windH) {
                if (k <= 0) return;
                try {
                  var n = ctx.sampleRate * 2, b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0), last = 0;
                  for (var i = 0; i < n; i++) { last = last * 0.97 + (Math.random() * 2 - 1) * 0.03; d[i] = last * 6; }
                  var src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = gain(0, sfxBus);
                  src.buffer = b; src.loop = true; f.type = "bandpass"; f.frequency.value = 500; f.Q.value = 0.7;
                  src.connect(f); f.connect(g); src.start();
                  windH = { f: f, g: g, k: -1 };
                } catch (e) { windH = null; return; }
              }
              if (Math.abs(k - windH.k) < 0.02) return;
              windH.k = k; ramp(windH.g.gain, 0.16 * k * k, 0.2); ramp(windH.f.frequency, 400 + 900 * k, 0.2);
            },
          });
          // the title theme plays on the start screen once the first tap unlocks audio
          music("music_title");
        } catch (e) { /* audio unavailable: the game runs silent */ }
      })();
    