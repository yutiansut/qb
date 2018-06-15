import ExchangeControllerBase from "../ExchangeControllerBase";
import AssetStore from "./AssetStore";

export default class AssetController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new AssetStore({
      totalAsset: {
        usd: 0,
        cny: 0,
        btc: 91516.153351323,
        limit: 2,
        usedlimit: 0
      },
      wallet: [
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        },
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        },
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        },
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        },
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        },
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        },
        {
          currency: "BTC",
          avail: 0.21136,
          lock: 0.21136,
          tobtc: 0.21136,
          fullname: "Bitcoin"
        }
      ]
    });
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
  // 获币种资产
  async getWallet() {
    // let data = await this.store.Proxy.topCurrency();
    // console.log(data);
    // this.store.state.wallet = data;
    // this.view.setState({ wallet: data});
  }
}
