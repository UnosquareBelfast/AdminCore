import React, { Component } from 'react';
import { getTakenHolidays, getRemainingHolidays } from '../../utilities/holidays';

export default Container => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      takenHolidays: [],
      remainingHolidays: 0,
    };
  }

  componentDidMount() {
    getTakenHolidays()
      .then(takenHolidays => this.setState({ takenHolidays }));

    getRemainingHolidays()
      .then(remainingHolidays => this.setState({ remainingHolidays }));
  }

  render() {
    const { takenHolidays, remainingHolidays } = this.state;
    return (
      <Container
        takenHolidays={takenHolidays.length}
        remainingHolidays={remainingHolidays - takenHolidays.length}
      />
    );
  }
};
