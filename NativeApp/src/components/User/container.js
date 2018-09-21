import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { flattenDeep } from 'lodash';
import { getUserEvents, getRemainingHolidays } from '../../utilities/holidays';
import { userProfile } from '../../utilities/currentUser';

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
      id: '',
      events: [],
      remainingHolidays: 0,
      employee: {
        forename: '',
        surname: '',
      },
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.sub = navigation.addListener('didFocus', () => {
      getUserEvents()
        .then(events => this.setState({ events: this.sortingEvents(events) }));

      getRemainingHolidays()
        .then(remainingHolidays => this.setState({ remainingHolidays }));

      userProfile()
        .then(employee => this.setState({ employee }));
    });
  }

  componentWillUnmount() {
    this.sub.remove();
  }

  sortingEvents = (events) => {
    let eventArray = [];
    let approvedArray = [];
    let awaitApprovalArray = [];

    approvedArray.push(events.filter(event => event.eventStatus.description === 'Approved'));
    awaitApprovalArray.push(events.filter(event => event.eventStatus.description === 'Awaiting approval'));

    approvedArray = flattenDeep(approvedArray);
    awaitApprovalArray = flattenDeep(awaitApprovalArray);

    if (approvedArray.length === 0) {
      approvedArray.push({});
    }

    if (awaitApprovalArray.length === 0) {
      awaitApprovalArray.push({});
    }

    if (approvedArray.length === 0 && awaitApprovalArray.length === 0) {
      approvedArray.push({});
      awaitApprovalArray.push({});
    }

    eventArray = [
      { title: 'Approved', data: approvedArray },
      { title: 'Awaiting approval', data: awaitApprovalArray },
    ];

    return eventArray;
  }

  render() {
    const { events, remainingHolidays, employee } = this.state;

    return (
      <Container
        employee={employee}
        events={events}
        remainingHolidays={remainingHolidays - events.length}
      />
    );
  }
};
