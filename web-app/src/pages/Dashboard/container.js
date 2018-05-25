import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import Moment from 'moment';
import { getUserProfile } from '../../services/userService';
import { withAuth } from '../../hoc';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    propTypes = {
      user: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        date: Moment(),
        daysRemaining: 0,
        requestModalOpen: false,
        user: null,
      };

      this.getUserProfile = this.getUserProfile.bind(this);
      this.toggleHolidayModal = this.toggleHolidayModal.bind(this);
    }

    componentDidMount() {
      this.getUserProfile();
    }

    getUserProfile() {
      getUserProfile()
        .then(response => {
          this.setState({ user: response.data });
          //eslint-disable-next-line
          console.log('Profile retrieved', response);
        })
        .catch(error => {
          Swal({
            title: 'Could not get user profile',
            text: error.message,
            type: 'error',
          });
        });
    }

    toggleHolidayModal() {
      this.setState({
        requestModalOpen: !this.state.requestModalOpen,
      });
    }

    render() {
      return (
        <Wrapped
          user={this.props.user}
          daysRemaining={this.state.daysRemaining}
          toggleHolidayModal={this.state.toggleHolidayModal}
          date={this.state.date}
          {...this.props}
        />
      );
    }
  };

export default withAuth(DashboardContainer);
