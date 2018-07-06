import React, { Component } from 'react';
import moment from 'moment';
import employeeStatus from '../../utilities/employeeStatus';
import { createUser } from '../../services/userService';

import {
  getFormElementsArray,
  updateFormDataOnChange,
  isFormValidOnChange,
  getFormDataOnSubmit,
} from '../../utilities/forms';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        form: this.initialFormState(),
        formIsValid: false,
        success: null,
        error: null,
        loading: false,
      };
    }

    initialFormState() {
      return {
        forename: {
          label: 'Forename:',
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter your forename',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        surname: {
          label: 'Surname:',
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter your surname',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        email: {
          label: 'Email:',
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Enter your email address',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          label: 'Password:',
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Enter a password',
          },
          value: '',
          validation: {
            required: true,
            minLength: 6,
          },
          valid: false,
          touched: false,
        },
        country: {
          label: 'Country:',
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 1, displayValue: 'Northern Ireland' },
              { value: 2, displayValue: 'Mexico' },
            ],
          },
          value: 1,
          validation: {},
          valid: true,
        },
        status: {
          //TODO Create enum file employeeStatus.ACTIVE
          label: 'Status:',
          elementType: 'select',
          elementConfig: {
            options: [
              { value: employeeStatus.ACTIVE, displayValue: 'Active' },
              { value: employeeStatus.INACTIVE, displayValue: 'Inactive' },
            ],
          },
          value: 1,
          validation: {},
          valid: true,
        },
        employeeRole: {
          label: 'Employee Role:',
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 1, displayValue: 'Team Leader' },
              { value: 2, displayValue: 'System Admin' },
              { value: 3, displayValue: 'Employee' },
            ],
          },
          value: 3,
          validation: {},
          valid: true,
        },
        startDate: {
          label: 'Start Date:',
          elementType: 'date',
          elementConfig: {
            type: 'text',
            placeholder: 'Enter a start date',
          },
          value: moment(),
          validation: {},
          valid: true,
        },
      };
    }

    handleFormChange = (event, inputIdentifier) => {
      const inputValue =
        inputIdentifier !== 'startDate' ? event.target.value : event;

      const updatedForm = updateFormDataOnChange(
        this.state.form,
        inputIdentifier,
        inputValue,
      );

      let formIsValid = isFormValidOnChange(updatedForm);
      this.setState({ form: updatedForm, formIsValid: formIsValid });
    };

    handleFormSubmit = e => {
      e.preventDefault();
      const formData = getFormDataOnSubmit(this.state.form);

      formData.startDate = formData.startDate.toISOString();
      this.setState({ loading: true });
      return createUser(formData)
        .then(() => {
          this.setState({
            loading: false,
            success: true,
            form: this.initialFormState(),
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    };

    render() {
      return (
        <Wrapped
          formElementsArray={getFormElementsArray(this.state.form)}
          formIsValid={this.state.formIsValid}
          submitForm={this.handleFormSubmit}
          formChanged={(event, id) => this.handleFormChange(event, id)}
          success={this.state.success}
          error={this.state.error}
          loading={this.state.loading}
        />
      );
    }
  };
