import React from 'react';
import { shallow } from 'enzyme';
import App from 'layouts/App';

describe('App layout', () => {
  const wrapper = shallow(
    <App />
  );

  it('renders as a <div>', () => {
    expect(wrapper.type()).to.eql('div');
  });
});
