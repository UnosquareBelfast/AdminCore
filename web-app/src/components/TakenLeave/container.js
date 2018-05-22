import React from 'react';
import Swal from 'sweetalert2';
import Moment from 'moment';
import HolidayService from '../../services/holidayService';

export default (Wrapped) => (
  class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            takenHolidays: []
        };
        this.HolidayService = new HolidayService();
    }

    componentDidMount(){
        this.HolidayService.getHolidays(this.props.user.id)
        .then(response =>{
            const pastHolidays = response.filter(hol => {return this.isDateInThePast(hol.date)});
            this.setState({takenHolidays: pastHolidays});
        })
        .catch(error =>{
            Swal({title: 'Could not get taken holidays', text: error.message, type: 'error'});
        })
    }

    isDateInThePast(date){
        return Moment(date).isBefore(new Date());
    }

    render() {
      return (
        <Wrapped takenHolidays={this.state.takenHolidays} {...this.props} />
      );
    }
  }
)
