import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from '../../../components/ExchangeViewBase'
import Button from '../../../common/component/Button/index.jsx'
import "../stylus/identify.styl"

const verifyTypeArr = [
  {name: '身份证', flag: true},
  {name: '护照', flag: false}
];
const photoArr = [
  {photoList: [{imgUrl: '/static/img/user/ID.svg', name: '身份证正面照片'}, {imgUrl: '/static/img/user/ID_2.svg', name: '身份证反面照片'}, {imgUrl: '/static/img/user/ID_3.svg', name: '手持身份证照片'}]},
  {photoList: [{imgUrl: '/static/img/user/passport.svg', name: '护照正面照片'}, {imgUrl: '/static/img/user/passport_2.svg', name: '手持护照照片'}, {imgUrl: '/static/img/user/passport_3.svg', name: '住址证明'}]},
];
const realNameArr = [ // 是否认证:0未认证;1认证中;2已通过;3失败
  {imgUrl: '/static/img/user/identity_no.png', content: '未进行证件认证'},
  {imgUrl: '/static/img/user/identity_progress.png', content: '证件认证中'},
  {imgUrl: '/static/img/user/identity_succ.png', content: '已通过证件认证'},
  {imgUrl: '/static/img/user/identity_err.png', content: '证件认证失败'}
]

export default class userIdentity extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      selectIndex: 0,
      imgUrlIndex: 0,
      showPhotoList:['', '', ''] // 存储照片用
    }
    const {controller} = props
    //绑定view
    controller.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, controller.initState);
    this.selectPhoto = this.selectPhoto.bind(this)
    this.checkPhoto = this.checkPhoto.bind(this)
    console.log(33333, this.state)
  }
  getObjectURL (file) { //
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
  selectPhoto() {
    console.log('上传index', this.state.imgUrlIndex)
    let file = this.refs.files.files[0];
    console.log('file', file, this.getObjectURL(file))
    if(!file) return
    if(file && file.size > 10485760) return
    this.state.showPhotoList[this.state.imgUrlIndex] = this.getObjectURL(file);
    this.setState({
      showPhotoList: this.state.showPhotoList.concat([])
    })
    console.log('图片地址', this.state.showPhotoList[this.state.imgUrlIndex], this.state.showPhotoList)

  }
  checkPhoto(i) {
    this.setState({
      imgUrlIndex: i
    })
    this.refs.files.click();
  }
  selectVerifyType(index, content) { // 单选切换
    this.setState({
      selectIndex: index,
    })
    verifyTypeArr.forEach(v => {v.flag = false})
    content.flag = true
    console.log(123456, index)
  }
  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUpdate(...parmas) {

  }


  render() {
    return (
      <div className="identify-wrap">
        <h1>身份认证</h1>
        <div className="identify-result">
          <img src={realNameArr[this.state.user_info.verify].imgUrl} alt="" />
          <span>{realNameArr[this.state.user_info.verify].content}</span>
        </div>
        <div className="name-identify clearfix">
          <h2>实名认证</h2>
          <div className="fl">
            <span>*实名信息必须真实可靠，并与充值提现银行账户登记信息保持一致。实名信息一旦确认，不可修改。</span>
            <div className="clearfix">
              <ul>
                <li>姓氏</li>
                <li>
                  <input type="text" placeholder="输入姓氏"/>
                </li>
              </ul>
              <ul>
                <li>名字</li>
                <li>
                  <input type="text" placeholder="输入名字"/>
                </li>
              </ul>
            </div>
            <dl className="clearfix">
              <dt>实名认证</dt>
              {verifyTypeArr.map((item, index) => (<dd key={index} onClick={content => this.selectVerifyType(index, item)}>
                <img src="/static/img/checked.svg" alt="" className={`${item.flag ? '' : 'hide'}`}/>
                <img src="/static/img/normal.svg" alt="" className={`${item.flag ? 'hide' : ''}`}/>
                <i>{item.name}</i>
              </dd>))}
            </dl>
            <input type="text" placeholder={`${verifyTypeArr[0].flag ? '请填写身份证号码' : '请填写护照号码'}`} className="id-input"/>
          </div>
        </div>
        <div className="photo-identify clearfix">
          <h2>照片认证</h2>
          <div className={`${this.state.user_info.verify == 1 ? '' : 'hide'} fl`}><em>认证结果：认证中</em></div>
          <div className={`${this.state.user_info.verify == 2 ? '' : 'hide'} fl`}><em>认证结果：已通过</em></div>
          <div className={`${this.state.user_info.verify == 0 || this.state.user_info.verify == 3 ? '' : 'hide'} fl`}>
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
              {photoArr[this.state.selectIndex].photoList.map((item, index) => (<dd key={index} onClick={i => this.checkPhoto(index)}>
                <img src={item.imgUrl} alt="" className={`${this.state.showPhotoList[index] ? 'hide' : ''}`}/>
                <img src={`${this.state.showPhotoList[index]}`} alt="" className={`${this.state.showPhotoList[index] ? '' : 'hide'} up-img`}/>
                <img src="/static/img/user/add.svg" alt="" className="add-img"/>
                <p>{item.name}</p>
              </dd>))}
            </dl>
            <h3><input type="checkbox" />我承认提交的证件信息属于本人所有，不存在冒用、盗用他人证件的行为，因冒用、盗用他人证件造成的一切后果由本人承担</h3>
            <Button title="确认提交" className="identify-btn"/>
          </div>
        </div>
        <div style={{display: 'none'}}><input type='file' ref="files" accept="image/png, image/jpeg" onChange={this.selectPhoto} /></div>
      </div>
    );
  }
}