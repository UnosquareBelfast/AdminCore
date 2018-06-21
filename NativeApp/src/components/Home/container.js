import React, { Component } from 'react';
import { Alert } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { userLogout } from '../../utilities/currentUser';
import { getHolidays } from '../../services/holidayService';
import deviceStorage  from '../../services/deviceStorage';

export default Container =>
  class extends Component {
    static propTypes = {
      navigation: PT.object,
    }

    constructor(props) {
      super(props);
      this.state = {
        takenHolidays: null,
      };
    }

    componentDidMount() {
      try {
        deviceStorage.getItem('user_id')
          .then(id => {
            this.setState({id: id});
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
      getHolidays(this.state.id)
        .then(res => {
          this.setState({takenHolidays: this.formateDate(res.data)});
        })
        .catch(e => {
          Alert.alert(
            'Could not taken holidays',
            e.message,
          );
        });
    }

    formateDate = (data) => {
      const arrayToObject =
        data.reduce((obj, item) => {
          const date = new moment(item.date, 'YYYY-MM-DD');
          const formatDate = date.format('YYYY-MM-DD');
          const holidayStatus = this.holidayStatus(item.holidayStatusId);
          obj[formatDate] = {textColor: 'white', color: holidayStatus};
          return obj;
        }, {});
      return arrayToObject;
    }

    holidayStatus = (status) => {
      switch (status) {
        case 1 :
          return '#ff9b34';
        case 2 :
          return '#35c375';
        case 3 :
          return '#ff3434';
        case 4:
          return '#3469ff';
      }
    }

    handleLogout = () => {
      userLogout()
        .then(this.props.navigation.navigate('Auth'));
    }

    render() {
      return (
        <Container
          handleLogout={this.handleLogout}
          takenHolidays={this.state.takenHolidays}
        />
      );
    }
  };
