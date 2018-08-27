import React from 'react';
import { shallow } from 'enzyme';
import { Legend } from '../../src/components';

describe('Legend', () => {
  it('snapshot', () => {
    const takenEvents = [];
    const updateEmployee = jest.fn();
    const updateCalendarEvents = jest.fn();
    const wrapper = shallow(
      <Legend
        updateEmployee={updateEmployee}
        updateCalendarEvents={updateCalendarEvents}
        takenEvents={takenEvents}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
