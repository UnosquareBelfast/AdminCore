import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import { ScrollView, H2, HeaderDays } from '../../Common';

const UserView = (props) => {
  const { takenHolidays, remainingHolidays, employee } = props;

  return (
    <ScrollView>
    
      <HeaderDays
        takenHolidays={takenHolidays}
        remainingHolidays={remainingHolidays}
      />
      <View style={styles.profileName}>
        <H2 type="base" styleProp={styles.H2Bold}>
          {employee.forename}&nbsp;
          {employee.surname}'s Holidays
        </H2>
      </View>

      <View style={styles.flatListView}>
        <FlatList
          keyExtractor={item => item.holidayId.toString()}
          data={takenHolidays}
          ListHeaderComponent={<ListHeader />}
          renderItem={({ item, index }) => (
            <ListItem
              listId={index}
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
  profileName: {
    paddingBottom: 10,
    paddingTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  flatListView: {
    flex: 1,
  },
  H2Bold: {
    fontWeight: 'bold',
  },
});

export default UserView;
