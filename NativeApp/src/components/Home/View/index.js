import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { View, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ListItem from '../ListItem';
import CustomDay from '../CustomDay';
import { H4 } from '../../Common';
import { LIGHTGREY, ACTIVECOLOR, BLACK, GREY } from '../../../styles/colors';
import { H1_SIZE } from '../../../styles/text';
import { container } from '../../../styles/layout';
import getDuration from '../../../utilities/dates';

const HomeView = (props) => {
  const {
    events,
    upcomingEvents,
    onDayPress,
    onMonthChange,
  } = props;

  return (
    <View style={styles.container}>
      <Calendar
        style={[styles.calendar]}
        markedDates={events}
        markingType="period"
        dayComponent={dayProps => <CustomDay {...dayProps} />}
        theme={{
          textMonthFontFamily: 'oswaldRegular',
          textDayFontFamily: 'openSansLight',
          textDayHeaderFontFamily: 'openSansRegular',
          textMonthFontSize: H1_SIZE,
          todayTextColor: ACTIVECOLOR,
          arrowColor: ACTIVECOLOR,
          monthTextColor: BLACK,
          dayTextColor: BLACK,
          textSectionTitleColor: BLACK,
          'stylesheet.calendar.header': {
            week: {
              marginTop: 20,
              paddingBottom: 13,
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderBottomWidth: 1,
              borderColor: LIGHTGREY,
            },
          },
        }}
        onDayPress={day => onDayPress(day)}
        onMonthChange={month => onMonthChange(month)}
      />
      <View style={styles.upcoming}>
        <H4 style={{ color: GREY }}>Upcoming</H4>
        <FlatList
          keyExtractor={item => item.holidayId.toString()}
          data={upcomingEvents}
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
    </View>
  );
};

HomeView.propTypes = {
  events: PT.shape({
    text: PT.string,
    color: PT.string,
  }).isRequired,
  onDayPress: PT.func.isRequired,
  onMonthChange: PT.func.isRequired,
  upcomingEvents: PT.arrayOf(PT.object).isRequired,
};

const styles = StyleSheet.create({
  container: {
    ...container,
  },
  calendar: {
    paddingBottom: 30,
  },
  upcoming: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    padding: 20,
  },
});

export default HomeView;
