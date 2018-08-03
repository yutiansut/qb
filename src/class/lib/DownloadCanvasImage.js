/**
 *
 * 传入三个参数：
 * 1. dom ，获取dom， 可以是图片（img） 和 canvas
 * 2. fileType 文件后缀名
 * 3. fileName 文件名
 *
*/

function convertBase64UrlToBlob(urlData, type) {
  let bytes = window.atob(urlData.split(',')[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/' + type });
}

function downloadIMG(dom, fileType, fileName) {
  debugger;
  let a = document.createElement('a');
  a.innerHTML = fileName;
  a.download = fileName;
  // 有src  下载img
  if(dom.src){
    a.href =dom.src;
  }
  // 否则下载canvas为图片格式
  else{
    let base64 = dom.toDataURL(fileType);
    let blob = convertBase64UrlToBlob(base64, fileType);
    a.href = URL.createObjectURL(blob);
  }
  document.body.appendChild(a);
  let evt = document.createEvent("MouseEvents");
  evt.initEvent("click", false, false);
  a.dispatchEvent(evt);
  document.body.removeChild(a);
}

export default downloadIMG;