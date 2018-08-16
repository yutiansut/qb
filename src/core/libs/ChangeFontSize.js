export default function (minWidth, maxWidth, originWidth = 1440) {
  let docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      let clientWidth = document.body.clientWidth, minRate = minWidth/originWidth, maxRate = maxWidth/originWidth;
      clientWidth && (clientWidth /= originWidth, clientWidth > maxRate && (clientWidth = maxRate), clientWidth < minRate && (clientWidth = minRate), docEl.style.fontSize = 100 * clientWidth + "px");
      // 字体改变，通知k线图重绘
      window.redrawKline && window.redrawKline();
      window.redrawDepth && window.redrawDepth();
    };

  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
  window.onload = recalc;
  recalc()
}


