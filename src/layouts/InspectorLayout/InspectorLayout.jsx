import React, { Component, PropTypes } from 'react';
import styles from './InspectorLayout.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showSnackbarMessage } from 'actions/display';

import InspectorHeader from './InspectorHeader';
import InspectorSideNav from './InspectorSideNav';

function mapStateToProps({ user }) {
  return {
    isAuthenticated: user.isAuthenticated,
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
    isAuthenticated: PropTypes.bool,
    showSnackbarMessage: PropTypes.func,
  };

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.context.router.push('/auth');
      this.props.showSnackbarMessage({
        snackbarMessage: 'You should be authorized to use inspector',
      });
    }
  }

  render() {
    const { children, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <p>You did not authenticated</p>;
    }
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
