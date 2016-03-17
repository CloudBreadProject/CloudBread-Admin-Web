import React, { Component, PropTypes } from 'react';
import styles from './InspectorHeader.scss';
import cx from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signout } from 'reducers/user';
import { showSnackbarMessage } from 'reducers/display';

import Link from 'react-router/lib/Link';

import IconButton from 'material-ui/lib/icon-button';
import ExitToApp from 'material-ui/lib/svg-icons/action/exit-to-app';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signout,
    showSnackbarMessage,
  }, dispatch);
}

class InspectorHeader extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    signout: PropTypes.func,
    showSnackbarMessage: PropTypes.func,
  };

  constructor() {
    super();
    this.handleClickSignOut = this.handleClickSignOut.bind(this);
  }

  componentDidMount() {
  }

  render() {
    const iconProperty = {
      color: '#fff',
    };
    return (
      <div className={styles.InspectorHeader}>
        <div className={styles.Wrapper}>
          <div className={styles.Side}>
            <Link to="/" className={styles.Title}>Inspector</Link>
          </div>
          <div className={styles.Content}>
          </div>
          <div className={cx(styles.Side, styles.Right)}>
            <IconButton
              tooltip="Sign out"
              onClick={this.handleClickSignOut}
            >
              <ExitToApp {...iconProperty} />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }

  handleClickSignOut() {
    this.props.signout();
    this.context.router.push('/auth');
    this.props.showSnackbarMessage({
      snackbarMessage: 'Successfully signed out',
    });
  }
}

export default connect(null, mapDispatchToProps)(InspectorHeader);
