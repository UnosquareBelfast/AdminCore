import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Modal, Button } from '../../components/common';
import { StyleContainer, Stat, StatWrap } from './styled';
import { getHolidays } from '../../services/holidayService';
import swal from 'sweetalert2';
import { getTotalDaysInEventArrayWithStatus } from '../../utilities/dates';
import HolidayStatus from '../../utilities/holidayStatus';
import { isEmpty } from 'lodash';

class UserModal extends Component {
  static propTypes = {
    user: PT.object,
    closeModal: PT.func.isRequired,
    history: PT.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      userHolidays: [],
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if (isEmpty(user)) return null;

    getHolidays(user.employeeId)
      .then(response => {
        this.setState({ userHolidays: response.data });
      })
      .catch(error => {
        swal(
          'Error',
          `Error getting user holiday details: ${error.message}`,
          'error'
        );
      });
  }

  getTotalPendingDays = () => {
    return getTotalDaysInEventArrayWithStatus(
      this.state.userHolidays,
      HolidayStatus.PENDING
    );
  };

  getTotalApprovedDays = () => {
    return getTotalDaysInEventArrayWithStatus(
      this.state.userHolidays,
      HolidayStatus.APPROVED
    );
  };

  render() {
    const { user, closeModal, history } = this.props;

    if (isEmpty(user)) return null;
    const approvedDays = this.getTotalApprovedDays();
    const pendingDays = this.getTotalPendingDays();

    return (
      <Modal closeModal={closeModal}>
        <StyleContainer>
          <div>
            <h2>
              {user.forename} {user.surname}
            </h2>
            <p>{user.email}</p>
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
}

export default UserModal;
