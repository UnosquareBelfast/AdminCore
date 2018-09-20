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
        totalHolidays: 0,
      };
      this.hasPermission = props.userDetails.employeeRoleId !== roles.STANDARD;
    }

    componentDidMount() {
      const { user } = this.props;
      if (isEmpty(user)) return null;

      getHolidays(user.employeeId)
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              totalHolidays: response.data[0].employee.totalHolidays,
            });
          }
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
      const { closeModal, userDetails, user, history } = this.props;
      const { userHolidays, totalHolidays } = this.state;
      if (isEmpty(user)) return null;

      return (
        <Wrapped
          userDetails={userDetails}
          userHolidays={userHolidays}
          closeModal={closeModal}
          user={user}
          hasPermission={this.hasPermission}
          history={history}
          getHolidays={getHolidays}
          approvedDays={approvedDays}
          pendingDays={pendingDays}
          totalHolidays={totalHolidays}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
  };
};

export default compose(connect(mapStateToProps), UserModalContainer);
