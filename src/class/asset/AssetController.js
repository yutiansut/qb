import ExchangeControllerBase from "../ExchangeControllerBase";
import AssetStore from "./AssetStore";

export default class AssetController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new AssetStore();
    this.store.setController(this)
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
  async getTradePair(coin) {
    let result = await this.marketController.getTradePairHandle();
    console.log(result)
    this.view.setState({
      tradePair: result
    });
  }
  get userId() {
    return this.userController.userId
  }
  get token() {
    return this.userController.userToken;
  }
  get account() {
    let { email, phone } = this.userController.userInfo
    return {
      1: email,
      3: phone
    };
  }
  // 获取用户的身份认证状态
  get userVerif() {
    return this.userController.userAuthVerify.state;
    // return 1;// 0：未认证 1：已通过  2：认证失败 3：认证中
  }
  get userTwoVerify() {
    return this.userController.userVerify;
    //0: 已设置资金密码 1: 未设置资金密码; 2 谷歌验证 1 邮件 3 短信
    // return { withdrawVerify: 1 };
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
  async getCurrencyAmount(coin) {
    let result = await this.store.getCurrencyAmount(coin);
    if (result && result.errCode) {
      // 错误处理
      return;
    }
    // console.log(this.store.state.currencyAmount);
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
  // 获取矿工费
  async getMinerFee(coin, address) {
    await this.store.getMinerFee(coin, address);
    this.view.setState({
      walletExtract: this.Util.deepCopy(this.store.state.walletExtract)
    });
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
      walletExtract: this.Util.deepCopy(this.store.state.walletExtract)
    });
  }
  // 请求验证码
  async requestCode() {
    let type = this.userTwoVerify.withdrawVerify;
    let result = await this.userController.getCode(this.account[type], type === 1 ? 1 : 0, 8)
    if (result && result.errCode) {
      this.view.setState({ orderTip: true, orderTipContent: result.msg });
      // 错误处理
      return false;
    }
    this.view.setState({ tip: true, tipSuccess: true, tipContent: "发送成功" });
    return true;
  }

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
  async getVerify() {
    if (
      this.view.state.verifyNum !== "获取验证码" &&
      this.view.state.verifyNum !== 0
    )
      return;
    let flag = await this.requestCode();
    if (flag) {
      this.view.setState({ verifyNum: 60 });
      this.countDown("verifyCountDown", "verifyNum", this.view);
    }
  }
  clearVerify() { // 清除短信验证码
    this.countDownStop('verifyCountDown')
  }
  // 提现前前端验证
  beforeExtract(o) {
    let obj = {
      orderTip: true,
      orderTipContent: ''
    }
    if (this.view.state.address === '') {
      obj.orderTipContent = "您未选择提现地址，不允许提交";
      this.view.setState(obj)
      return;
    }
    if (this.view.state.password === "") {
      obj.orderTipContent = "请输入您的资金密码";
      this.view.setState(obj);
      return;
    }
    this.view.setState({ showTwoVerify: true, verifyNum: '获取验证码' });
  }

  //提交提币订单
  async extractOrder(obj) {
    let type = this.userTwoVerify.withdrawVerify;
    (type === 1 || type === 3) && (obj.account = this.account[type]);
    type === 1 && (obj.mode = 1);
    type === 3 && (obj.mode = 0);
    type === 2 && (obj.mode = 2);
    let result = await this.store.extractOrder(obj);
    if (result) {
      this.view.setState({
        orderTip: true,
        orderTipContent: result.msg
      })
      // 错误处理
      return;
    }
    this.view.setState({
      tip: true,
      tipSuccess: true,
      tipContent: "操作成功"
    }, () => { location.reload() })
  }

  // 添加提现地址
  async appendAddress(obj) {
    let result = await this.store.appendAddress(obj);
    if (result.errCode) {
      this.view.setState({
        tip: true,
        tipSuccess: false,
        tipContent: result.msg
      });
      return false;
    }
    this.view.setState({
      walletExtract: this.Util.deepCopy(result),
      tip: true,
      tipSuccess: true,
      tipContent: "添加成功"
    });
    return true;
  }

  //删除提现地址
  async deletAddress(obj) {
    let result = await this.store.deletAddress(obj);
    if (result.errCode) {
      this.view.setState({
        tip: true,
        tipSuccess: false,
        tipContent: "删除失败"
      });
      return false;
    }
    this.view.setState({ walletExtract: this.Util.deepCopy(result) });
    if (this.view.state.address === obj.address) this.view.setState({ address: '' });
  }
}
