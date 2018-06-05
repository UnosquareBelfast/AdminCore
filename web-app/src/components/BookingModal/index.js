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
  } = props;

  const getActions = () => (
    booking.title ?
      <Fragment>
        <Button onClick={updateHoliday} label={'Update'}/>
        <Button onClick={cancelHoliday} label={'Cancel'}/>
      </Fragment>
      :
      <Button onClick={requestHoliday} label={'Request'}/>
  );

  return (showModal &&
    <Modal>
      <span onClick={closeModal}>Close</span>
      <h1>Booking</h1>
      {booking.title && <h3>Employee: {booking.title}</h3>}
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
      <p>Total days: {booking.duration / (booking.isHalfday ? 2 : 1)}</p>
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
};

export default BookingModal;
