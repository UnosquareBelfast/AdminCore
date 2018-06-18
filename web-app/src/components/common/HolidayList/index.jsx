import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { HolidayTable, StatusDot } from './styled';
import { statusText } from '../../../utilities/holidayStatus';

const buildTableHeaders = (columns) => {
  return columns.reduce((acc, column) => {
    return acc.concat(<th key={column}>{column}</th>);
  }, []);
};

const buildTableValues = (columns, holiday) => {
  const { forename, surname } = holiday.employee;
  const { holidayId, start, end, requested, holidayStatusId } = holiday;

  const values = {
    status: <td key={`${holidayId}status`}><StatusDot status={holidayStatusId} />{statusText[holidayStatusId]}</td>,
    employee: <td key={`${holidayId}employee`}>{`${forename} ${surname}`}</td>,
    start: <td key={`${holidayId}start}`}>{start.format('Do MMM YYYY')}</td>,
    end: <td key={`${holidayId}end}`}>{end.format('Do MMM YYYY')}</td>,
    requested: <td key={`${holidayId}requested`}>{requested.format('Do MMM YYYY')}</td>,
  };

  return columns.reduce((acc, column) => {
    return acc.concat(values[column]);
  }, []);
};

const buildTableActions = (props, holiday) => {
  const {actions, approveHoliday, rejectHoliday } = props;
  const { holidayId } = holiday;

  const values = {
    approve: <button key={`${holidayId}approve`} onClick={() => approveHoliday(holiday)}>Approve</button>,
    reject: <button key={`${holidayId}reject`} onClick={() => rejectHoliday(holiday)}>Reject</button>,
  };

  return actions.reduce((acc, action) => {
    return acc.concat(values[action]);
  }, []);
};


export const HolidayList = (props) => {
  const {holidays, columns} = props;
  return (
    !holidays || holidays.length === 0
      ? <p>There are no holidays to show</p>
      : <HolidayTable>
        <tbody>
          <tr>
            {buildTableHeaders(columns)}
          </tr>
          {holidays.map(holiday => {
            const { holidayId } = holiday;
            return (
              <tr key={holidayId}>
                {buildTableValues(columns, holiday)}
                <td>
                  {buildTableActions(props, holiday)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </HolidayTable>
  );
};

HolidayList.propTypes = {
  holidays: PT.array,
  columns: PT.array.isRequired,
  actions: PT.array.isRequired,
  approveHoliday: PT.func,
  rejectHoliday: PT.func,
};

export default container(HolidayList);
