import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toggleBookingModal } from '../../actions/dashboard';
import {
  getBooking,
  bookingModalOpen,
  getBookingDuration,
} from '../../reducers';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number,
      updateTakenHolidays: PT.func,
      isEventBeingUpdated: PT.bool,
      booking: PT.object,
      bookingModalOpen: PT.bool,
      toggleBookingModal: PT.func,
      bookingDuration: PT.number,
    };

    constructor(props) {
      super(props);
    }

    closeBookingModal = () => {
      this.props.toggleBookingModal(false);
    };

    render() {
      return (
        this.props.employeeId && (
          <Wrapped
            booking={this.props.booking}
            employeeId={this.props.employeeId}
            bookingModalOpen={this.props.bookingModalOpen}
            closeBookingModal={this.closeBookingModal}
            updateTakenHolidays={this.props.updateTakenHolidays}
            isEventBeingUpdated={this.props.isEventBeingUpdated}
            bookingDuration={this.props.bookingDuration}
          />
        )
      );
    }
  };

const mapStateToProps = state => {
  return {
    booking: getBooking(state),
    bookingModalOpen: bookingModalOpen(state),
    bookingDuration: getBookingDuration(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleBookingModal: open => dispatch(toggleBookingModal(open)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), Container);
