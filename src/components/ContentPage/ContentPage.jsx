import React, { Component } from 'react';
import fetch from '../../lib/fetch';
import styles from './ContentPage.scss';

class ContentPage extends Component {
  static async loadProps(params, cb) {
    try {
      const data = await (await fetch(`v1/content/${params.pageId}`)).json();
      cb(null, data);
    } catch (err) {
      console.log(err);
      cb(null, err);
    }
  }

  renderError() {
    const { error } = this.props;

    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  render() {
    const { content, title, error } = this.props;

    if (this.error) {
      return this.renderError();
    }

    return (
      <div className={styles.ContentPage} dangerouslySetInnerHTML={{__html: content}} />
    );
  }
}

export default ContentPage;
