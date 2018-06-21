import ExchangeStoreBase from "../ExchangeStoreBase";

export default class AssetStore extends ExchangeStoreBase {
  constructor() {
    super();
    this.state = {
      // 总资产
      totalAsset: {
        usd: '15611316.11132', //总资产（美元）
        cny: '265113452.32651', //总资产（人民币）
        btc: '91516.153351323',//btc资产
        limit_24H: '2',//提币额度
        limit_used: '0'//已用额度
      },
      wallet: [
        {
          currency: "ETH",//币种
          avail: '0.21136',//可用
          lock: '0.236',//冻结
          tobtc: '0.21136',//btc估值
          codename: "Bitcoin"//全称
        },
        {
          currency: "BTC",//币种
          avail: '0.21136',//可用
          lock: '0.11136',//冻结
          tobtc: '0.21136',//btc估值
          codename: "Bitcoin"//全称
        },
        {
          currency: "LTC",//币种
          avail: '0.61136',//可用
          lock: '0.21136',//冻结
          tobtc: '0.21136',//btc估值
          codename: "Bitcoin"//全称
        },
        {
          currency: "EOS",//币种
          avail: '2.0',//可用
          lock: '7.0',//冻结
          tobtc: '0.0',//btc估值
          codename: "Bitcoin"//全称
        },
        {
          currency: "BCH",//币种
          avail: '0.0505',//可用
          lock: '0.5005',//冻结
          tobtc: '0.0005',//btc估值
          codename: "Bitcoin"//全称
        },
      ],


      // 充币信息
      wallet_dict: {
        curency: 'btc', //币种
        pay_confirms: 6,//所需网络确认个数
        addr: "mvbwXwdWXKNtvLdc4cseHcQDxKVzWGeAoN",//充值地址
        amount: '10.643', //总额
        avail: '5.0', //可用
        lock: '5.643'// 冻结
      },
      //币种列表
      wallet_list: [
        "usdt",
        "eth",
        "bch",
        "lsk",
        "btc"
      ],
      //充币记录
      charge_history: {
        total: '50',//数据总条数
        cur_page: 1, //当前页数，
        page_size: 10,
        list: [
          {
            date: '2018-12-23 09:09:23',//充值时间（时间戳）
            currency: 'BTC',//币种
            amount: '+0.044',//充值数量
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
          },
          {
            date: '2018-12-23 09:09:23',//充值时间（时间戳）
            currency: 'ETH',//币种
            amount: '+0.044',//充值数量
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 1,//状态 通过0、审核中1、未通过2
          },
          {
            date: '2018-12-23 09:09:23',//充值时间（时间戳）
            currency: 'BTC',//币种
            amount: '+0.044',//充值数量
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '4/6',//确认数
            state: 2,//状态 通过0、审核中1、未通过2
          },
        ]
      },


      //提币信息
      wallet_extract: {
        extract_addr: [
          {
            name: '185356621225',
            address: 'adsgfsa233fads56f1asd2a65'
          },
          {
            name: '185356621225',
            address: 'adssadffdsfhjbgnrtyugfhjgh65'
          }
        ],//提现地址
        currency: 'btc', //币种
        amount: '10', //总额
        avail: '3.7', //可用
        lock: '6.3',// 冻结
        min_withdraw: 0.01, //最小提现数量
        max_withdraw: 0, //最大提现数量
        limit_24H: 2,// 24小时提币限额
        limit_used: 1,//可用额度
        limit_total: 2,//总限额
        miner_fee: '0.005',//旷工费
        service_fee: '0.0001',//平台手续费
      },
      //提币记录
      extract_history: {
        total: '50',//数据总条数
        cur_page: 1, //当前页数，
        page_size: 10,
        list: [
          {
            date: '2018-12-23 09:09:23',//提币时间（时间戳）
            currency: 'BTC',//币种
            amount: '-0.044',//提币数量
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            remark: '—'//备注（有无手续费）
          },
          {
            date: '2018-12-23 09:09:23',//提币时间（时间戳）
            currency: 'BTC',//币种
            amount: '-0.044',//提币数量
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            remark: '—'//备注（有无手续费）
          },
          {
            date: '2018-12-23 09:09:23',//提币时间（时间戳）
            currency: 'BTC',//币种
            amount: '-0.044',//提币数量
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            remark: '—'//备注（有无手续费）
          },
          {
            date: '2018-12-23 09:09:23',//提币时间（时间戳）
            currency: 'BTC',//币种
            amount: '-0.044',//提币数量
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            remark: '—'//备注（有无手续费）
          },
          {
            date: '2018-12-23 09:09:23',//提币时间（时间戳）
            currency: 'BTC',//币种
            amount: '-0.044',//提币数量
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            remark: '—'//备注（有无手续费）
          },
        ]
      },
      //资产记录
      all_listed_stocks: ["btc", "lsk", "bch", "eth", "usdt"],//所有币种
      asset_history: {
        total: '200',//数据总条数
        cur_page: '1', //当前页数，
        page_size: 20,
        list: [
          {
            date: '2018-12-23',//提币时间（时间戳）
            currency: 'BTC',//币种
            type: 0,// 0 充币 1 提币
            amount: '+0.044',//数量
            balance: '2.6566',//余额
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            fee: '—'//手续费
          },
          {
            date: '2018-12-23',//提币时间（时间戳）
            currency: 'BTC',//币种
            type: 0,// 0 充币 1 提币
            amount: '+0.044',//数量
            balance: '2.6566',//余额
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            fee: '—'//手续费
          },
          {
            date: '2018-12-23',//提币时间（时间戳）
            currency: 'BTC',//币种
            type: 0,// 0 充币 1 提币
            amount: '+0.044',//数量
            balance: '2.6566',//余额
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            fee: '—'//手续费
          },
          {
            date: '2018-12-23',//提币时间（时间戳）
            currency: 'BTC',//币种
            type: 0,// 0 充币 1 提币
            amount: '+0.044',//数量
            balance: '2.6566',//余额
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            fee: '—'//手续费
          },
          {
            date: '2018-12-23',//提币时间（时间戳）
            currency: 'BTC',//币种
            type: 0,// 0 充币 1 提币
            amount: '+0.044',//数量
            balance: '2.6566',//余额
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            fee: '—'//手续费
          },
          {
            date: '2018-12-23',//提币时间（时间戳）
            currency: 'BTC',//币种
            type: 0,// 0 充币 1 提币
            amount: '+0.044',//数量
            balance: '2.6566',//余额
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            fee: '—'//手续费
          },
          {
            date: '2018-12-23',//提币时间（时间戳）
            currency: 'BTC',//币种
            type: 0,// 0 充币 1 提币
            amount: '+0.044',//数量
            balance: '2.6566',//余额
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            fee: '—'//手续费
          },
          {
            date: '2018-12-23',//提币时间（时间戳）
            currency: 'BTC',//币种
            type: 0,// 0 充币 1 提币
            amount: '+0.044',//数量
            balance: '2.6566',//余额
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            fee: '—'//手续费
          },
          {
            date: '2018-12-23',//提币时间（时间戳）
            currency: 'BTC',//币种
            type: 0,// 0 充币 1 提币
            amount: '+0.044',//数量
            balance: '2.6566',//余额
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            fee: '—'//手续费
          },
        ]
      }
    }
  }
  appendAddress({ name, address }){
    this.state.wallet_extract.extract_addr.push({ name, address })
  }
  deletAddress({ name, address }){
    this.state.wallet_extract.extract_addr = this.state.wallet_extract.extract_addr.filter(item => item.address !== address);
  }
}
