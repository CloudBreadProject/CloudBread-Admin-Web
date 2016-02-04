import React, { Component, PropTypes } from 'react';
import Header from 'components/Header';
import styles from './App.scss';

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    return (
      <div className={styles.App}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;
