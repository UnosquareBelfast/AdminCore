import React from 'react';
import { View, DatePickerIOS } from 'react-native';
import { PropTypes as PT } from 'prop-types';

const CustomDatePickerIOS = (props) => {
  const { chosenDate, setDate, minimumDate } = props;
  return (
    <View>
      <DatePickerIOS
        date={chosenDate}
        onDateChange={setDate}
        mode="date"
        minimumDate={minimumDate}
      />
    </View>
  );
};

CustomDatePickerIOS.defaultProps = {
  minimumDate: new Date(),
};

CustomDatePickerIOS.propTypes = {
  chosenDate: PT.instanceOf(Date).isRequired,
  setDate: PT.func.isRequired,
  minimumDate: PT.instanceOf(Date),
};

export default CustomDatePickerIOS;
