import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from 'components/HomePage';

describe('<HomePage />', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.type()).to.equal('div');
  });
});
