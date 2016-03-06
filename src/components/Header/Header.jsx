import React from 'react';
import styles from './Header.scss';
import { Link } from 'react-router';

function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.Container}>
        <div className={styles.LeftSide}>
          <h1><Link to="/">React</Link></h1>
        </div>
        <div className={styles.Middle}>
          <ul className={styles.Nav}>
            <li><Link to="/page/intro">Introduction</Link></li>
            <li><Link to="/page/test">Test Page</Link></li>
          </ul>
        </div>
        <div className={styles.RightSide}>
          <ul className={styles.Nav}>
            <li><a target="_blank" href="https://github.com/Beingbook/react-universal-starter-kit">GitHub</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
