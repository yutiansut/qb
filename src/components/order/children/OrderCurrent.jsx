import ExchangeViewBase from '../../ExchangeViewBase'
import React, { Component } from "react";

export default class OrderCurrent extends ExchangeViewBase{
  constructor(props){
    super(props);
    this.state = {
    
    };
    const {controller} = this.props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
  }
  componentWillMount(){
  
  }
  componentDidMount(){
  
  }
  render() {
  return(
      <h3>dangqian</h3>
  )
  }
}