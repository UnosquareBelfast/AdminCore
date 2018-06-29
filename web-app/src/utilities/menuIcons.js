import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';

export default {
  BURGER: 1,
  LOGOUT: 2,
};

export const menuLinkIcons = [
  null,
  <FontAwesomeIcon icon={faBars} />,
  <FontAwesomeIcon icon={faSignOutAlt} />,
];
