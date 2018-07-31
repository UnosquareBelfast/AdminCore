import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';

const RequestButton = (props) => {
  const { updateHoliday, booked, submitRequest, loading } = props;

  return (
    booked ? (
      <View>
        <Button
          onPress={() => updateHoliday()}
          title="Update Holiday"
          backgroundColor="#00DCFA"
          borderRadius={5}
          loading={loading}
          loadingRight
        />
        <Button
          onPress={() => cancelHoliday()}
          title="Cancel Holiday"
          containerViewStyle={{ marginTop: 20 }}
          borderRadius={5}
          loading={loading}
          loadingRight
        />
      </View>
    ) : (
      <Button
        onPress={submitRequest}
        title="Request"
        backgroundColor="#00DCFA"
        borderRadius={5}
        loading={loading}
        loadingRight
      />
    )
  );
};

export default RequestButton;

RequestButton.propTypes = {
  updateHoliday: PT.func.isRequired,
  cancelHoliday: PT.func.isRequired,
  booked: PT.bool.isRequired,
  submitRequest: PT.func.isRequired,
  loading: PT.bool.isRequired,
};
