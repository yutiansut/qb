import React from "react";
import ExchangeViewBase from "../../../components/ExchangeViewBase.jsx";
import QRCode from "qrcode.react";
import RemindPopup from "../../../common/component/Popup/index.jsx";
import Button from "../../../common/component/Button";

export default class GoogleKey extends ExchangeViewBase {
  constructor(props) {
    super(props);
    const { controller } = this.props;
    let currentType = controller.getQuery("currentType") && Number(controller.getQuery("currentType")),
        currentKey = controller.getQuery("currentKey") && Number(controller.getQuery("currentKey"));
    if(!controller.store.state.userInfo.googleAuth) this.props.history.push('/user/safe/twoverify')
    this.state = {
      intro: [
        this.intl.get('user-googleKey1'),
        this.intl.get('user-googleKey2'),
        this.intl.get('user-googleKey3'),
        this.intl.get('user-googleKey4'),
      ],
      currentType: currentType || false,
      currentKey: currentKey || false,
      remindPopup: false,
      popMsg: "",
    };
    controller.setView(this);
    let { googleSecret } = controller.initState;
    this.state = Object.assign(this.state, { googleSecret });
    this.getGoogle = controller.getGoogle.bind(controller)
    this.copy = (el)=>{
      this.setState({
        remindPopup: true,
        popMsg: controller.copy(el) ? this.intl.get("asset-copySuccess") : this.intl.get("asset-option-failed")
      });
    }
  }

  componentWillMount() {}
  async componentDidMount() {
    this.props.addContent({ con: this.intl.get('user-googleKey-title') });
    await this.getGoogle()
  }

  render() {
    const { controller, history } = this.props;
    return (
      <div className="user-center-googlekey">
        <div className="qrcode">
          <QRCode value={`otpauth://totp/exchange?secret=${this.state.googleSecret}`} level="M" bgColor="#D5D6D6" />
        </div>
        <div className="key clearfix">
          <div className="input">
            <input value={this.state.googleSecret} readOnly ref="key"/>
          </div>
          <span onClick={()=>{this.copy(this.refs.key)}}>{this.intl.get("copy")}</span>
        </div>
        <div className="intro">
          <ul>
            {this.state.intro.map((v, index) => <li key={index}>{v}</li>)}
          </ul>
        </div>
        <Button title={this.intl.get('next')} type="base" onClick={()=>{
          history.push({pathname:`/user/verifybind/?type=1&currentType=${this.state.currentType}&currentKey=${this.state.currentKey}`, query:{from:true}})
        }}/>
        {this.state.remindPopup && (
          <RemindPopup
            type="tip1"
            msg={this.state.popMsg}
            h5={true}
            autoClose={true}
            onClose={() => {
              this.setState({ remindPopup: false });
            }}
          />
        )}
      </div>
    );
  }
}
