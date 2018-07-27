import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import TradePopup from '../../../common/component/TradePopup/index.jsx'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch
} from "react-router-dom";
import '../stylus/tradeOrder.styl'

export default class userOrder extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.name = 'tradeOrder';
    this.state = {
      resetHandleItems: [
        {name: this.intl.get('order-reset-buy'), opType: 1}, {name: this.intl.get('order-reset-sell'), opType: 2}, {name: this.intl.get('order-reset-all'), opType: 3},
      ],
      currentOrderHead: [
        {name: this.intl.get('time')}, {name: this.intl.get('type')}, {name: this.intl.get('price'), unit: 'price'}, {name: this.intl.get('amount'), unit: 'number'}, {
          name: this.intl.get('deal-trunover'),
          unit: 'price'
        }, {name: this.intl.get('dealed')}, {name: this.intl.get('unDeal')}, {name: this.intl.get('state')}, {name: this.intl.get('action')},
      ],
      historyOrderHead: [
        {name: this.intl.get('time')}, {name: this.intl.get('type')}, {name: this.intl.get('price'), unit: 'price'}, {
          name: this.intl.get('amount'),
          unit: 'number'
        }, {name: this.intl.get('dealed')}, {name: this.intl.get('total'), unit: 'price'}, {name: this.intl.get('avgPrice'), unit: 'price'}, {name: this.intl.get('state')}
      ],
      orderStatus: {
        0: this.intl.get('unDeal'),
        1: this.intl.get('partDeal'),
        2: this.intl.get('totalDeal'),
        3: this.intl.get('reseted'),
        4: this.intl.get('reseting'),
        5: this.intl.get('overed'),
        6: this.intl.get('partDeal'),
        7: this.intl.get('partDeal'),
      },
      orderInfoHead: [
        // {name: this.intl.get('order-buy')}, {name: this.intl.get('order-sell')},
        {name: this.intl.get('order-deal-time')}, {name: this.intl.get('order-deal-price')}, {name: this.intl.get('order-deal-number')}, {name: this.intl.get('order-deal-money')},
      ],
      detailFlag: false,
      orderDetail: {},
      currentOrder: [],
      historyOrder: [],
      resetPopFlag: false
    };
    const {controller} = this.props;
    this.noticeController = controller.noticeController;
    this.getOrderHeight = this.noticeController.getOrderHeight.bind(this.noticeController) // 获取通知列表
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
  }
  
  cancelOrder(cancelType, v = 0){
    let orderId, opType, dealType, tradePairId;
    orderId = cancelType ? 0 : v.orderId;
    opType = cancelType;
    dealType = cancelType ? 0 : v.orderType;
    tradePairId = this.props.controller.TradeMarketController.tradePair.tradePairId
    this.props.controller.cancelOrder(orderId, opType, dealType,tradePairId, 0)
  }
  componentWillMount() {
  
  }
  
  componentDidMount() {
  }
  tradeOrderDetail(v){
    if([1,2,6,7].indexOf(v.orderStatus) !== -1){
      this.setState({
        orderDetailType: v.orderType
      })
      this.props.controller.getOrderDetail(v.orderId)
    }
    
  }
  renderCurrentOrder() {
    return (
        <div className='trade-current-order' >
          <div className='trade-current-title'>
            <h3>{this.intl.get('order-current')}</h3>
            <div style={{display: 'flex'}}>
              {this.state.currentOrder && this.state.currentOrder.length && this.state.resetHandleItems.map((v, index) => {
                return (
                    <div className='reset-handle' key={index} onClick={this.cancelOrder.bind(this,index + 1)}>{v.name}</div>
                )
              }) || null}
            </div>
          </div>
          {this.state.currentOrder && this.state.currentOrder.length && <table className='trade-current-table'>
            <thead>
            <tr>
              {this.state.currentOrderHead.map((v, index) => {
                return (
                    <td key={index}>
                      {v.unit && (`${v.name && v.name.toUpperCase()}(${v.unit === 'price' && (this.state.unitsType && this.state.unitsType.toUpperCase() || this.state.market && this.state.market.toUpperCase()) || this.state.coin && this.state.coin.toUpperCase()})`) || v.name && v.name.toUpperCase()}
                      {index === 2 && <b className="pop-parent">
                        <img src={this.$imagesMap.$yiwen}/>
                        <em className="pop-children rightpop-children">{this.intl.get("deal-digital-tip")}</em>
                      </b>}
                    </td>
                )
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.currentOrder && this.state.currentOrder.map((v, index) => {
              return (
                  <tr key={index}>
                    <td>{Number(v.orderTime).toDate()}</td>
                    <td style={{color: `${v.orderType ? '#F25656' : '#2BB789'}`}}>{v.orderType ? this.intl.get('sell') : this.intl.get('buy')}</td>
                    {/*todo 颜色改类名统一处理*/}
                    <td>{this.state.unitsType === 'CNY' && Number(v.priceCN).format({number:'legal',style:{name:'cny'}}) || (this.state.unitsType === 'USD' && Number(v.priceEN).format({number:'legal',style:{name:'usd'}}) || Number(v.price).format({number:'digital',style:{decimalLength :this.props.controller.accuracy.priceAccuracy}}))}</td>
                    <td>{Number(v.count).formatFixNumberForAmount(this.props.controller.accuracy.volumeAccuracy, false)}</td>
                    <td>{this.state.unitsType === 'CNY' && Number((v.priceCN).multi(v.count)).format({number: 'legal', style: {name: 'cny'}}) || (this.state.unitsType === 'USD' && Number((v.priceEN).multi(v.count)).format({number: 'legal', style: {name: 'usd'}})) || Number((v.price).multi(v.count)).format({number: 'property',style:{decimalLength :this.props.controller.accuracy.priceAccuracy + this.props.controller.accuracy.volumeAccuracy}})}</td>
                    <td>{v.dealDoneCount.formatFixNumberForAmount(this.props.controller.accuracy.volumeAccuracy, false)}</td>
                    <td>{v.undealCount && v.undealCount.formatFixNumberForAmount(this.props.controller.accuracy.volumeAccuracy, false)}</td>
                    <td onClick={this.tradeOrderDetail.bind(this, v)} style={{cursor: 'pointer'}}>{this.state.orderStatus[v.orderStatus]}</td>
                    <td onClick={this.cancelOrder.bind(this, 0, v)} className={`cancel`} style={{cursor: 'pointer'}} >{this.intl.get('cancel')}</td>
                  </tr>
              )
            })}
            </tbody>
          </table> || <div className='trader-order-none'>
           {this.intl.get('noRecords')}
          </div>}
        </div>
    )
  }
  
  renderHistoryOrder() {
    return (
        <div className='trade-current-order'>
          <div className='trade-current-title'>
            <h3>{this.intl.get('order-history')}</h3>
            {this.state.historyOrder && this.state.historyOrder.length !== 0 && <NavLink to={{pathname: "/order/history/"}}>{this.intl.get('seeMore')}</NavLink>}
        </div>
          {this.state.historyOrder && this.state.historyOrder.length !== 0 && <table className='trade-current-table'>
            <thead>
            <tr>
              {this.state.historyOrderHead.map((v, index) => {
                return (
                    <td key={index}>
                      {v.unit && (`${v.name && v.name.toUpperCase()}(${v.unit === 'price' && (this.state.unitsType && this.state.unitsType.toUpperCase() || this.state.market && this.state.market.toUpperCase()) || this.state.coin && this.state.coin.toUpperCase()})`) || v.name && v.name.toUpperCase()}
                      {(index === 2 || index === 6) && <b className="pop-parent">
                        <img src={this.$imagesMap.$yiwen}/>
                        <em className="pop-children rightpop-children">{this.intl.get("deal-digital-tip")}</em>
                      </b>}
                    </td>
                )
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.historyOrder && this.state.historyOrder.length && this.state.historyOrder.map((v, index) => {
              return (
                  <tr key={index}>
                    <td>{Number(v.orderTime).toDate()}</td>
                    <td style={{color: `${v.orderType ? '#F25656' : '#2BB789'}`}}>{v.orderType ? this.intl.get('sell') : this.intl.get('buy')}</td>
                    {/*todo 颜色改类名统一处理*/}
                    <td>{v.priceType ? this.intl.get('marketPrice') : ((this.state.unitsType === 'CNY' && Number(v.priceCN).format({number:'legal',style:{name:'cny'}})) || ((this.state.unitsType === 'USD' && Number(v.priceEN).format({number:'legal',style:{name:'usd'}})) || Number(v.price).format({number:'digital',style:{decimalLength :this.props.controller.accuracy.priceAccuracy}})))}</td>
                    <td>{Number(v.count).formatFixNumberForAmount(this.props.controller.accuracy.volumeAccuracy,false)}</td>
                    <td>{v.dealDoneCount.formatFixNumberForAmount(this.props.controller.accuracy.volumeAccuracy,false)}</td>
                    <td>{(this.state.unitsType === 'CNY' && (v.turnoverCN && Number(v.turnoverCN).format({number: 'legal',style:{name: 'cny'}}) || Number(v.dealDoneCount.multi(v.avgPriceCN)).format({number: 'legal',style:{name: 'cny'}}))) || (this.state.unitsType === 'USD' && (v.turnoverEN && Number(v.turnoverEN).format({number: 'legal',style:{name: 'usd'}}) || Number(v.dealDoneCount.multi(v.avgPriceEN)).format({number: 'legal',style:{name: 'usd'}}))) || (v.turnover && Number(v.turnover).format({number: 'property',style:{decimalLength :this.props.controller.accuracy.priceAccuracy + this.props.controller.accuracy.volumeAccuracy}}) || Number(v.dealDoneCount.multi(v.avgPrice)).format({number: 'property',style:{decimalLength :this.props.controller.accuracy.priceAccuracy + this.props.controller.accuracy.volumeAccuracy}}))}</td>
                    <td>{this.state.unitsType === 'CNY' && Number(v.avgPriceCN).format({number:'legal',style:{name: 'cny'}}) || (this.state.unitsType === 'USD' && Number(v.avgPriceEN).format({number:'legal',style:{name: 'usd'}})) || Number(v.avgPrice).format({number:'digital',style:{decimalLength :this.props.controller.accuracy.priceAccuracy}})}</td>
                    <td onClick={this.tradeOrderDetail.bind(this, v)} style={{cursor:'pointer'}}>{this.state.orderStatus[v.orderStatus]}</td>
                  </tr>
              )
            }) || null}
            </tbody>
          </table>|| <div className='trader-order-none'>
            {this.intl.get('noRecords')}
          </div>}
        </div>
    )
  }
  componentDidUpdate() {
    let tradeOrderHeight = document.getElementById('trade_order').offsetHeight
    this.getOrderHeight(tradeOrderHeight)
  }
  render() {
    return (
        <div id="trade_order">
          {this.renderCurrentOrder()}
          {this.renderHistoryOrder()}
          {this.state.detailFlag && <div className='trade-order-shadow' style={{display: this.state.detailFlag ? 'block' : 'none'}}>
            <div className='trade-order-detail'>
              <h3>{this.intl.get('orderDetail')}</h3>
              <div className='trade-order-content'>
                <div className='trade-order-info'>
                  <p>{Number(this.state.orderDetail.doneCount).formatFixNumberForAmount(this.state.orderDetail.price)}</p>
                  <span>{this.intl.get('order-deal-total')} {this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[1].toUpperCase()}</span>
                </div>
                <div className='trade-order-info'>
                  <p>{Number(this.state.orderDetail.dealedMoney).format({number:'property',style:{decimalLength :this.props.controller.accuracy.priceAccuracy + this.props.controller.accuracy.volumeAccuracy}})}</p>
                  <span>{this.intl.get('order-deal-money')} {this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[0].toUpperCase()}</span>
                </div>
                <div className='trade-order-info'>
                  <p>{Number(this.state.orderDetail.price).format({number: 'digital',style:{decimalLength :this.props.controller.accuracy.priceAccuracy}})}</p>
                  <span>{this.intl.get('avgPrice')} {this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[0].toUpperCase()}</span>
                </div>
                <div className='trade-order-info'>
                  <p>{Number(this.state.orderDetail.fee).format({number: 'property',style:{decimalLength :this.props.controller.accuracy.priceAccuracy + this.props.controller.accuracy.volumeAccuracy}})}</p>
                  <span>{this.intl.get('fee')} {this.state.orderDetail.tradePairName && (this.state.orderDetail.tradePairName.split('/')[this.state.orderDetailType]).toUpperCase()}</span>
                </div>
              </div>
              <div className="trade-order-table-wrap">
                <table className='trade-order-table'>
                  <thead>
                  <tr>
                    {this.state.orderInfoHead.map((v, index) => {
                      return (
                          <td key={index}>{v.name}</td>
                      )
                    })}
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.orderDetail.orderList && this.state.orderDetail.orderList.map((v, index) => {
                    return (
                        <tr key={index}>
                          <td>{Number(v.orderTime).toDate()}</td>
                          <td>{Number(v.price).format({number: 'digital',style:{decimalLength :this.props.controller.accuracy.priceAccuracy}})}</td>
                          <td>{Number(v.volume).formatFixNumberForAmount(this.props.controller.accuracy.volumeAccuracy,false)}</td>
                          <td>{Number(v.turnover).format({number: 'property',style:{decimalLength :this.props.controller.accuracy.priceAccuracy + this.props.controller.accuracy.volumeAccuracy}})}</td>
                        </tr>
                    )
                  })}
                  </tbody>
                </table>
              </div>
              <div className='trade-order-close' onClick={()=> this.setState({detailFlag: false})}>{this.intl.get('close')}</div>
            </div>
          </div>}
          <div className='reset-pop'>
            {this.state.resetPopFlag && <TradePopup  msg={this.intl.get('cancel-successful')} onClose={() => {this.setState({ resetPopFlag: false })}} className='reset-pop-location'/>}
          </div>
        </div>
    )
  }
}

