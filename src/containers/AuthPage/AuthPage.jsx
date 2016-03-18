import React, { Component, PropTypes } from 'react';

import styles from './AuthPage.scss';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { authenticate } from 'actions/user';
import {
  showSnackbarMessage,
  showLoading,
  hideLoading,
} from 'actions/display';

import { setTitle } from 'lib/context';

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
    showLoading,
    hideLoading,
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
    showLoading: PropTypes.func,
    hideLoading: PropTypes.func,
  };

  constructor() {
    super();
    this.handleClickAuthorize = this.handleClickAuthorize.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentWillMount() {
    setTitle('Inspector Authentication');
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
    const { errorText } = this.state || {};
    const { isAuthenticating } = this.props;
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
    this.props.showLoading();
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
    this.props.hideLoading();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
