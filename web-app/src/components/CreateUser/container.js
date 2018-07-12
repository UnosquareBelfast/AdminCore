import React, { Component } from 'react';
import moment from 'moment';
import employeeStatus from '../../utilities/employeeStatus';
import { createUser } from '../../services/userService';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        formData: {
          forename: '',
          surname: '',
          email: '',
          password: '',
          country: 1,
          status: employeeStatus.ACTIVE,
          employeeRole: 3,
          startDate: moment(),
        },
        formIsValid: false,
        success: null,
        error: null,
        loading: false,
      };
    }

    handleFormStatus(name, value, formIsValid) {
      const updatedFormData = { ...this.state.formData };
      updatedFormData[name] = value;
      this.setState({
        formData: updatedFormData,
        formIsValid,
      });
    }

    handleFormSubmit = event => {
      event.preventDefault();
      const formData = { ...this.state.formData };
      formData.startDate = formData.startDate.toISOString();
      this.setState({ loading: true });
      return createUser(formData)
        .then(() => {
          this.setState({
            loading: false,
            success: true,
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    };

    render() {
      return (
        <Wrapped
          success={this.state.success}
          error={this.state.error}
          loading={this.state.loading}
          formData={this.state.formData}
          formIsValid={this.state.formIsValid}
          formStatus={(name, value, formIsValid) =>
            this.handleFormStatus(name, value, formIsValid)
          }
          submitForm={e => this.handleFormSubmit(e)}
        />
      );
    }
  };
