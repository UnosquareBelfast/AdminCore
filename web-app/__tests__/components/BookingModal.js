import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { BookingModal } from '../../src/components';

const booking = {
  title: 'Fake Booking',
  holidayStatusDescription: 'Pending',
  start: moment(),
  end: moment(),
  isHalfday: false,
  isWFH: false,
  duration: 1,
};

describe('BookingModal', () => {
  it('renders correctly', () => {
    const mockOnClick = jest.fn();
    const mockChangeStart = jest.fn();
    const mockChangeEnd = jest.fn();
    const mockChangeHalfDay = jest.fn();
    const mockChangeWFH = jest.fn();
    const mockUpdateHoliday = jest.fn();
    const mockCancelHoliday = jest.fn();

    const wrapper = shallow(<BookingModal 
      closeModal={mockOnClick} 
      showModal 
      booking={ booking }
      changeStart={mockChangeStart} 
      changeEnd={mockChangeEnd} 
      changeHalfday={mockChangeHalfDay} 
      requestHoliday={mockOnClick} 
      cancelHoliday={mockCancelHoliday} 
      updateHoliday={mockUpdateHoliday}
      changeWFH={mockChangeWFH} />);

    expect(wrapper.exists());
    expect(wrapper.find('h1').at(0).text()).toEqual('Booking');
    expect(wrapper.find('h3').at(0).text()).toEqual(`Employee: ${booking.title}`);
    expect(wrapper.find('h3').at(1).text()).toEqual(`Status: ${booking.holidayStatusDescription}`);
    expect(wrapper.find('p').at(0).text()).toEqual('Starting:');
    expect(wrapper.find('p').at(1).text()).toEqual('Ending:');
    expect(wrapper.find('DatePicker').at(0).prop('selected')).toEqual(booking.start);
    expect(wrapper.find('DatePicker').at(0).prop('onChange')).toEqual(mockChangeStart);
    expect(wrapper.find('DatePicker').at(1).prop('selected')).toEqual(booking.end);
    expect(wrapper.find('DatePicker').at(1).prop('onChange')).toEqual(mockChangeEnd);

    expect(wrapper.find('label').at(0).text()).toEqual('Half-Day');
    expect(wrapper.find('label').at(0).childAt(0).prop('type')).toEqual('checkbox');
    expect(wrapper.find('label').at(0).childAt(0).prop('checked')).toEqual(booking.isHalfday);
    expect(wrapper.find('label').at(0).childAt(0).prop('onChange')).toEqual(mockChangeHalfDay);
    expect(wrapper.find('label').at(0).childAt(0).prop('disabled')).toBe(false);

    expect(wrapper.find('label').at(1).text()).toEqual('WFH');
    expect(wrapper.find('label').at(1).childAt(0).prop('type')).toEqual('checkbox');
    expect(wrapper.find('label').at(1).childAt(0).prop('checked')).toEqual(booking.isWFH);
    expect(wrapper.find('label').at(1).childAt(0).prop('onChange')).toEqual(mockChangeWFH);

    expect(wrapper.find('p').at(2).text()).toEqual('Total days: 1');

    expect(wrapper.find('#updateHolidayBtn').exists()).toBe(true);
    expect(wrapper.find('#updateHolidayBtn').prop('onClick')).toEqual(mockUpdateHoliday);
    expect(wrapper.find('#updateHolidayBtn').prop('label')).toEqual('Update');

    expect(wrapper.find('#cancelHolidayBtn').exists()).toBe(true);
    expect(wrapper.find('#cancelHolidayBtn').prop('onClick')).toEqual(mockCancelHoliday);
    expect(wrapper.find('#cancelHolidayBtn').prop('label')).toEqual('Cancel Request');

  });

  it('closeModal calls closeModal prop', () => {
    const mockOnClick = jest.fn();

    const wrapper = shallow(<BookingModal 
      closeModal={mockOnClick}
      showModal 
      booking={ {} }
      changeStart={() => {}} 
      changeEnd={() => {}} 
      changeHalfday={() => {}} 
      requestHoliday={() => {}} 
      cancelHoliday={() => {}} 
      updateHoliday={() => {}}
      changeWFH={() => {}}  />);

    wrapper.find('#closeBookingModal').simulate('click');
    expect(mockOnClick.mock.calls.length).toEqual(1);

    expect(wrapper.exists());
  });

  describe('getTotalDays', () => {
    it('getTotalDays returns the correct amount of days leave when duration is 1 and halfDay is false', () => {
      const wrapper = shallow(<BookingModal 
        closeModal={() => {}} 
        showModal 
        booking={ { ...booking, duration: 1 } }
        changeStart={() => {}} 
        changeEnd={() => {}} 
        changeHalfday={() => {}} 
        requestHoliday={() => {}} 
        cancelHoliday={() => {}} 
        updateHoliday={() => {}}
        changeWFH={() => {}} />);
  
      expect(wrapper.exists());
      expect(wrapper.find('p').at(2).text()).toEqual('Total days: 1');   
    });
    it('getTotalDays returns the correct amount of days leave when duration is 2 and halfDay is false', () => {
      const wrapper = shallow(<BookingModal 
        closeModal={() => {}} 
        showModal 
        booking={ { ...booking, duration: 2 } }
        changeStart={() => {}} 
        changeEnd={() => {}} 
        changeHalfday={() => {}} 
        requestHoliday={() => {}} 
        cancelHoliday={() => {}} 
        updateHoliday={() => {}}
        changeWFH={() => {}} />);
  
      expect(wrapper.exists());
      expect(wrapper.find('p').at(2).text()).toEqual('Total days: 2');   
    });
    it('getTotalDays returns the correct amount of days leave when duration is 3 and halfDay is false', () => {
      const wrapper = shallow(<BookingModal 
        closeModal={() => {}} 
        showModal 
        booking={ { ...booking, duration: 3 } }
        changeStart={() => {}} 
        changeEnd={() => {}} 
        changeHalfday={() => {}} 
        requestHoliday={() => {}} 
        cancelHoliday={() => {}} 
        updateHoliday={() => {}}
        changeWFH={() => {}} />);
  
      expect(wrapper.exists());
      expect(wrapper.find('p').at(2).text()).toEqual('Total days: 3');   
    });
    it('getTotalDays returns the correct amount of days leave when duration is 3 and halfDay is true', () => {
      const wrapper = shallow(<BookingModal 
        closeModal={() => {}} 
        showModal 
        booking={ { ...booking, duration: 1, isHalfday: true } }
        changeStart={() => {}} 
        changeEnd={() => {}} 
        changeHalfday={() => {}} 
        requestHoliday={() => {}} 
        cancelHoliday={() => {}} 
        updateHoliday={() => {}}
        changeWFH={() => {}} />);
  
      expect(wrapper.exists());
      expect(wrapper.find('p').at(2).text()).toEqual('Total days: 0.5');   
    });
    it('getTotalDays returns 0 when isWFH is true', () => {
      
      const wrapper = shallow(<BookingModal 
        closeModal={() => {}} 
        showModal 
        booking={ { ...booking, duration: 1, isWFH: true} }
        changeStart={() => {}} 
        changeEnd={() => {}} 
        changeHalfday={() => {}} 
        requestHoliday={() => {}} 
        cancelHoliday={() => {}} 
        updateHoliday={() => {}}
        changeWFH={() => {}} />);

      expect(wrapper.exists());
      expect(wrapper.find('p').at(2).text()).toEqual('Total days: 0');   
    });
  });

  describe('getActions', () => {
    it('returns a Button with the text "Add" when isWHF is true booking.title is undefined', () => {
      const mockRequestHoliday = jest.fn();
      
      const wrapper = shallow(<BookingModal 
        closeModal={() => {}} 
        showModal 
        booking={ { ...booking, title: undefined, isWFH: true} }
        changeStart={() => {}} 
        changeEnd={() => {}} 
        changeHalfday={() => {}} 
        requestHoliday={mockRequestHoliday} 
        cancelHoliday={() => {}} 
        updateHoliday={() => {}}
        changeWFH={() => {}} />);

      expect(wrapper.find('#requestHolidayBtn').exists()).toBe(true);
      expect(wrapper.find('#requestHolidayBtn').prop('onClick')).toEqual(mockRequestHoliday);
      expect(wrapper.find('#requestHolidayBtn').prop('label')).toEqual('Add');
    });
    it('returns a Button with the text "Request" when isWHF is false booking.title is undefined', () => {
      const mockRequestHoliday = jest.fn();
      
      const wrapper = shallow(<BookingModal 
        closeModal={() => {}} 
        showModal 
        booking={ { ...booking, title: undefined, isWFH: false} }
        changeStart={() => {}} 
        changeEnd={() => {}} 
        changeHalfday={() => {}} 
        requestHoliday={mockRequestHoliday} 
        cancelHoliday={() => {}} 
        updateHoliday={() => {}}
        changeWFH={() => {}} />);

      expect(wrapper.find('#requestHolidayBtn').exists()).toBe(true);
      expect(wrapper.find('#requestHolidayBtn').prop('onClick')).toEqual(mockRequestHoliday);
      expect(wrapper.find('#requestHolidayBtn').prop('label')).toEqual('Request');
    });
  });
});
