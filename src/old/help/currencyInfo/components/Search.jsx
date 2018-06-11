import React from 'react';
import UnitStore from '../store.jsx';
import {observer} from 'mobx-react';
import {translate} from "react-i18next";


@translate(['translations'], {wait: true})
@observer
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.setQuery = this.setQuery.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  // get input value
  setQuery(e) {
    e.preventDefault();
    const {store} = this.props;
    store.query = e.target.value;
  }
  // judge necessary of showing drop-box
  get hidden() {
    const {store} = this.props;
    if (store.query) {
      return '';
    }
    return 'hidden';
  }
  // return all suited outcome
  get expected() {
    const {store} = this.props;
    let expected = [];
    if (store.query) {
      var reg = new RegExp(store.query, 'i');
      store.allArray.map(i => {
        if (i.match(reg)) {
          expected.push(i)
        }
      });
    }
    return expected
  }
  // judge mouse on which block
  handleMouseOver(index ,e) {
    e.preventDefault();
    const {store} = this.props;
    store.type = index;
  }
  // judge mouse leave a block or not
  handleMouseOut()  {
    const {store} = this.props;
    store.type = -1;
  }
  // click an output to show new search result
  handleClick(i ,e) {
    e.preventDefault();
    const {signStore} = this.props;
    // const w=window.open('/help/currency/info/');
    // var toLink='?search='+i;
    // w.location.href=toLink;
    var query=i.split("-")[0]
    window.location.href = '/help/currency/info/?search='+query+`&lng=${signStore.lng}`;
  }
  // show selected state
  active(i) {
    const {store} = this.props;
    return (store.type === i) ? "on" : '';
  }

  handleSubmit(event) {
    const {store, signStore} = this.props;
    let expected = [];
    if (store.query) {
      var reg = new RegExp(store.query, 'i');
      store.allArray.map(i => {
        if (i.match(reg)) {
          expected.push(i);
          store.query=String(expected[0]).split('-')[0];
        }
      });
    }
  }

  render() {
    const {store} = this.props;
    const {signStore} = this.props;
    const {t, i18n} = this.props;
    var result = '';
    if (store.query){
      if (_.isEmpty(this.expected)) {
        result =  <div className={`auto ${this.hidden}`} id="auto">
                    <div style={{color:'red'}}>{t('暂无该币种！请再次搜索！')}</div>
                  </div>
    }else {
        result = <div className={`auto ${this.hidden}`} id="auto">
                  {this.expected.map((i, index)=> (
                    <div
                      key={index}
                      className={`auto-out ${this.active(index)}`}
                      onMouseOver={this.handleMouseOver.bind(this, index)}
                      onMouseOut={this.handleMouseOut}
                      onClick={this.handleClick.bind(this, i)}
                    >
                      <a href={`?lng=${signStore.selected}&search=${i}`} id={`search-list-${index}`}>{i}</a>
                    </div>
                  ))}
                </div>
      }}
    return(
        <div className="search-box">
          {/*<div className="row">*/}
          {/*<div className="col-sm-7 col-sm-offset-2">*/}
          <div>
            <form method="GET" onSubmit={this.handleSubmit}>
              <div className="wrap">
                <input type="text"
                       name="search"
                       id="input"
                       className="form-control currency-search-input"
                       onChange={this.setQuery}
                       value={store.query}
                       placeholder={t('搜索币种（按首字母排列）')}
                       autoFocus
                       autoComplete="off"
                />
                <input type="hidden"
                       value={signStore.selected}
                       name="lng"
                />
                {/*<i className="fa fa-search"></i>*/}
                {result}
              </div>
            </form>
          </div>
        </div>
      )
  }
}

export default Search
