import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Card, HolidayList } from '../../components/common';
import { Layout, withAuth } from '../../hoc';
import { flowRight } from 'lodash';
import { Container, Splitter} from './styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEnvelope, faIdCard } from '@fortawesome/fontawesome-free-solid';
import { roleText } from '../../utilities/roles';

export const User = (props) => {
  if (!props.profileUser) return null;
  const {profileHolidays} = props;
  const { forename, surname, email, employeeRoleId } = props.profileUser;

  return <Layout {...props}>
    <Container>
      <Card>
        <div>
          <h1>{forename} {surname}</h1>
          <p><FontAwesomeIcon icon={faEnvelope}/>{email}</p>
          <p><FontAwesomeIcon icon={faIdCard}/>{roleText[employeeRoleId]}</p>
        </div>
        <Splitter />
        <div>
          <h2>Holidays</h2>
          <HolidayList
            holidays={profileHolidays}
            columns={['status','date', 'created']}
            actions={['approve', 'reject']}
          />
        </div>
      </Card>
    </Container>
  </Layout>;
};

User.propTypes = {
  localUser: PT.object,
  profileUser: PT.object,
  profileHolidays: PT.array,
};

const enhance = flowRight(
  withAuth,
  container,
);
export default enhance(User);
