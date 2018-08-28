import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/fontawesome-free-solid';

export default {
  PERSONNAL_EVENTS: 1,
  TEAM_EVENTS: 2,
};

export const eventsViewText = [null, 'Your Events', 'Team Events'];

export const eventsViewIcons = [
  null,
  <FontAwesomeIcon icon={faUser} />,
  <FontAwesomeIcon icon={faUsers} />,
];
