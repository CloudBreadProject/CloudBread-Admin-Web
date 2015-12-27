jest.dontMock('../App.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';

const App = require('../App.jsx').default;

describe('App', () => {
  it('renders children when passed in' () => {
      const wrapper = shallow(
        <App>
          <p>test</p>
        </App>
      );
      expect(wrapper.contains(<p>test</p>)).to.be.true;
  });

  it('should be rendered', () => {
    const app = TestUtils.renderIntoDocument(
      <App>
        <p>test</p>
      </App>
    );

    const appNode = ReactDOM.findDOMNode(app);

    expect(appNode.textContent).toEqual('test');
  });
});
