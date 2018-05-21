import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import Moment from 'moment';
import HolidayService from '../../services/holidayService';

export default (Wrapped) => (
  class extends React.Component {
    propTypes = {
      user: PT.object,
    }

    constructor(props) {
      super(props);
      this.state = {
        takenHolidays: [],
      };
      this.HolidayService = new HolidayService();
    }

    componentDidMount() {
      this.HolidayService.getHolidays(this.props.user.id)
        .then(response =>{
          const pastHolidays = response.filter(hol => { return this.isDateInThePast(hol.date); });
          this.setState({takenHolidays: pastHolidays});
        })
        .catch(error =>{
          Swal('Could not get taken holidays', error.message, 'error');
        });
    }

    isDateInThePast(date) {
      return Moment(date).isBefore(new Date());
    }

    render() {
      return (
        <Wrapped takenHolidays={this.state.takenHolidays} {...this.props} />
      );
    }
  }
);
