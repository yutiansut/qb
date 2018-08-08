// (function (doc, win) {
//   let docEl = doc.documentElement,
//     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//     recalc = function () {
//       // console.log('win', window.location.pathname)
//       let clientWidth = document.body.clientWidth;
//       clientWidth && (clientWidth /= 1440, clientWidth > 2 && (clientWidth = 2), clientWidth < 0.8 && (clientWidth = 0.8), docEl.style.fontSize = 100 * clientWidth + "px");
//       // 字体改变，通知k线图重绘
//       window.redrawKline && window.redrawKline();
//       window.redrawDepth && window.redrawDepth();
//     };
//
//   if (!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false);
//   doc.addEventListener('DOMContentLoaded', recalc, false);
//   win.onload = recalc;
//
//
// })(document, window);

export default function (minWidth, maxWidth, originWidth = 1440) {
  let docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      // console.log('win', window.location.pathname)
      setTimeout(function(){
        document.body.scrollTop = document.body.scrollHeight;
      },300);
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


