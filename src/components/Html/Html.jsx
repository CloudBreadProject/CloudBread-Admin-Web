import React, { Component, PropTypes } from 'react';
import { getTitle } from 'lib/context';
import serialize from 'serialize-javascript';

const preventFOUC = `
#app {
  visibility: hidden;
}
`;

class Html extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
  };

  render() {
    const { store, assets, children } = this.props;
    return (
      <html>
        <head>
          <title>{getTitle()}</title>
          <style type="text/css">{preventFOUC}</style>
          <link rel="stylesheet" media="all" href={assets.app.css} />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: children}} />
          <script dangerouslySetInnerHTML={{__html: `window.__SYNC_DATA = ${serialize(store.getState())};`}} />
          <script src={assets.app.js} />
        </body>
      </html>
    );
  }
}

export default Html;
