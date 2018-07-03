import React from 'react';
import { View, DatePickerIOS } from 'react-native';

const CustomDatePickerIOS = (props) => {
  const { chosenDate, setDate } = props;
  return (
    <View>
      <DatePickerIOS
        date={chosenDate}
        onDateChange={setDate}
        mode="date"
      />
    </View>
  );
};

export default CustomDatePickerIOS;
