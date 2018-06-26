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
      .then(data => this.setState({ takenHolidays: data }));

    getRemainingHolidays()
      .then(data => this.setState({ remainingHolidays: data }));
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
