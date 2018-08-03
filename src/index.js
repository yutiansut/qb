
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

function bro() {
  var strStart = 0, strStop = 0, device = '', version = '';

  var userAgent = window.navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
  console.log('userAgent', userAgent, userAgent.indexOf('Firefox') != -1, userAgent.indexOf('Edge') != -1, userAgent.indexOf('﻿Safari') != -1, userAgent.indexOf("Chrome") != -1)

  if (userAgent.indexOf('Firefox') != -1) {
    strStart = userAgent.indexOf('Firefox');
    device = 'Firefox';
  }

  if (userAgent.indexOf('Safari') != -1) {
    if (userAgent.indexOf("Chrome") != -1) {
      strStart = userAgent.indexOf('Chrome');
      strStop = userAgent.indexOf(' Safari');
      device = 'Chrome';
    } else {
      strStart = userAgent.indexOf('Version');
      strStop = userAgent.indexOf(' Safari');
      device = 'Safari';
    }
  }

  if (userAgent.indexOf('Edge') != -1) {
    strStart = userAgent.indexOf('Edge');
    device = 'Edge';
  }

  strStop  = strStop || userAgent.length
  version = userAgent.substring(strStart, strStop).split('/')[1].split('.')[0];
  // document.getElementById('broType').value = broName;
  return {version, device}
}

var bro = bro()
console.log('broName', bro)

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



