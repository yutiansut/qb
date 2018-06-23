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

  get configData() {
    return this.configController.initState;
  }
  // 获取交易对手续费
  async getPairFees() {}
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
  async getCurrencyList() {}
  // 获取充币信息
  async getCurrencyAmount() {
    // let data = await this.store.Proxy.topCurrency();
    // console.log(data);
    // this.store.state.wallet = data;
    // this.view.setState({ wallet: data});
  }
  // 获取充币地址
  async getCoinAddress() {
    // let data = await this.store.Proxy.topCurrency();
    // console.log(data);
    // this.store.state.wallet = data;
    // this.view.setState({ wallet: data});
  }
  // 获取充提记录
  async getHistory() {
    // let data = await this.store.Proxy.topCurrency();
    // console.log(data);
    // this.store.state.wallet = data;
    // this.view.setState({ wallet: data});
  }
  // 获取提币信息
  async getExtract() {}
  // 请求验证码
  async requestCode() {}
  // 账户余额页面筛选
  filte(wallet, value, hideLittle, hideZero) {
    let arr1 = this.filter(wallet, item => {
      return (
        item.coinName.includes(value.toUpperCase()) ||
        item.fullname.includes(value.toUpperCase())
      );
    });
    let arr2 = this.filter(arr1, item => {
      return !hideLittle || item.valuationBTC > 0.001;
    });
    let result = this.filter(arr2, item => {
      return !hideZero || item.valuationBTC > 0;
    });
    return result;
  }
  // 账户余额页面排序
  rank(arr, object) {
    let sortValue, type;
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (object[key] !== 2) {
          sortValue = [key];
          type = object[key];
          break;
        }
      }
    }
    if (!sortValue) {
      sortValue = ["valuationBTC"];
      type = 0;
    }
    return this.sort(arr, sortValue, type);
  }

  // 二次验证倒计时
  getVerify() {
    if (
      this.view.state.verifyNum !== "获取验证码" &&
      this.view.state.verifyNum !== 0
    )
      return;
    this.view.setState({ verifyNum: 5 });
    this.countDown("verifyCountDown", "verifyNum", this.view);
  }

  // 添加提现地址
  appendAddress({ addressName, address }) {
    this.store.appendAddress({ addressName, address });
    this.view.state.walletExtract.extract_addr.push({ addressName, address });
    this.view.setState({
      walletExtract: this.view.state.walletExtract
    });
  }

  //删除提现地址
  deletAddress({ addressName, address }) {
    this.store.deletAddress({ addressName, address });
    this.view.state.walletExtract.extract_addr = this.view.state.walletExtract.extract_addr.filter(
      item => item.address !== address
    );
    this.view.setState({
      walletExtract: this.view.state.walletExtract
    });
  }
}
