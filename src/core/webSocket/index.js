/**
 * 使用方法
 *  1.在ProxyConfig配置好相关参数
 *  2.直接this.WebSocket.XXX生成链接，返回promise
 *      注：若需要参数，this.WebSocket.XXX（params）
 *  3.调用this.WebSocket.XXX.getWebSocketPool返回对应连接、连接组
 */
import WebSocketPool from '../libs/WebSocket'//引入webscoket

let PoolDic = {},//池字典，用于存储，查找连接
  host,//主机
  port//端口

const WEB_SOCKET = {
  install(app, ServerConfig, webSocketList) {
    host = ServerConfig.wshost
    port = ServerConfig.wsport

    webSocketList.forEach(v => {
      WEB_SOCKET[v.name] = async params => {
        let url = v.url && `ws://${host}:${port}${v.url}`
        if (params) (url += `?`) && Object.keys(params).forEach((key, index) => (url += `${key}=${params[key]}`) && Object.keys(params).length - 1 !== index && (url += '&'))
        let size = v.size || 1
        let webSocketPool = WebSocketPool()
        PoolDic[v.name] = webSocketPool
        WEB_SOCKET[v.name].WebSocketHasStart = true
        return await webSocketPool.start(url, size)
      }
      WEB_SOCKET[v.name].WebSocketHasStart = false//状态检查是否连接启动，如果未连接则查找时返回null
      WEB_SOCKET[v.name].get = () => WEB_SOCKET[v.name].WebSocketHasStart && PoolDic[v.name] || null//获取当前链接
    })
  },
  getAll: () => PoolDic
}

export default WEB_SOCKET
