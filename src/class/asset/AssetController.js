import ExchangeControllerBase from "../ExchangeControllerBase";
import AssetStore from "./AssetStore";

export default class AssetController extends ExchangeControllerBase {
  constructor() {
    super();
    this.store = new AssetStore();
  }

  setView(view) {
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data;
  }

  // 获取总资产
  async getAssets() {
    // 
    let data = await this.store.Proxy.topCurrency();
    console.log(data);
    // this.orderController && this.orederController.setPair()
    //
    this.view.setState({ count: data.data[0].changePercent });
    // userReques
    //t
  }
  
}
