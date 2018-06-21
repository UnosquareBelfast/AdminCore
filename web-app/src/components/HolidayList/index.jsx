import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { HolidayTable } from './styled';
import generateAction from './ActionButton';
import generateValue from './TableValues';
import { theme } from '../../styled';

const buildTableHeaders = (columns) => {
  return columns.reduce((acc, column) => {
    return acc.concat(<th key={column}>{column}</th>);
  }, []);
};

const buildTableValues = (columns, holiday) => {
  return columns.reduce((acc, column) => {
    return acc.concat(generateValue(holiday, column));
  }, []);
};

const buildTableActions = (props, holiday) => {
  const {actions, approveHoliday, rejectHoliday } = props;

  const values = {
    approve: generateAction(holiday, approveHoliday, 'Approve'),
    reject: generateAction(holiday, rejectHoliday, 'Reject', theme.colours.red, theme.colours.darkRed),
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
