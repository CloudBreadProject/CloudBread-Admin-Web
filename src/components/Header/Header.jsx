import React, { Component } from 'react';
import styles from './Header.scss';
import { IconButton } from 'material-ui';
import { Link } from 'react-router';

const mainRoutes = [
  {
    label: 'Introduction',
    link: '/intro',
  }, {
    label: 'Test',
    link: '/test',
  },
];

const subRoutes = [
  {
    label: 'GitHub',
    link: 'https://github.com/Beingbook/react-isomorphic-starter-kit',
    isExternal: true,
  },
];

function NavItem({ label, link, isExternal }) {
  const _label = typeof(label) !== 'string' ? label :
  isExternal ? <a href={link} target="_blank">{label}</a> : <Link to={link}>{label}</Link>;

  return (
    <li>
      {_label}
    </li>
  );
}

function MainNav({ routes }) {
  return (
    <ul className={styles.MainNav}>
      {routes.map((route, idx) => {
        return <NavItem key={idx} {...route} />;
      })}
    </ul>
  );
}

function SubNav({ routes }) {
  return (
    <ul className={styles.SubNav}>
      {routes.map((route, idx) => {
        return <NavItem key={idx} {...route} />;
      })}
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
