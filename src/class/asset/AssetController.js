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

  // 请求验证码
  async requestCode() {

  }
  // 账户余额页面筛选
  filte(wallet, value, hideLittle, hideZero) {
    let arr1 = this.filter(wallet, item => {
      return (
        item.currency.includes(value.toUpperCase()) ||
        item.codename.includes(value.toUpperCase())
      );
    });
    let arr2 = this.filter(arr1, item => {
      return !hideLittle || item.tobtc > 0.001
    })
    let result = this.filter(arr2, item => {
      return !hideZero || item.tobtc > 0
    })
    return result
  }
  // 账户余额页面排序
  rank(arr, object){
    let sortValue, type;
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if(object[key] !== 2) {
          sortValue = [key];
          type = object[key]
          break;
        }
      }
    }
    if (!sortValue) {
      sortValue = ['tobtc'];
      type = 0;
    }
    return this.sort(arr, sortValue, type);
  }

// 二次验证倒计时
  getVerify() {
    if (this.view.state.verifyNum !== '获取验证码' && this.view.state.verifyNum !== 0) return
    // console.log(this)
    // console.log(this.store.Proxy)
    // console.log(this.view)
    // console.log(this.view.state.count)
    // let data = await this.store.Proxy.topCurrency()
    this.view.setState({ verifyNum: 5 })
    this.countDown('verifyCountDown', 'verifyNum', this.view)
  }

  // 添加提现地址
  appendAddress({name, address}){
    this.store.appendAddress({ name, address });
    this.view.state.wallet_extract.extract_addr.push({ name, address });
    this.view.setState({ wallet_extract: this.view.state.wallet_extract });
  }

  //删除提现地址
  deletAddress({name,address}){
    this.store.deletAddress({ name, address });
    this.view.state.wallet_extract.extract_addr = this.view.state.wallet_extract.extract_addr.filter(item => item.address !== address);
    this.view.setState({ wallet_extract: this.view.state.wallet_extract });
  }
}
