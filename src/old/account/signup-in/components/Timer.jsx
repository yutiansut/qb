import React from 'react';
import {observer} from "mobx-react";

@observer
class Timer extends React.Component {
  componentDidMount() {
    const {store} = this.props;
    store.countdown()
  }

  get timer() {
    const {store} = this.props;
    return store.timer
  }

  render() {
    return <div>{this.timer}</div>
  }
}

export default Timer

