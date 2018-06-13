import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import holidayStatus from '../../utilities/holidayStatus';
import { EmployeeStyleContainer, EventTable, StatusDot } from './styled';

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

  statusToText = status => {
    switch (status) {
      case 1:
        return 'Pending';
      case 2:
        return 'Approved';
      case 3:
        return 'Rejected';
      case 4:
        return 'WFH';
      default:
        return '';
    }
  };

  renderEventsByEmployee = () => {
    const employees = this.getEventsByEmployee();
    return Object.keys(employees).map(id => {
      const e = employees[id];
      return (
        <EmployeeStyleContainer key={id}>
          <h3>{`${e.forename} ${e.surname}`}</h3>
          <EventTable>
            <tbody>
              <tr>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
              {e.events.map(event => (
                <tr key={event.id}>
                  <td>
                    <StatusDot status={event.holidayStatusId} />
                    {this.statusToText(event.holidayStatusId)}
                  </td>
                  <td>{moment(event.start).format('DD/MM/YYYY')}</td>
                  <td>{moment(event.end).format('DD/MM/YYYY')}</td>
                </tr>
              ))}
            </tbody>
          </EventTable>
        </EmployeeStyleContainer>
      );
    });
  };

  render() {
    return <div>{this.renderEventsByEmployee()}</div>;
  }
}

TeamView.title = date => moment(date).format('MMMM YYYY');

TeamView.navigate = (date, action) => {
  switch (action) {
    case 'PREV':
      return moment(date)
        .subtract(1, 'month')
        .toDate();

    case 'NEXT':
      return moment(date)
        .add(1, 'month')
        .toDate();

    default:
      return date;
  }
};

TeamView.propTypes = {
  events: PT.array,
  date: PT.object,
};

export default TeamView;
