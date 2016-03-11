import React, { Component } from 'react';
import styles from './InspectorSideNav.scss';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import People from 'material-ui/lib/svg-icons/social/people';
import DataUsage from 'material-ui/lib/svg-icons/device/data-usage';
import Divider from 'material-ui/lib/divider';

class InspectorSideNav extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.InspectorSideNav}>
        <List>
          <ListItem primaryText="Notice" leftIcon={<ContentSend />} />
          <ListItem primaryText="Event" leftIcon={<ActionGrade />} />
          <ListItem primaryText="Gift" leftIcon={<ContentDrafts />} />
          <ListItem primaryText="Activity" leftIcon={<ContentInbox />} />
          <ListItem primaryText="Users" leftIcon={<People />} />
          <ListItem primaryText="Monitor" leftIcon={<DataUsage />} />
        </List>
        <Divider />
        <List>
          <ListItem primaryText="Policy" rightIcon={<ActionInfo />} />
          <ListItem primaryText="License" rightIcon={<ActionInfo />} />
        </List>
      </div>
    );
  }
}

export default InspectorSideNav;
