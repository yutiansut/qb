import ExchangeControllerBase from "../ExchangeControllerBase";
import AssetStore from "./AssetStore";

export default class AssetController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new AssetStore();
  }
  setView(view) {
    super.setView(view);
    // view.setState({count: this.store.count})
    // return this.store.state;
  }

  // 获取总资产
  async getAssets() {
    //
    // let data = await this.store.Proxy.topCurrency();
    // console.log(data);
    // // this.orderController && this.orederController.setPair()
    // //
    // this.store.state.totalAsset = data;
    // this.view.setState({ totalAsset: data});
    // // userReques
    //t
  }
  // 获取币种资产
  async getWallet() {
    // let data = await this.store.Proxy.topCurrency();
    // console.log(data);
    // this.store.state.wallet = data;
    // this.view.setState({ wallet: data});
  }

  // 获取充币信息
  async getCharge() {
    // let data = await this.store.Proxy.topCurrency();
    // console.log(data);
    // this.store.state.wallet = data;
    // this.view.setState({ wallet: data});
  }
  // 获取币种列表
  async getCurrencyList() {
    // let data = await this.store.Proxy.topCurrency();
    // console.log(data);
    // this.store.state.wallet = data;
    // this.view.setState({ wallet: data});
  }
  // 获取充币记录
  async getChargeHistory() {
    // let data = await this.store.Proxy.topCurrency();
    // console.log(data);
    // this.store.state.wallet = data;
    // this.view.setState({ wallet: data});
  }
  // 获取提币信息
  async getExtract() {

  }
  // 获取提币记录
  async getExtractHistory() {

  }
}
