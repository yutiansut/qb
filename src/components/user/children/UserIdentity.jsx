import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from '../../../components/ExchangeViewBase'
import Button from '../../../common/component/Button/index.jsx'
import Input from '../../../common/component/Input/index.jsx'
import UploadUrl from '../../../config/ServerConfig'
import "../stylus/identify.styl"

let photoArr = [
  {photoList: [{imgUrl: '/static/img/user/ID.svg', name: '身份证正面照片'}, {imgUrl: '/static/img/user/ID_2.svg', name: '身份证反面照片'}, {imgUrl: '/static/img/user/ID_3.svg', name: '手持身份证照片'}]},
  {photoList: [{imgUrl: '/static/img/user/passport.svg', name: '护照正面照片'}, {imgUrl: '/static/img/user/passport_2.svg', name: '手持护照照片'}, {imgUrl: '/static/img/user/passport_3.svg', name: '住址证明'}]},
];
let realNameArr = [ // 是否认证:0未认证;1已通过;2认证失败;3认证中
  {imgUrl: '/static/img/user/identity_no.png', content: '未进行证件认证'},
  {imgUrl: '/static/img/user/identity_succ.png', content: '已通过证件认证'},
  {imgUrl: '/static/img/user/identity_err.png', content: '证件认证失败'},
  {imgUrl: '/static/img/user/identity_progress.png', content: '证件认证中'}
]

export default class userIdentity extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      verifyTypeArr: [ // 选择类型
        {name: '身份证'},
        {name: '护照'}
      ],
      selectIndex: 0, //  选择身份证护照index
      imgUrlIndex: 0, // 上传证件照index
      showPhotoList:['', '', ''], // 存储照片用
      firstNameValue: '', // 姓氏输入框
      lastNameValue: '',
      numberValue: '',
      image1: '', // 上传照片用于存储ID
      image2: '', // 上传照片用于存储ID
      image3: '' // 上传照片用于存储ID
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
  }

  componentWillUpdate(...parmas) {

  }

  render() {
    console.log('用户信息2', this.state)
    return (
      <div className="identify-wrap">
        <h1>身份认证</h1>
        <div className="identify-result">
          <img src={realNameArr[this.state.userAuth.state] && realNameArr[this.state.userAuth.state].imgUrl} alt="" />
          <span>{realNameArr[this.state.userAuth.state] && realNameArr[this.state.userAuth.state].content}</span>
        </div>
        <div className="name-identify clearfix">
          <h2>实名认证</h2>
          <div className="fl">
            <span>*实名信息必须真实可靠，并与充值提现银行账户登记信息保持一致。实名信息一旦确认，不可修改。</span>
            <div className="clearfix">
              <ul>
                <li>姓氏</li>
                <li>
                  {/*this.state.userAuth.first_name*/}
                  <Input placeholder="输入姓氏" value={this.state.firstNameValue || ''} onInput={evt => this.firstInput(evt)}/>
                </li>
              </ul>
              <ul>
                <li>名字</li>
                <li>
                  <Input placeholder="输入名字" value={this.state.lastNameValue || ''} onInput={evt => this.lastInput(evt)}/>
                </li>
              </ul>
            </div>
            <dl className="clearfix">
              <dt>实名认证</dt>
              {this.state.verifyTypeArr.map((item, index) => (<dd key={index} onClick={content => this.selectVerifyType(index, item)}>
                <img src="/static/img/checked.svg" alt="" className={`${this.state.selectIndex === index ? '' : 'hide'}`}/>
                <img src="/static/img/normal.svg" alt="" className={`${this.state.selectIndex === index ? 'hide' : ''}`}/>
                <i>{item.name}</i>
              </dd>))}
            </dl>
            {/*.userAuth.number*/}
            <Input placeholder={`${this.state.selectIndex === 0 ? '请填写身份证号码' : '请填写护照号码'}`} className="id-input"  value={this.state.numberValue || ''} onInput={evt => this.numberInput(evt)}/>
          </div>
        </div>
        <div className="photo-identify clearfix">
          <h2>照片认证</h2>
          <div className={`${this.state.userAuth.state == 3 ? '' : 'hide'} fl`}><em>认证结果：认证中</em></div>
          <div className={`${this.state.userAuth.state == 1 ? '' : 'hide'} fl`}><em>认证结果：已通过</em></div>
          <div className={`${this.state.userAuth.state == 0 || this.state.userAuth.state == 2 ? '' : 'hide'} fl`}>
            <dl>
              <dt>证件要求</dt>
              <dd>1. 身份证照片：请按示例上传身份证正面与反面，脸部及字体必须清晰可见</dd>
              <dd>2. 护照：请按示例上传带ID的护照页正面即可，脸部及字体必须清晰可见</dd>
              <dd>3. 手持证件照：照片中请勿遮挡任何有效信息，照片中必须体现“日期及仅币荣认证使用”的纸条</dd>
              <dd>4. 图片格式：小于10M, 图片格式可为jpg、jpeg、png</dd>
            </dl>
            <dl className="clearfix">
              <dt>证件类型</dt>
              <dd>{this.state.selectIndex === 0 ? '身份证' : '护照'}</dd>
            </dl>
            <dl className="clearfix">
              <dt>上传证件照</dt>
              {photoArr[this.state.selectIndex].photoList && photoArr[this.state.selectIndex].photoList.map((item, index) => (<dd key={index} onClick={i => this.checkPhoto(index)}>
                <img src={item.imgUrl} alt="" className={`${this.state.showPhotoList[index] ? 'hide' : ''}`}/>
                <img src={`${this.state.showPhotoList[index]}`} alt="" className={`${this.state.showPhotoList[index] ? '' : 'hide'} up-img`}/>
                <img src="/static/img/user/add.svg" alt="" className="add-img"/>
                <p>{item.name}</p>
              </dd>))}
            </dl>
            <h3><input type="checkbox" />我承认提交的证件信息属于本人所有，不存在冒用、盗用他人证件的行为，因冒用、盗用他人证件造成的一切后果由本人承担</h3>
            <Button title="确认提交" className="identify-btn" onClick={this.submitInfo.bind(this)}/>
          </div>
        </div>
        {/*<form method="post" action="http://192.168.113.141/image/" style={{display: 'none'}} encType="multipart/form-data" target="upImg">*/}
        <div style={{display: 'none'}}><input name="uploadimage" type='file' ref="files" accept="image/png, image/jpeg" onChange={this.selectPhoto} /></div>
          {/*<input type="submit" ref="filesUp" value="Upload"/>*/}
        {/*</form>*/}
        {/*<iframe name="upImg" frameBorder="0" width="0" height="0"></iframe>*/}
      </div>
    );
  }
}