import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { LoginBG, LoginPanel } from './styled';
import container from './container';
import LoginForm from '../../components/LoginForm';

export const Login = ({ history }) => {
  return (
    <LoginBG>
      <LoginPanel>
        <h1>Welcome to Admin Core</h1>
        <LoginForm history={history} />
      </LoginPanel>
    </LoginBG>
  );
};

Login.propTypes = {
  history: PT.object.isRequired,
};

export default container(Login);
