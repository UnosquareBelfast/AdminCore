import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import Moment from 'moment';
import { getHolidays } from '../../services/holidayService';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      user: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        takenHolidays: [],
      };
    }

    componentDidMount() {
      getHolidays(this.props.user.user.sub)
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
      return Moment(date).isBefore(new Date());
    }

    render() {
      return (
        <Wrapped takenHolidays={this.state.takenHolidays} {...this.props} />
      );
    }
  };
