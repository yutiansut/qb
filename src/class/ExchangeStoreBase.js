import StoreBase from '../core/StoreBase'
import Msg from "../config/ErrCodeConfig";

const WebsocketCallBackList = {}
let opConfig = {}

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

  exchangeStoreBasePreHandler(app, req, config){
    let paramsObj = {
      action: config.action,
      data:req.data.params
    }
    req.data.params = paramsObj
    //添加token
    if(!config.needToken) return
    if(!req.data.params.data.token) return
    let headers = new Headers()
    headers.set('token', req.data.params.data.token)
    req.data.headers = headers;
    delete req.data.params.data.token
    // console.log('exchangeStoreBaseAfterHandler', app, req, res, config)
  }

  exchangeStoreBaseAfterHandler(app, req, res, config){
    console.log("res.result.ret", res.result.ret);

    if (res.result.ret !== 0){
      res.result =  Msg[res.result.ret]
      return
    }
    if (res.result.action !== config.actionBack) {
      res.result = Msg[1];
      return;
    }
    res.result = res.result.data
    // console.log('exchangeStoreBaseAfterHandler', app, req, res, config)
  }

  installWebsocket(connectName, modelName) {
    let websocket = super.installWebsocket(connectName)
    if(!websocket)
      return
    let headerConfig = websocket.config.optionList[modelName]
    headerConfig && Object.keys(headerConfig).forEach(v=>{
      opConfig[headerConfig[v].op] = v
    })
    // console.log('connectName, modelName', connectName, modelName, websocket)
    websocket.onMessage = data => {
      let header = websocket.config.optionList[modelName]
      console.log('installWebsocket(connectName, modelName)', data, data.op, opConfig, WebsocketCallBackList[opConfig[data.op]])
      WebsocketCallBackList[opConfig[data.op]](data.data)
    }
    this.WebSocket[connectName] = {}
    this.WebSocket[connectName].emit = (key, data) => {
      // console.log('this.WebSocket[connectName]', websocket[connectName], connectName)

      headerConfig.seq = Math.floor(Math.random() * 1000000000)
      let emitData = Object.assign(headerConfig[key], {data})
      // console.log(emitData, websocket)
      websocket.send(emitData)
    }
    this.WebSocket[connectName].on = (key, func) => {
      let header = websocket.config.optionList[modelName][key]
      WebsocketCallBackList[key] = func
      // console.log(WebsocketCallBackList)
    }

  }
}