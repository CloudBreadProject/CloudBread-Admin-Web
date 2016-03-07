import React from 'react';
import { shallow } from 'enzyme';
import { Loading } from 'components/Loading';
import styles from 'components/Loading/Loading.scss';

describe('<Loading />', () => {
  it('renders as a <div>', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.type()).to.equal('div');
  });

  it('is only visible when show is true', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.hasClass(styles.Activated)).to.equal(false);
    wrapper.setProps({ show: true });
    expect(wrapper.hasClass(styles.Activated)).to.equal(true);
  });
});
