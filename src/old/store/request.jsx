import {action, computed} from "mobx";
import {ResponseStore} from "./response.jsx";
// import jQuery from 'jquery';

/**
 * 服务器交互Store. 默认一个url, 一个store
 */
class RequestStore {

  constructor(url, settings = {}) {

    this.url = url;
    this.settings = settings;
    this.response = new ResponseStore();
  }


  @computed get recvData() {
    // console.log(this.response.data)
    return this.response.data || {};
  }

  /**
   * 子类需重写这个方法, 当调用get， post, put, delete时，
   * 如果没有提供参数， 将默认调用此方法。
   * @returns {string}
   */
  @computed get submitData() {
    return JSON.stringify({})
  }

  @action
  request(method, settings = {}) {
    const _method = method.toUpperCase();
    let s = {
      url: this.url,
      method: _method,
      contentType: "application/json; charset=UTF-8"
    };
    Object.assign(s, this.settings);
    Object.assign(s, settings);
    this.response.request = s;
    return $.ajax(s).done(this.done).fail(this.fail)
  }

  @action.bound
  done(data, textStatus, jqXHR) {
    this.response.data = data;
    this.response.textStatus = textStatus;
    this.response.jqXHR = jqXHR;
  }

  @action.bound
  fail(jqXHR, textStatus, errorThrown) {
    this.response.jqXHR = jqXHR;
    this.response.textStatus = textStatus;
    this.response.errorThrown = errorThrown;
  }

  put(data, settings = {}) {
    delete settings.data;
    return this.request('put', Object.assign({data: data || this.submitData}, settings))
  }

  delete(data, settings = {}) {
    delete settings.data;
    return this.request('delete', Object.assign({data: data || this.submitData}, settings))
  }

  post(data, settings = {}) {
    delete settings.data;
    return this.request('post', Object.assign({data: data || this.submitData}, settings))
  }

  patch(data, settings = {}) {
    delete settings.data;
    return this.request('patch', Object.assign({data: data || this.submitData}, settings))
  }

  get(data, settings = {}) {
    delete settings.data;
    let s = {
      data: data || this.submitData,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    return this.request('get', Object.assign(s, settings))
  }
}

export {RequestStore}
