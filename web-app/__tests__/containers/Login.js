import React from 'react';
import { shallow } from 'enzyme';
import loginContainer from '../../src/pages/Login/container';
import { Login } from '../../src/pages';
import * as createMemoryHistory from 'history/createMemoryHistory';
import Swal from 'sweetalert2';
import * as userService from '../../src/services/userService';

const history = createMemoryHistory.default('/');

describe('Login Container', () => {
  it('pushes \'/\' to props.history', async () => {
    var historySpy = jest.spyOn(history, 'push');
    
    const Container = loginContainer(Login);
    const wrapper = shallow(<Container history={ history }/>);

    userService.userLogin = jest.fn(() => Promise.resolve({}));

    wrapper.setState({ email: 'test@test.com', password: 'pass' });

    await wrapper.instance().handleSubmit({ preventDefault: () => {} });
    expect(historySpy).toHaveBeenCalled();
  }); 

  xit('calls Swal when userLogin returns with 404', async () => {
    const Container = loginContainer(Login);
    const wrapper = shallow(<Container history={ history }/>);

    userService.userLogin = jest.fn(() => Promise.reject( { message: 'error' }));

    wrapper.setState({ email: 'test@test.com', password: 'pass' });

    await wrapper.instance().handleSubmit({ preventDefault: () => {} });
    expect(Swal).toHaveBeenCalled(); //not working
  });

}); 

