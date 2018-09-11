import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getHolidaysByStatus } from '../../services/holidayService';
import holidayStatus from '../../utilities/holidayStatus';
import { getAllUsers } from '../../services/userService';
import { getUser } from '../../reducers/';

const TeamDashboardContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      history: PT.object.isRequired,
      userDetails: PT.object.isRequired,
    };
    constructor(props) {
      super(props);
      this.state = {
        team: [],
        teamHolidays: [],
        selectedUser: null,
        userModalVisible: false,
        selectedHoliday: {},
      };
    }

    componentDidMount() {
      this.getHolidays();
      this.getTeam();
    }

    getHolidays = () => {
      getHolidaysByStatus(holidayStatus.PENDING).then(response => {
        this.setState({ teamHolidays: response.data });
      });
    };

    getTeam = () => {
      getAllUsers().then(response => {
        this.setState({ team: response.data });
      });
    };

    handleUserSelection = user => {
      this.setState({ selectedUser: user, userModalVisible: true });
    };

    handleHideUserModal = () => {
      this.setState({ userModalVisible: false });
    };

    selectHoliday = holiday => this.setState({ selectedHoliday: holiday });

    handleHideHolidayModal = () => {
      this.selectHoliday({});
      this.getHolidays();
    };

    render() {
      const { history, userDetails } = this.props;
      const {
        teamHolidays,
        team,
        selectedUser,
        userModalVisible,
        selectedHoliday,
      } = this.state;

      return (
        <Wrapped
          history={history}
          teamHolidays={teamHolidays}
          team={team}
          onUserSelect={this.handleUserSelection}
          selectedUser={selectedUser}
          userModalVisible={userModalVisible}
          hideUserModal={this.handleHideUserModal}
          hideHolidayModal={this.handleHideHolidayModal}
          selectHoliday={this.selectHoliday}
          selectedHoliday={selectedHoliday}
          userDetails={userDetails}
        />
      );
    }
  };

const mapStateToProps = state => {
  return {
    userDetails: getUser(state),
  };
};

export default compose(connect(mapStateToProps), TeamDashboardContainer);
