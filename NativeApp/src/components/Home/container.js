import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { userLogout, userProfile } from '../../utilities/currentUser';
import { getTakenHolidays } from '../../utilities/holidays';

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
        user: null,
        booking: {
          startDate: '',
          endDate: '',
          halfDay: false,
        },
      };
    }

    componentDidMount() {
      const { navigation } = this.props;

      this.sub = navigation.addListener('didFocus', () => {
        getTakenHolidays()
          .then(data => this.setState({ takenHolidays: this.formatDate(data) }));

        userProfile()
          .then(user => this.setState({ user }));
      });
    }

    componentWillUnmount() {
      this.sub.remove();
    }

    onDayPress = (day) => {
      const { navigation } = this.props;
      if (day) {
        this.setState({
          booking: {
            startDate: day.dateString,
            endDate: day.dateString,
          },
        });
        navigation.push('Booking', { date: day.dateString });
      }
    }

    closeModal = () => {
      this.setState({ showModal: false });
    }

    enumerateDaysBetweenDates = (startDate, endDate) => {
      const dates = [startDate];

      const currDate = moment(startDate).startOf('day');
      const lastDate = moment(endDate).startOf('day');


      while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().format('YYYY-MM-DD'));
      }

      dates.push(endDate);

      return dates;
    }

    formatDate = data => data.reduce((obj, item) => {
      const holidayStatus = this.holidayStatus(item.holidayStatusId);
      const dates = this.enumerateDaysBetweenDates(item.start, item.end);
      dates.forEach((date) => {
        obj[date] = { textColor: 'white', color: holidayStatus };
      });

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
          onDayPress={this.onDayPress}
        />
      );
    }
};
