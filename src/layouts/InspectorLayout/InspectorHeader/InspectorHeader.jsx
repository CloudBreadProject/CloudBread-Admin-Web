import React, { Component } from 'react';
import styles from './InspectorHeader.scss';

import Link from 'react-router/lib/Link';
import InspectorSearch from '../InspectorSearch';

class InspectorHeader extends Component {
  constructor() {
    super();
    this.handleDoneTyping = this.handleDoneTyping.bind(this);
  }

  componentDidMount() {
  }

  render() {
    const { isRequesting } = this.state || {};
    return (
      <div className={styles.InspectorHeader}>
        <div className={styles.Wrapper}>
          <div className={styles.Side}>
            <Link to="/" className={styles.Title}>Inspector</Link>
          </div>
          <div className={styles.Content}>
            <InspectorSearch
              isWorking={isRequesting}
              onDoneTyping={this.handleDoneTyping}
            />
          </div>
          <div className={styles.Side}>
            Right Menu
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
