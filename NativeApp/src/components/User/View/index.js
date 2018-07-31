import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import ListItem from './ListItem';
import { H3, ScrollView, HeaderDays } from '../../Common';
import colours from '../../../utilities/globalStyles/theme';

const UserView = (props) => {
  const { takenHolidays, remainingHolidays, employee } = props;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colours.lightGrey }}>
      <View style={styles.container}>
        <HeaderDays
          takenHolidays={takenHolidays}
          remainingHolidays={remainingHolidays}
        />
        <ScrollView>
          <View style={styles.profileName}>
            <H3 type="base" customStyle={styles.H3Bold}>
              {employee.forename}&nbsp;
              {`${employee.surname}'s Holidays`}
            </H3>
          </View>

          <View style={styles.flatListView}>
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
      </View>
    </SafeAreaView>
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
    backgroundColor: colours.lightGrey,
  },
  profileName: {
    paddingBottom: 10,
    paddingTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  flatListView: {
    flex: 1,
  },
  H3Bold: {
    fontWeight: 'bold',
  },
});

export default UserView;
