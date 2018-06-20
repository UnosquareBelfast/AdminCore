import React from 'react';
import { shallow } from 'enzyme';
import { AllHolidays } from '../../src/components';
import allHolidaysContainer from '../../src/components/AllHolidays/container';

jest.mock('../../src/services/holidayService');
import * as holidayService from '../../src/services/holidayService';

describe('AllHolidays', () => {
  it('renders correctly', () => {
    const Container = allHolidaysContainer(AllHolidays);
    const wrapper = shallow(<Container />);

    expect(wrapper.exists());
  });

  xit('state is set to holidays object returned from getAllHolidays', async () => {
    const Container = allHolidaysContainer(AllHolidays);
    const wrapper = shallow(<Container />);

    const spy = jest.spyOn(holidayService, 'getAllHolidays');

    expect(wrapper.state('holidays')).toEqual([ { holidayId: 1 }, { holidayId: 2} ]);
    expect(spy).toHaveBeenCalled();
  });
});