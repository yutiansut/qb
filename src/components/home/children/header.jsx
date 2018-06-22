import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import '../stylus/header.styl'
// const Nav = ({label,to}) => (
//     <Route path={to}  children={({ match }) => (
//         <li className={match ? 'active' : ''}>
//           {match ? '> ' : ''}<Link to={to}>{label}</Link>
//         </li>
//     )}/>
// );
const navArray = [
  {label: '首页', to: '/home', select: false, linkUser: false},
  {label: '币币交易', to: '/trade', select: false, linkUser: false},
  {label: '资产管理', to: '/wallet', select: true, linkUser: true, childrenList:[{label: '资产管理', to: '/wallet',}, {label: '订单管理', to: '/order',}]},
  {label: '用户', to: '/user', select: false, linkUser: false},
  {label: '关于', to: '/about', select: false, linkUser: false},
  {label: '主题列表', to: '/topics', select: false, linkUser: false},
  {label: '登录／注册', to: '/login', select: false, linkUser: false},
  {label: '资讯公告', to: '/notice', select: false, linkUser: false},
];


export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      navClass:'headerNav'
    }
    this.changeNavClass = this.changeNavClass.bind(this)
    this.matched = '/home'
  }

  changeNavClass(to) {
    console.log('aaa',to)
    if(this.matched === to){
      return
    }
    this.matched = to
    let navClass = 'headerNav'
    if(to === '/trade'){
      navClass = 'tradeNav'
    }
    this.setState({navClass})
  }

  render() {
    return (
      <div className="nav-warp">
        <ul className={this.state.navClass}>
          <li className='nav-logo'>
            <Link to='/home'></Link>
          </li>
          {navArray.map((v, index) => (<Route path={v.to} key={index}  children={({match}) => {
              return <NavChild to={v.to} label={v.label} match={match} changeNavClass={this.changeNavClass} select={v.select} childrenList={v.childrenList}/>
            }
          }/>))}
        </ul>
      </div>
    )
  }
}


class NavChild extends Component {
  constructor(props){
    super(props)
    console.log(props)
    props.match && this.props.changeNavClass(props.match.path)
  }

  componentWillUpdate(props) {
    props.match && this.props.changeNavClass(props.match.path)
  }

  render(){
    return (
        <li className={`header-nav${this.props.match ? '-active' : ''} ${this.props.select ? 'select-list' : ''}`  }>
          <Link to={this.props.to}>{this.props.label}</Link>
          {this.props.select && (
              <ul className='select-router'>
                {this.props.childrenList.map((v, index) => {
                  return(
                      <li key={index}>
                        <Link to={v.to}>{v.label}</Link>
                      </li>
                  )
                })}
              </ul>
          )}
        </li>
    )
  }
}