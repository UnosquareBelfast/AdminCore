import React from 'react';
import { shallow } from 'enzyme';
import loginContainer from '../../src/pages/Login/container';
import { Login } from '../../src/pages';
import * as createMemoryHistory from 'history/createMemoryHistory';
import Swal from 'sweetalert2';
jest.mock('../../src/services/userService');

const history = createMemoryHistory.default('/');

xdescribe('Login Container', () => {
  it('handleChange sets state to correct target', async () => {
    const Container = loginContainer(Login);
    const wrapper = shallow(<Container history={history} />);

    let event = { target: { name: 'fakeState', value: 'abcd' } };
    wrapper.instance().handleChange(event);

    expect(wrapper.state('fakeState')).toEqual('abcd');
  });

  it("pushes '/' to props.history", async () => {
    var historySpy = jest.spyOn(history, 'push');

    const Container = loginContainer(Login);
    const wrapper = shallow(<Container history={history} />);

    wrapper.setState({ email: 'test@test.com', password: 'pass' });

    await wrapper.instance().handleSubmit({ preventDefault: () => {} });
    expect(historySpy).toHaveBeenCalled();
  });

  it('calls Swal when userLogin returns with 404', async () => {
    const Container = loginContainer(Login);
    const wrapper = shallow(<Container history={history} />);

    wrapper.setState({ email: null, password: null });

    await wrapper.instance().handleSubmit({ preventDefault: () => {} });
    expect(Swal).toHaveBeenCalled(); //not working
  });
});
