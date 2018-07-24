import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  ScrollView,
  View,
  // Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import ListItem from './ListItem';
import { Text } from './styled';


const UserView = (props) => {
  const { takenHolidays, remainingHolidays, employee } = props;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <View style={styles.headerContainer}>
        <View style={styles.headerHolidayContainer}>
          <View style={styles.holidayContainer}>
            <Text>
              Taken
            </Text>
            <View style={styles.holidayText}>
              <Text largeText>
                {takenHolidays.length}
              </Text>
              <Text smallText>
                DAYS
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.headerHolidayContainer}>
          <View style={styles.holidayContainer}>
            <Text>
              Remaining
            </Text>
            <View style={styles.holidayText}>
              <Text largeText>
                {remainingHolidays}
              </Text>
              <Text smallText>
                DAYS
              </Text>
            </View>
          </View>
        </View>
      </View>

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
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    maxHeight: 93,
    justifyContent: 'space-evenly',
    borderColor: '#B1B1B1',
    borderBottomWidth: 1,
  },
  headerHolidayContainer: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: 'blue',
  },
  holidayContainer: {
    // justifyContent: 'center',
    // alignSelf: 'center',
    // flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 3,
    borderColor: 'yellow',
  },
  holidayText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',

    // justifyContent: 'center',
    // alignSelf: 'center',
    borderWidth: 3,
    borderColor: 'green',
  },
});

export default UserView;
