import React from 'react';
import { NavLink } from "react-router-dom";
import exchangeViewBase from "../../../components/ExchangeViewBase.jsx";

export default class setTwoVerify extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
    }
    const { controller } = this.props
    controller.setView(this)
  }

  componentWillMount() {
  }
  componentDidMount() {
  }

  render() {
    const { controller, url } = this.props;
    // const language = this.props.controller.configData.language;
    return (
      <div className="user-center-twoStep">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    );
  }
}