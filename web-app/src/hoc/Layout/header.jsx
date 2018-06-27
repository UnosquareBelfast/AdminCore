import React from 'react';
import Swal from 'sweetalert2';
import { PropTypes as PT } from 'prop-types';
import { userLogout } from '../../utilities/currentUser';
//import roles from '../../utilities/roles';
import { NavLink } from 'react-router-dom';
import { HeaderContainer, HeaderContent, HeaderItem } from './styled';

const Header = props => {
  const handleLogout = () => {
    Swal({
      title: 'Are you sure?',
      text: 'Do you wish to log out?',
      buttons: true,
      dangerMode: true,
      showCancelButton: true
    }).then(signOut => {
      if (signOut.value === true) {
        userLogout();
        props.history.push('/login');
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
    <HeaderContainer>
      <HeaderContent>
        <HeaderItem bold>
          <NavLink to="/" activeClassName="logo">
            AdminCore
          </NavLink>
        </HeaderItem>
        {props.isAuthenticated && (
          <div>
            <HeaderItem>
              <NavLink to="/" exact activeClassName="active">
                Home
              </NavLink>
            </HeaderItem>
            <HeaderItem>
              <NavLink
                to="/admin/dashboard"
                isActive={inAdminSection}
                activeClassName="active"
              >
                Admin
              </NavLink>
            </HeaderItem>
            <HeaderItem>
              <a onClick={handleLogout}>Log Out</a>
            </HeaderItem>
          </div>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

Header.propTypes = {
  isAuthenticated: PT.bool,
  history: PT.object
};

export default Header;
