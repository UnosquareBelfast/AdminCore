import React from 'react';
import { shallow } from 'enzyme';
import { AllHolidays } from '../../src/components/AllHolidays';
import holidayStatus from '../../src/utilities/holidayStatus';

const dummyHolidays = [{
  employee: { 
    forename: 'Joe',
    surname: 'Bloggs',
  },
  holidayId: 123,
  date: [1, 1, 2018],
  dateCreated: new Date(),
  holidayStatusId: holidayStatus.PENDING,
}];

describe('AllHolidays', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<AllHolidays holidays={ dummyHolidays }/>);
    expect(wrapper.exists()).toBe(true);
  });
  it('renders table headings', () => {
    const wrapper = shallow(<AllHolidays holidays={ dummyHolidays }/>);

    const tableHeadings = wrapper.find('tr').at(0);
    expect(tableHeadings.children().length).toEqual(4);
    expect(tableHeadings.childAt(0).text()).toEqual('Status');
    expect(tableHeadings.childAt(1).text()).toEqual('Employee');
    expect(tableHeadings.childAt(2).text()).toEqual('Date');
    expect(tableHeadings.childAt(3).text()).toEqual('Created');
  });
  it('renders table content, containing holidays', () => {
    const wrapper = shallow(<AllHolidays holidays={ dummyHolidays }/>);

    const firstTableRow = wrapper.find('tr').at(1);
    
    expect(firstTableRow.children().length).toEqual(5);
    expect(firstTableRow.key()).toEqual('123');
    expect(firstTableRow.childAt(0).childAt(0).prop('status')).toEqual(1);
    expect(firstTableRow.childAt(0).children().at(1).text()).toEqual('Pending');

    expect(firstTableRow.childAt(1).text()).toEqual(`${dummyHolidays[0].employee.forename} ${dummyHolidays[0].employee.surname}`);
    expect(firstTableRow.childAt(2).text()).toEqual(`${dummyHolidays[0].date[2]}/${dummyHolidays[0].date[1]}/${dummyHolidays[0].date[0]}`);
    expect(firstTableRow.childAt(3).text()).toEqual(`${dummyHolidays[0].dateCreated[2]}/${dummyHolidays[0].dateCreated[1]}/${dummyHolidays[0].dateCreated[0]}`);
    expect(firstTableRow.childAt(4).text()).toEqual('Edit');
  });
});
