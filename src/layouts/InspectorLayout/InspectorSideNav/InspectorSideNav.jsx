import React, { Component, PropTypes } from 'react';
import styles from './InspectorSideNav.scss';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import People from 'material-ui/lib/svg-icons/social/people';
import DataUsage from 'material-ui/lib/svg-icons/device/data-usage';
import CloudQueue from 'material-ui/lib/svg-icons/file/cloud-queue';
import Divider from 'material-ui/lib/divider';

class InspectorSideNav extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
  }

  render() {
    const topNavs = [
      {
        primaryText: 'Member',
        to: '/finder/Members',
        leftIcon: <People />,
      },
    ];
    return (
      <div className={styles.InspectorSideNav}>
        <List>
          {topNavs.map((nav, key) => this.renderListItem({ ...nav, key }))}
          <ListItem
            primaryText="Notice"
            leftIcon={<ContentSend />}
          />
          <ListItem primaryText="Event" leftIcon={<ActionGrade />} />
          <ListItem primaryText="Gift" leftIcon={<ContentDrafts />} />
          <ListItem primaryText="Activity" leftIcon={<ContentInbox />} />
          <ListItem primaryText="Monitor" leftIcon={<DataUsage />} />
        </List>
        <Divider />
        <List>
          <ListItem primaryText="CloudBread" rightIcon={<CloudQueue />} href="http://aka.ms/cbp" target="_blank" />
        </List>
      </div>
    );
  }

  renderListItem({
    to,
    primaryText,
    leftIcon,
    key,
  }) {
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
