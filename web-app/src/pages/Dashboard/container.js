import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import Moment from 'moment';
import { getUserProfile } from '../../services/userService';

const DashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      user: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        date: Moment(),
        totalHolidays: 0,
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
          this.setState({ user: response.data[0], totalHolidays: response.data[0].totalHolidays });
          //eslint-disable-next-line
          console.log('Profile retrieved', response.data[0]);
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

    onSelectSlot(slotInfo) {
      //eslint-disable-next-line
      console.log(slotInfo);
    }

    onSelectEvent(eventInfo) {
      //eslint-disable-next-line
      console.log(eventInfo)
    }

    render() {
      return (
        <Wrapped
          user={this.state.user}
          totalHolidays={this.state.totalHolidays}
          toggleHolidayModal={this.state.toggleHolidayModal}
          date={this.state.date}
          onSelectSlot={this.onSelectSlot}
          onSelectEvent={this.onSelectEvent}
          {...this.props}
        />
      );
    }
  };

export default DashboardContainer;
