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
        showBookingModal: false,
        booking: {},
      };

      this.getUserProfile = this.getUserProfile.bind(this);
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

    closeModal = () => {
      this.setState({showBookingModal: false});
    }

    onSelectSlot = ({start, end}) => {
      this.setState({
        showBookingModal: true,
        booking: {
          start: start,
          end: end,
        },
      });
    }

    onSelectEvent = ({start, end, id, title}) => {
      this.setState({
        showBookingModal: true,
        booking: {
          start: start,
          end: end,
          id: id,
          title: title,
        },
      });
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
          showBookingModal={this.state.showBookingModal}
          booking={this.state.booking}
          closeModal={this.closeModal}
          {...this.props}
        />
      );
    }
  };

export default DashboardContainer;
