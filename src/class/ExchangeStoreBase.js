import StoreBase from '../core/StoreBase'
import Msg from "../config/ErrCodeConfig";
import DetectOS from './lib/Os'
import Browser from './lib/Browser'

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
    console.log(req.data.params)
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

  startWebsocket(websocket) {
    // console.log('开启11', websocket)
    this.WebSocket.general.on('connect', data => {
      this.Storage.websocketToken.set(data.token)
    })
    this.WebSocket.general.emit('connect', {Token: this.Storage.websocketToken.get(), Version: 0, Device: Browser(), IMEI: `${DetectOS()}/${Browser()}`, Os: 3 })
    this.Loop.websocketHeartBreak.clear()
    this.Loop.websocketHeartBreak.setDelayTime(10)
    this.Loop.websocketHeartBreak.set(async () => {
      this.WebSocket.general.emit('heartBreak')
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
    websocket.onMessage = data => {
      let dataCache = data.b
      if(data.b.r){
        delete data.b.m
        dataCache = Object.assign(Msg[data.body.r || 0] || {}, data.b)
      }
      // console.log('websocket.onMessage', data, dataCache)
      opConfig[data.o] && WebsocketCallBackList[opConfig[data.o]] && WebsocketCallBackList[opConfig[data.o]](dataCache)
    }

    websocket.onClose(data => {
      // console.log('websocket.onClose ', data, JSON.stringify(websocketHistory))
      this.Loop.websocketHeartBreak.stop()
      this.Loop.websocketHeartBreak.clear()
      websocket.onOpen(data => {
        // console.log('websocket.onOpen', data, JSON.stringify(websocketHistory))
        this.startWebsocket(websocket)
        Object.keys(websocketHistory).forEach(v => websocketHistory[v].forEach(vv => websocket.send(vv)))

      })
    })

    websocket.onError(data => {
      // console.log('websocket.onError ', data, JSON.stringify(websocketHistory))
      this.Loop.websocketHeartBreak.stop()
      this.Loop.websocketHeartBreak.clear()
      websocket.onOpen(data => {
        // console.log('websocket.onOpen', data, JSON.stringify(websocketHistory))
        this.startWebsocket(websocket)
        websocketHistory.forEach(v => websocket.send(v))
      })
    })

    this.WebSocket[connectName] = {}

    this.WebSocket[connectName].emit = (key, data) => {
      headerConfig[key].s = Math.floor(Math.random() * 1000000000)
      let emitData = Object.assign({v:headerConfig[key].v, s:headerConfig[key].s , o:headerConfig[key].o}, {b: data})
      // console.log('emitData.console....................', JSON.stringify(emitData), connectName, key, data)

      websocket.send(this.Util.deepCopy(emitData))
      headerConfig[key].history && this.WebSocket[connectName].pushWebsocketHistoryArr(key, this.Util.deepCopy(data))
      // console.log('websocketHistory',websocketHistory)
    }
    this.WebSocket[connectName].on = (key, func) => {
      WebsocketCallBackList[key] = func
    }
    this.WebSocket[connectName].pushWebsocketHistoryArr = (key, value) => {
      headerConfig[key].s = Math.floor(Math.random() * 1000000000)
      let emitData = Object.assign(headerConfig[key], {b: value})
      websocketHistory[key] = websocketHistory[key] || []
      websocketHistory[key].push(this.Util.deepCopy(emitData))
    }

    this.WebSocket[connectName].clearWebsocketHistoryArr = (key) => {
      websocketHistory[key] = []
    }

    if (!srartFlag) {
      this.startWebsocket(websocket)
      srartFlag = true
    }
  }
}