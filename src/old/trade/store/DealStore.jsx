import {observable, reaction, computed} from 'mobx';
import {RequestStore} from "../../store/request.jsx";
// import Swal from 'sweetalert2'

/**
 * 部分成交/全部成交
 */
class DealStore extends RequestStore {
  @observable coin_market = '';


  constructor(url, settings) {
    super(url, settings);
    reaction(() => this.response.jqXHR, data => {
      if (data.status !== 200) {
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
      // if (data.status === 200) {
      //   Swal({
      //     html: `<div class="h-100 d-flex justify-content-center align-items-center ">succeed</div>!`,
      //     showConfirmButton: false,
      //     timer: 1750,
      //     width: '275px',
      //     background: 'rgba(37,156,173, 0.9)',
      //     padding: '0px',
      //   });
      // }
    })
  }

  @computed get coin() {
    // console.log('this.coin_market',this.coin_market)
    return this.coin_market && this.coin_market.split('_')[0]
  }

}

export default DealStore
