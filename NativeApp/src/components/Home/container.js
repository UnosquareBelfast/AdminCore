import React, { Component } from 'react';
import { Alert } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { userLogout, userProfile } from '../../utilities/currentUser';
import { getTakenHolidays } from '../../utilities/holidays';
import { requestHolidays } from '../../services/holidayService';

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
        booking: {},
        showModal: false,
        user: null,
      };
    }

    componentDidMount() {
      getTakenHolidays()
        .then(data => this.setState({ takenHolidays: this.formatDate(data) }));

      userProfile()
        .then(user => this.setState({ user }));
    }

    onDayPress = (day) => {
      if (day) {
        this.setState({
          showModal: true,
          booking: {
            date: day.dateString,
          },
        });
      }
    }

    submitRequest = () => {
      const { booking, user } = this.state;
      const request = [];

      request.push({
        date: booking.date,
        dateCreated: moment().format('YYYY-MM-DD'),
        employee: {
          ...user,
          countryDescription: 'Northern Ireland',
          statusDescription: 'Inactive',
        },
        halfDay: true,
        holidayId: 0,
        holidayStatusDescription: 'Booked',
        holidayStatusId: 1,
        lastModified: moment().format('YYYY-MM-DD'),
      });

      requestHolidays(request)
        .then(() => {
          getTakenHolidays()
            .then(data => this.setState({ takenHolidays: this.formatDate(data) }));
          this.closeModal();
        })
        .catch(e => Alert.alert(
          'Could not make request',
          e.message,
        ));
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
      const { takenHolidays, showModal, booking } = this.state;

      return (
        <Container
          handleLogout={this.handleLogout}
          takenHolidays={takenHolidays}
          onDayPress={this.onDayPress}
          showModal={showModal}
          closeModal={this.closeModal}
          booking={booking}
          submitRequest={this.submitRequest}
        />
      );
    }
};
