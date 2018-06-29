import StoreBase from '../core/StoreBase'
import Msg from "../config/ErrCodeConfig";

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
    if (res.result.action !== config.actionBack) {
      res.result = Msg[1]
      return
    }
    res.result = res.result.ret === 0 ? res.result.data : Msg[res.result.ret]
    // console.log('exchangeStoreBaseAfterHandler', app, req, res, config)
  }

  installWebsocket(connectName, modelName) {
    let websocket = super.installWebsocket(connectName)
    console.log('connectName, modelName', connectName, modelName, websocket)
    this.WebSocket[connectName] = {}
    this.WebSocket[connectName].emit = (key, data) => {
      console.log('this.WebSocket[connectName]', websocket[connectName], connectName)
      let header = websocket.config.optionList[modelName][key]
      let emitData = Object.assign(header, {data})
      console.log(emitData, websocket)
      websocket.send(emitData)
    }
    this.WebSocket[connectName].on = (key, func) => {
      let header = websocket.config.optionList[modelName][key]
      websocket.onMessage = data => {
        console.log('installWebsocket(connectName, modelName)', data)
        func(data)
      }
    }
  }
}