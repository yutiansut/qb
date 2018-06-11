import React from 'react';
import {translate} from "react-i18next";
import {observer} from "mobx-react";


@translate(['translations'], {wait: true})
@observer
class CoinAbstract extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {store} = this.props;
    const {t, i18n} = this.props;
    if (this.props.info === 'False') {
      return (
        <div className="currency-detail">
          <p className="empty"><i className="fa fa-info-circle">{t('暂无该币种简介')}</i></p>
        </div>)
    } else if (store.codeName === 'crt') {
      return (
        <div className="currency-detail">
          <div className="info-item">
            <p className="abstract-title">{t('介绍：')}</p>
            <p className="mix-text-black info-abstract"> {t(`${store.description}`)}</p>
          </div>
          <div className="currency-info-btn currency-link">
            <a href={store.webSite}
               target="_blank"
               className={JSON.stringify(store.webSite).length!==2 ? '' : 'inactive'}
            >{t('官网')}</a>
          </div>
        </div>)
    } else {
      return (
        <div className="currency-detail">
          <div className="info-item">
            <p className="abstract-title">{t('介绍：')}</p>
            <p className="mix-text-black info-abstract"> {t(`${store.description}`)} </p>
          </div>
          <div className="currency-info-btn currency-link">
            <a href={store.webSite[0]}
               target="_blank"
               className={JSON.stringify(store.webSite).length!==2 ? '' : 'inactive'}
            >{t('官网')}</a>
            <a href={store.blockSites[0]}
               target="_blank"
               className={JSON.stringify(store.blockSites).length!==2 ? '' : 'inactive'}>{t('区块浏览器')}</a>
            <a href={store.whitePaper[0]?store.whitePaper[0]:"javascript:void(0)"}
               target="_blank"
               className={store.whitePaper[0] ?'' : 'inactive'}
                      >{t('白皮书')}</a>
          </div>
        </div>)
    }
  }
}

export default CoinAbstract
