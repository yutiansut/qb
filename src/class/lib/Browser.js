function getExplorerInfo() {
  let explorer = window.navigator.userAgent.toLowerCase();
  //ie
  console.log(explorer);
  if (explorer.indexOf("msie") >= 0) {
    let ver = explorer.match(/msie ([\d.]+)/)[1];
    return "IE" + ver;
  } else if (explorer.indexOf("edge") >= 0) {
    let ver = explorer.match(/edge\/([\d.]+)/)[1];
    return "Edge" + ver;
  } else if (explorer.indexOf("firefox") >= 0) {
    let ver = explorer.match(/firefox\/([\d.]+)/)[1];
    return "Firefox" + ver;
  } else if (explorer.indexOf("chrome") >= 0) {
    let ver = explorer.match(/chrome\/([\d.]+)/)[1];
    return "Chrome" + ver;
  } else if (explorer.indexOf("opera") >= 0) {
    let ver = explorer.match(/opera.([\d.]+)/)[1];
    return "Opera" + ver;
  } else if (explorer.indexOf("Safari") >= 0) {
    let ver = explorer.match(/version\/([\d.]+)/)[1];
    return "Safari" + ver;
  } else {
    return "Unknow";
  }
}
export default getExplorerInfo;