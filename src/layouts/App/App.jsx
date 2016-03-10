import React, { Component, PropTypes } from 'react';
import styles from './App.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { hideSnackbarMessage } from 'reducers/display';

import Snackbar from 'material-ui/lib/snackbar';

function mapStateToProps({ display }) {
  return {
    ...display,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    hideSnackbarMessage,
  }, dispatch);
}

class App extends Component {
  static propTypes = {
    snackbarOpen: PropTypes.bool,
    snackbarMessage: PropTypes.string,
    snackbarDuration: PropTypes.number,
    snackbarAction: PropTypes.string,
    snackbarActionHandler: PropTypes.func,
    hideSnackbarMessage: PropTypes.func,
    children: PropTypes.node,
  };

  constructor() {
    super();
    this.handleRequestSnackbarClose = this.handleRequestSnackbarClose.bind(this);
  }

  componentDidMount() {
  }

  render() {
    const {
      children,
      snackbarOpen,
      snackbarMessage,
      snackbarDuration,
      snackbarAction,
      snackbarActionHandler,
    } = this.props;
    return (
      <div className={styles.App}>
        {children}
        <Snackbar
          open={snackbarOpen}
          message={snackbarMessage}
          autoHideDuration={snackbarDuration}
          action={snackbarAction}
          onActionTouchTap={snackbarActionHandler}
          onRequestClose={this.handleRequestSnackbarClose}
        />
      </div>
    );
  }

  handleRequestSnackbarClose() {
    this.props.hideSnackbarMessage();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
