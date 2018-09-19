import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import {
  approveHoliday,
  rejectHoliday,
} from '../../services/holidayService';
import swal from 'sweetalert2';
import holidayStatus from '../../utilities/holidayStatus';
import { Toast } from '../../utilities/Notifications';
import { getUser } from '../../reducers';

const HolidayModalContainer = Wrapped =>
  class extends Component {
    static propTypes = {
      holiday: PT.object.isRequired,
      closeModal: PT.func.isRequired,
      showAdminControls: PT.bool,
      userDetails: PT.object.isRequired,
    };

    static defaultProps = {
      showAdminControls: false,
    };

    constructor(props) {
      super(props);
      this.state = {
        holidays: [],
        holidayModalExpansion: false,
        capturedRejectionReasonText: '',
        capturedRejectionReponseText: '',
        rejectionReasonResponse: false,
      };
    }

    componentWillUpdate(nextProps) {
      if (nextProps.holiday !== this.props.holiday) {
        this.setState({ holiday: nextProps.holiday });
      }
    }

    approveHoliday = () => {
      const holidayId = this.state.holiday.eventId;
      const { closeModal } = this.props;
      approveHoliday(holidayId)
        .then(() => {
          this.setState({
            holiday: {
              ...this.state.holiday,
              eventStatus: {
                ...this.state.holiday.eventStatus,
                eventStatusId: holidayStatus.APPROVED,
              },
            },
          });
          Toast({
            type: 'success',
            title: 'Holiday Approved',
            position: 'top',
          });
          this.collapseRejectionReasonState();
          closeModal();
        })
        .catch(error => {
          swal('Error', `There was an error: ${error.message}. 'error`);
        });
    };

    assignRejectionResponseText = e => {
      this.setState({ capturedRejectionReponseText: e.target.value });
    };

    assignRejectionReasonText = e => {
      this.setState({ capturedRejectionReasonText: e.target.value });
    };

    toggleRejectionMessageResponse = rejectionReasonToggleValue => {
      this.setState({ rejectionReasonResponse: rejectionReasonToggleValue });
    };

    rejectHoliday = () => {

      const { capturedRejectionReasonText, holiday } = this.state;
      const { eventId } = holiday;

      rejectHoliday(eventId, capturedRejectionReasonText)
        .then(() => {
          this.setState({
            holiday: {
              ...this.state.holiday,
              eventStatus: {
                ...this.state.holiday.eventStatus,
                eventStatusId: holidayStatus.REJECTED,
              },
            },
          });
          Toast({
            type: 'success',
            title: 'Holiday Rejected',
            position: 'top',
          });
          this.closeModalResetRejectionReasonView();
        })
        .catch(error => {
          swal('Error', `There was an error: ${error.message}. 'error`);
        });
    };

    collapseRejectionReasonState = () => {
      this.setState({ holidayModalExpansion: false });
    };

    expandRejectHolidayExplanationText = () => {
      this.setState({ holidayModalExpansion: true });
    };

    closeModalResetRejectionReasonView = () => {
      const { closeModal } = this.props;
      this.setState({
        holidayModalExpansion: false,
        capturedRejectionReasonText: '',
        rejectionReasonResponse: false,
        capturedRejectionReponseText: '',
      });
      closeModal();
    };

    render() {
      const { userDetails, showAdminControls } = this.props;
      const {
        holiday,
        rejectionReasonResponse,
        capturedRejectionReasonText,
        capturedRejectionReponseText,
        holidayModalExpansion,
      } = this.state;
      if (isEmpty(holiday)) return null;
      return (
        <Wrapped
          holiday={holiday}
          closeModal={this.closeModalResetRejectionReasonView}
          approveHoliday={this.approveHoliday}
          rejectHoliday={this.rejectHoliday}
          userDetails={userDetails}
          showAdminControls={showAdminControls}
          toggled={holidayModalExpansion}
          expandRejectHolidayExplanationText={
            this.expandRejectHolidayExplanationText
          }
          assignRejectionReasonText={this.assignRejectionReasonText}
          capturedRejectionReasonText={capturedRejectionReasonText}
          rejectionReasonResponse={rejectionReasonResponse}
          toggleRejectionMessageResponse={this.toggleRejectionMessageResponse}
          assignRejectionResponseText={this.assignRejectionResponseText}
          capturedRejectionReponseText={capturedRejectionReponseText}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
  };
};

export default compose(connect(mapStateToProps), HolidayModalContainer);
