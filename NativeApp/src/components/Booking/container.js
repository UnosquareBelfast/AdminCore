import React, { Component } from 'react';
import { Alert } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { userProfile } from '../../utilities/currentUser';
import { requestHolidays, updateHolidayRequest, cancelHolidayRequest } from '../../services/holidayService';


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
        statusId: 0,
        status: '',
        startDate: '',
        endDate: '',
        halfDay: false,
      },
      booked: false,
      user: {},
      loading: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { booking } = this.state;
    const chosenDate = navigation.getParam('date');
    const booked = navigation.getParam('booked', '');
    const holiday = navigation.getParam('event', {});

    userProfile()
      .then(user => this.setState({ user }));

    this.setState({
      booking: {
        ...booking,
        holId: holiday.holId,
        statusId: holiday.statusId,
        status: holiday.status,
        startDate: chosenDate,
        endDate: chosenDate,
        halfDay: holiday.halfDay,
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
    this.setState({ loading: true });

    const request = {
      dates: [
        {
          endDate: booking.endDate,
          halfDay: booking.halfDay,
          startDate: booking.startDate,
        },
      ],
      employeeId: user.employeeId,
    };

    requestHolidays(request)
      .then(() => {
        this.setState({ loading: false });
        navigation.pop();
      })
      .catch((e) => {
        this.setState({ loading: false });
        Alert.alert(
          'Could not request holidays',
          e.message,
        );
      });
  }

  updateHoliday = () => {
    const { booking: { endDate, halfDay, startDate, holId } } = this.state;
    const { navigation } = this.props;

    const request = {
      endDate,
      halfDay,
      startDate,
      holidayId: holId,
    };

    updateHolidayRequest(request)
      .then(() => navigation.pop())
      .catch(e => Alert.alert(
        'Could not update holiday',
        e.message,
      ));
  }

  cancelHoliday = () => {
    const { booking: { holId } } = this.state;
    const { navigation } = this.props;

    const request = {
      holidayId: holId,
    };

    cancelHolidayRequest(request)
      .then(() => navigation.pop())
      .catch(e => Alert.alert(
        'Could not cancel holiday',
        e.message,
      ));
  }

  updateHalfDay = () => {
    const { booking } = this.state;
    const { halfDay, startDate } = booking;

    this.setState({
      booking: {
        ...booking,
        endDate: startDate,
        halfDay: !halfDay,
      },
    });
  }

  render() {
    const { booking, booked, loading } = this.state;

    return (
      <Container
        updateHalfDay={this.updateHalfDay}
        booked={booked}
        loading={loading}
        booking={booking}
        submitRequest={this.submitRequest}
        updateHoliday={this.updateHoliday}
        cancelHoliday={this.cancelHoliday}
        changeStartDate={this.changeStartDate}
        changeEndDate={this.changeEndDate}
      />
    );
  }
};
