import React, { Fragment } from 'react';
import { StatusDot } from './styled';
import { statusText } from '../../utilities/holidayStatus';

const status = {
  id: 'status',
  Header: 'Status',
  sortable: false,
  filterable: false,
  accessor: holiday => (
    <Fragment>
      <StatusDot status={holiday.holidayStatusId} />
      {statusText[holiday.holidayStatusId]}
    </Fragment>
  ),
};

const employee = {
  id: 'employee',
  Header: 'Employee',
  accessor: ({ employee }) => `${employee.forename} ${employee.surname}`,
  sortMethod: (a, b) => {
    if (a === b) {
      return 0;
    }
    const aReverse = a
      .split('')
      .reverse()
      .join('');
    const bReverse = b
      .split('')
      .reverse()
      .join('');
    return aReverse > bReverse ? 1 : -1;
  },
};

const startDate = {
  id: 'startDate',
  Header: 'Start Date',
  accessor: holiday => holiday.start.format('D MMM YYYY'),
};

const endDate = {
  id: 'endDate',
  Header: 'End Date',
  accessor: holiday => holiday.end.format('D MMM YYYY'),
};

const requestedDate = {
  id: 'requestedDate',
  Header: 'Requested Date',
  accessor: holiday => holiday.requested.format('D MMM YYYY'),
};

export default {
  status,
  startDate,
  endDate,
  requestedDate,
  employee,
};
