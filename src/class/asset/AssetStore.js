import ExchangeStoreBase from "../ExchangeStoreBase";

export default class AssetStore extends ExchangeStoreBase {
  constructor() {
    super();
    this.state = {
      // 交易对手续费
      pairFees: [
        {
          "tradePairId": 0,
          "tradePairName": 'ETH/BTC',
          "makerFee": 0.12,
          "takerFee": 0.11
        },
        {
          "tradePairId": 1,
          "tradePairName": 'BCH/BTC',
          "makerFee": 0.12,
          "takerFee": 0.01
        },
        {
          "tradePairId": 2,
          "tradePairName": 'LSK/BTC',
          "makerFee": 0.19,
          "takerFee": 0.11
        }
      ]
      ,
      // 总资产
      totalAsset: {
        valuationBTC: 12324.3432, //总资产
        valuationEN: 213.232, //换算美元
        valuationCN: 222.22, //换算人民币
        totalQuota: 2, //24小时提现额度
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
      chargeHistory: {
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
            orderTime: 947586000,
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
            orderTime: 947586000,
            orderStatus: 0,
            orderId: "xxxxxx"
          }
        ]
      },
      //

      //提币信息
      walletExtract: {
        coinName: "BTC",
        fee: 0.02, //手续费
        minerFee: 0.05, //矿工费
        minWithdraw: 0.01, //最小提现数量
        extract_addr: [
          {
            "addressId": "xxx",
            "addressName": "usdt-address-1",
            "address": "15sdf1asgf12asg1f3dsg1fds32g1d3fsg"
          },
          {
            "addressId": "xxx",
            "addressName": "usdt-address-1",
            "address": "gf8h6fg5jhj1hj2gf1kjk1y1tu32k12uk"
          }
        ] //提现地址
      },
      //提币记录
      extractHistory: {
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
            orderTime: 947586000,
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
            orderTime: 947586000,
            orderStatus: 0,
            orderId: "xxxxxx"
          }
        ]
      },
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
            orderTime: '2018-12-23',
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
            orderTime: '2018-12-23',
            orderStatus: 0,
            orderId: "xxxxxx"
          }
        ],
        total: "200", //数据总条数
        cur_page: "1", //当前页数，
        page_size: 20,
        list: [
          {
            date: "2018-12-23", //提币时间（时间戳）
            currency: "BTC", //币种
            type: 0, // 0 充币 1 提币
            amount: "+0.044", //数量
            balance: "2.6566", //余额
            send_address: "18878665623", //发送地址
            receive_address: "0x046e2222….22227e3543", //接收地址
            confirm: "1/6", //确认数
            state: 0, //状态 通过0、审核中1、未通过2
            fee: "—" //手续费
          },
          {
            date: "2018-12-23", //提币时间（时间戳）
            currency: "BTC", //币种
            type: 0, // 0 充币 1 提币
            amount: "+0.044", //数量
            balance: "2.6566", //余额
            send_address: "18878665623", //发送地址
            receive_address: "0x046e2222….22227e3543", //接收地址
            confirm: "1/6", //确认数
            state: 0, //状态 通过0、审核中1、未通过2
            fee: "—" //手续费
          },
          {
            date: "2018-12-23", //提币时间（时间戳）
            currency: "BTC", //币种
            type: 0, // 0 充币 1 提币
            amount: "+0.044", //数量
            balance: "2.6566", //余额
            send_address: "18878665623", //发送地址
            receive_address: "0x046e2222….22227e3543", //接收地址
            confirm: "1/6", //确认数
            state: 0, //状态 通过0、审核中1、未通过2
            fee: "—" //手续费
          },
          {
            date: "2018-12-23", //提币时间（时间戳）
            currency: "BTC", //币种
            type: 0, // 0 充币 1 提币
            amount: "+0.044", //数量
            balance: "2.6566", //余额
            send_address: "18878665623", //发送地址
            receive_address: "0x046e2222….22227e3543", //接收地址
            confirm: "1/6", //确认数
            state: 0, //状态 通过0、审核中1、未通过2
            fee: "—" //手续费
          },
          {
            date: "2018-12-23", //提币时间（时间戳）
            currency: "BTC", //币种
            type: 0, // 0 充币 1 提币
            amount: "+0.044", //数量
            balance: "2.6566", //余额
            send_address: "18878665623", //发送地址
            receive_address: "0x046e2222….22227e3543", //接收地址
            confirm: "1/6", //确认数
            state: 0, //状态 通过0、审核中1、未通过2
            fee: "—" //手续费
          },
          {
            date: "2018-12-23", //提币时间（时间戳）
            currency: "BTC", //币种
            type: 0, // 0 充币 1 提币
            amount: "+0.044", //数量
            balance: "2.6566", //余额
            send_address: "18878665623", //发送地址
            receive_address: "0x046e2222….22227e3543", //接收地址
            confirm: "1/6", //确认数
            state: 0, //状态 通过0、审核中1、未通过2
            fee: "—" //手续费
          },
          {
            date: "2018-12-23", //提币时间（时间戳）
            currency: "BTC", //币种
            type: 0, // 0 充币 1 提币
            amount: "+0.044", //数量
            balance: "2.6566", //余额
            send_address: "18878665623", //发送地址
            receive_address: "0x046e2222….22227e3543", //接收地址
            confirm: "1/6", //确认数
            state: 0, //状态 通过0、审核中1、未通过2
            fee: "—" //手续费
          },
          {
            date: "2018-12-23", //提币时间（时间戳）
            currency: "BTC", //币种
            type: 0, // 0 充币 1 提币
            amount: "+0.044", //数量
            balance: "2.6566", //余额
            send_address: "18878665623", //发送地址
            receive_address: "0x046e2222….22227e3543", //接收地址
            confirm: "1/6", //确认数
            state: 0, //状态 通过0、审核中1、未通过2
            fee: "—" //手续费
          },
          {
            date: "2018-12-23", //提币时间（时间戳）
            currency: "BTC", //币种
            type: 0, // 0 充币 1 提币
            amount: "+0.044", //数量
            balance: "2.6566", //余额
            send_address: "18878665623", //发送地址
            receive_address: "0x046e2222….22227e3543", //接收地址
            confirm: "1/6", //确认数
            state: 0, //状态 通过0、审核中1、未通过2
            fee: "—" //手续费
          }
        ]
      }
    };
  }
  appendAddress({ addressName, address }) {
    this.state.walletExtract.extract_addr.push({ addressName, address });
  }
  deletAddress({ addressName, address }) {
    this.state.walletExtract.extract_addr = this.state.walletExtract.extract_addr.filter(
      item => item.address !== address
    );
  }
}
