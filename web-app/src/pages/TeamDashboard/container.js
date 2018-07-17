import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { getAllHolidays } from '../../services/holidayService';
import { getAllUsers } from '../../services/userService';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      history: PT.object.isRequired,
    };
    constructor(props) {
      super(props);
      this.state = {
        team: [],
        teamHolidays: [],
      };
    }

    componentDidMount() {
      this.getHolidays();
      this.getTeam();
    }

    getHolidays = () => {
      getAllHolidays().then(response => {
        this.setState({ teamHolidays: response.data });
      });
    };

    getTeam = () => {
      getAllUsers().then(response => {
        this.setState({ team: response.data });
      });
    };

    render() {
      return (
        <Wrapped
          history={this.props.history}
          teamHolidays={this.state.teamHolidays}
          team={this.state.team}
        />
      );
    }
  };
