import React from 'react';
import { PropTypes as PT } from 'prop-types';
import LoginService from '../../pages/Login/LoginService';
import roles from '../../utilities/roles';
import { HeaderContainer, HeaderItem } from './styled';

class Header extends React.Component {
  static propTypes = {
    history: PT.object,
    user: PT.object,
  }

  constructor(props) {
    super(props);
    this.Auth = new LoginService();
  }

  // TODO: Get email from JWT.

  handleLogout = () => {
    this.Auth.logout();
    this.props.history.push('/login');
  }

  navigate = (route) => {
    this.props.history.push(route);
  }

  render() {
    const { user } = this.props;

    return (
      <HeaderContainer>
        <HeaderItem bold onClick={() => this.navigate('/')}>AdminCore</HeaderItem>
        <div>
          <HeaderItem onClick={() => this.navigate('/')}>Home</HeaderItem>
          {user.employeeRoleId < roles.STANDARD &&
            <HeaderItem onClick={() => this.navigate('/settings')}>Settings</HeaderItem>
          }
          <HeaderItem onClick={this.handleLogout}>Log Out</HeaderItem>
        </div>
      </HeaderContainer>
    );
  }
}

export default Header;
