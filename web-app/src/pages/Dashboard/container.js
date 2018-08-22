import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchEvents, fetchEventsByUserId } from '../../actions/dashboard';
import { getUser, getTakenHolidays, eventBeingUpdated } from '../../reducers';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object,
      fetchEvents: PT.func.isRequired,
      fetchEventsByUserId: PT.func.isRequired,
      takenEvents: PT.array,
      isEventBeingUpdated: PT.bool,
    };

    constructor(props) {
      super(props);
      this.state = {
        filteredEvents: [],
        activeEvents: [],
        activeEmployee: -1,
      };
    }

    componentDidMount() {
      this.props.fetchEvents();
    }

    componentDidUpdate = prevProps => {
      if (prevProps.takenEvents != this.props.takenEvents) {
        this.setState({ filteredEvents: [...this.props.takenEvents] });
      }
    };

    filterCalenderEvents = () => {
      let filteredEvents = [...this.props.takenEvents];
      const { activeEmployee, activeEvents } = this.state;

      filteredEvents = this.filterEmployee(filteredEvents, activeEmployee);
      filteredEvents = this.filterEvents(filteredEvents, activeEvents);

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

    filterEvents = (filteredEvents, activeEvents) => {
      const activeIds = activeEvents.reduce((acc, event) => {
        acc.push(event.id);
        return acc;
      }, []);

      if (activeEvents.length === 0) {
        return filteredEvents;
      } else {
        return filteredEvents.filter(hol =>
          activeIds.includes(hol.eventStatus.eventStatusId)
        );
      }
    };

    setActiveEvents = keys => {
      this.setState({ activeEvents: keys }, this.filterCalenderEvents);
    };

    setActiveEmployee = employeeId => {
      this.setState({ activeEmployee: employeeId }, this.filterCalenderEvents);
    };

    render() {
      return (
        this.props.userDetails && (
          <Wrapped
            employeeId={this.props.userDetails.employeeId}
            takenEvents={this.props.takenEvents}
            events={this.state.filteredEvents}
            updateTakenEvents={this.props.fetchEvents}
            isEventBeingUpdated={this.props.isEventBeingUpdated}
            onUpdateEvents={keys => this.setActiveEvents(keys)}
            onUpdateEmployee={({ employeeId }) =>
              this.setActiveEmployee(parseInt(employeeId))
            }
          />
        )
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
    takenEvents: getTakenHolidays(state),
    isEventBeingUpdated: eventBeingUpdated(state),
  };
};
2;

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    fetchEventsByUserId: employeeId =>
      dispatch(fetchEventsByUserId(employeeId)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DashboardContainer
);
