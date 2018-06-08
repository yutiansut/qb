function fontSizeInit() {
  let doc = document.documentElement,
    cli = doc.clientWidth;
  cli && (cli /= 1200, cli > 2 && (cli = 2), cli < 0.8 && (cli = 0.8), doc.style.fontSize = 16 * cli + "px");
}

// 执行html的font大小设置
fontSizeInit();
window.addEventListener('resize', function() {
  fontSizeInit();
});
