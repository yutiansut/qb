import React, {Component} from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase'
import "../stylus/noticeDetail.styl"

export default class homeNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {}
    // const {controller} = props
    // // 绑定view
    // controller.setView(this)
    // // 初始化数据，数据来源即store里面的state
    // this.state = Object.assign(this.state, controller.initState);
    // console.log('资讯', this.state)
  }

  // setView(view){
  //   super.setView(view);
  //   return this.store.data
  // }

  componentWillMount() {
    let noticeId = this.props.location.query && this.props.location.query.noticeId;
    console.log(111, noticeId)
  }

  componentDidMount() {

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    return (
      <div className="notice-detail-wrap ">
        <h1>
          <Link>首页</Link>
          <Link>资讯概览</Link>
          <Link>资讯详情</Link>
        </h1>
        <h2>
          <span></span>
          <b></b>
        </h2>
        <h3>

        </h3>
        <h4>

        </h4>
        <div>

        </div>
        <h5>
          <span>链接：</span>
          <a href=""></a>
        </h5>
        <h6>
          <span>推荐：</span>
          <a href=""></a>
        </h6>
      </div>
    );
  }
}
