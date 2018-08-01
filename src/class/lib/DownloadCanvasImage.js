function convertBase64UrlToBlob(urlData, type) {
  let bytes = window.atob(urlData.split(',')[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/' + type });
}

function downloadIMG(canvasDOM, fileType, fileName) {
  let base64 = canvasDOM.toDataURL(fileType);
  let blob = convertBase64UrlToBlob(base64, fileType);
  let a = document.createElement('a');
  a.innerHTML = fileName;
  // 指定生成的文件名
  a.download = fileName;
  a.href = URL.createObjectURL(blob);

  document.body.appendChild(a);

  let evt = document.createEvent("MouseEvents");
  evt.initEvent("click", false, false);
  a.dispatchEvent(evt);
  document.body.removeChild(a);
}

export default downloadIMG;