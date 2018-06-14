import React, { Component } from 'react';
import assetManage from "./AssetManage";

export default class Balance extends assetManage {

  constructor(props) {
    super(props);
    // console.log(this.state)
    //绑定方法
    // this.getData = controller.getData.bind(controller)
    // this.data =
  }

  componentWillMount() {

  }

  componentDidMount() {
 
  }

  componentWillUpdate(...parmas) {

  }


  render() {
    return (
      <div>
       账户余额
      </div>
    );
  }

}