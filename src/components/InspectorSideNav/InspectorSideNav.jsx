import React, { Component, PropTypes } from 'react';
import styles from './InspectorSideNav.scss';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import People from 'material-ui/lib/svg-icons/social/people';
import VerifiedUser from 'material-ui/lib/svg-icons/action/verified-user';
import GiftCard from 'material-ui/lib/svg-icons/action/card-giftcard';
import CardMembership from 'material-ui/lib/svg-icons/action/card-membership';
import EventSeat from 'material-ui/lib/svg-icons/action/event-seat';
import Event from 'material-ui/lib/svg-icons/action/event';
import Storage from 'material-ui/lib/svg-icons/device/storage';
import ViewList from 'material-ui/lib/svg-icons/action/view-list';
import Block from 'material-ui/lib/svg-icons/content/block';
import Info from 'material-ui/lib/svg-icons/action/info';
import InfoOutline from 'material-ui/lib/svg-icons/action/info-outline';
import Shop from 'material-ui/lib/svg-icons/action/shop';
import PlaylistCheck from 'material-ui/lib/svg-icons/av/playlist-add-check';
import EventNote from 'material-ui/lib/svg-icons/notification/event-note';
import CloudQueue from 'material-ui/lib/svg-icons/file/cloud-queue';
import InsertChart from 'material-ui/lib/svg-icons/editor/insert-chart';
import Divider from 'material-ui/lib/divider';

import pluralize from 'pluralize';

const topNavs = [];

function addNav(resourceId, icon, isPlural = true) {
  topNavs.push({
    primaryText: resourceId,
    to: `/finder/${(isPlural ? pluralize(resourceId) : resourceId)}`,
    leftIcon: icon,
  });
}

pluralize.addPluralRule(/fo$/i, 'foes');

addNav('Member', <People />);
addNav('AdminMember', <VerifiedUser />);
addNav('Coupon', <GiftCard />);
addNav('CouponMember', <CardMembership />);
addNav('GameEventMember', <EventSeat />);
addNav('GameEvents', <Event />);
addNav('GiftDepository', <Storage />);
addNav('ItemList', <ViewList />);
addNav('MemberAccountBlockLog', <Block />);
addNav('MemberGameInfo', <Info />);
addNav('MemberGameInfoStage', <InfoOutline />);
addNav('MemberItemPurchase', <Shop />);
addNav('MemberItem', <PlaylistCheck />);
addNav('Notice', <EventNote />);

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
    return (
      <div className={styles.InspectorSideNav}>
        <List>
          {topNavs.map(this.renderListItem)}
        </List>
        <Divider />
        <List>
          <ListItem primaryText="CloudBread" rightIcon={<CloudQueue />} href="http://aka.ms/cbp" target="_blank" />
          <ListItem primaryText="BI Tool" rightIcon={<InsertChart />} href="/bi.html" target="_blank" />
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
