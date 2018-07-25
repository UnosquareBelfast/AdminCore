import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { userLogout } from '../../utilities/currentUser';
import { NavLink } from 'react-router-dom';
import {
  Drawer,
  MenuItem,
  MenuItemSubSection,
  ToggleDrawerBtn,
  Icon,
  Tooltip,
} from './styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';
import Swal from 'sweetalert2';

const NavMenu = ({ history, isAuthenticated, menuItems }) => {
  const handleLogout = () => {
    Swal({
      title: 'Log out?',
      text: 'Are you sure you wish to log out?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'No, cancel',
    }).then(signOut => {
      if (signOut.value === true) {
        userLogout();
        history.push('/login');
      }
    });
  };

  const createTopLevelNavLinks = headerLink => {
    const exactCheck = headerLink.route === '/' ? true : false;
    return (
      <MenuItem key={headerLink.route}>
        <NavLink
          exact={exactCheck}
          to={headerLink.route}
          activeClassName="active"
        >
          <Icon>
            <Tooltip>{headerLink.tooltip}</Tooltip>
            <FontAwesomeIcon icon={headerLink.icon} />
          </Icon>{' '}
          {headerLink.name}
        </NavLink>
      </MenuItem>
    );
  };

  const createSubLevelNavLinks = sublink => {
    return (
      <MenuItem key={sublink.route}>
        <NavLink to={sublink.route} exact activeClassName="active">
          {sublink.name}
        </NavLink>
      </MenuItem>
    );
  };

  const navlinks = menuItems.map(headerLink => {
    const headerLinkItems = createTopLevelNavLinks(headerLink);

    if (headerLink.subnav) {
      const subNavLinkItems = headerLink.subnav.map(sublink => {
        return createSubLevelNavLinks(sublink);
      });

      return (
        <Fragment key="navlinks">
          {headerLinkItems}
          <MenuItemSubSection
            className={
              history.location.pathname.indexOf('admin') != -1 ? 'active' : ''
            }
          >
            {subNavLinkItems}
          </MenuItemSubSection>
        </Fragment>
      );
    } else {
      return headerLinkItems;
    }
  });

  return (
    <Drawer>
      <MenuItem underline>
        <ToggleDrawerBtn htmlFor="toggle-drawer">
          <Icon>
            <FontAwesomeIcon icon={faBars} />
          </Icon>{' '}
          AdminCore
        </ToggleDrawerBtn>
      </MenuItem>
      {isAuthenticated && (
        <Fragment>
          {navlinks}
          <MenuItem>
            <a onClick={handleLogout}>
              <Icon>
                <Tooltip>Log out</Tooltip>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Icon>{' '}
              Log Out
            </a>
          </MenuItem>
        </Fragment>
      )}
    </Drawer>
  );
};

NavMenu.propTypes = {
  menuItems: PT.array,
  isAuthenticated: PT.bool,
  history: PT.object,
};

export default NavMenu;
