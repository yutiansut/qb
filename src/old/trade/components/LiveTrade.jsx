import React from "react";
import * as utils from "../utils.jsx";
import {observer} from "mobx-react";
import {translate} from "react-i18next";
const isEmpty = require('lodash.isempty');

/**
 * 买卖
 * store = {
 *   market: ""
 *   select: "ALL"
 *   data: [
 *    {price:
 *     vol:
 *     trade_type:}
 *   ]
 * }
 */
@translate(['translations'], {wait: true})
@observer
class LiveTrade extends React.Component {

  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.getPrice = this.getPrice.bind(this);
  }

  selectItem(item, e) {
    e.preventDefault();
    const {store} = this.props;
    store.clickedItem = item;
  }

  getPrice(price) {
    if (!price) {
      return 0;
    }
    const {bankStore, store, confStore} = this.props;
    const rate = bankStore.getRateFromTradePair(store.market, confStore.coinPriceType);
    return parseFloat(price * rate).toFixed(confStore.precision);
  }

  getRecentDealData() {
    const {bankStore, store, confStore, marketStore} = this.props;
    const [tf, tt] = marketStore.TradePair;
    const numberType = confStore.getUnitType().toLowerCase();
    const styleName = confStore.coinPriceType.toLowerCase();
    const dealData = bankStore.recentDealData.CNY && bankStore.recentDealData[confStore.getUnit(utils.market(store.market))][tf];
    return <td colSpan={4} style={{verticalAlign: 'middle', textAlign: 'center'}}>{ dealData && dealData.format({number:numberType, style:{name:styleName}})}</td>

  }
  // get tableLimited(){
  //   const {store} = this.props;
  //   if(store.select === 'ALL'){
  //     return {ALL: 26}
  //   }
  // }

  render() {
    const {t, store, confStore, eClicentHeight, bankStore} = this.props;
    // console.log(t, store, confStore)
    let sellArray = [],buyArray = [];
    store.SData.map((v) => {
      if(v.trade_type === 'SELL'){
        sellArray.push(v)
      }
      else{
        buyArray.push(v)
      }
    });
    sellArray.reverse();

    if (!store.market) {
      return <div></div>
    }
    return <div className="mix-dark mix-resting">
      <div className="d-flex flex-row header live-nav">
        <span onClick={store.ChangeTradeType.bind(store, 'ALL')}
              className={store.select === "ALL" ? 'active' : null}
        >{t('买/卖')}</span>
        <span onClick={store.ChangeTradeType.bind(store, 'BUY')}
              className={store.select === "BUY" ? 'active' : null}
        >{t('买入')}</span>

        <span onClick={store.ChangeTradeType.bind(store, 'SELL')}
              className={store.select === "SELL" ? 'active' : null}
        >{t('卖出')}</span>
      </div>
      <div className="card-body">
        <table className="table table-hover table-sm borderless live-table" style={{marginBottom : '0', height:'100%'}}>
          <thead>
          <tr>
            <th scope="col to-pointer" colSpan="2" style={{textIndent:'7%',minWidth:'85px'}}>{t('价格')}({confStore.getUnit(utils.market(store.market))})</th>
            <th scope="col to-pointer" style={{minWidth:'75px'}}>{t('数量')}({utils.trade(store.market)})</th>
            <th scope="col to-pointer" style={{minWidth:'100px'}}>{t('成交额')}({confStore.getUnit(utils.market(store.market))})</th>
          </tr>
          </thead>
          <tbody className={`sell-table tbody-not${store.select !== 'BUY' ? '' : '-select'} `} style={{height:eClicentHeight * 0.96 * 0.948 * 0.88 / 2, overflow:'hidden'}}>
          <tr style={{height:`${(store.select === 'ALL' && sellArray.length < 14)? (13-sellArray.length) * eClicentHeight * 0.96 * 0.948 * 0.88 / 26 : 0}px`}} id='none_content'><td colSpan="4"></td></tr>
          {sellArray.map((item, index) => (index + 13 >= sellArray.length) && store.select === "ALL" && (<LiveTradeItem key={index}
                                                           bankStore={bankStore}
                                                           onClick={this.selectItem.bind(this, item)}
                                                           price={this.getPrice(item.price)}
                                                           number={index}
                                                           store={store}
                                                           length={sellArray.length}
                                                           eClicentHeight={eClicentHeight}
                                                           select={store.select}
                                                           confStore={confStore}
                                                           item={item}/>))}
          {sellArray.map((item, index) => (index + 26 >= sellArray.length) && store.select === "SELL" && (<LiveTradeItem key={index}
                                                           bankStore={bankStore}
                                                           onClick={this.selectItem.bind(this, item)}
                                                           price={this.getPrice(item.price)}
                                                           number={index}
                                                           store={store}
                                                           length={sellArray.length}
                                                           eClicentHeight={eClicentHeight}
                                                           select={store.select}
                                                           confStore={confStore}
                                                           item={item}/>))}

          </tbody>
          <tbody>
          <tr className="last-deal" style={{height:eClicentHeight * 0.96 * 0.948 * 0.12 -10}}>
            {this.getRecentDealData()}
          </tr>
          </tbody>

          <tbody className={`buy-table tbody-not${store.select !== 'SELL' ? '' : '-select'} `} style={{height:eClicentHeight * 0.96 * 0.948 * 0.88 / 2, overflow:'hidden'}}>
          {buyArray.map((item, index) => index < 13 && store.select === "ALL" && (<LiveTradeItem key={index}
                                                        bankStore={bankStore}
                                                        onClick={this.selectItem.bind(this, item)}
                                                        price={this.getPrice(item.price)}
                                                        number={index}
                                                        store={store}
                                                        select={store.select}
                                                        confStore={confStore}
                                                        eClicentHeight={eClicentHeight}
                                                        item={item}/>))}
          {buyArray.map((item, index) => index < 26 && store.select === "BUY" && (<LiveTradeItem key={index}
                                                        bankStore={bankStore}
                                                        onClick={this.selectItem.bind(this, item)}
                                                        price={this.getPrice(item.price)}
                                                        number={index}
                                                        store={store}
                                                        select={store.select}
                                                        confStore={confStore}
                                                        eClicentHeight={eClicentHeight}
                                                        item={item}/>))}
          </tbody>
        </table>
      </div>
    </div>
  }

}

