
import React from 'react';
import {render} from 'react-dom';
import {RUNAPP, Websocket, Storage} from './core'
import "whatwg-fetch";
import ServerConfig from './config/ServerConfig'
import WebSocketConfig from './config/WebSocketConfig'
import HttpConfig from './config/HttpConfig'
import LoopTaskConfig from './config/LoopTaskConfig'
import StorageConfig from './config/StorageConfig'
// import Storage from "./core/storage/index"
import './class/lib/Prototype'
import Device from './core/libs/Device'

let str = Date.now() + '-' + Math.random().toString(36).substr(2);

const renderDom = async Component => {
  await RUNAPP({ServerConfig, WebSocketConfig, HttpConfig, LoopTaskConfig, StorageConfig})
  WebSocketConfig.useWebSocket && Websocket.general({test:str})
  render(
    <Component/>,
    document.getElementById('app')
  );
};

if (Device.mobile()) {


  import ('./AppMb').then(Component => renderDom(Component.default))



  if (module.hot) {
    module.hot.accept('./AppMb', async () => {
      const App = require('./AppMb').default;
      await renderDom(App);
    })
  }
} else {

  //desktop
  // renderDom('./App');
  import ('./App').then(Component => renderDom(Component.default))


  if (module.hot) {
    module.hot.accept('./App', async () => {
      const App = require('./App').default;
      await renderDom(App);
    })
  }
}



