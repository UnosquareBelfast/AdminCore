import React from 'react';
import { View } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import styles from './styles';
import H1 from '../H1';
import H3 from '../H3';

const HeaderDays = (props) => {
  const { remainingHolidays, events } = props;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.holidayContainer}>
        <View style={styles.holidayText}>
          <H1>
            {events.length}&nbsp;
          </H1>
          <H1>
              DAYS
          </H1>
        </View>
        <H3 style={styles.textGrey}>
          Taken
        </H3>
      </View>
      <View style={styles.holidayContainer}>
        <View style={styles.holidayText}>
          <H1>
            {remainingHolidays}&nbsp;
          </H1>
          <H1>
            DAYS
          </H1>
        </View>
        <H3 style={styles.textGrey}>
          Remaining
        </H3>
      </View>
    </View>
  );
};

HeaderDays.propTypes = {
  events: PT.arrayOf(PT.object).isRequired,
  remainingHolidays: PT.number.isRequired,
};

export default HeaderDays;
