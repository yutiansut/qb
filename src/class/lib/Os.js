function detectOS() {
  let sUserAgent = navigator.userAgent;
  let isWin = navigator.platform == "Win32" || navigator.platform == "Windows" || navigator.platform == "Win64";
  let isMac =
    navigator.platform == "Mac68K" ||
    navigator.platform == "MacPPC" ||
    navigator.platform == "Macintosh" ||
    navigator.platform == "MacIntel";
  if (isMac) return "Mac";
  let isUnix = navigator.platform == "X11" && !isWin && !isMac;
  if (isUnix) return "Unix";
  let isLinux = String(navigator.platform).indexOf("Linux") > -1;
  if (isLinux) return "Linux";
  if (isWin) {
    let isWin2K = sUserAgent
        .toLowerCase()
        .indexOf(
          "windows nt 5.0"
        ) > -1 || sUserAgent.toLowerCase().indexOf("windows 2000") > -1;
    if (isWin2K) return "Windows 2000";
    let isWinXP = sUserAgent
        .toLowerCase()
        .indexOf(
          "windows nt 5.1"
        ) > -1 || sUserAgent.toLowerCase().indexOf("windows XP") > -1;
    if (isWinXP) return "Windows XP";
    let isWin2003 = sUserAgent
        .toLowerCase()
        .indexOf(
          "windows nt 5.2"
        ) > -1 || sUserAgent.toLowerCase().indexOf("windows 2003") > -1;
    if (isWin2003) return "Windows 2003";
    let isWinVista = sUserAgent
        .toLowerCase()
        .indexOf(
          "windows nt 6.0"
        ) > -1 || sUserAgent.toLowerCase().indexOf("windows vista") > -1;
    if (isWinVista) return "Windows Vista";
    let isWin7 = sUserAgent
        .toLowerCase()
        .indexOf(
          "windows nt 6.1"
        ) > -1 || sUserAgent.toLowerCase().indexOf("windows 7") > -1;
    if (isWin7) return "Windows 7";
    let isWin10 = sUserAgent
    .toLowerCase()
    .indexOf(
      "windows nt 10"
    ) > -1 || sUserAgent.toLowerCase().indexOf("windows 10") > -1;
    if (isWin10) return "Windows 10";
  }
  return "otherOs";
}
export default detectOS;