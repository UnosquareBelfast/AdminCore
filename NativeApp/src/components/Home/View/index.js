import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { View, Button, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import BookingModal from '../BookingModal';

const HomeView = (props) => {
  const {
    handleLogout,
    takenHolidays,
    onDayPress,
    showModal,
    closeModal,
    booking,
    submitRequest,
  } = props;

  return (
    <View style={styles.container}>
      <BookingModal
        showModal={showModal}
        closeModal={closeModal}
        booking={booking}
        submitRequest={submitRequest}
      />
      <Button
        onPress={handleLogout}
        title="Logout"
      />

      <CalendarList
        style={styles.calendar}
        markedDates={takenHolidays}
        markingType="period"
        theme={{
          todayTextColor: '#00adf5',
        }}
        onDayPress={(day) => { onDayPress(day); }}
      />
    </View>
  );
};

HomeView.propTypes = {
  handleLogout: PT.func.isRequired,
  takenHolidays: PT.shape({
    text: PT.string,
    color: PT.string,
  }).isRequired,
  onDayPress: PT.func.isRequired,
  showModal: PT.bool.isRequired,
  closeModal: PT.func.isRequired,
  booking: PT.shape({
    date: PT.string,
  }).isRequired,
  submitRequest: PT.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  calendar: {
    paddingHorizontal: 10,
  },
});

export default HomeView;
