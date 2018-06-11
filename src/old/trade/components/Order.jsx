import React from "react";
import {observer} from "mobx-react";
import {reaction} from "mobx";
import {translate} from 'react-i18next';
// import $ from "jquery";
const isEmpty = require('lodash.isempty');
/**
 *
 */
@translate(['translations'], {wait: true})
@observer
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.clickStatus = this.clickStatus.bind(this);
    this.undo = this.undo.bind(this);
  }

  componentDidUpdate(){
    const store = this.props.store;
    let itemHeight = $('.currency-order-length').eq(0).height() || $('.history-order-length').eq(0).height() || 25,
        currencyOrderCount = store.CurrentOrder.slice().length,
        currencyOrderHeight = currencyOrderCount && itemHeight*(currencyOrderCount+1)+55 || 150,
        historyOrderCount = Math.min(store.HistoryOrder.slice().length, 10),
        historyOrderHeight = Math.max(itemHeight*(historyOrderCount+1)+55, 150),
        orderHeight = 2 + currencyOrderHeight + historyOrderHeight;
    // console.log('store.orderHeight 0', currencyOrderCount, currencyOrderHeight, historyOrderCount, historyOrderHeight, orderHeight)
    // console.log('store.orderHeight 0.5', $('.currency-order-length').eq(0).height(), $('.history-order-length').eq(0).height())
    store.orderHeight = orderHeight;
    // console.log('store.orderHeight 1',store.orderHeight)
  }

  clickStatus(pk, e) {
    e.preventDefault();
    if(!pk){
      return
    }
    const store = this.props.store;
    store.clickedStatus = pk;
  }

  undo(type, e) {
    e.preventDefault();
    const {store} = this.props;
    const batch = store.coin_market;
    $.ajax({
      url: conf.orderRevokeUrl,
      method: 'POST',
      headers: {"X-CSRFToken": conf.csrf_token},
      data: {
        'batch': batch,
        'catalog': type,
      },
      success: function (data) {
        let text = '撤销成功'
        if(conf.LANGUAGECODE !== 'zh-hans')
          text = 'Undo successfully'
        swalMix({
          width:274,
          position:'top-end',
          timer: 3000,
          padding: '0px',
          backdrop: false,
          customClass:'trade-swalMix-more',
          showCloseButton:false,
          background:"transparent",
          html:`<div class="trade-swalMix-more-div">${text}</div><div class="trade-swalMix-more-div" style="margin-top:7px">${data.msg}</div>`
        })
        store.get({
            version: 2,
            status: 'oc',
            market: batch
          },
          'application/x-www-form-urlencoded')
      }
    })
  }

  get renderCurrentOrder() {
    const {t, store, confStore, bankStore} = this.props;
    const numberType = confStore.getUnitType().toLowerCase();
    const [tf, tt] = this.props.marketStore.TradePair;
    if (isEmpty(store.CurrentOrder)) {
      return <div className="d-flex flex-column" style={{padding:'11px 55px 15px 25px',justifyContent:'space-between', minHeight:'150px'}}>
        <h2 style={{fontSize:'12px', color:'white', margin:0}}>{t('当前订单')}</h2>
        <div style={{textAlign:'center', margin:'auto', fontSize:'28px'}}>{t('暂无记录')}</div>
      </div>
    }
    return (
      <div className="d-flex flex-column" style={{padding: '0 0px 15px 2%'}}>
        <div className="d-flex flex-row" style={{justifyContent:'space-between',height:'40px',alignItems:'center' }}>
          <h2 style={{fontSize:'12px', color:'white'}}>{t('当前订单')}</h2>
          <div className='reset-handle' style={{padding: '0 55px 0 0',}}>
            <a className='to-pointer mix-order-revet' onClick={this.undo.bind(this, 0)}>{t('撤销买入')}</a>
            <a className='to-pointer mix-order-revet' onClick={this.undo.bind(this, 1)}>{t('撤销卖出')}</a>
            <a className='to-pointer mix-order-revet-all' onClick={this.undo.bind(this, 2)}>{t('全部撤销')}</a>
          </div>
        </div>
        <table className="current-table-t" style={{width:'100%'}}>
          <thead>
          <tr>
            <th>{t('时间')}</th>
            <th style={{minWidth:"50px"}} className='to-pointer'>{t('类型')}</th>
            <th>{t('价格')}{`(${store.priceType})`}</th>
            <th>{t('数量')}{`(${tf.toUpperCase()})`}</th>
            <th>{t('交易额')}{`(${store.priceType})`}</th>
            <th>{t('已成交')}</th>
            <th>{t('尚未成交')}</th>
            <th>{t('状态')}</th>
            <th style={{minWidth:"70px"}}>{t('操作')}</th>
          </tr>
          </thead>
        <tbody>
        {store.CurrentOrder.map((i, index) =>
          <CurrencyOrderList key={index}
                            data={i}
                            store={store}
                            bankStore={bankStore}
                            confStore={confStore}
          />
          )}
        </tbody>
        </table>
      </div>
    )
  }

  get renderHistoryOrder() {
    const {t, store, confStore, bankStore} = this.props;
    const numberType = confStore.getUnitType().toLowerCase();
    const [tf, tt] = this.props.marketStore.TradePair;
    if (store.HistoryOrder.length >= 10) {
      store.HistoryOrder.splice(10);
    }
    if (isEmpty(store.HistoryOrder)) {
      return <div
        style={{padding: '0 55px 0 25px', textAlign: 'center', marginTop: '35px', fontSize: '28px'}}>{t('暂无记录')}</div>
    }
    return (
      <div style={{padding: '0px 0px 0px 2%',}}>
      <table className="table table-hover table-sm borderless" style={{margin:0}}>
        <thead>
        <tr>
          <th>{t('时间')}</th>
          <th style={{minWidth:"50px"}}>{t('类型')}</th>
          <th>{t('价格')}{`(${store.priceType})`}</th>
          <th>{t('数量')}{`(${tf.toUpperCase()})`}</th>
          <th>{t('已成交')}</th>
          <th>{t('成交额')}{`(${store.priceType})`}</th>
          <th>{t('成交均价')}{`(${store.priceType})`}</th>
          <th>{t('状态')}</th>
        </tr>
        </thead>
        <tbody>
        {store.HistoryOrder.map((i, index) =>
          <HistoryOrderList key={index}
                            data={i}
                            store={store}
                            bankStore={bankStore}
                            confStore={confStore}
          />
          )}
        </tbody>
      </table>
      </div>
    )

  }

  render() {
    const {t, store} = this.props;
    // console.log(store.HistoryOrder.length);
    const styleShow = store.HistoryOrder.length >= 9 && 'inline-block' || 'none';
    return <div className="d-flex flex-column" style={{width:'100%'}}>
      {this.renderCurrentOrder}
      <div className='history-list-m'>
        <h2  className='history-managed-t'>{t("历史订单")}   <a href={conf.historyListUrl} style={{display: styleShow}} className='order-check-more'>{t('查看更多')}</a></h2>
      {this.renderHistoryOrder}
      </div>
    </div>
  }
}
/**
 * 当前订单成交价格数据 e.g.: 数字币计价：0.1(BTC)
 *                            USD： $600
 *                            CNY:  ￥4000
 */
