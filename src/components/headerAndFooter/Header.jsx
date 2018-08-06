import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  Switch
} from 'react-router-dom'
import './stylus/header.styl'
import ExchangeViewBase from "../ExchangeViewBase";
import {ChangeFontSize} from '../../core'
import UserNoticeContent from '../notice/noticeChild/UserNoticePop.jsx'
// const Nav = ({label,to}) => (
//     <Route path={to}  children={({ match }) => (
//         <li className={match ? 'active' : ''}>
//           {match ? '> ' : ''}<Link to={to}>{label}</Link>
//         </li>
//     )}/>
// );

//
// const languageArr = [
//   {imgUrl: this.$imagesMap.$header_cn, content: '简体中文', value: "zh-CN"},
//   // {imgUrl: '/static/img/home/chinese.svg', content: '繁體中文'},
//   {imgUrl: this.$imagesMap.$header_en, content: 'English', value: "en-US"}
// ]

export default class Header extends ExchangeViewBase {
  constructor(props) {
    super(props)
    this.state = {
      navClass: 'headerNav',
      languageIndex: 0,
      navArrayLeft : [
        {label: `${this.intl.get('header-home')}`, to: '/home', select: false, linkUser: false, tokenShow: false},
        {label: `${this.intl.get('header-exchange')}`, to: '/trade', select: false, linkUser: false, tokenShow: false},
        // {label: `${this.intl.get('header-legal')}`, to: 'https://mixotc.com/', select: false, linkUser: false, tokenShow: false, notLink: true},
        {
          label: `${this.intl.get('header-assets')}`,
          to: '/wallet',
          select: true,
          linkUser: true,
          tokenShow: true,
          childrenList: [{label: `${this.intl.get('header-assets')}`, to: '/wallet',}, {label: `${this.intl.get('header-order')}`, to: '/order',}]
        }
      ],
      userNoticeHeader: {},
      userNoticePop: false, // 弹窗信息
      userContent: "", // 弹窗信息
      showNews: false, // 消息下拉
      otherLogin: false, // 提示登录弹窗
      otherLoginCon: "", // 提示登录弹窗内容
      languageArr: [
        {imgUrl: this.$imagesMap.$header_cn, content: '简体中文', value: "zh-CN"},
        // {imgUrl: '/static/img/home/chinese.svg', content: '繁體中文'},
        {imgUrl: this.$imagesMap.$header_en, content: 'English', value: "en-US"}
      ]
    }
    this.configController = this.props.configController;
    this.loginController = this.props.loginController;
    this.userController = this.props.userController;
    this.noticeController = this.props.noticeController;
    this.changeLanguage = this.configController.changeLanguage.bind(this.configController); // 改变语言
    this.clearLoginInfo = this.loginController.clearLoginInfo.bind(this.loginController) // 退出登录
    this.getUserNoticeHeader = this.noticeController.getUserNoticeHeader.bind(this.noticeController) // 获取通知列表
    this.readAllUserNotifications = this.noticeController.readAllUserNotifications.bind(this.noticeController) //  全部已读
    this.checkAll = this.checkAll.bind(this) // 查看全部
    this.loginOut = this.loginOut.bind(this)
    this.changeHeaderNotice = this.changeHeaderNotice.bind(this) // 改变头部消息数量
    this.upDateUserNoctice = this.noticeController.upDateUserNoctice.bind(this.noticeController) // 消息变成已读
    this.changeNotice = this.noticeController.changeNotice.bind(this.noticeController) // 改变列表页信息
    this.changeAllNotice = this.noticeController.changeAllNotice.bind(this.noticeController) // 全部已读改变列表页信息
    //绑定view
    this.noticeController.setHeaderView(this)
    //绑定view
    this.loginController.setHeaderOutView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, this.noticeController.store.state.userNoticeHeader);
    this.matched = '/home'

