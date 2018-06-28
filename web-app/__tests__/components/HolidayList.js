import React from 'react';
import { shallow } from 'enzyme';
import { HolidayList } from '../../src/components/HolidayList/index';
import moment from 'moment';

const mockHolidays = [
  {
    holidayId: 0,
    employee: {forename: 'Bob', surname: 'Newton'},
    start: new moment([2018, 1, 2]),
    end: new moment([2018, 3, 4]),
    requested: new moment([2018, 5, 24]),
    holidayStatusId: 1,
  },
  {
    holidayId: 1,
    employee: {forename: 'Jim', surname: 'Bob'},
    start: new moment([2018, 12, 12]),
    end: new moment([2018, 11, 11]),
    requested: new moment([2018, 5, 24]),
    holidayStatusId: 2,
  },
];

const mockColumns = ['status', 'employee', 'startDate', 'endDate', 'requestedDate'];
const mockActions = {'approve': jest.fn(), 'reject': jest.fn()};

describe('HolidayList', () => {
  let wrapper = shallow(
    <HolidayList
      holidays={mockHolidays}
      columns={mockColumns}
      actions={mockActions}
    />
  );

  it('Should match snapshot with actions and columns supplied', () => {
    expect(wrapper).toMatchSnapshot();
  });

  wrapper = shallow(
    <HolidayList
      holidays={mockHolidays}
      columns={mockColumns}
    />
  );

  it('Should match snapshot with no actions supplied', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
