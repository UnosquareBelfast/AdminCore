import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faClock,
  faHome,
  faProcedures,
  faPlane,
} from '@fortawesome/fontawesome-free-solid';

export default {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  WFH: 4,
  SICK: 5,
  WRT: 6,
};

export const statusText = [
  null,
  'Pending',
  'Approved',
  'Rejected',
  'Working remotely',
  'Sick',
  'Work related travel',
];

export const statusIcons = [
  null,
  <FontAwesomeIcon icon={faClock} />,
  <FontAwesomeIcon icon={faThumbsUp} />,
  <FontAwesomeIcon icon={faThumbsDown} />,
  <FontAwesomeIcon icon={faHome} />,
  <FontAwesomeIcon icon={faProcedures} />,
  <FontAwesomeIcon icon={faPlane} />,
];
