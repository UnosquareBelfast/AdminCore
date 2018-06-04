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
        showHolidayListModal: false
      }
    }

    showModal = () => {
      this.setState({
        showHolidayListModal: true
      })
    }

    closeModal = () => {
      this.setState({
        showHolidayListModal: false
      })
    }

    render() {
      return (
        <Wrapped 
            takenHolidays={ this.props.takenHolidays } 
            totalHolidays={ this.props.totalHolidays } 
            showHolidayListModal={this.state.showHolidayListModal}
            showModal={this.showModal}
            closeModal={this.closeModal}
            {...this.props} />
      );
    }
  };
