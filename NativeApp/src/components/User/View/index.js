import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import { HeaderContainer, HolidayContainer, HolidayText } from './styled';
import { ScrollView, H1, H2, P } from '../../Common';
import colours from '../../../utilities/globalStyles/theme';

const UserView = (props) => {
  const { takenHolidays, remainingHolidays, employee } = props;

  return (
    <ScrollView>
      <HeaderContainer>
        <HolidayContainer divider>
          <H2 type="base" styleProp={styles.boldDarkGrey}>
            Taken
          </H2>
          <HolidayText>
            <H1 type="base" styleProp={styles.darkGrey}>
              {takenHolidays.length}
            </H1>
            <P type="base" styleProp={styles.darkGreyPadding}>
              DAYS
            </P>
          </HolidayText>
        </HolidayContainer>
        <HolidayContainer>
          <H2 type="base" styleProp={styles.boldDarkGrey}>
            Remaining
          </H2>
          <HolidayText>
            <H1 type="base" styleProp={styles.darkGrey}>
              {remainingHolidays}
            </H1>
            <P type="base" styleProp={styles.darkGreyPadding}>
              DAYS
            </P>
          </HolidayText>
        </HolidayContainer>
      </HeaderContainer>

      <View style={styles.holsDate}>
        <P type="base">
          {employee.forename}
          {employee.surname}
        </P>
      </View>

      <View>
        <FlatList
          keyExtractor={item => item.holidayId.toString()}
          data={takenHolidays}
          ListHeaderComponent={<ListHeader />}
          renderItem={({ item }) => (
            <ListItem
              statusId={item.eventStatus.eventStatusId}
              status={item.eventStatus.description}
              startDate={item.start}
              endDate={item.end}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

UserView.propTypes = {
  takenHolidays: PT.arrayOf(PT.object).isRequired,
  remainingHolidays: PT.number.isRequired,
  employee: PT.shape({
    forename: PT.string,
    surname: PT.string,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 23,
    backgroundColor: '#fff',
  },
  holsDate: {
    paddingBottom: 10,
  },
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

export default UserView;
