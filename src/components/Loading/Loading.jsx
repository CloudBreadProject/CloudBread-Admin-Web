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

  componentDidMount() {
    this.didMount = true;
  }

  render() {
    const { show } = this.props;
    const { didMount } = this;

    const wrapperStyles = cx({
      [styles.LoadingWrapper]: true,
      [styles.Activated]: show,
      [styles.Mounted]: didMount,
    });

    return (
      <div className={wrapperStyles}>
        <div className={styles.Loading} />
      </div>
    );
  }
}

export default Loading;
