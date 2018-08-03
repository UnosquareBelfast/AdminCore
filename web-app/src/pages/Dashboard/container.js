import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions/index';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object,
      onFetchEvents: PT.func.isRequired,
      onFilterEventsByEmployeeId: PT.func.isRequired,
      takenHolidays: PT.array,
      loading: PT.bool,
      isEventBeingUpdated: PT.bool,
    };

    constructor(props) {
      super(props);
      this.state = {
        takenHolidaysFiltered: [],
        eventKeysFilter: [],
        selectedEmployeeId: -1,
      };
    }

    componentDidMount() {
      this.props.onFetchEvents();
    }

    componentWillUpdate = (nextProps, nextState) => {
      if (nextState.selectedEmployeeId !== this.state.selectedEmployeeId) {
        this.updateFilterEvents();
      }
    };

    getTakenHolidaysById = id => {
      if (id === -1) {
        this.props.onFetchEvents();
      } else {
        this.props.onFilterEventsByEmployeeId(id);
      }
    };

    onFilterEmployee = ({ employeeId }) => {
      this.setState({ selectedEmployeeId: employeeId });
      this.getTakenHolidaysById(parseInt(employeeId));
    };

    updateFilterEvents = () => {
      let eventKeys = [...this.state.eventKeysFilter];
      let takenHolidaysUpdated = [];
      if (eventKeys.length > 0) {
        takenHolidaysUpdated = this.props.takenHolidays.filter(hol =>
          eventKeys.includes(hol.eventStatus.eventStatusId),
        );
      }

      this.setState({
        takenHolidaysFiltered: takenHolidaysUpdated,
      });
    };

    onFilterEvents = eventStatusId => {
      let eventKeys = [...this.state.eventKeysFilter];
      if (eventStatusId !== undefined) {
        if (eventKeys.includes(eventStatusId)) {
          eventKeys = eventKeys.filter(item => item !== eventStatusId);
        } else {
          eventKeys.push(eventStatusId);
        }
      }
      this.setState(
        {
          eventKeysFilter: eventKeys,
        },
        () => {
          this.updateFilterEvents();
        },
      );
    };

    render() {
      return (
        this.props.userDetails && (
          <Wrapped
            employeeId={this.props.userDetails.employeeId}
            loading={this.props.loading}
            takenHolidays={this.props.takenHolidays}
            takenHolidaysFiltered={
              this.state.takenHolidaysFiltered.length === 0
                ? this.props.takenHolidays
                : this.state.takenHolidaysFiltered
            }
            updateTakenHolidays={this.props.onFetchEvents}
            isEventBeingUpdated={this.props.isEventBeingUpdated}
            onUpdateEvents={this.onFilterEvents}
            onUpdateEmployee={this.onFilterEmployee}
          />
        )
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: state.USER,
    loading: state.DASHBOARD.loading,
    takenHolidays: state.DASHBOARD.takenHolidays,
    isEventBeingUpdated: state.DASHBOARD.isEventBeingUpdated,
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