@translate(['translations'], {wait: true})
@observer
class CurrencyOrderList extends React.Component {
  constructor(props) {
    super(props);
    this.clickStatus = this.clickStatus.bind(this);
  }

  clickStatus(pk, e) {
    e.preventDefault();
    if(!pk){
      return
    }
    const store = this.props.store;
    store.clickedStatus = pk;
  }

  render() {
    const {store, confStore, t, bankStore} = this.props;
    const data = this.props.data;
    const numberType = confStore.getUnitType().toLowerCase();
    var currencyUnitPrice = '';
    var currencyAmountPrice = '';
    if(store.priceType==='CNY') {
      currencyUnitPrice = Number(data.cny_price).format({number:'legal',style:{name:'cny'}});
      currencyAmountPrice = Number(data.cny_price*data.amount).format({number:'property',style:{name:'cny'}});
    }
    else if(store.priceType==='USD') {
      currencyUnitPrice = Number(data.usd_price).format({number:'legal',style:{name:'usd'}});
      currencyAmountPrice = Number(data.usd_price*data.amount).format({number:'property',style:{name:'usd'}});}
    else {
      currencyUnitPrice = Number(data.price).format({number:'digital'});
      currencyAmountPrice = Number(data.price*data.amount).format({number:'property'});
    }

    // console.log('aaaaa',bankStore.recentDealData, bankStore.recentDealData['CNY'], store.coin)

    return <tr className="currency-order-length">
      <td>{data.created_at}</td>
      <td style={{minWidth:"50px"}} className={!data.catalog  ? 'stock-buy' : 'stock-sell'}>{data.catalog_display}</td>
      <td className={!data.catalog ? 'stock-buy' : 'stock-sell'}>{ currencyUnitPrice}</td>
      <td>{Number(data.amount).formatFixNumberForAmount(bankStore.recentDealData['CNY'] && bankStore.recentDealData['CNY'][store.coin])}</td>
      <td>{currencyAmountPrice}</td>
      <td>{Number(data.amount_deal).formatFixNumberForAmount(bankStore.recentDealData['CNY'] && bankStore.recentDealData['CNY'][store.coin])}</td>
      <td>{Number(data.amount_remain).formatFixNumberForAmount(bankStore.recentDealData['CNY'] && bankStore.recentDealData['CNY'][store.coin])}</td>
          <td style={{minWidth:"50px"}}>
            <a className="btn btn-sm mix-a-xx-small mix-red"
              data-toggle={(data.status_display === "部分成交") && 'modal' || ""}
              data-target={(data.status_display === "部分成交") && "#order-modal-dialog" || ""}
              onClick={this.clickStatus.bind(this, (data.status_display === "部分成交") && data.id)}
            >{data.status_display}</a>
          </td>
          <td style={{cursor:'pointer',minWidth:"70px"}}><a onClick={store.cancel.bind(store, data.id)}>{t("撤销")}</a></td>
    </tr>
  }
}


