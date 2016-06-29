import React, { Component } from 'react';
import styles from './HomePage.scss';
import Helmet from 'react-helmet';

export class HomePage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.HomePage}>
        <Helmet title="CloudBread Inspector" />
        <iframe
          src="/main.html"
          frameBorder={0}
        />
      </div>
    );
  }
}

export default HomePage;
