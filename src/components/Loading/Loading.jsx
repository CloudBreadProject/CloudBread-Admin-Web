import React, { Component } from 'react';
import styles from './Loading.scss';

class Loading extends Component {
  render() {
    return (
      <div className={styles.LoadingWrapper}>
        <div className={styles.Loading} />
      </div>
    );
  }
}

export default Loading;
