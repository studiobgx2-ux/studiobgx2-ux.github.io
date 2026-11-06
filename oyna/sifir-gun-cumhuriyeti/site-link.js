/* BGX2 site: back link goes to the web games list in the language the site opened the game with (?lang=tr|en; the game itself is Turkish only) */
(function () {
  var a = document.getElementById("bgxBack"); if (!a) return;
  var en = false; try { en = new URLSearchParams(location.search).get("lang") === "en"; } catch (e) {}
  if (en) { a.href = "/en/web-games/"; a.setAttribute("aria-label", "Back to BGX2 Games web games"); a.setAttribute("lang", "en"); }
})();
