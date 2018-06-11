import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from "mobx-react";
import {reaction} from "mobx";
import ContentHead from './components/ContentHead.jsx'
import Search from './components/Search.jsx';
import ChangeSign from "./components/ChangeSign.jsx";
import CoinDetail from './components/CoinDetail.jsx';
import CoinAbstract from './components/CoinAbstract.jsx';
import SignStore from "./store/SignStore.jsx";
import CoinDetailStore from "./store/CoinDetailStore.jsx";
import UnitStore from './store.jsx';
import SearchStore from "./store/SearchStore.jsx";

import {I18nextProvider} from "react-i18next";
import i18n from "../../common/i18n.jsx";

const store = new UnitStore();
const signStore = new SignStore();
const coinDetailStore = new CoinDetailStore(conf.tradeList, conf.allArray);
const searchStore = new SearchStore(conf.allArray);
if (conf.lng) {
  signStore.lng = conf.lng;
}
if(!signStore.lng) {
  if (["zh-hans", "zh-hant"].indexOf(LANGUAGE_CODE) !== -1) {
    signStore.selected = "RMB";
    coinDetailStore.changePrice = "RMB";
  } else {
    signStore.selected = "USD";
    coinDetailStore.changePrice = "USD";
  }
}else{
  if (signStore.lng=="RMB") {
    signStore.selected = "RMB";
    coinDetailStore.changePrice = "RMB";
  }
  else{
    signStore.selected = "USD";
    coinDetailStore.changePrice = "USD";
  }
}
reaction(() => signStore.selected, data => {
  coinDetailStore.changePrice = data;
});

@observer
class Content extends React.Component{
    render(){
      i18n.options.fallbackLng = Array(LANGUAGE_CODE);
        return (
           <div className="content-style">
             <ContentHead
               info={conf.info}
               currency={conf.currency}
             />
             <div className="currency-box">
              <Search store={searchStore}
                      signStore={signStore}
              />
              <ChangeSign
                store={signStore}
              />
             </div>
             <CoinDetail
               info={conf.info}
               store={coinDetailStore}
               charge={conf.charge}
               trade={conf.goTrade}
               currency={conf.currencyDetail}
             />
             <CoinAbstract
               info={conf.info}
               store={coinDetailStore}
             />
           </div>
        )
    }
}

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Content store={store}/>
  </I18nextProvider>,

  document.getElementById('root')
);
