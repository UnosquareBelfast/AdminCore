import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import roles from '../../utilities/roles';
import { getUserProfile } from '../../services/userService';
import { getHolidays } from '../../services/holidayService';

const UserContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object,
      history: PT.object.isRequired,
      match: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        userDetails: null,
        profileUser: null,
        profileHolidays: [],
        selectedHoliday: {},
      };
    }

    componentDidMount() {
      this.getLocalUser().then(this.getUserProfile());
    }

    getLocalUser = () => {
      const userDetails = localStorage.getItem('user_id');
      return getUserProfile(userDetails)
        .then(response => {
          if (response.data.employeeRoleId !== roles.ADMIN) {
            this.props.history.replace('/');
          }
          this.setState({
            userDetails: response.data,
          });
        })
        .catch(error =>
          Swal({
            title: 'Could not get your profile',
            text: error.message,
            type: 'error',
          })
        );
    };

    getUserProfile = () => {
      const userId = this.props.match.params.userId;
      return getUserProfile(userId)
        .then(response => {
          this.setState({
            profileUser: response.data,
          });
          this.getUserHolidays(response.data.employeeId);
        })
        .catch(error =>
          Swal({
            title: 'Could not get the requested user profile',
            text: error.message,
            type: 'error',
          })
        );
    };

    getUserHolidays = id => {
      return getHolidays(id)
        .then(response => {
          this.setState({
            profileHolidays: response.data,
          });
        })
        .catch(error =>
          Swal({
            title: 'Could not get profile\'s holidays',
            text: error.message,
            type: 'error',
          })
        );
    };

    selectHoliday = holiday => this.setState({ selectedHoliday: holiday });

    closeModal = () => {
      this.selectHoliday({});
      this.getUserHolidays(this.state.profileUser.employeeId);
    };

    render() {
      return (
        this.state.userDetails && (
          <Wrapped
            {...this.state}
            history={this.props.history}
            selectHoliday={this.selectHoliday}
            closeModal={this.closeModal}
          />
        )
      );
    }
  };

export default UserContainer;
