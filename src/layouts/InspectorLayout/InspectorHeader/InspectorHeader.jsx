import React, { Component } from 'react';
import styles from './InspectorHeader.scss';
import cx from 'classnames';

import Link from 'react-router/lib/Link';

import IconButton from 'material-ui/lib/icon-button';
import ExitToApp from 'material-ui/lib/svg-icons/action/exit-to-app';
import Settings from 'material-ui/lib/svg-icons/action/settings';
import CloudQueue from 'material-ui/lib/svg-icons/file/cloud-queue';

class InspectorHeader extends Component {
  constructor() {
    super();
    this.handleDoneTyping = this.handleDoneTyping.bind(this);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.InspectorHeader}>
        <div className={styles.Wrapper}>
          <div className={styles.Side}>
            <Link to="/" className={styles.Title}>Inspector</Link>
          </div>
          <div className={styles.Content}>
          </div>
          <div className={cx(styles.Side, styles.Right)}>
            <IconButton tooltip="Sign out"><ExitToApp /></IconButton>
            <IconButton tooltip="Settings"><Settings /></IconButton>
            <IconButton tooltip="CloudBread"><CloudQueue /></IconButton>
          </div>
        </div>
      </div>
    );
  }

  handleDoneTyping() {
    this.setState({
      isRequesting: true,
    });
    setTimeout(() => {
      this.setState({
        isRequesting: false,
      });
    }, 1000);
  }
}

export default InspectorHeader;
