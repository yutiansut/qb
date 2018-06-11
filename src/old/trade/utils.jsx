import {computed} from "mobx";

// const moment = require('moment');
//
// function dateFormat(timestamp) {
//   return moment.unix(timestamp).format("Y/MM/D  HH:mm:ss")
// }
//
// function timeFormat(timestamp) {
//   return moment.unix(timestamp).format("HH:mm:ss")
// }

/**
 * 得到交易对的市场
 * @param tradePair -> "eth_usd"
 */
function market(tradePair) {
  return tradePair.split("_").map(i => i.toUpperCase())[1];
}

/**
 * 得到交易对的币种
 * @param tradePair -> "eth_usd"
 */
function trade(tradePair) {
  return tradePair.split("_").map(i => i.toUpperCase())[0];
}

// export {dateFormat, market, trade, timeFormat}
export {market, trade}
