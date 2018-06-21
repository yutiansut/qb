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
    console.log(this.state)
    //绑定方法
    // this.recommendDataHandle = controller.recommendDataHandle.bind(controller);
    // this.getData = controller.getData.bind(controller)
  }
  componentDidMount(){
    // this.recommendDataHandle();
  }
  render(){
    return(
        <div className='home-recommend'>
          {this.state.recommendData.map((v, index) => {return(
              <div className='home-recommend-pair' key={index}>
                {v.coin_name}---{v.coin_data.price}----{v.coin_data.rise}
              </div>
          )})}
        </div>
    )
  }
}