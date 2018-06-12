export default {
  /**
   * 使用方法
   *  1.在ProxyConfig配置好相关参数
   *  2.直接this.Storage.XXX.XX()执行
   *  3.set：存Storage
   *    add：添加一项
   *    del：删除一项，或者根据某一条件删除部分
   *    get：取Storage
   *    handler：最后一个参数为true，则调add，第二个参数为false则调del
   *    removeAll：删除所有
   *     【具体操作查看libs/Storage.js】
   */
  useStorage: true,// 是否开启Storage
  /**
   * name:标识，名称
   * duration:失效间隔
   * expiryTime:到期时间
   */
  storageList: [
    {name: 'optional', duration: 0, expiryTime: 0, default: [], useDefault: true},//自选
    {name: 'token', duration: 0, expiryTime: 0,default: 'asdasda',useDefault: false},//token
    {name: 'userMsg', duration: 0, expiryTime: 0}, // 用户信息
    {name: 'marketList', duration: 0, expiryTime: 0}, //首页交易所列表排序
    {name: 'filterItems', duration: 0, expiryTime: 0}//首页时间和币种维度筛选
  ]
}
