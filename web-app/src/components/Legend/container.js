import React from 'react';
import { PropTypes as PT } from 'prop-types';
import _ from 'lodash';
import holidayStatus, { statusText } from '../../utilities/holidayStatus';

const LegendContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      takenHolidays: PT.array.isRequired,
      updateEmployee: PT.func.isRequired,
      updateCalendarEvents: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        selectedEmployee: {
          employeeId: -1,
        },
        legendKeys: [],
      };
    }

    componentWillMount = () => {
      this.buildLegendKeys();
    };

    buildLegendKeys = () => {
      const legendKeys = Object.keys(holidayStatus);
      const keysFormatted = [];

      for (let i = 0; i < legendKeys.length; i++) {
        const legendKey = legendKeys[i];
        keysFormatted.push({
          id: holidayStatus[legendKey],
          keyName: legendKey,
          label: statusText[holidayStatus[legendKey]],
          type: i < 4 ? 'status' : 'type',
          active: false,
        });
      }

      this.setState({ legendKeys: keysFormatted });
    };

    toggleKeyActive = keyId => {
      const legendKeys = [...this.state.legendKeys];
      legendKeys.map(key => {
        if (key.id == keyId) {
          key.active = !key.active;
        }
      });
      this.setState({ legendKeys }, () => {
        const activeKeyIds = legendKeys
          .filter(key => key.active)
          .reduce((acc, key) => {
            acc.push(key.id);
            return acc;
          }, []);

        this.props.updateCalendarEvents(activeKeyIds);
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
          this.props.updateEmployee(this.state.selectedEmployee);
        }
      );
    };

    getEmployeeState = () => {
      const { takenHolidays } = this.props;
      return _.chain(takenHolidays)
        .map('employee')
        .compact()
        .uniqBy('employeeId')
        .value();
    };

    render() {
      const employeeList = this.getEmployeeState();

      return (
        <Wrapped
          selectedEmployee={this.state.selectedEmployee}
          employeeList={employeeList}
          legendKeys={this.state.legendKeys}
          onToggleEvent={this.toggleKeyActive}
          userChanged={this.onFilterUserChange}
        />
      );
    }
  };

export default LegendContainer;
