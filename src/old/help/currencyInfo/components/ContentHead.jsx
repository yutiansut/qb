import React from 'react';
import {translate} from "react-i18next";


@translate(['translations'], {wait: true})
class ContentHead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var name = '';
    const {t} = this.props;
    if (this.props.info==='True') {
      name = <li className="content-head3 mix-title-font"> {t(`${this.props.currency.toUpperCase()}`)}</li>
    }
    else {
      name = <li className="content-head3 mix-title-font"></li>
    }
    return (
      <div className="content-head">
        <ul>
          <li className="content-head1 mix-title-font">{t('币币交易')} ></li>
          <li className="content-head2 mix-title-font"> {t('币种资料')} ></li>
          {name}
        </ul>
      </div>
    );
  }
}
export default ContentHead
