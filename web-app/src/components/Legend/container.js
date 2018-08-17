import React from 'react';
import { PropTypes as PT } from 'prop-types';
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
        employeeList: [],
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

    componentDidUpdate = (_, prevState) => {
      const { employeeList } = this.state;
      const prevEmployees = prevState.employeeList;
      if (
        employeeList.length === prevEmployees.length &&
        employeeList.length === 0
      ) {
        this.storeEmployeeListToState();
      }
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

    storeEmployeeListToState = () => {
      const { takenHolidays } = this.props;
      const employeeList = takenHolidays
        .filter(hol => hol.employee)
        .map(hol => hol.employee)
        .filter((employee, pos, arr) => {
          return (
            arr
              .map(mapObj => mapObj.employeeId)
              .indexOf(employee.employeeId) === pos
          );
        });
      this.setState({ employeeList });
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

    render() {
      return (
        <Wrapped
          selectedEmployee={this.state.selectedEmployee}
          employeeList={this.state.employeeList}
          formStatus={(name, value, formIsValid) =>
            this.onFilterUserChange(name, value, formIsValid)
          }
          statusList={this.state.statusList}
          typesList={this.state.typesList}
          onToggleEvent={this.setLegendKeyActiveState}
        />
      );
    }
  };

export default LegendContainer;
