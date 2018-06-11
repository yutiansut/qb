import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

export default class testApp  extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div>{this.props.sta}</div>
          {/*<Router>*/}
            <div>
            <Link to="/">
                回退
            </Link>
              <Link to="/topics">
                  回退
              </Link></div>
          {/*</Router>*/}
      </div>
    );
  }

}