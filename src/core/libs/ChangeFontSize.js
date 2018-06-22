(function (doc, win) {
  let docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        let clientWidth = document.body.clientWidth;
        clientWidth && (clientWidth /= 1440, clientWidth > 2 && (clientWidth = 2), clientWidth < 0.8 && (clientWidth = 0.8), docEl.style.fontSize = 100 * clientWidth + "px");
      };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
  win.onload = recalc;
})(document, window);