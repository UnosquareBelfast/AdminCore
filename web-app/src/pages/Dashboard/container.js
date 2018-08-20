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
      takenHolidays: PT.array,
      isEventBeingUpdated: PT.bool,
    };

    constructor(props) {
      super(props);
      this.state = {
        filteredHolidays: [],
        eventKeysFilter: {
          status: [],
          type: [],
        },
        selectedEmployeeId: -1,
      };
    }

    componentDidMount() {
      this.props.fetchEvents();
    }

    componentDidUpdate = prevProps => {
      if (prevProps.takenHolidays != this.props.takenHolidays) {
        this.setState({ filteredHolidays: [...this.props.takenHolidays] });
      }
    };

    handleFilterEvents = filterOptions => {
      let filteredHolidays = [...this.props.takenHolidays];
      const completeFilterOptions = {
        employeeId: filterOptions['employeeId']
          ? filterOptions.employeeId
          : this.state.selectedEmployeeId,
      };

      if (filterOptions['filterEvent']) {
        completeFilterOptions['filterEvent'] = {
          eventStatusId: filterOptions.filterEvent.eventStatusId,
          filterType: filterOptions.filterEvent.filterType,
        };
      }

      filteredHolidays = this.filterEmployee(
        filteredHolidays,
        completeFilterOptions.employeeId
      );

      filteredHolidays = this.filterEvents(
        filteredHolidays,
        completeFilterOptions['filterEvent']
          ? completeFilterOptions.filterEvent
          : null
      );

      this.setState({ filteredHolidays });
    };

    // Filter Employees

    filterEmployee = (filteredHolidays, employeeId) => {
      const intEmployeeId = parseInt(employeeId);
      this.setState({ selectedEmployeeId: intEmployeeId });
      if (employeeId == -1) {
        return filteredHolidays;
      }
      return filteredHolidays.filter(hol => {
        if (!hol.employee || hol.employee.employeeId == intEmployeeId) {
          return true;
        }
      });
    };

    // Filter Events

    filterEvents = (filteredHolidays, filterEvent) => {
      const filterKeys = { ...this.state.eventKeysFilter };

      // If there's no changes, we still need to filter. This may not be the
      // first time the user has interacted with the filter.
      if (filterEvent === null) {
        if (filterKeys.status.length === 0 && filterKeys.type.length === 0) {
          return filteredHolidays;
        }

        return filteredHolidays.filter(
          hol =>
            filterKeys.status.includes(hol.eventStatus.eventStatusId) ||
            filterKeys.type.includes(hol.eventType.eventTypeId)
        );
      }

      // Add or remove any selected keys
      const { filterType, eventStatusId } = filterEvent;
      if (filterKeys[filterType].includes(eventStatusId)) {
        filterKeys[filterType] = filterKeys[filterType].filter(
          item => item !== eventStatusId
        );
      } else {
        filterKeys[filterType].push(eventStatusId);
      }

      // Update state and return the holidays with modified filter
      this.setState({ eventKeysFilter: filterKeys });

      // Just return if there's no filtering to be done.
      if (filterKeys.status.length === 0 && filterKeys.type.length === 0) {
        return filteredHolidays;
      }

      return filteredHolidays.filter(
        hol =>
          filterKeys.status.includes(hol.eventStatus.eventStatusId) ||
          filterKeys.type.includes(hol.eventType.eventTypeId)
      );
    };

    render() {
      return (
        this.props.userDetails && (
          <Wrapped
            employeeId={this.props.userDetails.employeeId}
            takenHolidays={this.props.takenHolidays}
            holidays={this.state.filteredHolidays}
            updateTakenHolidays={this.props.fetchEvents}
            isEventBeingUpdated={this.props.isEventBeingUpdated}
            onUpdateEvents={(eventStatusId, filterType) =>
              this.handleFilterEvents({
                filterEvent: { eventStatusId, filterType },
              })
            }
            onUpdateEmployee={({ employeeId }) =>
              this.handleFilterEvents({ employeeId })
            }
          />
        )
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
    takenHolidays: getTakenHolidays(state),
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
