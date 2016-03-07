import React from 'react';
import { shallow } from 'enzyme';
import { HomePage } from 'containers/HomePage';

describe('<HomePage />', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.type()).to.equal('div');
  });

  it('renders stared user profile', () => {
    const testUserProfile = {
      html_url: 'test',
      login: 'test',
      avatar_url: 'test',
    };
    const stars = [];
    for (let i = 0; i < 10; i++) {
      stars.push(testUserProfile);
    }
    const wrapper = shallow(<HomePage stars={stars} />);
    expect(wrapper.find({
      href: testUserProfile.html_url,
    })).to.have.length(stars.length);
    expect(wrapper.find({
      src: testUserProfile.avatar_url,
    })).to.have.length(stars.length);
  });

  it('renders error message', () => {
    const wrapper = shallow(<HomePage error={{ error: 'error' }} />);
    expect(wrapper.children().type()).to.equal('p');
  });
});
