import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Modal, Button } from '../../components/common';
import { StyleContainer, Stat, StatWrap, ButtonWrap } from './styled';
import { isEmpty } from 'lodash';
import { getEventDayAmount } from '../../utilities/dates';
import { statusText } from '../../utilities/holidayStatus';

class HolidayModal extends Component {
  static propTypes = {
    user: PT.object,
    closeModal: PT.func.isRequired,
    holiday: PT.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { closeModal, holiday } = this.props;

    if (isEmpty(holiday)) return null;

    const { start, end, employee, eventStatus } = holiday;
    const { forename, surname, email } = employee;

    const duration = getEventDayAmount(holiday);
    console.log(holiday);

    return (
      <Modal closeModal={closeModal}>
        <StyleContainer>
          <div>
            <h2>Manage Holiday</h2>
            <p>
              {forename} {surname} - {email}
            </p>
          </div>
          <StatWrap>
            <Stat>
              <h2 className={status}>
                {statusText[eventStatus.eventStatusId]}
              </h2>
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
          <ButtonWrap>
            <Button label="Approve" onClick={() => {}} />
            <Button label="Reject" onClick={() => {}} />
          </ButtonWrap>
        </StyleContainer>
      </Modal>
    );
  }
}

export default HolidayModal;
