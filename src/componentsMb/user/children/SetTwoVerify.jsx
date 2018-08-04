import React from "react";
import ExchangeViewBase from "../../../components/ExchangeViewBase.jsx";
import BottomSelect from "../../viewsPopup/BottomSelect";
import VerifyPopup from "../../viewsPopup/TwoVerifyPopupH5";
import Popup from "../../../common/component/Popup";

export default class setTwoVerify extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      popupFlag: false,
      popupType: false,
      popupText: "",
      verifyNum: this.intl.get("sendCode"),
      mode: { 2: 0, 0: 1, 1: 2 },
      verifyList: [
        {
          key: "loginVerify",
          title: this.intl.get("user-loginVerify"),
          verifyType: { title: "", type: "" }
        },
        {
          key: "withdrawVerify",
          title: this.intl.get("user-cashVerify"),
          verifyType: { title: "", type: "" }
        },
        {
          key: "fundPassVerify",
          title: this.intl.get("user-fundVerify"),
          verifyType: { title: "", type: "" }
        }
      ],
      type: [
        "",
        this.intl.get("user-verifyEmailTitle"),
        this.intl.get("user-googleVerify"),
        this.intl.get("user-verifyPhoneTitle")
      ],
      setType: "",
      showBottomSelect: false, //控制底部菜单显示隐藏
      currentKey: "", //当前选中验证的验证类型1 email，2 google, 3 phone
      currentType: "", //选中的要修改的两步验证 1登陆   2提现   3资金密码
      googleCode: ["", "", "", "", "", ""],
      showPopup: false,
      verifyPopupType: 1
    };
    const { controller } = this.props;
    controller.setView(this);
    let { userInfo } = controller.initState;
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, { userInfo });
    this.initData = controller.initData.bind(controller); // 获取用户信息
    this.dealInput = controller.dealInput.bind(controller);
    this.delNum = controller.delNum.bind(controller);
    this.dealTwoVerify = controller.dealTwoVerify.bind(controller);
    this.getVerify = controller.getVerify.bind(controller); //获取验证码
    this.setTwoVerifyH5 = controller.setTwoVerifyH5.bind(controller); //修改两步验证
    this.clearVerify = controller.clearVerify.bind(controller);

    this.dealBottomArr = ()=>{
      let arr = [
        { value: this.intl.get("user-googleVerify"), i: 2},
        { value: this.intl.get("user-verifyPhoneTitle"), i: 3},
        { value: this.intl.get("user-verifyEmailTitle"), i: 1},
      ];
      if(this.state.currentType === 1) {
        arr.unshift({ value: '无', i: 0})
      }
      return arr;
    }
  }

  componentWillMount() {}

  async componentDidMount() {
    this.props.addContent({ con: "两步验证" });
    await this.initData();
  }

  render() {
    const { controller, url } = this.props;
    let { userInfo, verifyPopupType, type, mode, verifyNum } = this.state;
    return (
      <div className="user-center-twoStep">
        <ul className="verify-list">
          {this.state.verifyList.map((v, i) => (
            <li
              key={i}
              onClick={() => {
                this.setState({
                  showBottomSelect: true,
                  currentKey: userInfo[v.key],
                  currentType: i + 1
                });
              }}
            >
              {v.title}
              {userInfo[v.key] ? <i>{`（${type[userInfo[v.key]]}）`}</i> : ""}
              {<span>{userInfo[v.key] ? `修改` : `设置`}</span>}
            </li>
          ))}
        </ul>
        {this.state.showBottomSelect && (
          <BottomSelect
            data={this.dealBottomArr()}
            onSelect={value => {
              if (value.i === this.state.currentKey) return;
              this.dealTwoVerify(value.i);
            }}
            current={this.state.currentKey}
            onCancel={() => {
              this.setState({
                showBottomSelect: false
              });
            }}
          />
        )}
        {this.state.showPopup ? (
          <VerifyPopup
            googleCode={this.state.googleCode}
            dealInput={this.dealInput}
            delNum={this.delNum}
            type={verifyPopupType}
            destroy={this.clearVerify}
            verifyNum={
              verifyNum
                ? verifyNum === this.intl.get("sendCode")
                  ? verifyNum
                  : verifyNum + "s"
                : this.intl.get("sendCode")
            }
            onSend={() => {
              this.getVerify(
                userInfo[!verifyPopupType ? "email" : "phone"],
                mode[verifyPopupType],
                9,
                4
              );
            }}
            onClose={() => {
              this.setState({ showPopup: false });
            }}
            onConfirm={code => {
              this.setTwoVerifyH5(
                userInfo[!verifyPopupType ? "email" : "phone"],
                mode[verifyPopupType],
                code,
                this.state.currentType,
                this.state.setType
              );
            }}
          />
        ) : (
          ""
        )}
        {this.state.popupFlag && (
          <Popup
            type={this.state.popupType ? "tip1" : "tip3"}
            msg={this.state.popupText}
            h5={true}
            onClose={() => {
              this.setState({
                popupFlag: false,
                showPopup: this.state.popupType ? false : true,
                showBottomSelect: this.state.popupType ? false : true
              });
            }}
            autoClose={true}
          />
        )}
      </div>
    );
  }
}
