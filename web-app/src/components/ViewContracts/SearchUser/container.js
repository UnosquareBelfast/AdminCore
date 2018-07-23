import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { getUserByName } from '../../../services/userService';
import { getContractsByEmployeeId } from '../../../services/contractService';
import swal from 'sweetalert2';

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
          fullName: '',
          selectedUserId: -1,
        },
        users: [],
        formIsValid: false,
      };
    }

    componentDidUpdate(prevProps, prevState) {
      const oldSelectedUser = prevState.formData.selectedUserId;
      const newSelectedUser = this.state.formData.selectedUserId;

      if (oldSelectedUser !== newSelectedUser) {
        this.getContracts();
      }
    }

    handleFormStatus(name, value, formIsValid) {
      const updatedFormData = { ...this.state.formData };
      updatedFormData[name] = value;
      this.setState({
        formData: updatedFormData,
        formIsValid,
      });
    }

    getUsers = () => {
      const fullName = this.state.formData.fullName.split(' ');
      const forename = fullName[0];
      const surname = fullName[1];
      getUserByName(forename, surname).then(response => {
        const users = response.data;
        const formattedUsers = users.reduce((acc, user) => {
          acc.push({
            value: user.employeeId,
            displayValue: `${user.forename} ${user.surname} (${user.email})`,
          });
          return acc;
        }, []);
        this.setState(
          {
            users: formattedUsers,
            formData: {
              ...this.state.formData,
              selectedUserId: formattedUsers[0].value,
            },
          },
          this.getContracts
        );
      });
    };

    getContracts = () => {
      const userId = this.state.formData.selectedUserId;

      getContractsByEmployeeId(userId)
        .then(response => {
          const contracts = response.data;
          this.props.onSuccess(contracts);
        })
        .catch(error =>
          swal('Error'`Error finding contracts: ${error.message}`, 'error')
        );
    };

    handleFormSubmit = event => {
      event.preventDefault();
      this.getUsers();
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
          users={this.state.users}
        />
      );
    }
  };
