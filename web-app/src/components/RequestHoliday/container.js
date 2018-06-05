import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { requestHoliday } from '../../services/holidayService';
import holidayStatus from '../../utilities/holidayStatus';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      user: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        selectedDateRange: {},
        datesMatch: false,
        halfDayChecked: false,
      };
    }

    handleDateChange = dates => {
      const datesMatch = this.areDatesMatching(dates);

      this.setState({ selectedDateRange: dates });
      this.setState({ datesMatch });
      if (!datesMatch) {
        this.setState({ halfDayChecked: false });
      }
    };

    handleHalfDayChange = event => {
      this.setState({ halfDayChecked: event.target.checked });
    };

    areDatesMatching = dates => {
      const { from, to } = dates;
      if (from && to) {
        return from.toLocaleDateString() == to.toLocaleDateString();
      }
      return false;
    };

    handleHolidayRequest = () => {
      if (this.state.datesMatch) {
        this.requestSingleDay();
      } else {
        this.requestMultipleDays();
      }
    };

    formatDate = (year, month, day) => {
      return `${year}-${month}-${day}`;
    };

    requestSingleDay = () => {
      console.log('Requesting Single Day');
      const date = this.state.selectedDateRange.from;
      const today = new Date();

      const formattedHolidayDate = this.formatDate(
        date.getFullYear(),
        ('0' + (date.getMonth() + 1)).slice(-2),
        ('0' + date.getUTCDate()).slice(-2),
      );

      const formattedTodayDate = this.formatDate(
        today.getFullYear(),
        ('0' + (today.getMonth() + 1)).slice(-2),
        ('0' + today.getUTCDate()).slice(-2),
      );

      const request = {
        date: formattedHolidayDate,
        dateCreated: formattedTodayDate,
        halfDay: this.state.halfDayChecked,
        holidayId: 0,
        holidayStatusDescription: 'string',
        holidayStatusId: holidayStatus.PENDING,
        lastModified: formattedTodayDate,
        employee: {
          employeeId: this.props.user.userId,
          forename: 'Name',
          surname: 'Name',
          email: 'Email',
          totalHolidays: 33,
          startDate: [2014, 1, 1],
          countryId: 1,
          countryDescription: 'Northern Ireland',
          employeeRoleId: 2,
          employeeRoleDescription: 'System administrator',
          employeeStatusId: 2,
          statusDescription: 'Inactive',
        },
      };

      requestHoliday(request);
    };

    requestMultipleDays = () => {
      //eslint-disable-next-line
      console.log('Requesting Multiple Days');
    };

    render() {
      return (
        <Wrapped
          datesChanged={this.handleDateChange}
          halfDayChanged={this.handleHalfDayChange}
          selectedDateRange={this.state.selectedDateRange}
          datesMatch={this.state.datesMatch}
          halfDayChecked={this.state.halfDayChecked}
          requestHoliday={this.handleHolidayRequest}
        />
      );
    }
  };
