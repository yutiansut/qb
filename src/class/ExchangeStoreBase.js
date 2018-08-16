import Msg from "../config/ErrCodeConfig";
import DetectOS from './lib/Os'
import Browser from './lib/Browser'
import {ZipUtil, StoreBase} from '../core'

const WebsocketCallBackList = {}, websocketHistory = {}
let srartFlag = false



export default class ExchangeStoreBase extends StoreBase {
  constructor(modelName, connectName) {
    super();
    this.preHandler.push(this.exchangeStoreBasePreHandler);
    this.afterHandler.push(this.exchangeStoreBaseAfterHandler);
    modelName && this.installProxy(modelName, this.preHandler, this.afterHandler)
    this.WebSocket = {}
    modelName && connectName && this.installWebsocket(connectName, modelName)
  }

  exchangeStoreBasePreHandler(app, req, config) {
    let paramsObj = {a: config.action};
    if(req.data.params){
      paramsObj['d'] = req.data.params
    };
    req.data.params = paramsObj
    app.Logger.dev('sendHttp', req.url.path, req.data.params)
    //添加token
    if (!config.needToken) return
    if (!req.data.params.d.token) return
    let headers = new Headers()
    headers.set('token', req.data.params.d.token)
    req.data.headers = headers;
    delete req.data.params.d.token
  }

  exchangeStoreBaseAfterHandler(app, req, res, config) {
    app.Logger.dev('receiveHttp', req.url, res.result)
    if (res.result.r !== 0) {
      res.result = res.result.d ? Object.assign(Msg[res.result.r], res.result.d) : Msg[res.result.r];
      return
    }
    if (res.result.a !== config.actionBack) {
      res.result = Msg[1];
      return
    }
    res.result = res.result.d
  }

  startWebsocket(connectName) {
    this.WebSocket[connectName].on('connect', data => {
      this.Storage.websocketToken.set(data.token)
    })
    this.WebSocket[connectName].emit('connect', {t: this.Storage.websocketToken.get(), v: 0, de: Browser(), im: `${DetectOS()}/${Browser()}`, os: 3 })
    this.Loop.websocketHeartBreak.clear()
    this.Loop.websocketHeartBreak.setDelayTime(10)
    this.Loop.websocketHeartBreak.set(async () => {
        this.WebSocket[connectName].emit('heartBreak')
      await this.Sleep(5000)
    })
    this.Loop.websocketHeartBreak.start()
  }

  installWebsocket(connectName, modelName) {
    let websocket = super.installWebsocket(connectName)
    if (!websocket)
      return
    let headerConfig = Object.assign(websocket.config.optionList['global'], websocket.config.optionList[modelName])
    let opConfig = {}
    headerConfig && Object.keys(headerConfig).forEach(v => {
      opConfig[headerConfig[v].resOp] = v
    })
    websocket.onMessage = async data => {
      let ver, op, seq, zip, body
      try{
        data = await ZipUtil.BlobParse(data)
      } catch (e) {
        this.Logger.error('解析Blob',e)
      }
      try{
        data = Buffer.from(data)
        ver = data.readInt16BE(0)
        op = data.readInt16BE(2)
        seq = data.readInt32BE(4)
        zip = data.readInt8(8)
        body = data.length > 9 && data.slice(9)
      } catch (e) {
        this.Logger.error('操作buffer', e)
      }

      if(zip){
        try{
          body = await ZipUtil.unZip(body)
        } catch (e) {
          this.Logger.error('解压缩', e)
        }

      }
      try{
        body = JSON.parse(body.toString())
      } catch (e) {
        this.Logger.error('解析json', e)
      }
      body && this.Logger.dev('reciveWebsocket', body)
      let dataCache = body
      if(body && body.r){
        delete body.m
        dataCache = Object.assign(Msg[body && body.r || 0] || {}, body)
      }
      opConfig[op] && WebsocketCallBackList[opConfig[op]] && WebsocketCallBackList[opConfig[op]](dataCache)
    }

    websocket.onClose(data => {
      this.Loop.websocketHeartBreak.stop()
      this.Loop.websocketHeartBreak.clear()
      websocket.onOpen(data => {
        this.Logger.dev('onClose', 'websocketHistory', websocketHistory)
        this.startWebsocket(connectName)
        Object.keys(websocketHistory).forEach(v => websocketHistory[v].forEach(vv => this.WebSocket[connectName].emit(v, vv)))
      })
    })

    websocket.onError(data => {
      this.Loop.websocketHeartBreak.stop()
      this.Loop.websocketHeartBreak.clear()
      websocket.onOpen(data => {
        this.Logger.dev('onClose', 'websocketHistory', websocketHistory)
        this.startWebsocket(connectName)
        Object.keys(websocketHistory).forEach(v => websocketHistory[v].forEach(vv => this.WebSocket[connectName].emit(v, vv)))
      })
    })

    this.WebSocket[connectName] = {}

    this.WebSocket[connectName].emit = async (key, data) => {
      data && this.Logger.dev('sendWebsocket', data)
      headerConfig[key].history && this.WebSocket[connectName].pushWebsocketHistoryArr(key, this.Util.deepCopy(data), headerConfig[key].historyFunc)
      let emitData = await this.formatWebSocketEmitData(headerConfig, key, data)
      websocket.send(emitData)
    };
    this.WebSocket[connectName].on = (key, func) => {
      WebsocketCallBackList[key] = func
    };
    this.WebSocket[connectName].pushWebsocketHistoryArr = async (key, value, func) => {
      websocketHistory[key] = websocketHistory[key] || []
      if(func){
        websocketHistory[key] = func(websocketHistory[key], value)
        return
      }
      websocketHistory[key].push(value)
    };

    this.WebSocket[connectName].clearWebsocketHistoryArr = (key) => {
      websocketHistory[key] = []
    }

    if (!srartFlag) {
      this.startWebsocket(connectName)
      srartFlag = true
    }
  }

  async formatWebSocketEmitData(headerConfig, key, data){
    let dataBuffer, flag = 0, buffer
    try{
      dataBuffer = data && Buffer.from(JSON.stringify(data)) || null
      buffer = Buffer.allocUnsafe(9)
    } catch (e) {
      this.Logger.error('操作buffer', e)
    }

    if(dataBuffer && dataBuffer.length > 5000){
      flag = 1
      dataBuffer = await ZipUtil.zip(dataBuffer)
    }
    try{
      buffer.writeInt16BE(headerConfig[key].v, 0)
      buffer.writeInt16BE(headerConfig[key].o, 2)
      buffer.writeInt32BE(Math.floor(Math.random() * 1000000000), 4)
      buffer.writeInt8(flag, 8)
    } catch (e) {
      this.Logger.error('操作buffer', e)
    }
    try {
      if (dataBuffer && dataBuffer.length) {
        buffer = Buffer.concat([buffer, dataBuffer], 9 + dataBuffer.length)
      }
    } catch (e) {
      this.Logger.error('操作buffer', e)
    }
    return buffer
  }
}