import React, { Component } from 'react';
import { Alert } from 'react-native';
import deviceStorage from '../../services/deviceStorage';
import { getHolidays } from '../../services/holidayService';

export default Container => class extends Component {
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
        this.setState({ takenHolidays: res.data });
      })
      .catch((e) => {
        Alert.alert(
          'Could not taken holidays',
          e.message,
        );
      });
  }


  render() {
    const { takenHolidays, remaining } = this.state;
    return (
      <Container
        takenHolidays={takenHolidays.length}
        remainingHolidays={remaining}
      />
    );
  }
};