/**
 * item = {
     *   type: sell/buy
     *   price: ,
     *   vol: '',
     * }
 */
@translate(['translations'], {wait: true})
@observer
class LiveTradeItem extends React.Component {
  constructor(props){
    super(props);
    const {item} = this.props;
    this.state = {volValue: item.vol}
  }
  render() {
    const {item, select, number, length, confStore, t, bankStore, store}= this.props;
    const numberType = confStore.getUnitType().toLowerCase();
    const styleName = confStore.coinPriceType.toLowerCase();
    const eClicentHeight = this.props.eClicentHeight;
    let that = this;
    let changeClass = function () {
      let value = that.state.volValue;
      if(item.vol !== value){
        // that.setState({volValue: item.vol});
        return 'Changing'
      }
      return 'nn'
    };

    let tableFunc = function () {
      if(select === 'ALL' && length - number > 13){
        return 'none1'
      }
      if(select !== 'ALL' && length - number > 26){
        return 'none1'
      }
      return ''
    }
    return <tr className={`to-pointer ${tableFunc()} ${changeClass()}`} onClick={this.props.onClick} style={{height:eClicentHeight * 0.96 * 0.948 * 0.88 / 26}}>
      {/*<tr className='to-pointer' onClick={this.props.onClick} style={{height:eClicentHeight * 0.96 * 0.948 * 0.88 / 26, display:  this.props.length - this.props.number > 13 ? 'none' : ''}}>*/}
      <td className='pointer'>{item.trade_type === 'BUY' && t('买') || t('卖')}
      {item.trade_type === 'BUY' && this.props.number + 1 || this.props.length - this.props.number }</td>
      <td className="pointer">
        <span
          className={"deep-font " + (item.trade_type === 'BUY' ? "stock-buy" : "stock-sell")}>
          {Number(this.props.price).format({number:numberType, style:{name:styleName}})}
        </span>
      </td>
      <td className="pointer"><span className="deep-font">
        {Number(item.vol).formatFixNumberForAmount(bankStore.recentDealData['CNY'] && bankStore.recentDealData['CNY'][store.coin])}
      </span></td>
    <td className="pointer"><span className="deep-font">{(this.props.price * item.vol).format({number:'property', style:{name:styleName}})}</span></td>
    </tr>
  }
}

export default LiveTrade
