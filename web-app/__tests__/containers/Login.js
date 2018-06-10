import React from 'react';
import { shallow } from 'enzyme';
import loginContainer from '../../src/pages/Login/container';
import { Login } from '../../src/pages';
import * as createMemoryHistory from 'history/createMemoryHistory';

import * as userService from '../../src/services/userService';
jest.mock('../../src/services/userService');
import Swal from 'sweetalert2';

const history = createMemoryHistory.default('/');

describe('Login Container', () => {
  xit('pushes \'/\' to props.history', () => {
    var historySpy = jest.spyOn(history, 'push');
    
    const Container = loginContainer(Login);
    const wrapper = shallow(<Container history={ history }/>);

    userService.userLogin = jest.fn();
    userService.userLogin.mockReturnValueOnce(Promise.resolve());

    wrapper.setState({ email: 'test@test.com', password: 'pass' });

    wrapper.instance().handleSubmit({ preventDefault: () => {} });
    expect(historySpy).toHaveBeenCalled();
  }); 

  xit('calls Swal when userLogin returns with 404', async () => {
  
    const Container = loginContainer(Login);
    const wrapper = shallow(<Container history={ history }/>);

    userService.userLogin = jest.fn().mockRejectedValue({ message: 'error'});
    // userService.userLogin.mockReturnValueOnce(Promise.reject({ message: 'error' }));

    wrapper.setState({ email: 'test@test.com', password: 'pass' });

    await wrapper.instance().logIn()
      .catch(() => {
        expect(Swal).toHaveBeenCalled();
        console.log("caught it.........");
      });
  });

}); 

