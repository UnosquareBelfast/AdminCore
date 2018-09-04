import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faClock,
  faSun,
} from '@fortawesome/fontawesome-free-solid';

export default {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  MANDATORY: 4,
};

export const statusText = [
  null,
  'Pending',
  'Approved',
  'Rejected',
  'Mandatory',
];

export const statusIcons = [
  null,
  <FontAwesomeIcon icon={faClock} />,
  <FontAwesomeIcon icon={faThumbsUp} />,
  <FontAwesomeIcon icon={faThumbsDown} />,
  <FontAwesomeIcon icon={faSun} />,
];
