import React, { Component, PropTypes } from 'react';
import fetch from '../../lib/fetch';
import styles from './HomePage.scss';
import {
  Avatar,
  Card,
  CardHeader,
  CardText,
  CardMedia,
  Paper
} from 'material-ui';
import Loading from '../Loading';

export default class HomePage extends Component {
  static loadProps(params, cb) {
    (async () => {
      try {
        const response = await fetch('https://api.github.com/repos/Beingbook/react-isomorphic-starter-kit/stargazers');
        const githubUsers = await response.json();
        setTimeout(() => {
          cb(null, {
            githubUsers,
          });
        }, 1000);
      } catch (error) {
        cb(null, {error});
      }
    })();
  }

  render() {
    const { githubUsers } = this.props;

    return (
    <div className={styles.HomePage}>
      <p>This is fetched from https://api.github.com/repos/Beingbook/react-isomorphic-starter-kit/stargazers, not static.</p>
      {
        githubUsers.map((user, idx) => {
          const profile = <Avatar>{user.login[0]}</Avatar>;
          return (
            <a key={idx} className={styles.Card} href={user.html_url} target="_blank">
              <Card>
                <CardHeader
                  title={user.login}
                  subtitle="Stargazers"
                  avatar={profile} />
                <CardMedia>
                  <img src={user.avatar_url} />
                </CardMedia>
              </Card>
            </a>
          );
        })
      }
    </div>
    );
  }
}
