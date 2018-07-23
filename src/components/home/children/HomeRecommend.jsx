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
    // this.state.language = controller.language
    // console.log(this.state)
    //绑定方法
    // this.updateRecommend = controller.updateRecommend.bind(controller);
    this.getRecommendCoins = controller.getRecommendCoins.bind(controller)
  }
  async componentDidMount(){
    await this.getRecommendCoins()
    // console.log('this.state.language', this.state.language, this.props.controller.language)
    // this.setState({
    //   language: this.props.controller.language
    // })
  }

  render(){
    const {controller} = this.props
    // console.log('this.state.language', this.state.language)
    return(
      <div className='home-recommend'>
        <ul className="clearfix">
          {this.state.recommendData && this.state.recommendData.map((v, index) => {return(
            <li className='home-recommend-pair clearfix' key={index}>
              <span>{v.coinName.toUpperCase()}</span>
              <b>{controller.language === 'zh-CN' && Number(v.priceCN || 0).format({
                number: 'legal',
                style: {name: 'cny'}
              }) || Number(v.priceEN || 0).format({number: 'legal', style: {name: 'usd'}})}</b>
              <i className={`${v.rise > 0 ? 'up-i' : 'down-i'} home-updown`}>{Number(v.rise).toPercent()}</i>
            </li>
          )}) || null}
        </ul>
      </div>
    )
  }
}