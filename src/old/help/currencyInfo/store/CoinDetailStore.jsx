import {computed, observable} from "mobx";
import {observer} from "mobx-react";

class CoinDetailStore {
  // @observable username = '';
  // @observable password = '';
  @observable changePrice = 'USD';
  @observable circulationVolume = '';
  @observable priceUsd = '';
  @observable priceCny = '';
  @observable totalValueUsd = '';
  @observable totalValueCny = '';
  @observable codeName = '';
  @observable codeFullName = '';
  @observable description = '';
  @observable webSite='';
  @observable whitePaper='';
  @observable blockSites='';
  @observable releaseTime='';
  @observable releasePriceUsd='';
  @observable releasePriceCny='';
  @observable totalVolume='';


  constructor(tradeList, allArray) {
    this.errors = this.errors.bind(this);
    this.tradeList = tradeList;
    this.allArray = allArray;
  }

  setField(field, event){

  }

  errors() {
    let error = false;
    let msg = '';

    if (!this.isValidUsername) {
      error = true;
      msg = 'username must in [6, 20]';
    } else if (!this.isValidPassword) {
      error = true;
      msg = 'password must in [6, 20]';
    }
    return {error, msg}
  }

  @computed get isValidUsername() {
    return this.username.length >= 6 && this.username.length <= 20
  }

  @computed get isValidPassword() {
    return this.password.length >= 6 && this.password.length <= 32
  }
}

export default CoinDetailStore
