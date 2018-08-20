import React from 'react';
import { shallow } from 'enzyme';
import { Legend } from '../../src/components';

describe('Legend', () => {
  it('snapshot', () => {
    const takenHolidays = [];
    const updateEmployee = jest.fn();
    const updateCalendarEvents = jest.fn();
    const wrapper = shallow(
      <Legend
        updateEmployee={updateEmployee}
        updateCalendarEvents={updateCalendarEvents}
        takenHolidays={takenHolidays}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
