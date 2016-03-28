import React, { PropTypes } from 'react';
import styles from './App.scss';

import { connect } from 'react-redux';

import Header from 'components/Header';
import Helmet from 'react-helmet';
import Loading from 'components/Loading';

function mapStateToProps({ display }) {
  return {
    isLoading: display.isLoading,
  };
}

export function App({ children, isLoading }) {
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
      />
      <Header />
      {children}
      <Loading show={isLoading} />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps)(App);
