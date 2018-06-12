import React, { Component } from 'react';
import { getAllHolidays } from '../../services/holidayService';

export default Wrapped =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { holidays: [] };
    }

    componentDidMount() {
      this.getHolidays();
    }

    getHolidays = () => {
      getAllHolidays().then(response => {
        const holidays = response.data;
        this.setState({ holidays });
      });
    };

    render() {
      return <Wrapped {...this.props} holidays={this.state.holidays} />;
    }
  };
