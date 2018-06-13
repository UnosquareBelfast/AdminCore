import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { HolidayTable } from './styled';
import { Card } from '../common';

export const PendingHolidays = ({
  pendingHolidays,
  approveHoliday,
  rejectHoliday,
}) => {
  return (
    <Card>
      <h3>Manage Pending Holidays</h3>
      <HolidayTable>
        <tbody>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Created</th>
          </tr>
          {pendingHolidays.map(holiday => {
            const { forename, surname } = holiday.employee;
            const { holidayId, date, dateCreated } = holiday;
            return (
              <tr key={holidayId}>
                <td>{`${forename} ${surname}`}</td>
                <td>{`${date[2]}/${date[1]}/${date[0]}`}</td>
                <td>{`${dateCreated[2]}/${dateCreated[1]}/${
                  dateCreated[0]
                }`}</td>
                <td>
                  <button onClick={() => approveHoliday(holiday)}>
                    Approve Holiday
                  </button>
                  <button onClick={() => rejectHoliday(holiday)}>
                    Reject Holiday
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </HolidayTable>
    </Card>
  );
};

PendingHolidays.propTypes = {
  pendingHolidays: PT.array,
  approveHoliday: PT.func,
  rejectHoliday: PT.func,
};

export default container(PendingHolidays);
