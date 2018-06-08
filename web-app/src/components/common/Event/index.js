import React from 'react';
import { PropTypes as PT } from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import { Container } from './styled';

const Event = ({children, event}) => (
  <Container status={event.holidayStatusId} onClick={children.props.onClick}>
    {event.holidayStatusId === 4 && <FontAwesomeIcon icon={faHome}/>}
    {` ${event.employee.forename} ${event.employee.surname}`}
  </Container>
);

Event.propTypes = {
  children: PT.node,
  event: PT.object,
};

export default Event;
