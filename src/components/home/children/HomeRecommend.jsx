import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";

export default class HomeRecommend extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {};
    const {controller} = this.props;
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    // console.log(this.state)
    //绑定方法
    // this.updateRecommend = controller.updateRecommend.bind(controller);
    // this.getData = controller.getData.bind(controller)
  }
  componentDidMount(){

  }

  render(){
    return(
      <div className='home-recommend'>
        <ul className="clearfix">
          {this.state.recommendData.map((v, index) => {return(
            <li className='home-recommend-pair' key={index}>
              <span>{v.coinName}</span>
              <p>
                <b>{v.priceCN.toFixed(2)}</b>
                <i className={`${v.rise > 0 ? 'up-i' : 'down-i'}`}>{v.rise}</i>
              </p>
            </li>
          )})}
        </ul>
      </div>
    )
  }
}