import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import Moment from 'moment';
import { getHolidays } from '../../services/holidayService';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      totalHolidays: PT.number
    };

    constructor(props) {
      super(props);
      this.state = {
        takenHolidays: []
      };
    }

    componentDidMount() {
      getHolidays(this.props.user.userId())
        .then(response => {
          const pastHolidays = response.data.filter(hol => {
            return this.isDateInThePast(hol.date);
          });
          
          this.setState({ takenHolidays: pastHolidays });
        })
        .catch(error => {
          Swal({
            title: 'Could not get taken holidays',
            text: error.message,
            type: 'error',
          });
        });
    }

    isDateInThePast(date) {
      date = date.join("/")
      date = new Date(date)
      return Moment(date).isBefore(new Date());
    }

    render() {
      return (
        <Wrapped 
            takenHolidays={ this.state.takenHolidays } 
            totalHolidays={ this.props.totalHolidays } 
            {...this.props} />
      );
    }
  };
