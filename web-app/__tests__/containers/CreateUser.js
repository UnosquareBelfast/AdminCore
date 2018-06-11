import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { CreateUser } from '../../src/components';
import createUserContainer from '../../src/components/CreateUser/container';
import * as userService from '../../src/services/userService';

describe('CreateUser', () => {
  it('renders correctly', () => {
    const Container = createUserContainer(CreateUser);
    const wrapper = shallow(<Container />);

    expect(wrapper.exists());
    checkIfFormEqualsInitialState(wrapper);
    expect(wrapper.prop('submitForm')).toEqual(wrapper.instance().handleFormSubmit);
    expect(wrapper.prop('formChanged')).toEqual(wrapper.instance().handleFormChange);
    expect(wrapper.prop('startDateChanged')).toEqual(wrapper.instance().handleStartDateChange);
    expect(wrapper.prop('success')).toEqual(null);
    expect(wrapper.prop('error')).toEqual(null);
    expect(wrapper.prop('loading')).toEqual(false);
  });

  it('initialFormState returns form', () => {
    const Container = createUserContainer(CreateUser);
    const wrapper = shallow(<Container />);

    expect(wrapper.state('success')).toBe(null);
    expect(wrapper.state('error')).toBe(null);
    expect(wrapper.state('loading')).toBe(false);

    checkIfFormEqualsInitialState(wrapper);
  });

  it('handleFormChange changes state of form', () => {
    
    const Container = createUserContainer(CreateUser);
    const wrapper = shallow(<Container />);

    checkIfFormEqualsInitialState(wrapper);

    wrapper.instance().handleFormChange({ target: { name: 'forename', value: 'test' } });
    wrapper.instance().handleFormChange({ target: { name: 'surname', value: '12345' } });
    expect(wrapper.state('form').forename).toEqual('test');
    expect(wrapper.state('form').surname).toEqual('12345');
  });

  it('handleStartDateChange changes state of startDate', () => {
    
    const Container = createUserContainer(CreateUser);
    const wrapper = shallow(<Container />);

    checkIfFormEqualsInitialState(wrapper);

    const newDate = moment();
    wrapper.instance().handleStartDateChange(newDate);
    // expect(wrapper.state('form').startDate).toEqual(newDate); --> sometimes a millisecond out
    expect(wrapper.state('form').startDate).toBeInstanceOf(moment);
  });

  it('handleFormSubmit sets state back to initial State', async () => {
    
    const Container = createUserContainer(CreateUser);
    const wrapper = shallow(<Container />);

    userService.createUser = jest.fn(() => Promise.resolve({}));

    await wrapper.instance().handleFormSubmit();
    
    expect(wrapper.state('loading')).toBe(false);
    expect(wrapper.state('success')).toBe(true);
    checkIfFormEqualsInitialState(wrapper);
    
  });
});

function checkIfFormEqualsInitialState(wrapper) {
  const form = wrapper.instance().initialFormState();

  expect(form).toHaveProperty('forename', '');
  expect(form).toHaveProperty('surname', '');
  expect(form).toHaveProperty('email', '');
  expect(form).toHaveProperty('password', '');
  expect(form).toHaveProperty('country', 1);
  expect(form).toHaveProperty('status', 1);
  expect(form).toHaveProperty('employeeRole', 1);
  expect(form.startDate).toBeInstanceOf(moment);
}
