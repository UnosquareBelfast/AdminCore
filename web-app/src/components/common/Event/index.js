import React from 'react';
import { PropTypes as PT } from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHome, faPlane } from '@fortawesome/fontawesome-free-solid';
import { Container } from './styled';

const Event = ({children, event}) => (
  <Container status={event.holidayStatusId} onClick={children.props.onClick}>
    {event.holidayStatusId === 4 && <FontAwesomeIcon icon={faHome}/>}
    {/* {event.holidayStatusId === remote && <FontAwesomeIcon icon={faPlane}/>} */}
    {` ${event.employee.forename} ${event.employee.surname}`}
  </Container>
);

Event.propTypes = {
  children: PT.node,
  event: PT.object,
};

export default Event;
