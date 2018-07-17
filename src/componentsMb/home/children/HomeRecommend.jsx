import ExchangeViewBase from '../../../components/ExchangeViewBase'
import React, { Component } from "react";

export default class HomeRecommend extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {};
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    //绑定方法
    this.getRecommendCoins = controller.getRecommendCoins.bind(controller)
  }

  componentDidMount(){
    this.getRecommendCoins();
  }

  render(){
    let recs=this.state.recommendData;
    return(
      <div className='recommend'>
        <div className="noscroll">
            <div className="ul-wrap">
                <ul>
                    {recs && recs.map((v, index) => {
                        return(
                            <li key={index}>
                                <p className="p1">
                                    <span>{v.coinName.toUpperCase()}</span>
                                    <img src={v.rise>0 ? "/static/mobile/icon_shangzhang@2x.png" : "/static/mobile/icon_xiadie@2x.png"}/>
                                </p>
                                <p className="p2">
                                    <b>{Number(v.priceCN).format({number:'legal', style:{name:'cny'}})}</b>
                                    <i>{Number(v.rise).toPercent()}</i>
                                </p>
                            </li>)
                    })}
                </ul>
            </div>
        </div>
      </div>
    )
  }
}