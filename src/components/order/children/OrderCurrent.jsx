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
  0: '未成交',
  1: '部分成交',
  2: '全部成交',
  3: '已撤销',
  4:  '撤单中',
  5:  '已结束',
  6:  '部分成交',
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
      preArray : [],
      startTime: 1509484067,
      endTime: 1530088867,
        // end: new Date().getTime(),
        // start : (new Date().getTime()) - 7 * 24 *60 * 60
      coinArray: [],
      marketArray: [],
      idArray: [],
      coinSelect: '全部',
      marketSelect: '全部',
      orderType: 2,
      hideOther: 0,
      orderStatus: [1,2,3,4,5,6],
      page: 1,
      pageSize: 20,
      detailFlag: false,
      orderDetail: {}
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.orderListHandle = controller.orderListHandle.bind(controller);
    this.checkoutDetail = controller.getOrderDetail.bind(controller)
    // this.getCurrent = controller.getCurrentOrder.bind(controller)
  }
  componentWillMount(){
  
  }
  componentDidMount(){
    const {pairIdMsg} = this.props;
    let orderStatus = [];
    this.props.type === 'orderHistory' && (orderStatus = [1,2,3,4,5,6]) && (this.setState({orderStatus}));
    this.props.type === 'orderDeal' && (orderStatus = [1,2,5,6]) && (this.setState({orderStatus}));
    let params = {
      orderCurrent:{
        idArray:this.state.idArray, orderType: this.state.orderType, hideOther: this.state.hideOther},
      orderHistory:{
        idArray:this.state.idArray, orderType: this.state.orderType, orderStatus, startTime: this.state.startTime, endTime: this.state.endTime, page: this.state.page, pageSize: this.state.pageSize
      },
    };
    params.orderDeal = params.orderHistory;
    this.orderListHandle(this.props.type, params[this.props.type]);
    let coinArray = pairIdMsg.pairIdCoin && Object.keys(pairIdMsg.pairIdCoin);
    let marketArray = pairIdMsg.pairIdMarket && Object.keys(pairIdMsg.pairIdMarket);
    marketArray && marketArray.unshift('全部');
    coinArray && coinArray.unshift('全部');
    this.setState({
      coinArray ,
      marketArray
    })
  }
  hideReset(e){
    let orderStatus = e.target.checked ? [1,2,4,5,6] : [1,2,3,4,5,6];
    let params = {
      orderCurrent:{
        idArray:this.state.idArray, orderType: this.state.orderType, hideOther: this.state.hideOther},
      orderHistory:{
        idArray:this.state.idArray, orderType: this.state.orderType, orderStatus: orderStatus, startTime: this.state.startTime, endTime: this.state.endTime, page: this.state.page, pageSize: this.state.pageSize
      }
    };
    this.setState(
        {orderStatus}
    );
    this.orderListHandle(this.props.type, params[this.props.type])
  }
  changeCoin(e){
    const {pairIdMsg} = this.props;
    let marketArray = [];
    let coinValue = (e === '全部' || e=== 'all') ? '' : e;
    let marketValue = (this.state.marketSelect === '全部') ? '' : this.state.marketSelect;
    let idArray = [];
    let hideOther = 1;
    if(coinValue){
      marketArray = pairIdMsg.pairNameCoin[coinValue];
      marketArray.unshift('全部');
      marketValue && (idArray.push(pairIdMsg.pairIdCoin[coinValue][marketValue]))  || (idArray = Object.values(pairIdMsg.pairIdCoin[coinValue])) ;
    }
    else{
      marketValue && (idArray = Object.values(pairIdMsg.pairIdMarket[marketValue])) && (marketArray = pairIdMsg.pairNameMarket[marketValue] && (marketArray.unshift('全部'))) || ((idArray = []) &&(hideOther = 0) && (marketArray = pairIdMsg.pairIdMarket && Object.keys(pairIdMsg.pairIdMarket)) && (marketArray.unshift('全部')))
    }
    this.setState(
        {
          marketArray,
          idArray,
          coinSelect: coinValue,
          hideOther
        }
    )
  }
  changeMarket(e){
    const {pairIdMsg} = this.props;
    let coinArray = [];
    let marketValue = (e === '全部' || e=== 'all') ? '' : e;
    let coinValue = (this.state.coinSelect === '全部') ? '' : this.state.coinSelect;
    let idArray = [];
    let hideOther = 1;
    if(marketValue){
      coinArray = pairIdMsg.pairNameMarket[marketValue];
      coinArray.unshift('全部');
      coinValue && (idArray.push(pairIdMsg.pairIdMarket[marketValue][coinValue]))  || (idArray = Object.values(pairIdMsg.pairIdMarket[marketValue])) ;
    }
    else{
      coinValue && (idArray = Object.values(pairIdMsg.pairIdCoin[coinValue])) && (coinArray = pairIdMsg.pairNameCoin[coinValue] && (coinArray.unshift('全部'))) || ((idArray = []) && (hideOther = 0) && (coinArray = pairIdMsg.pairIdCoin && Object.keys(pairIdMsg.pairIdCoin)) && (coinArray.unshift('全部')))
    }
    this.setState(
        {
          coinArray,
          idArray,
          marketSelect: marketValue,
          hideOther
        }
    )
  }
  changeOrderType(e){
    const typeObj = {
      '全部': 2,
      '买入': 0,
      '卖出': 1,
    }
    this.setState(
        {orderType: typeObj[e]}
    )
  }
  searchFilter(){
    const params = {
      orderCurrent:{
        idArray:this.state.idArray, orderType: this.state.orderType, hideOther: this.state.hideOther},
      orderHistory:{
        idArray:this.state.idArray, orderType: this.state.orderType, orderStatus: this.state.orderStatus, startTime: this.state.startTime, endTime: this.state.endTime, page: this.state.page, pageSize: this.state.pageSize
      }
    };
       this.props.type === 'orderCurrent' && this.orderListHandle(this.props.type, params[this.props.type]);
       this.props.type !== 'orderCurrent' && this.orderListHandle(this.props.type, params[this.props.type])
  }
  startTime(e){
    this.setState({
      startTime: e
    })
  }
  endTime(e){
    this.setState({
      endTime: e
    })
  }
  checkoutDetail(id){
    this.setState({
      orderId: id
    })
  }
  render() {
    const {type} = this.props;
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
                onSelect = {(e) => this.changeCoin(e)}
                valueArr={this.state.coinArray}
            />
            <em>/</em>
            <SelectButton
                title="全部"
                type="main"
                className="select"
                onSelect = {(e) => this.changeMarket(e)}
                valueArr={this.state.marketArray}
            />
          </li>
          <li>
            <span>类型</span>
            <SelectButton
                title="全部"
                type="main"
                className="select"
                valueArr={["全部", "买入",  "卖出"]}
                onSelect={(e) => this.changeOrderType(e)}
            />
          </li>
          {type !== 'orderCurrent' && <li className='data-filter'>
           <DatePicker onChangeStart={(e) => this.startTime(e)} onChangeEnd={(e) => this.endTime(e)}/>
         </li>}
          <li className='filter-handle'>
            <Button type="base" title="搜索" className="search" onClick={this.searchFilter.bind(this)}/>
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
                  {type === 'orderCurrent' &&  <td>撤销</td> || type === 'orderHistory' && <td onClick={this.checkoutDetail.bind(this, v.orderId)}>详情</td>}
                 
                </tr>
            )
          })}
          </tbody>
        </table>
        <div className='history-order-detail'>
          <div className='history-order-detail-content'>
          
          </div>
        </div>
      </div>
  )
  }
}