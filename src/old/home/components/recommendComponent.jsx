import {observer} from "mobx-react";
import React from "react";
// import echarts from "echarts";
import EchartsLine from "./echartsLine.jsx"
import {translate} from "react-i18next";

@translate(['translations'], {wait: true})
@observer
class RecommendComponent extends React.Component {
  constructor(props) {
    super(props);
    const {store} = this.props;
    store.get();
  };

  render() {
    const {store} = this.props;
    const {t} = this.props;
    let homeRecommendContent = store.recommendData.map((v, i) => {
      return (
        <div className="rec-pairs" key={i}>
          <div className="rec-pairs-top">
            <p className="rec-pairs-name mix-title-font" style={{'cursor':'pointer'}}>
              <a
                href={conf.tradeUrl+'?coin='+`${(v.name.toLowerCase()).split("_")[0]}`+'&market='+`${(v.name.toLowerCase()).split("_")[1]}`}
              >
                {v.name.split("_").reduce((a, b) => !a && a + b || a + '/' + b, '').toUpperCase()}
              </a>
            </p>
            <p className={`rec-pairs-updown mix-title-font ${v.updown && (v.updown>0 && "market-arrow-green market-text-green" || "market-arrow-red market-text-red")}`}>{v.updown && v.updown.toPercent() || 0}</p>
          </div>
          <div className="rec-pairs-bottom">
            <p className="rec-pairs-last" >
              <span className={`${v.raise && (v.raise<0 && "market-text-red" || "market-text-green")}`}>{v.last && Number(v.last).format() || 0}</span>
              <span className="mix-text-gray" style={{margin:"0px 0px 0px 10px"}}>{conf.languageCode === 'zh-hans' && Number(v.price_to_cny || 0).format('cny') || Number(v.price_to_usd || 0).format('usd')}</span>
            </p>
            <p className="rec-pairs-money mix-text-gray">{t('成交额')}：{v.money.format()} {v.name.split("_")[1].toUpperCase()}</p>
          </div>
          <div>
            <EchartsLine data={v.line} type="block"/>
            {/*<div ref="line" className="rec-pairs-line">{v.line}</div>*/}

          </div>
        </div>
      )
    })
    return (
      <div className="rec-markets">
        {homeRecommendContent}
      </div>
    )
  }

}

export default RecommendComponent
