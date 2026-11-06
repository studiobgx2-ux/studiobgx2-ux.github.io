/* BGX2 site: back link follows the language the game is shown in */
(function () {
  var a = document.getElementById("bgxBack"); if (!a) return;
  function sync() { var en = window.__lang === "en";
    a.href = en ? "/en/web-games/" : "/web-oyunlari/";
    a.setAttribute("aria-label", en ? "Back to BGX2 Games web games" : "BGX2 Games web oyunlarına dön"); }
  function fs() { var f = document.getElementById("bgxFs"); if (!f) return; var en = window.__lang === "en";
    f.textContent = en ? "Full screen" : "Tam ekran"; f.setAttribute("aria-label", en ? "Play in full screen" : "Tam ekran oyna"); }
  sync(); document.addEventListener("DOMContentLoaded", fs); document.querySelectorAll(".x-lang button").forEach(function (b) { b.addEventListener("click", function () { setTimeout(function () { sync(); fs(); }, 0); }); });
})();
