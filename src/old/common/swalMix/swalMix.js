const swalConfig = {
  success: "/static/common/swalMix/img/success.png",
  info: "/static/common/swalMix/img/info.png",
  error: "/static/common/swalMix/img/error.png",
  warning: "/static/common/swalMix/img/warning.png",
}

/**
 * position:'top', // 弹窗位置，默认为水平垂直居中
 *     'top', 'top-start', 'top-end', //上中，上左，上右
 *     'center', 'center-start', 'center-end', //居中，中左，中右
 *     'bottom', 'bottom-start', 'bottom-end' //下中，下左，下右
 * timer: 3000	//自动关闭对话框的定时器，单位毫秒, 无默认
 * title: '成功', // 弹窗标题包含按钮的title在顶部，不包含的在右侧顶部，可以包含html
 * text: "这是弹窗内容", //弹窗内容，等同于html
 * html:'<input type="text" width="100px">', //弹窗内容，作用等同于text
 *    注意：text和html属性共存时，只取html
 * type:'success', // success, error, warning, info, 设置相应内容显示对应图片
 * width: 330;//包含按钮的默认为390，不包含的默认为330
 * customClass:'swalMix', //自定义类，默认为mix项目定义
 * showConfirmButton: true, //是否显示确认按钮，默认为false
 * confirmButtonText: '确 定', //确认按钮内容，默认为‘确 定’
 * success: () => console.log('success'), //点击确认按钮后的回调函数
 * showCancelButton: true, //是否显示取消按钮，默认为false
 * cancelButtonText: '取 消', //取消按钮内容，默认为‘取 消’
 * cancel: () => console.log('cancel') //点击取消按钮后的回调函数
 * showCloseButton: false, //是否显示右上角的‘X’按钮，默认为true
 * close: () => console.log('close') //点击右上角的‘X’按钮后的回调函数
 * allowOutsideClick: false, //是否允许点击空白处关闭弹窗，默认允许
 * allowEscapeKey: false, //是否允许按下Esc键来关闭对话框，默认允许
 */


function swalMix(obj) {
  // console.log('obj 0', obj)
  let html = `<div class="swalMix-html">`, typeFlag = false;
  if(obj.showConfirmButton || obj.showCancelButton) {
    typeFlag = true;
    html = `<div class="swalMix-header">${obj.title || ""}</div><div class="swalMix-html swalMix-html-margin swalMix-html-alignCenter">`
    delete obj.title;
  }
  if(obj.type && obj.type !== 'input'){
    let imgHtml = swalConfig[obj.type]
    if(html)
      html += `<img class="${!typeFlag && 'swalMix-text-float' || ''}" src=${imgHtml}>`
    delete obj.type
  }
  html += `<div class="swalMix-text">`
  if(!typeFlag) {
    html += `<div class="swalMix-text-title">${obj.title || ""}</div>`
    delete obj.title
  }
  html += `<div class="swalMix-text-content ${typeFlag && 'swalMix-text-black' || 'swalMix-text-gray'}">${obj.html || obj.text}</div></div></div>`
  obj.html = html
  obj.width = typeFlag && 390 || 330
  obj = Object.assign({
    buttonsStyling: false,
    focusConfirm: false,
    reverseButtons: true,
    padding: '20',
    customClass: 'swalMix',
    showCloseButton: true,
    showConfirmButton: false,
    confirmButtonClass: 'swalMix-confirmBtn',
    confirmButtonText: '确 定',
    cancelButtonClass: 'swalMix-cancelBtn',
    cancelButtonText: '取 消'
  }, obj)
  // console.log('obj 3', obj)
  swal(obj).then(result => {
    // console.log(result)
    result.value && obj.success()
    result.dismiss === 'cancel' && obj.cancel && obj.cancel()
    result.dismiss === 'close' && obj.close && obj.close()
  })
}
