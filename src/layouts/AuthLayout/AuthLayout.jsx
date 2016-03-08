import React, { PropTypes } from 'react';
import styles from './AuthLayout.scss';
import Paper from 'material-ui/lib/paper';

export default function AuthLayout({ children }) {
  return (
    <div className={styles.AuthLayout}>
      <Paper className={styles.Center}>
        {children}
      </Paper>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node,
};
