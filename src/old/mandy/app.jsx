import React from 'react';
import {observer} from "mobx-react/index";
import './app.css';
// import {Switch} from 'rctui';
import StockStore from "./store/stockStore.jsx";


const _ = require('lodash');
const stockstore =  new StockStore(conf.editUrl, {
  headers: {"X-CSRFToken": conf.csrfToken},
  CoinInfo: conf.CoinInfo,
});

@observer
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  getCatOption(e) {
    return e.map((p) => {
      return <option key={p.name} value={p.id}>
        {p.name.toUpperCase()}
      </option>
    });
  }

  filterCoinType(e) {
    // 搜索币种, 三种搜索相互独立
    // key:币种 key:全部  all ,其他key为coin.id
    const {store} = this.props;
    const me = $(e.target);
    const selected = me.find('option:selected');
    const selectedValue = selected.attr('value');
    console.log('filterCoinType selected',selectedValue);
    store.post(JSON.stringify({
      'act': 'coin_name',
      'value': selectedValue,
    }));
    console.log(store.CoinInfo)
  }

  resetEl(e){
    const cointypeEl = $('#coin-type');
    const statusEl = $('#status');
    const actEl = $('input[name="status"]');
    cointypeEl.selectedIndex = 'all';
    statusEl.selectedIndex = 'all';
    statusEl.reset();
    actEl.reset();

  }

  filterActType(e){
    // key 下架状态: 全部 all ,下架为0 上架为1
    const {store} = this.props;
    const me = $(e.target);
    const checked = me.parent().find('input:checked');
    const checkedValue = [];
    //reset
    this.resetEl();
    $.each(checked,function (index,obj) {
      checkedValue.push(obj.id)
    });
    console.log('filterActType checked',checkedValue);
    store.post(JSON.stringify({
      'act': 'act',
      'value': checkedValue,
    }))
  }

  filterDelisted(e){
    // key 操作状态 多选 value: ['can_withdraw','can_charge','can_deal']
    const {store} = this.props;
    const me = $(e.target);
    const checked = me.find('option:selected');
    const checkedValue = checked.attr('value');
    console.log('filterCoinType selected',checkedValue);
    store.post(JSON.stringify({
      'act': 'delisted',
      'value': checkedValue,
    }))
  }
  // componentWillMount() {
  //   this.getStockList();
  // }

  getTdContent() {
    const {store} = this.props;
    const e = store.CoinInfo;
    return e.map((p) => {
      return <CoinSettings store={store} data={p}
                           key={p.name}/>
    });
  }

  render() {
    const {store} = this.props;
    // const CoinInfo = coinInfo || store.coinList;
    // store['CoinInfo'] = CoinInfo;
    const tdContent = this.getTdContent();
    const OptionContent = this.getCatOption(store.CoinInfo);

    return <div className="col-md-12 column left-border">
      <div className='row'>
        <ul className="search-bar">
          <li>
            <span>币种</span>
            <select name="coin-type" id="coin-type" onChange={this.filterCoinType.bind(this)}>
              <option value="all">全部</option>
              {OptionContent}
            </select>
          </li>
          <li>
            <span>下架状态</span>
            <select name="status" id="status" onChange={this.filterDelisted.bind(this)}>
              <option value="all">全部</option>
              <option value="on">上架</option>
              <option value="off">下架</option>
            </select>
          </li>
          <li>
            <span>操作状态:  </span>
            <input type="checkbox" id="can_charge" name="act" onChange={this.filterActType.bind(this)}/>
            <label htmlFor={"can_charge"}>充币</label>
            <input type="checkbox" id="can_withdraw" name="act" onChange={this.filterActType.bind(this)}/>
            <label htmlFor={"can_withdraw"}>提币</label>
            <input type="checkbox" id="can_deal" name="act" onChange={this.filterActType.bind(this)}/>
            <label htmlFor={"can_deal"}>交易</label>
          </li>
        </ul>
      </div>
      <table className="table table-bordered table-condensed">
        <thead>
        <tr>
          <th>币种</th>
          <th>全称</th>
          <th>下架状态</th>
          <th>操作状态</th>
        </tr>
        </thead>
        <tbody>
        {tdContent}
        </tbody>
      </table>
    </div>
  }
}


class CoinSettings extends React.Component {
  constructor(props) {
    super(props);
    const {store} = this.props;
    const {data} = this.props;
  }

  changeStatus(e) {
    const store = this.props.store;
    const me = $(e.target);
    const tr = me.parents('tr');
    const act = me.attr('name');
    console.log('tr', tr);
    const coinName = tr.data('name');
    console.log('coinName', coinName);
    const checkedStatus = me.is(':checked');
    store.post(JSON.stringify({
      'coinname': coinName,
      'act': act,
      'value': checkedStatus,
    }));
  }


  render() {
    const p = this.props.data;
    const key = this.props.key;
    return (
      <tr data-name={p.name}>
        <td className="td">{p.name.toUpperCase()}</td>
        <td className="td">{p.fullname}</td>
        <td className="td">
          {/*<Switch text="Yes|No" />*/}
          <input type="checkbox" defaultChecked={p.delisted} value={p.delisted ? 1 : 0} id='delisted' name='delisted'
                 onChange={this.changeStatus.bind(this)}/>
          {/*{p.delisted ?'true':'false'}*/}
        </td>
        <td className="td">
          {/*<CheckboxGroup className="can_charge" />*/}
          <span>
          <input type="checkbox" defaultChecked={p.can_charge} value={p.can_charge ? 1 : 0} name='can_charge'
                 id='act' onChange={this.changeStatus.bind(this)}/>充币
          </span>
          <span>
          <input type="checkbox" defaultChecked={p.can_withdraw} value={p.can_withdraw ? 1 : 0} name='can_withdraw'
                 id='act' onChange={this.changeStatus.bind(this)}/> 提币
          </span>
          <span>
          <input type="checkbox" defaultChecked={p.can_deal} value={p.can_deal ? 1 : 0} name='can_deal' id='act'
                 onChange={this.changeStatus.bind(this)}/> 交易
          </span>
        </td>
      </tr>
    )
  }
}


export default App
