import {observer} from "mobx-react";
import React from "react";
import EchartsLine from "./echartsLine.jsx";
import {translate} from "react-i18next";

@translate(['translations'], {wait: true})
@observer
class HomeMarketComponent extends React.Component {
  constructor(props) {
    super(props);
  };

  marketSort(v, i) {
    const {store} = this.props;
    if (!v.sortable)
      return;
    store.sortNumClickA = i;
    store.sortNumClickD = i;
    let sortDescending = true;//降序
    if (store.defaultSort !== v.sortKey) {
      sortDescending = true;
      store.sortAscending = false;
      store.defaultSort = v.sortKey;
    }
    else {
      store.sortAscending = !store.sortAscending;
      sortDescending = !store.sortAscending
    }
    store.data = store.marketData.sort((a, b) => {
      let first = Number(a[v.sortKey] || 0);
      let second = Number(b[v.sortKey] || 0);
      if(first === second) {
        return a.money - b.money;
      }
      if (store.sortAscending) {
        v.asec = true;
        v.desc = false;
        return first - second;
      }
      if (sortDescending) {
        v.asec = false;
        v.desc = true;
        return second - first;
      }
    })
  }

  get marketSearch() {
    const {store} = this.props;
    return (
      <li className="market-search">
        <input type="text" onChange={this.getSearchValue.bind(this)} style={{paddingLeft:"5px"}}/>
        <i onClick={this.searchPair.bind(this)}> </i>
      </li>
    )
  }

  get marketTitle() {
    const {store} = this.props;
    const {t} = this.props;
    return (
      store.marketTitleItems.map((v, i) => <th onClick={this.marketSort.bind(this, v, i)} key={i}>{t(`${v.name}`)}{v.sortable && <span className="sort-arrow">
          <span className="sort-arrow-up">
            {(store.sortNumClickA === i && v.asec) && <img src="/static/img/commonImg/up_lan.svg" alt=""/>}
            <img src="/static/img/commonImg/up_icon.svg" alt=""/>
          </span>
          <span className="sort-arrow-down">
            {(store.sortNumClickD === i && v.desc) && <img src="/static/img/commonImg/down_lan.svg" alt=""/>}
            <img src="/static/img/commonImg/down_icon.svg" alt=""/>
          </span>
        </span>}</th>)
    )
  }

  componentDidMount() {
    const {store} = this.props;
    store.get({market_index: store.marketSelected});

  }

  getSearchValue(e) {
    const {store} = this.props;
    store.searchContent = e.target.value
  }

  searchPair() {
    const {store} = this.props;
    store.get({market_index: store.marketSelected, search: store.searchContent})
  }

  marketSelectedChange(v) {
    const {store} = this.props;
    store.sortAscending = true;
    store.sortNumClickA = 0;
    store.sortNumClickD = 0;
    store.marketSelected = v.id;
    store.get({market_index: store.marketSelected});
  }

  active(v) {
    const {store} = this.props;
    return (store.marketSelected === v.id) ? 'all-markets-navItem-active' : ''
  }

  changeCollection(v, i) {
    const {store} = this.props;
    v.is_collect = !v.is_collect;
    if(!v.is_collect && store.marketSelected === -1) {
      store.marketData.splice(i,1)
    }
    let xhr = new XMLHttpRequest();
    xhr.open('post', conf.market_url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-CSRFToken",conf.csrf_token);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
//发送请求
    xhr.send(JSON.stringify({tp_id: v.name}));
    xhr.onreadystatechange = function () {
      // 这步为判断服务器是否正确响应
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.log(xhr.responseText);
      }
    };

  }

  collectionShow(v) {
    return v.is_collect ? <img src="/static/img/commonImg/collection.svg" style={{width: '16px', height: '16px'}}/> : <img src="/static/img/commonImg/collection_no.svg" style={{width: '16px', height: '16px'}}/>
  }

  noDataShow(length) {
    const {t} = this.props;
    return <tr className="noDataShow"><td colSpan={conf.user_id === 'None' && length || length+1 } style={{position:'relative'}}> <span className="mix-text-gray" style={{fontSize: '18px',letterSpacing: '0.06px',position:'absolute',bottom:'26px',left:'48%',display:'block',height:'25px',lineHeight:'25px'}}>{t('无数据')}</span> </td></tr>
  }

  render() {
    const {store} = this.props;
    const marketsItem = [{name: '收藏区', id: -1},{name: 'BTC市场', id: 0}, {name: 'ETH市场', id: 3}, {name: 'USDT市场', id: 2},];
    const marketsNav = marketsItem.map((v, index) => {
      const {t} = this.props;
      if(conf.user_id === 'None' && index === 0)
        return;
      return (
        <li className={`all-markets-navItem ${this.active(v)}  mix-title-font`} onClick={this.marketSelectedChange.bind(this, v)} key={index}>{t(`${v.name}`)}</li>
      )
    });
    let homeMarketContent = store.marketData.map((v, i) => {
      return (
        <tr key={i}>
          {conf.user_id !== 'None' && <td onClick={this.changeCollection.bind(this, v, i)}>{this.collectionShow(v)}</td>}
          <td>
            <a href={conf.tradeUrl+'?coin='+`${(v.name.toLowerCase()).split("_")[0]}`+'&market='+`${(v.name.toLowerCase()).split("_")[1]}`}>
              {v.name.split("_").reduce((a, b) => !a && a + b || a + '/' + b, '').toUpperCase()}
              </a>
          </td>
          <td>
            <span className={`${v.raise && (v.raise<0 && "market-text-red" || "market-text-green")}`}>{v.last && Number(v.last).format({number:'digital'}) || 0}</span>
            /
            <span>{conf.languageCode === 'zh-hans' && Number(v.price_to_cny || 0).format({number:'legal',style:{name:'cny'}}) || Number(v.price_to_usd || 0).format({number:'legal',style:{name:'usd'}})}</span>
          </td>
          <td>{v.money && Number(v.money).format() || 0}</td>
          <td>{v.vol && Number(v.vol).format() || 0}</td>
          <td className={`all-markets-updown ${v.updown && (v.updown>0 && "market-arrow-green market-text-green" || "market-arrow-red market-text-red")}`}>{v.updown && v.updown.toPercent() || 0}</td>
          <td>
            <EchartsLine data={v.line} type="table"/>
          </td>
        </tr>
      )
    });
    const {t} = this.props;
    if(!store.marketData.length) {
      homeMarketContent = this.noDataShow(store.marketTitleItems.length)
    }
    return (
      <div className="all-markets">
        <ul className="all-markets-nav">
          {marketsNav}
          {this.marketSearch}
        </ul>
        <table className="all-markets-table">
          <thead className="all-markets-header"><tr>
          {conf.user_id !== 'None' && <th>{t('收藏')}</th>}
          {this.marketTitle}</tr>
          </thead>
          <tbody>
          {homeMarketContent}
          </tbody>
        </table>
      </div>

    )
  }

}


export default HomeMarketComponent
