import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import styles from './style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const RequestHoliday = (props) => {
  return (
    <div className={styles.BackdropStyle}>
      <div className={styles.ModalStyle}>
        <h3>Book Holiday?</h3>
        <br/>
        <h5>From:</h5>
        <div>
          <DatePicker
            selected={props.startDate}
            onChange={props.handleStartChange}
          />
        </div>
        <br/>
        <h5>To:</h5>
        <div>
          <DatePicker
            selected={props.endDate}
            onChange={props.handleEndChange}
          />
        </div>
        <br/>
        <label>
          <input type="checkbox" defaultChecked={props.halfDayChecked} onChange={props.handleChangeChk} />
            Half-Day
        </label>
        <br/>
        <button className="btn btn-danger" onClick={props.confirmHolidayBooking}>
            Confirm
        </button>
        <button className="btn btn-info" onClick={props.onClose}>
            Cancel
        </button>
      </div>
    </div>
  );
};

RequestHoliday.propTypes = {
  onClose: PT.func.isRequired,
  show: PT.bool,
  startDate: PT.string,
  handleStartChange: PT.func,
  endDate: PT.string,
  handleEndChange: PT.func,
  halfDayChecked: PT.bool,
  handleChangeChk: PT.func,
  confirmHolidayBooking: PT.func,
};

export default container(RequestHoliday);
