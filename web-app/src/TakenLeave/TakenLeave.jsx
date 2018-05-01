import React from 'react';
import Swal from 'sweetalert2';
import Moment from 'moment';
import TakenLeaveService from './TakenLeaveService';

class TakenLeave extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            takenHolidays: []
        };

        this.TakenLeaveService = new TakenLeaveService();
    }

    componentDidMount(){
        this.TakenLeaveService.getHolidays(this.props.employeeId)
        .then(response =>{
            const pastHolidays = response.filter(hol => {return this.isDateInThePast(hol.date)});
            this.setState({takenHolidays: pastHolidays});
        })
        .catch(error =>{
            Swal('Could not get taken holidays', error.message, 'error');
        })
    }    

    isDateInThePast(date){
        return Moment(date).isBefore(new Date());
    }

    render() {
      return (
        <div>
            {
                this.state.takenHolidays.map(holiday => {                    
                    return <span>
                        holiday.date
                    </span>                
                })
            }
        </div>
      );
    }
  }
  
  export default TakenLeave;