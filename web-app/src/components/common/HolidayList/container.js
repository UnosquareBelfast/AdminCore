import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { getAllHolidays, updateHoliday } from '../../../services/holidayService';
import holidayStatus from '../../../utilities/holidayStatus';
import Swal from 'sweetalert2';

export default Wrapped =>
  class extends Component {

    static propTypes = {
      holidays: PT.array,
    }

    constructor(props) {
      super(props);
      this.state = { holidays: props.holidays };
    }

    render() {
      return (
        <Wrapped
          {...this.state}
          {...this.props}
          approveHoliday={this.approveHoliday}
          rejectHoliday={this.rejectHoliday}
        />
      );
    }
  };
