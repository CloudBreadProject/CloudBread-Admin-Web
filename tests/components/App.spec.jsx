import React from 'react';
import { shallow } from 'enzyme';
import { AppLayout } from 'components/AppLayout';

describe('<App />', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(
      <AppLayout />
    );
    expect(wrapper.type()).to.equal('div');
  });

  it('renders children when passed in', () => {
    const children = <div className="unique" />;
    const wrapper = shallow(
      <AppLayout>
        {children}
      </AppLayout>
    );
    expect(wrapper.contains(children)).to.equal(true);
  });
});
