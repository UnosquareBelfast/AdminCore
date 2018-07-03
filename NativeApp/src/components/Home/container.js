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
            startDate: day.dateString,
            endDate: day.dateString,
          },
        });
      }
    }

    submitRequest = () => {
      const { booking, user } = this.state;
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
        .then((res) => {
          console.log('res', res)
          // getTakenHolidays()
          //   .then(data => this.setState({ takenHolidays: this.formatDate(data) }));
          this.closeModal();
        })
        .catch(e => Alert.alert(
          'Could not request holidays',
          e.message,
        ));
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
      const {
        takenHolidays,
        showModal,
        booking,
      } = this.state;

      return (
        <Container
          handleLogout={this.handleLogout}
          takenHolidays={takenHolidays}
          onDayPress={this.onDayPress}
          showModal={showModal}
          closeModal={this.closeModal}
          startDate={booking.startDate}
          endDate={booking.endDate}
          submitRequest={this.submitRequest}
          changeStartDate={this.changeStartDate}
          changeEndDate={this.changeEndDate}
        />
      );
    }
};
