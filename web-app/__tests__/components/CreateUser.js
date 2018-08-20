import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { CreateUser } from '../../src/components/CreateUser/index';

const formData = {
  forename: '',
  surname: '',
  email: 'email@email.com',
  password: 'password',
  country: 'Northern Ireland',
  employeeRole: 'Admin',
  startDate: moment('2018-01-01 09:00:00'),
  endDate: moment('2018-01-02 09:00:00'),
};

xdescribe('CreateUser', () => {
  it('renders correctly', () => {
    const formChanged = jest.fn();
    const startDateChanged = jest.fn();
    const submitForm = jest.fn();

    const wrapper = shallow(
      <CreateUser
        formData={formData}
        formChanged={formChanged}
        startDateChanged={startDateChanged}
        error={null}
        loading={false}
        submitForm={submitForm}
      />,
    );

    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly when error is passed in and success is true', () => {
    const formChanged = jest.fn();
    const startDateChanged = jest.fn();
    const submitForm = jest.fn();

    const wrapper = shallow(
      <CreateUser
        formData={formData}
        formChanged={formChanged}
        startDateChanged={startDateChanged}
        error={{}}
        success
        submitForm={submitForm}
      />,
    );

    expect(wrapper.find('#userCreatedSuccess').exists()).toBe(true);
    expect(wrapper.find('#errorCreateUser').exists()).toBe(true);
  });
  it('all fields are disabled when loading is true', () => {
    const formChanged = jest.fn();
    const startDateChanged = jest.fn();
    const submitForm = jest.fn();

    const wrapper = shallow(
      <CreateUser
        formData={formData}
        formChanged={formChanged}
        startDateChanged={startDateChanged}
        error={{}}
        success
        loading
        submitForm={submitForm}
      />,
    );

    wrapper.find('input').forEach(node => {
      expect(node.prop('disabled')).toBe(true);
    });
    wrapper.find('select').forEach(node => {
      expect(node.prop('disabled')).toBe(true);
    });
  });
});
