import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import { PropTypes as PT } from 'prop-types';
import { userLogout } from '../../utilities/currentUser';
import { NavLink } from 'react-router-dom';
import {
  HeaderContent,
  HeaderItem,
  SubSection,
  ToggleDrawer,
  Icon,
  Tooltip,
} from './styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import menuIcons, { menuLinkIcons } from '../../utilities/menuIcons';

const Header = ({ history, isAuthenticated, menuItems }) => {
  const { BURGER, LOGOUT } = menuIcons;

  const handleLogout = () => {
    Swal({
      title: 'Are you sure?',
      text: 'Do you wish to log out?',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
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
      <HeaderItem key={headerLink.route}>
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
      </HeaderItem>
    );
  };

  const createSubLevelNavLinks = sublink => {
    return (
      <HeaderItem key={sublink.route}>
        <NavLink to={sublink.route} exact activeClassName="active">
          {sublink.name}
        </NavLink>
      </HeaderItem>
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
          <SubSection
            className={
              history.location.pathname.indexOf('admin') != -1 ? 'active' : ''
            }
          >
            {subNavLinkItems}
          </SubSection>
        </Fragment>
      );
    } else {
      return headerLinkItems;
    }
  });

  return (
    <HeaderContent>
      <HeaderItem underline>
        <ToggleDrawer htmlFor="toggle-drawer">
          <Icon>{menuLinkIcons[BURGER]}</Icon> AdminCore
        </ToggleDrawer>
      </HeaderItem>
      {isAuthenticated && (
        <Fragment>
          {navlinks}
          <HeaderItem>
            <a onClick={handleLogout}>
              <Icon>
                <Tooltip>Log out</Tooltip>
                {menuLinkIcons[LOGOUT]}
              </Icon>{' '}
              Log Out
            </a>
          </HeaderItem>
        </Fragment>
      )}
    </HeaderContent>
  );
};

Header.propTypes = {
  menuItems: PT.array,
  isAuthenticated: PT.bool,
  history: PT.object,
};

export default Header;
