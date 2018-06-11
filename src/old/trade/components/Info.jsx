import {observer} from "mobx-react";
import React from "react";
import * as utils from "../utils.jsx";
import {translate} from 'react-i18next';
const isEmpty = require('lodash.isempty');


@translate(['translations'], {wait: true})
@observer
class Info extends React.Component {

  constructor(props) {
    super(props);
    const store = this.props.store;
    store.get()
  }

  get renderData() {
    const {t, store, orderStore} = this.props;
    console.log('store.data',store.data)
    if (isEmpty(store.data)) {
      return <div>{t('暂无记录')}</div>
    }
    let number = parseInt((orderStore.orderHeight-30)/45)-1
    // console.log('number', number)
    return store.data.map((i, key) => key < number && (
        <div className="d-flex flex-column " key={key} style={{height:'45px'}}>
          <a className="mix-link info-item" href={store.getDetailUrl(i.pk)}>
            {["zh-hans","zh-hant"].indexOf(LANGUAGE_CODE)===-1?i.subject_en:i.subject_cn}
          </a>
          <span className="d-flex justify-content-end mr-2">
                      {i.created_at}
          </span>
        </div>
      )
    )
  }

  render() {
    const {t, orderStore} = this.props;
    return (
      <div className="mix-dark d-flex flex-column mb-1 bb-info" style={{height:orderStore.orderHeight}}>
        <div className="content">
          <div className="mix-h-light mb-2" style={{height:'30px'}}>{t('资讯')}</div>
          {this.renderData}
        </div>
      </div>
    )

  }
}

export default Info
