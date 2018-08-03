import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../actions/index';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number,
      updateTakenHolidays: PT.func,
      isEventBeingUpdated: PT.bool,
      booking: PT.object,
      bookingModalOpen: PT.bool,
      onOpenModal: PT.func,
      bookingDuration: PT.number,
    };

    constructor(props) {
      super(props);
    }

    render() {
      return (
        this.props.employeeId && (
          <Wrapped
            booking={this.props.booking}
            employeeId={this.props.employeeId}
            bookingModalOpen={this.props.bookingModalOpen}
            onOpenBookingModal={bookingModalOpen =>
              this.props.onOpenModal(bookingModalOpen)
            }
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
    booking: state.DASHBOARD.booking,
    bookingModalOpen: state.DASHBOARD.bookingModalOpen,
    bookingDuration: state.DASHBOARD.bookingDuration,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOpenModal: bookingModalOpen =>
      dispatch(actions.toggleBookingModal(bookingModalOpen)),
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  Container,
);
