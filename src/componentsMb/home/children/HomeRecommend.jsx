import ExchangeViewBase from '../../ExchangeViewBase'
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

    //推荐列表左右滑动
    /*
    let $ul=this.refs.recomendUl;
    let dragX=-1;
    $ul.addEventListener("touchstart",(event)=>{
      dragX=event.targetTouches[0].pageX;
    });
    document.addEventListener("touchmove",(event)=>{
      if(dragX<0) return;
      let dX=event.targetTouches[0].pageX-dragX;
      $ul.style.left=$ul.offsetLeft+dX+"px";
      dragX=event.targetTouches[0].pageX;
    });

    document.addEventListener("touchend",()=>{
      let uW=$ul.clientWidth;
      let outW=$ul.offsetParent.offsetWidth;
      if($ul.offsetLeft>0){
        $ul.style.left=0;
      }else if($ul.offsetLeft<outW-uW){
        $ul.style.left=outW-uW+"px";
      }
      dragX=-1;
    });
    */
  }

  render(){
    return(
      <div className='home-recommend'>
        <div className="noscroll">
            <div className="ul-wrap">
                <ul className="clearfix" ref="recomendUl">
                    {this.state.recommendData.map((v, index) => {return(
                        <li className='home-recommend-pair' key={index}>
                            <p className="p1">
                                <span>{v.coinName.toUpperCase()}</span>
                                <img src={v.rise>0 ? "/static/mobile/icon_shangzhang@2x.png" : "/static/mobile/icon_xiadie@2x.png"}/>
                            </p>
                            <p className="p2">
                                <b>{Number(v.priceCN).format({number:'legal', style:{name:'cny'}})}</b>
                                <i>{Number(v.rise).toPercent()}</i>
                            </p>
                        </li>
                    )})}
                </ul>
            </div>
        </div>
      </div>
    )
  }
}