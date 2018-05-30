import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';

class RangeDayPicker extends Component {
  static propTypes = {
    datesChanged: PT.func,
  };

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { from, to } = this.state;
    if (from != prevState.from || to != prevState.to) {
      this.props.datesChanged({ from, to });
    }
  }

  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }

  handleDayClick = day => {
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      this.setState({
        to: day,
        enteredTo: day,
      });
    }
  };

  handleDayMouseEnter = day => {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  };

  handleResetClick = () => {
    this.setState(this.getInitialState());
  };

  returnData = () => {
    return {
      from: this.state.from,
      to: this.state.to,
    };
  };

  render() {
    const { from, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: this.state.from || new Date() };
    const selectedDays = [from, { from, to: enteredTo }];

    return (
      <DayPicker
        className="Range"
        numberOfMonths={2}
        fromMonth={from}
        selectedDays={selectedDays}
        disabledDays={disabledDays}
        modifiers={modifiers}
        onDayClick={this.handleDayClick}
        onDayMouseEnter={this.handleDayMouseEnter}
      />
    );
  }
}

export default RangeDayPicker;
