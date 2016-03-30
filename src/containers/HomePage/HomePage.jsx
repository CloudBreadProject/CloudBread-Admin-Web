import React, { Component } from 'react';
import Helmet from 'react-helmet';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

class HomePage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Helmet title="CloudBread Inspector" />
        Inspector Main
        <List>
          <ListItem primaryText="test" />
        </List>
      </div>
    );
  }
}

export default HomePage;
