// 获取Blob
function getBlob(base64) {
  return b64toBlob(getData(base64), getContentType(base64));
}

// 获取文件类型
function getContentType(base64) {
  return /data:([^;]*);/i.exec(base64)[1];
}

// 获取base64中的数据
function getData(base64) {
  return base64.substr(base64.indexOf("base64,") + 7, base64.length);
}

// base64转Blob
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

// 下载函数实现
export function downloadCanvas(dom, fileType, fileName) {
  let link = document.createElement('a');
  let base64 = dom.toDataURL(fileType);
  let blob = getBlob(base64);

  // let result
  // let canvas = document.createElement('CANVAS')
  //       canvas.style.display = 'none'
  // let ctx = canvas.getContext('2d')
  // let image = new Image()
  // image.src = URL.createObjectURL(blob)
  // image.onload = function(){
  //     canvas.width = image.width
  //     canvas.height = image.height
  //     ctx.drawImage(image, 0, 0)
  //     result = dataURItoBlob(canvas.toDataURL(type))
  //     // if(callback)
  //     //     callback(result)
  //     // else
  //     //     resolve(result)
  // }

  // if (window.navigator.userAgent.match(/Chrome/i) && window.navigator.userAgent.match(/Mobile/i)) {
  //   alert('111111111111')
  //   window.open("/api/" + $routeParams.ID)
  // } else {
  //   alert('44444444444')
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    console.log(link.href)
    console.log(blob)
    link.dispatchEvent(new MouseEvent('click', {}))
  // }


  // if (window.navigator.msSaveBlob) {
  //   window.navigator.msSaveBlob(blob, fname);
  // } else {
  //   link.download = fileName;
  //   link.href = URL.createObjectURL(blob);
  //   console.log(link.href)
  //   console.log(blob)
  //   link.dispatchEvent(new MouseEvent('click', {}))
  // }
}