import React from 'react';
import { PropTypes as PT } from 'prop-types';
import holidayStatus from '../../utilities/holidayStatus';

const LengendContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      takenHolidays: PT.array.isRequired,
      updateEmployee: PT.func.isRequired,
      updateCalendarEvents: PT.func.isRequired,
    };

    constructor(props) {
      super(props);
      const { PENDING, APPROVED, REJECTED, WFH, SICK, WRT } = holidayStatus;
      this.state = {
        employees: [],
        selectedEmployee: {
          employeeId: 'all',
        },
        eventsKeys: [
          {
            eventStatusId: 2,
            key: APPROVED,
            type: 'holiday',
            active: false,
          },
          {
            eventStatusId: 1,
            key: PENDING,
            type: 'holiday',
            active: false,
          },
          {
            eventStatusId: 3,
            key: REJECTED,
            type: 'holiday',
            active: false,
          },
          {
            eventStatusId: 4,
            key: WFH,
            type: 'status',
            active: false,
          },
          {
            eventStatusId: 5,
            key: SICK,
            type: 'status',
            active: false,
          },
          {
            eventStatusId: 6,
            key: WRT,
            type: 'status',
            active: false,
          },
        ],
        selectedEventStatusID: 1,
      };
    }

    componentWillMount = () => {
      this.createEmployeesList();
    };

    sortEmployeeList = objArray => {
      return objArray.sort(function(a, b) {
        if (a.displayName < b.displayName) return -1;
        if (a.displayName > b.displayName) return 1;
        return 0;
      });
    };

    createEmployeeObject = hol => {
      let { employeeId, forename, surname } = hol.employee;
      return {
        value: employeeId,
        displayValue: `${forename} ${surname}`,
      };
    };

    removeDuplicateEmployees = employees => {
      return employees.reduce((unique, o) => {
        if (
          !unique.some(
            obj => obj.value === o.value && obj.displayValue === o.displayValue,
          )
        ) {
          unique.push(o);
        }
        return unique;
      }, []);
    };

    createEmployeesList = () => {
      const { takenHolidays } = this.props;
      let employees = takenHolidays.map(hol => {
        return this.createEmployeeObject(hol);
      });
      employees = this.removeDuplicateEmployees(employees);
      employees.unshift({ value: 'all', displayValue: 'All' });
      this.setState({ employees: this.sortEmployeeList(employees) });
    };

    setKeyActiveState = eventStatusId => {
      let updatedList = [...this.state.eventsKeys];
      for (let key of updatedList) {
        if (key.eventStatusId === eventStatusId) {
          key.active = !key.active;
        }
      }
      this.setState({
        selectedEventStatusID: eventStatusId,
      });
      this.props.updateCalendarEvents(eventStatusId);
    };

    handleFormStatus(name, value) {
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
          employees={this.state.employees}
          selectedEmployee={this.state.selectedEmployee}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          eventsKeyList={this.state.eventsKeys}
          onToggleKey={this.setKeyActiveState}
        />
      );
    }
  };

export default LengendContainer;
