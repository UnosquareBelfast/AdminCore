import React, { Component } from 'react';
import { Alert } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { userProfile } from '../../utilities/currentUser';
import { requestHolidays } from '../../services/holidayService';


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
        startDate: '',
        endDate: '',
        halfDay: false,
      },
      user: {},
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const chosenDate = navigation.getParam('date', '');

    userProfile()
      .then(user => this.setState({ user }));

    this.setState({
      booking: {
        startDate: chosenDate,
        endDate: chosenDate,
      },
    });
  }

  changeStartDate = (date) => {
    const formatDate = moment(date).format('YYYY-MM-DD');
    this.setState(prevState => ({
      booking: {
        ...prevState.booking,
        startDate: formatDate,
      },
    }));
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

  render() {
    const { booking } = this.state;

    return (
      <Container
        startDate={booking.startDate}
        endDate={booking.endDate}
        submitRequest={this.submitRequest}
        changeStartDate={this.changeStartDate}
        changeEndDate={this.changeEndDate}
      />
    );
  }
};
