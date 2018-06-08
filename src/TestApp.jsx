import React, {Component} from 'react';

export default class testApp  extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div className="color1">{this.props.sta}</div>
      </div>
    );
  }

}