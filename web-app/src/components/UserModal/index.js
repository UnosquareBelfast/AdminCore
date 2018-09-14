import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Modal, Button, Email } from '../../components/common';
import { StyleContainer, Stat, StatWrap } from './styled';
import { isEmpty } from 'lodash';
import { getTotalDaysInEventArrayWithStatus } from '../../utilities/dates';
import HolidayStatus from '../../utilities/holidayStatus';

const UserModal = ({
  user,
  closeModal, 
  history,
  userHolidays,
  hasPermission,
}) => {

  const getTotalPendingDays = () => {
    return getTotalDaysInEventArrayWithStatus(
      userHolidays,
      HolidayStatus.PENDING
    );
  };

  const getTotalApprovedDays = () => {
    return getTotalDaysInEventArrayWithStatus(
      userHolidays,
      HolidayStatus.APPROVED
    );
  };

  if (isEmpty(user)) return null;
  const approvedDays = getTotalApprovedDays();
  const pendingDays = getTotalPendingDays();
 
  if (hasPermission) {

    return (  
      <Modal closeModal={closeModal}> 
        <StyleContainer>
          <div>
            <h2>
              {user.forename} {user.surname}
            </h2>
            <Email>{user.email}</Email>
          </div>
          <StatWrap>
            <Stat>
              <h2>{approvedDays + pendingDays} Days</h2>
              <h4>Holidays Booked</h4>
            </Stat>
            <Stat>
              <h2>{pendingDays} Days</h2>
              <h4>Holidays Pending</h4>
            </Stat>
            <Stat>
              <h2>{user.totalHolidays - approvedDays - pendingDays} Days</h2>
              <h4>Holidays Remaining</h4>
            </Stat>
          </StatWrap>
          <Button
            label="View Full Profile"
            onClick={() => history.push(`/user/${user.employeeId}`)}
          />
        </StyleContainer>
      </Modal>
    );
  }
  return null;
};


UserModal.propTypes = {
  closeModal: PT.func,
  userDetails: PT.object.isRequired,
  showModal: PT.bool.isRequired,
  history: PT.object,
  user: PT.object,   
  userHolidays: PT.array.isRequired,
  getHolidays: PT.func.isRequired,
  hasPermission: PT.bool.isRequired,
};

export default container(UserModal);
//export default UserModal;
