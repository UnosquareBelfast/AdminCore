import React, { Component } from 'react';
import { getHolidaysByStatus } from '../../services/holidayService';
import holidayStatus from '../../utilities/holidayStatus';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { pendingHolidays: [], selectedHoliday: {} };
    }

    componentDidMount() {
      this.getPendingHolidays();
    }

    getPendingHolidays = () => {
      getHolidaysByStatus(holidayStatus.PENDING).then(response => {
        this.setState({ pendingHolidays: response.data });
      });
    };

    selectHoliday = holiday => this.setState({ selectedHoliday: holiday });

    closeModal = () => {
      this.selectHoliday({});
      this.getPendingHolidays();
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          {...this.state}
          selectHoliday={this.selectHoliday}
          closeModal={this.closeModal}
        />
      );
    }
  };
