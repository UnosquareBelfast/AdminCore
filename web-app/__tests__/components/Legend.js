import React from 'react';
import { shallow } from 'enzyme';
import { Legend } from '../../src/components';

describe('Legend', () => {
  it('snapshot', () => {
    const wrapper = shallow(<Legend />);
    expect(wrapper).toMatchSnapshot();
  });
});
