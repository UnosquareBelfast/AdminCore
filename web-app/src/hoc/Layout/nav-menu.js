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

const NavMenu = ({
  history,
  isAuthenticated,
  menuItems,
  drawerIsOpen,
  closeDrawer,
}) => {
  const handleLogout = () => {
    Swal({
      title: 'Log out?',
      text: 'Are you sure you wish to log out?',
      type: 'question',
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

  const onMobileViewCloseDrawer = name => {
    var { innerWidth } = window;
    if (drawerIsOpen && innerWidth <= 768 && name !== 'Admin') {
      closeDrawer();
    }
  };

  const createTopLevelNavLinks = headerLink => {
    const exactCheck = headerLink.route === '/' ? true : false;
    return (
      <MenuItem
        key={headerLink.route}
        onClick={() => onMobileViewCloseDrawer(headerLink.name)}
      >
        <NavLink
          exact={exactCheck}
          to={headerLink.route}
          activeClassName="active"
        >
          <Icon className="h3">
            <Tooltip className="xsmall">{headerLink.tooltip}</Tooltip>
            <FontAwesomeIcon icon={headerLink.icon} />
          </Icon>
          <span>{headerLink.name}</span>
        </NavLink>
      </MenuItem>
    );
  };

  const createSubLevelNavLinks = sublink => {
    return (
      <MenuItem
        key={sublink.route}
        onClick={() => onMobileViewCloseDrawer(sublink.name)}
      >
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
          <Icon className="h3">
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
              <Icon className="h3">
                <Tooltip className="xsmall">Log out</Tooltip>
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
  drawerIsOpen: PT.bool,
  closeDrawer: PT.func,
  isAuthenticated: PT.bool,
  history: PT.object,
};

export default NavMenu;
