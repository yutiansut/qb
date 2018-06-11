import {observable, reaction} from 'mobx';
import {RequestStore} from "../../store/request.jsx";
// import Swal from 'sweetalert2'


export default class ModalDialogStore extends RequestStore {
  WAY = {
    EVERY: 'EVERY',
    TWO_HOUR: 'TWO_HOUR',
    NEVER: 'NEVER',
  };
  @observable way = this.WAY.EVERY;
  @observable userWay = this.WAY.EVERY;
  @observable password = '';
  @observable step = 0


  constructor(url, settings) {
    super(url, settings);
    this.setWay = this.setWay.bind(this);
    this.setUserWay = this.setUserWay.bind(this);
    this.setStep = this.setStep.bind(this);
    this.setPassword = this.setPassword.bind(this);
    reaction(() => this.response.jqXHR, data => {
      // console.log('ModalDialogStore',data)
      // this.way = this.WAY.EVERY;
      if (data.status === 422 || data.status === 401) {
        swalMix({
          width:274,
          position:'top-end',
          timer: 3000,
          padding: '0px',
          backdrop: false,
          customClass:'trade-swalMix-one',
          showCloseButton:false,
          background:"rgba(235, 90, 90, 0.5) url('/static/trade/img/chucuo.svg') no-repeat 14px center/42px 32px",
          html: `<div style="color:#FFFFFF;font-size: 14px;letter-spacing: 0;text-indent:65px;text-align:left;">${data.responseText}</div>`
        })
        return;
      }
      if (data.status === 200) {
        // Swal({
        //   html: `<div class="h-100 d-flex justify-content-center align-items-center ">succeed</div>!`,
        //   showConfirmButton: false,
        //   timer: 1750,
        //   width: '275px',
        //   background: 'rgba(37,156,173, 0.9)',
        //   padding: '0px',
        // });
        this.setUserWay(this.way)
      }
    })
  }


  setPassword(password) {
    this.password = password;
  }

  setUserWay(userWay){
    if (Object.values(this.WAY).includes(userWay)) {
      this.userWay = userWay;
    }
  }

  setWay(way) {
    // console.log('setWay', way, Object.values(this.WAY) ,Object.values(this.WAY).includes(way))
    if (Object.values(this.WAY).includes(way)) {
      this.way = way;
    }
  }

  setStep(value) {
    // console.log('setStep', value)
    this.step = Number(value)
  }

}
