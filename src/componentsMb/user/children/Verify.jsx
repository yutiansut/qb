import React from 'react';
import exchangeViewBase from '../../../components/ExchangeViewBase.jsx';
import Input from '../../../common/component/Input'

export default class AboutUs extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
    }
    const {controller} = this.props
    controller.setView(this)
    this.state = {
      title: ['邮箱两步验证', '谷歌验证码', '短信两步验证' ],
      type: controller.getQuery('type'),//0 邮箱，1谷歌，2短信
      account: '',
      code: '',
      accountText: ['邮箱地址', '请输入谷歌验证码', '手机地址'],
      codeText: ['邮箱验证码', '' ,'短信验证码']

    }
  }

  componentWillMount() {
  }
  componentDidMount() {

  }

  render() {
    const {controller, history} = this.props;
    console.log(this.state.type)
    return (
      <div className='user-center-verify'>
        <Input></Input>
        <Input></Input>
      </div>
    );
  }
}