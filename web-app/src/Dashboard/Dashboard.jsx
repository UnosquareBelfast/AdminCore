import React from 'react';
import Swal from 'sweetalert2';
import styles from './Dashboard.css';
import Calendar from 'react-calendar';
import Moment from 'moment';
import TakenLeave from '../TakenLeave/TakenLeave.jsx';
import BookedLeave from '../BookedLeave/BookedLeave.jsx';
import RequestHoliday from '../RequestHoliday/RequestHoliday.jsx';
import DashboardService from './DashboardService.js';

class Dashboard extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      date: Moment(),
      daysRemaining: 0,
      bookingModalOpen: false
    }

    this.DashboardService = new DashboardService();
  }

  componentDidMount(){
    this.DashboardService.getHolidays(this.state.employee.id)
            .then(response =>{
              const remains = 23 - response.length;
              this.setState({ daysRemaining: remains});
            })
            .catch(error =>{
                Swal('Could not log in', error.message, 'error');
            })
  }

  toggleHolidayModal = () => {
    this.setState({
      bookingModalOpen: !this.state.bookingModalOpen
    });
  }

  render() {
    return (
      <div className={styles.RowC}>
            <div className={styles.LeaveTrackerList}>
                <span>Days Taken:</span>
                <TakenLeave />
                <br/>
                <span>Days Booked:</span>
                <BookedLeave />
            </div>
            <div className={styles.CalendarDiv}>
                <span>Days Remaining: {this.state.daysRemaining}</span>
                
                <Calendar className={styles.CalendarStyling}              
                    onChangeMonth={(date) => this.setState({ date })}
                    date={this.state.date}
                    onPickDate={(date => console.log(date))}
                />
                <br/>
                <button onClick={this.toggleHolidayModal}>Book Holiday</button>
                <RequestHoliday
                    show={this.state.bookingModalOpen}
                    onClose={this.toggleHolidayModal}>
                </RequestHoliday>
            </div>
        </div>
    );
  }
}

export default Dashboard;