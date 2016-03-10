import React, { Component, PropTypes } from 'react';

import styles from './AuthPage.scss';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';
import Loading from 'components/Loading';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { authenticate } from 'reducers/user';
import { showSnackbarMessage } from 'reducers/display';

function mapStateToProps({ user }) {
  return {
    isAuthenticating: user.isAuthenticating,
    isAuthenticated: user.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    authenticate,
    showSnackbarMessage,
  }, dispatch);
}

export class AuthPage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    authenticate: PropTypes.func,
    showSnackbarMessage: PropTypes.func,
    isAuthenticating: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  };

  constructor() {
    super();
    this.handleClickAuthorize = this.handleClickAuthorize.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.showSnackbarMessage({
        snackbarMessage: 'Already authenticated',
      });
      this.context.router.push('/');
    }
    const { identifierInput } = this.refs;
    identifierInput.focus();
  }

  render() {
    const { isAuthenticating } = this.props;
    const { errorText } = this.state || {};
    return (
      <div>
        <h1>CloudBread Inspector</h1>
        <TextField
          hintText="Identifier"
          disabled={isAuthenticating}
          fullWidth
          ref="identifierInput"
          onEnterKeyDown={this.handleEnter}
        />
        <TextField
          hintText="Password"
          disabled={isAuthenticating}
          fullWidth
          type="password"
          ref="passwordInput"
          onEnterKeyDown={this.handleEnter}
        />
        <p
          style={{
            display: errorText ? 'block' : 'none',
          }}
        >
          {errorText}
        </p>
        <div className={styles.CheckboxGroup}>
          <Checkbox
            disabled={isAuthenticating}
            label="Remember me"
            labelStyle={{
              marginTop: '2px',
            }}
          />
        </div>
        <div className={styles.ButtonGroup}>
          <RaisedButton
            primary
            label="Authenticate"
            onClick={this.handleClickAuthorize}
            disabled={isAuthenticating}
          />
        </div>
        <Loading show={isAuthenticating} />
      </div>
    );
  }

  handleEnter() {
    if (this.refs.identifierInput.getValue() && this.refs.passwordInput.getValue()) {
      this.authorize();
    }
  }

  handleClickAuthorize() {
    this.authorize();
  }

  async authorize() {
    try {
      await this.props.authenticate({
        identifier: this.refs.identifierInput.getValue(),
        password: this.refs.passwordInput.getValue(),
      });
      this.props.showSnackbarMessage({
        snackbarMessage: 'Successfully authenticated',
      });
      this.context.router.push('/');
    } catch (error) {
      this.setState({
        errorText: 'Failed to login',
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
