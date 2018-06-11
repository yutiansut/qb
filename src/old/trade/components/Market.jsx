import React from "react";
import {observer} from "mobx-react";
import {translate} from 'react-i18next';
// import '../../common/prototype/prototype.js';

/**
 * 市场 e.g.: 收藏/BTC/USD
 */
@translate(['translations'], {wait: true})
@observer
class Market extends React.Component {
  constructor(props) {
    super(props);
    this.ChangeMarket = this.ChangeMarket.bind(this);
    this.renderOrderIcon = this.renderOrderIcon.bind(this);
    this.renderCoinInfo = this.renderCoinInfo.bind(this);
    const {store} = this.props;
    this.state={searchShow: false, itemActive:'BTC'};
    store.get();
  }

  renderCoinInfo(tf, tt) {
    const {store, confStore, bankStore} = this.props;
    const numberType = confStore.getUnitType().toLowerCase();
    // const rate = store.bankStore.getRate(tf, tt);
    // const rateLC = bankStore.getRate(tt, conf.languageCode);
    const rateF =  bankStore.recentDealData.CNY && bankStore.recentDealData[tt.toUpperCase()][tf];
    const rateT =  bankStore.recentDealData.CNY && bankStore.recentDealData[confStore.language][tt];


    //console.log(rate,parseFloat(rate * rateLC),conf.languageCode,conf.languageCode.toLowerCase())
    // return <p>{rateF && rateF.format({number:numberType})} ≈ {parseFloat(rate * rateLC).format({number:'legal', style:{name:conf.languageCode.toLowerCase()}})}</p>/
    return <p>{rateF && rateF.format({number:numberType})} ≈ {rateT && Number(rateF * rateT).format({number:'legal', style:{name:conf.languageCode.toLowerCase()}})}</p>
  }

  /**
   * 选择交易市场.
   * @param market
   */
  ChangeMarket(market, e) {
    const store = this.props.store;
    this.setState({itemActive: market});
    store.market = market;
    store.tradePair = store.OrderData[0].id
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

  get renderMarketNav() {
    const {store} = this.props;
    return store.Market.map((key, index) => {
      if(conf.userWspk === '' && index === 0)
        return
      return (
        <span key={index}
              className={store.market === key ? "active item d-flex justify-content-center " : "item d-flex justify-content-center"}
              onClick={this.ChangeMarket.bind(this, key)} style={{cursor:'pointer'}}>{key}</span>

      )}
    );
  }
  getSearch(){
    const store = this.props.store;
    let showControl = this.state.searchShow;
    showControl &&  (this.refs.marketS.value = '');
    this.setState({searchShow: !showControl});
    showControl && (store.market = this.state.itemActive)
  }
  getEnter(e){
    const store = this.props.store;
    let showControl = this.state.searchShow;
    console.log('store.searchEnter', store.searchEnter)
    if(!store.searchEnter){
      return
    }
    if(e.keyCode === 13){
      store.tradePair = store.searchEnter;
      store.market = store.searchEnter.split('_')[1].toUpperCase();
      this.setState({itemActive: store.tradePair.split('_')[1].toUpperCase()});
      e.target.value = '';
      this.setState({searchShow: !showControl});
      }
    }
  render() {
    /*
    数据绑定部分
    store.data = {
      "USD": ["btc_usd", "bch_usd", "eth_usd"],
      "BTC": ["eth_btc", "bch_btc", "lsk_btc"]
    }
    <div className="mix-vol-w to-pointer mix-market-title"
         onClick={store.changeOrder.bind(store, store.ORDER.VOL)}>{t('交易量')}{this.renderOrderIcon(store.ORDER.VOL)}</div>

     */
    // onChange={store.hdSearch.bind(store)}

    const {t, i18n} = this.props;
    const {store, bankStore, confStore, sameHeight} = this.props;
    const [tf, tt] = store.TradePair;
    const tradePairStore = this.props.tradePairStore;
    if (!store.tradePair) {
      return <div style={{height: sameHeight,background:'#191F28'}}></div>
    }
    return <div className="mix-dark mb-1 d-flex flex-column mix-market" style={{height: store.klineHeight || sameHeight }}>
      {/*币种资料*/}
      <div className="market-currency" style={{height: '29%'}}>
        <div className="market-currency-intro">
          <img src={`/static/img/coins/currency-coin/${tf.toLowerCase()}.png`} alt=""/>
          <span>{`${tf.toUpperCase()}/${tt.toUpperCase()}`}</span>
          <a href={`${tradePairStore.info_url}?search=${tf.toUpperCase()}`} target="_blank">{t('币种资料')}</a>
        </div>
        <div className="market-deal">{this.renderCoinInfo(tf, tt)}</div>
      </div>
      <div className="d-flex flex-row mix-market-nav" style={{height:'6%'}}>
        {this.renderMarketNav}
        <span className='market-nav-search' onClick={this.getSearch.bind(this)}><i></i></span>
        <span className='market-search-input' style={{display:this.state.searchShow ? 'block' : 'none'}}><i onClick={this.getSearch.bind(this)}></i><input type="text"  onChange={store.hdSearch.bind(store)} onKeyDown={this.getEnter.bind(this) } ref='marketS'/><em onClick={this.getSearch.bind(this)}></em></span>
      </div>

      {/*交易对*/}
      <div className="d-flex flex-column mix-market-content" style={{height:'65%'}}>
        <div className="d-flex flex-row" style={{padding:'0 12px',height:'12%', alignItems:'center'}}>
          <div className="mix-market-w">{t('市场')}</div>
          <div className="mix-price-w to-pointer mix-market-title"
               onClick={store.changeOrder.bind(store, store.ORDER.PRICE)}>{t('最新价格')}{this.renderOrderIcon(store.ORDER.PRICE)}</div>
          <div className="mix-updown-w to-pointer mix-market-title"
               onClick={store.changeOrder.bind(store, store.ORDER.UPDOWN)}>{t('日涨跌')}{this.renderOrderIcon(store.ORDER.UPDOWN)}</div>
        </div>
        <div className="d-flex flex-column" style={{height:'88%'}}>
          {store.OrderData.map((value, index) => (
            <MarketItem key={index}
                        item={value}
                        store={store}
                        bankStore={bankStore}
                        confStore={confStore}
                        marketStore={store}
            />
          ))}
        </div>
      </div>
    </div>
  }
}

/**
 * 市场交易对 e.g.: BTC/USD
 */
@translate(['translations'], {wait: true})
@observer
class MarketItem extends React.Component {
  constructor(props) {
    super(props);
    this.selectTradePair = this.selectTradePair.bind(this);
    this.getActive = this.getActive.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.collectPair = this.collectPair.bind(this);
  }

