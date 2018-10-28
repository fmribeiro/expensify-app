import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { FormattedMessage, injectIntl, intlShape,defineMessages } from 'react-intl';

export const LoginPage = ({ startLogin, props}) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p><FormattedMessage id="LoginPage.loginTitle" defaultMessage="It's time to get your expenses under control."/></p>
      <button className="button" onClick={startLogin}><FormattedMessage id="LoginPage.button" defaultMessage="Login with Google"/></button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined,mapDispatchToProps)(LoginPage);
