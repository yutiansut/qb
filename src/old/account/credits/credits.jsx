import React from 'react';
import ReactDOM from 'react-dom';
import {RequestStore} from "../../store/request.jsx";
import {observer} from "mobx-react";
import {computed} from 'mobx';
import {I18nextProvider} from "react-i18next";
import i18n from "../../common/i18n.jsx";
import {translate} from 'react-i18next';

const isEmpty = require('lodash.isempty');
i18n.options.fallbackLng = Array(LANGUAGE_CODE);

@translate(['translations'], {wait: true})
@observer
class Credits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0
    };
    this.pagechange = this.pagechange.bind(this);
    this.get_vip_list();

  }

  componentDidMount(props) {

  }

  plot(group_list, group, credits) {
    var threadholds = [group_list[1], group_list[2], group_list[3], group_list[4], group_list[5], 1, 1]
      , unit = 100.0 / threadholds.length
      , percent = unit * group + credits * 100.0 / threadholds[group] / threadholds.length;
    if (group == 5) {
      percent = unit * 5;
    }
    if (group == 6) {
      percent = 100;
    }
    if (percent < 4) {
      percent = 4;
    }
    $('#id-credits-slider').slider({
      formater: function () {
        return credits;
      },
      max: 100,
      value: percent,
      tooltip: 'always',
      topTooltip: true,
      enabled: false
    });
  }

  pagechange(type, pageNum, e) {
    e.preventDefault();
    let page_params = type ? {[type]: encodeURIComponent(pageNum)} : {};
    this.get_vip_list(page_params);
  }

  get_vip_list(page_params) {
    const store = this.props.store;
    store.get($.extend({}, page_params));
  }


  render() {
    const {t, i18n} = this.props;
    const store = this.props.store;
    // console.log("credits recvData", store.recvData);
    // console.log("credits recvData isEmpty", isEmpty(store.recvData));
    const items = isEmpty(store.recvData) ? [] : store.recvData.page.items;
    const ctx = isEmpty(store.recvData) ? [] : store.recvData;
    const group_list = isEmpty(store.recvData) ? ['', '', '', '', '', ''] : store.recvData.group_list;
    this.plot(group_list, ctx.group_num, ctx.credits);
    let content = !isEmpty(items) ? items.map((item) => {
      return (
        <tr key={item.id}>
          <td>+{item.gain}</td>
          <td className="th-fix">{item.event}</td>
          <td className="th-fix2">{item.created_at}</td>
        </tr>
      )
    }) : <div></div>;

    let td_content = isEmpty(items) ? <p className="empty"><i className="fa fa-info-circle"></i> {t('暂无记录')}</p> :
      <div className="table-fix">
        <table className="table ">
          <thead>
          <tr>
            <th className="th-g" width="30">{t('获得积分')}</th>
            <th className="th-g th-fix" width="30">{t('事件')}</th>
            <th className="th-g th-fix2" width="40">{t('时间')}</th>
          </tr>
          </thead>
          <tbody>
          {content}
          </tbody>
        </table>
      </div>;
    let page = store.page;
    let page_btn = (page.has_next || page.has_previous) ?
      (<ul className="pager">
        {page.has_previous ?
          <li><a href="#" className="previous btn-glod btn-size ml130"
                 onClick={this.pagechange.bind(this, 'since_key', page.first_key)}>{t('上一页')}</a></li> :
          <li className="disabled"><span className="btn-size ml130">{t('上一页')}</span></li>
        }
        {
          page.has_next ?
            <li><a href="#" className="next btn-glod ml20 btn-size"
                   onClick={this.pagechange.bind(this, 'max_key', page.last_key)}>{t('下一页')}</a></li> :
            <li className="disabled ml10"><span className="btn-size next">{t('下一页')}</span></li>
        }
      </ul>) : <div></div>;

    return <div className="account-profile">
      <div className="mt25">
        <h3>
          {t('我的积分')}
        </h3>
      </div>
      <div className="row vip-row">
        <div className="col-md-2">
          <h4 className="">{t('积分信息')}</h4>
        </div>
        <div className="col-md-10">
          <p className='mt7'>
            <span className="">{t('目前等级：')}
              {ctx.group} <span className="ml8">({t('积分：')}{ctx.credits})</span></span>
            <a href="/pricing/" className="ml30">{t('等级说明')}</a>
          </p>
          <table className="table table-credits-progress mt40 ml37m">
            <tbody>
            <tr>
              <td className="text-center">VIP0</td>
              <td className="text-center cor1">VIP1 <small>({group_list[1]})</small></td>
              <td className="text-center cor2">VIP2 <small>({group_list[2]})</small></td>
              <td className="text-center cor3">VIP3 <small>({group_list[3]})</small></td>
              <td className="text-center cor4">VIP4 <small>({group_list[4]})</small></td>
              <td className="text-center cor5">VIP5 <small>({group_list[5]})</small></td>
              <td className="text-center cor6">MVP</td>
            </tr>
            </tbody>
          </table>
          <div id="id-credits-slider"></div>
        </div>
      </div>
      <div className="split-line-e0e6ea"></div>
      <div className="row mt40 credits-row">
        <div className="col-md-2">
          <h4 className="">{t('积分详情')}</h4>
        </div>
        <div className="col-md-10 mt6">
          <a href="/pricing/#earn-bonus">{t('如何获得积分')}</a>
          <div id="wht">{td_content}</div>
        </div>
      </div>
      <div className="col-md-12 column">{page_btn}</div>
    </div>

  }
}

class WalletStore extends RequestStore {
  @computed get page() {
    if (isEmpty(this.recvData)) {
      return []
    }
    return this.recvData.page
  }

}

const walletStore = new WalletStore(conf.credits_list_url);

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Credits store={walletStore}/>
  </I18nextProvider>,
  document.getElementById('wrapper')
);
