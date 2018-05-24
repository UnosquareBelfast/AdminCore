import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { userLogout } from '../../utilities/currentUser';
import roles from '../../utilities/roles';
import { HeaderContainer, HeaderItem } from './styled';

const Header = ({user, history}) => {
  // TODO: Get email from JWT.

  const handleLogout = () => {
    userLogout();
    history.push('/login');
  };

  const navigate = (route) => {
    history.push(route);
  };

  return (
    <HeaderContainer>
      <HeaderItem bold onClick={() => navigate('/')}>AdminCore</HeaderItem>
      {user && <div>
        <HeaderItem onClick={() => navigate('/')}>Home</HeaderItem>
        {user.employeeRoleId < roles.STANDARD &&
              <HeaderItem onClick={() => navigate('/settings')}>Settings</HeaderItem>
        }
        <HeaderItem onClick={handleLogout}>Log Out</HeaderItem>
      </div>}
    </HeaderContainer>
  );
};

Header.propTypes = {
  history: PT.object,
  user: PT.object,
};

export default Header;
