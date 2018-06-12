import state from '../store/state' // 这里引入state
import actions from '../store/actions'// 这里引入actions
import mutations from '../store/mutations'// 这里引入mutations

// 引入其他vuex配置件，如module也是在此处，传入下面的对象即可

/**
 * 设置vuexAlong，vuex持久化配置 key为vuexAlong
 * watchArr : [] // 将在localStorage中保存的属性名或模块名的数组
 *    注意：默认保存在localStorage，且保存保存所有state
 * watchFlag : 非必须 默认true
 *    true // watchArr 作为要保存的列表
 *    false // watchArr 作过滤的列表
 * watchSessionArr : [] // 将在sessionStorage中保存的属性名或模块名的数组
 *    注意：不会默认保存所有state，关闭浏览器窗口就会消失
 * watchSessionFlag : 非必须 默认true
 *    true // watchSessionArr 作为要保存的列表
 *    false // watchSessionArr 作过滤的列表
 * 注意：​watchArr 和 watchSessionArr 可以同时生效
 * 如果你只想保存至 sessionStorage
 * onlySession :
 *    true  //设置只读 sessionStorage
 * 默认保存在localStorage，如果watchSessionArr和watchSessionFlag有配置，则同时保存
 */
const vuexAlong = {}


export default {
  state,
  actions,
  mutations,
  // vuexAlong,
  plugins:[]
}
