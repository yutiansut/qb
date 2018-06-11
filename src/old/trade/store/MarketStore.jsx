import {toJS, observable, reaction, computed} from "mobx";
import {RequestStore} from "../../store/request.jsx";

/**
 * data  e.g.:  {
 *          btc_usd: {id: "",
 *                   is_collected: "",
 *                   display: "",
 *                   last: '',
 *                   vol: ''
 *                   updown_value: ''},
 *          eth_usd: {...}
 * }
 */
class MarketStore extends RequestStore {
  SORTKEY = {
    PRICE : 'last',
    UPDOWN : 'updown_value'
  }
  ORDER = {
    PRICE: "PRICE",
    VOL: "VOL",
    UPDOWN: "UPDOWN"
  };
  DIRECT = {
    DESC: 0,
    ASC: 1
  };
  @observable sortValue = 'market';
  @observable market = 'ALL';  // 选择了哪个市场, ALL代表全部.
  @observable tradePair = "";
  @observable data = {};
  @observable order_by = {
    field: this.ORDER.PRICE,
    direct: this.DIRECT.DESC,
  };
  @observable direction = this.DIRECT.DESC;
  @observable _searchWhat = '';
  @observable klineHeight = 0;
  @observable searchEnter = '';

  constructor(stores, url, settings) {
    super(url, settings);
    this.actionStore = stores.actionStore;
    this.bankStore = stores.bankStore;
    this.hdStar = this.hdStar.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.getMarketName = this.getMarketName.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.getNextOrder = this.getNextOrder.bind(this);
    this.hdSearch = this.hdSearch.bind(this);
    reaction(() => this.actionStore.response.jqXHR, data => {
      if (data.status === 422) {
        // alert(data.responseText);
        swalMix({
          width:274,
          position:'top-end',
          timer: 3000,
          padding: '0px',
          backdrop: false,
          customClass:'trade-swalMix-one',
          showCloseButton:false,
          background:"rgba(235, 90, 90, 0.7) url('/static/trade/img/chucuo.svg') no-repeat 14px center/42px 32px",
          html: `<div style="color:#FFFFFF;font-size: 14px;letter-spacing: 0;text-indent:65px;text-align:left;">${data.responseText}</div>`
        })
        return;
      }
      if (data.status === 200) {
        let text = '操作成功'
        if(conf.LANGUAGECODE !== 'zh-hans')
          text = 'Done successfully'
        swalMix({
          width:274,
          position:'top-end',
          timer: 3000,
          padding: '0px',
          backdrop: false,
          customClass:'trade-swalMix-one',
          showCloseButton:false,
          background:"rgba(27, 176, 224, 0.7) url('/static/trade/img/success.svg') no-repeat 14px center/42px 32px",
          html: `<div style="color:#FFFFFF;font-size: 14px;letter-spacing: 0;text-indent:65px;text-align:left;">${text}</div>`
        })
        this.get();
        return;
      }
      if (data.status === 401) {
        let text = '需要登录'
        if(conf.LANGUAGECODE !== 'zh-hans')
          text = 'Please log in'
        swalMix({
          width:274,
          position:'top-end',
          timer: 3000,
          padding: '0px',
          backdrop: false,
          customClass:'trade-swalMix-one',
          showCloseButton:false,
          background:"rgba(235, 90, 90, 0.7) url('/static/trade/img/chucuo.svg') no-repeat 14px center/42px 32px",
          html: `<div style="color:#FFFFFF;font-size: 14px;letter-spacing: 0;text-indent:65px;text-align:left;">需要登录</div>`
        })
      }
    });
    // 把接收到的数据绑定到data
    reaction(() => this.response.jqXHR, data => {
      if (data.status === 200) {
        // console.log('res', data, this.response.data)
        // let currencyArr = Object.values(this.response.data);
        // currencyArr.sort((a, b) => b.No - a.No);
        // let currencyObj = {};
        // console.log('currencyArr', currencyArr)
        // currencyArr.map((v) => v && v.id && (currencyObj[v.id] = v));
        this.updateItem(this.response.data)
      }
    });
    // reaction(() => this.market ,data =>{
    //   if(data !== '收藏' && data !== 'Favorites' && data !== 'SEARCH') {
    //     // if(!data.length)
    //       // return
    //      this.tradePair = this.OrderData[0].id;
    //   }
    //
    //
    // });
    reaction(() => this.OrderData, data => {
      if(this.market === 'SEARCH'){
        this.searchEnter = data[0] && data[0].id;
      }
    })
    
  }

