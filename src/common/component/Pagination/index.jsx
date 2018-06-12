import React, { Component } from 'react'

export default class Pagination extends Component {
  constructor(props) {
    super(props)
  }
  list = () => {

  }
  render() {
    let { current, PageSize}
    return (
      <div className="pagination">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    )
  }
}
