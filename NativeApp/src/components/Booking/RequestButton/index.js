import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';

const RequestButton = (props) => {
  const { updateHoliday, booked, submitRequest } = props;

  return (
    booked ? (
      <View>
        <Button
          onPress={() => updateHoliday(false)}
          title="Update Holiday"
          backgroundColor="#00DCFA"
          borderRadius={5}
        />
        <Button
          onPress={() => updateHoliday(true)}
          title="Cancel Holiday"
          containerViewStyle={{ marginTop: 20 }}
          borderRadius={5}
        />
      </View>
    ) : (
      <Button
        onPress={submitRequest}
        title="Request"
        backgroundColor="#00DCFA"
        borderRadius={5}
      />
    )
  );
};

export default RequestButton;

RequestButton.propTypes = {
  updateHoliday: PT.func.isRequired,
  booked: PT.bool.isRequired,
  submitRequest: PT.func.isRequired,
};
