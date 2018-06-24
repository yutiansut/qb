import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";
import SelectButton from "../../../common/component/SelectButton";
import Button from "../../../common/component/Button";
import DatePicker from "../../../common/component/DatePicker/DatePicker";
import Pagination from "../../../common/component/Pagination";
import '../stylus/orderDetail.styl'

const orderDetailHead = {
  orderCurrent:[{name:'时间'},{name:'交易对'},{name:'类型'},{name:'价格'},{name:'数量'},{name:'交易额'},{name:'尚未成交'},{name:'已成交'},{name:'状态'},{name:'操作'},],
  orderHistory:[{name:'时间'},{name:'交易对'},{name:'类型'},{name:'价格'},{name:'数量'},{name:'成交额'},{name:'已成交'},{name:'平均成交价'},{name:'状态'},{name:'操作'},],
  orderDeal:[{name:'时间'},{name:'交易对'},{name:'类型'},{name:'平均成交价'},{name:'成交数量'},{name:'成交额'},{name:'手续费'},],
};

const orderStatus = {
  0: '已成交',
  1: '部分成交',
  2: '未成交',
  3: '已撤销'
};

const orderNavItems = {
  orderCurrent: {
    title:'当前订单',
  },
  orderHistory: {
    title:'历史订单'
  },
  orderDeal: {
    title:'历史成交'
  }
}
export default class OrderCurrent extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
      preArray : []
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.orderListHandle = controller.orderListHandle.bind(controller)
  }
  componentWillMount(){
  
  }
  componentDidMount(){
    this.orderListHandle(this.props.type)
  }
  hideReset(e){
    let renderArr = [...this.state.orderListArray];
    renderArr = e.target.checked ? renderArr.filter(v => v.orderStatus !== 3) : this.state.preArray;
    this.setState({
      orderListArray : renderArr
    })
  }
  render() {
    const {type} = this.props
  return(
      <div className='order-detail'>
          <div className='order-title'>
            <h3>{orderNavItems[type].title}</h3>
            {type === 'orderHistory' && <div className='filter-reset'>
              <input type="checkbox" onClick={this.hideReset.bind(this)}/>
              <span>隐藏已撤销</span>
            </div>}
            {type !== 'orderCurrent' && <Button type="export" title="导出资产记录" className='export-record'/>}
          </div>
        <ul className='order-filter'>
          <li className='order-pair'>
            <span>交易对</span>
            <SelectButton
                title="全部"
                type="main"
                className="select"
                valueArr={["全部", "BTC", "LSK", "ETH", "BCH", "USDT"]} //todo 币种列表
            />
            <em>/</em>
            <SelectButton
                title="全部"
                type="main"
                className="select"
                valueArr={["全部", "BTC",  "ETH", "USDT"]} //todo 市场列表
            />
          </li>
          <li>
            <span>类型</span>
            <SelectButton
                title="全部"
                type="main"
                className="select"
                valueArr={["全部", "买入",  "卖出"]}
            />
          </li>
          {type !== 'orderCurrent' && <li className='data-filter'>
           <DatePicker />
         </li>}
          <li className='filter-handle'>
            <Button type="base" title="搜索" className="search" />
            {type !== 'orderCurrent' && <Button type="base" title="重置" className="reset" />}
          </li>
        </ul>
        <table className='order-detail-table'>
          <thead>
          <tr>
            {orderDetailHead[type].map((v, index) => {
              return(
                  <td key={index}>{v.name}</td>
              )
            })}
          </tr>
          </thead>
          <tbody>
          {this.state.orderListArray.map((v, index) => {
            return(
                <tr key={index}>
                  <td>{v.orderTime}</td>
                  <td>{v.tradePairName}</td>
                  <td style={{color: `${v.orderType ? '#D84747' : '#129FCC'}`}}>{v.orderType ? '卖出' : '买入'}</td>
                  {/*todo 颜色改类名统一处理*/}
                  {/*价格*/}
                  {type === 'orderCurrent' && <td>{v.price}</td>}
                  {type === 'orderHistory' &&  <td>{v.priceType ? '市价' : v.price}</td>}
                  {type === 'orderDeal' && <td>{v.avgPrice}</td>}
                  {/*数量*/}
                  {type !== 'orderDeal' && <td>{v.count}</td> || <td>{v.dealDoneCount}</td>}
                  
                  <td>{v.turnover}</td>
                  {type === 'orderDeal' && <td>{v.fee}</td>}
                  {type === 'orderCurrent' && <td>{v.undealCount}</td>}
                  {type !== 'orderDeal' && <td>{v.dealDoneCount}</td>}
                  {type === 'orderHistory' && <td>{v.avgPrice}</td>}
                  {type !== 'orderDeal' && <td>{orderStatus[v.orderStatus]}</td>}
                  {type === 'orderCurrent' &&  <td>撤销</td> || type === 'orderHistory' && <td>详情</td>}
                 
                </tr>
            )
          })}
          </tbody>
        </table>
      </div>
  )
  }
}