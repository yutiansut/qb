import React from 'react';
import {render} from 'react-dom';
import App from './App'
import Core from './core'
import ServerConfig from './config/ServerConfig'
import WebSocketConfig from './config/WebSocketConfig'
import HttpConfig from './config/HttpConfig'
import './class/lib/Prototype'

// import Crypto from './core/libs/Crypto'
// Crypto('1234567q',JSON.parse('197102307060486144'))

const renderDom = async Component => {
  // console.log(Date.now())
  await Core.RUNAPP({ServerConfig, WebSocketConfig, HttpConfig})
  WebSocketConfig.useWebSocket && await Core.Websocket.general()
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
