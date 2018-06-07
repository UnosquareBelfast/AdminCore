import React, { Component } from 'react';
import { getAllHolidays, updateHoliday } from '../../services/holidayService';
import holidayStatus from '../../utilities/holidayStatus';
import Swal from 'sweetalert2';

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

    approveHoliday = holiday => {
      const holidayIndex = this.state.pendingHolidays.indexOf(holiday);
      const pendingHolidays = [...this.state.pendingHolidays];
      const approvedHoliday = { ...holiday };
      approvedHoliday.holidayStatusId = holidayStatus.APPROVED;

      updateHoliday(approvedHoliday)
        .then(() => {
          pendingHolidays.splice(holidayIndex, 1);
          this.setState({ pendingHolidays });
        })
        .catch(error =>
          Swal({
            title: 'Could not approve holiday',
            text: error.message,
            type: 'error',
          }),
        );
    };

    rejectHoliday = holiday => {
      const holidayIndex = this.state.pendingHolidays.indexOf(holiday);
      const pendingHolidays = [...this.state.pendingHolidays];
      const rejectedHoliday = { ...holiday };
      rejectedHoliday.holidayStatusId = holidayStatus.REJECTED;

      updateHoliday(rejectedHoliday)
        .then(() => {
          pendingHolidays.splice(holidayIndex, 1);
          this.setState({ pendingHolidays });
        })
        .catch(error =>
          Swal({
            title: 'Could not reject holiday',
            text: error.message,
            type: 'error',
          }),
        );
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          pendingHolidays={this.state.pendingHolidays}
          approveHoliday={this.approveHoliday}
          rejectHoliday={this.rejectHoliday}
        />
      );
    }
  };
