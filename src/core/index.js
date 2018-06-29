import HttpProxy from './httpProxy'
import Websocket from './webSocket'


const RUNAPP = async (config) => {
  let ServerConfig = config.ServerConfig
  let WebSocketConfig = config.WebSocketConfig
  let HttpConfig = config.HttpConfig
  HttpConfig.useHttp && HttpProxy.setConfig(HttpConfig, ServerConfig)
  WebSocketConfig.useWebSocket && Websocket.install(ServerConfig, WebSocketConfig.webSocketList)
}

export default {
  RUNAPP,
  Websocket
}