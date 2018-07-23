import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { getTakenHolidays, getRemainingHolidays } from '../../utilities/holidays';
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
      takenHolidays: [],
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
      getTakenHolidays()
        .then(takenHolidays => this.setState({ takenHolidays }));

      getRemainingHolidays()
        .then(remainingHolidays => this.setState({ remainingHolidays }));

      userProfile()
        .then(employee => this.setState(
          {
            employee: {
              forename: employee.forename,
              surname: employee.surname,
            },
          }
        ));
    });
  }

  componentWillUnmount() {
    this.sub.remove();
  }

  render() {
    const { takenHolidays, remainingHolidays, employee } = this.state;

    return (
      <Container
        employee={employee}
        takenHolidays={takenHolidays}
        remainingHolidays={remainingHolidays - takenHolidays.length}
      />
    );
  }
};
