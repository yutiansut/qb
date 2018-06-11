import {computed, observable} from "mobx";

class TimerStore {
  @observable timer = 0; // 倒计时器

  constructor(start = 120, end = 0) {
    this.start = start;
    this.end = end;
    this.countDown = this.countDown.bind(this);
  }

  // 是否可点击
  @computed get status() {
    if (this.timer === this.end) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      return true
    }
    return false;
  }

  countDown() {
    if (this.status) {
      this.timer = this.start;
      this.interval = setInterval(() => {
        this.timer -= 1;
      }, 1000)
    }
  }
}


export default TimerStore
