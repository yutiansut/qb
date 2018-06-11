import {observable, computed} from "mobx";
import {RequestStore} from "../../../store/request.jsx";

class PEStore extends RequestStore {
  @observable pe = '';   // phone/email.
  @observable token = '';
  @observable challenge = '';
  @observable captcha = '';  // 验证码.
  @observable captchaBtnChecked = ''; // 验证码按钮点击了
  @observable timer = 0;
  @observable protocol = true;  // 用户协议.
  vaptchaConfig = {};

  constructor(url, settings = {}) {
    super(url, settings);
    this.type = settings.type;
    this.initVaptcha = this.initVaptcha.bind(this);
  }

  @computed get isValidPE() {
    return this.pe.length >= 7
  }

  @computed get validated() {
    return this.token && this.challenge;
  }

  @computed get submitData() {
    return JSON.stringify({
      to: this.pe,
      type: this.type,
      captcha: this.captcha,
      token: this.token,
      challenge: this.challenge
    })
  }

  @computed get canSubmit() {
    return this.pe && this.captcha && this.protocol
  }

  initVaptcha(window) {
    window.vaptcha(this.vaptchaConfig, function (vaptcha_obj) {
      vaptcha_obj.init();
    });
  }
}

export default PEStore;
