
import React from 'react';
import ReactDOM from 'react-dom';
import {translate, Trans} from "react-i18next";
import {reaction} from 'mobx';
import {observer} from "mobx-react";
import io from 'socket.io-client';
import MarketHallStore from "./store/MarketHallStore.jsx"
import MarketHall from "./component/MarketHall.jsx"
import RecommendStore from "./store/RecommendStore.jsx"
import Recommend from "./component/Recommend.jsx"

/**
 * websocket
 */
const socket = io( 'http://192.168.113.98:65432/', {transports: ['websocket']});

socket.on('connect', function () {
});

const marketHallStore = new MarketHallStore('/trade/detail/?');

/**
 * 市场最新交易对信息{交易对， [价格， 数量， 24h]}
 */
socket.on("ticker-data", function (data) {
  // console.log(data);
  marketHallStore.marketData = data;
});

reaction(() => marketHallStore.response.data, data => {
  marketHallStore.marketData = data.markets;
});

const recommendStore = new RecommendStore('/trade/recommend/');

reaction(() => recommendStore.response.data, data => {
  recommendStore.recommendData = data.markets;
});

/**
 * 页面入口
 */
@observer
class Index extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    // 市场最新交易对信息{交易对， [价格， 数量， 24h]}
    socket.emit('enter', 'ticker');
  }

  render() {

    return <div className="row">
      <Recommend store={recommendStore}/>
      <div>隔开</div>
      <MarketHall id="order-deal" store={marketHallStore}/>


    </div>
  }
}

ReactDOM.render(
  <Index/>,
  document.getElementById('wrapper')
);