    //
    this.hideNotice=(event)=>{
      let el=event.target;
      while(el){
          if(el.classList && el.classList.contains("new-li")) return;
          el=el.parentNode;
      }
      this.setState({showNews:false});
    };
  }

  async componentDidMount() {
    // console.log(21324, this.props)
    let changeBase = this.props.navClass === 'tradeNav' ? 1440 * 2 : 1440
    ChangeFontSize(1440*0.8, changeBase)
    this.props.userController.userToken && await this.getUserNoticeHeader(1, 0, 0)
    this.state.languageArr.forEach((v,index)=>{
      v.value === this.configController.language && this.setState({ languageIndex : index})
    })
    this.state.navArrayLeft.forEach(v => {
      this.userToken && (v.tokenShow = false)
      this.userToken && v.to === "https://mixotc.com/" && (v.to = `https://mixotc.com/?token=${this.userToken}`)
    })

    //
    document.addEventListener("click",this.hideNotice)
  }

  componentWillUnmount() {
    document.removeEventListener("click",this.hideNotice);
  }

  componentWillUpdate(props, state, next) {
    // ChangeFontSize
    // console.log(props, state, next)
    if(props.navClass === 'tradeNav'){
      ChangeFontSize(1440*0.8, 1440*2)
    }
  }

  loginOut() {
    // console.log(222, this)
    this.clearLoginInfo()
    // this.props.history.push('/home')
    // let navArrayLeft = this.state.navArrayLeft
    // navArrayLeft[2].tokenShow = true
    // this.setState({navArrayLeft})
  }

  checkAll() { // 全部已读
    let userNoticeHeader = this.state.userNoticeHeader
    userNoticeHeader = {}
    this.setState({
      userNoticeHeader,
      showNews: false
    })
    this.readAllUserNotifications()
    this.changeAllNotice()
  }

  changeHeaderNotice(v, index) {
    let userNoticeHeader = this.state.userNoticeHeader
    userNoticeHeader.list.length && userNoticeHeader.list.splice(index, 1)
    this.setState({
      userContent: this.props.configController.language === 'zh-CN' ? v.content.contentCN : v.content.contentEN,
      userNoticePop: true,
      userNoticeHeader,
      showNews: false
    })
    this.changeNotice(v)
    this.upDateUserNoctice(v.id)
  }

  render() {
    let userToken = this.props.userController.userToken || null
    let userName = this.props.userController.userName || null
    this.state.navArrayLeft.forEach(v => {
      userToken && (v.tokenShow = false)
      userToken && v.to === "https://mixotc.com/" && (v.to = `https://mixotc.com/?token=${userToken}`)
    })
    return (
      <div className={`${this.props.navClass} clearfix`} id="header">
        <ul className="clearfix">
          <li className='nav-logo'>
            <Link to='/home'></Link>
          </li>
          {this.state.navArrayLeft.map((v, index) => (<Route path={v.to} key={index} children={({match}) => {
            // console.log(match)
            return <li className={`header-nav${match ? '-active' : ''} ${v.tokenShow ? 'hide' : ''} ${v.select ? 'select-list' : ''}`} >
                    {v.notLink && (<a href={v.to} target="_blank">{v.label.toUpperCase()}</a>) || (<Link to={v.to}>{v.label.toUpperCase()}</Link>)}
                    {/*<img src={this.$imagesMap.$nomal_down} alt=""/>*/}
                      {v.select && (
                        <ul className='select-router'>
                          {v.childrenList.map((v, index) => {
                            return (
                              <li key={index}>
                                <NavLink activeClassName="children-active" to={v.to}>{v.label.toUpperCase()}</NavLink>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  }
                }/>)
              )}
        </ul>
        <ol className="clearfix">
          <li className={`${userToken ? 'new-li' : 'hide'}`}>
            <div className="new-li-img"  onClick={() => {this.setState({ showNews: !this.state.showNews});}}>
              <img src={this.$imagesMap.$home_user_notice} alt=""/>
              <i className={Object.keys(this.state.userNoticeHeader || {}).length && this.state.userNoticeHeader.list && this.state.userNoticeHeader.list.length ? '' : 'hide'}>{Object.keys(this.state.userNoticeHeader || {}).length && this.state.userNoticeHeader.list && this.state.userNoticeHeader.list.length}</i>
            </div>
            {this.state.showNews && <div className="new-li-content">
              <p className="clearfix">
                <span>{this.intl.get("userNotice")}</span>
                <em onClick={this.checkAll}>{this.intl.get("notice-allRead")}</em>
              </p>
              {Object.keys(this.state.userNoticeHeader || {}).length &&  this.state.userNoticeHeader.list && this.state.userNoticeHeader.list.length ? (
                <ul>{Object.keys(this.state.userNoticeHeader || {}).length && this.state.userNoticeHeader.list && this.state.userNoticeHeader.list.map((v, index) => (
                  <li key={index} onClick={value => this.changeHeaderNotice(v, index)} className="clearfix">
                    <span>{this.props.configController.language === 'zh-CN' ? v.content.contentCN : v.content.contentEN}</span>
                    <b>{v.createAt.toDate('yyyy-MM-dd HH:mm:ss')}</b>
                    {/* <Link to = {{pathname: `/wuserNotice`, query: { newsCon: v }}}>{v.content}</Link> */}
                  </li>
                ))}</ul>
              ) : (
                <div>{this.intl.get("notice-none")}</div>
              )}
              <Link to="/userNotice" className="check-all" onClick={e=>this.setState({showNews:false})}>{this.intl.get("asset-viewAll")}</Link>
            </div>}
          </li>
          <li className={`${userToken ? 'hide' : 'login-li'}`}>
            <NavLink activeClassName="header-right-active" to="/login" style={{fontSize: '14px'}}>{`${this.intl.get('login')}`}/{`${this.intl.get('header-regist')}`}</NavLink>
          </li>
          <li className={`${userToken ? 'user-li' : 'hide'}`} >
            <p>{userName}</p>
            <ul className="login-ul">
              <li>
                <NavLink to="/user/safe">{`${this.intl.get('header-security')}`}</NavLink>
              </li>
              <li>
                <NavLink to="/user/identity">{`${this.intl.get('header-idVerify')}`}</NavLink>
              </li>
              <li className="login-out" onClick={this.loginOut}>{this.intl.get("header-logOut")}</li>
            </ul>
          </li>
          <li className="language-li">
            <p>
              <img src={this.state.languageArr[this.state.languageIndex].imgUrl} alt=""/>
              <span>{this.state.languageArr[this.state.languageIndex].content}</span>
            </p>
            <ul className="language-ul">
              {this.state.languageArr.map((v, index) => (<li key={index} className={this.state.languageIndex === index ? 'hide' : ''} onClick={i => {this.changeLanguage(v.value)}}>
                <img src={v.imgUrl} alt=""/>
                <span>{v.content}</span>
              </li>))}
            </ul>
          </li>
        </ol>
        {this.state.userNoticePop && <UserNoticeContent
          onClose={() => {this.setState({ userNoticePop: false });}}
          content={this.state.userContent}/>}
        {this.state.otherLogin && <div className="other-login">
          <p>{this.state.otherLoginCon === 2006 ? this.intl.get("login-miss") : this.intl.get("login-other")}</p>
        </div>}
      </div>
    )
  }
}
