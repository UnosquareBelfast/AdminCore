import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { RangeDayPicker } from '../';
import { RequestHolidayContainer, FormLayout } from './styled';

const selectionText = (from, to, datesMatch) => {
  if (from && to) {
    const fromLocale = from.toLocaleDateString();
    const toLocale = to.toLocaleDateString();

    return datesMatch
      ? `You've selected ${fromLocale}.`
      : `You've selected from ${fromLocale} to ${toLocale}.`;
  }

  if (from) {
    return 'Select a second date. Select the same date to request a single day.';
  }

  return 'Select a date, or a range of dates.';
};

export const RequestHoliday = props => {
  const { from, to } = props.selectedDateRange;
  const buttonDisabled = !(from && to);

  return (
    <RequestHolidayContainer>
      <h2>Request a Holiday</h2>

      <p>{selectionText(from, to, props.datesMatch)}</p>

      <div>
        <RangeDayPicker datesChanged={dates => props.datesChanged(dates)} />
      </div>
      <FormLayout>
        <label>
          <input
            type="checkbox"
            checked={props.halfDayChecked}
            onChange={props.halfDayChanged}
            disabled={!props.datesMatch}
          />
          Half-Day
        </label>
        <button disabled={buttonDisabled} onClick={props.requestHoliday}>
          Request Holiday
        </button>
      </FormLayout>
    </RequestHolidayContainer>
  );
};

RequestHoliday.propTypes = {
  datesChanged: PT.func,
  halfDayChanged: PT.func,
  requestHoliday: PT.func,
  selectedDateRange: PT.object,
  datesMatch: PT.bool,
  halfDayChecked: PT.bool,
};

export default container(RequestHoliday);
