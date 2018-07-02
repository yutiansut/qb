import ExchangeStoreBase from "../ExchangeStoreBase";

export default class AssetStore extends ExchangeStoreBase {
  constructor() {
    super("asset");
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
      wallet: [
        {
          coinName: "USDT", //币种
          fullname: "BitCoin", //币种全称
          coinIcon: "http://xxxx.jpg", //币种图片
          coinId: 0, //币种ID
          availableCount: 100, //可用余额
          frozenCount: 1030, //冻结中金额
          valuationBTC: 122, //BTC估值
          valuationCN: 111, //?
          totalCount: 1000 //总额
        },
        {
          coinName: "BTC", //币种
          fullname: "BitCoin", //币种全称
          coinIcon: "http://xxxx.jpg", //币种图片
          coinId: 0, //币种ID
          availableCount: 2100, //可用余额
          frozenCount: 120, //冻结中金额
          valuationBTC: 1220, //BTC估值
          valuationCN: 111, //?
          totalCount: 1000 //总额
        },
        {
          coinName: "ETH", //币种
          fullname: "BitCoin", //币种全称
          coinIcon: "http://xxxx.jpg", //币种图片
          coinId: 0, //币种ID
          availableCount: 1546, //可用余额
          frozenCount: 100, //冻结中金额
          valuationBTC: 0.0002, //BTC估值
          valuationCN: 111, //?
          totalCount: 1000 //总额
        },
        {
          coinName: "LTC", //币种
          fullname: "BitCoin", //币种全称
          coinIcon: "http://xxxx.jpg", //币种图片
          coinId: 0, //币种ID
          availableCount: 430, //可用余额
          frozenCount: 10, //冻结中金额
          valuationBTC: 0, //BTC估值
          valuationCN: 111, //?
          totalCount: 1000 //总额
        },
        {
          coinName: "EOS", //币种
          fullname: "BitCoin", //币种全称
          coinIcon: "http://xxxx.jpg", //币种图片
          coinId: 0, //币种ID
          availableCount: 10, //可用余额
          frozenCount: 1030, //冻结中金额
          valuationBTC: 322, //BTC估值
          valuationCN: 111, //?
          totalCount: 1000 //总额
        },
        {
          coinName: "BCH", //币种
          fullname: "BitCoin", //币种全称
          coinIcon: "http://xxxx.jpg", //币种图片
          coinId: 0, //币种ID
          availableCount: 0, //可用余额
          frozenCount: 100, //冻结中金额
          valuationBTC: 152, //BTC估值
          valuationCN: 111, //?
          totalCount: 1000 //总额
        }
      ],
      //币种列表
      walletList: { BTC: 0, ETH: 4 },
      // 获取单个币种资产及提现额度
      currencyAmount: {
        coinName: "BTC",
        availableCount: 100.22, //可用额度
        totalCount: 200.22, //总额度
        frozenCount: 11.11, //冻结额度
        totalQuota: 2.22, //24H提现额度
        availableQuota: 2.22 //可用提现额度
      },
      //提币信息
      walletExtract: {
        minerFee: 0, //矿工费
        extractAddr: [] //提现地址
      },
      //充币地址
      coinAddress: {
        coinId: 0, //币种ID
        verifyNumer: 5, //最大确认数
        coinAddress: "asdfdeagds0gfhgdfjhgfjkgfhkjgsgdsfg" //地址
      },
      //充币记录
      // chargeHistory: {},
      //提币记录
      // extractHistory: {},
      //资产记录
      assetHistory: {
        total: 0,
        orderList: [
          {
            orderType: 0, //充0提1转2  注意:交易所内充提显示为转账
            orderStatus: 0, //待审核0 审核中1 通过2  撤销3
            fullname: "BitCoin",
            coinIcon: "http://xxxx.jpg",
            coinName: "BTC",
            coinId: "xxxx",
            count: 1.222,
            balance: 1.222, //余额
            postAddress: "xxxx", //发送地址
            receiveAddress: "xxxxx", //接收地址
            fee: 0.4, //手续费
            verifyCount: 5, //确认数
            doneCount: 1, //已确认数
            hashAddress: "xxx", //hash地址
            blockSite: "xxx", //点击查看交易信息的地址
            orderTime: "2018-12-23",
            orderStatus: 0,
            orderId: "xxxxxx"
          },
          {
            orderType: 0, //充0提1转2  注意:交易所内充提显示为转账
            orderStatus: 0, //未通过0 审核中1 通过2  撤销3
            fullname: "BitCoin",
            coinIcon: "http://xxxx.jpg",
            coinName: "BTC",
            coinId: "xxxx",
            count: 1.222,
            balance: 1.222, //余额
            postAddress: "xxxx", //发送地址
            receiveAddress: "xxxxx", //接收地址
            fee: 0.4, //手续费
            verifyCount: 5, //确认数
            doneCount: 1, //已确认数
            hashAddress: "xxx", //hash地址
            blockSite: "xxx", //点击查看交易信息的地址
            orderTime: "2018-12-23",
            orderStatus: 0,
            orderId: "xxxxxx"
          }
        ]
      }
    };
  }
  setController(ctrl) {
    this.controller = ctrl;
  }
  // 获取交易对手续费
  async getFee() {
    this.state.pairFees = await this.Proxy.getFee({
      userId: this.controller.userId,
      token: this.controller.token,
    });
    console.log(this.state.pairFees);
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
    let { totalQuota, availableQuota } = await this.Proxy.balance({
      userId: this.controller.userId,
      coinId: 0,
      coinName: "BTC",
      token: this.controller.token
    });
    this.state.totalAsset = {
      valuationBTC,
      valuationEN,
      valuationCN,
      totalQuota,
      availableQuota
    };
    this.state.wallet = coinList || [];
    this.state.walletList["BTC"] === undefined &&
      (this.state.walletList = this.state.wallet.map(v => v.coinName));
  }

  // 获取walletList
  async getWalletList() {
    let { coinList } = await this.Proxy.totalAsset({
      userId: this.controller.userId,
      token: this.controller.token
    });
    if (!this.state.walletList.length) {
      let obj = {};
      coinList.forEach(v => {
        obj[v.coinName] = obj[v.coinId];
      });
      this.state.walletList = obj;
    }
  }

  // 获取单个币种资产信息
  async getCurrencyAmount(coin) {
    let obj = { userId: this.controller.userId, coinId: this.state.walletList[coin], coinName: coin, token: this.controller.token };
    let result = await this.Proxy.balance(obj)
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
        coinId: "", //币种ID
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
    // let result = await this.Proxy.history({
    //   userId: this.controller.userId,
    //   coinId: 0,
    //   coinName: "BTC",
    //   orderType: 1, //充0提1转2  注意:交易所内充提显示为转账
    //   startTime: 0,
    //   endTime: 0,
    //   orderStatus: 0, //未通过 审核中1 通过2  撤销3
    //   page: 0,
    //   pageSize: 10,
    //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiIyMjcxNzAxMzc0NTc4Mjc4NDAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tr6AowdEPkZJQRnib28_dfUjY_MTmI_aNu9UN-Cl5y0"
    // });
    this.state.assetHistory.orderList = result && result.orderList;
    obj.page === 0 && !result.totalCount && (this.state.assetHistory.total = 0);
    obj.page === 0 &&
      result.totalCount &&
      (this.state.assetHistory.total = result.totalCount);
  }
  async getMinerFee(coin) {
    let { minerFee } = await this.Proxy.minerFee({
      coinId: this.state.walletList[coin],
      token: this.controller.token
    });
    this.state.walletExtract.minerFee = minerFee;
  }
  // 获取提币地址信息
  async getwalletExtract() {
    if (this.state.walletExtract.extractAddr.length) return;
    let result = await this.Proxy.extractAddress({
      userId: this.controller.userId,
      token: this.controller.token
    });
    if (result && result.errCode) {
      console.log(result);
      return result;
    }
    this.state.walletExtract.extractAddr = result.addresses;
    console.log(result);
  }

  // 提交提币订单
  async extractOrder(obj) {
    let result = await this.Proxy.extractOrder(Object.assign({
      userId: this.controller.userId,
      token: this.controller.token,
      coinId: this.state.walletList[obj.coinName.toLowerCase()],
      os: 3
    }, obj))
    return result;
  }
  // 增加提现地址
  async appendAddress({ coinName, addressName, address }) {
    let result = await this.Proxy.addAddress({
      userId: this.controller.userId,
      coinId: this.state.walletList[coinName],
      coinName: coinName,
      addressName: addressName,
      address: address,
      token: this.controller.token
    });
    if (result && result.errCode) {
      return result;
    }
    let targetArr = this.state.walletExtract.extractAddr.filter(
      v => v.coinId === this.state.walletList[coinName]
    );
    // console.log(targetArr)
    //     targetArr.length && targetArr[0].addressList.push({
    //         addressName: addressName,
    //         address: address,
    //         addressId: result.addressId
    //       });
    //     !targetArr.length && this.state.walletExtract.extractAddr.push({
    //       "coinId": 4,
    //       "coinName": "eth",
    //       "minCount": 0.1,
    //       "addressList": [
    //         {
    //           addressName: addressName,
    //           address: address,
    //           addressId: result.addressId,
    //         }
    //       ]
    //     },
    // );
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
      coinName: coinName,
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
          item => item.addressId !== addressId
        ));
    });
    return this.state.walletExtract;
    // this.state.walletExtract.extractAddr = this.state.walletExtract.extractAddr.filter(
    //   item => item.address !== address
    // );
  }
}
