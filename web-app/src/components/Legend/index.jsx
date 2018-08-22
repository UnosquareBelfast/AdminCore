import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { StyleContainer, Column } from './styled';
import container from './container';
import FilterByKey from './filterByKey';
import FilterByUser from './filterByUser';

const Legend = ({
  selectedEmployee,
  employeeList,
  onToggleEvent,
  userChanged,
  legendKeys,
}) => {
  const statusKeys = legendKeys.filter(key => key.type === 'status');
  const typeKeys = legendKeys.filter(key => key.type === 'type');

  return (
    <StyleContainer>
      <Column>
        <h4>Filter by Employee</h4>
        <FilterByUser
          selectedEmployee={selectedEmployee}
          employeeList={employeeList}
          onChange={userChanged}
        />
      </Column>
      <Column>
        <h4>Filter by Holiday Status</h4>
        <FilterByKey keyList={statusKeys} onToggleEvent={onToggleEvent} />
      </Column>
      <Column>
        <h4>Filter by Event Type</h4>
        <FilterByKey keyList={typeKeys} onToggleEvent={onToggleEvent} />
      </Column>
    </StyleContainer>
  );
};

Legend.propTypes = {
  employeeList: PT.array,
  selectedEmployee: PT.object.isRequired,
  legendKeys: PT.array.isRequired,
  onToggleEvent: PT.func.isRequired,
  userChanged: PT.func.isRequired,
};

export default container(Legend);
