import React from 'react';
import {render} from 'react-dom';
import App from './App'
import {RUNAPP, Websocket} from './core'
import ServerConfig from './config/ServerConfig'
import WebSocketConfig from './config/WebSocketConfig'
import HttpConfig from './config/HttpConfig'
import LoopTaskConfig from './config/LoopTaskConfig'
import StorageConfig from './config/StorageConfig'
import './class/lib/Prototype'


// console.log(Number(JSON.parse('1111111.11111111')).format({number:'legal',style:{name:'usd'}}))
// import Crypto from './core/libs/Crypto'
// Crypto('1234567q',JSON.parse('197102307060486144'))

const renderDom = async Component => {
  // console.log(Date.now())
  await RUNAPP({ServerConfig, WebSocketConfig, HttpConfig, LoopTaskConfig, StorageConfig})
  WebSocketConfig.useWebSocket && await Websocket.general()
  // await import('./App')
  // console.log(Date.now())
  render(
    <Component/>,
    document.getElementById('app')
  );
}

renderDom(App);

if (module.hot) {
  module.hot.accept('./App', async () => {
    const App = require('./App').default;
    await renderDom(App);
  })
}