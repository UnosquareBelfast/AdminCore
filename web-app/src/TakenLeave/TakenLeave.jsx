import React from 'react';
import Swal from 'sweetalert2';
import styles from './TakenLeave.css';
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
        this.TakenLeaveService.getHolidays(this.props.user.id)
        .then(response =>{
            const pastHolidays = response.filter(hol => {return this.isDateInThePast(hol.date)});
            this.setState({takenHolidays: pastHolidays});
        })
        .catch(error =>{
            Swal('Could not get taken holidays', error.message, 'error');
        })
    }    

    formatDate(date){
        const definedDate = new Date(date);
        const year = definedDate.getFullYear();
        const month = definedDate.toLocaleString("en-us", { month: "long"});
        const day = definedDate.getDate();
            
        return year + '-' + month + '-' + day;
    }

    isDateInThePast(date){
        return Moment(date).isBefore(new Date());
    }

    render() {
      return (
        <div>
            {
                this.state.takenHolidays.map(holiday => {                    
                    return <span className={styles.TextStyle}>
                        {this.formatDate(holiday.date)}
                    </span>                
                })
            }
        </div>
      );
    }
  }
  
  export default TakenLeave;