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
  startDate: moment(),
  endDate: moment(),
};

describe('BookingModal', () => {
  it('renders correctly', () => {
    const formChanged = jest.fn();
    const startDateChanged = jest.fn();
    const submitForm = jest.fn();

    const wrapper = shallow(<CreateUser 
      formData={formData}
      formChanged={formChanged}
      startDateChanged={startDateChanged}
      error={null}
      loading={false}
      submitForm={ submitForm }/>);

    //Forename
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('#forenameLbl').text()).toEqual('Forename:');
    expect(wrapper.find('#forenameLbl').childAt(1).type()).toEqual('input');        
    expect(wrapper.find('#forenameLbl').childAt(1).prop('type')).toEqual('text');
    expect(wrapper.find('#forenameLbl').childAt(1).prop('name')).toEqual('forename');
    expect(wrapper.find('#forenameLbl').childAt(1).prop('value')).toEqual(formData.forename);
    expect(wrapper.find('#forenameLbl').childAt(1).prop('onChange')).toEqual(formChanged);
    expect(wrapper.find('#forenameLbl').childAt(1).prop('disabled')).toEqual(false);

    //Surname
    expect(wrapper.find('#surnameLbl').text()).toEqual('Surname:');
    expect(wrapper.find('#surnameLbl').childAt(1).type()).toEqual('input');        
    expect(wrapper.find('#surnameLbl').childAt(1).prop('type')).toEqual('text');
    expect(wrapper.find('#surnameLbl').childAt(1).prop('name')).toEqual('surname');
    expect(wrapper.find('#surnameLbl').childAt(1).prop('value')).toEqual(formData.surname);
    expect(wrapper.find('#surnameLbl').childAt(1).prop('onChange')).toEqual(formChanged);
    expect(wrapper.find('#surnameLbl').childAt(1).prop('disabled')).toEqual(false);

    //Email
    expect(wrapper.find('#emailLbl').text()).toEqual('Email:');
    expect(wrapper.find('#emailLbl').childAt(1).type()).toEqual('input');        
    expect(wrapper.find('#emailLbl').childAt(1).prop('type')).toEqual('text');
    expect(wrapper.find('#emailLbl').childAt(1).prop('name')).toEqual('email');
    expect(wrapper.find('#emailLbl').childAt(1).prop('value')).toEqual(formData.email);
    expect(wrapper.find('#emailLbl').childAt(1).prop('onChange')).toEqual(formChanged);
    expect(wrapper.find('#emailLbl').childAt(1).prop('disabled')).toEqual(false);

    //Password
    expect(wrapper.find('#passwordLbl').text()).toEqual('Password:');
    expect(wrapper.find('#passwordLbl').childAt(1).type()).toEqual('input');    
    expect(wrapper.find('#passwordLbl').childAt(1).prop('type')).toEqual('password');
    expect(wrapper.find('#passwordLbl').childAt(1).prop('name')).toEqual('password');
    expect(wrapper.find('#passwordLbl').childAt(1).prop('value')).toEqual(formData.password);
    expect(wrapper.find('#passwordLbl').childAt(1).prop('autoComplete')).toEqual('new-password');
    expect(wrapper.find('#passwordLbl').childAt(1).prop('onChange')).toEqual(formChanged);
    expect(wrapper.find('#passwordLbl').childAt(1).prop('disabled')).toEqual(false);

    //Country
    expect(wrapper.find('#countryLbl').childAt(1).type()).toEqual('select');
    expect(wrapper.find('#countryLbl').childAt(1).prop('value')).toEqual(formData.country);

    expect(wrapper.find('#countryLbl').childAt(1).childAt(0).type()).toEqual('option');
    expect(wrapper.find('#countryLbl').childAt(1).childAt(0).prop('value')).toEqual(1);
    expect(wrapper.find('#countryLbl').childAt(1).childAt(0).text()).toEqual('Northern Ireland');
    expect(wrapper.find('#countryLbl').childAt(1).childAt(1).type()).toEqual('option');
    expect(wrapper.find('#countryLbl').childAt(1).childAt(1).prop('value')).toEqual(2);
    expect(wrapper.find('#countryLbl').childAt(1).childAt(1).text()).toEqual('Mexico');
    
    //Role
    expect(wrapper.find('#roleLbl').childAt(1).type()).toEqual('select');
    expect(wrapper.find('#roleLbl').childAt(1).prop('value')).toEqual(formData.employeeRole);
    expect(wrapper.find('#roleLbl').childAt(1).prop('onChange')).toEqual(formChanged);
    expect(wrapper.find('#roleLbl').childAt(1).prop('disabled')).toBe(false);

    expect(wrapper.find('#roleLbl').childAt(1).childAt(0).type()).toEqual('option');
    expect(wrapper.find('#roleLbl').childAt(1).childAt(0).prop('value')).toEqual(3);
    expect(wrapper.find('#roleLbl').childAt(1).childAt(0).text()).toEqual('Employee');
    expect(wrapper.find('#roleLbl').childAt(1).childAt(1).type()).toEqual('option');
    expect(wrapper.find('#roleLbl').childAt(1).childAt(1).prop('value')).toEqual(1);
    expect(wrapper.find('#roleLbl').childAt(1).childAt(1).text()).toEqual('Team Leader');
    expect(wrapper.find('#roleLbl').childAt(1).childAt(2).type()).toEqual('option');
    expect(wrapper.find('#roleLbl').childAt(1).childAt(2).prop('value')).toEqual(2);
    expect(wrapper.find('#roleLbl').childAt(1).childAt(2).text()).toEqual('System Admin');

    //Start Date
    const text = wrapper.find('#startDateLbl').text().includes('Start Date:');
    expect(text).toBe(true);    
    expect(wrapper.find('#startDateLbl').childAt(1).prop('selected')).toEqual(formData.startDate);
    expect(wrapper.find('#startDateLbl').childAt(1).prop('onChange')).toEqual(startDateChanged);
    expect(wrapper.find('#startDateLbl').childAt(1).prop('disabled')).toEqual(false);

    expect(wrapper.find('#createUserBtn').exists()).toBe(true);
    expect(wrapper.find('#createUserBtn').prop('label')).toEqual('Create User');
    expect(wrapper.find('#createUserBtn').prop('onClick')).toEqual(submitForm);
    expect(wrapper.find('#createUserBtn').prop('disabled')).toBe(false);

    expect(wrapper.find('#userCreatedSuccess').exists()).toBe(false);
    expect(wrapper.find('#errorCreateUser').exists()).toBe(true);

  });
  it('renders correctly when error is passed in and success is true', () => {
    const formChanged = jest.fn();
    const startDateChanged = jest.fn();
    const submitForm = jest.fn();

    const wrapper = shallow(<CreateUser 
      formData={formData}
      formChanged={formChanged}
      startDateChanged={startDateChanged}
      error={ {} }
      success
      submitForm={ submitForm }/>);

    expect(wrapper.find('#userCreatedSuccess').exists()).toBe(true);
    expect(wrapper.find('#errorCreateUser').exists()).toBe(true);
  });
  it('all fields are disabled when loading is true', () => {
    const formChanged = jest.fn();
    const startDateChanged = jest.fn();
    const submitForm = jest.fn();

    const wrapper = shallow(<CreateUser 
      formData={formData}
      formChanged={formChanged}
      startDateChanged={startDateChanged}
      error={ {} }
      success
      loading
      submitForm={ submitForm }/>);

    wrapper.find('input').forEach((node) => {
      expect(node.prop('disabled')).toBe(true);
    });
    wrapper.find('select').forEach((node) => {
      expect(node.prop('disabled')).toBe(true);
    });
  });
});
