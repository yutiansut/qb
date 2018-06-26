import ExchangeStoreBase from "../ExchangeStoreBase";

export default class AssetStore extends ExchangeStoreBase {
  constructor() {
    super("asset");
    this.state = {
      // 交易对手续费
      pairFees: [
        {
          tradePairId: 0,
          tradePairName: "ETH/BTC",
          makerFee: 0.12,
          takerFee: 0.11
        },
        {
          tradePairId: 1,
          tradePairName: "BCH/BTC",
          makerFee: 0.12,
          takerFee: 0.01
        },
        {
          tradePairId: 2,
          tradePairName: "LSK/BTC",
          makerFee: 0.19,
          takerFee: 0.11
        }
      ],
      // 总资产
      totalAsset: {
        valuationBTC: 12324.3432, //总资产
        valuationEN: 213.232, //换算美元
        valuationCN: 222.22, //换算人民币
        totalQuota: 10, //24小时提现额度
        availableQuota: 1.1 //可用额度
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
      walletList: ["USDT", "ETH", "BCH", "LSK", "BTC"],
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
        coinName: "BTC",
        fee: 0.02, //手续费
        minerFee: 0.05, //矿工费
        minWithdraw: 0.01, //最小提现数量
        extractAddr: [
          {
            addressId: "xxx",
            addressName: "usdt-address-1",
            address: "15sdf1asgf12asg1f3dsg1fds32g1d3fsg"
          },
          {
            addressId: "xxx",
            addressName: "usdt-address-1",
            address: "gf8h6fg5jhj1hj2gf1kjk1y1tu32k12uk"
          }
        ] //提现地址
      },
      //充币地址
      coinAddress: [
        {
          coinName: "BTC", //币种
          coinId: 0, //币种ID
          verifyNumer: 5, //最大确认数
          coinAddress: "asdfdeagds0gfhgdfjhgfjkgfhkjgsgdsfg" //地址
        },
        {
          coinName: "ETH",
          coinId: 1,
          verifyNumer: 5, //最大确认数
          coinAddress: "212dsfg4d2hgdfh542hj1fhg2fhgjgfh5k"
        },
        {
          coinName: "LTC",
          coinId: 2,
          verifyNumer: 5, //最大确认数
          coinAddress: "02sdf5sr5h5gjhj3hk21jkyu512nbvm032"
        },
        {
          coinName: "BCH",
          coinId: 3,
          verifyNumer: 5, //最大确认数
          coinAddress: "626fgds6gd6uyyt3uu3ykjh3kjhkj3lh3"
        }
      ],

      //充币记录
      // chargeHistory: {},
      //提币记录
      // extractHistory: {},
      //资产记录
      assetHistory: {
        page: 0,
        pageSize: 10,
        totalCount: 50,
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
  // 获取交易对手续费
  async getFee() {
    this.state.pairFees = await this.Proxy.getFee({
      data: { userId: 2, tradePairId: 1 }
    });
  }
  // 获取总资产
  async getTotalAsset() {
    let {
      valuationBTC,
      valuationEN,
      valuationCN,
      coinList
    } = await this.Proxy.totalAsset({ data: { userId: 2 } });
    let { totalQuota, availableQuota } = await this.Proxy.balance({
      data: {
        userId: 5,
        coinId: 0,
        coinName: "BTC"
      }
    });
    this.state.totalAsset = {
      valuationBTC,
      valuationEN,
      valuationCN,
      totalQuota,
      availableQuota
    };
    this.state.wallet = coinList;
    !this.state.walletList.length &&
      (this.state.walletList = coinList.map(v => v.coinName));
  }
  // 获取充币地址
  async getChargeAddress() {
    let { coinAddress } = await this.Proxy.chargeAddress({
      data: { userId: 2 }
    }).coinAddress;
    this.state.coinAddress = coinAddress;
    !this.state.walletList.length &&
      (this.state.walletList = coinAddress.map(v => v.coinName));
  }
  // async getWallet() {
  //   // this.wallet = await getWallet
  // }
  // 获取资产记录
  async getHistory() {
    this.state.assetHistory = await this.Proxy.history({
      data: {
        userId: 5,
        coinId: 1,
        coinName: "BTC",
        orderType: 1, //充0提1转2  注意:交易所内充提显示为转账
        startTime: 0,
        endTime: 0,
        orderStatus: 0, //未通过 审核中1 通过2  撤销3
        page: 0,
        pageSize: 10
      }
    });
  }
  // 获取提币手续费和地址
  async getwalletExtract() {
    this.state.walletExtract = await this.Proxy.extractInfo({
      data: {
        userId: 5,
        coinId: 1,
        coinAddress: "xxx"
      }
    });
    this.state.walletExtract.extractAddr = await this.Proxy.extractAddress({
      data: {
        userId: 5,
        coinId: 0
      }
    });
  }
  // 删除提现地址
  appendAddress({ addressName, address }) {
    this.state.walletExtract.extractAddr.push({ addressName, address });
  }
  // 增加提现地址
  deletAddress({ addressName, address }) {
    this.state.walletExtract.extractAddr = this.state.walletExtract.extractAddr.filter(
      item => item.address !== address
    );
  }
}
