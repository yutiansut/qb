import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import exchangeViewBase from '../../../components/ExchangeViewBase'

export default class userIdentity extends exchangeViewBase {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // super.componentWillMount();
    console.log('testApp componentWillMount')
  }

  componentDidMount() {
    // super.componentDidMount();
    console.log('testApp componenDidMount')
  }

  componentWillUpdate(...parmas) {
    console.log('testApp componentWillUpdate', ...parmas)
  }


  render() {
    return (
      <div>
        1111111111
      </div>
    );
  }

}