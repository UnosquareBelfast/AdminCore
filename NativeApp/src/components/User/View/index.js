import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import ListItem from './ListItem';
import { HeaderContainer, HolidayContainer, HolidayText } from './styled';
import { ScrollView, H1, H2, P } from '../../Common';

const UserView = (props) => {
  const { takenHolidays, remainingHolidays, employee } = props;

  return (
    <ScrollView>
      <HeaderContainer>
        <HolidayContainer divider>
          <H2>
            Taken
          </H2>
          <HolidayText>
            <H1>
              {takenHolidays.length}
            </H1>
            <P dayText>
              DAYS
            </P>
          </HolidayText>
        </HolidayContainer>
        <HolidayContainer>
          <H2>
            Remaining
          </H2>
          <HolidayText>
            <H1>
              {remainingHolidays}
            </H1>
            <P dayText>
              DAYS
            </P>
          </HolidayText>
        </HolidayContainer>
      </HeaderContainer>

      <View style={styles.holsDate}>
        <P>
          {employee.forename}
          {employee.surname}
        </P>
      </View>

      <View>
        <FlatList
          keyExtractor={item => item.holidayId.toString()}
          data={takenHolidays}
          renderItem={({ item }) => (
            <ListItem
              statusId={item.holidayStatusId}
              status={item.holidayStatusDescription}
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
});

export default UserView;
