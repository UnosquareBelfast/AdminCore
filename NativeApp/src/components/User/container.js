import React, { Component } from 'react';
import { Alert } from 'react-native';
import {PropTypes as PT} from 'prop-types';
import deviceStorage from '../../services/deviceStorage';
import { getHolidays } from '../../services/holidayService';

export default Container =>
  class extends Component {
    static propTypes = {
      navigation: PT.object,
    }


    constructor(props) {
      super(props);
      this.state = {
        id: '',
        takenHolidays: [],
        remainingHolidays: [],
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
          this.setState({takenHolidays: res.data});
        })
        .catch(e => {
          Alert.alert(
            'Could not taken holidays',
            e.message,
          );
        });
    }


    render() {
      return (
        <Container
          takenHolidays={this.state.takenHolidays.length}
          remainingHolidays={this.state.remaining}
        />
      );
    }
  };
