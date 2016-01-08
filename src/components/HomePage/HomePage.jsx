import React, { Component, PropTypes } from 'react';
import styles from './HomePage.scss';
import {
  Avatar,
  Card,
  CardHeader,
  CardText,
  CardMedia,
  Paper
} from 'material-ui';
import { setTitle } from '../../lib/context';
import { getStars } from '../../redux/modules/github';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    stars: state.github.stars,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getStars,
  }, dispatch);
}

class HomePage extends Component {
  static needs = [
    getStars,
  ];

  render() {
    const { stars } = this.props;
    setTitle('HomePage');
    return (
      <div className={styles.HomePage}>
        <h1>People liked this package</h1>
        {
          stars.map((star, idx) => {
            return (
              <a href={star.html_url} target="_blank" className={styles.Card} key={idx}>
                <Card>
                  <CardHeader
                    title={star.login}
                    subtitle="Liked this package"
                    avatar={<Avatar>{star.login[0]}</Avatar>} />
                  <CardMedia>
                    <img src={star.avatar_url} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
