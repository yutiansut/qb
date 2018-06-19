import ExchangeStoreBase from "../ExchangeStoreBase";

export default class AssetStore extends ExchangeStoreBase {
  constructor() {
    super();
    this.state = {
      // 总资产
      totalAsset: {
        usd: '0', //总资产（美元）
        cny: '0', //总资产（人民币）
        btc: '91516.153351323',//btc资产
        limit_24H: '2',//提币额度
        limit_used: '0'//已用额度
      },
      wallet: [
        {
          currency: "BTC",//币种
          avail: '0.21136',//可用
          lock: '0.21136',//冻结
          tobtc: '0.21136',//btc估值
          codename: "Bitcoin"//全称
        },
        {
          currency: "BTC",//币种
          avail: '0.21136',//可用
          lock: '0.21136',//冻结
          tobtc: '0.21136',//btc估值
          codename: "Bitcoin"//全称
        },
        {
          currency: "BTC",//币种
          avail: '0.21136',//可用
          lock: '0.21136',//冻结
          tobtc: '0.21136',//btc估值
          codename: "Bitcoin"//全称
        }
      ],

      // tradding_list:["BTC/USDT"],//币种交易对

      // 充币信息
      wallet_dict:{
        curency:'btc', //币种
        pay_confirms: 1,//所需网络确认个数
        addr:"mvbwXwdWXKNtvLdc4cseHcQDxKVzWGeAoN",//充值地址
        amount:'0', //总额
        avail:'0', //可用
        lock: '0'// 冻结
      },
      //币种列表
      wallet_list:[
        "usdt", 
        "eth", 
        "bch", 
        "lsk", 
        "btc"
      ],
      //充币记录
      charge_history:{
        total:'50',//数据总条数
        cur_page: '1', //当前页数，
        page_size: 10,
        list: [
          {
            date: 1551323133,//充值时间（时间戳）
            currency: 'BTC',//币种
            amount: '+0.044',//充值数量
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
          }
        ]
      },


      //提币信息
      wallet_extract: {
        extract_addr:[
          {
            name: '185356621225',
            address: 'adsgfsa233fads56f1asd2a65'
          }
        ],//提现地址
        curency: 'btc', //币种
        amount: '0', //总额
        avail: '0', //可用
        lock: '0',// 冻结
        min_withdraw: 0.01, //最小提现数量
        max_withdraw: 0, //最大提现数量
        limit_24H: 2,// 24小时提币限额
        limit_used: 0,//可用额度
        limit_total: 2,//总限额
        miner_fee: '000.5',//旷工费
        service_fee: '0.0001',//平台手续费
      },
      //提币记录
      extract_history: {
        total: '50',//数据总条数
        cur_page: '1', //当前页数，
        page_size: 10,
        list: [
          {
            date: 1551323133,//提币时间（时间戳）
            currency: 'BTC',//币种
            amount: '-0.044',//提币数量
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            remark: ''//备注（有无手续费）
          }
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
            date: 1551323133,//提币时间（时间戳）
            currency: 'BTC',//币种
            type: 0,// 0 充币 1 提币
            amount: '+0.044',//数量
            send_address: '18878665623',//发送地址
            receive_address: '0x046e2222….22227e3543',//接收地址
            confirm: '1/6',//确认数
            state: 0,//状态 通过0、审核中1、未通过2
            fee: ''//手续费
          }
        ]
      }
    }
  }
}
