import React from "react";
import ExchangeViewBase from "../../../components/ExchangeViewBase.jsx";
import QRCode from "qrcode.react";
import Button from "../../../common/component/Button";
import Input from "../../../common/component/Input";

export default class GoogleKey extends ExchangeViewBase {
  constructor(props) {
    super(props);
    if(!this.props.location.query) this.props.history.push('/user/safe/twoverify')
    this.state = {
      key: "2NEOSUGE4MBPIT5W",
      intro: [
        `1.安装在“Google Authenticator”应用程序中，点击右上角“+”号，然后选择“手动输入验证码/扫描条形码”。`,
        `2.选择手动输入，则复制上面的“密钥”到“密钥”输入栏，并填写您的QB账号，点击“完成”；选择扫描则会自动生成谷歌验证码；`,
        `3.点击下一步，将“谷歌验证码”输入到下一页的“谷歌验证码”输入栏。`,
        `请将16位密钥记录在纸上，并保存在安全的地方。如遇手机丢失，你可以通过该密钥恢复你的谷歌验证。`
      ]
    };
    const { controller } = this.props;
    controller.setView(this);
    this.copy = (el)=>{
      controller.copy(el)
    }
  }

  componentWillMount() {}
  componentDidMount() {
    this.props.addContent({ con: "绑定谷歌身份认证器" });
  }

  render() {
    const { controller, history } = this.props;
    return (
      <div className="user-center-googlekey">
        <div className="qrcode">
          <QRCode value={this.state.key} level="M" bgColor="#D5D6D6" />
        </div>
        <div className="key clearfix">
          <div className="input">
            <input value={this.state.key} readOnly ref="key"/>
          </div>
          <span onClick={()=>{this.copy(this.refs.key)}}>复制</span>
        </div>
        <div className="intro">
          <ul>
            {this.state.intro.map((v, index) => <li key={index}>{v}</li>)}
          </ul>
        </div>
        <Button title="下一步" type="base" onClick={()=>{
          history.push({pathname:'/user/verifybind/?type=1', query:{from:true}})
        }}/>
      </div>
    );
  }
}
