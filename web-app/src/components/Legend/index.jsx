import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { StyleContainer, Column } from './styled';
import container from './container';
import FilterByKey from './filterByKey';
import FilterByUser from './filterByUser';
import eventCategory from '../../utilities/eventCategory';
import eventsView from '../../utilities/eventsView';

const Legend = ({
  selectedEmployee,
  employeeList,
  onToggleStatus,
  onToggleType,
  userChanged,
  legendKeyStatuses,
  legendKeyTypes,
  eventView,
}) => {
  let filterUser = null;
  if (eventView === eventsView.TEAM_EVENTS) {
    filterUser = (
      <div>
        <h4>Filter by Employee</h4>
        <FilterByUser
          selectedEmployee={selectedEmployee}
          employeeList={employeeList}
          onChange={userChanged}
        />
      </div>
    );
  }

  return (
    <StyleContainer>
      <Column>{filterUser}</Column>
      <Column>
        <h4>Filter by Holiday Status</h4>
        <FilterByKey
          category={eventCategory.HOLIDAY_STATUS}
          keyList={legendKeyStatuses}
          onToggleEvent={onToggleStatus}
        />
      </Column>
      <Column>
        <h4>Filter by Event Type</h4>
        <FilterByKey
          category={eventCategory.EVENT_TYPE}
          keyList={legendKeyTypes}
          onToggleEvent={onToggleType}
        />
      </Column>
    </StyleContainer>
  );
};

Legend.propTypes = {
  employeeList: PT.array,
  selectedEmployee: PT.object.isRequired,
  legendKeyStatuses: PT.array.isRequired,
  legendKeyTypes: PT.array.isRequired,
  onToggleStatus: PT.func.isRequired,
  onToggleType: PT.func.isRequired,
  userChanged: PT.func.isRequired,
  eventView: PT.number.isRequired,
};

export default container(Legend);
