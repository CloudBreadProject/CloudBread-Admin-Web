import React, { Component } from 'react';
import styles from './ContentPage.scss';

class ContentPage extends Component {
  render() {
    const { content, title } = this.props;

    return (
      <div className={styles.ContentPage} dangerouslySetInnerHTML={{__html: content}} />
    );
  }
}

export default ContentPage;
