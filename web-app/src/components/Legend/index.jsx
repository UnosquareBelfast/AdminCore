import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { StyleContainer } from './styled';
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
        <h4>Employee</h4>
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
      <h3>Calendar Filters</h3>
      {filterUser}
      <h4>Holiday Status</h4>
      <FilterByKey
        category={eventCategory.HOLIDAY_STATUS}
        keyList={legendKeyStatuses}
        onToggleEvent={onToggleStatus}
      />
      <h4>Event Type</h4>
      <FilterByKey
        category={eventCategory.EVENT_TYPE}
        keyList={legendKeyTypes}
        onToggleEvent={onToggleType}
      />
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
