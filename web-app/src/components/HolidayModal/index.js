import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Modal, Button, Email } from '../../components/common';
import { StyleContainer, Stat, StatWrap, ButtonWrap, StatusH2 } from './styled';
import { getEventDayAmount } from '../../utilities/dates';
import { statusText } from '../../utilities/holidayStatus';
import roles from '../../utilities/roles';

const HolidayModal = ({
  closeModal,
  holiday,
  approveHoliday,
  rejectHoliday,
  userDetails,
  showAdminControls,
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

  const duration = getEventDayAmount(holiday);
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
        </StatWrap>
        {shouldShowAdminControls() && (
          <ButtonWrap>
            <Button label="Approve" onClick={approveHoliday} />
            <Button label="Reject" onClick={rejectHoliday} />
          </ButtonWrap>
        )}
      </StyleContainer>
    </Modal>
  );
};

HolidayModal.propTypes = {
  closeModal: PT.func.isRequired,
  holiday: PT.object.isRequired,
  approveHoliday: PT.func.isRequired,
  rejectHoliday: PT.func.isRequired,
  userDetails: PT.object.isRequired,
  showAdminControls: PT.bool.isRequired,
};

export default container(HolidayModal);
