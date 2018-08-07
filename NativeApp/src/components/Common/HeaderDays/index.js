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
      <View style={styles.divider}>
        <H2 type="base" style={styles.boldDarkGrey}>
          Taken
        </H2>
        <View style={styles.holidayText}>
          <H1 type="base" style={styles.darkGrey}>
            {takenHolidays.length}
          </H1>
          <P type="base" style={styles.darkGreyPadding}>
            DAYS
          </P>
        </View>
      </View>
      <View style={styles.holidayContainer}>
        <H2 type="base" style={styles.boldDarkGrey}>
          Remaining
        </H2>
        <View style={styles.holidayText}>
          <H1 type="base" style={styles.darkGrey}>
            {remainingHolidays}
          </H1>
          <P type="base" style={styles.darkGreyPadding}>
            DAYS
          </P>
        </View>
      </View>
    </View>
  );
};

HeaderDays.propTypes = {
  takenHolidays: PT.arrayOf(PT.object).isRequired,
  remainingHolidays: PT.number.isRequired,
};

export default HeaderDays;
