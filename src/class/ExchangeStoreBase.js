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
      action: config.action,
      data: req.data.params
    }
    req.data.params = paramsObj
    //添加token
    if (!config.needToken) return
    if (!req.data.params.data.token) return
    let headers = new Headers()
    headers.set('token', req.data.params.data.token)
    req.data.headers = headers;
    delete req.data.params.data.token
    // console.log('exchangeStoreBaseAfterHandler', app, req, res, config)
  }

  exchangeStoreBaseAfterHandler(app, req, res, config) {
    // console.log("res.result.ret", res.result.ret);

    if (res.result.ret !== 0) {
      // res.result = Msg[res.result.ret]
      res.result = res.result.data ? Object.assign(Msg[res.result.ret], res.result.data) : Msg[res.result.ret];
      return
    }
    if (res.result.action !== config.actionBack) {
      res.result = Msg[1];
      return
    }
    res.result = res.result.data
    // console.log('exchangeStoreBaseAfterHandler', app, req, res, config)
  }

  startWebsocket(websocket) {
    console.log('开启11', websocket)
    this.WebSocket.general.on('connect', data => {
      this.Storage.websocketToken.set(data.token)
    })
    this.WebSocket.general.emit('connect', {Token: this.Storage.websocketToken.get(), Version: 0, Device: Browser(), IMEI: `${DetectOS()}/${Browser()}`, Os: 3 })
    this.Loop.websocketHeartBreak.clear()
    this.Loop.websocketHeartBreak.setDelayTime(1)
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
      let dataCache = data.body
      if(data.body.ret){
        delete data.body.msg
        dataCache = Object.assign(Msg[data.body.ret || 0] || {}, data.body)
      }
      opConfig[data.op] && WebsocketCallBackList[opConfig[data.op]] && WebsocketCallBackList[opConfig[data.op]](dataCache)
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
      headerConfig[key].seq = Math.floor(Math.random() * 1000000000)
      let emitData = Object.assign(headerConfig[key], {body: data})
      // console.log('emitData.console....................', JSON.stringify(emitData), connectName, key, data)
      websocket.send(this.Util.deepCopy(emitData))
      headerConfig[key].history && this.WebSocket[connectName].pushWebsocketHistoryArr(key, this.Util.deepCopy(data))
      // console.log('websocketHistory',websocketHistory)
    }
    this.WebSocket[connectName].on = (key, func) => {
      WebsocketCallBackList[key] = func
    }
    this.WebSocket[connectName].pushWebsocketHistoryArr = (key, value) => {
      headerConfig[key].seq = Math.floor(Math.random() * 1000000000)
      let emitData = Object.assign(headerConfig[key], {body: value})
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