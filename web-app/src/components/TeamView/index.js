import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import holidayStatus from '../../utilities/holidayStatus';

class TeamView extends Component {
  getEventsByEmployee = () => {
    const events =
      _.sortBy(this.props.events, (e) => e.start.toDate())
        .filter(x =>
          x.holidayStatusId !== holidayStatus.REJECTED
          && moment(x.start).isSame(moment(this.props.date), 'month')
        );

    const eventsByEmployee = events.reduce((acc, event) => {
      const employee = acc[event.employee.employeeId] ? acc[event.employee.employeeId] : {
        ...event.employee,
        events: [],
      };
      employee.events.push(event);
      acc[event.employee.employeeId] = employee;
      return acc;
    }, {});

    return eventsByEmployee;
  }

  renderEventsByEmployee = () => {
    const employees = this.getEventsByEmployee();
    return Object.keys(employees).map(id => {
      const e = employees[id];
      return (
        <div key={id}>
          <h3>{`${e.forename} ${e.surname}`}</h3>
          <div>
            {e.events.map(event =>
              <div key={event.id}>
                {`${moment(event.start).format('Do MMMM')} - ${event.holidayStatusDescription}`}
              </div>
            )}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderEventsByEmployee()}
      </div>
    );
  }
}

TeamView.title = (date) =>
  moment(date).format('MMMM YYYY');

TeamView.navigate = (date, action) => {
  switch (action) {
    case 'PREV':
      return moment(date).subtract(1, 'month').toDate();

    case 'NEXT':
      return moment(date).add(1, 'month').toDate();

    default:
      return date;
  }
};

TeamView.propTypes = {
  events: PT.array,
  date: PT.object,
};

export default TeamView;
