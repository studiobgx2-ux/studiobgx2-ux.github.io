      (function () {
        "use strict";
        // ---------- data ----------
        const HOUSES = [
          { id: 1, name: "Ayşe Teyze", x: -26, z: -20, body: "#ffd6a5", roof: "#e4572e", door: "#6b3e26", chimney: "#a0522d", pet: "cat", feature: "bakery" },
          { id: 2, name: "Hasan Amca", x: -40, z: 2, body: "#bde0fe", roof: "#3a86ff", door: "#22333b", chimney: "#8d99ae", pet: "dog", feature: "garden" },
          { id: 3, name: "Fatma Nine", x: -30, z: 26, body: "#ffc8dd", roof: "#c9184a", door: "#5e3023", chimney: "#9c6644", pet: "chickens", feature: "laundry" },
          { id: 4, name: "Mehmet Usta", x: -10, z: 38, body: "#fef3c7", roof: "#2a9d8f", door: "#264653", chimney: "#6c757d", pet: null, feature: "swing" },
          { id: 5, name: "Zeynep Hanım", x: 14, z: 36, body: "#e9d5ff", roof: "#7b2cbf", door: "#3c096c", chimney: "#b5838d", pet: "cat", feature: null },
          { id: 6, name: "Ali Dayı", x: 30, z: 8, body: "#caffbf", roof: "#f77f00", door: "#7f4f24", chimney: "#9a8c98", pet: "goat", feature: "tractor" },
          { id: 7, name: "Elif Abla", x: 32, z: -12, body: "#fff1e6", roof: "#ef476f", door: "#118ab2", chimney: "#c08552", pet: null, feature: "beehive" },
          { id: 8, name: "Mustafa Çavuş", x: 20, z: -34, body: "#d8e2dc", roof: "#6a994e", door: "#386641", chimney: "#a68a64", pet: "sheep", feature: "garden" },
          { id: 9, name: "Emine Abla", x: -20, z: -42, body: "#ffe5ec", roof: "#ffb703", door: "#fb8500", chimney: "#8d6e63", pet: "chickens", feature: "laundry" },
          { id: 10, name: "Osman Ağa", x: -58, z: -34, body: "#f1faee", roof: "#1d3557", door: "#e63946", chimney: "#457b9d", pet: "sheep", feature: null },
          { id: 11, name: "Hatice Teyze", x: -66, z: 14, body: "#fde2e4", roof: "#d62828", door: "#003049", chimney: "#a3a380", pet: null, feature: "beehive" },
          { id: 12, name: "Kemal Bey", x: -20, z: 66, body: "#cdeac0", roof: "#bc4749", door: "#432818", chimney: "#99582a", pet: "dog", feature: null },
          { id: 13, name: "Selim Dede", x: 74, z: -42, body: "#fae1dd", roof: "#e76f51", door: "#264653", chimney: "#8a817c", pet: "goat", feature: "tractor" },
          { id: 14, name: "Gülsüm Nine", x: 80, z: -8, body: "#fff3b0", roof: "#e09f3e", door: "#540b0e", chimney: "#9e2a2b", pet: "chickens", feature: "windmill" },
          { id: 15, name: "Rıza Usta", x: 76, z: 28, body: "#a2d2ff", roof: "#ff006e", door: "#3a0ca3", chimney: "#8338ec", pet: "cat", feature: "swing" },
          { id: 16, name: "Nermin Hanım", x: 70, z: 64, body: "#ffcfd2", roof: "#00a6a6", door: "#08415c", chimney: "#cc2936", pet: "sheep", feature: "garden" },
        ];
        // owner details: roof colour word, landmark and story snippet (TR / EN)
        const DETAILS = {
          1: ["kırmızı", "red", "Meydanın kuzeybatısında, fırının yanında", "Northwest of the square, by the bakery", "Oğlum İzmir'den yazmış! Bu akşam ilk simit senin.", "My son wrote from Izmir! The first warm simit tonight is yours."],
          2: ["mavi", "blue", "Meydanın batısında, bostanlı evde", "West of the square, the house with the garden", "Torunum üniversiteyi kazanmış! Köpeğim bile seviniyor.", "My grandson got into university! Even my dog is happy."],
          3: ["kırmızı", "red", "Göletin kuzeydoğusunda, çamaşır ipli evde", "Northeast of the pond, with the washing line", "Kız kardeşimden kırk yıl sonra ilk mektup... Gözlerim doldu.", "My sister's first letter in forty years... I'm in tears."],
          4: ["turkuaz", "turquoise", "Meydanın güneyinde, salıncaklı ağacın yanında", "South of the square, by the tree swing", "Usta çırağım kendi dükkânını açmış. Helal olsun!", "My old apprentice opened his own workshop. Well done him!"],
          5: ["mor", "purple", "Güney yolunda, çatısında kedi olan ev", "On the south road, the house with a cat on the roof", "Şiir yarışmasını kazanmışım! Kedim Pamuk'a da söyleyeyim.", "I won the poetry contest! Let me tell my cat Pamuk."],
          6: ["turuncu", "orange", "Meydanın doğusunda, nehre giden yolda", "East of the square, on the way to the river", "Traktörün yedek parçası geliyormuş, hasat kurtuldu!", "The tractor part is on its way, the harvest is saved!"],
          7: ["pembe", "pink", "Meydanın doğusunda, arı kovanlarının yanında", "East of the square, beside the beehives", "Balım şehirde ödül almış! Arılarım çok çalıştı.", "My honey won a prize in the city! My bees worked hard."],
          8: ["yeşil", "green", "Postanenin kuzeyinde, koyunlu bahçede", "North of the post office, with sheep in the garden", "Eski askerlik arkadaşım ziyarete geliyor. Çayı demleyeyim!", "My old army friend is coming to visit. Let me brew tea!"],
          9: ["sarı", "yellow", "Kuzeyde, tavuklu ve çamaşır ipli evde", "Up north, with hens and a washing line", "Kızım bebek bekliyormuş! Ben nine oluyorum!", "My daughter is expecting! I'm going to be a grandma!"],
          10: ["lacivert", "navy", "Köyün kuzeybatı ucunda", "At the far northwest edge of the village", "Herkes beni unuttu sanıyordum. Biri hâlâ hatırlıyor.", "I thought everyone had forgotten me. Someone still remembers."],
          11: ["kırmızı", "red", "Köyün batı ucunda, arı kovanlı evde", "At the far west edge, with beehives", "Komşumdan reçel tarifi! Yıllardır bunu arıyordum.", "A jam recipe from an old neighbour! I've looked for years."],
          12: ["kırmızı", "red", "Köyün güney ucunda, köpekli evde", "At the far south edge, the house with a dog", "Kayıp köpeğimin fotoğrafını bulmuşlar, yeni köpeğim kıskanacak!", "They found an old photo of my dog. My new one will be jealous!"],
          13: ["turuncu", "orange", "Nehrin ötesinde, kuzey köprüsünden sonra", "Across the river, past the north bridge", "Keçim Mavi yarışmada birinci olmuş. Hem de keçi yarışında!", "My goat Mavi took first place. In a goat race, no less!"],
          14: ["turuncu", "orange", "Nehrin ötesinde, yel değirmeninin yanında", "Across the river, beside the windmill", "Değirmenim için yeni yelken bezi geliyor. Tavuklar da sevinsin!", "New sailcloth is coming for my windmill. The hens can cheer too!"],
          15: ["pembe", "pink", "Nehrin ötesinde, güney köprüsüne yakın", "Across the river, near the south bridge", "Yaptığım salıncak şehir parkına seçilmiş!", "The swing I built was chosen for the city park!"],
          16: ["turkuaz", "turquoise", "Nehrin ötesinde, köyün en güneydoğusunda", "Across the river, in the far southeast corner", "Çocukluk arkadaşım bana kartpostal yollamış. Köyü özlemiş.", "My childhood friend sent me a postcard. She misses the village."],
        };
        // resident nickname and job (TR / EN)
        const PEOPLE = {
          1: ["Simitçi Ayşe", "Simit Ayse", "fırıncı", "baker"],
          2: ["Bostancı Hasan", "Gardener Hasan", "bahçıvan", "gardener"],
          3: ["İğneci Fatma", "Needle Fatma", "terzi", "tailor"],
          4: ["Rendeci Mehmet", "Woody Mehmet", "marangoz", "carpenter"],
          5: ["Şair Zeynep", "Poet Zeynep", "öğretmen", "teacher"],
          6: ["Traktör Ali", "Tractor Ali", "çiftçi", "farmer"],
          7: ["Ballı Elif", "Honey Elif", "arıcı", "beekeeper"],
          8: ["Çavuş", "The Sergeant", "bekçi", "night watchman"],
          9: ["Yumurtacı Emine", "Eggs Emine", "ebe", "midwife"],
          10: ["Yalnız Osman", "Lonely Osman", "çoban", "shepherd"],
          11: ["Reçelci Hatice", "Jammy Hatice", "aşçı", "cook"],
          12: ["Muhtar Kemal", "Mayor Kemal", "muhtar", "mayor"],
          13: ["Keçici Selim", "Goat Selim", "peynirci", "cheesemaker"],
          14: ["Değirmenci Gülsüm", "Miller Gulsum", "değirmenci", "miller"],
          15: ["Demirci Rıza", "Smith Riza", "demirci", "blacksmith"],
          16: ["Kartpostal Nermin", "Postcard Nermin", "ressam", "painter"],
        };
        // fix1106: English display names (title translated, name kept, Turkish letters folded so they read anywhere)
        const NAME_EN = {
          1: "Aunt Ayse", 2: "Uncle Hasan", 3: "Granny Fatma", 4: "Master Mehmet", 5: "Ms. Zeynep", 6: "Uncle Ali", 7: "Miss Elif", 8: "Sergeant Mustafa",
          9: "Auntie Emine", 10: "Squire Osman", 11: "Aunt Hatice", 12: "Mayor Kemal", 13: "Grandpa Selim", 14: "Granny Gulsum", 15: "Master Riza", 16: "Mrs. Nermin",
        };
        HOUSES.forEach((h) => { h.nameEn = NAME_EN[h.id]; h.given = { tr: h.name.split(" ")[0], en: NAME_EN[h.id].split(" ").pop() }; });
        HOUSES.forEach((h) => {
          const p = PEOPLE[h.id];
          h.nickname = { tr: p[0], en: p[1] };
          h.job = { tr: p[2], en: p[3] };
        });
        HOUSES.forEach((h) => {
          const d = DETAILS[h.id];
          h.roofName = { tr: d[0], en: d[1] };
          h.landmark = { tr: d[2], en: d[3] };
          h.story = { tr: d[4], en: d[5] };
        });
        const PO = { x: 0, z: -14, w: 10, d: 7 };
        const POND = { x: -50, z: 45, r: 9.5 };
        const BRIDGES = [{ z: -30 }, { z: 35 }];
        const WATER_Y = -0.35;

        // ---------- helpers ----------
        let seed = 7;
        const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
        const rr = (a, b) => a + rnd() * (b - a);
        const pick = (a) => a[Math.floor(rnd() * a.length)];
        const lerp = (a, b, t) => a + (b - a) * t;
        const smooth = (e0, e1, x) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
        const riverX = (z) => 52 + Math.sin(z * 0.045) * 7 + Math.sin(z * 0.11) * 2;
        function H(x, z) {
          let h = (Math.sin(x * 0.06) * 0.9 + Math.cos(z * 0.05) * 0.8 + Math.sin((x + z) * 0.11) * 0.35) * 0.8;
          h *= smooth(16, 30, Math.hypot(x, z));
          h += smooth(80, 105, Math.max(Math.abs(x), Math.abs(z))) * 7;
          const dr = Math.abs(x - riverX(z));
          if (dr < 7.5) h = lerp(-1.3, h, smooth(4, 7.5, dr));
          const dp = Math.hypot(x - POND.x, z - POND.z);
          if (dp < 13) h = lerp(-1.1, h, smooth(7.5, 13, dp));
          return h;
        }
        // each bridge: an arch over the water (|dx| <= BR_ARCH), then ramps that run ~1 unit onto each bank and come down to the ground
        const BR_ARCH = 6.5, RIVER_HW = 6.25, BANK_TOP = 7.5;
        BRIDGES.forEach((b) => {
          b.x = riverX(b.z);
          // the river bends, so measure how far its centre drifts across the deck's 3.2 width
          let drift = 0;
          for (let dz = -1.6; dz <= 1.6; dz += 0.4) drift = Math.max(drift, Math.abs(riverX(b.z + dz) - b.x));
          b.water = RIVER_HW + drift; // water edge from b.x
          b.half = Math.max(BANK_TOP, RIVER_HW + 1.25) + drift; // where the bank is back at full height (H() blends the bank in by 7.5)
          b.end = b.half + 1; // overlap the bank by ~1 unit
          b.gl = H(b.x - b.end, b.z) + 0.15; b.gr = H(b.x + b.end, b.z) + 0.15; // just above the path ribbon (H + 0.12)
        });
        function deckY(b, x) {
          const d = x - b.x, a = Math.abs(d);
          if (a <= BR_ARCH) return 0.45 + 0.55 * Math.cos((d / BR_ARCH) * (Math.PI / 2));
          const t = Math.min(1, (a - BR_ARCH) / (b.end - BR_ARCH)), e = t * (2 - t); // eases out so it meets the ground flat
          return lerp(0.45, d < 0 ? b.gl : b.gr, e);
        }
        const onDeck = (b, x, z, pad) => Math.abs(z - b.z) < 1.8 && Math.abs(x - b.x) < b.end + (pad || 0);
        // the visible terrain is a 72x72 grid mesh of H(); stand on its triangles, not on H() itself
        const TER_N = 72, TER_S = 224 / TER_N, TER_R = TER_N + 1, TER_H = new Float32Array(TER_R * TER_R);
        for (let iz = 0; iz < TER_R; iz++) for (let ix = 0; ix < TER_R; ix++) TER_H[iz * TER_R + ix] = H(ix * TER_S - 112, iz * TER_S - 112);
        function terrainY(x, z) {
          const fx = (x + 112) / TER_S, fz = (z + 112) / TER_S;
          if (!(fx >= 0 && fz >= 0 && fx < TER_N && fz < TER_N)) return H(x, z);
          const ix = Math.floor(fx), iz = Math.floor(fz), u = fx - ix, v = fz - iz, i = iz * TER_R + ix;
          const ha = TER_H[i], hd = TER_H[i + 1], hb = TER_H[i + TER_R], hc = TER_H[i + TER_R + 1];
          // PlaneGeometry splits each cell along the (ix, iz+1)-(ix+1, iz) diagonal
          return u + v <= 1 ? ha + u * (hd - ha) + v * (hb - ha) : hc + (1 - u) * (hb - hc) + (1 - v) * (hd - hc);
        }
        // dirt paths (filled once the houses are built): ribbons 2.4 wide laid at H + PATH_UP
        const PATH_HW = 1.2, PATH_UP = 0.12, GROUND_PATHS = [];
        function onPath(x, z) {
          if (Math.abs(x - riverX(z)) < 6.6) return false; // ribbons are skipped over the river
          for (const s of GROUND_PATHS) {
            if (x < s[4] || x > s[5] || z < s[6] || z > s[7]) continue;
            const dx = s[2] - s[0], dz = s[3] - s[1], L2 = dx * dx + dz * dz || 1;
            const t = Math.max(0, Math.min(1, ((x - s[0]) * dx + (z - s[1]) * dz) / L2));
            const ex = x - (s[0] + dx * t), ez = z - (s[1] + dz * t);
            if (ex * ex + ez * ez <= PATH_HW * PATH_HW) return true;
          }
          return false;
        }
        function groundY(x, z) {
          let y = Math.max(terrainY(x, z), -0.9);
          const r = Math.hypot(x, z);
          if (r < 16) y = Math.max(y, r < 14.6 ? 0.04 : 0.05); // square disc and its rim
          if (GROUND_PATHS.length && onPath(x, z)) y = Math.max(y, H(x, z) + PATH_UP);
          for (const b of BRIDGES) if (onDeck(b, x, z)) y = Math.max(y, deckY(b, x));
          return y;
        }
        // water blocks walking, except on a bridge deck
        function inWater(x, z) {
          for (const b of BRIDGES) if (onDeck(b, x, z, 0.3)) return false;
          if (z >= -112 && z <= 112 && Math.abs(x - riverX(z)) < 5.2) return true;
          return Math.hypot(x - POND.x, z - POND.z) < 8;
        }
        // move from (px,pz) toward (nx,nz), sliding along the bank: full, then x-only, then z-only
        function waterSlide(px, pz, nx, nz) {
          if (inWater(px, pz) || !inWater(nx, nz)) return [nx, nz]; // already in water: let them climb out
          if (!inWater(nx, pz)) return [nx, pz];
          if (!inWater(px, nz)) return [px, nz];
          return [px, pz];
        }

        // ---------- renderer / scene ----------
        const root = document.getElementById("game");
        let renderer;
        // probe WebGL first, so a GPU-less browser gets the message instead of three.js console errors
        const glOK = (() => {
          try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl"))); }
          catch (e) { return false; }
        })();
        try { if (!glOK) throw new Error("no webgl"); renderer = new THREE.WebGLRenderer({ antialias: true }); }
        catch (err) {
          const t = document.getElementById("toast");
          t.textContent = "Bu tarayıcıda 3D (WebGL) açılamadı.";
          t.classList.add("is-on");
          document.getElementById("load").hidden = true;
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        // fix1106: drawing-buffer size only (updateStyle=false); CSS keeps the canvas at 100% of #game, which is fixed to the viewport
        const viewSize = () => {
          const w = root.clientWidth || document.documentElement.clientWidth || innerWidth;
          const h = root.clientHeight || document.documentElement.clientHeight || innerHeight;
          return [Math.max(1, w), Math.max(1, h)];
        };
        let vw0 = 0, vh0 = 0;
        renderer.setSize(...viewSize(), false);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        if (THREE.ColorManagement) THREE.ColorManagement.legacyMode = false; // hex colours are sRGB, lit in linear space
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        renderer.domElement.className = "x-world";
        root.prepend(renderer.domElement);
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xcfe8f5, 80, 230);
        const camera = new THREE.PerspectiveCamera(55, viewSize()[0] / viewSize()[1], 0.1, 700);
        // fitView: re-reads the real viewport (iOS reports stale sizes during rotation, so it re-checks a few times after)
        function fitView(force) {
          const [w, h] = viewSize();
          if (!force && w === vw0 && h === vh0) return;
          vw0 = w; vh0 = h;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          document.body.classList.toggle("x-short", h <= 500);
        }
        window.__fitView = fitView;
        const fitSoon = () => { fitView(); [60, 200, 450, 900].forEach((d) => setTimeout(fitView, d)); };
        addEventListener("resize", fitSoon);
        addEventListener("orientationchange", fitSoon);
        document.addEventListener("fullscreenchange", fitSoon);
        document.addEventListener("webkitfullscreenchange", fitSoon);
        if (window.visualViewport) visualViewport.addEventListener("resize", fitSoon);
        if (window.ResizeObserver) new ResizeObserver(() => fitView()).observe(root);
        fitView(true);

        const hemi = new THREE.HemisphereLight(0xd6ecff, 0x8a7b52, 0.75);
        scene.add(hemi);
        // day/night state: the cycle writes it every frame, other parts (string lights, later features) read it
        const DN = { sec: 0, t: 0, phase: "morning", glow: 0, night: 0, sunOff: new THREE.Vector3(55, 38, 40), track: "music_village" };
        window.getDayPhase = () => DN.phase;
        window.getDayT = () => DN.t;
        window.dayT = 0;
        const sun = new THREE.DirectionalLight(0xfff0d0, 0.88);
        sun.castShadow = true;
        sun.shadow.mapSize.set(2048, 2048);
        Object.assign(sun.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, near: 1, far: 160 });
        sun.shadow.bias = -0.0006;
        sun.shadow.normalBias = 0.03;
        scene.add(sun, sun.target);

        const matCache = {};
        const M = (c) => matCache[c] || (matCache[c] = new THREE.MeshLambertMaterial({ color: c }));
        function mesh(geo, c, x, y, z, parent, shadow = true) {
          const m = new THREE.Mesh(geo, typeof c === "string" ? M(c) : c);
          m.position.set(x || 0, y || 0, z || 0);
          m.castShadow = shadow;
          m.receiveShadow = true;
          if (parent) parent.add(m);
          return m;
        }
        const box = (w, h, d, c, x, y, z, p) => mesh(new THREE.BoxGeometry(w, h, d), c, x, y, z, p);
        const cyl = (rt, rb, h, s, c, x, y, z, p) => mesh(new THREE.CylinderGeometry(rt, rb, h, s), c, x, y, z, p);
        const ball = (r, c, x, y, z, p, d = 0) => mesh(new THREE.IcosahedronGeometry(r, d), c, x, y, z, p);
        const cone = (r, h, s, c, x, y, z, p) => mesh(new THREE.ConeGeometry(r, h, s), c, x, y, z, p);
        function prism(w, len, rise, c, x, y, z, p) {
          // gable roof: triangular prism, ridge along local z
          const r = w / 1.732;
          const g = new THREE.CylinderGeometry(r, r, len, 3).rotateX(-Math.PI / 2);
          g.scale(1, rise / (1.5 * r), 1);
          g.translate(0, (0.5 * r * rise) / (1.5 * r), 0);
          return mesh(g, c, x, y, z, p);
        }
        function textTex(text, bg, fg) {
          const c = document.createElement("canvas");
          c.width = 256; c.height = 64;
          const x = c.getContext("2d");
          x.fillStyle = bg; x.fillRect(0, 0, 256, 64);
          let fs = 38; x.fillStyle = fg; x.font = `600 ${fs}px Geist, sans-serif`; x.textAlign = "center"; x.textBaseline = "middle";
          while (x.measureText(text).width > 236 && fs > 16) { fs -= 2; x.font = `600 ${fs}px Geist, sans-serif`; }
          x.fillText(text, 128, 34);
          const tx = new THREE.CanvasTexture(c); tx.encoding = THREE.sRGBEncoding; return tx;
        }
        // fix1106: the post office sign is international: envelope + post-horn emblem and "POST" (reads the same in every language)
        function postSignTex() {
          const c = document.createElement("canvas"); c.width = 512; c.height = 100;
          const x = c.getContext("2d");
          x.fillStyle = "#ffd60a"; x.fillRect(0, 0, 512, 100);
          x.strokeStyle = "#b5121b"; x.lineWidth = 5; x.strokeRect(8, 8, 496, 84);
          // envelope
          x.fillStyle = "#fffaf0"; x.strokeStyle = "#b5121b"; x.lineWidth = 5; x.lineJoin = "round";
          x.fillRect(40, 26, 74, 50); x.strokeRect(40, 26, 74, 50);
          x.beginPath(); x.moveTo(40, 26); x.lineTo(77, 54); x.lineTo(114, 26); x.stroke();
          // post horn: a curled horn with a bell
          x.lineWidth = 6; x.lineCap = "round";
          x.beginPath(); x.arc(150, 50, 15, 0.2 * Math.PI, 2.05 * Math.PI); x.stroke();
          x.beginPath(); x.moveTo(163, 43); x.lineTo(186, 36); x.stroke();
          x.fillStyle = "#b5121b"; x.beginPath(); x.moveTo(184, 28); x.lineTo(196, 22); x.lineTo(198, 52); x.lineTo(186, 44); x.closePath(); x.fill();
          x.fillStyle = "#b5121b"; x.font = "800 64px Geist, sans-serif"; x.textAlign = "left"; x.textBaseline = "middle";
          x.fillText("POST", 222, 54);
          const tx = new THREE.CanvasTexture(c); tx.encoding = THREE.sRGBEncoding; return tx;
        }
        // other painted signs (bakery…) switch with the language
        const langSigns = [];
        function langSignMat(tr, en, bg, fg) {
          const m = new THREE.MeshLambertMaterial({ map: textTex(window.__lang === "en" ? en : tr, bg, fg) });
          langSigns.push({ m, tr, en, bg, fg }); return m;
        }
        const poSign = { lang: window.__lang === "en" ? "en" : "tr" };
        poSign.mat = new THREE.MeshLambertMaterial({ map: postSignTex() });
        poSign.refresh = () => {
          const l = window.__lang === "en" ? "en" : "tr"; if (l === poSign.lang) return;
          poSign.lang = l;
          for (const g of langSigns) { const old = g.m.map; g.m.map = textTex(l === "en" ? g.en : g.tr, g.bg, g.fg); g.m.needsUpdate = true; old.dispose(); }
        };
        const anims = [];
        const colliders = [];
        const addCircle = (x, z, r) => colliders.push({ t: 0, x, z, r });
        const addBox = (x, z, rot, hw, hd) => colliders.push({ t: 1, x, z, rot, hw, hd });

        // blocked grid for scattering (1 unit cells, -100..100)
        const grid = new Uint8Array(200 * 200);
        function mark(x, z, r) {
          for (let i = Math.floor(x - r); i <= x + r; i++)
            for (let j = Math.floor(z - r); j <= z + r; j++) {
              if ((i - x) ** 2 + (j - z) ** 2 > r * r) continue;
              const gi = i + 100, gj = j + 100;
              if (gi >= 0 && gi < 200 && gj >= 0 && gj < 200) grid[gj * 200 + gi] = 1;
            }
        }
        const free = (x, z) => { const gi = Math.floor(x) + 100, gj = Math.floor(z) + 100; return gi >= 0 && gi < 200 && gj >= 0 && gj < 200 && !grid[gj * 200 + gi]; };

        // ---------- sky ----------
        {
          const g = new THREE.SphereGeometry(450, 24, 16);
          const col = [], c = new THREE.Color(), top = new THREE.Color("#4aa8ff"), hor = new THREE.Color("#d4ecff"), low = new THREE.Color("#fff3d6");
          const p = g.attributes.position;
          for (let i = 0; i < p.count; i++) {
            const t = p.getY(i) / 450;
            if (t > 0) c.copy(hor).lerp(top, Math.pow(t, 0.6)); else c.copy(hor).lerp(low, Math.min(1, -t * 4));
            col.push(c.r, c.g, c.b);
          }
          g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
          scene.userData.skyMat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false });
          scene.add(new THREE.Mesh(g, scene.userData.skyMat));
        }

        // ---------- ground ----------
        {
          let g = new THREE.PlaneGeometry(224, 224, 72, 72).rotateX(-Math.PI / 2);
          const p = g.attributes.position;
          for (let i = 0; i < p.count; i++) p.setY(i, H(p.getX(i), p.getZ(i)));
          g = g.toNonIndexed();
          const q = g.attributes.position, col = [], c = new THREE.Color();
          const greens = ["#7cc85a", "#8fd264", "#6fbe52", "#9bd96c", "#84cc5e"].map((h) => new THREE.Color(h));
          for (let i = 0; i < q.count; i += 3) {
            const cx = (q.getX(i) + q.getX(i + 1) + q.getX(i + 2)) / 3, cy = (q.getY(i) + q.getY(i + 1) + q.getY(i + 2)) / 3, cz = (q.getZ(i) + q.getZ(i + 1) + q.getZ(i + 2)) / 3;
            const n = Math.sin(cx * 0.31 + cz * 0.17) + Math.cos(cz * 0.23 - cx * 0.11);
            c.copy(greens[Math.floor((n + 2) * 1.249) % 5]);
            if (cy > 2) c.lerp(new THREE.Color("#5ea845"), Math.min(1, (cy - 2) / 4));
            if (cy < -0.15) c.set(cy < -0.6 ? "#b8a877" : "#e0cd93");
            for (let k = 0; k < 3; k++) col.push(c.r, c.g, c.b);
          }
          g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
          g.computeVertexNormals();
          const ground = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ vertexColors: true }));
          ground.receiveShadow = true;
          scene.add(ground);
        }

        // ribbon along a polyline, sampled every ~1 unit
        function ribbon(pts, w, yFn, skip) {
          const out = [], s = [];
          for (let i = 0; i < pts.length - 1; i++) {
            const [ax, az] = pts[i], [bx, bz] = pts[i + 1], L = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.round(L));
            for (let k = 0; k < n; k++) s.push([lerp(ax, bx, k / n), lerp(az, bz, k / n)]);
          }
          s.push(pts[pts.length - 1]);
          for (let i = 0; i < s.length - 1; i++) {
            const [ax, az] = s[i], [bx, bz] = s[i + 1];
            if (skip && skip((ax + bx) / 2, (az + bz) / 2)) continue;
            let dx = bx - ax, dz = bz - az; const L = Math.hypot(dx, dz) || 1;
            const nx = (-dz / L) * (w / 2), nz = (dx / L) * (w / 2);
            const ex = (dx / L) * 0.15, ez = (dz / L) * 0.15;
            const A = [ax + nx - ex, az + nz - ez], B = [bx + nx + ex, bz + nz + ez], C = [bx - nx + ex, bz - nz + ez], D = [ax - nx - ex, az - nz - ez];
            for (const [x, z] of [A, B, C, A, C, D]) out.push(x, yFn(x, z), z);
          }
          return { out, s };
        }
        function ribbonMesh(arr, color, opts) {
          const g = new THREE.BufferGeometry();
          g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
          g.computeVertexNormals();
          const m = new THREE.Mesh(g, new THREE.MeshLambertMaterial(Object.assign({ color, polygonOffset: true, polygonOffsetFactor: -2 }, opts)));
          m.receiveShadow = true;
          scene.add(m);
          return m;
        }

        // ---------- river, pond, bridges ----------
        {
          const pts = [];
          for (let z = -112; z <= 112; z += 4) pts.push([riverX(z), z]);
          ribbonMesh(ribbon(pts, 12.5, () => WATER_Y).out, "#4fb6ea", { transparent: true, opacity: 0.88 });
          for (let z = -100; z <= 100; z++) mark(riverX(z), z, 6.5);
          // bank dressing: reeds and stones along both banks (no collisions)
          {
            let bs = 991; const bq = () => ((bs = (bs * 16807) % 2147483647) / 2147483647), br = (a, b) => a + bq() * (b - a);
            const stones = ["#a8a29a", "#9a948c", "#b5afa6"];
            for (let z = -94; z <= 94; z += br(5, 9)) {
              if (BRIDGES.some((b) => Math.abs(z - b.z) < 5)) continue;
              for (const s of [-1, 1]) {
                const x = riverX(z) + s * br(5.4, 6.4);
                if (bq() < 0.6) for (let k = 0; k < 3; k++) { const rx = x + br(-0.4, 0.4), rz = z + br(-0.6, 0.6); cone(0.1, br(1, 1.7), 4, "#5d8f3a", rx, H(rx, rz) + 0.6, rz, scene); }
                else ball(br(0.3, 0.55), stones[Math.floor(bq() * 3)], x, H(x, z) + 0.15, z, scene);
              }
            }
          }
          const pond = mesh(new THREE.CircleGeometry(POND.r, 20).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ color: "#5cc0ee", transparent: true, opacity: 0.9 }), POND.x, WATER_Y + 0.02, POND.z, scene, false);
          mark(POND.x, POND.z, 12);
          // lily pads
          for (let i = 0; i < 6; i++) { const a = rr(0, 6.28), r = rr(3, 8); mesh(new THREE.CircleGeometry(0.6, 7).rotateX(-Math.PI / 2), "#4f9d3a", POND.x + Math.cos(a) * r, WATER_Y + 0.05, POND.z + Math.sin(a) * r, scene, false); }
          // reeds
          for (let i = 0; i < 26; i++) { const a = rr(0, 6.28), r = rr(9.5, 11); cone(0.12, rr(1.2, 2), 4, "#5d8f3a", POND.x + Math.cos(a) * r, H(POND.x + Math.cos(a) * r, POND.z + Math.sin(a) * r) + 0.7, POND.z + Math.sin(a) * r, scene); }
          for (const b of BRIDGES) {
            const g = new THREE.Group(); g.position.set(b.x, 0, b.z); scene.add(g);
            const E = b.end, dy = (x) => deckY(b, b.x + x);
            // planks over the whole length, arch and ramps; each tilts so its top follows deckY() (the walk height)
            const n = Math.ceil((2 * E) / 0.98), step = (2 * E) / n;
            for (let i = 0; i < n; i++) {
              const x = -E + step * (i + 0.5), y = dy(x), ang = Math.atan((dy(x + 0.05) - dy(x - 0.05)) / 0.1);
              const p = box(step / Math.cos(ang) + 0.04, 0.2, 3.2, i % 2 ? "#b07a45" : "#9c6a3b", x, y - 0.1 / Math.cos(ang), 0, g);
              p.rotation.z = ang;
            }
            // stone abutments under each end: stepped blocks from below the river bed up to the planks, from inside the water edge out past the bank
            const stones = ["#a8a29a", "#9d978e"];
            for (const sd of [-1, 1]) {
              const a0 = Math.min(b.water - 1, BR_ARCH - 1.2), m = Math.ceil((E - a0) / 0.7), w = (E - a0) / m;
              for (let k = 0; k < m; k++) {
                const x0 = a0 + k * w, x1 = x0 + w, top = Math.min(dy(sd * x0), dy(sd * x1)) - 0.16, bot = -2.2;
                box(w + 0.02, top - bot, 3.5, stones[k % 2], sd * (x0 + w / 2), (top + bot) / 2, 0, g);
              }
              // a wider footing stone where the deck meets the bank, so the ramp end sits on stone rather than grass
              const ft = (sd < 0 ? b.gl : b.gr) - 0.2;
              box(0.9, ft + 2.2, 3.9, "#948e85", sd * (E - 0.35), (ft - 2.2) / 2, 0, g);
            }
            // posts, evenly spaced along the deck, and the hand rails between them
            const px0 = -E + 0.4, pspan = 2 * E - 0.8, pm = Math.max(2, Math.round(pspan / 3)), posts = [];
            for (let k = 0; k <= pm; k++) posts.push(px0 + (k * pspan) / pm);
            for (const x of posts) for (const s of [-1.5, 1.5]) box(0.18, 1.1, 0.18, "#7a4e2a", x, dy(x) + 0.45, s, g);
            const rm = Math.ceil(pspan), rstep = pspan / rm;
            for (const s of [-1.5, 1.5]) for (let i = 0; i < rm; i++) {
              const x0 = px0 + i * rstep, y0 = dy(x0) + 0.95, y1 = dy(x0 + rstep) + 0.95;
              const r = box(Math.hypot(rstep, y1 - y0) + 0.05, 0.12, 0.12, "#8b5a2b", x0 + rstep / 2, (y0 + y1) / 2, s, g); r.rotation.z = Math.atan2(y1 - y0, rstep);
            }
            for (const x of posts) for (const s of [-1.75, 1.75]) addCircle(b.x + x, b.z + s, 0.25);
            // solid railings along both long sides, as long as the deck
            for (const s of [-1.75, 1.75]) addBox(b.x, b.z + s, 0, E - 0.4, 0.12);
            mark(b.x, b.z, E + 1);
          }
        }

        // ---------- square, fountain, well, post office ----------
        {
          mesh(new THREE.CircleGeometry(16, 28).rotateX(-Math.PI / 2), "#e8d6b0", 0, 0.04, 0, scene, false);
          mesh(new THREE.RingGeometry(14.6, 16, 28).rotateX(-Math.PI / 2), "#d4bd92", 0, 0.05, 0, scene, false);
          mark(0, 0, 18);
          // fountain
          const f = new THREE.Group(); scene.add(f);
          cyl(3.2, 3.4, 0.7, 12, "#cfc6b8", 0, 0.35, 0, f);
          mesh(new THREE.CircleGeometry(2.85, 12).rotateX(-Math.PI / 2), "#6cc8f2", 0, 0.62, 0, f, false);
          cyl(0.35, 0.5, 2.0, 8, "#bfb4a3", 0, 1.3, 0, f);
          cyl(1.2, 0.5, 0.4, 10, "#cfc6b8", 0, 2.3, 0, f);
          mesh(new THREE.CircleGeometry(1.05, 10).rotateX(-Math.PI / 2), "#6cc8f2", 0, 2.51, 0, f, false);
          ball(0.3, "#bfb4a3", 0, 2.75, 0, f);
          const drops = [];
          for (let i = 0; i < 14; i++) { const d = ball(0.09, "#a9e3ff", 0, 0, 0, f); d.castShadow = false; drops.push(d); }
          anims.push((t) => drops.forEach((d, i) => {
            const ph = (t * 0.8 + i / drops.length) % 1, a = (i / drops.length) * 6.283;
            const r = 0.3 + ph * 1.9; d.position.set(Math.cos(a) * r, 2.9 + Math.sin(ph * Math.PI) * 1.0 - ph * 2.2, Math.sin(a) * r);
          }));
          addCircle(0, 0, 3.5);
          // well
          const w = new THREE.Group(); w.position.set(9, 0, 7); scene.add(w);
          cyl(1.1, 1.2, 1.1, 10, "#a8a29a", 0, 0.55, 0, w);
          mesh(new THREE.CircleGeometry(0.9, 10).rotateX(-Math.PI / 2), "#2e5c74", 0, 1.0, 0, w, false);
          for (const s of [-1, 1]) box(0.18, 2.4, 0.18, "#7a4e2a", s * 1.0, 1.7, 0, w);
          prism(2.8, 2.2, 0.9, "#c0392b", 0, 2.9, 0, w).rotation.y = Math.PI / 2;
          box(2.1, 0.12, 0.12, "#5c3a1e", 0, 2.4, 0, w);
          const bucket = cyl(0.25, 0.2, 0.35, 8, "#8b5a2b", 0, 1.7, 0, w);
          anims.push((t) => (bucket.position.y = 1.75 + Math.sin(t * 0.9) * 0.15));
          addCircle(9, 7, 1.5);
          // benches
          for (const [x, z, r] of [[-9, 6, 0.9], [-7, -8, -0.8], [8, -7, 0.8]]) {
            const b = new THREE.Group(); b.position.set(x, 0, z); b.rotation.y = r; scene.add(b);
            box(2.2, 0.15, 0.7, "#c98b4a", 0, 0.55, 0, b); box(2.2, 0.5, 0.12, "#c98b4a", 0, 0.9, -0.32, b);
            for (const s of [-0.9, 0.9]) box(0.12, 0.5, 0.6, "#555", s, 0.25, 0, b);
            addBox(x, z, r, 1.1, 0.4);
          }
          // lamps
          const lampMat = (scene.userData.lampMat = new THREE.MeshBasicMaterial({ color: "#fff2b3" }));
          scene.userData.lamps = [];
          for (const [x, z] of [[11, -11], [-11, -11], [-11, 11], [11, 11]]) {
            cyl(0.1, 0.14, 3.2, 6, "#3d405b", x, 1.6, z, scene);
            const l = ball(0.32, lampMat, x, 3.35, z, scene); l.castShadow = false;
            scene.userData.lamps.push(new THREE.Vector3(x, 3.35, z));
            addCircle(x, z, 0.3);
          }
          // post office
          const po = new THREE.Group(); po.position.set(PO.x, 0, PO.z); scene.add(po);
          box(PO.w + 0.4, 0.6, PO.d + 0.4, "#b8aa94", 0, 0.1, 0, po);
          box(PO.w, 4.6, PO.d, "#fff6e0", 0, 2.6, 0, po);
          prism(PO.w + 1.4, PO.d + 1.0, 3.0, "#d62828", 0, 4.9, 0, po);
          box(1.8, 2.6, 0.2, "#7a2e1d", 0, 1.6, PO.d / 2 + 0.05, po);
          ball(0.08, "#ffd60a", 0.6, 1.6, PO.d / 2 + 0.2, po);
          for (const s of [-3, 3]) { box(1.5, 1.3, 0.15, "#9ad7ff", s, 2.6, PO.d / 2 + 0.05, po); box(1.7, 0.15, 0.3, "#fff", s, 1.9, PO.d / 2 + 0.12, po); }
          box(5.2, 1.1, 0.3, "#ffd60a", 0, 4.2, PO.d / 2 + 0.2, po);
          mesh(new THREE.PlaneGeometry(4.9, 0.95), poSign.mat, 0, 4.2, PO.d / 2 + 0.36, po, false);
          box(0.8, 1.4, 0.8, "#ffd60a", 3.8, 0.7, PO.d / 2 + 0.6, po);
          box(0.85, 0.3, 0.85, "#d62828", 3.8, 1.5, PO.d / 2 + 0.6, po);
          box(0.6, 3.8, 0.6, "#c9a27c", -3.6, 6.6, -1, po);
          addBox(PO.x, PO.z, 0, PO.w / 2 + 0.2, PO.d / 2 + 0.2);
          addCircle(PO.x + 3.8, PO.z + PO.d / 2 + 0.6, 0.6);
          mark(PO.x, PO.z, 8);
          // flag
          cyl(0.06, 0.06, 4, 6, "#ddd", -6.2, 2, 3, po);
          const flag = box(1.4, 0.9, 0.04, "#e30a17", -5.45, 3.5, 3, po);
          anims.push((t) => (flag.rotation.y = Math.sin(t * 3) * 0.2));
        }

        // ---------- the postman's kick scooter, parked by the post office ----------
        // deck top at 0.145, wheels r 0.1, front axle at z 0.72; the column rakes and stretches in fit() to meet the rider's hands
        const scooter = (() => {
          const g = new THREE.Group(); g.rotation.order = "YXZ"; scene.add(g);
          const BL = "#5b8fd9", CR = "#f3ead8", DK = "#2b2b2b", WR = 0.1;
          // solid disc wheel with a cream hub and one valve mark so the spin shows
          const wheel = (p, y, z) => {
            const w = new THREE.Group(); w.position.set(0, y, z); p.add(w);
            mesh(new THREE.CylinderGeometry(WR, WR, 0.05, 20).rotateZ(Math.PI / 2), DK, 0, 0, 0, w);
            mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.066, 14).rotateZ(Math.PI / 2), CR, 0, 0, 0, w);
            box(0.07, 0.022, 0.022, BL, 0, 0.068, 0, w);
            return w;
          };
          box(0.28, 0.05, 1.1, BL, 0, 0.12, 0, g);
          box(0.22, 0.008, 0.92, CR, 0, 0.148, -0.03, g);
          const rear = wheel(g, WR, -0.64);
          // rear brake fender over the back wheel
          box(0.08, 0.08, 0.025, BL, 0, 0.18, -0.54, g);
          box(0.08, 0.016, 0.24, BL, 0, 0.222, -0.64, g);
          box(0.08, 0.02, 0.03, CR, 0, 0.215, -0.77, g);
          // neck from the deck to the steering
          box(0.08, 0.05, 0.18, BL, 0, 0.17, 0.62, g);
          const rake = new THREE.Group(); rake.position.set(0, WR, 0.72); g.add(rake);
          const front = new THREE.Group(); rake.add(front);
          const fw = wheel(front, 0, 0);
          for (const s of [-1, 1]) box(0.02, 0.2, 0.03, BL, s * 0.04, 0.1, 0, front);
          box(0.11, 0.035, 0.05, BL, 0, 0.2, 0, front);
          const col = cyl(0.022, 0.022, 1, 10, BL, 0, 0.7, 0, front);
          cyl(0.03, 0.03, 0.04, 10, CR, 0, 0.3, 0, front);
          // T handlebar with two dark grips
          const bar = new THREE.Group(); front.add(bar);
          const barM = mesh(new THREE.CylinderGeometry(0.016, 0.016, 1, 10).rotateZ(Math.PI / 2), CR, 0, 0, 0, bar);
          const grips = [-1, 1].map((s) => mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.1, 10).rotateZ(Math.PI / 2), DK, 0, 0, 0, bar));
          // tiny front basket with envelopes
          const bk = new THREE.Group(); front.add(bk);
          box(0.22, 0.015, 0.14, CR, 0, -0.06, 0.1, bk);
          for (const s of [-1, 1]) { box(0.015, 0.12, 0.14, BL, s * 0.11, 0, 0.1, bk); box(0.22, 0.12, 0.015, BL, 0, 0, 0.1 + s * 0.07, bk); }
          box(0.14, 0.1, 0.012, "#fff8ec", -0.02, 0.03, 0.09, bk).rotation.z = 0.15;
          box(0.13, 0.09, 0.012, CR, 0.03, 0.02, 0.12, bk).rotation.z = -0.2;
          // kickstand on the left (+x): splayed down when parked, folded under the deck when riding
          const ks = new THREE.Group(); ks.position.set(0.13, 0.1, -0.15); g.add(ks);
          box(0.016, 0.16, 0.016, DK, 0, -0.08, 0, ks);
          const sc = {
            g, front, rake, ks, wheels: [rear, fw], riding: false, hop: null, v: 0, kp: 0, kick: false, boost: 0, spin: 0, F: null,
            fit(F) {
              sc.F = F; rake.rotation.x = F.rake;
              col.scale.y = F.h - 0.2; col.position.y = 0.2 + (F.h - 0.2) / 2;
              bar.position.y = F.h; barM.scale.x = 2 * F.half + 0.08;
              grips.forEach((m, i) => (m.position.x = (i ? 1 : -1) * F.half));
              bk.position.y = Math.max(0.35, F.h * 0.62);
            },
            park(x, z, h) { g.position.set(x, groundY(x, z), z); g.rotation.set(0, h, -0.14); front.rotation.y = 0.25; ks.rotation.set(0, 0, 0.85); },
          };
          sc.fit({ ox: 0, oy: 0.145, oz: -0.05, rake: -0.22, h: 1.25, half: 0.24 });
          sc.park(PO.x - 5.2, PO.z + PO.d / 2 + 2.2, Math.PI / 2);
          // the body gets its own material so the shop can recolour it without touching anything else in BL
          const bodyMat = M(BL).clone(); sc.body = bodyMat;
          g.traverse((o) => { if (o.isMesh) { o.castShadow = true; if (o.material === M(BL)) o.material = bodyMat; } });
          return sc;
        })();

        // ---------- houses ----------
        const smokeMat = new THREE.MeshBasicMaterial({ color: "#efe3cf", transparent: true, opacity: 0.75, depthWrite: false, toneMapped: false });
        const smokeGeo = new THREE.IcosahedronGeometry(0.45, 0);
        const pathPts = [];
        function wpos(h, lx, lz) { const c = Math.cos(h.rot), s = Math.sin(h.rot); return [h.x + lx * c + lz * s, h.z - lx * s + lz * c]; }
        function local(h, g, lx, lz) { const [x, z] = wpos(h, lx, lz); const o = new THREE.Group(); o.position.set(lx, H(x, z) - h.y, lz); g.add(o); return o; }

        const PETS = {
          dog(p) {
            const d = new THREE.Group(); p.add(d);
            box(0.8, 0.36, 0.36, "#c68642", 0, 0.55, 0, d);
            const head = new THREE.Group(); head.position.set(0.5, 0.75, 0); d.add(head);
            box(0.34, 0.32, 0.3, "#c68642", 0, 0, 0, head); box(0.16, 0.14, 0.18, "#8d5524", 0.2, -0.06, 0, head);
            ball(0.04, "#111", 0.28, 0.0, 0, head);
            for (const s of [-1, 1]) box(0.08, 0.2, 0.12, "#8d5524", -0.05, 0.16, s * 0.14, head);
            box(0.1, 0.38, 0.1, "#c68642", 0.3, 0.19, 0.12, d); box(0.1, 0.38, 0.1, "#c68642", 0.3, 0.19, -0.12, d);
            box(0.1, 0.38, 0.1, "#c68642", -0.3, 0.19, 0.12, d); // three legs only
            const tail = box(0.08, 0.08, 0.35, "#c68642", -0.45, 0.7, 0, d); tail.rotation.y = 1.4;
            anims.push((t) => { tail.rotation.x = Math.sin(t * 14) * 0.6; d.position.y = Math.abs(Math.sin(t * 3)) * 0.06; d.rotation.z = Math.sin(t * 3) * 0.04; head.rotation.y = Math.sin(t * 0.7) * 0.5; });
          },
          cat(p) {
            const c = new THREE.Group(); p.add(c);
            box(0.5, 0.24, 0.22, "#f4a261", 0, 0.2, 0, c);
            const head = new THREE.Group(); head.position.set(0.3, 0.38, 0); c.add(head);
            box(0.24, 0.22, 0.22, "#f4a261", 0, 0, 0, head);
            for (const s of [-1, 1]) cone(0.06, 0.12, 4, "#e76f51", 0, 0.15, s * 0.07, head);
            const tail = box(0.06, 0.4, 0.06, "#e76f51", -0.28, 0.4, 0, c);
            anims.push((t) => { tail.rotation.z = Math.sin(t * 2) * 0.4; head.rotation.y = Math.sin(t * 0.5) * 0.7; });
          },
          chickens(p) {
            for (let i = 0; i < 3; i++) {
              const c = new THREE.Group(); p.add(c);
              const b = ball(0.24, i ? "#ffffff" : "#c2703d", 0, 0.32, 0, c); b.scale.set(1.2, 0.95, 0.9);
              const head = new THREE.Group(); head.position.set(0.2, 0.5, 0); c.add(head);
              ball(0.12, i ? "#ffffff" : "#c2703d", 0, 0, 0, head); box(0.06, 0.1, 0.03, "#e63946", 0, 0.12, 0, head); cone(0.04, 0.1, 4, "#f4a261", 0.13, -0.02, 0, head).rotation.z = -Math.PI / 2;
              for (const s of [-1, 1]) box(0.03, 0.18, 0.03, "#f4a261", 0, 0.09, s * 0.08, c);
              const ph = i * 2.1, cx = Math.cos(ph) * 1.2, cz = Math.sin(ph) * 1.2;
              anims.push((t) => {
                const a = t * 0.3 + ph; c.position.set(cx + Math.cos(a) * 0.8, 0, cz + Math.sin(a) * 0.8); c.rotation.y = -a;
                head.rotation.z = Math.max(0, Math.sin(t * 4 + ph)) * -1.1;
              });
            }
          },
          goat(p) {
            const g = new THREE.Group(); p.add(g);
            box(0.9, 0.45, 0.42, "#e9e3d5", 0, 0.75, 0, g);
            for (const [x, z] of [[0.32, 0.14], [0.32, -0.14], [-0.32, 0.14], [-0.32, -0.14]]) box(0.1, 0.55, 0.1, "#cfc6b4", x, 0.28, z, g);
            const head = new THREE.Group(); head.position.set(0.55, 1.05, 0); g.add(head);
            box(0.36, 0.28, 0.26, "#e9e3d5", 0.08, 0, 0, head); box(0.08, 0.18, 0.08, "#bfb6a3", 0.2, -0.22, 0, head);
            for (const s of [-1, 1]) { const h = cone(0.05, 0.3, 4, "#6d6875", -0.06, 0.24, s * 0.08, head); h.rotation.z = 0.5; }
            anims.push((t) => { head.rotation.z = -0.3 - Math.max(0, Math.sin(t * 0.8)) * 0.6; g.rotation.y = Math.sin(t * 0.2) * 0.8; });
          },
          sheep(p) {
            for (let i = 0; i < 2; i++) {
              const s = new THREE.Group(); s.position.set(i * 1.6, 0, i * 1.1); s.rotation.y = i * 1.7; p.add(s);
              const b = ball(0.55, "#fbfbf6", 0, 0.85, 0, s); b.scale.set(1.3, 0.9, 0.95);
              ball(0.3, "#fbfbf6", -0.35, 1.15, 0.15, s); ball(0.28, "#fbfbf6", 0.2, 1.15, -0.2, s);
              const head = box(0.3, 0.32, 0.28, "#2b2d42", 0.72, 0.95, 0, s);
              for (const [x, z] of [[0.35, 0.2], [0.35, -0.2], [-0.35, 0.2], [-0.35, -0.2]]) box(0.1, 0.5, 0.1, "#2b2d42", x, 0.25, z, s);
              anims.push((t) => { head.position.y = 0.95 - Math.max(0, Math.sin(t * 0.6 + i * 2)) * 0.35; s.position.y = Math.abs(Math.sin(t * 1.2 + i)) * 0.03; });
            }
          },
        };

        const FEATURES = {
          windmill(h, p) {
            cyl(1.1, 1.7, 8, 7, "#f4efe2", 0, 4, 0, p); cone(1.5, 1.8, 7, "#9c6644", 0, 8.9, 0, p);
            box(0.6, 1.2, 0.1, "#6b3e26", 0, 0.6, 1.55, p);
            const hub = new THREE.Group(); hub.position.set(0, 7.2, 1.5); p.add(hub);
            ball(0.3, "#6b3e26", 0, 0, 0, hub);
            for (let i = 0; i < 5; i++) { const arm = new THREE.Group(); arm.rotation.z = (i * 2 * Math.PI) / 5; hub.add(arm); box(0.12, 4, 0.08, "#7a4e2a", 0, 2, 0, arm); box(0.8, 3.2, 0.05, "#fffaf0", 0.45, 2.3, 0.04, arm); }
            anims.push((t, dt) => (hub.rotation.z -= dt * 1.1));
            return 2;
          },
          bakery(h, p) {
            box(0.15, 2.55, 0.15, "#6b3e26", 0, 1.275, 0, p); box(1.4, 0.1, 0.1, "#6b3e26", 0.7, 2.5, 0, p);
            const sign = new THREE.Group(); sign.position.set(0.9, 2.45, 0); p.add(sign);
            box(1.3, 0.6, 0.08, "#f6bd60", 0, -0.35, 0, sign);
            const tex = langSignMat("FIRIN", "BAKERY", "#f6bd60", "#7f4f24");
            for (const s of [1, -1]) { const pl = mesh(new THREE.PlaneGeometry(1.2, 0.5), tex, 0, -0.35, s * 0.05, sign, false); if (s < 0) pl.rotation.y = Math.PI; }
            const loaf = ball(0.3, "#d4a373", 0, -0.85, 0, sign); loaf.scale.set(1.4, 0.7, 0.8);
            anims.push((t) => (sign.rotation.x = Math.sin(t * 1.6) * 0.08));
            box(1.6, 0.8, 0.8, "#9c6644", 1.5, 0.4, 1.2, p); ball(0.25, "#e9c46a", 1.2, 0.95, 1.2, p); ball(0.25, "#d4a373", 1.75, 0.95, 1.1, p);
            return 1;
          },
          beehive(h, p) {
            for (const x of [0, 1.6]) { box(0.9, 0.3, 0.9, "#8d6e63", x, 0.15, 0, p); for (let k = 0; k < 3; k++) box(0.8, 0.32, 0.8, k % 2 ? "#ffd166" : "#fff3c4", x, 0.47 + k * 0.32, 0, p); box(1, 0.12, 1, "#8d6e63", x, 1.45, 0, p); }
            const bees = [];
            for (let i = 0; i < 6; i++) { const b = ball(0.07, "#2b2d42", 0, 0, 0, p); b.castShadow = false; ball(0.05, "#ffd60a", 0.05, 0, 0, b); bees.push(b); }
            anims.push((t) => bees.forEach((b, i) => b.position.set(0.8 + Math.sin(t * 2 + i) * 1.2, 1.4 + Math.sin(t * 5 + i * 3) * 0.4, Math.cos(t * 2.3 + i * 2) * 1.2)));
            return 1.6;
          },
          garden(h, p) {
            const veg = ["#e63946", "#f77f00", "#9b5de5", "#ffbe0b"];
            for (let r = 0; r < 4; r++) {
              box(4, 0.25, 0.7, "#7f5539", 0, 0.12, r * 1.1 - 1.6, p);
              for (let k = 0; k < 6; k++) { ball(0.22, "#52b788", k * 0.7 - 1.75, 0.38, r * 1.1 - 1.6, p); if (k % 2) ball(0.12, veg[r], k * 0.7 - 1.75, 0.55, r * 1.1 - 1.45, p); }
            }
            const sc = new THREE.Group(); sc.position.set(2.6, 0, 0); p.add(sc);
            box(0.1, 1.2, 0.1, "#7a4e2a", 0, 0.6, 0, sc); box(0.5, 0.6, 0.35, "#e63946", 0, 1.35, 0, sc);
            for (const s of [-1, 1]) box(0.14, 0.5, 0.14, "#e63946", s * 0.3, 1.25, 0, sc).rotation.z = s * 0.35; ball(0.2, "#f1c27d", 0, 1.9, 0, sc); cone(0.35, 0.3, 6, "#e9c46a", 0, 2.1, 0, sc);
            anims.push((t) => (sc.rotation.y = Math.sin(t * 0.7) * 0.3));
            return 0;
          },
          swing(h, p) {
            cyl(0.3, 0.45, 4.5, 6, "#7a4e2a", 0, 2.25, 0, p);
            ball(2.4, "#57a639", 0, 5.2, 0, p); ball(1.6, "#6cbf4a", 1.2, 4.7, 0.6, p);
            box(2.6, 0.25, 0.25, "#7a4e2a", 1.3, 3.8, 0, p);
            const sw = new THREE.Group(); sw.position.set(1.9, 3.7, 0); p.add(sw);
            for (const s of [-0.35, 0.35]) box(0.04, 2.6, 0.04, "#d4c4a8", 0, -1.3, s, sw);
            box(0.5, 0.08, 0.9, "#e76f51", 0, -2.6, 0, sw);
            anims.push((t) => (sw.rotation.z = Math.sin(t * 1.6) * 0.45));
            return 0.7;
          },
          laundry(h, p) {
            for (const s of [-2, 2]) box(0.12, 2.2, 0.12, "#7a4e2a", s, 1.1, 0, p);
            box(4, 0.03, 0.03, "#eee", 0, 2.1, 0, p);
            const cols = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#ffffff"];
            cols.forEach((c, i) => {
              const cl = new THREE.Group(); cl.position.set(-1.5 + i * 0.75, 2.1, 0); p.add(cl);
              box(0.55, i % 2 ? 0.8 : 0.6, 0.03, c, 0, i % 2 ? -0.42 : -0.32, 0, cl);
              anims.push((t) => (cl.rotation.x = Math.sin(t * 2.2 + i) * 0.25));
            });
            return 0;
          },
          tractor(h, p) {
            box(1.6, 0.8, 1.1, "#d62828", 0.5, 1.0, 0, p); box(1.0, 1.2, 1.1, "#d62828", -0.6, 1.5, 0, p);
            box(0.9, 0.7, 1.0, "#bde0fe", -0.6, 2.4, 0, p); box(1.1, 0.1, 1.2, "#d62828", -0.6, 2.8, 0, p);
            cyl(0.08, 0.08, 0.8, 6, "#333", 0.9, 1.8, 0.3, p);
            for (const s of [-1, 1]) { const w1 = cyl(0.75, 0.75, 0.35, 10, "#222", -0.6, 0.75, s * 0.75, p); w1.rotation.x = Math.PI / 2; const w2 = cyl(0.42, 0.42, 0.3, 8, "#222", 0.95, 0.42, s * 0.65, p); w2.rotation.x = Math.PI / 2; }
            return 1.8;
          },
        };

        // ---------- house builder: parts go into a scratch group, then bake into one mesh per material ----------
        const HG = {
          box: new THREE.BoxGeometry(1, 1, 1),
          ball: new THREE.IcosahedronGeometry(1, 0),
          cyl: new THREE.CylinderGeometry(1, 1, 1, 8),
          disc: new THREE.CylinderGeometry(1, 1, 1, 18),
          pot: new THREE.CylinderGeometry(1, 0.72, 1, 8),
          gable: new THREE.CylinderGeometry(1, 1, 1, 3).rotateX(-Math.PI / 2).scale(1 / 1.732, 1 / 1.5, 1).translate(0, 1 / 3, 0),
          ring: new THREE.TorusGeometry(0.36, 0.035, 4, 14),
          shoe: new THREE.TorusGeometry(0.13, 0.03, 4, 8, Math.PI * 1.3),
        };
        const HM = {};
        const hmat = (c, r = 0.9) => HM[c + r] || (HM[c + r] = new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: 0, flatShading: true }));
        const hex = (c) => "#" + c.getHexString();
        const tint = (c, q) => hex(new THREE.Color(c).offsetHSL((q() - 0.5) * 0.02, (q() - 0.5) * 0.08, (q() - 0.5) * 0.08));
        const shade = (c, k) => hex(new THREE.Color(c).multiplyScalar(k));
        function part(p, geo, c, sx, sy, sz, x, y, z, rx = 0, ry = 0, rz = 0) {
          const m = new THREE.Mesh(geo, typeof c === "string" ? hmat(c) : c);
          m.scale.set(sx, sy, sz); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); p.add(m); return m;
        }
        const pb = (p, c, w, hh, d, x, y, z, rx, ry, rz) => part(p, HG.box, c, w, hh, d, x, y, z, rx, ry, rz);
        const sub = (p, x, y, z, ry = 0) => { const o = new THREE.Group(); o.position.set(x, y, z); o.rotation.y = ry; p.add(o); return o; };
        const rod = (p, c, t, y1, z1, y2, z2, x = 0) => pb(p, c, t, t, Math.hypot(y2 - y1, z2 - z1), x, (y1 + y2) / 2, (z1 + z2) / 2, Math.atan2(-(y2 - y1), z2 - z1));
        function bake(t, g) {
          t.updateMatrixWorld(true);
          const byMat = new Map();
          t.traverse((o) => {
            if (!o.isMesh) return;
            const geo = (o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone()).applyMatrix4(o.matrixWorld);
            if (!byMat.has(o.material)) byMat.set(o.material, []);
            byMat.get(o.material).push(geo);
          });
          byMat.forEach((list, mat) => {
            const n = list.reduce((s, q) => s + q.attributes.position.array.length, 0);
            const pos = new Float32Array(n), nor = new Float32Array(n);
            let off = 0;
            for (const q of list) { pos.set(q.attributes.position.array, off); nor.set(q.attributes.normal.array, off); off += q.attributes.position.array.length; q.dispose(); }
            const geo = new THREE.BufferGeometry();
            geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
            geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
            geo.computeBoundingSphere();
            const m = new THREE.Mesh(geo, mat); m.castShadow = m.receiveShadow = true; g.add(m);
          });
        }
        // window facing local +z with its wall surface at z=0: frame, one vertical divider (two panes), sill, shutters, flower box
        function hwin(p, x, y, z, ry, o, flowers) {
          const w = sub(p, x, y, z, ry);
          part(w, HG.box, hmat("#8fc9e6", 0.35), 0.9, 0.8, 0.04, 0, 0, 0.01);
          for (const s of [-1, 1]) { pb(w, o.trim, 1.1, 0.1, 0.1, 0, s * 0.45, 0.05); pb(w, o.trim, 0.1, 0.9, 0.1, s * 0.5, 0, 0.05); }
          pb(w, o.trim, 0.06, 0.8, 0.06, 0, 0, 0.06);
          pb(w, o.trim, 1.3, 0.08, 0.26, 0, -0.5, 0.12);
          for (const s of [-1, 1]) {
            const sx = o.shut ? s * 0.23 : s * 0.72, sz = o.shut ? 0.13 : 0.04, sw = o.shut ? 0.44 : 0.38;
            pb(w, o.shutter, sw, 0.84, 0.05, sx, 0, sz);
            for (const k of [-0.22, 0, 0.22]) pb(w, o.slat, sw - 0.08, 0.04, 0.03, sx, k, sz + 0.035);
          }
          if (!flowers) return;
          pb(w, o.boxc, 1.0, 0.24, 0.26, 0, -0.68, 0.2);
          for (let i = 0; i < 5; i++) {
            part(w, HG.ball, "#4f8f3a", 0.12, 0.1, 0.12, -0.4 + i * 0.2, -0.52, 0.2);
            part(w, HG.ball, o.fl[(i + o.k) % o.fl.length], 0.075, 0.075, 0.075, -0.37 + i * 0.2, -0.44, 0.22 + (i % 2) * 0.06);
          }
        }
        function buildHouse(h, idx, g) {
          let s2 = 1009 + idx * 7919;
          const q = () => ((s2 = (s2 * 16807) % 2147483647) / 2147483647);
          const qp = (a) => a[Math.floor(q() * a.length)];
          const gy = (lx, lz) => { const [x, z] = wpos(h, lx, lz); return H(x, z) - h.y; };
          const t = new THREE.Group();
          const W = h.w, D = h.d, F = D / 2, y0 = h.h + 0.25, rise = 2 + (idx % 3) * 0.4, wy = h.h * 0.55 + 0.3;
          const body = tint(h.body, q), roof = tint(h.roof, q), roofDk = shade(roof, 0.72), wood = tint("#5b3a24", q);
          const trim = qp(["#fbf6ec", "#f1e3c6", "#6b4a33"]), stones = ["#958b7c", "#a89f8f", "#857c6e"];
          const o = { trim, shutter: tint(qp(["#2f6f8f", "#4f7d4a", "#a8433f", "#6d597a", "#d9a441", "#3d5a80"]), q), shut: q() < 0.35, boxc: "#8a5a3b", fl: ["#ff4d6d", "#ffbe0b", "#ffffff", "#c77dff", "#fb5607"], k: idx };
          o.slat = shade(o.shutter, 0.72);
          Object.assign(h, { pots: Math.floor(q() * 5), timber: q() < 0.4, shutters: o.shut ? "closed" : "open", horseshoe: q() < 0.35, bike: q() < 0.3, bench: q() < 0.4, awning: q() < 0.5, catBowl: h.pet === "cat" });

          // stone foundation strip
          pb(t, stones[1], W + 0.5, 2, D + 0.5, 0, -0.75, 0);
          pb(t, stones[0], W + 0.62, 0.1, D + 0.62, 0, 0.27, 0);
          for (let i = 0; i < 15; i++) {
            const side = i % 3, u = q() - 0.5, c = qp(stones), sw = 0.4 + q() * 0.4, y = -0.03 - (i % 2) * 0.24;
            if (side === 0) pb(t, c, sw, 0.2, 0.08, u * (W - 0.4), y, F + 0.27);
            else pb(t, c, 0.08, 0.2, sw, (side === 1 ? 1 : -1) * (W / 2 + 0.27), y, u * (D - 0.4));
          }
          // walls and gable ends
          pb(t, body, W, h.h, D, 0, h.h / 2 + 0.25, 0);
          part(t, HG.gable, body, W - 0.04, rise, D - 0.04, 0, y0 - 0.03, 0);
          if (h.timber) {
            for (const sx of [-1, 1]) for (const sz of [-1, 1]) pb(t, wood, 0.22, h.h, 0.22, sx * (W / 2 - 0.06), h.h / 2 + 0.25, sz * (F - 0.06));
            for (const sz of [-1, 1]) pb(t, wood, W + 0.04, 0.18, 0.1, 0, y0 - 0.1, sz * (F + 0.01));
            // small round attic window centred in the gable
            const ay = y0 + rise * 0.38;
            part(t, HG.disc, "#fbf6ec", 0.44, 0.08, 0.44, 0, ay, F + 0.02, Math.PI / 2);
            part(t, HG.disc, hmat("#8fc9e6", 0.35), 0.32, 0.06, 0.32, 0, ay, F + 0.06, Math.PI / 2);
            for (const sx of [-1, 1]) {
              const x = sx * (W / 2 + 0.02);
              pb(t, wood, 0.08, 0.16, D, x, 1.3, 0);
              for (const sz of [-1, 1]) rod(t, wood, 0.12, 0.35, sz * (F - 0.2), 1.3, sz * (F - 1.1), x);
            }
          }
          // gabled roof: two thick slabs with overhang, tile battens, barge boards, fascia and a ridge beam
          const hw = W / 2, a = Math.atan2(rise, hw), oh = 0.6, th = 0.22, Ls = Math.hypot(hw, rise) + oh, RL = D + 1.0, ridgeY = y0 + rise;
          for (const s of [-1, 1]) {
            const at = (d, n) => [s * Math.cos(a) * d + s * Math.sin(a) * n, ridgeY - Math.sin(a) * d + Math.cos(a) * n];
            let [x, y] = at(Ls / 2, th / 2);
            pb(t, roof, Ls, th, RL, x, y, 0, 0, 0, -s * a);
            for (const z of [-1, 1]) pb(t, roofDk, Ls, th + 0.06, 0.08, x, y, z * (RL / 2 + 0.04), 0, 0, -s * a);
            for (let k = 1; k < 5; k++) { [x, y] = at((Ls * k) / 5, th + 0.02); pb(t, roofDk, 0.07, 0.05, RL, x, y, 0, 0, 0, -s * a); }
            [x, y] = at(Ls, th / 2);
            pb(t, roofDk, 0.09, th + 0.12, RL + 0.16, x + s * 0.03, y, 0);
          }
          const ridgeTop = ridgeY + th / Math.cos(a) + 0.14;
          pb(t, roofDk, 0.34, 0.28, RL + 0.2, 0, ridgeTop - 0.14, 0);
          // chimney with band, cap and pot
          const cx = W / 4, cz = -D / 4, ch = rise + 0.9, chim = tint(h.chimney, q);
          pb(t, chim, 0.7, ch, 0.7, cx, y0 + ch / 2, cz);
          pb(t, shade(chim, 0.8), 0.78, 0.12, 0.78, cx, y0 + ch - 0.3, cz);
          pb(t, "#4a4a4a", 0.95, 0.12, 0.95, cx, y0 + ch + 0.06, cz);
          part(t, HG.cyl, "#8a4a32", 0.14, 0.26, 0.14, cx, y0 + ch + 0.25, cz);
          // door: frame, planks, knob, steps, awning, horseshoe
          const doorC = tint(h.door, q), doorDk = shade(doorC, 0.7);
          pb(t, trim, 1.36, 2.3, 0.1, 0, 1.3, F + 0.03);
          pb(t, doorC, 1.1, 2.06, 0.1, 0, 1.28, F + 0.07);
          for (const x of [-0.18, 0.18]) pb(t, doorDk, 0.04, 1.9, 0.04, x, 1.28, F + 0.12);
          part(t, HG.ball, "#d4a72c", 0.075, 0.075, 0.075, 0.36, 1.25, F + 0.17);
          pb(t, stones[0], 1.6, 0.28, 0.55, 0, 0.11, F + 0.3);
          pb(t, stones[2], 1.9, 0.3, 0.55, 0, -0.14, F + 0.78);
          if (h.awning) {
            pb(t, roof, 1.8, 0.08, 0.85, 0, 2.72, F + 0.42, 0.32);
            for (const s of [-1, 1]) rod(t, wood, 0.06, 2.3, F + 0.02, 2.6, F + 0.62, s * 0.75);
          }
          if (h.horseshoe) part(t, HG.shoe, "#7d8288", 1, 1, 1, 0, 2.6, F + 0.06, 0, 0, -1.15 * Math.PI);
          // windows: front ones with flower boxes, side ones plain
          for (const s of [-1, 1]) {
            hwin(t, s * (W / 2 - 1.1), wy, F, 0, { ...o, k: idx + s + 1 }, true);
            hwin(t, (s * W) / 2, wy, 0, (s * Math.PI) / 2, o, false);
          }
          // flower pots by the door (h.pots, 0-4)
          const spots = [[1.15, F + 0.35], [-1.15, F + 0.35], [1.2, F + 0.85], [-1.2, F + 0.85]];
          for (let i = 0; i < h.pots; i++) {
            const [x, z] = spots[i], y = gy(x, z);
            part(t, HG.pot, i % 2 ? "#b5562f" : "#c96f42", 0.2, 0.34, 0.2, x, y + 0.17, z);
            part(t, HG.ball, "#4f8f3a", 0.2, 0.18, 0.2, x, y + 0.42, z);
            for (const k of [-1, 1]) part(t, HG.ball, o.fl[(i * 2 + k + 2) % o.fl.length], 0.08, 0.08, 0.08, x + k * 0.08, y + 0.58, z + 0.05);
          }
          if (h.bench) {
            const bx = -(W / 2 - 0.75), bz = F + 0.45, y = gy(bx, bz), bc = "#8b5e3c";
            pb(t, bc, 1.2, 0.08, 0.42, bx, y + 0.45, bz);
            pb(t, bc, 1.2, 0.26, 0.06, bx, y + 0.78, bz - 0.2);
            for (const sx of [-1, 1]) { pb(t, bc, 0.08, 0.92, 0.08, bx + sx * 0.5, y + 0.46, bz - 0.17); pb(t, bc, 0.08, 0.45, 0.08, bx + sx * 0.5, y + 0.22, bz + 0.15); }
          }
          if (h.catBowl) {
            const y = gy(1.9, F + 0.5);
            part(t, HG.cyl, "#e63946", 0.18, 0.08, 0.18, 1.9, y + 0.04, F + 0.5);
            part(t, HG.cyl, "#8d5a2b", 0.13, 0.02, 0.13, 1.9, y + 0.08, F + 0.5);
          }
          if (h.bike) {
            const bz = F - 1.3, b = sub(t, W / 2 + 0.32, gy(W / 2 + 0.32, bz), bz), c = qp(["#d62828", "#1d74c4", "#2a9d8f"]);
            b.rotation.z = 0.15;
            for (const z of [-0.55, 0.55]) { part(b, HG.ring, "#2b2b2b", 1, 1, 1, 0, 0.39, z, 0, Math.PI / 2); part(b, HG.ball, "#9a9a9a", 0.05, 0.05, 0.05, 0, 0.39, z); }
            for (const [y1, z1, y2, z2] of [[0.39, -0.55, 0.45, -0.05], [0.45, -0.05, 0.85, -0.2], [0.85, -0.2, 0.85, 0.38], [0.45, -0.05, 0.85, 0.38], [0.85, -0.2, 0.39, -0.55], [0.95, 0.42, 0.39, 0.55]]) rod(b, c, 0.05, y1, z1, y2, z2);
            pb(b, "#222222", 0.12, 0.05, 0.24, 0, 0.9, -0.22);
            pb(b, "#222222", 0.5, 0.04, 0.04, 0, 0.98, 0.42);
          }
          // small yard fence pieces at the front corners
          const fc = qp(["#f4efe6", "#9c6b43"]);
          const fence = (x1, x2, z) => {
            const n = Math.max(2, Math.round(Math.abs(x2 - x1) / 0.7) + 1);
            let px, py;
            for (let i = 0; i < n; i++) {
              const x = lerp(x1, x2, i / (n - 1)), y = gy(x, z);
              pb(t, fc, 0.1, 0.68, 0.1, x, y + 0.28, z);
              if (i) for (const ry of [0.3, 0.58]) pb(t, fc, Math.abs(x - px), 0.07, 0.05, (x + px) / 2, (y + py) / 2 + ry, z);
              px = x; py = y;
            }
          };
          fence(-1.9, -(W / 2 + 0.6), F + 2.1);
          if (h.pet !== "chickens") fence(1.9, W / 2 + 0.6, F + 2.1);
          bake(t, g);
          return { top: y0 + ch + 0.4, ridgeTop, cx, cz };
        }

        HOUSES.forEach((h, idx) => {
          h.rot = Math.atan2(-h.x, -h.z);
          h.y = H(h.x, h.z);
          h.w = 5.6 + (idx % 3) * 0.7; h.d = 5 + (idx % 2) * 0.6; h.h = 3.4 + (idx % 4) * 0.3;
          const g = new THREE.Group(); g.position.set(h.x, h.y, h.z); g.rotation.y = h.rot; scene.add(g); h.group = g;
          const { top, ridgeTop, cx, cz } = buildHouse(h, idx, g);
          rnd(); rnd(); // the old builder drew two flower colours here; keep the rest of the world's layout unchanged
          // smoke
          const puffs = [];
          for (let i = 0; i < 5; i++) { const s = new THREE.Mesh(smokeGeo, smokeMat); g.add(s); puffs.push(s); }
          anims.push((t) => puffs.forEach((s, i) => {
            const ph = (t * 0.28 + i / 5 + idx * 0.13) % 1;
            s.position.set(cx + ph * 1.2 + Math.sin(t + i) * 0.15, top + ph * 4.5, cz - ph * 0.5);
            s.scale.setScalar(Math.sin(ph * Math.PI) * (0.6 + ph * 0.9) + 0.01);
          }));
          addBox(h.x, h.z, h.rot, h.w / 2 + 0.25, h.d / 2 + 0.25);
          mark(h.x, h.z, 7);
          // feature on the left side, pet on the right/front
          if (h.feature) {
            const lx = -(h.w / 2 + 3.5), lz = 0.5, p = local(h, g, lx, lz);
            if (h.feature === "laundry" || h.feature === "garden") p.rotation.y = Math.PI / 2;
            const r = FEATURES[h.feature](h, p);
            const [fx, fz] = wpos(h, lx, lz); mark(fx, fz, 4); h.featPos = { x: fx, z: fz };
            if (r) addCircle(fx, fz, r);
            if (h.feature === "laundry") { const [a, b] = wpos(h, lx, lz - 2), [c, d] = wpos(h, lx, lz + 2); addCircle(a, b, 0.25); addCircle(c, d, 0.25); }
            if (h.feature === "swing") { const [a, b] = wpos(h, lx, lz); addCircle(a, b, 0.6); }
          }
          if (h.pet === "cat") { const c = new THREE.Group(); c.position.set(0, ridgeTop - 0.08, 0.6); c.rotation.y = Math.PI / 2; g.add(c); PETS.cat(c); }
          else if (h.pet) { const p = local(h, g, h.w / 2 + 2.5, h.d / 2 + 1.5); p.rotation.y = -0.6; PETS[h.pet](p); }
          // door point and path
          const [dx, dz] = wpos(h, 0, h.d / 2 + 1.2); h.door2 = { x: dx, z: dz };
          const a = Math.atan2(dz, dx), start = [Math.cos(a) * 14.5, Math.sin(a) * 14.5];
          let pts = [start, [dx, dz]];
          if (h.x > riverX(h.z) - 4) {
            const b = BRIDGES.reduce((m, q) => (Math.abs(q.z - h.z) < Math.abs(m.z - h.z) ? q : m));
            const ba = Math.atan2(b.z, b.x - 7);
            pts = [[Math.cos(ba) * 14.5, Math.sin(ba) * 14.5], [b.x - 7, b.z], [b.x + 7, b.z], [dx, dz]];
          }
          h.pathPts = pts;
          pathPts.push(pts);
        });
        {
          const all = [];
          for (const pts of pathPts) {
            const r = ribbon(pts, 2.4, (x, z) => H(x, z) + 0.12, (x, z) => Math.abs(x - riverX(z)) < 6.6);
            all.push(...r.out);
            r.s.forEach(([x, z]) => mark(x, z, 2));
          }
          ribbonMesh(all, "#d9b47a");
          // the same paths for groundY: segment ends plus a padded bounding box
          for (const pts of pathPts) for (let i = 0; i < pts.length - 1; i++) {
            const [ax, az] = pts[i], [bx, bz] = pts[i + 1], p = PATH_HW + 0.2;
            GROUND_PATHS.push([ax, az, bx, bz, Math.min(ax, bx) - p, Math.max(ax, bx) + p, Math.min(az, bz) - p, Math.max(az, bz) + p]);
          }
          scooter.g.position.y = groundY(scooter.g.position.x, scooter.g.position.z);
        }
        // ---------- scooter ramps: small wooden humps across the longer paths, spread around the village ----------
        const RAMPS = [];
        {
          const segs = [];
          for (const pts of pathPts) for (let i = 0; i < pts.length - 1; i++) {
            const [ax, az] = pts[i], [bx, bz] = pts[i + 1], L = Math.hypot(bx - ax, bz - az);
            if (L < 13) continue;
            const k = 0.55, x = ax + (bx - ax) * k, z = az + (bz - az) * k;
            if (Math.abs(x - riverX(z)) < 11 || Math.hypot(x, z) < 22 || Math.hypot(x - POND.x, z - POND.z) < POND.r + 4) continue;
            segs.push({ x, z, cx: (bx - ax) / L, cz: (bz - az) / L, L });
          }
          segs.sort((a, b) => b.L - a.L);
          for (const s of segs) {
            if (RAMPS.length >= 6) break;
            if (RAMPS.some((r) => Math.hypot(r.x - s.x, r.z - s.z) < 18)) continue;
            RAMPS.push(s);
          }
          const WOOD = "#a8743f", WOOD_D = "#7a5230";
          RAMPS.forEach((r) => {
            const g = new THREE.Group(); g.position.set(r.x, groundY(r.x, r.z) - 0.04, r.z);
            g.rotation.y = Math.atan2(r.cx, r.cz) + Math.PI / 2; // local x runs along the path, so the ridge lies across it
            prism(2.6, 1.7, 0.38, WOOD, 0, 0, 0, g);
            [-0.86, 0.86].forEach((zz) => box(2.5, 0.08, 0.08, WOOD_D, 0, 0.04, zz, g));
            [-0.55, 0.55].forEach((xx) => box(0.05, 0.03, 1.66, WOOD_D, xx, 0.235, 0, g).rotation.z = xx > 0 ? -0.29 : 0.29);
            scene.add(g);
          });
        }

        // ---------- trees, flowers, grass (instanced) ----------
        const treePts = [];
        {
          const dummy = new THREE.Object3D(), col = new THREE.Color();
          const N = 180;
          const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.22, 0.34, 2.2, 5).translate(0, 1.1, 0), M("#8b5a2b"), N);
          const crowns = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1.7, 0).translate(0, 3.2, 0), new THREE.MeshLambertMaterial({ color: "#ffffff" }), N);
          const pines = new THREE.InstancedMesh(new THREE.ConeGeometry(1.5, 3.6, 6).translate(0, 3.6, 0), new THREE.MeshLambertMaterial({ color: "#ffffff" }), N);
          const palette = ["#5cb85c", "#4caf50", "#6cc04a", "#7bc950", "#3f9b47", "#ffafcc", "#ff8fab", "#f8961e", "#f3722c", "#ffd166"];
          let n = 0, np = 0, tries = 0;
          while (n + np < N && tries++ < 6000) {
            const x = rr(-97, 97), z = rr(-97, 97);
            if (!free(x, z) || !free(x + 1.2, z) || !free(x - 1.2, z) || !free(x, z + 1.2) || !free(x, z - 1.2)) continue;
            const s = rr(0.75, 1.35), y = H(x, z);
            dummy.position.set(x, y - 0.1, z); dummy.rotation.set(0, rr(0, 6.28), 0); dummy.scale.set(s, s, s); dummy.updateMatrix();
            trunks.setMatrixAt(n + np, dummy.matrix);
            if (rnd() < 0.25) { pines.setMatrixAt(np, dummy.matrix); pines.setColorAt(np, col.set(pick(["#2d6a4f", "#40916c", "#357a52"]))); np++; }
            else { crowns.setMatrixAt(n, dummy.matrix); crowns.setColorAt(n, col.set(rnd() < 0.62 ? pick(palette.slice(0, 5)) : pick(palette.slice(5)))); n++; }
            mark(x, z, 2.2); addCircle(x, z, 0.45 * s); treePts.push([x, z]);
          }
          trunks.count = n + np; crowns.count = n; pines.count = np;
          for (const m of [trunks, crowns, pines]) { m.castShadow = m.receiveShadow = true; scene.add(m); }

          const NF = 750, flowers = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.17, 0), new THREE.MeshLambertMaterial({ color: "#ffffff" }), NF);
          const fcols = ["#ff006e", "#ffbe0b", "#fb5607", "#8338ec", "#3a86ff", "#ffffff", "#ff99c8", "#fcf6bd", "#e63946"];
          let f = 0;
          for (let c = 0; c < 110 && f < NF; c++) {
            const cx = rr(-92, 92), cz = rr(-92, 92); if (!free(cx, cz)) continue;
            const fc = pick(fcols);
            for (let k = 0; k < 8 && f < NF; k++) {
              const x = cx + rr(-2.5, 2.5), z = cz + rr(-2.5, 2.5); if (!free(x, z)) continue;
              dummy.position.set(x, H(x, z) + 0.25, z); dummy.rotation.set(0, 0, 0); dummy.scale.setScalar(rr(0.8, 1.3)); dummy.updateMatrix();
              flowers.setMatrixAt(f, dummy.matrix); flowers.setColorAt(f, col.set(rnd() < 0.8 ? fc : pick(fcols))); f++;
            }
          }
          flowers.count = f; flowers.receiveShadow = true; scene.add(flowers);

          const NG = 1300, grass = new THREE.InstancedMesh(new THREE.ConeGeometry(0.16, 0.7, 3).translate(0, 0.3, 0), new THREE.MeshLambertMaterial({ color: "#ffffff" }), NG);
          const gcols = ["#4f9d3a", "#6abf4b", "#88d15f", "#3d8b37", "#a3d977"];
          let gN = 0;
          for (let i = 0; i < 4000 && gN < NG; i++) {
            const x = rr(-98, 98), z = rr(-98, 98);
            if (!free(x, z) && rnd() < 0.85) continue;
            if (Math.abs(x - riverX(z)) < 5.5 || Math.hypot(x - POND.x, z - POND.z) < 9.5 || Math.hypot(x, z) < 16.5) continue;
            dummy.position.set(x, H(x, z) - 0.05, z); dummy.rotation.set(rr(-0.2, 0.2), rr(0, 6.28), rr(-0.2, 0.2)); dummy.scale.setScalar(rr(0.7, 1.5)); dummy.updateMatrix();
            grass.setMatrixAt(gN, dummy.matrix); grass.setColorAt(gN, col.set(pick(gcols))); gN++;
          }
          grass.count = gN; grass.receiveShadow = true; scene.add(grass);

          // rocks
          for (let i = 0; i < 40; i++) { const x = rr(-95, 95), z = rr(-95, 95); if (!free(x, z)) continue; const r = ball(rr(0.3, 0.8), pick(["#b0aca5", "#9a958c", "#c4beb3"]), x, H(x, z), z, scene); r.scale.y = 0.6; }
        }

        // ---------- butterflies, ducks, clouds ----------
        {
          const wingGeo = new THREE.PlaneGeometry(0.34, 0.26).translate(0.17, 0, 0);
          for (let i = 0; i < 9; i++) {
            const b = new THREE.Group(); scene.add(b);
            const m = new THREE.MeshLambertMaterial({ color: pick(["#ffbe0b", "#ff006e", "#8338ec", "#3a86ff", "#ffffff", "#fb5607"]), side: THREE.DoubleSide });
            const l = new THREE.Mesh(wingGeo, m), r = new THREE.Mesh(wingGeo, m); r.rotation.y = Math.PI; b.add(l, r);
            const [cx, cz] = treePts.length ? pick(treePts) : [0, 0], sp = rr(0.4, 0.8), ph = rr(0, 6);
            anims.push((t) => {
              const x = cx + Math.sin(t * sp + ph) * 4, z = cz + Math.cos(t * sp * 0.7 + ph) * 4;
              b.position.set(x, H(x, z) + 1.3 + Math.sin(t * 2 + ph) * 0.4, z);
              b.rotation.y = t * sp + ph;
              const f = Math.sin(t * 18 + ph) * 1.1; l.rotation.x = 0; l.rotation.z = f; r.rotation.z = -f;
            });
          }
          for (let i = 0; i < 5; i++) {
            const d = new THREE.Group(); scene.add(d);
            const c = i === 0 ? "#ffffff" : i % 2 ? "#8d6e63" : "#f1f1f1";
            const body = ball(0.38, c, 0, 0.12, 0, d); body.scale.set(1.4, 0.8, 0.9);
            ball(0.22, i % 2 ? "#2d6a4f" : c, 0.38, 0.5, 0, d);
            const bk = cone(0.08, 0.22, 4, "#f77f00", 0.62, 0.48, 0, d); bk.rotation.z = -Math.PI / 2;
            box(0.2, 0.15, 0.3, c, -0.5, 0.3, 0, d);
            const r = rr(3, 7), sp = rr(0.15, 0.3) * (i % 2 ? 1 : -1), ph = i * 1.3;
            anims.push((t) => {
              const a = t * sp + ph; d.position.set(POND.x + Math.cos(a) * r, WATER_Y + Math.sin(t * 2 + ph) * 0.05, POND.z + Math.sin(a) * r);
              d.rotation.y = -a - (sp > 0 ? Math.PI / 2 : -Math.PI / 2); d.rotation.z = Math.sin(t * 2 + ph) * 0.06;
            });
          }
          const cloudMat = (scene.userData.cloudMat = new THREE.MeshLambertMaterial({ color: "#ffffff", emissive: "#ffffff", emissiveIntensity: 0.35 }));
          const clouds = [];
          for (let i = 0; i < 14; i++) {
            const c = new THREE.Group(); c.position.set(rr(-170, 170), rr(42, 62), rr(-150, 150)); scene.add(c);
            const k = 3 + Math.floor(rnd() * 3);
            for (let j = 0; j < k; j++) { const p = new THREE.Mesh(new THREE.IcosahedronGeometry(rr(3, 6), 0), cloudMat); p.position.set(j * 4 - k * 2, rr(-1, 1.5), rr(-2, 2)); c.add(p); }
            c.userData.sp = rr(1, 2.5); clouds.push(c);
          }
          anims.push((t, dt) => clouds.forEach((c) => { c.position.x += c.userData.sp * dt; if (c.position.x > 180) c.position.x = -180; }));
        }

        // ---------- day/night cycle: one day = 8 real minutes, from morning ----------
        const DAY_SEC = 480;
        const updateDay = (() => {
          const C = (h) => new THREE.Color(h);
          // morning warm peach, noon bright, evening orange-pink, night deep blue (hemisphere never under 0.55)
          const K = [
            { name: "morning", sun: C("#ffd2a8"), si: 0.8, off: new THREE.Vector3(55, 38, 40), hs: C("#ffe2cc"), hg: C("#8a7458"), hi: 0.72, sky: C("#ffd8c0"), glow: 0, night: 0, cloud: 0.33 },
            { name: "noon", sun: C("#fff4e0"), si: 0.95, off: new THREE.Vector3(22, 72, 18), hs: C("#d6ecff"), hg: C("#8a7b52"), hi: 0.78, sky: C("#ffffff"), glow: 0, night: 0, cloud: 0.35 },
            { name: "evening", sun: C("#ff9e6e"), si: 0.7, off: new THREE.Vector3(-55, 34, 30), hs: C("#ffbfa8"), hg: C("#6e5466"), hi: 0.64, sky: C("#ff9f8c"), glow: 0.8, night: 0.2, cloud: 0.2 },
            { name: "night", sun: C("#a3b6ff"), si: 0.42, off: new THREE.Vector3(-28, 62, -34), hs: C("#8294dc"), hg: C("#3a4060"), hi: 0.56, sky: C("#3f4f8f"), glow: 1, night: 1, cloud: 0.06 },
          ];
          const HOR = C("#d4ecff"), skyTint = new THREE.Color(), fogC = new THREE.Color();
          const skyMat = scene.userData.skyMat, cloudMat = scene.userData.cloudMat, lampMat = scene.userData.lampMat, lamps = scene.userData.lamps || [];
          const lampBase = C("#fff2b3");
          // window glass: houses share one material, the post office has its own
          const wins = [hmat("#8fc9e6", 0.35), M("#9ad7ff")].map((m) => ({ m, base: m.color.clone() }));
          const WARM = C("#ffd89a");
          wins.forEach((w) => { w.m.emissive = C("#ffae45"); w.m.emissiveIntensity = 0; });
          // a few warm point lights at the lamps nearest the player; none on touch devices (emissive only)
          const pls = [];
          if (!matchMedia("(pointer: coarse)").matches) for (let i = 0; i < 2; i++) { const p = new THREE.PointLight(0xffc77a, 0, 16, 2); p.position.set(0, -50, 0); scene.add(p); pls.push(p); }
          // stars
          const fr = Math.random; // not the seeded rnd, so the village layout stays the same
          const N = 260, sp = new Float32Array(N * 3);
          for (let i = 0; i < N; i++) {
            const a = fr() * 6.283, y = 0.12 + fr() * 0.88, r = Math.sqrt(1 - y * y);
            sp.set([Math.cos(a) * r * 400, y * 400, Math.sin(a) * r * 400], i * 3);
          }
          const sg = new THREE.BufferGeometry(); sg.setAttribute("position", new THREE.BufferAttribute(sp, 3));
          const starMat = new THREE.PointsMaterial({ color: "#fffbe8", size: 2.2, sizeAttenuation: false, transparent: true, opacity: 0, fog: false, depthWrite: false });
          const stars = new THREE.Points(sg, starMat); stars.visible = false; stars.frustumCulled = false; scene.add(stars);
          // fireflies by the pond and the river
          const fc = document.createElement("canvas"); fc.width = fc.height = 32;
          const fx = fc.getContext("2d"), gr = fx.createRadialGradient(16, 16, 0, 16, 16, 16);
          gr.addColorStop(0, "rgba(255,255,220,1)"); gr.addColorStop(0.3, "rgba(230,255,140,0.8)"); gr.addColorStop(1, "rgba(200,255,100,0)");
          fx.fillStyle = gr; fx.fillRect(0, 0, 32, 32);
          const flyMat = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(fc), transparent: true, opacity: 0, depthWrite: false, fog: false, blending: THREE.AdditiveBlending });
          const flies = [], flyG = new THREE.Group(); flyG.visible = false; scene.add(flyG);
          for (let i = 0; i < 16; i++) {
            let x, z;
            if (i < 10) { const a = (i / 10) * 6.283 + fr(), r = POND.r * (0.6 + fr() * 0.6); x = POND.x + Math.cos(a) * r; z = POND.z + Math.sin(a) * r; }
            else { z = -30 + (i - 10) * 12 + fr() * 4; x = riverX(z) + (fr() - 0.5) * 10; }
            const s = new THREE.Sprite(flyMat); s.userData = { x, z, y: Math.max(H(x, z), WATER_Y) + 0.5 + fr() * 1.1, ph: fr() * 6.283 };
            flyG.add(s); flies.push(s);
          }
          // HUD clock
          const clk = document.getElementById("dayclock"), clkFg = document.getElementById("dayclock-fg"), clkIco = document.getElementById("dayclock-ico");
          const NAMES = { morning: ["Sabah", "Morning"], noon: ["Öğle", "Noon"], evening: ["Akşam", "Evening"], night: ["Gece", "Night"] };
          let shownPct = -1, shownKey = "", pre = "";
          const sm = (x) => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
          const ls = (a, b, k) => a + (b - a) * k;
          return (dt, t, ppos) => {
            if (window.__started) DN.sec += dt;
            const dayT = (DN.sec / DAY_SEC) % 1, q = dayT * 4, i = Math.floor(q) % 4, A = K[i], B = K[(i + 1) % 4], w = sm((q - Math.floor(q) - 0.55) / 0.45);
            DN.t = window.dayT = dayT; DN.phase = A.name;
            DN.glow = ls(A.glow, B.glow, w); DN.night = ls(A.night, B.night, w);
            sun.color.copy(A.sun).lerp(B.sun, w); sun.intensity = ls(A.si, B.si, w);
            DN.sunOff.copy(A.off).lerp(B.off, w);
            hemi.color.copy(A.hs).lerp(B.hs, w); hemi.groundColor.copy(A.hg).lerp(B.hg, w); hemi.intensity = Math.max(0.45, ls(A.hi, B.hi, w));
            skyTint.copy(A.sky).lerp(B.sky, w); skyMat.color.copy(skyTint);
            fogC.copy(HOR).multiply(skyTint); scene.fog.color.copy(fogC); scene.background = fogC;
            if (cloudMat) { cloudMat.emissiveIntensity = ls(A.cloud, B.cloud, w); cloudMat.color.setScalar(1).lerp(skyTint, 0.35); }
            const g = DN.glow, n = DN.night;
            lampMat.color.copy(lampBase).multiplyScalar(0.7 + 1.3 * g);
            wins.forEach((o) => { o.m.color.copy(o.base).lerp(WARM, g * 0.7); o.m.emissiveIntensity = g * 0.9; });
            if (pls.length && lamps.length) {
              const near = lamps.slice().sort((a, b) => a.distanceToSquared(ppos) - b.distanceToSquared(ppos));
              pls.forEach((p, k) => { p.position.copy(near[k] || near[0]); p.position.y -= 0.5; p.intensity = g * 1.1; });
            }
            stars.visible = n > 0.02; starMat.opacity = Math.min(1, n * 1.1);
            const fly = sm((n - 0.4) / 0.6);
            flyG.visible = fly > 0.01;
            if (flyG.visible) {
              flyMat.opacity = fly;
              flies.forEach((s) => { const u = s.userData, f = t * 0.6 + u.ph; s.position.set(u.x + Math.sin(f) * 1.2, u.y + Math.sin(f * 1.7) * 0.35, u.z + Math.cos(f * 0.8) * 1.2); s.scale.setScalar(0.18 + 0.2 * Math.max(0, Math.sin(t * 3 + u.ph * 2))); });
            }
            // music: evening theme at evening and night, village theme by day (crossfades in SND.music)
            const track = A.name === "evening" || A.name === "night" ? "music_evening" : "music_village";
            if (window.__started && window.SND) {
              if (track !== DN.track) { DN.track = track; window.SND.music(track); }
              const nx = i === 1 && q - i > 0.6 ? "music_evening" : i === 3 && q - i > 0.6 ? "music_village" : "";
              if (nx && nx !== pre) { pre = nx; if (window.SND.prefetch) window.SND.prefetch(nx); }
            }
            // HUD clock: icon for day or night, arc for the day's progress
            if (clk) {
              const pct = Math.round(dayT * 100), key = DN.phase + (window.__lang === "en" ? 1 : 0);
              if (pct !== shownPct) { shownPct = pct; clkFg.style.strokeDashoffset = String(100 - pct); }
              if (key !== shownKey) {
                shownKey = key;
                const dark = DN.phase === "evening" || DN.phase === "night";
                clkIco.innerHTML = window.xSvg(dark ? "moon" : "sun");
                clk.classList.toggle("is-night", dark);
                clk.setAttribute("aria-label", NAMES[DN.phase][window.__lang === "en" ? 1 : 0]);
                clk.title = clk.getAttribute("aria-label");
              }
            }
          };
        })();

        // ---------- people ----------
        // shared chibi builder: toon shading (3-step ramp) + inverted-hull outline
        const toonRamp = (() => {
          const t = new THREE.DataTexture(new Uint8Array([90, 175, 255]), 3, 1, THREE.RedFormat);
          t.minFilter = t.magFilter = THREE.NearestFilter; t.generateMipmaps = false; t.needsUpdate = true; return t;
        })();
        const TM = {}, toon = (c) => TM[c] || (TM[c] = new THREE.MeshToonMaterial({ color: c, gradientMap: toonRamp }));
        const outlineMat = new THREE.MeshBasicMaterial({ color: "#4a2f22", side: THREE.BackSide });
        const blushMat = new THREE.MeshBasicMaterial({ color: "#ff9fb2", transparent: true, opacity: 0.7, depthWrite: false });
        const glintMat = new THREE.MeshBasicMaterial({ color: "#ffffff" });
        const CG = {
          sphere: new THREE.SphereGeometry(1, 20, 14),
          small: new THREE.SphereGeometry(1, 10, 8),
          head: new THREE.SphereGeometry(0.5, 28, 20),
          torso: (() => {
            const pts = [], rb = 0.43, rt = 0.34, h = 1.02, N = 10;
            for (let k = 0; k <= N; k++) { const a = -Math.PI / 2 + (k / N) * (Math.PI / 2); pts.push(new THREE.Vector2(Math.max(0.001, rb * Math.cos(a)), rb + rb * Math.sin(a) - h / 2)); }
            for (let k = 0; k <= N; k++) { const a = (k / N) * (Math.PI / 2); pts.push(new THREE.Vector2(Math.max(0.001, rt * Math.cos(a)), h / 2 - rt + rt * Math.sin(a))); }
            return new THREE.LatheGeometry(pts, 24);
          })(),
          limb: new THREE.CapsuleGeometry(1, 1, 4, 10),
          cap: new THREE.SphereGeometry(0.535, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.42),
          smile: new THREE.TorusGeometry(0.075, 0.016, 6, 14, Math.PI),
          blush: new THREE.CircleGeometry(0.075, 16),
        };
        function tpart(geo, c, parent, x, y, z, sx = 1, sy = sx, sz = sx, outline = false) {
          const m = new THREE.Mesh(geo, typeof c === "string" ? toon(c) : c);
          m.position.set(x, y, z); m.scale.set(sx, sy, sz); m.castShadow = true; parent.add(m);
          if (outline) { const o = new THREE.Mesh(geo, outlineMat); o.scale.setScalar(1.04); m.add(o); }
          return m;
        }
        function makePerson(o) {
          const g = new THREE.Group(), body = new THREE.Group(); g.add(body);
          if (o.slim) return makeSlim(o, g, body);
          // legs: short rounded stubs with bean feet
          const mkLeg = (s) => {
            const p = new THREE.Group(); p.position.set(s * 0.17, 0.44, 0); body.add(p);
            tpart(CG.limb, o.pants, p, 0, -0.17, 0, 0.13, 0.12, 0.13);
            tpart(CG.sphere, "#6b4a3a", p, 0, -0.36, 0.05, 0.15, 0.1, 0.19);
            return p;
          };
          const legL = mkLeg(-1), legR = mkLeg(1);
          // pill body
          tpart(CG.torso, o.shirt, body, 0, 0.83, 0, 1, 1, 1, true);
          // arms with mitten hands
          const mkArm = (s) => {
            const p = new THREE.Group(); p.position.set(s * 0.37, 1.12, 0); p.rotation.z = s * 0.28; body.add(p);
            tpart(CG.limb, o.shirt, p, 0, -0.17, 0, 0.095, 0.16, 0.095);
            tpart(CG.sphere, o.skin, p, 0, -0.38, 0, 0.12, 0.12, 0.11);
            return p;
          };
          const armL = mkArm(-1), armR = mkArm(1);
          // big round head sitting right on the body (no neck)
          const head = new THREE.Group(); head.position.set(0, 1.74, 0); body.add(head);
          tpart(CG.head, o.skin, head, 0, 0, 0, 1.04, 0.96, 1, true);
          for (const s of [-1, 1]) {
            const eye = tpart(CG.sphere, "#1b1410", head, s * 0.165, 0.03, 0.43, 0.075, 0.09, 0.06);
            eye.castShadow = false;
            const gl = new THREE.Mesh(CG.small, glintMat); gl.scale.setScalar(0.024); gl.position.set(s * 0.165 + 0.025, 0.065, 0.485); head.add(gl);
            const gl2 = new THREE.Mesh(CG.small, glintMat); gl2.scale.setScalar(0.011); gl2.position.set(s * 0.165 - 0.02, 0.0, 0.488); head.add(gl2);
            const bl = new THREE.Mesh(CG.blush, blushMat); bl.position.set(s * 0.29, -0.08, 0.405);
            bl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), bl.position.clone().normalize()); head.add(bl);
          }
          tpart(CG.sphere, o.skin, head, 0, -0.05, 0.5, 0.055, 0.045, 0.045).castShadow = false;
          const smile = new THREE.Mesh(CG.smile, toon("#7a3b2e")); smile.position.set(0, -0.15, 0.47); smile.rotation.set(0.3, 0, Math.PI); head.add(smile);
          // hair / hats
          const st = o.style || "cap";
          if (o.hair && st !== "hat") { const c = tpart(CG.cap, o.hair, head, 0, 0.02, -0.03); c.rotation.x = -0.32; }
          if (st === "bun") tpart(CG.sphere, o.hair, head, 0, 0.5, -0.12, 0.17);
          if (st === "buns") for (const s of [-1, 1]) tpart(CG.sphere, o.hair, head, s * 0.42, 0.3, -0.08, 0.15);
          if (st === "tail") tpart(CG.sphere, o.hair, head, 0, 0.12, -0.52, 0.15, 0.2, 0.15);
          if (st === "hat") {
            tpart(CG.cap, o.hat, head, 0, 0.04, 0, 1.0, 1.05, 1.0);
            tpart(CG.sphere, o.hat, head, 0, 0.17, 0, 0.72, 0.05, 0.72);
            tpart(CG.sphere, o.band || "#ffffff", head, 0, 0.22, 0, 0.47, 0.07, 0.47);
          }
          return { g, body, head, legL, legR, armL, armR, phase: 0, t: Math.random() * 6 };
        }
        // slim figure for the player's fallback: narrow torso, long thin limbs, a neck and a small head (about 2.3 tall)
        function makeSlim(o, g, body) {
          const mkLeg = (s) => {
            const p = new THREE.Group(); p.position.set(s * 0.1, 0.88, 0); body.add(p);
            tpart(CG.limb, o.pants, p, 0, -0.4, 0, 0.068, 0.25, 0.068);
            tpart(CG.sphere, "#6b4a3a", p, 0, -0.83, 0.05, 0.075, 0.05, 0.14);
            return p;
          };
          const legL = mkLeg(-1), legR = mkLeg(1);
          tpart(CG.torso, o.shirt, body, 0, 1.23, 0, 0.5, 0.74, 0.42, true);
          const mkArm = (s) => {
            const p = new THREE.Group(); p.position.set(s * 0.24, 1.54, 0); p.rotation.z = s * 0.1; body.add(p);
            tpart(CG.limb, o.shirt, p, 0, -0.33, 0, 0.052, 0.21, 0.052);
            tpart(CG.sphere, o.skin, p, 0, -0.68, 0, 0.065, 0.075, 0.06);
            return p;
          };
          const armL = mkArm(-1), armR = mkArm(1);
          tpart(CG.limb, o.skin, body, 0, 1.66, 0, 0.06, 0.04, 0.06);
          const head = new THREE.Group(); head.position.set(0, 1.92, 0); head.scale.setScalar(0.56); body.add(head);
          tpart(CG.head, o.skin, head, 0, 0, 0, 0.92, 1.04, 0.95, true);
          for (const s of [-1, 1]) tpart(CG.sphere, "#1b1410", head, s * 0.15, 0.04, 0.42, 0.055, 0.075, 0.05).castShadow = false;
          tpart(CG.sphere, o.skin, head, 0, -0.04, 0.47, 0.05, 0.05, 0.05).castShadow = false;
          const smile = new THREE.Mesh(CG.smile, toon("#7a3b2e")); smile.position.set(0, -0.17, 0.43); smile.rotation.set(0.3, 0, Math.PI); head.add(smile);
          if (o.hair) { const c = tpart(CG.cap, o.hair, head, 0, 0.02, -0.03); c.rotation.x = -0.32; }
          return { g, body, head, legL, legR, armL, armR, phase: 0, t: Math.random() * 6 };
        }
        function animatePerson(p, speed, dt) {
          p.t += dt;
          if (speed > 0.05) p.phase += dt * (4 + speed * 1.2);
          else p.phase = lerp(p.phase, Math.round(p.phase / Math.PI) * Math.PI, Math.min(1, dt * 8));
          const w = Math.min(1, speed / 3), amp = Math.min(1, speed / 5) * 0.6 + (speed > 0.05 ? 0.15 : 0), s = Math.sin(p.phase) * amp;
          p.legL.rotation.x = s; p.legR.rotation.x = -s; p.armL.rotation.x = -s * 0.45; p.armR.rotation.x = s * 0.45;
          // whole-body bounce + squash/stretch; idle breathing. Head never moves relative to body.
          p.body.position.y = Math.abs(Math.sin(p.phase)) * 0.12 * w;
          const q = -Math.cos(p.phase * 2) * 0.045 * w, br = Math.sin(p.t * 2.1) * 0.018 * (1 - w);
          p.body.scale.set(1 - q * 0.5 + br * 0.5, 1 + q + br, 1 - q * 0.5 + br * 0.5);
        }

        // villagers walk door -> square -> door
        const villagers = [];
        let VSEATS = []; // the six square seats, shared by walkers and scheduled owners (seat.v = occupant)
        {
          const west = HOUSES.filter((h) => h.x < riverX(h.z) - 4);
          const skins = ["#ffe0c7", "#f6c9a0", "#e8b48a", "#d39a6e", "#b07a55"];
          const shirts = ["#a8e6cf", "#ffc8a2", "#cdb4db", "#fff1a8", "#a2d2ff", "#f4acb7"];
          const styles = ["bun", "hat", "buns", "cap", "tail", "hat"];
          const hats = ["#f4acb7", "#fff1a8", "#a8e6cf"];
          const pants = ["#8fb8de", "#b8a1d9", "#8ccfb7", "#e3a99f", "#c9b79c"], hairs = ["#5a3e2b", "#8a5a3c", "#e8ddd0", "#3d2c24", "#c47a4a"];
          for (let i = 0; i < 6; i++) {
            const cols = { shirt: shirts[i], pants: pick(pants), hair: pick(hairs) };
            const p = makePerson({ shirt: cols.shirt, pants: cols.pants, skin: pick(skins), hair: cols.hair, style: styles[i], hat: hats[i % 3], band: shirts[(i + 2) % 6] });
            scene.add(p.g);
            const home = west[(i * 2) % west.length];
            p.g.position.set(home.door2.x, 0, home.door2.z);
            const v = { p, cols, house: home, route: [], wait: rr(0, 3), speed: rr(2.4, 3.2) };
            villagers.push(v);
          }
          // square benches: seat top 0.625 (0.47 native), so slim villagers can Sit; origin 0.4 in front of the seat centre, facing out (+Z local)
          const SEATS = [];
          for (const [x, z, r] of [[-9, 6, 0.9], [-7, -8, -0.8], [8, -7, 0.8]])
            for (const sx of [-0.5, 0.5]) {
              const w = (lx, lz) => [x + lx * Math.cos(r) + lz * Math.sin(r), z - lx * Math.sin(r) + lz * Math.cos(r)];
              const [px, pz] = w(sx, 0.4), [fx, fz] = w(sx, 1.5);
              SEATS.push({ x: px, z: pz, fx, fz, r, v: null });
            }
          VSEATS = SEATS;
          const ring = (h) => { const a = Math.atan2(h.door2.z, h.door2.x); return [Math.cos(a) * 13.5, Math.sin(a) * 13.5]; };
          function plan(v) {
            const g = v.p.g, a0 = Math.atan2(g.position.z, g.position.x), route = v.fromSeat ? [] : [ring(v.house)];
            const arc = (a1) => { let da = a1 - a0; while (da > Math.PI) da -= 6.283; while (da < -Math.PI) da += 6.283; for (let k = 1; k <= 4; k++) { const a = a0 + (da * k) / 5; route.push([Math.cos(a) * 7, Math.sin(a) * 7]); } };
            const free = SEATS.filter((s) => !s.v), seat = v.kk && v.kk.canSit && !v.fromSeat && free.length && rnd() < 0.4 ? pick(free) : null;
            if (seat) { arc(Math.atan2(seat.z, seat.x)); route.push([seat.fx, seat.fz], [seat.x, seat.z]); seat.v = v; v.seatAt = seat; }
            else {
              const next = pick(west.filter((h) => h !== v.house));
              arc(Math.atan2(next.door2.z, next.door2.x)); route.push(ring(next), [next.door2.x, next.door2.z]); v.house = next;
            }
            v.fromSeat = false; v.route = route;
          }
          const turnTo = (g, x, z, k) => { let a = Math.atan2(x - g.position.x, z - g.position.z) - g.rotation.y; while (a > Math.PI) a -= 6.283; while (a < -Math.PI) a += 6.283; g.rotation.y += a * k; };
          const turnAng = (g, r, k) => { let a = r - g.rotation.y; while (a > Math.PI) a -= 6.283; while (a < -Math.PI) a += 6.283; g.rotation.y += a * k; };
          const seated = (v) => v.pose === "Sit" || v.pose === "Up";
          anims.push((t, dt) => villagers.forEach((v) => {
            const g = v.p.g, k = v.kk, pd = Math.hypot(player.pos.x - g.position.x, player.pos.z - g.position.z);
            let sp = 0;
            if (pd > 8) v.waved = false;
            if (v.talkT > 0) {
              // talking: stand still and face the postman
              v.talkT -= dt;
              if (!seated(v)) turnTo(g, player.pos.x, player.pos.z, Math.min(1, dt * 6));
            } else if (v.wait > 0) {
              v.wait -= dt;
              if (v.pose === "Turn") {
                turnAng(g, v.seatAt.r, Math.min(1, dt * 9));
                if (v.wait <= 0) { g.rotation.y = v.seatAt.r; v.pose = "Sit"; k.once("SitDown", "Sit", true); v.wait = rr(8, 14); }
              } else if (v.wait <= 0) {
                if (v.pose === "Sit") { v.pose = "Up"; k.once("StandUp", "Idle", true); v.wait = 1.1; }
                else { if (v.pose === "Up" && v.seatAt) { v.seatAt.v = null; v.seatAt = null; v.fromSeat = true; } v.pose = "Idle"; plan(v); }
              } else if (pd < 4 && !seated(v)) {
                turnTo(g, player.pos.x, player.pos.z, Math.min(1, dt * 5));
                if (k && !v.waved) { v.waved = true; k.once("Wave"); }
              }
            } else {
              const [tx, tz] = v.route[0], dx = tx - g.position.x, dz = tz - g.position.z, d = Math.hypot(dx, dz);
              if (d < 0.4) {
                v.route.shift();
                if (!v.route.length) {
                  if (v.seatAt && k) { g.position.x = v.seatAt.x; g.position.z = v.seatAt.z; v.pose = "Turn"; v.wait = 0.45; }
                  else { if (v.seatAt) { v.seatAt.v = null; v.seatAt = null; v.fromSeat = true; } v.pose = "Idle"; v.wait = rr(2, 6); }
                }
              } else {
                const ox = g.position.x, oz = g.position.z;
                const [nx, nz] = waterSlide(ox, oz, ox + (dx / d) * v.speed * dt, oz + (dz / d) * v.speed * dt);
                if (nx === ox && nz === oz) {
                  // fully blocked by water: drop this waypoint, or turn back home if none left
                  v.route.shift();
                  if (!v.route.length) v.route = [ring(v.house)];
                } else { g.position.x = nx; g.position.z = nz; }
                turnTo(g, tx, tz, Math.min(1, dt * 6));
              }
              sp = v.wait > 0 ? 0 : v.speed;
            }
            g.position.y = groundY(g.position.x, g.position.z);
            // distance LOD: hidden beyond 80, shadows within 40, mixer every 3rd frame beyond 45
            g.visible = pd < 80;
            const sh = pd < 40; if (sh !== v.sh) { v.sh = sh; (k ? k.hold : g).traverse((o) => { if (o.isMesh) o.castShadow = sh; }); }
            if (!g.visible) { v.acc = 0; return; }
            if (!k) { animatePerson(v.p, sp, dt); return; }
            // Walk timeScale matched to ground speed so feet don't slide; Sit is driven by SitDown/StandUp
            if (sp > 0) k.set("Walk", sp / k.ref);
            else if (!seated(v)) k.set("Idle", 1);
            v.acc = (v.acc || 0) + dt; v.fc = (v.fc || 0) + 1;
            if (pd <= 45 || v.fc % 3 === 0) { k.mixer.update(v.acc); v.acc = 0; }
          }));
        }

        // ---------- player (postman) ----------
        const pm = makePerson({ shirt: "#8ec5ff", pants: "#5b8fd9", skin: "#f6c9a0", hair: "#5a3e2b", style: "cap", slim: true });
        {
          // soft rounded blue postal cap with a bill and badge
          tpart(CG.cap, "#4f86e0", pm.head, 0, 0.07, 0, 1.0, 1.0, 1.0);
          tpart(CG.sphere, "#4f86e0", pm.head, 0, 0.22, 0, 0.5, 0.11, 0.5);
          const bill = tpart(CG.sphere, "#3a6cc4", pm.head, 0, 0.2, 0.4, 0.27, 0.045, 0.2); bill.rotation.x = 0.25;
          tpart(CG.sphere, "#ffd166", pm.head, 0, 0.33, 0.4, 0.05, 0.05, 0.03);
          // cross-body strap and brown rounded bag
          const sg = new THREE.Group(); sg.position.set(0, 1.25, 0); sg.rotation.z = -0.7; pm.body.add(sg);
          const strap = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.035, 8, 32), toon("#7a4b2a")); strap.rotation.x = Math.PI / 2; strap.scale.set(0.58, 0.5, 0.5); sg.add(strap);
          // bag hangs from a pivot at the strap so it can swing
          const bg = (pm.bagG = new THREE.Group()); bg.position.set(0.3, 1.18, 0.02); pm.body.add(bg);
          tpart(CG.sphere, "#a86b3c", bg, 0, -0.24, 0, 0.07, 0.15, 0.19, true);
          tpart(CG.sphere, "#8a5530", bg, 0.03, -0.17, 0, 0.055, 0.09, 0.18);
          tpart(CG.sphere, "#ffd166", bg, 0.075, -0.18, 0, 0.018, 0.03, 0.035);
          tpart(CG.sphere, "#ffd166", pm.body, -0.11, 1.42, 0.2, 0.04, 0.03, 0.018);
        }
        // inner pivot for lean/squash; the root keeps position + heading only
        pm.pivot = new THREE.Group(); pm.g.remove(pm.body); pm.pivot.add(pm.body); pm.g.add(pm.pivot);
        scene.add(pm.g);
        const bagAnchor = new THREE.Object3D(); bagAnchor.position.set(0, -0.24, 0); pm.bagG.add(bagAnchor);
        const player = { group: pm.g, model: pm, pos: pm.g.position, heading: 0, speed: 0, radius: 0.5, bag: bagAnchor, kk: null, act() {} };
        player.pos.set(0, 0, -8.5);

        const loadBar = document.getElementById("load-bar");
        // postman animation: exact clip names, crossFadeTo 0.18 s, speed-matched timeScale, one-shots lock locomotion until they finish
        function pmAnim(m, clips, letter) {
          const mixer = new THREE.AnimationMixer(m), A = {};
          clips.forEach((c) => (A[c.name] = mixer.clipAction(c)));
          // stride refs in world units/s at timeScale 1 (model scaled 2.4/1.8); tune here if feet slide
          const LOCO = ["Walk", "Run", "Sprint"], REF = { Walk: 3.2 * (2.4 / 1.8), Run: 8, Sprint: 10.5 }, VAR = ["Wave", "Yes"];
          let cur = null, lock = false, gait = 0, fastT = 0, idleT = 0, riding = false;
          const play = (nm, once) => {
            const a = A[nm]; if (!a || (a === cur && !once)) return;
            const ph = cur && LOCO.includes(cur.getClip().name) && LOCO.includes(nm) ? cur.time / cur.getClip().duration : 0;
            a.reset(); a.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, Infinity); a.clampWhenFinished = !!once;
            a.time = ph * a.getClip().duration; a.timeScale = 1; // keep the stride phase between gaits
            a.setEffectiveWeight(1).play();
            if (cur && cur !== a) cur.crossFadeTo(a, 0.18, false);
            cur = a; lock = !!once; letter.visible = nm === "Interact";
          };
          mixer.addEventListener("finished", (e) => { if (e.action === cur) { lock = false; letter.visible = false; } });
          play("Idle");
          return {
            mixer,
            act: (nm) => { if (!riding) play(nm, true); },
            // current locomotion clip and its 0..1 phase, for footstep sounds
            gait: () => (cur && !riding ? { n: cur.getClip().name, p: (cur.time / cur.getClip().duration) % 1 } : null),
            // on the scooter: ScooterKick driven by the kick phase, ScooterRide while coasting, frozen when stopped
            ride(on) { riding = on; lock = false; play(on ? "ScooterRide" : "Idle"); idleT = 0; },
            update(dt, sp, free, maxSp, rs) {
              if (riding) {
                const nm = rs && rs.kick ? "ScooterKick" : "ScooterRide", a = A[nm];
                if (a) {
                  play(nm);
                  if (nm === "ScooterKick") { a.timeScale = 0; a.time = rs.kp * a.getClip().duration; }
                  else a.timeScale = sp > 0.3 ? 1 : 0;
                }
                mixer.update(dt); return;
              }
              if (lock && free && sp > 1.5) lock = false;
              if (!lock) {
                // run past ~0.65 of top speed; sprint after 1.2 s held near top speed
                fastT = sp > maxSp * 0.95 ? fastT + dt : sp > maxSp * 0.85 ? fastT : 0;
                gait = fastT > 1.2 ? 2 : sp > maxSp * (gait ? 0.62 : 0.68) ? 1 : 0;
                const nm = sp > 0.35 ? LOCO[gait] : "Idle";
                play(nm);
                cur.timeScale = nm === "Idle" ? 1 : Math.max(0.45, Math.min(1.6, sp / REF[nm]));
                // idle life: after 6 s still, now and then Wave or Yes, then back to Idle
                idleT = nm === "Idle" && free ? idleT + dt : 0;
                if (idleT > 6 && Math.random() < dt * 0.3) { play(VAR[(Math.random() * VAR.length) | 0], true); idleT = 0; }
              }
              mixer.update(dt);
            },
          };
        }
        // fallback postman: procedural walk, arms/legs ±35°, stride matched to speed, body bob
        function animatePostmanFallback(p, speed, dt) {
          p.t += dt;
          if (speed > 0.05) p.phase += dt * speed * 2.1;
          else p.phase = lerp(p.phase, Math.round(p.phase / Math.PI) * Math.PI, Math.min(1, dt * 10));
          const w = Math.min(1, speed / 2.5), s = Math.sin(p.phase) * 0.61 * w;
          p.legL.rotation.x = s; p.legR.rotation.x = -s; p.armL.rotation.x = -s; p.armR.rotation.x = s;
          p.body.position.y = Math.abs(Math.sin(p.phase)) * 0.13 * w;
          p.head.rotation.z = Math.sin(p.phase) * 0.05 * w;
          const q = -Math.cos(p.phase * 2) * 0.04 * w, br = Math.sin(p.t * 2.1) * 0.018 * (1 - w);
          p.body.scale.set(1 - q * 0.5 + br * 0.5, 1 + q + br, 1 - q * 0.5 + br * 0.5);
        }
        // fallback rider: standing on the deck, right leg swinging with each kick, hands on the bar
        function animateRiderFallback(p, dt, rs) {
          p.t += dt;
          p.legL.rotation.x = 0; p.legR.rotation.x = rs.kick ? Math.sin(rs.kp * 6.283) * 0.6 : 0;
          p.armL.rotation.x = -1.0; p.armR.rotation.x = -1.0;
          p.body.position.y = 0; p.head.rotation.z = 0; p.body.scale.set(1, 1, 1);
        }
        // player from postman.glb (Y-up, faces +Z, feet at origin): toon materials keeping maps, scaled to 2.4 tall
        function pmPlayer(gltf) {
          const m = gltf.scene, hold = new THREE.Group();
          // cosmetics: the materials the shop recolours, each as [material, shade]
          const cos = { shirt: [], cap: [], bag: [] };
          m.traverse((k) => {
            if (!k.isMesh) return;
            const o = k.material;
            k.material = new THREE.MeshToonMaterial({ name: o.name, color: o.color, map: o.map, normalMap: o.normalMap, gradientMap: toonRamp, transparent: o.transparent, alphaTest: o.alphaTest });
            if (o.name === "M_Shirt") cos.shirt.push([k.material, 1]);
            else if (o.name === "M_Sleeves") cos.shirt.push([k.material, 0.92]);
            o.dispose(); k.castShadow = true; k.frustumCulled = false;
          });
          const own = (c, cat, shade) => { const mt = toon(c).clone(); cos[cat].push([mt, shade]); return mt; };
          hold.add(m);
          const boxOf = (o) => { hold.updateMatrixWorld(true); return new THREE.Box3().setFromObject(o || m); };
          let b = boxOf(), h = b.max.y - b.min.y;
          m.scale.setScalar(2.4 / (h > 0.5 && h < 5 ? h : 1.8)); b = boxOf(); m.position.y = -b.min.y;
          const u = m.scale.x, bone = (n) => m.getObjectByName(n), wp = (o) => (hold.updateMatrixWorld(true), o.getWorldPosition(new THREE.Vector3()));
          const hm = bone("HeadMesh"), hb = hm ? boxOf(hm) : new THREE.Box3(new THREE.Vector3(-0.16, 1.47, -0.13).multiplyScalar(u), new THREE.Vector3(0.16, 1.81, 0.12).multiplyScalar(u));
          const hair = bone("Hair"), top = Math.max(hb.max.y, hair ? boxOf(hair).max.y : 0), hc = hb.getCenter(new THREE.Vector3()), hs = hb.getSize(new THREE.Vector3());
          // postal cap on the head top: blue flared crown, yellow band, visor, gold envelope badge
          const r = Math.min(hs.x, hs.z) * 0.54, cap = new THREE.Group(); cap.position.set(hc.x, top - r * 0.55, hc.z); hold.add(cap);
          tpart(new THREE.CylinderGeometry(r * 1.12, r, r * 0.75, 24), own("#3f6fc4", "cap", 1), cap, 0, r * 0.375, 0, 1, 1, 1, true);
          tpart(new THREE.CylinderGeometry(r * 1.02, r * 1.01, r * 0.16, 24), "#f3c74b", cap, 0, r * 0.09, 0);
          tpart(new THREE.CylinderGeometry(r, r, r * 0.07, 20, 1, false, -Math.PI / 2, Math.PI), own("#2b4f94", "cap", 0.68), cap, 0, r * 0.02, r * 0.5, 1, 1, 0.9).rotation.x = 0.15;
          const bd = new THREE.Group(); bd.position.set(0, r * 0.42, r * 1.07); bd.rotation.x = -0.12; cap.add(bd);
          tpart(new THREE.CylinderGeometry(r * 0.2, r * 0.2, r * 0.06, 16).rotateX(Math.PI / 2), "#d9a520", bd, 0, 0, 0);
          tpart(new THREE.BoxGeometry(r * 0.24, r * 0.16, r * 0.02), "#fff8ec", bd, 0, 0, r * 0.035);
          tpart(new THREE.ShapeGeometry(new THREE.Shape([new THREE.Vector2(-r * 0.12, r * 0.08), new THREE.Vector2(0, -r * 0.01), new THREE.Vector2(r * 0.12, r * 0.08)])), "#9a6a3f", bd, 0, 0, r * 0.047);
          // brown leather satchel on his left hip (+X), with flap, brass buckle and two envelopes peeking out
          const sat = new THREE.Group(); sat.position.set(0.25 * u, 0.86 * u, 0); hold.add(sat);
          const sw = 0.08 * u, sh = 0.2 * u, sd = 0.26 * u;
          tpart(new THREE.BoxGeometry(sw, sh, sd), own("#9a6a3f", "bag", 1), sat, 0, 0, 0, 1, 1, 1, true);
          tpart(new THREE.BoxGeometry(sw * 1.15, sh * 0.45, sd * 1.04), own("#86572f", "bag", 0.86), sat, sw * 0.06, sh * 0.3, 0);
          tpart(new THREE.BoxGeometry(sw * 0.3, sh * 0.16, sd * 0.16), "#d9a520", sat, sw * 0.62, sh * 0.1, 0);
          tpart(new THREE.BoxGeometry(sw * 0.12, sh * 0.4, sd * 0.36), "#fff8ec", sat, -sw * 0.12, sh * 0.56, -sd * 0.14).rotation.x = 0.25;
          tpart(new THREE.BoxGeometry(sw * 0.12, sh * 0.36, sd * 0.32), "#f3ead8", sat, -sw * 0.28, sh * 0.54, sd * 0.16).rotation.x = -0.2;
          // diagonal strap: right shoulder to left hip
          const sg = new THREE.Group(); sg.position.set(0, 1.2 * u, -0.03 * u); sg.rotation.z = -0.9; hold.add(sg);
          const strap = new THREE.Mesh(new THREE.TorusGeometry(1, 0.075, 8, 40), own("#7a4b2a", "bag", 0.78)); strap.rotation.x = Math.PI / 2; strap.scale.set(0.4 * u, 0.17 * u, 0.4 * u); strap.castShadow = true; sg.add(strap);
          // letter for the right hand, shown while knocking at a door
          const letter = new THREE.Group(), hr = bone("hand_r"); letter.visible = false;
          letter.position.copy(hr ? wp(hr) : new THREE.Vector3(-0.75 * u, 1.45 * u, 0)).add(new THREE.Vector3(-0.08 * u, -0.03 * u, 0.04 * u)); hold.add(letter);
          tpart(CG.sphere, "#fff8ec", letter, 0, 0, 0, 0.15, 0.012, 0.1);
          tpart(CG.sphere, "#e4572e", letter, 0, 0.01, 0, 0.03, 0.01, 0.03).castShadow = false;
          hold.updateMatrixWorld(true);
          const head = bone("Head"), spine = bone("spine_03");
          if (head) head.attach(cap);
          if (spine) { spine.attach(sat); spine.attach(sg); }
          if (hr) hr.attach(letter);
          // scooter fit from ScooterRide's first frame: foot_l (sole) on the deck, grips in the hands
          const fit = (() => {
            const clip = (n) => gltf.animations.find((c) => c.name === n), fl = bone("foot_l"), hl = bone("hand_l");
            if (!fl || !hl || !hr || !clip("ScooterRide")) return null;
            const tm = new THREE.AnimationMixer(m), at = (n) => { tm.stopAllAction(); tm.clipAction(clip(n)).reset().play(); tm.update(0); return [fl, hl, hr].map(wp); };
            const ankle = clip("Idle") ? at("Idle")[0].y : 0.1 * u, [f, a, b] = at("ScooterRide");
            tm.stopAllAction(); tm.uncacheRoot(m);
            const oy = 0.145 - (f.y - ankle), mx = (a.x + b.x) / 2, mz = (a.z + b.z) / 2, hy = (a.y + b.y) / 2 + oy;
            const ox = Math.max(-f.x - 0.08, Math.min(-f.x + 0.08, -mx));
            const h0 = (hy - 0.1) / Math.cos(0.22), oz = Math.max(-0.4 - f.z, Math.min(0.3 - f.z, 0.72 - h0 * Math.sin(0.22) - mz)), dz = mz + oz - 0.72;
            return { ox, oy, oz, rake: Math.max(-0.6, Math.min(0.15, Math.atan2(dz, hy - 0.1))), h: Math.max(0.6, Math.hypot(dz, hy - 0.1)), half: Math.max(0.14, Math.min(0.34, Math.abs(a.x - b.x) / 2)) };
          })();
          return Object.assign(pmAnim(m, gltf.animations, letter), { hold, bag: sat, letter, fit, cos, hand: hr, footR: bone("foot_r"), hips: bone("pelvis") });
        }
        {
          const loadEl = document.getElementById("load"), done = () => (loadEl.hidden = true);
          const bar = (f) => (loadBar.style.width = Math.max(4, Math.min(100, f * 100)) + "%");
          // BGX2 site: glTF + .bin + external textures loaded by URL (no GLB fetch+parse or base64, so no blob: URLs under the site CSP)
          const viaFetch = () => new Promise((res, rej) => new THREE.GLTFLoader().load("./models/postman.gltf", res, (e) => { if (e && e.total) bar(0.1 + (0.8 * e.loaded) / e.total); }, rej));
          const showWarn = () => {
            const b = document.createElement("div"); b.className = "x-pmwarn"; b.setAttribute("role", "status");
            b.textContent = "⚠ Postacı modeli yüklenemedi";
            (document.getElementById("game") || document.body).appendChild(b);
          };
          const use = (g, path) => {
            const k = pmPlayer(g); pm.pivot.remove(pm.body); pm.pivot.add(k.hold);
            Object.assign(player, { kk: k, act: k.act, bag: k.bag }); if (k.fit) scooter.fit(k.fit); if (scooter.riding) k.ride(true);
            if (window.__cosAttach) window.__cosAttach(k.cos);
            console.info("[postman] loaded via " + path);
          };
          if (!THREE.GLTFLoader) { console.warn("[postman] GLTFLoader missing: procedural fallback"); showWarn(); done(); }
          else {
            bar(0.1);
            viaFetch()
              .then((g) => use(g, "./models/postman.gltf"))
              .catch((e) => { console.warn("[postman] model load failed, using procedural fallback:", e); showWarn(); })
              .finally(done);
          }
        }

        // ---------- slim villagers: villagers_m.glb / villagers_f.glb, same Quaternius rig and style as the postman ----------
        const VGLB = { M: null, F: null };
        const V_U = 2.4 / 1.8; // the postman's factor (native 1.80 -> 2.4), so villagers stand about 2.35
        const V_REF = (4.27 * 1.77 * V_U) / 2.4; // Walk stride, world units/s at timeScale 1 (postman Walk REF 4.27 at 2.4 tall)
        // house id -> [model, recolour on a reused model, job accessory]; only hats that sit on the slim head are kept
        const V_CAST = {
          1: ["V_Baker_F", null, "toque"], // Ayşe, baker
          2: ["V_Farmer_M", { M_Shirt: "#9fd8b0", M_Trousers: "#8a6a4f", M_Hair: "#3d2c24" }, "straw"], // Hasan, gardener
          3: ["V_Grandma_F"], // Fatma, tailor
          4: ["V_Worker_M"], // Mehmet, carpenter
          5: ["V_Teacher_F"], // Zeynep, teacher
          6: ["V_Farmer_M", null, "straw"], // Ali, farmer
          7: ["V_Gardener_F"], // Elif, beekeeper
          8: ["V_Worker_M", { M_Shirt: "#a9c4ea", M_Trousers: "#5f6f8f", M_Hair: "#6b6b6b" }], // the Sergeant, watchman
          9: ["V_Grandma_F", { M_Top: "#f6b8c8", M_Trousers: "#9a7b6a" }], // Emine, midwife
          10: ["V_Elder_M"], // Osman, shepherd
          11: ["V_Baker_F", { M_Top: "#ffd8a8", M_Trousers: "#c98b7a", M_Hair: "#5a3e2b" }, "toque"], // Hatice, cook
          12: ["V_Elder_M", { M_Coat: "#9db4d6", M_Trousers: "#6e6a7a" }], // Kemal, headman
          13: ["V_Shopkeeper_M"], // Selim, cheesemaker
          14: ["V_Gardener_F", { M_Top: "#f7e3b0", M_Trousers: "#a88a6a", M_Hair: "#e0c08a" }], // Gülsüm, miller
          15: ["V_Worker_M", { M_Shirt: "#c9b3e6", M_Trousers: "#5a5f6e", M_Hair: "#2a2a2a" }], // Rıza, blacksmith
          16: ["V_Teacher_F", { M_Top: "#ffc6d9", M_Trousers: "#7d8fc9", M_Hair: "#8a5a3c" }], // Nermin, painter
        };
        // the six walkers: other models, in their pastel outfits
        const V_WALK = ["V_Farmer_M", "V_Teacher_F", "V_Worker_M", "V_Gardener_F", "V_Shopkeeper_M", "V_Baker_F"];
        const ONCE_HARD = { SitDown: 1, StandUp: 1 };
        function vSpawn(name, cols, acc) {
          const gltf = VGLB[name.slice(-1)]; if (!gltf) return null;
          const m = THREE.SkeletonUtils.clone(gltf.scene), arm = m.getObjectByName(name.slice(-1) === "M" ? "Villagers_M" : "Villagers_F") || m.children[0];
          if (!arm || !arm.getObjectByName(name)) return null;
          for (const c of [...arm.children]) if (c.name.startsWith("V_") && c.name !== name) arm.remove(c);
          if (cols && cols.M_Hair && !cols.M_Eyebrows) cols = Object.assign({ M_Eyebrows: cols.M_Hair }, cols);
          // toon materials keeping maps, as pmPlayer; new per villager, so recolours never leak to other clones
          const mats = new Map();
          m.traverse((o) => {
            if (!o.isMesh) return;
            const s = o.material;
            if (!mats.has(s)) {
              const t = new THREE.MeshToonMaterial({ name: s.name, color: s.color.clone(), map: s.map, normalMap: s.normalMap, gradientMap: toonRamp, transparent: s.transparent, alphaTest: s.alphaTest });
              if (cols && cols[s.name]) t.color.set(cols[s.name]);
              mats.set(s, t);
            }
            o.material = mats.get(s); o.castShadow = true; o.frustumCulled = false;
          });
          const hold = new THREE.Group(); hold.add(m); m.scale.setScalar(V_U); // faces +Z, soles on y=0
          const bone = (n) => m.getObjectByName(n);
          // animation: loops (Idle, Walk, Sit) and one-shots, 0.2 s crossfades
          const mixer = new THREE.AnimationMixer(m), A = {};
          gltf.animations.forEach((c) => (A[c.name] = mixer.clipAction(c)));
          let cur = null, busy = 0, after = "Idle";
          const go = (nm, once, next, hard) => {
            const a = A[nm]; if (!a) return false;
            if (a === cur && !once) return true;
            a.reset(); a.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, Infinity); a.clampWhenFinished = !!once; a.timeScale = 1;
            a.setEffectiveWeight(1).play();
            if (cur && cur !== a) cur.crossFadeTo(a, 0.2, false);
            cur = a; busy = once ? (hard ? 2 : 1) : 0; after = next || "Idle";
            return true;
          };
          mixer.addEventListener("finished", (e) => { if (e.action === cur) { busy = 0; go(after); } });
          go("Idle"); mixer.update(0); hold.updateMatrixWorld(true);
          // job hat on the Head bone, placed in the Idle pose
          const head = bone("Head"), hr = bone("hand_r");
          if (head && acc) {
            const hp = head.getWorldPosition(new THREE.Vector3()), u = V_U, a = new THREE.Group(), cyl = (t, b, h) => new THREE.CylinderGeometry(t, b, h, 24);
            a.position.set(hp.x, hp.y + 0.14 * u, hp.z + 0.01 * u); hold.add(a);
            if (acc === "straw") {
              tpart(cyl(0.21 * u, 0.21 * u, 0.012 * u), "#e9cf8a", a, 0, 0, 0);
              tpart(cyl(0.1 * u, 0.118 * u, 0.09 * u), "#e9cf8a", a, 0, 0.045 * u, 0);
              tpart(cyl(0.119 * u, 0.119 * u, 0.022 * u), "#c0533a", a, 0, 0.016 * u, 0);
            } else if (acc === "toque") {
              tpart(cyl(0.112 * u, 0.115 * u, 0.07 * u), "#ffffff", a, 0, 0.03 * u, 0);
              tpart(CG.sphere, "#ffffff", a, 0, 0.1 * u, 0, 0.135 * u, 0.075 * u, 0.135 * u);
            }
            hold.updateMatrixWorld(true); head.attach(a);
          }
          // hand anchor for the delivered envelope
          const armR = new THREE.Object3D(); (hr || head || hold).add(armR);
          return {
            hold, mixer, armR, ref: V_REF, canSit: !!(A.SitDown && A.Sit && A.StandUp),
            // a loop: never cuts SitDown/StandUp, and Idle lets a Wave/Talk/Yes/Cheer finish
            set(nm, ts) {
              if (busy === 2 || (busy === 1 && nm === "Idle")) return;
              if (go(nm) && cur) cur.timeScale = nm === "Walk" ? Math.max(0.5, Math.min(1.6, ts)) : 1;
            },
            once(nm, next, hard) { go(nm, true, next, hard || ONCE_HARD[nm]); },
            play(nm) { this.once(nm); },
          };
        }
        anims.push((t, dt) => HOUSES.forEach((h) => { const o = h.owner; if (o && o.kk && o.g.parent && !o.sch) o.kk.mixer.update(dt); }));
        {
          // BGX2 site: villagers_m/f.gltf (external .bin + textures) loaded by URL, procedural fallback on failure
          const loadOne = (key) => {
            const file = "models/villagers_" + key.toLowerCase() + ".gltf";
            return new Promise((res, rej) => new THREE.GLTFLoader().load("./" + file, res, undefined, rej))
              .then((g) => (console.info("[villagers] " + key + " loaded via ./" + file), g))
              .catch((e) => { console.warn("[villagers] " + key + " load failed, procedural fallback:", e); return null; });
          };
          if (THREE.GLTFLoader && THREE.SkeletonUtils)
            Promise.all([loadOne("M"), loadOne("F")]).then(([gm, gf]) => {
              VGLB.M = gm; VGLB.F = gf;
              villagers.forEach((v, i) => {
                try {
                  const c = v.cols, k = vSpawn(V_WALK[i % V_WALK.length], { M_Shirt: c.shirt, M_Top: c.shirt, M_Coat: c.shirt, M_Trousers: c.pants, M_Hair: c.hair }); if (!k) return;
                  v.p.g.remove(v.p.body); v.p.g.add(k.hold); v.sh = undefined; v.kk = k;
                } catch (e) { console.warn("[villagers] walker fallback:", e); }
              });
            });
          else console.warn("[villagers] GLTFLoader/SkeletonUtils missing: procedural fallback");
        }

        function collide() {
          const R = player.radius, p = player.pos;
          for (const c of colliders) {
            const dx = p.x - c.x, dz = p.z - c.z;
            if (c.t === 0) {
              const d = Math.hypot(dx, dz), m = c.r + R;
              if (d < m && d > 1e-4) { p.x = c.x + (dx / d) * m; p.z = c.z + (dz / d) * m; }
            } else {
              if (Math.abs(dx) > c.hw + c.hd + R + 1 || Math.abs(dz) > c.hw + c.hd + R + 1) continue;
              const co = Math.cos(c.rot), si = Math.sin(c.rot);
              let lx = dx * co - dz * si, lz = dx * si + dz * co;
              const ox = c.hw + R - Math.abs(lx), oz = c.hd + R - Math.abs(lz);
              if (ox > 0 && oz > 0) {
                if (ox < oz) lx = Math.sign(lx || 1) * (c.hw + R); else lz = Math.sign(lz || 1) * (c.hd + R);
                p.x = c.x + lx * co + lz * si; p.z = c.z - lx * si + lz * co;
              }
            }
          }
          p.x = Math.max(-95, Math.min(95, p.x)); p.z = Math.max(-95, Math.min(95, p.z));
        }

        // ---------- input ----------
        const keys = {};
        const cam = { yaw: 0.55, pitch: 0.42, dist: 12 };
        const joy = { x: 0, y: 0, id: null };
        const toastEl = document.getElementById("toast");
        let toastT = 0;
        function toast(msg, ms = 2200) { xIcoText(toastEl, msg); toastEl.classList.add("is-on"); try { safeLayout(); } catch (e) { /* before the layout code exists */ } clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("is-on"), ms); }
        addEventListener("keydown", (e) => {
          keys[e.code] = true;
          if (e.code === "KeyE" && game.started && !e.repeat) game.onInteract();
          if ((e.code === "KeyQ" || e.code === "Tab") && game.started && !e.repeat) { game.cycle(); e.preventDefault(); }
          if (e.code === "KeyB" && game.started && !e.repeat) toggleScooter();
          if (e.code.startsWith("Arrow") || e.code === "Space") e.preventDefault();
        });
        addEventListener("keyup", (e) => (keys[e.code] = false));
        addEventListener("blur", () => { for (const k in keys) keys[k] = false; });
        addEventListener("touchstart", () => document.body.classList.add("is-touch"), { passive: true, once: true });
        if (matchMedia("(pointer: coarse)").matches) document.body.classList.add("is-touch");

        const cv = renderer.domElement;
        let drag = null;
        cv.addEventListener("pointerdown", (e) => {
          if (e.pointerType !== "mouse" && e.clientX < innerWidth / 2 && joy.id === null) { joyStart(e); return; }
          drag = { id: e.pointerId, x: e.clientX, y: e.clientY }; cv.setPointerCapture(e.pointerId);
        });
        cv.addEventListener("pointermove", (e) => {
          if (joy.id === e.pointerId) { joyMove(e); return; }
          if (!drag || drag.id !== e.pointerId) return;
          cam.yaw -= (e.clientX - drag.x) * 0.006; cam.pitch = Math.max(0.12, Math.min(1.25, cam.pitch + (e.clientY - drag.y) * 0.004));
          drag.x = e.clientX; drag.y = e.clientY;
        });
        const endDrag = (e) => { joyEnd(e); if (drag && drag.id === e.pointerId) drag = null; };
        cv.addEventListener("pointerup", endDrag); cv.addEventListener("pointercancel", endDrag);
        cv.addEventListener("wheel", (e) => { cam.dist = Math.max(6, Math.min(24, cam.dist + e.deltaY * 0.01)); e.preventDefault(); }, { passive: false });

        const joyEl = document.getElementById("joy"), knob = document.getElementById("knob");
        function joyStart(e) {
          joy.id = e.pointerId; joy.cx = e.clientX; joy.cy = e.clientY; cv.setPointerCapture(e.pointerId);
          joyEl.style.left = e.clientX + "px"; joyEl.style.top = e.clientY + "px"; joyEl.classList.add("is-on");
          knob.style.transform = ""; joy.x = joy.y = 0; e.preventDefault();
        }
        function joyMove(e) {
          let dx = e.clientX - joy.cx, dy = e.clientY - joy.cy;
          const d = Math.hypot(dx, dy), m = 30; if (d > m) { dx *= m / d; dy *= m / d; }
          knob.style.transform = `translate(${dx}px, ${dy}px)`; joy.x = dx / m; joy.y = -dy / m;
        }
        function joyEnd(e) { if (joy.id !== e.pointerId) return; joy.id = null; joy.x = joy.y = 0; knob.style.transform = ""; joyEl.classList.remove("is-on"); }
        document.getElementById("act").addEventListener("pointerdown", (e) => { e.preventDefault(); if (game.started) game.onInteract(); });
        document.getElementById("bikechip").addEventListener("click", (e) => { e.currentTarget.blur(); toggleScooter(); });

        // ---------- minimap ----------
        const mm = document.getElementById("minimap"), mx = mm.getContext("2d");
        const mmBg = document.createElement("canvas"); mmBg.width = mmBg.height = 300;
        const toM = (v) => (v + 100) * 1.5;
        {
          const c = mmBg.getContext("2d");
          c.fillStyle = "#8fd264"; c.fillRect(0, 0, 300, 300);
          c.fillStyle = "#5ea845"; treePts.forEach(([x, z]) => { c.beginPath(); c.arc(toM(x), toM(z), 2.6, 0, 6.283); c.fill(); });
          c.strokeStyle = "#d9b47a"; c.lineWidth = 3.5; c.lineCap = "round"; c.lineJoin = "round";
          pathPts.forEach((pts) => { c.beginPath(); pts.forEach(([x, z], i) => (i ? c.lineTo(toM(x), toM(z)) : c.moveTo(toM(x), toM(z)))); c.stroke(); });
          c.strokeStyle = "#4fb6ea"; c.lineWidth = 15; c.beginPath();
          for (let z = -100; z <= 100; z += 4) (z === -100 ? c.moveTo : c.lineTo).call(c, toM(riverX(z)), toM(z)); c.stroke();
          c.fillStyle = "#4fb6ea"; c.beginPath(); c.arc(toM(POND.x), toM(POND.z), POND.r * 1.5, 0, 6.283); c.fill();
          c.strokeStyle = "#9c6a3b"; c.lineWidth = 4.5; BRIDGES.forEach((b) => { c.beginPath(); c.moveTo(toM(b.x - b.end), toM(b.z)); c.lineTo(toM(b.x + b.end), toM(b.z)); c.stroke(); });
          // ramps: a short brown bar across the path
          c.strokeStyle = "#7a5230"; c.lineWidth = 3; c.lineCap = "butt";
          RAMPS.forEach((r) => { c.beginPath(); c.moveTo(toM(r.x - r.cz * 2.2), toM(r.z + r.cx * 2.2)); c.lineTo(toM(r.x + r.cz * 2.2), toM(r.z - r.cx * 2.2)); c.stroke(); });
          c.fillStyle = "#e8d6b0"; c.beginPath(); c.arc(toM(0), toM(0), 24, 0, 6.283); c.fill();
          c.fillStyle = "#d62828"; c.fillRect(toM(-5), toM(-17.5), 15, 10.5);
        }
        function drawMap() {
          mx.save(); mx.clearRect(0, 0, 300, 300);
          mx.beginPath(); mx.arc(150, 150, 150, 0, 6.283); mx.clip();
          // zoomed view centered on player (shows ~120 units across)
          const z = 1.25, px = toM(player.pos.x), pz = toM(player.pos.z);
          mx.translate(150, 150); mx.scale(z, z); mx.translate(-px, -pz);
          mx.drawImage(mmBg, 0, 0);
          HOUSES.forEach((h) => {
            mx.fillStyle = h.roof; mx.strokeStyle = "#fff"; mx.lineWidth = 1.5;
            mx.beginPath(); mx.arc(toM(h.x), toM(h.z), 5, 0, 6.283); mx.fill(); mx.stroke();
          });
          tipMap(mx);
          // scooter icon: where it is parked, or beside the postman while riding
          {
            const bx = scooter.riding ? px + 12 : toM(scooter.g.position.x), bz = scooter.riding ? pz + 11 : toM(scooter.g.position.z);
            mx.fillStyle = "#fff"; mx.beginPath(); mx.arc(bx, bz, 7.5, 0, 6.283); mx.fill();
            mx.strokeStyle = "#5b8fd9"; mx.fillStyle = "#5b8fd9"; mx.lineWidth = 1.6; mx.lineCap = mx.lineJoin = "round";
            mx.beginPath(); mx.moveTo(bx - 4.2, bz + 2); mx.lineTo(bx + 3.4, bz + 2); mx.lineTo(bx + 1.8, bz - 4.4); mx.moveTo(bx + 0.2, bz - 4.4); mx.lineTo(bx + 3.4, bz - 4.4); mx.stroke();
            mx.beginPath(); mx.arc(bx - 3.8, bz + 3.6, 1.6, 0, 6.283); mx.moveTo(bx + 5.2, bz + 3.6); mx.arc(bx + 3.6, bz + 3.6, 1.6, 0, 6.283); mx.fill();
          }
          mx.translate(px, pz); mx.rotate(-player.heading + Math.PI);
          mx.fillStyle = "#1d1d1f"; mx.strokeStyle = "#fff"; mx.lineWidth = 2;
          mx.beginPath(); mx.moveTo(0, -9); mx.lineTo(6.5, 7); mx.lineTo(0, 3.5); mx.lineTo(-6.5, 7); mx.closePath(); mx.fill(); mx.stroke();
          mx.restore();
        }

        // ---------- clues: generated from house data ----------
        const lang = () => (window.__lang === "en" ? "en" : "tr");
        // fix1106: English text always shows the English names, even when a line was built from the Turkish name
        const EN_SWAP = [["Hasan Dede", "Grandpa Hasan"], ["Bir Dost", "A Friend"], ["İzmir", "Izmir"]]
          .concat(HOUSES.map((h) => [h.name, h.nameEn]), HOUSES.map((h) => [h.nickname.tr, h.nickname.en]))
          .filter((p) => p[0] !== p[1]).sort((a, b) => b[0].length - a[0].length);
        const enFix = (x) => { if (typeof x !== "string") return x; for (const [a, b] of EN_SWAP) if (x.includes(a)) x = x.split(a).join(b); return x; };
        window.__enFix = enFix;
        const T = (tr, en) => (lang() === "en" ? enFix(en) : tr);
        const nm = (h) => T(h.name, h.nameEn);
        // fix1106: wording for the device: touch screens get button words, keyboards get key names
        const isTouchUI = () => document.body.classList.contains("is-touch");
        const TK = (trKey, enKey, trTouch, enTouch) => (isTouchUI() ? T(trTouch, enTouch) : T(trKey, enKey));
        const isEast = (h) => h.x > riverX(h.z) - 4;
        const band = (h) => { const d = Math.hypot(h.x, h.z); return d < 36 ? "near" : d > 60 ? "edge" : "mid"; };
        // neighbours (two nearest houses, nearest first) and river side
        HOUSES.forEach((h) => {
          h.riverSide = isEast(h) ? "east" : "west";
          h.neighbours = HOUSES.filter((o) => o !== h)
            .sort((a, b) => Math.hypot(a.x - h.x, a.z - h.z) - Math.hypot(b.x - h.x, b.z - h.z))
            .slice(0, 2).map((o) => o.id);
        });
        const byId = (id) => HOUSES.find((x) => x.id === id);
        const nearestOf = (x) => byId(x.neighbours[0]);
        // ---------- clue library: clause = { t: (house) => bool, f: [tr, en] }, written in the sender's voice ----------
        const C_ = (t, tr, en) => ({ t, f: [tr, en] });
        const COLS = [["kırmızı", "red", "#c62828"], ["mavi", "blue", "#1e88e5"], ["yeşil", "green", "#3f8f3f"], ["kahverengi", "brown", "#6d4c41"], ["lacivert", "navy", "#1f2f6b"], ["mor", "purple", "#6a1b9a"], ["turuncu", "orange", "#f57c00"], ["sarı", "yellow", "#fbc02d"], ["siyah", "black", "#222222"], ["gri", "grey", "#8f9297"]];
        const rgb = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
        const colName = (hex) => { const a = rgb(hex); let best = COLS[0], bd = 1e9; for (const c of COLS) { const b = rgb(c[2]), d = 2 * (a[0] - b[0]) ** 2 + 4 * (a[1] - b[1]) ** 2 + 3 * (a[2] - b[2]) ** 2; if (d < bd) { bd = d; best = c; } } return best; };
        const FEAT_F = {
          bakery: ["kapımda fırın tabelası sallanıyor", "a bakery sign swings by my door", "fırın tabelam yok", "I have no bakery sign"],
          garden: ["sebze bostanım var", "I grow a vegetable patch", "bostanım yok", "I keep no vegetable patch"],
          laundry: ["bahçemde çamaşır ipi var", "a washing line flaps in my yard", "çamaşır ipim yok", "I have no washing line"],
          swing: ["ağacımda salıncak var", "a swing hangs from my tree", "salıncağım yok", "I have no swing"],
          beehive: ["arı kovanlarım var", "I keep beehives", "arı kovanım yok", "I keep no bees"],
          tractor: ["evimin yanında traktörüm duruyor", "my tractor is parked by the house", "traktörüm yok", "I own no tractor"],
          windmill: ["evimin yanında yel değirmeni dönüyor", "a windmill turns beside my house", "yel değirmenim yok", "I have no windmill"],
        };
        const PET_F = {
          cat: ["kedim çatıda güneşleniyor", "my cat suns itself on the roof", "kedim yok", "I have no cat"],
          dog: ["köpeğim kapıda bekliyor", "my dog waits by the door", "köpeğim yok", "I have no dog"],
          chickens: ["tavuklarım bahçede eşeleniyor", "my hens scratch in the yard", "tavuğum yok", "I keep no hens"],
          goat: ["keçim bahçede otluyor", "my goat grazes in the yard", "keçim yok", "I have no goat"],
          sheep: ["koyunlarım evin önünde otluyor", "my sheep graze out front", "koyunum yok", "I keep no sheep"],
        };
        const PROP_F = {
          horseshoe: ["kapımın üstünde nal asılı", "a horseshoe hangs over my door", "kapımda nal yok", "there's no horseshoe on my door"],
          bike: ["duvarıma bisiklet yaslı", "a bike leans against my wall", "bisikletim yok", "I have no bike"],
          bench: ["kapımın önünde bank var", "there's a bench by my door", "kapımda bank yok", "there's no bench by my door"],
          awning: ["kapımın üstünde tente var", "there's an awning over my door", "kapımda tente yok", "there's no awning over my door"],
          timber: ["çatımda yuvarlak küçük pencere var", "my attic has a small round window", "çatımda yuvarlak pencere yok", "my attic has no round window"],
        };
        const RIDDLES = {
          "fırıncı": ["Herkes uyurken ben kalkarım, ekmeğin kokusunu köye salarım.", "I rise while all sleep and send the smell of bread through the village."],
          "bahçıvan": ["Toprağa tohum, tohuma su; en güzel domatesi ben yetiştiririm bu.", "Seed in soil, water on seed; I grow the best tomatoes indeed."],
          "terzi": ["İğnem ince, ipliğim uzun; söküğün olursa bana gel, dostum.", "Thin needle, long thread; bring me anything torn and I'll mend it instead."],
          "marangoz": ["Rendem fısıldar, talaş uçuşur; benim masamda köy oturur.", "My plane whispers and the shavings fly; half the chairs in this village were made by my hand."],
          "öğretmen": ["Tahtam yeşil, tebeşirim beyaz; harfleri sevdiren benim biraz.", "Green board, white chalk; I make children love to read and talk."],
          "çiftçi": ["Sabah tarlada, öğlen tarlada; traktörüm benimle her yolda.", "Out in the field at dawn and at noon, my tractor and I hum the same tune."],
          "arıcı": ["Vızıl vızıl dostlarım var, onlar çiçek ben kavanoz toplar.", "My buzzing friends visit the flowers; I fill the jars."],
          "bekçi": ["Herkes uyur, ben uyanık; düdüğüm cepte, fenerim yanık.", "All asleep but me awake; whistle in pocket, lantern lit for your sake."],
          "ebe": ["Köyün bütün bebeklerini ilk ben kucakladım.", "I was the first to hold every baby in this village."],
          "çoban": ["Kavalım çalar, sürüm dinler; tepede yalnız ben ve kuzular.", "My flute plays and my flock listens; on the hill, just me and the lambs."],
          "aşçı": ["Kazanım kaynar, reçelim taşar; tarifimi soran kapımı aşındırır.", "My pot bubbles, my jam spills over; everyone wants my recipe."],
          "muhtar": ["Mührüm bende, sözüm köyde; derdin varsa bana söyle.", "I keep the village seal and the village's word; bring me your troubles."],
          "peynirci": ["Sütü mayalar, sabırla beklerim; en tuzlu sırları ben bilirim.", "I set the milk and wait with patience; I know the saltiest secrets."],
          "değirmenci": ["Rüzgâr eser, taşım döner; buğday benden un olup gider.", "Wind blows, my stone turns; wheat leaves me as flour."],
          "demirci": ["Örsüm çınlar, kıvılcım saçar; at nalları benden çıkar.", "My anvil rings and sparks fly; every horseshoe starts with me."],
          "ressam": ["Köyü tuvale ben sığdırırım, renkleri karıştırır, sabah ışığını yakalarım.", "I fit the village on a canvas and catch the morning light."],
        };
        const KIND = {
          look: { tier: 1, lab: ["Gözlem", "Look"], to: ["Görünce tanıyacağın eve", "the house you'll know on sight"] },
          place: { tier: 2, lab: ["Konum", "Place"], to: ["Yerini tarif ettiğim eve", "the house whose place I describe"] },
          riddle: { tier: 2, lab: ["Bilmece", "Riddle"], to: ["Bilmeceyi çözen kapıya", "the door that solves the riddle"] },
          excl: { tier: 3, lab: ["Eleme", "Exclusion"], to: ["Benzerlerinden ayırt edeceğin eve", "the house you can tell from its look-alikes"] },
          combo: { tier: 3, lab: ["Gözlem + Konum", "Look + Place"], to: ["Hem görünüşünü hem yerini anlattığım eve", "the house I describe by look and place"] },
          sketch: { tier: 1, lab: ["Çizim", "Sketch"], to: ["Bu resimdeki ev.", "the house in this drawing."] },
          torn: { tier: 2, lab: ["Yırtık", "Torn"], to: ["", ""] },
          sketch3: { tier: 3, lab: ["Çizim", "Sketch"], to: ["Bu resimdeki ev.", "the house in this drawing."] },
          hand: { tier: 3, lab: ["Elden Teslim", "Hand Delivery"], to: ["Eline vereceğin kişiye", "the person you hand this to"] },
          chain: { tier: 2, lab: ["Zincir", "Chain"], to: ["Cevap mektubu: zincirin sıradaki halkasına", "A reply letter: to the next link in the chain"] },
        };
        // landmarks for KONUM: pond, bridge ends, windmill
        const dq = (x) => Math.hypot(x.x, x.z);
        const argmin = (arr, f) => arr.reduce((a, b) => (f(b) < f(a) ? b : a));
        const pondNear = argmin(HOUSES, (x) => Math.hypot(x.x - POND.x, x.z - POND.z));
        BRIDGES.forEach((b) => (b.first = argmin(HOUSES.filter(isEast), (x) => Math.hypot(x.x - b.x - 6, x.z - b.z))));
        const millH = HOUSES.find((x) => x.feature === "windmill" && x.featPos);
        const dMill = (x) => Math.hypot(x.door2.x - millH.featPos.x, x.door2.z - millH.featPos.z);
        function lookFor(h) {
          const n = h.pots, dc = colName(h.door), cc = colName(h.chimney);
          const L = [
            C_((x) => x.pots === n, n ? `kapımın önünde tam ${n} saksı var` : "kapımın önünde hiç saksı yok", n ? `there ${n === 1 ? "is" : "are"} exactly ${n} pot${n === 1 ? "" : "s"} by my door` : "there are no pots by my door"),
            C_((x) => x.shutters === h.shutters, h.shutters === "closed" ? "kepenklerim hep kapalı" : "kepenklerim hep açık", h.shutters === "closed" ? "my shutters are always closed" : "my shutters are always open"),
            C_((x) => colName(x.door) === dc, `kapım ${dc[0]}`, `my door is ${dc[1]}`),
            C_((x) => colName(x.chimney) === cc, `bacam ${cc[0]}`, `my chimney is ${cc[1]}`),
          ];
          for (const k in PROP_F) if (h[k]) L.push(C_((x) => !!x[k], PROP_F[k][0], PROP_F[k][1]));
          return L;
        }
        function placeFor(h) {
          const n = byId(h.neighbours[0]), east = h.riverSide === "east", b = band(h), P = [];
          P.push(C_((x) => x.neighbours[0] === n.id, `en yakın komşum ${n.job.tr}`, `my nearest neighbour is the village ${n.job.en}`));
          BRIDGES.forEach((br, i) => { if (br.first === h) P.push(C_((x) => x === h, `${i ? "güney" : "kuzey"} köprüsünü geçince ilk ev benimki`, `mine is the first house after you cross the ${i ? "south" : "north"} bridge`)); });
          if (pondNear === h) P.push(C_((x) => x === h, "göletten en yakın ev benim", "mine is the house nearest the pond"));
          if (millH && h !== millH && dMill(h) < 35) P.push(C_((x) => x !== millH && dMill(x) < 35, "yel değirmenini kapımdan görebilirim", "I can see the windmill from my door"));
          const same = HOUSES.filter((x) => x.roofName.tr === h.roofName.tr);
          if (same.length > 1) {
            if (argmin(same, (x) => -dq(x)) === h) P.push(C_((x) => x === h, `meydana en uzak ${h.roofName.tr} çatılı ev benimki`, `mine is the ${h.roofName.en}-roofed house farthest from the square`));
            if (argmin(same, dq) === h) P.push(C_((x) => x === h, `meydana en yakın ${h.roofName.tr} çatılı ev benimki`, `mine is the ${h.roofName.en}-roofed house nearest the square`));
          }
          P.push(C_((x) => x.riverSide === h.riverSide, `nehrin ${east ? "öte" : "bu"} yakasında oturuyorum`, `I live on ${east ? "the far" : "this"} side of the river`));
          // square-distance sentence: flagged so look+place prefers landmark/relation clauses
          P.push(Object.assign(C_((x) => band(x) === b, ["evim meydana çok yakın", "evim meydana ne yakın ne uzak", "evim köyün kıyısında"][["near", "mid", "edge"].indexOf(b)], ["my house is close to the square", "my house is neither near the square nor at the edge", "my house is at the edge of the village"][["near", "mid", "edge"].indexOf(b)]), { sq: true }));
          return P;
        }
        // ELEME: a shared positive part, then a "but not" part
        function exclFor(h) {
          const east = h.riverSide === "east", dc = colName(h.door), pos = [], neg = [];
          pos.push(C_((x) => x.roofName.tr === h.roofName.tr, `çatım ${h.roofName.tr}`, `my roof is ${h.roofName.en}`));
          pos.push(C_((x) => x.riverSide === h.riverSide, `nehrin ${east ? "öte" : "bu"} yakasında oturuyorum`, `I live on ${east ? "the far" : "this"} side of the river`));
          pos.push(C_((x) => colName(x.door) === dc, `kapım ${dc[0]}`, `my door is ${dc[1]}`));
          if (h.pet) pos.push(C_((x) => x.pet === h.pet, PET_F[h.pet][0], PET_F[h.pet][1]));
          if (h.feature) pos.push(C_((x) => x.feature === h.feature, FEAT_F[h.feature][0], FEAT_F[h.feature][1]));
          for (const k in PROP_F) if (h[k]) pos.push(C_((x) => !!x[k], PROP_F[k][0], PROP_F[k][1]));
          for (const k in FEAT_F) if (h.feature !== k) neg.push(C_((x) => x.feature !== k, FEAT_F[k][2], FEAT_F[k][3]));
          for (const k in PET_F) if (h.pet !== k) neg.push(C_((x) => x.pet !== k, PET_F[k][2], PET_F[k][3]));
          for (const k in PROP_F) if (!h[k]) neg.push(C_((x) => !x[k], PROP_F[k][2], PROP_F[k][3]));
          const out = [];
          for (const p of pos) if (matches([p]).length > 1) for (const q of neg) if (matches([p, q]).length === 1)
            out.push([C_((x) => p.t(x) && q.t(x), `${p.f[0]} ama ${q.f[0]}`, `${p.f[1]}, but ${q.f[1]}`)]);
          return out;
        }
        function optionsFor(h) {
          const L = lookFor(h), P = placeFor(h), one = (A) => A.filter((c) => matches([c]).length === 1), vague = (A) => A.filter((c) => matches([c]).length > 1);
          const pairs = (A, B) => { const r = []; A.forEach((a, i) => B.forEach((b, j) => { if ((A !== B || j > i) && matches([a, b]).length === 1) r.push([a, b]); })); return r; };
          const Lv = vague(L), Pv = vague(P);
          // prefer landmark/relation clauses; the square-distance sentence only if nothing else gives a unique match
          const pref = (f) => { const a = f(Pv.filter((c) => !c.sq)); return a.length ? a : f(Pv); };
          const combo = pref((PV) => {
            const r = pairs(Lv, PV);
            Lv.forEach((a, i) => Lv.forEach((b, j) => { if (j > i) PV.forEach((c) => { if (matches([a, b, c]).length === 1 && matches([a, b]).length > 1) r.push([a, b, c]); }); }));
            return r;
          });
          const L1 = one(L).map((c) => [c]), P1 = one(P).map((c) => [c]), SK = sketchFor(h);
          return { look: L1.length ? L1 : pairs(Lv, Lv), place: P1.length ? P1 : pref((PV) => pairs(PV, PV)), riddle: [[C_((x) => x.job.tr === h.job.tr, ...RIDDLES[h.job.tr])]], excl: exclFor(h), combo, sketch: SK.full, sketch3: SK.hard, torn: tornFor(h) };
        }
        // ÇİZİM: one clause per drawn detail; tier 3 leaves one detail out and the rest still match one house
        function sketchFor(h) {
          const dc = colName(h.door), D = [
            { k: "roof", c: C_((x) => x.roofName.tr === h.roofName.tr, `çatım ${h.roofName.tr}`, `my roof is ${h.roofName.en}`) },
            { k: "door", c: C_((x) => colName(x.door) === dc, `kapım ${dc[0]}`, `my door is ${dc[1]}`) },
            { k: "shut", c: C_((x) => x.shutters === h.shutters, h.shutters, h.shutters) },
            { k: "pots", c: C_((x) => x.pots === h.pots, `${h.pots}`, `${h.pots}`) },
          ];
          for (const k in PROP_F) if (h[k]) D.push({ k, c: C_((x) => !!x[k], PROP_F[k][0], PROP_F[k][1]) });
          if (h.pet) D.push({ k: "pet", c: C_((x) => x.pet === h.pet, PET_F[h.pet][0], PET_F[h.pet][1]) });
          if (h.feature) D.push({ k: "feat", c: C_((x) => x.feature === h.feature, FEAT_F[h.feature][0], FEAT_F[h.feature][1]) });
          const all = D.map((d) => d.c), full = matches(all).length === 1 ? [all] : [];
          const drop = D.filter((d) => d.k !== "shut" && !(d.k === "pots" && !h.pots)).map((d) => Object.assign(D.filter((e) => e !== d).map((e) => e.c), { omit: d.k })).filter((c) => matches(c).length === 1);
          const soft = drop.filter((c) => c.omit !== "roof" && c.omit !== "door");
          return { full, hard: soft.length ? soft : drop };
        }
        // YIRTIK: owner name or nickname with about half its letters smudged, plus one Gözlem/Konum clause
        function smudge(str, get) {
          const ch = Array.from(str), idx = shuffle(ch.map((c, i) => i).filter((i) => i && ch[i] !== " "));
          idx.slice(0, Math.ceil(idx.length / 2)).forEach((i) => (ch[i] = "▒"));
          return { s: ch.join(""), t: (x) => { const w = Array.from(get(x)); return w.length === ch.length && w.every((c, i) => (ch[i] === "▒" ? c !== " " : c === ch[i])); } };
        }
        function tornFor(h) {
          const sup = lookFor(h).concat(placeFor(h)), best = [], rest = [];
          [[h.name, h.nameEn, (x) => x.name, (x) => x.nameEn], [h.nickname.tr, h.nickname.en, (x) => x.nickname.tr, (x) => x.nickname.en]].forEach(([tr, en, gt, ge]) => {
            for (let n = 0; n < 4; n++) {
              const a = smudge(tr, gt), b = en === tr ? a : smudge(en, ge), pa = { t: a.t }, pb = { t: b.t };
              let ok = sup.filter((s) => matches([pa, s]).length === 1 && matches([pb, s]).length === 1);
              const nsq = ok.filter((s) => !s.sq && matches([s]).length > 1); if (nsq.length) ok = nsq;
              const amb = matches([pa]).length > 1 && matches([pb]).length > 1;
              ok.forEach((s) => (amb ? best : rest).push(Object.assign([s], { torn: { tr: a.s, en: b.s }, chk: [[pa, s], [pb, s]] })));
            }
          });
          return best.length ? best : rest;
        }
        const matches = (combo) => HOUSES.filter((x) => combo.every((c) => c.t(x)));
        const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
        // round of 10, easy to hard; each letter one distinct house
        const PLAN = ["look", "look", "sketch", "place", "place", "riddle", "riddle", "torn", "excl", "sketch3"];
        function generateLetters() {
          const O = new Map(HOUSES.map((h) => [h, optionsFor(h)]));
          const kinds = [...new Set(PLAN)], need = (k) => PLAN.filter((p) => p === k).length;
          const cand = (k) => HOUSES.filter((h) => O.get(h)[k].length);
          const order = kinds.sort((a, b) => cand(a).length - cand(b).length);
          let s = null;
          for (let n = 0; n < 80; n++) {
            const used = new Set(); s = {};
            for (const k of order) { s[k] = shuffle(cand(k).filter((h) => !used.has(h))).slice(0, need(k)); s[k].forEach((h) => used.add(h)); }
            if (order.every((k) => s[k].length === need(k))) break;
            if (n === 79) for (const k of kinds) while (s[k].length < need(k)) { const h = shuffle(HOUSES).find((x) => !used.has(x)); used.add(h); s[k].push(h); }
          }
          const at = {};
          return PLAN.map((k, i) => {
            const h = s[k][(at[k] = (at[k] || 0) + 1) - 1];
            const kind = O.get(h)[k].length ? k : "riddle", c = shuffle(O.get(h)[kind])[0]; // fallback: a riddle always matches one house
            return { house: h, kind, tier: KIND[kind].tier, clauses: c, omit: c.omit, torn: c.torn, chk: c.chk, sketch: kind.indexOf("sketch") === 0, n: i + 1, picked: 0, hl: 0, hc: null, extra: null };
          });
        }
        const sentence = (s) => { s = s.charAt(0).toLocaleUpperCase(lang() === "en" ? "en" : "tr") + s.slice(1); return /[.!?]$/.test(s) ? s : s + "."; };
        const clueText = (l) => l.clauses.map((c) => sentence(T(c.f[0], c.f[1]))).join(" ");
        // hand-drawn house front: wobbly pencil strokes, watercolour roof and door
        function sketchSVG(l) {
          const h = l.house, has = (k) => l.omit !== k, id = "sk" + l.n;
          let sd = h.id * 131 + l.n * 17 + 3;
          const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647 - 0.5;
          const P = (pts, close, j = 1.1) => {
            const seq = close ? pts.concat([pts[0]]) : pts, o = [];
            seq.forEach((p, i) => {
              if (!i) return o.push([p[0] + r() * j, p[1] + r() * j]);
              const q = seq[i - 1], n = Math.max(1, Math.round(Math.hypot(p[0] - q[0], p[1] - q[1]) / 12));
              for (let k = 1; k <= n; k++) o.push([q[0] + ((p[0] - q[0]) * k) / n + r() * j, q[1] + ((p[1] - q[1]) * k) / n + r() * j]);
            });
            return "M" + o.map((p) => p[0].toFixed(1) + " " + p[1].toFixed(1)).join("L") + (close ? "Z" : "");
          };
          const ln = (pts, close, x = "") => `<path d="${P(pts, close)}"${x}/>`;
          const el = (cx, cy, rx, ry, x) => { const n = Math.max(10, Math.round((rx + ry) * 0.9)); return ln(Array.from({ length: n }, (_, i) => [cx + Math.cos((i / n) * 6.283) * rx, cy + Math.sin((i / n) * 6.283) * ry]), true, x); };
          const ci = (cx, cy, rd, x) => el(cx, cy, rd, rd, x);
          const box = (x0, y0, x1, y1, x) => ln([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], true, x);
          const wash = (pts, col) => `<path d="${P(pts.map(([x, y]) => [x + r() * 3, y + r() * 3]), true, 0.5)}" fill="${col}" fill-opacity=".55" stroke="none" filter="url(#${id}w)"/>`;
          let s = "";
          // watercolour first, pencil on top
          if (has("roof")) s += wash([[62, 63], [120, 19], [178, 63]], h.roof);
          if (has("door")) s += wash([[110, 92], [130, 92], [130, 122], [110, 122]], h.door);
          let g = ln([[2, 122], [238, 122]]) + box(72, 62, 168, 122) + ln([[62, 63], [120, 19], [178, 63]], true) + ln([[63, 64], [120, 21], [177, 62]], false, ' opacity=".5"');
          g += ln([[142, 36], [142, 24], [152, 24], [152, 43]]);
          [80, 142].forEach((wx) => {
            g += box(wx, 72, wx + 18, 88) + ln([[wx + 9, 72], [wx + 9, 88]]) + ln([[wx, 80], [wx + 18, 80]]);
            const sh = h.shutters === "closed" ? [[wx, wx + 9], [wx + 9, wx + 18]] : [[wx - 7, wx], [wx + 18, wx + 25]];
            sh.forEach(([a, b]) => { g += box(a, 72, b, 88); [76, 80, 84].forEach((y) => (g += ln([[a + 1, y], [b - 1, y]], false, ' opacity=".7"'))); });
          });
          g += box(110, 92, 130, 122) + ci(126, 108, 1);
          if (h.timber && has("timber")) g += ci(120, 46, 6) + ln([[120, 40], [120, 52]]) + ln([[114, 46], [126, 46]]);
          if (h.awning && has("awning")) { g += ln([[104, 90], [108, 82], [132, 82], [136, 90]], true); [112, 118, 124, 130].forEach((x) => (g += ln([[x - 1, 82], [x - 2, 90]]))); }
          if (h.horseshoe && has("horseshoe")) { const yb = h.awning && has("awning") ? 80 : 89; g += ln(Array.from({ length: 9 }, (_, i) => [120 + 4 * Math.cos((i / 8) * 3.1416), yb - 6 + 6 * Math.sin((i / 8) * 3.1416)]), false, ' stroke-width="1.6"'); }
          [104, 136, 98, 142].slice(0, has("pots") ? h.pots : 0).forEach((x) => (g += ln([[x - 3, 115], [x + 3, 115], [x + 2, 122], [x - 2, 122]], true) + ci(x, 112, 2.6) + ln([[x, 112], [x + 2, 108]])));
          if (h.bench && has("bench")) g += ln([[147, 108], [167, 108]]) + ln([[147, 114], [167, 114]]) + ln([[149, 108], [149, 122]]) + ln([[165, 108], [165, 122]]);
          if (h.bike && has("bike")) g += ci(44, 116.5, 5.5) + ci(61, 116.5, 5.5) + ln([[44, 116.5], [50, 109], [58, 109], [61, 116.5]]) + ln([[50, 109], [53, 116.5], [58, 109]]) + ln([[48, 107], [52, 107]]) + ln([[58, 109], [60, 104], [63, 104]]);
          const F = {
            beehive: () => { let t = ln([[6, 122], [34, 122]]) + ln(Array.from({ length: 13 }, (_, i) => [20 - 12 * Math.cos((i / 12) * 3.1416), 121 - 20 * Math.sin((i / 12) * 3.1416)])); [106, 112, 117].forEach((y) => { const w = 12 * Math.sqrt(1 - ((121 - y) / 20) ** 2); t += ln([[20 - w, y], [20 + w, y]]); }); return t + el(20, 118, 2.5, 2) + ci(32, 94, 1.2) + ci(9, 98, 1.2); },
            windmill: () => { let t = ln([[12, 122], [16, 72], [24, 72], [28, 122]], true) + box(17, 110, 23, 122) + ci(20, 70, 2); for (let k = 0; k < 4; k++) { const a = 0.4 + k * 1.5708, b = a + 0.25; t += ln([[20, 70], [20 + Math.cos(a) * 18, 70 + Math.sin(a) * 18], [20 + Math.cos(b) * 16, 70 + Math.sin(b) * 16]], true); } return t; },
            tractor: () => ci(14, 112, 10) + ci(14, 112, 3) + ci(32, 116, 6) + ln([[6, 100], [6, 84], [20, 84], [22, 100]], true) + ln([[22, 100], [36, 100], [37, 110]]) + ln([[30, 100], [30, 92]]),
            swing: () => ln([[7, 122], [9, 70]]) + ln([[9, 77], [35, 73]]) + ci(17, 60, 14) + ln([[25, 76], [24, 104]]) + ln([[33, 74], [33, 104]]) + ln([[22, 104], [35, 104]]),
            laundry: () => ln([[4, 122], [4, 82]]) + ln([[36, 122], [36, 82]]) + ln([[4, 84], [20, 89], [36, 84]]) + ln([[9, 86], [15, 88], [15, 98], [9, 97]], true) + ln([[22, 89], [29, 88], [28, 95], [24, 94], [22, 99]], true),
            garden: () => [106, 113, 120].map((y) => ln([[3, y], [37, y]]) + [8, 16, 24, 32].map((x) => ln([[x - 2, y - 4], [x, y], [x + 2, y - 4]])).join("")).join(""),
            bakery: () => ln([[6, 122], [6, 80]]) + ln([[6, 82], [34, 82]]) + ln([[14, 82], [14, 88]]) + ln([[28, 82], [28, 88]]) + box(11, 88, 31, 102) + el(21, 95, 6, 3),
          };
          const PET = {
            cat: () => el(198, 115, 10, 5.5) + ci(211, 107, 5) + ln([[207, 104], [207, 98], [210, 102]]) + ln([[212, 102], [215, 98], [215, 104]]) + ln([[188, 114], [183, 106], [186, 100]]) + ln([[193, 120], [193, 122]]) + ln([[204, 120], [204, 122]]),
            dog: () => el(200, 112, 12, 6) + ci(214, 104, 5.5) + ln([[211, 100], [208, 109], [212, 108]]) + ln([[219, 103], [224, 106], [219, 108]]) + [192, 196, 205, 209].map((x) => ln([[x, 117], [x, 122]])).join("") + ln([[188, 110], [183, 103]]),
            chickens: () => el(200, 113, 9, 7) + ci(209, 103, 4) + ln([[207, 99], [208, 96], [210, 98], [212, 96], [212, 100]]) + ln([[213, 102], [217, 104], [213, 105]]) + ln([[191, 111], [187, 103], [193, 107]]) + ln([[197, 119], [197, 122]]) + ln([[202, 119], [202, 122]]),
            goat: () => el(200, 110, 11, 6) + ln([[210, 104], [216, 100], [220, 104], [214, 108]], true) + ln([[214, 101], [211, 94]]) + ln([[216, 100], [216, 93]]) + ln([[218, 106], [218, 111]]) + [192, 196, 204, 208].map((x) => ln([[x, 115], [x, 122]])).join("") + ln([[189, 107], [186, 103]]),
            sheep: () => [[192, 110, 5], [199, 106, 5.5], [206, 110, 5], [199, 113, 6], [192, 114, 4], [206, 114, 4]].map((c) => ci(...c)).join("") + el(214, 108, 4, 3, ' fill="currentColor"') + [194, 204].map((x) => ln([[x, 117], [x, 122]])).join(""),
          };
          if (h.feature && has("feat") && F[h.feature]) g += F[h.feature]();
          if (h.pet && has("pet") && PET[h.pet]) g += PET[h.pet]();
          return `<svg class="x-sketch" viewBox="0 0 240 140" role="img" aria-label="${T("Evin karakalem çizimi", "A pencil sketch of the house")}">` +
            `<filter id="${id}p"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="${h.id}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2"/></filter>` +
            `<filter id="${id}w"><feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="3" seed="${l.n}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="6"/><feGaussianBlur stdDeviation="0.8"/></filter>` +
            s + `<g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" filter="url(#${id}p)">${g}</g></svg>`;
        }

        // ---------- sound, confetti, bubble ----------
        // samples come from window.SND (one shared AudioContext); these small synth sounds are the fallback and route to its sfx bus
        const SND = window.SND;
        let actx = null;
        function tone(freq, start, len, type = "triangle", vol = 0.18) {
          try {
            const out = SND.out(); if (!out) return; actx = out.context;
            const o = actx.createOscillator(), g = actx.createGain(), t0 = actx.currentTime + start;
            o.type = type; o.frequency.value = freq; o.connect(g); g.connect(out);
            g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + len);
            o.start(t0); o.stop(t0 + len + 0.05);
          } catch (e) { /* audio unavailable */ }
        }
        const jingle = () => [1047, 1319, 1568, 2093].forEach((f, i) => tone(f, i * 0.09, 0.35));
        const buzz = () => { tone(220, 0, 0.25, "square", 0.08); tone(165, 0.18, 0.35, "square", 0.08); };
        const confetti = [];
        const confGeo = new THREE.PlaneGeometry(0.22, 0.14);
        function burst(x, y, z) {
          const cols = ["#ff006e", "#ffbe0b", "#3a86ff", "#8ac926", "#fb5607", "#8338ec", "#ffffff"];
          for (let i = 0; i < 60; i++) {
            const m = new THREE.Mesh(confGeo, new THREE.MeshBasicMaterial({ color: pick(cols), side: THREE.DoubleSide }));
            m.position.set(x, y, z); scene.add(m);
            const a = Math.random() * 6.283, s = 2 + Math.random() * 4;
            confetti.push({ m, vx: Math.cos(a) * s, vy: 5 + Math.random() * 5, vz: Math.sin(a) * s, life: 2.2, spin: Math.random() * 10 });
          }
        }
        // ---------- delivery moment: tiny tween helper, knock, owner, envelope, sprites ----------
        const tweens = [];
        const tw = (dur, fn, delay = 0, done) => tweens.push({ t: -delay, dur, fn, done });
        const eio = (k) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2), eo = (k) => 1 - (1 - k) ** 3;
        const cine = { w: 0, lock: false, pos: new THREE.Vector3(), look: new THREE.Vector3() };
        let busy = false;
        // ---------- game feel: time scale (hitstop), camera shake / FOV punch, landing squash; shake is off under reduced motion ----------
        const FX = { tsv: 1, slow: -1, slowD: 0.25, shA: 0, shT: 0, shD: 1, shH: 0, camS: 0, fovP: 0, land: 0, ff: 0, fov: 55,
          calm: (() => { try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } })() };
        try { matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => (FX.calm = e.matches)); } catch (e) {}
        // hitstop: time drops to 0.3 and eases back to 1 over d seconds of real time
        function hitstop(d = 0.25) { if (FX.calm) return; FX.slow = 0; FX.slowD = d; FX.tsv = 0.3; }
        function feelTS(rdt) {
          if (FX.slow >= 0) { FX.slow += rdt; const k = Math.min(1, FX.slow / FX.slowD); FX.tsv = 0.3 + 0.7 * k * k; if (k >= 1) { FX.slow = -1; FX.tsv = 1; } }
          return FX.tsv;
        }
        // shake: amplitude in world units, decays over d seconds; horiz = side to side only
        function camShake(a, d = 0.25, horiz = false) {
          if (FX.calm || FX.noShake) return;
          const cur = FX.shA * Math.max(0, 1 - FX.shT / FX.shD);
          if (a >= cur) { FX.shA = a; FX.shD = d; FX.shT = 0; FX.shH = horiz ? 1 : 0; }
        }
        const fovPunch = (deg) => { if (!FX.calm) FX.fovP = deg; };
        const perf = { low: false, auto: true, acc: 0, n: 0, win: 0 }; // performance mode (see the perf block near the loop)
        function thud(at) {
          try {
            const out = SND.out(); if (!out) return; actx = out.context;
            const o = actx.createOscillator(), g = actx.createGain(), t0 = actx.currentTime + at;
            o.frequency.setValueAtTime(190, t0); o.frequency.exponentialRampToValueAtTime(55, t0 + 0.12);
            g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.5, t0 + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
            o.connect(g); g.connect(out); o.start(t0); o.stop(t0 + 0.2);
          } catch (e) { /* audio unavailable */ }
        }
        const vib = (p) => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };
        function canvasTex(w, h, draw) {
          const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"));
          const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; return t;
        }
        let fxTex = null;
        function getFxTex() {
          if (fxTex) return fxTex;
          const heart = (col) => canvasTex(64, 64, (x) => {
            x.fillStyle = col; x.beginPath(); x.moveTo(32, 56);
            x.bezierCurveTo(4, 36, 4, 10, 20, 10); x.bezierCurveTo(28, 10, 32, 18, 32, 20);
            x.bezierCurveTo(32, 18, 36, 10, 44, 10); x.bezierCurveTo(60, 10, 60, 36, 32, 56); x.fill();
          });
          fxTex = {
            hearts: ["#ffafcc", "#ffc8dd", "#cdb4db", "#bde0fe", "#ffd6a5"].map(heart),
            coin: canvasTex(64, 64, (x) => {
              x.fillStyle = "#e0a526"; x.beginPath(); x.arc(32, 32, 28, 0, 7); x.fill();
              x.fillStyle = "#ffd166"; x.beginPath(); x.arc(32, 32, 21, 0, 7); x.fill();
              x.fillStyle = "#fff3c4"; x.fillRect(29, 20, 6, 24);
            }),
          };
          return fxTex;
        }
        function floatSprite(tex, x, y, z, sx, sy, rise, dur, delay = 0, drift = 0) {
          const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0xffffff, transparent: true, depthWrite: false, toneMapped: false, fog: false, premultipliedAlpha: false }));
          m.scale.set(sx, sy, 1); m.position.set(x, y, z); m.visible = false; scene.add(m);
          tw(dur, (k) => {
            m.visible = true; m.position.set(x + drift * k, y + rise * eo(k), z + drift * 0.6 * k);
            m.material.opacity = k < 0.6 ? 1 : 1 - (k - 0.6) / 0.4;
          }, delay, () => { scene.remove(m); m.material.dispose(); });
        }
        // ---------- 2D art pack: sprite-sheet FX (128px cells, laid out horizontally) ----------
        // dust is procedural (see dustSheet below); the image sheets are only used once fully decoded
        const SHEETS = { sparkle: ["art-sparkle", 12], coin: ["art-coin", 7], heart: ["art-heart", 8], confetti: ["art-confetti", 12], wrong: ["art-wrong", 12] };
        const sheetBase = {};
        // true only when a texture has real pixels behind it (a missing image renders as a black quad)
        function texOk(t) {
          const im = t && t.image;
          if (!im) return false;
          const w = im.naturalWidth || im.videoWidth || im.width || 0, h = im.naturalHeight || im.videoHeight || im.height || 0;
          if (im.tagName === "IMG" && !im.complete) return false;
          return w > 0 && h > 0;
        }
        function sheetTex(k) {
          if (sheetBase[k]) return sheetBase[k];
          if (!SHEETS[k]) return null;
          const img = document.getElementById(SHEETS[k][0]);
          if (!img || !img.complete || !img.naturalWidth || !img.naturalHeight) return null;
          // copy into a canvas so the GPU upload never sees an undecoded image
          let c;
          try {
            c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
            c.getContext("2d").drawImage(img, 0, 0);
          } catch (e) { return null; }
          const t = new THREE.CanvasTexture(c);
          t.encoding = THREE.sRGBEncoding; t.magFilter = THREE.LinearFilter; t.minFilter = THREE.LinearFilter; t.generateMipmaps = false;
          t.repeat.set(1 / SHEETS[k][1], 1); t.needsUpdate = true;
          return (sheetBase[k] = t);
        }
        // a texture of its own per sprite, so each can sit on its own frame
        function sheetFrameTex(k) {
          const base = sheetTex(k);
          if (!base || !texOk(base)) return null;
          const t = base.clone(); t.needsUpdate = true; return t;
        }

        // ---------- procedural dust: 8 frames x 128px, warm beige cloud expanding and thinning ----------
        const DUST_N = 8, DUST_PX = 128;
        const dustSheet = (() => {
          let seed = 7331;
          const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
          const sheet = document.createElement("canvas"); sheet.width = DUST_N * DUST_PX; sheet.height = DUST_PX;
          const x = sheet.getContext("2d");
          const cols = [[217, 196, 160], [207, 184, 145], [199, 174, 133], [191, 164, 122]];
          // one fixed set of blobs, so the frames read as the same cloud growing
          const blobs = [];
          for (let i = 0; i < 9; i++) {
            const a = rnd() * 6.283, d = i === 0 ? 0 : 0.12 + rnd() * 0.22;
            blobs.push({ ax: Math.cos(a) * d, ay: Math.sin(a) * d * 0.75 + 0.04, r: 0.16 + rnd() * 0.14, c: cols[Math.floor(rnd() * cols.length)], out: 0.6 + rnd() * 0.8 });
          }
          for (let f = 0; f < DUST_N; f++) {
            const k = f / (DUST_N - 1), ox = f * DUST_PX + DUST_PX / 2, oy = DUST_PX / 2;
            const grow = 0.55 + 0.45 * k, thin = Math.pow(1 - k, 1.3) * 0.85 + 0.08;
            for (const b of blobs) {
              const cx = ox + b.ax * DUST_PX * (0.8 + b.out * k * 0.6), cy = oy + b.ay * DUST_PX * (0.8 + b.out * k * 0.5) - k * 6;
              const r = Math.min(DUST_PX * 0.48, b.r * DUST_PX * grow * 1.15);
              const g = x.createRadialGradient(cx, cy, 0, cx, cy, r), [R, G, B] = b.c;
              g.addColorStop(0, `rgba(${R},${G},${B},${0.55 * thin})`);
              g.addColorStop(0.45, `rgba(${R},${G},${B},${0.32 * thin})`);
              g.addColorStop(1, `rgba(${R},${G},${B},0)`);
              x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, 6.283); x.fill();
            }
          }
          // grain: jitter alpha, and fade every frame to zero at its cell edges
          try {
            const id = x.getImageData(0, 0, sheet.width, sheet.height), d = id.data;
            for (let py = 0; py < DUST_PX; py++) for (let px = 0; px < sheet.width; px++) {
              const i = (py * sheet.width + px) * 4;
              if (!d[i + 3]) continue;
              const lx = (px % DUST_PX) / DUST_PX - 0.5, ly = py / DUST_PX - 0.5, e = Math.max(0, 1 - Math.pow(Math.hypot(lx, ly) * 2, 4));
              d[i + 3] = Math.max(0, Math.min(255, d[i + 3] * (0.78 + rnd() * 0.44) * e));
            }
            x.putImageData(id, 0, 0);
          } catch (e) {}
          // one texture per frame, so pooled sprites just swap maps
          const frames = [];
          for (let f = 0; f < DUST_N; f++) {
            const c = document.createElement("canvas"); c.width = c.height = DUST_PX;
            c.getContext("2d").drawImage(sheet, f * DUST_PX, 0, DUST_PX, DUST_PX, 0, 0, DUST_PX, DUST_PX);
            const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.generateMipmaps = false; t.minFilter = THREE.LinearFilter; t.magFilter = THREE.LinearFilter;
            frames.push(t);
          }
          return { sheet, frames };
        })();
        // pooled dust puffs (max 40), reused for every dust effect
        const DUST_MAX = 40, dustPool = [], dustLive = [];
        for (let i = 0; i < DUST_MAX; i++) {
          const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: dustSheet.frames[0], color: 0xffffff, transparent: true, depthWrite: false, toneMapped: false, fog: false, premultipliedAlpha: false, opacity: 0 }));
          s.visible = false; s.renderOrder = 4; s.frustumCulled = false; scene.add(s); dustPool.push(s);
        }
        // spawn one puff: o = { vx, vy, vz, s0, s1, life, op }
        function dustPuff(x, y, z, o = {}) {
          if (perf.low && Math.random() < 0.5) return;
          let s = dustPool.pop();
          if (!s) { const old = dustLive.shift(); if (!old) return; s = old.s; }
          const life = o.life || 0.6 + Math.random() * 0.3;
          s.position.set(x, y, z); s.material.rotation = Math.random() * 6.283; s.material.map = dustSheet.frames[0];
          s.material.opacity = 0; s.visible = false;
          dustLive.push({ s, vx: o.vx || 0, vy: o.vy || 0, vz: o.vz || 0, age: 0, life, s0: o.s0 || 0.3, s1: o.s1 || 1.0, op: o.op != null ? o.op : 0.55, rs: (Math.random() - 0.5) * 1.2 });
        }
        function updateDust(dt) {
          for (let i = dustLive.length - 1; i >= 0; i--) {
            const p = dustLive[i]; p.age += dt;
            const k = p.age / p.life;
            if (k >= 1) { p.s.visible = false; p.s.material.opacity = 0; dustPool.push(p.s); dustLive.splice(i, 1); continue; }
            // light dirt: drifts, slows quickly, barely rises
            const drag = Math.exp(-3.2 * dt);
            p.vx *= drag; p.vz *= drag; p.vy *= Math.exp(-2 * dt);
            p.s.position.x += p.vx * dt; p.s.position.y += p.vy * dt; p.s.position.z += p.vz * dt;
            const sz = p.s0 + (p.s1 - p.s0) * (1 - Math.pow(1 - k, 2));
            p.s.scale.set(sz, sz, 1);
            p.s.material.rotation += p.rs * dt;
            p.s.material.map = dustSheet.frames[Math.min(DUST_N - 1, Math.floor(k * DUST_N))];
            p.s.material.opacity = p.op * (k < 0.12 ? k / 0.12 : 1 - (k - 0.12) / 0.88);
            p.s.visible = texOk(p.s.material.map);
          }
        }
        // a ring of puffs on the ground, for kicks, braking and stopping
        function dustBurst(x, y, z, n, bx, bz, size = 1) {
          for (let i = 0; i < n; i++) {
            const a = Math.random() * 6.283, sp = 0.4 + Math.random() * 0.9;
            dustPuff(x + (Math.random() - 0.5) * 0.25, y, z + (Math.random() - 0.5) * 0.25, {
              vx: bx + Math.cos(a) * sp, vy: 0.25 + Math.random() * 0.35, vz: bz + Math.sin(a) * sp,
              s0: 0.35 * size, s1: (1.0 + Math.random() * 0.4) * size, life: 0.7 + Math.random() * 0.3, op: 0.5,
            });
          }
        }
        // safety net: never draw a sprite whose texture has no pixels
        let spriteCheckT = 0;
        function hideBrokenSprites(dt) {
          spriteCheckT -= dt;
          if (spriteCheckT > 0) return;
          spriteCheckT = 0.5;
          scene.traverse((o) => { if (o.isSprite && o.visible && o.material && o.material.map && !texOk(o.material.map)) o.visible = false; });
        }
        const fxAnims = [];
        // plays a sheet once (or looped) as a billboard; hold = how long the last frame stays; returns false when the image is missing
        function playFx(k, pos, size, fps = 20, o = {}) {
          const tex = sheetFrameTex(k);
          if (!tex) return false;
          const n = SHEETS[k][1], s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0xffffff, transparent: true, depthWrite: false, toneMapped: false, fog: false, premultipliedAlpha: false }));
          s.scale.set(size, size, 1); s.position.copy(pos); s.visible = false; s.renderOrder = 5; scene.add(s);
          if (o.opacity != null) s.material.opacity = o.opacity;
          fxAnims.push({ s, tex, n, fps, t: -(o.delay || 0), hold: o.hold != null ? o.hold : 1 / fps, rise: o.rise || 0, y0: pos.y, fade: !!o.fade, op: s.material.opacity });
          return true;
        }
        function updateFx(dt) {
          for (let i = fxAnims.length - 1; i >= 0; i--) {
            const a = fxAnims[i]; a.t += dt;
            if (a.t < 0) continue;
            const end = (a.n - 1) / a.fps + a.hold;
            if (a.t >= end) { scene.remove(a.s); a.s.material.dispose(); a.tex.dispose(); fxAnims.splice(i, 1); continue; }
            a.s.visible = texOk(a.tex);
            a.tex.offset.x = Math.min(a.n - 1, Math.floor(a.t * a.fps)) / a.n;
            if (a.rise) a.s.position.y = a.y0 + a.rise * eo(a.t / end);
            if (a.fade) a.s.material.opacity = a.op * Math.max(0, 1 - a.t / end);
          }
        }
        // where the rear wheel touches the ground, on the ground
        const _rw = new THREE.Vector3();
        function rearContact() {
          scooter.wheels[0].getWorldPosition(_rw);
          _rw.y = groundY(_rw.x, _rw.z) + 0.05;
          return _rw;
        }
        // a bigger burst behind the rear wheel on each scooter kick
        function kickDust() {
          const p = rearContact(), h = player.heading, bx = -Math.sin(h), bz = -Math.cos(h);
          dustBurst(p.x, p.y, p.z, 4, bx * 0.8, bz * 0.8, 0.9);
          // and a small one where the foot pushes off
          const f = player.kk && player.kk.footR;
          if (f) { const q = f.getWorldPosition(new THREE.Vector3()); dustBurst(q.x, groundY(q.x, q.z) + 0.05, q.z, 2, bx * 0.5, bz * 0.5, 0.6); }
        }
        // dust at the postman's feet while running, a trail behind the scooter's rear wheel while riding
        let dustT = 0, wasRun = false, prevV = 0, prevH = 0, hardT = 0;
        function runDust(dt) {
          hideBrokenSprites(dt); updateDust(dt);
          if (!game.started || cine.lock || dt <= 0) { wasRun = false; prevV = 0; return; }
          const h = player.heading, bx = -Math.sin(h), bz = -Math.cos(h);
          if (scooter.riding) {
            wasRun = false;
            const v = scooter.hop ? 0 : scooter.v;
            let dh = h - prevH; while (dh > Math.PI) dh -= 6.283; while (dh < -Math.PI) dh += 6.283;
            const turnRate = Math.abs(dh) / dt, decel = (prevV - v) / dt;
            prevV = v; prevH = h; hardT = Math.max(0, hardT - dt);
            if (v < 0.8) { dustT = 0; return; }
            const p = rearContact(), k = Math.min(1, v / 16);
            // hard turn or braking: a bigger burst, at most every 0.25 s
            if (hardT <= 0 && ((turnRate > 2.6 && v > 3) || (decel > 4 && v > 1.5))) {
              hardT = 0.25; dustBurst(p.x, p.y, p.z, 3, bx * v * 0.15, bz * v * 0.15, 0.8 + k * 0.4);
            }
            // steady trail, denser and bigger with speed
            dustT -= dt;
            if (dustT <= 0) {
              dustT = 0.15 - 0.07 * k + Math.random() * 0.02;
              const side = (Math.random() - 0.5) * 0.5, back = 0.6 + v * 0.12;
              dustPuff(p.x + bz * side * 0.3, p.y, p.z - bx * side * 0.3, {
                vx: bx * back + bz * side, vy: 0.18 + Math.random() * 0.22, vz: bz * back - bx * side,
                s0: 0.3, s1: 0.7 + 0.3 * k + Math.random() * 0.2, life: 0.6 + Math.random() * 0.3, op: 0.4 + 0.15 * k,
              });
            }
            return;
          }
          prevV = 0; prevH = h;
          const fx = player.pos.x + bx * 0.35, fz = player.pos.z + bz * 0.35, fy = groundY(fx, fz) + 0.05;
          if (player.speed > 7) {
            dustT -= dt;
            if (dustT <= 0) { dustT = 0.3; dustPuff(fx, fy, fz, { vx: bx * 0.6, vy: 0.3, vz: bz * 0.6, s0: 0.35, s1: 0.9, op: 0.45 }); }
            wasRun = true;
          } else {
            dustT = 0;
            if (wasRun && player.speed < 2) { wasRun = false; dustBurst(fx, fy, fz, 4, 0, 0, 0.8); }
          }
        }
        function confettiFx(p, delay = 0) {
          return playFx("confetti", p, 2.4, 20, { delay });
        }
        function heartBurst(p, gain, door) {
          const fx = getFxTex();
          // art pack: coin pop at the door, heart pop above the villager, confetti; else the drawn hearts and coins
          const art = sheetTex("coin") && sheetTex("heart");
          if (art) {
            playFx("coin", door || p, 1.1, 20, { hold: 0.1, rise: 0.25 });
            playFx("heart", new THREE.Vector3(p.x, p.y + 0.5, p.z), 1.2, 20, { hold: 0.15, delay: 0.1, rise: 0.4 });
            confettiFx(new THREE.Vector3(p.x, p.y + 0.3, p.z), 0.05);
          }
          for (let i = 0; i < (art ? 0 : 16); i++) {
            const coin = i % 3 === 0, s = coin ? 0.38 : 0.3 + Math.random() * 0.2;
            floatSprite(coin ? fx.coin : pick(fx.hearts), p.x + rr(-0.7, 0.7), p.y + rr(-0.2, 0.4), p.z + rr(-0.7, 0.7), s, s, rr(1.6, 2.8), rr(1.1, 1.6), i * 0.03, rr(-0.6, 0.6));
          }
          const txt = canvasTex(256, 128, (x) => {
            x.font = "600 84px Geist, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle";
            x.lineWidth = 12; x.strokeStyle = "#5a3e2b"; x.strokeText("+" + gain, 128, 66);
            x.fillStyle = "#ffd166"; x.fillText("+" + gain, 128, 66);
          });
          floatSprite(txt, p.x, p.y + 0.9, p.z, 1.3, 0.65, 1.4, 1.8, 0, 0);
          setTimeout(() => txt.dispose(), 2200);
        }
        function cloudPuff(p) {
          for (let i = 0; i < 6; i++) {
            const m = new THREE.Mesh(CG.sphere, new THREE.MeshBasicMaterial({ color: "#efe3cf", transparent: true, depthWrite: false, toneMapped: false, fog: false }));
            const a = (i / 6) * 6.283, ox = Math.cos(a) * 0.35, oz = Math.sin(a) * 0.35;
            m.position.copy(p); scene.add(m);
            tw(0.9, (k) => {
              m.scale.setScalar(0.18 + eo(k) * 0.32); m.material.opacity = 0.9 * (1 - k);
              m.position.set(p.x + ox * (0.5 + k), p.y + k * 0.6, p.z + oz * (0.5 + k));
            }, i * 0.03, () => { scene.remove(m); m.material.dispose(); });
          }
        }
        function ownerOf(h) {
          if (!h.owner || !h.owner.kk) {
            let k = null;
            const c = V_CAST[h.id] || ["V_Farmer_M"];
            try { k = vSpawn(c[0], c[1], c[2]); } catch (e) { console.warn("[villagers] owner fallback:", e); }
            if (k) {
              const prev = h.owner, g = new THREE.Group(), body = new THREE.Group(); g.add(body); body.add(k.hold); h.owner = { g, body, armL: new THREE.Object3D(), armR: k.armR, kk: k };
              // upgrading a procedural stand-in: take over its place, schedule and scene slot
              if (prev) { g.position.copy(prev.g.position); g.rotation.y = prev.g.rotation.y; if (prev.sch) h.owner.sch = prev.sch; if (prev.g.parent) { scene.remove(prev.g); scene.add(g); } }
            }
          }
          if (!h.owner) {
            h.owner = makePerson({ shirt: h.body, pants: "#7d8aa6", skin: ["#ffe0c7", "#f6c9a0", "#e8b48a", "#d39a6e"][h.id % 4], hair: ["#5a3e2b", "#e8ddd0", "#8a5a3c", "#3d2c24"][h.id % 4], style: ["bun", "hat", "cap", "tail", "buns"][h.id % 5], hat: h.roof, band: h.body });
          }
          return h.owner;
        }
        // knock, then the owner opens the door; returns the owner and the door spot
        function knockAndOpen(h, popAt, greet = "Wave") {
          const o = ownerOf(h), [dx, dz] = wpos(h, 0, h.d / 2 + 0.45), gy = groundY(dx, dz);
          o.lock = true; o.g.visible = true;
          let a0 = player.heading, a1 = h.rot + Math.PI, da = a1 - a0;
          while (da > Math.PI) da -= 6.283; while (da < -Math.PI) da += 6.283;
          tw(0.2, (k) => (player.heading = a0 + da * eio(k)));
          player.act("Interact");
          [0.22, 0.42].forEach((d) => { if (!player.kk) tw(0.16, (k) => (pm.body.position.z = Math.sin(k * Math.PI) * 0.22), d); });
          if (!SND.sfx("sfx_door_knock", { delay: 0.28, rate: 0.95 + Math.random() * 0.1 })) [0.29, 0.49].forEach(thud);
          Object.assign(o.body.position, { x: 0, y: 0, z: 0 }); o.body.rotation.set(0, 0, 0);
          o.armL.rotation.set(0, 0, -0.28); o.armR.rotation.set(0, 0, 0.28);
          o.g.position.set(dx, gy, dz); o.g.rotation.y = h.rot; o.g.scale.setScalar(0.001);
          tw(0.45, (k) => {
            if (!o.g.parent) scene.add(o.g);
            const s = k < 0.45 ? lerp(0.6, 1.15, eo(k / 0.45)) : lerp(1.15, 1, eio((k - 0.45) / 0.55)), xz = 1 / Math.sqrt(s);
            o.g.scale.set(xz, s, xz);
          }, popAt);
          if (o.kk) tw(0, () => o.kk.once(greet), popAt);
          return { o, gy, d: new THREE.Vector3(dx, gy, dz) };
        }
        function closeDoor(o, at, extra) {
          tw(0.25, (k) => o.g.scale.setScalar(Math.max(0.001, 1 - eio(k))), at, () => { scene.remove(o.g); o.g.scale.setScalar(1); o.lock = false; if (extra) extra(); busy = false; });
        }
        // ---------- delivery juice: face bubbles (drawn, so identical on every device), trail sparks, coins to the HUD, vignette ----------
        const faceTexs = {};
        function star5(x, cx, cy, r) { x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, q = i % 2 ? r * 0.45 : r; x.lineTo(cx + Math.cos(a) * q, cy + Math.sin(a) * q); } x.closePath(); }
        function heart(x, cx, cy, r) { x.beginPath(); x.moveTo(cx, cy + r * 0.9); x.bezierCurveTo(cx - r * 1.4, cy - r * 0.1, cx - r * 0.7, cy - r * 1.1, cx, cy - r * 0.35); x.bezierCurveTo(cx + r * 0.7, cy - r * 1.1, cx + r * 1.4, cy - r * 0.1, cx, cy + r * 0.9); x.closePath(); }
        // mood 1 = smile, 2 = heart eyes, 3 = star eyes, 0 = a question mark (wrong door)
        function faceTex(m) {
          if (faceTexs[m]) return faceTexs[m];
          return (faceTexs[m] = canvasTex(128, 128, (x) => {
            x.lineJoin = "round"; x.lineCap = "round";
            // speech bubble with a little tail
            x.fillStyle = "#fffaf0"; x.strokeStyle = "#5a3e2b"; x.lineWidth = 5;
            x.beginPath(); x.moveTo(50, 96); x.lineTo(60, 122); x.lineTo(76, 96); x.closePath(); x.fill(); x.stroke();
            x.beginPath(); x.arc(64, 56, 47, 0, 6.283); x.fill(); x.stroke();
            x.beginPath(); x.moveTo(53, 95); x.lineTo(73, 95); x.lineTo(61, 112); x.closePath(); x.fill();
            if (!m) {
              x.fillStyle = "#c2410c"; x.font = "700 70px Georgia, serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("?", 64, 60);
              return;
            }
            x.fillStyle = "#ffd166"; x.strokeStyle = "#b7791f"; x.lineWidth = 3;
            x.beginPath(); x.arc(64, 56, 34, 0, 6.283); x.fill(); x.stroke();
            x.fillStyle = "rgba(255,120,140,0.55)"; x.beginPath(); x.arc(44, 66, 6, 0, 6.283); x.arc(84, 66, 6, 0, 6.283); x.fill();
            if (m === 1) { x.strokeStyle = "#5a3e2b"; x.lineWidth = 4; [50, 78].forEach((ex) => { x.beginPath(); x.arc(ex, 52, 6, Math.PI * 1.1, Math.PI * 1.9); x.stroke(); }); }
            else if (m === 2) { x.fillStyle = "#e63946"; heart(x, 50, 50, 8); x.fill(); heart(x, 78, 50, 8); x.fill(); }
            else { x.fillStyle = "#f59e0b"; x.strokeStyle = "#b45309"; x.lineWidth = 1.5; star5(x, 50, 50, 10); x.fill(); x.stroke(); star5(x, 78, 50, 10); x.fill(); x.stroke(); }
            x.strokeStyle = "#5a3e2b"; x.lineWidth = 4; x.beginPath(); x.arc(64, 62, m === 3 ? 14 : 11, Math.PI * 0.15, Math.PI * 0.85); x.stroke();
            if (m === 3) { x.fillStyle = "#8b2e2e"; x.beginPath(); x.arc(64, 62, 13, Math.PI * 0.18, Math.PI * 0.82); x.closePath(); x.fill(); }
          }));
        }
        // a bubble sprite over someone's head: pops in, bobs, fades; follows obj when given
        function popBubble(tex, pos, obj, dur = 1.25, size = 0.95) {
          const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false, toneMapped: false, fog: false }));
          m.renderOrder = 20; scene.add(m);
          const base = pos.clone();
          const side = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0).setY(0).normalize().multiplyScalar(size * 0.95);
          tw(dur, (k) => {
            if (obj) base.set(obj.position.x, obj.position.y + 2.85, obj.position.z);
            const s = k < 0.14 ? lerp(0.2, 1.18, eo(k / 0.14)) : k < 0.26 ? lerp(1.18, 1, (k - 0.14) / 0.12) : 1;
            m.scale.set(size * s, size * s, 1);
            m.position.set(base.x + side.x, base.y + Math.sin(k * 9) * 0.04 + k * 0.15, base.z + side.z);
            m.material.opacity = k > 0.78 ? 1 - (k - 0.78) / 0.22 : 1;
          }, 0, () => { scene.remove(m); m.material.dispose(); });
        }
        // little warm sparks left behind a flying envelope (round glows, pooled)
        let sparkTex = null;
        const sparks = [];
        function spark(p, col) {
          if (perf.low && Math.random() < 0.5) return;
          sparkTex = sparkTex || canvasTex(32, 32, (x) => { const g = x.createRadialGradient(16, 16, 0, 16, 16, 16); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.35, "rgba(255,236,170,0.9)"); g.addColorStop(1, "rgba(255,200,90,0)"); x.fillStyle = g; x.fillRect(0, 0, 32, 32); });
          let s = sparks.find((q) => q.life <= 0);
          if (!s) {
            if (sparks.length >= 40) return;
            s = { m: new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkTex, transparent: true, depthWrite: false, toneMapped: false, fog: false, blending: THREE.AdditiveBlending })), life: 0 };
            scene.add(s.m); sparks.push(s);
          }
          s.m.visible = true; s.m.position.copy(p); s.life = s.max = 0.35 + Math.random() * 0.2;
          s.vx = (Math.random() - 0.5) * 0.6; s.vy = 0.4 + Math.random() * 0.5; s.vz = (Math.random() - 0.5) * 0.6; s.sz = 0.22 + Math.random() * 0.14;
          s.m.material.color.set(col || 0xffffff);
        }
        anims.push((t, dt) => {
          for (const s of sparks) {
            if (s.life <= 0) continue;
            s.life -= dt; if (s.life <= 0) { s.m.visible = false; continue; }
            const k = s.life / s.max;
            s.m.position.x += s.vx * dt; s.m.position.y += s.vy * dt; s.m.position.z += s.vz * dt;
            s.m.scale.setScalar(s.sz * (0.4 + 0.6 * k)); s.m.material.opacity = k;
          }
        });
        const trail = (env) => { env.userData.tr = (env.userData.tr || 0) + 1; if (env.userData.tr % 2 === 0) spark(env.position); };
        // HUD coin counter: coins fly from the door to the counter, which counts up as each one lands
        const coinUI = { hold: 0 };
        function coinShow(v) { if (performance.now() < coinUI.hold) return; const el = $("coins"); if (el.textContent !== String(v)) el.textContent = v; }
        function flyCoins(world, gain) {
          const el = $("coins"), chip = el.parentNode, base = Math.max(0, S.coins - gain);
          if (!game.started || $("hud").hidden || !gain) { coinUI.hold = 0; coinShow(S.coins); return; }
          const r = el.getBoundingClientRect(), tx = r.left + r.width / 2 - 14, ty = r.top + r.height / 2;
          proj.copy(world).project(camera);
          const sx = ((proj.x + 1) / 2) * innerWidth, sy = ((1 - proj.y) / 2) * innerHeight;
          const n = Math.min(8, Math.max(3, Math.round(gain / 4))), calm = FX.calm || !el.animate;
          coinUI.hold = performance.now() + 2500; el.textContent = base;
          let landed = 0;
          const land = (i) => {
            landed++;
            el.textContent = Math.min(S.coins, base + Math.round((gain * landed) / n));
            if (i % 2 === 0 || landed === n) SND.sfx("sfx_coin", { vol: 0.28, rate: 0.96 + landed * 0.05 });
            chip.classList.remove("x-coinbump"); void chip.offsetWidth; chip.classList.add("x-coinbump");
            if (landed === n) { coinUI.hold = 0; coinShow(S.coins); }
          };
          for (let i = 0; i < n; i++) {
            if (calm) { setTimeout(() => land(i), 150 + i * 60); continue; }
            const c = document.createElement("i"); c.className = "x-flycoin"; c.setAttribute("aria-hidden", "true");
            root.append(c);
            const jx = sx + (Math.random() - 0.5) * 60, jy = sy + (Math.random() - 0.5) * 30, mx = (jx + tx) / 2 + (Math.random() - 0.5) * 80, my = Math.min(jy, ty) - 60 - Math.random() * 60;
            const a = c.animate([
              { transform: `translate(${sx}px, ${sy}px) scale(0.3)`, opacity: 0 },
              { transform: `translate(${jx}px, ${jy - 30}px) scale(1.15)`, opacity: 1, offset: 0.22 },
              { transform: `translate(${mx}px, ${my}px) scale(1)`, opacity: 1, offset: 0.6 },
              { transform: `translate(${tx}px, ${ty}px) scale(0.55)`, opacity: 0.9 },
            ], { duration: 720, delay: 60 + i * 65, easing: "cubic-bezier(0.45, 0, 0.7, 1)", fill: "both" });
            a.onfinish = () => { c.remove(); land(i); };
          }
          setTimeout(() => { if (performance.now() >= coinUI.hold - 50) { coinUI.hold = 0; coinShow(S.coins); } }, 2600);
        }
        function vigPulse(cold) { const v = $("vig"); if (!v) return; v.classList.remove("is-on", "is-cold"); void v.offsetWidth; v.classList.toggle("is-cold", !!cold); v.classList.add("is-on"); }
        // the shared payoff of a correct delivery: hitstop, punch, hearts and coins, the face bubble, sting, vibration
        function payoff(head, door, gain, follow) {
          hitstop(0.25); camShake(0.045, 0.16); fovPunch(-2.5);
          heartBurst(head, gain, door);
          popBubble(faceTex(FX.mood || 2), head, follow);
          flyCoins(door, gain); vigPulse();
          if (!SND.jingle(++deliveries % 2 ? "jingle_delivery_success" : "jingle_delivery_success_alt")) [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.45, "sine", 0.16));
          vib([20, 40, 20]);
        }
        // the whole moment can be cut short by moving: tweens run fast to their end and control comes back at once
        function momentStart() { FX.mom = { t0: performance.now(), rel: false }; FX.ff = 0; }
        function skipMoment() { FX.mom = null; FX.ff = 7; FX.slow = -1; FX.tsv = 1; cine.lock = false; }
        let deliveries = 0;
        function happyDelivery(h, gain) {
          // whole moment: 1.6 s (knock 0.25, door 0.35, envelope 0.45-0.9, payoff 0.9, door shut by 1.6); moving skips it
          busy = cine.lock = true; momentStart();
          const { o, gy, d } = knockAndOpen(h, 0.35), r = h.rot, nx = Math.sin(r), nz = Math.cos(r);
          cine.pos.set(d.x + nx * 4.6 + nz * 2.8, gy + 2.3, d.z + nz * 4.6 - nx * 2.8);
          cine.look.set(d.x + nx * 0.6, gy + 1.3, d.z + nz * 0.6);
          tw(0.35, (k) => (cine.w = Math.max(cine.w, eio(k))));
          // envelope: bag -> owner's hand, arcing and spinning, leaving warm sparks
          const env = new THREE.Group();
          tpart(CG.sphere, "#fff8ec", env, 0, 0, 0, 0.2, 0.015, 0.14);
          tpart(CG.sphere, "#e4572e", env, 0, 0.012, 0, 0.04, 0.012, 0.04).castShadow = false;
          const from = new THREE.Vector3(), to = new THREE.Vector3(), hand = o.kk ? new THREE.Vector3() : new THREE.Vector3(0, -0.42, 0.12);
          tw(0.45, (k) => {
            if (!env.parent) { const L = player.kk && player.kk.letter; scene.add(env); (L && L.visible ? L : player.bag).getWorldPosition(from); if (L) L.visible = false; SND.sfx("sfx_toss_whoosh", { vol: 0.25, rate: 1.15 }); }
            o.armR.localToWorld(to.copy(hand));
            env.position.lerpVectors(from, to, eio(k)); env.position.y += Math.sin(k * Math.PI) * 1.3;
            env.rotation.set(k * 6.283 * 0.25, k * 6.283 * 2, 0);
            trail(env);
          }, 0.45, () => { o.armR.attach(env); env.position.copy(hand); env.rotation.set(0.3, 0, 0); });
          // the payoff: hitstop, hearts, coins to the HUD, face bubble, vignette, sting
          tw(0, () => {
            payoff(new THREE.Vector3(d.x, gy + 2.1, d.z), new THREE.Vector3(d.x + nx * 0.7, gy + 1.2, d.z + nz * 0.7), gain, o.g);
            player.act("Cheer");
            if (o.kk) o.kk.once("Cheer");
          }, 0.9);
          // two happy hops with arms up
          tw(0.5, (k) => {
            const p = (k * 2) % 1, up = Math.min(1, k * 5);
            o.g.position.y = gy + Math.sin(p * Math.PI) * 0.4;
            o.body.scale.set(1 + Math.sin(p * Math.PI * 2) * 0.05, 1 - Math.sin(p * Math.PI * 2) * 0.08, 1);
            o.armL.rotation.z = -lerp(0.28, 2.7, up); o.armR.rotation.z = lerp(0.28, 2.7, up);
          }, 0.92, () => { o.g.position.y = gy; o.body.scale.set(1, 1, 1); });
          tw(0.35, (k) => (cine.w = Math.min(cine.w, 1 - eio(k))), 1.22, () => (cine.lock = false));
          closeDoor(o, 1.35, () => o.armR.remove(env));
        }
        function grumpyDoor(h) {
          busy = cine.lock = true; momentStart();
          const { o, gy, d } = knockAndOpen(h, 0.35, "Talk");
          tw(0, () => (cine.lock = false), 0.4);
          // a head shake (no "No" clip on the villagers, so the whole upper body turns side to side)
          tw(0.6, (k) => {
            const w = Math.sin(k * Math.PI * 6) * (1 - k);
            o.body.rotation.y = w * 0.38; o.body.position.x = w * 0.05;
          }, 0.6, () => { o.body.rotation.y = 0; o.body.position.x = 0; });
          tw(0, () => {
            popBubble(faceTex(0), new THREE.Vector3(d.x, gy + 3.05, d.z), o.g, 1.1, 0.85);
            if (!playFx("wrong", new THREE.Vector3(d.x + Math.sin(h.rot) * 0.5, gy + 1.9, d.z + Math.cos(h.rot) * 0.5), 1.4, 20)) cloudPuff(new THREE.Vector3(d.x, gy + 2.5, d.z));
            if (!SND.jingle("jingle_wrong_house")) { tone(196, 0, 0.28, "triangle", 0.16); tone(139, 0.22, 0.4, "triangle", 0.16); }
            thud(0); camShake(0.06, 0.28, true); vigPulse(true);
            vib(60);
          }, 0.6);
          closeDoor(o, 1.35);
        }
        const bubbleEl = document.getElementById("bubble");
        const bubble = { pos: new THREE.Vector3(), until: 0, follow: null };
        // speech pitch per villager: women higher, elders lower, a small personal offset
        const voiceOf = (cast, k = 0) => (/Grandma/.test(cast) ? 1.04 : /Elder/.test(cast) ? 0.8 : /_F$/.test(cast) ? 1.2 : 0.95) * (1 + ((k * 37) % 7 - 3) * 0.015);
        const ownerVoice = (h) => voiceOf((V_CAST[h.id] || ["V_Farmer_M"])[0], h.id);
        const CPS = 38; // typed characters per second
        function say(name, text, pos, follow, secs = 4, voice = 1) {
          bubbleEl.innerHTML = "";
          const b = document.createElement("b"); b.textContent = name;
          const tn = document.createTextNode("");
          bubbleEl.append(b, tn);
          bubble.type = { tn, text, i: 0, t0: performance.now(), voice, next: 1 };
          bubble.pos.copy(pos); bubble.follow = follow || null; bubble.until = performance.now() + (secs + text.length / CPS) * 1000;
          if (isShort()) bubble.until = Math.min(bubble.until, performance.now() + Math.max(3000, (text.length / CPS) * 1000 + 1500)); // fix1106b: phones: short-lived
          bubbleEl.hidden = false;
        }
        // type the bubble out, with a chatter blip every 2 to 3 letters
        function typeBubble() {
          const ty = bubble.type;
          if (!ty || ty.i >= ty.text.length) return;
          const n = Math.min(ty.text.length, Math.floor(((performance.now() - ty.t0) / 1000) * CPS));
          if (n <= ty.i) return;
          for (let j = ty.i; j < n; j++) {
            if (/\s/.test(ty.text[j])) continue;
            if (--ty.next <= 0) { SND.blip(ty.voice); ty.next = 2 + (Math.random() < 0.5 ? 1 : 0); }
          }
          ty.i = n; ty.tn.nodeValue = ty.text.slice(0, n);
        }
        const proj = new THREE.Vector3();
        function placeBubble() {
          if (bubbleEl.hidden) return;
          if (performance.now() > bubble.until) { bubbleEl.hidden = true; return; }
          typeBubble();
          if (bubble.follow) bubble.pos.set(bubble.follow.position.x, bubble.follow.position.y + 3, bubble.follow.position.z);
          proj.copy(bubble.pos).project(camera);
          if (proj.z > 1) { bubbleEl.style.visibility = "hidden"; return; }
          bubbleEl.style.visibility = "";
          bubble.sx = ((proj.x + 1) / 2) * innerWidth; bubble.sy = ((1 - proj.y) / 2) * innerHeight - 8;
          if (isShort()) return; // fix1106b: safeLayout() places it
          bubbleEl.style.left = bubble.sx + "px";
          bubbleEl.style.top = bubble.sy + "px";
        }
        // ---------- fix1106b: safe spots for bubbles on short screens (phones in landscape, at most 500 px tall) ----------
        // tutorial strip and toasts go top-centre, villager lines stay near the speaker; each is moved to the nearest spot that
        // overlaps no HUD part, button, joystick zone or other bubble (rects re-read every frame), and hidden when none is free.
        function isShort() { return innerHeight <= 500; }
        const safeProbe = document.createElement("div"); safeProbe.className = "x-safeprobe"; safeProbe.setAttribute("aria-hidden", "true"); document.body.append(safeProbe);
        const SAFE_UI = ["#hud .x-bar", "#mailchip", "#combochip", "#tipchip", "#bikechip", "#dogchip", "#shopchip", "#notechip", "#notes", "#minimap", "#maptoggle", "#sndbtn", "#sndpanel", "#act", "#joy", "#intro-skip", "#lv-paper", "#prompt", ".x-hint", "#bgxBack", "#bgxFs"];
        const SAFE = { was: false };
        function safeIns() { const r = safeProbe.getBoundingClientRect(); return { l: r.left, t: r.top, r: innerWidth - r.right, b: innerHeight - r.bottom }; }
        function shownRect(el) {
          if (!el || el.hidden) return null;
          const cs = getComputedStyle(el); if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return null;
          const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 ? r : null;
        }
        function uiRects() {
          const out = [], m = 6;
          for (const s of SAFE_UI) for (const el of document.querySelectorAll(s)) { const r = shownRect(el); if (r) out.push({ l: r.left - m, t: r.top - m, r: r.right + m, b: r.bottom + m }); }
          if (document.body.classList.contains("is-touch")) {
            const W = innerWidth, H = innerHeight, ins = safeIns();
            out.push({ l: 0, t: H * 0.45, r: Math.min(W * 0.36, 300), b: H }); // joystick: where the left thumb lands
            out.push({ l: W - ins.r - 24 - 64 - 14, t: H - ins.b - 28 - 64 - 14, r: W, b: H }); // the Al / Teslim button, even while it is hidden
          }
          return out;
        }
        function freeSpot(w, h, px, py, obs, B) {
          if (w > B.r - B.l || h > B.b - B.t) return null;
          const hit = (x, y) => { for (const o of obs) if (x < o.r && x + w > o.l && y < o.b && y + h > o.t) return true; return false; };
          const x0 = Math.max(B.l, Math.min(B.r - w, px)), y0 = Math.max(B.t, Math.min(B.b - h, py));
          if (!hit(x0, y0)) return [x0, y0];
          let best = null, bd = Infinity;
          for (let y = B.t; y <= B.b - h + 0.5; y += 6) for (let x = B.l; x <= B.r - w + 0.5; x += 8) {
            const d = (x - x0) * (x - x0) + 2 * (y - y0) * (y - y0);
            if (d < bd && !hit(x, y)) { bd = d; best = [x, y]; }
          }
          return best;
        }
        function safeLayout() {
          const tut = document.getElementById("tut"), sp = document.getElementById("starpop"), els = [tut, toastEl, sp, bubbleEl];
          if (!isShort()) {
            if (SAFE.was) { SAFE.was = false; for (const e of els) { e.style.left = e.style.top = ""; e.classList.remove("x-nospot"); } placeTut(); }
            return;
          }
          SAFE.was = true;
          const W = innerWidth, H = innerHeight, ins = safeIns(), bar = document.body.classList.contains("x-intro-on") ? H * 0.09 : 0;
          const B = { l: ins.l + 6, t: Math.max(ins.t, bar) + 6, r: W - ins.r - 6, b: H - Math.max(ins.b, bar) - 6 };
          const obs = uiRects();
          const put = (el, fx, fy) => {
            const w = el.offsetWidth, h = el.offsetHeight, p = freeSpot(w, h, fx(w, h), fy(w, h), obs, B);
            el.classList.toggle("x-nospot", !p);
            if (!p) return;
            el.style.left = Math.round(p[0]) + "px"; el.style.top = Math.round(p[1]) + "px";
            obs.push({ l: p[0] - 4, t: p[1] - 4, r: p[0] + w + 4, b: p[1] + h + 4 });
          };
          if (!tut.hidden) put(tut, (w) => W / 2 - w / 2, () => B.t);
          if (toastEl.classList.contains("is-on")) put(toastEl, (w) => W / 2 - w / 2, () => B.t);
          if (!sp.hidden) put(sp, (w) => W / 2 - w / 2, () => H * 0.2);
          if (!bubbleEl.hidden && bubbleEl.style.visibility !== "hidden" && bubble.sx != null) put(bubbleEl, (w) => bubble.sx - w / 2, (w, h) => bubble.sy - h);
        }
        // tap a bubble to dismiss it (short screens only: elsewhere bubbles ignore the pointer)
        bubbleEl.addEventListener("pointerdown", (e) => { e.stopPropagation(); bubbleEl.hidden = true; bubble.type = null; });
        addEventListener("resize", () => { try { safeLayout(); } catch (e) {} });

        // ---------- delivery state and HUD ----------
        const $ = (id) => document.getElementById(id);
        const S = { pending: [], bag: [], active: 0, coins: 0, earned: 0, done: 0, hearts: 3, mistakes: 0, t0: 0, over: false };
        function resetState() {
          Object.assign(S, { combo: { n: 0, last: 0 }, pending: markHand(markGold(markRush(generateLetters()))), bag: [], active: 0, earned: 0, done: 0, hearts: 3, mistakes: 0, t0: performance.now(), over: false, freeUsed: false });
          tipArm = null; rushUI.sec = null; renderHUD(); renderNotes();
        }
        // ---------- rush letters: about 1 in 3 per round, never the game's first letter; limit = 25 s + distance / 6 ----------
        const RUSH_KEY = "adressiz-rush-best";
        let rushBest = {};
        try { rushBest = JSON.parse(localStorage.getItem(RUSH_KEY) || "{}") || {}; } catch (e) { rushBest = {}; }
        const rushId = (l) => `${l.house.id}:${l.kind}`;
        function markRush(P) {
          const idx = shuffle(P.map((_, i) => i).filter((i) => i > 0 || round > 1)).slice(0, Math.round(P.length / 3));
          idx.forEach((i) => {
            const l = P[i], d = Math.hypot(l.house.door2.x - PO.x, l.house.door2.z - (PO.z + PO.d / 2 + 1));
            l.rush = true; l.limit = Math.round(25 + d / 6); l.rushT0 = 0;
          });
          return P;
        }
        const rushLeft = (l) => l.limit - (performance.now() - l.rushT0) / 1000;
        const rushUI = { sec: null, tenth: null, tick: null };
        const fmtSec = (s) => { s = Math.max(0, Math.ceil(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
        function rushTick(force) {
          const ring = $("rushring");
          const live = window.game && window.game.started && !S.over ? S.bag.filter((b) => b.rush && b.rushT0) : [];
          if (!live.length) { if (!ring.hidden) ring.hidden = true; $("lv-rush").hidden = true; rushUI.sec = null; return; }
          // the ring follows the most urgent rush letter still on time, else a late one
          let u = null, ul = Infinity;
          for (const b of live) { const r = rushLeft(b), key = r > 0 ? r : 1e6 - r; if (key < ul) { ul = key; u = b; } }
          const left = rushLeft(u), late = left <= 0, sec = Math.ceil(left), tenth = Math.floor(left * 10);
          if (ring.hidden) ring.hidden = false;
          if (force || tenth !== rushUI.tenth) {
            rushUI.tenth = tenth;
            $("rushring-fg").style.strokeDashoffset = String(100 - Math.max(0, Math.min(1, left / u.limit)) * 100);
            ring.classList.toggle("is-low", !late && left < 10); ring.classList.toggle("is-late", late);
          }
          if (force || sec !== rushUI.sec) {
            // tick under 5 s, once a second, quietly
            if (!force && rushUI.sec !== null && !late && sec <= 5 && sec < rushUI.sec) SND.sfx("ui_tap", { vol: 0.16, rate: sec <= 2 ? 1.2 : 1 });
            rushUI.sec = sec;
            $("rushsec").textContent = late ? "!" : String(sec);
            ring.setAttribute("aria-label", late ? T("Acele mektup gecikti", "Rush letter is late") : T(`Acele mektup: ${sec} sn kaldı`, `Rush letter: ${sec} s left`));
          }
          // the open letter shows its own clock
          const l = S.bag[S.active], lr = $("lv-rush");
          if (storyOpen) lr.hidden = true;
          else if (l && l.rush) {
            lr.hidden = false;
            const r = l.rushT0 ? rushLeft(l) : l.limit;
            const best = rushBest[rushId(l)] ? ` · ${T("En iyi", "Best")} ${"★".repeat(rushBest[rushId(l)])}` : "";
            const txt = r > 0 ? `⏱ ${fmtSec(r)}${best}` : `${T("Gecikti!", "Late!")}${best}`;
            if ($("lv-rusht").textContent !== txt) $("lv-rusht").textContent = txt;
          } else lr.hidden = true;
        }
        function rushStars(stars, record) {
          const el = $("starpop");
          [...el.querySelectorAll(".x-starpop__row span")].forEach((s, i) => s.classList.toggle("is-on", i < stars));
          $("starpop-l").textContent = (stars >= 3 ? T("Şimşek gibi!", "Lightning fast!") : stars === 2 ? T("Zamanında!", "On time!") : T("Geç kaldın ama teslim edildi.", "Late, but delivered.")) + (record ? T(" · Yeni rekor!", " · New best!") : "");
          el.setAttribute("aria-label", T(`${stars} yıldız`, `${stars} stars`));
          el.classList.remove("is-go"); el.hidden = false; void el.offsetWidth; el.classList.add("is-go");
          for (let i = 0; i < stars; i++) SND.sfx("sfx_bell_ding", { delay: 0.12 + i * 0.22, vol: 0.28, rate: 1 + i * 0.15 });
          clearTimeout(rushStars.t); rushStars.t = setTimeout(() => { el.hidden = true; el.classList.remove("is-go"); }, 2600);
        }
        // ---------- wax-sealed letter view ----------
        function rustle() {
          try {
            const out = SND.out(); if (!out) return; actx = out.context;
            const n = Math.floor(actx.sampleRate * 0.22), buf = actx.createBuffer(1, n, actx.sampleRate), d = buf.getChannelData(0);
            for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2) * (0.6 + 0.4 * Math.sin(i / 90));
            const src = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
            f.type = "bandpass"; f.frequency.value = 2600; f.Q.value = 0.6; g.gain.value = 0.22;
            src.buffer = buf; src.connect(f); f.connect(g); g.connect(out); src.start();
          } catch (e) { /* audio unavailable */ }
        }
        const lv = $("lv"), lvPaper = $("lv-paper");
        let lvOpen = false;
        function setMail(open) {
          if (open === lvOpen) return;
          lvOpen = open;
          if (!open && storyOpen) setTimeout(endStory, 0);
          $("mailchip").setAttribute("aria-expanded", String(open)); lv.setAttribute("aria-hidden", String(!open));
          if (open) {
            lv.style.transition = "none";
            lv.style.setProperty("--cx", "0px"); lv.style.setProperty("--cy", "45vh"); lv.style.setProperty("--cs", "0.7");
            void lv.offsetWidth; lv.style.transition = "";
            lv.classList.add("is-open");
          } else {
            const c = $("mailchip").getBoundingClientRect(), r = lv.getBoundingClientRect();
            lv.style.setProperty("--cx", `${c.left + c.width / 2 - (r.left + r.width / 2)}px`);
            lv.style.setProperty("--cy", `${c.top + c.height / 2 - (r.top + r.height / 2)}px`);
            lv.style.setProperty("--cs", "0.06");
            lv.classList.remove("is-open");
          }
          // opening: the envelope slides open, then the paper rustles out (0.85 s into the animation); closing: a short rustle
          if (open ? !SND.sfx("sfx_letter_open") : !SND.sfx("sfx_paper_rustle_2", { rate: 0.92 + Math.random() * 0.16 })) rustle();
          if (open) SND.sfx("sfx_paper_rustle_1", { delay: 0.8, vol: 0.45, rate: 0.95 + Math.random() * 0.1 });
        }
        $("mailchip").addEventListener("click", () => setMail(!lvOpen));
        function flipLetter(d) {
          if (S.bag.length < 2 || storyOpen) return;
          S.active = (S.active + d + S.bag.length) % S.bag.length; renderHUD();
          lvPaper.classList.remove("is-flip", "is-flip-b"); void lvPaper.offsetWidth;
          lvPaper.classList.add(d > 0 ? "is-flip" : "is-flip-b");
          if (!SND.sfx("sfx_paper_rustle_2", { rate: 0.92 + Math.random() * 0.16 })) tone(1400, 0, 0.06, "sine", 0.05);
        }
        ["lv-prev", "lv-next"].forEach((id, i) => {
          const b = $(id);
          b.addEventListener("pointerdown", (e) => e.stopPropagation());
          b.addEventListener("click", (e) => { e.stopPropagation(); flipLetter(i ? 1 : -1); });
        });
        let lvDown = null;
        lvPaper.addEventListener("pointerdown", (e) => { lvDown = { x: e.clientX, y: e.clientY }; });
        lvPaper.addEventListener("pointerup", (e) => {
          if (!lvDown || e.target.closest("button")) { lvDown = null; return; }
          const dx = e.clientX - lvDown.x, dy = e.clientY - lvDown.y; lvDown = null;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) flipLetter(dx < 0 ? 1 : -1);
          else if (Math.hypot(dx, dy) < 10) setMail(false);
        });
        document.addEventListener("pointerdown", (e) => {
          if (lvOpen && !lvPaper.contains(e.target) && !$("mailchip").contains(e.target) && !$("tipchip").contains(e.target)) setMail(false);
        }, true);
        addEventListener("keydown", (e) => { if (e.code === "Escape" && lvOpen) setMail(false); });
        // letter_badges.png cells: Gözlem, Konum, Bilmece, Eleme, Çizim, Yırtık
        const BADGE = { look: [0], place: [1], riddle: [2], excl: [3], sketch: [4], torn: [5], combo: [0, 1], hand: [2] };
        function badgeEl(kindOrCell, on) {
          const s = document.createElement("span"), cell = typeof kindOrCell === "number" ? kindOrCell : (BADGE[kindOrCell] || [0])[0];
          s.className = "x-badge" + (on ? " is-on" : ""); s.style.setProperty("--b", cell); s.setAttribute("aria-hidden", "true");
          return s;
        }
        function renderHUD() {
          $("mailcount").textContent = S.bag.length;
          coinShow(S.coins);
          saveCoins();
          $("done").textContent = S.done;
          renderRank();
          xIcoText($("hearts"), "♥".repeat(S.hearts) + "♡".repeat(3 - S.hearts));
          {
            // mail chip: wax-sealed envelope for a 3-star letter, plus a type badge per letter in the bag
            const al = S.bag[S.active];
            $("mailico").style.setProperty("--i", al && al.tier >= 3 ? 1 : 0);
            const bb = $("bagbadges"); bb.textContent = "";
            S.bag.forEach((b, i) => { const e = badgeEl(b.kind, i === S.active); if (b.rush) e.classList.add("is-rush"); if (b.hand) e.classList.add("is-hand"); if (b.gold) e.classList.add("is-gold"); bb.append(e); });
          }
          $("hearts").setAttribute("aria-label", T(`Can: ${S.hearts}`, `Hearts: ${S.hearts}`));
          $("lv-tol").textContent = T("Kime:", "To:");
          lvPaper.setAttribute("aria-label", T("Mektup", "Letter"));
          $("lv-prev").setAttribute("aria-label", T("Önceki mektup", "Previous letter"));
          $("lv-next").setAttribute("aria-label", T("Sonraki mektup", "Next letter"));
          const l = S.bag[S.active];
          if (l) {
            const K = KIND[l.kind];
            $("lv-to").textContent = l.torn ? `${l.torn[lang()]}… ${T("(mektup yağmurda ıslanmış)", "(the letter got wet in the rain)")}` : T(K.to[0], K.to[1]);
            if (l.sketch) {
              l.svg = l.svg || sketchSVG(l);
              $("lv-body").innerHTML = l.svg;
              $("lv-body").append(T("Biraz aceleyle çizdim, bir ayrıntıyı unutmuş olabilirim.", "I drew it in a hurry and may have left out one detail."));
            } else $("lv-body").textContent = clueText(l);
            if (l.extra) { const s = document.createElement("span"); s.className = "x-paper__tip"; s.textContent = T("İpucu: ", "Hint: ") + sentence(T(l.extra.f[0], l.extra.f[1])); $("lv-body").append(s); }
            $("lv-type").textContent = "";
            (BADGE[l.kind] || []).forEach((n) => $("lv-type").append(badgeEl(n)));
            $("lv-type").append((l.hand ? "🤝 " : "") + T(K.lab[0], K.lab[1]) + (l.gold ? T(" · 🌟 Günün Mektubu ×3", " · 🌟 Letter of the Day ×3") : ""));
            $("lv-sig").textContent = T("— Bir Dost", "— A Friend");
          } else {
            $("lv-to").textContent = "—";
            $("lv-type").textContent = "";
            $("lv-body").textContent = S.pending.length
              ? TK(`Çantan boş. Postaneye git ve E ile mektupları al. Postanede ${S.pending.length} mektup bekliyor.`, `Your bag is empty. Go to the post office and press E to pick up your letters. ${S.pending.length} letters are waiting.`, `Çantan boş. Postaneye git, Al'a dokunup mektupları al. Postanede ${S.pending.length} mektup bekliyor.`, `Your bag is empty. Go to the post office and tap Take to pick up your letters. ${S.pending.length} letters are waiting.`)
              : T("Hepsi teslim edildi!", "All delivered!");
            $("lv-sig").textContent = "";
          }
          $("lv-nav").hidden = S.bag.length < 2;
          xIcoText($("lv-n"), l ? `${S.active + 1}/${S.bag.length} · ${"★".repeat(l.tier)}` : "");
          renderTip();
          rushTick(true);
          lvPaper.classList.toggle("is-gold", !!(l && l.gold) && !storyOpen);
          if (storyOpen) fillStory();
        }
        // ---------- tiered hint for the selected letter: 0..3, stored on the letter ----------
        const TIP_COST = [3, 6, 10];
        let tipArm = null, tipArmT = 0, sparkle = null;
        function tipCircle(l, r, off) { const a = Math.random() * 6.283, d = Math.random() * off; l.hc = { x: l.house.x + Math.cos(a) * d, z: l.house.z + Math.sin(a) * d, r }; }
        function renderTip() {
          const tk = !!(PROF && PROF.x && PROF.x.tokens > 0), l = S.bag[S.active], c = l && l.hl < 3 ? TIP_COST[l.hl] : 0, free = l && !tk && S.coins < c && !S.freeUsed, off = !l || l.hl >= 3 || (!tk && S.coins < c && S.freeUsed);
          [["tipchip", 1], ["lv-tip", 0]].forEach(([id, short]) => {
            const b = $(id); b.hidden = !l; if (!l) return;
            const cost = tk ? T("🎟 jeton", "🎟 token") : free ? T("ücretsiz", "free") : `${c}🪙`;
            xIcoText(b, l.hl >= 3 ? (short ? "💡 ✓" : T("💡 İpucu ✓", "💡 Hint ✓"))
              : tipArm === l ? T(`Onayla · ${cost}?`, `Confirm · ${cost}?`)
              : off ? (short ? `💡 ${c}🪙` : T(`💡 ${c}🪙 gerekli`, `💡 Need ${c}🪙`))
              : short ? `💡 ${cost}` : `💡 ${T("İpucu", "Hint")} · ${cost}`);
            b.classList.toggle("is-off", off); b.classList.toggle("is-arm", tipArm === l);
            b.setAttribute("aria-disabled", String(off)); b.title = T(`İpucu ${l.hl}/3`, `Hint ${l.hl}/3`);
          });
        }
        function useTip() {
          const l = S.bag[S.active];
          if (!l || S.over) return;
          if (l.hl >= 3) { toast(T("Bütün ipuçları açık.", "All hints used.")); return; }
          const tk = PX().tokens > 0, c = TIP_COST[l.hl], free = !tk && S.coins < c;
          if (free && S.freeUsed) { toast(T(`İpucu için ${c} 🪙 gerekli.`, `You need ${c} 🪙.`)); buzz(); return; }
          clearTimeout(tipArmT);
          if (tipArm !== l) { tipArm = l; tipArmT = setTimeout(() => { tipArm = null; renderTip(); }, 3000); if (!SND.sfx("ui_tap")) tone(1400, 0, 0.06, "sine", 0.05); renderTip(); return; }
          tipArm = null;
          if (tk) { PX().tokens--; saveProf(); } else if (free) S.freeUsed = true; else { S.coins -= c; saveCoins(); }
          const h = l.house, lvl = ++l.hl, pre = tk ? T("🎟 Jeton · ", "🎟 Token · ") : free ? T("Ücretsiz · ", "Free · ") : "";
          if (lvl === 1) { tipCircle(l, 30, 15); toast(pre + T(`💡 Nehrin hangi yakasında? ${h.riverSide === "east" ? "Öte" : "Bu"} yakada.`, `💡 Which side of the river? ${h.riverSide === "east" ? "The far" : "This"} side.`)); }
          else if (lvl === 2) {
            tipCircle(l, 12, 5);
            const pool = lookFor(h).concat(placeFor(h)).filter((x) => !x.sq && !/yakas/.test(x.f[0]) && !l.clauses.some((k) => k.f && k.f[0] === x.f[0])), vague = pool.filter((x) => matches([x]).length > 1);
            l.extra = shuffle(vague.length ? vague : pool)[0] || null;
            toast(pre + T("💡 Daire daraldı, mektuba not eklendi.", "💡 Circle narrowed, note added to the letter."));
          } else toast(pre + T("💡 Kapı parlıyor! Bonus yok, altın yarıya.", "💡 The door sparkles! No bonus, half coins."), 2600);
          if (!SND.sfx("sfx_hint_sparkle")) { tone(1568, 0, 0.6, "sine", 0.1); tone(2349, 0.05, 0.5, "sine", 0.04); }
          renderHUD();
        }
        ["tipchip", "lv-tip"].forEach((id) => {
          $(id).addEventListener("pointerdown", (e) => e.stopPropagation());
          $(id).addEventListener("click", (e) => { e.stopPropagation(); useTip(); });
        });
        function tipMap(c) {
          const l = game.started && S.bag[S.active];
          if (!l || !l.hl || !l.hc) return;
          const k = 0.5 + 0.5 * Math.sin(performance.now() / 320);
          c.save(); c.setLineDash([5, 4]); c.lineWidth = 2;
          c.fillStyle = `rgba(255, 200, 60, ${0.12 + 0.1 * k})`; c.strokeStyle = `rgba(214, 140, 20, ${0.55 + 0.35 * k})`;
          c.beginPath(); c.arc(toM(l.hc.x), toM(l.hc.z), l.hc.r * 1.5 * (0.97 + 0.03 * k), 0, 6.283); c.fill(); c.stroke();
          if (l.hl >= 3) {
            const x = toM(l.house.x), y = toM(l.house.z) - 11;
            c.setLineDash([]); c.lineWidth = 1.5; c.fillStyle = "#fffaf0"; c.strokeStyle = "#a8161c";
            c.fillRect(x - 7, y - 5, 14, 10); c.strokeRect(x - 7, y - 5, 14, 10);
            c.beginPath(); c.moveTo(x - 7, y - 5); c.lineTo(x, y + 1); c.lineTo(x + 7, y - 5); c.stroke();
          }
          c.restore();
        }
        function tipSparkle(t) {
          const l = game.started && S.bag[S.active];
          if (!l || l.hl < 3) { if (sparkle) sparkle.visible = false; return; }
          if (!sparkle) {
            // art pack: one looping 12-frame sparkle at 12 fps; drawn glints if the strip is missing
            const st = sheetFrameTex("sparkle");
            if (st) {
              sparkle = new THREE.Sprite(new THREE.SpriteMaterial({ map: st, color: 0xffffff, transparent: true, depthWrite: false, toneMapped: false, fog: false, premultipliedAlpha: false }));
              sparkle.scale.set(1.8, 1.8, 1); sparkle.userData.tex = st; scene.add(sparkle);
            }
          }
          if (sparkle && sparkle.userData.tex) {
            const h = l.house; sparkle.visible = true;
            sparkle.position.set(h.door2.x, h.y + 3 + Math.sin(t * 2) * 0.08, h.door2.z);
            sparkle.userData.tex.offset.x = (Math.floor(t * 12) % 12) / 12;
            return;
          }
          if (!sparkle) {
            const tex = canvasTex(64, 64, (x) => {
              const g = x.createRadialGradient(32, 32, 0, 32, 32, 30); g.addColorStop(0, "rgba(255,248,210,1)"); g.addColorStop(0.3, "rgba(255,205,80,0.85)"); g.addColorStop(1, "rgba(255,190,60,0)");
              x.fillStyle = g; x.fillRect(0, 0, 64, 64); x.fillStyle = "rgba(255,250,225,0.9)"; x.fillRect(31, 6, 2, 52); x.fillRect(6, 31, 52, 2);
            });
            sparkle = new THREE.Group();
            for (let i = 0; i < 8; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: 0xffffff, transparent: true, depthWrite: false, toneMapped: false, fog: false, premultipliedAlpha: false })); s.userData.p = i / 8; sparkle.add(s); }
            scene.add(sparkle);
          }
          const h = l.house; sparkle.visible = true; sparkle.position.set(h.door2.x, h.y + 2.4, h.door2.z);
          sparkle.children.forEach((s) => {
            const p = (t * 0.3 + s.userData.p) % 1, a = s.userData.p * 6.283 + t * 0.7, k = Math.sin(p * Math.PI);
            s.position.set(Math.cos(a) * 0.55, p * 1.6, Math.sin(a) * 0.55); s.scale.setScalar(0.2 + 0.3 * k); s.material.opacity = k;
          });
        }
        const nearPO = () => Math.hypot(player.pos.x - PO.x, player.pos.z - (PO.z + PO.d / 2 + 1)) < 5;
        function nearVillager() {
          let best = null, bd = 3;
          for (const v of villagers) { const d = Math.hypot(player.pos.x - v.p.g.position.x, player.pos.z - v.p.g.position.z); if (d < bd) { bd = d; best = v; } }
          return best;
        }
        function pickup() {
          const room = TUT.on && S.done < 3 ? Math.max(0, 1 - S.bag.length) : 3 - S.bag.length;
          if (!S.pending.length) { toast(T("Postanede mektup kalmadı.", "No letters left at the post office.")); return; }
          if (room <= 0) { toast(T("Çantan dolu! Önce teslim et.", "Your bag is full! Deliver first.")); return; }
          const got = S.pending.splice(0, room), now = performance.now();
          got.forEach((l) => { l.picked = now; if (l.rush) l.rushT0 = now; }); // a rush letter's clock starts when it is accepted
          S.bag.push(...got);
          if (S.active >= S.bag.length) S.active = 0;
          const rush = got.filter((l) => l.rush);
          if (TUT.on) tw(0, tutOnPickup, 0.6);
          if (rush.length) {
            const r = rush[0], i = S.bag.indexOf(r); if (i >= 0) S.active = i;
            SND.sfx("sfx_bell_ring", { delay: 0.5, vol: 0.35 });
            renderHUD();
            toast(T(`🔴 ACELE mektup! ${r.limit} saniyen var: süre yarıdan fazla kalırsa ★★★, geç kalsan da teslim olur.`, `🔴 RUSH letter! You have ${r.limit} s: over half the time left earns ★★★, and late still delivers.`), 3600);
            player.act("PickUp");
            return;
          }
          // new letters in the bag: paper, then a bell ding
          SND.sfx("sfx_paper_rustle_1", { rate: 0.95 + Math.random() * 0.1 });
          if (!SND.sfx("sfx_bell_ding", { delay: 0.25, vol: 0.4 })) { tone(880, 0, 0.15); tone(1175, 0.1, 0.2); }
          player.act("PickUp");
          const hd = got.find((l) => l.hand), gd = got.find((l) => l.gold);
          if (gd && !hd) { renderHUD(); toast(T("🌟 Günün mektubu! Bugün bu mektup 3 kat altın değerinde.", "🌟 The letter of the day! Today it is worth 3× coins."), 3400); return; }
          if (hd) { const i = S.bag.indexOf(hd); if (i >= 0) S.active = i; renderHUD(); toast(T("🤝 Elden Teslim mektubu! Kapıdan kabul edilmez: sahibini köyde bul, yanına gidip eline ver.", "🤝 Hand Delivery letter! Doors won't take it: find the owner out in the village and hand it over."), 3800); return; }
          toast(T(`${got.length} mektup aldın. ⏱ 60 saniyede teslim edersen +5 bonus!`, `Picked up ${got.length} letters. ⏱ Deliver within 60 s for a +5 bonus!`), 3000);
          renderHUD();
        }
        function deliver(h, mode) {
          // mode: "door" (knock), "night" (the owner is asleep inside: under the door) or "hand" (in person, out in the village)
          mode = mode || "door";
          if (mode === "door" && h.owner && h.owner.sch && h.owner.sch.st === "in") mode = "night";
          const og = mode === "hand" && h.owner ? h.owner.g : null;
          const top = og ? new THREE.Vector3(og.position.x, og.position.y + 3, og.position.z) : new THREE.Vector3(h.door2.x, h.y + h.h + 2, h.door2.z);
          if (!S.bag[S.active]) { toast(T("Teslim edecek mektubun yok.", "You have no letter to deliver.")); return; }
          const i = S.bag.findIndex((b) => b.house === h && (mode === "hand" || !b.hand));
          if (i >= 0) {
            const l = S.bag[i];
            const tipped = l.hl >= 3, fast = !tipped && performance.now() - l.picked < 60000;
            // rush: 3 stars with half the time or more left, 2 on time, 1 late; coins = base × (1 + 0.5 × stars)
            const left = l.rush ? rushLeft(l) : 0, stars = l.rush ? (left >= l.limit * 0.5 ? 3 : left > 0 ? 2 : 1) : 0;
            const base = l.rush ? Math.round((tipped ? 5 : 10) * (1 + 0.5 * stars)) : tipped ? 5 : fast ? 15 : 10;
            // village upgrades: +5% coins each, rounded
            const vExtra = Math.round(base * vBonus()), ex = deliveryExtras(l, base + vExtra), gain = base + vExtra + ex.add;
            const vT = (vExtra ? T(` · 🏡 +${vExtra} köy`, ` · 🏡 +${vExtra} village`) : "") + ex.txt;
            if (l.rush) {
              const id = rushId(l), record = stars > (rushBest[id] || 0);
              if (record) { rushBest[id] = stars; try { localStorage.setItem(RUSH_KEY, JSON.stringify(rushBest)); } catch (e) {} }
              tw(0, () => rushStars(stars, record), 1.5);
            }
            if (tipArm === l) tipArm = null;
            FX.mood = l.rush ? stars : tipped ? 1 : fast ? 3 : 2;
            S.coins += gain; S.earned += gain; S.done++; saveCoins();
            gainXP(10 + 5 * stars);
            S.bag.splice(i, 1); S.active = 0;
            if (mode === "hand") handOver(h, gain); else if (mode === "night") slipUnder(h, gain); else happyDelivery(h, gain);
            awardStamp(h, stars >= 3);
            giftCheck(h, stars);
            tw(0, () => say(nm(h), (mode === "night" ? T("(kapının ardından) ", "(from behind the door) ") : "") + T(h.story.tr, h.story.en), top, og, 5, ownerVoice(h)), mode === "door" ? 1.0 : 1.2);
            const xpT = `${vT} · ${10 + 5 * stars} XP`;
            if (l.rush) toast(`+${gain} 🪙  ⏱ ${T("Acele", "Rush")} ${"★".repeat(stars)}${"☆".repeat(3 - stars)}${tipped ? T(" (ipucu: yarı altın)", " (hint: half coins)") : ""}${xpT}`);
            else toast((tipped ? T("+5 🪙 (ipucu: yarı altın)", "+5 🪙 (hint: half coins)") : fast ? T(`+10 🪙  ⏱ +5 hız bonusu!`, `+10 🪙  ⏱ +5 speed bonus!`) : "+10 🪙") + xpT);
            const met = [`${h.name} (${h.nickname.tr}), köyün ${h.job.tr}: ${h.landmark.tr.toLocaleLowerCase("tr")}.`, `${h.name} (${h.nickname.en}), the village ${h.job.en}: ${h.landmark.en.charAt(0).toLowerCase() + h.landmark.en.slice(1)}.`];
            if (!notes.some((o) => o[0] === met[0])) { notes.push(met); renderNotes(); }
            renderHUD();
            PX().total++; saveProf(); renderNotes();
            if (TUT.on) tw(0, tutOnDeliver, 1.5);
            friendGain(h);
            chainAfter(l, h, mode);
            if (S.done >= 10) { PX().rounds = (PX().rounds || 0) + 1; saveProf(); S.over = true; setTimeout(() => storyCheck(showEnd), 3400); }
            else if (storyDue()) setTimeout(() => storyCheck(), 3600);
          } else {
            if (mode === "hand") grumpyHand(h); else grumpyDoor(h);
            S.mistakes++; S.hearts--; if (S.combo) S.combo.n = 0;
            tw(0, () => say(nm(h), T("Bu bana değil!", "This isn't for me!"), top, og, 2.5, ownerVoice(h)), mode === "hand" ? 0.4 : 0.6);
            if (S.hearts <= 0) {
              const back = S.bag.splice(S.active, 1)[0]; back.rushT0 = 0; // a rush letter's clock restarts when it is picked up again
              S.pending.unshift(back); S.active = 0; S.hearts = 3;
              toast(T("Canın bitti! Mektup postaneye geri döndü.", "Out of hearts! The letter went back to the post office."), 3200);
            }
            renderHUD();
          }
        }
        // ---------- stamp album: one stamp per villager, gold for a 3-star rush; stamps persist in the profile ----------
        const STAMP_EMO = { 1: "🥖", 2: "🌻", 3: "🧵", 4: "🪵", 5: "📚", 6: "🚜", 7: "🐝", 8: "🔦", 9: "👶", 10: "🐑", 11: "🍯", 12: "🏛️", 13: "🧀", 14: "🌾", 15: "🔨", 16: "🎨" };
        const STAMP_RW = [[5, 20], [10, 50], [HOUSES.length, 150]];
        let albumTab = false;
        const stampCount = () => (PROF && PROF.stamps ? Object.keys(PROF.stamps).length : 0);
        // tier 0 locked silhouette, 1 the villager's stamp, 2 gold; perforated edge cut out of the paper
        function drawStamp(cv, h, tier) {
          cv.width = cv.height = 120;
          const c = cv.getContext("2d");
          c.fillStyle = tier === 2 ? "#f1d27a" : tier ? "#fffaf0" : "#d4d4d4"; c.fillRect(0, 0, 120, 120);
          c.globalCompositeOperation = "destination-out";
          for (let p = 6; p < 120; p += 12) [[p, 0], [p, 120], [0, p], [120, p]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 4.5, 0, Math.PI * 2); c.fill(); });
          c.globalCompositeOperation = "source-over";
          if (tier === 2) { const g = c.createLinearGradient(12, 12, 108, 108); g.addColorStop(0, "#fff0b3"); g.addColorStop(0.5, "#e7b93e"); g.addColorStop(1, "#b9861c"); c.fillStyle = g; }
          else c.fillStyle = tier ? h.body : "#b8b8b8";
          c.fillRect(12, 12, 96, 96);
          c.strokeStyle = tier === 2 ? "#8a6410" : tier ? "rgb(0 0 0 / 0.22)" : "#9a9a9a"; c.lineWidth = 2; c.strokeRect(17, 17, 86, 86);
          c.textAlign = "center"; c.textBaseline = "middle";
          if (!tier) { c.fillStyle = "#858585"; c.font = "700 52px Geist, sans-serif"; c.fillText("?", 60, 62); return; }
          c.font = '44px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; c.fillText(STAMP_EMO[h.id] || "✉️", 60, 52);
          c.fillStyle = tier === 2 ? "#4a3200" : "#3a2f25"; c.font = "700 14px Geist, sans-serif"; c.fillText(h.given ? T(h.given.tr, h.given.en) : T(h.name.split(" ")[0], enFix(h.name).split(" ").pop()), 60, 92);
          if (tier === 2) { c.font = "700 13px Geist, sans-serif"; c.fillText("★", 96, 26); }
        }
        function awardStamp(h, gold) {
          if (!PROF) return;
          const st = PROF.stamps || (PROF.stamps = {}), had = st[h.id] || 0, tier = gold ? 2 : 1;
          if (had >= tier) return;
          st[h.id] = tier;
          const n = stampCount();
          STAMP_RW.forEach(([k, r]) => {
            if (n < k || PROF.stampRw.indexOf(k) >= 0) return;
            PROF.stampRw.push(k); S.coins += r; saveCoins(); renderHUD();
            setTimeout(() => { toast(T(`📮 ${k} pul toplandı! +${r} 🪙`, `📮 ${k} stamps collected! +${r} 🪙`), 3200); SND.sfx("sfx_coins_bag"); }, 4300);
          });
          saveProf(); renderAlbum();
          setTimeout(() => stampFly(h, tier), 900);
        }
        function stampFly(h, tier) {
          const el = document.createElement("div"), cv = document.createElement("canvas"), b = document.createElement("b");
          el.className = "x-stampfly"; el.setAttribute("aria-hidden", "true");
          drawStamp(cv, h, tier); b.textContent = tier === 2 ? T("Altın pul!", "Gold stamp!") : T("Yeni pul!", "New stamp!");
          el.append(cv, b); document.body.append(el);
          SND.sfx(Math.random() < 0.5 ? "sfx_paper_rustle_1" : "sfx_paper_rustle_2"); SND.sfx("sfx_hint_sparkle", { delay: 0.2 });
          const r = $("notechip").getBoundingClientRect(), dx = r.left + r.width / 2 - innerWidth / 2, dy = r.top + r.height / 2 - innerHeight * 0.4;
          const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
          const done = () => { el.remove(); const c = $("notechip"); c.classList.remove("is-pop"); void c.offsetWidth; c.classList.add("is-pop"); };
          if (!el.animate) { setTimeout(done, 1500); return; }
          el.animate(calm ? [{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 1, offset: 0.8 }, { opacity: 0 }] : [
            { transform: "scale(0.2) rotate(-25deg)", opacity: 0 },
            { transform: "scale(1.15) rotate(6deg)", opacity: 1, offset: 0.25 },
            { transform: "scale(1) rotate(0deg)", opacity: 1, offset: 0.55 },
            { transform: `translate(${dx}px, ${dy}px) scale(0.25) rotate(-12deg)`, opacity: 0.5 },
          ], { duration: calm ? 1400 : 1700, easing: "ease-in-out", fill: "forwards" }).onfinish = done;
        }
        function renderAlbum() {
          if (!PROF) return;
          const st = PROF.stamps || {}, n = stampCount(), N = HOUSES.length;
          $("albumcount").textContent = `${n}/${N}`;
          $("tab-notes-l").textContent = T("Defter", "Journal");
          $("tab-album-l").textContent = T("Pul Albümü", "Stamp Album");
          if (!albumTab) return;
          xIcoText($("album-c"), T(`${n}/${N} pul · ilk teslimat pulu, ⏱ ★★★ acele altın pulu verir. 5 / 10 / ${N} pula 20 / 50 / 150 🪙.`, `${n}/${N} stamps · a first delivery earns the stamp, a ⏱ ★★★ rush the gold one. 5 / 10 / ${N} stamps pay 20 / 50 / 150 🪙.`));
          const grid = $("albumgrid"); grid.innerHTML = "";
          HOUSES.forEach((h) => {
            const t = st[h.id] || 0, cv = document.createElement("canvas");
            drawStamp(cv, h, t);
            const lab = t ? `${nm(h)} · ${T(h.job.tr, h.job.en)}${t === 2 ? T(" · altın", " · gold") : ""}` : T("Kilitli pul", "Locked stamp");
            cv.setAttribute("role", "img"); cv.setAttribute("aria-label", lab); cv.title = lab;
            grid.append(cv);
          });
          if (PROF.x && PROF.x.dost) { const cv = document.createElement("canvas"), lab = T("Hasan Dede · Bir Dost · altın", "Hasan Dede · A Friend · gold"); drawStamp(cv, { id: "dost", name: "Hasan Dede", body: "#f1d27a" }, 2); cv.setAttribute("role", "img"); cv.setAttribute("aria-label", lab); cv.title = lab; grid.append(cv); }
        }
        function setAlbumTab(on) {
          albumTab = on;
          $("tab-notes").setAttribute("aria-selected", String(!on)); $("tab-album").setAttribute("aria-selected", String(on));
          $("notelist").hidden = on; $("album").hidden = !on;
          renderAlbum();
        }
        $("tab-notes").addEventListener("click", () => setAlbumTab(false));
        $("tab-album").addEventListener("click", () => { setAlbumTab(true); SND.sfx("sfx_paper_rustle_2", { vol: 0.4 }); });
        // ---------- gossip and the Defter ----------
        var DOST_READY = false; // set once the Bir Dost story data exists
        const notes = [];
        // Turkish question particle by vowel harmony (mı / mi / mu / mü)
        const qm = (w) => { const v = (w.match(/[aıoueiöü]/g) || ["a"]).pop(); return "m" + ({ a: "ı", ı: "ı", e: "i", i: "i", o: "u", u: "u", ö: "ü", ü: "ü" })[v]; };
        // Turkish genitive after an apostrophe: Teyze'nin, Amca'nın, Hanım'ın, Çavuş'un
        const gen = (w) => { const v = (w.match(/[aıoueiöü]/g) || ["a"]).pop(), i = ({ a: "ı", ı: "ı", e: "i", i: "i", o: "u", u: "u", ö: "ü", ü: "ü" })[v]; return w + "'" + (/[aıoueiöü]$/.test(w) ? "n" : "") + i + "n"; };
        function gossipAbout(h, which) {
          const n = byId(h.neighbours[0]), side = h.riverSide === "east";
          const facts = [
            [`${h.nickname.tr} aslında ${h.name}; köyün ${h.job.tr}.`, `${h.nickname.en} is really ${h.name}, the village ${h.job.en}.`],
            [`${h.job.tr.charAt(0).toLocaleUpperCase("tr") + h.job.tr.slice(1)} ${qm(h.job.tr)} arıyorsun? ${h.nickname.tr}: ${h.landmark.tr.toLocaleLowerCase("tr")}.`, `Looking for the ${h.job.en}? ${h.nickname.en}: ${h.landmark.en.charAt(0).toLowerCase() + h.landmark.en.slice(1)}.`],
            [`${h.nickname.tr} evi: ${h.landmark.tr.toLocaleLowerCase("tr")}.`, `${h.nickname.en}'s house: ${h.landmark.en.charAt(0).toLowerCase() + h.landmark.en.slice(1)}.`],
            [`${h.nickname.tr}, nehrin ${side ? "öte" : "bu"} yakasında oturur.`, `${h.nickname.en} lives on ${side ? "the far" : "this"} side of the river.`],
            [`${h.nickname.tr} ile ${n.nickname.tr} en yakın komşu.`, `${h.nickname.en}'s nearest neighbour is ${n.nickname.en}.`],
            [`${gen(h.name)} evi: ${h.landmark.tr.toLocaleLowerCase("tr")}.`, `${h.name}'s house: ${h.landmark.en.charAt(0).toLowerCase() + h.landmark.en.slice(1)}.`],
          ];
          if (which) return facts[which];
          const fresh = facts.filter((f) => !notes.some((o) => o[0] === f[0]));
          return (fresh.length ? fresh : facts)[Math.floor(Math.random() * (fresh.length || facts.length))];
        }
        function renderNotes() {
          $("notecount").textContent = notes.length; $("notecount").classList.toggle("is-zero", !notes.length);
          $("notechip-l").textContent = T("Defter", "Journal");
          renderAlbum();
          const ul = $("notelist"); ul.innerHTML = "";
          notes.forEach((f) => { const li = document.createElement("li"); xIcoText(li, T(f[0], f[1])); ul.append(li); });
          if (!notes.length) { const li = document.createElement("li"); li.textContent = T("Köylülerle konuş, dedikodular buraya yazılır.", "Talk to villagers; gossip is written here."); li.style.color = "var(--text-secondary)"; ul.append(li); }
          if (PROF && typeof friendLi === "function") friendLi(ul);
          if (PROF && DOST_READY) dostLi(ul);
        }
        $("notechip").addEventListener("click", () => {
          const open = $("notes").hidden; $("notes").hidden = !open; $("notechip").setAttribute("aria-expanded", String(open));
        });
        function hint(v) {
          player.act("Talk");
          const l = S.bag[S.active];
          const about = l && Math.random() < 0.6 ? (Math.random() < 0.5 ? l.ref || l.house : l.house) : HOUSES[Math.floor(Math.random() * HOUSES.length)];
          // riddle letters: half the time, tell where an as-yet-unheard job lives (every job's landmark can be learned)
          // torn letters: likewise tell where an unheard owner's name lives
          const mode = l && l.kind === "riddle" ? 1 : l && l.kind === "torn" ? 5 : 0;
          const unheard = mode ? HOUSES.filter((h) => !notes.some((o) => o[0] === gossipAbout(h, mode)[0])) : [];
          const fact = unheard.length && Math.random() < 0.5 ? gossipAbout(unheard[Math.floor(Math.random() * unheard.length)], mode) : gossipAbout(about);
          if (!notes.some((o) => o[0] === fact[0])) notes.push(fact);
          renderNotes();
          const vi = villagers.indexOf(v);
          say(T("Köylü", "Villager"), T(fact[0], fact[1]), v.p.g.position, v.p.g, 5, voiceOf(V_WALK[Math.max(0, vi) % V_WALK.length], vi + 20));
          // stop, face the postman and talk (seated villagers stay seated)
          v.talkT = 4;
          if (v.kk && v.pose !== "Sit" && v.pose !== "Up" && v.pose !== "Turn") v.kk.once("Talk");
        }
        function showEnd() {
          const secs = Math.round((performance.now() - S.t0) / 1000), stars = S.mistakes <= 1 ? 3 : S.mistakes <= 4 ? 2 : 1;
          xIcoText($("end-stars"), "★".repeat(stars) + "☆".repeat(3 - stars));
          $("end-stars").setAttribute("aria-label", T(`${stars} yıldız`, `${stars} stars`));
          $("end-h").textContent = T("Bütün mektuplar teslim!", "Every letter delivered!");
          xIcoText($("end-p"), T(`🪙 Bu tur +${S.earned} altın (toplam ${S.coins}) · ${S.mistakes} yanlış kapı · ⏱ ${Math.floor(secs / 60)} dk ${secs % 60} sn`, `🪙 +${S.earned} coins this round (${S.coins} total) · ${S.mistakes} wrong doors · ⏱ ${Math.floor(secs / 60)} min ${secs % 60} s`));
          if (game.started) {
            // round end: confetti around the postman, in view behind the end panel
            const cy = player.pos.y + 2.2;
            [[0, 0], [1.6, 0.8], [-1.6, 0.6], [0.8, -1.4], [-0.9, -1.2]].forEach(([ox, oz], i) => confettiFx(new THREE.Vector3(player.pos.x + ox, cy + (i % 2) * 0.6, player.pos.z + oz), i * 0.18));
            // round end: the clear jingle (music ducks under it), the coin tally, and the next round's theme starts downloading
            if (!SND.jingle("jingle_round_complete")) { jingle(); setTimeout(jingle, 450); }
            SND.sfx("sfx_coins_bag", { delay: 0.7 });
            SND.prefetch(DN.track);
          }
          const dx = PX();
          if (dx.ch < DOST.length) $("end-reveal").textContent = T(`📯 Mektupların hepsinde aynı imza var: “Bir Dost”. Kim bu dost? ${dx.ch}/${DOST.length} bölüm okundu; her 10 teslimatta yeni bir mektup gelir.`, `📯 Every letter carries the same signature: “A Friend”. Who could it be? ${dx.ch}/${DOST.length} chapters read; a new letter comes every 10 deliveries.`);
          else $("end-reveal").textContent = T(
            "Mektupların hepsinde aynı imza vardı: “Bir Dost”. O dost, köyün emekli postacısı Hasan Dede'ymiş. Köydeki herkesin güzel haberini toplayıp yazdı ve adres koymadı; köyü tanıyan yeni postacının onları bulacağını biliyordu.",
            "Every letter carried the same signature: “A Friend”. That friend was Hasan Dede, the village's retired postman. He gathered everyone's good news and wrote it out with no address, knowing the new postman would learn the village and find each door."
          );
          $("again").textContent = T("Tekrar Oyna", "Play Again");
          $("end").hidden = false; $("hud").hidden = true; $("prompt").hidden = true; setMail(false); openShop(false);
          game.started = false;
        }
        // music follows the time of day (village theme by day, evening theme at evening and night)
        let round = 1;
        $("again").addEventListener("click", () => {
          round++;
          SND.music(DN.track);
          $("end").hidden = true; $("hud").hidden = false;
          player.pos.set(0, 0, -8.5); player.heading = Math.PI + 0.35; cam.yaw = 0.35;
          resetState(); game.started = true;
          toast(T("Postaneden yeni mektupları al!", "Pick up new letters at the post office!"));
        });

        // ---------- postman rank (XP) and the cosmetics shop ----------
        // XP: 10 per delivery and 5 per rush star; XP, rank, owned and equipped items persist in localStorage
        var PROF = null;
        const PROF_KEY = "adressiz-postaci-profile";
        const RANKS = [
          { xp: 0, tr: "Çırak", en: "Apprentice" },
          { xp: 150, tr: "Postacı", en: "Postman" },
          { xp: 450, tr: "Usta Postacı", en: "Expert" },
          { xp: 1000, tr: "Baş Postacı", en: "Head Postman" },
          { xp: 2000, tr: "Efsane Postacı", en: "Legend" },
        ];
        const rankOf = (xp) => { let r = 0; RANKS.forEach((k, i) => { if (xp >= k.xp) r = i; }); return r; };
        // categories: label, icon, the default colour (for the preview) and the items; price 0 is the free default
        const SHOP_CATS = [
          { id: "scooter", tr: "Scooter", en: "Scooter", ico: "🛴", def: "#5b8fd9", items: [
            ["mint", "#a8e6cf", "Nane", "Mint", 15, 0], ["peach", "#ffc8a2", "Şeftali", "Peach", 15, 0],
            ["lilac", "#cdb4f0", "Leylak", "Lilac", 20, 0], ["sky", "#a7d3f5", "Gök", "Sky", 25, 0],
            ["rose", "#f7b2c4", "Gül", "Rose", 35, 1], ["lemon", "#f6e58d", "Limon", "Lemon", 45, 2],
            ["gold", "#e0b43a", "Altın", "Gold", 60, 3],
          ] },
          { id: "cap", tr: "Kep", en: "Cap", ico: "🧢", def: "#3f6fc4", items: [
            ["red", "#c8473d", "Kiremit", "Brick", 15, 0], ["green", "#4f9a6b", "Çam", "Pine", 20, 0],
            ["navy", "#2c3e6b", "Lacivert", "Navy", 25, 0], ["plum", "#7d4f8f", "Mürdüm", "Plum", 35, 1],
            ["white", "#f2efe6", "Kar", "Snow", 50, 2],
          ] },
          { id: "shirt", tr: "Gömlek", en: "Shirt", ico: "👕", def: "#85ade3", items: [
            ["mint", "#9fd8b0", "Nane", "Mint", 15, 0], ["cream", "#f1e4c6", "Krem", "Cream", 20, 0],
            ["coral", "#f29e8e", "Mercan", "Coral", 30, 0], ["lav", "#b9a7e0", "Lavanta", "Lavender", 40, 1],
            ["olive", "#8b9a5b", "Zeytin", "Olive", 55, 2],
          ] },
          { id: "bag", tr: "Çanta", en: "Bag", ico: "👜", def: "#9a6a3f", items: [
            ["tan", "#c79a62", "Taba", "Tan", 15, 0], ["black", "#3a3330", "Kömür", "Charcoal", 25, 0],
            ["red", "#9e3b33", "Bordo", "Burgundy", 35, 1], ["teal", "#3f7f7a", "Petrol", "Teal", 50, 2],
          ] },
        ];
        const ITEM = {};
        SHOP_CATS.forEach((c) => {
          c.list = [{ id: c.id + "_def", cat: c.id, hex: c.def, tr: "Klasik", en: "Classic", price: 0, rank: 0 }].concat(
            c.items.map(([k, hex, tr, en, price, rank]) => ({ id: c.id + "_" + k, cat: c.id, hex, tr, en, price, rank }))
          );
          c.list.forEach((it) => (ITEM[it.id] = it));
        });
        // village upgrades: id, icon, names, price, what it adds
        const VILL = [
          { id: "garden", ico: "🌷", tr: "Çiçek bahçesi", en: "Flower garden", price: 40, dtr: "Meydanın çevresine rengârenk çiçek tarhları.", den: "Colourful flower beds around the square." },
          { id: "fountain", ico: "⛲", tr: "Süslü çeşme", en: "Fountain upgrade", price: 60, dtr: "Renkli çini halka ve sıçrayan su damlaları.", den: "A coloured tile ring and splashing droplets." },
          { id: "lights", ico: "💡", tr: "Fener dizisi", en: "String lights", price: 80, dtr: "Meydan fenerleri arasında sıcak ışık dizileri.", den: "Warm lights strung between the square's lamp posts." },
          { id: "fair", ico: "🎪", tr: "Panayır", en: "Fair", price: 120, dtr: "Çizgili tenteli üç tezgâh ve flamalar.", den: "Three stalls with striped awnings and bunting." },
          { id: "birds", ico: "🐦", tr: "Kuş evleri", en: "Birdhouses", price: 100, dtr: "Yollar boyunca kuş evleri ve saksı çiçekleri.", den: "Birdhouses and flower pots along the paths." },
        ];
        const VILL_BY = {}; VILL.forEach((u) => (VILL_BY[u.id] = u));
        const vBonus = () => (PROF && PROF.vill ? PROF.vill.length * 0.05 : 0);
        PROF = { xp: 0, rank: 0, coins: 0, owned: [], eq: {}, vill: [], stamps: {}, stampRw: [], x: {} };
        try {
          const sv = JSON.parse(localStorage.getItem(PROF_KEY) || "null");
          if (sv && typeof sv === "object") {
            PROF.xp = Math.max(0, Math.floor(+sv.xp || 0));
            PROF.coins = Math.max(0, Math.floor(+sv.coins || 0));
            if (Array.isArray(sv.owned)) PROF.owned = sv.owned.filter((id) => ITEM[id]);
            if (Array.isArray(sv.vill)) PROF.vill = sv.vill.filter((id, i, a) => VILL_BY[id] && a.indexOf(id) === i);
            if (sv.stamps && typeof sv.stamps === "object") HOUSES.forEach((h) => { const t = +sv.stamps[h.id]; if (t === 1 || t === 2) PROF.stamps[h.id] = t; });
            if (sv.x && typeof sv.x === "object" && !Array.isArray(sv.x)) PROF.x = sv.x; // story, combo gifts, daily streak
            if (Array.isArray(sv.stampRw)) PROF.stampRw = sv.stampRw.filter((k) => STAMP_RW.some((w) => w[0] === k));
            if (sv.eq) SHOP_CATS.forEach((c) => { const id = sv.eq[c.id]; if (ITEM[id] && ITEM[id].cat === c.id) PROF.eq[c.id] = id; });
          }
        } catch (e) { /* fresh profile */ }
        SHOP_CATS.forEach((c) => {
          const d = c.id + "_def";
          if (PROF.owned.indexOf(d) < 0) PROF.owned.push(d);
          if (!PROF.eq[c.id] || PROF.owned.indexOf(PROF.eq[c.id]) < 0) PROF.eq[c.id] = d;
        });
        PROF.rank = rankOf(PROF.xp);
        renderAlbum();
        S.coins = PROF.coins; // the wallet carries over between rounds
        function saveProf() {
          try { localStorage.setItem(PROF_KEY, JSON.stringify({ xp: PROF.xp, rank: PROF.rank, coins: PROF.coins, owned: PROF.owned, eq: PROF.eq, vill: PROF.vill, stamps: PROF.stamps, stampRw: PROF.stampRw, x: PROF.x })); } catch (e) {}
        }
        // saves the wallet whenever S.coins changes (no-op until the profile has loaded)
        function saveCoins() {
          if (!PROF) return;
          const c = Math.max(0, Math.floor(+S.coins || 0));
          if (PROF.coins === c) return;
          PROF.coins = c; saveProf();
        }
        const owns = (id) => PROF.owned.indexOf(id) >= 0;
        const rankName = (r) => RANKS[r][lang()];
        function renderRank() {
          if (!PROF) return;
          const r = PROF.rank, cur = RANKS[r], nx = RANKS[r + 1];
          $("rank-n").textContent = cur[lang()];
          const k = nx ? (PROF.xp - cur.xp) / (nx.xp - cur.xp) : 1;
          $("xp-fill").style.width = Math.round(Math.max(0, Math.min(1, k)) * 100) + "%";
          const lab = nx ? T(`Rütbe: ${cur.tr} · ${PROF.xp}/${nx.xp} XP`, `Rank: ${cur.en} · ${PROF.xp}/${nx.xp} XP`) : T(`Rütbe: ${cur.tr} · ${PROF.xp} XP`, `Rank: ${cur.en} · ${PROF.xp} XP`);
          $("rank").setAttribute("aria-label", lab); $("rank").title = lab;
          $("shopchip-l").textContent = T("Dükkân", "Shop");
          $("shopchip").setAttribute("aria-label", T("Dükkân", "Shop"));
          if (!$("shop").hidden) renderShop();
        }
        function gainXP(n) {
          const before = PROF.rank;
          PROF.xp += n; PROF.rank = rankOf(PROF.xp); saveProf(); renderRank();
          const rk = $("rank"); rk.classList.remove("is-gain"); void rk.offsetWidth; rk.classList.add("is-gain");
          // the rank-up moment waits for the delivery toast and the rush stars to clear
          if (PROF.rank > before) setTimeout(() => rankUp(PROF.rank), 2700);
        }
        function rankUp(r) {
          if (r >= 1 && !PX().villSeen && $("shopnew")) $("shopnew").hidden = false;
          const unl = Object.keys(ITEM).filter((id) => ITEM[id].rank === r).length;
          toast(T(`🎉 Rütbe atladın: ${RANKS[r].tr}!${unl ? ` Dükkânda ${unl} yeni renk açıldı.` : ""}`, `🎉 Rank up: ${RANKS[r].en}!${unl ? ` ${unl} new colours in the shop.` : ""}`), 3600);
          if (!SND.jingle("jingle_round_complete", { dur: 1.9 })) jingle();
          const rk = $("rank"); rk.classList.remove("is-up"); void rk.offsetWidth; rk.classList.add("is-up");
          const cy = player.pos.y + 2.4;
          [[0, 0], [1.2, 0.6], [-1.2, -0.5]].forEach(([ox, oz], i) => {
            const p = new THREE.Vector3(player.pos.x + ox, cy + (i % 2) * 0.5, player.pos.z + oz);
            if (sheetTex("confetti")) confettiFx(p, i * 0.15); else if (i === 0) burst(p.x, p.y, p.z);
          });
          if (navigator.vibrate) try { navigator.vibrate([30, 40, 60]); } catch (e) {}
        }
        // 3D materials per category, each [material, shade, original colour]
        const cosMats = { scooter: [], cap: [], shirt: [], bag: [] };
        function applyCos(cat) {
          (cat ? [cat] : Object.keys(cosMats)).forEach((c) => {
            const it = ITEM[PROF.eq[c]];
            cosMats[c].forEach(([mt, shade, orig]) => {
              if (!it || it.price === 0) mt.color.copy(orig);
              else { mt.color.set(it.hex); if (shade !== 1) mt.color.multiplyScalar(shade); }
            });
          });
        }
        window.__cosAttach = (cos) => {
          if (!cos) return;
          Object.keys(cos).forEach((c) => { cosMats[c] = cos[c].map(([mt, s]) => [mt, s, mt.color.clone()]); });
          applyCos();
        };
        if (scooter.body) cosMats.scooter.push([scooter.body, 1, scooter.body.color.clone()]);
        applyCos("scooter");
        // ---- the shop panel ----
        const shop = { cat: "scooter", sel: null };
        const hexShade = (hex, s) => {
          const n = parseInt(hex.slice(1), 16), f = (v) => Math.max(0, Math.min(255, Math.round(v * s)));
          return `rgb(${f(n >> 16)} ${f((n >> 8) & 255)} ${f(n & 255)})`;
        };
        function paintPreview() {
          const col = {};
          SHOP_CATS.forEach((c) => { col[c.id] = ITEM[PROF.eq[c.id]].hex; });
          if (shop.sel) col[ITEM[shop.sel].cat] = ITEM[shop.sel].hex;
          $("shop-svg").querySelectorAll("[data-part]").forEach((el) => {
            const v = hexShade(col[el.getAttribute("data-part")], parseFloat(el.getAttribute("data-shade") || "1"));
            if (el.getAttribute("data-paint") === "stroke") el.style.stroke = v; else el.style.fill = v;
          });
        }
        const VTAB = { id: "village", tr: "Köyü Güzelleştir", en: "Improve Village", ico: "🏡" };
        function shopTop() {
          const vil = shop.cat === VTAB.id;
          $("shop-svg").style.display = vil ? "none" : "";
          $("shop-vico").hidden = !vil;
          $("shop-note").classList.toggle("is-bonus", vil);
          $("shop-h").textContent = T("Dükkân", "Shop");
          $("shop-close").textContent = T("Kapat", "Close");
          $("shop-coins").textContent = S.coins;
          const nx = RANKS[PROF.rank + 1];
          $("shop-rank").textContent = `${rankName(PROF.rank)} · ${PROF.xp}${nx ? "/" + nx.xp : ""} XP`;
          $("shop-tabs").setAttribute("aria-label", T("Kategoriler", "Categories"));
          $("shop-svg").setAttribute("aria-label", T("Postacının önizlemesi", "Preview of the postman"));
          // tabs
          const tabs = $("shop-tabs"); tabs.textContent = "";
          if (shop.cat === VTAB.id && !unl("vill")) shop.cat = SHOP_CATS[0].id;
          SHOP_CATS.concat(unl("vill") ? [VTAB] : []).forEach((c) => {
            const b = document.createElement("button");
            b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", String(c.id === shop.cat));
            xIcoText(b, `${c.ico} ${c[lang()]}`);
            b.addEventListener("click", () => { if (shop.cat === c.id) return; shop.cat = c.id; shop.sel = null; SND.sfx("ui_tap", { vol: 0.35 }); renderShop(); });
            tabs.append(b);
          });
        }
        function renderShop() {
          shopTop();
          if (shop.cat === VTAB.id) { renderVillage(); return; }
          const cat = SHOP_CATS.find((c) => c.id === shop.cat), eqId = PROF.eq[cat.id];
          if (!shop.sel || !ITEM[shop.sel] || ITEM[shop.sel].cat !== cat.id) shop.sel = eqId;
          // swatches
          const grid = $("shop-grid"); grid.textContent = "";
          grid.setAttribute("aria-label", cat[lang()]);
          cat.list.forEach((it) => {
            const b = document.createElement("button"), mine = owns(it.id), locked = !mine && PROF.rank < it.rank, eq = it.id === eqId;
            b.type = "button"; b.className = "x-sw" + (eq ? " is-eq" : "") + (locked ? " is-lock" : "");
            b.setAttribute("aria-pressed", String(it.id === shop.sel));
            const dot = document.createElement("span"); dot.className = "x-sw__dot";
            dot.style.background = it.id === "scooter_gold" ? "linear-gradient(135deg, #f8e08e, #e0b43a 55%, #a87b1c)" : it.hex;
            const nm = document.createElement("span"); nm.textContent = it[lang()];
            const tg = document.createElement("span"); tg.className = "x-sw__tag";
            xIcoText(tg, eq ? T("✓ Takılı", "✓ Equipped") : mine ? T("Sende", "Owned") : locked ? `🔒 ${rankName(it.rank)}` : `${it.price} 🪙`);
            b.append(dot, nm, tg);
            b.addEventListener("click", () => pickItem(it.id));
            grid.append(b);
          });
          // the selected item and its action
          const it = ITEM[shop.sel], mine = owns(it.id), locked = !mine && PROF.rank < it.rank, buy = $("shop-buy");
          const sel = $("shop-sel"); sel.textContent = `${cat[lang()]}: ${it[lang()]}`;
          const sm = document.createElement("small");
          sm.textContent = it.id === eqId ? T("Şu an takılı", "Equipped now") : mine ? T("Sende; dokun, tak.", "Yours: tap to equip.") : locked ? T(`${rankName(it.rank)} rütbesinde açılır`, `Unlocks at ${rankName(it.rank)}`) : T("Önizleme", "Preview");
          sel.append(sm);
          if (mine) buy.hidden = true;
          else {
            buy.hidden = false;
            buy.disabled = locked || S.coins < it.price;
            xIcoText(buy, locked ? `🔒 ${rankName(it.rank)}` : S.coins < it.price ? T(`${it.price} 🪙 gerekli`, `Need ${it.price} 🪙`) : T(`Satın al · ${it.price} 🪙`, `Buy · ${it.price} 🪙`));
          }
          $("shop-note").textContent = T(
            "Altının cüzdanında kalır; turlar arasında sıfırlanmaz. Aldığın renkler ve rütben de kalıcıdır.",
            "Coins stay in your wallet and carry over between rounds. Colours you buy and your rank are kept too."
          );
          paintPreview();
        }
        function equip(id) {
          const it = ITEM[id]; PROF.eq[it.cat] = id; saveProf(); applyCos(it.cat);
        }
        function pickItem(id) {
          shop.sel = id;
          if (owns(id)) {
            if (PROF.eq[ITEM[id].cat] !== id) { equip(id); SND.sfx("ui_confirm"); }
          } else SND.sfx("ui_tap", { vol: 0.35 });
          renderShop();
        }
        function buyItem() {
          if (shop.cat === VTAB.id) { buyVill(); return; }
          const it = ITEM[shop.sel];
          if (!it || owns(it.id)) return;
          if (PROF.rank < it.rank) { buzz(); toast(T(`Önce ${rankName(it.rank)} ol.`, `Reach ${rankName(it.rank)} first.`)); return; }
          if (S.coins < it.price) { buzz(); toast(T(`${it.price} 🪙 gerekli.`, `You need ${it.price} 🪙.`)); return; }
          S.coins -= it.price; PROF.owned.push(it.id); equip(it.id);
          SND.sfx("sfx_coins_bag"); SND.sfx("ui_confirm", { delay: 0.15 });
          renderHUD(); renderShop();
          toast(T(`${it.tr} ${SHOP_CATS.find((c) => c.id === it.cat).tr.toLocaleLowerCase("tr")} senin!`, `${it.en} ${SHOP_CATS.find((c) => c.id === it.cat).en.toLowerCase()} is yours!`));
        }
        function openShop(open) {
          const el = $("shop");
          if (open === !el.hidden) return;
          if (open) { setMail(false); shop.sel = null; renderShop(); }
          el.hidden = !open;
          $("shopchip").setAttribute("aria-expanded", String(open));
          SND.sfx(open ? "ui_open" : "ui_close");
          if (open) $("shop-close").focus({ preventScroll: true }); else $("shopchip").focus({ preventScroll: true });
        }
        $("shopchip").addEventListener("click", () => { if (game.started) openShop($("shop").hidden); });
        $("shop-close").addEventListener("click", () => openShop(false));
        $("shop-buy").addEventListener("click", buyItem);
        $("shop").addEventListener("pointerdown", (e) => { e.stopPropagation(); if (e.target === $("shop")) openShop(false); });
        addEventListener("keydown", (e) => { if (e.code === "Escape" && !$("shop").hidden) openShop(false); });

        // ---------- village upgrades: light geometry bought with wallet coins, rebuilt from the profile on load ----------
        const hasV = (id) => PROF.vill.indexOf(id) >= 0;
        const VSPOT = (() => {
          // fixed spots, worked out once before any upgrade adds colliders: clear of paths, the post office, props and the river
          const pathAng = HOUSES.map((h) => Math.atan2(h.pathPts[0][1], h.pathPts[0][0]));
          const angD = (a, b) => { const d = Math.abs(a - b) % 6.283; return d > Math.PI ? 6.283 - d : d; };
          const freeAng = (a, pad) => pathAng.every((p) => angD(a, p) > pad) && angD(a, -Math.PI / 2) > 0.7;
          const clear = (x, z, r) => colliders.every((c) => Math.hypot(x - c.x, z - c.z) > (c.t === 0 ? c.r : Math.max(c.hw, c.hd)) + r);
          const segs = []; pathPts.forEach((p) => { for (let i = 0; i < p.length - 1; i++) segs.push([p[i][0], p[i][1], p[i + 1][0], p[i + 1][1]]); });
          const pathDist = (x, z) => segs.reduce((m, [ax, az, bx, bz]) => {
            const dx = bx - ax, dz = bz - az, k = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz || 1)));
            return Math.min(m, Math.hypot(x - ax - dx * k, z - az - dz * k));
          }, 1e9);
          const at = (a, r) => [Math.cos(a) * r, Math.sin(a) * r];
          // fair: three stalls on the south edge, nearest the middle first
          const stalls = [];
          const cands = []; for (let a = 0.95; a <= 2.75; a += 0.05) cands.push(a);
          cands.sort((p, q) => angD(p, Math.PI / 2) - angD(q, Math.PI / 2));
          const pickStalls = (list) => list.forEach((a) => {
            const [x, z] = at(a, 12.8);
            if (stalls.length < 3 && freeAng(a, 0.32) && clear(x, z, 1.8) && stalls.every((s) => angD(s, a) > 0.3)) stalls.push(a);
          });
          pickStalls(cands);
          if (stalls.length < 3) { const all = []; for (let a = 0; a < 6.28; a += 0.05) all.push(a); pickStalls(all); }
          stalls.sort((p, q) => p - q);
          // flower beds: spaced around the inside of the rim, clear of the stalls
          const beds = [];
          for (let a = 0; a < 6.28 && beds.length < 9; a += 0.1) {
            const [x, z] = at(a, 13.3);
            if (freeAng(a, 0.22) && clear(x, z, 1.2) && stalls.every((s) => angD(s, a) > 0.36) && beds.every((b) => angD(b, a) > 0.55)) beds.push(a);
          }
          // birdhouses and pots: beside the first stretch of each house's path
          const birds = [], pots = [];
          const ok = (x, z, r) => Math.hypot(x, z) > 16.5 && Math.abs(x - riverX(z)) > 8 && !inWater(x, z) && clear(x, z, r) && pathDist(x, z) > 1.45;
          HOUSES.forEach((h, i) => {
            const [a, b] = h.pathPts, dx = b[0] - a[0], dz = b[1] - a[1], L = Math.hypot(dx, dz);
            if (L < 5) return;
            const ux = dx / L, uz = dz / L, px = -uz, pz = ux, side = i % 4 < 2 ? 1 : -1;
            if (i % 2 === 0 && L > 8 && birds.length < 8) {
              const x = a[0] + ux * 6 + px * 2.1 * side, z = a[1] + uz * 6 + pz * 2.1 * side;
              if (ok(x, z, 0.5)) birds.push([x, z, Math.atan2(-px * side, -pz * side)]);
            }
            for (const s of [1, -1]) {
              const x = a[0] + ux * 3 + px * 1.8 * s, z = a[1] + uz * 3 + pz * 1.8 * s;
              if (pots.length < 16 && ok(x, z, 0.4)) pots.push([x, z]);
            }
          });
          return { stalls: stalls.map((a) => at(a, 12.8)), beds: beds.map((a) => at(a, 13.3)), birds, pots };
        })();
        const VG = {}; // built upgrades: { root, parts, fx }
        const PASTEL = ["#f7b2c4", "#a8e6cf", "#cdb4f0", "#ffd8a8", "#a7d3f5"];
        const FLOWER = ["#ff6b9a", "#ffd166", "#ef476f", "#c77dff", "#ffffff", "#ff9f1c", "#7bdff2"];
        const vGeo = { stem: new THREE.CylinderGeometry(0.025, 0.025, 0.3, 4), head: new THREE.IcosahedronGeometry(0.09, 0), bulb: new THREE.IcosahedronGeometry(0.085, 0), flag: new THREE.CircleGeometry(0.17, 3).rotateZ(-Math.PI / 2).translate(0, -0.085, 0) };
        const flagMats = PASTEL.map((c) => new THREE.MeshLambertMaterial({ color: c, side: THREE.DoubleSide }));
        const faceIn = (x, z) => Math.atan2(-x, -z);
        function flowers(g, n, w, d, y, seed) {
          for (let i = 0; i < n; i++) {
            const fx = ((i % 4) / 3 - 0.5) * w + (((i * 37) % 7) / 7 - 0.5) * 0.12, fz = (i % 2 ? 0.5 : -0.5) * d * (i % 3 ? 1 : 0.2);
            mesh(vGeo.stem, "#4f9a6b", fx, y + 0.15, fz, g, false);
            mesh(vGeo.head, FLOWER[(i + seed) % FLOWER.length], fx, y + 0.32, fz, g, false);
          }
        }
        // a string of triangle pennants from a to b (world points), hung in a sagging curve
        function bunting(part, a, b, sag) {
          const pts = [], n = Math.max(4, Math.round(a.distanceTo(b) / 0.45)), rot = -Math.atan2(b.z - a.z, b.x - a.x);
          for (let i = 0; i <= n; i++) {
            const k = i / n, p = new THREE.Vector3().lerpVectors(a, b, k).sub(part.position); p.y -= Math.sin(k * Math.PI) * sag; pts.push(p);
            if (i > 0 && i < n) { const f = new THREE.Mesh(vGeo.flag, flagMats[i % flagMats.length]); f.position.copy(p); f.rotation.y = rot; part.add(f); }
          }
          part.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: "#6b5444" })));
        }
        function buildVill(id) {
          if (VG[id]) return VG[id];
          const root = new THREE.Group(), parts = [], fx = [];
          scene.add(root);
          const part = (x, y, z) => { const g = new THREE.Group(); g.position.set(x, y, z); root.add(g); parts.push(g); return g; };
          if (id === "garden") {
            VSPOT.beds.forEach(([x, z], i) => {
              const g = part(x, groundY(x, z), z); g.rotation.y = faceIn(x, z);
              box(1.8, 0.22, 0.7, "#8a5a3c", 0, 0.11, 0, g);
              box(1.65, 0.06, 0.56, "#5a3b24", 0, 0.23, 0, g).castShadow = false;
              flowers(g, 8, 1.4, 0.4, 0.24, i * 3);
              if (i % 2 === 0) fx.push(new THREE.Vector3(x, g.position.y + 0.8, z));
            });
          } else if (id === "fountain") {
            const g = part(0, 0, 0), seg = 6.283 / 24, TILE = ["#3a86c8", "#f4f1de", "#e07a5f", "#f4f1de"];
            for (let i = 0; i < 24; i++) {
              mesh(new THREE.RingGeometry(3.45, 4.2, 1, 1, i * seg, seg).rotateX(-Math.PI / 2), TILE[i % 4], 0, 0.066, 0, g, false);
              mesh(new THREE.RingGeometry(2.88, 3.18, 1, 1, i * seg, seg).rotateX(-Math.PI / 2), TILE[(i + 1) % 4], 0, 0.706, 0, g, false);
            }
            mesh(new THREE.CylinderGeometry(3.43, 3.45, 0.16, 24, 1, true), "#3a86c8", 0, 0.5, 0, g, false);
            // water droplet sprites arcing out of the top bowl
            const tex = canvasTex(64, 64, (x) => {
              x.fillStyle = "#7fd0ff"; x.beginPath(); x.moveTo(32, 6); x.quadraticCurveTo(54, 36, 32, 58); x.quadraticCurveTo(10, 36, 32, 6); x.fill();
              x.fillStyle = "rgb(255 255 255 / 0.85)"; x.beginPath(); x.arc(26, 38, 5, 0, 6.283); x.fill();
            });
            const drops = [];
            for (let i = 0; i < 8; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false })); s.scale.set(0.26, 0.26, 1); g.add(s); drops.push(s); }
            anims.push((t) => drops.forEach((s, i) => {
              const ph = (t * 0.6 + i / 8) % 1, a = (i / 8) * 6.283 + 0.2, r = 0.9 + ph * 2.1;
              s.position.set(Math.cos(a) * r, 2.6 + Math.sin(ph * Math.PI) * 1.3 - ph * 1.9, Math.sin(a) * r);
              s.material.opacity = Math.min(1, (1 - ph) * 4);
            }));
            [[0, 3.2, 0], [3.8, 0.6, 0], [-2.7, 0.6, 2.7], [0, 0.6, -3.8]].forEach(([x, y, z]) => fx.push(new THREE.Vector3(x, y, z)));
          } else if (id === "lights") {
            const COL = ["#ffe9a8", "#ffc46b", "#fff4d6", "#ffb38a"], mats = COL.map((c) => new THREE.MeshBasicMaterial({ color: c })), base = mats.map((m) => m.color.clone());
            // three sides of the square; the post office side stays clear
            [[[11, -11], [11, 11]], [[11, 11], [-11, 11]], [[-11, 11], [-11, -11]]].forEach(([[ax, az], [bx, bz]]) => {
              const a = new THREE.Vector3(ax, 3.12, az), b = new THREE.Vector3(bx, 3.12, bz), g = part((ax + bx) / 2, 0, (az + bz) / 2), pts = [];
              for (let i = 0; i <= 24; i++) {
                const k = i / 24, p = new THREE.Vector3().lerpVectors(a, b, k).sub(g.position); p.y -= Math.sin(k * Math.PI) * 0.85; pts.push(p);
                if (i > 0 && i < 24) { const m = new THREE.Mesh(vGeo.bulb, mats[i % 4]); m.position.copy(p).y -= 0.09; g.add(m); }
              }
              g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: "#4a3b2f" })));
              fx.push(new THREE.Vector3(g.position.x, 2.4, g.position.z));
            });
            anims.push((t) => mats.forEach((m, i) => m.color.copy(base[i]).multiplyScalar((0.82 + 0.18 * Math.sin(t * 2.2 + i * 1.7)) * (0.72 + 1.0 * DN.glow))));
          } else if (id === "fair") {
            const tops = [];
            VSPOT.stalls.forEach(([x, z], i) => {
              const g = part(x, groundY(x, z), z), r = faceIn(x, z), col = PASTEL[i % PASTEL.length];
              g.rotation.y = r;
              box(2.4, 0.9, 0.8, "#c98b4a", 0, 0.45, 0.3, g);
              box(2.5, 0.08, 0.9, "#e8d2a6", 0, 0.94, 0.3, g);
              for (const sx of [-1.15, 1.15]) { box(0.1, 2.5, 0.1, "#8a5a3c", sx, 1.25, -0.6, g); box(0.1, 2.1, 0.1, "#8a5a3c", sx, 1.05, 0.75, g); }
              const aw = new THREE.Group(); aw.position.set(0, 2.32, 0.15); aw.rotation.x = 0.24; g.add(aw);
              for (let s = 0; s < 6; s++) box(0.44, 0.05, 1.8, s % 2 ? "#fffaf0" : col, -1.1 + s * 0.44, 0, 0, aw).castShadow = s === 0;
              for (let k = 0; k < 4; k++) mesh(vGeo.head, FLOWER[(k + i * 2) % FLOWER.length], -0.75 + k * 0.5, 1.06, 0.35, g).scale.setScalar(1.6);
              addBox(x, z, r, 1.25, 0.8);
              g.updateMatrixWorld(true);
              // bunting along the front of each awning, and across to the next stall when it is close
              const L = g.localToWorld(new THREE.Vector3(-1.2, 2.08, 1.02)), R = g.localToWorld(new THREE.Vector3(1.2, 2.08, 1.02));
              bunting(part(x, 0, z), L, R, 0.08);
              tops.push([g.localToWorld(new THREE.Vector3(-1.15, 2.5, -0.6)), g.localToWorld(new THREE.Vector3(1.15, 2.5, -0.6))]);
              fx.push(new THREE.Vector3(x, g.position.y + 2.6, z));
            });
            for (let i = 0; i < tops.length - 1; i++) {
              const a = tops[i][1].distanceTo(tops[i + 1][0]) < tops[i][0].distanceTo(tops[i + 1][0]) ? tops[i][1] : tops[i][0], b = tops[i + 1][0].distanceTo(a) < tops[i + 1][1].distanceTo(a) ? tops[i + 1][0] : tops[i + 1][1];
              if (a.distanceTo(b) < 7) bunting(part((a.x + b.x) / 2, 0, (a.z + b.z) / 2), a, b, 0.45);
            }
          } else if (id === "birds") {
            VSPOT.birds.forEach(([x, z, r], i) => {
              const g = part(x, groundY(x, z), z); g.rotation.y = r;
              cyl(0.06, 0.07, 2.2, 6, "#8a5a3c", 0, 1.1, 0, g);
              box(0.5, 0.5, 0.45, PASTEL[i % PASTEL.length], 0, 2.42, 0, g);
              prism(0.7, 0.62, 0.3, ["#c0392b", "#3f7f7a", "#7d4f8f"][i % 3], 0, 2.67, 0, g).rotation.y = Math.PI / 2;
              cyl(0.08, 0.08, 0.04, 8, "#2b1d14", 0, 2.48, 0.23, g).rotation.x = Math.PI / 2;
              cyl(0.02, 0.02, 0.18, 4, "#5c3a1e", 0, 2.32, 0.3, g).rotation.x = Math.PI / 2;
            });
            VSPOT.pots.forEach(([x, z], i) => {
              const g = part(x, groundY(x, z), z);
              cyl(0.22, 0.16, 0.32, 7, "#c8643b", 0, 0.16, 0, g);
              ball(0.24, "#5aa05f", 0, 0.42, 0, g).castShadow = false;
              for (let k = 0; k < 3; k++) mesh(vGeo.head, FLOWER[(i + k * 2) % FLOWER.length], Math.cos(k * 2.1) * 0.15, 0.6, Math.sin(k * 2.1) * 0.15, g, false);
            });
            VSPOT.birds.forEach(([x, z]) => fx.push(new THREE.Vector3(x, groundY(x, z) + 2.6, z)));
          }
          return (VG[id] = { root, parts, fx });
        }
        PROF.vill.forEach((id) => buildVill(id));
        // the new piece pops in with a sparkle and the delivery jingle; the camera glances over when free
        function showVill(v) {
          const near = v.fx.slice().sort((a, b) => a.distanceToSquared(player.pos) - b.distanceToSquared(player.pos)).slice(0, 4);
          if (!near.length) return;
          v.parts.forEach((g, i) => { g.scale.setScalar(0.001); tw(0.45, (k) => g.scale.setScalar(Math.max(0.001, k < 0.7 ? eo(k / 0.7) * 1.12 : lerp(1.12, 1, (k - 0.7) / 0.3))), 0.45 + (i % 12) * 0.04); });
          const c = near[0].clone();
          if (game.started && !busy && !cine.lock) {
            busy = cine.lock = true;
            let dx = camera.position.x - c.x, dz = camera.position.z - c.z; const L = Math.hypot(dx, dz) || 1; dx /= L; dz /= L;
            cine.look.copy(c); cine.pos.set(c.x + dx * 9, c.y + 4.5, c.z + dz * 9);
            tw(0.5, (k) => (cine.w = eio(k)));
            tw(0.5, (k) => (cine.w = 1 - eio(k)), 2.8, () => { cine.lock = false; busy = false; });
          }
          near.forEach((p, i) => tw(0, () => { if (!playFx("sparkle", p, 2.6, 24, { fade: true })) { if (i === 0) burst(p.x, p.y, p.z); } }, 0.55 + i * 0.12));
          tw(0, () => {
            if (!SND.jingle("jingle_delivery_success")) [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.45, "sine", 0.16));
            SND.sfx("sfx_hint_sparkle", { delay: 0.1 }); vib([20, 40, 20]);
          }, 0.55);
        }
        function renderVillage() {
          const grid = $("shop-grid"); grid.textContent = "";
          grid.setAttribute("aria-label", VTAB[lang()]);
          if (!VILL_BY[shop.sel]) shop.sel = (VILL.find((u) => !hasV(u.id)) || VILL[0]).id;
          VILL.forEach((u) => {
            const b = document.createElement("button"), mine = hasV(u.id);
            b.type = "button"; b.className = "x-sw" + (mine ? " is-eq" : ""); b.setAttribute("aria-pressed", String(u.id === shop.sel));
            const ic = document.createElement("span"); ic.className = "x-sw__ico"; ic.setAttribute("aria-hidden", "true"); ic.textContent = u.ico;
            const nm = document.createElement("span"); nm.textContent = u[lang()];
            const tg = document.createElement("span"); tg.className = "x-sw__tag";
            xIcoText(tg, mine ? T("✓ Köyde", "✓ Built") : `${u.price} 🪙`);
            b.append(ic, nm, tg);
            b.addEventListener("click", () => { shop.sel = u.id; SND.sfx("ui_tap", { vol: 0.35 }); renderVillage(); });
            grid.append(b);
          });
          const u = VILL_BY[shop.sel], mine = hasV(u.id), buy = $("shop-buy"), sel = $("shop-sel");
          $("shop-vico").textContent = u.ico;
          sel.textContent = u[lang()];
          const sm = document.createElement("small"); sm.textContent = (mine ? T("Köyünde. ", "In your village. ") : "") + T(u.dtr + " +%5 altın.", u.den + " +5% coins."); sel.append(sm);
          if (mine) buy.hidden = true;
          else {
            buy.hidden = false; buy.disabled = S.coins < u.price;
            xIcoText(buy, S.coins < u.price ? T(`${u.price} 🪙 gerekli`, `Need ${u.price} 🪙`) : T(`Satın al · ${u.price} 🪙`, `Buy · ${u.price} 🪙`));
          }
          const n = PROF.vill.length;
          xIcoText($("shop-note"), T(`🏡 Köy bonusu: her teslimatta +%${n * 5} altın (${n}/${VILL.length} süs, her biri +%5).`, `🏡 Village bonus: +${n * 5}% coins per delivery (${n}/${VILL.length} upgrades, +5% each).`));
        }
        function buyVill() {
          const u = VILL_BY[shop.sel];
          if (!u || hasV(u.id)) return;
          if (S.coins < u.price) { buzz(); toast(T(`${u.price} 🪙 gerekli.`, `You need ${u.price} 🪙.`)); return; }
          S.coins -= u.price; PROF.vill.push(u.id); saveCoins(); saveProf();
          SND.sfx("sfx_coins_bag"); SND.sfx("ui_confirm", { delay: 0.15 });
          renderHUD();
          const v = buildVill(u.id);
          openShop(false);
          showVill(v);
          toast(T(`${u.ico} ${u.tr} köyde! Köy bonusu artık +%${PROF.vill.length * 5}.`, `${u.ico} ${u.en} built! Village bonus is now +${PROF.vill.length * 5}%.`), 3200);
        }

        // ---------- scooter: mount, dismount, toss ----------
        const nearScooter = () => Math.hypot(player.pos.x - scooter.g.position.x, player.pos.z - scooter.g.position.z) < 3;
        function toggleScooter() {
          if (!game.started || S.over || busy || cine.lock || scooter.hop || jump.t >= 0) return;
          if (scooter.riding) {
            // step off to the right; the scooter stays parked on its kickstand
            Object.assign(scooter, { riding: false, kick: false, v: 0 }); player.radius = 0.5;
            const bx = player.pos.x, bz = player.pos.z, sh = Math.sin(player.heading), ch = Math.cos(player.heading);
            scooter.park(bx, bz, player.heading);
            player.pos.x = bx - ch * 0.9; player.pos.z = bz + sh * 0.9;
            collide();
            if (inWater(player.pos.x, player.pos.z)) { player.pos.x = bx + ch * 0.9; player.pos.z = bz - sh * 0.9; collide(); }
            if (inWater(player.pos.x, player.pos.z)) { player.pos.x = bx; player.pos.z = bz; }
            player.pos.y = groundY(player.pos.x, player.pos.z);
            mv.x = mv.z = 0; pm.pivot.position.set(0, 0, 0);
            if (player.kk) player.kk.ride(false);
            tone(330, 0, 0.08, "triangle", 0.12); tone(220, 0.06, 0.08, "triangle", 0.1); // kickstand click
            toast(T("Scooterdan indin.", "You got off the scooter."));
          } else {
            if (!nearScooter()) { toast(T("Önce scootera yürü: haritada 🛴 işareti.", "Walk to the scooter first: look for 🛴 on the map.")); return; }
            // 0.25 s hop onto the deck, then one kick to get going
            Object.assign(scooter, { riding: true, hop: { t: 0, x: player.pos.x, z: player.pos.z }, v: 0, kp: 0, kick: false, boost: 0 });
            player.radius = 0.75; player.heading = feel.h = scooter.g.rotation.y; mv.x = mv.z = 0;
            scooter.g.rotation.set(0, player.heading, 0); scooter.ks.rotation.set(-1.45, 0, 0);
            if (player.kk) player.kk.ride(true);
            if (!SND.sfx("sfx_bell_ding")) { tone(660, 0, 0.08, "triangle", 0.1); tone(880, 0.08, 0.1, "triangle", 0.08); }
            toast(TK("Scootera bindin! 2,4 kat hızlısın: tekme at, süzül. E ile kapıya 4,5 m'den mektup at.", "On the scooter! 2.4× faster: kick, then glide. Press E to toss a letter from 4.5 m.", "Scootera bindin! 2,4 kat hızlısın: tekme at, süzül. At'a dokunup kapıya 4,5 m'den mektup at.", "On the scooter! 2.4× faster: kick, then glide. Tap Toss to throw a letter from 4.5 m."), 3000);
          }
        }
        function tossLetter(h) {
          if (!S.bag[S.active]) { deliver(h); return; }
          const right = S.bag.some((b) => b.house === h), style = player.speed > 6;
          busy = true; player.act("Throw");
          const env = new THREE.Group();
          tpart(CG.sphere, "#fff8ec", env, 0, 0, 0, 0.2, 0.015, 0.14);
          tpart(CG.sphere, "#e4572e", env, 0, 0.012, 0, 0.04, 0.012, 0.04).castShadow = false;
          scene.add(env);
          // from the scooter the envelope leaves the right hand; on foot, from chest height
          const hand = scooter.riding && player.kk && player.kk.hand;
          const from = hand ? hand.getWorldPosition(new THREE.Vector3()) : new THREE.Vector3(player.pos.x, player.pos.y + 1.3, player.pos.z), to = new THREE.Vector3(h.door2.x, groundY(h.door2.x, h.door2.z) + 1.0, h.door2.z);
          env.position.copy(from);
          if (!SND.sfx("sfx_toss_whoosh", { rate: 0.95 + Math.random() * 0.1 })) { tone(1320, 0, 0.08, "triangle", 0.1); tone(990, 0.06, 0.1, "triangle", 0.08); }
          tw(0.5, (k) => {
            env.position.lerpVectors(from, to, k); env.position.y += Math.sin(k * Math.PI) * 1.6;
            env.rotation.set(k * 2, k * 6.283 * 3, 0);
          }, 0, () => {
            scene.remove(env); busy = false;
            SND.sfx("sfx_letter_land", { rate: 0.95 + Math.random() * 0.1 });
            deliver(h);
            if (right && style) {
              S.coins += 1; renderHUD();
              SND.sfx("sfx_coin", { delay: 1.1, rate: 1.15 });
              tw(0, () => toast(T("+1 🪙 stil bonusu: hızlı scooter teslimatı!", "+1 🪙 style bonus: a fast scooter delivery!")), 1.1);
            }
          });
        }

        // ---------- per-frame audio: footsteps, scooter roll, river, animals ----------
        let pathSegs = null;
        function onDirt(x, z) { // footstep surface (was a second onPath that shadowed the terrain one and crashed groundY at load)
          if (Math.hypot(x, z) < 16.2) return true; // the square
          for (const b of BRIDGES) if (onDeck(b, x, z, 0.3)) return true;
          if (!pathSegs) { pathSegs = []; pathPts.forEach((pts) => { for (let i = 0; i < pts.length - 1; i++) pathSegs.push([pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]]); }); }
          for (const [ax, az, bx, bz] of pathSegs) {
            const dx = bx - ax, dz = bz - az, L2 = dx * dx + dz * dz || 1, k = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / L2));
            if (Math.hypot(x - ax - dx * k, z - az - dz * k) < 1.45) return true;
          }
          return false;
        }
        const crossed = (a, b, c) => (b >= a ? a < c && c <= b : c > a || c <= b);
        const au = { p: -1, ph: null, animT: 12 + Math.random() * 15 }, _camR = new THREE.Vector3();
        let stepSide = 1;
        function step(run) {
          const n = 1 + Math.floor(Math.random() * 4), dirt = onDirt(player.pos.x, player.pos.z);
          SND.sfx((dirt ? "sfx_step_dirt_" : "sfx_step_grass_") + n, { vol: run ? 0.25 : 0.14, rate: 0.92 + Math.random() * 0.16 });
          // a small puff under each running footfall on the dirt paths
          if (run && dirt && !perf.low) {
            stepSide = -stepSide;
            const h = player.heading, sx = Math.cos(h) * 0.16 * stepSide, sz = -Math.sin(h) * 0.16 * stepSide, x = player.pos.x + sx, z = player.pos.z + sz;
            dustPuff(x, groundY(x, z) + 0.04, z, { vx: -Math.sin(h) * 0.5, vy: 0.25, vz: -Math.cos(h) * 0.5, s0: 0.2, s1: 0.55, life: 0.45, op: 0.35 });
          }
        }
        // speed lines: thin streaks at the screen edges near top speed (off under reduced motion and in performance mode)
        let slEl = null, slOn = -1;
        function speedLines(k) {
          const v = FX.calm || perf.low ? 0 : Math.max(0, Math.min(1, (k - 0.72) / 0.25));
          if (!slEl) {
            if (v <= 0) return;
            slEl = document.createElement("div"); slEl.className = "x-speed"; slEl.setAttribute("aria-hidden", "true");
            for (let i = 0; i < 14; i++) {
              const a = (i / 14) * 6.283 + (i % 2) * 0.17, o = document.createElement("i"), b = document.createElement("b");
              o.style.transform = `rotate(${a.toFixed(3)}rad)`; b.style.animationDelay = `${((i * 0.137) % 0.5).toFixed(2)}s`;
              o.append(b); slEl.append(o);
            }
            root.append(slEl);
          }
          const q = Math.round(v * 20) / 20;
          if (q !== slOn) { slOn = q; slEl.style.opacity = String(q * 0.55); slEl.classList.toggle("is-on", q > 0); }
        }
        function panAt(x, z) {
          _camR.setFromMatrixColumn(camera.matrixWorld, 0);
          const dx = x - camera.position.x, dz = z - camera.position.z, l = Math.hypot(dx, dz) || 1;
          return Math.max(-0.8, Math.min(0.8, (dx * _camR.x + dz * _camR.z) / l));
        }
        function audioTick(dt) {
          const R = scooter.riding, x = player.pos.x, z = player.pos.z;
          // footsteps on the Walk/Run/Sprint foot contacts (twice per clip cycle); the fallback rig steps every half stride
          if (!R && game.started && player.speed > 0.35) {
            const g = player.kk && player.kk.gait ? player.kk.gait() : null;
            if (player.kk) {
              if (g && /^(Walk|Run|Sprint)$/.test(g.n)) {
                if (au.p >= 0 && (crossed(au.p, g.p, 0.02) || crossed(au.p, g.p, 0.52))) step(g.n !== "Walk");
                au.p = g.p;
              } else au.p = -1;
            } else {
              const k = Math.floor(pm.phase / Math.PI);
              if (au.ph !== null && k !== au.ph) step(player.speed > 6);
              au.ph = k;
            }
          } else { au.p = -1; au.ph = null; }
          // scooter wheels: rate and level follow speed, silent when stopped
          const rv = R && !scooter.hop ? scooter.v : 0;
          SND.roll(rv, rv > 0.3 && onDirt(x, z) ? 1 : 0.55);
          if (SND.wind) SND.wind(R ? Math.max(0, Math.min(1, (rv - 8) / 13)) : 0);
          speedLines(R && !cine.lock ? FX.camS : 0);
          // river and pond: louder within ~25 units of the water's edge
          const dRiver = z >= -112 && z <= 112 ? Math.abs(x - riverX(z)) - 6 : 99, dPond = Math.hypot(x - POND.x, z - POND.z) - POND.r;
          const dw = Math.max(0, Math.min(dRiver, dPond));
          SND.river(dw < 25 ? (1 - dw / 25) ** 2 : 0);
          // now and then a dog barks or a sheep baas, from the nearest house that keeps one
          au.animT -= dt;
          if (au.animT <= 0) {
            au.animT = 15 + Math.random() * 25;
            let best = null, bd = 40;
            for (const h of HOUSES) if (h.pet === "dog" || h.pet === "sheep") { const d = Math.hypot(x - h.x, z - h.z); if (d < bd) { bd = d; best = h; } }
            if (best && game.started) SND.sfx(best.pet === "dog" ? "sfx_dog_bark" : "sfx_sheep_baa", { vol: 0.4 * (1 - bd / 40) ** 1.5, rate: 0.94 + Math.random() * 0.12, pan: panAt(best.x, best.z) });
          }
        }

        // ---------- villager daily schedules: morning at their own door, noon at a work spot, evening on the square, night indoors ----------
        // owners walk between spots along the dirt paths (east-bank paths already run over a bridge); the AI decides at 5 Hz
        const PLACE = {
          home: { tr: "evinin önü", en: "outside home" },
          inside: { tr: "evde", en: "at home" },
          road: { tr: "yolda", en: "on the road" },
          bakery: { tr: "fırın önü", en: "the bakery", loc: ["fırının önünde", "by the bakery"] },
          well: { tr: "kuyu başı", en: "the well", loc: ["kuyu başında", "by the well"] },
          mill: { tr: "değirmen", en: "the windmill", loc: ["değirmende", "at the windmill"] },
          fields: { tr: "tarla", en: "the fields", loc: ["tarlada", "in the fields"] },
          river: { tr: "nehir kıyısı", en: "the riverbank", loc: ["nehir kıyısında", "on the riverbank"] },
          square: { tr: "meydan", en: "the square", loc: ["meydanda", "on the square"] },
        };
        // work spot by job: baker, cook, midwife at the bakery; tailor, teacher, headman, watchman at the well; miller, cheesemaker, smith at the mill;
        // farmer, gardener, shepherd in the fields; beekeeper, painter, carpenter on the riverbank
        const WORK = { 1: "bakery", 11: "bakery", 9: "bakery", 3: "well", 5: "well", 12: "well", 8: "well", 14: "mill", 13: "mill", 15: "mill", 6: "fields", 2: "fields", 10: "fields", 7: "river", 16: "river", 4: "river" };
        const PHASE_N = { morning: ["sabah", "morning"], noon: ["öğlen", "noon"], evening: ["akşam", "evening"], night: ["gece", "night"] };
        const WANT = { morning: "door", noon: "work", evening: "square", night: "in" };
        const SCH = { ready: false, t0: performance.now(), acc: 0, now: 0 };
        let storyOpen = false; // a Bir Dost chapter letter is on screen
        function clearAt(x, z, r) {
          if (inWater(x, z)) return false;
          for (const c of colliders) {
            const dx = x - c.x, dz = z - c.z;
            if (c.t === 0) { if (dx * dx + dz * dz < (c.r + r) * (c.r + r)) return false; }
            else {
              if (Math.abs(dx) > c.hw + c.hd + r + 1 || Math.abs(dz) > c.hw + c.hd + r + 1) continue;
              const co = Math.cos(c.rot), si = Math.sin(c.rot), lx = dx * co - dz * si, lz = dx * si + dz * co;
              if (Math.abs(lx) < c.hw + r && Math.abs(lz) < c.hd + r) return false;
            }
          }
          return true;
        }
        function nudge(x, z, r = 0.6) {
          if (clearAt(x, z, r)) return [x, z];
          for (let d = 0.6; d <= 4.2; d += 0.6) for (let a = 0; a < 6.28; a += 0.785) { const nx = x + Math.cos(a) * d, nz = z + Math.sin(a) * d; if (clearAt(nx, nz, r)) return [nx, nz]; }
          return [x, z];
        }
        const SPOT = (() => {
          const h1 = byId(1), h6 = byId(6), h14 = byId(14), nb = BRIDGES[0], ba = Math.atan2(nb.z, nb.x - 7), rz = nb.z + 6;
          return {
            bakery: { c: wpos(h1, -(h1.w / 2 + 1.4), h1.d / 2 + 2.6), path: h1.pathPts },
            well: { c: [6.4, 9.8], path: [] },
            mill: { c: wpos(h14, -(h14.w / 2 + 3.5), h14.d / 2 + 3), path: h14.pathPts },
            fields: { c: wpos(h6, -(h6.w / 2 + 3.5), h6.d / 2 + 3), path: h6.pathPts },
            river: { c: [riverX(rz) - 8.8, rz], path: [[Math.cos(ba) * 14.5, Math.sin(ba) * 14.5], [nb.x - 7, nb.z]] },
          };
        })();
        {
          const cnt = {};
          HOUSES.forEach((h) => {
            const key = WORK[h.id] || "well", sp = SPOT[key], k = (cnt[key] = (cnt[key] || 0) + 1) - 1, a = k * 2.1 + h.id, r = k ? 2.1 : 0.4;
            const slot = nudge(sp.c[0] + Math.cos(a) * r, sp.c[1] + Math.sin(a) * r), stand = nudge(...wpos(h, -1.7, h.d / 2 + 1.1));
            const fa = (h.id / HOUSES.length) * 6.283;
            h.sc = { key, slot, stand, home: h.pathPts.concat([stand]), work: sp.path.concat([slot]), fount: [Math.cos(fa) * 5.2, Math.sin(fa) * 5.2], center: sp.c };
          });
        }
        const samePt = (p, q) => p && q && Math.abs(p[0] - q[0]) < 1e-6 && Math.abs(p[1] - q[1]) < 1e-6;
        // A, B: point lists outward from the square, each ending where the owner stands; returns the waypoints from A's end to B's end
        function routeBetween(A, B) {
          let k = 0;
          while (k < A.length - 1 && k < B.length && samePt(A[k], B[k])) k++;
          const r = [], isE = (p) => p && p[0] > riverX(p[1]) + 7.5;
          // both ends on the far bank (different bridges): along the bank, door to door
          if (k === 0 && A.length > 1 && B.length > 1 && isE(A[A.length - 1]) && isE(B[B.length - 1])) return [A[A.length - 2], B[B.length - 2], B[B.length - 1]];
          if (k > 0) { for (let i = A.length - 2; i >= k - 1; i--) r.push(A[i]); return r.concat(B.slice(k)); }
          for (let i = A.length - 2; i >= 0; i--) r.push(A[i]);
          const s0 = A.length > 1 ? A[0] : A[A.length - 1] || [7, 0], b0 = B[0];
          // across the square on a ring of radius 7, clear of the fountain
          const a0 = Math.atan2(s0[1], s0[0]), a1 = Math.atan2(b0[1], b0[0]);
          let da = a1 - a0; while (da > Math.PI) da -= 6.283; while (da < -Math.PI) da += 6.283;
          const n = Math.max(1, Math.ceil(Math.abs(da) / 0.6));
          for (let i = 0; i <= n; i++) { const a = a0 + (da * i) / n; r.push([Math.cos(a) * 7, Math.sin(a) * 7]); }
          return r.concat(B);
        }
        const angTo = (g, x, z) => Math.atan2(x - g.position.x, z - g.position.z);
        function turnY(g, a, k) { let d = a - g.rotation.y; while (d > Math.PI) d -= 6.283; while (d < -Math.PI) d += 6.283; g.rotation.y += d * k; }
        function schedInit() {
          SCH.ready = true;
          const w = WANT[DN.phase] || "door";
          HOUSES.forEach((h) => {
            const prevO = h.owner, o = ownerOf(h);
            if (prevO && prevO !== o && prevO.g.parent && !prevO.lock) scene.remove(prevO.g);
            const s = (o.sch = { st: w, goal: w, node: h.sc.home, route: [], seat: null, pose: "", wait: 0, dep: 0, waved: false, acc: 0, sh: undefined, idle: 4 + Math.random() * 8, face: 0, seen: {} });
            if (o.lock) return; // mid-delivery: the door tween owns it for now
            o.g.scale.setScalar(1); o.g.visible = true;
            if (w === "in") { if (o.g.parent) scene.remove(o.g); return; }
            const p = w === "door" ? h.sc.stand : w === "work" ? h.sc.slot : h.sc.fount;
            s.node = w === "door" ? h.sc.home : w === "work" ? h.sc.work : [h.sc.fount];
            o.g.position.set(p[0], groundY(p[0], p[1]), p[1]);
            s.face = w === "door" ? h.rot : w === "work" ? angTo(o.g, h.sc.center[0], h.sc.center[1]) : angTo(o.g, 0, 0);
            o.g.rotation.y = s.face;
            if (!o.g.parent) scene.add(o.g);
          });
          console.info("[schedule] " + HOUSES.length + " owners on their daily rounds");
        }
        function depart(h, o, s) {
          if (s.pose === "Sit" || s.pose === "Turn") { s.pose = "Up"; if (o.kk) o.kk.once("StandUp", "Idle", true); s.dep = SCH.now + 1.2; return; }
          s.pose = "";
          if (s.seat) { s.seat.v = null; s.seat = null; }
          let dest;
          if (s.goal === "door" || s.goal === "in") dest = h.sc.home;
          else if (s.goal === "work") dest = h.sc.work;
          else {
            const free = VSEATS.filter((q) => !q.v), seat = o.kk && o.kk.canSit && free.length && Math.random() < 0.65 ? free[Math.floor(Math.random() * free.length)] : null;
            if (seat) { seat.v = o; s.seat = seat; dest = [[seat.fx, seat.fz], [seat.x, seat.z]]; } else dest = [h.sc.fount];
          }
          if (s.st === "in") {
            // stepping out of the front door
            const p = h.sc.stand; o.g.position.set(p[0], groundY(p[0], p[1]), p[1]); o.g.rotation.y = h.rot; o.g.scale.setScalar(1); o.g.visible = true;
            if (!o.g.parent) scene.add(o.g);
            s.node = h.sc.home;
            if (s.goal === "door") { s.st = "door"; s.face = h.rot; return; }
          }
          s.route = routeBetween(s.node, dest); s.node = dest; s.st = "walk"; s.dgoal = s.goal;
          if (!s.route.length) s.route = [dest[dest.length - 1]];
        }
        function arrive(h, o, s) {
          s.st = s.dgoal || s.goal; s.idle = 3 + Math.random() * 6; // the goal may have moved on meanwhile: the 5 Hz think re-routes
          const g = o.g;
          if (s.st === "in") { if (g.parent) scene.remove(g); return; }
          if (s.st === "square" && s.seat && o.kk) { g.position.x = s.seat.x; g.position.z = s.seat.z; s.pose = "Turn"; s.wait = 0.45; s.face = s.seat.r; return; }
          s.face = s.st === "door" ? h.rot : s.st === "work" ? angTo(g, h.sc.center[0], h.sc.center[1]) : angTo(g, 0, 0);
        }
        // decisions at 5 Hz
        function schedThink() {
          const w = WANT[DN.phase] || "door";
          for (const h of HOUSES) {
            const o = h.owner, s = o && o.sch;
            if (!s || o.lock) continue;
            if (s.goal !== w) { s.goal = w; s.dep = SCH.now + 1 + ((h.id * 7) % 11) * 0.9; }
            if (s.st !== "walk" && s.st !== s.goal && SCH.now >= s.dep) depart(h, o, s);
            // after a door knock the owner steps back out (unless they are meant to be indoors)
            if (s.st !== "in" && !o.g.parent) {
              const p = s.st === "door" ? h.sc.stand : null;
              if (p) o.g.position.set(p[0], groundY(p[0], p[1]), p[1]);
              o.g.scale.setScalar(1); o.g.rotation.y = s.face; scene.add(o.g);
            }
            if (s.st === "in" && o.g.parent) scene.remove(o.g);
            // Defter: a sighting of someone out at their spot, within 8 units
            if ((s.st === "work" || s.st === "square") && game.started) {
              const d = Math.hypot(player.pos.x - o.g.position.x, player.pos.z - o.g.position.z);
              if (d < 8) logSighting(h, s);
            }
          }
        }
        function logSighting(h, s) {
          const ph = DN.phase, pk = s.st === "work" ? h.sc.key : "square", key = ph + ":" + pk;
          if (s.seen[key]) return;
          s.seen[key] = 1;
          const P = PLACE[pk], N = PHASE_N[ph] || PHASE_N.noon, line = [`👁 ${h.name} — ${N[0]}, ${P.tr}`, `👁 ${h.name} — ${N[1]}, ${P.en}`];
          if (notes.some((o) => o[0] === line[0])) return;
          notes.push(line); renderNotes();
          const c = $("notechip"); c.classList.remove("is-pop"); void c.offsetWidth; c.classList.add("is-pop");
        }
        anims.push((t, dt) => {
          if (!SCH.ready) {
            // wait for the villager models (or give up on them after 45 s and use the procedural stand-ins)
            if ((VGLB.M && VGLB.F) || performance.now() - SCH.t0 > 45000) schedInit();
            return;
          }
          SCH.now += dt; SCH.acc += dt;
          if (SCH.acc >= 0.2) { SCH.acc = 0; schedThink(); }
          const cx = camera.position.x, cz = camera.position.z, px = player.pos.x, pz = player.pos.z;
          for (const h of HOUSES) {
            const o = h.owner, s = o && o.sch;
            if (!s || !o.g.parent) continue;
            const g = o.g, k = o.kk;
            if (o.lock) { if (k) k.mixer.update(dt); continue; } // a delivery tween drives it
            let sp = 0;
            const pd = Math.hypot(px - g.position.x, pz - g.position.z);
            if (pd > 8) s.waved = false;
            if (s.st === "walk") {
              const [tx, tz] = s.route[0], dx = tx - g.position.x, dz = tz - g.position.z, d = Math.hypot(dx, dz);
              if (d < 0.4) { s.route.shift(); if (!s.route.length) arrive(h, o, s); }
              else {
                const v = 2.7, ox = g.position.x, oz = g.position.z;
                const [nx, nz] = waterSlide(ox, oz, ox + (dx / d) * v * dt, oz + (dz / d) * v * dt);
                if (nx === ox && nz === oz) { s.route.shift(); if (!s.route.length) arrive(h, o, s); }
                else { g.position.x = nx; g.position.z = nz; sp = v; }
                turnY(g, Math.atan2(dx, dz), Math.min(1, dt * 6));
              }
            } else if (s.pose === "Turn") {
              turnY(g, s.face, Math.min(1, dt * 9)); s.wait -= dt;
              if (s.wait <= 0) { g.rotation.y = s.face; s.pose = "Sit"; if (k) k.once("SitDown", "Sit", true); }
            } else if (!s.pose) {
              if (pd < 4 && game.started) {
                turnY(g, angTo(g, px, pz), Math.min(1, dt * 5));
                if (k && !s.waved) { s.waved = true; k.once("Wave"); friendGreet(h, o); }
              } else turnY(g, s.face, Math.min(1, dt * 3));
              // little bits of life: chat on the square, a nod at work
              s.idle -= dt;
              if (s.idle <= 0) { s.idle = 6 + Math.random() * 9; if (k && pd < 45) k.once(s.st === "square" ? "Talk" : s.st === "work" ? (Math.random() < 0.5 ? "Yes" : "Talk") : "Idle"); }
            }
            g.position.y = groundY(g.position.x, g.position.z);
            // LOD: hidden beyond 80, shadows within 40, no mixer work beyond 60 from the camera
            const cd = Math.hypot(cx - g.position.x, cz - g.position.z);
            g.visible = pd < 80;
            const sh = pd < 40; if (sh !== s.sh) { s.sh = sh; g.traverse((m) => { if (m.isMesh) m.castShadow = sh; }); }
            if (!g.visible) { s.acc = 0; continue; }
            if (!k) { animatePerson(o, sp, dt); continue; }
            if (sp > 0) k.set("Walk", sp / k.ref);
            else if (!s.pose) k.set("Idle", 1);
            s.acc += dt;
            if (cd <= 60) { k.mixer.update(Math.min(s.acc, 0.25)); s.acc = 0; }
          }
        });
        // ---------- ELDEN TESLİM: about 1 letter in 5 must be handed over in person; its clue is the owner's routine + one trait ----------
        function handClue(h) {
          const key = WORK[h.id]; if (!key) return null;
          const P = PLACE[key];
          const noon = C_((x) => WORK[x.id] === key, `öğlenleri ${P.loc[0]} çalışırım`, `at noon I work ${P.loc[1]}`);
          const eve = C_(() => true, "akşamları meydanda vakit geçiririm", "in the evening I spend time on the square");
          const traits = lookFor(h).concat(placeFor(h).filter((c) => !c.sq));
          traits.push(C_((x) => x.roofName.tr === h.roofName.tr, `çatım ${h.roofName.tr}`, `my roof is ${h.roofName.en}`));
          if (h.pet) traits.push(C_((x) => x.pet === h.pet, PET_F[h.pet][0], PET_F[h.pet][1]));
          if (h.feature) traits.push(C_((x) => x.feature === h.feature, FEAT_F[h.feature][0], FEAT_F[h.feature][1]));
          // the routine has to matter: prefer a trait that alone fits several houses but, with the work spot, only this one
          const fit = traits.filter((c) => matches([noon, c]).length === 1), need = fit.filter((c) => matches([c]).length > 1);
          const pool = need.length ? need : fit;
          return pool.length ? [noon, eve, shuffle(pool)[0]] : null;
        }
        // a letter's clue must point at exactly its own house (torn letters carry their own pairwise checks)
        const clueOK = (l) => (l.chk ? l.chk.every((c) => { const m = matches(c); return m.length === 1 && m[0] === l.house; }) : (() => { const m = matches(l.clauses); return m.length === 1 && m[0] === l.house; })());
        function markHand(P) {
          if (typeof unl === "function" && !unl("hand")) return P; // Elden Teslim letters start in round 3
          const want = Math.max(1, Math.round(P.length / 5));
          let n = 0;
          // never among the game's first three letters, never a rush or the daily golden letter
          for (const i of shuffle(P.map((_, i) => i).filter((i) => (round > 1 || i >= 3) && !P[i].rush && !P[i].gold))) {
            if (n >= want) break;
            const l = P[i], c = handClue(l.house);
            if (!c) continue;
            const t = { house: l.house, clauses: c };
            if (!clueOK(t)) continue;
            Object.assign(l, { kind: "hand", hand: true, tier: KIND.hand.tier, clauses: c, omit: undefined, torn: undefined, chk: undefined, sketch: false, svg: null });
            n++;
          }
          P.forEach((l) => { if (!clueOK(l)) console.warn("[letters] clue is not unique for", l.house.name, l.kind); });
          return P;
        }
        // ---------- Bir Dost: a 4-chapter story, one letter every 10 deliveries (persisted in the profile) ----------
        const DOST = [
          { t: ["İlk mektup", "The first letter"], b: [
            "Sevgili yeni postacı, köyümüze hoş geldin. O adressiz mektupları ben yazıyorum. Kim olduğumu şimdilik söylemeyeceğim; yalnızca şunu bil: bu köyün her kapısını, her bacasını, çatıda uyuyan her kediyi ezbere bilirim. On kapı çaldın bile. Ayakların yolu öğrenmeye başladı, gönlün de köyü. Teşekkür ederim.",
            "Dear new postman, welcome to our village. I am the one writing those addressless letters. I won't say who I am just yet; only know this: I know every door, every chimney and every cat napping on a roof here by heart. You have already knocked on ten doors. Your feet are learning the roads, and your heart the village. Thank you."] },
          { t: ["Çeşme başında", "By the fountain"], b: [
            "Dün akşam çeşmenin başında oturup seni izledim. Bir mektubu teslim ettiğinde kapıda açılan o gülümsemeyi gördüm; ben de yıllarca o gülümsemeyi çantamda taşıdım. Sana bir ipucu vereyim: kırk yıl boyunca her sabah aynı yokuşu çıktım, aynı köprüden geçtim. Köprünün üçüncü tahtası hâlâ gıcırdıyor mu?",
            "Last evening I sat by the fountain and watched you. When you delivered a letter I saw the smile that opened at the door; for years I carried that same smile in my bag. Here is a clue: for forty years I climbed the same slope and crossed the same bridge every morning. Does the third plank of the bridge still creak?"] },
          { t: ["Güzel haberler", "Good news"], b: [
            "Dizlerim artık köprüleri eskisi gibi geçemiyor. O yüzden komşularımın güzel haberlerini topladım: bir torunun başarısını, bir bal ödülünü, kırk yıl sonra gelen bir mektubu. Hepsini yazdım ama adres koymadım; çünkü bir köyü tanımanın tek yolu kapı kapı dolaşmaktır. Sen artık kimin çatısında kedi, kimin bahçesinde arı olduğunu biliyorsun. Bir mektup daha, sonra tanışacağız.",
            "My knees can't cross the bridges like they used to. So I gathered my neighbours' good news: a grandson's success, a prize for honey, a letter that came after forty years. I wrote it all down but left off the addresses, because the only way to know a village is door by door. Now you know whose roof has a cat and whose garden has bees. One more letter, and then we'll meet."] },
          { t: ["Hasan Dede", "Hasan Dede"], b: [
            "Artık söyleyebilirim: ben Hasan Dede'yim, bu köyün emekli postacısı. Kırk yıl bu kapıları çaldım; emekli olunca en çok onları özledim. Herkese bir teşekkür mektubu yazdım, ama bir tane eksikti: sana. Köyün mektupları artık güvenli ellerde. Bu altın pul benim ilk pulumdu, şimdi senin. Bir de çantana 100 altın bıraktım; çaylar benden! Postanenin önünden geçerken el salla, ben de pencereden sallarım.",
            "Now I can tell you: I am Hasan Dede, the village's retired postman. For forty years I knocked on these doors, and when I retired I missed them most of all. I wrote a thank-you letter to everyone, but one was missing: yours. The village's letters are in safe hands now. This gold stamp was my very first; now it is yours. I also slipped 100 coins into your bag, so the tea is on me! Wave when you pass the post office, and I'll wave back from the window."] },
        ];
        const DOST_STAMP = { id: "dost", name: "Hasan Dede", body: "#f1d27a" };
        DOST_READY = true;
        STAMP_EMO.dost = "📯";
        const PX = () => {
          const x = PROF.x || (PROF.x = {});
          ["total", "ch", "streak", "tokens"].forEach((k) => (x[k] = Math.max(0, Math.floor(+x[k] || 0))));
          if (!x.vd || typeof x.vd !== "object") x.vd = {};
          return x;
        };
        PX();
        const storyDue = () => { const x = PX(); return Math.min(DOST.length, Math.floor(x.total / 10)) > x.ch; };
        const story = { n: 0, next: null, reread: false };
        function fillStory() {
          const c = DOST[story.n - 1], i = lang() === "en" ? 1 : 0, last = story.n === DOST.length;
          $("lv-to").textContent = T("Yeni postacıya", "To the new postman");
          const body = $("lv-body"); body.textContent = "";
          const b = document.createElement("b"); b.textContent = `${T("Bölüm", "Chapter")} ${story.n}/${DOST.length} · ${T(c.t[0], c.t[1])}`;
          body.append(b, document.createElement("br"), T(c.b[0], c.b[1]));
          $("lv-type").textContent = `📯 ${T("Bir Dost", "A Friend")}`;
          $("lv-sig").textContent = last ? T("— Hasan Dede (Bir Dost)", "— Hasan Dede (A Friend)") : T("— Bir Dost", "— A Friend");
          $("lv-nav").hidden = true; $("lv-tip").hidden = true; $("lv-rush").hidden = true;
        }
        function storyCheck(next) {
          if (!PROF || !storyDue() || !game.started) { if (next) next(); return; }
          if (busy || cine.lock || storyOpen) { setTimeout(() => storyCheck(next), 600); return; }
          playChapter(PX().ch + 1, next, false);
        }
        // the scene: the camera eases to the post office, a bell, then the letter opens on the usual letter screen
        function playChapter(n, next, reread) {
          Object.assign(story, { n, next: next || null, reread });
          storyOpen = true; busy = true; if (!reread) cine.lock = true;
          setMail(false); openShop(false);
          if (!reread) {
            cine.pos.set(PO.x + 8, 6.5, PO.z + PO.d / 2 + 12); cine.look.set(PO.x, 3.2, PO.z);
            const w0 = cine.w; tw(1.3, (k) => (cine.w = lerp(w0, 1, eio(k))));
            SND.sfx("sfx_bell_ring", { delay: 0.7, vol: 0.4 });
            toast(T("📯 Postaneye Bir Dost'tan yeni bir mektup geldi…", "📯 A new letter from A Friend arrived at the post office…"), 2400);
          }
          tw(0, () => { fillStory(); setMail(true); }, reread ? 0 : 1.5);
        }
        function endStory() {
          storyOpen = false;
          const x = PX(), n = story.n, fresh = !story.reread && n > x.ch;
          if (fresh) x.ch = n;
          if (fresh && n === DOST.length) {
            x.dost = 1; S.coins += 100; saveCoins();
            setTimeout(() => { stampFly(DOST_STAMP, 2); toast(T("📯 Hasan Dede'nin altın pulu albümünde! +100 🪙", "📯 Hasan Dede's gold stamp is in your album! +100 🪙"), 3600); SND.sfx("sfx_coins_bag", { delay: 0.3 }); }, 700);
          }
          saveProf();
          const done = () => { busy = false; renderHUD(); renderNotes(); const nx = story.next; story.next = null; if (nx) nx(); else storyCheck(); };
          if (story.reread) { done(); return; }
          tw(0.8, (k) => (cine.w = 1 - eio(k)), 0.25, () => { cine.lock = false; done(); });
        }
        function dostLine() {
          const x = PX(), ch = x.ch, left = Math.max(0, (ch + 1) * 10 - x.total);
          return ch >= DOST.length ? T(`📯 Bir Dost · ${ch}/${DOST.length} bölüm · hikâye tamamlandı (dokun: tekrar oku)`, `📯 A Friend · ${ch}/${DOST.length} chapters · story complete (tap to reread)`)
            : T(`📯 Bir Dost · ${ch}/${DOST.length} bölüm · sonraki mektup ${left} teslimat sonra${ch ? " (dokun: son bölümü oku)" : ""}`, `📯 A Friend · ${ch}/${DOST.length} chapters · next letter in ${left} deliveries${ch ? " (tap to reread)" : ""}`);
        }
        function dostLi(ul) {
          const li = document.createElement("li"); li.className = "x-dostline"; xIcoText(li, dostLine());
          li.addEventListener("click", () => { const ch = PX().ch; if (ch && game.started && !busy && !storyOpen) playChapter(ch, null, true); });
          ul.prepend(li);
        }

        // ---------- the postman's dog: follows, sits, wags; the 🐶 button sends it sniffing toward the open letter's house ----------
        const DOG_CD = 45, DOG_COST = 5;
        const dog = (() => {
          const g = new THREE.Group(), body = new THREE.Group(); g.add(body); scene.add(g);
          const C1 = "#c9a27c", C2 = "#a8805c", C3 = "#f3e2c7";
          box(0.42, 0.34, 0.72, C1, 0, 0.44, 0, body);
          box(0.32, 0.12, 0.5, C3, 0, 0.3, 0.04, body);
          const head = new THREE.Group(); head.position.set(0, 0.72, 0.4); body.add(head);
          box(0.38, 0.34, 0.34, C1, 0, 0, 0, head);
          box(0.2, 0.15, 0.17, C3, 0, -0.07, 0.22, head);
          ball(0.05, "#3b2a22", 0, -0.02, 0.32, head);
          for (const s of [-1, 1]) {
            ball(0.04, "#1b1410", s * 0.1, 0.06, 0.17, head);
            const ear = box(0.1, 0.2, 0.07, C2, s * 0.19, 0.08, -0.03, head); ear.rotation.z = s * 0.35;
          }
          box(0.4, 0.07, 0.36, "#7fb8e6", 0, -0.17, -0.02, head); // collar
          const tail = new THREE.Group(); tail.position.set(0, 0.58, -0.36); body.add(tail);
          box(0.08, 0.08, 0.32, C2, 0, 0.06, -0.13, tail).rotation.x = -0.7;
          const legs = [];
          for (const [x, z] of [[-0.13, 0.24], [0.13, 0.24], [-0.13, -0.24], [0.13, -0.24]]) {
            const p = new THREE.Group(); p.position.set(x, 0.3, z); body.add(p);
            box(0.11, 0.3, 0.11, C1, 0, -0.15, 0, p); legs.push(p);
          }
          g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
          g.position.set(PO.x + 2, 0, PO.z + PO.d / 2 + 3);
          return { g, body, head, tail, legs, st: "follow", idle: 0, phase: 0, route: [], t: 0, barkT: 25 + Math.random() * 25, cdUntil: 0, arm: 0, letter: null, travel: 0, pawSide: 1 };
        })();
        // paw prints: a pool of flat sprites drawn once on a canvas (a pad and four toes)
        const paws = (() => {
          const tex = canvasTex(64, 64, (c) => {
            c.fillStyle = "rgba(92, 64, 44, 0.9)";
            c.beginPath(); c.ellipse(32, 41, 13, 11, 0, 0, 6.283); c.fill();
            [[16, 22, 6], [27, 14, 6.5], [38, 14, 6.5], [49, 22, 6]].forEach(([x, y, r]) => { c.beginPath(); c.ellipse(x, y, r, r * 1.2, 0, 0, 6.283); c.fill(); });
          });
          const geo = new THREE.PlaneGeometry(0.3, 0.3), list = [];
          for (let i = 0; i < 28; i++) {
            const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0 }));
            m.visible = false; m.renderOrder = 2; scene.add(m); list.push({ m, life: 0 });
          }
          let k = 0;
          return {
            drop(x, z, ang) { const p = list[k++ % list.length]; p.life = 8; p.m.visible = true; p.m.position.set(x, groundY(x, z) + 0.03, z); p.m.rotation.set(-Math.PI / 2, 0, ang); },
            tick(dt) { for (const p of list) if (p.life > 0) { p.life -= dt; p.m.material.opacity = Math.max(0, Math.min(1, p.life / 2)) * 0.85; if (p.life <= 0) p.m.visible = false; } },
          };
        })();
        // waypoints that cross the river on the nearest bridge
        function riverRoute(ax, az, bx, bz) {
          const ea = ax > riverX(az), eb = bx > riverX(bz);
          if (ea === eb) return [[bx, bz]];
          const b = BRIDGES.reduce((m, q) => (Math.abs(q.z - az) + Math.abs(q.z - bz) < Math.abs(m.z - az) + Math.abs(m.z - bz) ? q : m)), s = ea ? 1 : -1;
          return [[b.x + s * (b.end + 0.5), b.z], [b.x - s * (b.end + 0.5), b.z], [bx, bz]];
        }
        function dogBark(vol = 0.3) {
          SND.sfx("sfx_dog_bark", { vol, rate: 1.3 + Math.random() * 0.1, pan: panAt(dog.g.position.x, dog.g.position.z) });
          tw(0.25, (k) => (dog.head.rotation.x = -Math.sin(k * Math.PI) * 0.35));
        }
        function useDog() {
          if (!game.started || S.over || storyOpen || !unl("dog")) return;
          const l = S.bag[S.active];
          if (!l) { toast(T("🐶 Önce postaneden bir mektup al, sonra kokusunu koklatırız.", "🐶 Pick up a letter first, then the dog can sniff it.")); return; }
          if (dog.st === "sniff" || dog.st === "return") { toast(T("🐶 Köpek zaten iz sürüyor!", "🐶 The dog is already on the trail!")); return; }
          const now = performance.now();
          if (now < dog.cdUntil) {
            if (S.coins < DOG_COST) { toast(T(`🐶 Köpek dinleniyor (${Math.ceil((dog.cdUntil - now) / 1000)} sn) · ${DOG_COST} 🪙 gerekli.`, `🐶 The dog is resting (${Math.ceil((dog.cdUntil - now) / 1000)} s) · needs ${DOG_COST} 🪙.`)); buzz(); return; }
            if (now > dog.arm) { dog.arm = now + 3000; SND.sfx("ui_tap"); dogChip(true); return; }
            S.coins -= DOG_COST; saveCoins(); renderHUD();
          }
          dog.arm = 0; dog.cdUntil = now + DOG_CD * 1000;
          const p = dog.g.position, d = l.house.door2;
          dog.route = riverRoute(p.x, p.z, d.x, d.z); dog.st = "sniff"; dog.t = 6; dog.letter = l; l.sniffed = true;
          dogBark(0.35); SND.sfx("sfx_hint_sparkle", { delay: 0.15, vol: 0.3 });
          toast(T("🐶 Kokladı ve fırladı! Pati izlerini takip et.", "🐶 A sniff and off it goes! Follow the paw prints."), 2600);
          dogChip(true);
        }
        let dogLab = "";
        function dogChip(force) {
          const b = $("dogchip"); if (!b) return;
          const now = performance.now(), cd = Math.max(0, Math.ceil((dog.cdUntil - now) / 1000));
          const lab = dog.st === "sniff" || dog.st === "return" ? "🐶 …" : now < dog.arm ? `🐶 ${DOG_COST}🪙?` : cd ? `🐶 ${cd}` : "🐶";
          if (!force && lab === dogLab) return;
          dogLab = lab; xIcoText(b, lab);
          b.classList.toggle("is-off", !!cd && now >= dog.arm); b.classList.toggle("is-arm", now < dog.arm);
          b.setAttribute("aria-label", cd ? T(`Köpek: ${cd} sn dinleniyor, ${DOG_COST} altına hemen gönder`, `Dog: resting ${cd} s, send now for ${DOG_COST} coins`) : T("Köpeği mektubun kokusuna gönder", "Send the dog after the letter's scent"));
        }
        {
          const b = $("dogchip");
          if (b) { b.addEventListener("pointerdown", (e) => e.stopPropagation()); b.addEventListener("click", (e) => { e.stopPropagation(); useDog(); b.blur(); }); }
          addEventListener("keydown", (e) => { if (e.code === "KeyG" && !e.repeat && !(e.target && /INPUT|TEXTAREA/.test(e.target.tagName))) useDog(); });
        }
        anims.push((t, dt) => {
          const d = dog, g = d.g, p = g.position, px = player.pos.x, pz = player.pos.z, hd = player.heading;
          paws.tick(dt);
          let sp = 0, tx = 0, tz = 0, go = false;
          if (d.st === "sniff" || d.st === "return") {
            d.t -= dt;
            if (d.st === "sniff" && d.t <= 0) { d.st = "return"; d.route = riverRoute(p.x, p.z, px, pz); d.t = 20; }
            if (d.st === "return") { const L = d.route[d.route.length - 1]; L[0] = px; L[1] = pz; if (Math.hypot(px - p.x, pz - p.z) < 3 || d.t <= 0) { d.st = "follow"; dogChip(true); } }
            if (d.route.length) {
              [tx, tz] = d.route[0];
              const dd = Math.hypot(tx - p.x, tz - p.z);
              if (dd < 0.6 && d.route.length > 1) d.route.shift();
              else if (dd > 0.6) { go = true; sp = d.st === "sniff" ? 10 : 12; }
            }
          } else {
            // heel: a little behind and to the left of the postman
            tx = px - Math.sin(hd) * 1.8 - Math.cos(hd) * 1.1; tz = pz - Math.cos(hd) * 1.8 + Math.sin(hd) * 1.1;
            const dd = Math.hypot(tx - p.x, tz - p.z);
            if (dd > 35) { p.x = tx; p.z = tz; }
            else if (dd > 0.7) { go = true; sp = Math.min(26, 1.5 + dd * 2.4); }
          }
          if (go) {
            const dx = tx - p.x, dz = tz - p.z, dd = Math.hypot(dx, dz) || 1, st = Math.min(dd, sp * dt);
            const ox = p.x, oz = p.z, [nx, nz] = waterSlide(ox, oz, ox + (dx / dd) * st, oz + (dz / dd) * st);
            p.x = nx; p.z = nz;
            turnY(g, Math.atan2(dx, dz), Math.min(1, dt * 10));
            if (d.st === "sniff" || d.st === "return") { d.travel += Math.hypot(nx - ox, nz - oz); if (d.travel > 0.75) { d.travel = 0; d.pawSide = -d.pawSide; const a = g.rotation.y; paws.drop(p.x + Math.cos(a) * 0.12 * d.pawSide, p.z - Math.sin(a) * 0.12 * d.pawSide, a); } }
            d.idle = 0;
          } else { d.idle += dt; if (d.st === "follow" && Math.hypot(px - p.x, pz - p.z) > 0.5) turnY(g, Math.atan2(px - p.x, pz - p.z), Math.min(1, dt * 4)); }
          p.y = groundY(p.x, p.z);
          // pose: run cycle, idle, or sit after a few seconds of standing
          const run = go ? Math.min(1, sp / 6) : 0;
          d.phase += dt * (go ? 6 + sp * 0.9 : 0);
          const s = Math.sin(d.phase) * 0.75 * run, sit = !go && d.idle > 3 ? Math.min(1, (d.idle - 3) * 3) : 0;
          d.legs[0].rotation.x = s; d.legs[1].rotation.x = -s; d.legs[2].rotation.x = -s - sit * 1.2; d.legs[3].rotation.x = s - sit * 1.2;
          d.body.rotation.x = -sit * 0.45; d.body.position.y = Math.abs(Math.sin(d.phase)) * 0.08 * run - sit * 0.12;
          d.tail.rotation.y = Math.sin(t * (go ? 8 : 15)) * (go ? 0.3 : 0.65);
          // barks: now and then, and when the postman reaches the house of a letter the dog has sniffed
          if (game.started && !S.over && g.visible) {
            d.barkT -= dt;
            if (d.barkT <= 0) { d.barkT = 25 + Math.random() * 25; if (Math.hypot(px - p.x, pz - p.z) < 20) dogBark(0.22); }
            const l = S.bag[S.active];
            if (l && l.sniffed && !l.dogBarked && d.st === "follow" && Math.hypot(px - l.house.door2.x, pz - l.house.door2.z) < 6) {
              l.dogBarked = true; dogBark(0.4); setTimeout(() => dogBark(0.35), 380);
              toast(T("🐶 Hav hav! Köpek bu kapının kokusunu tanıdı.", "🐶 Woof woof! The dog knows this door's scent."), 2400);
            }
          }
          d.chipT = (d.chipT || 0) - dt; if (d.chipT <= 0) { d.chipT = 0.25; dogChip(false); }
        });

        // ---------- combo chain, villager gifts, the daily golden letter and the day streak ----------
        const COMBO_WIN = 40, COMBO_MAX = 5;
        const dayKey = (d) => { d = d || new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
        const yesterdayKey = () => { const n = new Date(); return dayKey(new Date(n.getFullYear(), n.getMonth(), n.getDate() - 1)); };
        // returns the extra coins of a delivery and the toast fragment; advances the combo
        function deliveryExtras(l, base) {
          const now = performance.now(), cb = S.combo || (S.combo = { n: 0, last: 0 });
          cb.n = cb.last && now - cb.last <= COMBO_WIN * 1000 ? Math.min(COMBO_MAX, cb.n + 1) : 1; cb.last = now;
          const combo = cb.n > 1 ? 2 * (cb.n - 1) : 0, gold = l.gold ? base * 2 : 0;
          let txt = "";
          if (combo) txt += ` · 🔥x${cb.n} +${combo}`;
          if (gold) { txt += T(` · 🌟 Günün mektubu ×3 (+${gold})`, ` · 🌟 Letter of the day ×3 (+${gold})`); PX().dailyDate = dayKey(); saveProf(); }
          if (combo) { const c = $("combochip"); c.classList.remove("is-pop"); void c.offsetWidth; c.classList.add("is-pop"); SND.sfx("sfx_coin", { delay: 0.9, rate: 1.1 + cb.n * 0.08, vol: 0.35 }); }
          return { add: combo + gold, txt };
        }
        function comboTick() {
          const c = $("combochip"), cb = S.combo;
          const left = cb && cb.n && game.started && !S.over ? COMBO_WIN - (performance.now() - cb.last) / 1000 : 0;
          if (left <= 0) { if (!c.hidden) c.hidden = true; if (cb && cb.n && left <= 0) cb.n = 0; return; }
          if (c.hidden) c.hidden = false;
          const lab = cb.n > 1 ? `x${cb.n}` : "x1";
          if ($("combo-n").textContent !== lab) { $("combo-n").textContent = lab; c.setAttribute("aria-label", T(`Kombo ${lab}: ${COMBO_WIN} sn içinde teslim et, +2 🪙 artar`, `Combo ${lab}: deliver within ${COMBO_WIN} s for +2 🪙 more`)); }
          const w = Math.round((left / COMBO_WIN) * 100) + "%";
          if ($("combo-fill").style.width !== w) $("combo-fill").style.width = w;
          c.classList.toggle("is-low", left < 10);
        }
        // a small thank-you from the villager: coins, a free hint token, or a shop colour already open at the player's rank
        function giftFrom(h) {
          const x = PX(), r = Math.random();
          const open = Object.keys(ITEM).filter((id) => ITEM[id].price > 0 && ITEM[id].rank <= PROF.rank && !owns(id));
          let msg;
          if (open.length && r < 0.3) {
            const id = open[Math.floor(Math.random() * open.length)], it = ITEM[id], cat = SHOP_CATS.find((c) => c.id === it.cat);
            PROF.owned.push(id); saveProf();
            msg = T(`🎁 ${h.name} sana hediye bıraktı: ${it.tr} ${cat.tr.toLocaleLowerCase("tr")} rengi! Dükkândan giyebilirsin.`, `🎁 ${h.name} left you a gift: the ${it.en} ${cat.en.toLowerCase()} colour! Wear it from the shop.`);
          } else if (r < 0.6) {
            x.tokens++; saveProf(); renderTip();
            msg = T(`🎁 ${h.name} sana bir ipucu jetonu bıraktı! 💡 Sıradaki ipucun bedava.`, `🎁 ${h.name} left you a hint token! 💡 Your next hint is free.`);
          } else {
            const c = 10 + Math.floor(Math.random() * 16);
            S.coins += c; saveCoins(); renderHUD();
            msg = T(`🎁 ${h.name} teşekkür için bir kese bıraktı: +${c} 🪙`, `🎁 ${h.name} left a little pouch to say thanks: +${c} 🪙`);
          }
          toast(msg, 3600);
          SND.sfx("sfx_hint_sparkle", { vol: 0.4 }); SND.sfx("sfx_coin", { delay: 0.25, rate: 1.2 });
          if (game.started) { const p = player.pos; playFx("heart", new THREE.Vector3(p.x, p.y + 2.6, p.z), 1, 20, { hold: 0.1, rise: 0.4 }); }
        }
        function giftCheck(h, stars) {
          const x = PX(); x.vd[h.id] = (x.vd[h.id] || 0) + 1; saveProf();
          if (stars >= 3 || x.vd[h.id] % 3 === 0) setTimeout(() => { if (!storyOpen) giftFrom(h); else setTimeout(() => giftFrom(h), 6000); }, 4300);
        }
        // the first letter of the round is golden once per calendar day
        function markGold(P) {
          if (PX().dailyDate !== dayKey() && P[0]) Object.assign(P[0], { gold: true, rush: false, limit: 0 });
          return P;
        }
        function streakText() {
          const x = PX(), td = dayKey(), yd = yesterdayKey();
          const next = x.lastDay === td ? x.streak : x.lastDay === yd ? x.streak + 1 : 1, bonus = Math.min(50, 5 * next);
          const gold = x.dailyDate !== td;
          const tr = (x.lastDay === td ? `🔥 Seri: ${next} gün · bugünün ödülü alındı` : `🔥 Seri: ${next} gün · bugün +${bonus} 🪙`) + (gold ? " · 🌟 günün mektubu ×3 seni bekliyor" : "");
          const en = (x.lastDay === td ? `🔥 Streak: ${next} day${next > 1 ? "s" : ""} · today's reward collected` : `🔥 Streak: ${next} day${next > 1 ? "s" : ""} · +${bonus} 🪙 today`) + (gold ? " · 🌟 the letter of the day ×3 awaits" : "");
          return [tr, en];
        }
        function renderStreak() {
          const el = $("streak"); if (!el) return;
          const [tr, en] = streakText();
          el.removeAttribute("data-tr"); el.removeAttribute("data-en"); xIcoText(el, lang() === "en" ? en : tr); el.hidden = false; el.dataset.st = "1";
        }
        function dailyStart() {
          const x = PX(), td = dayKey();
          if (x.lastDay === td) return;
          x.streak = x.lastDay === yesterdayKey() ? x.streak + 1 : 1; x.lastDay = td;
          const bonus = Math.min(50, 5 * x.streak);
          S.coins += bonus; saveCoins(); saveProf(); renderHUD(); renderStreak();
          setTimeout(() => { toast(T(`🔥 ${x.streak} günlük seri! Günlük ödül +${bonus} 🪙`, `🔥 ${x.streak}-day streak! Daily reward +${bonus} 🪙`), 3200); SND.sfx("sfx_coins_bag"); }, 3600);
        }
        renderStreak();

        // where is someone right now: { place, key, x, z, home, state }
        function whereIs(id) {
          const h = byId(+id); if (!h) return null;
          const o = h.owner, s = o && o.sch;
          if (!s) return { place: T(PLACE.inside.tr, PLACE.inside.en), key: "inside", x: h.door2.x, z: h.door2.z, home: true, state: "door" };
          const key = s.st === "walk" ? "road" : s.st === "door" ? "home" : s.st === "in" ? "inside" : s.st === "work" ? h.sc.key : "square";
          const P = PLACE[key], p = s.st === "in" ? h.door2 : o.g.position;
          return { place: T(P.tr, P.en), key, x: p.x, z: p.z, home: s.st === "door" || s.st === "in", state: s.st };
        }
        window.whereIs = whereIs;
        if (/[?&]debug\b/.test(location.search)) window.__dbg = { DN, S, SCH, HOUSES, player, byId, deliver: (id, m) => deliver(byId(id), m), nearOwner, resetState, get PROF() { return PROF; },
          sim(sec) { for (let i = 0; i < sec / 0.05; i++) { for (const f of anims) f(0, 0.05); game.onUpdate(0.05, 0); updateDay(0.05, 0, player.pos); } } };
        // the nearest owner out and about (or at their door) within 3 units
        function nearOwner() {
          if (!SCH.ready) return null;
          let best = null, bd = 3;
          for (const h of HOUSES) {
            const o = h.owner, s = o && o.sch;
            if (!s || !o.g.parent || !o.g.visible || o.lock || s.st === "in") continue;
            const d = Math.hypot(player.pos.x - o.g.position.x, player.pos.z - o.g.position.z);
            if (d < bd) { bd = d; best = { h, o, home: s.st === "door", d }; }
          }
          return best;
        }
        // door rules: nobody answers when they are out; a hand-delivery letter never goes through a door
        function doorGate(h) {
          const w = whereIs(h.id);
          if (w && !w.home) { toast(T("🚪 Evde yok.", "🚪 Not home.")); SND.sfx("sfx_door_knock", { vol: 0.35, rate: 1.05 }); return false; }
          const a = S.bag[S.active];
          if ((a && a.hand && !S.bag.some((b) => b.house === h && !b.hand)) || (!S.bag.some((b) => b.house === h && !b.hand) && S.bag.some((b) => b.house === h && b.hand))) {
            toast(T("🤝 Bu mektup elden verilmeli.", "🤝 This letter must be handed in person.")); return false;
          }
          return true;
        }
        function envFly(o, delay, from) {
          const env = new THREE.Group();
          tpart(CG.sphere, "#fff8ec", env, 0, 0, 0, 0.2, 0.015, 0.14);
          tpart(CG.sphere, "#e4572e", env, 0, 0.012, 0, 0.04, 0.012, 0.04).castShadow = false;
          const a = new THREE.Vector3(), b = new THREE.Vector3(), hand = o.kk ? new THREE.Vector3() : new THREE.Vector3(0, -0.42, 0.12);
          tw(0.55, (k) => {
            if (!env.parent) { const L = player.kk && player.kk.letter; scene.add(env); (L && L.visible ? L : player.bag).getWorldPosition(a); if (L) L.visible = false; }
            o.armR.localToWorld(b.copy(hand));
            env.position.lerpVectors(a, b, eio(k)); env.position.y += Math.sin(k * Math.PI) * 0.9;
            env.rotation.set(k * 1.5, k * 6.283 * 2, 0);
            trail(env);
          }, delay, () => { o.armR.attach(env); env.position.copy(hand); env.rotation.set(0.3, 0, 0); });
          return env;
        }
        // hand-to-hand delivery out in the village: both turn to face, the owner nods and cheers
        function handOver(h, gain) {
          const o = h.owner, s = o.sch, g = o.g;
          busy = cine.lock = true; o.lock = true; momentStart();
          const seated = s && (s.pose === "Sit" || s.pose === "Turn" || s.pose === "Up");
          if (seated) { if (s.pose === "Sit" && o.kk) o.kk.once("StandUp", "Idle", true); s.pose = ""; if (s.seat) { s.seat.v = null; s.seat = null; } }
          const pre = seated ? 0.9 : 0, r0 = g.rotation.y;
          let ra = angTo(g, player.pos.x, player.pos.z) - r0; while (ra > Math.PI) ra -= 6.283; while (ra < -Math.PI) ra += 6.283;
          tw(0.3, (k) => (g.rotation.y = r0 + ra * eio(k)), pre);
          const h0 = player.heading; let da = Math.atan2(g.position.x - player.pos.x, g.position.z - player.pos.z) - h0; while (da > Math.PI) da -= 6.283; while (da < -Math.PI) da += 6.283;
          tw(0.2, (k) => (player.heading = h0 + da * eio(k)));
          player.act("Interact");
          const mx = (g.position.x + player.pos.x) / 2, mz = (g.position.z + player.pos.z) / 2, dx = g.position.x - player.pos.x, dz = g.position.z - player.pos.z, L = Math.hypot(dx, dz) || 1, gy = g.position.y;
          cine.pos.set(mx - (dz / L) * 5.2, gy + 2.6, mz + (dx / L) * 5.2); cine.look.set(mx, gy + 1.3, mz);
          tw(0.35, (k) => (cine.w = Math.max(cine.w, eio(k))));
          const env = envFly(o, 0.3 + pre);
          tw(0, () => {
            payoff(new THREE.Vector3(g.position.x, gy + 2.5, g.position.z), new THREE.Vector3(mx, gy + 1.4, mz), gain, g);
            player.act("Cheer");
            if (o.kk) o.kk.once("Cheer");
          }, 0.8 + pre);
          tw(0.35, (k) => (cine.w = Math.min(cine.w, 1 - eio(k))), 1.15 + pre, () => (cine.lock = false));
          tw(0, () => { if (env.parent) env.parent.remove(env); o.lock = false; busy = false; if (s) s.idle = 5; }, 1.55 + pre);
        }
        function grumpyHand(h) {
          const o = h.owner, g = o.g, s = o.sch;
          busy = true; o.lock = true;
          const seated = s && s.pose;
          if (!seated) { const r0 = g.rotation.y; let ra = angTo(g, player.pos.x, player.pos.z) - r0; while (ra > Math.PI) ra -= 6.283; while (ra < -Math.PI) ra += 6.283; tw(0.25, (k) => (g.rotation.y = r0 + ra * eio(k))); }
          if (o.kk && !seated) tw(0, () => o.kk.once("Talk"), 0.2);
          tw(0.7, (k) => { const w = Math.sin(k * Math.PI * 6) * (1 - k); o.body.rotation.y = w * 0.3; }, 0.35, () => (o.body.rotation.y = 0));
          tw(0, () => {
            const p = new THREE.Vector3(g.position.x, g.position.y + 2.5, g.position.z);
            popBubble(faceTex(0), p, g, 1.1, 0.85); thud(0); camShake(0.06, 0.28, true); vigPulse(true);
            if (!playFx("wrong", p, 1.4, 20)) cloudPuff(p);
            if (!SND.jingle("jingle_wrong_house")) { tone(196, 0, 0.28, "triangle", 0.16); tone(139, 0.22, 0.4, "triangle", 0.16); }
            vib(60);
          }, 0.45);
          tw(0, () => { o.lock = false; busy = false; }, 1.4);
        }
        // night: the house is asleep, so the letter goes under the door
        function slipUnder(h, gain) {
          busy = true; momentStart();
          const [dx, dz] = wpos(h, 0, h.d / 2 + 0.25), gy = groundY(dx, dz);
          const h0 = player.heading; let da = h.rot + Math.PI - h0; while (da > Math.PI) da -= 6.283; while (da < -Math.PI) da += 6.283;
          tw(0.2, (k) => (player.heading = h0 + da * eio(k)));
          player.act("Interact");
          const env = new THREE.Group();
          tpart(CG.sphere, "#fff8ec", env, 0, 0, 0, 0.2, 0.015, 0.14);
          tpart(CG.sphere, "#e4572e", env, 0, 0.012, 0, 0.04, 0.012, 0.04).castShadow = false;
          const a = new THREE.Vector3(), b = new THREE.Vector3(dx, gy + 0.04, dz), c = new THREE.Vector3(dx - Math.sin(h.rot) * 0.6, gy + 0.04, dz - Math.cos(h.rot) * 0.6);
          if (!scooter.riding) tw(0.5, (k) => {
            if (!env.parent) { const L = player.kk && player.kk.letter; scene.add(env); (L && L.visible ? L : player.bag).getWorldPosition(a); if (L) L.visible = false; }
            env.position.lerpVectors(a, b, eio(k)); env.position.y += Math.sin(k * Math.PI) * 0.4; env.rotation.set(0, h.rot + k * 3, 0); trail(env);
          }, 0.25);
          SND.sfx("sfx_paper_rustle_1", { delay: 0.6, rate: 1.1 });
          if (!scooter.riding) tw(0.35, (k) => env.position.lerpVectors(b, c, k), 0.8, () => scene.remove(env));
          tw(0, () => {
            FX.mood = 1;
            payoff(new THREE.Vector3(dx, gy + 2.2, dz), new THREE.Vector3(dx, gy + 1.0, dz), gain, null);
          }, 1.0);
          tw(0, () => (busy = false), 1.5);
        }

        // ---------- game object ----------
        const game = (window.game = {
          HOUSES, player, scene, camera, renderer, colliders, villagers, groundY, toast, state: S,
          started: false,
          nearestHouse(maxDist = 3.5) {
            let best = null, bd = maxDist;
            for (const h of HOUSES) { const d = Math.hypot(player.pos.x - h.door2.x, player.pos.z - h.door2.z); if (d < bd) { bd = d; best = h; } }
            return best;
          },
          onInteract() {
            if (S.over || busy || storyOpen) return;
            const R = scooter.riding, v = nearVillager(), h = game.nearestHouse(R ? 4.5 : 3.5), al = S.bag[S.active];
            const ow = !R && S.bag.length ? nearOwner() : null;
            if (ow && (!h || !ow.home || (al && al.hand))) { deliver(ow.h, "hand"); return; }
            if (h && S.bag.length) { if (!doorGate(h)) return; if (R) tossLetter(h); else deliver(h); }
            else if (nearPO() && !S.bag.length && S.pending.length) pickup(); // an empty bag at the post office: letters first, chat later
            else if (v) { if (R) toast(TK("Scooterdan in (B), sonra konuş.", "Get off the scooter (B) to talk.", "Önce scooterdan in, sonra konuş.", "Get off the scooter first to talk.")); else hint(v); }
            else if (nearPO()) pickup();
            else if (h) toast(T("Çantanda mektup yok. Önce postaneye uğra.", "No letters in your bag. Visit the post office first."));
            else toast(T("Yakında kimse yok", "Nobody nearby"));
          },
          cycle() { if (S.bag.length > 1) { S.active = (S.active + 1) % S.bag.length; renderHUD(); } },
          refreshLang() {
            renderHUD(); renderNotes(); poSign.refresh(); renderPerf(); if (!$("start").hidden) renderStreak();
            if (TUT.msg && !$("tut").hidden) { $("tut").textContent = T(TUT.msg[0], TUT.msg[1]); safeLayout(true); }
            if (!$("end").hidden) showEnd();
            if (!$("shop").hidden) renderShop();
            // fix1106b: a line already spoken or toasted in the old language is dropped rather than left on screen
            bubbleEl.hidden = true; bubble.type = null; toastEl.classList.remove("is-on"); toastEl.textContent = "";
            $("prompt").textContent = ""; $("act").textContent = "";
            const L = (id, a, tr, en) => { const e = $(id); if (e) e.setAttribute(a, T(tr, en)); };
            L("minimap", "aria-label", "Köy haritası", "Village map"); L("maptoggle", "aria-label", "Harita", "Map"); L("dogchip", "aria-label", "Köpek", "Dog");
            L("lv-paper", "aria-label", "Mektup", "Letter"); L("shop-tabs", "aria-label", "Kategoriler", "Categories"); L("shop-svg", "aria-label", "Önizleme", "Preview");
          },
          onUpdate(dt, t) {
            try { audioTick(dt); } catch (e) { /* audio never stops the game */ }
            tipSparkle(t || 0);
            rushTick(false); comboTick();
            runDust(dt); updateFx(dt);
            if (!busy) { FX.mom = null; FX.ff = 0; }
            const tdt = dt * (FX.ff || 1);
            for (let i = 0; i < tweens.length; i++) {
              const w = tweens[i]; w.t += tdt; if (w.t < 0) continue;
              const k = w.dur ? Math.min(1, w.t / w.dur) : 1; w.fn(k);
              if (k >= 1) { tweens.splice(i--, 1); if (w.done) w.done(); }
            }
            for (let i = confetti.length - 1; i >= 0; i--) {
              const c = confetti[i]; c.life -= dt; c.vy -= 9 * dt;
              c.m.position.x += c.vx * dt; c.m.position.y += c.vy * dt; c.m.position.z += c.vz * dt;
              c.vx *= 0.98; c.vz *= 0.98; c.m.rotation.x += c.spin * dt; c.m.rotation.y += c.spin * 0.7 * dt;
              if (c.life <= 0) { scene.remove(c.m); c.m.material.dispose(); confetti.splice(i, 1); }
            }
            placeBubble(); safeLayout();
            const pr = $("prompt");
            let msg = "";
            const R = scooter.riding, door = game.started && !S.over && !busy && S.bag.length && game.nearestHouse(R ? 4.5 : 3.5);
            const ow = game.started && !S.over && !busy && !R && S.bag.length ? nearOwner() : null, al = S.bag[S.active];
            const hand = !!(ow && (!door || !ow.home || (al && al.hand)));
            let bikeOnly = false;
            if (game.started && !S.over && !busy) {
              if (hand) msg = T(`E: Eline ver · ${ow.h.name}`, `E: Hand it to ${ow.h.name}`);
              else if (door) msg = R ? T("E: Mektubu at", "E: Toss the letter") : T("E: Teslim et", "E: Deliver");
              else if (nearPO() && !S.bag.length && S.pending.length) msg = T("E: Mektupları al", "E: Pick up letters");
              else if (nearVillager()) msg = T("E: Konuş", "E: Talk");
              else if (nearPO() && S.pending.length && S.bag.length < 3) msg = T("E: Mektupları al", "E: Pick up letters");
              else if (!R && nearScooter()) { msg = T("B: Scootera bin", "B: Ride the scooter"); bikeOnly = true; }
            }
            if (pr.textContent !== msg) pr.textContent = msg;
            pr.hidden = !msg;
            const bc = $("bikechip"), bl = R ? T("İn", "Get off") : "Scooter";
            if ($("bikechip-l").textContent !== bl) $("bikechip-l").textContent = bl;
            bc.classList.toggle("is-off", !R && !nearScooter());
            if (bc.getAttribute("aria-pressed") !== String(R)) bc.setAttribute("aria-pressed", String(R));
            const act = $("act");
            let lab = "";
            if (msg && !bikeOnly) lab = hand ? T("Ver", "Give") : door ? (R ? T("At", "Toss") : T("Teslim", "Deliver")) : nearPO() && !S.bag.length && S.pending.length ? T("Al", "Take") : nearVillager() ? T("Konuş", "Talk") : T("Al", "Take");
            if (act.textContent !== lab) act.textContent = lab;
            act.classList.toggle("is-on", !!lab);
          },
        });
        // ---------- friendship: 0-5 hearts per villager from deliveries; 3+ greet you, 5 share a gossip clue (once a round) ----------
        const frOf = (h) => { const x = PX(); if (!x.fr || typeof x.fr !== "object") x.fr = {}; return Math.max(0, Math.min(5, +x.fr[h.id] || 0)); };
        function friendGain(h) {
          const x = PX(), lv = frOf(h); if (lv >= 5) return;
          x.fr[h.id] = lv + 1; saveProf();
          if (lv + 1 === 3) tw(0, () => toast(T(`♥ ${h.name} artık dostun! Yanından geçerken seni selamlar.`, `♥ ${h.name} is your friend now! They'll greet you as you pass.`), 3000), 2.4);
          if (lv + 1 === 5) tw(0, () => toast(T(`♥♥♥♥♥ ${h.name} en yakın dostun! Ona uğra, köyün sırlarını anlatır.`, `♥♥♥♥♥ ${h.name} is your best friend! Drop by to hear the village's secrets.`), 3200), 2.4);
        }
        const GREET = [["Hoş geldin postacım!", "Welcome, my postman!"], ["Yolun açık olsun!", "Safe travels!"], ["Bugün de koşturuyorsun!", "Busy as ever today!"], ["Çay içmeye gel bir ara!", "Come round for tea sometime!"]];
        function friendGreet(h, o) {
          const lv = frOf(h); if (lv < 3 || busy || !game.started || S.over || !bubbleEl.hidden) return;
          const now = performance.now(); if (now < (o.frT || 0)) return; o.frT = now + 30000;
          const top = new THREE.Vector3(o.g.position.x, o.g.position.y + 3, o.g.position.z);
          if (lv >= 5 && o.frRound !== round) {
            o.frRound = round;
            const other = shuffle(HOUSES.filter((q) => q !== h))[0], f = gossipAbout(other);
            const isNew = !notes.some((n) => n[0] === f[0]);
            if (isNew) { notes.push(f); renderNotes(); const nc = $("notechip"); nc.classList.remove("is-pop"); void nc.offsetWidth; nc.classList.add("is-pop"); }
            say(nm(h), T("Sana bir sır vereyim: ", "Let me tell you a secret: ") + T(f[0], f[1]), top, o.g, 3.5, ownerVoice(h));
            if (isNew) tw(0, () => toast(T("📒 Deftere yeni bir ipucu yazıldı.", "📒 A new clue went into your journal.")), 1.2);
          } else {
            const g = GREET[Math.floor(Math.random() * GREET.length)];
            say(nm(h), T(g[0], g[1]), top, o.g, 1.6, ownerVoice(h));
          }
          floatSprite(getFxTex().hearts[0], top.x, top.y - 0.4, top.z, 0.4, 0.4, 0.8, 1.1);
        }
        function friendLi(ul) {
          const fr = HOUSES.map((h) => [h, frOf(h)]).filter((p) => p[1] > 0).sort((a, b) => b[1] - a[1]);
          if (!fr.length) return;
          const li = document.createElement("li"); li.className = "x-frli";
          li.textContent = T("Dostluk: ", "Friendship: ") + fr.map(([h, n]) => `${nm(h)} ${"♥".repeat(n)}${"♡".repeat(5 - n)}`).join(" · ");
          ul.prepend(li);
        }
        // ---------- chain letters: some deliveries come back with a reply for another villager (2-3 links, bonus at the end) ----------
        let chainSeq = 0;
        function chainAfter(l, h, mode) {
          if (TUT.on || mode === "night") return;
          const x = PX(), c0 = l.chain;
          if (c0) {
            if (l.ck >= c0.n) {
              const bonus = 10 * c0.n; S.coins += bonus; S.earned += bonus; saveCoins();
              c0.note[0] = `Zincir tamam: ${c0.path.map((q) => q.name).join(" → ")} (+${bonus} 🪙)`; c0.note[1] = `Chain complete: ${c0.path.map((q) => q.name).join(" → ")} (+${bonus} 🪙)`;
              renderNotes(); renderHUD();
              tw(0, () => { toast(T(`🎉 Zincir tamamlandı! +${bonus} 🪙 bonus`, `🎉 Chain complete! +${bonus} 🪙 bonus`), 3000); SND.sfx("sfx_coins_bag"); }, 2.6);
              return;
            }
          } else if (S.over || (!x.unl && (x.rounds || 0) < 1) || S.done > 6 || l.rush || l.hand || Math.random() > 0.3 || S.bag.concat(S.pending).some((b) => b.chain)) return;
          if (S.over) return;
          const c = c0 || { id: ++chainSeq, n: Math.random() < 0.5 ? 2 : 3, k: 0, path: [h], note: ["", ""] };
          if (!c0) notes.push(c.note);
          const used = new Set(S.bag.concat(S.pending).map((b) => b.house).concat(c.path)), cand = HOUSES.filter((q) => !used.has(q));
          if (!cand.length) return;
          const tgt = cand[Math.floor(Math.random() * cand.length)];
          c.k++; c.path.push(tgt);
          const nl = {
            house: tgt, kind: "chain", tier: 2, n: 200 + c.id * 10 + c.k, picked: performance.now(), hl: 0, hc: null, extra: null, sketch: false, torn: null, chk: null, omit: null,
            clauses: [C_(() => true, `${h.name} bu cevabı yazdı`, `${h.name} wrote this reply`), C_((q) => q.job.tr === tgt.job.tr, ...RIDDLES[tgt.job.tr])],
            chain: c, ck: c.k,
          };
          if (S.bag.length < 3) S.bag.push(nl); else S.pending.unshift(nl);
          c.note[0] = `Zincir ${c.k}/${c.n}: ${c.path.map((q, i) => (i === c.path.length - 1 ? "?" : q.name)).join(" → ")}`;
          c.note[1] = `Chain ${c.k}/${c.n}: ${c.path.map((q, i) => (i === c.path.length - 1 ? "?" : q.name)).join(" → ")}`;
          renderNotes();
          tw(0, () => {
            toast(T(`📮 ${h.name} sana bir cevap mektubu verdi! Zincir ${c.k}/${c.n}${S.bag.indexOf(nl) < 0 ? " (çantan dolu: postanede bekliyor)" : ""}`, `📮 ${h.name} gave you a reply letter! Chain ${c.k}/${c.n}${S.bag.indexOf(nl) < 0 ? " (bag full: it waits at the post office)" : ""}`), 3200);
            SND.sfx("sfx_paper_rustle_2"); renderHUD();
          }, 2.2);
        }
        // ---------- onboarding: intro scene, three guided letters, progressive unlocks ----------
        // PX(): tut 1 = intro seen, 9 = tutorial done; unl 1 = everything unlocked (saves from before onboarding); rounds = rounds finished
        {
          const x = PX();
          if (x.tut !== 9 && !x.unl && (x.total > 0 || PROF.xp > 0 || PROF.owned.length > SHOP_CATS.length || stampCount() > 0)) { x.tut = 9; x.unl = 1; saveProf(); }
        }
        function unl(k) {
          const x = PX(); if (x.unl) return true;
          const r = x.rounds || 0;
          return k === "shop" || k === "dog" ? r >= 1 : k === "hand" ? r >= 2 : k === "vill" ? PROF.rank >= 1 : true;
        }
        function applyUnlocks() {
          $("shopchip").hidden = !unl("shop");
          $("dogchip").hidden = !unl("dog");
          dog.g.visible = unl("dog");
          const x = PX();
          if (!x.unl && ((unl("shop") && !x.shopSeen) || (unl("vill") && !x.villSeen))) $("shopnew").hidden = false;
        }
        $("shopchip").addEventListener("click", () => { const x = PX(); x.shopSeen = 1; if (unl("vill")) x.villSeen = 1; saveProf(); $("shopnew").hidden = true; });
        const TUT = { on: false, msg: null, anchor: null, bubT: 0, stuck: 0, arrow: null, arrowOn: false, seen: false };
        function tutSay(tr, en, anchor, secs = 8) {
          TUT.msg = [tr, en]; TUT.anchor = anchor || null; TUT.bubT = secs;
          const el = $("tut"); el.textContent = T(tr, en); el.hidden = false;
          el.classList.remove("is-pop"); void el.offsetWidth; el.classList.add("is-pop");
          placeTut(); safeLayout(); SND.sfx("sfx_paper_rustle_2", { vol: 0.35 });
        }
        $("tut").addEventListener("pointerdown", (e) => { e.stopPropagation(); $("tut").hidden = true; TUT.bubT = 0; });
        function placeTut() {
          const el = $("tut"); if (el.hidden || isShort()) return;
          const a = TUT.anchor && $(TUT.anchor), r = a && !a.hidden && a.offsetParent ? a.getBoundingClientRect() : null;
          if (r && r.width) {
            const w = el.offsetWidth, x = Math.max(w / 2 + 8, Math.min(innerWidth - w / 2 - 8, r.left + r.width / 2));
            el.style.left = x + "px"; el.style.top = r.bottom + 14 + "px"; el.classList.add("is-up");
          } else {
            // no anchor: low on the screen, under the postman and above the prompt (touch screens have no prompt or key hint)
            const touch = document.body.classList.contains("is-touch");
            el.style.left = "50%"; el.style.top = Math.max(60, innerHeight - el.offsetHeight - (touch ? 22 : 112)) + "px"; el.classList.remove("is-up");
          }
        }
        // a bobbing arrow pointing down at a spot (no crosses: a plain cone and shaft)
        function tutArrow(x, z, y) {
          if (!TUT.arrow) {
            const g = new THREE.Group(), mat = new THREE.MeshBasicMaterial({ color: "#ff9f1c", transparent: true, toneMapped: false, fog: false, depthWrite: false });
            const tip = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.9, 16), mat); tip.rotation.x = Math.PI; g.add(tip);
            const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.9, 12), mat); sh.position.y = 0.85; g.add(sh);
            g.renderOrder = 15; TUT.arrow = g;
          }
          const g = TUT.arrow; g.userData.y = y; g.position.set(x, y, z); g.scale.setScalar(0.001);
          if (!g.parent) scene.add(g);
          TUT.arrowOn = true;
          tw(0.45, (k) => g.scale.setScalar(Math.max(0.001, eo(k))));
        }
        const tutArrowOff = () => { TUT.arrowOn = false; if (TUT.arrow && TUT.arrow.parent) scene.remove(TUT.arrow); };
        const arrowAtHouse = (h) => tutArrow(h.door2.x, h.door2.z, h.y + h.h + 3.2);
        const arrowAtPO = () => tutArrow(PO.x, PO.z + PO.d / 2 + 1, 6.2);
        const pulseHint = (on) => ["tipchip", "lv-tip"].forEach((id) => $(id).classList.toggle("x-pulse", on));
        // the first round's letters: the three nearest the post office first; #1 a plain colour clue, #3 a rush letter with extra time
        function tutLetters(P) {
          const dPO = (l) => Math.hypot(l.house.door2.x - PO.x, l.house.door2.z - (PO.z + PO.d / 2 + 1));
          P.forEach((l) => { l.rush = false; l.limit = 0; l.gold = false; });
          P.sort((a, b) => dPO(a) - dPO(b));
          // letter 1: among the four nearest, the first whose roof and/or door colour alone picks out the house
          const easyFor = (h) => {
            const dc = colName(h.door), cc = colName(h.chimney);
            const roof = C_((x) => x.roofName.tr === h.roofName.tr, `çatım ${h.roofName.tr}`, `my roof is ${h.roofName.en}`), door = C_((x) => colName(x.door) === dc, `kapım ${dc[0]}`, `my door is ${dc[1]}`), chim = C_((x) => colName(x.chimney) === cc, `bacam ${cc[0]}`, `my chimney is ${cc[1]}`);
            return [[roof], [door], [roof, door], [roof, chim], [door, chim]].find((c) => matches(c).length === 1 && matches(c)[0] === h) || null;
          };
          for (let i = 0; i < Math.min(4, P.length); i++) {
            const easy = easyFor(P[i].house);
            if (easy) { const l = P.splice(i, 1)[0]; Object.assign(l, { kind: "look", tier: 1, clauses: easy, omit: null, torn: null, chk: null, sketch: false, svg: null, extra: null }); P.unshift(l); break; }
          }
          const r = P[2]; if (r) { r.rush = true; r.limit = Math.round(25 + dPO(r) / 6) + 15; r.rushT0 = 0; }
          return P;
        }
        function tutStart() {
          TUT.on = true;
          if (isTouchUI()) tutSay("Postaneden ilk mektubunu al: kapının önüne gel, Al'a dokun.", "Pick up your first letter at the post office: walk to its door and tap Take.", null, 12);
          else tutSay("Postaneden ilk mektubunu al: kapının önünde E'ye bas.", "Pick up your first letter at the post office: press E at its door.", null, 12);
          arrowAtPO();
        }
        function tutOnPickup() {
          if (!TUT.on) return;
          tutArrowOff();
          const n = S.done;
          if (n === 0) { tutSay("Zarfa dokun ve mektubu oku. Tarif edilen evi bul, kapısına teslim et!", "Tap the envelope to read the letter. Find the house it describes and deliver at its door!", "mailchip", 10); TUT.stuck = 20; }
          else if (n === 1) { tutSay("Takılırsan İpucu düğmesi aranacak yeri haritada gösterir.", "Stuck? The hint button marks the area on the map.", "tipchip", 10); pulseHint(true); TUT.stuck = 30; }
          else if (n === 2) { tutSay("ACELE mektup! Halkadaki süre bitmeden teslim et; çabuk olursan ★★★. " + (isTouchUI() ? "Scooter çok hızlıdır." : "Scooter (B) çok hızlıdır."), "RUSH letter! Deliver before the ring runs out; be quick for ★★★. " + (isTouchUI() ? "The scooter is fast." : "The scooter (B) is fast."), "mailchip", 10); TUT.stuck = 25; }
        }
        function tutOnDeliver() {
          if (!TUT.on) return;
          tutArrowOff(); pulseHint(false); TUT.stuck = 0;
          const n = S.done;
          if (n === 1) { tutSay("Harika! Postaneye dön, sıradaki mektubu al.", "Great! Head back to the post office for the next letter.", null, 8); arrowAtPO(); }
          else if (n === 2) { tutSay("Çok iyi! Postanede seni bir ACELE mektup bekliyor.", "Well done! A RUSH letter is waiting at the post office.", null, 8); arrowAtPO(); }
          else if (n >= 3) {
            tutSay("Tebrikler, artık köyün postacısısın! Kalan mektuplar senin.", "Congratulations, you're the village postman now! The rest of the letters are yours.", null, 6);
            TUT.on = false; const x = PX(); x.tut = 9; saveProf();
          }
        }
        anims.push((t, dt) => {
          const el = $("tut");
          if (!el.hidden) { TUT.bubT -= dt; if (TUT.bubT <= 0) el.hidden = true; else placeTut(); }
          if (TUT.arrowOn && TUT.arrow) { const g = TUT.arrow; g.position.y = g.userData.y + Math.sin(t * 3.2) * 0.3; g.rotation.y += dt * 1.6; }
          if (TUT.on && TUT.stuck > 0 && S.bag.length && !busy) {
            TUT.stuck -= dt;
            if (TUT.stuck <= 0) { const l = S.bag[S.active]; if (l) { arrowAtHouse(l.house); tutSay("Bak, ok doğru evi gösteriyor!", "Look, the arrow shows the right house!", null, 6); } }
          }
        });
        // new things at the start of later rounds: the dog (round 2)
        function roundIntro() {
          const x = PX(); applyUnlocks();
          if (x.unl) return;
          if (unl("dog") && !x.dogSeen) {
            x.dogSeen = 1; saveProf();
            const hd = player.heading, p = dog.g.position;
            p.set(player.pos.x - Math.sin(hd) * 1.8 - Math.cos(hd) * 1.1, 0, player.pos.z - Math.cos(hd) * 1.8 + Math.sin(hd) * 1.1); p.y = groundY(p.x, p.z);
            dog.g.scale.setScalar(0.001); tw(0.5, (k) => dog.g.scale.setScalar(Math.max(0.001, eo(k))), 0.3);
            tw(0, () => dogBark(0.4), 0.7); tw(0, () => dogBark(0.35), 1.1);
            tw(0, () => tutSay("Yeni dostun: köyün köpeği! Mektubun kokusunu koklatırsan (" + (isTouchUI() ? "köpek düğmesine dokun" : "G ya da köpek düğmesi") + ") seni doğru kapıya götürür.", "Meet your new friend, the village dog! Let it sniff a letter (" + (isTouchUI() ? "tap the dog button" : "G or the dog button") + ") and it leads you to the right door.", "dogchip", 9), 0.8);
          } else if (unl("shop") && !x.shopSeen) tutSay("Dükkân açıldı! Kazandığın altınlarla scooterını ve kıyafetini süsle.", "The shop is open! Spend your coins on your scooter and outfit.", "shopchip", 7);
        }
        $("again").addEventListener("click", () => setTimeout(roundIntro, 400));
        // ---------- intro scene (first run, about 12 s, skippable): flyover, ride to the post office, the headman hands over the bag ----------
        let INTRO = null;
        function dismountNow() {
          if (!scooter.riding) return;
          Object.assign(scooter, { riding: false, kick: false, v: 0, hop: null }); player.radius = 0.5;
          const bx = player.pos.x, bz = player.pos.z, sh = Math.sin(player.heading), ch = Math.cos(player.heading);
          scooter.park(bx, bz, player.heading);
          player.pos.x = bx - ch * 0.9; player.pos.z = bz + sh * 0.9; collide();
          player.pos.y = groundY(player.pos.x, player.pos.z);
          mv.x = mv.z = 0; pm.pivot.position.set(0, 0, 0);
          if (player.kk) player.kk.ride(false);
          tone(330, 0, 0.08, "triangle", 0.12);
        }
        function runIntro(done) {
          const h = byId(12), o = ownerOf(h), g = o.g;
          const snap = { parent: g.parent, pos: g.position.clone(), rot: g.rotation.y, vis: g.visible, lock: o.lock };
          const start = { x: 17, z: 9 }, dest = { x: 1.2, z: -6.4 };
          INTRO = { t: 0, done, o, h, snap, start, dest, auto: null, step: 0 };
          busy = true; cine.lock = true; cine.w = 1;
          document.body.classList.add("x-intro-on"); $("intro").hidden = false; $("tut").hidden = true;
          // the scooter waits at the edge of the square with the postman on it
          const hd0 = Math.atan2(dest.x - start.x, dest.z - start.z);
          scooter.park(start.x, start.z, hd0);
          Object.assign(scooter, { riding: true, hop: null, v: 0, kp: 0, kick: false, boost: 0 });
          player.radius = 0.75; player.pos.set(start.x, groundY(start.x, start.z), start.z); player.heading = feel.h = hd0;
          scooter.g.position.copy(player.pos); scooter.g.rotation.set(0, hd0, 0); scooter.ks.rotation.set(-1.45, 0, 0);
          if (player.kk) player.kk.ride(true);
          camFollow.set(start.x, 10, start.z + 12); cam.yaw = hd0 + Math.PI;
          // the headman waits by the post office door
          o.lock = true; g.visible = true; g.scale.setScalar(1); if (!g.parent) scene.add(g);
          g.position.set(PO.x + 2.6, groundY(PO.x + 2.6, PO.z + PO.d / 2 + 1.3), PO.z + PO.d / 2 + 1.3); g.rotation.y = angTo(g, start.x, start.z);
          if (o.kk) o.kk.set("Idle");
          SND.sfx("sfx_bell_ring", { delay: 0.4, vol: 0.3 });
        }
        function endIntro(skipped) {
          const I = INTRO; if (!I) return;
          INTRO = null;
          if (skipped || scooter.riding) {
            dismountNow();
            player.pos.set(0, 0, -8.5); player.pos.y = groundY(0, -8.5); player.heading = feel.h = Math.PI + 0.35; cam.yaw = 0.35;
            scooter.park(PO.x + 4.2, PO.z + PO.d / 2 + 2.6, Math.PI / 2);
            camFollow.set(player.pos.x + Math.sin(cam.yaw) * 11, 7, player.pos.z + Math.cos(cam.yaw) * 11);
          }
          bubbleEl.hidden = true;
          cine.w = 0; cine.lock = false; busy = false;
          document.body.classList.remove("x-intro-on"); $("intro").hidden = true;
          // the headman steps back to where his day had him (shrinking out like at a closing door)
          const o = I.o, g = o.g, back = () => {
            g.scale.setScalar(1); o.lock = I.snap.lock;
            if (o.sch) {
              const st = o.sch.st, h = I.h;
              if (st === "in") { if (g.parent) scene.remove(g); }
              else if (st === "walk" || !h.sc) { g.position.copy(I.snap.pos); g.rotation.y = I.snap.rot; if (!I.snap.parent && g.parent) scene.remove(g); }
              else { const p = st === "door" ? h.sc.stand : st === "work" ? h.sc.slot : h.sc.fount; g.position.set(p[0], groundY(p[0], p[1]), p[1]); g.rotation.y = o.sch.face || 0; }
            } else { g.position.copy(I.snap.pos); g.rotation.y = I.snap.rot; g.visible = I.snap.vis; if (!I.snap.parent && g.parent) scene.remove(g); }
          };
          if (skipped) back();
          else { if (o.kk) o.kk.set("Walk"); const r0 = g.rotation.y; tw(1.2, (k) => { g.rotation.y = r0 + Math.PI * Math.min(1, k * 3); g.position.x += 0.03; }, 0, () => tw(0.3, (k) => g.scale.setScalar(Math.max(0.001, 1 - k)), 0, back)); }
          const x = PX(); if (!x.tut) { x.tut = 1; saveProf(); }
          if (I.done) I.done();
        }
        $("intro-skip").addEventListener("click", (e) => { e.stopPropagation(); SND.sfx("ui_tap"); endIntro(true); });
        $("intro-skip").addEventListener("pointerdown", (e) => e.stopPropagation());
        addEventListener("keydown", (e) => { if (INTRO && (e.code === "Escape" || e.code === "Enter")) endIntro(true); });
        anims.push((t, dt) => {
          const I = INTRO; if (!I) return;
          I.t += dt; const tt = I.t, o = I.o, g = o.g;
          // 0-4.4 s: a slow arc high over the village, settling on the square
          if (tt < 4.4) {
            const k = eio(Math.min(1, tt / 4.4)), a = lerp(0.9, 2.5, k), R = lerp(78, 26, k);
            cine.pos.set(Math.cos(a) * R, lerp(46, 13, k), Math.sin(a) * R);
            cine.look.set(lerp(0, I.start.x, k), lerp(0, 1.5, k), lerp(4, I.start.z - 6, k));
            cine.w = 1;
          }
          // 3.6 s: the ride to the post office (autopilot input), the follow camera takes over
          if (tt >= 3.6 && I.step === 0) { I.step = 1; I.auto = I.dest; }
          if (tt >= 4.4 && tt < 5.2) cine.w = 1 - eio((tt - 4.4) / 0.8);
          if (I.auto) {
            const d = Math.hypot(I.dest.x - player.pos.x, I.dest.z - player.pos.z);
            cam.yaw = lerp(cam.yaw, player.heading + Math.PI, Math.min(1, dt * 2));
            if (d < 3.2 || tt > 9) { I.auto = null; I.brake = true; }
          }
          if (I.brake && scooter.riding) {
            scooter.v *= Math.exp(-7 * dt);
            if (scooter.v < 0.6) {
              I.brake = false; dismountNow();
              // a slow device may not have made it all the way: cut to the post office for the hand-over
              if (Math.hypot(I.dest.x - player.pos.x, I.dest.z - player.pos.z) > 5) { scooter.park(PO.x + 4.2, PO.z + PO.d / 2 + 2.6, Math.PI / 2); player.pos.set(I.dest.x - 1, 0, I.dest.z + 1.5); player.pos.y = groundY(player.pos.x, player.pos.z); }
              player.heading = feel.h = angTo({ position: player.pos }, g.position.x, g.position.z);
            }
          }
          // after the ride: a two-shot, the headman's two lines, the bag
          if (I.step === 1 && !scooter.riding && !I.brake && !I.auto) {
            I.step = 2; I.t2 = tt;
            const mx = (g.position.x + player.pos.x) / 2, mz = (g.position.z + player.pos.z) / 2, dx = g.position.x - player.pos.x, dz = g.position.z - player.pos.z, L = Math.hypot(dx, dz) || 1;
            cine.pos.set(mx - (dz / L) * 5.4 + (dx / L) * -1.5, player.pos.y + 2.4, mz + (dx / L) * 5.4 + (dz / L) * -1.5); cine.look.set(mx, player.pos.y + 1.4, mz);
            g.rotation.y = angTo(g, player.pos.x, player.pos.z);
            if (o.kk) o.kk.once("Wave");
          }
          if (I.step === 2) {
            const u = tt - I.t2;
            turnY(player.group, angTo({ position: player.pos }, g.position.x, g.position.z), Math.min(1, dt * 8)); player.heading = feel.h = player.group.rotation.y;
            cine.w = Math.min(1, u / 0.5);
            const name = T(`${I.h.name} (Muhtar)`, I.h.nameEn), head = new THREE.Vector3(g.position.x, g.position.y + 3, g.position.z);
            if (u >= 0.4 && !I.l1) { I.l1 = 1; say(name, T("Hoş geldin, yeni postacı! Köyde adres yok ama herkes birbirini tanır.", "Welcome, new postman! There are no addresses here, but everyone knows everyone."), head, g, 1.0, ownerVoice(I.h)); if (o.kk) o.kk.once("Talk"); }
            if (u >= 2.9 && !I.l2) { I.l2 = 1; say(name, T("Al bakalım çantanı. İpuçlarını oku, doğru kapıyı bul!", "Here's your bag. Read the clues and find the right door!"), head, g, 1.2, ownerVoice(I.h)); }
            if (u >= 4.2 && !I.bag) { I.bag = 1; player.act("PickUp"); SND.sfx("sfx_paper_rustle_1"); SND.sfx("sfx_bell_ding", { delay: 0.3, vol: 0.4 }); }
            if (u >= 5.0 || tt > 12) endIntro(false);
          } else if (tt > 12.5) endIntro(false);
        });
        // ---------- title screen camera (fix1106): a slow golden-morning orbit high over the village ----------
        const TITLE = { on: true, hand: false, a: 0.35, R: 66, y: 30, lx: 0, ly: 2, lz: 0 };
        anims.push((tt, dt) => {
          if (!TITLE.on) return;
          if (!TITLE.hand) TITLE.a += dt * 0.04;
          cine.pos.set(Math.cos(TITLE.a) * TITLE.R, TITLE.y + (TITLE.hand ? 0 : Math.sin(tt * 0.35) * 1.2), Math.sin(TITLE.a) * TITLE.R);
          cine.look.set(TITLE.lx, TITLE.ly, TITLE.lz);
          cine.w = 1;
        });
        // leaving the title: a swoop into the intro's first shot (new game) or down to the postman (continue)
        function titleHand(toIntro, cb) {
          if (!TITLE.on) { if (cb) cb(); return; }
          if (toIntro) {
            TITLE.hand = true; cine.lock = true;
            const a0 = TITLE.a, a1 = 0.9 + 2 * Math.PI * Math.round((a0 - 0.9) / (2 * Math.PI)), R0 = TITLE.R, y0 = TITLE.y, l0 = [TITLE.lx, TITLE.ly, TITLE.lz];
            tw(1.1, (k) => { const e = eio(k); TITLE.a = lerp(a0, a1, e); TITLE.R = lerp(R0, 78, e); TITLE.y = lerp(y0, 46, e); TITLE.lx = lerp(l0[0], 0, e); TITLE.ly = lerp(l0[1], 0, e); TITLE.lz = lerp(l0[2], 4, e); }, 0, () => { TITLE.on = false; if (cb) cb(); });
            return;
          }
          TITLE.on = false;
          camFollow.set(player.pos.x + Math.sin(cam.yaw) * 11, player.pos.y + 7, player.pos.z + Math.cos(cam.yaw) * 11);
          const w0 = cine.w; tw(1.6, (k) => (cine.w = Math.min(cine.w, lerp(w0, 0, eio(k)))), 0, () => (cine.w = 0));
          if (cb) cb();
        }
        // hooks for the title menu
        window.__apAlbum = (grid, cap) => {
          if (!PROF) return;
          const st = PROF.stamps || {}, n = stampCount(), N = HOUSES.length;
          xIcoText(cap, T(`${n}/${N} pul. Her evin ilk teslimatı onun pulunu verir; ⏱ ★★★ acele teslimat altın pulunu.`, `${n}/${N} stamps. Your first delivery to each house earns its stamp; a ⏱ ★★★ rush delivery earns the gold one.`));
          grid.innerHTML = "";
          HOUSES.forEach((h) => {
            const t = st[h.id] || 0, cv = document.createElement("canvas");
            drawStamp(cv, h, t);
            const lab = t ? `${nm(h)} · ${T(h.job.tr, h.job.en)}${t === 2 ? T(" · altın", " · gold") : ""}` : T("Kilitli pul", "Locked stamp");
            cv.setAttribute("role", "img"); cv.setAttribute("aria-label", lab); cv.title = lab; grid.append(cv);
          });
        };
        try { FX.noShake = localStorage.getItem("adressiz-shake") === "0"; } catch (e) {}
        window.__apShake = (on) => { FX.noShake = !on; };
        window.__apReady = true;
        const begin = () => {
          if (game.started) return;
          game.started = true;
          cam.yaw = 0.35; player.heading = Math.PI + 0.35;
          resetState();
          applyUnlocks();
          $("hud").hidden = false;
          const x = PX();
          if (x.tut !== 9 && !x.unl) {
            // first run: guided letters (the intro scene only the very first time)
            TUT.on = true; S.pending = tutLetters(S.pending); renderHUD();
            const go = () => { dailyStart(); tutStart(); };
            if (!x.tut && !/[?&]nointro\b/.test(location.search)) setTimeout(() => titleHand(true, () => runIntro(go)), 0); // after the loop's state exists
            else { titleHand(false); go(); }
            return;
          }
          titleHand(false);
          dailyStart();
          toast(T("Köye hoş geldin! Önce postaneden mektupları al.", "Welcome to the village! First pick up letters at the post office."), 3200);
        };
        if (window.__started) begin(); else window.__startQueue.push(begin);

        // ---------- performance mode: no shadows, pixel ratio 1, far villagers hidden, fewer particles ----------
        // auto: switches on when the average frame rate stays under 40 fps for 5 s; the settings toggle overrides it (remembered)
        const PERF_KEY = "adressiz-perf";
        try { const v = localStorage.getItem(PERF_KEY); if (v === "1" || v === "0") { perf.auto = false; perf.low = v === "1"; } } catch (e) {}
        function setPerf(on, why) {
          perf.low = !!on;
          sun.castShadow = !on; // three recompiles the lit materials without the shadow map
          renderer.setPixelRatio(on ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
          fitView(true);
          if (!on) perfHide(false);
          renderPerf();
          if (why === "auto") toast(T("Oyun akıcı olsun diye performans modu açıldı (ses ayarlarından kapatabilirsin).", "Performance mode is on to keep things smooth (you can turn it off in the sound settings)."), 3600);
        }
        function renderPerf() {
          const b = $("snd-perf"); if (!b) return;
          b.setAttribute("aria-pressed", String(perf.low)); b.textContent = perf.low ? T("Açık", "On") : T("Kapalı", "Off");
        }
        renderPerf(); // the language may have been picked (?lang=en) before this script ran
        $("snd-menu").addEventListener("click", (e) => {
          e.stopPropagation(); const b = e.currentTarget;
          if (!b.classList.contains("is-armed")) {
            b.classList.add("is-armed"); b.textContent = T("Bu tur bitsin mi? Tekrar dokun", "Leave this round? Tap again");
            setTimeout(() => { b.classList.remove("is-armed"); b.textContent = T("‹ Ana Menü", "‹ Main Menu"); }, 3500);
            return;
          }
          saveProf(); try { sessionStorage.setItem("ap-menu", "1"); } catch (err) {}
          location.reload();
        });
        $("snd-perf").addEventListener("click", (e) => {
          e.stopPropagation(); perf.auto = false; setPerf(!perf.low);
          try { localStorage.setItem(PERF_KEY, perf.low ? "1" : "0"); } catch (e2) {}
          SND.sfx("ui_toggle"); e.currentTarget.blur();
        });
        document.querySelectorAll(".x-lang button").forEach((b) => b.addEventListener("click", renderPerf));
        // villagers more than 50 units away are not drawn in performance mode
        function perfHide(on) {
          const px = player.pos.x, pz = player.pos.z;
          const each = (g) => {
            if (!g) return;
            const far = on && Math.hypot(g.position.x - px, g.position.z - pz) > 50;
            if (far && g.visible) { g.visible = false; g.userData.pfHid = true; }
            else if (!far && g.userData.pfHid) { g.visible = true; g.userData.pfHid = false; }
          };
          villagers.forEach((v) => each(v.p && v.p.g));
          HOUSES.forEach((h) => { if (h.owner && !h.owner.lock) each(h.owner.g); });
        }
        if (perf.low) setPerf(true);
        function perfTick() {
          const now = performance.now();
          if (perf.low) { if (now - perf.hideT > 500) { perf.hideT = now; perfHide(true); } }
          if (!perf.auto || perf.low || !game.started || document.hidden) { perf.win = 0; return; }
          if (!perf.win) { perf.win = now; perf.n = 0; return; }
          perf.n++;
          if (now - perf.win >= 5000) {
            const fps = (perf.n * 1000) / (now - perf.win); perf.win = 0; perf.fps = fps;
            if (fps < 40) { perf.auto = false; setPerf(true, "auto"); }
          }
        }
        perf.hideT = 0;
        if (window.__dbg) window.__dbg.perf = () => ({ low: perf.low, auto: perf.auto, fps: perf.fps });

        // ---------- loop ----------
        const clock = new THREE.Clock();
        const camTarget = new THREE.Vector3(), camLook = new THREE.Vector3(), camFollow = new THREE.Vector3(10, 8, 6), camAhead = new THREE.Vector3();
        const MAX_SP = 9.5, mv = { x: 0, z: 0 }, feel = { h: 0, pitch: 0, roll: 0, sq: 0, moving: false, vx: 0, vz: 0, bag: { x: 0, vx: 0, z: 0, vz: 0 } };
        const fq1 = new THREE.Quaternion(), fq2 = new THREE.Quaternion(), fqa = new THREE.Quaternion(), fqb = new THREE.Quaternion(), fv = new THREE.Vector3();
        const SCOOT_MUL = 2.4;
        const JUMP_T = 0.6, jump = { t: -1, last: null };
        function rampTick(dt) {
          const x = player.pos.x, z = player.pos.z;
          if (jump.t >= 0) {
            jump.t += dt;
            if (jump.t >= JUMP_T) {
              jump.t = -1;
              dustBurst(x, player.pos.y + 0.05, z, 7, mv.x * 0.12, mv.z * 0.12, 1.15);
              SND.sfx("sfx_letter_land", { rate: 0.55, vol: 0.7 });
              FX.land = 0.24; camShake(0.14, 0.32);
              vib(18);
            }
            return;
          }
          if (jump.last && Math.hypot(x - jump.last.x, z - jump.last.z) > 3) jump.last = null;
          if (scooter.v < 2.5) return;
          for (const r of RAMPS) {
            const dx = x - r.x, dz = z - r.z;
            if (Math.abs(dx * r.cx + dz * r.cz) < 1.3 && Math.abs(dz * r.cx - dx * r.cz) < 1.1 && r !== jump.last) {
              jump.t = 0; jump.last = r;
              SND.sfx("sfx_toss_whoosh", { vol: 0.3, rate: 0.75 });
              break;
            }
          }
        }
        let t = 0, stepDt = null;
        function tick() {
          const rdt = stepDt != null ? stepDt : Math.min(clock.getDelta(), 0.05), dt = rdt * feelTS(rdt); t += dt;
          let ix = 0, iy = 0;
          if (FX.mom) {
            const rl = Math.hypot((keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0) + joy.x, (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0) + joy.y);
            FX.mom.age = (FX.mom.age || 0) + rdt;
            if (rl < 0.1) FX.mom.rel = true; else if (rl > 0.3 && FX.mom.rel && FX.mom.age > 0.3) skipMoment();
          }
          if (game.started && !cine.lock) {
            ix = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0) + joy.x;
            iy = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0) + joy.y;
          } else if (!(INTRO && INTRO.step)) cam.yaw += dt * 0.08;
          if (INTRO && INTRO.auto) {
            // intro autopilot: steer toward the post office (inverse of the camera-relative stick mapping)
            const dx = INTRO.auto.x - player.pos.x, dz = INTRO.auto.z - player.pos.z, dl = Math.hypot(dx, dz) || 1, sy = Math.sin(cam.yaw), cy = Math.cos(cam.yaw);
            ix = (cy * dx - sy * dz) / dl; iy = -(sy * dx + cy * dz) / dl;
          }
          const riding = scooter.riding, hop = riding && scooter.hop;
          if (hop) ix = iy = 0;
          const il = Math.hypot(ix, iy); if (il > 1) { ix /= il; iy /= il; }
          const run = keys.ShiftLeft || keys.ShiftRight;
          const target = Math.min(1, il) * (run ? MAX_SP : 5);
          // velocity with acceleration (~0.25 s to top speed) and deceleration (~0.15 s to stop)
          let tx = 0, tz = 0, ang = 0;
          if (il > 0.05) {
            const sy = Math.sin(cam.yaw), cy = Math.cos(cam.yaw);
            const mxv = -sy * iy + cy * ix, mzv = -cy * iy - sy * ix, ml = Math.hypot(mxv, mzv) || 1;
            tx = (mxv / ml) * target; tz = (mzv / ml) * target;
            // facing: shortest-path turn at up to 12 rad/s
            let a = Math.atan2(mxv, mzv) - player.heading; while (a > Math.PI) a -= 6.283; while (a < -Math.PI) a += 6.283;
            ang = a;
            // a scooter carves wider turns, a little wider still at speed (radius ~3 m at cruise, ~7 m flat out)
            const turn = riding ? Math.max(3.2, 4.6 - scooter.v * 0.06) : 13;
            const da = riding ? a : a * (1 - Math.exp(-15 * dt));
            player.heading += Math.max(-turn * dt, Math.min(turn * dt, da));
          }
          if (riding) {
            // scooter: kick while pushing below 85% of top speed (or right after mounting), coast with slow friction otherwise
            const sc = scooter, vmax = (run ? MAX_SP : 5) * SCOOT_MUL, push = il > 0.05 && Math.abs(ang) < 2;
            sc.boost = Math.max(0, sc.boost - dt);
            const want = !hop && ((push && sc.v < vmax * 0.9) || sc.boost > 0), drive = !hop && (push || sc.boost > 0);
            if (want && !sc.kick) sc.kp = 0;
            if (want) sc.kick = true;
            if (sc.kick && hop) sc.kick = false;
            if (sc.kick) {
              // one 0.7 s ScooterKick cycle (always finished once started): steady thrust takes 0 to top in ~0.6 s,
              // and the foot push (38 to 53% of the clip) adds a surge of ~25% of top speed, past top for a moment
              const KC = 0.7, p0 = sc.kp, p1 = p0 + dt / KC, ov = Math.max(0, Math.min(p1, 0.53) - Math.max(p0, 0.38));
              if (drive) {
                if (sc.v < vmax) sc.v = Math.min(vmax, sc.v + (vmax / 0.9) * dt);
                sc.v = Math.min(vmax * 1.12, sc.v + (vmax * 0.25 * ov) / 0.15);
              }
              if (p0 < 0.4 && p1 >= 0.4) { kickDust(); SND.sfx("sfx_scooter_kick", { rate: 0.94 + Math.random() * 0.12 }); camShake(0.03, 0.14); }
              if (p1 >= 1) { sc.kp = 0; sc.kick = want; } else sc.kp = p1;
            }
            const fr = push ? 0.45 : il > 0.05 ? 10 : 1.1; // reversing the stick brakes
            sc.v = hop ? 0 : Math.max(0, sc.v - fr * dt - (sc.v > vmax && !sc.boost ? 2.5 * dt : 0));
            mv.x = Math.sin(player.heading) * sc.v; mv.z = Math.cos(player.heading) * sc.v;
          } else {
            const vl = Math.hypot(mv.x, mv.z), tl = Math.hypot(tx, tz);
            const rate = tl >= vl - 0.01 ? Math.max(tl, 1) / 0.25 : (vl > 5.5 ? MAX_SP : 5) / 0.15;
            const dx = tx - mv.x, dz = tz - mv.z, dl = Math.hypot(dx, dz), st = Math.min(dl, rate * dt);
            if (dl > 1e-5) { mv.x += (dx / dl) * st; mv.z += (dz / dl) * st; }
          }
          const pvx = mv.x, pvz = mv.z;
          player.speed = Math.hypot(mv.x, mv.z);
          const prevX = player.pos.x, prevZ = player.pos.z;
          // substeps of at most 0.35 units, so the faster scooter cannot slip through thin railings
          {
            const n = Math.max(1, Math.ceil((Math.hypot(mv.x, mv.z) * dt) / 0.35));
            for (let i = 0; i < n; i++) {
              const sx = player.pos.x, sz = player.pos.z;
              player.pos.x += (mv.x * dt) / n; player.pos.z += (mv.z * dt) / n;
              collide();
              const [wx, wz] = waterSlide(sx, sz, player.pos.x, player.pos.z); player.pos.x = wx; player.pos.z = wz;
            }
          }
          // on the scooter, walls and banks eat the speed going into them
          if (riding && dt > 0) {
            const ax = (player.pos.x - prevX) / dt, az = (player.pos.z - prevZ) / dt, lost = Math.hypot(mv.x - ax, mv.z - az);
            if (lost > 0.5) {
              if (lost > 7) tone(150, 0, 0.12, "sine", 0.14);
              mv.x = ax; mv.z = az; player.speed = scooter.v = Math.hypot(ax, az);
            }
          }
          // mount hop: glide onto the parked scooter in 0.25 s, then one kick
          if (hop) {
            hop.t += dt; const hk = Math.min(1, hop.t / 0.25);
            player.pos.x = lerp(hop.x, scooter.g.position.x, hk); player.pos.z = lerp(hop.z, scooter.g.position.z, hk);
            if (hk >= 1) { scooter.hop = null; scooter.boost = 1; }
          }
          player.pos.y = groundY(player.pos.x, player.pos.z);
          // ramps: a 0.6 s hop over the hump, landing in a burst of dust
          if (riding && !hop) rampTick(dt); else jump.t = -1;
          if (jump.t >= 0) player.pos.y += Math.sin((Math.PI * jump.t) / JUMP_T) * 0.8;
          player.group.rotation.y = player.heading;
          // juice: forward lean when running, side lean into turns, squash on start/stop, satchel spring
          {
            const k = 1 - Math.exp(-10 * dt), sp = player.speed;
            let dh = player.heading - feel.h; while (dh > Math.PI) dh -= 6.283; while (dh < -Math.PI) dh += 6.283; feel.h = player.heading;
            const runF = riding ? 0 : Math.max(0, Math.min(1, (sp - 5) / (MAX_SP - 5))), om = dt > 0 ? dh / dt : 0;
            feel.om = om;
            feel.pitch = lerp(feel.pitch, riding ? 0.08 : 0.03 * Math.min(1, sp / 5) + 0.13 * runF, k);
            // lean into turns: a gentle sway on foot, up to 12° on the scooter
            const lean = riding ? 0.21 : 0.14, lk = riding ? 1 - Math.exp(-6 * dt) : k;
            feel.roll = lerp(feel.roll, Math.max(-lean, Math.min(lean, -om * sp * (riding ? 0.03 : 0.012))), lk);
            const moving = sp > 0.4;
            if (moving !== feel.moving) { feel.moving = moving; feel.sq = 0.08; }
            feel.sq = Math.max(0, feel.sq - dt);
            const sq = feel.sq > 0 ? Math.sin(Math.PI * (1 - feel.sq / 0.08)) * 0.06 : 0;
            if (riding) {
              // stand the rider on the deck (foot_l on it, hands on the grips), leaning with the scooter about the ground; hop arc while mounting
              const F = scooter.F, hk = hop ? Math.min(1, hop.t / 0.25) : 1, ox = F.ox * hk, oy = F.oy * hk + Math.sin(Math.PI * hk) * 0.35;
              const c = Math.cos(feel.roll), s = Math.sin(feel.roll);
              pm.pivot.rotation.set(0, 0, feel.roll);
              pm.pivot.position.set(ox * c - oy * s, ox * s + oy * c, F.oz * hk);
              // take-off stretch, landing squash (subtle)
              FX.land = Math.max(0, FX.land - dt);
              const lq = FX.land > 0 ? Math.sin(Math.PI * (1 - FX.land / 0.24)) * 0.13 : 0, js = jump.t >= 0 && jump.t < 0.22 ? Math.sin((Math.PI * jump.t) / 0.22) * 0.07 : 0;
              pm.pivot.scale.set(1 + lq * 0.5 - js * 0.4, 1 - lq + js, 1 + lq * 0.5 - js * 0.4);
            } else {
              pm.pivot.rotation.set(feel.pitch, 0, feel.roll);
              pm.pivot.scale.set(1 + sq * 0.5, 1 - sq, 1 + sq * 0.5);
            }
            // acceleration in the body's frame drives a damped spring, swinging the bag the other way
            const ax = dt > 0 ? (pvx - feel.vx) / dt : 0, az = dt > 0 ? (pvz - feel.vz) / dt : 0; feel.vx = pvx; feel.vz = pvz;
            const sh = Math.sin(player.heading), ch = Math.cos(player.heading), af = ax * sh + az * ch, al = ax * ch - az * sh;
            const B = feel.bag, tgX = Math.max(-0.45, Math.min(0.45, af * 0.012)), tgZ = Math.max(-0.45, Math.min(0.45, -al * 0.012));
            B.vx += (90 * (tgX - B.x) - 9 * B.vx) * dt; B.x += B.vx * dt;
            B.vz += (90 * (tgZ - B.z) - 9 * B.vz) * dt; B.z += B.vz * dt;
            const bagObj = player.kk ? player.kk.bag : pm.bagG;
            if (bagObj && bagObj.parent) {
              const bq = bagObj.userData.bq || (bagObj.userData.bq = bagObj.quaternion.clone());
              bagObj.parent.getWorldQuaternion(fq1).invert().multiply(pm.pivot.getWorldQuaternion(fq2));
              fqa.setFromAxisAngle(fv.set(1, 0, 0).applyQuaternion(fq1), B.x);
              fqb.setFromAxisAngle(fv.set(0, 0, 1).applyQuaternion(fq1), B.z);
              bagObj.quaternion.copy(fqa).multiply(fqb).multiply(bq);
            }
          }
          // scooter and rider move as one rig: same spot, heading and lean; wheels spin with speed, bar steers up to 25°
          if (riding) {
            const sc = scooter;
            if (!hop) { sc.g.position.copy(player.pos); sc.g.rotation.set(0, player.heading, feel.roll); }
            sc.spin += (player.speed * dt) / 0.1;
            sc.wheels.forEach((w) => (w.rotation.x = sc.spin));
            sc.front.rotation.y = lerp(sc.front.rotation.y, Math.max(-0.436, Math.min(0.436, (feel.om || 0) * 0.15)), Math.min(1, dt * 10));
          }
          if (player.kk) player.kk.update(dt, player.speed, !cine.lock, MAX_SP, scooter);
          else if (riding) animateRiderFallback(pm, dt, scooter);
          else animatePostmanFallback(pm, player.speed, dt);

          for (const f of anims) f(t, dt);
          if (game.onUpdate) game.onUpdate(dt, t);

          // smooth follow (6/s) with a 1.5-unit look-ahead in the movement direction
          // speed feel: on the scooter the view widens (FOV +9°) and pulls back ~20% and looks further ahead as speed builds
          const cl = 1 - Math.exp(-6 * rdt);
          FX.camS = lerp(FX.camS, riding && !cine.lock ? Math.min(1, Math.max(0, (player.speed - 3) / 16)) : 0, 1 - Math.exp(-2.5 * rdt));
          const cs = FX.camS, aw = (Math.min(1, player.speed / 5) * (1.5 + 2.5 * cs)) / Math.max(player.speed, 1e-3), cd = cam.dist * (1 + 0.2 * cs) * (vh0 <= 500 ? 1.1 : 1);
          camAhead.lerp(fv.set(mv.x * aw, 0, mv.z * aw), cl);
          // fix1106: on short landscape phones aim a little above the postman so he sits in the lower-centre third
          camTarget.set(player.pos.x + camAhead.x, player.pos.y + (vh0 <= 500 ? 2.5 : 1.8), player.pos.z + camAhead.z);
          const cp = Math.cos(cam.pitch);
          const want = new THREE.Vector3(camTarget.x + Math.sin(cam.yaw) * cp * cd, camTarget.y + Math.sin(cam.pitch) * cd, camTarget.z + Math.cos(cam.yaw) * cp * cd);
          want.y = Math.max(want.y, groundY(want.x, want.z) + 0.8);
          camFollow.lerp(want, cl);
          camera.position.copy(camFollow).lerp(cine.pos, cine.w);
          camera.lookAt(camLook.copy(camTarget).lerp(cine.look, cine.w));
          FX.fovP *= Math.exp(-7 * rdt);
          const fov = 55 + 9 * cs * (1 - cine.w) + FX.fovP;
          if (Math.abs(fov - FX.fov) > 0.02) { FX.fov = fov; camera.fov = fov; camera.updateProjectionMatrix(); }
          if (FX.shA > 0) {
            FX.shT += rdt; const k = 1 - FX.shT / FX.shD;
            if (k <= 0) FX.shA = 0;
            else { const a = FX.shA * k * k, tt = performance.now() / 1000; camera.translateX(Math.sin(tt * 53.1) * a + Math.sin(tt * 31.7) * a * 0.4); if (!FX.shH) camera.translateY(Math.sin(tt * 47.3 + 1.7) * a * 0.7); }
          }

          updateDay(dt, t, player.pos);
          sun.position.copy(player.pos).add(DN.sunOff);
          sun.target.position.copy(player.pos);
          if (stepDt != null) return; // ?debug stepping: no draw, no new frame
          perfTick();
          if ((FX.fitT = (FX.fitT || 0) + rdt) > 0.5) { FX.fitT = 0; fitView(); }
          drawMap();
          renderer.render(scene, camera);
          requestAnimationFrame(tick);
        }
        // ?debug: run n whole frames of fixed dt (for headless tests on slow software GL)
        if (window.__dbg) window.__dbg.step = (n, d = 1 / 30) => { stepDt = d; try { for (let i = 0; i < n; i++) tick(); } finally { stepDt = null; clock.getDelta(); } };
        if (window.__dbg) Object.assign(window.__dbg, { FX, TUT, scooter, cam, chainAfter, friendGreet, frOf, notes, generateLetters, clueText, gossipAbout, HOUSES, KIND, T, DOST, RIDDLES, GREET });
        camera.position.set(10, 8, 6);
        tick();
      })();
    