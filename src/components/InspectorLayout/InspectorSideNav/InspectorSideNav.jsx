import React, { Component, PropTypes } from 'react';
import styles from './InspectorSideNav.scss';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import People from 'material-ui/lib/svg-icons/social/people';
import DataUsage from 'material-ui/lib/svg-icons/device/data-usage';
import CloudQueue from 'material-ui/lib/svg-icons/file/cloud-queue';
import Divider from 'material-ui/lib/divider';

class InspectorSideNav extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.renderListItem = this.renderListItem.bind(this);
    this.handleTouchListItem = this.handleTouchListItem.bind(this);
  }

  componentDidMount() {
  }

  render() {
    const topNavs = [
      {
        primaryText: 'Member',
        to: '/finder/Members',
        leftIcon: <People />,
      }, {
        primaryText: 'Monitor',
        to: '/analyst',
        leftIcon: <DataUsage />,
      },
    ];
    return (
      <div className={styles.InspectorSideNav}>
        <List>
          {topNavs.map(this.renderListItem)}
        </List>
        <Divider />
        <List>
          <ListItem primaryText="CloudBread" rightIcon={<CloudQueue />} href="http://aka.ms/cbp" target="_blank" />
        </List>
      </div>
    );
  }

  renderListItem(nav, key) {
    const {
      to,
      primaryText,
      leftIcon,
    } = nav;
    return (
      <ListItem
        primaryText={primaryText}
        leftIcon={leftIcon}
        onTouchTap={this.handleTouchListItem(to)}
        key={key}
      />
    );
  }

  handleTouchListItem(to) {
    return () => {
      this.context.router.push(to);
    };
  }
}

export default InspectorSideNav;
