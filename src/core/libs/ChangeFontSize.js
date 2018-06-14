// function fontSizeInit() {
//   let doc = document.documentElement,
//     cli = doc.clientWidth;
//   cli && (cli /= 1200, cli > 2 && (cli = 2), cli < 0.8 && (cli = 0.8), doc.style.fontSize = 16 * cli + "px");
// }

// 执行html的font大小设置
// fontSizeInit();
// window.addEventListener('resize', function() {
//   fontSizeInit();
// });
(function (doc, win) {
  let docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        let clientWidth = docEl.clientWidth;
        clientWidth && (clientWidth /= 1440, clientWidth > 2 && (clientWidth = 2), clientWidth < 0.8 && (clientWidth = 0.8), docEl.style.fontSize = 16 * cli + "px");

      };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);