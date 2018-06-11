import React from 'react';
import {observer} from "mobx-react";
import './tradepair.css';
// import {Switch} from 'rctui';
import trStore from "./../store/trStore.jsx";
import ReactDOM from "react-dom";
import './tradepairRecommend.css';


const trstore = new trStore(conf.editUrl, {
  headers: {"X-CSRFToken": conf.csrfToken},
  trInfo: conf.tradepairRecommend,
  tradepairInfo: conf.tradepairInfo,
});


@observer
class TradepairRecommend extends React.Component {


  getTdContent() {
    const {store} = this.props;
    const e = store.trInfo;
    return [1, 2, 3, 4, 5].map((index, i) => {
      const p = e[index];
      return <EditTradepair store={trstore} index={index} key={p.index}
                            data={p}/>
    });
  }


  render() {
    const {store} = this.props;
    const tdContent = this.getTdContent();

    return <div className="col-md-12 column left-border">

      <table className="table table-bordered table-condensed">
        <thead>
        <tr>
          <th className="text-center">推荐位置</th>
          <th className="text-center">币种</th>
          <th className="text-center">市场</th>
          <th className="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        {tdContent}
        </tbody>
      </table>
    </div>
  }
}


class EditTradepair extends React.Component {
  handleOk = (e) => {
    console.log(e);
    const stock = $('#tr-stock').find('option:selected').data('stock');
    const market = $('#tr-market').find('option:selected').data('market');
    this.postTradepair(stock, market);
  };

  constructor(props) {
    super(props);
    const {store} = this.props;
    const {data} = this.props;
  }

  showModal(p) {
    const {store} = this.props;
    const tradepairs = store.tradepairInfo;
    let stock_options = '';
    const stockKeys = Object.keys(tradepairs);
    stockKeys.forEach(v => {
      if (v == p.stock) {
        stock_options += `<option data-stock="${v}" selected="selected">${v.toUpperCase()}</option>`;
      } else {
        stock_options += `<option data-stock="${v}">${v.toUpperCase()}</option>`;
      }
    });
    const marketOptionSetup = `<option data-market=${p.market}>${p.market.toUpperCase()}</option>`;
    console.log(marketOptionSetup);
    swalMix({
      html: `<div class="tr-stock">币种: <select id="tr-stock">${stock_options }</select></div>
              <div class="tr-market">市场: <select id="tr-market">${marketOptionSetup}</select></div>`,
      title: '编辑',
      showConfirmButton: true,
      success: this.handleOk,
      allowOutsideClick: false,
    });
    $(document).ready(function () {
      $("#tr-stock").change(function () {
        //先清空
        const stock = $('#tr-stock').find('option:selected').data('stock');
        console.log('+++++++++++++++', stock);
        $('#tr-market').empty();
        let marketOptions = '';
        const marketsObj = tradepairs[stock];
        marketsObj.forEach(v => {
          marketOptions += `<option data-market=${v}>${ v.toUpperCase()}</option>`;
        })
        $('#tr-market').append(marketOptions);
      })
    });
  };

  postTradepair(s, m) {
    const {store} = this.props;
    const {index} = this.props;
    // console.log('readt to post index:', index);
    store.post(JSON.stringify(
      {
        stock: s,
        market: m,
        index: index,
        act: 'edit',
      }))
  }

  emptyEl(e) {
    const {store} = this.props;
    const me = $(e.target);
    const index = me.parents('tr').data('index');
    const act = me.data('act');
    const params = {
      act: act,
      index: index,
    };
    store.post(
      JSON.stringify(params)
    )

  }

  render() {
    const p = this.props.data;
    const index = this.props.index;
    return <tr data-index={index} key={p.index}>
      <td className="td text-center">{p.index}</td>
      <td className="td text-center">{p.stock.toUpperCase()}</td>
      <td className="td text-center">{p.market.toUpperCase()}</td>
      <td className="td text-center">
        <button type="primary" onClick={this.showModal.bind(this, p)}>编辑</button>
        {/*<Modal title="Basic Modal"*/}
        {/*visible={this.state.visible}*/}
        {/*onOk={this.handleOk}*/}
        {/*onCancel={this.handleCancel}*/}
        {/*okText="确认"*/}
        {/*cancelText="取消"*/}
        {/*>*/}
        {/*</Modal>*/}
        <button onClick={this.emptyEl.bind(this)} data-act='del'>删除</button>
      </td>
    </tr>

  }
}

// export default App
ReactDOM.render(
  <TradepairRecommend store={trstore}/>,
  document.getElementById("root")
);
