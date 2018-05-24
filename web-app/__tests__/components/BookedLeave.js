import React from 'react';
import { shallow } from 'enzyme';
import { BookedLeave } from '../../src/components/BookedLeave';

describe('Booked Leave', () => {
  it('renders correctly', () => {
    expect(shallow(<BookedLeave bookedHolidays={[]} user={{id: 0}}/>).exists());
  });
});
