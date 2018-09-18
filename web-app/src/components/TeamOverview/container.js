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
      
      getTeamOverview( )
        .then( ({data}) => this.setState( { teams: data } ))
        .catch(error =>
          Swal('Error', `There was an error: ${error.message}`, 'error')
        );

    }

    selectUser = user => this.setState({ selectedUser: user });

    render() {
      return (
        <Wrapped
          history={this.props.history}
          teams={this.state.teams}
          selectedUser={this.state.selectedUser}
          logTeam={this.logTeam}
          selectUser={this.selectUser}
        />
      );
    }
  };

export default TeamOverviewContainer;
