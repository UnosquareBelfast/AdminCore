import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '../../src/components/common';

describe('Button', () => {
  it('renders correctly', () => { 

    const obj = { onButtonClick : () => {} };
    const spy = jest.spyOn(obj, 'onButtonClick');

    const wrapper = shallow(<Button id="button" label="Button" onClick={obj.onButtonClick}/>);    
    
    wrapper.find('#button').simulate('click');
    expect(spy).toHaveBeenCalled();

    expect(wrapper.exists());
    expect(wrapper.children().length).toEqual(1);
    expect(wrapper.children().text()).toEqual('Button');
  });



});
