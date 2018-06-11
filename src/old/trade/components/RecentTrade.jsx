import React from "react";
import * as utils from "../utils.jsx";
import {observer} from "mobx-react";
import {translate} from 'react-i18next';
const isEmpty = require('lodash.isempty');

@translate(['translations'], {wait: true})
@observer
class RecentTrade extends React.Component {

  constructor(props) {
    super(props);
    this.getBtnStyle = this.getBtnStyle.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.getPriceStyle = this.getPriceStyle.bind(this);
    const {store} = this.props;
    store.orderBy = 'date';
    store.reversed = true;
  }

  getPrice(price) {
    const {bankStore, store, confStore} = this.props;
    const rate = bankStore.getRateFromTradePair(store.tradePair, confStore.coinPriceType);
    return price * rate;
  }

  getBtnStyle(selected) {
    const {store} = this.props;
    if (store.type === selected) {
      return 'mix-btn-active'
    }
    return 'mix-btn'
  }

  getPriceStyle(order_type) {
    const {store} = this.props;
    if(store.type !== "MINE")
      return ''
    if(order_type === 'SELL') {
      return 'mix-red'
    }
    return 'mix-blue'
  }

  sortBy(field, e) {
    e.preventDefault();
    const {store} = this.props;
    store.orderBy = field;
    store.reversed = !store.reversed;
  }

  renderOrderIcon(field) {
    const store = this.props.store;
    if (store.order_by.field !== field) {
      return <i className="fa fa-sort-stable" aria-hidden="true"></i>
    }
    if (store.order_by.direct === store.DIRECT.DESC) {
      return <i className="fa fa-sort-desc" aria-hidden="true"></i>
    }
    return <i className="fa fa-sort-asc" aria-hidden="true"></i>

  }

  render() {
    const {t, store, sameHeight, confStore, bankStore} = this.props;
    const numberType = confStore.getUnitType().toLowerCase();
    const styleName = confStore.coinPriceType.toLowerCase();
    // console.log('redent', numberType)
    return (
      <div className="mix-dark d-flex flex-column mb-1 bb-recent" style={{height:store.tradePlanHeight || sameHeight,  paddingLeft:'12px'}}>
        <div className="d-flex flex-row mix-recent-nav">
          <div className="mix-h-light  flex-grow-1">{t('近期交易')}</div>
          <div onClick={store.changeType.bind(store, store.TYPE.TRADE)}
               className={`d-flex justify-content-center align-items-center to-pointer ${this.getBtnStyle("TRADE")}`} style={{borderRadius:'2px 0 0 2px'}}>{t('市场')}
          </div>
          <div onClick={store.changeType.bind(store, store.TYPE.MINE)}
               className={`d-flex justify-content-center align-items-center to-pointer ${this.getBtnStyle("MINE")}`} style={{borderRadius:'0 2px 2px 0'}}>{t('我的')}
          </div>
        </div>
        <div className="d-flex flex-column mix-recent-content">
          <div className="d-flex flex-row mix-recent-c-header align-items-center">
            <div className="mix-recent-time-w to-pointer" onClick={this.sortBy.bind(this, 'date')}>{t('时间')}</div>
            <div className="mix-recent-price-w mix-recent-t-header to-pointer"
                 onClick={this.sortBy.bind(this, 'price')}>{t('价格')}</div>
            <div className="mix-recent-amount-w mix-recent-t-header to-pointer"
                  style={{margin:'0 7% 0 0'}}
                 onClick={this.sortBy.bind(this, 'amount')}>{t('数量')}</div>
          </div>
          <div style={{overflowY:'auto', height:'90%'}} className='mix-recent-list'>
            <div className="d-flex flex-column">
              {!isEmpty(store.Data) ? store.Data.map((i, index) => (
                <div className="d-flex flex-row mix-recent-item align-items-center" key={index} style={{height: sameHeight * 0.878 * 0.9 * 0.0887}}>
                  <div className="mix-recent-time-w" style={{color:'rgba(255,255,255,1)'}}>{i.date && i.date.toDate('HH:mm:ss')}</div>
                  <div className={`mix-recent-price-w ${this.getPriceStyle(i.order_type)}`}>{Number(this.getPrice(i.price)).format({number:numberType, style:{name:styleName}})}</div>
                  <div className="mix-recent-amount-w">{parseFloat(i.amount).formatFixNumberForAmount(bankStore.recentDealData['CNY'] && bankStore.recentDealData['CNY'][store.coin])}</div>
                </div>)) : <div className="mix-recent-time-w" style={{color:'rgba(255,255,255,1)'}}>{t("暂无记录")}</div>
              }
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default RecentTrade
