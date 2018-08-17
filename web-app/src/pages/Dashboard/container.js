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

    componentDidUpdate = (prevProps, prevState) => {
      if (prevProps.takenHolidays != this.props.takenHolidays) {
        this.setState({ filteredHolidays: [...this.props.takenHolidays] });
      }
      // if (prevState.selectedEmployeeId !== this.state.selectedEmployeeId) {
      //   this.updateFilterEvents();
      // }
    };

    // updateFilterEvents = () => {
    //   const eventKeys = { ...this.state.eventKeysFilter };
    //   const { status, type } = eventKeys;
    //   let filteredHolidays = [];
    //   if (status.length > 0 || type.length > 0) {
    //     filteredHolidays = this.state.filteredHolidays.filter(
    //       hol =>
    //         status.includes('hol.eventStatus.eventStatusId) ||
    //         type.includes('hol.eventType.eventTypeId),
    //     );
    //   }
    //   this.setState({
    //     filteredHolidays,
    //   });
    // };

    onFilterEvents = filterOptions => {
      let filteredHolidays = [...this.props.takenHolidays];
      const completeFilterOptions = {
        employeeId: filterOptions.employeeId
          ? filterOptions.employeeId
          : this.state.selectedEmployeeId,
        filterEvent: {
          eventStatusId: filterOptions.filterEvent.eventStatusId,
          filterType: filterOptions.filterEvent.filterType,
        },
      };

      filteredHolidays = this.onFilterEmployee(
        filteredHolidays,
        completeFilterOptions.employeeId,
      );

      filteredHolidays = this.onFilterEvents(
        filteredHolidays,
        completeFilterOptions.filterEvent,
      );

      this.setState({ filteredHolidays });
    };

    onFilterEmployee = (filteredHolidays, employeeId) => {
      if (employeeId == -1) {
        return filteredHolidays;
      }
      return filteredHolidays.filter(hol => {
        if (!hol.employee || hol.employee.employeeId == employeeId) {
          return true;
        }
      });
    };

    onFilterEvents = (filteredHolidays, filterEvent) => {
      const filterKeys = { ...this.state.eventKeysFilter };

      //The events probably weren't modified so return filtered holidays from already existing state
      if (filterEvent === null) {
        return filteredHolidays.filter(
          hol =>
            filterKeys.status.includes(hol.eventStatus.eventStatusId) ||
            filterKeys.type.includes(hol.eventType.eventTypeId),
        );
      }

      // Add or remove any selected keys
      const { filterType, eventStatusId } = filterEvent;
      if (filterKeys[filterType].includes(eventStatusId)) {
        filterKeys[filterType] = filterKeys[filterType].filter(
          item => item !== eventStatusId,
        );
      } else {
        filterKeys[filterType].push(eventStatusId);
      }

      // Return the holidays with modified filter
      this.setState({ eventKeysFilter: filterKeys }, () => {
        return filteredHolidays.filter(
          hol =>
            filterKeys.status.includes(hol.eventStatus.eventStatusId) ||
            filterKeys.type.includes(hol.eventType.eventTypeId),
        );
      });
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
              this.onFilterEvents({
                filterEvent: { eventStatusId, filterType },
              })
            }
            onUpdateEmployee={employeeId => this.onFilterEvents({ employeeId })}
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
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  DashboardContainer,
);
