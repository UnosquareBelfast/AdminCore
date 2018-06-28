import React from 'react';
import DatePicker from 'react-datepicker';
import { PropTypes as PT } from 'prop-types';
import { Button, Modal } from '../common';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { StyleContainer, BookingStatus, BookingInputs, StatusDot, ButtonWrap } from './styled';
import { statusText } from '../../utilities/holidayStatus';

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
      <ButtonWrap>
        <Button id="updateHolidayBtn" onClick={updateHoliday} label={'Update'} />
        <Button id="cancelHolidayBtn" onClick={cancelHoliday} label={'Cancel Booking'} />
      </ButtonWrap>
      :
      <Button id="requestHolidayBtn" onClick={requestHoliday} label={booking.isWFH ? 'Add' : 'Request'} />
  );

  const getTotalDays = () => {
    if (booking.isWFH) { return '0'; }
    return booking.duration / (booking.isHalfday ? 2 : 1);
  };


  return (showModal &&
    <Modal>
      <StyleContainer>
        <span id="closeBookingModal" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes}/> Close
        </span>
        <h1>Booking</h1>
        {booking.title && <BookingStatus>
          <h4>{booking.title}</h4>
          <span>
            <StatusDot status={booking.holidayStatusId}/>
            {statusText[booking.holidayStatusId]}
          </span>
        </BookingStatus>}
        <BookingInputs>
          <div>
            <label>Starting:</label>
            <DatePicker selected={booking.start} onChange={changeStart} />
          </div>
          <div>
            <label>Ending:</label>
            <DatePicker selected={booking.end} onChange={changeEnd} />
          </div>
        </BookingInputs>
        <form>
          <label>
            <input
              type="checkbox"
              checked={booking.isHalfday}
              onChange={changeHalfday}
              disabled={booking.duration > 1 || booking.isWFH}/>
              Half-Day
          </label>
          <label>
            <input
              type="checkbox"
              disabled={booking.isHalfday}
              checked={booking.isWFH && !booking.isHalfDay}
              onChange={changeWFH} />
              WFH
          </label>
        </form>
        <p id="totalDaysToBook">Total days: {getTotalDays()}</p>
        {getActions()}
      </StyleContainer>
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
