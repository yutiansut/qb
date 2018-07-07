/**
 * 处理websocket连接信息
 * 1.是否关于头文件的处理也放在这里？ 是
 * 2.是否兼容多条连接？ 问题3告诉我们，在这个文件中开始连接，这使得兼容多条连接具有可能性，结论参见问题6
 * 3.是否还要有开始连接的动作？ 开始连接的动作只在此文件中完成，不再每次使用中
 * 4.问题3带来的项目只要启动就会建立一条websocket连接，不论进入那个页面，是否有问题？否
 * 5.如果只有一个server端，为什么还要有多条链接？ 结论参见问题6
 * 6.这条是关于多条连接的结论，目前只处理一个server中一条连接。原因：建立websocket连接本身耗时，且一条能做完成的事，为什么要分多条。关于多条连接的事情暂不考虑。同一个url但是不同的参数，或者，url带参数如何处理，并不是websocket连接数，关于连接数问题已经在websocket中做了处理。
 * 7.一个onMessage方法
 * 8.需要头文件的config，
 * 9.一个队列处理消息，onMessage只是把头文件和回调关联起来，在消息返回时，找到对应回调处理
 * 10.需要创建一个回调字典和消息队列
 * 11.一个字段name对应一个头文件，对应一个回调。
 * 12.在调用onMessage方法时，回调字典添加一条记录
 * 13.大多数根据op和seq来辨别
 * 14.根据op来收发数据
 * 15.发送数据也要有队列，保证收发的seq，匹配
 * 16.不同操作，不同配置
 * 17.消息队列总存储的都是含有头文件的数据
 */


import Sleep from '../libs/Sleep'
const PoolDic = {}

//循环读取完成收发消息队列的处理
//core包中的websocket不认识op，seq，var，此处校验在外面传入

let startFlag
// console.log('startFlag1', startFlag)
async function messageHandler() {
  startFlag = true
  // console.log('startFlag2', startFlag)
  while (true) {
    Object.keys(PoolDic).forEach(poolName => {
      // console.log(PoolDic)
      let pool = PoolDic[poolName]
      if (pool.EMIT_QUENE.length) {
        /**
         * 逐条发送
         * 加帧数
         * 具体发送根据不同的项目不同
         */
        // console.log('pool.EMIT_QUENE', poolName, pool, JSON.stringify(pool.EMIT_QUENE))
        pool.send(pool.EMIT_QUENE.shift())
      }
      if (pool.RECEIVE_QUENE.length) {
        /**
         * 逐条处理
         * 校验seq和var
         * 此处根据op分发到各处回调
         */
        //op1,3代表握手和心跳，对此不做处理
        // console.log('pool.RECEIVE_QUENE', poolName, pool, JSON.stringify(pool.RECEIVE_QUENE))
        if(pool.RECEIVE_QUENE[0].op === 1){
          pool.hasStart = true
          pool.RECEIVE_QUENE.shift()
          return
        }
        if(pool.RECEIVE_QUENE[0].op === 3){
          // console.log('无用包')
          pool.RECEIVE_QUENE.shift()
          return
        }
        MESSAGE_HANDLER[poolName].onMessage(pool.RECEIVE_QUENE.shift())
      }
    })
    await Sleep(8)
  }
}

async function sendHeartBreak(pool) {
  // console.log('sendHeartBreak', pool)
  startFlag = true
  while (1) {
    // console.log('sendHeartBreak', pool)
    let data = {
      var: 1,
      op: 2,
      seq: 0
    }
    pool.EMIT_QUENE.push(data)
    await Sleep(5000)
  }
}


!startFlag && messageHandler()


const MESSAGE_HANDLER = {
  /**
   * 启动wesocket连接，暴露出
   * @param ServerConfig
   * @param webSocketList
   */
  install(pool, config) {
    // console.log('install Websocket to messageHandler')
    PoolDic[config.name] = pool;
    pool.EMIT_QUENE = [];
    pool.RECEIVE_QUENE = [];
    pool.onMessage = function (data){
      // console.log(data)
      pool.RECEIVE_QUENE.push(data)
      // console.log(pool.RECEIVE_QUENE)
    }
    // pool.send({var:1, op:0, seq:0})
    // sendHeartBreak(pool)
    MESSAGE_HANDLER[config.name] = {}
    MESSAGE_HANDLER[config.name].send = data => pool.EMIT_QUENE.push(data)
    MESSAGE_HANDLER[config.name].config = JSON.parse(JSON.stringify(config))
    MESSAGE_HANDLER[config.name].onMessage = data => data && console.log(data)
    MESSAGE_HANDLER[config.name].get = () => PoolDic[config.name].hasStart && PoolDic[config.name] || null//获取当前链接
  },
  getAll: () => PoolDic
}

export default MESSAGE_HANDLER







