import React from 'react';
import Swal from 'sweetalert2';
import { PropTypes as PT } from 'prop-types';
import { userLogout } from '../../utilities/currentUser';
import roles from '../../utilities/roles';
import { HeaderContainer, HeaderContent, HeaderItem } from './styled';

const Header = ({ userDetails, history }) => {
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

  const navigate = route => {
    history.push(route);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderItem bold onClick={() => navigate('/')}>
          AdminCore
        </HeaderItem>
        {userDetails && (
          <div>
            <HeaderItem onClick={() => navigate('/')}>Home</HeaderItem>
            {userDetails.employeeRoleId === roles.ADMIN && (
              <HeaderItem onClick={() => navigate('/admin')}>Admin</HeaderItem>
            )}
            <HeaderItem onClick={handleLogout}>Log Out</HeaderItem>
          </div>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

Header.propTypes = {
  history: PT.object,
  userDetails: PT.object,
};

export default Header;
