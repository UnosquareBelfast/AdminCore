import React from 'react';
import Swal from 'sweetalert2';
import { PropTypes as PT } from 'prop-types';
import { userLogout } from '../../utilities/currentUser';
import roles from '../../utilities/roles';
import { HeaderContainer, HeaderContent, HeaderItem } from './styled';

const Header = ({user, history}) => {
  // TODO: Get email from JWT.

  const handleLogout = () => {
    Swal({
      title: 'Are you sure?',
      text: 'Do you wish to log out?',
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    })
      .then((signOut) => {
        console.log('value of signOut:', signOut);
        if (signOut.value === true) {    
          console.log('in userLogout block');
          userLogout();
          history.push('/login');
        }
      });
  };

  const navigate = (route) => {
    history.push(route);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderItem bold onClick={() => navigate('/')}>AdminCore</HeaderItem>
        {user && <div>
          <HeaderItem onClick={() => navigate('/')}>Home</HeaderItem>
          {user.employeeRoleId < roles.STANDARD &&
              <HeaderItem onClick={() => navigate('/settings')}>Settings</HeaderItem>
          }
          <HeaderItem onClick={handleLogout}>Log Out</HeaderItem>
        </div>}
      </HeaderContent>
    </HeaderContainer>
  );
};

Header.propTypes = {
  history: PT.object,
  user: PT.object,
};

export default Header;
