import React, { Component } from 'react';
import styles from './Header.scss';
import { Link } from 'react-router';

const mainRoutes = [
  {
    label: 'Introduction',
    link: '/page/intro',
  }, {
    label: 'Test',
    link: '/page/test',
  },
];

const subRoutes = [
  {
    label: 'GitHub',
    link: 'https://github.com/Beingbook/react-isomorphic-starter-kit',
    isExternal: true,
  },
];

function NavItem({ label, link, isExternal }) { // eslint-disable-line
  let _label;

  if (typeof(label) !== 'string') {
    _label = label;
  } else {
    if (isExternal) {
      _label = <a href={link} target="_blank">{label}</a>;
    } else {
      _label = <Link to={link}>{label}</Link>;
    }
  }

  return (
    <li>
      {_label}
    </li>
  );
}

function MainNav({ routes }) { // eslint-disable-line
  return (
    <ul className={styles.MainNav}>
      {routes.map((route, idx) => <NavItem key={idx} {...route} />)}
    </ul>
  );
}

function SubNav({ routes }) { // eslint-disable-line
  return (
    <ul className={styles.SubNav}>
      {routes.map((route, idx) => <NavItem key={idx} {...route} />)}
    </ul>
  );
}

class Header extends Component {
  render() {
    return (
      <div className={styles.Header}>
        <div className={styles.Container}>
          <div className={styles.LeftSide}>
            <h1><Link to="/">React</Link></h1>
          </div>
          <div className={styles.Middle}>
            <MainNav routes={mainRoutes} />
          </div>
          <div className={styles.RightSide}>
            <SubNav routes={subRoutes} />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
