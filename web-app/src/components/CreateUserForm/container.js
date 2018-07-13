import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import employeeStatus from '../../utilities/employeeStatus';
import { createUser } from '../../services/userService';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      onSuccess: PT.func,
      onFailed: PT.func,
    };

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
      return createUser(formData)
        .then(() => {
          this.props.onSuccess();
        })
        .catch(error => {
          this.props.onFailed(error);
        });
    };

    render() {
      return (
        <Wrapped
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
