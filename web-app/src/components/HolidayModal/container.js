import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { isEmpty } from 'lodash';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      holiday: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {};
    }

    approveHoliday = holidayId => {
      console.log('approved');
    };

    rejectHoliday = holidayId => {
      console.log('rejected');
    };

    render() {
      const { holiday } = this.props;
      if (isEmpty(holiday)) return null;
      return (
        <Wrapped
          {...this.props}
          {...this.state}
          approveHoliday={this.approveHoliday}
          rejectHoliday={this.rejectHoliday}
        />
      );
    }
  };
