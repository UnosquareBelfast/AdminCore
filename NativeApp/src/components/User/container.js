import React, { Component } from 'react';
import { getUserHolidays } from '../../services/userService';

export default Container => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      takenHolidays: [],
      remainingHolidays: [],
    };
  }

  componentDidMount() {
    getUserHolidays()
      .then(data => this.setState({ takenHolidays: data }));
  }

  render() {
    const { takenHolidays, remaining } = this.state;
    return (
      <Container
        takenHolidays={takenHolidays.length}
        remainingHolidays={remaining}
      />
    );
  }
};
