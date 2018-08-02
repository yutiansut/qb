import React from "react";
import exchangeViewBase from "../../../components/ExchangeViewBase.jsx";
import BottomSelect from "../../viewsPopup/BottomSelect";

export default class setTwoVerify extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
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
      showBottomSelect: false, //控制底部菜单显示隐藏
      currentKey: '', //当前选中验证的验证类型1 email，2 google, 3 phone
    };
    const { controller } = this.props;
    controller.setView(this);
    let { userInfo } = controller.initState;
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, { userInfo });
    this.initData = controller.initData.bind(controller); // 获取用户信息
  }

  componentWillMount() {}

  async componentDidMount() {
    await this.initData();
  }



  render() {
    const { controller, url } = this.props;
    let userInfo = this.state.userInfo,
      type = this.state.type;
    return (
      <div className="user-center-twoStep">
        <ul className="verify-list">
          {this.state.verifyList.map((v, i) => (
            <li key={i} onClick={() => { this.setState({ showBottomSelect: true, currentKey: userInfo[v.key]})}}>
              {v.title}
              {userInfo[v.key] ? <i>{`（${type[userInfo[v.key]]}）`}</i> : ""}
              {<span>{userInfo[v.key] ? `修改` : `设置`}</span>}
            </li>
          ))}
        </ul>
        {this.state.showBottomSelect && (
          <BottomSelect
            data={[
              {title: this.intl.get("user-googleVerify"), k: 2},
              {title: this.intl.get("user-verifyPhoneTitle"), k: 3},
              {title: this.intl.get("user-verifyEmailTitle"), k: 1}
              ].map((v, index) => {
              return { value: v.title , i: v.k};
            })}
            onSelect={value => {
              if (value.i === this.state.currentKey) return;

            }}
            current={this.state.currentKey}
            onCancel={() => {
              this.setState({
                showBottomSelect: false
              });
            }}
          />
        )}
      </div>
    );
  }
}
