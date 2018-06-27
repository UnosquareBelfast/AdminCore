import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { userLogout } from '../../utilities/currentUser';
import { getUserHolidays } from '../../services/userService';

export default Container => class extends Component {
    static propTypes = {
      navigation: PT.shape({
        navigate: PT.func,
      }),
    }

    static defaultProps = {
      navigation: {},
    }

    constructor(props) {
      super(props);
      this.state = {
        takenHolidays: {},
        showModal: false,
      };
    }

    componentDidMount() {
      getUserHolidays()
        .then(data => this.setState({ takenHolidays: this.formatDate(data) }));
    }

    onDayPress = (day) => {
      if (day) {
        this.setState({ showModal: true });
      }
    }

    closeModal = () => {
      const { showModal } = this.state;
      this.setState({ showModal: !showModal });
    }

    formatDate = data => data.reduce((obj, item) => {
      const holidayStatus = this.holidayStatus(item.holidayStatusId);
      obj[item.start] = { textColor: 'white', color: holidayStatus };
      return obj;
    }, {});

    holidayStatus = (status) => {
      switch (status) {
        case 1:
          return '#ff9b34';
        case 2:
          return '#35c375';
        case 3:
          return '#ff3434';
        case 4:
          return '#3469ff';
        default:
          return '#35c375';
      }
    }

    handleLogout = () => {
      const { navigation } = this.props;
      userLogout()
        .then(navigation.navigate('Auth'));
    }

    render() {
      const { takenHolidays, showModal } = this.state;
      return (
        <Container
          handleLogout={this.handleLogout}
          takenHolidays={takenHolidays}
          onDayPress={this.onDayPress}
          showModal={showModal}
          closeModal={this.closeModal}
        />
      );
    }
};
