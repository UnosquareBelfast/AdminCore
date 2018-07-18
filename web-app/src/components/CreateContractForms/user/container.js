import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { getUserByName } from '../../../services/userService';

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
          userFullName: '',
          selectedUserId: -1,
        },
        formIsValid: false,
        foundUsers: [],
        error: false,
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

      return this.props.onSuccess(formData);
    };

    handleUserSearch = event => {
      event.preventDefault();
      const fullname = this.state.formData.userFullName.split(' ');
      const forename = fullname[0];
      const surname = fullname[1];

      getUserByName(forename, surname)
        .then(response => {
          const users = response.data;
          const usersFormatted = users.reduce((acc, user) => {
            acc.push({
              value: parseInt(user.employeeId),
              displayValue: `${user.forename} ${user.surname} (${user.email})`,
            });
            return acc;
          }, []);
          this.setState({
            error: false,
            foundUsers: usersFormatted,
            formData: {
              ...this.state.formData,
              selectedUserId: usersFormatted[0].value,
            },
          });
        })
        .catch(() => {
          this.setState({ error: true });
        });
    };

    handleFormReset = event => {
      event.preventDefault();
      this.setState({
        formData: {
          userFullName: '',
          selectedUserId: -1,
        },
        formIsValid: false,
        foundUsers: [],
        error: false,
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
          searchUser={e => this.handleUserSearch(e)}
          resetForm={e => this.handleFormReset(e)}
          users={this.state.foundUsers}
          error={this.state.error}
        />
      );
    }
  };
