(function (doc, win) {
  let docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      // console.log('win', window.location.pathname)
      let clientWidth = document.body.clientWidth;
      clientWidth && (clientWidth /= 375 , docEl.style.fontSize = 100 * clientWidth + "px");
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
  win.onload = recalc;
})(document, window);
