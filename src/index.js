import React from 'react';
import {render} from 'react-dom';
import App from './App'
import AppMb from './AppMb'
import {RUNAPP, Websocket, Storage} from './core'
import ServerConfig from './config/ServerConfig'
import WebSocketConfig from './config/WebSocketConfig'
import HttpConfig from './config/HttpConfig'
import LoopTaskConfig from './config/LoopTaskConfig'
import StorageConfig from './config/StorageConfig'
// import Storage from "./core/storage/index"
import './class/lib/Prototype'
import Device from './core/libs/Device'

// console.log(Number(JSON.parse('1111111.11111111')).format({number:'legal',style:{name:'usd'}}))
// import RSAEncrypt from './core/libs/RSAUtil'
// Crypto('1234567q',JSON.parse('197102307060486144'))

// var encrypt = new JSEncrypt();
// encrypt.setPublicKey('-----BEGIN public-----\n' +
//   'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuUbv4zA0HU9hLW756Aqh\n' +
//   'vDkq7uFF1whjooo06C3GYNnwtAQcFkIyLBp7HA0a+D95o7Tyv6LiSLFv7QrbzO1L\n' +
//   '1ZmwP4HPsaBNJyuwUQAo+FLyLz08cMb96UvuVhUsDM33oJ0N2yoevCVxJJyZWQTh\n' +
//   'K8fEVr7Dc4MCkGPPGO7vz0ifABcpV6XuzrlyPnxkhc3uVsxswQdZVflt9uGnwzF9\n' +
//   'CPTmUY/itVcGWq9F9JEmoudvKHWBFgfZ11ACTaQtOFojbjbgz39CQWdN2+tVhu/l\n' +
//   'LGP7xLmyACrkkkamFINZO+HDs4rI4g2rC20bPXExSAAxKFGXHUl6S4Af2hjwv4V2\n' +
//   '0wIDAQAB\n' +
//   '-----END public-----');
// var encrypted = encrypt.encrypt('qwer1234567');
//
// console.log('aaaaaa', encrypted)

//yrx9xsjnn1khK7PWrCODEpsazxlkzxcMDzQvAfTBJceM82p05/Xi+WSH5AelSJTnBwaQFLfq0J0Y6VWiu8+gYqWZ55a9fU55ZbRaHrVQpKwm+rTAWRX0Ek8UnvLGNL5QvzDf/6FPcad54v2HNOAgOZbFvVc3YGB1S1o+ld35zNA=


// var decrypt = new JSEncrypt();
// decrypt.setPrivateKey('-----BEGIN public-----\n' +
//   'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuUbv4zA0HU9hLW756Aqh\n' +
//   'vDkq7uFF1whjooo06C3GYNnwtAQcFkIyLBp7HA0a+D95o7Tyv6LiSLFv7QrbzO1L\n' +
//   '1ZmwP4HPsaBNJyuwUQAo+FLyLz08cMb96UvuVhUsDM33oJ0N2yoevCVxJJyZWQTh\n' +
//   'K8fEVr7Dc4MCkGPPGO7vz0ifABcpV6XuzrlyPnxkhc3uVsxswQdZVflt9uGnwzF9\n' +
//   'CPTmUY/itVcGWq9F9JEmoudvKHWBFgfZ11ACTaQtOFojbjbgz39CQWdN2+tVhu/l\n' +
//   'LGP7xLmyACrkkkamFINZO+HDs4rI4g2rC20bPXExSAAxKFGXHUl6S4Af2hjwv4V2\n' +
//   '0wIDAQAB\n' +
//   '-----END public-----');
// var uncrypted = decrypt.decrypt('rUAZJ+xScJGOaFP75PAfNPt6ENtJmRcG/uW1IykSv5L1OGO14lUeObixCTogQwxAKRYzMAnDxjQpqcZnX7E1OxXJO3U39EQzVag0y7q/VFrRRSv8Pwi92z+A7jw0H5mjd0ACscm/YdlYkIfDstaq40/toX+7FUu07F/o+wSDFugFC78LLY//VsdY47nRyxXS0nm0QBKiy9/MKYTpm2MGakOxcnk6lLzFbZ9cdaKZ49nW+Pc8MBQ4lfU8OQ1EpgfrzCnQ6NSDBrZ3/mVqi2Kx8nunJ4bBbfvxs/z4Pptc/Sc+G1PgrTuNcj7vyms0qnAWFlsLmEhynE9+G5aMKt9lQA==');
//
// console.log('bbbb',uncrypted)


// if(!sessionStorage['test']){
//   console.log('新赋值')
//   sessionStorage['test'] = 'test'
// }


const renderDom = async Component => {
  // console.log(Date.now())
  await RUNAPP({ServerConfig, WebSocketConfig, HttpConfig, LoopTaskConfig, StorageConfig})
  WebSocketConfig.useWebSocket && await Websocket.general()


  // await import('./App')
  // console.log(Date.now())
  // console.log(111222333)
  // Storage.userToken.get() && WebSocket.general.emit('login', {token: Storage.userToken.get()})

  render(
    <Component/>,
    document.getElementById('app')
  );
};

if (Device.mobile()) {

  //mobile
  renderDom(AppMb);

  if (module.hot) {
    module.hot.accept('./AppMb', async () => {
      const App = require('./AppMb').default;
      await renderDom(App);
    })
  }
} else {

  //desktop
  renderDom(App);

  if (module.hot) {
    module.hot.accept('./App', async () => {
      const App = require('./App').default;
      await renderDom(App);
    })
  }
}



