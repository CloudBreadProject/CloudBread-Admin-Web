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
import { setTitle } from 'lib/context';
import { getStars } from 'modules/github';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loading from 'components/Loading';

function mapStateToProps(state) {
  const { stars, isLoading } = state.github;
  return {
    stars, isLoading,
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

  componentWillMount() {
    if (!this.props.stars.length) {
      this.props.getStars();
    }
  }

  render() {
    const { stars, isLoading } = this.props;
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
        <Loading show={isLoading} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
