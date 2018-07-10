import StoreBase from '../core/StoreBase'
import Msg from "../config/ErrCodeConfig";

const WebsocketCallBackList = {}, websocketHistory = []
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
      res.result = Msg[res.result.ret]
      return
    }
    if (res.result.action !== config.actionBack) {
      res.result = Msg[1];
      return;
    }
    res.result = res.result.data
    // console.log('exchangeStoreBaseAfterHandler', app, req, res, config)
  }

  // if(pool.RECEIVE_QUENE[0].op === 1){
  //   pool.hasStart = true
  //   pool.RECEIVE_QUENE.shift()
  //   return
  // }
  // if(pool.RECEIVE_QUENE[0].op === 3){
  //   // console.log('无用包')
  //   pool.RECEIVE_QUENE.shift()
  //   return
  // }

  startWebsocket(websocket) {
    // websocket.send()
    // console.log('开启11', websocket)
    websocket.send(websocket.config.optionList.global.conect)
    this.Loop.websocketHeartBreak.clear()
    this.Loop.websocketHeartBreak.setDelayTime(1)
    this.Loop.websocketHeartBreak.set(async () => {
      // console.log(websocket, '发心跳')
      websocket.send(websocket.config.optionList.global.heartBreak)
      await this.Sleep(5000)
    })
    this.Loop.websocketHeartBreak.start()
    // websocket.needStart = false
  }

  installWebsocket(connectName, modelName) {
    let websocket = super.installWebsocket(connectName)
    if (!websocket)
      return
    if (!srartFlag) {
      // console.log('aaaaaaa')
      this.startWebsocket(websocket)
      srartFlag = true
    }
    let headerConfig = Object.assign(websocket.config.optionList['global'], websocket.config.optionList[modelName])
    let opConfig = {}
    headerConfig && Object.keys(headerConfig).forEach(v => {
      opConfig[headerConfig[v].resOp] = v
    })
    // console.log('connectName, modelName', connectName, modelName, websocket)
    websocket.onMessage = data => {
      // data.op === 1 && (websocket.needStart = false)
      // let header = websocket.config.optionList[modelName]
      // console.log('installWebsocket(connectName, modelName)', data, data.op, opConfig, this.WebSocket[connectName], this.WebSocket[connectName][opConfig[data.op]])
      let dataCache = Msg[data.body.ret || 0] || data.body
      // if(dataCache.ret !== 0) {
      //   dataCache =
      //   // console.log('web报错1', Msg[data.body.rett], data.body)
      //   // return
      // }
      opConfig[data.op] && WebsocketCallBackList[opConfig[data.op]] && WebsocketCallBackList[opConfig[data.op]](dataCache)
      // opConfig[data.op] && this.WebSocket[connectName][opConfig[data.op]] && this.WebSocket[connectName][opConfig[data.op]].on(dataCache)
    }

    websocket.onClose(data => {
      console.log('websocket.onClose ', data)
      this.Loop.websocketHeartBreak.stop()
      this.Loop.websocketHeartBreak.clear()
      // websocket.needStart = true;
      websocket.onOpen(data => {
        // console.log('websocket.onOpen', data)
        this.startWebsocket(websocket)
        websocketHistory.forEach(v=>websocket.send(v))

      })
    })

    websocket.onError(data => {
      console.log('websocket.onError ', data)
      this.Loop.websocketHeartBreak.stop()
      this.Loop.websocketHeartBreak.clear()
      // websocket.needStart = true;
      websocket.onOpen(data => {
        // console.log('websocket.onOpen', data)
        this.startWebsocket(websocket)
        websocketHistory.forEach(v=>websocket.send(v))
      })
    })

    this.WebSocket[connectName] = {}

    this.WebSocket[connectName].emit = (key, data) => {
      // console.log('webSocketThis', this)
      // console.log('this.WebSocket[connectName]', websocket)
      headerConfig[key].seq = Math.floor(Math.random() * 1000000000)
      let emitData = Object.assign(headerConfig[key], {body: data})
      console.log(emitData, websocket)
      websocket.send(emitData)
      !headerConfig[key].historyPass && websocketHistory.push(emitData)
      // console.log('websocketHistory',websocketHistory)
    }
    this.WebSocket[connectName].on = (key, func) => {
      WebsocketCallBackList[key] = func
      // console.log(WebsocketCallBackList)
    }
    this.WebSocket[connectName].pushWebsocketHistoryArr = (key, value) => {
      console.log('pushWebsocketHistoryArr', key, value, websocketHistory)
      headerConfig[key].seq = Math.floor(Math.random() * 1000000000)
      let emitData = Object.assign(headerConfig[key], {body: value})
      websocketHistory.push(emitData)
    }
  }
}