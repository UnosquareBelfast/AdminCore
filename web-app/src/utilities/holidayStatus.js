import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faClock,
  faHome,
  faProcedures,
} from '@fortawesome/fontawesome-free-solid';

export default {
  APPROVED: 1,
  PENDING: 2,
  REJECTED: 3,
  WFH: 4,
  SICK: 5,
};

export const statusText = [
  null,
  'Approved',
  'Pending',
  'Rejected',
  'Working Remotely',
  'Sick',
];

export const statusIcons = [
  null,
  <FontAwesomeIcon icon={faThumbsUp} />,
  <FontAwesomeIcon icon={faClock} />,
  <FontAwesomeIcon icon={faThumbsDown} />,
  <FontAwesomeIcon icon={faHome} />,
  <FontAwesomeIcon icon={faProcedures} />,
];
