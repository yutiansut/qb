/**
 * 使用方法
 *  1.在ProxyConfig配置好相关参数
 *  2.直接this.WebSocket.XXX生成链接，返回promise
 *      注：若需要参数，this.WebSocket.XXX（params）
 *  3.调用this.WebSocket.XXX.getWebSocketPool返回对应连接、连接组
 */
import WebSocketPool from '../libs/WebSocket'//引入webscoket
import MessageHandler from '../messageHandler'

let host,//主机
  port//端口

const WEB_SOCKET = {
  install(ServerConfig, webSocketList) {
    host = ServerConfig.wshost
    port = ServerConfig.wsport

    webSocketList.forEach(v => {
      WEB_SOCKET[v.name] = async params => {
        let url = v.url && `ws://${host}:${port}${v.url}` || `ws://${host}:${port}`
        if (params) (url += `?`) && Object.keys(params).forEach((key, index) => (url += `${key}=${params[key]}`) && Object.keys(params).length - 1 !== index && (url += '&'))
        let size = v.size || 1
        let webSocketPool = WebSocketPool()
        // webSocketPool.onOpen = event => WEB_SOCKET[v.name].WebSocketHasStart = true
        webSocketPool.hasStart = false
        await webSocketPool.start(url, size)
        MessageHandler.install(webSocketPool, v)
      }
    })
  },
}

export default WEB_SOCKET
