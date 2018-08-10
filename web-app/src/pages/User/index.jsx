import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { DataTable, HolidayModal } from '../../components';
import HolidayCells from '../../components/DataTable/Cells/holidays';
import { Container, Splitter } from './styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faIdCard,
  faArrowLeft,
} from '@fortawesome/fontawesome-free-solid';
import { roleText } from '../../utilities/roles';
import { Email } from '../../components/common';

export const User = props => {
  if (!props.profileUser) return null;
  const { profileHolidays, selectedHoliday, selectHoliday, closeModal } = props;
  const { forename, surname, email, employeeRoleId } = props.profileUser;

  return (
    <Container>
      <HolidayModal holiday={selectedHoliday} closeModal={closeModal} />
      <div>
        <p className="return" onClick={props.history.goBack}>
          <FontAwesomeIcon icon={faArrowLeft} />Return
        </p>
      </div>
      <div>
        <h1>
          {forename} {surname}
        </h1>
        <p>
          <FontAwesomeIcon icon={faEnvelope} />
          <Email>{email}</Email>
        </p>
        <p>
          <FontAwesomeIcon icon={faIdCard} />
          {roleText[employeeRoleId]}
        </p>
      </div>
      <Splitter />
      <div>
        <h2>Holidays</h2>
        <DataTable
          data={profileHolidays}
          cells={HolidayCells}
          columns={['status', 'startDate', 'endDate', 'requestedDate']}
          onRowClick={holiday => selectHoliday(holiday)}
        />
      </div>
    </Container>
  );
};

User.propTypes = {
  localUser: PT.object,
  profileUser: PT.object,
  profileHolidays: PT.array,
  history: PT.object.isRequired,
  selectedHoliday: PT.object.isRequired,
  selectHoliday: PT.func.isRequired,
  closeModal: PT.func.isRequired,
};

User.defaultProps = {
  localUser: {},
  profileUser: {},
  profileHolidays: [],
};

export default container(User);
