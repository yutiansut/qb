import ExchangeViewBase from '../../ExchangeViewBase'
import React, {Component} from "react";
import '../stylus/tradeOrder.styl'

export default class userOrder extends ExchangeViewBase {
  constructor(props) {
    super(props);
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
      },
      orderInfoHead: [
        {name: this.intl.get('order-buy')}, {name: this.intl.get('order-sell')}, {name: this.intl.get('order-deal-time')}, {name: this.intl.get('order-deal-price')}, {name: this.intl.get('order-deal-number')}, {name: this.intl.get('order-deal-money')},
      ],
      detailFlag: false,
      orderDetail: [],
      currentOrder: [],
      historyOrder: []
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
    this.props.controller.cancelOrder(orderId, opType, dealType)
  }
  componentWillMount() {
  
  }
  
  componentDidMount() {
    // this.props.controller.wsOrderList()
    // this.props.controller.getCurrentOrder(false, )
  }
  tradeOrderDetail(v){
    if(v.orderStatus === 1 || v.orderStatus === 2){
      this.setState({
        detailFlag: true
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
          <table className='trade-current-table'>
            <thead>
            <tr>
              {this.state.currentOrderHead.map((v, index) => {
                return (
                    <td key={index}>
                      {v.unit && (`${v.name}(${v.unit === 'price' && (this.state.unitsType || this.state.market) || this.state.coin})`) || v.name}
                    </td>
                )
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.currentOrder && this.state.currentOrder.map((v, index) => {
              return (
                  <tr key={index}>
                    <td>{v.orderTime}</td>
                    <td style={{color: `${v.orderType ? '#D84747' : '#129FCC'}`}}>{v.orderType ? this.intl.get('sell') : this.intl.get('buy')}</td>
                    {/*todo 颜色改类名统一处理*/}
                    <td>{this.state.unitsType === 'CNY' && v.priceCN || (this.state.unitsType === 'USD' && v.priceEN || v.price)}</td>
                    <td>{v.count}</td>
                    <td>{(this.state.unitsType === 'CNY' && v.priceCN || (this.state.unitsType === 'USD' && v.priceEN || v.price)) * v.count}</td>
                    <td>{v.dealDoneCount}</td>
                    <td>{v.undealCount || (v.count - v.dealDoneCount)}</td>
                    <td onClick={this.tradeOrderDetail.bind(this, v)}>{this.state.orderStatus[v.orderStatus]}</td>
                    <td onClick={this.cancelOrder.bind(this, 0, v)}>{this.intl.get('cancel')}</td>
                  </tr>
              )
            })}
            </tbody>
          </table>
        
        </div>
    )
  }
  
  renderHistoryOrder() {
    console.log('this.state.historyOrder', this.state.historyOrder)
    return (
        <div className='trade-current-order'>
          <div className='trade-current-title'>
            <h3>{this.intl.get('order-history')}</h3>
          </div>
          <table className='trade-current-table'>
            <thead>
            <tr>
              {this.state.historyOrderHead.map((v, index) => {
                return (
                    <td key={index}>
                      {v.unit && (`${v.name}(${v.unit === 'price' && (this.state.unitsType || this.state.market) || this.state.coin})`) || v.name}
                    </td>
                )
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.historyOrder && this.state.historyOrder.length && this.state.historyOrder.map((v, index) => {
              return (
                  <tr key={index}>
                    <td>{v.orderTime}</td>
                    <td style={{color: `${v.orderType ? '#D84747' : '#129FCC'}`}}>{v.orderType ? '卖出' : '买入'}</td>
                    {/*todo 颜色改类名统一处理*/}
                    <td>{v.priceType ? '市价' : (this.state.unitsType === 'CNY' && v.priceCN || (this.state.unitsType === 'USD' && v.priceEN || v.price))}</td>
                    <td>{v.count}</td>
                    <td>{v.dealDoneCount}</td>
                    <td>{(this.state.unitsType === 'CNY' && v.turnoverCN || (this.state.unitsType === 'USD' && v.turnoverEN || v.turnover)) || (v.price * v.dealDoneCount)}</td>
                    <td>{this.state.unitsType === 'CNY' && v.avgPriceCN || (this.state.unitsType === 'USD' && v.avgPriceEN || v.avgPrice)}</td>
                    <td onClick={this.tradeOrderDetail.bind(this, v)}>{this.state.orderStatus[v.orderStatus]}</td>
                  </tr>
              )
            }) || null}
            </tbody>
          </table>
        
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
                  <span>{this.intl.get('order-deal-total')}{this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[1]}</span>
                </div>
                <div className='trade-order-info'>
                  <p>{this.state.orderDetail.dealedMoney}</p>
                  <span>{this.intl.get('order-deal-money')}{this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[0]}</span>
                </div>
                <div className='trade-order-info'>
                  <p>{this.state.orderDetail.price}</p>
                  <span>{this.intl.get('avgPrice')}{this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[0]}</span>
                </div>
                <div className='trade-order-info'>
                  <p>{this.state.orderDetail.fee}</p>
                  <span>{this.intl.get('fee')}{this.state.orderDetail.tradePairName && this.state.orderDetail.tradePairName.split('/')[1]}</span>
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
                        <td>{v.buyer}</td>
                        <td>{v.seller}</td>
                        <td>{v.orderTime}</td>
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
        
        </div>
    )
  }
}

