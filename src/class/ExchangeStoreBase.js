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
    // console.log(modelName)
    modelName && this.installProxy(modelName, this.preHandler, this.afterHandler)
    this.WebSocket = {}
    // console.log(modelName , connectName)
    modelName && connectName && this.installWebsocket(connectName, modelName)
  }

  exchangeStoreBasePreHandler(app, req, config) {
    let paramsObj = {
      a: config.action,
      d: req.data.params
    }
    req.data.params = paramsObj
    //添加token
    if (!config.needToken) return
    // console.log(req.data.params)
    if (!req.data.params.d.token) return
    let headers = new Headers()
    headers.set('token', req.data.params.d.token)
    req.data.headers = headers;
    delete req.data.params.d.token
    // console.log('exchangeStoreBaseAfterHandler', app, req, res, config)
  }

  exchangeStoreBaseAfterHandler(app, req, res, config) {
    // console.log("res.result.ret", res.result.ret);

    if (res.result.r !== 0) {
      // res.result = Msg[res.result.ret]
      res.result = res.result.d ? Object.assign(Msg[res.result.r], res.result.d) : Msg[res.result.r];
      return
    }
    if (res.result.a !== config.actionBack) {
      res.result = Msg[1];
      return
    }
    res.result = res.result.d
    // console.log('exchangeStoreBaseAfterHandler', app, req, res, config)
  }

  startWebsocket(connectName) {
    // console.log('开启11', websocket)
    this.WebSocket[connectName].on('connect', data => {
      this.Storage.websocketToken.set(data.token)
    })
    this.WebSocket[connectName].emit('connect', {t: this.Storage.websocketToken.get(), v: 0, de: Browser(), im: `${DetectOS()}/${Browser()}`, os: 3 })
    this.Loop.websocketHeartBreak.clear()
    this.Loop.websocketHeartBreak.setDelayTime(10)
    this.Loop.websocketHeartBreak.set(async () => {
      // for(let i = 0; i< 10; i++) {
        this.WebSocket[connectName].emit('heartBreak')
      // }
      await this.Sleep(5000)
    })
    this.Loop.websocketHeartBreak.start()
    // websocket.needStart = false
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
      // console.log('websocket.onMessage', data)
      let ver, op, seq, zip, body
      try{
        data = await ZipUtil.BlobParse(data)
      } catch (e) {
        console.error('解析Blob',e)
      }
      // console.log('ZipUtil.BlobParse',data)
      try{
        data = Buffer.from(data)
        // console.log('Buffer.from',data, data.length)
        ver = data.readInt16BE(0)
        op = data.readInt16BE(2)
        seq = data.readInt32BE(4)
        zip = data.readInt8(8)
        body = data.length > 9 && data.slice(9)
      } catch (e) {
        console.error('操作buffer', e)
      }

      // console.log('params', ver, op, seq, zip, body)
      if(zip){
        try{
          body = await ZipUtil.unZip(body)
        } catch (e) {
          console.error('解压缩', e)
        }

      }
      try{
        // console.log('JSON.parse', body, body.toString())
        body = JSON.parse(body.toString())
      } catch (e) {
        console.error('解析json', e)
      }
      body && console.log('reciveWebsocket', body)
      let dataCache = body
      if(body && body.r){
        delete body.m
        dataCache = Object.assign(Msg[body && body.r || 0] || {}, body)
      }
      opConfig[op] && WebsocketCallBackList[opConfig[op]] && WebsocketCallBackList[opConfig[op]](dataCache)
    }

    websocket.onClose(data => {
      // console.log('websocket.onClose ', data, JSON.stringify(websocketHistory))
      this.Loop.websocketHeartBreak.stop()
      this.Loop.websocketHeartBreak.clear()
      websocket.onOpen(data => {
        // console.log('websocket.onOpen', data, JSON.stringify(websocketHistory))
        this.startWebsocket(connectName)
        Object.keys(websocketHistory).forEach(v => websocketHistory[v].forEach(vv => this.WebSocket[connectName].emit(v, vv)))

      })
    })

    websocket.onError(data => {
      // console.log('websocket.onError ', data, JSON.stringify(websocketHistory))
      this.Loop.websocketHeartBreak.stop()
      this.Loop.websocketHeartBreak.clear()
      websocket.onOpen(data => {
        console.log('websocket.onOpen', data, JSON.stringify(websocketHistory))
        this.startWebsocket(connectName)
        Object.keys(websocketHistory).forEach(v => websocketHistory[v].forEach(vv => this.WebSocket[connectName].emit(v, vv)))
      })
    })

    this.WebSocket[connectName] = {}

    this.WebSocket[connectName].emit = async (key, data) => {
      data && console.log('sendWebsocket', data)
      let emitData = await this.formatWebSocketEmitData(headerConfig, key, data)
      // console.log(emitData)
      // console.log('emitData.console....................', JSON.stringify(emitData), connectName, key, data)


        websocket.send(emitData)


      headerConfig[key].history && this.WebSocket[connectName].pushWebsocketHistoryArr(key, this.Util.deepCopy(data))
      // console.log('websocketHistory',websocketHistory)
    }
    this.WebSocket[connectName].on = (key, func) => {
      WebsocketCallBackList[key] = func
    }
    this.WebSocket[connectName].pushWebsocketHistoryArr = async (key, value) => {
      // let emitData = await this.formatWebSocketEmitData(headerConfig, key, value)
      websocketHistory[key] = websocketHistory[key] || []
      websocketHistory[key].push(value)
        // console.log('pushWebsocketHistoryArr', websocketHistory)
    }

    this.WebSocket[connectName].clearWebsocketHistoryArr = (key) => {
      websocketHistory[key] = []
    }

    if (!srartFlag) {
      this.startWebsocket(connectName)
      srartFlag = true
    }
  }

  async formatWebSocketEmitData(headerConfig, key, data){
    // console.log('this.WebSocket[connectName]', data)
    let dataBuffer, flag = 0, buffer
    try{
      dataBuffer = data && Buffer.from(JSON.stringify(data)) || null
      buffer = Buffer.allocUnsafe(9)
    } catch (e) {
      // console.error('操作buffer', e)
    }

    // console.log('dataBuffer', dataBuffer)
    if(dataBuffer && dataBuffer.length > 5000){
      flag = 1
      dataBuffer = await ZipUtil.zip(dataBuffer)
      // console.log('dataBuffer.toString', dataBuffer, dataBuffer.toString('base64'))
    }
    try{
      buffer.writeInt16BE(headerConfig[key].v, 0)
      buffer.writeInt16BE(headerConfig[key].o, 2)
      buffer.writeInt32BE(Math.floor(Math.random() * 1000000000), 4)
      buffer.writeInt8(flag, 8)
    } catch (e) {
      // console.error('操作buffer', e)
    }
    try {
      if (dataBuffer && dataBuffer.length) {
        buffer = Buffer.concat([buffer, dataBuffer], 9 + dataBuffer.length)
      }
    } catch (e) {
      // console.error('操作buffer', e)
    }
    return buffer

    // return Object.assign({v:headerConfig[key].v, s:headerConfig[key].s , o:headerConfig[key].o, z: flag}, {b: flag && dataJson || data})
  }
}