/**
 * 生成websocket
 * 支持多个链接
 * 引入文件执行方法，返回pool实例
 * 调用pool.start方法注册websocket链接（返回promise）
 * _url, 路径
 * _size websocket数量
 * @returns {{}}
 */

export default function () {
  let pool = {}, //连接池对象
    poolSize = 0, //连接池大小
    connects = [], //连接数组
    size, //传入的大小
    url //地址

  /**
   * 建立websocket连接方法
   * @param url
   * @param callBack
   */
  function createConnect(url, callBack) {
    let webSocket = new WebSocket(url) // 创建链接

    //webSocket连接之后的操作
    webSocket.onopen = event => onOpen(event)

    function onOpen(event) {
      console.log('webSocket开启', event.target.url)
      connects.push(webSocket)
      poolSize = connects.length
      callBack && connects.length === size && callBack.resolve(true)
    }

    //webSocket接收信息的操作
    webSocket.onmessage = event => onMessage(pool, event)

    function onMessage(pool, event) {
      // console.log('webSocket接收信息', event.data)
      console.log('webSocket接收信息',  event.data, pool.onMessage)
      pool.onMessage && pool.onMessage(JSON.parse(event.data))
    }

    //webSocket断开之后的操作
    webSocket.onclose = onClose

    function onClose(event) {
      console.log('webSocket断开', event.target.url)
      console.log('webSocket断开', event)
      reConnect(webSocket, callBack)
    }

    //webSocket出错之后的操作
    webSocket.onerror = onError

    function onError(event) {
      console.error('webSocket出错', event.target.url,event )
      pool.onError && pool.onError(event)
      reConnect(webSocket, callBack)
    }
  }

  function reConnect(webSocket, callBack, index) {
    console.log('reConnect 重连');
    ((index = connects.indexOf(webSocket)) >= 0) && connects.splice(index, 1);
    !webSocket.hadRemoved && (webSocket.hadRemoved = true) && connects.length < size && pool.reConnectFlag && createConnect(url, callBack)
  }

  pool.start = async function (_url, _size) {
    url = _url
    size = _size;
    pool.reConnectFlag = true //控制是否开启重连，主动断开不开启重连
    return new Promise((resolve, reject) => {
      var callBack = {size, resolve, reject}
      for (var i = 0; i < size; i++)
        createConnect(url, callBack)
    })
  }

  /**
   * 发送信息调用函数
   * @type {number} 需要发送的信息
   * 传入的text可以不做json处理
   */
  let index = 0;
  pool.send = function (text) {
    console.log('send text')
    if (connects.length === 0)
      throw new Error('==connect is all down!===')
    console.log(index++ % poolSize, connects[0])
    poolSize && connects[index++ % poolSize].send(typeof text === 'object' ? JSON.stringify(text) : text)
  }

  /**
   * 关闭连接，
   */
  pool.close = function () {
    // console.log('close all connects in pool')
    if (connects.length === 0)
      throw new Error('==connect is all down!===')
    pool.reConnectFlag = false
    poolSize && connects.forEach(v => v.close())
  }

  return pool
}
