import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import { PropTypes as PT } from 'prop-types';
import { Button, Modal } from '../common';

const BookingModal = props => {
  const {
    closeModal,
    showModal,
    booking,
    changeStart,
    changeEnd,
    changeHalfday,
    requestHoliday,
    cancelHoliday,
    updateHoliday,
    changeWFH,
  } = props;

  const getActions = () => (
    booking.title ?
      <Fragment>
        <Button id="updateHolidayBtn" onClick={updateHoliday} label={'Update'} style={{marginBottom: 5}}/>
        <Button id="cancelHolidayBtn" onClick={cancelHoliday} label={'Cancel Request'}/>
      </Fragment>
      :
      <Button id="requestHolidayBtn" onClick={requestHoliday} label={booking.isWFH ? 'Add' : 'Request'}/>
  );

  const getTotalDays = () => {
    if (booking.isWFH) { return '0'; }
    return booking.duration / (booking.isHalfday ? 2 : 1);
  };

  return (showModal &&
    <Modal>
      <span id="closeBookingModal" onClick={closeModal}>Close</span>
      <h1>Booking</h1>
      {booking.title && <h3>Employee: {booking.title}</h3>}
      {booking.title && <h3>Status: {booking.holidayStatusDescription}</h3>}
      <p>Starting:</p>
      <DatePicker selected={booking.start} onChange={changeStart} />
      <p>Ending:</p>
      <DatePicker selected={booking.end} onChange={changeEnd} />
      <label>
        <input
          type="checkbox"
          checked={booking.isHalfday}
          onChange={changeHalfday}
          disabled={booking.duration > 1}/>
          Half-Day
      </label>
      <label>
        <input
          type="checkbox"
          checked={booking.isWFH}
          onChange={changeWFH} />
          WFH
      </label>
      <p>Total days: {getTotalDays()}</p>
      {getActions()}
    </Modal>
  );
};

BookingModal.propTypes = {
  showModal: PT.bool,
  booking: PT.object,
  closeModal: PT.func,
  changeStart: PT.func,
  changeEnd: PT.func,
  changeHalfday: PT.func,
  requestHoliday: PT.func,
  takenHolidays: PT.array,
  cancelHoliday: PT.func,
  changeWFH: PT.func,
};

export default BookingModal;
