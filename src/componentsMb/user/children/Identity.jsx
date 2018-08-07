import React, { Component } from "react";
import ExchangeViewBase from "../../../components/ExchangeViewBase.jsx";
import Button from "../../../common/component/Button/index.jsx";
import Input from "../../../common/component/Input/index.jsx";
import RemindPopup from "../../../common/component/Popup/index.jsx";
import BottomSelect from "../../viewsPopup/BottomSelect";

export default class userIdentity extends ExchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      showBottomSelect: false,
      verifyTypeArr: [
        // 选择类型
        { value: this.intl.get("user-idCard") , i: 0},
        { value: this.intl.get("user-passport"), i: 1},
        { value: this.intl.get('user-id-type') , i: 2}
      ],
      selectIndex: 2, //  选择身份证护照index
      imgUrlIndex: 0, // 上传证件照index
      showPhotoList: ["", "", ""], // 存储照片用
      firstNameValue: "", // 姓氏输入框
      lastNameValue: "",
      numberValue: "",
      image1: "", // 上传照片用于存储ID
      image2: "", // 上传照片用于存储ID
      image3: "", // 上传照片用于存储ID
      remindPopup: false,
      popType: "",
      popMsg: "",
      checkVerifyArr: true, // 单选是否能够点击
      errNum: "",
      photoArr: [
        {
          photoList: [
            { imgUrl: "", name: this.intl.get("user-idFront") },
            { imgUrl: "", name: this.intl.get("user-idBack") },
            { imgUrl: "", name: this.intl.get("user-idHand") }
          ]
        },
        {
          photoList: [
            { imgUrl: "", name: this.intl.get("user-passFront") },
            { imgUrl: "", name: this.intl.get("user-passHand") },
            { imgUrl: "", name: this.intl.get("user-addr") }
          ]
        }
      ]
    };
    const { controller } = props;
    //绑定view
    controller.setView(this);
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getUserAuthData = controller.getUserAuthData.bind(controller); // 获取用户认证信息
    this.selectPhoto = this.selectPhoto.bind(this);
    this.checkPhoto = this.checkPhoto.bind(this);
    this.uploadInfo = controller.uploadInfo.bind(controller);
    this.uploadImg = controller.uploadImg.bind(controller);
    this.canClick = this.canClick.bind(this);
    this.checkNumber = this.checkNumber.bind(this);
    // this.checkName = this.checkName.bind(this)
  }
  getObjectURL(file) {
    let url = null;
    if (window.createObjectURL != undefined) {
      // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }
  async selectPhoto() {
    // 上传图片
    let file = this.refs.files.files[0];
    if (!file) {
      this.setState({
        remindPopup: true,
        popType: "tip3",
        popMsg: this.intl.get("user-uploadPicture")
      });
      return;
    }
    if (file && file.size > 10485760) {
      this.setState({
        remindPopup: true,
        popType: "tip3",
        popMsg: this.intl.get("user-bigPicture")
      });
      return;
    }
    this.state.showPhotoList[this.state.imgUrlIndex] = this.getObjectURL(file);
    this.setState({
      showPhotoList: this.state.showPhotoList.concat([])
    });
    this.uploadImg(file);
  }

  checkPhoto(i) {
    this.setState({
      imgUrlIndex: i
    });
    this.refs.files.click();
  }
  selectVerifyType(index, content) {
    // 单选切换
    this.setState({
      selectIndex: index,
      numberValue: "",
      errNum: ""
    });
  }
  firstInput(value) {
    // value = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')
    this.setState({ firstNameValue: value.trim() });
  }
  lastInput(value) {
    // value = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')
    this.setState({ lastNameValue: value.trim() });
  }
  numberInput(value) {
    this.setState({ numberValue: value.trim() });
    this.state.errNum && this.setState({ errNum: "" });
  }
  checkNumber() {
    // 验证身份证 ／ 护照
    let reg1 = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
      reg2 = /^[a-zA-Z]{5,17}$/,
      reg3 = /^[a-zA-Z0-9]{5,17}$/;
    if (this.state.selectIndex === 0) {
      // 身份证
      if (!reg1.test(this.state.numberValue)) {
        this.setState({
          errNum: this.intl.get("user-idErr")
        });
        return false;
      }
    }
    if (this.state.selectIndex === 1) {
      // 护照
      if (
        !reg2.test(this.state.numberValue) &&
        !reg3.test(this.state.numberValue)
      ) {
        this.setState({
          errNum: this.intl.get("user-passportErr")
        });
        return false;
      }
    }
  }
  canClick() {
    let userAuth = this.state.userAuth;
    if (this.state.errNum) return false;
    if (
      this.state.userAuth.state === 0 &&
      this.state.firstNameValue &&
      this.state.lastNameValue &&
      this.state.numberValue &&
      this.state.image1 &&
      this.state.image2 &&
      this.state.image3
    )
      return true;
    if (
      (this.state.userAuth.state === 3 ||
        this.state.userAuth.state === 4 ||
        this.state.userAuth.state === 5) &&
      (userAuth.image1 || this.state.image1) &&
      (userAuth.image2 || this.state.image2) &&
      (userAuth.image3 || this.state.image3)
    )
      return true;
    return false;
  }
  submitInfo() {
    // 确认提交
    this.uploadInfo();
  }
  componentWillMount() {}

  async componentDidMount() {
    this.props.addContent({ con: this.intl.get("header-idVerify") });
    let result = await this.getUserAuthData();
    // 审核中和已审核路由进来阻止
    // if([1,2].includes(result.state)){
    //   this.props.history.push({pathname:'/user'})
    // }
    let verifyArr = [0, 0, 2, 1]; // 0 身份证 1 护照 -> 1 身份证 3 护照
    console.log(this.state.userAuth)
    this.setState({
      // 选择护照／身份证
      selectIndex: this.state.userAuth.type
        ? verifyArr[this.state.userAuth.type]
        : 2
    });

    let userAuth = this.state.userAuth; // 姓名分离
    if (userAuth.firstName === "" || userAuth.lastName === "") {
      let fullName = userAuth.fullName,
        firstName = fullName.substring(0, 1),
        lastName = fullName.substring(1);
      // console.log('全称', fullName, firstName, lastName)
      userAuth.firstName = firstName;
      userAuth.lastName = lastName;
      this.setState({
        userAuth
      });
    }
  }

  componentWillUpdate(...parmas) {}

  render() {
    // console.log('用户信息2', this.state)
    return (
      <div className="identify-wrap-h5">
        <div className="name-identify clearfix">
          <div>
            <div className="clearfix form">
              <span className="item">{this.intl.get("user-type")}</span>
              <div className={`item user-type ${this.state.selectIndex === 2 ? 'none' : ''}`} onClick={()=>{if(this.state.userAuth.state !== 0) return; this.setState({showBottomSelect: true})}}>
                {this.state.verifyTypeArr[this.state.selectIndex].value}
              </div>
            </div>
            <div className="clearfix form">
              <span className="item">{this.intl.get("user-surname")}</span>
              <div className="item">
                <Input
                  placeholder={this.intl.get("user-input-firstName")}
                  value={
                    this.state.userAuth.firstName
                      ? this.state.userAuth.firstName
                      : this.state.firstNameValue
                  }
                  disabled={this.state.userAuth.firstName ? true : false}
                  onInput={value => this.firstInput(value)}
                />
              </div>
            </div>
            <div className="clearfix form">
              <span className="item">{this.intl.get("user-forename")}</span>
              <div className="item">
                <Input
                  placeholder={this.intl.get("user-input-name")}
                  value={
                    this.state.userAuth.lastName
                      ? this.state.userAuth.lastName
                      : this.state.lastNameValue
                  }
                  disabled={this.state.userAuth.lastName ? true : false}
                  onInput={value => this.lastInput(value)}
                />
              </div>
            </div>
            <div className="clearfix form">
              <span className="item">{this.intl.get("user-id-num")}</span>
              <div className="item">
                <Input
                  className="id-num"
                  placeholder={this.intl.get('user-inputId-num')}
                  value={
                    this.state.userAuth.number
                      ? this.state.selectIndex === 0
                        ? this.state.userAuth.number.replace(
                            /(\d{3})\d{9,12}(\d{3})/,
                            "$1****$2"
                          )
                        : this.state.userAuth.number.replace(
                            /(\w{2})\w{1,13}(\w{2})/,
                            "$1***$2"
                          )
                      : this.state.numberValue
                  }
                  disabled={this.state.userAuth.number ? true : false}
                  onInput={value => this.numberInput(value)}
                  onBlur={this.checkNumber}
                />
                {this.state.errNum && <i>{this.intl.get('user-id-wrong')}</i>}
              </div>
            </div>
          </div>
        </div>
        {this.state.selectIndex!==2 && <div className="photo-identify clearfix">
          <div>
            <dl className="clearfix user-photoVerify-upload">
              {this.state.photoArr[this.state.selectIndex].photoList &&
                this.state.photoArr[this.state.selectIndex].photoList.map(
                  (item, index) => (
                    <dd key={index} onClick={i => this.checkPhoto(index)}>
                      <p>
                        {item.name}
                        <span>
                          {this.state.showPhotoList[index]
                            ? this.intl.get("reupload")
                            : this.intl.get("upLoad")}
                        </span>
                      </p>
                      <div
                        className={`user-verify-imgs ${
                          this.state.showPhotoList[index] ? "" : "hide"
                        }`}
                      >
                        <img src={item.imgUrl} alt="" />
                        <img
                          src={`${this.state.showPhotoList[index]}`}
                          alt=""
                          className="up-img"
                        />
                        {this.state.showPhotoList[index] !== "" &&
                          this.state[`image${index + 1}`] === "" && (
                            <div className="loading-wrap">
                              <img src={this.$imagesMap.$user_loading} alt="" />
                            </div>
                          )}
                      </div>
                    </dd>
                  )
                )}
            </dl>
            <div className="user-indentity-submit">
              <Button
                title={this.intl.get("user-submit")}
                type="base"
                className={`${
                  this.canClick() ? "identify-btn-active" : ""
                } identify-btn`}
                disable={this.canClick() ? false : true}
                onClick={()=>{
                  if(!this.checkNumber()) return;
                  this.submitInfo()
                }}
              />
            </div>
          </div>
        </div>}
        {/*<form method="post" action="http://192.168.113.141/image/" style={{display: 'none'}} encType="multipart/form-data" target="upImg">*/}
        <div style={{ display: "none" }}>
          <input
            name="uploadimage"
            type="file"
            ref="files"
            capture="camera"
            accept="image/png, image/jpeg"
            onChange={this.selectPhoto}
          />
        </div>
        {/*<input type="submit" ref="filesUp" value="Upload"/>*/}
        {/*</form>*/}
        {/*<iframe name="upImg" frameBorder="0" width="0" height="0"></iframe>*/}
        {this.state.remindPopup && (
          <RemindPopup
            type={this.state.popType}
            msg={this.state.popMsg}
            autoClose={true}
            onClose={() => {
              if(this.state.popType === 'tip1'){
                this.props.history.push({pathname:'/user'})
                return;
              }
              this.setState({ remindPopup: false });
            }}
          />
        )}
        {/* 选择证件类型的底部弹窗 */}
        {this.state.showBottomSelect && (
          <BottomSelect
            data={this.state.verifyTypeArr.slice(0, -1)}
            onSelect={value => {
              if (value.i === this.state.selectIndex) return;
              this.setState({selectIndex: value.i, showBottomSelect: false})
            }}
            current={this.state.selectIndex}
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
