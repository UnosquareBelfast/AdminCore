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
      };
    }

    componentDidMount() {
      // Required in case the user navigates away from the page, then back.
      this.setState({ holidays: null });
    }

    componentDidUpdate() {
      if (
        this.props.userDetails.forename !== null &&
        this.state.holidays === null
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

    render() {
      return (
        <Wrapped
          {...this.props}
          {...this.state}
          userHolidays={this.state.holidays || []}
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
