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
import {
  faUser,
  faBars,
  faTachometerAlt,
  faUnlockAlt,
  faSignOutAlt,
} from '@fortawesome/fontawesome-free-solid';

const Header = ({ history, isAuthenticated }) => {
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

  const inAdminSection = (match, location) => {
    const { pathname } = location;
    if (pathname.indexOf('admin') != -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <HeaderContent>
      <HeaderItem underline>
        <ToggleDrawer htmlFor="toggle-drawer">
          <Icon>
            <FontAwesomeIcon icon={faBars} />
          </Icon>{' '}
          AdminCore
        </ToggleDrawer>
      </HeaderItem>
      {isAuthenticated && (
        <Fragment>
          <HeaderItem>
            <NavLink to="/propfile" exact activeClassName="active">
              <Icon>
                <Tooltip>Go to profile</Tooltip>
                <FontAwesomeIcon icon={faUser} />
              </Icon>{' '}
              Profile
            </NavLink>
          </HeaderItem>
          <HeaderItem>
            <NavLink to="/" exact activeClassName="active">
              <Icon>
                <Tooltip>Go to dashboard</Tooltip>
                <FontAwesomeIcon icon={faTachometerAlt} />
              </Icon>{' '}
              Dashboard
            </NavLink>
          </HeaderItem>
          <HeaderItem>
            <NavLink
              to="/admin/dashboard"
              isActive={inAdminSection}
              activeClassName="active"
            >
              <Icon>
                <Tooltip>Go to admin</Tooltip>
                <FontAwesomeIcon icon={faUnlockAlt} />
              </Icon>{' '}
              Admin
            </NavLink>
          </HeaderItem>
          <SubSection
            className={
              history.location.pathname.indexOf('admin') != -1 ? 'active' : ''
            }
          >
            <HeaderItem>
              <NavLink to="/admin/employees" exact activeClassName="active">
                Employees
              </NavLink>
            </HeaderItem>
            <HeaderItem>
              <NavLink to="/admin/holidays" exact activeClassName="active">
                Holidays
              </NavLink>
            </HeaderItem>
            <HeaderItem>
              <NavLink
                to="/admin/pendingHolidays"
                exact
                activeClassName="active"
              >
                Pending Holidays
              </NavLink>
            </HeaderItem>
            <HeaderItem>
              <NavLink to="/admin/clients" exact activeClassName="active">
                Clients
              </NavLink>
            </HeaderItem>
            <HeaderItem>
              <NavLink to="/admin/contracts" exact activeClassName="active">
                Contracts
              </NavLink>
            </HeaderItem>
          </SubSection>
          <HeaderItem>
            <a onClick={handleLogout}>
              <Icon>
                <Tooltip>Log out</Tooltip>
                <FontAwesomeIcon icon={faSignOutAlt} />
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
  isAuthenticated: PT.bool,
  history: PT.object,
};

export default Header;
