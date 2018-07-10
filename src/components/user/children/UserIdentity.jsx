import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from '../../../components/ExchangeViewBase'
import Button from '../../../common/component/Button/index.jsx'
import Input from '../../../common/component/Input/index.jsx'
import RemindPopup from '../../../common/component/Popup/index.jsx'
import "../stylus/identify.styl"

export default class userIdentity extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      verifyTypeArr: [ // 选择类型
        {name: this.intl.get("user-idCard")},
        {name: this.intl.get("user-passport")}
      ],
      selectIndex: 0, //  选择身份证护照index
      imgUrlIndex: 0, // 上传证件照index
      showPhotoList:['', '', ''], // 存储照片用
      firstNameValue: '', // 姓氏输入框
      lastNameValue: '',
      numberValue: '',
      image1: '', // 上传照片用于存储ID
      image2: '', // 上传照片用于存储ID
      image3: '', // 上传照片用于存储ID
      remindPopup: false,
      checkVerifyArr: true, // 单选是否能够点击
      checkState: true, // 同意协议单选框按钮
      photoArr: [
        {
          photoList: [
            {imgUrl: '/static/img/user/ID.svg', name: this.intl.get("user-idFront")},
            {imgUrl: '/static/img/user/ID_2.svg', name: this.intl.get("user-idBack")},
            {imgUrl: '/static/img/user/ID_3.svg', name: this.intl.get("user-idHand")}
          ]
        },
        {
          photoList: [
            {imgUrl: '/static/img/user/passport.svg', name: this.intl.get("user-passFront")},
            {imgUrl: '/static/img/user/passport_2.svg', name: this.intl.get("user-passHand")},
            {imgUrl: '/static/img/user/passport_3.svg', name: this.intl.get("user-addr")}
          ]
        },
      ],
      realNameArr: [ // 是否认证:0未认证;1审核中;2已审核;3未通过;4恶意上传失败封锁3天;5永久禁止
        {imgUrl: '/static/img/user/identity_no.png', content: this.intl.get("user-authNo")},
        {imgUrl: '/static/img/user/identity_progress.png', content: this.intl.get("user-authProcess")},
        {imgUrl: '/static/img/user/identity_succ.png', content: this.intl.get("user-authSucc")},
        {imgUrl: '/static/img/user/identity_err.png', content: this.intl.get("user-authErr")},
      ]
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.getUserAuthData = controller.getUserAuthData.bind(controller) // 获取用户认证信息
    this.selectPhoto = this.selectPhoto.bind(this)
    this.checkPhoto = this.checkPhoto.bind(this)
    this.uploadInfo = controller.uploadInfo.bind(controller)
    this.uploadImg = controller.uploadImg.bind(controller)
    this.canClick = this.canClick.bind(this)
    this.checkAgree = this.checkAgree.bind(this)
  }
  getObjectURL (file) {
    let url = null ;
    if (window.createObjectURL!=undefined) { // basic
      url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
  }
  async selectPhoto() { // 上传图片
    let file = this.refs.files.files[0];
    if(!file) return
    if(file && file.size > 10485760) return
    this.state.showPhotoList[this.state.imgUrlIndex] = this.getObjectURL(file);
    this.setState({
      showPhotoList: this.state.showPhotoList.concat([])
    })
    this.uploadImg(file)
    // uploadImg.append("uploadimage", file);
    // let headers = new Headers();
    // headers.set('Token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaWQiOiIyMjcxNzAxMzc0NTc4Mjc4NDAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tr6AowdEPkZJQRnib28_dfUjY_MTmI_aNu9UN-Cl5y0');
    // console.log(headers)
    // console.log('uploadImg', uploadImg, file)
    // await fetch("http://192.168.113.7/image/", {
    //   method: 'Post',
    //   body: uploadImg,
    //   headers,
    //   // credentials: 'include'
    // }).then(res => res.json(),res=>console.log(res)).then(res => {
    //   let imgUrl = `image${this.state.imgUrlIndex + 1}`, obj={}
    //   obj[imgUrl] = res.image_id
    //   this.setState(obj)
    // }).catch(msg => {
    //   console.log('上传图片错误', msg)
    // })
  }

  checkPhoto(i) {
    this.setState({
      imgUrlIndex: i
    })
    this.refs.files.click();
  }
  selectVerifyType(index, content) { // 单选切换
    this.setState({
      selectIndex: index
    })
  }
  firstInput(evt) {
    this.setState({firstNameValue: evt});
  }
  lastInput(evt) {
    this.setState({lastNameValue: evt});
  }
  numberInput(evt) {
    this.setState({numberValue: evt});
  }
  canClick() {
    if (this.state.checkState && this.state.firstNameValue && this.state.lastNameValue && this.state.numberValue && this.state.image1 && this.state.image2 && this.state.image) return true
    return false
  }
  checkAgree(event) {
    this.setState({
      checkState: event.target.checked
    });
  }
  submitInfo() { // 确认提交
    this.uploadInfo()
  }
  componentWillMount() {

  }

  async componentDidMount() {
    await this.getUserAuthData()
    let verifyArr = [0, 0, 2, 1] // 0 身份证 1 护照 -> 1 身份证 3 护照
    // verifyArr[this.state.userAuth.type]
    this.setState({
      selectIndex: 0
    })
    this.state.userAuth.state === 3 && (
      this.setState({
        photoArr: [
          {
            photoList: [
              {imgUrl: `http://192.168.113.7/usimage/thumb/${this.state.userAuth.image1}`, name: this.intl.get("user-idFront")},
              {imgUrl: `http://192.168.113.7/usimage/thumb/${this.state.userAuth.image2}`, name: this.intl.get("user-idBack")},
              {imgUrl: `http://192.168.113.7/usimage/thumb/${this.state.userAuth.image3}`, name: this.intl.get("user-idHand")}
            ]
          },
          {
            photoList: [
              {imgUrl: `http://192.168.113.7/usimage/thumb/${this.state.userAuth.image1}`, name: this.intl.get("user-passFront")},
              {imgUrl: `http://192.168.113.7/usimage/thumb/${this.state.userAuth.image1}`, name: this.intl.get("user-passHand")},
              {imgUrl: `http://192.168.113.7/usimage/thumb/${this.state.userAuth.image1}`, name: this.intl.get("user-addr")}
            ]
          }
        ]
      })
    )
    this.state.userAuth.state !== 0 && (
      this.setState({
        checkVerifyArr: false
      })
    )
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    console.log('用户信息2', this.state)
    return (
      <div className="identify-wrap">
        <h1>{this.intl.get("header-idVerify")}</h1>
        <div className="identify-result">
          <img src={this.state.realNameArr[this.state.userAuth.state] && this.state.realNameArr[this.state.userAuth.state].imgUrl} alt="" />
          <span>{this.state.realNameArr[this.state.userAuth.state] && this.state.realNameArr[this.state.userAuth.state].content}</span>
        </div>
        <div className="name-identify clearfix">
          <h2>{this.intl.get("user-name")}</h2>
          <div className="fl">
            <span>{this.intl.get("user-nameRemind")}</span>
            <div className="clearfix">
              <ul>
                <li>{this.intl.get("user-surname")}</li>
                <li>
                  {/*this.state.userAuth.first_name*/}
                  <Input placeholder={this.intl.get("user-inputSurname")}
                         value={this.state.userAuth.firstName ? this.state.userAuth.firstName : this.state.firstNameValue}
                         disabled ={this.state.userAuth.firstName ? true : false}
                         onInput={evt => this.firstInput(evt)}/>
                </li>
              </ul>
              <ul>
                <li>{this.intl.get("user-forename")}</li>
                <li>
                  <Input placeholder={this.intl.get("user-inputForename")}
                         value={this.state.userAuth.lastName ? this.state.userAuth.lastName : this.state.lastNameValue}
                         disabled ={this.state.userAuth.lastName ? true : false}
                         onInput={evt => this.lastInput(evt)}/>
                </li>
              </ul>
            </div>
            <dl className="clearfix">
              <dt>{this.intl.get("user-name")}</dt>
              {this.state.verifyTypeArr.map((item, index) => (<dd key={index} onClick={content => this.state.checkVerifyArr && this.selectVerifyType(index, item)}>
                <img src="/static/img/checked.svg" alt="" className={`${this.state.selectIndex === index ? '' : 'hide'}`}/>
                <img src="/static/img/normal.svg" alt="" className={`${this.state.selectIndex === index ? 'hide' : ''}`}/>
                <i>{item.name}</i>
              </dd>))}
            </dl>
            {/*.userAuth.number*/}
            <Input placeholder={`${this.state.selectIndex === 0 ? this.intl.get("user-fillId") : this.intl.get("user-fillPassport")}`}
                   className="id-input"
                   value={this.state.userAuth.number ? this.state.userAuth.number : this.state.numberValue}
                   disabled ={this.state.userAuth.number ? true : false}
                   onInput={evt => this.numberInput(evt)}/>
          </div>
        </div>
        <div className="photo-identify clearfix">
          <h2>{this.intl.get("user-photoVerify")}</h2>
          <div className={`${this.state.userAuth.state == 1 ? '' : 'hide'} fl`}><em>{this.intl.get("user-authProRes")}</em></div>
          <div className={`${this.state.userAuth.state == 2 ? '' : 'hide'} fl`}><em>{this.intl.get("user-authSuccRes")}</em></div>
          <div className={`${this.state.userAuth.state == 0 || this.state.userAuth.state == 3 ? '' : 'hide'} fl`}>
            <dl>
              <dt>{this.intl.get("user-idReq")}</dt>
              <dd>{this.intl.get("user-req1")}</dd>
              <dd>{this.intl.get("user-req2")}</dd>
              <dd>{this.intl.get("user-req3")}{this.intl.get("user-req4")}{this.intl.get("user-req5")}</dd>
              <dd>{this.intl.get("user-req6")}</dd>
            </dl>
            <dl className="clearfix">
              <dt>{this.intl.get("user-type")}</dt>
              <dd>{this.state.selectIndex === 0 ? this.intl.get("user-idCard") : this.intl.get("user-passport")}</dd>
            </dl>
            <dl className="clearfix">
              <dt>{this.intl.get("upLoad")}{this.intl.get("user-photo")}</dt>
              {this.state.photoArr[this.state.selectIndex].photoList && this.state.photoArr[this.state.selectIndex].photoList.map((item, index) => (<dd key={index} onClick={i => this.checkPhoto(index)}>
                <img src={item.imgUrl} alt="" className={`${this.state.showPhotoList[index] ? 'hide' : ''}`}/>
                <img src={`${this.state.showPhotoList[index]}`} alt="" className={`${this.state.showPhotoList[index] ? '' : 'hide'} up-img`}/>
                <img src="/static/img/user/add.svg" alt="" className="add-img"/>
                <p>{item.name}</p>
              </dd>))}
            </dl>
            <h3><input type="checkbox" checked={this.state.checkState} onChange={this.checkAgree}/>{this.intl.get("user-photoSure")}</h3>
            <Button
              title={this.intl.get("user-submit")}
              className={`${this.canClick() ? 'identify-btn-active' : ''} identify-btn`}
              disable={this.canClick() ? false : true}
              onClick={this.submitInfo.bind(this)}/>
          </div>
        </div>
        {/*<form method="post" action="http://192.168.113.141/image/" style={{display: 'none'}} encType="multipart/form-data" target="upImg">*/}
        <div style={{display: 'none'}}><input name="uploadimage" type='file' ref="files" accept="image/png, image/jpeg" onChange={this.selectPhoto} /></div>
          {/*<input type="submit" ref="filesUp" value="Upload"/>*/}
        {/*</form>*/}
        {/*<iframe name="upImg" frameBorder="0" width="0" height="0"></iframe>*/}
        {this.state.remindPopup && <RemindPopup
          type={this.state.popType}
          msg={this.state.popMsg}
          autoClose = {true}
          onClose={() => {this.setState({ remindPopup: false });}}/>}
      </div>
    );
  }
}