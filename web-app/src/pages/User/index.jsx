import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Card } from '../../components/common';
import { HolidayList } from '../../components';
import { withAuth } from '../../hoc';
import { flowRight } from 'lodash';
import { Container, Splitter } from './styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faIdCard,
  faArrowLeft
} from '@fortawesome/fontawesome-free-solid';
import { roleText } from '../../utilities/roles';

export const User = props => {
  if (!props.profileUser) return null;
  const { profileHolidays } = props;
  const { forename, surname, email, employeeRoleId } = props.profileUser;

  return (
    <Container>
      <Card>
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
            actions={['approve', 'reject']}
          />
        </div>
      </Card>
    </Container>
  );
};

User.propTypes = {
  localUser: PT.object,
  profileUser: PT.object,
  profileHolidays: PT.array,
  history: PT.object
};

const enhance = flowRight(
  withAuth,
  container
);
export default enhance(User);
