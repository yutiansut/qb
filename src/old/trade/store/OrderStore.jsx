import {observable, reaction, computed} from "mobx";
import {RequestStore} from "../../store/request.jsx";
const isEmpty = require('lodash.isempty');


class OrderActionStore extends RequestStore {

}

class OrderStore extends RequestStore{
  // @observable recvData = {};
  @observable clickedStatus = '';  // 那个状态(部分成交/全部成交)被选择了.
  @observable coin_market = '';  // 那个交易对
  @observable orderHeight = 0;
  @observable priceType = '';  // cny,usd,数字选择判定
  constructor(aStore, url, settings) {
    super(url, settings);
    this.actionStore = aStore;
    this.cancel = this.cancel.bind(this);
    reaction(() => this.actionStore.response.jqXHR, data => {
      if(data.status !== 200)
        return
      // let remind = "rgba(235, 91, 91, 0.5) url('/static/trade/img/remind@3x.png') no-repeat 27px center/14px 38px";
      // let success = "rgba(27, 176, 224, 0.5) url('/static/trade/img/success@3x.png') no-repeat 14px center/42px 32px"
      // let obj =
      // obj.background = data.status === 200 && success || remind
      // let text = data.status === 200 && '撤销成功' || data.responseText
      // obj.html = `<div style="color:#FFFFFF;font-size: 14px;letter-spacing: 0;text-indent:65px;text-align:left;">撤销成功</div>`,
      let text = '撤销成功'
      if(conf.LANGUAGECODE !== 'zh-hans')
        text = 'Undo successfully'
      swalMix({
        width:274,
        position:'top-end',
        timer: 3000,
        padding: '0px',
        backdrop: false,
        customClass:'trade-swalMix-one',
        showCloseButton:false,
        background:"rgba(27, 176, 224, 0.5) url('/static/trade/img/success.svg') no-repeat 14px center/42px 32px",
        html: `<div style="color:#FFFFFF;font-size: 14px;letter-spacing: 0;text-indent:65px;text-align:left;">${text}</div>`
      });
      this.get({
          version: 2,
          status: 'oc',
          market: this.coin_market
        },
        'application/x-www-form-urlencoded')
    })
  }

  // 撤销一个订单
  cancel(id, e) {
    e.preventDefault();
    this.actionStore.patch(JSON.stringify({order_id: id}))
  }

  @computed get coin() {
    // console.log('this.coin_market',this.coin_market)
    return this.coin_market && this.coin_market.split('_')[0]
  }

  @computed get CurrentOrder() {
    if (isEmpty(this.recvData)) {
      return []
    }
    if (isEmpty(this.recvData.items)) {
      return []
    }
    return this.recvData.items.filter(i => i.status < 2)
  }

  @computed get HistoryOrder() {
    if (isEmpty(this.recvData)) {
      return []
    }
    if (isEmpty(this.recvData.items)) {
      return []
    }
    return this.recvData.items.filter(i => i.status > 1)
  }
}


export default {OrderStore, OrderActionStore}
