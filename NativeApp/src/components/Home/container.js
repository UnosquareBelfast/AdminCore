import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import { has, get } from 'lodash';
import { getMonthEvents } from '../../utilities/holidays';
import holidayStatusColor from '../../utilities/holidayStatus';
import { BLACK, WHITE } from '../../styles/colors';

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
        events: {},
        showModal: false,
        calendarDate: moment().format('YYYY-MM-DD'),
      };
    }

    componentDidMount() {
      const { navigation } = this.props;

      this.sub = navigation.addListener('didFocus', () => {
        this.fetchEvents();
      });
    }

    componentWillUnmount() {
      this.sub.remove();
    }


    onDayPress = (day) => {
      const { navigation } = this.props;
      const { events } = this.state;

      if (day) {
        const booked = has(events, day.dateString);
        const event = get(events, day.dateString, 0);
        navigation.push('Booking', {
          date: day.dateString,
          event,
          booked,
        });
      }
    }

    onMonthChange = (month) => {
      const newDate = moment(month.dateString);
      this.setState({
        calendarDate: newDate.format('YYYY-MM-DD'),
      }, () => {
        this.fetchEvents();
      });
    }

    fetchEvents = () => {
      const { calendarDate } = this.state;
      getMonthEvents(calendarDate)
        .then(data => this.setState({ events: this.formatDate(data) }));
    };

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

      if (!moment(startDate).isSame(endDate)) {
        dates.push(endDate);
      }

      return dates;
    }

    formatDate = data => data.reduce((obj, item) => {
      const holidayStatus = holidayStatusColor[item.eventStatus.eventStatusId];
      const sameDate = moment(item.start).isSame(item.end);
      const dates = this.enumerateDaysBetweenDates(item.start, item.end);
      dates.forEach((date) => {
        obj[date] = {
          customStyles: {
            container: {
              backgroundColor: item.halfDay ? 'transparent' : holidayStatus,
            },
            text: {
              color: item.halfDay ? BLACK : WHITE,
            },
          },
          startingDate: item.start === date,
          endingDate: item.end === date,
          sameDate,
          halfDay: item.halfDay,
          statusId: item.eventStatus.eventStatusId,
          status: item.eventStatus.description,
          holId: item.holidayId,
        };
      });

      return obj;
    }, {});

    render() {
      const { events } = this.state;

      return (
        <Container
          events={events}
          onDayPress={this.onDayPress}
          onMonthChange={this.onMonthChange}
        />
      );
    }
};
