import React, { Component } from "react";

export default function asyncComponent(importComponent, props) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      console.log('AsyncComponent')
      this.setState({component});
    }

    render() {
      const C = this.state.component;

      return C ? <C {props} /> : null;
    }
  }

  return AsyncComponent;
}