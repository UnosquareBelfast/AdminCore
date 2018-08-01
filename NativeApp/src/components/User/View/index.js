import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ListItem from './ListItem';
import { H3, HeaderDays } from '../../Common';
import { LIGHTGREY } from '../../../styles/colors';
import styles from './styles';

const UserView = (props) => {
  const { takenHolidays, remainingHolidays, employee } = props;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LIGHTGREY }}>
      <View style={styles.container}>
        <HeaderDays
          takenHolidays={takenHolidays}
          remainingHolidays={remainingHolidays}
        />
        <ScrollView>
          <View style={styles.profileName}>
            <H3 type="base" style={styles.H3Bold}>
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

export default UserView;
