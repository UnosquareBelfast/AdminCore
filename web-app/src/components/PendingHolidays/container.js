import React, { Component } from 'react';
import { getAllHolidays } from '../../services/holidayService';
import holidayStatus from '../../utilities/holidayStatus';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { pendingHolidays: [] };
    }

    componentDidMount() {
      this.getPendingHolidays();
    }

    getPendingHolidays = () => {
      getAllHolidays().then(response => {
        const allHolidays = response.data;
        const pendingOnly = this.filterPending(allHolidays);
        this.setState({ pendingHolidays: pendingOnly });
      });
    };

    filterPending = holidays => {
      return holidays.filter(
        holiday => holiday.holidayStatusId === holidayStatus.PENDING,
      );
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          pendingHolidays={this.state.pendingHolidays}
        />
      );
    }
  };
