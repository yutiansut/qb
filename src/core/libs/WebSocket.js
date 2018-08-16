/**
 * 生成websocket
 * 支持多个链接
 * 引入文件执行方法，返回pool实例
 * 调用pool.start方法注册websocket链接（返回promise）
 * _url, 路径
 * _size websocket数量
 * @returns {{}}
 */
import Sleep from './Sleep'
import Logger from "../libs/Logger";

export default function () {
  let pool = {}, //连接池对象
    poolSize = 0, //连接池大小
    connects = [], //连接数组
    size, //传入的大小
    url, //地址
    reConnectTime = 0; //重连次数

  /**
   * 建立websocket连接方法
   * @param url
   * @param callBack
   */
  function createConnect(url, callBack) {
    let webSocket = new WebSocket(url); // 创建链接
    // webSocket.binaryType = "arraybuffer"
    //webSocket连接之后的操作
    webSocket.onopen = event => onOpen(pool, event);

    function onOpen(pool, event) {
      connects.push(webSocket);
      poolSize = connects.length;
      pool.onOpen && pool.onOpen(event)
      callBack && connects.length === size && callBack.resolve(true)
    }

    //webSocket接收信息的操作
    webSocket.onmessage = event => onMessage(pool, event);

    function onMessage(pool, event) {
      pool.onMessage && pool.onMessage(event.data)
    }

    //webSocket断开之后的操作
    webSocket.onclose = onClose;

    async function onClose(event) {
      pool.onClose && pool.onClose(event);
      if(reConnectTime > 4) {
        await Sleep(7000);
        reConnectTime = 0
      }
      if(reConnectTime === 0){
        await Sleep(3000)
      }
      reConnect(webSocket, callBack)
    }

    //webSocket出错之后的操作
    webSocket.onerror = onError;

    async function onError(event) {
      pool.onError && pool.onError(event);
      if(reConnectTime > 4){
        await Sleep(7000);
        reConnectTime = 0
      }
      if(reConnectTime === 0){
        await Sleep(3000)
      }
      reConnect(webSocket, callBack)
    }
  }

  function reConnect(webSocket, callBack, index) {
    reConnectTime ++ ;
    ((index = connects.indexOf(webSocket)) >= 0) && connects.splice(index, 1);
    !webSocket.hadRemoved && (webSocket.hadRemoved = true) && connects.length < size && pool.reConnectFlag && createConnect(url, callBack)
  }

  pool.start = async function (_url, _size) {
    url = _url;
    size = _size;
    pool.reConnectFlag = true; //控制是否开启重连，主动断开不开启重连
    return new Promise((resolve, reject) => {
        const callBack = {size, resolve, reject};
        for (let i = 0; i < size; i++)
        createConnect(url, callBack)
    })
  };

  /**
   * 发送信息调用函数
   * @type {number} 需要发送的信息
   * 传入的text可以不做json处理
   */
  let index = 0;
  pool.send = function (text) {
    if (connects.length === 0)
      Logger.error('==connect is all down!===');
    poolSize && connects[index++ % poolSize] && connects[index++ % poolSize].send(text)
  };

  /**
   * 关闭连接，
   */
  pool.close = function () {
    // Logger('close all connects in pool')
    if (connects.length === 0)
      Logger.error('==connect is all down!===');
    pool.reConnectFlag = false;
    poolSize && connects && connects.forEach(v => v.close())
  };

  return pool
}
