import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchEvents, setEventView } from '../../actions/dashboard';
import {
  getUser,
  getEventView,
  getAllEvents,
  eventBeingUpdated,
} from '../../reducers';
import eventsView from '../../utilities/eventsView';
import moment from 'moment';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object,
      setEventView: PT.func.isRequired,
      eventView: PT.number.isRequired,
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
        eventView: eventsView.PERSONAL_EVENTS,
      };
    }

    componentDidMount() {
      this.fetchEvents(eventsView.PERSONAL_EVENTS, true);
    }

    componentDidUpdate = prevProps => {
      if (prevProps.allEvents !== this.props.allEvents) {
        this.setState({ filteredEvents: [...this.props.allEvents] });
      }
    };

    toggleEventsView = () => {
      const { eventView } = this.props;
      let updatedEventView;
      if (eventView === eventsView.PERSONAL_EVENTS) {
        updatedEventView = eventsView.TEAM_EVENTS;
      } else {
        updatedEventView = eventsView.PERSONAL_EVENTS;
      }
      this.props.setEventView(updatedEventView);
      this.fetchEvents(updatedEventView, true);
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

    fetchEvents = (eventView = this.props.eventView, force = false) => {
      const { calendarDate } = this.state;
      this.props.fetchEvents(calendarDate, eventView, force);
    };

    render() {
      const { filteredEvents } = this.state;
      const {
        userDetails,
        userDetails: { employeeId },
        allEvents,
        eventView,
        isEventBeingUpdated,
      } = this.props;

      return (
        userDetails && (
          <Wrapped
            employeeId={employeeId}
            allEvents={allEvents}
            onToggleEventsView={this.toggleEventsView}
            eventView={eventView}
            filteredEvents={filteredEvents}
            updateTakenEvents={() => this.fetchEvents(eventView, true)}
            isEventBeingUpdated={isEventBeingUpdated}
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
    eventView: getEventView(state),
    allEvents: getAllEvents(state),
    isEventBeingUpdated: eventBeingUpdated(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: (date, eventView, force) =>
      dispatch(fetchEvents(date, eventView, force)),
    setEventView: eventView => dispatch(setEventView(eventView)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DashboardContainer
);
