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
          connect: {v: 1, o: 0, s: 0, resOp: 1},//握手
          heartBreak: {v: 1, o: 2, s: 0, resOp: 3},//心跳
          joinRoom: {v: 1, o: 4, s: 0, resOp: 5, history:true},//加入房间
        },
        market: {
          recommendCurrency: {v: 1, o: 108, s: 0, resOp: 108},//推荐币种
          marketPair: {v: 1, o: 107, s: 0, resOp: 107},//涨跌幅数据更新
          collectArr: {v: 1, o: 109, s: 0, resOp: 109}//收藏
        },
        userOrder: {
          tradeKline: { v: 1, o: 104, s: 0, resOp: 104 }, //K线更新
          tradeDepth: {v: 1, o: 105, s: 0, resOp: 105},//深度更新
          orderUpdate: {v: 1, o: 103, s: 0, resOp: 103},//订单跟新
          userOrderUpdate: {v: 1, o: 102, s: 0, resOp: 102},//个人订单跟新
        },
        login: {
          login: {v: 1, o: 10, s: 0, resOp: 11},//登录
          loginOut: {v: 1, o: 12, s: 0, resOp: 13},//退出登录
          loginOther: {v: 1, o: 120, s: 0, resOp: 120}//退出登录
        },
        asset: {
          userAssetUpdate: { v: 1, o: 110, s: 0, resOp: 110}//用户资产更新
        },
        notice: {
          userNoticeUpdata: {v: 1, o: 111, s: 0, resOp: 111} // 用户通知消息更新
        }
      }
    },

  ],
}


