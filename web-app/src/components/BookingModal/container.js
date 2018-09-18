import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Swal from 'sweetalert2';
import { toggleBookingModal } from '../../actions/dashboard';
import {
  getBooking,
  bookingModalOpen,
  getBookingDuration,
} from '../../reducers';
import {
  updateHoliday,
  requestHoliday,
  rejectionResponseMessage,
  cancelHoliday,
} from '../../services/holidayService';
import { requestWFH } from '../../services/wfhService';
import eventTypes from '../../utilities/eventTypes';

const Container = Wrapped =>
  class extends React.Component {
    static propTypes = {
      employeeId: PT.number,
      updateTakenEvents: PT.func,
      isEventBeingUpdated: PT.bool,
      booking: PT.object,
      bookingModalOpen: PT.bool,
      toggleBookingModal: PT.func,
      bookingDuration: PT.number,
    };

    constructor(props) {
      super(props);
      this.dateFormat = 'YYYY-MM-DD';

      this.state = {
        toggleRejectionResponseView: false,
        rejectionResponseText: '',
      };
    }

    closeBookingModal = () => {
      this.setState({rejectionResponseText: '' , toggleRejectionResponseView: false} );
      this.props.toggleBookingModal(false);
    };

    createEvent = (event, formData) => {
      event.preventDefault();
      const { employeeId, updateTakenEvents, toggleBookingModal } = this.props;
      const { start, end, isHalfday } = formData;
      const eventTypeId = parseInt(formData.eventTypeId);

      const endpoints = {
        [eventTypes.ANNUAL_LEAVE]: requestHoliday,
        [eventTypes.WFH]: requestWFH,
      };

      const request = {
        dates: [
          {
            startDate: start.format(this.dateFormat),
            endDate: end.format(this.dateFormat),
            halfDay: isHalfday,
          },
        ],
        employeeId: employeeId,
      };

      endpoints[eventTypeId](request)
        .then(() => {
          updateTakenEvents();
          toggleBookingModal(false);
        })
        .catch(error => Swal('Error', error.message, 'error'));
    };

    toggleRejectionMessageInputView = toggle => {

      this.setState({toggleRejectionResponseView: toggle} );

    }

    updateEvent = (event, formData) => {
      event.preventDefault();
      const { start, end, isHalfday } = formData;
      const eventTypeId = parseInt(formData.eventTypeId);
      const {
        updateTakenEvents,
        toggleBookingModal,
        booking: { eventId },
      } = this.props;

      const request = {
        endDate: end.format(this.dateFormat),
        halfDay: isHalfday,
        eventId: eventId,
        startDate: start.format(this.dateFormat),
      };

      if (eventTypeId) {
        updateHoliday(request)
          .then(() => {
            updateTakenEvents();
            toggleBookingModal(false);
          })
          .catch(error => {
            Swal({
              title: 'Error',
              text: error.message,
              type: 'error',
            });
            toggleBookingModal(false);
          });
      }
    };
    assignRejectionResponseText = e => {
      this.setState({rejectionResponseText: e.target.value } );
    }

    submitRejectionResponse = () => {
      const resjectionResponseMessage = this.state.rejectionResponseText;
      const {
        booking: { eventId },
      } = this.props;
    
      rejectionResponseMessage( eventId, resjectionResponseMessage)
        .then(() => this.closeBookingModal())
        .catch(error => {
          Swal({
            title: 'Error',
            text: error.message,
            type: 'error',
          });
        });
  
    }

    cancelEvent = () => {
      
      const {
        updateTakenEvents,
        toggleBookingModal,
        booking: { eventId },
      } = this.props;

      cancelHoliday(eventId)
        .then(() => {
          updateTakenEvents();
          this.setState({toggleRejectionResponseView: false});
          toggleBookingModal(false);
          
        })
        .catch(error => {
          Swal({
            title: 'Error',
            text: error.message,
            type: 'error',
          });
          toggleBookingModal(false);
        });
    };

    render() {
      return (
        this.props.employeeId && (
          <Wrapped
            submitRejectionResponse={this.submitRejectionResponse}
            rejectionResponseText={this.state.rejectionResponseText}
            assignRejectionResponseText={this.assignRejectionResponseText}
            booking={this.props.booking}
            toggleRejectionResponseView={this.state.toggleRejectionResponseView}
            toggleRejectionMessageInputView={this.toggleRejectionMessageInputView}
            employeeId={this.props.employeeId}
            bookingModalOpen={this.props.bookingModalOpen}
            closeBookingModal={this.closeBookingModal}
            updateTakenEvents={this.props.updateTakenEvents}
            isEventBeingUpdated={this.props.isEventBeingUpdated}
            bookingDuration={this.props.bookingDuration}
            createEvent={this.createEvent}
            updateEvent={this.updateEvent}
            cancelEvent={this.cancelEvent}
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
