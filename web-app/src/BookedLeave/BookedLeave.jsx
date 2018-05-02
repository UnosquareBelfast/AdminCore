import React from 'react';
import Swal from 'sweetalert2';
import styles from './BookedLeave.css';
import Moment from 'moment';
import BookedLeaveService from './BookedLeaveService';

class BookedLeave extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            bookedHolidays: []
        };

        this.BookedLeaveService = new BookedLeaveService();
    }

    componentDidMount(){
        this.BookedLeaveService.getHolidays(this.props.user.id)
        .then(response =>{
            const bookedHolidays = response.filter(hol => { return this.isDateInTheFuture(hol.date)});
            this.setState({bookedLeave: bookedHolidays});
        })
        .catch(error =>{
            Swal('Could not get booked holidays', error.message, 'error');
        })
    }

    formatDate(date){
        const definedDate = new Date(date);
        const year = definedDate.getFullYear();
        const month = definedDate.toLocaleString("en-us", { month: "long"});
        const day = definedDate.getDate();
            
        return year + '-' + month + '-' + day;
    }

    isDateInTheFuture(date){
        return Moment(date).isAfter(new Date());
    }

    render() {
      return (
        <div>
            {
                this.state.bookedHolidays.map(holiday => {                    
                    return <span className={styles.LeaveTrackerList}>{this.formatDate(holiday.date)}</span>                
                })
            }
        </div>
      );
    }
  }
  
  export default BookedLeave;