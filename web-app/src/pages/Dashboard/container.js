import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUser } from '../../reducers';
import * as actions from '../../actions/index';
import { getDurationBetweenDates } from '../../utilities/dates';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object,
      onFetchEvents: PT.func.isRequired,
      onFilterEventsByEmployeeId: PT.func.isRequired,
      takenHolidays: PT.array,
      loading: PT.bool,
    };

    constructor(props) {
      super(props);
      this.state = {
        booking: {},
        requestModalOpen: false,
        showModal: false,
        takenHolidaysFiltered: null,
        filterEvents: [],
      };
    }

    componentDidMount() {
      this.props.onFetchEvents();
    }

    getTakenHolidaysById = id => {
      if (id === -1) {
        this.props.onFetchEvents();
      } else {
        this.props.onFilterEventsByEmployeeId(id);
      }
    };

    closeModal = () => {
      this.setState({ showModal: false });
    };

    updateBookingAndDuration = booking => {
      const { isHalfday, eventType, start, end } = booking;
      booking.duration = getDurationBetweenDates(start, end);
      if (isHalfday) {
        if (booking.duration != 0) {
          booking.duration = 0.5;
        }
      } else if (eventType.eventTypeId !== 1) {
        booking.duration = 0;
      } else {
        booking.duration = getDurationBetweenDates(start, end);
      }

      this.setState({
        booking: booking,
        showModal: true,
      });
    };

    onFilterEmployee = ({ employeeId }) => {
      this.getTakenHolidaysById(parseInt(employeeId));
    };

    onFilterEvents = eventStatusId => {
      let updatedFilterEvents = [...this.state.filterEvents];
      if (eventStatusId !== undefined) {
        if (updatedFilterEvents.includes(eventStatusId)) {
          updatedFilterEvents = updatedFilterEvents.filter(
            item => item !== eventStatusId,
          );
        } else {
          updatedFilterEvents.push(eventStatusId);
        }
      }

      let takenHolidaysUpdated = null;
      if (updatedFilterEvents.length > 0) {
        takenHolidaysUpdated = this.props.takenHolidays.filter(hol =>
          updatedFilterEvents.includes(hol.eventStatus.eventStatusId),
        );
      }

      this.setState({
        filterEvents: updatedFilterEvents,
        takenHolidaysFiltered: takenHolidaysUpdated,
      });
    };

    render() {
      return (
        this.props.userDetails && (
          <Wrapped
            booking={this.state.booking}
            closeModal={this.closeModal}
            updateBookingAndDuration={this.updateBookingAndDuration}
            showModal={this.state.showModal}
            loading={this.props.loading}
            takenHolidays={
              this.state.takenHolidaysFiltered === null
                ? this.props.takenHolidays
                : this.state.takenHolidaysFiltered
            }
            updateTakenHolidays={this.props.onFetchEvents}
            employeeId={this.props.userDetails.employeeId}
            onUpdateEvents={this.onFilterEvents}
            onUpdateEmployee={this.onFilterEmployee}
          />
        )
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
    loading: state.DASHBOARD.loading,
    takenHolidays: state.DASHBOARD.takenHolidays,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchEvents: () => dispatch(actions.fetchEvents()),
    onFilterEventsByEmployeeId: employeeId =>
      dispatch(actions.filterEventsByEmployeeId(employeeId)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  DashboardContainer,
);
