import React from 'react';
import { shallow } from 'enzyme';
import { Legend } from '../../src/components';
import holidayStatus, { statusText } from '../../src/utilities/holidayStatus';

describe('Legend', () => {
  it('renders correctly', () => {
    const { PENDING, APPROVED, REJECTED, WFH } = holidayStatus;
    const wrapper = shallow(<Legend />);
    const keyWrap = wrapper.childAt(0);

    // Title
    expect(keyWrap.childAt(0).text()).toEqual('Legend');

    // Legend Key Text
    expect(keyWrap.childAt(1).childAt(1).text()).toEqual(statusText[PENDING]);
    expect(keyWrap.childAt(2).childAt(1).text()).toEqual(statusText[APPROVED]);
    expect(keyWrap.childAt(3).childAt(1).text()).toEqual(statusText[REJECTED]);
    expect(keyWrap.childAt(4).childAt(1).text()).toEqual(statusText[WFH]);
  });
});
