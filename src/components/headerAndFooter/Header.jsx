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
// const Nav = ({label,to}) => (
//     <Route path={to}  children={({ match }) => (
//         <li className={match ? 'active' : ''}>
//           {match ? '> ' : ''}<Link to={to}>{label}</Link>
//         </li>
//     )}/>
// );
const navArrayLeft = [
  {label: '首页', to: '/home', select: false, linkUser: false},
  {label: '币币交易', to: '/trade', select: false, linkUser: false},
  {
    label: '资产管理',
    to: '/wallet',
    select: true,
    linkUser: true,
    childrenList: [{label: '资产管理', to: '/wallet',}, {label: '订单管理', to: '/order',}]
  },
  // {label: '用户', to: '/user', select: false, linkUser: false},
  // {label: '关于', to: '/about', select: false, linkUser: false},
  // {label: '主题列表', to: '/topics', select: false, linkUser: false},
  // {label: '登录／注册', to: '/login', select: false, linkUser: false},
  // {label: '资讯公告', to: '/notice', select: false, linkUser: false},
];

const languageArr = [
  {imgUrl: '/static/img/home/chinese.svg', content: '简体中文'},
  {imgUrl: '/static/img/home/chinese.svg', content: '繁體中文'},
  {imgUrl: '/static/img/home/english.png', content: '英语'}
]

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      navClass: 'headerNav',
      languageIndex: 0
    }
    this.changeNavClass = this.changeNavClass.bind(this)
    this.changeLanguage = this.changeLanguage.bind(this) // 改变语言
    this.matched = '/home'
  }

  changeNavClass(to) {
    // console.log('aaa',to)
    if(this.matched === to){
      return
    }
    this.matched = to
    let navClass = 'headerNav'
    if (to === '/trade') {
      navClass = 'tradeNav'
    }
    this.setState({navClass})
  }

  changeLanguage(index) {
    console.log('语言', index)
    this.setState({
      languageIndex: index
    })
  }

  render() {
    return (
      <div className={`${this.state.navClass} clearfix`}>
        <ul className="clearfix">
          <li className='nav-logo'>
            <Link to='/home'></Link>
          </li>
          {navArrayLeft.map((v, index) => (<Route path={v.to} key={index} children={({match}) => {
            return <NavChild to={v.to} label={v.label} match={match} changeNavClass={this.changeNavClass}
                             select={v.select} childrenList={v.childrenList}/>
          }
          }/>))}
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
          <li className="login-li" onClick={this.changeNavClass}>
            <NavLink activeClassName="header-right-active" to="/login">登录/注册</NavLink>
          </li>
          <li className="user-li">
            <p>12345678987</p>
            <ul className="login-ul">
              <li onClick={this.changeNavClass}>
                <NavLink to="/user/safe">安全中心</NavLink>
              </li>
              <li onClick={this.changeNavClass}>
                <NavLink to="/user/identity">身份认证</NavLink>
              </li>
            </ul>
          </li>
          <li className="language-li">
            <p>
              <img src={languageArr[this.state.languageIndex].imgUrl} alt=""/>
              <span>{languageArr[this.state.languageIndex].content}</span>
            </p>
            <ul className="language-ul">
              {languageArr.map((v, index) => (<li key={index} className={this.state.languageIndex === index ? 'hide' : ''} onClick={i => {this.changeLanguage(index)}}>
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


class NavChild extends Component {
  constructor(props) {
    super(props)
    // console.log(props)
    props.match && this.props.changeNavClass(props.match.path)
  }

  componentWillUpdate(props) {
    props.match && this.props.changeNavClass(props.match.path)
  }

  render() {
    console.log('navchild render')
    return (
      <li className={`header-nav${this.props.match ? '-active' : ''} ${this.props.select ? 'select-list' : ''}`}>
        <Link to={this.props.to}>{this.props.label}</Link>
        {this.props.select && (
          <ul className='select-router'>
            {this.props.childrenList.map((v, index) => {
              return (
                <li key={index}>
                  <NavLink activeClassName="children-active" to={v.to}>{v.label}</NavLink>
                </li>
              )
            })}
          </ul>
        )}
      </li>
    )
  }
}