import React, { PropTypes } from 'react';
import { getTitle } from 'lib/context';
import serialize from 'serialize-javascript';

function Html({ children, store, assets }) {
  return (
    <html>
      <head>
        <title>{getTitle()}</title>
        <link rel="stylesheet" media="all" href={assets.app.css} />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__SYNC_DATA = ${serialize(store.getState())};`,
          }}
        />
        <script src={assets.app.js} />
      </body>
    </html>
  );
}

Html.propTypes = {
  children: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  assets: PropTypes.object.isRequired,
};

export default Html;
