import React, {Component} from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase'
import Button from '../../../common/component/Button/index.jsx'
import Select from '../../../common/component/SelectButton/index.jsx'
import "../stylus/safe.styl"
import SelectButton from "../../../common/component/SelectButton";

export default class userSafeCenter extends exchangeViewBase {

  constructor(props) {
    super(props);
    console.log(props)
    this.state={
      testAaA:'11111'
    }
    // this.state = {count: 1}
    // console.log(props)
    // const {controller} = props
    // //绑定view
    // this.state = controller.setView(this)
    // // console.log(this.state)
    // //绑定方法
    // this.getData = controller.getData.bind(controller)
    // this.data =
    this.test = this.test.bind(this)
  }

  test(){
    this.setState({testAaA:'222222'})
  }

  componentWillMount() {
    // super.componentWillMount();
    console.log('user componentWillMount')
  }

  componentDidMount() {
    // super.componentDidMount();
    console.log('user componenDidMount')
  }

  componentWillUpdate(props, state, next) {
    console.log('user componentWillUpdate', props.match, props, state, next)
  }


  render() {
    return (
      <div className="safe-content">
        <h1>安全中心</h1>
        <div className="basic-data model-div clearfix">
          <h2>基本资料</h2>
          <ul className="fl clearfix">
            <li>用户ID</li>
            <li>111111</li>
            <li>电子邮件</li>
            <li>绑定邮箱</li>
            <li>手机号</li>
            <li>22222</li>
            <li>用户等级</li>
            <li>333333</li>
          </ul>
        </div>
        <div className="change-pass model-div clearfix">
          <h2>修改密码</h2>
          <div className="fl">
            <ol className="clearfix">
              <li>登录密码</li>
              <li>设置</li>
            </ol>
            <ul className="clearfix">
              <li>资金密码</li>
              <li>设置</li>
              <li>设置了资金密码后，提币和提现时均需要输入，账户更安全。</li>
            </ul>
          </div>
        </div>
        <div className="verify model-div clearfix">
          <h2>两步验证</h2>
          <div className="fl">
            <p>当您开启两步验证后，在进行登录、修改密码、提币、提现交易等重要操作时，必须输入某个一次性密码才能继续。</p>
            <dl className="clearfix">
              <dt>登录验证</dt>
              <dd>谷歌验证</dd>
              <dd>邮件</dd>
              <dd>短信</dd>
              <dd>无</dd>
            </dl>
            <dl className="clearfix">
              <dt>提现验证</dt>
              <dd>谷歌验证</dd>
              <dd>邮件</dd>
              <dd>短信</dd>
            </dl>
            <dl className="clearfix">
              <dt>修改资金密码验证</dt>
              <dd>谷歌验证</dd>
              <dd>邮件</dd>
              <dd>短信</dd>
            </dl>
          </div>
        </div>
        <div className="other model-div">其他安全设置+</div>
        <div className="other-item">
          <div className="time model-div clearfix">
            <h2>其他设置</h2>
            <ul className="fl">
              <li>时区</li>
              <li>
                <Button title="保存" className="time-btn"/>
              </li>
            </ul>
          </div>
          <div className="notify model-div clearfix">
            <h2>通知设置</h2>
            <ul className="fl">
              <li>登录/充值/提现到账区</li>
              <li>
                <span>邮件通知</span>
                <span>短信通知</span>
              </li>
            </ul>
          </div>
          <div className="name-list model-div clearfix">
            <h2>IP白名单</h2>
            <div className="fl">
              <b>注：请勿添加IP会变动的网络至IP白名单（如：拨号上网）以免影响您的正常使用。</b>
              <div>
                <input type="text" placeholder="IP地址"/>
                <Button title="添加" className="name-btn" onClick={this.test}/>
                <p>{this.state.testAaA}</p>
              </div>
              <span>例如：216.58.197.238或104.244.42.0/24</span>
              <table>
                <thead>
                  <tr>
                    <th>IP地址</th>
                    <th>添加时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>216.58.197.238</td>
                    <td>2018-01-18 10:23:22</td>
                    <td>删除</td>
                  </tr>
                </tbody>
              </table>
              <p>
                添加IP地址或范围后，你将无法从这个白名单之外的IP地址登录你的账户。出于安全方面的考虑，添加或删除IP地址后，你的账户将在24小时内无法提现。你可以访问mixcoins.com/ip/获得当前IP地址。
              </p>
            </div>
          </div>
          <div className="notify model-div clearfix">
            <h2>登录设备</h2>
            <div className="fl">
              <p>当前已登录你账户的浏览器或设备</p>
              <table>
                <thead>
                  <tr>
                    <th>登录时间</th>
                    <th>设备</th>
                    <th>IP</th>
                    <th>地点</th>
                    <th>是否当前</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2018-01-18 10:23:22</td>
                    <td>Windows 10/Chrome55.0.2883</td>
                    <td>216.58.197.238</td>
                    <td>China Beijing</td>
                    <td>是</td>
                  </tr>
                </tbody>
              </table>
              <Button title="退出所有其他状态" className="notify-btn"/>
            </div>
          </div>
          <div className="notify model-div clearfix">
            <h2>最近10条记录</h2>
            <table className="fl">
              <thead>
                <tr>
                  <th>日志类型</th>
                  <th>IP</th>
                  <th>地点</th>
                  <th>时间</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2登录日志</td>
                  <td>106.38.92.64</td>
                  <td>216.58.197.238</td>
                  <td>China Beijing</td>
                  <td>是</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

}