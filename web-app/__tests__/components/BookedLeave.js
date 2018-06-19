import React from 'react';
import { shallow } from 'enzyme';
import { BookedLeave } from '../../src/components/BookedLeave';

describe('Booked Leave', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<BookedLeave bookedHolidays={[]} user={{id: 0}}/>); 
    expect(wrapper).toMatchSnapshot();
  });
});
