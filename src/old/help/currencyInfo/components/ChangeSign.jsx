import React from 'react';
import {observer} from "mobx-react";


@observer
class ChangeSign extends React.Component {
  constructor(props) {
    super(props);
    this.setSelected = this.setSelected.bind(this);
  }
  // judge selected currency sign
  setSelected(i, e) {
    const {store} = this.props;
    store.selected = i;
    store.lng = i;
  }
  // show currency sign selected state
  active(i) {
    const {store} = this.props;
    return (store.selected === i) ? "active" : '';
  }

  render() {
    const {store} = this.props;
    return (
      <div className="currency-sign">
        <button
          type="button"
          className={`signal-btn  ${this.active("USD")}`}
          onClick={this.setSelected.bind(this, "USD")}
        >
          <i className="fa fa-dollar"></i>
        </button>
        <button
          type="button"
          className={`signal-btn  ${this.active("RMB")}`}
          onClick={this.setSelected.bind(this, "RMB")}
        >
          <i className="fa fa-cny"></i>
        </button>
      </div>
    )
  }
}

export default ChangeSign
