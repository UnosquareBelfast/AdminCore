import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import employeeStatus from '../../utilities/employeeStatus';
import { updateUser } from '../../services/userService';

export default Wrapped =>
  class extends Component {
    static propTypes = {
      users: PT.array,
    };

    constructor(props) {
      super(props);
      this.state = { users: props.users };
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ users: nextProps.users });
    }

    archiveUser = (user, active) => {
      const userIndex = this.state.users.indexOf(user);
      const users = [...this.state.users];

      active
        ? (users[userIndex].employeeStatusId = employeeStatus.ACTIVE)
        : (users[userIndex].employeeStatusId = employeeStatus.INACTIVE);

      updateUser(users[userIndex])
        .then(() => {
          this.setState({ users });
        })
        .catch(error =>
          Swal({
            title: 'Could not change user status',
            text: error.message,
            type: 'error',
          }),
        );
    };

    editUser = user => {
      console.log('EDIT', user);
    };

    amendHolidays = user => {
      console.log('AMEND HOLIDAYS', user);
    };

    render() {
      return (
        <Wrapped
          archive={this.archiveUser}
          edit={this.editUser}
          amendHolidays={this.amendHolidays}
          {...this.props}
          users={this.state.users}
        />
      );
    }
  };
