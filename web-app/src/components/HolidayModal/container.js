import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { isEmpty } from 'lodash';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      holiday: PT.object.isRequired,
      closeModal: PT.func.isRequired,
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
      const { closeModal, holiday } = this.props;
      if (isEmpty(holiday)) return null;
      return (
        <Wrapped
          holiday={holiday}
          closeModal={closeModal}
          approveHoliday={this.approveHoliday}
          rejectHoliday={this.rejectHoliday}
        />
      );
    }
  };