  getActive(tp) {
    const {store} = this.props;
    if (store.tradePair === tp) {
      return 'active';
    }
    return '';
  }

  selectTradePair(tp, e) {
    e.preventDefault();
    const {store} = this.props;
    // console.log('tp',tp)
    store.tradePair = tp;
  }

  collectPair(item, e){
    e.stopPropagation()
    e.preventDefault();
    item.is_collected = !item.is_collected;
    const {store} = this.props;
    store.hdStar(item)
  }


  get renderStar() {
    const item_obj = this.props.item;
    if(conf.userWspk === '')
      return
    if (item_obj.is_collected) {
      return <i className="fa fa-star mix-market-content-star-collected" aria-hidden="true"></i>

    }
    return <i className="fa fa-star-o mix-market-content-star" aria-hidden="true"></i>
  }

  get renderColor() {
    const item_obj = this.props.item;
    const upDown = item_obj.updown_value;
    if (parseFloat(upDown) > 0) {
      return 'mix-blue';
    }
    if (parseFloat(upDown) < 0) {
      return 'mix-red';
    }
    return '';
  }

  getPrice(price) {
    if (!price) {
      return 0;
    }
    const {bankStore, store, confStore} = this.props;
    const rate = bankStore.getRateFromTradePair(store.tradePair, confStore.coinPriceType);
    //console.log(confStore.precision)
    return price * rate;
  }

//    <div className="mix-vol-w">{Number(item_obj.vol || 0).toFixed()}</div>
  render() {
    const {t} = this.props;
    const item_obj = this.props.item;
    const confStore = this.props.confStore;
    const numberType = confStore.getUnitType().toLowerCase();
    const styleName = confStore.coinPriceType.toLowerCase();
    // console.log('styleName', styleName)
    // console.log('markets', numberType, Number(this.getPrice(item_obj.last)), Number(this.getPrice(item_obj.last)).format({number:numberType}))
    return <div className={`d-flex flex-row mix-item-m ${this.getActive(item_obj.id)} `}
                onClick={this.selectTradePair.bind(this, item_obj.id)} >
      <div className="mix-market-w to-pointer" style={{color:'rgba(255,255,255,1)'}}>{item_obj.display}</div>
      <div
        className={`mix-price-w ${this.renderColor}`}>{Number(this.getPrice(item_obj.last)).format({number:numberType , style:{name:styleName}})}</div>
      <div className={`mix-updown-w ${this.renderColor}`}>
        <span>{item_obj.updown_value ? item_obj.updown_value.toPercent(2) : 0}</span></div>
      <div className="" onClick={this.collectPair.bind(this,item_obj)} style={{position: 'relative', left:'8px'}}>{this.renderStar} </div>
      <div className="mix-volume-w">
        {t("交易量")}:{Number(item_obj.vol || 0).format({number:'digital'})}
      </div>
    </div>
  }
}


export default Market
