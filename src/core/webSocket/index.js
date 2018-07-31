/**
 * 使用方法
 *  1.在ProxyConfig配置好相关参数
 *  2.直接this.WebSocket.XXX生成链接，返回promise
 *      注：若需要参数，this.WebSocket.XXX（params）
 *  3.调用this.WebSocket.XXX.getWebSocketPool返回对应连接、连接组
 */
import WebSocketPool from '../libs/WebSocket'//引入webscoket
import MessageHandler from '../messageHandler'

let protocol,//协议
  host,//主机
  port//端口

const WEB_SOCKET = {
  install(ServerConfig, webSocketList) {
    host = ServerConfig.wshost
    port = ServerConfig.wsport
    protocol = ServerConfig.wSecure && 'wss' || 'ws';

    webSocketList.forEach(v => {
      WEB_SOCKET[v.name] = async params => {
        //先在message中注册此条连接信息
        MessageHandler.install(v)

        let url = v.url && `${protocol}://${host}:${port}${v.url}` || `${protocol}://${host}:${port}`
        if (params) (url += `?`) && Object.keys(params).forEach((key, index) => (url += `${key}=${params[key]}`) && Object.keys(params).length - 1 !== index && (url += '&'))
        let size = v.size || 1
        let webSocketPool = WebSocketPool()
        // webSocketPool.onOpen = event => WEB_SOCKET[v.name].WebSocketHasStart = true
        webSocketPool.hasStart = false
        await webSocketPool.start(url, size)
        webSocketPool.hasStart = true

        //websocket连接完毕再注册webaocket
        MessageHandler.installWebsocket(webSocketPool, v.name)
      }
    })
  },
}

export default WEB_SOCKET
