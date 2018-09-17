import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import { approveHoliday, rejectHolidayWithMessage } from '../../services/holidayService';
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
      this.state = { holidays: [],
        holidayModalExpansion: false,
        capturedRejectionReasonText: '',
        capturedRejectionReponseText: '',
        rejectionReasonResponse: false };
    }

    componentWillUpdate(nextProps) {
      if (nextProps.holiday !== this.props.holiday) {
        this.setState({ holiday: nextProps.holiday });
      }
    }

    approveHoliday = () => {
      const holidayId = this.state.holiday.eventId;
      const {closeModal} = this.props;
      approveHoliday(holidayId)
        .then( () => {
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
          this.toggleRejectionReasonState();
          closeModal();
        })
        .catch(error => {
          swal('Error', `There was an error: ${error.message}. 'error`);
        });
    };

    assignRejectionResponseText = e =>{

      this.setState({ capturedRejectionReponseText: e.target.value });
    }

    assignRejectionReasonText = e =>{

      this.setState({ capturedRejectionReasonText: e.target.value });
    }

    toggleRejectionMessageResponse = rejectionReasonToggleValue =>{
      
      this.setState({ rejectionReasonResponse: rejectionReasonToggleValue });
    
    }


    sendRejectionResponse = () => {
    
      const rejectionResponseMessage = this.state.capturedRejectionReponseText;
      const holidayId = this.state.holiday.holidayId;
   
      rejectionResponseMessage( holidayId, rejectionResponseMessage )
        .then( () => {
        
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


    }


    rejectHoliday = () => {
      
      const rejectionReasonText = this.state.capturedRejectionReasonText;
      const holidayId = this.state.holiday.eventId;
   
      rejectHolidayWithMessage( holidayId, rejectionReasonText )
        .then( () => {
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


    toggleRejectionReasonState = () =>{
      this.setState({ holidayModalExpansion: false });
    }

    expandRejectHolidayExplanationText = () =>{
      this.setState({ holidayModalExpansion: true });
    }

    closeModalResetRejectionReasonView = () =>{
      this.setState({ holidayModalExpansion: false, 
        capturedRejectionReasonText: '', 
        rejectionReasonResponse: false, 
        capturedRejectionReponseText: ''  });
     
      const { closeModal } = this.props;
      closeModal();
    }


    render() {
      const { userDetails, showAdminControls } = this.props;
      const { holiday } = this.state;
      if (isEmpty(holiday)) return null;
      return (
        <Wrapped
          holiday={holiday}
          closeModal={this.closeModalResetRejectionReasonView}
          approveHoliday={this.approveHoliday}
          rejectHoliday={this.rejectHoliday}
          userDetails={userDetails}
          showAdminControls={showAdminControls}
          toggled={this.state.holidayModalExpansion}
          expandRejectHolidayExplanationText={this.expandRejectHolidayExplanationText}
          assignRejectionReasonText={this.assignRejectionReasonText}
          capturedRejectionReasonText={this.state.capturedRejectionReasonText}
          rejectionReasonResponse={this.state.rejectionReasonResponse}
          toggleRejectionMessageResponse={this.toggleRejectionMessageResponse}
          assignRejectionResponseText={this.assignRejectionResponseText}
          capturedRejectionReponseText={this.state.capturedRejectionReponseText}
          sendRejectionResponse={this.sendRejectionResponse}
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
