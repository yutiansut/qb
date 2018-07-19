import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import TradePopup from '../../../common/component/TradePopup/index.jsx'
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
      orderDetail: [],
      currentOrder: [],
      historyOrder: [],
      resetPopFlag: false
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
  }
  
  cancelOrder(cancelType, v = 0){
    let orderId, opType, dealType;
    orderId = cancelType ? 0 : JSON.parse(JSON.stringify(v.orderId)) ;
    opType = cancelType;
    dealType =cancelType ? 0 : v.orderType;
    // dealType =v && v.orderType || 0;
    // console.log('cancelop',orderId, opType, dealType)
    this.props.controller.cancelOrder(orderId, opType, dealType, 0)
  }
  componentWillMount() {
  
  }
  
  componentDidMount() {
    // this.props.controller.wsOrderList()
    // this.props.controller.getCurrentOrder(false, )
  }
  tradeOrderDetail(v){
    if([1,2,6,7].indexOf(v.orderStatus) !== -1){
      this.setState({
        detailFlag: true,
        orderDetailType: v.orderType
      })
      this.props.controller.getOrderDetail(v.orderId)
    }
    
  }
  renderCurrentOrder() {
    // console.log('this.state.currentOrder', this.state.currentOrder)
    return (
        <div className='trade-current-order'>
          <div className='trade-current-title'>
            <h3>{this.intl.get('order-current')}</h3>
            <div style={{display: 'flex'}}>
              {this.state.resetHandleItems.map((v, index) => {
                return (
                    <div className='reset-handle' key={index} onClick={this.cancelOrder.bind(this,index + 1)}>{v.name}</div>
                )
              })}
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
                    <td>{this.state.unitsType === 'CNY' && Number(v.priceCN).format({number:'legal',style:{name:'cny'}}) || (this.state.unitsType === 'USD' && Number(v.priceEN).format({number:'legal',style:{name:'usd'}}) || Number(v.price).format({number:'digital'}))}</td>
                    <td>{Number(v.count).formatFixNumberForAmount(v.price)}</td>
                    <td>{this.state.unitsType === 'CNY' && Number((v.priceCN).multi(v.count)).format({number: 'property', style: {name: 'cny'}}) || (this.state.unitsType === 'USD' && Number((v.priceEN).multi(v.count)).format({number: 'property', style: {name: 'cny'}})) || Number((v.price).multi(v.count)).format({number: 'property'})}</td>
                    {/*<td>{Number(Number(this.state.unitsType === 'CNY' && v.priceCN || (this.state.unitsType === 'USD' && v.priceEN || v.price)).multi(v.count)).format({number:'property',style:{name:}})}</td>*/}
                    <td>{v.dealDoneCount.formatFixNumberForAmount(Number(v.price))}</td>
                    <td>{v.undealCount && v.undealCount.formatFixNumberForAmount(Number(v.price)) || Number(v.count.minus(v.dealDoneCount)).formatFixNumberForAmount(Number(v.price))}</td>
                    <td onClick={this.tradeOrderDetail.bind(this, v)} style={{cursor: 'pointer'}}>{this.state.orderStatus[v.orderStatus]}</td>
                    <td onClick={this.cancelOrder.bind(this, 0, v)} style={{cursor: 'pointer'}}>{this.intl.get('cancel')}</td>
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
            <a href="/worder/history" style={{color: 'rgba(255,255,255,.5)', fontSize: '.12rem',marginRight:'.49rem'}}>{this.intl.get('seeMore')}</a>
          </div>
          {this.state.historyOrder && this.state.historyOrder.length && <table className='trade-current-table'>
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
              // console.log('this.state.unitsType 0', (this.state.unitsType === 'CNY' && (v.turnoverCN && Number(v.turnoverCN).format({number: 'property'}) || Number(v.dealDoneCount.multi(v.priceCN)).format({number: 'property'}))))
              // console.log('this.state.unitsType 1', (this.state.unitsType === 'USD' && (v.turnoverEN && Number(v.turnoverEN).format({number: 'property'}) || Number(v.dealDoneCount.multi(v.priceEN)).format({number: 'property'}))) )
              // console.log('this.state.unitsType 2', (v.turnover && Number(v.turnover).format({number: 'property'}) || Number(v.dealDoneCount.multi(v.price)).format({number: 'property'})))
              return (
                  <tr key={index}>
                    <td>{Number(v.orderTime).toDate()}</td>
                    <td style={{color: `${v.orderType ? '#F25656' : '#2BB789'}`}}>{v.orderType ? this.intl.get('sell') : this.intl.get('buy')}</td>
                    {/*todo 颜色改类名统一处理*/}
                    <td>{v.priceType ? this.intl.get('marketPrice') : ((this.state.unitsType === 'CNY' && Number(v.priceCN).format({number:'legal',style:{name:'cny'}})) || ((this.state.unitsType === 'USD' && Number(v.priceEN).format({number:'legal',style:{name:'usd'}})) || Number(v.price).format({number:'digital'})))}</td>
                    <td>{Number(v.count).formatFixNumberForAmount(v.price)}</td>
                    <td>{v.dealDoneCount.formatFixNumberForAmount(Number(v.price))}</td>
                    <td>{(this.state.unitsType === 'CNY' && (v.turnoverCN && Number(v.turnoverCN).format({number: 'property',style:{name: 'cny'}}) || Number(v.dealDoneCount.multi(v.priceCN)).format({number: 'property',style:{name: 'cny'}}))) || (this.state.unitsType === 'USD' && (v.turnoverEN && Number(v.turnoverEN).format({number: 'property',style:{name: 'usd'}}) || Number(v.dealDoneCount.multi(v.priceEN)).format({number: 'property',style:{name: 'usd'}}))) || (v.turnover && Number(v.turnover).format({number: 'property'}) || Number(v.dealDoneCount.multi(v.price)).format({number: 'property'}))}</td>
                    <td>{this.state.unitsType === 'CNY' && Number(v.avgPriceCN).format({number:'legal',style:{name: 'cny'}}) || (this.state.unitsType === 'USD' && Number(v.avgPriceEN).format({number:'legal',style:{name: 'usd'}})) || Number(v.avgPrice).format({number:'digital'})}</td>
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
  
  render() {
    return (
        <div>
          {this.renderCurrentOrder()}
          {this.renderHistoryOrder()}
          <div className='trade-order-shadow' style={{display: this.state.detailFlag ? 'block' : 'none'}}>
            <div className='trade-order-detail'>
              <h3>{this.intl.get('orderDetail')}</h3>
              <div className='trade-order-content'>
                <div className='trade-order-info'>
                  <p>{this.state.orderDetail.doneCount}</p>
                  <span>{this.intl.get('order-deal-total')} {this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[1]}</span>
                </div>
                <div className='trade-order-info'>
                  <p>{this.state.orderDetail.dealedMoney}</p>
                  <span>{this.intl.get('order-deal-money')} {this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[0]}</span>
                </div>
                <div className='trade-order-info'>
                  <p>{this.state.orderDetail.price}</p>
                  <span>{this.intl.get('avgPrice')} {this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[0]}</span>
                </div>
                <div className='trade-order-info'>
                  <p>{this.state.orderDetail.fee}</p>
                  <span>{this.intl.get('fee')} {this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[this.state.orderDetailType]}</span>
                </div>
              </div>
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
                        {/*<td>{v.buyer}</td>*/}
                        {/*<td>{v.seller}</td>*/}
                        <td>{Number(v.orderTime).toDate()}</td>
                        <td>{v.price}</td>
                        <td>{v.volume}</td>
                        <td>{v.turnover}</td>
                      </tr>
                  )
                })}
                </tbody>
              </table>
              <div className='trade-order-close' onClick={()=> this.setState({detailFlag: false})}>{this.intl.get('close')}</div>
            </div>
          </div>
          <div className='reset-pop'>
            {this.state.resetPopFlag && <TradePopup  msg={this.intl.get('cancel-successful')} onClose={() => {this.setState({ resetPopFlag: false })}} className='reset-pop-location'/>}
          </div>
        </div>
    )
  }
}

