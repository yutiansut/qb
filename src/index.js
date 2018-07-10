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
// import Crypto from './core/libs/Crypto'
// Crypto('1234567q',JSON.parse('197102307060486144'))

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

if(Device.mobile()){

  //mobile
  renderDom(AppMb);

  if (module.hot) {
      module.hot.accept('./AppMb', async () => {
          const App = require('./AppMb').default;
          await renderDom(App);
      })
  }
}else{

  //desktop
  renderDom(App);

  if (module.hot) {
      module.hot.accept('./App', async () => {
          const App = require('./App').default;
          await renderDom(App);
      })
  }
}



