import React from 'react';
import { PropTypes as PT } from 'prop-types';
import _ from 'lodash';
import holidayStatus from '../../utilities/holidayStatus';

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
        statusList: [],
        typesList: [],
      };
    }

    componentWillMount = () => {
      this.storeLegendKeysToState();
    };

    storeLegendKeysToState = () => {
      const statusKeys = Object.keys(holidayStatus);
      const statusList = [];
      const typeList = [];

      for (const index of statusKeys.keys()) {
        const keyObj = {
          eventId: index + 1,
          key: index + 1,
          active: false,
        };
        // temp if statement
        if (index < 4) {
          statusList.push(keyObj);
        } else {
          typeList.push(keyObj);
        }
      }

      this.setState({
        statusList: statusList,
        typesList: typeList,
      });
    };

    setLegendKeyActiveState = (eventId, event) => {
      let updatedList;
      let updatedProp;
      if (event === 'status') {
        updatedList = [...this.state.statusList];
        updatedProp = 'statusList';
      } else {
        updatedList = [...this.state.typesList];
        updatedProp = 'typesList';
      }
      for (let key of updatedList) {
        if (key.eventId === eventId) {
          key.active = !key.active;
        }
      }
      this.setState({ [updatedProp]: updatedList });
      this.props.updateCalendarEvents(eventId, event);
    };

    onFilterUserChange(_, value) {
      this.setState(
        {
          selectedEmployee: {
            employeeId: value,
          },
        },
        () => {
          this.props.updateEmployee(this.state.selectedEmployee);
        },
      );
    }

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
          formStatus={(name, value) => this.onFilterUserChange(name, value)}
          statusList={this.state.statusList}
          typesList={this.state.typesList}
          onToggleEvent={this.setLegendKeyActiveState}
        />
      );
    }
  };

export default LegendContainer;
