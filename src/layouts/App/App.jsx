import React, { Component, PropTypes } from 'react';
import styles from './App.scss';
import Header from 'components/Header';

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
