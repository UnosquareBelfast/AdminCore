import React from 'react';
import { PropTypes as PT } from 'prop-types';
import map from 'lodash/fp/map';
import compact from 'lodash/fp/compact';
import uniqBy from 'lodash/fp/uniqBy';
import flow from 'lodash/fp/flow';
import holidayStatus, { statusText } from '../../utilities/holidayStatus';

const LegendContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      takenEvents: PT.array.isRequired,
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

      legendKeys.forEach((legendKey, index) => {
        keysFormatted.push({
          id: holidayStatus[legendKey],
          keyName: legendKey,
          label: statusText[holidayStatus[legendKey]],
          type: index < 4 ? 'status' : 'type',
          active: false,
        });
      });

      this.setState({ legendKeys: keysFormatted });
    };

    toggleKeyActive = keyId => {
      const legendKeys = [...this.state.legendKeys];
      legendKeys.map(key => {
        if (key.id === keyId) {
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
          this.props.updateEmployee(this.state.selectedEmployee.employeeId);
        },
      );
    };

    getEmployeeState = () => {
      const { takenEvents } = this.props;
      return flow(
        map('employee'),
        compact,
        uniqBy('employeeId'),
      )(takenEvents);
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