  changeOrder(type, e) {
    e.preventDefault();
    // 如果是这个队列， 更改排序方式
    // 否则更改队列
    // 如果指定的队列错误， 不处理
    if (!this.ORDER.hasOwnProperty(type)) {
      return;
    }
    this.sortValue = this.SORTKEY[type];
    if (this.order_by.field == type) {
      this.order_by.direct = this.getNextOrder(this.order_by.direct)
    } else {
      this.order_by.field = type;
      this.order_by.direct = this.DIRECT.DESC;
    }
  }

  getNextOrder(value) {
    return (value + 1) % 2
  }

  hdStar(item) {
    this.actionStore.post(JSON.stringify({
      tp_id: item.id
    }));
  }

  /**
   * 扩展币种信息。
   */
  updateItem(_obj) {
    // console.log('market updateItem 0', _obj )
    const obj = toJS(_obj);
    const data = toJS(this.data);
    // console.log('market updateItem 0.1', obj, data)

    for (const prop in obj) {
      const info = data[prop];
      // console.log('market updateItem 0.5', info, prop)
      if (!info) {
        data[prop] = obj[prop];
      } else {
        let _data = {};
        Object.assign(_data, info);
        // console.log('market updateItem 0.6', _data)
        Object.assign(_data, obj[prop]);
        // console.log('market updateItem 0.8', _data)
        data[prop] = _data;
      }
    }
    //币种信息进行排序处理
    // let currencyArr = Object.values(data);
    // currencyArr.sort((a, b) => b.No - a.No);
    // let currencyObj = {};
    // console.log('currencyArr', currencyArr)
    // currencyArr.map((v) => v && v.id && (currencyObj[v.id] = v));
    this.data = data;
  }

  /**
   * 返回所有市场
   */
  @computed get Market() {
    // return ['收藏', 'BTC', 'ETH', 'USDT', 'USD']
    let sortMarket = ['BTC', 'ETH', 'USDT'];
    let market = new Set();
    conf.LANGUAGECODE === 'zh-hans' && market.add("收藏") || market.add('Favorites');
    for (const prop in this.data) {
      market.add(this.getMarketName(prop))
    }
    let marketArray = Array.from(market);
    for (let i in marketArray){
      if(i>0){
        marketArray[i] = sortMarket[i-1]
      }
    }
    // return Array.from(market);
    return marketArray;
  }


  /**
   * 得到市场的名字
   */
  getMarketName(tradePair) {
    if (tradePair) {
      return tradePair.split("_")[1].toUpperCase()
    }
    return '';
  }


  /**
   * 返回选择市场的交易对.
   * @returns {*}
   * @constructor
   */
  @computed get SData() {
    if (this.data === {}) {
      return {};
    }
    let result = {};
    for (const prop in this.data) {
      if (this.getMarketName(prop) === this.market) {
        result[prop] = this.data[prop]
      }
    }
    return result;
  }

  hdSearch(e) {
    e.preventDefault();
    if (e.target.value) {
      this.market = "SEARCH";
      if((/^[A-Za-z0-9]*\/?[A-Za-z0-9]*$/).test(e.target.value))
        this._searchWhat = e.target.value;
    }
    else {
      // this.market = this.getMarketName(prop);
    }
  }

  @computed get OrderData() {
    if (this.data === {}) {
      return [];
    }
    let result = [];
    // console.log('this.market', this.market)
    if (this.market === "ALL") {
      for (const prop in this.data) {
        result.push(this.data[prop])
      }
    } else if (this.market === "SEARCH") {
      for (const prop in this.data) {
        if (prop.toLowerCase().search(this._searchWhat.toLowerCase()) !== -1) {
          result.push(this.data[prop])
        }
      }
    }
    else {
      if(this.market === '收藏' || this.market ==='Favorites'){
        for(const prop in this.data){
          this.data[prop].is_collected && result.push(this.data[prop])
        }
      }
      for (const prop in this.data) {
        if (this.getMarketName(prop) === this.market) {
          result.push(this.data[prop]);
          result.sort((a,b) => b.No - a.No);
        }
      }
    }

    if (this.order_by.direct === this.DIRECT.DESC) {
      if(this.sortValue === 'market')
        return result;
      return result.sort((a, b) => parseFloat(b[this.sortValue] || 0) - parseFloat(a[this.sortValue] || 0))}
      if(this.sortValue === 'market')
        return result;
    return result.sort((a, b) => parseFloat(a[this.sortValue] || 0) - parseFloat(b[this.sortValue] || 0))
  }

  /**
   * 所有交易对
   * @returns {{}}
   * @constructor
   */
  @computed get AData() {
    return this.data;
  }

  /**
   * 返回选择的交易对.
   * @returns {*|string[]}
   */
  @computed get TradePair() {
    if (this.tradePair) {
      return this.tradePair.split("_");
    }
    return ['', '']
  }

}

class MarketActionStore extends RequestStore {

}

export default {MarketStore, MarketActionStore}
