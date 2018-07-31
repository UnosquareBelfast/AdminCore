import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { HolidayList, HolidayModal } from '../../components';
import { Container, Splitter } from './styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faIdCard,
  faArrowLeft,
} from '@fortawesome/fontawesome-free-solid';
import { roleText } from '../../utilities/roles';

export const User = props => {
  if (!props.profileUser) return null;
  const { profileHolidays, selectedHoliday, selectHoliday } = props;
  const { forename, surname, email, employeeRoleId } = props.profileUser;

  return (
    <Container>
      <HolidayModal
        holiday={selectedHoliday}
        closeModal={() => selectHoliday({})}
      />
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
          {email}
        </p>
        <p>
          <FontAwesomeIcon icon={faIdCard} />
          {roleText[employeeRoleId]}
        </p>
      </div>
      <Splitter />
      <div>
        <h2>Holidays</h2>
        <HolidayList
          holidays={profileHolidays}
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
};

User.defaultProps = {
  localUser: {},
  profileUser: {},
  profileHolidays: [],
};

export default container(User);
