import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchEvents } from '../../actions/dashboard';
import { getUser, getTakenHolidays, eventBeingUpdated } from '../../reducers';
import moment from 'moment';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object,
      fetchEvents: PT.func.isRequired,
      allEvents: PT.array,
      isEventBeingUpdated: PT.bool,
    };

    constructor(props) {
      super(props);
      this.state = {
        calendarDate: new moment().startOf('month').format('YYYY-MM-DD'),
        filteredEvents: [],
        activeEventIds: [],
        activeEmployee: -1,
      };
    }

    componentDidMount() {
      this.fetchEvents();
    }

    componentDidUpdate = prevProps => {
      if (prevProps.allEvents !== this.props.allEvents) {
        this.setState({ filteredEvents: [...this.props.allEvents] });
      }
    };

    filterCalenderEvents = () => {
      let filteredEvents = [...this.props.allEvents];
      const { activeEmployee, activeEventIds } = this.state;

      filteredEvents = this.filterEmployee(filteredEvents, activeEmployee);
      filteredEvents = this.filterEvents(filteredEvents, activeEventIds);

      this.setState({ filteredEvents });
    };

    // Filter Employees

    filterEmployee = (filteredEvents, activeEmployee) => {
      if (activeEmployee === -1) {
        return filteredEvents;
      } else {
        return filteredEvents.filter(hol => {
          if (!hol.employee || hol.employee.employeeId == activeEmployee) {
            return true;
          }
        });
      }
    };

    // Filter Events

    filterEvents = (filteredEvents, activeEventIds) => {
      if (activeEventIds.length === 0) {
        return filteredEvents;
      } else {
        return filteredEvents.filter(hol =>
          activeEventIds.includes(hol.eventStatus.eventStatusId)
        );
      }
    };

    setActiveEvents = activeEventIds => {
      this.setState({ activeEventIds }, this.filterCalenderEvents);
    };

    setActiveEmployee = employeeId => {
      this.setState({ activeEmployee: employeeId }, this.filterCalenderEvents);
    };

    handleCalendarNavigate = date => {
      const newDate = new moment(date);
      this.setState(
        {
          calendarDate: newDate.startOf('month').format('YYYY-MM-DD'),
        },
        this.fetchEvents
      );
    };

    fetchEvents = () => {
      const { calendarDate } = this.state;
      this.props.fetchEvents(calendarDate);
    };

    render() {
      return (
        this.props.userDetails && (
          <Wrapped
            employeeId={this.props.userDetails.employeeId}
            allEvents={this.props.allEvents}
            filteredEvents={this.state.filteredEvents}
            updateTakenEvents={this.fetchEvents}
            isEventBeingUpdated={this.props.isEventBeingUpdated}
            onUpdateEvents={activeEventIds =>
              this.setActiveEvents(activeEventIds)
            }
            onUpdateEmployee={employeeId =>
              this.setActiveEmployee(parseInt(employeeId))
            }
            onCalendarNavigate={this.handleCalendarNavigate}
          />
        )
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
    allEvents: getTakenHolidays(state),
    isEventBeingUpdated: eventBeingUpdated(state),
  };
};
2;

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: date => dispatch(fetchEvents(date)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DashboardContainer
);