/**
 * 历史订单成交价格数据 e.g.: 数字币计价：0.1(BTC)
 *                            USD： $600
 *                            CNY:  ￥4000
 */
@observer
class HistoryOrderList extends React.Component {
  constructor(props) {
    super(props);
    this.clickStatus = this.clickStatus.bind(this);
  }

  clickStatus(pk, e) {
    e.preventDefault();
    if(!pk){
      return
    }
    const store = this.props.store;
    store.clickedStatus = pk;
  }

  render() {
    const {store, confStore, bankStore} = this.props;
    const data = this.props.data;
    const numberType = confStore.getUnitType().toLowerCase();
    var historyUnitPrice = '';
    let historyAvePrice = '';
    var historyAmountPrice = '';
    if(store.priceType==='CNY') {
      historyUnitPrice = Number(data.cny_price).format({number:'legal',style:{name:'cny'}});
      historyAvePrice = Number(data.cny_avg_price_rate * data.avg_price).format({number:'legal',style:{name:'cny'}});
      historyAmountPrice = Number(data.cny_avg_price_rate * data.avg_price * data.amount_deal).format({number:'property',style:{name:'cny'}});
    }
    else if(store.priceType==='USD') {
      historyUnitPrice = Number(data.usd_price).format({number:'legal',style:{name:'usd'}});
      historyAvePrice = Number(data.usd_avg_price_rate * data.avg_price).format({number:'legal',style:{name:'usd'}});
      historyAmountPrice = Number(data.usd_avg_price_rate * data.avg_price * data.amount_deal).format({number:'property',style:{name:'usd'}});
    }
    else {
      historyUnitPrice = Number(data.price).format({number:'digital'});
      historyAvePrice = Number(data.avg_price).format({number:'digital'});
      historyAmountPrice = Number(data.avg_price * data.amount_deal).format({number:'property'});
    }
    return <tr className="history-order-length">
      <td>{data.created_at}</td>
      <td style={{minWidth:"50px"}} className={!data.catalog  ? 'stock-buy' : 'stock-sell'}>{data.catalog_display}</td>
      <td className={!data.catalog ? 'stock-buy' : 'stock-sell'}>{data.order_type && (conf.LANGUAGECODE === 'zh-hans' && '市价' || 'Market price')|| historyUnitPrice}</td>
      <td>{Number(data.amount).formatFixNumberForAmount(bankStore.recentDealData['CNY'] && bankStore.recentDealData['CNY'][store.coin])}</td>
      <td>{Number(data.amount_deal).formatFixNumberForAmount(bankStore.recentDealData['CNY'] && bankStore.recentDealData['CNY'][store.coin])}</td>
      <td>{historyAmountPrice}</td>
      <td>{historyAvePrice}</td>
      <td>
        <a className="btn btn-sm mix-a-xx-small mix-red"
           data-toggle={(Number(data.amount_deal) !== 0) && 'modal' || ""}
           data-target={(Number(data.amount_deal) !== 0) && "#order-modal-dialog" || ""}
           onClick={this.clickStatus.bind(this, (Number(data.amount_deal) !== 0) && data.id)}
        >{data.status_display}</a>
      </td>
    </tr>
  }
}


export default Order
