import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import roles from '../../utilities/roles';
import { getUserProfile, getAllUsers } from '../../services/userService';

const AdminContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object,
      history: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        userDetails: null,
        users: [],
      };
    }

    componentDidMount() {
      const userId = localStorage.getItem('user_id');
      getUserProfile(userId)
        .then(response => {
          this.setState({
            userDetails: response.data,
          });
          if (response.data.employeeRoleId !== roles.ADMIN) {
            this.props.history.replace('/');
          }
          this.getAllUsers();
        })
        .catch(error =>
          Swal({
            title: 'Could not get user profile',
            text: error.message,
            type: 'error',
          }),
        );
    }

    getAllUsers = () => {
      getAllUsers().then(({ data }) => this.setState({ users: data }));
    };

    render() {
      return (
        this.state.userDetails && (
          <Wrapped {...this.state} {...this.props} refresh={this.getAllUsers} />
        )
      );
    }
  };

export default AdminContainer;
