import React, { Component } from "react";

export default function AsyncComponent(importComponent, props) {
  class AsyncComponentCache extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      console.log('AsyncComponentCache 0')
      this.setState({component});
    }

    render() {
      const C = this.state.component;
      // console.log('AsyncComponentCache 1', props, this.props, C)
      return C ? <C {...props} {...this.props} /> : null;
    }
  }
  // console.log('AsyncComponentCache', AsyncComponentCache)
  return AsyncComponentCache;
}