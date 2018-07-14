import React, {Component} from 'react';
import exchangeViewBase from '../../components/ExchangeViewBase'
import Pagination from '../../common/component/Pagination/index.jsx'
import "./stylus/userNotice.styl"

export default class userNotice extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {}
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getUserNotice = controller.getUserNotice.bind(controller) // 获取通知列表
  }

  setView(view){
    super.setView(view);
    // view.setState({count: this.store.count})
    return this.store.data
  }


  componentWillMount() {

  }

  async componentDidMount() {
    await this.getUserNotice(0, 0, 10)

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    console.log('内容', this.state.userNotice)
    return (
      <div className="user-notice-wrap">
        <h1>通知</h1>
        <table>
          <thead>
            <tr>
              <th>{this.intl.get("notice-title")}</th>
              <th>{this.intl.get("time")}</th>
            </tr>
          </thead>
          {/*<tbody className={`${Object.keys(this.state.userNotice).length ? '' : 'hide'}`}>*/}
          {/*{Object.keys(this.state.userNotice).length && this.state.userNotice.list && this.state.userNotice.list.map((v, index) => (*/}
            {/*<tr key={index}>*/}
              {/*<td>*/}
                {/*<b className={`${v.isRead === 0 ? '' : 'no-read'} read-flag`}></b>*/}
                {/*{v.content}*/}
              {/*</td>*/}
              {/*<td>{v.createAt}</td>*/}
            {/*</tr>))*/}
            {/*}*/}
          {/*</tbody>*/}
        </table>
        <p className={Object.keys(this.state.userNotice).length ? 'hide' : ''}>{this.intl.get("user-none")}</p>
        <div className={Object.keys(this.state.userNotice).length ? '' : 'hide'}>
          {/*{this.state.noticeList.totalCount && <Pagination total={this.state.noticeList.totalCount}*/}
            {/*pageSize={10}*/}
            {/*showTotal={true}*/}            {/*showQuickJumper={true}/>}*/}
        </div>
      </div>
    );
  }
}