import React from 'react';
import exchangeViewBase from '../../ExchangeViewBase.jsx';
import Input from '../../../common/component/Input'
import Button from '../../../common/component/Button'

import '../stylus/setPassword.styl'

export default class UserCenterIndex extends exchangeViewBase {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="user-set-password">
        <div>
          <h2>旧密码</h2>
          <Input type="default" placeholder="请输入旧密码" className="input"/>
        </div>
        <div>
          <h2>新密码</h2>
          <Input type="default" placeholder="请输入旧密码" className="input"/>
        </div>
        <div>
          <h2>再输一遍</h2>
          <Input type="default" placeholder="请输入旧密码" className="input"/>
        </div>
        <Button type="base" title="提交" className="button"/>
      </div>
    );
  }
}