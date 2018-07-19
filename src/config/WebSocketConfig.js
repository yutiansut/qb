export default {
  /**
   * 使用方法
   *  1.在ProxyConfig配置好相关参数
   *  2.直接this.WebSocket.XXX生成链接，返回promise 为true
   *      注：若需要参数，this.WebSocket.XXX（params）
   *  3.调用this.WebSocket.XXX.get方法获得连接或连接组
   *  4.调用this.WebSocket.getAll返回所有连接
   *  this.emit
   */
  useWebSocket: true,  // 是否开启websocket
  /**
   * name:连接标识，名称
   * url:连接路径
   * size:连接数量，可选，默认为1
   */
  webSocketList: [
    {
      name: 'general', url: '/sub', optionList: {
        // test:{testEmit:{var: 1, op: 2}},
        global: {
          connect: {ver: 1, op: 0, seq: 0, resOp: 1},//握手
          heartBreak: {ver: 1, op: 2, seq: 0, resOp: 3},//心跳
          joinRoom: {ver: 1, op: 4, seq: 0, resOp: 5, history:true},//加入房间
        },
        market: {
          recommendCurrency: {ver: 1, op: 108, seq: 0, resOp: 108},//推荐币种
          marketPair: {ver: 1, op: 107, seq: 0, resOp: 107},//涨跌幅数据更新
          collectArr: {ver: 1, op: 109, seq: 0, resOp: 109}//收藏
        },
        userOrder: {
          tradeKline: { ver: 1, op: 104, seq: 0, resOp: 104 }, //K线更新
          tradeDepth: {ver: 1, op: 105, seq: 0, resOp: 105},//深度更新
          orderUpdate: {ver: 1, op: 103, seq: 0, resOp: 103},//订单跟新
          userOrderUpdate: {ver: 1, op: 102, seq: 0, resOp: 102},//个人订单跟新
        },
        login: {
          login: {ver: 1, op: 10, seq: 0, resOp: 11},//登录
          loginOut: {ver: 1, op: 12, seq: 0, resOp: 13}//退出登录
          },
        asset: {
          userAssetUpdate: { ver: 1, op: 110, seq: 0, resOp: 110}//用户资产更新
        },
        notice: {
          userNoticeUpdata: {ver: 1, op: 111, seq: 0, resOp: 111} // 用户通知消息更新
        }
      }
    },

  ],
}


