import React from 'react';
import { shallow } from 'enzyme';
import { HolidayList } from '../../src/components/HolidayList/index';
import moment from 'moment';
import { statusText } from '../../src/utilities/holidayStatus';

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
]

const mockColumns = ['status', 'employee', 'start', 'end', 'requested'];
const mockActions = ['approve', 'reject'];

describe('HolidayList', () => {
  const wrapper = shallow(
    <HolidayList
      holidays={mockHolidays}
      columns={mockColumns}
      actions={mockActions}
    />
  );

  const rows = wrapper.children().children(); 

  it('renders a table', () => { 
    expect(wrapper.length).toEqual(1);
  });

  
  it('renders a table with 3 rows', () => { 
    expect(rows.length).toBe(3);
  });

  it('table head has 5 children, following table rows have 6', () => {
    expect(rows.at(0).children().length).toEqual(5);
    expect(rows.at(1).children().length).toEqual(6);
    expect(rows.at(2).children().length).toEqual(6);
  });

  it('table head text should match column entries', () => {
    for (let i = 0; i < mockColumns.length; i++) {
      expect(rows.at(0).children().at(i).text()).toEqual(mockColumns[i]);
    }
  });

  it('should contain two actions', () => {
    expect(rows.at(1).children().at(5).children().length).toEqual(2);
    expect(rows.at(2).children().at(5).children().length).toEqual(2);
  });

  it('employee cell should contain employee name', () => {
    expect(rows.at(1).children().at(1).text()).toEqual('Bob Newton');
    expect(rows.at(2).children().at(1).text()).toEqual('Jim Bob');
  });

  it('status cell should contain appropriate status text', () => {
    expect(rows.at(1).children().at(0).text()).toContain(statusText[mockHolidays[0].holidayStatusId]);
    expect(rows.at(2).children().at(0).text()).toContain(statusText[mockHolidays[1].holidayStatusId]);
  });

  it('start cell should contain formatted date', () => {
    expect(rows.at(1).children().at(2).text()).toContain(mockHolidays[0].start.format('Do MMM YYYY'));
    expect(rows.at(2).children().at(2).text()).toContain(mockHolidays[1].start.format('Do MMM YYYY'));
  });

  it('end cell should contain formatted date', () => {
    expect(rows.at(1).children().at(3).text()).toContain(mockHolidays[0].end.format('Do MMM YYYY'));
    expect(rows.at(2).children().at(3).text()).toContain(mockHolidays[1].end.format('Do MMM YYYY'));
  });

  it('requested cell should contain formatted date', () => {
    expect(rows.at(1).children().at(4).text()).toContain(mockHolidays[0].requested.format('Do MMM YYYY'));
    expect(rows.at(2).children().at(4).text()).toContain(mockHolidays[1].requested.format('Do MMM YYYY'));
  });
});
