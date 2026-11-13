      /* ===== TR/EN: T(trText) returns the English line when LANG is "en", the Turkish otherwise ===== */
      let LANG = "en"; // default English (user, 2026-11-13)
      // BGX2 site: ?lang=tr|en from the site wins over the browser language
      try { const q = new URLSearchParams(location.search).get("lang"); if (q === "tr" || q === "en") LANG = q; } catch (_) {}
      try { const s = localStorage.getItem("nine_lang"); if (s === "tr" || s === "en") LANG = s; } catch (_) {} // the player's own choice wins
      const EN = {
        // screens, buttons, HUD
        "NİNE: KAPANLAR": "GRANNY TRAPS", "Oyun başlasın...": "Let the games begin...",
        "Yeşil bayrağa ulaş. Hiçbir şeye güvenme.": "Reach the green flag. Trust nothing.",
        "A/D veya oklar: yürü · W/Boşluk/Yukarı: zıpla": "A/D or arrows: walk · W/Space/Up: jump",
        "İpte: ◀ ▶ ile sallan, zıplayarak bırak": "On a rope: ◀ ▶ to swing, jump to let go",
        "KOD": "CODE", "Bölüm kodu": "Level code", "Başla": "Start", "DEVAM ET": "CONTINUE", "Bölüm Seç": "Level Select",
        "Bu oturumda ulaştığın bölümler": "Levels you've reached this session", "Kapat": "Close", "Ayarlar": "Settings", "Dil": "Language", "Müzik": "Music",
        "Telefonu yan çevir 📱↻": "Turn your phone sideways 📱↻", "Tebrikler!": "You did it!",
        "Nine bayrağa ulaştı.": "Granny made it to the flag.", "Tekrar Oyna": "Play Again", "ölüm": "deaths",
        "Bölüm": "Level", "Ölüm sayısı": "Deaths", "Müziği kapat": "Mute music", "Müziği aç": "Unmute music", "Tam ekran": "Fullscreen", "Tam ekran açılamadı": "Couldn't go fullscreen",
        "iPhone'da tam ekran için: Paylaş → Ana Ekrana Ekle": "On iPhone: Share → Add to Home Screen",
        "ZIPLA": "JUMP", "Zıpla": "Jump", "Sola": "Left", "Sağa": "Right", "Hikâye": "Story",
        "Kukla can barı": "Puppet health bar", "KUKLA": "PUPPET", "NİNE": "GRANNY", "KUKLA · TV'DE": "THE PUPPET · ON TV",
        "Geçmek için dokun": "Tap to skip", "Kod": "Code", "MEKAN": "AREA",
        "Oyun yüklenemedi. Sayfayı yenileyip tekrar dene.": "The game couldn't load. Refresh the page and try again.",
        // toasts
        "Kontrol noktası!": "Checkpoint!", "Kukla düştü!": "The Puppet fell!", "Kontroller ters!": "Controls reversed!",
        // painted signs
        "SİRK": "CIRCUS", "NİNE DURAĞI": "GRANNY STOP", "DİKKAT": "DANGER", "KAYGAN": "WET", "ZEMİN": "FLOOR",
        "ŞARJ": "CHARGE", "ÇIKIŞ →": "EXIT →", "ALKIŞ": "APPLAUSE",
        // zones
        "Bodrum": "Basement", "Huzurevi": "Nursing Home", "Hastane": "Hospital", "Kasap": "Butcher's", "Lunapark": "Funfair",
        "Kanalizasyon": "Sewers", "Fabrika": "Factory", "Buzhane": "Icehouse", "Metro Tüneli": "Metro Tunnel",
        "Kukla'nın Stüdyosu": "The Puppet's Studio",
        // level names
        "İlk Adım": "Baby Steps", "Kazan Dairesi": "Boiler Room", "Karanlık Kiler": "Dark Pantry", "Kaç!": "Run!",
        "KUKLA: Kazan Ustası": "PUPPET: Boiler Boss", "Ziyaret Saati": "Visiting Hours", "Islak Zemin": "Wet Floor",
        "Öğle Uykusu": "Afternoon Nap", "Kaçan Bayrak": "Runaway Flag", "KUKLA: Bakıcı": "PUPPET: The Carer",
        "Acil Servis": "Emergency Room", "Koridor 3": "Corridor 3", "Elektrik Kesintisi": "Power Cut",
        "Ameliyathane": "Operating Theatre", "KUKLA: Başhekim": "PUPPET: Chief Surgeon", "Kasap Dükkânı": "Butcher Shop",
        "Soğuk Oda": "Cold Room", "Ters Bant": "Backwards Belt", "Mezbaha": "Slaughterhouse", "KUKLA: Kasap": "PUPPET: The Butcher",
        "Lunapark Girişi": "Funfair Gates", "Pamuk Şeker": "Candy Floss", "Aynalar": "Hall of Mirrors",
        "KUKLA: Palyaço": "PUPPET: The Clown", "Lağım Girişi": "Sewer Entrance", "Yükselen Su": "Rising Water",
        "Fare Kralı": "Rat King", "Ana Kanal": "Main Drain", "KUKLA: Lağım Faresi": "PUPPET: Sewer Rat",
        "Vardiya Başı": "Clocking In", "Lazer Hattı": "Laser Line", "Kaçak Ürün": "Runaway Product", "Pres Hattı": "Press Line",
        "KUKLA: Ustabaşı": "PUPPET: The Foreman", "Buz Kapısı": "Ice Gate", "Donuk Koridor": "Frozen Corridor",
        "Kızak Yolu": "Sled Run", "KUKLA: Kardan Adam": "PUPPET: Snowman", "Son Sefer": "Last Train Out",
        "Turnikeler": "Turnstiles", "Ters Hat": "Wrong Line", "Kaçan Tren": "Missed Train", "KUKLA: Makinist": "PUPPET: The Driver",
        "Kulis": "Backstage", "Kamera Arkası": "Behind the Camera", "Perde Arası": "Intermission", "Final Kaçış": "Final Escape",
        "KUKLA: Son Gösteri": "PUPPET: The Final Show",
        // death lines and Granny's grumbles
        "Bunu beklemiyordun, değil mi?": "Didn't see that coming, did you?", "Yine mi?": "Again?!",
        "Gözlüğünü taksaydın görürdün, nine.": "Should've worn your glasses, Granny.", "Zemin de yalan söyledi.": "Even the floor lied to you.",
        "Tecrübe puanı +1": "+1 life experience", "Torunların bunu görmesin.": "Don't let the grandkids see this.",
        "Baston bile seni bıraktı.": "Even your cane gave up on you.", "Pes etmek yok!": "No giving up!",
        "Bu sefer kesin olacaktı...": "That was definitely the one...", "Tuzak 1 – Nine 0": "Traps 1 – Granny 0",
        "Belim gitti!": "Oh, my back!", "Bu dizlerle mi?": "With these knees?!", "Torunum bunu görse...": "If my grandson could see this...",
        "Çayım soğudu!": "My tea's gone cold!", "Ah şu romatizma!": "Blasted rheumatism!",
        // boss taunts
        "Yeşil yanan düğmeye bas → kum torbası Kukla'nın ipini koparır! (4 ip)": "Step on the GREEN glowing button → a sandbag snaps the Puppet's string! (4 strings)",
        "BAS!": "STEP!", "Kasap Kukla! Yerden savurduğum satırların üstünden zıpla, yanan düğmelere bas!": "Butcher Puppet! Jump over the cleavers I swing along the floor and step on the glowing buttons!", "Lağım Kukla! Yerden gelen pis su dalgasının üstünden zıpla, timsaha dikkat, yanan düğmelere bas!": "Sewer Puppet! Jump over the sewage wave, mind the crocodile, step on the glowing buttons!", "Buz Kukla! Zemin kaygan, buz sarkıtları hızlı düşer. Yanan düğmelere bas!": "Ice Puppet! The floor is slippery and the icicles fall fast. Step on the glowing buttons!", "Son gösteri, nine! Hem yerden süpürürüm hem tepeden atarım. Bütün düğmelere bas!": "Final show, granny! I sweep the floor and drop from above. Hit every button!", "Bakıcı Kukla geldi! Yeşil yanan düğmeye bas, kum torbası kafama düşsün!": "The Caretaker Puppet is here! Step on the green glowing button and drop a sandbag on my head!", "Yeter artık nine! Şimdi çıldırdım!": "That's it, granny! Now I'm mad!", "Düğmeler yeşil yanınca bas, nine. İplerimi koparabilirsen…": "Hit the buttons when they glow green, Granny. If you can cut my strings…",
        "Ahh! İpim!": "Ow! My strings!", "Bunu ödeyeceksin nine!": "You'll pay for that, Granny!", "Takma dişlerin bende!": "I've still got your dentures!",
        // the Puppet on TV
        "Merhaba... Bir oyun oynayalım.": "Hello... Let's play a game.", "Hayatta kalmak istiyor musun?": "Do you want to live, Granny?",
        "İpler çürük. Tıpkı umutların gibi.": "The ropes are rotten. Just like your hopes.", "Bu kez kaçamazsın.": "No escape this time.",
        "Kutular seni korur mu? Göreceğiz.": "Will the boxes save you? We'll see.", "Testereler aç... ve sabırsız.": "The saws are hungry... and impatient.",
        "Zincirlere güvenme.": "Never trust a chain.", "Karanlıktan korkar mısın?": "Afraid of the dark?",
        "Her şey tersine döndü.": "Everything's back to front now.", "Seçim senin.": "Your choice.",
        "Sona daha çok var. Acele etme.": "The end is a long way off. No rush.", "Zemini dinle... yalan söylüyor.": "Listen to the floor... it's lying.",
        "Seni izliyorum, nine.": "I'm watching you, Granny.", "Her adım bir karar.": "Every step is a decision.",
        "Dün buradan geçen geri dönmedi.": "The last one through here never came back.", "Bayrak gerçek mi? Emin misin?": "Is that flag real? Are you sure?",
        "Bastonunun sesini tuzaklar da duyuyor.": "The traps can hear your cane too.", "Kural basit: yaşa ya da öl.": "Simple rules: live or die.",
        "Taş top seni hatırlıyor.": "The boulder remembers you.", "Korkunu duyabiliyorum.": "I can hear your fear.",
        "Burada hiçbir şey göründüğü gibi değil.": "Nothing here is what it seems.", "Bir oyun daha... sadece bir tane.": "One more game... just one.",
        "Saat işliyor. Tik tak.": "The clock is ticking. Tick tock.", "Pes edersen ben kazanırım.": "Give up and I win.",
        "Karanlıkta seni bekleyen bir şey var.": "Something's waiting for you in the dark.",
        // story
        "Maaş günü. Nine erkenden kalktı, dişlerini bardaktan aldı... Bardak boştu.": "Pension day. Granny got up early and reached for her teeth in the glass... The glass was empty.",
        "Dişlerin bende, nine. Maaş kartın da. Oyun başlasın!": "I've got your teeth, Granny. And your pension card. Let the games begin!",
        "Seni gidi tahta kafa! Ben 1958'de minibüs kovaladım, sen kim oluyorsun!": "Why, you blockhead! I was chasing buses in 1958. Who do you think you are?!",
        "Nine bastonunu kaptı ve peşine düştü.": "Granny grabbed her cane and went after him.",
        "Bodrumda ışık yok. Faturayı senin kartla ödedim.": "No lights down here. I paid the bill with your card.",
        "Bir de fatura mı? Gel buraya, tahta kafa!": "MY card paid YOUR bills?! Get back here, woodhead!",
        "Burada herkes senin yaşında, saklanmak kolay.": "Everyone here is your age. Easy to blend in.",
        "Bingo gecesini kaçırıyorum, acele et!": "I'm missing bingo night for this. Hurry up!",
        "Tansiyonunu ölçelim mi?": "Shall we check your blood pressure?", "Tansiyonum sana yeter!": "My blood pressure is about to be YOUR problem!",
        "Kıyma makinesi bugün indirimde.": "The mincer's on special today.", "Ben pazarlıkta ustayım!": "Sweetie, I've haggled with tougher butchers than you!",
        "Bilet almadın ama atlıkarınca bedava.": "No ticket? Don't worry, the carousel's on the house.",
        "Midem bulanıyor, dişlerimi ver!": "I'm getting dizzy. Give me my teeth!",
        "Kartının şifresi 1234 müymüş?": "Is your PIN 1234, by any chance?", "Torunum değiştirdi, bilemezsin!": "My grandson changed it. Good luck!",
        "Dişlerini konveyöre koydum.": "I put your teeth on the conveyor belt.", "Onlar porselen, kırarsan yanarsın!": "Those are porcelain! Break them and you're firewood!",
        "Dişlerin donmuş, gıcır gıcır.": "Your teeth are frozen. Nice and crunchy.", "Ben Erzurumluyum, soğuk vız gelir!": "I grew up without central heating. This is nothing!",
        "Son tren kaçtı nine.": "You missed the last train, Granny.", "65 yaş üstü ücretsiz, binerim!": "Over-65s ride free. I'll catch it!",
        "Son perde... alkışlar!": "Final act... applause!", "Alkış değil, şaplak geliyor!": "Forget applause. You're getting a smacking!",
        "Nine dişlerini geri aldı ve kocaman gülümsedi.": "Granny got her teeth back and flashed a huge grin.",
        "Dişlerim! Kartım! Şimdi pazara gidiyorum.": "My teeth! My card! Now I'm off to the market.",
        "...Devam filmi gelecek.": "...Sequel coming soon.",
      };
      function T(tr) { return LANG === "en" && EN[tr] !== undefined ? EN[tr] : tr; }
      function applyLang() {
        document.documentElement.lang = LANG; document.title = T("NİNE: KAPANLAR");
        document.querySelectorAll("[data-t]").forEach((el) => { if (!el.dataset.t) el.dataset.t = el.textContent.trim(); el.textContent = T(el.dataset.t); });
        document.querySelectorAll("[data-tl]").forEach((el) => { if (!el.dataset.tl) el.dataset.tl = el.getAttribute("aria-label"); el.setAttribute("aria-label", T(el.dataset.tl)); });
        document.querySelectorAll("[data-tp]").forEach((el) => { if (!el.dataset.tp) el.dataset.tp = el.placeholder; el.placeholder = T(el.dataset.tp); });
        document.querySelectorAll(".x-lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === LANG)));
        document.getElementById("musBtn").setAttribute("aria-label", T(window.musicOn === false ? "Müziği aç" : "Müziği kapat"));
        if (window.relang) window.relang();
      }
      document.querySelectorAll(".x-lang button").forEach((b) => b.addEventListener("click", () => { LANG = b.dataset.lang; try { localStorage.setItem("nine_lang", LANG); } catch (_) {} applyLang(); }));
      applyLang();
      /* Test mode: every level 1–50 open in Bölüm Seç from the start. Set false to restore progression. */
      const TEST_ALL_OPEN = false;
      /* ===== Local save (our website): skipped silently when storage is blocked ===== */
      const LS_KEY = "nine_kapanlar_v1";
      function lsRead() {
        try { const raw = localStorage.getItem(LS_KEY), sv = raw ? JSON.parse(raw) : null; return sv && typeof sv === "object" ? sv : null; } catch (_) { return null; }
      }
      function lsWrite(sv) { try { localStorage.setItem(LS_KEY, JSON.stringify(sv)); } catch (_) {} }
      const lsLast = (sv) => (sv && Number.isInteger(sv.last) && sv.last > 0 && sv.last < 50 ? sv.last : 0);
      function syncCont() { // "DEVAM ET · Bölüm N" above Başla when a save past level 1 exists
        const b = document.getElementById("contBtn"), n = lsLast(lsRead());
        b.hidden = !n; if (n) b.textContent = T("DEVAM ET") + " · " + T("Bölüm") + " " + (n + 1);
      }
      syncCont();
      document.querySelectorAll(".x-lang button").forEach((b) => b.addEventListener("click", syncCont));
      /* ===== Screen buttons: wired before Three.js so they always respond ===== */
      /* ===== Landscape-first: pause with a rotate overlay on portrait phones ===== */
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      function checkOrient() {
        window.orientPaused = isTouch && innerHeight > innerWidth;
        document.getElementById("rotate").hidden = !window.orientPaused;
      }
      ["resize", "orientationchange"].forEach((ev) => addEventListener(ev, () => { checkOrient(); setTimeout(checkOrient, 250); }));
      checkOrient();
      function goLandscape(onFail) { // returns false when no fullscreen API exists (iPhone)
        const lock = () => { try { const o = screen.orientation && screen.orientation.lock && screen.orientation.lock("landscape"); if (o && o.catch) o.catch(() => {}); } catch (_) {} };
        const el = document.documentElement, req = el.requestFullscreen || el.webkitRequestFullscreen;
        if (!req) { lock(); return false; }
        const fail = () => { lock(); if (onFail) onFail(); };
        try {
          const r = !(document.fullscreenElement || document.webkitFullscreenElement) ? req.call(el) : null;
          if (r && r.then) r.then(lock, fail); else lock();
        } catch (_) { fail(); }
        return true;
      }
      const fsBtns = [document.getElementById("fsBtn"), document.getElementById("startFs")];
      const syncFs = () => { const on = !!(document.fullscreenElement || document.webkitFullscreenElement); fsBtns.forEach((b) => b.setAttribute("aria-pressed", String(on))); };
      ["fullscreenchange", "webkitfullscreenchange"].forEach((ev) => document.addEventListener(ev, syncFs));
      syncFs();
      function fsToast(msg) {
        const t = document.getElementById("toast");
        t.textContent = T(msg); t.classList.add("is-on");
        clearTimeout(fsToastT); fsToastT = setTimeout(() => t.classList.remove("is-on"), 2600);
      }
      // first Başla / Devam Et / level tap tries fullscreen silently; touch devices keep trying on later starts
      let fsTried = false;
      function autoFs() { if (isTouch || !fsTried) goLandscape(); fsTried = true; }
      let fsToastT = 0;
      function onFsBtn(e) {
        if (e && e.currentTarget) e.currentTarget.blur();
        if (document.fullscreenElement || document.webkitFullscreenElement) { // already fullscreen: the badge exits it
          try { const x = (document.exitFullscreen || document.webkitExitFullscreen).call(document); if (x && x.catch) x.catch(() => {}); } catch (_) {}
          return;
        }
        if (!goLandscape(() => fsToast("Tam ekran açılamadı"))) fsToast("iPhone'da tam ekran için: Paylaş → Ana Ekrana Ekle");
      }
      fsBtns.forEach((b) => b.addEventListener("click", onFsBtn));
      function onStart() {
        autoFs();
        document.getElementById("startScreen").hidden = true;
        document.getElementById("endScreen").hidden = true;
        if (window.gameReady) { window.startGame(); return; }
        // Three.js or WebGL unavailable: say so instead of failing silently
        const t = document.getElementById("toast");
        t.textContent = T("Oyun yüklenemedi. Sayfayı yenileyip tekrar dene.");
        t.classList.add("is-on");
      }
      document.getElementById("startBtn").addEventListener("click", onStart);
      document.getElementById("againBtn").addEventListener("click", onStart);
      document.getElementById("contBtn").addEventListener("click", () => {
        if (!window.gameReady) { onStart(); return; }
        autoFs();
        document.getElementById("startScreen").hidden = true;
        document.getElementById("endScreen").hidden = true;
        window.continueGame();
      });
      /* Bölüm Seç: the game's picker once loaded, otherwise a level-1 fallback */
      function onPick() {
        if (window.openPick) { window.openPick(); return; }
        document.getElementById("pickGrid").innerHTML = TEST_ALL_OPEN
          ? Array.from({ length: 50 }, (_, k) => `<button data-k="${k}">${k + 1}</button>`).join("")
          : (() => { const sv = lsRead(), s = new Set([0]); if (sv && Array.isArray(sv.reached)) sv.reached.forEach((k) => { if (Number.isInteger(k) && k >= 0 && k < 50) s.add(k); });
              return [...s].sort((a, b) => a - b).map((k) => `<button data-k="${k}">${k + 1}</button>`).join(""); })();
        document.getElementById("pickScreen").hidden = false;
      }
      document.getElementById("pickBtn").addEventListener("click", onPick);
      document.getElementById("pickBtn2").addEventListener("click", onPick);
      // music toggle: wired here so it works before the game script loads; the game reads window.musicOn / window.setMusic
      window.musicOn = true;
      document.getElementById("musBtn").addEventListener("click", (e) => {
        const b = e.currentTarget, on = (window.musicOn = !window.musicOn);
        b.textContent = on ? "🔊" : "🔇"; b.setAttribute("aria-pressed", String(!on)); b.setAttribute("aria-label", T(on ? "Müziği kapat" : "Müziği aç"));
        if (window.setMusic) window.setMusic(on);
        b.blur();
      });
      // start screen mute badge: drives the HUD music toggle and mirrors its state
      const startMus = document.getElementById("startMus");
      const syncStartMus = () => {
        const on = window.musicOn !== false;
        startMus.textContent = on ? "🔊" : "🔇"; startMus.setAttribute("aria-pressed", String(!on)); startMus.setAttribute("aria-label", T(on ? "Müziği kapat" : "Müziği aç"));
      };
      startMus.addEventListener("click", () => { document.getElementById("musBtn").click(); syncStartMus(); });
      { const sc = document.getElementById("setScreen"), sm = document.getElementById("setMus"), sync = () => { sm.textContent = startMus.textContent; };
        document.getElementById("setBtn").addEventListener("click", () => { sync(); sc.hidden = false; });
        document.getElementById("setClose").addEventListener("click", () => { sc.hidden = true; });
        sm.addEventListener("click", () => { startMus.click(); sync(); }); }
      document.querySelectorAll(".x-lang button").forEach((b) => b.addEventListener("click", syncStartMus));
      document.getElementById("pickClose").addEventListener("click", () => { if (!window.openPick) document.getElementById("pickScreen").hidden = true; });
      document.getElementById("pickGrid").addEventListener("click", (e) => {
        if (window.openPick || !e.target.closest("button")) return;
        document.getElementById("pickScreen").hidden = true; onStart();
      });
      /* HUD visibility: body.in-menu while the start, level-pick or end screen shows, body.in-story while the story dialog shows */
      (function menuState() {
        const menus = ["startScreen", "pickScreen", "endScreen"].map((id) => document.getElementById(id)), storyBox = document.getElementById("story");
        const sync = () => {
          document.body.classList.toggle("in-menu", menus.some((m) => m && !m.hidden));
          document.body.classList.toggle("in-story", !!storyBox && !storyBox.hidden);
        };
        const mo = new MutationObserver(sync);
        menus.concat(storyBox).forEach((el) => el && mo.observe(el, { attributes: true, attributeFilter: ["hidden"] }));
        window.syncMenuState = sync; sync();
      })();
    