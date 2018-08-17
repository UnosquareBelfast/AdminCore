import React from 'react';
import { View } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import styles from './styles';
import H1 from '../H1';
import H2 from '../H2';
import P from '../P';

const HeaderDays = (props) => {
  const { remainingHolidays, takenHolidays } = props;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.holidayContainer}>
        <View style={styles.holidayText}>
          <H1 type="bold">
            {takenHolidays.length}
          </H1>
          <H1 type="bold" style={styles.daysText}>
              DAYS
          </H1>
        </View>
        <H2 type="base" style={styles.h2}>
          Taken
        </H2>
      </View>
      <View style={styles.holidayContainer}>
        <View style={styles.holidayText}>
          <H1 type="bold">
            {remainingHolidays}
          </H1>
          <H1 type="bold" style={styles.daysText}>
            DAYS
          </H1>
        </View>
        <H2 type="base" style={styles.h2}>
          Remaining
        </H2>
      </View>
    </View>
  );
};

HeaderDays.propTypes = {
  takenHolidays: PT.arrayOf(PT.object).isRequired,
  remainingHolidays: PT.number.isRequired,
};

export default HeaderDays;
