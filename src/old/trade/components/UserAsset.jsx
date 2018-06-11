import React from "react";
import {observer} from "mobx-react";
import {reaction} from 'mobx'
import {translate} from "react-i18next";

@translate(['translations'], {wait: true})
@observer
class UserAsset extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {userAssetStore} = this.props;
    userAssetStore.get();

  }
  getFeeData(){
    const {userAssetStore, marketStore} = this.props;
    const [tf, tt] = marketStore.TradePair;
    const selectPair = `${tf}_${tt}`;
    return <span><em>{`Maker: ${userAssetStore.feeData[selectPair] && (userAssetStore.feeData[selectPair].fee_maker * 100).toPercent(false)},`}</em>
    <i>{`Taker: ${userAssetStore.feeData[selectPair] && (userAssetStore.feeData[selectPair].fee_taker * 100).toPercent(false)}`}</i></span>
  }
  render() {
    const exchangeRate = this.props.bankStore;
    const [tf, tt] = this.props.marketStore.TradePair;
    const userAsset = this.props.userStore;
    const assetRate = this.props.confStore.language;
    const {t} = this.props;
    if(conf.userWspk){
      return (
        <div>
          <span className='user-asset-value'>{t('总资产约')}:&nbsp;&nbsp;&nbsp;{userAsset.data['total-asset'] && Number((userAsset.data['total-asset'][assetRate])).format({style:{name:assetRate.toLowerCase()}})}
          </span>
          <img src="/static/trade/img/xianghu.svg" alt=""/>
          <span className='user-asset-from'>{t('可用')}{tf.toUpperCase()}:</span><span>{userAsset.data.wallet && userAsset.data.wallet[tf] && Number(userAsset.data.wallet[tf].avail).format({number:'property',style:{decimalLength:8}})}</span>
          <span className='user-asset-to'>{t('可用')}{tt.toUpperCase()}:</span><span>{userAsset.data.wallet && userAsset.data.wallet[tt] && Number(userAsset.data.wallet[tt].avail).format({number:'property',style:{decimalLength:8}})}</span>
          <span className='poundage'>{t('手续费')}:{this.getFeeData()}</span>
        </div>
      )
    }
      return(
        <div>
          <span className='poundage'>{t('手续费')}:{this.getFeeData()}</span>
        </div>
      )
  }
}
export default UserAsset
