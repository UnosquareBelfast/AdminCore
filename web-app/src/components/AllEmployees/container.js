import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import { getAllUsers } from '../../services/userService';

const AllEmployeesContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      history: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        users: [],
        selectedUser: {},
      };
    }

    componentDidMount() {
      getAllUsers()
        .then(({ data }) => this.setState({ users: data }))
        .catch(error =>
          Swal('Error', `There was an error: ${error.message}`, 'error')
        );
    }

    selectUser = user => this.setState({ selectedUser: user });

    render() {
      return (
        <Wrapped
          history={this.props.history}
          users={this.state.users}
          selectedUser={this.state.selectedUser}
          selectUser={this.selectUser}
        />
      );
    }
  };

export default AllEmployeesContainer;
