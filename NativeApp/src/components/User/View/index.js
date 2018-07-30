import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import ListItem from './ListItem';
import { ScrollView, Text, HeaderContainer, HolidayContainer, HolidayText } from './styled';


const UserView = (props) => {
  const { takenHolidays, remainingHolidays, employee } = props;

  return (
    <ScrollView>
      <HeaderContainer>
        <HolidayContainer divider>
          <Text>
            Taken
          </Text>
          <HolidayText>
            <Text largeText>
              {takenHolidays.length}
            </Text>
            <Text smallText>
              DAYS
            </Text>
          </HolidayText>
        </HolidayContainer>
        <HolidayContainer>
          <Text>
            Remaining
          </Text>
          <HolidayText>
            <Text largeText>
              {remainingHolidays}
            </Text>
            <Text smallText>
              DAYS
            </Text>
          </HolidayText>
        </HolidayContainer>
      </HeaderContainer>

      <View style={styles.holsDate}>
        <Text>
          {employee.forename}
          {employee.surname}
        </Text>
      </View>

      <View>
        <FlatList
          keyExtractor={item => item.holidayId.toString()}
          data={takenHolidays}
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
});

export default UserView;
