import React from 'react';
import { shallow } from 'enzyme';
import { Errorbox } from '../../src/components/common';

describe('ErrorBox', () => {
  it('renders correctly when passed props', () => {
    const wrapper = shallow(<Errorbox 
      label="error label"
      error={{ message: 'error here' }} />);

    expect(wrapper.exists());
    expect(wrapper.children().length).toEqual(2);
    expect(wrapper.find('strong').text()).toEqual('error label');
    expect(wrapper.find('p').at(1).text()).toEqual('error here');
  });
  it('renders correctly when not passed label prop', () => {
    const wrapper = shallow(<Errorbox 
      error={{ message: 'error here' }} />);

    expect(wrapper.exists());
    expect(wrapper.children().length).toEqual(2);
    expect(wrapper.find('strong').text()).toEqual('Error');
    expect(wrapper.find('p').at(1).text()).toEqual('error here');
  });



});
