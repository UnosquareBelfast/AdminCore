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
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  WFH: 4,
  SICK: 5,
};

export const statusText = [
  null,
  'Pending',
  'Approved',
  'Rejected',
  'Working from home',
  'Sick',
];

export const statusIcons = [
  null,
  <FontAwesomeIcon icon={faClock} />,
  <FontAwesomeIcon icon={faThumbsUp} />,
  <FontAwesomeIcon icon={faThumbsDown} />,
  <FontAwesomeIcon icon={faHome} />,
  <FontAwesomeIcon icon={faProcedures} />,
];
