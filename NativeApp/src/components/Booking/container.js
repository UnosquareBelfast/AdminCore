import React, { Component } from 'react';
import { Alert } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { userProfile } from '../../utilities/currentUser';
import { requestHolidays, updateHolidayRequest } from '../../services/holidayService';


export default Container => class extends Component {
  static propTypes = {
    navigation: PT.shape({
      navigate: PT.fun,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      booking: {
        holId: 0,
        startDate: '',
        endDate: '',
        halfDay: false,
      },
      booked: false,
      user: {},
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const chosenDate = navigation.getParam('date', '');
    const booked = navigation.getParam('booked', '');
    const holId = navigation.getParam('holId', '');

    userProfile()
      .then(user => this.setState({ user }));

    this.setState({
      booking: {
        holId,
        startDate: chosenDate,
        endDate: chosenDate,
      },
      booked,
    });
  }

  changeStartDate = (date) => {
    const { booking } = this.state;
    const formatDate = moment(date).format('YYYY-MM-DD');

    if (moment(date).isAfter(booking.endDate)) {
      this.setState(prevState => ({
        booking: {
          ...prevState.booking,
          startDate: formatDate,
          endDate: formatDate,
        },
      }));
    } else {
      this.setState(prevState => ({
        booking: {
          ...prevState.booking,
          startDate: formatDate,
        },
      }));
    }
  }

  changeEndDate = (endDate) => {
    const formatEndDate = moment(endDate).format('YYYY-MM-DD');
    this.setState(prevState => ({
      booking: {
        ...prevState.booking,
        endDate: formatEndDate,
      },
    }));
  }

  submitRequest = () => {
    const { booking, user } = this.state;
    const { navigation } = this.props;

    const request = {
      dates: [
        {
          endDate: booking.endDate,
          halfDay: false,
          startDate: booking.startDate,
        },
      ],
      employeeId: user.employeeId,
    };

    requestHolidays(request)
      .then(() => {
        navigation.pop();
      })
      .catch(e => Alert.alert(
        'Could not request holidays',
        e.message,
      ));
  }

  updateHoliday = (cancel) => {
    const { booking, user } = this.state;
    const { navigation } = this.props;

    const request = {
      employeeId: user.employeeId,
      endDate: booking.endDate,
      halfDay: false,
      holidayId: booking.holId,
      holidayStatusId: cancel ? 3 : 1,
      startDate: booking.startDate,
    };

    updateHolidayRequest(request)
      .then(() => {
        navigation.pop();
      })
      .catch(e => Alert.alert(
        'Could not update holiday',
        e.message,
      ));
  }

  render() {
    const { booking, booked } = this.state;

    return (
      <Container
        startDate={booking.startDate}
        endDate={booking.endDate}
        booked={booked}
        submitRequest={this.submitRequest}
        updateHoliday={this.updateHoliday}
        changeStartDate={this.changeStartDate}
        changeEndDate={this.changeEndDate}
      />
    );
  }
};
