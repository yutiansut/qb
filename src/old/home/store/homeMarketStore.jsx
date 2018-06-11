import {observable, reaction, computed} from 'mobx';
import {RequestStore} from "../../store/request.jsx";

const isEmpty = require('lodash.isempty');

class HomeMarketStore extends RequestStore {
  @observable data = []
  @observable marketSelected = 0;
  @observable sortNumClickA = 0;
  @observable sortNumClickD = 0;
  @observable defaultSort = '';
  @observable searchContent = '';
  @observable sortAscending = true;
  @observable marketTitleItems = [
    {name: '交易盘', sortable: false},
    {name: '最新成交价', sortKey: 'last', asec: true, desc: true, sortable: true},
    {name: '24H成交额', sortKey: 'money', asec: false, desc: false, sortable: true},
    {name: '24H成交量', sortKey: 'vol', asec: false, desc: false, sortable: true},
    {name: '24H涨跌幅', sortKey: 'updown', asec: false, desc: false, sortable: true},
    {name: '7日涨跌幅', sortable: false},
  ];

  constructor(url, settings) {
    super(url, settings);
    reaction(() => this.response.data, data => {
      if (isEmpty(data)) {
        this.data = []
      }
      this.data = data.markets.map(v=>{
        v.last = v.last || 0;
        v.money = v.money || 0;
        v.vol = v.vol || 0;
        v.updown = v.updown || 0;
        return v
      });
    })
  }

  @computed get marketData() {
    return this.data
  }

  updateItem(newValue) {
    let oldValue = JSON.parse(JSON.stringify(this.data)), chengeValue = []
    console.log('home updateItem 0', newValue)
    oldValue.forEach(v => {
      let obj = JSON.parse(JSON.stringify(v))
      let newLast = newValue[v.name]
      if (newLast) {
        console.log('home updateItem 0.5', newLast, newLast.last, newLast.money, newLast.updown_value, newLast.vol)
        if(newLast.last !== undefined){
          obj.raise = newLast.last-v.last
          obj.last = newLast.last
          obj.price_to_cny = newLast.price_to_cny
          obj.price_to_usd = newLast.price_to_usd
        }
        if(newLast.money !== undefined){
          obj.money = newLast.money
        }
        if(newLast.updown_value !== undefined){
          obj.updown = newLast.updown_value
        }
        if(newLast.vol !== undefined){
          obj.vol = newLast.vol
        }
        // TODO: 添加变化效果
      }
      chengeValue.push(obj)
    })
    console.log('home updateItem 1', chengeValue)
    this.data = chengeValue;
  }
}

export default HomeMarketStore
