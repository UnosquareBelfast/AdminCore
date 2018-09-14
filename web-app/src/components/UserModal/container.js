import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUser } from '../../reducers';
import { getHolidays } from '../../services/holidayService';
import swal from 'sweetalert2';
import { isEmpty } from 'lodash';
import roles from '../../utilities/roles';
import { getTotalDaysInEventArrayWithStatus } from '../../utilities/dates';
import HolidayStatus from '../../utilities/holidayStatus';

const UserModalContainer = Wrapped =>
  class extends Component {
    static propTypes = {
      user: PT.object,
      closeModal: PT.func,
      history: PT.object,
      userDetails: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        userDetails: null,
        userHolidays: [],
      };
      this.hasPermission = props.userDetails.employeeRoleId !== roles.STANDARD;
    }

    componentDidMount() {
      const { user } = this.props;
      if (isEmpty(user)) return null;
     
      if (this.hasPermission) {
        getHolidays(user.employeeId)
          .then(response => {
            this.setState({ userHolidays: response.data });
          })
          .catch(error => {
            swal(
              'Error',
              `Error getting user holiday details: ${error.message}`,
              'error'
            );
          });
      }
    }

    getTotalPendingDays = () => {
      return getTotalDaysInEventArrayWithStatus(
        this.state.userHolidays,
        HolidayStatus.PENDING
      );
    };
  
    getTotalApprovedDays = () => {
      return getTotalDaysInEventArrayWithStatus(
        this.state.userHolidays,
        HolidayStatus.APPROVED
      );
      
    };

    render() {
      const approvedDays = this.getTotalApprovedDays();
      const pendingDays = this.getTotalPendingDays();
      const { closeModal, userDetails, user, history} = this.props;
      const { userHolidays  } = this.state;
      if (isEmpty(user)) return null; 
       
      return (
        <Wrapped 
          userDetails={userDetails}
          userHolidays={userHolidays}
          closeModal={closeModal}
          user={user}
          hasPermission = {this.hasPermission}
          history={history} 
          getHolidays={getHolidays} 
          approvedDays={approvedDays}
          pendingDays={pendingDays}/>
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
  };
};

export default compose(connect(mapStateToProps), UserModalContainer);
