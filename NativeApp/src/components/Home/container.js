import React, { Component } from 'react';
import { Alert } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { userLogout } from '../../utilities/currentUser';
import { getHolidays } from '../../services/holidayService';
import deviceStorage from '../../services/deviceStorage';

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
      };
    }

    componentDidMount() {
      try {
        deviceStorage.getItem('user_id')
          .then((id) => {
            this.setState({ id });
            this.getTakenHolidays();
          });
      } catch (e) {
        Alert.alert(
          'Could not user id',
          e.message,
        );
      }
    }

    getTakenHolidays = () => {
      const { id } = this.state;
      getHolidays(id)
        .then((res) => {
          this.setState({ takenHolidays: this.formatDate(res.data) });
        })
        .catch((e) => {
          Alert.alert(
            'Could not taken holidays',
            e.message,
          );
        });
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
      const { takenHolidays } = this.state;
      return (
        <Container
          handleLogout={this.handleLogout}
          takenHolidays={takenHolidays}
        />
      );
    }
};
