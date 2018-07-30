import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faClock,
  faHome,
  faProcedures,
  faPlane,
  faSun,
} from '@fortawesome/fontawesome-free-solid';

export default {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  MANDATORY: 4,
  WFH: 5,
  WRT: 6,
  SICK: 7,
};

export const statusText = [
  null,
  'Pending',
  'Approved',
  'Rejected',
  'Mandatory',
  'Working remotely',
  'Work related travel',
  'Sick',
];

export const statusIcons = [
  null,
  <FontAwesomeIcon icon={faClock} />,
  <FontAwesomeIcon icon={faThumbsUp} />,
  <FontAwesomeIcon icon={faThumbsDown} />,
  <FontAwesomeIcon icon={faSun} />,
  <FontAwesomeIcon icon={faHome} />,
  <FontAwesomeIcon icon={faPlane} />,
  <FontAwesomeIcon icon={faProcedures} />,
];
