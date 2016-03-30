import React, { PropTypes } from 'react';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

function Html({ children, store, assets }) {
  const head = Helmet.rewind();
  return (
    <html {...head.htmlAttributes.toComponent()}>
      <head>
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.base.toComponent()}
        <link rel="stylesheet" media="all" href={assets.app.css} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__SYNC_DATA = ${serialize(store.getState())};`,
          }}
        />
        {head.script.toComponent()}
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
