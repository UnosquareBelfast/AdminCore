import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import holidayStatus, { statusText } from '../../utilities/holidayStatus';
import { monthToMonth, dateFormat } from '../../utilities/calendarConfig';
import { EmployeeStyleContainer, EventTable, StatusDot } from './styled';
import { HolidayList } from '../';

class TeamView extends Component {
  getEventsByEmployee = () => {
    const events = _
      .sortBy(this.props.events, e => e.start.toDate())
      .filter(
        x =>
          x.holidayStatusId !== holidayStatus.REJECTED &&
          moment(x.start).isSame(moment(this.props.date), 'month'),
      );

    const eventsByEmployee = events.reduce((acc, event) => {
      const employee = acc[event.employee.employeeId]
        ? acc[event.employee.employeeId]
        : {
          ...event.employee,
          events: [],
        };
      employee.events.push(event);
      acc[event.employee.employeeId] = employee;
      return acc;
    }, {});

    return eventsByEmployee;
  };

  renderEventsByEmployee = () => {
    const employees = this.getEventsByEmployee();
    return Object.keys(employees).map(id => {
      const e = employees[id];
      
      return (
        <EmployeeStyleContainer key={id}>
          <h3>{`${e.forename} ${e.surname}`}</h3>
          <HolidayList 
            holidays={e.events}
            columns={['status', 'startDate', 'endDate']}
          />
        </EmployeeStyleContainer>
      );
    });
  };

  render() {
    return <div>{this.renderEventsByEmployee()}</div>;
  }
}

TeamView.title = dateFormat;
TeamView.navigate = monthToMonth;

TeamView.propTypes = {
  events: PT.array,
  date: PT.object,
};

export default TeamView;
