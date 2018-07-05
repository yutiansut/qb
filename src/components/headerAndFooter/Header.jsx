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
        {label: `${this.intl.get('header-home')}`, to: '/home', select: false, linkUser: false, tokenShow: false},
        {label: `${this.intl.get('header-exchange')}`, to: '/trade', select: false, linkUser: false, tokenShow: false},
        {
          label: `${this.intl.get('header-assets')}`,
          to: '/wallet',
          select: true,
          linkUser: true,
          tokenShow: true,
          childrenList: [{label: `${this.intl.get('header-assets')}`, to: '/wallet',}, {label: `${this.intl.get('header-order')}`, to: '/order',}]
        },
        // {label: '用户', to: '/user', select: false, linkUser: false},
        // {label: '关于', to: '/about', select: false, linkUser: false},
        // {label: '主题列表', to: '/topics', select: false, linkUser: false},
        // {label: '登录／注册', to: '/login', select: false, linkUser: false},
        // {label: '资讯公告', to: '/notice', select: false, linkUser: false},
      ]
    }
    this.configController = this.props.configController;
    //
    this.changeLanguage = this.configController.changeLanguage.bind(this.configController); // 改变语言
    this.matched = '/home'
  }
  componentDidMount() {
    languageArr.forEach((v,index)=>{
      v.value === this.configController.language && this.setState({ languageIndex : index})
    })
    this.state.navArrayLeft.forEach(v => {
      this.userToken && (v.tokenShow = false)
    })
  }

  componentWillUpdate(...parmas) {
    console.log('aaaaa')

  }

  render() {
    console.log('token', this.userToken)
    let userToken = this.props.userController.userToken || null
    this.state.navArrayLeft.forEach(v => {
      userToken && (v.tokenShow = false)
    })
    return (
      <div className={`${this.props.navClass} clearfix`}>
        <ul className="clearfix">
          <li className='nav-logo'>
            <Link to='/home'></Link>
          </li>
          {this.state.navArrayLeft.map((v, index) => (<Route path={v.to} key={index} children={({match}) => {
            console.log(match)
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
          <li className="new-li">
            <div className="new-li-img">
              <img src="/static/img/home/new_hei.svg" alt=""/>
            </div>
            <div className="new-li-content">
              <p>通知</p>
              <div>没有新通知</div>
              <a href="javascript:void(0)">查看全部</a>
            </div>
          </li>
          <li className={`${userToken ? 'hide' : 'login-li'}`}>
            <NavLink activeClassName="header-right-active" to="/login">{`${this.intl.get('login')}`}/{`${this.intl.get('header-regist')}`}</NavLink>
          </li>
          <li className={`${userToken ? 'user-li' : 'hide'}`} >
            <p>12345678987</p>
            <ul className="login-ul">
              <li>
                <NavLink to="/user/safe">{`${this.intl.get('header-security')}`}</NavLink>
              </li>
              <li>
                <NavLink to="/user/identity">{`${this.intl.get('header-idVerify')}`}</NavLink>
              </li>
              <li>退出</li>
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
