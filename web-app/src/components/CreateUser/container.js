import React, { Component } from 'react';
import moment from 'moment';
import employeeStatus from '../../utilities/employeeStatus';
import { createUser } from '../../services/userService';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        form: this.initialFormState(),
        success: null,
        error: null,
        loading: false,
      };
    }

    initialFormState() {
      return {
        forename: '',
        surname: '',
        email: '',
        password: '',
        country: 1,
        status: employeeStatus.ACTIVE, //TODO Create enum file
        employeeRole: 1,
        startDate: moment(),
      };
    }

    handleFormChange = event => {
      const { name, value } = event.target;
      this.setState({ form: { ...this.state.form, [name]: value } });
    };

    handleStartDateChange = date => {
      this.setState({ form: { ...this.state.form, startDate: date } });
    };

    handleFormSubmit = () => {
      const data = { ...this.state.form };
      data.startDate = data.startDate.toISOString();
      this.setState({ loading: true });
      createUser(data)
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
          formData={this.state.form}
          submitForm={this.handleFormSubmit}
          formChanged={this.handleFormChange}
          startDateChanged={this.handleStartDateChange}
          success={this.state.success}
          error={this.state.error}
          loading={this.state.loading}
        />
      );
    }
  };
