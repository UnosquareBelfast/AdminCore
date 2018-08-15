import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { BookingModal } from '../../src/components';

const booking = {
  title: 'Fake Booking',
  holidayStatusDescription: 'Pending',
  start: moment('2018-01-01 09:00:00'),
  end: moment('2018-01-01 09:00:00'),
  isHalfday: false,
  isWFH: false,
  duration: 1,
};

xdescribe('BookingModal', () => {
  it('renders correctly', () => {
    const mockOnClick = jest.fn();
    const mockChangeStart = jest.fn();
    const mockChangeEnd = jest.fn();
    const mockChangeHalfDay = jest.fn();
    const mockChangeWFH = jest.fn();
    const mockUpdateHoliday = jest.fn();
    const mockCancelHoliday = jest.fn();

    const wrapper = shallow(
      <BookingModal
        closeModal={mockOnClick}
        showModal
        booking={booking}
        changeStart={mockChangeStart}
        changeEnd={mockChangeEnd}
        changeHalfday={mockChangeHalfDay}
        requestHoliday={mockOnClick}
        cancelHoliday={mockCancelHoliday}
        updateHoliday={mockUpdateHoliday}
        changeWFH={mockChangeWFH}
      />,
    );

    expect(wrapper.exists());
    expect(wrapper).toMatchSnapshot();
  });

  it('closeModal calls closeModal prop', () => {
    const mockOnClick = jest.fn();

    const wrapper = shallow(
      <BookingModal
        closeModal={mockOnClick}
        showModal
        booking={{}}
        changeStart={() => {}}
        changeEnd={() => {}}
        changeHalfday={() => {}}
        requestHoliday={() => {}}
        cancelHoliday={() => {}}
        updateHoliday={() => {}}
        changeWFH={() => {}}
      />,
    );

    expect(mockOnClick.mock.calls.length).toEqual(0);
    wrapper.find('#closeBookingModal').simulate('click');
    expect(mockOnClick.mock.calls.length).toEqual(1);

    expect(wrapper.exists());
  });

  describe('getTotalDays', () => {
    it('getTotalDays returns the correct amount of days leave when duration is 1 and halfDay is false', () => {
      const wrapper = shallow(
        <BookingModal
          closeModal={() => {}}
          showModal
          booking={{ ...booking, duration: 1 }}
          changeStart={() => {}}
          changeEnd={() => {}}
          changeHalfday={() => {}}
          requestHoliday={() => {}}
          cancelHoliday={() => {}}
          updateHoliday={() => {}}
          changeWFH={() => {}}
        />,
      );

      expect(wrapper.exists());
      expect(wrapper.find('#totalDaysToBook').text()).toEqual('Total days: 1');
    });
    it('getTotalDays returns the correct amount of days leave when duration is 2 and halfDay is false', () => {
      const wrapper = shallow(
        <BookingModal
          closeModal={() => {}}
          showModal
          booking={{ ...booking, duration: 2 }}
          changeStart={() => {}}
          changeEnd={() => {}}
          changeHalfday={() => {}}
          requestHoliday={() => {}}
          cancelHoliday={() => {}}
          updateHoliday={() => {}}
          changeWFH={() => {}}
        />,
      );

      expect(wrapper.exists());
      expect(wrapper.find('#totalDaysToBook').text()).toEqual('Total days: 2');
    });
    it('getTotalDays returns the correct amount of days leave when duration is 3 and halfDay is false', () => {
      const wrapper = shallow(
        <BookingModal
          closeModal={() => {}}
          showModal
          booking={{ ...booking, duration: 3 }}
          changeStart={() => {}}
          changeEnd={() => {}}
          changeHalfday={() => {}}
          requestHoliday={() => {}}
          cancelHoliday={() => {}}
          updateHoliday={() => {}}
          changeWFH={() => {}}
        />,
      );

      expect(wrapper.exists());
      expect(wrapper.find('#totalDaysToBook').text()).toEqual('Total days: 3');
    });
    it('getTotalDays returns the correct amount of days leave when duration is 3 and halfDay is true', () => {
      const wrapper = shallow(
        <BookingModal
          closeModal={() => {}}
          showModal
          booking={{ ...booking, duration: 1, isHalfday: true }}
          changeStart={() => {}}
          changeEnd={() => {}}
          changeHalfday={() => {}}
          requestHoliday={() => {}}
          cancelHoliday={() => {}}
          updateHoliday={() => {}}
          changeWFH={() => {}}
        />,
      );

      expect(wrapper.exists());
      expect(wrapper.find('#totalDaysToBook').text()).toEqual(
        'Total days: 0.5',
      );
    });
    it('getTotalDays returns 0 when isWFH is true', () => {
      const wrapper = shallow(
        <BookingModal
          closeModal={() => {}}
          showModal
          booking={{ ...booking, duration: 1, isWFH: true }}
          changeStart={() => {}}
          changeEnd={() => {}}
          changeHalfday={() => {}}
          requestHoliday={() => {}}
          cancelHoliday={() => {}}
          updateHoliday={() => {}}
          changeWFH={() => {}}
        />,
      );

      expect(wrapper.exists());
      expect(wrapper.find('#totalDaysToBook').text()).toEqual('Total days: 0');
    });
  });

  describe('getActions', () => {
    it('returns a Button with the text "Add" when isWHF is true booking.title is undefined', () => {
      const mockRequestHoliday = jest.fn();

      const wrapper = shallow(
        <BookingModal
          closeModal={() => {}}
          showModal
          booking={{ ...booking, title: undefined, isWFH: true }}
          changeStart={() => {}}
          changeEnd={() => {}}
          changeHalfday={() => {}}
          requestHoliday={mockRequestHoliday}
          cancelHoliday={() => {}}
          updateHoliday={() => {}}
          changeWFH={() => {}}
        />,
      );

      expect(wrapper.find('#requestHolidayBtn').exists()).toBe(true);
      expect(wrapper.find('#requestHolidayBtn').prop('onClick')).toEqual(
        mockRequestHoliday,
      );
      expect(wrapper.find('#requestHolidayBtn').prop('label')).toEqual('Add');
    });
    it('returns a Button with the text "Request" when isWHF is false booking.title is undefined', () => {
      const mockRequestHoliday = jest.fn();

      const wrapper = shallow(
        <BookingModal
          closeModal={() => {}}
          showModal
          booking={{ ...booking, title: undefined, isWFH: false }}
          changeStart={() => {}}
          changeEnd={() => {}}
          changeHalfday={() => {}}
          requestHoliday={mockRequestHoliday}
          cancelHoliday={() => {}}
          updateHoliday={() => {}}
          changeWFH={() => {}}
        />,
      );

      expect(wrapper.find('#requestHolidayBtn').exists()).toBe(true);
      expect(wrapper.find('#requestHolidayBtn').prop('onClick')).toEqual(
        mockRequestHoliday,
      );
      expect(wrapper.find('#requestHolidayBtn').prop('label')).toEqual(
        'Request',
      );
    });
  });
});
