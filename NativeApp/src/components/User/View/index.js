import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ListItem from './ListItem';
import { H1, H3, HeaderDays } from '../../Common';
import { WHITE } from '../../../styles/colors';
import styles from './styles';
import getDuration from '../../../utilities/dates';


const UserView = (props) => {
  const { events, remainingHolidays, employee } = props;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <View style={styles.container}>
        <View style={styles.profileName}>
          <H1>
            {employee.forename}&nbsp;
            {employee.surname}
          </H1>
          <H3 style={styles.holidayText}>Holidays</H3>
        </View>
        <HeaderDays
          events={events}
          remainingHolidays={remainingHolidays}
        />
        <ScrollView>
          <View style={styles.flatListView}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={events}
              renderItem={({ item }) => (
                <ListItem
                  statusId={item.eventStatus.eventStatusId}
                  status={item.eventStatus.description}
                  startDate={item.start}
                  endDate={item.end}
                  duration={item.halfDay ? 0.5 : getDuration(item.start, item.end)}
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
  events: PT.arrayOf(PT.object).isRequired,
  remainingHolidays: PT.number.isRequired,
  employee: PT.shape({
    forename: PT.string,
    surname: PT.string,
  }).isRequired,
};

export default UserView;
