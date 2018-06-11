import React from "react";
import {observer} from "mobx-react";
import {translate} from 'react-i18next';
const isEmpty = require('lodash.isempty');

/**
 * modal对话框
 */
@translate(['translations'], {wait: true})
@observer
class Deal extends React.Component {


  get renderTable() {
    const {t, store, confStore, bankStore} = this.props;
    const header = store.recvData.header;
    const numberType = confStore.getUnitType().toLowerCase();
    // console.log('DealRenderTable', store.coin_market, store.coin)
    return (
      <div className="row trade-deal-bottom">
        <div className="col d-flex justify-content-center">
          <div className="container">
            <table>
              <thead>
              <tr>
                {header.map((i,index) => <th className="mix-blue trade-deal-bottom-text" key={index}>{t(i.display_name)}</th>)}
              </tr></thead>
            <tbody>
              {store.recvData.items.map((item,index) => <tr className="" key={index}>
                <td className="mix-blue trade-deal-bottom-text">{item.time}</td>
                <td className="mix-blue trade-deal-bottom-text">{Number(item.price).format({number:numberType})}</td>
                <td className="mix-blue trade-deal-bottom-text" style={{textAlign:"right"}}>{Number(item.amount).formatFixNumberForAmount(bankStore.recentDealData['CNY'] && bankStore.recentDealData['CNY'][store.coin])}</td>
                <td className="mix-blue trade-deal-bottom-text" style={{textAlign:"right"}}>{Number(item.money).format({number:'property'})}</td>
              </tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  get renderSummary() {
    const {t, store, confStore, bankStore} = this.props;
    const numberType = confStore.getUnitType().toLowerCase();
    // console.log('store.recvData.title',store.recvData.title.slice())
    return (
      <div className="row mix-bg-blue trade-deal-top">
        {store.recvData.title.map((i,index) => (
          <div className="col" key={index}>
            {index===0&&<div style={{color:'#FFF'}} className="trade-deal-top-text">{Number(i.value).formatFixNumberForAmount(bankStore.recentDealData['CNY'] && bankStore.recentDealData['CNY'][store.coin])}</div>}
            {index===1&&<div style={{color:'#FFF'}} className="trade-deal-top-text">{Number(i.value).format({number:'property'})}</div>}
            {index===2&&<div style={{color:'#FFF'}} className="trade-deal-top-text">{Number(i.value).format({number:numberType})}</div>}
            {index===3&&<div style={{color:'#FFF'}} className="trade-deal-top-text">{i.value}</div>}
            <div style={{color:'#FFF'}} className="trade-deal-top-text">{t(i.display_name)}</div>
          </div>))
        }
      </div>
    )
  }

  render() {
    const {t, store} = this.props;
    return (
      <div className="modal fade trade-deal" id={this.props.id} tabIndex="-1" role="dialog"
           aria-labelledby="exampleModalLabel"
           aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header row" style={{border:0}}>
              <div className="col d-flex justify-content-center ">
                <h5 className="modal-title mix-blue trade-deal-title" id="exampleModalLabel">{t('订单详情')}</h5>
              </div>

            </div>
            <div className="modal-body">
              {isEmpty(store.recvData) ? null : this.renderSummary}
              {isEmpty(store.recvData) ? null : this.renderTable}
              <div className="modal-footer row" style={{border:0,paddingBottom:'4px'}}>
                <div className="col d-flex justify-content-center">
                  <button type="button" className="btn mix-btn-blue mix-light trade-deal-btn" data-dismiss="modal">{t('关闭')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Deal
