import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showSnackbarMessage } from 'reducers/display';

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
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectorLayout);
