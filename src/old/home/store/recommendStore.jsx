import {observable, reaction, computed} from 'mobx';
import {RequestStore} from "../../store/request.jsx";

const isEmpty = require('lodash.isempty');

class RecommendStore extends RequestStore {

  @observable data = []

  constructor(url,settings){
    super(url,settings);
    reaction(() => this.response.data, data => {
      // console.log('RecommendStore reaction', data)
      if (isEmpty(data)) {
        this.data = [{name:'-_-', updown:0,last:0,price_to_cny:0,price_to_usd:0,money:0,line:[]},
        {name:'-_-', updown:0,last:0,price_to_cny:0,price_to_usd:0,money:0,line:[]},
        {name:'-_-', updown:0,last:0,price_to_cny:0,price_to_usd:0,money:0,line:[]},
        {name:'-_-', updown:0,last:0,price_to_cny:0,price_to_usd:0,money:0,line:[]},
        {name:'-_-', updown:0,last:0,price_to_cny:0,price_to_usd:0,money:0,line:[]}]
      }
      this.data = data.markets;
    })
  }

  @computed get recommendData() {
    // console.log('recommendData',this.data)
    return this.data;
  }

  updateItem(newValue) {
    // console.log('RecommendStore', newValue)
    let oldValue = JSON.parse(JSON.stringify(this.data)), chengeValue=[]
    // console.log('RecommendStore', newValue, oldValue)
    oldValue.forEach(v=>{
      let obj = JSON.parse(JSON.stringify(v))
      let newLast = newValue[v.name]
      if(newLast){
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
        // obj.last = newLast.last
        // obj.money = newLast.money
        // obj.updown = newLast.updown_value
        // obj.vol = newLast.vol
        // obj.price_to_cny = newLast.price_to_cny
        // obj.price_to_usd = newLast.price_to_usd
        // obj.raise = newLast.last-v.last
        // TODO: 添加变化效果
      }
      chengeValue.push(obj)
    })
    this.data = chengeValue;
  }

}

export default RecommendStore
