import React, { PropTypes } from 'react';
import styles from './App.scss';
import Header from 'components/Header';

function App({ children }) {
  return (
    <div className={styles.App}>
      <Header />
      {children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object,
};

export default App;
