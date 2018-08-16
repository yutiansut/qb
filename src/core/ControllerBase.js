// import StoreBase from './StoreBase'
import AsyncAll from "./libs/AsyncAll"; //同步多个异步请求
import Sleep from "./libs/Sleep"; //同步多个异步请求
import Loop from "./loop"; //localStorage交互
import GlobalUtil from "./libs/GlobalUtil";
import Storage from "./storage";
import FileSaver from "file-saver";
import './libs/RSAUtil'
import Logger from "./libs/Logger";
const encrypt = new JSEncrypt();
let rsaPublicKeyFlag = false

const FILTERFUNC = {
  function: (arr, func) => arr.filter(func),
  number: (arr, num) => arr.filter(v => v === num),
  undefined: arr => arr,
  string: (arr, str) =>
    arr.filter(v => typeof v === "string" && v.indexOf(str) > -1),
  object: (arr, obj) =>
    arr.filter(v => typeof v === "object" &&
        Object.keys(obj).filter(vv => v[vv] !== "undefined" && FILTERFUNC[typeof obj[vv]]([v[vv]], obj[vv]).length).length === Object.keys(obj).length
    ),
  boolean: (arr, bool) => (bool && arr.filter(v => v)) || arr.filter(v => !v)
};

export default class ControllerBase {
  constructor() {
    this.AsyncAll = AsyncAll;
    this.Sleep = Sleep;
    this.Loop = Loop;
    this.Util = GlobalUtil;
    this.Storage = Storage;
    this.Logger = Logger;
  }

  setView(view) {
    this.view = view;
  }

  get initState() {
    return (this.store && this.Util.deepCopy(this.store.state)) || {};
  }

  RSAsetPublicKey(key){
    encrypt.setPublicKey(key);
    rsaPublicKeyFlag = true
  }

  RSAencrypt(data){
    if(!rsaPublicKeyFlag){
      return 'please set rsa publickey in method RSAsetPublicKey'
    }
    return encrypt.encrypt(data);
  }


  /**
   * 倒计时方法
   */
  countDown(key, state, view) {
    this.Loop[key].clear();
    this.Loop[key].setDelayTime(1000);
    this.Loop[key].set(async () => {
      if (view.state[state] === 0) {
        this.Loop[key].stop();
        return;
      }
      let obj = {};
      obj[state] = view.state[state] - 1;
      view.setState(obj);
    }, 1000);
    this.Loop[key].start();
  }

  countDownStop(key) {
    this.Loop[key].stop();
    this.Loop[key].clear();
  }

  /**
   * 轮播方法
   */
  swiper(key, view, state, stateCache, criticalArr, speed, displayTime) {
    this.Loop[key].clear();
    this.Loop[key].setDelayTime(displayTime);
    this.Loop[key].set(async () => {
      let obj = {};
      obj[state] = view.state[state] - speed;
      obj[stateCache] = view.state[stateCache] - speed;
      view.setState(obj);
      if (view.state[state] === criticalArr[0]) {
        view.state[stateCache] = criticalArr[criticalArr.length - 1];
      }
      if (view.state[stateCache] === criticalArr[0]) {
        view.state[state] = criticalArr[criticalArr.length - 1];
      }
      if (
        criticalArr.includes(view.state[state]) ||
        criticalArr.includes(view.state[stateCache])
      ) {
        this.Loop[key].stop();
        await this.Sleep(displayTime);
        this.Loop[key].start();
      }
    }, 100);
    this.Loop[key].start();
  }

  swiperStop(key) {
    this.Loop[key].clear();
  }

  /**
   * 从某一数组中按某一规则进行筛选
   * arr: 搜索原数组 type Array
   * rule：规则(不传或传入其他参数则返回原数组)
   *  type Function function 直接按照传入的function筛选
   *  type String string 在数组中筛选出包含rule字符串的元素
   *  type Object object 根据rule对象内部的(key, value)进行筛选，在数组中筛选出包含所有rule对象key且属性包含rule对象value的元素
   *  type Bool boolean 筛选出数组中为true或者false的元素
   *  type Number number 筛选出数组中与rule数字相等的元素
   * return 筛选后的数组
   */
  filter(arr, rule) {
    return (
      (FILTERFUNC[typeof rule] && FILTERFUNC[typeof rule](arr, rule)) || arr
    );
  }

  /**
   * 排序
   * arr: 需排序数组
   * sortValue：排序属性，即依托什么排序
   * sortDefault: 排序两者相等时的排序属性
   * type: 0 //降序 ， 1 //升序
   * return 排序后的数组
   */
  sort(arr, sortValue, type, sortDefault) {
    if (!sortValue.length) return arr;
    return this.Util.deepCopy(arr).sort((a, b) => {
      let first = a,
        second = b;
      sortValue.forEach(v => {
        first = first[v];
        second = second[v];
      });
      if (first === second && sortDefault) {
        first = a;
        second = b;
        sortDefault.forEach(v => {
          first = first[v];
          second = second[v];
        });
      }
      first = Number(first);
      second = Number(second);
      if (type) {
        if (first > second) return 1;
        if (first <= second) return -1;
      }
      if (!type) {
        if (first >= second) return -1;
        if (first < second) return 1;
      }
      //   return first - second;
      // return second - first;
    });
  }

  /**
   * 复制到剪贴板
   * el: input, 或textarea表单元素
   * return true成功或false
   */
  copy(el) {
    el.select(); // 选择对象
    try {
      if (document.execCommand("Copy", false, null)) {
        document.execCommand("Copy");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  // html5 的History 改变url不刷新页面
  changeUrl(k, v) {
    let state = {
      title: "",
      url: window.location.origin + window.location.pathname
    };
    history.replaceState(
      state,
      "",
      `${window.location.origin + window.location.pathname}?${k}=${v}`
    );
  }
// 获取url中的query
  getQuery(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1]);
  }
  // 导出excel
  exportExcel(str,fileName){
    let exportContent = "\uFEFF";
    let blob = new Blob([exportContent + str], {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(blob, fileName);
  }
}
