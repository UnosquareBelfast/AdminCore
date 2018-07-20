import React, { Component } from 'react';
import { getTakenHolidays, getRemainingHolidays } from '../../utilities/holidays';
import { userProfile } from '../../utilities/currentUser';

export default Container => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      takenHolidays: [],
      remainingHolidays: 0,
      employee: {
        forename: '',
        surname: '',
      },
    };
  }

  componentDidMount() {
    getTakenHolidays()
      .then(takenHolidays => this.setState({ takenHolidays }));

    getRemainingHolidays()
      .then(remainingHolidays => this.setState({ remainingHolidays }));

    userProfile()
      .then(employee => this.setState(
        {
          employee: {
            forename: employee.forename,
            surname: employee.surname,
          },
        }
      ));
  }

  render() {
    const { takenHolidays, remainingHolidays, employee } = this.state;

    return (
      <Container
        employee={employee}
        takenHolidays={takenHolidays}
        remainingHolidays={remainingHolidays - takenHolidays.length}
      />
    );
  }
};
