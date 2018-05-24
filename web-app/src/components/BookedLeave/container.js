import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import Moment from 'moment';
import { getHolidays } from '../../services/holidayService';

export default Wrapped =>
  class extends React.Component {
    propTypes = {
      user: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        bookedHolidays: [],
      };
    }

    componentDidMount() {
      getHolidays(this.props.user.id)
        .then(response => {
          const bookedHolidays = response.data.filter(hol => {
            return this.isDateInTheFuture(hol.date);
          });
          this.setState({ bookedHolidays });
        })
        .catch(error => {
          Swal({
            title: 'Could not get booked holidays',
            text: error.message,
            type: 'error',
          });
        });
    }

    isDateInTheFuture(date) {
      return Moment(date).isAfter(new Date());
    }

    render() {
      return (
        <Wrapped bookedHolidays={this.state.bookedHolidays} {...this.props} />
      );
    }
  };
