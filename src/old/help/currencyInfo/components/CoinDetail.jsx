import React from 'react';
import {observer} from "mobx-react";
import {translate} from "react-i18next";


@translate(['translations'], {wait: true})
@observer
class CoinDetail extends React.Component{
  constructor(props) {
    super(props);
    this.setField = this.setField.bind(this);
    this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
      const info = this.props.info;
      const store = this.props.store;
      if (info === 'True') {
        store.priceUsd=this.props.currency.data.price.usd.format({number:'legal',style:{name:'usd'}});   //美元单价
        store.priceCny=this.props.currency.data.price.cny.format({number:'legal',style:{name:'cny'}});   //人民币单价
        store.circulationVolume=this.props.currency.data.circulationVolume.format();    //流通总量
        store.totalVolume=this.props.currency.data.totalVolume.format();    //发行总量
        store.totalValueUsd=this.props.currency.data.totalValue.usd.format({style:{name:'usd'}});   //美元总市值
        store.totalValueCny=this.props.currency.data.totalValue.cny.format({style:{name:'cny'}});   //人民币总市值
        store.codeName=this.props.currency.data.name;   //货币简称
        store.codeFullName=this.props.currency.data.enName;   //货币全称
        store.releaseTime=this.props.currency.data.releaseTime.toDate('yyyy-MM-dd');   //货币发行时间
        store.releasePriceUsd=this.props.currency.data.icoPrice.usd.format({number:'legal',style:{name:'usd'}});   //美元发行单价
        store.releasePriceCny=this.props.currency.data.icoPrice.cny.format({number:'legal',style:{name:'cny'}});   //人民币发行单价
        // coin abstract information
        store.description=this.props.currency.data.description;   //货币简介
        store.webSite=this.props.currency.data.webSite;   //官网
        store.whitePaper=this.props.currency.data.whitePaper;   //白皮书
        store.blockSites=this.props.currency.data.blockSites;   //区块浏览器
      }
    }
  // get current selected coin
  setField(field, e) {
    e.preventDefault();
    const {store} = this.props;
    store[field] = e.target.value;
  }
  // click to show charge page
  handleClick(name,e) {
    e.preventDefault();
    const path = `/wallet/charge/?cat=${name.toLowerCase()}`;
    browserHistory.push(path)
  }
  // get alternative trade pair
  get expected() {
    const {store} = this.props;
    let expected = [];
    if (true) {
      store.tradeList.map(i => {
          expected.push(i)
      })
    }
    return expected
  }

    render(){
      const {store} = this.props;
      const {t, i18n} = this.props;
        if (store.codeName === 'CRT') {
          return (
            <div className="coin_info">
              <div className="row">
                <div className="col-sm-1" >
                  <img
                    className="coin-img"
                    src={"/static/img/coins/bigger/"+store.codeName.toLowerCase()+".png"}
                    alt={store.codeName}
                    title={store.codeName}
                  />
                </div>
                <div className="col-sm-4 coin-detail" >
                  <dl>
                    <dd className="coin-info currency-name mix-title-font">{store.codeName}({store.codeFullName})</dd>
                  </dl>
                </div>
                <div className="col-sm-3 coin-detail" >
                  <dl className="navList">
                    <dd className="coin-info coin-line1 mix-title-font">{t('发行总量')}：{store.totalVolume}</dd>
                    <dd className="coin-info coin-line2 mix-title-font">{t('发行日期')}：{store.releaseTime}</dd>
                  </dl>
                </div>
                <div className="col-sm-3 coin-detail" >
                  <dl className="navList">
                    <dd id="circulation-volume" className="coin-info coin-line1 mix-title-font">
                      {t('流通量')}：{store.circulationVolume}
                    </dd>
                  </dl>
                </div>
                <div className="col-sm-7 coin2coin" >
                  <ul className="coin-trade-head">
                    <li className="coin-trade-title coin-info mix-title-font"></li>
                  </ul>
                </div>
              </div>
            </div>)
        }else if (this.props.info === 'False') {
          return (
            <div className="currency-detail">
              <p className="empty"><i className="fa fa-info-circle">{t('暂无该币种信息')}</i> </p>
            </div>)
        }else {
          return (
            <div className="coin_info">
            <div className="row">
              <div className="col-sm-1" >
                <img
                  className="coin-img"
                  src={"/static/img/coins/currency-coin/"+store.codeName.toLowerCase()+".png"}
                  alt={store.codeName}
                  title={store.codeName}
                />
              </div>
              <div className="col-sm-2 coin-detail" style={{paddingRight:0}}>
                <dl>
                  <dd className="coin-info currency-name mix-title-font">{store.codeName}({store.codeFullName})</dd>
                  <dd id="id-price">
                    {(store.changePrice === "USD")?store.priceUsd:store.priceCny}
                  </dd>
                  <dd>
                    <a className="go-charge mix-title-font" href={this.props.charge+"?cat="+`${store.codeName.toLowerCase()}`}>{t('去充值')}</a>
                  </dd>
                </dl>
              </div>
              <div className="col-sm-3 coin-detail" >
                <dl className="navList">
                  <dd id="total-value" className="coin-info coin-line1 mix-title-font">
                    {t('市值')}：{(store.changePrice === "USD")?store.totalValueUsd:store.totalValueCny}
                  </dd>
                  <dd id="coin-price" className="coin-info coin-line2 mix-title-font">
                    {t('发行价格')}：{(store.changePrice === "USD")?store.releasePriceUsd:store.releasePriceCny}
                  </dd>
                </dl>
              </div>
              <div className="col-sm-3 coin-detail" >
                <dl className="navList">
                  <dd className="coin-info coin-line1 mix-title-font">{t('发行总量')}：{store.totalVolume}</dd>
                  <dd className="coin-info coin-line2 mix-title-font">{t('发行日期')}：{store.releaseTime}</dd>
                </dl>
              </div>
              <div className="col-sm-3 coin-detail" style={{width:230}}>
                <dl className="navList">
                  <dd id="circulation-volume" className="coin-info coin-line1 mix-title-font">
                    {t('流通量')}：{store.circulationVolume}
                  </dd>
                </dl>
              </div>
              <div className="col-sm-7 coin2coin" >
                <ul className="coin-trade-head">
                  <li className="coin-trade-title coin-info mix-title-font">{t('去交易')}：</li>
                  {this.expected.map((i, index)=> (
                    <a className="coin-trade-list"
                       href={this.props.trade+'?coin='+`${(i.toLowerCase()).split("/")[0]}`+'&market='+`${(i.toLowerCase()).split("/")[1]}`}
                       key={index}>
                      {i}
                    </a>))}
                </ul>
              </div>
            </div>
          </div>)
        }
    }
 }

export default CoinDetail
