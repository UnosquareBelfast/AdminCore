import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import map from 'lodash/fp/map';
import compact from 'lodash/fp/compact';
import uniqBy from 'lodash/fp/uniqBy';
import flow from 'lodash/fp/flow';
import { getEventView } from '../../reducers';
import eventCategory from '../../utilities/eventCategory';
import holidayStatus, {
  statusText,
  statusIcons,
} from '../../utilities/holidayStatus';
import eventTypes, { typeText, typeIcons } from '../../utilities/eventTypes';

const LegendContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      eventView: PT.number.isRequired,
      allEvents: PT.array.isRequired,
      updateEmployee: PT.func.isRequired,
      updateCalendarEvents: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        selectedEmployee: {
          employeeId: -1,
        },
        legendKeyStatuses: [],
        legendKeyTypes: [],
      };
    }

    componentWillMount = () => {
      this.buildLegendKeyStatuses();
      this.buildLegendKeyTypes();
    };

    buildLegendKeyStatuses = () => {
      const legendKeys = Object.keys(holidayStatus);
      const keysFormatted = [];

      legendKeys.forEach(key => {
        keysFormatted.push({
          id: key,
          status: holidayStatus[key],
          text: statusText[holidayStatus[key]],
          icon: statusIcons[holidayStatus[key]],
          active: false,
        });
      });

      this.setState({ legendKeyStatuses: keysFormatted });
    };

    buildLegendKeyTypes = () => {
      const legendKeys = Object.keys(eventTypes);
      const keysFormatted = [];

      legendKeys.forEach(key => {
        // dont wish to show annual leave as its really part of holiday status
        if (key !== 'ANNUAL_LEAVE') {
          keysFormatted.push({
            id: key,
            status: eventTypes[key],
            text: typeText[eventTypes[key]],
            icon: typeIcons[eventTypes[key]],
            active: false,
          });
        }
      });

      this.setState({ legendKeyTypes: keysFormatted });
    };

    onToggleStatus = keyId => {
      const legendKeyStatuses = [...this.state.legendKeyStatuses];
      legendKeyStatuses.map(key => {
        if (key.id === keyId) {
          key.active = !key.active;
        }
      });
      this.setState({ legendKeyStatuses }, () => {
        const activeKeyIds = legendKeyStatuses
          .filter(key => key.active)
          .reduce((acc, key) => {
            acc.push(key.status);
            return acc;
          }, []);

        this.props.updateCalendarEvents(
          eventCategory.HOLIDAY_STATUS,
          activeKeyIds,
        );
      });
    };

    onToggleType = keyId => {
      const legendKeyTypes = [...this.state.legendKeyTypes];
      legendKeyTypes.map(key => {
        if (key.id === keyId) {
          key.active = !key.active;
        }
      });
      this.setState({ legendKeyTypes }, () => {
        const activeKeyIds = legendKeyTypes
          .filter(key => key.active)
          .reduce((acc, key) => {
            acc.push(key.status);
            return acc;
          }, []);

        this.props.updateCalendarEvents(eventCategory.EVENT_TYPE, activeKeyIds);
      });
    };

    onFilterUserChange = event => {
      const employeeId = event.target.value;

      this.setState(
        {
          selectedEmployee: {
            employeeId,
          },
        },
        () => {
          this.props.updateEmployee(this.state.selectedEmployee.employeeId);
        },
      );
    };

    getEmployeeState = () => {
      const { allEvents } = this.props;
      return flow(
        map('employee'),
        compact,
        uniqBy('employeeId'),
      )(allEvents);
    };

    render() {
      const employeeList = this.getEmployeeState();
      return (
        <Wrapped
          selectedEmployee={this.state.selectedEmployee}
          employeeList={employeeList}
          legendKeyStatuses={this.state.legendKeyStatuses}
          legendKeyTypes={this.state.legendKeyTypes}
          eventView={this.props.eventView}
          onToggleStatus={this.onToggleStatus}
          onToggleType={this.onToggleType}
          userChanged={this.onFilterUserChange}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    eventView: getEventView(state),
  };
};

export default compose(
  connect(mapStateToProps),
  LegendContainer,
);
