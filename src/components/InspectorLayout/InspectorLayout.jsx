import React, { Component, PropTypes } from 'react';
import styles from './InspectorLayout.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showSnackbarMessage } from 'actions/display';

import InspectorHeader from './InspectorHeader';
import InspectorSideNav from './InspectorSideNav';

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showSnackbarMessage,
  }, dispatch);
}

class InspectorLayout extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    children: PropTypes.node,
    showSnackbarMessage: PropTypes.func,
  };

  componentDidMount() {}

  render() {
    const { children } = this.props;
    return (
      <div className={styles.InspectorLayout}>
        <InspectorHeader />
        <div className={styles.Section}>
          <InspectorSideNav />
          <div className={styles.Main}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectorLayout);
