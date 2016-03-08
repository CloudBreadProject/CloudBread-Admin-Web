import React, { Component, PropTypes } from 'react';

import styles from './AuthPage.scss';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';
import Loading from 'components/Loading';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export class AuthPage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.handleClickAuthorize = this.handleClickAuthorize.bind(this);
  }

  componentDidMount() {
    const { identifierInput } = this.refs;
    identifierInput.focus();
  }

  render() {
    const { isLoading } = this.state || {};
    return (
      <div>
        <h1>CloudBread Inspector</h1>
        <TextField
          hintText="Identifier"
          disabled={isLoading}
          fullWidth
          ref="identifierInput"
        />
        <TextField
          hintText="Password"
          disabled={isLoading}
          fullWidth
          type="password"
          ref="passwordInput"
        />
        <div className={styles.CheckboxGroup}>
          <Checkbox
            disabled={isLoading}
            label="Remember me"
            labelStyle={{
              marginTop: '2px',
            }}
          />
        </div>
        <div className={styles.ButtonGroup}>
          <RaisedButton
            primary
            label="Authorize"
            onClick={this.handleClickAuthorize}
            disabled={isLoading}
          />
        </div>
        <Loading show={isLoading} />
      </div>
    );
  }

  handleClickAuthorize() {
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
      this.context.router.push('/inspector');
    }, 1000);
  }
}

export default connect(null, mapDispatchToProps)(AuthPage);
