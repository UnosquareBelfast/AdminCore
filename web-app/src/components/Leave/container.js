import React from 'react';
import { PropTypes as PT } from 'prop-types';

export default Wrapped =>
  class extends React.Component {
    static propTypes = {
      user: PT.object,
      takenHolidays: PT.array,
    };

    constructor(props) {
      super(props);

      this.state = {
        showHolidayListModal: false,
      };
    }

    showModal = () => {
      this.setState({
        showHolidayListModal: true,
      });
    };

    closeModal = () => {
      this.setState({
        showHolidayListModal: false,
      });
    };

    render() {
      return (
        <Wrapped
          takenHolidays={this.props.takenHolidays}
          totalHolidays={this.props.user.totalHolidays}
          showHolidayListModal={this.state.showHolidayListModal}
          showModal={this.showModal}
          closeModal={this.closeModal}
          {...this.props}
        />
      );
    }
  };
