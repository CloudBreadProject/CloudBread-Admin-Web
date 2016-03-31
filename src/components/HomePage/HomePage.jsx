import React, { Component, PropTypes } from 'react';
import styles from './HomePage.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStars } from 'actions/github';
import { showLoading, hideLoading } from 'actions/display';

import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
} from 'material-ui';
import Helmet from 'react-helmet';

function mapStateToProps(state) {
  const { stars, error } = state.github;
  return {
    stars,
    error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getStars,
    showLoading, hideLoading,
  }, dispatch);
}

export class HomePage extends Component {
  static needs = [
    getStars,
  ];

  static propTypes = {
    stars: PropTypes.array,
    getStars: PropTypes.func,
    error: PropTypes.object,
    showLoading: PropTypes.func,
    hideLoading: PropTypes.func,
  };

  static defaultProps = {
    stars: [],
  };

  async componentDidMount() {
    if (!this.props.stars.length) {
      this.props.showLoading();
      await this.props.getStars();
      this.props.hideLoading();
    }
  }

  render() {
    const { stars, error } = this.props;

    if (error) {
      return (
        <div className={styles.HomePage}>
          <Helmet title="This page has error" />
          <p>Failed to load github stars, checkout network status or github api changes.</p>
        </div>
      );
    }

    return (
      <div className={styles.HomePage}>
        <Helmet title="HomePage" />
        <h1>People liked this package:</h1>
        {
          stars.map((star, idx) => (
            <a href={star.html_url} target="_blank" className={styles.Card} key={idx}>
              <Card>
                <CardHeader
                  title={star.login}
                  subtitle="Liked this package"
                  avatar={<Avatar>{star.login[0]}</Avatar>}
                />
                <CardMedia>
                  <img src={star.avatar_url} />
                </CardMedia>
              </Card>
            </a>
          ))
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
