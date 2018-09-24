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
  getAllHolidays,
  updateHoliday,
  requestHoliday,
  rejectionResponse,
  cancelHoliday,
} from '../../services/holidayService';
import { requestWFH } from '../../services/wfhService';
import eventTypes from '../../utilities/eventTypes';
const testMessageArray = [{ author: 'John Mallon', eventMessageId: 1, lastModified: '2018-09-19', message: 'Sorry, low team capacity', messageTypeDescription: 'General', messageTypeId: 1 }
  , { author: 'Carl Stevenson', eventMessageId: 6, lastModified: '2018-09-19', message: 'Is there nothing you can do?', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'John Mallon', eventMessageId: 6, lastModified: '2018-09-19', message: 'Not for this date unfortunately', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'Carl Stevenson', eventMessageId: 6, lastModified: '2018-09-19', message: 'Could I swap a holiday with someone?', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'John Mallon', eventMessageId: 6, lastModified: '2018-09-19', message: 'No we need your skill set', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'Carl Stevenson', eventMessageId: 1, lastModified: '2018-09-19', message: 'I really need to get this day off', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'John Mallon', eventMessageId: 1, lastModified: '2018-09-19', message: 'I will see what I can do', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'Carl Stevenson', eventMessageId: 1, lastModified: '2018-09-19', message: 'Thankyou, I really appreciate it', messageTypeDescription: 'General', messageTypeId: 1 },
{ author: 'John Mallon', eventMessageId: 1, lastModified: '2018-09-19', message: 'Sorry it cannot be changed', messageTypeDescription: 'General', messageTypeId: 1 }];


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
        toggleRejectionMessageView: false,
        legacyMessages: [],
        loading: false,
      };
    }

    closeBookingModal = () => {
      this.setState({
        rejectionResponseText: '',
        toggleRejectionResponseView: false,
        toggleRejectionMessageView: false,
      });
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
      this.setState({ toggleRejectionResponseView: toggle });
    };

    toggleLegacyHolidayMessageView = () => {
      this.getLegacyMessages();
      this.setState({ toggleRejectionMessageView: !this.state.toggleRejectionMessageView });
    }

    updateEvent = (event, formData) => {
      this.setState({ loading: true });
      event.preventDefault();
      const { start, end, isHalfday, employeeRejectionMessage, updateMessage } = formData;
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
        message: employeeRejectionMessage ? employeeRejectionMessage : updateMessage,
      };

      if (eventTypeId) {
        updateHoliday(request)
          .then(() => {
            updateTakenEvents();
            toggleBookingModal(false);
            this.setState({ loading: false });
          })
          .catch(error => {
            Swal({
              title: 'Error',
              text: error.message,
              type: 'error',
            });
            toggleBookingModal(false);
            this.setState({ loading: false });
          });
      }
    };
    assignRejectionResponseText = e => {
      this.setState({ rejectionResponseText: e.target.value });
    };

    submitRejectionResponse = () => {
      const rejectionResponseMessage = this.state.rejectionResponseText;
      const {
        booking: { eventId },
      } = this.props;

      rejectionResponse(eventId, rejectionResponseMessage)
        .then(() => this.closeBookingModal())
        .catch(error => {
          Swal({
            title: 'Error',
            text: error.message,
            type: 'error',
          });
        });
    };

    cancelEvent = () => {
      const {
        updateTakenEvents,
        toggleBookingModal,
        booking: { eventId },
      } = this.props;

      cancelHoliday(eventId)
        .then(() => {
          updateTakenEvents();
          this.setState({ toggleRejectionResponseView: false });
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

    getLegacyMessages = () => {
      const { legacyMessages } = this.state;
      if (!legacyMessages.length) {
        getAllHolidays()
          .then(() => {
            //temporarily overwriting with test data as end point data not yet available
            this.setState({ legacyMessages: testMessageArray });
          })
          .catch(error => {
            Swal({
              title: 'Error',
              text: error.message,
              type: 'error',
            });
          });
      }
    };

    render() {
      const { toggleRejectionMessageView, legacyMessages, toggleRejectionResponseView, loading } = this.state;
      return (
        this.props.employeeId && (
          <Wrapped
            legacyMessages={legacyMessages}
            legacyHolidayMessagelist={this.legacyHolidayMessagelist}
            submitRejectionResponse={this.submitRejectionResponse}
            toggleRejectionMessageView={toggleRejectionMessageView}
            rejectionResponseText={this.state.rejectionResponseText}
            assignRejectionResponseText={this.assignRejectionResponseText}
            booking={this.props.booking}
            toggleLegacyHolidayMessageView={this.toggleLegacyHolidayMessageView}
            toggleRejectionResponseView={toggleRejectionResponseView}
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
            loading={loading}
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
