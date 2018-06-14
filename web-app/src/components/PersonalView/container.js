import React from 'react';
import { PropTypes as PT } from 'prop-types';
import moment from 'moment';
import holidayStatus from '../../utilities/holidayStatus';

export default Wrapped => {
  class Comp extends React.Component {
    static propTypes = {
      user: PT.object,
      takenHolidays: PT.array,
      events: PT.array,
      date: PT.object,
    };

    constructor(props) {
      super(props);
      this.state = {
        takenHolidays: props.takenHolidays.length,
        totalHolidays: props.user.totalHolidays,
        holidays: null,
      };
    }

    componentDidMount() {
      this.updateHolidayState();
    }

    componentDidUpdate(prevProps) {
      if (this.props.date != prevProps.date) {
        this.updateHolidayState();
      }
    }

    updateHolidayState = () => {
      const filteredHolidays = this.filterHolidaysToCurrentMonth(
        this.props.events,
      );
      const sortedHolidays = this.sortToHolidays(filteredHolidays);
      this.setState({ holidays: sortedHolidays });
    };

    sortToHolidays = events => {
      const sortedEvents = [[], [], []];
      events.map(event => {
        if (event.holidayStatusId !== holidayStatus.WFH) {
          sortedEvents[event.holidayStatusId - 1].push(event);
        }
      });
      return sortedEvents;
    };

    filterHolidaysToCurrentMonth = holidays => {
      return holidays.filter(holiday =>
        moment(holiday.start).isSame(moment(this.props.date), 'month'),
      );
    };

    render() {
      return <Wrapped {...this.state} date={this.props.date} />;
    }
  }

  // Calendar stuff
  Comp.title = date => moment(date).format('MMMM YYYY');
  Comp.navigate = (date, action) => {
    switch (action) {
      case 'PREV':
        return moment(date)
          .subtract(1, 'month')
          .toDate();

      case 'NEXT':
        return moment(date)
          .add(1, 'month')
          .toDate();

      default:
        return date;
    }
  };

  return Comp;
};
