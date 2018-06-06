import React from 'react';
import { shallow } from 'enzyme';
import { Leave } from '../../src/components/Leave';
import leaveContainer from '../../src/components/Leave/Container';

describe('Leave Container', () => {
  it('renders correctly', () => {
    
    const Container = leaveContainer(Leave);
    const container = shallow(<Container takenHolidays={[]} user={ { totalHolidays: 1 } } />);
    
    expect(container.exists());
    expect(container.state('showHolidayListModal')).toEqual(false);
  });

  it('show/close Modal alter the state', () => {
    
    const Container = leaveContainer(Leave);
    const container = shallow(<Container takenHolidays={[]} user={ { totalHolidays: 1 } } />);
    
    container.instance().showModal();
    expect(container.state('showHolidayListModal')).toEqual(true);

    container.instance().closeModal();
    expect(container.state('showHolidayListModal')).toEqual(false);
  });

});
