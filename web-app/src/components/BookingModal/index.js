import React from 'react';
import DatePicker from 'react-datepicker';
import { PropTypes as PT } from 'prop-types';
import { Container, Content } from './styled';

const BookingModal = (props) => {
  const {
    closeModal,
    showModal,
    booking,
    changeStart,
    changeEnd,
    changeHalfday,
  } = props;

  return (showModal &&
    <Container>
      <Content>
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
      </Content>
    </Container>
  );
};

BookingModal.propTypes = {
  showModal: PT.bool,
  booking: PT.object,
  closeModal: PT.func,
  changeStart: PT.func,
  changeEnd: PT.func,
  changeHalfday: PT.func,
};

export default BookingModal;
