import React, { Component } from 'react';
import { getHolidaysByStatus } from '../../services/holidayService';
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
      getHolidaysByStatus(holidayStatus.PENDING).then(response => {
        this.setState({ pendingHolidays: response.data });
      });
    };

    render() {
      return (
        <Wrapped {...this.props} pendingHolidays={this.state.pendingHolidays} />
      );
    }
  };
