import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import './stylus/footer.styl'

const footerArray = [
  {label: '资讯公告', to: '/notice'},
  { label: '费率标准', to: '/help/pricing'},
  {label: '上币标准', to: '/user'},
  { label: '服务协议', to: '/help/terms'},
  { label: 'API文档', to: '/help/api'}
];


export default class Footer extends Component {
  constructor() {
    super()
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUpdate(...parmas) {

  }

  render() {
    return (
      <div className="footer-wrap clearfix">
        <div className="fl">
          <Link to='/home' className="home-img"><img src="/static/img/logo-black.svg" alt=""/></Link>
          <ul className="clearfix">
            {footerArray.map((item, index) => (<li key={index}>
              <Link to={item.to}>{item.label}</Link>
            </li>))}
          </ul>
          <ol className="clearfix">
            <li><img src="/static/img/twitter.svg" alt=""/></li>
            <li><img src="/static/img/facebook.svg" alt=""/></li>
            <li><img src="/static/img/fill.svg" alt=""/></li>
          </ol>
        </div>
        <div className="fr right-content">
          <p>市场有风险 投资需谨慎</p>
          <p>© 2018 QB.com . All rights reserved</p>
        </div>
      </div>
    )
  }
}

