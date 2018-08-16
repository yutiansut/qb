import React from 'react';
import Logger from './libs/Logger'
// const controllerBase = new ControllerBase()

export default class ViewBase extends React.Component {
  constructor(props) {
    super(props);
    this.Logger = Logger
    // controllerBase.setView(this)
  }

  componentWillMount() {
  
  }

  componentDidMount() {
  
  }

  componentWillUpdate() {

  }


}