import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUser } from '../../reducers';
import { getHolidays } from '../../services/holidayService';
import {
  getTotalDaysInEventArray,
  getTotalDaysInEventArrayWithStatus,
} from '../../utilities/dates';
import holidayStatus from '../../utilities/holidayStatus';
import { isEmpty } from 'lodash';
import { getContractsByEmployeeId } from '../../services/contractService';
import swal from 'sweetalert2';

const ProfileContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      userDetails: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        holidays: null,
        daysBooked: null,
        daysPending: null,
        selectedHoliday: {},
        contracts: [],
      };
    }

    componentDidMount() {
      // Required in case the user navigates away from the page, then back.
      this.setState({ holidays: null });
      this.setState({ contracts: [] });
      this.getContracts();
    }

    componentDidUpdate(prevProps, prevState) {
      let selectedHolidayCleared = false;
      if (
        !isEmpty(prevState.selectedHoliday) &&
        isEmpty(this.state.selectedHoliday)
      ) {
        selectedHolidayCleared = true;
      }
      if (
        this.props.userDetails.forename !== null &&
        (this.state.holidays === null || selectedHolidayCleared)
      ) {
        getHolidays(this.props.userDetails.employeeId).then(response => {
          const holidays = response.data;
          this.setState({ holidays }, () => {
            this.setState({
              daysBooked: getTotalDaysInEventArray(holidays),
              daysPending: getTotalDaysInEventArrayWithStatus(
                holidays,
                holidayStatus.PENDING
              ),
            });
          });
        });
      }   
    }

    getContracts()
    {   
      getContractsByEmployeeId(this.props.userDetails.employeeId).then(response => {
        const contracts = response.data;
        this.setState({ contracts });
      })
        .catch(error =>
          swal('Error',`Error finding contracts: ${error.message}`, 'error')
        );
    } 

    selectHoliday = holiday => this.setState({ selectedHoliday: holiday });

    closeModal = () => {
      this.selectHoliday({});
    };

    render() {
      return (
        <Wrapped
          {...this.props}
          {...this.state}
          userHolidays={this.state.holidays || []}
          selectHoliday={this.selectHoliday}
          selectedHoliday={this.state.selectedHoliday}
          closeModal={this.closeModal}
          contracts={this.state.contracts}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
  };
};

export default compose(connect(mapStateToProps), ProfileContainer);
