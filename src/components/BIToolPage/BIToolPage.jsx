import React, { Component } from 'react';
import styles from './BIToolPage.scss';
import Helmet from 'react-helmet';

export class BIToolPage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.BIToolPage}>
        <Helmet title="CloudBread BI Tool" />
        <iframe
          src="/bi.html"
          frameBorder={0}
        />
      </div>
    );
  }
}

export default BIToolPage;
