import React from 'react';
import { StyleSheet } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { HeaderContainer, HolidayContainer, HolidayText } from './styles';
import H1 from '../H1';
import H2 from '../H2';
import P from '../P';
import colours from '../../../utilities/globalStyles/theme';

const HeaderDays = (props) => {
  const { remainingHolidays, takenHolidays } = props;

  return (
    <HeaderContainer>
      <HolidayContainer divider>
        <H2 type="base" style={styles.boldDarkGrey}>
          Taken
        </H2>
        <HolidayText>
          <H1 type="base" style={styles.darkGrey}>
            {takenHolidays.length}
          </H1>
          <P type="base" style={styles.darkGreyPadding}>
            DAYS
          </P>
        </HolidayText>
      </HolidayContainer>
      <HolidayContainer>
        <H2 type="base" style={styles.boldDarkGrey}>
          Remaining
        </H2>
        <HolidayText>
          <H1 type="base" style={styles.darkGrey}>
            {remainingHolidays}
          </H1>
          <P type="base" style={styles.darkGreyPadding}>
            DAYS
          </P>
        </HolidayText>
      </HolidayContainer>
    </HeaderContainer>
  );
};

HeaderDays.propTypes = {
  takenHolidays: PT.arrayOf(PT.object).isRequired,
  remainingHolidays: PT.number.isRequired,
};

const styles = StyleSheet.create({
  boldDarkGrey: {
    fontWeight: 'bold',
    color: colours.darkGrey,
  },
  darkGrey: {
    color: colours.darkGrey,
  },
  darkGreyPadding: {
    color: colours.darkGrey,
    paddingBottom: 5,
    paddingLeft: 2,
  },
});

export default HeaderDays;
