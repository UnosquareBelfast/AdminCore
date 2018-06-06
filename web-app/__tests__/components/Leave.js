import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { Leave } from '../../src/components/Leave';

const dummyHolidays = [
  {
    id: 1,
    title: 'Annual Leave',
    allDay: true,
    start: new moment('2018-06-05', 'YYYY-MM-DD'),
    end: new moment('2018-06-05', 'YYYY-MM-DD'),
  }, 
  {
    id: 2,
    title: 'Annual Leave',
    allDay: true,
    start: new moment('2018-06-05', 'YYYY-MM-DD'),
    end: new moment('2018-06-05', 'YYYY-MM-DD'),
  },
];

describe('Leave', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Leave
      totalHolidays={10}
      takenHolidays={dummyHolidays}
      showHolidayListModal={false}
      showModal={() => {}}
      closeModal={() => {}}/>);

    expect(wrapper.exists());
  });
  it('renders information from props', () => {
    const wrapper = shallow(<Leave
      totalHolidays={10}
      takenHolidays={dummyHolidays}
      showHolidayListModal={false}
      showModal={() => {}}
      closeModal={() => {}}/>);

    expect(wrapper.children().length).toEqual(4);
    expect(wrapper.childAt(0).text()).toEqual('Leave Card');
    expect(wrapper.childAt(1).text()).toEqual('Days remaining: 8');
    expect(wrapper.childAt(2).text()).toEqual('Days Taken: 2');
    expect(wrapper.find('#showHolidaysBtn').prop('label')).toEqual('Show All Holidays');

    // wrapper.find('#showHolidaysBtn').simulate('click');
  });

  it('renders information from props, if showHolidayListModal is true', () => {
    const wrapper = shallow(<Leave
      totalHolidays={10}
      takenHolidays={dummyHolidays}
      showHolidayListModal={true}
      showModal={() => {}}
      closeModal={() => {}}/>);

    expect(wrapper.children().length).toEqual(5);
    expect(wrapper.childAt(4).children().length).toEqual(3);
    expect(wrapper.childAt(4).childAt(0).text()).toEqual('Close');
    expect(wrapper.childAt(4).childAt(1).text()).toEqual('Holidays');
    expect(wrapper.childAt(4).childAt(2).children().length).toEqual(2);

    expect(wrapper.childAt(4).childAt(2).childAt(0).text()).toEqual('2018-06-05  -  2018-06-05');
    expect(wrapper.childAt(4).childAt(2).childAt(1).text()).toEqual('2018-06-05  -  2018-06-05');
  });
  it('renders information from props, if showHolidayListModal is true and no holidays Booked are supplied as props', () => {
    const wrapper = shallow(<Leave
      totalHolidays={10}
      takenHolidays={[]}
      showHolidayListModal={true}
      showModal={() => {}}
      closeModal={() => {}}/>);

    expect(wrapper.children().length).toEqual(5);
    expect(wrapper.childAt(4).children().length).toEqual(3);
    expect(wrapper.childAt(4).childAt(0).text()).toEqual('Close');
    expect(wrapper.childAt(4).childAt(1).text()).toEqual('Holidays');
    expect(wrapper.childAt(4).childAt(2).children().length).toEqual(1);

    expect(wrapper.childAt(4).childAt(2).childAt(0).text()).toEqual('You have no holidays Booked');
  });
});
