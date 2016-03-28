import React from 'react';
import { shallow } from 'enzyme';
import { App } from 'layouts/App';
import Header from 'components/Header';

describe('<App />', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(
      <App />
    );
    expect(wrapper.type()).to.equal('div');
  });

  it('renders children when passed in', () => {
    const children = <div className="unique" />;
    const wrapper = shallow(
      <App>
        {children}
      </App>
    );
    expect(wrapper.contains(children)).to.equal(true);
  });

  it('contains <Header />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Header />)).to.equal(true);
  });
});
