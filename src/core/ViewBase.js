import React from 'react';

import ControllerBase from './ControllerBase';

// const controllerBase = new ControllerBase()

export default class ViewBase extends React.Component {
  constructor(props) {
    super(props)
    // controllerBase.setView(this)
  }

  componentWillMount() {
    // console.log('ViewBase componentWillMount')
  }

  componentDidMount() {
    // console.log('ViewBase componenDidMount')
  }
  componentWillUpdate() {
    // console.log('ViewBase componenDidMount')
  }

}