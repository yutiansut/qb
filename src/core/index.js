import httpProxy from './httpProxy'
import Websocket from './webSocket'


const RUNAPP = async (config) => {
  let ServerConfig = config.ServerConfig
  let WebSocketConfig = config.WebSocketConfig
  WebSocketConfig.useWebSocket && await Websocket.install(ServerConfig, WebSocketConfig.webSocketList)
}

export default RUNAPP