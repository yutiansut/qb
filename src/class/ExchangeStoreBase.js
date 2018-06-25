import StoreBase from '../core/StoreBase'

export default class ExchangeStoreBase extends StoreBase {
  constructor(modelName) {
    super();
    this.preHandler.push(this.exchangeStoreBasePreHandler);
    this.afterHandler.push(this.exchangeStoreBaseAfterHandler);
    console.log(modelName)
    modelName && this.installProxy(modelName, this.preHandler, this.afterHandler)
  }

  exchangeStoreBasePreHandler(app, req, config){
    // await app.Sleep(3000);
    console.log('exchangeStoreBasePreHandler', app, req, config)
  }

  exchangeStoreBaseAfterHandler(app, req, res, config){
    // await app.Sleep(3000);
    console.log('exchangeStoreBaseAfterHandler', app, req, res, config)
  }

}