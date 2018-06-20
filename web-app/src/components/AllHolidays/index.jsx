import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { HolidayTable, StatusDot } from './styled';
import { Card } from '../common';
import  { statusText } from '../../utilities/holidayStatus';

export const AllHolidays = ({ holidays }) => {
  return (
    <Card>
      <h3>All Holidays</h3>
      <HolidayTable>
        <tbody>
          <tr>
            <th>Status</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Created</th>
          </tr>
          {holidays.map(holiday => {
            const { forename, surname } = holiday.employee;
            const { holidayId, date, dateCreated, holidayStatusId } = holiday;
            return (
              <tr key={holidayId}>
                <td>
                  <StatusDot status={holidayStatusId} />
                  {statusText[holidayStatusId]}
                </td>
                <td>{`${forename} ${surname}`}</td>
                <td>{`${date[2]}/${date[1]}/${date[0]}`}</td>
                <td>{`${dateCreated[2]}/${dateCreated[1]}/${
                  dateCreated[0]
                }`}</td>
                <td>
                  <button onClick={() => {}}>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </HolidayTable>
    </Card>
  );
};

AllHolidays.propTypes = {
  holidays: PT.array,
};

export default container(AllHolidays);
