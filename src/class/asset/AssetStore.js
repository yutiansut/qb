import ExchangeStoreBase from "../ExchangeStoreBase";

export default class AssetStore extends ExchangeStoreBase {
  constructor() {
    super("asset", "general");
    this.state = {
      // 交易对手续费
      pairFees: [
        // {
        //   id: 0,
        //   name: "ETH/BTC",
        //   maker: 0.12,
        //   taker: 0.11
        // },
      ],
      // 总资产
      totalAsset: {
        valuationBTC: 0, //总资产
        valuationEN: 0, //换算美元
        valuationCN: 0, //换算人民币
        totalQuota: 0, //24小时提现额度
        availableQuota: 0 //可用额度
      },
      wallet: [],
      //币种列表
      walletList: {},
      // 获取单个币种资产及提现额度
      currencyAmount: {
        coinName: "BTC",
        availableCount: 0, //可用额度
        totalCount: 0, //总额度
        frozenCount: 0, //冻结额度
        totalQuota: 0, //24H提现额度
        availableQuota: 0 //可用提现额度
      },
      //提币信息
      walletExtract: {
        minerFee: 0, //矿工费
        extractAddr: [] //提现地址
      },
      //充币地址
      coinAddress: {
        // coinId: 0, //币种ID
        // verifyNumer: 5, //最大确认数
        // coinAddress: "asdfdeagds0gfhgdfjhgfjkgfhkjgsgdsfg" //地址
      },
      //充币记录
      // chargeHistory: {},
      //提币记录
      // extractHistory: {},
      //资产记录
      assetHistory: {
        total: 0,
        orderList: []
      }
    };
    // websocket监听用户资产更新推送
    this.WebSocket.general.on("userAssetUpdate", data => {
      console.log("asset-websocket", data);
      let { valuationBTC, valuationEN, valuationCN, coinList } = data;
      this.state.totalAsset.valuationBTC = valuationBTC; //总资产
      this.state.totalAsset.valuationEN = valuationEN; //换算美元
      this.state.totalAsset.valuationCN = valuationCN; //换算人民币
      this.state.wallet = coinList;
      this.controller.userAssetUpdate(data);
      // this.recommendData = data.data
    });
  }
  setController(ctrl) {
    this.controller = ctrl;
  }
  // 获取交易对手续费
  async getFee() {
    let result = await this.Proxy.getFee({
      token: this.controller.token
    });
    // console.log('getFee')
    // console.log(result)
    this.state.pairFees = result;
    return result;
  }

  // 获取总资产
  async getTotalAsset() {
    let {
      valuationBTC,
      valuationEN,
      valuationCN,
      coinList
    } = await this.Proxy.totalAsset({
      userId: this.controller.userId,
      token: this.controller.token
    });
    this.state.wallet = coinList || [];
    if (this.state.wallet.length) {
      let obj = {};
      this.controller.sort(this.state.wallet, ["coinName"], 1).forEach(v => {
        obj[v.coinName.toUpperCase()] = v.coinId;
      });
      this.state.walletList = obj;
    }
    let { totalQuota, availableQuota } = await this.Proxy.balance({
      userId: this.controller.userId,
      coinId: this.state.walletList["BTC"],
      coinName: "btc",
      token: this.controller.token
    });
    this.state.totalAsset = {
      valuationBTC,
      valuationEN,
      valuationCN,
      totalQuota,
      availableQuota
    };
  }
  // 获取walletList
  async getWalletList() {
    let result = await this.Proxy.getAllCoinList();
    if (result && result.list && result.list.length) {
      let obj = {};
      this.controller.sort(result.list, ["coinName"], 1).forEach(v => {
        obj[v.coinName.toUpperCase()] = v.coinId;
      });
      this.state.walletList = obj;
    }
  }

  // 获取单个币种资产信息
  async getCurrencyAmount(coin) {
    let obj = {
      userId: this.controller.userId,
      coinId: this.state.walletList[coin],
      coinName: coin.toLowerCase(),
      token: this.controller.token
    };
    let result = await this.Proxy.balance(obj);
    if (result && result.errCode) {
      return result;
    }
    this.state.currencyAmount = result;
    return result;
  }

  // 获取充币地址
  async getChargeAddress(coin) {
    let result = await this.Proxy.chargeAddress({
      userId: this.controller.userId,
      coinId: this.state.walletList[coin],
      token: this.controller.token
    });
    result.coinAddress
      ? (this.state.coinAddress = result)
      : (this.state.coinAddress = {
          coinId: this.state.walletList[coin], //币种ID
          verifyNumer: "", //最大确认数
          coinAddress: "" //地址
        });
  }

