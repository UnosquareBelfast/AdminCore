import React from 'react';
import { shallow } from 'enzyme';
import { UserDetails } from '../../src/components/UserDetails';

const user = { forename: 'First', surname: 'Last', employeeRoleDescription: 'Team Lead'};

describe('UserDetails', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<UserDetails user={user} />);
    expect(wrapper.exists());
  });

  it('renders props', () => {
    const wrapper = shallow(<UserDetails user={user} />);
    expect(wrapper.children().length).toEqual(3);

    expect(wrapper.childAt(0).text()).toEqual('User Details');
    expect(wrapper.childAt(1).text()).toEqual(`Name: ${user.surname}, ${user.forename}`);
    expect(wrapper.childAt(2).text()).toEqual(`Role: ${user.employeeRoleDescription}`);
  });

});
