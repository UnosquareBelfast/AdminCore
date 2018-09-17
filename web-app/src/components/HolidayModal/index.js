import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Modal, Button, Email } from '../../components/common';
import { StyleContainer, Stat, StatWrap, ButtonWrap, StatusH2 } from './styled';
import { getEventDayAmount } from '../../utilities/dates';
import { statusText } from '../../utilities/holidayStatus';
import roles from '../../utilities/roles';

import { InputText } from '../common_styled';

const HolidayModal = ({
  closeModal,
  holiday,
  approveHoliday,
  rejectHoliday,
  userDetails,
  showAdminControls,
  expandRejectHolidayExplanationText,
  toggled,
  assignRejectionReasonText,
  capturedRejectionReasonText,
  toggleRejectionMessageResponse,
  rejectionReasonResponse,
  assignRejectionResponseText,
  capturedRejectionReponseText,
  sendRejectionResponse,

}) => {
  const { start, end, employee, eventStatus } = holiday;
  const { forename, surname, email, employeeId } = employee;
  const isAdmin = userDetails.employeeRoleId === roles.ADMIN;

  const shouldShowAdminControls = () => {
    if (!isAdmin) return false;
    if (userDetails.employeeId === employeeId) return false;
    if (!showAdminControls) return false;
    return true;
  };

  const shouldDisableButtonControl = inputText => {
    return !inputText.length > 0;
  };

  const duration = getEventDayAmount(holiday);
  const rejectionReason = holiday.deniedMessage;
  const disableRejectionResponsButton = shouldDisableButtonControl(capturedRejectionReponseText);
  const disableRejectionReasonButton = shouldDisableButtonControl(capturedRejectionReasonText);
  return (
    <Modal closeModal={closeModal}>
      <StyleContainer>
        <div>
          <h2>Manage Holiday</h2>
          <p>
            {forename} {surname} - <Email>{email}</Email>
          </p>
        </div>
        <StatWrap>
          <Stat>
            <StatusH2 status={eventStatus.eventStatusId}>
              {statusText[eventStatus.eventStatusId]}
            </StatusH2>
            <h4>Status</h4>
          </Stat>
        </StatWrap>
        <StatWrap>
          <Stat>
            <h2>{start.format('DD/MM/YYYY')}</h2>
            <h4>Holiday Start</h4>
          </Stat>
          <Stat>
            <h2>{end.format('DD/MM/YYYY')}</h2>
            <h4>Holiday End</h4>
          </Stat>
          <Stat>
            <h2>
              {duration} {duration > 1 ? 'Days' : 'Day'}
            </h2>
            <h4>Duration</h4>
          </Stat>
          {rejectionReason ? <Stat>
            <h2 onClick={()=> toggleRejectionMessageResponse(!rejectionReasonResponse)}>
              {rejectionReason}
            </h2>
            <h4>Rejection Reason</h4>
          </Stat> : null }
        </StatWrap>
        {shouldShowAdminControls() && (
          toggled === false ? <Stat>
            <ButtonWrap>
              <Button label="Approve" onClick={approveHoliday} />
              <Button label="Reject" onClick={ expandRejectHolidayExplanationText } />
            </ButtonWrap>
          </Stat> : null
        )}
        { rejectionReasonResponse === true ? <div><StatWrap>
          <Stat>
            <h2>{ 'Rejection Response' }</h2>
            <InputText onChange={assignRejectionResponseText}/>
          </Stat>
        </StatWrap>
        <StatWrap>
          <ButtonWrap>
            <Button title={disableRejectionResponsButton ? 'Enter Message First' : ''} disabled={disableRejectionResponsButton} label="Send Rejection Response" onClick={() => sendRejectionResponse()} />
          </ButtonWrap>
        </StatWrap></div> : null}
        { toggled === true ? <div><StatWrap>
          <Stat>
            <h2>{ 'Rejection Reason' }</h2>
            <InputText onChange={assignRejectionReasonText}/>
          </Stat>
        </StatWrap>
        <StatWrap>
          <ButtonWrap>
            <Button title={disableRejectionReasonButton ? 'Enter Message First' : ''} disabled={disableRejectionReasonButton} label="Confirm Rejection" onClick={() => rejectHoliday()} />
          </ButtonWrap>
        </StatWrap></div> : null}
      </StyleContainer>
    </Modal>
  );
};

HolidayModal.propTypes = {
  closeModal: PT.func.isRequired,
  capturedRejectionReasonText: PT.string.isRequired,
  capturedRejectionReponseText: PT.string.isRequired,
  expandRejectHolidayExplanationText: PT.func.isRequired,
  toggled: PT.bool,
  holiday: PT.object.isRequired,
  assignRejectionReasonText: PT.func.isRequired,
  approveHoliday: PT.func.isRequired,
  rejectHoliday: PT.func.isRequired,
  userDetails: PT.object.isRequired,
  showAdminControls: PT.bool.isRequired,
  toggleRejectionMessageResponse: PT.func.isRequired,
  rejectionReasonResponse: PT.bool.isRequired,
  assignRejectionResponseText: PT.func.isRequired,
  sendRejectionResponse: PT.func.isRequired,
};

export default container(HolidayModal);
