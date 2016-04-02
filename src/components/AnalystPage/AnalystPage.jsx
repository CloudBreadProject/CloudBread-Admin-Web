import React, { Component } from 'react';
import fetch from 'core/fetch';

import RaisedButton from 'material-ui/lib/raised-button';

class AnalystPage extends Component {
  constructor() {
    super();
    this.handleClickRequest = this.handleClickRequest.bind(this);
  }

  render() {
    const { responseContent } = this.state || {};
    return (
      <div>
        BI Tool Bone layouts
        <RaisedButton label="HTTP Request" onClick={this.handleClickRequest} primary />
        <pre>{responseContent}</pre>
        <p>뭐를 설명해? fwefewfwwfefweff fwefewiofwefnewoi </p>
        <p>wefewfewfwewfewfewfwefew</p>
      </div>
    );
  }

  async handleClickRequest() {
    const res = await fetch.get('http://dw-apiapp-dev-01.azurewebsites.net/odata/Members(\'aaa\')');
    this.setState({
      responseContent: JSON.stringify(res.body),
    });
  }
}

export default AnalystPage;
