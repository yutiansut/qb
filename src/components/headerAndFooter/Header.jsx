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
// const Nav = ({label,to}) => (
//     <Route path={to}  children={({ match }) => (
//         <li className={match ? 'active' : ''}>
//           {match ? '> ' : ''}<Link to={to}>{label}</Link>
//         </li>
//     )}/>
// );


const languageArr = [
  { imgUrl: '/static/img/home/chinese.svg', content: '简体中文', value: "zh-CN"},
  // {imgUrl: '/static/img/home/chinese.svg', content: '繁體中文'},
  {imgUrl: '/static/img/home/english.png', content: 'English', value: "en-US"}
]

export default class Header extends ExchangeViewBase {
  constructor(props) {
    super(props)
    this.state = {
      navClass: 'headerNav',
      languageIndex: 0,
      navArrayLeft : [
        {label: `${this.intl.get('header-home')}`, to: '/whome', select: false, linkUser: false, tokenShow: false},
        {label: `${this.intl.get('header-exchange')}`, to: '/trade', select: false, linkUser: false, tokenShow: false},
        {
          label: `${this.intl.get('header-assets')}`,
          to: '/wallet',
          select: true,
          linkUser: true,
          tokenShow: true,
          childrenList: [{label: `${this.intl.get('header-assets')}`, to: '/wallet',}, {label: `${this.intl.get('header-order')}`, to: '/worder',}]
        }
      ]
    }
    this.configController = this.props.configController;
    this.loginController = this.props.loginController;
    this.userController = this.props.userController;
    this.changeLanguage = this.configController.changeLanguage.bind(this.configController); // 改变语言
    this.clearLoginInfo = this.loginController.clearLoginInfo.bind(this.loginController) // 退出登录
    this.getUserNocticeList = this.userController.getUserNocticeList.bind(this.userController) // 获取通知列表
    this.loginOut = this.loginOut.bind(this)
    //绑定view
    this.userController.setView(this)
    //初始化数据，数据来源即store里面的state
    this.state = Object.assign(this.state, this.userController.view.state.userNocticeList);
    this.matched = '/whome'
  }
  async componentDidMount() {
    await this.getUserNocticeList()
    //let userNocticeList = this.state.userNocticeList
    //userNocticeList = userNocticeList && userNocticeList.filter(v => {return v.isRead === 0}) // 筛选未读信息
    languageArr.forEach((v,index)=>{
      v.value === this.configController.language && this.setState({ languageIndex : index})
    })
    this.state.navArrayLeft.forEach(v => {
      this.userToken && (v.tokenShow = false)
    })
    ChangeFontSize(1440*0.8, 1440*1)
    //this.setState({userNocticeList})
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
    this.props.history.push('/whome')
    let navArrayLeft = this.state.navArrayLeft
    navArrayLeft[2].tokenShow = true
    this.setState({navArrayLeft})
  }

  render() {
    console.log('头部', this.state)
    let userToken = this.props.userController.userToken || null
    let userName = this.props.userController.userName || null
    this.state.navArrayLeft.forEach(v => {
      userToken && (v.tokenShow = false)
    })
    return (
      <div className={`${this.props.navClass} clearfix`}>
        <ul className="clearfix">
          <li className='nav-logo'>
            <Link to='/whome'></Link>
          </li>
          {this.state.navArrayLeft.map((v, index) => (<Route path={v.to} key={index} children={({match}) => {
            // console.log(match)
            return <li className={`header-nav${match ? '-active' : ''} ${v.tokenShow ? 'hide' : ''} ${v.select ? 'select-list' : ''}`} >
                    <Link to={v.to}>{v.label}</Link>
                      {v.select && (
                        <ul className='select-router'>
                          {v.childrenList.map((v, index) => {
                            return (
                              <li key={index}>
                                <NavLink activeClassName="children-active" to={v.to}>{v.label}</NavLink>
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
            <div className="new-li-img">
              <img src="/static/img/home/new_hei.svg" alt=""/>
              <i className={this.state.userNocticeList && this.state.userNocticeList.length ? '' : 'hide'}>{this.state.userNocticeList && this.state.userNocticeList.length}</i>
            </div>
            <div className="new-li-content">
              <p>通知</p>
              {this.state.userNocticeList && this.state.userNocticeList.length ? (<ul>{this.state.userNocticeList.map((v, index) => (<li key={index}>{ddddd}</li>))}</ul>) : (<div>没有新通知</div>)}
              <Link to="/wuserNotice">查看全部</Link>
            </div>
          </li>
          <li className={`${userToken ? 'hide' : 'login-li'}`}>
            <NavLink activeClassName="header-right-active" to="/wlogin">{`${this.intl.get('login')}`}/{`${this.intl.get('header-regist')}`}</NavLink>
          </li>
          <li className={`${userToken ? 'user-li' : 'hide'}`} >
            <p>{userName}</p>
            <ul className="login-ul">
              <li>
                <NavLink to="/wuser/safe">{`${this.intl.get('header-security')}`}</NavLink>
              </li>
              <li>
                <NavLink to="/wuser/identity">{`${this.intl.get('header-idVerify')}`}</NavLink>
              </li>
              <li onClick={this.loginOut}>退出</li>
            </ul>
          </li>
          <li className="language-li">
            <p>
              <img src={languageArr[this.state.languageIndex].imgUrl} alt=""/>
              <span>{languageArr[this.state.languageIndex].content}</span>
            </p>
            <ul className="language-ul">
              {languageArr.map((v, index) => (<li key={index} className={this.state.languageIndex === index ? 'hide' : ''} onClick={i => {this.changeLanguage(v.value)}}>
                <img src={v.imgUrl} alt=""/>
                <span>{v.content}</span>
              </li>))}
            </ul>
          </li>
        </ol>
      </div>
    )
  }
}
