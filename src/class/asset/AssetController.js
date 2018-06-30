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
  // 获取对应市场下的交易对信息（调用market的api）
  async getTradePair(coin){
    // await this.marketController.tradePair(coin);
    this.view.setState({
      tradePair: [{ name: "BTC/USDT", id: 1 }]
    });
  }
  // 获取总资产和额度
  async getAssets() {
    await this.store.getTotalAsset();
    this.view.setState({
      totalAsset: this.store.state.totalAsset,
      wallet: this.store.state.wallet || []
    })
  }

  // 获取单个币种资产信息
  async getCurrencyAmount() {
    await this.store.getCurrencyAmount();
    this.view.setState({
      currencyAmount: this.store.state.currencyAmount,
    });
  }

  // 获取交易对手续费
  async getPairFees() {
    !this.store.state.pairFees.length && await this.store.getFee();
    this.view.setState({ pairFees: this.store.state.pairFees });
  }
  // 获取所有币种
  async getWalletList() {
    console.log(this.store.state.walletList["BTC"]);
    this.store.state.walletList['BTC'] === undefined && await this.store.getWalletList();
    this.view.setState({
      walletList: this.store.state.walletList
    })
  }
  // 获取币种资产
  async getWallet() {
    // let data = await this.store.Proxy.topCurrency();
    // console.log(data);
    // this.store.state.wallet = data;
    // this.view.setState({ wallet: data});
  }

  // 获取充币地址(over)
  async getCoinAddress(coin) {
    await this.store.getChargeAddress(coin);
    this.view.setState({
      coinAddress: this.Util.deepCopy(this.store.state.coinAddress),
    });
  }
  // 获取充提记录
  async getHistory(obj) {
    await this.store.getHistory(obj);
    this.view.setState({
      assetHistory: this.store.state.assetHistory
    })
  }
  // 获取提币信息(币种可用额度,冻结额度，24小时提现额度等信息)
  async getExtract() {
    await this.store.getwalletExtract()
    this.view.setState({
      walletExtract: this.store.state.walletExtract
    });
  }
  // 请求验证码
  async requestCode() { }
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
    this.view.state.walletExtract.extractAddr.push({ addressName, address });
    this.view.setState({
      walletExtract: this.view.state.walletExtract
    });
  }

  //删除提现地址
  deletAddress({ addressName, address }) {
    this.store.deletAddress({ addressName, address });
    this.view.state.walletExtract.extractAddr = this.view.state.walletExtract.extractAddr.filter(
      item => item.address !== address
    );
    this.view.setState({
      walletExtract: this.view.state.walletExtract
    });
  }
}
