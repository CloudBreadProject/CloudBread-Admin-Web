import React, { Component, PropTypes } from 'react';
import Header from '../Header';
import styles from './App.scss';
import Loading from '../Loading';

class App extends Component {
  // to get loading prop, loadProps method is required
  static loadProps(props, cb) {
    cb();
  }

  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <Loading show={loading} />
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;
