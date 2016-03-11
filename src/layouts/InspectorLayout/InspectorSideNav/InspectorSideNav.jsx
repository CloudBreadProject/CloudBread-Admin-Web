import React, { Component, PropTypes } from 'react';
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
  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
  }

  render() {
    return (
      <div className={styles.InspectorSideNav}>
        <List>
          {this.renderListItem({ primaryText: 'Notice', to: '/finder/test', leftIcon: <ContentSend /> })}
          <ListItem
            primaryText="Notice"
            leftIcon={<ContentSend />}
          />
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

  renderListItem({
    to,
    primaryText,
    leftIcon,
  }) {
    return (
      <ListItem
        primaryText={primaryText}
        leftIcon={leftIcon}
        onTouchTap={this.handleTouchListItem(to)}
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
