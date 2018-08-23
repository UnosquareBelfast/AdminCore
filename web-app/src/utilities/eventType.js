import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faHome,
  faProcedures,
  faPlane,
} from '@fortawesome/fontawesome-free-solid';

export default {
  WFH: 2,
  SICK: 3,
  WRT: 4,
};

export const typeText = [
  null,
  'Annual Leave',
  'Working from home',
  'Sick',
  'Work related travel',
];

export const typeIcons = [
  null,
  null,
  <FontAwesomeIcon icon={faHome} />,
  <FontAwesomeIcon icon={faProcedures} />,
  <FontAwesomeIcon icon={faPlane} />,
];
