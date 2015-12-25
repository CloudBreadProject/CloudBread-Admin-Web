import React, { Component, PropTypes } from 'react';
import { getTitle, getTail } from '../../lib/context';
import assets from './assets.json';

class Html extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
  };

  render() {
    return (
      <html>
        <head>
          <title>{getTitle()}</title>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.children}} />
          <div dangerouslySetInnerHTML={{__html: getTail()}} />
          <script src={assets.app.js} />
        </body>
      </html>
    );
  }
}

export default Html;
