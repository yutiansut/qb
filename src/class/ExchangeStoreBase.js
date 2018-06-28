import StoreBase from '../core/StoreBase'
import Msg from "../config/ErrCodeConfig";

export default class ExchangeStoreBase extends StoreBase {
  constructor(modelName) {
    super();
    this.preHandler.push(this.exchangeStoreBasePreHandler);
    this.afterHandler.push(this.exchangeStoreBaseAfterHandler);
    // console.log(modelName)
    modelName && this.installProxy(modelName, this.preHandler, this.afterHandler)
  }

  exchangeStoreBasePreHandler(app, req, config){
    let paramsObj = {
      action: config.action,
      data:req.data.params
    }
    req.data.params = paramsObj
    // console.log(req.data.body)
    // console.log('exchangeStoreBasePreHandler', app, req, config)
  }

  exchangeStoreBaseAfterHandler(app, req, res, config){
    if (res.result.action !== config.actionBack) {
      res.result = Msg[1]
      return
    }
    res.result = res.result.ret === 0 ? res.result.data : Msg[res.result.ret]
    console.log('exchangeStoreBaseAfterHandler', app, req, res, config)
  }

}