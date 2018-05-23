import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import styles from './style.css';
import Calendar from 'react-calendar';
import Moment from 'moment';
import DashboardService from './DashboardService.js';
import {
  Layout,
  TakenLeave,
  BookedLeave,
  RequestHoliday,
} from '../../components';
import withAuth from '../../hoc/withAuth';

class Dashboard extends React.Component {
  static propTypes = {
    user: PT.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      date: Moment(),
      daysRemaining: 0,
      requestModalOpen: false,
      user: null,
    };

    this.toggleHolidayModal = this.toggleHolidayModal.bind(this);
    this.DashboardService = new DashboardService();
  }

  componentDidMount() {
    //this.getUserProfile();
    // this.DashboardService.getHolidays(this.props.user.id)
    //         .then(response =>{
    //           const remains = 23 - response.length;
    //           this.setState({ daysRemaining: remains});
    //         })
    //         .catch(error =>{
    //             Swal('Could not log in', error.message, 'error');
    //         })
    this.getUserProfile();
  }

  getUserProfile() {
    const email = this.DashboardService.getUserEmail();

    const splitOne = email.split('.');
    const splitTwo = splitOne[1].split('@');
    const firstName = splitOne[0];
    const lastName = splitTwo[0];

    this.DashboardService.getUserProfile(firstName, lastName)
      .then(response =>{
        // eslint-disable-next-line
        console.log(response);
        this.setState({user : response});
      })
      .catch(error =>{
        Swal({title: 'Could not get user profile', text: error.message, type: 'error'});
      });
  }

  getHolidays() {

  }

  toggleHolidayModal() {
    this.setState({
      requestModalOpen: !this.state.requestModalOpen,
    });
  }


  render() {
    return (
      <Layout {...this.props}>
        <div className={styles.RowC}>
          <div className={styles.LeaveTrackerList}>
            <span>Days Taken:</span>
            <TakenLeave user={this.props.user} />
            <br/>
            <span>Days Booked:</span>
            <BookedLeave user={this.props.user} />
          </div>
          <div className={styles.CalendarDiv}>
            <span>Days Remaining: {this.state.daysRemaining}</span>

            <Calendar className={styles.CalendarStyling}
              onChangeMonth={(date) => this.setState({ date })}
              date={this.state.date}
              // eslint-disable-next-line
            onPickDate={(date => console.log(date))}
            />
            <br/>
            <button onClick={this.toggleHolidayModal}>Book Holiday</button>
            <RequestHoliday
              user={this.props.user}
              show={this.state.requestModalOpen}
              onClose={this.toggleHolidayModal} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default withAuth(Dashboard);
