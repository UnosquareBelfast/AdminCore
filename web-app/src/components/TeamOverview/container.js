import React from 'react';
import { PropTypes as PT } from 'prop-types';
import Swal from 'sweetalert2';
import { getTeamOverview } from '../../services/dashboardService';

const TeamOverviewContainer = Wrapped =>
  class extends React.Component {
    static propTypes = {
      history: PT.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        teams: [],
        selectedUser: {},
      };
    }

    componentDidMount() {

      getTeamOverview()
        .then(({ data }) => this.setState({ teams: this.filterTeams(data) }))
        .catch(error =>
          Swal('Error', `There was an error: ${error.message}`, 'error')
        );

    }

    filterTeams = teams => {
      const memberArray = [];
      if (teams.length) {
        teams.map(team => {
          team.members.map(member => {
            member.team = team.team;
            const splitName = member.name.split(' ');
            member.employee = {forename: splitName[0] , surname: splitName[1], email: member.email };
            memberArray.push(member);
          });
        });
      }
      return memberArray;
    }

    selectUser = user => this.setState({ selectedUser: user });

    render() {
      const { teams, selectedUser } = this.state;
      return (
        <Wrapped
          history={this.props.history}
          teams={teams}
          selectedUser={selectedUser}
          logTeam={this.logTeam}
          selectUser={this.selectUser}
        />
      );
    }
  };

export default TeamOverviewContainer;
