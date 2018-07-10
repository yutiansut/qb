import ExchangeControllerBase from "../ExchangeControllerBase";
import AssetStore from "./AssetStore";

export default class AssetController extends ExchangeControllerBase {
  constructor(props) {
    super(props);
    this.store = new AssetStore();
    this.store.setController(this);
  }
  setView(view) {
    super.setView(view);
    // view.setState({count: this.store.count})
    // return this.store.state;
  }

  get configData() {
    return this.configController.initState;
  }
  get userId() {
    return this.userController.userId;
  }
  get token() {
    return this.userController.userToken;
  }
  get account() {
    let { email, phone } = this.userController.userInfo;
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

  // 获取对应市场下的交易对信息（调用market的api）
  async getTradePair() {
    let result = await this.marketController.getTradePairHandle();
    this.view.setState({
      tradePair: result
    });
  }
  // 获取总资产和额度
  async getAssets() {
    await this.store.getTotalAsset();
    this.view.setState({
      totalAsset: this.store.state.totalAsset,
      wallet: this.store.state.wallet || []
    });
  }

  // 获取单个币种资产信息
  async getCurrencyAmount(coin) {

    let result = await this.store.getCurrencyAmount(coin);
    if (result && result.errCode) {
      return;
    }
    // console.log(this.store.state.currencyAmount);
    this.view.setState({
      currencyAmount: this.store.state.currencyAmount
    });
  }

  // 获取交易对手续费
  async getPairFees() {
    if (!this.store.state.pairFees.length) {
      await this.store.getFee();
    }
    this.view.setState({ pairFees: this.store.state.pairFees });
  }
  // 获取所有币种
  async getWalletList() {
    this.store.state.walletList["BTC"] === undefined &&
      (await this.store.getWalletList());
    this.view.setState({
      walletList: this.store.state.walletList
    });
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
      address: this.store.state.coinAddress.coinAddress
    });
  }
  // 获取充提记录
  async getHistory(obj) {
    await this.store.getHistory(obj);
    this.view.setState({
      assetHistory: this.Util.deepCopy(this.store.state.assetHistory)
    });
  }
  // 获取确认中充币信息(顶部轮播)
  async getChargeMessage() {
    let result = await this.store.Proxy.history({
      userId: this.userId,
      token: this.token,
      page: 0,
      pageSize: 20,
      coinId: -1,
      coinName: -1,
      orderType: 1,
      orderStatus: -1,
      startTime: parseInt((new Date() - 604800000) / 1000),
      endTime: parseInt((new Date() - 0) / 1000)
    });
    if (result && !result.errCode) {
      return result.orderList.filter(v => v.doneCount !== v.verifyCount);
    }
    return [];
    // return [
    //   {coinName:'btc', orderTime: new Date() - 0, count: 1.235, doneCount:1, verifyCount:5 },
    //   {coinName:'eth', orderTime: new Date() - 0, count: 1.235, doneCount:1, verifyCount:5 },
    //   {coinName:'lsk', orderTime: new Date() - 0, count: 1.235, doneCount:1, verifyCount:5 },
    //   {coinName:'dog', orderTime: new Date() - 0, count: 1.235, doneCount:1, verifyCount:5 },
    //   {coinName:'bch', orderTime: new Date() - 0, count: 1.235, doneCount:1, verifyCount:5 },
    //   {coinName:'ltc', orderTime: new Date() - 0, count: 1.235, doneCount:1, verifyCount:5 },
    //   {coinName:'btc', orderTime: new Date() - 5555, count: 1.235, doneCount:1, verifyCount:5 },
    // ]
  }
  // 获取提币信息(币种可用额度,冻结额度，24小时提现额度等信息)
  async getExtract() {
    await this.store.getwalletExtract();
    this.view.setState({
      walletExtract: this.Util.deepCopy(this.store.state.walletExtract)
    });
  }
  // 请求验证码
  async requestCode() {
    let type = this.userTwoVerify.withdrawVerify;
    let result = await this.userController.getCode(
      this.account[type],
      type === 1 ? 1 : 0,
      8
    );
    if (result && result.errCode) {
      this.view.setState({ orderTip: true, orderTipContent: result.msg });
      // 错误处理
      return false;
    }
    this.view.setState({ tip: true, tipSuccess: true, tipContent: "发送成功" });
    return true;
  }

  // 二次验证倒计时
  async getVerify() {
    if (
      this.view.state.verifyNum !== this.view.intl.get("sendCode") &&
      this.view.state.verifyNum !== 0
    )
      return;
    let flag = await this.requestCode();
    if (flag) {
      this.view.setState({ verifyNum: 60 });
      this.countDown("verifyCountDown", "verifyNum", this.view);
    }
  }

  //提交提币订单
  async extractOrder(obj) {
    let type = this.userTwoVerify.withdrawVerify;
    (type === 1 || type === 3) && (obj.account = this.account[type]);
    type === 1 && (obj.mode = 1);
    type === 3 && (obj.mode = 0);
    type === 2 && (obj.mode = 2);
    let result = await this.store.extractOrder(obj);
    console.log('提交订单', result)
    if (result) {
      this.view.setState({
        orderTip: true,
        orderTipContent: result.msg
      });
      // 错误处理
      return;
    }
    if (result === null) {
      this.view.setState({
        tip: true,
        tipSuccess: true,
        tipContent: this.view.intl.get("optionSuccess"),
        showTwoVerify: false,
        extractAmount: "", //提现数量
        password: "",
      });
      this.getCurrencyAmount(this.view.state.currency);
      // this.getHistory({
      //   page: 0,
      //   pageSize: 10,
      //   coinId: -1,
      //   coinName: -1,
      //   orderType: 15000,
      //   orderStatus: -1,
      //   startTime: -1,
      //   endTime: -1
      // });
    }
  }

  // 撤销提币申请
  async cancelOreder(id) {
    let result = await this.store.cancelOrder(id);
    if (result && result.errCode) {
      this.view.setState({
        tip: true,
        tipSuccess: false,
        tipContent: result.msg
      });
      return false;
    }
    console.log('cancelOrder')
    this.view.setState({
      tip: true,
      tipSuccess: true,
      tipContent: this.view.intl.get("optionSuccess")
    });
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
      tipContent: this.view.intl.get("asset-add-success")
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
        tipContent: this.view.intl.get("asset-delet-fail")
      });
      return false;
    }
    this.view.setState({ walletExtract: this.Util.deepCopy(result) });
    if (this.view.state.address === obj.address)
      this.view.setState({ address: "" });
  }

  // 处理出币种对应的交易对数组
  getCoinPair(o, coin) {
    if (!o) return [];
    if (coin !== 'USDT') {
      return o.pairNameCoin[coin.toLowerCase()].map(v => {
        return {
          name: `${coin}/${v.toUpperCase()}`,
          id: o.pairIdCoin[coin.toLowerCase()][v]
        }
      })
    }
    if (coin === 'USDT') {
      return o.pairNameMarke[coin.toLowerCase()].map(v => {
        return {
          name: `${v.toUpperCase()}/USDT`,
          id: o.pairIdMarket[coin.toLowerCase()][v]
        }
      })
    }
  }

  // 账户余额页面筛选
  filte(wallet, value, hideLittle, hideZero) {
    let arr1 = this.filter(wallet, item => {
      return (
        item.coinName.includes(value.toLowerCase()) ||
        item.fullName.includes(value.toLowerCase())
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

  clearVerify() {
    // 清除短信验证码
    this.countDownStop("verifyCountDown");
  }

  // 提现前前端验证
  beforeExtract(o) {
    let obj = {
      orderTip: true,
      orderTipContent: ""
    };
    if (this.view.state.address === "") {
      obj.orderTipContent = this.view.intl.get("asset-input-address");
      this.view.setState(obj);
      return;
    }
    if (this.view.state.password === "") {
      obj.orderTipContent = this.view.intl.get("asset-inputFundPassword");
      this.view.setState(obj);
      return;
    }
    this.view.setState({
      showTwoVerify: true,
      verifyNum: this.view.intl.get("sendCode")
    });
  }
  // 为market提供获得币种可用余额的api
  async getCoinAvailable(coin) {
    if (!this.store.state.wallet.length) {
      await this.store.getTotalAsset();
    }
    return this.store.state.wallet.filter(v => v.coinName === coin)[0];
  }
  // 更新币币交易页委托币种可用
  updataMarketAvaile() {
    let curPair = this.view.state.pairFees.filter(
        item => item.id === this.view.state.tradePairId
      )[0],
      currencyArr = curPair.name.split("/"),
      avail1 = this.store.state.wallet.filter(
        item => item.coinName === currencyArr[0]
      )[0],
      avail2 = this.store.state.wallet.filter(
        item => item.coinName === currencyArr[1]
      )[0];
      // console.log(avail1, avail2)
    // this.marketController.sdfgadsf(avail1, avail2);
  }

  // 设置simple的tradePairId交易对id  暴露给market使用
  setSimpleAsset(o) {
    this.view.setState(o);
  }

  // websocke更新
  userAssetUpdate(obj) {
    // console.log('执行。。。。。。。。。。')
    if (this.view.name === "simple") {
      // console.log("进入。。。。。。。。。。。。。");
      this.setSimpleAsset({
        totalAsset: this.store.state.totalAsset,
        wallet: this.store.state.wallet
      });
      this.updataMarketAvaile();
    }
  }

  // // view为balance时更新
  // updateBalance(){
  //   let {totalAsset, wallet} = this.store.state;
  //   this.view.setState({
  //     totalAsset: totalAsset,
  //     wallet: wallet
  //   });
  // }

  // updateCharge() {
  //   let { availableCount, frozenCount } = this.store.state.wallet.filter(
  //     v => this.view.state.currency === v.coinName.UpperCase()
  //   )[0];
  //   this.view.state.currencyAmount.availableCount = availableCount;
  //   this.view.state.currencyAmount.frozenCount = frozenCount;
  //   this.view.state.currencyAmount.totalCount = availableCount + frozenCount;
  //   this.view.setState({
  //     currencyAmount: this.view.state.currencyAmount
  //   });
  // }
}
