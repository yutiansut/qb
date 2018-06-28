import React from 'react';
import {render} from 'react-dom';
import App from './App'
import RUNAPP from './core'

import ServerConfig from './config/ServerConfig'
import WebSocketConfig from './config/WebSocketConfig'
import HttpConfig from '../config/HttpConfig'


const renderDom = async Component => {
  console.log(Date.now())
  await RUNAPP({ServerConfig, WebSocketConfig, HttpConfig})
  console.log(Date.now())
  render(
    <Component/>,
    document.getElementById('app')
  );
}

renderDom(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default;
    renderDom(App);
  })
} 
