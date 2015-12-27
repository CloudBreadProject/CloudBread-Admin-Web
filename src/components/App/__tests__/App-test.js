jest.dontMock('../App.jsx');

import React from 'react';
import { shallow } from 'enzyme';

const App = require('../App.jsx').default;

describe('App', () => {
  const content = 'test';
  const wrapper = shallow(
    <App>
      <p>{content}</p>
    </App>
  );

  it('renders children when passed in', () => {
    expect(wrapper.find('p').length).toBe(1);
  });

  it('renders content passed', () => {
    expect(wrapper.text()).toBe(content);
  });
});
