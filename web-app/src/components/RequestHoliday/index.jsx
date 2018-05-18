import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/fp/isNil';
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
}

export default container(RequestHoliday);

RequestHoliday.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool
};
