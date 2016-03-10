import React, { Component } from 'react';
import { setTitle } from 'lib/context';

class HomePage extends Component {
  componentDidMount() {
    setTitle('CloudBread Inspector');
  }

  render() {
    return (
      <div>
        Inspector Main
      </div>
    );
  }
}

export default HomePage;
