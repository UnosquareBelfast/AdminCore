import React from 'react';
import Swal from 'sweetalert2';
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
        this.BookedLeaveService.getHolidays(this.props.employeeId)
        .then(response =>{
            const bookedHolidays = response.filter(hol => { return this.isDateInTheFuture(hol.date)});
            this.setState({bookedLeave: bookedHolidays});
        })
        .catch(error =>{
            Swal('Could not get booked holidays', error.message, 'error');
        })
    }

    isDateInTheFuture(date){
        return Moment(date).isAfter(new Date());
    }

    render() {
      return (
        <div>
            {
                this.state.bookedHolidays.map(holiday => {                    
                    return <span>holiday.date</span>                
                })
            }
        </div>
      );
    }
  }
  
  export default BookedLeave;