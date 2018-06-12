import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Card, Button, Modal } from '../common';

const Leave = props => {
  const {
    totalHolidays,
    takenHolidays,
    showHolidayListModal,
    showModal,
    closeModal,
  } = props;

  const dates = props.takenHolidays.map(date => (
    <li key={date.id}>
      {date.start.format('YYYY-MM-DD')} <strong> - </strong>{' '}
      {date.end.format('YYYY-MM-DD')}
    </li>
  ));

  return (
    <Card>
      <strong>Leave Card</strong>
      <div>
        <span>Days remaining: {totalHolidays - takenHolidays.length}</span>
      </div>
      <div>
        <span>Days Taken: {takenHolidays.length}</span>
      </div>
      <Button id="showHolidaysBtn" onClick={showModal} label="Show All Holidays" />

      {showHolidayListModal && (
        <Modal>
          <span onClick={closeModal}>Close</span>
          <h3>Holidays</h3>
          <ul>
            {takenHolidays.length > 0 ? (
              dates
            ) : (
              <p>You have no holidays Booked</p>
            )}
          </ul>
        </Modal>
      )}
    </Card>
  );
};

Leave.propTypes = {
  totalHolidays: PT.number,
  takenHolidays: PT.array,
  showHolidayListModal: PT.bool,
  showModal: PT.func,
  closeModal: PT.func,
};

export default container(Leave);
