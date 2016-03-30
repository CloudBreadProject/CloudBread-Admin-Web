import React, { PropTypes } from 'react';
import styles from './App.scss';

import { connect } from 'react-redux';

import Header from 'components/Header';
import Helmet from 'react-helmet';
import Loading from 'components/Loading';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

function mapStateToProps({ display }) {
  return {
    isLoading: display.isLoading,
  };
}

export function App({ children, isLoading }) {
  const muiTheme = getMuiTheme({
    userAgent: navigator.userAgent,
  });

  return (
    <div className={styles.App}>
      <Helmet
        link={[
          {
            rel: 'stylesheet',
            media: 'all',
            href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
          }, {
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico',
          },
        ]}
        meta={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1', // eslint-disable-line max-len
          },
        ]}
      />
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header />
          {children}
          <Loading show={isLoading} />
        </div>
      </MuiThemeProvider>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps)(App);
