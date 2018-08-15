import React from 'react';
import { Button } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import { UNOBLUE } from '../../../styles/colors';

const RequestButton = (props) => {
  const { updateHoliday, booked, submitRequest, loading } = props;

  return (
    booked ? (
      <Button
        onPress={updateHoliday}
        title="Update"
        backgroundColor={UNOBLUE}
        borderRadius={5}
        containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
        loading={loading}
        loadingRight
      />
    ) : (
      <Button
        onPress={submitRequest}
        title="Request"
        backgroundColor={UNOBLUE}
        borderRadius={5}
        loading={loading}
        loadingRight
        containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
      />
    )
  );
};

export default RequestButton;

RequestButton.propTypes = {
  updateHoliday: PT.func.isRequired,
  booked: PT.bool.isRequired,
  submitRequest: PT.func.isRequired,
  loading: PT.bool.isRequired,
};
