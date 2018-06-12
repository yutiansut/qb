import Vuex from 'vuex'

import vuexAlong from 'vuex-along'

import GlobalUtil from '../libs/GlobalUtil'

let app = {}

const STORE = {
  install(config, App) {
    let vuexAlongConfig = config.vuexAlong
    if(vuexAlongConfig && Object.keys(vuexAlongConfig).length){
      let watchFlag = (typeof vuexAlongConfig.watchFlag) === 'boolean' && vuexAlongConfig.watchFlag || true;
      let watchSessionFlag = (typeof vuexAlongConfig.watchSessionFlag) === 'boolean' && vuexAlongConfig.watchSessionFlag || true;
      vuexAlongConfig.watchArr && vuexAlongConfig.watchArr.length && vuexAlong.watch(vuexAlongConfig.watchArr, watchFlag);
      vuexAlongConfig.watchSession && vuexAlongConfig.watchSession.length && vuexAlong.watchSession(vuexAlongConfig.watchSession, watchSessionFlag);
      (typeof vuexAlongConfig.onlySession) === 'boolean' && vuexAlong.onlySession(vuexAlongConfig.onlySession)
    }

    let vuexPlugins = store => {
      let pre = GlobalUtil.deepCopy(store.state)
      // console.log('vuexPlugins 0', pre)
      store.subscribe((mutation, state) => {
        // console.log('vuexPlugins 1', state.userInfo.loginSwitch)
        // console.log('vuexPlugins 2', pre.userInfo.loginSwitch)
        // console.log('vuexPlugins 3', GlobalUtil.isObjectValueEqual(pre, state))
        if(!GlobalUtil.isObjectValueEqual(pre, state)){
          // console.log('vuexPlugins 4', localStorage['vuex-along'], sessionStorage['vuex-along'])
          localStorage['updateState'] = JSON.stringify([localStorage['vuex-along'],sessionStorage['vuex-along']])
          localStorage.removeItem("updateState");
        }
        // console.log('vuexPlugins 3', res)
        pre = GlobalUtil.deepCopy(state)
      })
    }

    return new Vuex.Store({
      state: Object.assign(config.state, {}),
      mutations: Object.assign(config.mutations, {}),
      actions: Object.assign(config.actions, {}),
      plugins: [vuexAlong, vuexPlugins, ...config.plugins]
    })
  },
  installVm(vm) {
    app = vm
    //同步session操作，如果没有第二个标签页，以下代码没有作用
    if (!sessionStorage.length) {
      localStorage.setItem('getSessionStorage', Date.now());
      localStorage.removeItem('getSessionStorage');
    }
    window.addEventListener('storage', function (event) {
      // console.log('storage', event)
      if(!event.newValue)
        return
      if(event.key === 'updateState') {
        console.log('updateState 0', vm, event.newValue, event)
        let value = JSON.parse(event.newValue)
        if(value[0])
          localStorage['vuex-along'] = value[0]
        if(value[1])
          sessionStorage['vuex-along'] = value[1]
        console.log('updateState 1', value, localStorage['vuex-along'], sessionStorage['vuex-along'], vm.reload);
        // vm.reload() 不能掉reload，调用reload的话会导致状态出错，原因是因为
        (value[0] || value[1]) && location.reload()
      }
      if (event.key === 'getSessionStorage') {
        // console.log('getSessionStorage', event.newValue, event)
        // 已存在的标签页会收到这个事件
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
        localStorage.removeItem('sessionStorage');
      }
      if (event.key === 'sessionStorage') {
        // 新开启的标签页会收到这个事件
        // console.log('sessionStorage', event.newValue, event)
        let data = JSON.parse(event.newValue);
        for (let key in data)
          sessionStorage[key] = data[key];
        Object.keys(data).length && location.reload()
      }
    });
  }
};

export default STORE
