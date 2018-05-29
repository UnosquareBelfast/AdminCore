import React from 'react';
import moment from 'moment';
import { PropTypes as PT } from 'prop-types';
import { Container, Content } from './styled';

const BookingModal = ({closeModal, show, booking}) => (
  show &&
  <Container>
    <Content>
      <span onClick={closeModal}>Close</span>
      <h1>Booking</h1>
      {booking.title && <h3>Employee: {booking.title}</h3>}
      <p>Starting: {moment(booking.start).format('dddd Do MMMM YYYY')}</p>
      <p>Ending: {moment(booking.end).format('dddd Do MMMM YYYY')}</p>
      <p>Total days: {moment.duration(moment(booking.end).diff(moment(booking.start))).asDays() + 1}</p>
    </Content>
  </Container>
);

BookingModal.propTypes = {
  closeModal: PT.func,
  show: PT.bool,
};

export default BookingModal;
