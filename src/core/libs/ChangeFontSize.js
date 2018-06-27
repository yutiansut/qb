(function (doc, win) {
  let docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        console.log('win', window.location.pathname)
        let clientWidth = document.body.clientWidth;
        clientWidth && (clientWidth /= 1440, clientWidth > 2 && (clientWidth = 2), clientWidth < 0.8 && (clientWidth = 0.8), docEl.style.fontSize = 100 * clientWidth + "px");
        // 字体改变，通知k线图重绘
        window.redrawKline && window.redrawKline();
      };
  
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
  win.onload = recalc;

 
})(document, window);

// if (!Object.prototype.watch)
//   Object.prototype.watch = function (prop, handler) {
//     var oldval = this[prop], newval = oldval,
//         getter = function () {
//           return newval;
//         },
//         setter = function (val) {
//           oldval = newval;
//           return newval = handler.call(this, prop, oldval, val);
//         };
//     if (delete this[prop]) { // can't watch constants
//       if (Object.defineProperty) // ECMAScript 5
//         Object.defineProperty(this, prop, {
//           get: getter,
//           set: setter
//         });
//       else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) { // legacy
//         Object.prototype.__defineGetter__.call(this, prop, getter);
//         Object.prototype.__defineSetter__.call(this, prop, setter);
//       }
//     }
//   };
//
// // object.unwatch
// if (!Object.prototype.unwatch)
//   Object.prototype.unwatch = function (prop) {
//     var val = this[prop];
//     delete this[prop]; // remove accessors
//     this[prop] = val;
//   };

