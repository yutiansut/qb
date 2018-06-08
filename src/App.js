import React, { Component } from 'react';
import './test.styl'
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
        }
    }

    add () {
        this.setState({ count: this.state.count + 1 });
    }

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={() => this.add()}>增加1</button>
                <h1>{this.state.count}</h1>
                <h1>h1</h1>
                <h1>{this.state.count}</h1>
                <h1>h1</h1>
                <h1>h1</h1>
                <h1>h1</h1>
                <h1>{this.state.count}</h1>
            </div>
        );
    }
}
