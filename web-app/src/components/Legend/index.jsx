import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { StyleContainer, Column, Key } from './styled';
import container from './container';
import { Form, Input } from '../common';
import { statusText, statusIcons } from '../../utilities/holidayStatus';

const Legend = ({
  employees,
  selectedEmployee,
  formStatus,
  eventsKeyList,
  onToggleKey,
}) => {
  const holidayEvents = eventsKeyList.map(event => {
    if (event.type === 'event') {
      return (
        <Key
          className={event.active ? 'selected' : ''}
          key={event.eventStatusId}
          status={event.key}
          onClick={() => onToggleKey(event.eventStatusId)}
        >
          <span>{statusIcons[event.key]}</span>
          <span>{statusText[event.key]}</span>
        </Key>
      );
    }
  });

  const statusEvents = eventsKeyList.map(event => {
    if (event.type === 'status') {
      return (
        <Key
          className={event.active ? 'selected' : ''}
          key={event.eventStatusId}
          status={event.key}
          onClick={() => onToggleKey(event.eventStatusId)}
        >
          <span>{statusIcons[event.key]}</span>
          <span>{statusText[event.key]}</span>
        </Key>
      );
    }
  });

  return (
    <StyleContainer>
      <Column>
        <Form formData={selectedEmployee} formStatus={formStatus}>
          <Input
            type="select"
            htmlAttrs={{
              name: 'employee',
              options: employees,
            }}
            value={selectedEmployee.employeeId}
            label="FILTER BY EMPLOYEE:"
          />
        </Form>
      </Column>
      <Column>
        <h4>Filter by Holiday Events</h4>
        {holidayEvents}
      </Column>
      <Column>
        <h4>Filter by Status Events</h4>
        {statusEvents}
      </Column>
    </StyleContainer>
  );
};

Legend.propTypes = {
  employees: PT.array.isRequired,
  selectedEmployee: PT.object.isRequired,
  formStatus: PT.func.isRequired,
  eventsKeyList: PT.array.isRequired,
  onToggleKey: PT.func.isRequired,
};

export default container(Legend);
