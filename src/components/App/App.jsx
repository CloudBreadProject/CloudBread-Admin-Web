import React, { Component, PropTypes } from 'react';
import styles from './App.scss';

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
