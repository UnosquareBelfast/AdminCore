import React from 'react';
import { shallow } from 'enzyme';
import { Legend } from '../../src/components';
import holidayStatus from '../../src/utilities/holidayStatus';

describe('Legend', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Legend />);

    expect(wrapper.exists());
    expect(wrapper.children().length).toEqual(1);
    expect(wrapper.childAt(0).childAt(0).text()).toEqual('Legend');
    expect(wrapper.children().childAt(1).prop('status')).toEqual(holidayStatus.PENDING);
    expect(wrapper.children().childAt(2).prop('status')).toEqual(holidayStatus.APPROVED);
    expect(wrapper.children().childAt(3).prop('status')).toEqual(holidayStatus.REJECTED);
    expect(wrapper.children().childAt(1).children().text()).toEqual('Pending');
    expect(wrapper.children().childAt(2).children().text()).toEqual('Approved');
    expect(wrapper.children().childAt(3).children().text()).toEqual('Rejected');
  });
});
