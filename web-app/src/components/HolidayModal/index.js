import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Modal, Button, Email } from '../../components/common';
import { StyleContainer, Stat, FlexWrap, ButtonWrap, StatusH2 } from './styled';
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
  const disableRejectionReasonButton = shouldDisableButtonControl(
    capturedRejectionReasonText
  );
  return (
    <Modal closeModal={closeModal}>
      <StyleContainer>
        <div>
          <h2>Manage Holiday</h2>
          <p>
            {forename} {surname} - <Email>{email}</Email>
          </p>
        </div>
        <FlexWrap>
          <Stat>
            <StatusH2 status={eventStatus.eventStatusId}>
              {statusText[eventStatus.eventStatusId]}
            </StatusH2>
            <h4>Status</h4>
          </Stat>
        </FlexWrap>
        <FlexWrap>
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
        </FlexWrap>
        {shouldShowAdminControls() &&
          (!toggled && (
            <Stat>
              <ButtonWrap>
                <Button label="Approve" onClick={approveHoliday} />
                <Button
                  label="Reject"
                  onClick={expandRejectHolidayExplanationText}
                />
              </ButtonWrap>
            </Stat>
          ))}
        {toggled && (
          <div>
            <FlexWrap>
              <Stat>
                <h2>{'Rejection Reason'}</h2>
                <InputText onChange={assignRejectionReasonText} />
              </Stat>
            </FlexWrap>
            <FlexWrap>
              <ButtonWrap>
                <Button
                  title={
                    disableRejectionReasonButton ? 'Enter Message First' : ''
                  }
                  disabled={disableRejectionReasonButton}
                  label="Confirm Rejection"
                  onClick={() => rejectHoliday()}
                />
              </ButtonWrap>
            </FlexWrap>
          </div>
        )}
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
};

export default container(HolidayModal);
