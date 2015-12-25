import React, { Component } from 'react';
import fetch from '../../lib/fetch';

class ContentPage extends Component {
  static loadProps(params, cb) {
    (async () => {
      try {
        const data = await (await fetch(`v1/content/${params.pageId}`)).json();
        cb(null, data);
      } catch (err) {
        console.log(err);
        cb(null, err);
      }
    })();
  }

  render() {
    const { content, title, error } = this.props;

    if (error) {
      return (
        <div>
          <p>{error}</p>
        </div>
      );
    }

    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: content}} />
      </div>
    );
  }
}

export default ContentPage;
