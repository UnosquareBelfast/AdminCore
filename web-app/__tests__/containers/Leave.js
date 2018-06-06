import React from 'react';
import { shallow } from 'enzyme';
import { Leave } from '../../src/components/Leave';
import leaveContainer from '../../src/components/Leave/Container';

describe('Leave Container', () => {
  it('renders correctly', () => {
    
    const Container = leaveContainer(Leave);
    const wrapper = shallow(<Container takenHolidays={[]} user={ { totalHolidays: 1 } } />);
    
    expect(wrapper.exists());
    expect(wrapper.state('showHolidayListModal')).toEqual(false);
  });

  it('receives props', () => {
    const Container = leaveContainer(Leave);
    const wrapper = shallow(<Container takenHolidays={[]} user={ { totalHolidays: 1 } } />);
  
    expect(wrapper.prop('takenHolidays')).toEqual([]);
    expect(wrapper.prop('totalHolidays')).toEqual(1);
    expect(wrapper.prop('showHolidayListModal')).toBe(false);
  });

  it('show/close Modal alter the state', () => {
    
    const Container = leaveContainer(Leave);
    const wrapper = shallow(<Container takenHolidays={[]} user={ { totalHolidays: 1 } } />);
    
    const spyOnShow = jest.spyOn(wrapper.instance(), 'showModal');
    const spyOnClose = jest.spyOn(wrapper.instance(), 'closeModal');

    wrapper.instance().showModal();
    expect(wrapper.state('showHolidayListModal')).toEqual(true);
    expect(spyOnShow).toHaveBeenCalled();

    wrapper.instance().closeModal();
    expect(wrapper.state('showHolidayListModal')).toEqual(false);
    expect(spyOnClose).toHaveBeenCalled();
  });

});
