/* BGX2 site: back link follows the language the game is shown in */
(function () {
  var a = document.getElementById("bgxBack"); if (!a) return;
  function sync() { var en = window.__lang === "en";
    a.href = en ? "/en/web-games/" : "/web-oyunlari/";
    a.setAttribute("aria-label", en ? "Back to BGX2 Games web games" : "BGX2 Games web oyunlarına dön"); }
  sync(); document.querySelectorAll(".x-lang button").forEach(function (b) { b.addEventListener("click", function () { setTimeout(sync, 0); }); });
})();
