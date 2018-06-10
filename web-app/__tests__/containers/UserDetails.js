import React from 'react';
import { shallow } from 'enzyme';
import { UserDetails } from '../../src/components/UserDetails';
import userDetailsContainer from '../../src/components/UserDetails/container';

const user = { forename: 'First', surname: 'Last', employeeRoleDescription: 'Team Lead'};

describe('UserDetails Container', () => {
  it('renders correctly', () => {
    
    const Container = userDetailsContainer(UserDetails);
    const wrapper = shallow(<Container user={ user } />);
    
    expect(wrapper.exists());
    expect(wrapper.prop('user')).toEqual(user);
  }); 
});
