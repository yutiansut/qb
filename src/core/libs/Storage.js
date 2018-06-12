/**
 * storage 主要放项目中的storage相关操作：存取等
 * 对本地数据进行操作的相关方法，如 localStorage, sessionStorage 的封装
 * sessionStorage：页面会话期间可用
 * localStorage：除非数据被清除，否则一直存在
 *
 *   缺少增删操作
 */
export default {
  /**
   * 存localStorage
   * @param key 键
   * @param value 值
   * @param duration 持续时间（ms）
   */
  setStorage(key, value, duration = 0, expiryTime = 0) {
    if (!value || !key) return false
    let data = {
      value,
      expiryTime: expiryTime || (!duration || isNaN(duration) ? 0 : this.getCurrentTimeStamp() + parseInt(duration)),
    };
    localStorage[key] = JSON.stringify(data);
    return true
  },

  /**
   *  取localStorage中的所有对象
   * @param key 键
   * @returns 存入localstroage的对象
   *    1.若set时有duration，则超出这个时间返回null
   *    2.返回为存入的value+时间
   */
  getStorageAll(key) {
    if (!key) return null
    let data = localStorage[key], now = this.getCurrentTimeStamp(), obj
    if (!data || data === "null") return null;
    try {
      obj = JSON.parse(data);
    } catch (e) {
      return null;
    }
    if (obj.expiryTime === 0 || obj.expiryTime > now) {
      return obj
    }
    return null;
  },

  /**
   *  取localStorage
   * @param key 键
   * @returns value 存入的value
   *  注：若set时有duration，则超出这个时间返回null
   */
  getStorage(key) {
    if (!key) return null
    let data = this.getStorageAll(key)
    if (!data || data === "null") return null;
    return this.getStorageAll(key).value
  },

  /**
   * 添加localStorage
   * @param key 键
   * @param value 值
   * @param index 添加的位置(第几个后) 【选参，不传则默认添加入头部】
   * @param duration 持续时间（ms）【选参，不传则持续时间无限制】
   *  注：暂时只支持数组增加
   *      对于属性嵌套数组，key为数组 [key, 嵌套属性1, ...]
   */
  addStorage(key, value, index = 0, arrPath = [], duration = 0) {
    if (!value || !key) return false
    let dataAll = this.getStorageAll(key), data = dataAll.value, tmpData = data, expiryTime = dataAll.expiryTime
    arrPath instanceof Array && arrPath.length > 0 && arrPath.forEach(v => tmpData = tmpData[v])
    tmpData instanceof Array && tmpData.splice(index, 0, value)
    duration && (expiryTime = 0)
    this.setStorage(key, data, duration, expiryTime)
    return true
  },

  /**
   * 删除存入localStorage中的某一个
   * @param key 键
   * @param value 删除的元素
   * @param duration 持续时间（ms）【选参，不传则持续时间跟上个一样，传true则取消时间限制】
   *  注：暂时只支持数组增加
   *      对于属性嵌套数组，key为数组 [key, 嵌套属性1, ...]
   *      当删除的为对象时，value为对象，标识筛选条件
   */
  delStorage(key, value, arrPath = [], duration = 0) {
    if (!value || !key) return false
    let dataAll = this.getStorageAll(key), data = dataAll.value, tmpData = data, expiryTime = dataAll.expiryTime,
      valueTmp = [value]
    arrPath instanceof Array && arrPath.length > 0 && arrPath.forEach(v => tmpData = tmpData[v])
    tmpData instanceof Array && value instanceof Object && tmpData.forEach(v => {
      let valueFlag = 0
      Object.keys(value).forEach(vv => v[vv] === value[vv] && valueFlag++)
      valueFlag >= Object.keys(value).length && valueTmp.push(v)
    })
    tmpData instanceof Array && valueTmp.forEach(v => tmpData.indexOf(v) >= 0 && tmpData.splice(0, tmpData.length, ...tmpData.filter(vv => vv != v)))
    duration && (expiryTime = 0)
    this.setStorage(key, data, duration, expiryTime)
    return true
  },

  /**
   * 删除 localStorage中某个键
   * @param key 键
   */
  removeStorage(key) {
    if (!key) return false
    localStorage.removeItem(key);
    return true
  },

  /**
   * 存sessionStorage
   * @param key 键
   * @param value 值
   */
  setSession(key, value) {
    if (!value || !key) return false
    let data = {value}
    sessionStorage[key] = JSON.stringify(data);
    return true
  },

  /**
   * 取sessionStorage
   * @param key 键
   * @returns value 值
   */
  getSession(key) {
    if(!key) return null
    let data = sessionStorage[key];
    if (!data || data === "null") return null;
    return JSON.parse(data).value;
  },

  /**
   * 删除某个sessionStorage
   */
  removeSession(key) {
    if (!key) return false
    sessionStorage.removeItem(key);
    return true
  },

  /**
   * 获取当前时间，用于检测是否终止
   * @returns {number}
   */
  getCurrentTimeStamp() {
    return Date.now();
  }
};
