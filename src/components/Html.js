import React, { Component } from 'react';
import assets from './assets.json';

class Html extends Component {
  render() {
    return (
      <html>
        <head>
          <title>test!</title>
        </head>
        <body>
          <div id="app">
            tes
          </div>
          <script src={assets.app.js} />
        </body>
      </html>
    );
  }
}

export default Html;