  // 获取资产记录
  async getHistory(obj) {
    let result = await this.Proxy.history(
      Object.assign(
        {
          userId: this.controller.userId,
          token: this.controller.token
        },
        obj
      )
    );
    if (result && result.errCode) {
      return result;
    }
    this.state.assetHistory.orderList =
      result &&
      result.orderList.map(v => {
        v.orderType === 15000 && (v.orderType = 2);
        v.orderType === 5 && (v.orderType = 4);
        return v;
      });
    obj.page === 0 && !result.totalCount && (this.state.assetHistory.total = 0);
    obj.page === 0 &&
      result.totalCount &&
      (this.state.assetHistory.total = result.totalCount);
    return this.state.assetHistory;
  }
  // 导出资产记录
  async exportHistory() {
    let result = await this.Proxy.history({
      userId: this.controller.userId,
      token: this.controller.token,
      coinId: -1, //如果不设定 传-1
      coinName: -1,
      orderType: -1, //充1提2转4  注意:交易所内提币收方显示为转账  所有状态传-1，如果需要两种状态则将需要的状态相与（|）
      startTime: -1, //不设定传-1 都传Unix秒
      endTime: -1, //不设定传-1 都传Unix秒
      orderStatus: -1, //所有状态传-1
      page: 0,
      pageSize: 999999999999
    });
    if (result && result.errCode) {
      return [];
    }
    return result.orderList;
  }
  // 获取矿工费
  async getMinerFee(coin, address) {
    let result = await this.Proxy.minerFee({
      coinId: this.state.walletList[coin],
      coinAddr: address,
      token: this.controller.token
    });
    this.state.walletExtract.minerFee = result.minerFee;
  }
  // 获取提币地址信息
  async getwalletExtract() {
    if (this.state.walletExtract.extractAddr.length) return;
    let result = await this.Proxy.extractAddress({
      userId: this.controller.userId,
      token: this.controller.token
    });
    if (result && result.errCode) {
      // console.log(result);
      return result;
    }
    this.state.walletExtract.extractAddr = result.addresses;
  }

  // 提交提币订单
  async extractOrder(obj) {
    let result = await this.Proxy.extractOrder(
      Object.assign(obj, {
        userId: this.controller.userId,
        token: this.controller.token,
        coinId: this.state.walletList[obj.coinName],
        coinName: obj.coinName.toLowerCase(),
        os: 3
      })
    );
    return result;
  }
  // 撤销提币申请
  async cancelOrder(id) {
    let result = await this.Proxy.cancelWithdraw({
      userId: this.controller.userId,
      token: this.controller.token,
      applyId: id
    });
    if (result === null) {
      this.state.assetHistory.orderList.forEach(v => {
        if (v.orderId === id) v.orderStatus = 3;
      });
      return this.state.assetHistory;
    }
    return result;
  }
  // 增加提现地址
  async appendAddress({ coinName, addressName, address }) {
    let result = await this.Proxy.addAddress({
      userId: this.controller.userId,
      coinId: this.state.walletList[coinName],
      coinName: coinName.toLowerCase(),
      addressName: addressName,
      address: address,
      token: this.controller.token
    });
    if (result && result.errCode) {
      return result;
    }

    this.state.walletExtract.extractAddr.forEach(v => {
      v.coinId === this.state.walletList[coinName] &&
        v.addressList.push({
          addressName: addressName,
          address: address,
          addressId: result.addressId
        });
    });
    return this.state.walletExtract;
  }

  // 删除提现地址
  async deletAddress({ coinName, addressId, addressName, address }) {
    // console.log(coinName, addressId, addressName, address);
    let result = await this.Proxy.delAddress({
      userId: this.controller.userId,
      coinId: this.state.walletList[coinName],
      coinName: coinName.toLowerCase(),
      addressId: addressId,
      addressName: addressName,
      address: address,
      token: this.controller.token
    });
    if (result && result.errCode) {
      return result;
    }
    this.state.walletExtract.extractAddr.forEach(v => {
      v.coinId === this.state.walletList[coinName] &&
        (v.addressList = v.addressList.filter(
          item => item.address !== address
        ));
    });
    return this.state.walletExtract;
    // this.state.walletExtract.extractAddr = this.state.walletExtract.extractAddr.filter(
    //   item => item.address !== address
    // );
  }
  // 验证资金密码
  async verifyPass(fundPass) {
    let result = await this.Proxy.verifyFundPass({
      userId: this.controller.userId,
      token: this.controller.token,
      fundPass: fundPass
    });
    return result;
  }
}
