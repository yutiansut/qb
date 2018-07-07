import React, { Component } from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase";



export default class Terms extends exchangeViewBase {
  constructor(props) {
    super(props);
    // const {controller} = props
    // console.log('jsxconfig',controller.configData)
  }

  componentWillMount() { }

  componentDidMount() { }
  render() {
    const { controller } = this.props;
    let { nameUsd, netUrl } = controller.configData;
    const content = this.getContent(nameUsd);
    return <div className="help-terms">
      <h2 className="title">{this.intl.get('help-terms')}</h2>
      <p>
        {this.intl.get('help-termsFirst')}
      </p>
      <p>
        {this.intl.get('help-termsSecond')}
      </p>
      {content.map((v, index) => <div key={index}>
        <h3>{v.title}</h3>
        <ul>
          {v.content.map((v, index) => <li key={index}>
            {v.title}
            {v.detail && <ol>
              {v.detail.map((v, index) => <li key={index}>{v}</li>)}
            </ol>}
          </li>)}
        </ul>
      </div>)}
    </div>;
  }
  getContent(nameUsd) {
    return [
      {
        title: this.intl.get('help-terms-1'),
        content: [
          {
            title: this.intl.get('help-terms-1-1'),
          },
          {
            title: this.intl.get('help-terms-1-2'),
          }
        ]
      },
      {
        title: this.intl.get('help-terms-2'),
        content: [
          {
            title: this.intl.get('help-terms-2-1')
          },
          {
            title: this.intl.get('help-terms-2-2')
          },
          {
            title: this.intl.get('help-terms-2-3')
          },
          {
            title: this.intl.get('help-terms-2-4')
          },
          {
            title: this.intl.get('help-terms-2-5')
          },
          {
            title: this.intl.get('help-terms-2-6'),
            detail: [
              this.intl.get('help-terms-2-6-1'),
              this.intl.get('help-terms-2-6-2')
            ]
          }
        ]
      },
      {
        title: this.intl.get('help-terms-3'),
        content: [
          {
            title: this.intl.get('help-terms-3-1'),
            detail: [
              this.intl.get('help-terms-3-1-1'),
              this.intl.get('help-terms-3-1-2'),
              this.intl.get('help-terms-3-1-3'),
              this.intl.get('help-terms-3-1-4'),
            ]
          },
          {
            title: this.intl.get('help-terms-3-2'),
          },
          {
            title: this.intl.get('help-terms-3-3'),
            detail: [
              this.intl.get('help-terms-3-3-1'),
              this.intl.get('help-terms-3-3-2'),
              this.intl.get('help-terms-3-3-3'),
            ]
          }
        ]
      },
      {
        title: this.intl.get('help-terms-4'),
        content: [
          {
            title: this.intl.get('help-terms-4-1'),
            detail: [
              this.intl.get('help-terms-4-1-1'),
              this.intl.get('help-terms-4-1-2'),
              this.intl.get('help-terms-4-1-3'),
              this.intl.get('help-terms-4-1-4'),
            ]
          },
          {
            title: this.intl.get('help-terms-4-2'),
          },
          {
            title: this.intl.get('help-terms-4-3'),
          },
          {
            title: this.intl.get('help-terms-4-4'),
          },
          {
            title: this.intl.get('help-terms-4-5'),
          },
          {
            title: this.intl.get('help-terms-4-6'),
          }
        ]
      },
      {
        title: `五、用户义务`,
        content: [
          {
            title: `1. 不得利用本站进行违反用户所在国家法律的行为。`,
          },
          {
            title: `2. 用户不得通过任何手段恶意注册${nameUsd}网站帐号，包括但不限于以牟利、炒作、套现、获奖等为目的多个账号注册。用户亦不得盗用其他用户帐号。如用户违反上述规定，则${nameUsd}有权直接采取一切必要的措施，包括但不限于删除用户发布的内容、取消用户在网站获得的积分、奖励以及虚拟财富，暂停或查封用户帐号，取消因违规所获利益等。`,
          },
          {
            title: `3. 禁止用户将${nameUsd}以任何形式作为从事各种非法活动的场所、平台或媒介。如用户违反上述规定，则${nameUsd}有权直接采取一切必要的措施，包括但不限于删除用户发布的内容、取消用户在网站获得的积分、奖励以及虚拟财富，暂停或查封用户帐号，取消因违规所获利益等。`,
          },
        ]
      },
      {
        title: `六、拒绝担保与免责`,
        content: [
          {
            title: `1. ${nameUsd}作为“网络服务提供者”的第三方平台，不担保网站平台上的信息及服务能充分满足用户的需求`,
          },
          {
            title: `2. 基于互联网的特殊性，${nameUsd}也不担保服务不会受中断，对服务的及时性、安全性都不作担保，不承担非因${nameUsd}导致的责任。`,
          },
          {
            title: `3. ${nameUsd}不对用户所发布信息的保存、修改、删除或储存失败负责。`
          },
          {
            title: `4. ${nameUsd}内所有用户所发表的用户评论，仅代表用户个人观点，并不表示本网站赞同其观点或证实其描述，本网站不承担用户评论引发的任何法律责任。`,
          },
          {
            title: `5. ${nameUsd}有权删除${nameUsd}内各类不符合法律或协议规定的信息，而保留不通知用户的权利。`,
          },
          {
            title: `6. 所有发给用户的通告，${nameUsd}都将通过正式的页面公告、站内信、电子邮件、客服电话、手机短信或常规的信件送达。任何非经${nameUsd}正规渠道获得的中奖、优惠等活动或信息，${nameUsd}不承担法律责任。`,
          },
          {
            title: `7. ${nameUsd}有权根据市场情况调整充值、提现、交易等手续费费率，有权决定免费推广期的终止。`,
          }
        ]
      },
      {
        title: `七、适用法律和裁判地点`,
        content: [
          {
            title: `1. 因用户使用${nameUsd}站而引起或与之相关的一切争议、权利主张或其它事项，均受公司注册地（英国）法律管辖。`,
          },
          {
            title: `2. 用户和${nameUsd}发生争议的，应首先本着诚信原则通过协商加以解决。如果协商不成，则应向${nameUsd}注册地（英国）法院提起诉讼。`,
          }
        ]
      },
      {
        title: `八、可分性`,
        content: [
          {
            title: `如果本协议的任何条款被视为不合法、无效或因任何原因而无法执行，则此等规定应视为可分割，不影响任何其它条款的法律效力。`,
          }
        ]
      },
      {
        title: `九、冲突选择`,
        content: [
          {
            title: `本协议是${nameUsd}与用户注册成为${nameUsd}用户，使用${nameUsd}服务之间的重要法律文件，${nameUsd}或者用户的任何其他书面或者口头意思表示与本协议不一致的，均应当以本协议为准。`,
          }
        ]
      },
    ]
  }
}
