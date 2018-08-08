import React from 'react';
import exchangeViewBase from '../../ExchangeViewBase';


export default class HomeBanner extends exchangeViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    let lang = this.props.controller.configController.store.state.language;
    let headSrc = lang === 'zh-CN' ? '../../../../static/web/home/text_cn@2x.svg' : '../../../../static/web/home/text_en@2x.svg'
    return (
      <div className='home-banner-wrap'>
        <div className='home-banner-ct'>
          <img className='head' src={headSrc}/>
          <div className='images'>
            <img src='../../../../static/web/home/1.jpg'/>
            <img src='../../../../static/web/home/2.jpg'/>
            <img src='../../../../static/web/home/3.jpg'/>
          </div>
        </div>
      </div>
    );
  }
}
