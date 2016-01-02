import React, { Component, PropTypes } from 'react';
import styles from './Loading.scss';
import cx from 'classnames';

class Loading extends Component {
  static propTypes = {
    show: PropTypes.bool,
  };

  static defaultProps = {
    show: false,
  };

  render() {
    const { show } = this.props;

    const wrapperStyles = cx(styles.LoadingWrapper, {
      [styles.Activated]: show,
    });

    return (
      <div className={wrapperStyles}>
        <div className={styles.Loading} />
      </div>
    );
  }
}

export default Loading;
