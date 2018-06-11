import React from 'react';
import {observer} from "mobx-react";
const isEmpty = require('lodash.isempty');


@observer
class Recommend extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const {store} = this.props;
    store.get();
  }

  render(){
    const {store} = this.props;
    return(
      <div>
        {isEmpty(store.recommendData)?<p>暂无</p>:
        store.recommendData.map((i,index) =>{
          return(
            <div key={index}>
              <p>{i.name}</p>
              <p>{i.last}</p>
              <p>{i.money}</p>
              <p>{i.vol}</p>
              <p>{i.updown}</p>
              <p>{i.line}</p>
            </div>
          )
        })
        }
      </div>
    )
  }
}

export default Recommend
