import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { StyleContainer, Column } from './styled';
import container from './container';
import FilterByKey from './filterByKey';
import FilterByUser from './filterByUser';

const Legend = ({
  selectedEmployee,
  formStatus,
  employeeList,
  statusList,
  onToggleEvent,
  typesList,
}) => {
  return (
    <StyleContainer>
      <Column>
        <FilterByUser
          selectedEmployee={selectedEmployee}
          formStatus={formStatus}
          employeeList={employeeList}
        />
      </Column>
      <Column>
        <h4>Filter by Holiday Status</h4>
        <FilterByKey
          eventList={statusList}
          onToggleEvent={onToggleEvent}
          listType="status"
        />
      </Column>
      <Column>
        <h4>Filter by Event Type</h4>
        <FilterByKey
          eventList={typesList}
          onToggleEvent={onToggleEvent}
          listType="type"
        />
      </Column>
    </StyleContainer>
  );
};

Legend.propTypes = {
  employeeList: PT.array,
  selectedEmployee: PT.object.isRequired,
  formStatus: PT.func.isRequired,
  statusList: PT.array.isRequired,
  typesList: PT.array.isRequired,
  onToggleEvent: PT.func.isRequired,
};

export default container(Legend);
