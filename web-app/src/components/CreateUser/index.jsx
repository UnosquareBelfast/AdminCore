import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Container } from './styled';
import container from './container';
import { Card, Button, Errorbox } from '../common';
import DatePicker from 'react-datepicker';

export const CreateUser = props => {
  const {
    formData,
    submitForm,
    formChanged,
    startDateChanged,
    error,
    success,
    loading,
  } = props;
  const {
    forename,
    surname,
    email,
    password,
    country,
    employeeRole,
    startDate,
  } = formData;

  return (
    <Card>
      <Container>
        <h3>Create Employee</h3>
        <form autoComplete="off">
          <label id="forenameLbl">
            Forename:
            <input
              type="text"
              name="forename"
              value={forename}
              onChange={formChanged}
              disabled={loading}
            />
          </label>
          <label id="surnameLbl">
            Surname:
            <input
              type="text"
              name="surname"
              value={surname}
              onChange={formChanged}
              disabled={loading}
            />
          </label>
          <label id="emailLbl">
            Email:
            <input
              type="text"
              name="email"
              value={email}
              onChange={formChanged}
              disabled={loading}
            />
          </label>
          <label id="passwordLbl">
            Password:
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={formChanged}
              disabled={loading}
            />
          </label>
          <label id="countryLbl">
            Country:
            <select
              name="country"
              value={country}
              onChange={formChanged}
              disabled={loading}
            >
              <option value={1}>Northern Ireland</option>
              <option value={2}>Mexico</option>
            </select>
          </label>
          <label id="roleLbl">
            Role:
            <select
              name="employeeRole"
              value={employeeRole}
              onChange={formChanged}
              disabled={loading}
            >
              <option value={3}>Employee</option>
              <option value={1}>Team Leader</option>
              <option value={2}>System Admin</option>
            </select>
          </label>
          <label id="startDateLbl">
            Start Date:
            <DatePicker
              selected={startDate}
              onChange={startDateChanged}
              disabled={loading}
            />
          </label>
          <Button id="createUserBtn" label="Create User" onClick={submitForm} disabled={loading} />
        </form>
        <Errorbox id="errorCreateUser" error={error} label="Error creating user" />
        {success && <p id="userCreatedSuccess">User created successfully!</p>}
      </Container>
    </Card>
  );
};

CreateUser.propTypes = {
  formData: PT.object.isRequired,
  submitForm: PT.func,
  formChanged: PT.func,
  startDateChanged: PT.func,
  error: PT.object,
  success: PT.bool,
  loading: PT.bool,
};

export default container(CreateUser);
