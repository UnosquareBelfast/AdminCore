import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { StatusDot } from './styled';
import { statusText } from '../../utilities/holidayStatus';

const Status = ({holiday}) =>
  <td>
    <StatusDot status={holiday.holidayStatusId}/>
    {statusText[holiday.holidayStatusId]}
  </td>;

const Employee = ({holiday}) => 
  <td>{`${holiday.employee.forename} ${holiday.employee.surname}`}</td>;

const StartDate = ({holiday}) => 
  <td>{holiday.start.format('Do MMM YYYY')}</td>;

const EndDate = ({holiday}) => 
  <td>{holiday.end.format('Do MMM YYYY')}</td>;

const RequestedDate = ({holiday}) => 
  <td>{holiday.requested.format('Do MMM YYYY')}</td>;


Status.propTypes = { holiday: PT.object };
Employee.propTypes = { holiday: PT.object };
StartDate.propTypes = { holiday: PT.object };
EndDate.propTypes = { holiday: PT.object };
RequestedDate.propTypes = { holiday: PT.object };

const generateValue = (holiday, value) => {
  const { holidayId } = holiday;
  switch (value) {
    case 'status':
      return <Status key={`${holidayId}status`} holiday={holiday} />;
    case 'employee':
      return <Employee key={`${holidayId}employee`} holiday={holiday} />;
    case 'start':
      return <StartDate key={`${holidayId}start`} holiday={holiday} />;
    case 'end':
      return <EndDate key={`${holidayId}end`} holiday={holiday} />;
    case 'requested':
      return <RequestedDate key={`${holidayId}requested`} holiday={holiday} />;
    default:
      break;
  }
};

export default generateValue;