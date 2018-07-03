import HttpProxy from './httpProxy'
import Websocket from './webSocket'
import Loop from "./loop";
import GlobalUtil from "./libs/GlobalUtil";


const RUNAPP = async (config) => {
  let ServerConfig = config.ServerConfig
  let WebSocketConfig = config.WebSocketConfig
  let HttpConfig = config.HttpConfig
  let LoopTaskConfig = config.LoopTaskConfig
  HttpConfig.useHttp && HttpProxy.setConfig(HttpConfig, ServerConfig)
  WebSocketConfig.useWebSocket && Websocket.install(ServerConfig, WebSocketConfig.webSocketList)
  Loop.install(LoopTaskConfig);
}


module.exports = {
  GlobalUtil,
  Websocket,
  RUNAPP
}