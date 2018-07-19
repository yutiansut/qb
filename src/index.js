// import 'es5-shim'
// import 'es5-shim/es5-sham'
// import 'es6-shim'
// import 'es6-shim/es6-sham'
// import 'es7-shim'

require('es5-shim');
require('es5-shim/es5-sham');
require('es6-shim');
require('es6-shim/es6-sham');
require('es7-shim');
require('console-polyfill');
require('es6-promise').polyfill();
require('fetch-detector');
require('fetch-ie8');
require('babel-polyfill');

// import 'es6-promise/auto'
// import 'fetch-detector'
// import 'fetch-ie8'
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

let a = 1
console.log(`${a}23`)


const renderDom = async Component => {
  // console.log(Date.now())
  await RUNAPP({ServerConfig, WebSocketConfig, HttpConfig, LoopTaskConfig, StorageConfig})
  WebSocketConfig.useWebSocket && await Websocket.general()
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



