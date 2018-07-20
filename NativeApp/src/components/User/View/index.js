import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import ListItem from './ListItem';


const UserView = (props) => {
  const { takenHolidays, remainingHolidays, employee } = props;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <View style={styles.holsDate}>
        <Text>
          {employee.forename}
          {employee.surname}
        </Text>
        <Text>
          Holidays taken
        </Text>
        <Text>
          {takenHolidays.length}
        </Text>
        <Text>
          Holidays remaining
        </Text>
        <Text>
          {remainingHolidays}
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
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  holsDate: {
    paddingBottom: 10,
  },
});

export default UserView;
